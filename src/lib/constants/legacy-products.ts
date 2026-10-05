/**
 * Maps legacy or local showcase watch IDs to their persistent database UUIDs.
 * Ensures that existing users who already added items to their carts
 * can check out without validation errors or having to clear their carts.
 */
export const LEGACY_PRODUCT_ID_MAP: Record<string, string> = {
  "local-watch-feiwo": "c0a80101-0001-4000-8000-000000000001",
  "local-watch-led-gold": "c0a80101-0002-4000-8000-000000000002",
  "local-watch-led-col": "c0a80101-0003-4000-8000-000000000003",
  "local-watch-matturi": "c0a80101-0004-4000-8000-000000000004",
  "local-watch-black": "c0a80101-0005-4000-8000-000000000005",
};

export function resolveProductId(id: string): string {
  return LEGACY_PRODUCT_ID_MAP[id] ?? id;
}
