"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { resolveProductId } from "@/lib/constants/legacy-products";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const MAX_QUANTITY = 10;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (rawItem, quantity = 1) =>
        set((state) => {
          const item = {
            ...rawItem,
            productId: resolveProductId(rawItem.productId),
          };
          const existing = state.items.find(
            (entry) => entry.productId === item.productId,
          );

          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((entry) =>
                entry.productId === item.productId
                  ? {
                      ...entry,
                      quantity: Math.min(entry.quantity + quantity, MAX_QUANTITY),
                    }
                  : entry,
              ),
            };
          }

          return { isOpen: true, items: [...state.items, { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }] };
        }),
      setQuantity: (productId, quantity) =>
        set((state) => {
          const resolvedId = resolveProductId(productId);
          return {
            items:
              quantity <= 0
                ? state.items.filter((entry) => entry.productId !== resolvedId && entry.productId !== productId)
                : state.items.map((entry) =>
                    entry.productId === resolvedId || entry.productId === productId
                      ? { ...entry, quantity: Math.min(quantity, MAX_QUANTITY) }
                      : entry,
                  ),
          };
        }),
      removeItem: (productId) =>
        set((state) => {
          const resolvedId = resolveProductId(productId);
          return {
            items: state.items.filter((entry) => entry.productId !== resolvedId && entry.productId !== productId),
          };
        }),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "tv-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state?.items) {
          state.items = state.items.map((entry) => ({
            ...entry,
            productId: resolveProductId(entry.productId),
          }));
        }
      },
      // Rehydrated on the client after mount to avoid SSR hydration mismatches.
      skipHydration: true,
    },
  ),
);
