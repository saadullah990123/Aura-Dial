import Link from "next/link";

import { ClearStaleSession } from "@/components/admin/clear-stale-session";

export default function SessionExpiredPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <ClearStaleSession />
      <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <h1 className="font-serif text-3xl text-stone-950">Session expired</h1>

        <p className="mt-3 text-stone-600">
          Your admin session has expired or is no longer valid. Please sign in
          again.
        </p>

        <Link
          href="/admin/login"
          className="mt-6 inline-flex rounded-lg bg-stone-950 px-4 py-3 font-medium text-white"
        >
          Go to sign in
        </Link>
      </section>
    </main>
  );
}