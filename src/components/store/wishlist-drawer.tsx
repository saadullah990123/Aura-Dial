"use client";

import { ArrowRight, Heart, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export function WishlistDrawer() {
  const items = useWishlistStore((state) => state.items);
  const isOpen = useWishlistStore((state) => state.isOpen);
  const close = useWishlistStore((state) => state.close);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clear = useWishlistStore((state) => state.clear);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex h-full w-full max-w-md flex-col bg-[#14100c] border-l border-white/10 text-stone-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Heart className="size-5 fill-rose-500 text-rose-500" />
            <h2 id="wishlist-title" className="font-serif text-lg font-semibold text-white">
              My Wishlist
            </h2>
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
              {items.length}
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close wishlist"
            className="rounded-full p-2 text-stone-400 hover:bg-white/5 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-white/5 border border-white/10 text-stone-400">
              <Heart className="size-8 stroke-[1.4]" />
            </div>
            <p className="mt-4 font-serif text-xl font-medium text-white">Your wishlist is empty</p>
            <p className="mt-1.5 max-w-xs text-sm text-stone-400">
              Save your favorite luxury watches and glasses to view them anytime.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-gold-soft"
            >
              Start Exploring
              <ArrowRight className="size-4" />
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-white/5 overflow-y-auto px-5 py-2">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-4">
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={close}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#1e1813]"
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-stone-500">
                        Aura Dial
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      {item.brand ? (
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                          {item.brand}
                        </p>
                      ) : null}
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={close}
                        className="line-clamp-1 font-medium text-sm text-white hover:text-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm font-bold text-gold">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart({
                            productId: item.productId,
                            name: item.name,
                            price: item.price,
                            imageUrl: item.imageUrl,
                          });
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold hover:text-ink active:scale-95"
                      >
                        <ShoppingBag className="size-3" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remove ${item.name} from wishlist`}
                        className="rounded-lg p-1.5 text-stone-400 hover:bg-white/5 hover:text-rose-400"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-white/10 p-5 bg-[#0e0a07]">
              <button
                type="button"
                onClick={clear}
                className="w-full text-center text-xs text-stone-400 hover:text-rose-400 transition-colors"
              >
                Clear all wishlist items
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
