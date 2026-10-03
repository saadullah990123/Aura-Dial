import { sql } from "drizzle-orm";

import { db } from "@/db";
import { rateLimits } from "@/db/schema";
import { sha256 } from "@/lib/utils/crypto";

type RateLimitOptions = {
  action: "admin_login" | "password_reset" | "order_create" | "order_track";
  identifier: string;
  maxRequests: number;
  windowMs: number;
  blockMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

/**
 * Fixed-window rate limiter backed by Postgres.
 *
 * The whole check-and-count happens in ONE atomic upsert, so simultaneous
 * requests can neither crash on the unique index nor undercount and slip
 * past the limit (the previous read-then-write version could do both).
 */
export async function enforceRateLimit(
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const now = new Date();
  const nowIso = now.toISOString();
  const windowEndIso = new Date(now.getTime() + options.windowMs).toISOString();
  const blockEndIso = new Date(now.getTime() + options.blockMs).toISOString();
  const identifierHash = sha256(options.identifier.trim().toLowerCase());

  const expired = sql`${rateLimits.expiresAt} <= ${nowIso}::timestamptz`;
  const stillBlocked = sql`${rateLimits.blockedUntil} > ${nowIso}::timestamptz`;

  const [row] = await db
    .insert(rateLimits)
    .values({
      action: options.action,
      identifierHash,
      requestCount: 1,
      windowStartedAt: now,
      expiresAt: new Date(windowEndIso),
    })
    .onConflictDoUpdate({
      target: [rateLimits.action, rateLimits.identifierHash],
      set: {
        requestCount: sql`CASE
          WHEN ${expired} THEN 1
          WHEN ${stillBlocked} THEN ${rateLimits.requestCount}
          ELSE ${rateLimits.requestCount} + 1 END`,
        windowStartedAt: sql`CASE WHEN ${expired} THEN ${nowIso}::timestamptz ELSE ${rateLimits.windowStartedAt} END`,
        expiresAt: sql`CASE WHEN ${expired} THEN ${windowEndIso}::timestamptz ELSE ${rateLimits.expiresAt} END`,
        blockedUntil: sql`CASE
          WHEN ${expired} THEN NULL
          WHEN ${stillBlocked} THEN ${rateLimits.blockedUntil}
          WHEN ${rateLimits.requestCount} + 1 > ${options.maxRequests} THEN ${blockEndIso}::timestamptz
          ELSE ${rateLimits.blockedUntil} END`,
        updatedAt: sql`${nowIso}::timestamptz`,
      },
    })
    .returning({ blockedUntil: rateLimits.blockedUntil });

  if (row?.blockedUntil && row.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((row.blockedUntil.getTime() - now.getTime()) / 1000),
      ),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
