import { z } from "zod";

import { normalizePakistanPhone } from "@/lib/utils/phone";

export const pakistanMobile = z
  .string()
  .trim()
  .min(10, "Enter a valid mobile number.")
  .max(20, "Enter a valid mobile number.")
  .transform((value) => normalizePakistanPhone(value))
  .refine((value) => /^923\d{9}$/.test(value), {
    message: "Enter a valid Pakistani mobile number, e.g. 0300 1234567.",
  });

export const orderInputSchema = z.object({
  customerName: z.string().trim().min(2, "Please enter your name.").max(100),
  customerPhone: pakistanMobile,
  customerEmail: z
    .string()
    .trim()
    .max(320)
    .optional()
    .transform((value) => (value ? value.toLowerCase() : undefined))
    .refine((value) => !value || z.email().safeParse(value).success, {
      message: "Enter a valid email or leave it blank.",
    }),
  shippingAddress: z
    .string()
    .trim()
    .min(10, "Please enter your full delivery address.")
    .max(300),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  notes: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((value) => value || undefined),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().min(1).max(10),
      }),
    )
    .min(1, "Your cart is empty.")
    .max(20),
  // Honeypot: real users never fill this in.
  website: z.string().max(0).optional(),
});

export type OrderInput = z.infer<typeof orderInputSchema>;

export const trackOrderSchema = z.object({
  orderNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^(?:AD|TV)-\d{6}-[A-Z0-9]{5,8}$/, "Enter an order number like AD-260930-AB3XK."),
  phone: pakistanMobile,
});
