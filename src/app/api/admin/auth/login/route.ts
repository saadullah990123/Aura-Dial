import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { admins, auditLogs } from "@/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import { getClientIp } from "@/lib/security/client-ip";
import {
  createAdminSession,
  setAdminSessionCookie,
} from "@/lib/auth/session";
import { assertSameOrigin } from "@/lib/security/csrf";
import {
  badRequest,
  internalServerError,
  tooManyRequests,
  validationError,
} from "@/lib/security/safe-error";
import { enforceRateLimit } from "@/lib/security/rate-limit";
import { sha256 } from "@/lib/utils/crypto";
import { adminLoginSchema } from "@/lib/validations/admin-auth";

export const runtime = "nodejs";

// Compared against when the email is unknown, so response time does not reveal
// whether an account exists.
const DUMMY_PASSWORD_HASH =
  "$2b$12$vgVXdjeB.oEKfErlAaCBd.QWLf2ws4OQ/q..oNJdRhisBo71nGvea";

export async function POST(request: NextRequest) {
  try {
    if (!assertSameOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return badRequest("Invalid request body.");
    }
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return validationError("Invalid email or password format.");
    }

    const { email, password } = parsed.data;

    const clientIp = getClientIp(request);

    // Per account + IP, and per IP alone so rotating emails can't dodge the limit.
    const [perAccount, perIp] = await Promise.all([
      enforceRateLimit({
        action: "admin_login",
        identifier: `${email}:${clientIp}`,
        maxRequests: 5,
        windowMs: 15 * 60 * 1000,
        blockMs: 15 * 60 * 1000,
      }),
      enforceRateLimit({
        action: "admin_login",
        identifier: `ip:${clientIp}`,
        maxRequests: 20,
        windowMs: 15 * 60 * 1000,
        blockMs: 15 * 60 * 1000,
      }),
    ]);

    const blocked = [perAccount, perIp].find((entry) => !entry.allowed);
    if (blocked) {
      return tooManyRequests(blocked.retryAfterSeconds);
    }

    const result = await db
      .select()
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);

    const admin = result[0];

    const passwordMatches = await verifyPassword(
      password,
      admin?.passwordHash ?? DUMMY_PASSWORD_HASH,
    );

    if (!admin || !admin.isActive || !passwordMatches) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const session = await createAdminSession({
      adminId: admin.id,
      ipAddress: clientIp,
      userAgent: request.headers.get("user-agent"),
    });

    await db
      .update(admins)
      .set({
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(admins.id, admin.id));

    await db.insert(auditLogs).values({
      adminId: admin.id,
      action: "admin.login",
      entityType: "admin",
      entityId: admin.id,
      ipHash: sha256(clientIp),
    });

    const response = NextResponse.json(
      {
        success: true,
        redirectTo: "/admin",
      },
      { status: 200 },
    );

    setAdminSessionCookie(response, session);

    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return internalServerError();
  }
}