import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import {
  clearAdminSessionCookie,
  getCurrentAdmin,
  revokeCurrentAdminSession,
} from "@/lib/auth/session";
import { assertSameOrigin } from "@/lib/security/csrf";
import { internalServerError } from "@/lib/security/safe-error";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    if (!assertSameOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 },
      );
    }

    const admin = await getCurrentAdmin();

    await revokeCurrentAdminSession();

    if (admin) {
      await db.insert(auditLogs).values({
        adminId: admin.id,
        action: "admin.logout",
        entityType: "admin",
        entityId: admin.id,
      });
    }

    const response = NextResponse.json({ success: true });
    clearAdminSessionCookie(response);

    return response;
  } catch (error) {
    console.error("Admin logout failed:", error);
    return internalServerError();
  }
}