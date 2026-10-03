import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth/session";
import type { CurrentAdmin } from "@/types/auth";

/** For Server Actions and admin pages: returns the admin or redirects to login. */
export async function requireAdminOrRedirect(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/session-expired");
  // Signed in, but not allowed here: 403 page (reveals nothing about what's protected).
  if (admin.role !== "admin") redirect("/forbidden");
  return admin;
}
