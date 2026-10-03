export type ShippingSettings = {
  deliveryFee: number;
  freeShippingEnabled: boolean;
  freeShippingThreshold: number | null;
};

/** Delivery fee for a given subtotal. Shared by the cart, checkout and the server. */
export function computeDeliveryFee(
  subtotal: number,
  settings: ShippingSettings,
): number {
  if (!settings.freeShippingEnabled) return settings.deliveryFee;
  if (settings.freeShippingThreshold === null) return 0;
  return subtotal >= settings.freeShippingThreshold ? 0 : settings.deliveryFee;
}
