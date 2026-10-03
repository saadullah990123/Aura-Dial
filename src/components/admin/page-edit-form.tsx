"use client";

import { startTransition, useActionState } from "react";

import { savePageAction } from "@/app/admin/(dashboard)/pages/actions";
import { Checkbox, Field, inputClass, Notice, SubmitButton } from "@/components/admin/ui";
import type { ActionState } from "@/lib/validations/admin";

export function PageEditForm({ page }: { page: { slug: string; title: string; body: string; isPublished: boolean } }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(savePageAction, {});
  const e = state.fieldErrors ?? {};

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <input type="hidden" name="slug" value={page.slug} />
      <Notice state={state} />
      <Field label="Title" name="title" error={e.title} required>
        <input id="title" name="title" defaultValue={page.title} required maxLength={160} className={inputClass} />
      </Field>
      <Field label="Content" name="body" error={e.body} hint="Separate paragraphs with a blank line.">
        <textarea id="body" name="body" rows={12} defaultValue={page.body} maxLength={20000} className={inputClass} />
      </Field>
      <Checkbox name="isPublished" label="Published" defaultChecked={page.isPublished} />
      <SubmitButton pending={pending}>Save page</SubmitButton>
    </form>
  );
}
