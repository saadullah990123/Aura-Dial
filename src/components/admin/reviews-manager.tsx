"use client";

import {
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  Loader2,
  MessageSquareQuote,
  Star,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";

import {
  approveReviewAction,
  rejectReviewAction,
  unapproveReviewAction,
} from "@/app/admin/(dashboard)/reviews/actions";
import type { AdminReviewRow } from "@/lib/queries/admin";

interface ReviewsManagerProps {
  initialReviews: AdminReviewRow[];
  counts: {
    pending: number;
    approved: number;
    total: number;
  };
  currentFilter: "pending" | "approved" | "all";
}

export function ReviewsManager({
  initialReviews,
  counts: initialCounts,
  currentFilter,
}: ReviewsManagerProps) {
  const [reviewsList, setReviewsList] = useState<AdminReviewRow[]>(initialReviews);
  const [counts, setCounts] = useState(initialCounts);
  const [filter, setFilter] = useState<"pending" | "approved" | "all">(currentFilter);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleApprove = (id: string) => {
    setActiveActionId(id);
    startTransition(async () => {
      const res = await approveReviewAction(id);
      if (res.success) {
        setReviewsList((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r)),
        );
        setCounts((c) => ({
          ...c,
          pending: Math.max(0, c.pending - 1),
          approved: c.approved + 1,
        }));
        setBannerMessage("Review approved and published to storefront!");
        setTimeout(() => setBannerMessage(null), 4000);
      }
      setActiveActionId(null);
    });
  };

  const handleUnapprove = (id: string) => {
    setActiveActionId(id);
    startTransition(async () => {
      const res = await unapproveReviewAction(id);
      if (res.success) {
        setReviewsList((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isApproved: false } : r)),
        );
        setCounts((c) => ({
          ...c,
          pending: c.pending + 1,
          approved: Math.max(0, c.approved - 1),
        }));
        setBannerMessage("Review moved back to pending moderation.");
        setTimeout(() => setBannerMessage(null), 4000);
      }
      setActiveActionId(null);
    });
  };

  const handleReject = (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this review?")) {
      return;
    }
    setActiveActionId(id);
    startTransition(async () => {
      const res = await rejectReviewAction(id);
      if (res.success) {
        const deleted = reviewsList.find((r) => r.id === id);
        setReviewsList((prev) => prev.filter((r) => r.id !== id));
        setCounts((c) => ({
          ...c,
          pending: deleted && !deleted.isApproved ? Math.max(0, c.pending - 1) : c.pending,
          approved: deleted && deleted.isApproved ? Math.max(0, c.approved - 1) : c.approved,
          total: Math.max(0, c.total - 1),
        }));
        setBannerMessage("Review has been permanently removed.");
        setTimeout(() => setBannerMessage(null), 4000);
      }
      setActiveActionId(null);
    });
  };

  const filteredReviews = reviewsList.filter((r) => {
    if (filter === "pending") return !r.isApproved;
    if (filter === "approved") return r.isApproved;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {bannerMessage ? (
        <div
          role="status"
          className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm"
        >
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
          <span>{bannerMessage}</span>
        </div>
      ) : null}

      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              filter === "pending"
                ? "bg-amber-600 text-white shadow-xs"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            <Clock className="size-3.5" />
            <span>Pending Moderation</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                filter === "pending"
                  ? "bg-white/20 text-white"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {counts.pending}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("approved")}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              filter === "approved"
                ? "bg-emerald-700 text-white shadow-xs"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            <Check className="size-3.5" />
            <span>Approved</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                filter === "approved"
                  ? "bg-white/20 text-white"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {counts.approved}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              filter === "all"
                ? "bg-stone-800 text-white shadow-xs"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            <span>All Reviews</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                filter === "all"
                  ? "bg-white/20 text-white"
                  : "bg-stone-100 text-stone-700"
              }`}
            >
              {counts.total}
            </span>
          </button>
        </div>

        <p className="text-xs text-stone-500">
          Showing {filteredReviews.length} review{filteredReviews.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="grid gap-4">
          {filteredReviews.map((rev) => {
            const isProcessing = isPending && activeActionId === rev.id;

            return (
              <article
                key={rev.id}
                className={`overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition-all sm:p-6 ${
                  rev.isApproved
                    ? "border-stone-200"
                    : "border-amber-300 ring-1 ring-amber-400/20"
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Left Column: Product & Customer info */}
                  <div className="space-y-3 lg:max-w-2xl">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-semibold text-stone-900">{rev.userName}</span>
                      <span className="text-xs text-stone-400">•</span>
                      <time className="text-xs text-stone-500">
                        {new Date(rev.createdAt).toLocaleString("en-PK", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </time>

                      {/* Status Badge */}
                      {rev.isApproved ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                          <CheckCircle2 className="size-3" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-600/20">
                          <Clock className="size-3" />
                          Pending Moderation
                        </span>
                      )}
                    </div>

                    {/* Associated Product Link */}
                    <div className="inline-flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-1.5 text-xs text-stone-700">
                      <span className="text-stone-400">Product:</span>
                      <Link
                        href={`/products/${rev.productSlug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 font-medium text-amber-800 hover:underline"
                      >
                        {rev.productName}
                        <ExternalLink className="size-3" />
                      </Link>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-4 ${
                              star <= rev.rating
                                ? "fill-amber-400 text-amber-500"
                                : "fill-stone-100 text-stone-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-stone-700">
                        {rev.rating}.0 / 5
                      </span>
                    </div>

                    {/* Review Comment */}
                    <p className="rounded-lg bg-stone-50/70 p-3.5 text-sm leading-relaxed text-stone-800">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    {/* Uploaded Customer Photo */}
                    {rev.imageUrl ? (
                      <div className="pt-1">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
                          Customer Uploaded Photo:
                        </p>
                        <button
                          type="button"
                          onClick={() => setLightboxImage(rev.imageUrl)}
                          className="group relative size-24 overflow-hidden rounded-lg border border-stone-200 transition hover:border-amber-600 focus:outline-none"
                        >
                          <Image
                            src={rev.imageUrl}
                            alt={`Photo by ${rev.userName}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                            <Eye className="size-4 text-white" />
                          </div>
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center gap-2 border-t border-stone-100 pt-3 lg:border-t-0 lg:pt-0">
                    {!rev.isApproved ? (
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => handleApprove(rev.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-xs transition hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-stone-300"
                      >
                        {isProcessing ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <Check className="size-3.5" />
                        )}
                        <span>Approve</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => handleUnapprove(rev.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-900 transition hover:bg-amber-100 active:scale-95 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <Undo2 className="size-3.5" />
                        )}
                        <span>Unapprove</span>
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleReject(rev.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-red-700 transition hover:border-red-300 hover:bg-red-50 active:scale-95 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="size-3.5" />
                      <span>{rev.isApproved ? "Delete" : "Reject"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50/60 p-12 text-center">
          <MessageSquareQuote className="mx-auto size-10 text-stone-300" />
          <h3 className="mt-3 text-sm font-semibold text-stone-800">
            No reviews found
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            {filter === "pending"
              ? "All customer review submissions have been moderated! Great job."
              : filter === "approved"
              ? "No reviews have been approved yet."
              : "No reviews exist in the database."}
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
              aria-label="Close photo"
            >
              <X className="size-5" />
            </button>
            <div className="relative h-[70vh] w-[80vw] max-w-3xl">
              <Image
                src={lightboxImage}
                alt="Enlarged review photo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
