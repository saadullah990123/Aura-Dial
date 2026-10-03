"use client";

import { startTransition, useActionState, useRef } from "react";

import { changePasswordAction } from "@/app/admin/(dashboard)/account/actions";
import { Field, inputClass, Notice, SubmitButton } from "@/components/admin/ui";
import type { ActionState } from "@/lib/validations/admin";

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(changePasswordAction, {});
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
        <h2 className="text-base font-semibold text-stone-900">Change Password</h2>
        <p className="mt-0.5 text-xs text-stone-500">
          Ensure your account is using a secure password (minimum 10 characters).
        </p>
      </div>
      <Notice state={state} />
      <Field label="Current password" name="currentPassword" error={e.currentPassword} required>
        <input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required className={inputClass} />
      </Field>
      <Field label="New password" name="newPassword" error={e.newPassword} hint="At least 10 characters, with letters and numbers." required>
        <input id="newPassword" name="newPassword" type="password" autoComplete="new-password" required minLength={10} className={inputClass} />
      </Field>
      <Field label="Confirm new password" name="confirmPassword" error={e.confirmPassword} required>
        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className={inputClass} />
      </Field>
      <SubmitButton pending={pending}>Change password</SubmitButton>
    </form>
  );
}
