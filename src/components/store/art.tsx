import { useId } from "react";

export type ArtTone = "gold" | "rose" | "silver" | "black";

const WATCH_TONES: Record<
  ArtTone,
  {
    caseLight: string;
    caseDark: string;
    dial: string;
    marks: string;
    hands: string;
    strap: string;
    strapEdge: string;
  }
> = {
  gold: {
    caseLight: "#f5dda8",
    caseDark: "#a9782f",
    dial: "#17120d",
    marks: "#e9c887",
    hands: "#f1d59a",
    strap: "#241b13",
    strapEdge: "#3a2c1f",
  },
  rose: {
    caseLight: "#f3cdb6",
    caseDark: "#b3745a",
    dial: "#f6eee4",
    marks: "#8a6650",
    hands: "#b3745a",
    strap: "#d9b79c",
    strapEdge: "#c79f80",
  },
  silver: {
    caseLight: "#f1f3f5",
    caseDark: "#8b949e",
    dial: "#1c2530",
    marks: "#e4e8ec",
    hands: "#f1f3f5",
    strap: "#b9c0c7",
    strapEdge: "#8b949e",
  },
  black: {
    caseLight: "#4a4038",
    caseDark: "#0f0c09",
    dial: "#0c0a08",
    marks: "#d9ac62",
    hands: "#e6c48a",
    strap: "#1b1510",
    strapEdge: "#2c231a",
  },
};

/** A stylised wrist watch, viewBox 200 x 320. */
export function WatchArt({
  tone = "gold",
  className,
}: {
  tone?: ArtTone;
  className?: string;
}) {
  const id = useId();
  const t = WATCH_TONES[tone];
  const caseGradient = `${id}-case`;
  const shine = `${id}-shine`;

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label="Wrist watch illustration"
    >
      <defs>
        <linearGradient id={caseGradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.caseLight} />
          <stop offset="1" stopColor={t.caseDark} />
        </linearGradient>
        <radialGradient id={shine} cx="0.3" cy="0.25" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* strap */}
      <rect x="62" y="0" width="76" height="120" rx="16" fill={t.strap} />
      <rect x="62" y="200" width="76" height="120" rx="16" fill={t.strap} />
      <rect
        x="70"
        y="6"
        width="60"
        height="108"
        rx="12"
        fill="none"
        stroke={t.strapEdge}
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <rect
        x="70"
        y="206"
        width="60"
        height="108"
        rx="12"
        fill="none"
        stroke={t.strapEdge}
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* crown */}
      <rect x="180" y="150" width="12" height="20" rx="3" fill={`url(#${caseGradient})`} />

      {/* case */}
      <circle cx="100" cy="160" r="84" fill={`url(#${caseGradient})`} />
      <circle cx="100" cy="160" r="72" fill="#0a0806" opacity="0.35" />
      <circle cx="100" cy="160" r="69" fill={t.dial} />

      {/* hour marks */}
      {Array.from({ length: 12 }).map((_, index) => {
        const major = index % 3 === 0;
        return (
          <line
            key={index}
            x1="100"
            y1={major ? 98 : 100}
            x2="100"
            y2={major ? 112 : 108}
            stroke={t.marks}
            strokeWidth={major ? 3 : 1.6}
            strokeLinecap="round"
            transform={`rotate(${index * 30} 100 160)`}
          />
        );
      })}

      {/* hands: 10:10 */}
      <line
        x1="100"
        y1="160"
        x2="100"
        y2="124"
        stroke={t.hands}
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(-60 100 160)"
      />
      <line
        x1="100"
        y1="160"
        x2="100"
        y2="108"
        stroke={t.hands}
        strokeWidth="2.6"
        strokeLinecap="round"
        transform="rotate(60 100 160)"
      />
      <line
        x1="100"
        y1="172"
        x2="100"
        y2="106"
        stroke="#d9ac62"
        strokeWidth="1"
        transform="rotate(150 100 160)"
      />
      <circle cx="100" cy="160" r="4.5" fill={t.hands} />

      <circle cx="100" cy="160" r="84" fill={`url(#${shine})`} />
    </svg>
  );
}

const LENS_TONES: Record<ArtTone, { frame: string; lensTop: string; lensBottom: string }> = {
  black: { frame: "#0e0b08", lensTop: "#3b342d", lensBottom: "#0a0806" },
  gold: { frame: "#c99a4b", lensTop: "#6b4d1f", lensBottom: "#1c130a" },
  rose: { frame: "#b3745a", lensTop: "#d8a08a", lensBottom: "#7a4a3a" },
  silver: { frame: "#aab2ba", lensTop: "#5b6b7a", lensBottom: "#1d2731" },
};

/** Stylised sunglasses, viewBox 240 x 110. */
export function GlassesArt({
  tone = "black",
  className,
}: {
  tone?: ArtTone;
  className?: string;
}) {
  const id = useId();
  const t = LENS_TONES[tone];
  const lens = `${id}-lens`;

  return (
    <svg
      viewBox="0 0 240 110"
      className={className}
      role="img"
      aria-label="Sunglasses illustration"
    >
      <defs>
        <linearGradient id={lens} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.lensTop} />
          <stop offset="1" stopColor={t.lensBottom} />
        </linearGradient>
      </defs>

      {/* temples */}
      <path d="M8 34 L30 36" stroke={t.frame} strokeWidth="6" strokeLinecap="round" />
      <path d="M232 34 L210 36" stroke={t.frame} strokeWidth="6" strokeLinecap="round" />

      {/* bridge */}
      <path
        d="M100 40 C110 28 130 28 140 40"
        fill="none"
        stroke={t.frame}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* lenses */}
      <path
        d="M22 38 C22 34 26 32 32 32 L92 32 C100 32 104 38 103 46 C101 78 84 96 60 96 C36 96 22 76 22 38 Z"
        fill={`url(#${lens})`}
        stroke={t.frame}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M218 38 C218 34 214 32 208 32 L148 32 C140 32 136 38 137 46 C139 78 156 96 180 96 C204 96 218 76 218 38 Z"
        fill={`url(#${lens})`}
        stroke={t.frame}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* highlights */}
      <path d="M36 44 L70 44" stroke="#fff" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" />
      <path d="M154 44 L188 44" stroke="#fff" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Hero composition: watch + sunglasses on a warm glow. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(217,172,98,0.35),transparent_62%)]" />
        <WatchArt
          tone="black"
          className="absolute left-[8%] top-1/2 h-[86%] w-auto -translate-y-1/2 -rotate-6 drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
        />
        <GlassesArt
          tone="black"
          className="absolute bottom-[6%] right-0 w-[58%] rotate-[4deg] drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}
