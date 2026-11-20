import type { Metadata } from "next";

import { NotFoundContent } from "@/components/store/not-found-content";
import { SiteFooter } from "@/components/store/site-footer";
import { SiteHeader } from "@/components/store/site-header";

export const metadata: Metadata = {
  title: "Page Not Found | Aura Dial",
  description: "The page or timepiece you are looking for could not be found at Aura Dial.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0e0a07]">
      <SiteHeader />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <SiteFooter />
    </div>
  );
}
