import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPG, PNG, WebP, or AVIF image." },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image size must be less than 5 MB." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Try Cloudinary first if configured
    try {
      const { cloudinary } = await import("@/lib/cloudinary/server");
      const base64Data = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64Data}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "time-and-vision/reviews",
        resource_type: "image",
      });

      if (uploadResult?.secure_url) {
        return NextResponse.json({ url: uploadResult.secure_url });
      }
    } catch (cloudinaryError) {
      console.warn("Cloudinary upload fallback to local storage:", cloudinaryError);
    }

    // Local file storage fallback
    const uploadsDir = join(process.cwd(), "public", "uploads", "reviews");
    await mkdir(uploadsDir, { recursive: true });

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `review-${randomUUID()}.${ext}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    const localUrl = `/uploads/reviews/${filename}`;

    return NextResponse.json({ url: localUrl });
  } catch (error) {
    console.error("Review upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload image. Please try again." },
      { status: 500 },
    );
  }
}
