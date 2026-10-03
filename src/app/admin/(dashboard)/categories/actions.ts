"use server";

import { eq, like } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { writeAudit } from "@/lib/audit";
import { createSlug } from "@/lib/utils/slug";
import { type ActionState, categorySchema, zodFieldErrors } from "@/lib/validations/admin";

/** The storefront links to these directly, so they can't be removed. */
const PROTECTED_SLUGS = new Set(["watches", "glasses"]);

export async function saveCategoryAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdminOrRedirect();

  const parsed = categorySchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    description: formData.get("description"),
    sortOrder: formData.get("sortOrder") || 0,
    isActive: formData.get("isActive") === "on",
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: zodFieldErrors(parsed.error) };
  }
  const data = parsed.data;

  try {
    if (data.id) {
      await db
        .update(categories)
        .set({ name: data.name, description: data.description, sortOrder: data.sortOrder, isActive: data.isActive, updatedAt: new Date() })
        .where(eq(categories.id, data.id));
      await writeAudit({ adminId: admin.id, action: "category.update", entityType: "category", entityId: data.id });
    } else {
      const base = createSlug(data.name) || "category";
      const taken = new Set(
        (await db.select({ slug: categories.slug }).from(categories).where(like(categories.slug, `${base}%`))).map((r) => r.slug),
      );
      let slug = base;
      for (let i = 2; taken.has(slug); i += 1) slug = `${base}-${i}`;

      const [created] = await db
        .insert(categories)
        .values({ name: data.name, slug, description: data.description, sortOrder: data.sortOrder, isActive: data.isActive })
        .returning({ id: categories.id });
      await writeAudit({ adminId: admin.id, action: "category.create", entityType: "category", entityId: created?.id });
    }
  } catch (error) {
    console.error("Saving category failed:", error);
    return { error: "We couldn't save this category. Please try again." };
  }

  revalidatePath("/", "layout");
  redirect("/admin/categories?saved=1");
}

export async function deleteCategoryAction(formData: FormData): Promise<void> {
  const admin = await requireAdminOrRedirect();
  const id = String(formData.get("id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/categories");

  const [existing] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  if (!existing) redirect("/admin/categories");
  if (PROTECTED_SLUGS.has(existing.slug)) redirect("/admin/categories?error=protected");

  await db.delete(categories).where(eq(categories.id, id));
  await writeAudit({ adminId: admin.id, action: "category.delete", entityType: "category", entityId: id, beforeData: { name: existing.name } });

  revalidatePath("/", "layout");
  redirect("/admin/categories?deleted=1");
}
