import Link from "next/link";

export default function RootNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4">
      <section className="max-w-md text-center">
        <p className="font-serif text-6xl text-gold-deep">404</p>
        <h1 className="mt-3 font-serif text-2xl text-ink">Page not found</h1>
        <p className="mt-2 text-stone-600">The page you are looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-md bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-gold-deep">Back to home</Link>
          <Link href="/collections/all" className="rounded-md border border-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white">Browse products</Link>
        </div>
      </section>
    </main>
  );
}
