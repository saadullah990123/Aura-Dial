import { and, eq, gt, isNull } from "drizzle-orm";

import { db } from "@/db";
import { admins } from "@/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { revokeAllAdminSessions } from "@/lib/auth/session";
import { randomToken, sha256 } from "@/lib/utils/crypto";

const RESET_TOKEN_DURATION_MS = 1000 * 60 * 30;

export async function createPasswordResetToken(
  email: string,
): Promise<{ token: string; name: string } | null> {
  const found = await db
    .select({
      id: admins.id,
      name: admins.name,
      isActive: admins.isActive,
    })
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  const account = found[0];

  if (!account || !account.isActive) {
    return null;
  }

  const rawToken = randomToken(32);
  const now = new Date();

  await db
    .update(admins)
    .set({
      resetTokenHash: sha256(rawToken),
      resetTokenExpiresAt: new Date(now.getTime() + RESET_TOKEN_DURATION_MS),
      resetTokenUsedAt: null,
      updatedAt: now,
    })
    .where(eq(admins.id, account.id));

  return { token: rawToken, name: account.name };
}

export async function resetAdminPassword(
  token: string,
  password: string,
): Promise<boolean> {
  const tokenHash = sha256(token);
  const now = new Date();

  const found = await db
    .select({
      id: admins.id,
    })
    .from(admins)
    .where(
      and(
        eq(admins.resetTokenHash, tokenHash),
        gt(admins.resetTokenExpiresAt, now),
        isNull(admins.resetTokenUsedAt),
      ),
    )
    .limit(1);

  const admin = found[0];

  if (!admin) {
    return false;
  }

  const passwordHash = await hashPassword(password);

  await db
    .update(admins)
    .set({
      passwordHash,
      resetTokenHash: null,
      resetTokenExpiresAt: null,
      resetTokenUsedAt: now,
      updatedAt: now,
    })
    .where(eq(admins.id, admin.id));

  // A password reset must sign out anyone still holding an old session.
  await revokeAllAdminSessions(admin.id);

  return true;
}