"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

/**
 * Horizontal, swipeable row of product cards with previous/next arrows
 * (arrows appear from the sm breakpoint up; on phones people just swipe).
 * Children must be <li> items (see the home page for the item sizing classes).
 */
export function ProductCarousel({ label, children }: { label: string; children: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollPage(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  }

  const arrowClass =
    "absolute top-[38%] z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-sand bg-white text-ink shadow-md transition hover:border-gold hover:bg-gold hover:text-ink sm:flex";

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <button
        type="button"
        onClick={() => scrollPage(-1)}
        aria-label={`Previous ${label}`}
        className={`${arrowClass} -left-5`}
      >
        <ChevronLeft className="size-5" />
      </button>

      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <button
        type="button"
        onClick={() => scrollPage(1)}
        aria-label={`Next ${label}`}
        className={`${arrowClass} -right-5`}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
