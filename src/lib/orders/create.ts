import { randomInt, randomUUID } from "node:crypto";

import { inArray, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  orderItems,
  orderStatusHistory,
  orders,
  products,
} from "@/db/schema";
import { computeDeliveryFee } from "@/lib/shipping";
import type { StoreSettings } from "@/lib/queries/store";
import type { OrderInput } from "@/lib/validations/order";

export class OrderError extends Error {
  constructor(
    message: string,
    public readonly status: number = 409,
  ) {
    super(message);
    this.name = "OrderError";
  }
}

const ORDER_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderNumber(now = new Date()): string {
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  let code = "";
  for (let i = 0; i < 5; i += 1) {
    code += ORDER_CODE_ALPHABET[randomInt(ORDER_CODE_ALPHABET.length)];
  }
  return `AD-${yy}${mm}${dd}-${code}`;
}

type PgError = { code?: string; message?: string; constraint?: string };

function isCode(error: unknown, code: string): boolean {
  const e = error as PgError & { cause?: PgError };
  return e?.code === code || e?.cause?.code === code;
}

/**
 * Creates an order. Prices and stock are always read from the database, never
 * trusted from the browser. The order, its lines and the stock decrements run
 * in a single batch (one transaction); a CHECK constraint on stock makes the
 * whole batch fail if anything would be oversold.
 */
export async function createOrder(
  input: OrderInput,
  settings: StoreSettings,
): Promise<{ orderNumber: string; total: number }> {
  // Merge duplicate lines.
  const wanted = new Map<string, number>();
  for (const line of input.items) {
    wanted.set(
      line.productId,
      Math.min((wanted.get(line.productId) ?? 0) + line.quantity, 10),
    );
  }

  const found = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      salePrice: products.salePrice,
      stockQuantity: products.stockQuantity,
      isActive: products.isActive,
    })
    .from(products)
    .where(inArray(products.id, [...wanted.keys()]));

  const byId = new Map(found.map((row) => [row.id, row]));
  const lines: {
    productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
  }[] = [];

  for (const [productId, quantity] of wanted) {
    const product = byId.get(productId);
    if (!product || !product.isActive) {
      throw new OrderError(
        "One of the items in your cart is no longer available. Please remove it and try again.",
      );
    }
    if (product.stockQuantity < quantity) {
      throw new OrderError(
        product.stockQuantity === 0
          ? `"${product.name}" is out of stock.`
          : `Only ${product.stockQuantity} of "${product.name}" left in stock.`,
      );
    }
    const unitPrice = Number(product.salePrice ?? product.price);
    lines.push({ productId, name: product.name, unitPrice, quantity });
  }

  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const deliveryFee = computeDeliveryFee(subtotal, settings);
  const total = subtotal + deliveryFee;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const orderId = randomUUID();
    const orderNumber = generateOrderNumber();

    try {
      await db.batch([
        db.insert(orders).values({
          id: orderId,
          orderNumber,
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          customerEmail: input.customerEmail ?? null,
          shippingAddress: input.shippingAddress,
          city: input.city,
          notes: input.notes ?? null,
          status: "pending",
          paymentMethod: "cod",
          subtotal: subtotal.toFixed(2),
          deliveryFee: deliveryFee.toFixed(2),
          total: total.toFixed(2),
        }),
        db.insert(orderItems).values(
          lines.map((l) => ({
            orderId,
            productId: l.productId,
            productName: l.name,
            unitPrice: l.unitPrice.toFixed(2),
            quantity: l.quantity,
            lineTotal: (l.unitPrice * l.quantity).toFixed(2),
          })),
        ),
        ...lines.map((l) =>
          db
            .update(products)
            .set({
              stockQuantity: sql`${products.stockQuantity} - ${l.quantity}`,
              updatedAt: new Date(),
            })
            .where(sql`${products.id} = ${l.productId}`),
        ),
        db.insert(orderStatusHistory).values({
          orderId,
          status: "pending",
          note: "Order placed by customer.",
        }),
      ]);

      return { orderNumber, total };
    } catch (error) {
      if (isCode(error, "23514")) {
        throw new OrderError(
          "Someone just bought the last of an item in your cart. Please review your cart and try again.",
        );
      }
      // 23505 = unique violation on order_number: try a new number.
      if (isCode(error, "23505")) continue;
      throw error;
    }
  }

  throw new OrderError("We couldn't place your order. Please try again.", 500);
}
