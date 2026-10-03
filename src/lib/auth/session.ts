import crypto from "node:crypto";

import { and, eq, gt, isNull, ne } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cache } from "react";

import { db } from "@/db";
import { adminSessions, admins } from "@/db/schema";
import { env } from "@/lib/env";
import { safeEqual, sha256 } from "@/lib/utils/crypto";
import type { CurrentAdmin } from "@/types/auth";

const SESSION_COOKIE_NAME = "tv_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

type SessionPayload = {
  sessionId: string;
  signature: string;
};

function signSessionId(sessionId: string): string {
  return crypto
    .createHmac("sha256", env.SESSION_SECRET)
    .update(sessionId)
    .digest("hex");
}

function serializeSession(sessionId: string): string {
  const signature = signSessionId(sessionId);
  return `${sessionId}.${signature}`;
}

function parseSessionCookie(cookieValue: string): SessionPayload | null {
  const parts = cookieValue.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [sessionId, signature] = parts;

  if (!sessionId || !signature) {
    return null;
  }

  return { sessionId, signature };
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

export async function createAdminSession(input: {
  adminId: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}): Promise<{ cookieValue: string; expiresAt: Date }> {
  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.insert(adminSessions).values({
    adminId: input.adminId,
    sessionIdHash: sha256(sessionId),
    expiresAt,
    ipHash: input.ipAddress ? sha256(input.ipAddress) : null,
    userAgent: input.userAgent?.slice(0, 1000) ?? null,
  });

  return {
    cookieValue: serializeSession(sessionId),
    expiresAt,
  };
}

export function setAdminSessionCookie(
  response: NextResponse,
  session: { cookieValue: string; expiresAt: Date },
): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: session.cookieValue,
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    expires: session.expiresAt,
    path: "/",
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });
}

export async function revokeCurrentAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return;
  }

  const payload = parseSessionCookie(sessionCookie);

  if (!payload) {
    return;
  }

  await db
    .update(adminSessions)
    .set({
      revokedAt: new Date(),
    })
    .where(eq(adminSessions.sessionIdHash, sha256(payload.sessionId)));
}

/**
 * Returns the signed-in admin, or null. Wrapped in React's per-request cache so the layout,
 * the page and the admin queries can each verify access while sharing ONE database lookup.
 */
export const getCurrentAdmin = cache(async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  const payload = parseSessionCookie(sessionCookie);

  if (!payload) {
    return null;
  }

  const expectedSignature = signSessionId(payload.sessionId);

  if (!safeEqual(payload.signature, expectedSignature)) {
    return null;
  }

  const now = new Date();

  const result = await db
    .select({
      adminId: admins.id,
      email: admins.email,
      name: admins.name,
      role: admins.role,
      isActive: admins.isActive,
      sessionId: adminSessions.id,
      lastSeenAt: adminSessions.lastSeenAt,
    })
    .from(adminSessions)
    .innerJoin(admins, eq(adminSessions.adminId, admins.id))
    .where(
      and(
        eq(adminSessions.sessionIdHash, sha256(payload.sessionId)),
        isNull(adminSessions.revokedAt),
        gt(adminSessions.expiresAt, now),
      ),
    )
    .limit(1);

  const session = result[0];

  if (!session || !session.isActive || session.role !== "admin") {
    return null;
  }

  // Refresh "last seen" at most every 5 minutes, and never let it break the request.
  if (now.getTime() - session.lastSeenAt.getTime() > 5 * 60 * 1000) {
    try {
      await db
        .update(adminSessions)
        .set({ lastSeenAt: now })
        .where(eq(adminSessions.id, session.sessionId));
    } catch (error) {
      console.error("Unable to update session activity:", error);
    }
  }

  return {
    id: session.adminId,
    email: session.email,
    name: session.name,
    role: "admin",
  };
});

/** Signs an admin out everywhere, optionally keeping one session alive. */
export async function revokeAllAdminSessions(
  adminId: string,
  keepSessionCookie?: string,
): Promise<void> {
  const keepHash = keepSessionCookie
    ? (() => {
        const payload = parseSessionCookie(keepSessionCookie);
        return payload ? sha256(payload.sessionId) : null;
      })()
    : null;

  const conditions = [
    eq(adminSessions.adminId, adminId),
    isNull(adminSessions.revokedAt),
  ];
  if (keepHash) conditions.push(ne(adminSessions.sessionIdHash, keepHash));

  await db
    .update(adminSessions)
    .set({ revokedAt: new Date() })
    .where(and(...conditions));
}
