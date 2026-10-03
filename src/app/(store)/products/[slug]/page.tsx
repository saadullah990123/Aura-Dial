import { ChevronRight, RotateCcw, Star, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { ArtTone } from "@/components/store/art";
import { ProductCard } from "@/components/store/product-card";
import { ProductGallery } from "@/components/store/product-gallery";
import { ProductPurchase } from "@/components/store/product-purchase";
import { ProductReviews } from "@/components/store/product-reviews";
import { formatPrice } from "@/lib/format";
import {
  getProductBySlug,
  getProductReviews,
  getRelatedProducts,
  getStoreSettings,
} from "@/lib/queries/store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const description =
    product.description?.slice(0, 160) ??
    `${product.name} at Aura Dial. Cash on delivery across Pakistan.`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.imageUrl ? [product.imageUrl] : undefined,
    },
  };
}

function toneFor(gender: string | null, glasses: boolean): ArtTone {
  if (gender === "women") return "rose";
  if (gender === "men") return glasses ? "black" : "silver";
  return "gold";
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getStoreSettings(),
  ]);
  if (!product) notFound();

  const [related, reviewsSummary] = await Promise.all([
    getRelatedProducts(product),
    getProductReviews(product.id),
  ]);

  const isGlasses = product.categorySlug === "glasses";
  const effectivePrice = product.salePrice ?? product.price;
  const onSale = product.salePrice !== null && product.salePrice < product.price;
  const categoryLabel = isGlasses ? "Glasses" : "Watches";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    image: product.imageUrl ?? undefined,
    description: product.description ?? undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: effectivePrice,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    ...(reviewsSummary.totalApprovedReviews > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewsSummary.averageRating,
            reviewCount: reviewsSummary.totalApprovedReviews,
          },
        }
      : {}),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <script
        type="application/ld+json"
        // JSON.stringify output only; "<" is escaped so it can't close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-stone-500">
        <Link href="/" className="hover:text-ink">Home</Link>
        <ChevronRight className="size-3" />
        <Link href={`/collections/${isGlasses ? "glasses" : "watches"}`} className="hover:text-ink">
          {categoryLabel}
        </Link>
        <ChevronRight className="size-3" />
        <span className="line-clamp-1 text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery
          images={product.images}
          name={product.name}
          isGlasses={isGlasses}
          tone={toneFor(product.gender, isGlasses)}
        />

        <div>
          {product.brand ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
              {product.brand}
            </p>
          ) : null}
          <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {product.name}
          </h1>

          {/* Dynamic Review rating snippet */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-4 ${
                    s <= Math.round(reviewsSummary.averageRating ?? 5)
                      ? "fill-amber-400 text-amber-500"
                      : "fill-stone-100 text-stone-300"
                  }`}
                />
              ))}
            </div>
            {reviewsSummary.totalApprovedReviews > 0 ? (
              <a
                href="#reviews"
                className="text-xs font-medium text-stone-600 transition hover:text-gold-deep"
              >
                <span className="font-semibold text-ink">
                  {reviewsSummary.averageRating?.toFixed(1)}
                </span>{" "}
                ({reviewsSummary.totalApprovedReviews}{" "}
                {reviewsSummary.totalApprovedReviews === 1 ? "review" : "reviews"})
              </a>
            ) : (
              <a
                href="#reviews"
                className="text-xs text-stone-400 transition hover:text-gold-deep"
              >
                No reviews yet • Be the first to review
              </a>
            )}
          </div>

          <p className="mt-4 flex items-baseline gap-3">
            <span className="font-serif text-3xl text-gold-deep">
              {formatPrice(effectivePrice)}
            </span>
            {onSale ? (
              <span className="text-base text-stone-400 line-through">
                {formatPrice(product.price)}
              </span>
            ) : null}
          </p>

          <p className={`mt-2 text-sm font-medium ${product.inStock ? "text-emerald-700" : "text-red-700"}`}>
            {product.inStock ? "In stock" : "Currently out of stock"}
          </p>

          {product.description ? (
            <div className="mt-6 space-y-3 text-sm leading-7 text-stone-600">
              {product.description.split(/\n{2,}/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <div className="mt-8">
            <ProductPurchase
              productId={product.id}
              name={product.name}
              price={effectivePrice}
              imageUrl={product.imageUrl}
              stockQuantity={product.stockQuantity}
              storeName={settings.storeName}
              whatsappPhone={settings.whatsappPhone}
            />
          </div>

          <ul className="mt-8 grid gap-3 border-t border-sand pt-6 text-sm text-stone-600 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <Truck className="size-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
              Cash on delivery
            </li>
            {settings.returnWindowDays > 0 ? (
              <li className="flex items-center gap-2">
                <RotateCcw className="size-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
                {settings.returnWindowDays}-day returns
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {/* Customer Review & Verification System */}
      <ProductReviews
        productId={product.id}
        productName={product.name}
        reviewsSummary={reviewsSummary}
      />

      {related.length > 0 ? (
        <section className="mt-16 border-t border-sand/80 pt-12" aria-labelledby="related">
          <h2 id="related" className="font-serif text-2xl font-semibold text-ink">
            You may also like
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
