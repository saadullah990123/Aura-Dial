/**
 * Server-side safety net for image uploads.
 *
 * Photos go from the admin's browser straight to Cloudinary, so our server never sees the file
 * and the 5 MB / file-type checks in the browser can be bypassed. Before an image is SAVED we
 * therefore ask Cloudinary (server to server, signed with our secret) what was really uploaded,
 * and refuse anything that is too big, in the wrong format, in the wrong folder, or whose URL
 * does not match its public id. Rejected files are deleted from Cloudinary.
 */
import { destroyImages } from "@/lib/cloudinary/destroy";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // keep in sync with image-uploader.tsx
export const ALLOWED_IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp", "avif"]; // keep in sync with uploads/sign

// Folders the signing route uploads into.
export const PRODUCT_UPLOAD_PREFIX = "time-and-vision/products/";
export const HERO_UPLOAD_PREFIX = "time-and-vision/hero/";

export type UploadCandidate = { url: string; publicId?: string | null };
/** What Cloudinary reports about an upload; null means "no such image". */
export type CloudinaryImageInfo = { bytes?: unknown; format?: unknown } | null;
export type UploadCheck =
  | { ok: true }
  | { ok: false; message: string; rejectedPublicIds: string[] };

type Dependencies = {
  fetchInfo?: (publicId: string) => Promise<CloudinaryImageInfo>;
  destroy?: (publicIds: string[]) => Promise<void>;
};

const COULD_NOT_VERIFY = "One of the images couldn't be verified. Remove it and upload it again.";

/** Pure decision logic: no network, easy to test. Fails closed on anything unexpected. */
export function evaluateUploads(
  images: UploadCandidate[],
  infoById: Map<string, CloudinaryImageInfo>,
  folderPrefix: string,
): UploadCheck {
  let message: string | null = null;
  const rejectedPublicIds: string[] = [];

  for (const image of images) {
    const publicId = image.publicId;

    if (!publicId || !publicId.startsWith(folderPrefix) || !image.url.includes(publicId)) {
      message = message ?? COULD_NOT_VERIFY;
      continue;
    }

    const info = infoById.get(publicId);
    if (!info) {
      message = message ?? "One of the images was not found. Remove it and upload it again.";
      continue;
    }
    if (typeof info.bytes !== "number" || typeof info.format !== "string") {
      message = message ?? COULD_NOT_VERIFY;
      continue;
    }
    if (info.bytes > MAX_IMAGE_BYTES) {
      message = message ?? "An image is larger than 5 MB. Remove it and upload a smaller one.";
      rejectedPublicIds.push(publicId);
      continue;
    }
    if (!ALLOWED_IMAGE_FORMATS.includes(info.format.toLowerCase())) {
      message = message ?? "Use JPG, PNG, WebP or AVIF images. Remove the other file and try again.";
      rejectedPublicIds.push(publicId);
    }
  }

  return message ? { ok: false, message, rejectedPublicIds } : { ok: true };
}

async function fetchFromCloudinary(publicId: string): Promise<CloudinaryImageInfo> {
  const { cloudinary } = await import("@/lib/cloudinary/server");
  try {
    return await cloudinary.api.resource(publicId, { resource_type: "image", type: "upload" });
  } catch (error) {
    const failure = error as { http_code?: number; error?: { http_code?: number } };
    if ((failure?.error?.http_code ?? failure?.http_code) === 404) return null;
    throw error;
  }
}

/**
 * Checks newly uploaded images with Cloudinary. Pass ONLY images that are new (not already
 * stored), so editing a product that keeps its photos makes no Cloudinary calls at all.
 */
export async function verifyNewUploads(
  images: UploadCandidate[],
  folderPrefix: string,
  { fetchInfo = fetchFromCloudinary, destroy = destroyImages }: Dependencies = {},
): Promise<UploadCheck> {
  if (images.length === 0) return { ok: true };

  const ids = [
    ...new Set(
      images
        .map((image) => image.publicId)
        .filter((id): id is string => !!id && id.startsWith(folderPrefix)),
    ),
  ];

  const infoById = new Map<string, CloudinaryImageInfo>();
  try {
    await Promise.all(ids.map(async (id) => infoById.set(id, await fetchInfo(id))));
  } catch (error) {
    console.error("Cloudinary upload verification failed:", error);
    return {
      ok: false,
      message: "We couldn't verify the uploaded images right now. Please try again.",
      rejectedPublicIds: [],
    };
  }

  const result = evaluateUploads(images, infoById, folderPrefix);
  if (!result.ok && result.rejectedPublicIds.length > 0) {
    await destroy(result.rejectedPublicIds);
  }
  return result;
}
