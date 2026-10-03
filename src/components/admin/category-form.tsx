"use client";

import Link from "next/link";
import { startTransition, useActionState } from "react";

import { saveCategoryAction } from "@/app/admin/(dashboard)/categories/actions";
import { Checkbox, Field, inputClass, Notice, SubmitButton } from "@/components/admin/ui";
import type { ActionState } from "@/lib/validations/admin";

export function CategoryForm({
  initial,
}: {
  initial?: { id: string; name: string; description: string; sortOrder: number; isActive: boolean };
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(saveCategoryAction, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="space-y-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
    >
      <h2 className="font-semibold">{initial ? "Edit category" : "Add category"}</h2>
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <Notice state={state} />
      <Field label="Name" name="name" error={errors.name} required>
        <input id="name" name="name" defaultValue={initial?.name} required maxLength={80} className={inputClass} />
      </Field>
      <Field label="Description" name="description" error={errors.description}>
        <textarea id="description" name="description" rows={2} defaultValue={initial?.description} maxLength={500} className={inputClass} />
      </Field>
      <Field label="Sort order" name="sortOrder" error={errors.sortOrder} hint="Lower numbers appear first.">
        <input id="sortOrder" name="sortOrder" type="number" min="0" defaultValue={initial?.sortOrder ?? 0} className={inputClass} />
      </Field>
      <Checkbox name="isActive" label="Active" defaultChecked={initial?.isActive ?? true} />
      <div className="flex items-center gap-3">
        <SubmitButton pending={pending}>{initial ? "Save changes" : "Add category"}</SubmitButton>
        {initial ? <Link href="/admin/categories" className="text-sm text-stone-600 hover:text-stone-900">Cancel</Link> : null}
      </div>
    </form>
  );
}
