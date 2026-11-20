import { notFound } from "next/navigation";

import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { ConfirmButton } from "@/components/admin/ui";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { categoryOptions, getAdminProduct } from "@/lib/queries/admin";

import { deleteProductAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminOrRedirect();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const [data, categories] = await Promise.all([getAdminProduct(id), categoryOptions()]);
  if (!data) notFound();
  const { product, images } = data;

  return (
    <>
      <PageHeader
        title="Edit product"
        description={product.name}
        action={
          <form action={deleteProductAction}>
            <input type="hidden" name="id" value={product.id} />
            <ConfirmButton message={`Delete "${product.name}"? This can't be undone.`}>
              Delete product
            </ConfirmButton>
          </form>
        }
      />
      <div className="max-w-3xl">
        <ProductForm
          categories={categories}
          initial={{
            id: product.id,
            name: product.name,
            categoryId: product.categoryId ?? "",
            brand: product.brand ?? "",
            gender: product.gender,
            description: product.description ?? "",
            price: String(Number(product.price)),
            salePrice: product.salePrice === null ? "" : String(Number(product.salePrice)),
            stockQuantity: String(product.stockQuantity),
            isFeatured: product.isFeatured,
            isBestseller: product.isBestseller,
            isActive: product.isActive,
            images: images.map((i) => ({ url: i.url, publicId: i.publicId, alt: i.alt })),
          }}
        />
      </div>
    </>
  );
}
