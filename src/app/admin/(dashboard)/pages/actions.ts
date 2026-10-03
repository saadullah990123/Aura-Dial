"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { contentPages } from "@/db/schema";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { writeAudit } from "@/lib/audit";
import { type ActionState, pageSchema, zodFieldErrors } from "@/lib/validations/admin";

export async function savePageAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdminOrRedirect();

  const parsed = pageSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    body: formData.get("body"),
    isPublished: formData.get("isPublished") === "on",
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: zodFieldErrors(parsed.error) };
  }

  if (parsed.data.isPublished && parsed.data.body.trim() === "") {
    return { error: "Please fix the highlighted fields.", fieldErrors: { body: "Add the page text before publishing, or leave it as a draft." } };
  }

  if (parsed.data.isPublished && /\[\[[^\]]*\]\]/.test(parsed.data.body)) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: { body: "This text still contains [[PLACEHOLDER]] markers. Fill in or remove every one before publishing." },
    };
  }

  try {
    const result = await db
      .update(contentPages)
      .set({ title: parsed.data.title, body: parsed.data.body, isPublished: parsed.data.isPublished, updatedByAdminId: admin.id, updatedAt: new Date() })
      .where(eq(contentPages.slug, parsed.data.slug))
      .returning({ id: contentPages.id });
    if (result.length === 0) return { error: "This page no longer exists." };

    await writeAudit({ adminId: admin.id, action: "page.update", entityType: "page", entityId: result[0].id });
  } catch (error) {
    console.error("Saving page failed:", error);
    return { error: "We couldn't save this page. Please try again." };
  }

  revalidatePath("/", "layout");
  return { ok: true, message: "Page saved." };
}
