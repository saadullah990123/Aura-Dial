"use client";

import { useState } from "react";

import { useOnlineStatus } from "@/hooks/use-online-status";
import { formatPrice } from "@/lib/format";
import { fetchJsonWithTimeout, RequestTimeoutError } from "@/lib/utils/fetch-json";

type TrackResult = {
  orderNumber: string;
  status: string;
  placedAt: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: { name: string; quantity: number; lineTotal: number }[];
  history: { status: string; createdAt: string }[];
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Order received",
  confirmed: "Confirmed",
  processing: "Being prepared",
  shipped: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

const inputClass =
  "w-full rounded-lg border border-sand bg-white px-4 py-3 text-sm text-ink placeholder:text-stone-400 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/30";

export function TrackOrderForm({ defaultOrderNumber }: { defaultOrderNumber?: string }) {
  const online = useOnlineStatus();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { response, body } = await fetchJsonWithTimeout<TrackResult & { error?: string }>("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: data.get("orderNumber"), phone: data.get("phone") }),
      });
      if (response.ok) setResult(body);
      else setError(body.error ?? "Something went wrong. Please try again.");
    } catch (error) {
      setError(
        error instanceof RequestTimeoutError
          ? "This is taking too long. Please check your connection and try again."
          : "Network problem. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-sand bg-white p-5 sm:p-7">
        <div>
          <label htmlFor="orderNumber" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">Order number</label>
          <input
            id="orderNumber"
            name="orderNumber"
            required
            placeholder="AD-260930-AB3XK"
            autoCapitalize="characters"
            defaultValue={defaultOrderNumber ?? ""}
            className={`${inputClass} font-mono uppercase`}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">Phone used for the order</label>
          <input id="phone" name="phone" type="tel" required placeholder="0300 1234567" className={inputClass} />
        </div>
        {error ? <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p> : null}
        <button type="submit" disabled={loading || !online}
          className="w-full rounded-md bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-gold-deep disabled:opacity-70">
          {loading ? "Looking up..." : online ? "Track order" : "Offline"}
        </button>
      </form>

      {result ? (
        <section aria-live="polite" className="space-y-5 rounded-2xl border border-sand bg-white p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-lg font-semibold">{result.orderNumber}</p>
            <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              {STATUS_LABEL[result.status] ?? result.status}
            </span>
          </div>

          <ol className="space-y-3 border-l-2 border-sand pl-5">
            {result.history.map((entry, index) => (
              <li key={`${entry.status}-${index}`} className="relative text-sm">
                <span className="absolute -left-[27px] top-1 size-3 rounded-full bg-gold-deep" />
                <span className="font-medium text-ink">{STATUS_LABEL[entry.status] ?? entry.status}</span>
                <span className="ml-2 text-xs text-stone-500">
                  {new Date(entry.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}
                </span>
              </li>
            ))}
          </ol>

          <ul className="divide-y divide-sand border-t border-sand text-sm">
            {result.items.map((item, i) => (
              <li key={i} className="flex justify-between gap-4 py-2.5">
                <span>{item.quantity} x {item.name}</span>
                <span>{formatPrice(item.lineTotal)}</span>
              </li>
            ))}
            <li className="flex justify-between py-2.5 text-stone-600"><span>Delivery</span><span>{result.deliveryFee === 0 ? "Free" : formatPrice(result.deliveryFee)}</span></li>
            <li className="flex justify-between pt-3 font-serif text-lg text-ink"><span>Total (cash on delivery)</span><span>{formatPrice(result.total)}</span></li>
          </ul>
        </section>
      ) : null}
    </div>
  );
}
