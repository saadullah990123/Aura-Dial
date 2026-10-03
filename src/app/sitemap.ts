import type { MetadataRoute } from "next";

import { getAllProductSlugs, getPolicyLinks } from "@/lib/queries/store";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const [products, policies] = await Promise.all([getAllProductSlugs(), getPolicyLinks()]);

  return [
    "",
    "/collections/all",
    "/collections/watches",
    "/collections/glasses",
    "/about",
    "/contact",
    "/track-order",
  ]
    .map((path) => ({ url: `${base}${path}` }))
    .concat(policies.map((p) => ({ url: `${base}${p.href}` })))
    .concat(
      products.map((p) => ({ url: `${base}/products/${p.slug}` })),
    );
}
