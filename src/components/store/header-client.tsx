"use client";

import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { WhatsAppIcon } from "@/components/store/brand-icons";
import { useCartStore } from "@/store/cart";

type Props = {
  storeName: string;
  whatsappUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
};

const DROPDOWNS = [
  {
    label: "Watches",
    slug: "watches",
    links: [
      { label: "Men's Watches", href: "/collections/watches?gender=men" },
      { label: "Women's Watches", href: "/collections/watches?gender=women" },
      { label: "All Watches", href: "/collections/watches" },
    ],
  },
  {
    label: "Glasses",
    slug: "glasses",
    links: [
      { label: "Men's Glasses", href: "/collections/glasses?gender=men" },
      { label: "Women's Glasses", href: "/collections/glasses?gender=women" },
      { label: "All Glasses", href: "/collections/glasses" },
    ],
  },
];

export function HeaderClient({
  storeName,
  whatsappUrl,
  instagramUrl,
  tiktokUrl,
}: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const openCart = useCartStore((state) => state.open);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchOpen(false);
    setMenuOpen(false);
    router.push(`/collections/all?q=${encodeURIComponent(trimmed)}`);
  }

  // Header shows WhatsApp only — TikTok/Instagram/Facebook live in the Footer
  const socials = whatsappUrl
    ? [{ href: whatsappUrl, label: "WhatsApp", Icon: WhatsAppIcon }]
    : [];

  const linkClass =
    "text-[13px] font-medium tracking-wide text-stone-200 transition hover:text-gold";

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between lg:justify-start gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="-ml-2 rounded-full p-2 text-stone-200 hover:text-gold lg:hidden shrink-0"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 mx-auto lg:mx-0 text-center lg:text-left"
          aria-label={`${storeName} home`}
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={310}
            height={298}
            priority
            sizes="40px"
            className="h-8 sm:h-10 w-auto"
          />
          <span className="flex flex-col leading-none">
            <span className="bg-gradient-to-b from-[#f3d9a4] to-[#c99448] bg-clip-text font-serif text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-transparent">
              Aura Dial
            </span>
            <span className="mt-1 text-[7px] sm:text-[8px] font-medium uppercase tracking-[0.28em] text-stone-400">
              Watches &amp; Glasses
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-8 lg:flex">
          <Link href="/" className={linkClass}>
            Home
          </Link>

          {DROPDOWNS.map((menu) => (
            <div key={menu.slug} className="group relative">
              <Link href={`/collections/${menu.slug}`} className={`${linkClass} inline-flex items-center gap-1`}>
                {menu.label}
                <ChevronDown className="size-3.5 transition group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-1/2 top-full w-48 -translate-x-1/2 pt-4 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="overflow-hidden rounded-lg border border-white/10 bg-ink-soft py-1 shadow-xl">
                  {menu.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block px-4 py-2.5 text-[13px] text-stone-300 transition hover:bg-white/5 hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
          <Link href="/track-order" className={`${linkClass} inline-flex items-center gap-1.5`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5" aria-hidden="true"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            Track Order
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-0">
          <div className="hidden items-center gap-1 sm:flex">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-2 text-stone-300 transition hover:text-gold"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((value) => !value)}
            className="rounded-full p-2 text-stone-300 transition hover:text-gold"
          >
            <Search className="size-[18px]" />
          </button>

          <button
            type="button"
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            onClick={openCart}
            className="relative rounded-full p-2 text-stone-300 transition hover:text-gold"
          >
            <ShoppingBag className="size-[18px]" />
            {itemCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
                {itemCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <form onSubmit={handleSearch} className="border-t border-white/5 bg-ink-soft px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search watches and glasses..."
              aria-label="Search products"
              className="w-full rounded-full border border-white/10 bg-ink px-5 py-2.5 text-sm text-white outline-none placeholder:text-stone-500 focus:border-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-gold-soft"
            >
              Search
            </button>
          </div>
        </form>
      ) : null}

      {menuOpen ? (
        <nav aria-label="Mobile" className="border-t border-white/5 bg-ink-soft px-4 py-4 lg:hidden">
          <ul className="space-y-1 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "Men's Watches", href: "/collections/watches?gender=men" },
              { label: "Women's Watches", href: "/collections/watches?gender=women" },
              { label: "Men's Glasses", href: "/collections/glasses?gender=men" },
              { label: "Women's Glasses", href: "/collections/glasses?gender=women" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Track Order", href: "/track-order" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-stone-200 hover:bg-white/5 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
