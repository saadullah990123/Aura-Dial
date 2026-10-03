import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ADMIN_ROUTES = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
  "/admin/session-expired",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (pathname.startsWith("/admin") && !isPublicAdminRoute) {
    const sessionCookie = request.cookies.get("tv_admin_session");

    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};