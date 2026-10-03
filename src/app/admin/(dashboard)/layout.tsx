import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminNav } from "@/components/admin/admin-nav";
import { LogoutButton } from "@/components/admin/logout-button";
import { getCurrentAdmin } from "@/lib/auth/session";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/session-expired");
  }

  if (admin.role !== "admin") {
    redirect("/forbidden");
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="bg-stone-950 text-stone-100 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex items-center justify-between gap-4 px-4 py-4 lg:block lg:px-5 lg:py-6">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-mark.png" alt="" width={310} height={298} className="h-10 w-auto" />
            <div>
              <p className="font-serif text-xl">Aura Dial</p>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-400">Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:mt-6 lg:flex-col lg:items-stretch">
            <Link
              href="/"
              target="_blank"
              className="rounded-md border border-stone-700 px-3 py-2 text-center text-xs transition hover:border-amber-400 hover:text-amber-300"
            >
              View store
            </Link>
            <LogoutButton />
          </div>
        </div>
        <div className="px-3 pb-3 lg:pb-6">
          <AdminNav />
        </div>
        <p className="hidden truncate px-5 pb-6 text-xs text-stone-500 lg:block">{admin.email}</p>
      </aside>

      <main className="min-w-0 px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
