import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { isPolicySlug } from "@/lib/policies";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { ensurePolicyDrafts, listAdminPages } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  await requireAdminOrRedirect();
  await ensurePolicyDrafts();
  const pages = await listAdminPages();

  return (
    <>
      <PageHeader title="Pages" description="Edit the text of pages on your store." />
      <p className="mb-4 max-w-2xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Legal pages (Privacy, Terms, Shipping, Returns) start as empty drafts and stay hidden from customers.
        Write them with your own business details, ideally reviewed by a lawyer, then tick Published.
        Published pages are linked in the store footer automatically.
      </p>
      {pages.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center text-sm text-stone-500">
          No editable pages yet. Run <code className="rounded bg-stone-100 px-1.5 py-0.5">npm run db:seed</code> to add the About page.
        </p>
      ) : (
        <ul className="max-w-2xl divide-y divide-stone-100 rounded-xl border border-stone-200 bg-white shadow-sm">
          {pages.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/pages/${p.slug}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-stone-50">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-stone-500">{isPolicySlug(p.slug) ? `/policies/${p.slug}` : `/${p.slug}`}{isPolicySlug(p.slug) && p.body.trim() === "" ? " · empty draft" : ""}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"}`}>
                  {p.isPublished ? "Published" : "Draft"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
