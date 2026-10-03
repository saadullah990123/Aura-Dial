export function normalizePakistanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("92") && digits.length === 12) {
    return digits;
  }

  if (digits.startsWith("0") && digits.length === 11) {
    return `92${digits.slice(1)}`;
  }

  if (digits.length === 10 && digits.startsWith("3")) {
    return `92${digits}`;
  }

  return digits;
}