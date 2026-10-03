/**
 * Adds 20 sample watches and 15 sample glasses (with illustrated placeholder photos)
 * so the storefront and admin have content to work with.
 *
 *   npm run db:sample-products                 -> dry run: checks the data, touches nothing
 *   npm run db:sample-products -- --apply      -> uploads images to YOUR Cloudinary and inserts products
 *
 * Safe to re-run: existing products are skipped, never changed or deleted.
 * Each image is uploaded to your own Cloudinary account (folder time-and-vision/products),
 * so in Admin > Products you can replace the photos, edit, or delete products normally.
 * Deleting a product in the admin also deletes its image from Cloudinary.
 */
import { existsSync, statSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";

import {
  SAMPLE_BRAND,
  SAMPLE_DESCRIPTION,
  SAMPLE_PRODUCTS,
  importProducts,
  validateSamples,
  type ImportDeps,
} from "./sample-products-core";

const IMAGE_DIR = resolve(process.cwd(), "sample-images");
const imagePath = (file: string) => resolve(IMAGE_DIR, file);

async function main() {
  const apply = process.argv.includes("--apply");

  const problems = validateSamples(SAMPLE_PRODUCTS, (file) => existsSync(imagePath(file)));
  if (problems.length) {
    console.error("Sample data problems:\n - " + problems.join("\n - "));
    process.exit(1);
  }

  const watches = SAMPLE_PRODUCTS.filter((p) => p.category === "watches").length;
  const glasses = SAMPLE_PRODUCTS.filter((p) => p.category === "glasses").length;
  const mb = SAMPLE_PRODUCTS.reduce((sum, p) => sum + statSync(imagePath(p.image)).size, 0) / 1_048_576;
  console.log(`Sample data OK: ${watches} watches + ${glasses} glasses, ${mb.toFixed(1)} MB of images.`);

  if (!apply) {
    console.log("\nDry run only. Nothing was uploaded or saved.");
    console.log("To really add them:  npm run db:sample-products -- --apply");
    return;
  }

  const { env } = await import("@/lib/env");
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary is not configured. Fill CLOUDINARY_* in .env.local first (see npm run preflight).");
    process.exit(1);
  }
  const dbHost = new URL(env.DATABASE_URL).host;
  console.log(`\nApplying to database ${dbHost} and Cloudinary account "${env.CLOUDINARY_CLOUD_NAME}"...\n`);

  const [{ db }, schema, { eq }, { cloudinary, CLOUDINARY_PRODUCT_FOLDER }, { destroyImages }] = await Promise.all([
    import("@/db"),
    import("@/db/schema"),
    import("drizzle-orm"),
    import("@/lib/cloudinary/server"),
    import("@/lib/cloudinary/destroy"),
  ]);
  const { categories, products, productImages } = schema;

  const deps: ImportDeps = {
    async ensureCategory(slug, name, sortOrder) {
      const [existing] = await db.select({ id: categories.id }).from(categories).where(eq(categories.slug, slug)).limit(1);
      if (existing) return existing.id;
      const [created] = await db
        .insert(categories)
        .values({ name, slug, isActive: true, sortOrder })
        .returning({ id: categories.id });
      return created.id;
    },
    async productExists(slug) {
      const rows = await db.select({ id: products.id }).from(products).where(eq(products.slug, slug)).limit(1);
      return rows.length > 0;
    },
    async upload(imageFile, publicId) {
      const res = await cloudinary.uploader.upload(imagePath(imageFile), {
        // Full path in the public id (no separate "folder" option): newer Cloudinary accounts
        // don't prepend the folder to the id, and the admin's delete cleanup only removes
        // images whose id starts with "time-and-vision/".
        public_id: `${CLOUDINARY_PRODUCT_FOLDER}/${publicId}`,
        overwrite: false,
        resource_type: "image",
      });
      return { url: res.secure_url, publicId: res.public_id };
    },
    async insert(p, categoryId, image) {
      const id = randomUUID();
      await db.batch([
        db.insert(products).values({
          id,
          name: p.name,
          slug: p.slug,
          categoryId,
          brand:
            typeof (p as Record<string, unknown>).brand === "string"
              ? ((p as Record<string, unknown>).brand as string)
              : SAMPLE_BRAND,
          gender: p.gender as "men" | "women" | "unisex",
          description:
            typeof (p as Record<string, unknown>).description === "string"
              ? ((p as Record<string, unknown>).description as string)
              : SAMPLE_DESCRIPTION,
          price: p.price.toFixed(2),
          salePrice: p.salePrice === null ? null : p.salePrice.toFixed(2),
          stockQuantity: p.stock,
          isFeatured: p.featured,
          isBestseller: p.bestseller,
          isActive: true,
        }),
        db.insert(productImages).values({
          productId: id,
          url: image.url,
          publicId: image.publicId,
          altText: p.name,
          sortOrder: 0,
          isPrimary: true,
        }),
      ]);
    },
    destroyImage: (publicId) => destroyImages([publicId]),
    log: (message) => console.log(message),
  };

  const result = await importProducts(SAMPLE_PRODUCTS, deps);
  console.log(`\nDone. Created ${result.created.length}, skipped ${result.skipped.length}, failed ${result.failed.length}.`);
  if (result.failed.length) {
    console.log("Re-run the same command to retry only the failed ones.");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Sample import failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
