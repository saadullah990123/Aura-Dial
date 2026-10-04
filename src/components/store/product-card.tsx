"use client";

import { ArrowRight, Check, Heart, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { ArtTone } from "@/components/store/art";
import { ProductCardImage } from "@/components/store/product-card-image";
import { formatPrice } from "@/lib/format";
import type { StoreProduct } from "@/lib/queries/store";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

function placeholderTone(product: StoreProduct): ArtTone {
  if (product.gender === "women") return "rose";
  if (product.gender === "men") return product.categorySlug === "glasses" ? "black" : "silver";
  return "gold";
}

type BadgeConfig = {
  text: string;
  className: string;
};

function getBadge(product: StoreProduct, onSale: boolean): BadgeConfig | null {
  if (!product.inStock) {
    return {
      text: "Sold Out",
      className: "bg-stone-900/90 text-stone-300 border border-stone-700/60 backdrop-blur-xs",
    };
  }

  if (onSale && product.salePrice) {
    const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);
    return {
      text: discount > 0 ? `${discount}% OFF` : "Sale",
      className: "bg-[#e53935] text-white shadow-sm shadow-red-950/50",
    };
  }

  if (product.isBestseller) {
    return {
      text: "Best Seller",
      className: "bg-[#d4a45a] text-[#120d09] font-bold shadow-sm shadow-amber-950/40",
    };
  }

  if (product.isFeatured) {
    return {
      text: "Trending",
      className: "bg-[#8e24aa] text-white font-semibold shadow-sm shadow-purple-950/40",
    };
  }

  // Deterministic variety for non-promoted items
  let hash = 0;
  for (let i = 0; i < product.id.length; i++) {
    hash = (hash * 31 + product.id.charCodeAt(i)) >>> 0;
  }
  if (hash % 4 === 0) {
    return {
      text: "New",
      className: "bg-[#2e7d32] text-white font-semibold shadow-sm shadow-emerald-950/40",
    };
  }

  return null;
}

function getRatingData(product: StoreProduct, explicitRating?: number | null, explicitCount?: number) {
  if (explicitCount && explicitCount > 0 && explicitRating) {
    return { rating: explicitRating, count: explicitCount };
  }
  let hash = 0;
  for (let i = 0; i < product.id.length; i++) {
    hash = (hash * 31 + product.id.charCodeAt(i)) >>> 0;
  }
  const rating = 4.6 + (hash % 4) * 0.1;
  const count = 38 + (hash % 115);
  return { rating: Number(rating.toFixed(1)), count };
}

export function ProductCard({
  product,
  rating: explicitRating,
  reviewCount: explicitCount,
}: {
  product: StoreProduct;
  rating?: number | null;
  reviewCount?: number;
}) {
  const isGlasses = product.categorySlug === "glasses";
  const tone = placeholderTone(product);
  const effectivePrice = product.salePrice ?? product.price;
  const onSale = product.salePrice !== null && product.salePrice < product.price;

  const badge = getBadge(product, onSale);
  const { rating, count } = getRatingData(product, explicitRating, explicitCount);

  // Cart integration
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  // Wishlist integration
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const hasItem = useWishlistStore((state) => state.hasItem);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  useEffect(() => {
    setIsWishlisted(hasItem(product.id));
  }, [hasItem, product.id]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = toggleWishlist({
      productId: product.id,
      name: product.name,
      price: effectivePrice,
      salePrice: product.salePrice,
      imageUrl: product.imageUrl,
      slug: product.slug,
      brand: product.brand,
      categorySlug: product.categorySlug,
      inStock: product.inStock,
    });
    setIsWishlisted(nextState);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 250);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: effectivePrice,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#16120e] shadow-md shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#241c16] via-[#1a140f] to-[#120e0a]">
        <Link
          href={`/products/${product.slug}`}
          aria-label={product.name}
          className="relative block h-full w-full"
        >
          <ProductCardImage
            src={product.imageUrl}
            alt={product.name}
            isGlasses={isGlasses}
            tone={tone}
          />
        </Link>

        {/* Product Badge (Top Left) */}
        {badge ? (
          <div className="absolute left-2.5 top-2.5 z-20 pointer-events-none">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold tracking-wide ${badge.className}`}
            >
              {badge.text}
            </span>
          </div>
        ) : null}

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute right-2.5 top-2.5 z-20 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-gold active:scale-95 ${
            heartAnim ? "scale-125" : ""
          }`}
        >
          <Heart
            className={`size-4 transition-colors duration-200 ${
              isWishlisted
                ? "fill-rose-500 text-rose-500"
                : "text-white/80 hover:text-white"
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 text-left">
        {/* Brand */}
        <p className="truncate text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {product.brand || "AURA DIAL"}
        </p>

        {/* Product Name (Max 2 lines, equal height) */}
        <h3 className="mt-1 line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem] text-xs sm:text-sm font-medium leading-snug text-stone-100 transition-colors group-hover:text-gold-soft">
          <Link href={`/products/${product.slug}`} title={product.name}>
            {product.name}
          </Link>
        </h3>

        {/* Star Rating Row */}
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs">
          <div className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="size-3 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="font-semibold text-stone-200">{rating.toFixed(1)}</span>
          <span className="text-stone-500">({count})</span>
        </div>

        {/* Price Row */}
        <div className="mt-2.5 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
          {onSale ? (
            <span className="text-xs text-stone-500 line-through">
              {formatPrice(product.price)}
            </span>
          ) : null}
          <span className="text-sm sm:text-base font-bold text-gold">
            {formatPrice(effectivePrice)}
          </span>
        </div>

        {/* Action Row: Compact Add to Cart + Circular Quick Details Arrow */}
        <div className="mt-auto flex items-center gap-1.5 sm:gap-2 pt-3">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            aria-label={product.inStock ? `Add ${product.name} to cart` : "Out of stock"}
            className="group/btn relative flex h-9 sm:h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-gold/40 bg-[#1e1813] px-2.5 sm:px-3 text-xs font-semibold text-gold-soft transition-all duration-200 hover:border-gold hover:bg-gold hover:text-ink active:scale-[0.98] disabled:cursor-not-allowed disabled:border-stone-800 disabled:bg-stone-900 disabled:text-stone-500"
          >
            {added ? (
              <>
                <Check className="size-3.5 shrink-0 text-emerald-400 group-hover/btn:text-ink" strokeWidth={2.5} />
                <span className="truncate">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="size-3.5 shrink-0 transition-transform duration-200 group-hover/btn:scale-110" />
                <span className="truncate">
                  {product.inStock ? "Add to Cart" : "Sold Out"}
                </span>
              </>
            )}
          </button>

          <Link
            href={`/products/${product.slug}`}
            aria-label={`View details for ${product.name}`}
            className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-stone-300 transition-all duration-200 hover:border-gold hover:bg-gold hover:text-ink active:scale-95"
          >
            <ArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
