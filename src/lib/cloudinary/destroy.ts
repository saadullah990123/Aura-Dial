import { env } from "@/lib/env";

const ALLOWED_PREFIX = "time-and-vision/";

/** Best-effort removal of uploaded images. Never throws. */
export async function destroyImages(publicIds: (string | null | undefined)[]) {
  const ids = [...new Set(publicIds.filter((id): id is string => !!id && id.startsWith(ALLOWED_PREFIX)))];
  if (ids.length === 0) return;

  try {
    const { cloudinary } = await import("@/lib/cloudinary/server");
    await Promise.all(ids.map((id) => cloudinary.uploader.destroy(id)));
  } catch (error) {
    console.error("Cloudinary cleanup failed:", error);
  }
}

/** Only accept image URLs that live in our own Cloudinary account. */
export function isOwnCloudinaryUrl(url: string): boolean {
  const cloud = env.CLOUDINARY_CLOUD_NAME;
  return !!cloud && url.startsWith(`https://res.cloudinary.com/${cloud}/`);
}
