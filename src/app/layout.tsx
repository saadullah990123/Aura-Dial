import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";

import "./globals.css";

import { ConnectionBanner } from "@/components/connection-banner";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://auradial.store"),
  title: {
    default: "Aura Dial | Premium & Luxury Watches in Pakistan",
    template: "%s | Aura Dial",
  },
  description:
    "Shop luxury timepieces, premium watches, and designer eyewear at Aura Dial. Cash on delivery available across Pakistan with instant support.",
  keywords: [
    "Aura Dial",
    "Aura Dial Store",
    "Aura Dial watches",
    "premium watches Pakistan",
    "luxury watches",
    "buy watches online Pakistan",
    "eyewear Pakistan",
  ],
  authors: [{ name: "Aura Dial" }],
  creator: "Aura Dial",
  publisher: "Aura Dial",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Aura Dial | Premium & Luxury Watches in Pakistan",
    description: "Shop luxury timepieces and designer eyewear at Aura Dial with COD.",
    url: "https://auradial.store",
    siteName: "Aura Dial",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Dial | Premium & Luxury Watches",
    description: "Shop luxury timepieces and designer eyewear at Aura Dial.",
  },
  alternates: {
    canonical: "https://auradial.store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ConnectionBanner />
        <WhatsAppWidget />
      </body>
    </html>
  );
}