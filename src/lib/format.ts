const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Formats a numeric string/number as "Rs. 8,999". */
export function formatPrice(value: string | number): string {
  const amount = typeof value === "string" ? Number(value) : value;
  return `Rs. ${priceFormatter.format(Number.isFinite(amount) ? amount : 0)}`;
}
