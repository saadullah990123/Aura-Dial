import { ArrowRight, Glasses, Headphones, RotateCcw, ShieldCheck, Star, Truck, Watch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/store/add-to-cart-button";

import { GlassesArt, HeroArt, WatchArt, type ArtTone } from "@/components/store/art";
import { ProductCard } from "@/components/store/product-card";
import { ProductCarousel } from "@/components/store/product-carousel";
import { formatPrice } from "@/lib/format";
import {
  getCollectionTileImages,
  getProducts,
  getStorefrontRating,
  getStoreSettings,
} from "@/lib/queries/store";

const CATEGORY_CARDS: {
  label: string;
  tagline: string;
  href: string;
  tile: string;
  kind: "watch" | "glasses";
  tone: ArtTone;
  bg: string;
}[] = [
  {
    label: "Men's Watches",
    tagline: "Bold • Classic • Timeless",
    href: "/collections/watches?gender=men",
    tile: "watches:men",
    kind: "watch",
    tone: "black",
    bg: "from-[#3a2b1c] via-[#22180f] to-[#100b07]",
  },
  {
    label: "Women's Watches",
    tagline: "Elegant • Graceful • Stylish",
    href: "/collections/watches?gender=women",
    tile: "watches:women",
    kind: "watch",
    tone: "rose",
    bg: "from-[#8a6a55] via-[#5c4535] to-[#2a1f17]",
  },
  {
    label: "Men's Glasses",
    tagline: "Modern • Sharp • Confident",
    href: "/collections/glasses?gender=men",
    tile: "glasses:men",
    kind: "glasses",
    tone: "black",
    bg: "from-[#4b3a2a] via-[#2b2016] to-[#120d09]",
  },
  {
    label: "Women's Glasses",
    tagline: "Trendy • Chic • Iconic",
    href: "/collections/glasses?gender=women",
    tile: "glasses:women",
    kind: "glasses",
    tone: "rose",
    bg: "from-[#a67c62] via-[#6d4d3a] to-[#33241b]",
  },
];

// Card width inside a carousel: 1.5 cards on phones, 2 on tablets, 4 on desktop (gap-5 = 1.25rem).
const CAROUSEL_ITEM_CLASS =
  "w-[68%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]";

const CAROUSEL_SECTIONS = [
  { slug: "watches", eyebrow: "Timepieces", title: "Watches" },
  { slug: "glasses", eyebrow: "Eyewear", title: "Glasses" },
] as const;

export default async function HomePage() {
  const [settings, bestSellers, tileImages, watches, glasses, storefrontRating] =
    await Promise.all([
      getStoreSettings(),
      getProducts({ bestsellersOnly: true, limit: 4 }),
      getCollectionTileImages(),
      getProducts({ categorySlug: "watches", limit: 12 }),
      getProducts({ categorySlug: "glasses", limit: 12 }),
      getStorefrontRating(),
    ]);
  const carouselProducts = { watches, glasses };

  const shipping = settings.freeShippingEnabled
    ? {
        title: "Free Shipping",
        text: settings.freeShippingThreshold
          ? `On orders above ${formatPrice(settings.freeShippingThreshold)}`
          : "On all orders",
      }
    : {
        title: "Nationwide Delivery",
        text: `Flat ${formatPrice(settings.deliveryFee)} across Pakistan`,
      };

  const features = [
    {
      Icon: Star,
      title: `${storefrontRating.averageRating.toFixed(1)} / 5.0 Rating`,
      text:
        storefrontRating.totalReviews > 0
          ? `Based on ${storefrontRating.totalReviews} verified review${
              storefrontRating.totalReviews === 1 ? "" : "s"
            }`
          : "Verified customer reviews",
    },
    { Icon: Truck, ...shipping },
    { Icon: ShieldCheck, title: "Authentic Quality", text: "100% verified luxury dials" },
    settings.returnWindowDays > 0
      ? {
          Icon: RotateCcw,
          title: "Easy Returns",
          text: `${settings.returnWindowDays}-day return window`,
        }
      : { Icon: Headphones, title: "Need Help?", text: "Contact us any time" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(217,172,98,0.22),transparent_55%),linear-gradient(180deg,#1b1410_0%,#0f0b08_100%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8 py-10 md:grid-cols-2 md:py-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              <span>★</span>
              <span>
                {storefrontRating.totalReviews > 0
                  ? `${storefrontRating.averageRating.toFixed(1)}/5 Rating • Verified Store`
                  : "Premium Curated Collection"}
              </span>
            </div>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Watches &amp; Glasses
            </h1>
            <p className="mt-2 font-serif text-3xl italic text-gold sm:text-4xl">
              For Every Style
            </p>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-5 text-sm leading-relaxed text-stone-300 sm:text-base">
              Timeless watches and glasses for every style. Delivered nationwide with cash on delivery across Pakistan.
            </p>
            <Link
              href="/collections/all"
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-gold-soft px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-lg shadow-gold/10 transition-all duration-200 hover:bg-gold hover:shadow-gold/25"
            >
              Shop Now
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {settings.heroImageUrl || "/images/univers-point-slim-stand.jpg" ? (
            <div className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[340px] md:h-[400px]">
              <Image
                src={settings.heroImageUrl || "/images/univers-point-slim-stand.jpg"}
                alt="Aura Dial featured watches and glasses"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <HeroArt className="relative h-[240px] sm:h-[300px] md:h-[330px]" />
          )}
        </div>
      </section>

      {/* Quick Category Bar - Matches Mobile Reference UI */}
      <section className="bg-ink border-b border-white/5 px-3.5 py-4 sm:px-6" aria-label="Quick category selector">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { label: "Watches", href: "/collections/watches", icon: Watch, active: true },
            { label: "Glasses", href: "/collections/glasses", icon: Glasses, active: false },
            { label: "Men's", href: "/collections/all?gender=men", symbol: "♂", active: false },
            { label: "Women's", href: "/collections/all?gender=women", symbol: "♀", active: false },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className={`group flex flex-col items-center justify-center rounded-2xl border p-2.5 sm:p-3.5 text-center transition-all duration-200 ${
                  cat.active
                    ? "border-gold/60 bg-[#1e1711] text-gold shadow-md shadow-amber-950/20"
                    : "border-white/10 bg-[#16120e] text-stone-300 hover:border-gold/40 hover:text-gold"
                }`}
              >
                <div className="flex size-7 sm:size-8 items-center justify-center">
                  {Icon ? (
                    <Icon className="size-4.5 sm:size-5 transition-transform group-hover:scale-110" />
                  ) : (
                    <span className="text-base sm:text-lg font-bold leading-none">{cat.symbol}</span>
                  )}
                </div>
                <span className="mt-1 text-[11px] sm:text-xs font-medium tracking-wide">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Category cards */}
      <section className="bg-[#0e0a07] px-4 py-7 sm:px-6 sm:py-10 lg:px-8" aria-label="Shop by category">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-[14px] gap-y-[16px] min-[320px]:gap-x-[10px] min-[320px]:gap-y-[12px] sm:gap-4 lg:grid-cols-4">
          {CATEGORY_CARDS.map((card) => {
            const cardImg =
              tileImages[card.tile] ||
              (card.label === "Men's Watches" ? "/images/univers-point-slim-stand.jpg" : null);

            return (
              <Link
                key={card.label}
                href={card.href}
                className={`group relative flex aspect-[4/3.4] flex-col justify-end overflow-hidden rounded-[16px] border border-white/15 bg-gradient-to-br ${card.bg} shadow-xl shadow-black/50 ring-1 ring-inset ring-white/5`}
              >
                {cardImg ? (
                  <Image
                    src={cardImg}
                    alt={card.label}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover opacity-90 transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-x-0 top-0 flex h-[68%] items-center justify-center">
                    {card.kind === "watch" ? (
                      <WatchArt tone={card.tone} className="h-[92%] w-auto transition duration-500 group-hover:scale-105" />
                    ) : (
                      <GlassesArt tone={card.tone} className="w-[62%] transition duration-500 group-hover:scale-105" />
                    )}
                  </div>
                )}

              <div className="relative flex items-end justify-between bg-gradient-to-t from-black/85 via-black/55 to-transparent px-4 pb-3.5 pt-8">
                <div>
                  <h2 className="font-serif text-base font-semibold text-white sm:text-lg">
                    {card.label}
                  </h2>
                  <p className="mt-0.5 hidden text-[10px] tracking-wide text-stone-300 sm:block sm:text-[11px]">
                    {card.tagline}
                  </p>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      {/* Features & Ratings Trust Bar */}
      <section className="border-b border-sand/60 bg-paper px-4 sm:px-6 lg:px-8 py-8" aria-label="Store benefits">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
          {features.map(({ Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold-deep">
                <Icon className="size-5.5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{title}</p>
                <p className="truncate text-xs text-stone-500">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured Products / Best Sellers */}
      <section className="bg-cream px-4 sm:px-6 lg:px-8 py-14" aria-labelledby="best-sellers">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                Featured Products
              </p>
              <h2 id="best-sellers" className="mt-1 font-serif text-3xl font-semibold text-ink">
                Our Best Sellers
              </h2>
            </div>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink transition hover:text-gold-deep"
            >
              View All <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {bestSellers.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-xl border border-dashed border-sand bg-white/60 px-6 py-12 text-center text-sm text-stone-500">
              Our best sellers will appear here soon.
            </p>
          )}
        </div>
      </section>

      {/* Men's Watches — Local product showcase */}
      <section className="bg-paper px-4 sm:px-6 lg:px-8 py-14" aria-labelledby="mens-watches-gallery">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                Timepieces
              </p>
              <h2 id="mens-watches-gallery" className="mt-1 font-serif text-3xl font-semibold text-ink">
                Men's Watches
              </h2>
            </div>
            <Link
              href="/collections/watches?gender=men"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink transition hover:text-gold-deep"
            >
              View All <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[
              { id: "c0a80101-0001-4000-8000-000000000001", imageUrl: "/images/feiwo-blue-dial-twotone.jpg",  name: "FEIWO Royal Blue Dial",           price: 14999, salePrice: 12499, slug: "feiwo-royal-blue", brand: "FEIWO", gender: "men" as const, inStock: true, categorySlug: "watches", isBestseller: true },
              { id: "c0a80101-0002-4000-8000-000000000002", imageUrl: "/images/led-gold-digital-watch.jpg",   name: "LED Gold Digital Watch",          price: 8999,  salePrice: null, slug: "led-gold-digital", brand: "Aura Dial", gender: "men" as const, inStock: true, categorySlug: "watches" },
              { id: "c0a80101-0003-4000-8000-000000000003", imageUrl: "/images/led-gold-digital-collage.jpg", name: "LED Gold Multi-Angle Edition",   price: 9499,  salePrice: null, slug: "led-gold-multi", brand: "Aura Dial", gender: "men" as const, inStock: true, categorySlug: "watches", isFeatured: true },
              { id: "c0a80101-0004-4000-8000-000000000004", imageUrl: "/images/matturi-silver-led-watch.jpg", name: "Matturi Silver LED 3Time",       price: 9999,  salePrice: null, slug: "matturi-silver-led", brand: "Matturi", gender: "men" as const, inStock: true, categorySlug: "watches" },
              { id: "c0a80101-0005-4000-8000-000000000005", imageUrl: "/images/black-dial-gold-accent.jpg",   name: "Black Dial Gold Accent Classic",  price: 13500, salePrice: 11499, slug: "black-dial-gold", brand: "Aura Dial", gender: "men" as const, inStock: true, categorySlug: "watches" },
            ].map((watch) => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* Watches and Glasses carousels */}
      {CAROUSEL_SECTIONS.map(({ slug, eyebrow, title }, index) => {
        const items = carouselProducts[slug];
        if (items.length === 0) return null;
        return (
          <section
            key={slug}
            className={`px-4 sm:px-6 lg:px-8 py-14 ${index % 2 === 0 ? "bg-paper" : "bg-cream"}`}
            aria-labelledby={`carousel-${slug}`}
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                    {eyebrow}
                  </p>
                  <h2 id={`carousel-${slug}`} className="mt-1 font-serif text-3xl font-semibold text-ink">
                    {title}
                  </h2>
                </div>
                <Link
                  href={`/collections/${slug}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink transition hover:text-gold-deep"
                >
                  View All <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="mt-8">
                <ProductCarousel label={title}>
                  {items.map((product) => (
                    <li key={product.id} className={CAROUSEL_ITEM_CLASS}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ProductCarousel>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
