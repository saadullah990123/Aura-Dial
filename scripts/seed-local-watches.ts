import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import * as schema from "../src/db/schema/index";
import { eq } from "drizzle-orm";

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export const LOCAL_WATCHES = [
  {
    id: "c0a80101-0001-4000-8000-000000000001",
    legacyId: "local-watch-feiwo",
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
    legacyId: "local-watch-led-gold",
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
    legacyId: "local-watch-led-col",
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
    legacyId: "local-watch-matturi",
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
    legacyId: "local-watch-black",
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
  console.log("Seeding local showcase watches...");
  
  // Find watches category
  const [cat] = await db
    .select()
    .from(schema.categories)
    .where(eq(schema.categories.slug, "watches"))
    .limit(1);

  const categoryId = cat?.id ?? "379a41ab-bd87-4716-9367-3f41a238cff4";

  for (const item of LOCAL_WATCHES) {
    console.log(`Inserting/Updating product: ${item.name} (${item.id})`);
    
    await db
      .insert(schema.products)
      .values({
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
      })
      .onConflictDoUpdate({
        target: schema.products.id,
        set: {
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
          updatedAt: new Date(),
        },
      });

    // Also insert or update product primary image
    const [existingImage] = await db
      .select()
      .from(schema.productImages)
      .where(eq(schema.productImages.productId, item.id))
      .limit(1);

    if (!existingImage) {
      await db.insert(schema.productImages).values({
        productId: item.id,
        url: item.imageUrl,
        altText: item.name,
        isPrimary: true,
        sortOrder: 0,
      });
    } else {
      await db
        .update(schema.productImages)
        .set({ url: item.imageUrl, altText: item.name, isPrimary: true })
        .where(eq(schema.productImages.id, existingImage.id));
    }
  }

  console.log("Successfully seeded 5 showcase watches!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
