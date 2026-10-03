import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OrderStatusForm } from "@/components/admin/order-status-form";
import { PageHeader, StatusBadge } from "@/components/admin/page-header";
import { formatPrice } from "@/lib/format";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { getAdminOrder, NEXT_STATUSES, type OrderStatus } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminOrRedirect();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const data = await getAdminOrder(id);
  if (!data) notFound();
  const { order, items, history } = data;

  const waText = encodeURIComponent(`Hello ${order.customerName}, this is Aura Dial about your order ${order.orderNumber}.`);

  return (
    <>
      <Link href="/admin/orders" className="mb-4 inline-flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900">
        <ArrowLeft className="size-4" /> All orders
      </Link>
      <PageHeader title={order.orderNumber} description={`Placed ${order.createdAt.toLocaleString("en-PK", { dateStyle: "long", timeStyle: "short" })}`} action={<StatusBadge status={order.status} />} />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <h2 className="border-b border-stone-200 px-5 py-4 font-semibold">Items</h2>
            <ul className="divide-y divide-stone-100 text-sm">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-4 px-5 py-3">
                  <span>{item.quantity} x {item.productName} <span className="text-stone-400">@ {formatPrice(Number(item.unitPrice))}</span></span>
                  <span className="font-medium">{formatPrice(Number(item.lineTotal))}</span>
                </li>
              ))}
              <li className="flex justify-between px-5 py-3 text-stone-600"><span>Subtotal</span><span>{formatPrice(Number(order.subtotal))}</span></li>
              <li className="flex justify-between px-5 py-3 text-stone-600"><span>Delivery</span><span>{formatPrice(Number(order.deliveryFee))}</span></li>
              <li className="flex justify-between px-5 py-3 font-serif text-lg"><span>Total to collect (COD)</span><span>{formatPrice(Number(order.total))}</span></li>
            </ul>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <h2 className="border-b border-stone-200 px-5 py-4 font-semibold">History</h2>
            <ol className="space-y-3 px-5 py-4 text-sm">
              {history.map((h) => (
                <li key={h.id} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <StatusBadge status={h.status} />
                  <span className="text-xs text-stone-500">{h.createdAt.toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</span>
                  {h.note ? <span className="text-stone-600">- {h.note}</span> : null}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-semibold">Customer</h2>
            <dl className="space-y-2 text-sm">
              <div><dt className="text-xs text-stone-500">Name</dt><dd>{order.customerName}</dd></div>
              <div><dt className="text-xs text-stone-500">Phone</dt><dd><a href={`tel:+${order.customerPhone}`} className="text-amber-800 hover:underline">+{order.customerPhone}</a></dd></div>
              {order.customerEmail ? <div><dt className="text-xs text-stone-500">Email</dt><dd>{order.customerEmail}</dd></div> : null}
              <div><dt className="text-xs text-stone-500">Address</dt><dd className="whitespace-pre-line">{order.shippingAddress}, {order.city}</dd></div>
              {order.notes ? <div><dt className="text-xs text-stone-500">Customer note</dt><dd className="whitespace-pre-line">{order.notes}</dd></div> : null}
            </dl>
            <a href={`https://wa.me/${order.customerPhone}?text=${waText}`} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium hover:border-emerald-600 hover:text-emerald-700">
              Message on WhatsApp
            </a>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-semibold">Update status</h2>
            <OrderStatusForm orderId={order.id} options={NEXT_STATUSES[order.status as OrderStatus]} />
          </section>
        </div>
      </div>
    </>
  );
}
