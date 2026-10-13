import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { resolve } from "node:path";
import * as schema from "../src/db/schema/index";
import { eq } from "drizzle-orm";

// Load environment variables safely
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("FATAL: DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(databaseUrl);
const db = drizzle(sql, { schema });

export const LOCAL_WATCHES = [
  {
    id: "c0a80101-0001-4000-8000-000000000001",
    name: "FEIWO Royal Blue Dial",
    slug: "feiwo-royal-blue",
    brand: "FEIWO",
    gender: "men" as const,
    price: "14999.00",
    salePrice: "12499.00",
    description: "Exquisite two-tone luxury watch featuring a stunning royal blue sunray dial and high-precision quartz movement.",
    imageUrl: "/images/feiwo-blue-dial-twotone.jpg",
    isBestseller: true,
    isFeatured: false,
    stockQuantity: 50,
  },
  {
    id: "c0a80101-0002-4000-8000-000000000002",
    name: "LED Gold Digital Watch",
    slug: "led-gold-digital",
    brand: "Aura Dial",
    gender: "men" as const,
    price: "8999.00",
    salePrice: null,
    description: "Futuristic digital timepiece encased in radiant gold-finish stainless steel with crisp LED illumination.",
    imageUrl: "/images/led-gold-digital-watch.jpg",
    isBestseller: false,
    isFeatured: false,
    stockQuantity: 50,
  },
  {
    id: "c0a80101-0003-4000-8000-000000000003",
    name: "LED Gold Multi-Angle Edition",
    slug: "led-gold-multi",
    brand: "Aura Dial",
    gender: "men" as const,
    price: "9499.00",
    salePrice: null,
    description: "Signature gold edition digital timepiece with angular geometric styling, custom bracelet, and multi-mode display.",
    imageUrl: "/images/led-gold-digital-collage.jpg",
    isBestseller: false,
    isFeatured: true,
    stockQuantity: 50,
  },
  {
    id: "c0a80101-0004-4000-8000-000000000004",
    name: "Matturi Silver LED 3Time",
    slug: "matturi-silver-led",
    brand: "Matturi",
    gender: "men" as const,
    price: "9999.00",
    salePrice: null,
    description: "Industrial avant-garde silver timepiece with triple-time display and robust stainless steel construction.",
    imageUrl: "/images/matturi-silver-led-watch.jpg",
    isBestseller: false,
    isFeatured: false,
    stockQuantity: 50,
  },
  {
    id: "c0a80101-0005-4000-8000-000000000005",
    name: "Black Dial Gold Accent Classic",
    slug: "black-dial-gold",
    brand: "Aura Dial",
    gender: "men" as const,
    price: "13500.00",
    salePrice: "11499.00",
    description: "Classic luxury analog watch featuring a deep obsidian dial with brushed gold hands and indices.",
    imageUrl: "/images/black-dial-gold-accent.jpg",
    isBestseller: false,
    isFeatured: false,
    stockQuantity: 50,
  },
];

async function seed() {
  console.log("Safe Idempotent Seeding: Showcase Watches...");

  // 1. Resolve watches category safely
  const [existingCat] = await db
    .select()
    .from(schema.categories)
    .where(eq(schema.categories.slug, "watches"))
    .limit(1);

  let categoryId = existingCat?.id;
  if (!categoryId) {
    console.log("Category 'watches' not found. Creating category...");
    const [createdCat] = await db
      .insert(schema.categories)
      .values({
        name: "Watches",
        slug: "watches",
        description: "Curated luxury, dress, sports, and casual timepieces for men and women.",
        isActive: true,
        sortOrder: 1,
      })
      .returning();
    categoryId = createdCat.id;
  }
  console.log(`Using Watches category ID: ${categoryId}`);

  let insertedCount = 0;
  let skippedCount = 0;

  // 2. Insert items idempotently without overwriting any live edits
  for (const item of LOCAL_WATCHES) {
    const [existingById] = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.id, item.id))
      .limit(1);

    const [existingBySlug] = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.slug, item.slug))
      .limit(1);

    const existing = existingById || existingBySlug;

    if (existing) {
      console.log(`[SKIP] Product already exists: "${existing.name}" (id: ${existing.id}, slug: ${existing.slug}). Preserving live data.`);
      skippedCount++;

      // Verify that at least one image exists for this product
      const [existingImage] = await db
        .select()
        .from(schema.productImages)
        .where(eq(schema.productImages.productId, existing.id))
        .limit(1);

      if (!existingImage) {
        console.log(`  -> Adding primary image for "${existing.name}"`);
        await db.insert(schema.productImages).values({
          productId: existing.id,
          url: item.imageUrl,
          altText: existing.name,
          isPrimary: true,
          sortOrder: 0,
        });
      }
      continue;
    }

    console.log(`[INSERT] Inserting: "${item.name}" (id: ${item.id}, slug: ${item.slug})`);
    await db.insert(schema.products).values({
      id: item.id,
      name: item.name,
      slug: item.slug,
      categoryId: categoryId,
      brand: item.brand,
      gender: item.gender,
      description: item.description,
      price: item.price,
      salePrice: item.salePrice,
      stockQuantity: item.stockQuantity,
      isFeatured: item.isFeatured,
      isBestseller: item.isBestseller,
      isActive: true,
    });

    await db.insert(schema.productImages).values({
      productId: item.id,
      url: item.imageUrl,
      altText: item.name,
      isPrimary: true,
      sortOrder: 0,
    });

    insertedCount++;
    console.log(`  -> Successfully inserted "${item.name}"`);
  }

  console.log(`\nSeeding completed safely: ${insertedCount} inserted, ${skippedCount} preserved.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
