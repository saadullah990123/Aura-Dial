"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { WhatsAppIcon } from "@/components/store/brand-icons";
import { formatPrice } from "@/lib/format";
import { normalizePakistanPhone } from "@/lib/utils/phone";
import { useCartStore } from "@/store/cart";

export function ProductPurchase({
  productId,
  name,
  price,
  imageUrl,
  stockQuantity,
  storeName,
  whatsappPhone,
}: {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  stockQuantity: number;
  storeName: string;
  whatsappPhone: string | null;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const max = Math.min(stockQuantity, 10);
  const inStock = stockQuantity > 0;

  const whatsappUrl = whatsappPhone
    ? `https://wa.me/${normalizePakistanPhone(whatsappPhone)}?text=${encodeURIComponent(
        `Hello ${storeName}, I'm interested in: ${name} (${formatPrice(price)}).`,
      )}`
    : null;

  return (
    <div className="space-y-4">
      {inStock ? (
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Quantity
          </span>
          <div className="flex items-center rounded-full border border-sand bg-white">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2.5 text-stone-600 hover:text-ink disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => Math.min(max, q + 1))}
              className="p-2.5 text-stone-600 hover:text-ink disabled:opacity-40"
              disabled={quantity >= max}
            >
              <Plus className="size-4" />
            </button>
          </div>
          {stockQuantity <= 5 ? (
            <span className="text-xs font-medium text-red-700">
              Only {stockQuantity} left
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!inStock}
          onClick={() => addItem({ productId, name, price, imageUrl }, quantity)}
          className="flex-1 rounded-md bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-gold-deep disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
        >
          {inStock ? "Add to Cart" : "Out of stock"}
        </button>
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md border border-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-white"
          >
            <WhatsAppIcon className="size-4" />
            Ask on WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}
