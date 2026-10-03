import { and, asc, count, desc, eq, ilike, notInArray, or, sql, sum } from "drizzle-orm";

import { db } from "@/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import {
  categories,
  contentPages,
  orderItems,
  orderStatusHistory,
  orders,
  productImages,
  products,
  reviews,
  storeSettings,
} from "@/db/schema";

export const PAGE_SIZE = 20;

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** Which statuses an order may move to from its current one. */
export const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "processing", "cancelled"],
  confirmed: ["processing", "shipped", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "returned", "cancelled"],
  delivered: ["returned"],
  cancelled: [],
  returned: [],
};

/** Escape % and _ so user input can't act as LIKE wildcards. */
function likePattern(input: string): string {
  return `%${input.replace(/[\\%_]/g, "\\$&")}%`;
}

export async function getDashboardData() {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  const startOfToday = sql`(date_trunc('day', now() at time zone 'Asia/Karachi') at time zone 'Asia/Karachi')`;
  const thirtyDaysAgo = sql`now() - interval '30 days'`;

  const [
    [today],
    [pending],
    [revenue],
    [productTotal],
    [pendingReviewsCount],
    lowStock,
    recentOrders,
  ] = await Promise.all([
    db.select({ value: count() }).from(orders).where(sql`${orders.createdAt} >= ${startOfToday}`),
    db.select({ value: count() }).from(orders).where(eq(orders.status, "pending")),
    db
      .select({ value: sum(orders.total) })
      .from(orders)
      .where(
        and(
          sql`${orders.createdAt} >= ${thirtyDaysAgo}`,
          notInArray(orders.status, ["cancelled", "returned"]),
        ),
      ),
    db.select({ value: count() }).from(products).where(eq(products.isActive, true)),
    db.select({ value: count() }).from(reviews).where(eq(reviews.isApproved, false)),
    db
      .select({ id: products.id, name: products.name, stock: products.stockQuantity })
      .from(products)
      .where(and(eq(products.isActive, true), sql`${products.stockQuantity} <= 3`))
      .orderBy(asc(products.stockQuantity), asc(products.name))
      .limit(6),
    db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        customerName: orders.customerName,
        total: orders.total,
        status: orders.status,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(6),
  ]);

  return {
    ordersToday: today?.value ?? 0,
    pendingOrders: pending?.value ?? 0,
    pendingReviews: pendingReviewsCount?.value ?? 0,
    revenue30d: Number(revenue?.value ?? 0),
    activeProducts: productTotal?.value ?? 0,
    lowStock,
    recentOrders,
  };
}

export async function listAdminProducts(input: { q?: string; page: number }) {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  const where = input.q
    ? or(ilike(products.name, likePattern(input.q)), ilike(products.brand, likePattern(input.q)))
    : undefined;

  const [rows, [total]] = await Promise.all([
    db
      .select({
        id: products.id,
        name: products.name,
        brand: products.brand,
        price: products.price,
        salePrice: products.salePrice,
        stock: products.stockQuantity,
        isActive: products.isActive,
        isBestseller: products.isBestseller,
        isFeatured: products.isFeatured,
        categoryName: categories.name,
        imageUrl: sql<string | null>`(
          select ${productImages.url} from ${productImages}
          where ${productImages.productId} = ${products.id}
          order by ${productImages.isPrimary} desc, ${productImages.sortOrder} asc limit 1)`,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(where)
      .orderBy(desc(products.createdAt))
      .limit(PAGE_SIZE)
      .offset((input.page - 1) * PAGE_SIZE),
    db.select({ value: count() }).from(products).where(where),
  ]);

  return { rows, total: total?.value ?? 0 };
}

export async function getAdminProduct(id: string) {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  const [product] = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!product) return null;

  const images = await db
    .select({ url: productImages.url, publicId: productImages.publicId, alt: productImages.altText })
    .from(productImages)
    .where(eq(productImages.productId, id))
    .orderBy(desc(productImages.isPrimary), asc(productImages.sortOrder));

  return { product, images };
}

export async function listAdminCategories() {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      sortOrder: categories.sortOrder,
      isActive: categories.isActive,
      productCount: sql<number>`(select count(*)::int from ${products} where ${products.categoryId} = ${categories.id})`,
    })
    .from(categories)
    .orderBy(asc(categories.sortOrder), asc(categories.name));
}

