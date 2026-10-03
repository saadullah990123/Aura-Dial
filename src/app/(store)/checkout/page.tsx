import type { Metadata } from "next";

import { CheckoutForm } from "@/components/store/checkout-form";
import { getPolicyLinks, getStoreSettings } from "@/lib/queries/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default async function CheckoutPage() {
  const [settings, policyLinks] = await Promise.all([getStoreSettings(), getPolicyLinks()]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">Almost there</p>
      <h1 className="mb-8 mt-1 font-serif text-3xl font-semibold text-ink">Checkout</h1>
      <CheckoutForm
        policies={policyLinks.filter((p) => p.slug === "terms-of-service" || p.slug === "privacy-policy" || p.slug === "return-policy")}
        shipping={{
          deliveryFee: settings.deliveryFee,
          freeShippingEnabled: settings.freeShippingEnabled,
          freeShippingThreshold: settings.freeShippingThreshold,
        }}
      />
    </div>
  );
}
