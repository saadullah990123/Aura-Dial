import { notFound } from "next/navigation";

import { PageEditForm } from "@/components/admin/page-edit-form";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { getAdminPage } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function EditPagePage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdminOrRedirect();
  const { slug } = await params;
  const page = await getAdminPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader title="Edit page" description={`/${page.slug}`} />
      <div className="max-w-3xl">
        <PageEditForm page={{ slug: page.slug, title: page.title, body: page.body, isPublished: page.isPublished }} />
      </div>
    </>
  );
}
