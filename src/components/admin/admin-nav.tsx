"use client";

import {
  FolderTree,
  LayoutDashboard,
  type LucideIcon,
  Package,
  ScrollText,
  Settings,
  ShoppingBag,
  Star,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", Icon: ShoppingBag },
  { href: "/admin/products", label: "Products", Icon: Package },
  { href: "/admin/categories", label: "Categories", Icon: FolderTree },
  { href: "/admin/reviews", label: "Reviews", Icon: Star },
  { href: "/admin/pages", label: "Pages", Icon: ScrollText },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
  { href: "/admin/account", label: "Account", Icon: UserCog },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {LINKS.map(({ href, label, Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-amber-500/15 text-amber-300"
                : "text-stone-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className="size-4.5" strokeWidth={1.7} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
