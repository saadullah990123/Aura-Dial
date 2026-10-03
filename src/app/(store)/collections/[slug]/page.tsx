import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductCard } from "@/components/store/product-card";
import { getCategories, getProducts } from "@/lib/queries/store";

type Gender = "men" | "women" | "unisex";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ gender?: string; q?: string }>;
};

const GENDER_LABELS: Record<Gender, string> = {
  men: "Men's",
  women: "Women's",
  unisex: "Unisex",
};

function parseGender(value: string | undefined): Gender | undefined {
  return value === "men" || value === "women" || value === "unisex"
    ? value
    : undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // Resolve the category here so unknown slugs return a real HTTP 404, not a "soft 404".
  if (slug !== "all" && !(await getCategories()).some((entry) => entry.slug === slug)) {
    notFound();
  }
  const title = slug === "all" ? "All Products" : slug.charAt(0).toUpperCase() + slug.slice(1);
  return { title: `${title} | Aura Dial` };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const [{ slug }, { gender: genderParam, q }] = await Promise.all([
    params,
    searchParams,
  ]);

  const categories = await getCategories();
  const category = categories.find((entry) => entry.slug === slug);

  if (slug !== "all" && !category) {
    notFound();
  }

  const gender = parseGender(genderParam);
  const search = q?.trim().slice(0, 80) || undefined;

  const heading = search
    ? `Results for “${search}”`
    : `${gender ? `${GENDER_LABELS[gender]} ` : ""}${category?.name ?? "All Products"}`;

  const filters: { label: string; gender: Gender | undefined }[] = [
    { label: "All", gender: undefined },
    { label: "Men", gender: "men" },
    { label: "Women", gender: "women" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500">
        <Link href="/" className="hover:text-gold-deep">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{category?.name ?? "All Products"}</span>
      </nav>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            {heading}
          </h1>
        </div>

        {!search ? (
          <div className="flex gap-2" role="group" aria-label="Filter by gender">
            {filters.map((filter) => {
              const active = filter.gender === gender;
              const href = filter.gender
                ? `/collections/${slug}?gender=${filter.gender}`
                : `/collections/${slug}`;
              return (
                <Link
                  key={filter.label}
                  href={href}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-sand bg-white text-stone-600 hover:border-gold hover:text-ink"
                  }`}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <Results slug={slug} categorySlug={category?.slug} categoryName={category?.name} gender={gender} search={search} />
      </Suspense>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="mt-8" role="status" aria-busy="true" aria-label="Loading products">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-cream" />
        ))}
      </div>
    </div>
  );
}

/** Streams in after the page shell, so unknown collections can still return a real 404. */
async function Results({
  slug,
  categorySlug,
  categoryName,
  gender,
  search,
}: {
  slug: string;
  categorySlug: string | undefined;
  categoryName: string | undefined;
  gender: Gender | undefined;
  search: string | undefined;
}) {
  const products = await getProducts({ categorySlug, gender, search });
  const category = categoryName ? { name: categoryName } : undefined;

  return (
    <>
      <p className="mt-2 text-sm text-stone-500">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>
      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-sand bg-white px-6 py-14 text-center">
          <p className="font-serif text-xl text-ink">
            {search
              ? `No results for \u201c${search}\u201d`
              : gender
                ? `No ${GENDER_LABELS[gender].toLowerCase()} ${(category?.name ?? "products").toLowerCase()} yet`
                : "Nothing here yet"}
          </p>
          <p className="mt-2 text-sm text-stone-500">
            {search
              ? "Check the spelling, or try a shorter or more general word."
              : "New items are added regularly. Try another filter, or browse everything."}
          </p>

          <form action={`/collections/${slug}`} className="mx-auto mt-6 flex max-w-sm gap-2" role="search">
            <input
              name="q"
              type="search"
              defaultValue={search ?? ""}
              placeholder="Search watches and glasses"
              aria-label="Search products"
              className="w-full rounded-md border border-sand px-4 py-2.5 text-sm focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <button className="rounded-md bg-ink px-5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-gold-deep">Search</button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
            {search || gender ? (
              <Link href={`/collections/${slug}`} className="font-semibold text-gold-deep hover:underline">
                {search ? "Clear search" : "Clear filter"}
              </Link>
            ) : null}
            <Link href="/collections/all" className="font-semibold text-gold-deep hover:underline">Browse everything</Link>
          </div>
        </div>
      )}
    </>
  );
}
