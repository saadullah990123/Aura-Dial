import { config } from "dotenv";
import { resolve } from "node:path";
import { z } from "zod";

// Next.js loads .env.local automatically; this also covers tsx scripts
// (db:seed, admin:create) and drizzle-kit.

config({ path: resolve(process.cwd(), ".env") });

const serverEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required.")
    .refine((value) => !value.includes("USER:PASSWORD@HOST"), {
      message:
        "DATABASE_URL still has the placeholder value. Paste your Neon connection string.",
    }),
  SESSION_SECRET: z
    .string()
    .min(64, "SESSION_SECRET must be at least 64 characters."),
  // Optional until product image uploads are used. Checked when Cloudinary is first used.
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("Aura Dial <no-reply@example.com>"),
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const parsed = serverEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || undefined,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || undefined,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || undefined,
  RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
  EMAIL_FROM: process.env.EMAIL_FROM || undefined,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsed.success) {
  console.error(
    "Invalid server environment variables:",
    z.flattenError(parsed.error).fieldErrors,
  );
  throw new Error(
    "Invalid environment variables. Check .env.local (see .env.example).",
  );
}

export const env = parsed.data;
