import type { MetadataRoute } from "next";
import { getAllProductSlugs, getPolicyLinks } from "@/lib/queries/store";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://auradial.store").replace(/\/$/, "");

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
    changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
    priority: path === "" ? 1.0 : 0.8,
  }));

  const policyRoutes = policies.map((p) => ({
    url: `${base}${p.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...policyRoutes, ...productRoutes];
}