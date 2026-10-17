"use client";

import { useEffect, useState } from "react";

export function WhatsAppWidget() {
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside aria-label="WhatsApp customer support" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {showTooltip && (
        <div className="relative flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-xl border border-slate-100 transition-all duration-300 dark:bg-slate-900 dark:border-slate-800">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366] animate-pulse" />
          </span>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 sm:text-sm">
              Order via WhatsApp
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Live agent online &amp; ready
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="ml-1 rounded-full p-1 text-base leading-none text-slate-400 transition-colors hover:text-slate-600 focus:outline-none dark:hover:text-slate-200"
            aria-label="Dismiss message"
          >
            &times;
          </button>
        </div>
      )}

      <div className="relative flex items-center justify-center">
        <span className="absolute -inset-1.5 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <a
          href="https://wa.me/923309311327?text=Hi%20Aura%20Dial%2C%20I%20have%20a%20question%20about%20an%20order."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order via WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M12.011 2c-5.506 0-9.989 4.478-9.989 9.984 0 1.76.459 3.477 1.332 4.99L2 22l5.161-1.344c1.464.797 3.116 1.218 4.85 1.218 5.507 0 9.99-4.478 9.99-9.984C22.001 6.478 17.518 2 12.011 2zm0 18.291c-1.488 0-2.946-.4-4.217-1.155l-.302-.18-3.134.817.835-3.048-.198-.314a8.267 8.267 0 0 1-1.266-4.427c0-4.562 3.712-8.274 8.282-8.274 4.568 0 8.28 3.712 8.28 8.274 0 4.562-3.712 8.274-8.28 8.274zm4.536-6.195c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.738-.658-1.237-1.47-1.382-1.718-.145-.248-.015-.382.109-.505.112-.111.248-.29.373-.435.124-.145.166-.248.248-.415.083-.166.042-.311-.021-.435-.062-.124-.56-1.348-.767-1.846-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.248-.871.851-.871 2.074 0 1.223.892 2.404 1.016 2.57.124.166 1.756 2.682 4.254 3.76.594.256 1.058.409 1.42.524.597.19 1.14.163 1.57.099.479-.071 1.468-.6 1.675-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.186-.476-.31z" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
