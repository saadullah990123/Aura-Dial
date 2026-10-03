import Link from "next/link";

import { CategoryForm } from "@/components/admin/category-form";
import { PageHeader } from "@/components/admin/page-header";
import { ConfirmButton } from "@/components/admin/ui";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { listAdminCategories } from "@/lib/queries/admin";

import { deleteCategoryAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; saved?: string; deleted?: string; error?: string }>;
}) {
  await requireAdminOrRedirect();
  const sp = await searchParams;
  const rows = await listAdminCategories();
  const editing = sp.edit ? rows.find((r) => r.id === sp.edit) : undefined;

  return (
    <>
      <PageHeader title="Categories" description="Group your products. Watches and Glasses are used across the store and can't be deleted." />

      {sp.saved ? <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Category saved.</p> : null}
      {sp.deleted ? <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Category deleted.</p> : null}
      {sp.error === "protected" ? <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Watches and Glasses are used across the store and can&apos;t be deleted.</p> : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rows.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-stone-500">/{c.slug}</p>
                  </td>
                  <td className="px-4 py-3">{c.productCount}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.isActive ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"}`}>
                      {c.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/categories?edit=${c.id}`} className="rounded-md px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100">Edit</Link>
                      {c.slug === "watches" || c.slug === "glasses" ? null : (
                        <form action={deleteCategoryAction}>
                          <input type="hidden" name="id" value={c.id} />
                          <ConfirmButton message={`Delete "${c.name}"? Its ${c.productCount} product(s) will become uncategorised.`}>Delete</ConfirmButton>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CategoryForm
          key={editing?.id ?? "new"}
          initial={editing ? { id: editing.id, name: editing.name, description: editing.description ?? "", sortOrder: editing.sortOrder, isActive: editing.isActive } : undefined}
        />
      </div>
    </>
  );
}
