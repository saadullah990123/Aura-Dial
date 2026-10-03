import { and, asc, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { cache } from "react";

import type { db as Database } from "@/db";

type Db = typeof Database;

export type StoreSettings = {
  storeName: string;
  primaryPhone: string | null;
  secondaryPhone: string | null;
  whatsappPhone: string | null;
  contactEmail: string | null;
  address: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  deliveryFee: number;
  freeShippingEnabled: boolean;
  freeShippingThreshold: number | null;
  returnWindowDays: number;
  announcementEnabled: boolean;
  announcementText: string | null;
  returnPolicySummary: string | null;
  heroImageUrl: string | null;
};

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  gender: "men" | "women" | "unisex";
  price: number;
  salePrice: number | null;
  inStock: boolean;
  categorySlug: string | null;
  imageUrl: string | null;
};

export type StoreProductDetail = StoreProduct & {
  description: string | null;
  stockQuantity: number;
  images: { url: string; alt: string | null }[];
};

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
};


const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "Aura Dial",
  primaryPhone: null,
  secondaryPhone: null,
  whatsappPhone: null,
  contactEmail: null,
  address: null,
  instagramUrl: null,
  tiktokUrl: null,
  deliveryFee: 350,
  freeShippingEnabled: false,
  freeShippingThreshold: null,
  returnWindowDays: 7,
  announcementEnabled: false,
  announcementText: null,
  returnPolicySummary: null,
  heroImageUrl: null,
};

/**
 * Runs a store query against the database.
 *
 * Errors are logged and then RE-THROWN on purpose. Store pages are cached and rebuilt in the
 * background (ISR); if a rebuild fails, Next.js keeps serving the last good page and retries,
 * whereas returning an empty catalogue here would get cached as the new "good" page and show a
 * blank store. Failing a build the same way also stops an empty store from being deployed.
 */
async function storeQuery<T>(label: string, run: (db: Db) => Promise<T>): Promise<T> {
  try {
    const { db } = await import("@/db");
    return await run(db);
  } catch (error) {
    console.error(`[store] ${label} failed:`, error);
    throw error;
  }
}

export const getStoreSettings = cache(async (): Promise<StoreSettings> => {
  return storeQuery(
    "getStoreSettings",
    async (db) => {
      const { storeSettings } = await import("@/db/schema");
      const rows = await db
        .select()
        .from(storeSettings)
        .where(eq(storeSettings.key, "main"))
        .limit(1);

      const row = rows[0];
      if (!row) return DEFAULT_SETTINGS;

      return {
        storeName: row.storeName,
        primaryPhone: row.primaryPhone,
        secondaryPhone: row.secondaryPhone,
        whatsappPhone: row.whatsappPhone,
        contactEmail: row.contactEmail,
        address: row.address,
        instagramUrl: row.instagramUrl,
        tiktokUrl: row.tiktokUrl,
        deliveryFee: Number(row.deliveryFee),
        freeShippingEnabled: row.freeShippingEnabled,
        freeShippingThreshold:
          row.freeShippingThreshold === null
            ? null
            : Number(row.freeShippingThreshold),
        returnWindowDays: row.returnWindowDays,
        announcementEnabled: row.announcementEnabled,
        announcementText: row.announcementText,
        returnPolicySummary: row.returnPolicySummary,
        heroImageUrl: row.heroImageUrl,
      };
    },
  );
});

export const getCategories = cache(async (): Promise<StoreCategory[]> => {
  return storeQuery(
    "getCategories",
    async (db) => {
      const { categories } = await import("@/db/schema");
      return db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        })
        .from(categories)
        .where(eq(categories.isActive, true))
        .orderBy(asc(categories.sortOrder), asc(categories.name));
    },
  );
});

type ProductFilters = {
  bestsellersOnly?: boolean;
  categorySlug?: string;
  gender?: "men" | "women" | "unisex";
  search?: string;
  limit?: number;
};

