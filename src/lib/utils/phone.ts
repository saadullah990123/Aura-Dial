export function normalizePakistanPhone(phone: string): string {
  if (!phone) return "";

  // 1. Strip every non-digit character (handles +, spaces, dashes, dots, parens, etc.)
  let digits = phone.replace(/\D/g, "");

  // 2. Remove international dialing prefix: 0092... -> 92...
  if (digits.startsWith("0092")) {
    digits = digits.slice(2);
  }

  // 3. Handle +9203... or 9203... (accidental 0 after country code 92) -> 923...
  if (digits.startsWith("9203") && digits.length === 13) {
    digits = `923${digits.slice(4)}`;
  }

  // 4. Handle standard local format: 03xxxxxxxxx (11 digits) -> 923xxxxxxxxx
  if (digits.startsWith("03") && digits.length === 11) {
    digits = `92${digits.slice(1)}`;
  }

  // 5. Handle bare format without leading 0: 3xxxxxxxxx (10 digits) -> 923xxxxxxxxx
  if (digits.startsWith("3") && digits.length === 10) {
    digits = `92${digits}`;
  }

  // Return digits as-is; the .refine() step will validate the final 12-digit format.
  return digits;
}