import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { categories, contentPages, productImages, products, storeSettings } from "@/db/schema";
import sampleCatalog from "./sample-products.json";

async function seed() {
  // NODE_ENV is usually unset when running `tsx`, so a production check alone would
  // never fire. Require an explicit opt-in every time, and never against a live store.
  if (process.env.ALLOW_SEED !== "1") {
    throw new Error(
      "Refusing to seed sample data. This inserts demo content. Only run it on a throw-away " +
        "development database, never your live one. To proceed: ALLOW_SEED=1 npm run db:seed",
    );
  }
  console.log("Seeding Aura Dial database with curated catalog...");

  await db
    .insert(storeSettings)
    .values({
      key: "main",
      storeName: "Aura Dial",
      primaryPhone: "03419200326",
      secondaryPhone: "03115059434",
      whatsappPhone: "03419200326",
      deliveryFee: "350.00",
      freeShippingEnabled: false,
      freeShippingThreshold: null,
      returnWindowDays: 7,
      returnPolicySummary: null,
      announcementEnabled: false,
      contactEmail: null,
      address: null,
    })
    .onConflictDoNothing();

  await db
    .insert(contentPages)
    .values({
      slug: "about",
      title: "About Aura Dial",
      body: "Aura Dial brings together two things people wear every day: watches and glasses. Our collection is chosen for style, comfort and value, from classic timepieces to modern frames.\n\nWe deliver across Pakistan. Questions about a product? Get in touch with us.",
      isPublished: true,
    })
    .onConflictDoNothing();

  const existingWatches = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, "watches"))
    .limit(1);

  const watchesCategory =
    existingWatches[0] ??
    (
      await db
        .insert(categories)
        .values({
          name: "Watches",
          slug: "watches",
          description: "Curated luxury, dress, sports, and casual timepieces for men and women.",
          isActive: true,
          sortOrder: 1,
        })
        .returning()
    )[0];

  const existingGlasses = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, "glasses"))
    .limit(1);

  const glassesCategory =
    existingGlasses[0] ??
    (
      await db
        .insert(categories)
        .values({
          name: "Glasses",
          slug: "glasses",
          description: "Designer sunglasses, optical frames, and blue-light eyewear.",
          isActive: true,
          sortOrder: 2,
        })
        .returning()
    )[0];

  let insertedCount = 0;
  let updatedImagesCount = 0;

  for (const item of sampleCatalog) {
    const categoryId = item.category === "watches" ? watchesCategory.id : glassesCategory.id;

    // Check if product already exists by slug
    const existing = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.slug, item.slug))
      .limit(1);

    let productId = existing[0]?.id;

    if (!productId) {
      productId = randomUUID();
      await db.insert(products).values({
        id: productId,
        name: item.name,
        slug: item.slug,
        categoryId,
        brand: item.brand,
        gender: item.gender as "men" | "women" | "unisex",
        description: item.description,
        price: item.price.toFixed(2),
        salePrice: item.salePrice ? item.salePrice.toFixed(2) : null,
        stockQuantity: item.stock,
        isFeatured: item.featured,
        isBestseller: item.bestseller,
        isActive: true,
      });
      insertedCount++;
    } else {
      // Update details to match rich curated data
      await db
        .update(products)
        .set({
          name: item.name,
          brand: item.brand,
          gender: item.gender as "men" | "women" | "unisex",
          description: item.description,
          price: item.price.toFixed(2),
          salePrice: item.salePrice ? item.salePrice.toFixed(2) : null,
          stockQuantity: item.stock,
          isFeatured: item.featured,
          isBestseller: item.bestseller,
        })
        .where(eq(products.id, productId));
    }

    // Ensure high-quality primary image exists in productImages
    const existingImg = await db
      .select({ id: productImages.id })
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .limit(1);

    if (existingImg.length === 0) {
      await db.insert(productImages).values({
        productId,
        url: item.imageUrl,
        publicId: null,
        altText: item.name,
        sortOrder: 0,
        isPrimary: true,
      });
      updatedImagesCount++;
    }
  }

  const watchCount = sampleCatalog.filter((p) => p.category === "watches").length;
  const glassesCount = sampleCatalog.filter((p) => p.category === "glasses").length;

  console.log(
    `Seed completed successfully!\n` +
      `- Total items in catalog: ${sampleCatalog.length} (${watchCount} watches, ${glassesCount} glasses)\n` +
      `- New products inserted: ${insertedCount}\n` +
      `- Product images configured: ${updatedImagesCount}`,
  );
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });