"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { useCartStore } from "@/store/cart";

export function AddToCartButton({
  productId,
  name,
  price,
  imageUrl,
  inStock,
  className = "",
}: {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  inStock: boolean;
  className?: string;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem({ productId, name, price, imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      type="button"
      disabled={!inStock}
      onClick={handleClick}
      aria-label={inStock ? `Add ${name} to cart` : `${name} is out of stock`}
      className={`group/btn relative flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-xs transition-all duration-200 hover:bg-gold-deep hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 ${className}`}
    >
      <ShoppingBag className="size-3.5 shrink-0 transition-transform duration-200 group-hover/btn:scale-110" />
      <span>{added ? "Added to Cart" : inStock ? "Add to Cart" : "Out of stock"}</span>
    </button>
  );
}
