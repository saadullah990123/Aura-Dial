"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(
  () => import("@/components/store/cart-drawer").then((mod) => mod.CartDrawer),
  { ssr: false },
);

const WishlistDrawer = dynamic(
  () => import("@/components/store/wishlist-drawer").then((mod) => mod.WishlistDrawer),
  { ssr: false },
);

export function StoreDrawers({
  storeName,
  whatsappPhone,
}: {
  storeName: string;
  whatsappPhone: string | null;
}) {
  return (
    <>
      <CartDrawer storeName={storeName} whatsappPhone={whatsappPhone} />
      <WishlistDrawer />
    </>
  );
}
