"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { WatchArt } from "@/components/store/art";
import { WhatsAppIcon } from "@/components/store/brand-icons";
import { formatPrice } from "@/lib/format";
import { normalizePakistanPhone } from "@/lib/utils/phone";
import { useCartStore } from "@/store/cart";

/** Restores the saved cart from localStorage once the page is on the client. */
export function CartHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return null;
}

export function CartDrawer({
  storeName,
  whatsappPhone,
}: {
  storeName: string;
  whatsappPhone: string | null;
}) {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

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

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const orderLines = items
    .map(
      (item) =>
        `- ${item.quantity} x ${item.name} (${formatPrice(item.price)})`,
    )
    .join("\n");

  const whatsappUrl = whatsappPhone
    ? `https://wa.me/${normalizePakistanPhone(whatsappPhone)}?text=${encodeURIComponent(
        `Hello ${storeName}, I would like to order:\n${orderLines}\n\nSubtotal: ${formatPrice(subtotal)}`,
      )}`
    : null;

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={close}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-sand px-5 py-4">
          <h2 className="font-serif text-xl text-ink">Your cart</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="rounded-full p-2 text-stone-500 transition hover:bg-sand hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-gold-deep" strokeWidth={1.4} />
            <p className="font-serif text-lg text-ink">Your cart is empty</p>
            <p className="text-sm text-stone-500">
              Add a watch or a pair of glasses to get started.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-sand overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-4">
                  <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cream">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <WatchArt tone="gold" className="h-16 w-auto" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-ink">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-gold-deep">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-sand bg-white">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          className="p-1.5 text-stone-600 hover:text-ink"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-1.5 text-stone-600 hover:text-ink"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.productId)}
                        className="ml-auto rounded-full p-1.5 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-sand bg-white px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">Subtotal</span>
                <span className="font-serif text-xl text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Delivery fee is calculated at checkout. Pay cash on delivery.
              </p>

              <Link
                href="/checkout"
                onClick={close}
                className="flex w-full items-center justify-center rounded-lg bg-gold px-4 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-gold-soft"
              >
                Checkout
              </Link>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-ink px-4 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-white"
                >
                  <WhatsAppIcon className="size-5" />
                  Order on WhatsApp
                </a>
              ) : null}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
