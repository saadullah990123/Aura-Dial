import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";

import "./globals.css";

import { ConnectionBanner } from "@/components/connection-banner";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Aura Dial | Watches & Glasses", template: "%s | Aura Dial" },
  description: "Premium watches and glasses for every style. Nationwide delivery across Pakistan.",
  openGraph: { siteName: "Aura Dial", type: "website" },
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