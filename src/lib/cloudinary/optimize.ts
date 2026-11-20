/**
 * Injects Cloudinary auto-format and auto-quality delivery parameters
 * (f_auto,q_auto) to ensure modern AVIF/WebP delivery and avoid
 * downloading uncompressed or oversized original uploads.
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  width?: number,
): string | null | undefined {
  if (!url || typeof url !== "string") return url;
  if (!url.startsWith("https://res.cloudinary.com/")) return url;
  if (url.includes("/image/upload/f_auto") || url.includes("/image/upload/c_")) {
    return url;
  }
  const params = width ? `f_auto,q_auto,w_${width},c_limit` : "f_auto,q_auto";
  return url.replace("/image/upload/", `/image/upload/${params}/`);
}
