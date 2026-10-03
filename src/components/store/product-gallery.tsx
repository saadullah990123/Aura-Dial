"use client";

import Image from "next/image";
import { useState } from "react";

import { GlassesArt, WatchArt, type ArtTone } from "@/components/store/art";

export function ProductGallery({
  images,
  name,
  isGlasses,
  tone,
}: {
  images: { url: string; alt: string | null }[];
  name: string;
  isGlasses: boolean;
  tone: ArtTone;
}) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-sand bg-gradient-to-b from-white to-cream">
        {current ? (
          <Image
            src={current.url}
            alt={current.alt || name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-6"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {isGlasses ? (
              <GlassesArt tone={tone} className="w-3/5" />
            ) : (
              <WatchArt tone={tone} className="h-[80%] w-auto" />
            )}
          </div>
        )}
      </div>

      {images.length > 1 ? (
        <ul className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <li key={image.url}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === active}
                className={`relative block size-20 overflow-hidden rounded-lg border bg-white transition ${
                  index === active ? "border-gold-deep" : "border-sand hover:border-gold"
                }`}
              >
                <Image src={image.url} alt="" fill sizes="80px" className="object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
