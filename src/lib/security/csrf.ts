import type { NextRequest } from "next/server";

/**
 * Basic CSRF protection for cookie-authenticated JSON endpoints.
 * Browsers always send an Origin header on cross-site POSTs, so the request
 * is accepted only when Origin matches the host the request was made to.
 */
export function assertSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin) {
    // No Origin header: only allow if the browser says it is same-origin.
    return request.headers.get("sec-fetch-site") === "same-origin";
  }

  if (!host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
