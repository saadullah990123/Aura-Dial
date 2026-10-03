"use server";

import { randomUUID } from "node:crypto";

import { and, eq, like, ne } from "drizzle-orm";
import type { BatchItem } from "drizzle-orm/batch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { writeAudit } from "@/lib/audit";
import { destroyImages, isOwnCloudinaryUrl } from "@/lib/cloudinary/destroy";
import { PRODUCT_UPLOAD_PREFIX, verifyNewUploads } from "@/lib/cloudinary/verify";
import { createSlug } from "@/lib/utils/slug";
import { type ActionState, productSchema, zodFieldErrors } from "@/lib/validations/admin";

async function uniqueProductSlug(name: string, excludeId?: string): Promise<string> {
  const base = createSlug(name) || "product";
  const existing = await db
    .select({ slug: products.slug })
    .from(products)
    .where(
      excludeId
        ? and(like(products.slug, `${base}%`), ne(products.id, excludeId))
        : like(products.slug, `${base}%`),
    );
  const taken = new Set(existing.map((row) => row.slug));
  if (!taken.has(base)) return base;
  for (let i = 2; i < 500; i += 1) {
    if (!taken.has(`${base}-${i}`)) return `${base}-${i}`;
  }
  return `${base}-${randomUUID().slice(0, 6)}`;
}

function toImageRows(
  productId: string,
  images: { url: string; publicId?: string | null; alt?: string | null }[],
) {
  return images.map((image, index) => ({
    productId,
    url: image.url,
    publicId: image.publicId ?? null,
    altText: image.alt ?? null,
    sortOrder: index,
    isPrimary: index === 0,
  }));
}

export async function saveProductAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const admin = await requireAdminOrRedirect();

  let images: unknown = [];
  try {
    images = JSON.parse(String(formData.get("images") ?? "[]"));
  } catch {
    return { error: "The image list was invalid. Please re-add your images." };
  }

  const parsed = productSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    categoryId: formData.get("categoryId"),
    brand: formData.get("brand"),
    gender: formData.get("gender"),
    description: formData.get("description"),
    price: formData.get("price"),
    salePrice: formData.get("salePrice"),
    stockQuantity: formData.get("stockQuantity"),
    isFeatured: formData.get("isFeatured") === "on",
    isBestseller: formData.get("isBestseller") === "on",
    isActive: formData.get("isActive") === "on",
    images,
  });

  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: zodFieldErrors(parsed.error) };
  }

  const data = parsed.data;

  if (data.images.some((image) => !isOwnCloudinaryUrl(image.url))) {
    return { error: "One of the images isn't from your Cloudinary account. Remove it and upload again." };
  }

  const values = {
    name: data.name,
    categoryId: data.categoryId,
    brand: data.brand,
    gender: data.gender,
    description: data.description,
    price: data.price.toFixed(2),
    salePrice: data.salePrice === undefined ? null : data.salePrice.toFixed(2),
    stockQuantity: data.stockQuantity,
    isFeatured: data.isFeatured,
    isBestseller: data.isBestseller,
    isActive: data.isActive,
    updatedAt: new Date(),
  };

  try {
    // Safety net: photos are uploaded straight to Cloudinary, so confirm on the server that every
    // NEW photo really is an allowed image under 5 MB before it is saved.
    const knownUrls = new Set<string>();
    if (data.id) {
      const stored = await db
        .select({ url: productImages.url })
        .from(productImages)
        .where(eq(productImages.productId, data.id));
      for (const row of stored) knownUrls.add(row.url);
    }
    const upload = await verifyNewUploads(
      data.images.filter((image) => !knownUrls.has(image.url)),
      PRODUCT_UPLOAD_PREFIX,
    );
    if (!upload.ok) return { error: upload.message };

    if (data.id) {
      const [existing] = await db.select().from(products).where(eq(products.id, data.id)).limit(1);
      if (!existing) return { error: "This product no longer exists." };

      const oldImages = await db
        .select({ publicId: productImages.publicId, url: productImages.url })
        .from(productImages)
        .where(eq(productImages.productId, data.id));

      const updateBatch: [BatchItem<"pg">, ...BatchItem<"pg">[]] = [
        db.update(products).set(values).where(eq(products.id, data.id)),
        db.delete(productImages).where(eq(productImages.productId, data.id)),
      ];
      if (data.images.length) {
        updateBatch.push(db.insert(productImages).values(toImageRows(data.id, data.images)));
      }
      await db.batch(updateBatch);

      const keptUrls = new Set(data.images.map((image) => image.url));
      await destroyImages(oldImages.filter((image) => !keptUrls.has(image.url)).map((image) => image.publicId));

      await writeAudit({ adminId: admin.id, action: "product.update", entityType: "product", entityId: data.id, beforeData: { name: existing.name, price: existing.price, stock: existing.stockQuantity }, afterData: { name: data.name, price: data.price, stock: data.stockQuantity } });
    } else {
      const id = randomUUID();
      const slug = await uniqueProductSlug(data.name);

      const createBatch: [BatchItem<"pg">, ...BatchItem<"pg">[]] = [
        db.insert(products).values({ id, slug, ...values }),
      ];
      if (data.images.length) {
        createBatch.push(db.insert(productImages).values(toImageRows(id, data.images)));
      }
      await db.batch(createBatch);

      await writeAudit({ adminId: admin.id, action: "product.create", entityType: "product", entityId: id, afterData: { name: data.name, price: data.price } });
    }
  } catch (error) {
    console.error("Saving product failed:", error);
    return { error: "We couldn't save this product. Please try again." };
  }

  revalidatePath("/", "layout");
  redirect("/admin/products?saved=1");
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const admin = await requireAdminOrRedirect();
  const id = String(formData.get("id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/products");

  const [existing] = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!existing) redirect("/admin/products");

  const images = await db
    .select({ publicId: productImages.publicId })
    .from(productImages)
    .where(eq(productImages.productId, id));

  // Order lines keep their snapshot (name, price) even after the product is gone.
  await db.delete(products).where(eq(products.id, id));
  await destroyImages(images.map((image) => image.publicId));
  await writeAudit({ adminId: admin.id, action: "product.delete", entityType: "product", entityId: id, beforeData: { name: existing.name } });

  revalidatePath("/", "layout");
  redirect("/admin/products?deleted=1");
}
