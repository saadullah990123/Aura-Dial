import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { resetAdminPassword } from "@/lib/auth/reset-password";
import { getClientIp } from "@/lib/security/client-ip";
import { assertSameOrigin } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";
import {
  badRequest,
  internalServerError,
  tooManyRequests,
  validationError,
} from "@/lib/security/safe-error";
import { resetPasswordSchema } from "@/lib/validations/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    if (!assertSameOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 },
      );
    }

    // Limit attempts per IP before doing any other work. The reset token is 256-bit, so this is
    // defence in depth: it keeps the public endpoint from being hammered. A real reset needs
    // one request, so 10 per 15 minutes leaves plenty of room for typos.
    const rateLimit = await enforceRateLimit({
      action: "password_reset",
      identifier: `reset-confirm:${getClientIp(request)}`,
      maxRequests: 10,
      windowMs: 15 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return tooManyRequests(rateLimit.retryAfterSeconds);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return badRequest("Invalid request body.");
    }
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return validationError("Please correct the highlighted fields.");
    }

    const updated = await resetAdminPassword(
      parsed.data.token,
      parsed.data.password,
    );

    if (!updated) {
      return NextResponse.json(
        {
          error:
            "This password-reset link is invalid, expired, or has already been used.",
        },
        { status: 400 },
      );
    }

    await db.insert(auditLogs).values({
      action: "admin.password_reset_completed",
      entityType: "admin",
    });

    return NextResponse.json({
      success: true,
      message: "Password updated. You can now sign in.",
    });
  } catch (error) {
    console.error("Password reset failed:", error);
    return internalServerError();
  }
}