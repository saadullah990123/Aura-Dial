"use client";

import { startTransition, useActionState, useRef } from "react";

import { changeEmailAction } from "@/app/admin/(dashboard)/account/actions";
import { Field, inputClass, Notice, SubmitButton } from "@/components/admin/ui";
import type { ActionState } from "@/lib/validations/admin";

export function ChangeEmailForm({ currentEmail }: { currentEmail: string }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(changeEmailAction, {});
  const formRef = useRef<HTMLFormElement>(null);
  const e = state.fieldErrors ?? {};

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(async () => {
          await formAction(data);
        });
      }}
      className="space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <h2 className="text-base font-semibold text-stone-900">Admin Email Address</h2>
        <p className="mt-0.5 text-xs text-stone-500">
          Change the email address used to sign in to the Aura Dial admin panel.
        </p>
      </div>

      <Notice state={state} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-stone-700">Current email</label>
        <input
          type="email"
          disabled
          value={currentEmail}
          className={`${inputClass} bg-stone-50 text-stone-500 cursor-not-allowed`}
        />
      </div>

      <Field label="New email address" name="newEmail" error={e.newEmail} required>
        <input
          id="newEmail"
          name="newEmail"
          type="email"
          autoComplete="email"
          required
          placeholder="e.g. admin@auradial.com"
          className={inputClass}
        />
      </Field>

      <Field
        label="Current password"
        name="currentPassword"
        error={e.currentPassword}
        hint="Enter your current password to confirm this security change."
        required
      >
        <input
          id="emailChangeCurrentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </Field>

      <SubmitButton pending={pending}>Update email</SubmitButton>
    </form>
  );
}
