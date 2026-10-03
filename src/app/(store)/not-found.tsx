import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-serif text-6xl text-gold-deep">404</p>
      <h1 className="mt-3 font-serif text-2xl text-ink">Page not found</h1>
      <p className="mt-2 text-stone-500">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-md bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-gold-deep"
      >
        Back to home
      </Link>
    </div>
  );
}
