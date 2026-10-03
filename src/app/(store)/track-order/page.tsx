import type { Metadata } from "next";

import { TrackOrderForm } from "@/components/store/track-order-form";

export const metadata: Metadata = { title: "Track your order" };

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const defaultOrderNumber = id ? decodeURIComponent(id).toUpperCase() : undefined;

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">Order status</p>
      <h1 className="mb-2 mt-1 font-serif text-3xl font-semibold text-ink">Track your order</h1>
      <p className="mb-8 text-sm text-stone-600">Enter your order number and the phone number you used at checkout.</p>
      <TrackOrderForm defaultOrderNumber={defaultOrderNumber} />
    </div>
  );
}
