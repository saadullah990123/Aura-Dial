import { z } from "zod";

/** "" or missing -> undefined, otherwise a number. */
const optionalNumber = (max: number) =>
  z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : value),
    z.coerce.number({ message: "Enter a valid number." }).min(0, "Cannot be negative.").max(max).optional(),
  );

const requiredNumber = (max: number, label = "Enter a valid number.") =>
  z.coerce.number({ message: label }).min(0, "Cannot be negative.").max(max);

const emptyToNull = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? null : value;

export const imageListSchema = z
  .array(
    z.object({
      url: z.string().url().max(500),
      publicId: z.string().max(300).nullable().optional(),
      alt: z.string().max(200).nullable().optional(),
    }),
  )
  .max(8, "You can add up to 8 images.");

export const productSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(2, "Name is required.").max(160),
    categoryId: z.preprocess(emptyToNull, z.string().uuid().nullable()),
    brand: z.preprocess(emptyToNull, z.string().trim().max(80).nullable()),
    gender: z.enum(["men", "women", "unisex"]),
    description: z.preprocess(emptyToNull, z.string().trim().max(5000).nullable()),
    price: requiredNumber(10_000_000, "Enter a price."),
    salePrice: optionalNumber(10_000_000),
    stockQuantity: z.coerce
      .number({ message: "Enter the stock quantity." })
      .int("Must be a whole number.")
      .min(0, "Cannot be negative.")
      .max(100_000),
    isFeatured: z.boolean(),
    isBestseller: z.boolean(),
    isActive: z.boolean(),
    images: imageListSchema,
  })
  .refine((v) => v.salePrice === undefined || v.salePrice < v.price, {
    message: "Sale price must be lower than the regular price.",
    path: ["salePrice"],
  });

export const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, "Name is required.").max(80),
  description: z.preprocess(emptyToNull, z.string().trim().max(500).nullable()),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
  isActive: z.boolean(),
});

const optionalText = (max: number) =>
  z.preprocess(emptyToNull, z.string().trim().max(max).nullable());

const optionalUrl = (host: RegExp, label: string) =>
  z.preprocess(
    emptyToNull,
    z
      .string()
      .trim()
      .max(300)
      .url("Enter a full link starting with https://")
      .refine((value) => value.startsWith("https://") && host.test(new URL(value).hostname), {
        message: `Enter a valid ${label} link.`,
      })
      .nullable(),
  );

export const settingsSchema = z
  .object({
    storeName: z.string().trim().min(2, "Store name is required.").max(80),
    primaryPhone: optionalText(30),
    secondaryPhone: optionalText(30),
    whatsappPhone: optionalText(30),
    contactEmail: z.preprocess(emptyToNull, z.string().trim().email("Enter a valid email.").max(320).nullable()),
    address: optionalText(300),
    instagramUrl: optionalUrl(/(^|\.)instagram\.com$/i, "Instagram"),
    tiktokUrl: optionalUrl(/(^|\.)tiktok\.com$/i, "TikTok"),
    deliveryFee: requiredNumber(100_000, "Enter the delivery fee."),
    freeShippingEnabled: z.boolean(),
    freeShippingThreshold: optionalNumber(10_000_000),
    returnWindowDays: z.coerce.number().int().min(0).max(90),
    returnPolicySummary: optionalText(500),
    announcementEnabled: z.boolean(),
    announcementText: optionalText(200),
    heroImage: z
      .object({ url: z.string().url().max(500), publicId: z.string().max(300).nullable().optional() })
      .nullable(),
  })
  .refine((v) => !v.freeShippingEnabled || v.freeShippingThreshold === undefined || v.freeShippingThreshold >= 0, {
    path: ["freeShippingThreshold"],
    message: "Enter a valid amount.",
  })
  .refine((v) => !v.announcementEnabled || !!v.announcementText, {
    path: ["announcementText"],
    message: "Add the announcement text or turn the banner off.",
  });

export const pageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{1,60}$/),
  title: z.string().trim().min(2, "Title is required.").max(160),
  body: z.string().trim().max(20000),
  isPublished: z.boolean(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password.").max(200),
    newPassword: z
      .string()
      .min(10, "Use at least 10 characters.")
      .max(200)
      .refine((v) => /[a-zA-Z]/.test(v) && /\d/.test(v), "Include letters and numbers."),
    confirmPassword: z.string().max(200),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const changeEmailSchema = z.object({
  newEmail: z
    .string()
    .trim()
    .min(1, "Enter a new email address.")
    .email("Enter a valid email address.")
    .max(320)
    .toLowerCase(),
  currentPassword: z
    .string()
    .min(1, "Enter your current password to confirm this change."),
});

export const orderStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"]),
  note: z.preprocess(emptyToNull, z.string().trim().max(300).nullable()),
});

export type ActionState = {
  ok?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
