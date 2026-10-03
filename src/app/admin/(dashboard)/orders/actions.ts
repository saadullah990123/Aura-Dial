"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { orderItems, orderStatusHistory, orders, products } from "@/db/schema";
import { requireAdminOrRedirect } from "@/lib/auth/admin-action";
import { writeAudit } from "@/lib/audit";
import { NEXT_STATUSES, type OrderStatus } from "@/lib/queries/admin";
import { type ActionState, orderStatusSchema } from "@/lib/validations/admin";

const RESTOCK_ON: OrderStatus[] = ["cancelled", "returned"];

export async function updateOrderStatusAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdminOrRedirect();

  const parsed = orderStatusSchema.safeParse({
    orderId: formData.get("orderId"),
    status: formData.get("status"),
    note: formData.get("note"),
  });
  if (!parsed.success) return { error: "Choose a valid status." };
  const { orderId, status, note } = parsed.data;

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) return { error: "This order no longer exists." };

  const from = order.status as OrderStatus;
  if (!NEXT_STATUSES[from].includes(status)) {
    return { error: `An order can't move from "${from}" to "${status}".` };
  }

  // Only one request can win this conditional update, so stock is restored at most once.
  const [won] = await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(orders.id, orderId), eq(orders.status, from)))
    .returning({ id: orders.id });
  if (!won) return { error: "This order was just updated elsewhere. Reload the page and try again." };

  try {
    const lines = RESTOCK_ON.includes(status)
      ? await db.select({ productId: orderItems.productId, quantity: orderItems.quantity }).from(orderItems).where(eq(orderItems.orderId, orderId))
      : [];

    const restock = lines
      .filter((line): line is { productId: string; quantity: number } => !!line.productId)
      .map((line) =>
        db
          .update(products)
          .set({ stockQuantity: sql`${products.stockQuantity} + ${line.quantity}`, updatedAt: new Date() })
          .where(eq(products.id, line.productId)),
      );

    await db.batch([
      db.insert(orderStatusHistory).values({ orderId, status, note, changedByAdminId: admin.id }),
      ...restock,
    ]);
  } catch (error) {
    console.error("Order status follow-up failed:", error);
    return { error: "Status changed, but the history or stock update failed. Please check the order." };
  }

  await writeAudit({ adminId: admin.id, action: "order.status", entityType: "order", entityId: orderId, beforeData: { status: from }, afterData: { status } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  return { ok: true, message: `Order marked as ${status}.${RESTOCK_ON.includes(status) ? " Stock was returned to inventory." : ""}` };
}
