import Link from "next/link";

import { ForgotPasswordForm } from "@/components/admin/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="font-serif text-3xl text-stone-950">Reset password</h1>

        <p className="mt-3 text-sm text-stone-600">
          Enter your admin email. If the account exists, reset instructions
          will be sent once email delivery is configured.
        </p>

        <div className="mt-7">
          <ForgotPasswordForm />
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