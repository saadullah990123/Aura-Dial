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
}: ProductCardImageProps) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#261f18] via-[#1b1510] to-[#120d09]">
      {!showFallback ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 50vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {/* Subtle luxury backdrop geometry */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,90,0.18),transparent_70%)]" />

          {/* Luxury artistic emblem */}
          <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
            {isGlasses ? (
              <GlassesArt tone={tone} className="w-3/4 drop-shadow-md" />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center">
                {/* Dial aesthetic concentric ring */}
                <div className="absolute size-36 rounded-full border border-gold/25 opacity-70" />
                <div className="absolute size-28 rounded-full border border-gold/40 opacity-50" />
                <WatchArt tone={tone} className="relative z-10 h-[82%] w-auto drop-shadow-lg" />
              </div>
            )}
          </div>

          {/* Minimalist luxury watermark */}
          <span className="absolute bottom-2.5 z-10 text-[9px] font-semibold uppercase tracking-[0.25em] text-gold/60">
            Aura Dial
          </span>
        </div>
      )}
    </div>
  );
}
