import type { ReactNode } from "react";

import { MobileBottomNav } from "@/components/store/mobile-bottom-nav";
import { SiteFooter } from "@/components/store/site-footer";
import { SiteHeader } from "@/components/store/site-header";
import { WishlistDrawer } from "@/components/store/wishlist-drawer";

// Pages are served from the CDN cache (fast) and rebuilt in the background at most every
// 60 seconds. Every save in the admin (products, categories, settings, pages) and every
// new order also clears the cache immediately via revalidatePath, so changes appear at once.
// Checkout and order pages opt out below because they show per-customer data.
export const revalidate = 60;

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileBottomNav />
      <WishlistDrawer />
    </div>
  );
}
