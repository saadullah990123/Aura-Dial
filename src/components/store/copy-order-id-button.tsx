"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyOrderIdButton({ orderNumber }: { orderNumber: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback for browsers without clipboard API
      const el = document.createElement("textarea");
      el.value = orderNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy order ID"}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${
        copied
          ? "bg-emerald-100 text-emerald-700"
          : "bg-stone-100 text-stone-600 hover:bg-gold-soft hover:text-ink"
      }`}
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          Copy ID
        </>
      )}
    </button>
  );
}
