"use client";

import dynamic from "next/dynamic";

export const DynamicWhatsAppWidget = dynamic(
  () => import("@/components/WhatsAppWidget").then((mod) => mod.WhatsAppWidget),
  { ssr: false },
);
