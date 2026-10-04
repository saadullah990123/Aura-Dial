"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  productId: string;
  name: string;
  price: number;
  salePrice?: number | null;
  imageUrl: string | null;
  slug: string;
  brand?: string | null;
  categorySlug?: string | null;
  inStock?: boolean;
};

type WishlistState = {
  items: WishlistItem[];
  isOpen: boolean;
  toggleItem: (item: WishlistItem) => boolean;
  hasItem: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleItem: (item: WishlistItem) => {
        const current = get().items;
        const exists = current.some((entry) => entry.productId === item.productId);
        if (exists) {
          set({ items: current.filter((entry) => entry.productId !== item.productId) });
          return false;
        } else {
          set({ items: [item, ...current] });
          return true;
        }
      },
      hasItem: (productId: string) => get().items.some((entry) => entry.productId === productId),
      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.filter((entry) => entry.productId !== productId),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "aura-dial-wishlist",
    },
  ),
);
