import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ConfirmButton } from "@/components/admin/ui";
import { PageHeader, Pagination } from "@/components/admin/page-header";
import { formatPrice } from "@/lib/format";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { listAdminProducts, PAGE_SIZE } from "@/lib/queries/admin";

import { deleteProductAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; saved?: string; deleted?: string }>;
}) {
  await requireAdminOrRedirect();
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = sp.q?.trim().slice(0, 80) || undefined;
  const { rows, total } = await listAdminProducts({ q, page });

  return (
    <>
      <PageHeader
        title="Products"
        description={`${total} product${total === 1 ? "" : "s"}`}
        action={
          <Link href="/admin/products/new" className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
            <Plus className="size-4" /> Add product
          </Link>
        }
      />

      {sp.saved ? <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Product saved.</p> : null}
      {sp.deleted ? <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Product deleted.</p> : null}

      <form className="mb-4 flex gap-2" role="search">
        <input name="q" defaultValue={q} placeholder="Search by name or brand" aria-label="Search products"
          className="w-full max-w-sm rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/25" />
        <button className="rounded-lg border border-stone-300 bg-white px-4 text-sm hover:border-amber-600">Search</button>
      </form>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center text-sm text-stone-500">
          {q ? "No products match your search." : "No products yet. Add your first one."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rows.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-md bg-stone-100">
                        {p.imageUrl ? <Image src={p.imageUrl} alt="" fill sizes="44px" className="object-cover" /> : null}
                      </div>
                      <div className="min-w-0">
                        <Link href={`/admin/products/${p.id}`} className="font-medium hover:text-amber-700">{p.name}</Link>
                        {p.brand ? <p className="text-xs text-stone-500">{p.brand}</p> : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{p.categoryName ?? "-"}</td>
                  <td className="px-4 py-3">
                    {formatPrice(Number(p.salePrice ?? p.price))}
                    {p.salePrice ? <span className="ml-1.5 text-xs text-stone-400 line-through">{formatPrice(Number(p.price))}</span> : null}
                  </td>
                  <td className={`px-4 py-3 font-medium ${p.stock === 0 ? "text-red-700" : p.stock <= 3 ? "text-amber-700" : ""}`}>{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.isActive ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"}`}>
                      {p.isActive ? "Live" : "Hidden"}
                    </span>
                    {p.isBestseller ? <span className="ml-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Best seller</span> : null}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/${p.id}`} className="rounded-md px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100">Edit</Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <ConfirmButton message={`Delete "${p.name}"? This can't be undone.`}>Delete</ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} total={total} pageSize={PAGE_SIZE}
        buildHref={(n) => `/admin/products?${new URLSearchParams({ ...(q ? { q } : {}), page: String(n) })}`} />
    </>
  );
}
