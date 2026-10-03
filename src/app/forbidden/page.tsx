import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <h1 className="font-serif text-3xl text-stone-950">Permission denied</h1>

        <p className="mt-3 text-stone-600">
          You do not have permission to access this page.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-stone-950 px-4 py-3 font-medium text-white"
        >
          Return to homepage
        </Link>
      </section>
    </main>
  );
}