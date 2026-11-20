"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";

import type { StoreProduct } from "@/lib/queries/store";
import { useCartStore } from "@/store/cart";

export function ProductCardAddToCartButton({
  product,
  effectivePrice,
}: {
  product: StoreProduct;
  effectivePrice: number;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

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
  );
}
