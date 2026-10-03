"use client";

import Image from "next/image";
import { useState } from "react";

import { GlassesArt, WatchArt, type ArtTone } from "@/components/store/art";

interface ProductCardImageProps {
  src: string | null | undefined;
  alt: string;
  isGlasses: boolean;
  tone: ArtTone;
  onSale?: boolean;
  inStock?: boolean;
}

export function ProductCardImage({
  src,
  alt,
  isGlasses,
  tone,
  onSale,
  inStock = true,
}: ProductCardImageProps) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-stone-100/90 to-stone-200/60">
      {!showFallback ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {/* Subtle luxury backdrop geometry */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,172,98,0.12),transparent_70%)]" />

          {/* Luxury artistic emblem */}
          <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
            {isGlasses ? (
              <GlassesArt tone={tone} className="w-3/4 drop-shadow-sm" />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center">
                {/* Dial aesthetic concentric ring */}
                <div className="absolute size-36 rounded-full border border-gold/20 opacity-60" />
                <div className="absolute size-28 rounded-full border border-gold/30 opacity-40" />
                <WatchArt tone={tone} className="relative z-10 h-[82%] w-auto drop-shadow-md" />
              </div>
            )}
          </div>

          {/* Minimalist luxury watermark */}
          <span className="absolute bottom-2.5 z-10 text-[9px] font-semibold uppercase tracking-[0.25em] text-stone-400">
            Aura Dial
          </span>
        </div>
      )}

      {/* Sale badge */}
      {onSale ? (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm">
          Sale
        </span>
      ) : null}

      {/* Sold out badge */}
      {!inStock ? (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-xs">
          Sold Out
        </span>
      ) : null}
    </div>
  );
}
