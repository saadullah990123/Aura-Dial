"use client";

import { useFormStatus } from "react-dom";

import { useOnlineStatus } from "@/hooks/use-online-status";

export const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/25 disabled:bg-stone-100";

export function Field({
  label,
  name,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-stone-700">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="mt-1 text-xs text-stone-500">{hint}</p> : null}
      {error ? (
        <p role="alert" className="mt-1 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-stone-700">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="size-4 rounded border-stone-300 accent-amber-700"
      />
      {label}
    </label>
  );
}

export function SubmitButton({
  children,
  pendingText = "Saving...",
  variant = "primary",
  pending: pendingOverride,
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: "primary" | "danger";
  /** Pass when the form is submitted manually (so React doesn't reset it on error). */
  pending?: boolean;
}) {
  const status = useFormStatus();
  const online = useOnlineStatus();
  const pending = pendingOverride ?? status.pending;
  const styles =
    variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-stone-900 text-white hover:bg-amber-700";
  return (
    <button
      type="submit"
      disabled={pending || !online}
      title={online ? undefined : "You're offline. Reconnect to save."}
      className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${styles}`}
    >
      {pending ? pendingText : online ? children : "Offline"}
    </button>
  );
}

export function Notice({
  state,
}: {
  state: { ok?: boolean; message?: string; error?: string };
}) {
  if (state.error) {
    return (
      <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        {state.error}
      </p>
    );
  }
  if (state.ok && state.message) {
    return (
      <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        {state.message}
      </p>
    );
  }
  return null;
}

/** Submit button that asks for confirmation first (for destructive actions). */
export function ConfirmButton({
  children,
  message,
}: {
  children: React.ReactNode;
  message: string;
}) {
  const { pending } = useFormStatus();
  const online = useOnlineStatus();
  return (
    <button
      type="submit"
      disabled={pending || !online}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
      className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Deleting..." : children}
    </button>
  );
}
