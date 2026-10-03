import { PageHeader } from "@/components/admin/page-header";
import { EMPTY_PRODUCT, ProductForm } from "@/components/admin/product-form";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { categoryOptions } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdminOrRedirect();
  const categories = await categoryOptions();
  return (
    <>
      <PageHeader title="Add product" />
      <div className="max-w-3xl">
        <ProductForm initial={EMPTY_PRODUCT} categories={categories} />
      </div>
    </>
  );
}
