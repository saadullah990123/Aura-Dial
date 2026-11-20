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

/** Bespoke customizable luxury watch art, viewBox 200 x 320. */
export function CustomWatchArt({
  tone = "gold",
  className,
}: {
  tone?: ArtTone;
  className?: string;
}) {
  const id = useId();
  const t = WATCH_TONES[tone];
  const caseGradient = `${id}-custom-case`;
  const ringGradient = `${id}-custom-ring`;

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label="Customizable bespoke watch illustration"
    >
      <defs>
        <linearGradient id={caseGradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.caseLight} />
          <stop offset="1" stopColor={t.caseDark} />
        </linearGradient>
        <linearGradient id={ringGradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9c887" />
          <stop offset="0.5" stopColor="#a9782f" />
          <stop offset="1" stopColor="#f7e1b5" />
        </linearGradient>
      </defs>

      {/* Modern textured link strap */}
      <rect x="62" y="0" width="76" height="120" rx="14" fill="#18130e" />
      <rect x="62" y="200" width="76" height="120" rx="14" fill="#18130e" />
      {/* Golden center link highlights */}
      <rect x="88" y="4" width="24" height="110" rx="4" fill={`url(#${caseGradient})`} opacity="0.85" />
      <rect x="88" y="206" width="24" height="110" rx="4" fill={`url(#${caseGradient})`} opacity="0.85" />

      {/* Dual precision crowns */}
      <rect x="180" y="142" width="12" height="16" rx="3" fill={`url(#${caseGradient})`} />
      <rect x="178" y="168" width="10" height="12" rx="2" fill={`url(#${caseGradient})`} opacity="0.75" />

      {/* Watch case */}
      <circle cx="100" cy="160" r="84" fill={`url(#${caseGradient})`} />
      <circle cx="100" cy="160" r="74" fill="#0c0906" />

      {/* Bespoke inner compass / engraving ring */}
      <circle cx="100" cy="160" r="62" fill="none" stroke={`url(#${ringGradient})`} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      <circle cx="100" cy="160" r="48" fill="#120e0a" stroke={t.caseDark} strokeWidth="1" />

      {/* Custom Monogram Emblem */}
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fill="#e9c887"
        fontSize="10"
        fontFamily="serif"
        letterSpacing="2"
        fontWeight="bold"
      >
        BESPOKE
      </text>

      {/* Subdial */}
      <circle cx="100" cy="176" r="14" fill="#0a0805" stroke="#d9ac62" strokeWidth="1" opacity="0.8" />
      <line x1="100" y1="176" x2="108" y2="173" stroke="#e6c48a" strokeWidth="1.5" strokeLinecap="round" />

      {/* Hands */}
      <line
        x1="100"
        y1="160"
        x2="78"
        y2="128"
        stroke={t.hands}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="160"
        x2="128"
        y2="142"
        stroke={t.hands}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="100" cy="160" r="4" fill={t.caseLight} />
    </svg>
  );
}

