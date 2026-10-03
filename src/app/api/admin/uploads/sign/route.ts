import { NextRequest, NextResponse } from "next/server";

import { requireAdmin, unauthorizedResponse } from "@/lib/auth/require-admin";
import { assertSameOrigin } from "@/lib/security/csrf";

export const runtime = "nodejs";

const FOLDERS: Record<string, string> = {
  products: "time-and-vision/products",
  hero: "time-and-vision/hero",
};
const ALLOWED_FORMATS = "jpg,jpeg,png,webp,avif";

/** Issues a short-lived signature so the browser can upload straight to Cloudinary. */
export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    await requireAdmin();
  } catch {
    return unauthorizedResponse();
  }

  const body = (await request.json().catch(() => ({}))) as { folder?: string };
  const folder = FOLDERS[body.folder ?? ""];
  if (!folder) {
    return NextResponse.json({ error: "Unknown upload folder." }, { status: 400 });
  }

  try {
    const { cloudinary } = await import("@/lib/cloudinary/server");
    const timestamp = Math.floor(Date.now() / 1000);
    const params = { allowed_formats: ALLOWED_FORMATS, folder, timestamp };
    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET as string,
    );

    return NextResponse.json({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      timestamp,
      folder,
      allowedFormats: ALLOWED_FORMATS,
      signature,
    });
  } catch {
    return NextResponse.json(
      { error: "Image uploads are not configured. Add your Cloudinary keys to .env.local." },
      { status: 503 },
    );
  }
}
