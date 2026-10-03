ALTER TABLE "store_settings" ADD COLUMN "hero_image_url" text;--> statement-breakpoint
ALTER TABLE "store_settings" ADD COLUMN "hero_image_public_id" text;--> statement-breakpoint
CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_stock_non_negative" CHECK ("products"."stock_quantity" >= 0);--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_price_non_negative" CHECK ("products"."price" >= 0);