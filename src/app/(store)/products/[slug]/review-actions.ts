"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { reviews } from "@/db/schema";

const reviewSchema = z.object({
  productId: z.string().uuid("Invalid product ID."),
  userName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(60, "Name cannot exceed 60 characters."),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Please select at least 1 star.")
    .max(5, "Rating cannot exceed 5 stars."),
  comment: z
    .string()
    .trim()
    .min(5, "Please write a review comment (at least 5 characters).")
    .max(2000, "Review comment cannot exceed 2000 characters."),
  imageUrl: z.string().url().nullable().optional().or(z.literal("")),
});

export type ReviewSubmitState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function submitProductReview(
  _prevState: ReviewSubmitState | null,
  formData: FormData,
): Promise<ReviewSubmitState> {
  const rawData = {
    productId: formData.get("productId"),
    userName: formData.get("userName"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
    imageUrl: formData.get("imageUrl") || null,
  };

  const parsed = reviewSchema.safeParse(rawData);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: "Please check the form for errors.",
      errors,
    };
  }

  try {
    await db.insert(reviews).values({
      productId: parsed.data.productId,
      userName: parsed.data.userName,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
      imageUrl: parsed.data.imageUrl ? parsed.data.imageUrl : null,
      isApproved: false,
    });

    // Revalidate reviews and admin moderation queues
    revalidatePath(`/admin/reviews`);
    
    return {
      success: true,
      message:
        "Thank you! Your review has been submitted for moderation and will appear once approved by our team.",
    };
  } catch (error) {
    console.error("Failed to submit review:", error);
    return {
      success: false,
      message: "An unexpected error occurred while saving your review. Please try again.",
    };
  }
}
