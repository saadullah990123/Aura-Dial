import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { LEGACY_PRODUCT_ID_MAP } from "@/lib/constants/legacy-products";
import { createOrder, OrderError } from "@/lib/orders/create";
import { getStoreSettings } from "@/lib/queries/store";
import { getClientIp } from "@/lib/security/client-ip";
import { assertSameOrigin } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";
import {
  internalServerError,
  tooManyRequests,
  validationError,
} from "@/lib/security/safe-error";
import { orderInputSchema } from "@/lib/validations/order";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    if (!assertSameOrigin(request)) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return validationError("Invalid request body.");
    }

    // Auto-map any legacy showcase product IDs in items before validation
    if (
      body &&
      typeof body === "object" &&
      "items" in body &&
      Array.isArray((body as { items?: unknown[] }).items)
    ) {
      for (const item of (body as { items: Array<{ productId?: unknown }> }).items) {
        if (item && typeof item === "object" && typeof item.productId === "string") {
          const mappedId = LEGACY_PRODUCT_ID_MAP[item.productId];
          if (mappedId) {
            item.productId = mappedId;
          }
        }
      }
    }

    const parsed = orderInputSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (key === "items") {
          fieldErrors[key] ??= "One of the items in your cart is no longer valid. Please refresh your cart.";
        } else {
          fieldErrors[key] ??= issue.message;
        }
      }
      return validationError("Please check the highlighted fields.", fieldErrors);
    }

    const ip = getClientIp(request);
    const [perIp, perPhone] = await Promise.all([
      enforceRateLimit({
        action: "order_create",
        identifier: `ip:${ip}`,
        maxRequests: 8,
        windowMs: 60 * 60 * 1000,
        blockMs: 30 * 60 * 1000,
      }),
      enforceRateLimit({
        action: "order_create",
        identifier: `phone:${parsed.data.customerPhone}`,
        maxRequests: 5,
        windowMs: 60 * 60 * 1000,
        blockMs: 30 * 60 * 1000,
      }),
    ]);
    const blocked = [perIp, perPhone].find((entry) => !entry.allowed);
    if (blocked) return tooManyRequests(blocked.retryAfterSeconds);

    const settings = await getStoreSettings();
    const result = await createOrder(parsed.data, settings);

    // Stock changed: refresh cached pages so "Sold out" badges are right straight away.
    revalidatePath("/", "layout");

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof OrderError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Order creation failed:", error);
    return internalServerError();
  }
}
