import { AlertTriangle, Banknote, CalendarDays, Clock, Package, Star } from "lucide-react";
import Link from "next/link";

import { PageHeader, StatusBadge } from "@/components/admin/page-header";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { getDashboardData } from "@/lib/queries/admin";
import { formatPrice } from "@/lib/format";

// Reads live data, so it must never be prerendered at build time.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdminOrRedirect();
  const data = await getDashboardData().catch((error) => {
    console.error("Dashboard failed:", error);
    return null;
  });

  if (!data) {
    return (
      <>
        <PageHeader title="Dashboard" />
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Couldn&apos;t load dashboard data. Check your database connection.
        </p>
      </>
    );
  }

  const stats = [
    { label: "Orders today", value: String(data.ordersToday), Icon: CalendarDays },
    { label: "Pending orders", value: String(data.pendingOrders), Icon: Clock, href: "/admin/orders?status=pending" },
    { label: "Pending reviews", value: String(data.pendingReviews), Icon: Star, href: "/admin/reviews" },
    { label: "Revenue (30 days)", value: formatPrice(data.revenue30d), Icon: Banknote },
    { label: "Active products", value: String(data.activeProducts), Icon: Package, href: "/admin/products" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="A quick look at how the store is doing." />

      {data.pendingReviews > 0 ? (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-300 bg-amber-50 p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-amber-600 text-white">
              <Star className="size-5 fill-white" />
            </span>
            <div>
              <p className="text-sm font-semibold text-amber-950">
                {data.pendingReviews} customer review{data.pendingReviews === 1 ? "" : "s"} awaiting moderation
              </p>
              <p className="text-xs text-amber-800">
                Review and approve customer ratings and photos before they appear on the storefront.
              </p>
            </div>
          </div>
          <Link
            href="/admin/reviews"
            className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-xs transition hover:bg-amber-700"
          >
            Moderate Reviews
          </Link>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ label, value, Icon, href }) => {
          const body = (
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-amber-500">
              <div className="flex items-center justify-between text-stone-500">
                <p className="text-sm">{label}</p>
                <Icon className="size-4.5" strokeWidth={1.6} />
              </div>
              <p className="mt-2 font-serif text-3xl text-stone-950">{value}</p>
            </div>
          );
          return href ? <Link key={label} href={href}>{body}</Link> : <div key={label}>{body}</div>;
        })}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <h2 className="font-semibold">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm text-amber-700 hover:underline">View all</Link>
          </div>
          {data.recentOrders.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-stone-500">No orders yet. They&apos;ll show up here.</p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {data.recentOrders.map((order) => (
                <li key={order.id}>
                  <Link href={`/admin/orders/${order.id}`} className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-stone-50">
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-medium">{order.orderNumber}</p>
                      <p className="truncate text-xs text-stone-500">{order.customerName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">{formatPrice(Number(order.total))}</span>
                      <StatusBadge status={order.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-200 px-5 py-4">
            <AlertTriangle className="size-4 text-amber-600" />
            <h2 className="font-semibold">Low stock</h2>
          </div>
          {data.lowStock.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-stone-500">Everything is well stocked.</p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {data.lowStock.map((item) => (
                <li key={item.id}>
                  <Link href={`/admin/products/${item.id}`} className="flex items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-stone-50">
                    <span className="truncate">{item.name}</span>
                    <span className={`shrink-0 font-semibold ${item.stock === 0 ? "text-red-700" : "text-amber-700"}`}>
                      {item.stock === 0 ? "Sold out" : `${item.stock} left`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