/** Luxury perfume flacon bottle illustration, viewBox 200 x 300. */
export function PerfumeArt({
  tone = "gold",
  className,
}: {
  tone?: ArtTone;
  className?: string;
}) {
  const id = useId();
  const capGrad = `${id}-perfume-cap`;
  const bodyGrad = `${id}-perfume-body`;
  const liquidGrad = `${id}-perfume-liquid`;

  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      role="img"
      aria-label="Luxury perfume flacon illustration"
    >
      <defs>
        {/* Golden Cap Gradient */}
        <linearGradient id={capGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone === "rose" ? "#f5d2bf" : "#f7e3b5"} />
          <stop offset="45%" stopColor={tone === "rose" ? "#b8785e" : "#c59a4b"} />
          <stop offset="100%" stopColor={tone === "rose" ? "#6d3e2d" : "#7c551e"} />
        </linearGradient>

        {/* Faceted Crystal Glass Outer Gradient */}
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3d2c1c" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#1a120c" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0d0906" stopOpacity="0.98" />
        </linearGradient>

        {/* Amber Fragrance Liquid Glow */}
        <radialGradient id={liquidGrad} cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor={tone === "rose" ? "#e28c74" : "#f5bb57"} stopOpacity="0.75" />
          <stop offset="60%" stopColor={tone === "rose" ? "#a84e37" : "#a86822"} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#1a120c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sprayer Nozzle */}
      <rect x="94" y="24" width="12" height="14" rx="2" fill={`url(#${capGrad})`} />
      <circle cx="100" cy="30" r="2" fill="#2d1c0e" />

      {/* Luxury Heavy Metal Cap */}
      <rect x="74" y="38" width="52" height="46" rx="6" fill={`url(#${capGrad})`} />
      <rect x="78" y="42" width="44" height="38" rx="4" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" />

      {/* Golden Collar / Neck Ring */}
      <rect x="80" y="84" width="40" height="14" rx="3" fill={`url(#${capGrad})`} />

      {/* Flacon Glass Bottle Body */}
      <rect
        x="42"
        y="98"
        width="116"
        height="172"
        rx="18"
        fill={`url(#${bodyGrad})`}
        stroke={`url(#${capGrad})`}
        strokeWidth="2.5"
      />

      {/* Inner Liquid Glow */}
      <rect x="48" y="104" width="104" height="160" rx="14" fill={`url(#${liquidGrad})`} />

      {/* Elegant Label Plaque */}
      <rect
        x="60"
        y="142"
        width="80"
        height="76"
        rx="6"
        fill="#0c0906"
        stroke="#d4a45a"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      <rect
        x="64"
        y="146"
        width="72"
        height="68"
        rx="4"
        fill="none"
        stroke="#d4a45a"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        strokeOpacity="0.5"
      />

      {/* Label Text */}
      <text
        x="100"
        y="166"
        textAnchor="middle"
        fill="#e9c887"
        fontSize="8"
        fontFamily="serif"
        letterSpacing="2.5"
        fontWeight="600"
      >
        AURA DIAL
      </text>
      <line x1="76" y1="172" x2="124" y2="172" stroke="#d4a45a" strokeWidth="0.8" opacity="0.6" />
      <text
        x="100"
        y="186"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="10"
        fontFamily="serif"
        letterSpacing="1.5"
        fontWeight="bold"
      >
        PARFUM
      </text>
      <text
        x="100"
        y="200"
        textAnchor="middle"
        fill="#a89a8c"
        fontSize="7"
        letterSpacing="1"
      >
        EAU DE LUXE
      </text>

      {/* Glass Corner Reflections */}
      <path
        d="M 52 108 L 52 258"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.22"
      />
      <path
        d="M 58 114 L 58 140"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
      <path
        d="M 148 108 L 148 258"
        stroke="#d4a45a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.25"
      />
    </svg>
  );
}

const LENS_TONES: Record<ArtTone, { frame: string; lensTop: string; lensBottom: string }> = {
  black: { frame: "#0e0b08", lensTop: "#3b342d", lensBottom: "#0a0806" },
  gold: { frame: "#c99a4b", lensTop: "#6b4d1f", lensBottom: "#1c130a" },
  rose: { frame: "#b3745a", lensTop: "#d8a08a", lensBottom: "#7a4a3a" },
  silver: { frame: "#aab2ba", lensTop: "#5b6b7a", lensBottom: "#1d2731" },
};

/** Stylised sunglasses, viewBox 240 x 110 (preserved for backward compatibility). */
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

/** Hero composition: watch + luxury perfume flacon on a warm glow. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(217,172,98,0.35),transparent_62%)]" />
        <WatchArt
          tone="black"
          className="absolute left-[6%] top-1/2 h-[88%] w-auto -translate-y-1/2 -rotate-6 drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
        />
        <PerfumeArt
          tone="gold"
          className="absolute bottom-[4%] right-[2%] h-[78%] w-auto rotate-[3deg] drop-shadow-[0_20px_32px_rgba(0,0,0,0.55)]"
        />
      </div>
    </div>
  );
}
