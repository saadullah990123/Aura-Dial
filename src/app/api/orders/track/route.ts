import { and, asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { orderItems, orderStatusHistory, orders } from "@/db/schema";
import { getClientIp } from "@/lib/security/client-ip";
import { assertSameOrigin } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";
import {
  internalServerError,
  tooManyRequests,
  validationError,
} from "@/lib/security/safe-error";
import { trackOrderSchema } from "@/lib/validations/order";

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

    const parsed = trackOrderSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error.issues[0]?.message ?? "Invalid details.");
    }

    const limit = await enforceRateLimit({
      action: "order_track",
      identifier: `ip:${getClientIp(request)}`,
      maxRequests: 10,
      windowMs: 15 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    });
    if (!limit.allowed) return tooManyRequests(limit.retryAfterSeconds);

    const [order] = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.orderNumber, parsed.data.orderNumber),
          eq(orders.customerPhone, parsed.data.phone),
        ),
      )
      .limit(1);

    // Same message whether the number or the phone was wrong.
    if (!order) {
      return NextResponse.json(
        { error: "We couldn't find an order with those details." },
        { status: 404 },
      );
    }

    const [items, history] = await Promise.all([
      db.select().from(orderItems).where(eq(orderItems.orderId, order.id)),
      db
        .select({ status: orderStatusHistory.status, createdAt: orderStatusHistory.createdAt })
        .from(orderStatusHistory)
        .where(eq(orderStatusHistory.orderId, order.id))
        .orderBy(asc(orderStatusHistory.createdAt)),
    ]);

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
      placedAt: order.createdAt,
      subtotal: Number(order.subtotal),
      deliveryFee: Number(order.deliveryFee),
      total: Number(order.total),
      items: items.map((i) => ({
        name: i.productName,
        quantity: i.quantity,
        lineTotal: Number(i.lineTotal),
      })),
      history,
    });
  } catch (error) {
    console.error("Order tracking failed:", error);
    return internalServerError();
  }
}
