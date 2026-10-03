import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="-mx-6 -mt-6 mb-6 flex justify-center rounded-t-2xl bg-ink py-5 sm:-mx-8 sm:-mt-8">
          <Image src="/brand/logo-full.png" alt="Aura Dial" width={482} height={417} priority className="h-28 w-auto" />
        </div>
        <h1 className="mt-2 text-xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-stone-600">
          Sign in to manage products, orders, categories, and store settings.
        </p>

        <div className="mt-7">
          <Suspense fallback={<p className="text-sm text-stone-500">Loading...</p>}>
            <AdminLoginForm />
          </Suspense>
        </div>

        <Link
          href="/admin/forgot-password"
          className="mt-5 inline-block text-sm font-medium text-amber-800 hover:text-amber-950"
        >
          Forgot password?
        </Link>
      </section>
    </main>
  );
}