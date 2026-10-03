"use client";

import { startTransition, useActionState } from "react";

import { updateOrderStatusAction } from "@/app/admin/(dashboard)/orders/actions";
import { Field, inputClass, Notice, SubmitButton } from "@/components/admin/ui";
import type { ActionState } from "@/lib/validations/admin";

export function OrderStatusForm({
  orderId,
  options,
}: {
  orderId: string;
  options: string[];
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(updateOrderStatusAction, {});

  if (options.length === 0) {
    return (
      <div className="space-y-3">
        <Notice state={state} />
        <p className="text-sm text-stone-500">This order is closed, so its status can&apos;t change.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="space-y-4"
    >
      <input type="hidden" name="orderId" value={orderId} />
      <Notice state={state} />
      <Field label="Move to" name="status">
        <select id="status" name="status" className={`${inputClass} capitalize`}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Note (optional)" name="note" hint="Saved in the order history.">
        <input id="note" name="note" maxLength={300} className={inputClass} />
      </Field>
      <SubmitButton pending={pending} pendingText="Updating...">Update status</SubmitButton>
    </form>
  );
}
