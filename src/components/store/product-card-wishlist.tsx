"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

import type { StoreProduct } from "@/lib/queries/store";
import { useWishlistStore } from "@/store/wishlist";

export function ProductCardWishlistButton({
  product,
  effectivePrice,
}: {
  product: StoreProduct;
  effectivePrice: number;
}) {
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) =>
    state.items.some((item) => item.productId === product.id),
  );
  const [heartAnim, setHeartAnim] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
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
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 250);
  };

  return (
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
  );
}
