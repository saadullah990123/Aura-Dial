"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { db } from "@/db";
import { admins } from "@/db/schema";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { getSessionCookieName, revokeAllAdminSessions } from "@/lib/auth/session";
import { writeAudit } from "@/lib/audit";
import { enforceRateLimit } from "@/lib/security/rate-limit";
import {
  type ActionState,
  changeEmailSchema,
  changePasswordSchema,
  zodFieldErrors,
} from "@/lib/validations/admin";

export async function changePasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdminOrRedirect();

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: zodFieldErrors(parsed.error) };
  }

  const limit = await enforceRateLimit({
    action: "admin_login",
    identifier: `change-password:${admin.id}`,
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    blockMs: 15 * 60 * 1000,
  });
  if (!limit.allowed) return { error: "Too many attempts. Please wait a few minutes and try again." };

  const [row] = await db.select({ hash: admins.passwordHash }).from(admins).where(eq(admins.id, admin.id)).limit(1);
  if (!row || !(await verifyPassword(parsed.data.currentPassword, row.hash))) {
    return { error: "Please fix the highlighted fields.", fieldErrors: { currentPassword: "That isn't your current password." } };
  }

  await db.update(admins).set({ passwordHash: await hashPassword(parsed.data.newPassword), updatedAt: new Date() }).where(eq(admins.id, admin.id));

  // Keep this browser signed in, sign out everywhere else.
  const cookieStore = await cookies();
  await revokeAllAdminSessions(admin.id, cookieStore.get(getSessionCookieName())?.value);
  await writeAudit({ adminId: admin.id, action: "admin.password_changed", entityType: "admin", entityId: admin.id });

  return { ok: true, message: "Password updated. Other devices have been signed out." };
}

export async function changeEmailAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdminOrRedirect();

  const parsed = changeEmailSchema.safeParse({
    newEmail: formData.get("newEmail"),
    currentPassword: formData.get("currentPassword"),
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: zodFieldErrors(parsed.error) };
  }

  const newEmail = parsed.data.newEmail;

  if (newEmail === admin.email.toLowerCase()) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: { newEmail: "This is already your current email address." },
    };
  }

  const limit = await enforceRateLimit({
    action: "admin_login",
    identifier: `change-email:${admin.id}`,
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    blockMs: 15 * 60 * 1000,
  });
  if (!limit.allowed) return { error: "Too many attempts. Please wait a few minutes and try again." };

  const [row] = await db
    .select({ hash: admins.passwordHash })
    .from(admins)
    .where(eq(admins.id, admin.id))
    .limit(1);

  if (!row || !(await verifyPassword(parsed.data.currentPassword, row.hash))) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: { currentPassword: "That isn't your current password." },
    };
  }

  // Ensure no other admin is using this email
  const [conflict] = await db
    .select({ id: admins.id })
    .from(admins)
    .where(and(eq(admins.email, newEmail), ne(admins.id, admin.id)))
    .limit(1);

  if (conflict) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: { newEmail: "An account with this email address already exists." },
    };
  }

  const oldEmail = admin.email;
  await db
    .update(admins)
    .set({ email: newEmail, updatedAt: new Date() })
    .where(eq(admins.id, admin.id));

  await writeAudit({
    adminId: admin.id,
    action: "admin.email_changed",
    entityType: "admin",
    entityId: admin.id,
    beforeData: { email: oldEmail },
    afterData: { email: newEmail },
  });

  revalidatePath("/admin/account");

  return { ok: true, message: `Email address successfully updated to ${newEmail}.` };
}

