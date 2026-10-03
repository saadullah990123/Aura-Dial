import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { createPasswordResetToken } from "@/lib/auth/reset-password";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { getClientIp } from "@/lib/security/client-ip";
import { assertSameOrigin } from "@/lib/security/csrf";
import {
  badRequest,
  internalServerError,
  tooManyRequests,
  validationError,
} from "@/lib/security/safe-error";
import { enforceRateLimit } from "@/lib/security/rate-limit";
import { sha256 } from "@/lib/utils/crypto";
import { forgotPasswordSchema } from "@/lib/validations/admin-auth";

export const runtime = "nodejs";

const GENERIC_RESPONSE = {
  success: true,
  message:
    "If an account exists for this email, password reset instructions will be sent.",
};

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
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return validationError("Please provide a valid email address.");
    }

    const clientIp = getClientIp(request);

    const rateLimit = await enforceRateLimit({
      action: "password_reset",
      identifier: `${parsed.data.email}:${clientIp}`,
      maxRequests: 3,
      windowMs: 60 * 60 * 1000,
      blockMs: 60 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return tooManyRequests(rateLimit.retryAfterSeconds);
    }

    const reset = await createPasswordResetToken(parsed.data.email);

    if (reset) {
      const link = `${env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/admin/reset-password?token=${reset.token}`;

      const sent = await sendEmail({
        to: parsed.data.email,
        subject: "Reset your Aura Dial admin password",
        text: `Hello ${reset.name},\n\nUse this link to choose a new password. It expires in 30 minutes and works once:\n\n${link}\n\nIf you did not request this, you can ignore this email.`,
      });

      await db.insert(auditLogs).values({
        action: "admin.password_reset_requested",
        entityType: "admin",
        beforeData: { emailHash: sha256(parsed.data.email), emailSent: sent },
        afterData: null,
        ipHash: sha256(clientIp),
      });
    }

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (error) {
    console.error("Password reset request failed:", error);
    return internalServerError();
  }
}