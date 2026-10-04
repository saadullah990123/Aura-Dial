"use client";

import { Heart, Home, LayoutGrid, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useWishlistStore } from "@/store/wishlist";

export function MobileBottomNav() {
  const pathname = usePathname();
  const wishlistItems = useWishlistStore((state) => state.items);
  const openWishlist = useWishlistStore((state) => state.open);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlistCount = mounted ? wishlistItems.length : 0;

  const isHome = pathname === "/";
  const isShop = pathname.startsWith("/collections") || pathname.startsWith("/products");
  const isAccount = pathname.startsWith("/track-order") || pathname.startsWith("/admin");

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-white/10 bg-[#120d09]/95 backdrop-blur-md px-3 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="mx-auto flex max-w-md items-center justify-around">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium transition-colors ${isHome ? "text-gold font-semibold" : "text-stone-400 hover:text-stone-200"
            }`}
        >
          <Home className={`size-5 ${isHome ? "text-gold" : ""}`} strokeWidth={isHome ? 2.2 : 1.8} />
          <span>Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/collections/all"
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium transition-colors ${isShop ? "text-gold font-semibold" : "text-stone-400 hover:text-stone-200"
            }`}
        >
          <LayoutGrid className={`size-5 ${isShop ? "text-gold" : ""}`} strokeWidth={isShop ? 2.2 : 1.8} />
          <span>Shop</span>
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          onClick={openWishlist}
          aria-label={`Open Wishlist, ${wishlistCount} items`}
          className="relative flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium text-stone-400 hover:text-stone-200 transition-colors"
        >
          <div className="relative">
            <Heart className="size-5" strokeWidth={1.8} />
            {wishlistCount > 0 ? (
              <span className="absolute -right-2 -top-1.5 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-ink shadow-sm">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            ) : null}
          </div>
          <span>Wishlist</span>
        </button>

        {/* Account / Track Order */}
        <Link
          href="/track-order"
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium transition-colors ${isAccount ? "text-gold font-semibold" : "text-stone-400 hover:text-stone-200"
            }`}
        >
          <User className={`size-5 ${isAccount ? "text-gold" : ""}`} strokeWidth={isAccount ? 2.2 : 1.8} />
          <span>Track Order</span>
        </Link>
      </div>
    </nav>
  );
}
