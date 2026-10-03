"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function StoreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold text-ink">Something went wrong</h1>
      <p className="mt-3 text-sm text-stone-600">
        We couldn&apos;t load this page. Please try again in a moment.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-gold-deep"
      >
        Try again
      </button>
      <p className="mt-6 text-sm text-stone-500">
        Still stuck?{" "}
        <Link href="/contact" className="font-semibold text-gold-deep hover:underline">Contact us</Link>
        {" "}or{" "}
        <Link href="/" className="font-semibold text-gold-deep hover:underline">go back home</Link>.
      </p>
    </div>
  );
}