export async function listAdminOrders(input: { status?: OrderStatus; q?: string; page: number }) {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  const conditions = [];
  if (input.status) conditions.push(eq(orders.status, input.status));
  if (input.q) {
    const pattern = likePattern(input.q);
    conditions.push(
      or(
        ilike(orders.orderNumber, pattern),
        ilike(orders.customerName, pattern),
        ilike(orders.customerPhone, pattern),
      ),
    );
  }
  const where = conditions.length ? and(...conditions) : undefined;

  const [rows, [total], statusCounts] = await Promise.all([
    db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        customerName: orders.customerName,
        customerPhone: orders.customerPhone,
        city: orders.city,
        total: orders.total,
        status: orders.status,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(where)
      .orderBy(desc(orders.createdAt))
      .limit(PAGE_SIZE)
      .offset((input.page - 1) * PAGE_SIZE),
    db.select({ value: count() }).from(orders).where(where),
    db.select({ status: orders.status, value: count() }).from(orders).groupBy(orders.status),
  ]);

  return {
    rows,
    total: total?.value ?? 0,
    statusCounts: Object.fromEntries(statusCounts.map((s) => [s.status, s.value])) as Partial<
      Record<OrderStatus, number>
    >,
  };
}

export async function getAdminOrder(id: string) {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (!order) return null;

  const [items, history] = await Promise.all([
    db.select().from(orderItems).where(eq(orderItems.orderId, id)),
    db
      .select()
      .from(orderStatusHistory)
      .where(eq(orderStatusHistory.orderId, id))
      .orderBy(asc(orderStatusHistory.createdAt)),
  ]);

  return { order, items, history };
}

export async function getAdminSettings() {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  const [row] = await db.select().from(storeSettings).where(eq(storeSettings.key, "main")).limit(1);
  return row ?? null;
}

export async function listAdminPages() {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  return db.select().from(contentPages).orderBy(asc(contentPages.title));
}

export async function getAdminPage(slug: string) {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  const [page] = await db.select().from(contentPages).where(eq(contentPages.slug, slug)).limit(1);
  return page ?? null;
}

export async function categoryOptions() {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  return db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.sortOrder), asc(categories.name));
}


/** Creates the empty, unpublished legal-page drafts if they don't exist yet. */
export async function ensurePolicyDrafts() {
  // Defence in depth: never read admin data unless the caller is a verified admin.
  await requireAdmin();
  const { POLICY_PAGES } = await import("@/lib/policies");
  await db
    .insert(contentPages)
    .values(POLICY_PAGES.map((page) => ({ slug: page.slug, title: page.title, body: "", isPublished: false })))
    .onConflictDoNothing();
}

/* -------------------------------------------------------------------------- */
/* Reviews Management                                                         */
/* -------------------------------------------------------------------------- */

export type AdminReviewRow = {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImageUrl: string | null;
  userName: string;
  rating: number;
  comment: string;
  imageUrl: string | null;
  isApproved: boolean;
  createdAt: Date;
};

export async function listAdminReviews(status?: "pending" | "approved" | "all") {
  await requireAdmin();
  const conditions = [];
  if (status === "pending") {
    conditions.push(eq(reviews.isApproved, false));
  } else if (status === "approved") {
    conditions.push(eq(reviews.isApproved, true));
  }

  const rows = await db
    .select({
      id: reviews.id,
      productId: reviews.productId,
      productName: products.name,
      productSlug: products.slug,
      productImageUrl: sql<string | null>`(
        SELECT url FROM product_images WHERE product_id = ${products.id} ORDER BY is_primary DESC, sort_order ASC LIMIT 1
      )`,
      userName: reviews.userName,
      rating: reviews.rating,
      comment: reviews.comment,
      imageUrl: reviews.imageUrl,
      isApproved: reviews.isApproved,
      createdAt: reviews.createdAt,
    })
    .from(reviews)
    .innerJoin(products, eq(reviews.productId, products.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(reviews.createdAt));

  const [pendingCountRow] = await db
    .select({ count: count() })
    .from(reviews)
    .where(eq(reviews.isApproved, false));

  const [approvedCountRow] = await db
    .select({ count: count() })
    .from(reviews)
    .where(eq(reviews.isApproved, true));

  return {
    reviews: rows,
    counts: {
      pending: Number(pendingCountRow?.count || 0),
      approved: Number(approvedCountRow?.count || 0),
      total: Number(pendingCountRow?.count || 0) + Number(approvedCountRow?.count || 0),
    },
  };
}