export async function getProducts(
  filters: ProductFilters = {},
): Promise<StoreProduct[]> {
  return storeQuery(
    "getProducts",
    async (db) => {
      const { categories, productImages, products } = await import(
        "@/db/schema"
      );

      const conditions = [eq(products.isActive, true)];

      if (filters.bestsellersOnly) {
        conditions.push(eq(products.isBestseller, true));
      }
      if (filters.categorySlug) {
        conditions.push(eq(categories.slug, filters.categorySlug));
      }
      if (filters.gender) {
        // "Men's" also shows unisex items.
        conditions.push(
          or(
            eq(products.gender, filters.gender),
            eq(products.gender, "unisex"),
          )!,
        );
      }
      if (filters.search) {
        const pattern = `%${filters.search.replace(/[%_\\]/g, "\\$&")}%`;
        conditions.push(
          or(ilike(products.name, pattern), ilike(products.brand, pattern))!,
        );
      }

      const rows = await db
        .select({
          id: products.id,
          name: products.name,
          slug: products.slug,
          brand: products.brand,
          gender: products.gender,
          price: products.price,
          salePrice: products.salePrice,
          stockQuantity: products.stockQuantity,
          categorySlug: categories.slug,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(and(...conditions))
        .orderBy(desc(products.createdAt))
        .limit(filters.limit ?? 48);

      if (rows.length === 0) return [];

      const images = await db
        .select({
          productId: productImages.productId,
          url: productImages.url,
        })
        .from(productImages)
        .where(
          inArray(
            productImages.productId,
            rows.map((row) => row.id),
          ),
        )
        .orderBy(desc(productImages.isPrimary), asc(productImages.sortOrder));

      const firstImage = new Map<string, string>();
      for (const image of images) {
        if (!firstImage.has(image.productId)) {
          firstImage.set(image.productId, image.url);
        }
      }

      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        brand: row.brand,
        gender: row.gender,
        price: Number(row.price),
        salePrice: row.salePrice === null ? null : Number(row.salePrice),
        inStock: row.stockQuantity > 0,
        categorySlug: row.categorySlug,
        imageUrl: firstImage.get(row.id) ?? null,
      }));
    },
  );
}

