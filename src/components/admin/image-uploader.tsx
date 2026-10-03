"use client";

import { ImagePlus, Star, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export type UploadedImage = {
  url: string;
  publicId: string | null;
  alt?: string | null;
};

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export function ImageUploader({
  value,
  onChange,
  folder,
  max,
  label = "Images",
}: {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  folder: "products" | "hero";
  max: number;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadOne(file: File): Promise<UploadedImage> {
    const signResponse = await fetch("/api/admin/uploads/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder }),
    });
    const sign = await signResponse.json();
    if (!signResponse.ok) throw new Error(sign.error ?? "Could not start the upload.");

    const form = new FormData();
    form.append("file", file);
    form.append("api_key", sign.apiKey);
    form.append("timestamp", String(sign.timestamp));
    form.append("folder", sign.folder);
    form.append("allowed_formats", sign.allowedFormats);
    form.append("signature", sign.signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
      method: "POST",
      body: form,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message ?? "Upload failed.");
    return { url: data.secure_url, publicId: data.public_id };
  }

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);

    const room = max - value.length;
    const picked = Array.from(files).slice(0, Math.max(room, 0));
    if (picked.length < files.length) setError(`You can add up to ${max} image${max === 1 ? "" : "s"}.`);

    for (const file of picked) {
      if (!TYPES.includes(file.type)) return setError("Use JPG, PNG, WebP or AVIF images.");
      if (file.size > MAX_BYTES) return setError("Each image must be under 5 MB.");
    }

    setBusy(true);
    try {
      const uploaded: UploadedImage[] = [];
      for (const file of picked) uploaded.push(await uploadOne(file));
      onChange([...value, ...uploaded]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-stone-700">{label}</p>

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((image, index) => (
          <li key={image.url} className="group relative aspect-square overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
            <Image src={image.url} alt="" fill sizes="140px" className="object-contain p-1" />
            {index === 0 && max > 1 ? (
              <span className="absolute left-1 top-1 rounded bg-amber-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">Main</span>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/55 p-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
              {index > 0 ? (
                <button type="button" aria-label="Make main image" title="Make main image"
                  onClick={() => onChange([image, ...value.filter((_, i) => i !== index)])}
                  className="rounded p-1 text-white hover:bg-white/20">
                  <Star className="size-4" />
                </button>
              ) : <span />}
              <button type="button" aria-label="Remove image" title="Remove image"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="rounded p-1 text-white hover:bg-red-600">
                <X className="size-4" />
              </button>
            </div>
          </li>
        ))}

        {value.length < max ? (
          <li>
            <button type="button" disabled={busy} onClick={() => inputRef.current?.click()}
              className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-stone-300 text-xs text-stone-500 transition hover:border-amber-600 hover:text-amber-700 disabled:cursor-wait disabled:opacity-60">
              <ImagePlus className="size-6" />
              {busy ? "Uploading..." : "Add image"}
            </button>
          </li>
        ) : null}
      </ul>

      <input ref={inputRef} type="file" accept={TYPES.join(",")} multiple={max > 1} hidden
        onChange={(e) => onFiles(e.target.files)} />

      {error ? <p role="alert" className="mt-2 text-xs text-red-700">{error}</p> : null}
      <p className="mt-2 text-xs text-stone-500">JPG, PNG, WebP or AVIF, up to 5 MB each.</p>
    </div>
  );
}
