import Link from "next/link";

import { PageHeader, Pagination, StatusBadge } from "@/components/admin/page-header";
import { formatPrice } from "@/lib/format";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { listAdminOrders, ORDER_STATUSES, PAGE_SIZE, type OrderStatus } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  await requireAdminOrRedirect();
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const status = ORDER_STATUSES.find((s) => s === sp.status) as OrderStatus | undefined;
  const q = sp.q?.trim().slice(0, 60) || undefined;

  const { rows, total, statusCounts } = await listAdminOrders({ status, q, page });
  const allCount = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  const href = (s?: string) => `/admin/orders${s ? `?status=${s}` : ""}`;

  return (
    <>
      <PageHeader title="Orders" description="Cash-on-delivery orders from the storefront." />

      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
        {[{ key: undefined, label: "All", n: allCount }, ...ORDER_STATUSES.map((s) => ({ key: s as string | undefined, label: s, n: statusCounts[s] ?? 0 }))].map((tab) => {
          const active = tab.key === status;
          return (
            <Link key={tab.label} href={href(tab.key)} role="tab" aria-selected={active}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize transition ${active ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 bg-white text-stone-700 hover:border-amber-600"}`}>
              {tab.label} <span className="opacity-60">{tab.n}</span>
            </Link>
          );
        })}
      </div>

      <form className="mb-4 flex gap-2" role="search">
        {status ? <input type="hidden" name="status" value={status} /> : null}
        <input name="q" defaultValue={q} placeholder="Order number, name or phone" aria-label="Search orders"
          className="w-full max-w-sm rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/25" />
        <button className="rounded-lg border border-stone-300 bg-white px-4 text-sm hover:border-amber-600">Search</button>
      </form>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center text-sm text-stone-500">
          {q || status ? "No orders match these filters." : "No orders yet."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">City</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Placed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rows.map((o) => (
                <tr key={o.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-mono font-medium text-amber-800 hover:underline">{o.orderNumber}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{o.customerName}</p>
                    <p className="text-xs text-stone-500">{o.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{o.city}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(Number(o.total))}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-xs text-stone-500">{o.createdAt.toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} total={total} pageSize={PAGE_SIZE}
        buildHref={(n) => `/admin/orders?${new URLSearchParams({ ...(status ? { status } : {}), ...(q ? { q } : {}), page: String(n) })}`} />
    </>
  );
}
