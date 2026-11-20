import Link from "next/link";
import { Home, Sparkles, Wand2, Watch } from "lucide-react";

export function NotFoundContent() {
  return (
    <section className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden bg-[#0e0a07] px-4 py-16 text-center sm:px-6 lg:px-8">
      {/* Decorative dial background geometry */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30" aria-hidden="true">
        <div className="size-[320px] rounded-full border border-gold/20 sm:size-[460px] md:size-[560px]" />
        <div className="absolute size-[240px] rounded-full border border-dashed border-gold/30 sm:size-[360px] md:size-[440px]" />
        <div className="absolute size-[160px] rounded-full border border-gold/15 sm:size-[260px] md:size-[320px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,90,0.14),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-[#1e1711] px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold shadow-md">
          <span>★</span>
          <span>Lost In Time</span>
          <span>★</span>
        </div>

        {/* 404 Display Heading */}
        <p className="mt-4 font-serif text-7xl font-bold tracking-tight bg-gradient-to-b from-[#f3d9a4] via-[#d4a45a] to-[#9a6b26] bg-clip-text text-transparent sm:text-8xl md:text-9xl">
          404
        </p>

        <h1 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
          The Timepiece You Seek Has Moved
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-stone-300 sm:text-base">
          The page, product, or collection you are looking for doesn&apos;t exist, has been retired, or the link may be outdated. Explore our handcrafted luxury collections below.
        </p>

        {/* Action Buttons: Home, Watches, Perfume, Customize Watch */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-soft px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-lg shadow-gold/15 transition-all duration-200 hover:bg-gold hover:shadow-gold/30 active:scale-95"
          >
            <Home className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/collections/watches"
            className="inline-flex items-center gap-2 rounded-xl border border-gold/50 bg-[#1c150f] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-soft transition-all duration-200 hover:border-gold hover:bg-gold hover:text-ink active:scale-95"
          >
            <Watch className="size-4" />
            Shop Watches
          </Link>

          <Link
            href="/collections/perfume"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#16120e] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-200 transition-all duration-200 hover:border-gold hover:text-gold active:scale-95"
          >
            <Sparkles className="size-4" />
            Shop Perfume
          </Link>

          <Link
            href="/collections/customize-watch"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#16120e] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-200 transition-all duration-200 hover:border-gold hover:text-gold active:scale-95"
          >
            <Wand2 className="size-4" />
            Customize Watch
          </Link>
        </div>
      </div>
    </section>
  );
}
