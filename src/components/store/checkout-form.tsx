"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { WatchArt } from "@/components/store/art";
import { formatPrice } from "@/lib/format";
import { fetchJsonWithTimeout, RequestTimeoutError } from "@/lib/utils/fetch-json";
import { computeDeliveryFee, type ShippingSettings } from "@/lib/shipping";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { useCartStore } from "@/store/cart";

type FieldErrors = Record<string, string>;

function getInputClass(hasError?: boolean) {
  return `w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-sand focus:border-gold-deep focus:ring-gold/30"
  }`;
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CheckoutForm({
  shipping,
  policies = [],
}: {
  shipping: ShippingSettings;
  policies?: { slug: string; title: string; href: string }[];
}) {
  const router = useRouter();
  const online = useOnlineStatus();
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  // True once the cart has been restored from localStorage on the client.
  const hydrated = useSyncExternalStore(
    (onChange) => useCartStore.persist.onFinishHydration(onChange),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = computeDeliveryFee(subtotal, shipping);
  const total = subtotal + deliveryFee;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const data = new FormData(event.currentTarget);
    setSubmitting(true);
    setFormError(null);
    setErrors({});

    try {
      const { response, body } = await fetchJsonWithTimeout<{
        orderNumber?: string;
        error?: string;
        details?: FieldErrors;
      }>("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: String(data.get("customerName") ?? "").trim(),
          customerPhone: String(data.get("customerPhone") ?? "").trim(),
          customerEmail: String(data.get("customerEmail") ?? "").trim() || undefined,
          city: String(data.get("city") ?? "").trim(),
          shippingAddress: String(data.get("shippingAddress") ?? "").trim(),
          notes: String(data.get("notes") ?? "").trim() || undefined,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      }, 30_000);

      if (response.ok && body.orderNumber) {
        clear();
        router.push(`/order-success/${body.orderNumber}`);
        return;
      }

      const fieldDetails = body.details ?? {};
      setErrors(fieldDetails);

      const firstErrorMsg = Object.values(fieldDetails)[0];
      setFormError(firstErrorMsg || body.error || "Please check the highlighted fields.");

      // On mobile, auto-scroll to the first invalid field so it is immediately visible
      const firstErrorField = Object.keys(fieldDetails)[0];
      if (firstErrorField) {
        const targetElement = document.getElementById(firstErrorField);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
          targetElement.focus();
        }
      }
    } catch (error) {
      // After a timeout we can't know whether the server already saved the order, so do NOT
      // invite a blind retry (that could create a duplicate order).
      setFormError(
        error instanceof RequestTimeoutError
          ? "This is taking longer than usual. Your order may already have been received, so please contact us before ordering again to avoid a duplicate."
          : "Network problem. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-2xl bg-cream" aria-busy="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-sand bg-white px-6 py-16 text-center">
        <p className="font-serif text-xl text-ink">Your cart is empty</p>
        <p className="mt-2 text-sm text-stone-500">Add something you like, then come back to check out.</p>
        <Link
          href="/collections/all"
          className="mt-6 inline-block rounded-md bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-gold-deep"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-5 rounded-2xl border border-sand bg-white p-5 sm:p-7">
        <h2 className="font-serif text-xl text-ink">Delivery details</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" name="customerName" error={errors.customerName} required>
            <input
              id="customerName"
              name="customerName"
              autoComplete="name"
              required
              maxLength={100}
              aria-describedby={errors.customerName ? "customerName-error" : undefined}
              className={getInputClass(!!errors.customerName)}
            />
          </Field>
          <Field label="Mobile number" name="customerPhone" error={errors.customerPhone} required>
            <input
              id="customerPhone"
              name="customerPhone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0349 5302487 or +92 349 5302487"
              required
              aria-describedby={errors.customerPhone ? "customerPhone-error" : undefined}
              className={getInputClass(!!errors.customerPhone)}
            />
          </Field>
        </div>

        <Field label="Email (optional)" name="customerEmail" error={errors.customerEmail}>
          <input
            id="customerEmail"
            name="customerEmail"
            type="email"
            autoComplete="email"
            className={getInputClass(!!errors.customerEmail)}
          />
        </Field>

        <Field label="City" name="city" error={errors.city} required>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            required
            maxLength={80}
            className={getInputClass(!!errors.city)}
          />
        </Field>

        <Field label="Full address" name="shippingAddress" error={errors.shippingAddress} required>
          <textarea
            id="shippingAddress"
            name="shippingAddress"
            rows={3}
            autoComplete="street-address"
            required
            maxLength={300}
            placeholder="House / street / area"
            className={getInputClass(!!errors.shippingAddress)}
          />
        </Field>

        <Field label="Order notes (optional)" name="notes" error={errors.notes}>
          <textarea
            id="notes"
            name="notes"
            rows={2}
            maxLength={500}
            className={getInputClass(!!errors.notes)}
          />
        </Field>
      </div>

      <aside className="h-fit space-y-4 rounded-2xl border border-sand bg-white p-5 sm:p-7 lg:sticky lg:top-24">
        <h2 className="font-serif text-xl text-ink">Order summary</h2>

        <ul className="divide-y divide-sand">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-3 py-3">
              <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cream">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt="" fill sizes="56px" className="object-contain p-1" />
                ) : (
                  <WatchArt tone="gold" className="h-11 w-auto" />
                )}
              </div>
              <div className="min-w-0 flex-1 text-sm">
                <p className="line-clamp-2 font-medium text-ink">{item.name}</p>
                <p className="text-stone-500">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-ink">{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>

        <dl className="space-y-2 border-t border-sand pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-stone-600">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between">
            <dt className="text-stone-600">Delivery</dt>
            <dd>{deliveryFee === 0 ? <span className="font-medium text-emerald-700">Free</span> : formatPrice(deliveryFee)}</dd>
          </div>
          <div className="flex justify-between border-t border-sand pt-3 font-serif text-xl text-ink">
            <dt>Total</dt><dd>{formatPrice(total)}</dd>
          </div>
        </dl>

        <p className="rounded-lg bg-cream px-4 py-3 text-xs leading-5 text-stone-600">
          <strong className="text-ink">Cash on delivery.</strong> Pay the rider when your order arrives.
          Final prices are confirmed when your order is placed.
        </p>

        {policies.length > 0 ? (
          <p className="text-xs leading-5 text-stone-500">
            By placing your order you agree to our{" "}
            {policies.map((policy, i) => (
              <span key={policy.slug}>
                {i > 0 ? (i === policies.length - 1 ? " and " : ", ") : ""}
                <Link href={policy.href} target="_blank" className="underline hover:text-ink">{policy.title}</Link>
              </span>
            ))}
            .
          </p>
        ) : null}

        {formError ? (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || !online}
          className="w-full rounded-md bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-gold-deep disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "Placing order..." : online ? "Place order" : "Offline: reconnect to order"}
        </button>
      </aside>
    </form>
  );
}
