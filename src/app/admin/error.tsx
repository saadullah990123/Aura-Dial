"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The real error stays in the server logs; only a generic message is shown.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-serif text-2xl text-stone-950">Something went wrong</h1>
      <p className="mt-2 text-sm text-stone-600">
        This page couldn&apos;t load. Your data is safe. Try again, or go back to the dashboard.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={reset} className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">Try again</button>
        <a href="/admin" className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium hover:border-amber-600">Dashboard</a>
      </div>
    </div>
  );
}
