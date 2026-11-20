import type { Metadata } from "next";

import { NotFoundContent } from "@/components/store/not-found-content";

export const metadata: Metadata = {
  title: "Page Not Found | Aura Dial",
  description: "The page or timepiece you are looking for could not be found at Aura Dial.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function StoreNotFound() {
  return <NotFoundContent />;
}
