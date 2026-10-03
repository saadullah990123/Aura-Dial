"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";

import { saveProductAction } from "@/app/admin/(dashboard)/products/actions";
import { type UploadedImage, ImageUploader } from "@/components/admin/image-uploader";
import { Checkbox, Field, inputClass, Notice, SubmitButton } from "@/components/admin/ui";
import type { ActionState } from "@/lib/validations/admin";

export type ProductFormValues = {
  id?: string;
  name: string;
  categoryId: string;
  brand: string;
  gender: "men" | "women" | "unisex";
  description: string;
  price: string;
  salePrice: string;
  stockQuantity: string;
  isFeatured: boolean;
  isBestseller: boolean;
  isActive: boolean;
  images: UploadedImage[];
};

export const EMPTY_PRODUCT: ProductFormValues = {
  name: "",
  categoryId: "",
  brand: "",
  gender: "unisex",
  description: "",
  price: "",
  salePrice: "",
  stockQuantity: "0",
  isFeatured: false,
  isBestseller: false,
  isActive: true,
  images: [],
};

export function ProductForm({
  initial,
  categories,
}: {
  initial: ProductFormValues;
  categories: { id: string; name: string }[];
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(saveProductAction, {});
  const [images, setImages] = useState<UploadedImage[]>(initial.images);
  const errors = state.fieldErrors ?? {};

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("images", JSON.stringify(images));
    startTransition(() => formAction(data));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {initial.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <Notice state={state} />

      <section className="space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold">Details</h2>
        <Field label="Product name" name="name" error={errors.name} required>
          <input id="name" name="name" defaultValue={initial.name} required maxLength={160} className={inputClass} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Category" name="categoryId" error={errors.categoryId}>
            <select id="categoryId" name="categoryId" defaultValue={initial.categoryId} className={inputClass}>
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="For" name="gender" error={errors.gender}>
            <select id="gender" name="gender" defaultValue={initial.gender} className={inputClass}>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </Field>
          <Field label="Brand" name="brand" error={errors.brand}>
            <input id="brand" name="brand" defaultValue={initial.brand} maxLength={80} className={inputClass} />
          </Field>
        </div>
        <Field label="Description" name="description" error={errors.description} hint="Separate paragraphs with a blank line.">
          <textarea id="description" name="description" rows={5} defaultValue={initial.description} maxLength={5000} className={inputClass} />
        </Field>
      </section>

      <section className="space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold">Pricing &amp; stock</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Price (Rs.)" name="price" error={errors.price} required>
            <input id="price" name="price" type="number" inputMode="decimal" min="0" step="1" defaultValue={initial.price} required className={inputClass} />
          </Field>
          <Field label="Sale price (Rs.)" name="salePrice" error={errors.salePrice} hint="Leave empty if not on sale.">
            <input id="salePrice" name="salePrice" type="number" inputMode="decimal" min="0" step="1" defaultValue={initial.salePrice} className={inputClass} />
          </Field>
          <Field label="Stock quantity" name="stockQuantity" error={errors.stockQuantity} required>
            <input id="stockQuantity" name="stockQuantity" type="number" inputMode="numeric" min="0" step="1" defaultValue={initial.stockQuantity} required className={inputClass} />
          </Field>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Checkbox name="isActive" label="Visible in store" defaultChecked={initial.isActive} />
          <Checkbox name="isBestseller" label="Show in Best Sellers" defaultChecked={initial.isBestseller} />
          <Checkbox name="isFeatured" label="Featured" defaultChecked={initial.isFeatured} />
        </div>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <ImageUploader value={images} onChange={setImages} folder="products" max={8} label="Photos" />
        {errors.images ? <p role="alert" className="mt-2 text-xs text-red-700">{errors.images}</p> : null}
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton pending={pending}>{initial.id ? "Save changes" : "Create product"}</SubmitButton>
        <Link href="/admin/products" className="rounded-lg px-4 py-2.5 text-sm text-stone-600 hover:text-stone-900">Cancel</Link>
      </div>
    </form>
  );
}
