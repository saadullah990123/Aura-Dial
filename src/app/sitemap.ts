import type { MetadataRoute } from "next";
import { getAllProductSlugs, getPolicyLinks } from "@/lib/queries/store";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aura-dial.vercel.app").replace(/\/$/, "");

  // Safely fetch products and policies
  const [products, policies] = await Promise.all([
    getAllProductSlugs().catch(() => []),
    getPolicyLinks().catch(() => []),
  ]);

  const staticRoutes = [
    "",
    "/collections/all",
    "/collections/watches",
    "/collections/glasses",
    "/about",
    "/contact",
    "/track-order",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const policyRoutes = policies.map((p) => ({
    url: `${base}${p.href}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...policyRoutes, ...productRoutes];
}