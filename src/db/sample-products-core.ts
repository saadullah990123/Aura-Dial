import data from "./sample-products.json";

export type SampleProduct = (typeof data)[number];
export const SAMPLE_PRODUCTS: SampleProduct[] = data;

export const SAMPLE_BRAND = "Sample";
export const SAMPLE_DESCRIPTION = "Sample listing: replace this with your real product details.";

export const CATEGORY_DEFS: Record<string, { name: string; sortOrder: number }> = {
  watches: { name: "Watches", sortOrder: 1 },
  glasses: { name: "Glasses", sortOrder: 2 },
};

/** Returns a list of problems; empty means the data is safe to import. */
export function validateSamples(
  products: SampleProduct[],
  imageExists: (file: string) => boolean,
): string[] {
  const problems: string[] = [];
  const slugs = new Set<string>();
  const images = new Set<string>();
  for (const p of products) {
    if (slugs.has(p.slug)) problems.push(`Duplicate slug: ${p.slug}`);
    slugs.add(p.slug);
    if (images.has(p.image)) problems.push(`Image used twice: ${p.image}`);
    images.add(p.image);
    if (!imageExists(p.image)) problems.push(`Missing image file: ${p.image}`);
    if (!CATEGORY_DEFS[p.category]) problems.push(`Unknown category "${p.category}" on ${p.slug}`);
    if (p.salePrice !== null && p.salePrice >= p.price) problems.push(`Sale price must be below price: ${p.slug}`);
    if (p.price <= 0 || p.stock < 0) problems.push(`Bad price/stock: ${p.slug}`);
  }
  return problems;
}

export type ImportDeps = {
  ensureCategory(slug: string, name: string, sortOrder: number): Promise<string>;
  productExists(slug: string): Promise<boolean>;
  upload(imageFile: string, publicId: string): Promise<{ url: string; publicId: string }>;
  insert(product: SampleProduct, categoryId: string, image: { url: string; publicId: string }): Promise<void>;
  destroyImage(publicId: string): Promise<void>;
  log(message: string): void;
};

export type ImportResult = {
  created: string[];
  skipped: string[];
  failed: { slug: string; error: string }[];
};

/**
 * Idempotent: a product whose slug already exists is skipped (nothing uploaded),
 * so re-running after a partial failure only fills in what is missing.
 * Never updates or deletes anything that already exists.
 */
export async function importProducts(products: SampleProduct[], deps: ImportDeps): Promise<ImportResult> {
  const result: ImportResult = { created: [], skipped: [], failed: [] };
  const categoryIds = new Map<string, string>();

  for (const product of products) {
    try {
      if (await deps.productExists(product.slug)) {
        result.skipped.push(product.slug);
        deps.log(`skip    ${product.slug} (already exists)`);
        continue;
      }

      let categoryId = categoryIds.get(product.category);
      if (!categoryId) {
        const def = CATEGORY_DEFS[product.category];
        categoryId = await deps.ensureCategory(product.category, def.name, def.sortOrder);
        categoryIds.set(product.category, categoryId);
      }

      const image = await deps.upload(product.image, product.image.replace(/\.jpg$/, ""));
      try {
        await deps.insert(product, categoryId, image);
      } catch (error) {
        await deps.destroyImage(image.publicId); // don't leave an orphan upload behind
        throw error;
      }
      result.created.push(product.slug);
      deps.log(`created ${product.slug}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.failed.push({ slug: product.slug, error: message });
      deps.log(`FAILED  ${product.slug}: ${message}`);
    }
  }
  return result;
}
