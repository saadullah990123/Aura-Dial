import Link from "next/link";

import { AddToCartButton } from "@/components/store/add-to-cart-button";
import type { ArtTone } from "@/components/store/art";
import { ProductCardImage } from "@/components/store/product-card-image";
import { formatPrice } from "@/lib/format";
import type { StoreProduct } from "@/lib/queries/store";

function placeholderTone(product: StoreProduct): ArtTone {
  if (product.gender === "women") return "rose";
  if (product.gender === "men") return product.categorySlug === "glasses" ? "black" : "silver";
  return "gold";
}

export function ProductCard({
  product,
  rating,
  reviewCount,
}: {
  product: StoreProduct;
  rating?: number | null;
  reviewCount?: number;
}) {
  const isGlasses = product.categorySlug === "glasses";
  const tone = placeholderTone(product);
  const effectivePrice = product.salePrice ?? product.price;
  const onSale = product.salePrice !== null && product.salePrice < product.price;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-sand/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg">
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="relative block w-full overflow-hidden"
      >
        <ProductCardImage
          src={product.imageUrl}
          alt={product.name}
          isGlasses={isGlasses}
          tone={tone}
          onSale={onSale}
          inStock={product.inStock}
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 text-center">
        {/* Brand */}
        {product.brand ? (
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
            {product.brand}
          </p>
        ) : (
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-transparent select-none">
            Aura Dial
          </p>
        )}

        {/* Title: 1-2 lines with line-clamp-2 */}
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] flex items-center justify-center text-sm font-medium leading-snug text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors hover:text-gold-deep"
            title={product.name}
          >
            {product.name}
          </Link>
        </h3>

        {/* Optional Star Rating snippet */}
        {reviewCount && reviewCount > 0 ? (
          <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-stone-500">
            <span className="text-amber-500">★</span>
            <span className="font-semibold text-stone-700">{rating?.toFixed(1) ?? "5.0"}</span>
            <span className="text-stone-400">({reviewCount})</span>
          </div>
        ) : null}

        {/* Price Clean Display */}
        <div className="mt-2.5 flex items-baseline justify-center gap-2">
          {onSale ? (
            <span className="text-xs font-normal text-stone-400 line-through">
              {formatPrice(product.price)}
            </span>
          ) : null}
          <span className="text-sm font-bold text-ink">
            {formatPrice(effectivePrice)}
          </span>
        </div>

        {/* Centered Responsive Button */}
        <div className="mt-auto pt-4 flex w-full justify-center">
          <div className="w-full">
            <AddToCartButton
              productId={product.id}
              name={product.name}
              price={effectivePrice}
              imageUrl={product.imageUrl}
              inStock={product.inStock}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