async function fetchProductBySlug(
  slug: string,
): Promise<StoreProductDetail | null> {
  return storeQuery<StoreProductDetail | null>(
    "getProductBySlug",
    async (db) => {
      const { categories, productImages, products } = await import(
        "@/db/schema"
      );

      const rows = await db
        .select({
          id: products.id,
          name: products.name,
          slug: products.slug,
          brand: products.brand,
          gender: products.gender,
          description: products.description,
          price: products.price,
          salePrice: products.salePrice,
          stockQuantity: products.stockQuantity,
          categorySlug: categories.slug,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(and(eq(products.slug, slug), eq(products.isActive, true)))
        .limit(1);

      const row = rows[0];
      if (!row) return null;

      const images = await db
        .select({ url: productImages.url, alt: productImages.altText })
        .from(productImages)
        .where(eq(productImages.productId, row.id))
        .orderBy(desc(productImages.isPrimary), asc(productImages.sortOrder));

      return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        brand: row.brand,
        gender: row.gender,
        description: row.description,
        price: Number(row.price),
        salePrice: row.salePrice === null ? null : Number(row.salePrice),
        stockQuantity: row.stockQuantity,
        inStock: row.stockQuantity > 0,
        categorySlug: row.categorySlug,
        imageUrl: images[0]?.url ?? null,
        images,
      };
    },
  );
}

// React cache: the page and its metadata both ask for the product, but it is read only once.
export const getProductBySlug = cache(fetchProductBySlug);

export async function getRelatedProducts(
  product: Pick<StoreProduct, "id" | "categorySlug">,
  limit = 4,
): Promise<StoreProduct[]> {
  const list = await getProducts({
    categorySlug: product.categorySlug ?? undefined,
    limit: limit + 1,
  });
  return list.filter((entry) => entry.id !== product.id).slice(0, limit);
}

export async function getAllProductSlugs(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  return storeQuery(
    "getAllProductSlugs",
    async (db) => {
      const { products } = await import("@/db/schema");
      return db
        .select({ slug: products.slug, updatedAt: products.updatedAt })
        .from(products)
        .where(eq(products.isActive, true));
    },
  );
}

/**
 * Picks the newest product photo for each homepage tile (category x gender),
 * so the tiles show real photography as soon as products are uploaded.
 */
export async function getCollectionTileImages(): Promise<
  Record<string, string | null>
> {
  const tiles = [
    ["watches", "men"],
    ["watches", "women"],
    ["glasses", "men"],
    ["glasses", "women"],
  ] as const;

  const result: Record<string, string | null> = {};
  await Promise.all(
    tiles.map(async ([category, gender]) => {
      const list = await getProducts({ categorySlug: category, gender, limit: 12 });
      result[`${category}:${gender}`] =
        list.find((entry) => entry.imageUrl)?.imageUrl ?? null;
    }),
  );
  return result;
}

export async function getContentPage(
  slug: string,
): Promise<{ title: string; body: string } | null> {
  return storeQuery<{ title: string; body: string } | null>(
    "getContentPage",
    async (db) => {
      const { contentPages } = await import("@/db/schema");
      const [page] = await db
        .select({ title: contentPages.title, body: contentPages.body })
        .from(contentPages)
        .where(and(eq(contentPages.slug, slug), eq(contentPages.isPublished, true)))
        .limit(1);
      return page ?? null;
    },
  );
}

export async function getPolicyLinks(): Promise<
  { slug: string; title: string; href: string }[]
> {
  const { POLICY_PAGES } = await import("@/lib/policies");
  return storeQuery(
    "getPolicyLinks",
    async (db) => {
      const { contentPages } = await import("@/db/schema");
      const rows = await db
        .select({ slug: contentPages.slug, title: contentPages.title, body: contentPages.body })
        .from(contentPages)
        .where(and(eq(contentPages.isPublished, true), inArray(contentPages.slug, POLICY_PAGES.map((p) => p.slug))));

      // Only pages that really have text are linked; empty ones stay hidden.
      return POLICY_PAGES.filter((policy) =>
        rows.some((row) => row.slug === policy.slug && row.body.trim() !== ""),
      ).map((policy) => ({ slug: policy.slug, title: policy.title, href: `/policies/${policy.slug}` }));
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Reviews & Ratings                                                          */
/* -------------------------------------------------------------------------- */

export type ProductReviewItem = {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  imageUrl: string | null;
  createdAt: Date;
};

export type ProductReviewsSummary = {
  reviews: ProductReviewItem[];
  totalApprovedReviews: number;
  averageRating: number | null;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

export type StorefrontRating = {
  averageRating: number;
  totalReviews: number;
};

export async function getProductReviews(
  productId: string,
): Promise<ProductReviewsSummary> {
  return storeQuery("getProductReviews", async (db) => {
    const { reviews } = await import("@/db/schema");
    const rows = await db
      .select({
        id: reviews.id,
        productId: reviews.productId,
        userName: reviews.userName,
        rating: reviews.rating,
        comment: reviews.comment,
        imageUrl: reviews.imageUrl,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)))
      .orderBy(desc(reviews.createdAt));

    const totalApprovedReviews = rows.length;
    const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;

    for (const r of rows) {
      sum += r.rating;
      const star = Math.max(1, Math.min(5, r.rating)) as 1 | 2 | 3 | 4 | 5;
      distribution[star] = (distribution[star] || 0) + 1;
    }

    const averageRating =
      totalApprovedReviews > 0
        ? Math.round((sum / totalApprovedReviews) * 10) / 10
        : null;

    return {
      reviews: rows,
      totalApprovedReviews,
      averageRating,
      ratingDistribution: distribution,
    };
  });
}

export async function getStorefrontRating(): Promise<StorefrontRating> {
  return storeQuery("getStorefrontRating", async (db) => {
    const { reviews } = await import("@/db/schema");
    const rows = await db
      .select({
        rating: reviews.rating,
      })
      .from(reviews)
      .where(eq(reviews.isApproved, true));

    const totalReviews = rows.length;
    if (totalReviews === 0) {
      return { averageRating: 5.0, totalReviews: 0 };
    }

    const sum = rows.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = Math.round((sum / totalReviews) * 10) / 10;

    return {
      averageRating,
      totalReviews,
    };
  });
}
