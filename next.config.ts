import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

// Content-Security-Policy.
// - Pages are cached (ISR), so per-request nonces aren't possible: 'unsafe-inline' is required for
//   Next.js's own inline bootstrap scripts and styles. This is a basic policy, not a strict one.
// - The only third party the browser talks to is Cloudinary: product images come from
//   res.cloudinary.com and the admin uploads photos to api.cloudinary.com. Fonts are self-hosted.
// - If a future feature needs another origin (analytics, maps, a video embed...), add it here.
//   To trial a change safely, rename the header key to "Content-Security-Policy-Report-Only".
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.cloudinary.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

// Production only: development needs eval/websockets for hot reload, and HSTS is meaningless on http.
// One year, without includeSubDomains/preload (both are hard to undo; add later if wanted).
const productionOnlyHeaders = isProduction
  ? [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
    ]
  : [];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Product photos from Cloudinary and studio Unsplash images
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    // Smaller modern formats, and keep optimised copies for 30 days so repeat visits are instant.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...productionOnlyHeaders,
        ],
      },
    ];
  },
};

export default nextConfig;
