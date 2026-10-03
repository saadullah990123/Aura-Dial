import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isPolicySlug } from "@/lib/policies";
import { getContentPage } from "@/lib/queries/store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = isPolicySlug(slug) ? await getContentPage(slug) : null;
  return { title: page?.title ?? "Not found" };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  if (!isPolicySlug(slug)) notFound();

  const page = await getContentPage(slug);
  // Unpublished or empty drafts are never visible.
  if (!page || page.body.trim() === "") notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold text-ink">{page.title}</h1>
      <div className="mt-6 space-y-4 leading-7 text-stone-700">
        {page.body.split(/\n{2,}/).map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
