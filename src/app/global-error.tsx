"use client";

import { useEffect } from "react";

// Last-resort boundary: renders if the root layout itself fails.
export default function GlobalError({
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
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, textAlign: "center" }}>
          <section style={{ maxWidth: 420 }}>
            <h1 style={{ fontSize: 28 }}>Something went wrong</h1>
            <p style={{ color: "#57534e" }}>We hit an unexpected problem. Please try again.</p>
            <button onClick={reset} style={{ marginTop: 16, padding: "12px 24px", background: "#120d09", color: "#fff", border: 0, borderRadius: 6, cursor: "pointer" }}>
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
