"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

/** Tells people when they've lost connection instead of leaving a silently broken page. */
export function ConnectionBanner() {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );

  if (online) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[100] bg-stone-900 px-4 py-3 text-center text-sm text-white shadow-lg"
    >
      You&apos;re offline. Your cart is saved on this device, but orders and changes
      can&apos;t be sent until your connection is back.
    </div>
  );
}
