"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { storeSettings } from "@/db/schema";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { writeAudit } from "@/lib/audit";
import { destroyImages, isOwnCloudinaryUrl } from "@/lib/cloudinary/destroy";
import { HERO_UPLOAD_PREFIX, verifyNewUploads } from "@/lib/cloudinary/verify";
import { type ActionState, settingsSchema, zodFieldErrors } from "@/lib/validations/admin";

export async function saveSettingsAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdminOrRedirect();

  let heroImage: unknown = null;
  try {
    heroImage = JSON.parse(String(formData.get("heroImage") ?? "null"));
  } catch {
    return { error: "The hero image was invalid. Please upload it again." };
  }

  const parsed = settingsSchema.safeParse({
    storeName: formData.get("storeName"),
    primaryPhone: formData.get("primaryPhone"),
    secondaryPhone: formData.get("secondaryPhone"),
    whatsappPhone: formData.get("whatsappPhone"),
    contactEmail: formData.get("contactEmail"),
    address: formData.get("address"),
    instagramUrl: formData.get("instagramUrl"),
    tiktokUrl: formData.get("tiktokUrl"),
    deliveryFee: formData.get("deliveryFee"),
    freeShippingEnabled: formData.get("freeShippingEnabled") === "on",
    freeShippingThreshold: formData.get("freeShippingThreshold"),
    returnWindowDays: formData.get("returnWindowDays"),
    returnPolicySummary: formData.get("returnPolicySummary"),
    announcementEnabled: formData.get("announcementEnabled") === "on",
    announcementText: formData.get("announcementText"),
    heroImage,
  });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: zodFieldErrors(parsed.error) };
  }
  const d = parsed.data;

  if (d.heroImage && !isOwnCloudinaryUrl(d.heroImage.url)) {
    return { error: "The hero image isn't from your Cloudinary account. Upload it again." };
  }
  if (d.freeShippingEnabled && d.freeShippingThreshold === undefined) {
    return { error: "Please fix the highlighted fields.", fieldErrors: { freeShippingThreshold: "Enter the minimum order for free shipping." } };
  }

  try {
    const [current] = await db.select().from(storeSettings).where(eq(storeSettings.key, "main")).limit(1);

    // Safety net: a NEW hero photo goes straight to Cloudinary, so confirm on the server that it
    // really is an allowed image under 5 MB. An unchanged hero image is not re-checked.
    if (d.heroImage && d.heroImage.url !== current?.heroImageUrl) {
      const upload = await verifyNewUploads([d.heroImage], HERO_UPLOAD_PREFIX);
      if (!upload.ok) return { error: upload.message };
    }

    const values = {
      storeName: d.storeName,
      primaryPhone: d.primaryPhone,
      secondaryPhone: d.secondaryPhone,
      whatsappPhone: d.whatsappPhone,
      contactEmail: d.contactEmail,
      address: d.address,
      instagramUrl: d.instagramUrl,
      tiktokUrl: d.tiktokUrl,
      deliveryFee: d.deliveryFee.toFixed(2),
      freeShippingEnabled: d.freeShippingEnabled,
      freeShippingThreshold: d.freeShippingEnabled && d.freeShippingThreshold !== undefined ? d.freeShippingThreshold.toFixed(2) : null,
      returnWindowDays: d.returnWindowDays,
      returnPolicySummary: d.returnPolicySummary,
      announcementEnabled: d.announcementEnabled,
      announcementText: d.announcementText,
      heroImageUrl: d.heroImage?.url ?? null,
      heroImagePublicId: d.heroImage?.publicId ?? null,
      updatedByAdminId: admin.id,
      updatedAt: new Date(),
    };

    if (current) {
      await db.update(storeSettings).set(values).where(eq(storeSettings.id, current.id));
    } else {
      await db.insert(storeSettings).values({ key: "main", ...values });
    }

    if (current?.heroImagePublicId && current.heroImagePublicId !== (d.heroImage?.publicId ?? null)) {
      await destroyImages([current.heroImagePublicId]);
    }

    await writeAudit({ adminId: admin.id, action: "settings.update", entityType: "settings", entityId: current?.id ?? null });
  } catch (error) {
    console.error("Saving settings failed:", error);
    return { error: "We couldn't save the settings. Please try again." };
  }

  revalidatePath("/", "layout");
  return { ok: true, message: "Settings saved." };
}
