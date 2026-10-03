import type { Metadata } from "next";
import Link from "next/link";

import { getContentPage } from "@/lib/queries/store";

export const metadata: Metadata = { title: "About" };

const FALLBACK = {
  title: "About Aura Dial",
  body: "Aura Dial brings together two things people wear every day: watches and glasses. Our collection is chosen for style, comfort and value, from classic timepieces to modern frames.\n\nWe deliver across Pakistan. Questions about a product? Get in touch with us.",
};

export default async function AboutPage() {
  const page = (await getContentPage("about")) ?? FALLBACK;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">Our story</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">{page.title}</h1>
      <div className="mt-6 space-y-4 leading-7 text-stone-600">
        {page.body.split(/\n{2,}/).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <Link
        href="/contact"
        className="mt-8 inline-flex rounded-md bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold-deep"
      >
        Contact us
      </Link>
    </div>
  );
}
