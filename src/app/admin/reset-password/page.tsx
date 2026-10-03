import { Suspense } from "react";
import Link from "next/link";

import { ResetPasswordForm } from "@/components/admin/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="font-serif text-3xl text-stone-950">
          Choose a new password
        </h1>

        <div className="mt-7">
          <Suspense fallback={<p className="text-sm text-stone-500">Loading...</p>}>
            <ResetPasswordForm />
          </Suspense>
        </div>

        <Link
          href="/admin/login"
          className="mt-5 inline-block text-sm font-medium text-amber-800 hover:text-amber-950"
        >
          Back to sign in
        </Link>
      </section>
    </main>
  );
}