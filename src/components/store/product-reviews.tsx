"use client";

import {
  Camera,
  CheckCircle2,
  ChevronDown,
  Loader2,
  ShieldCheck,
  Star,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";

import { submitProductReview, type ReviewSubmitState } from "@/app/(store)/products/[slug]/review-actions";
import type { ProductReviewsSummary } from "@/lib/queries/store";

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Exceptional",
};

interface ProductReviewsProps {
  productId: string;
  productName: string;
  reviewsSummary: ProductReviewsSummary;
}

export function ProductReviews({
  productId,
  productName,
  reviewsSummary,
}: ProductReviewsProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<ReviewSubmitState | null>(null);

  const { reviews, totalApprovedReviews, averageRating, ratingDistribution } =
    reviewsSummary;

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/reviews/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image.");
      }

      setImageUrl(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("userName", userName);
    formData.append("rating", String(rating));
    formData.append("comment", comment);
    if (imageUrl) formData.append("imageUrl", imageUrl);

    startTransition(async () => {
      const result = await submitProductReview(null, formData);
      setFormState(result);
      if (result.success) {
        // Reset form inputs
        setUserName("");
        setComment("");
        setImageUrl(null);
        setRating(5);
      }
    });
  };

  return (
    <section id="reviews" className="mt-16 border-t border-sand/80 pt-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
              Customer Reviews
            </h2>
            <span className="rounded-full bg-sand/60 px-2.5 py-0.5 text-xs font-semibold text-stone-700">
              {totalApprovedReviews}
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-500 sm:text-sm">
            Verified feedback from genuine Aura Dial owners
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormOpen((prev) => !prev);
            setFormState(null);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-200 hover:bg-gold-deep active:scale-[0.98]"
        >
          {formOpen ? "Close Form" : "Write a Review"}
          <ChevronDown
            className={`size-3.5 transition-transform duration-200 ${
              formOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Confirmation Banner */}
      {formState?.success ? (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-900 shadow-xs"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
          <div>
            <p className="text-sm font-semibold">{formState.message}</p>
            <p className="mt-0.5 text-xs text-emerald-700">
              Our moderation team reviews every submission to uphold verified authentic reviews.
            </p>
          </div>
        </div>
      ) : null}

      {/* Write a Review Submission Form */}
      {formOpen ? (
        <div className="mt-6 rounded-2xl border border-gold/30 bg-white p-6 shadow-md ring-1 ring-gold/15 sm:p-8">
          <div className="border-b border-sand pb-4">
            <h3 className="font-serif text-xl font-semibold text-ink">
              Review {productName}
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Share details about craftsmanship, fit, accuracy, and overall satisfaction.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {formState?.errors && !formState.success ? (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700"
              >
                {formState.message || "Please fix the highlighted errors below."}
              </div>
            ) : null}

            {/* Rating Stars Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex items-center gap-3">
                <div
                  className="flex items-center gap-1"
                  onMouseLeave={() => setHoverRating(0)}
                  role="radiogroup"
                  aria-label="Rating selection"
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        className="rounded p-1 text-stone-300 transition-colors hover:scale-110 focus:outline-none"
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`size-6 ${
                            active
                              ? "fill-amber-400 text-amber-500"
                              : "fill-stone-100 text-stone-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-medium text-stone-600">
                  {RATING_LABELS[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label
                htmlFor="userName"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700"
              >
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Tariq Mehmood"
                className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-400 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
              {formState?.errors?.userName ? (
                <p className="mt-1 text-xs text-red-600">{formState.errors.userName}</p>
              ) : null}
            </div>

            {/* Comment Textarea */}
            <div>
              <label
                htmlFor="comment"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700"
              >
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike? How does it look on the wrist/face?"
                className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-400 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
              {formState?.errors?.comment ? (
                <p className="mt-1 text-xs text-red-600">{formState.errors.comment}</p>
              ) : null}
            </div>

            {/* Image Attachment Upload */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Photo Attachment (Optional)
              </label>
              <p className="mt-0.5 text-xs text-stone-500">
                Upload a clear wrist-shot or unboxing photo (JPG, PNG, WebP up to 5 MB).
              </p>

              {imageUrl ? (
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative size-20 overflow-hidden rounded-lg border border-stone-200 shadow-xs">
                    <Image
                      src={imageUrl}
                      alt="Review photo preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setImageUrl(null)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-red-600"
                  >
                    <X className="size-3.5" />
                    Remove photo
                  </button>
                </div>
              ) : (
                <div className="mt-2.5">
                  <label
                    htmlFor="review-image-input"
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50/60 px-4 py-2.5 text-xs font-medium text-stone-700 transition hover:border-gold-deep hover:bg-stone-50 ${
                      uploadingImage ? "pointer-events-none opacity-60" : ""
                    }`}
                  >
                    {uploadingImage ? (
                      <Loader2 className="size-4 animate-spin text-gold-deep" />
                    ) : (
                      <Camera className="size-4 text-gold-deep" />
                    )}
                    <span>{uploadingImage ? "Uploading photo..." : "Attach a Photo"}</span>
                    <input
                      id="review-image-input"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      className="sr-only"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                  {uploadError ? (
                    <p className="mt-1.5 text-xs text-red-600">{uploadError}</p>
                  ) : null}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-lg border border-stone-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending || uploadingImage}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition hover:bg-gold-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-300"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Ratings Overview & Stats */}
      <div className="mt-8 grid gap-8 rounded-2xl border border-sand/80 bg-white p-6 shadow-xs lg:grid-cols-12 lg:gap-10 sm:p-8">
        {/* Score Column */}
        <div className="flex flex-col items-center justify-center border-b border-sand pb-6 text-center lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
          <div className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
            {averageRating ? averageRating.toFixed(1) : "5.0"}
          </div>
          <div className="mt-2.5 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`size-4.5 ${
                  star <= Math.round(averageRating || 5)
                    ? "fill-amber-400 text-amber-500"
                    : "fill-stone-100 text-stone-300"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs font-medium text-stone-500">
            {totalApprovedReviews > 0
              ? `Based on ${totalApprovedReviews} verified review${
                  totalApprovedReviews === 1 ? "" : "s"
                }`
              : "No reviews yet • Be the first to review!"}
          </p>
        </div>

        {/* Breakdown Bars */}
        <div className="flex flex-col justify-center space-y-2 lg:col-span-8">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingDistribution[star as 1 | 2 | 3 | 4 | 5] || 0;
            const pct =
              totalApprovedReviews > 0 ? (count / totalApprovedReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <div className="flex w-12 items-center gap-1 font-medium text-stone-600">
                  <span>{star}</span>
                  <Star className="size-3 fill-amber-400 text-amber-500" />
                </div>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gold transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-stone-400">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Approved Reviews List */}
      <div className="mt-8 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <article
              key={rev.id}
              className="rounded-xl border border-sand/70 bg-white p-5 shadow-xs transition hover:border-gold/40 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-sand/60 font-serif text-sm font-semibold text-ink">
                    {rev.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-semibold text-ink">
                        {rev.userName}
                      </h4>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        <ShieldCheck className="size-3 text-emerald-600" />
                        Verified Buyer
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      {new Date(rev.createdAt).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`size-3.5 ${
                        star <= rev.rating
                          ? "fill-amber-400 text-amber-500"
                          : "fill-stone-100 text-stone-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <p className="mt-3.5 text-sm leading-6 text-stone-700">
                {rev.comment}
              </p>

              {/* Uploaded Customer Photo Thumbnail */}
              {rev.imageUrl ? (
                <div className="mt-3.5">
                  <button
                    type="button"
                    onClick={() => setLightboxImage(rev.imageUrl)}
                    className="group relative size-20 overflow-hidden rounded-lg border border-stone-200 transition hover:border-gold-deep focus:outline-none"
                    title="Click to view full photo"
                  >
                    <Image
                      src={rev.imageUrl}
                      alt="Customer review photo"
                      fill
                      sizes="80px"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white drop-shadow">
                        Zoom
                      </span>
                    </div>
                  </button>
                </div>
              ) : null}
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-sand bg-white/70 px-6 py-12 text-center">
            <User className="mx-auto size-8 text-stone-300" />
            <h4 className="mt-2 text-sm font-semibold text-stone-700">
              No customer reviews yet
            </h4>
            <p className="mt-1 text-xs text-stone-500">
              Be the first to share your thoughts on this timepiece with fellow collectors!
            </p>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-gold-deep"
            >
              Write First Review
            </button>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
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
    </section>
  );
}
