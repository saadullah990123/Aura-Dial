import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyOrderIdButton } from "@/components/store/copy-order-id-button";
import { WhatsAppIcon } from "@/components/store/brand-icons";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { getStoreSettings } from "@/lib/queries/store";
import { normalizePakistanPhone } from "@/lib/utils/phone";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order placed", robots: { index: false } };

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  if (!/^(?:AD|TV)-\d{6}-[A-Z0-9]{5,8}$/.test(orderNumber)) notFound();

  // Never trust the URL alone: only confirm an order that really exists.
  const [order] = await db
    .select({ id: orders.id })
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);
  if (!order) notFound();

  const settings = await getStoreSettings();
  const whatsappUrl = settings.whatsappPhone
    ? `https://wa.me/${normalizePakistanPhone(settings.whatsappPhone)}?text=${encodeURIComponent(
        `Hello ${settings.storeName}, I just placed order ${orderNumber}.`,
      )}`
    : null;

  const trackUrl = `/track-order?id=${encodeURIComponent(orderNumber)}`;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:py-24">
      <CheckCircle2 className="mx-auto size-14 text-emerald-600" strokeWidth={1.4} />
      <h1 className="mt-5 font-serif text-3xl font-semibold text-ink">Thank you for your order</h1>
      <p className="mt-3 text-sm text-stone-600">
        We&apos;ve received your order. Please keep your order number safe — you&apos;ll need it to
        track your delivery.
      </p>

      {/* ── Order number card ── */}
      <div className="mx-auto mt-8 rounded-xl border border-sand bg-white px-8 py-5 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">Order number</p>
        <p className="mt-1 font-mono text-2xl font-semibold tracking-wider text-ink">{orderNumber}</p>
        <div className="mt-3 flex justify-center">
          <CopyOrderIdButton orderNumber={orderNumber} />
        </div>
      </div>

      {/* ── Save-your-ID alert ── */}
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-left">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
        <div>
          <p className="text-sm font-semibold text-amber-900">Save this Order ID</p>
          <p className="mt-0.5 text-xs leading-5 text-amber-800">
            Copy and save <span className="font-mono font-bold">{orderNumber}</span> — you will need
            it to track your order. Without it you cannot check your delivery status.
          </p>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={trackUrl}
          className="rounded-md bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-gold-deep"
        >
          Track my order
        </Link>
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
          >
            <WhatsAppIcon className="size-4" /> Message us
          </a>
        ) : null}
        <Link
          href="/"
          className="rounded-md px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-600 hover:text-ink"
        >
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
