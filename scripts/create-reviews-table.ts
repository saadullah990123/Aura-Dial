import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);

async function main() {
  console.log("Creating reviews table if not exists...");
  await sql`
    CREATE TABLE IF NOT EXISTS "reviews" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
      "user_name" text NOT NULL,
      "rating" integer NOT NULL,
      "comment" text NOT NULL,
      "image_url" text,
      "is_approved" boolean DEFAULT false NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "reviews_rating_range" CHECK ("rating" >= 1 AND "rating" <= 5)
    );
  `;

  await sql`CREATE INDEX IF NOT EXISTS "reviews_product_id_idx" ON "reviews" ("product_id");`;
  await sql`CREATE INDEX IF NOT EXISTS "reviews_is_approved_idx" ON "reviews" ("is_approved");`;

  console.log("Reviews table successfully created!");
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
