"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { reviews } from "@/db/schema";
import { writeAudit } from "@/lib/audit";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";

export async function approveReviewAction(reviewId: string) {
  const admin = await requireAdminOrRedirect();

  const [existing] = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, reviewId))
    .limit(1);

  if (!existing) {
    return { success: false, error: "Review not found." };
  }

  await db
    .update(reviews)
    .set({ isApproved: true })
    .where(eq(reviews.id, reviewId));

  await writeAudit({
    adminId: admin.id,
    action: "review.approve",
    entityType: "review",
    entityId: reviewId,
    beforeData: { isApproved: existing.isApproved },
    afterData: { isApproved: true },
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
  revalidatePath("/", "layout");

  return { success: true };
}

export async function rejectReviewAction(reviewId: string) {
  const admin = await requireAdminOrRedirect();

  const [existing] = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, reviewId))
    .limit(1);

  if (!existing) {
    return { success: false, error: "Review not found." };
  }

  await db.delete(reviews).where(eq(reviews.id, reviewId));

  await writeAudit({
    adminId: admin.id,
    action: "review.reject_delete",
    entityType: "review",
    entityId: reviewId,
    beforeData: existing,
    afterData: null,
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
  revalidatePath("/", "layout");

  return { success: true };
}

export async function unapproveReviewAction(reviewId: string) {
  const admin = await requireAdminOrRedirect();

  const [existing] = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, reviewId))
    .limit(1);

  if (!existing) {
    return { success: false, error: "Review not found." };
  }

  await db
    .update(reviews)
    .set({ isApproved: false })
    .where(eq(reviews.id, reviewId));

  await writeAudit({
    adminId: admin.id,
    action: "review.unapprove",
    entityType: "review",
    entityId: reviewId,
    beforeData: { isApproved: existing.isApproved },
    afterData: { isApproved: false },
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
  revalidatePath("/", "layout");

  return { success: true };
}
