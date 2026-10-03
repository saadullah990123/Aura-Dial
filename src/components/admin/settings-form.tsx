"use client";

import { startTransition, useActionState, useState } from "react";

import { saveSettingsAction } from "@/app/admin/(dashboard)/settings/actions";
import { type UploadedImage, ImageUploader } from "@/components/admin/image-uploader";
import { Checkbox, Field, inputClass, Notice, SubmitButton } from "@/components/admin/ui";
import type { ActionState } from "@/lib/validations/admin";

export type SettingsValues = {
  storeName: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappPhone: string;
  contactEmail: string;
  address: string;
  instagramUrl: string;
  tiktokUrl: string;
  deliveryFee: string;
  freeShippingEnabled: boolean;
  freeShippingThreshold: string;
  returnWindowDays: string;
  returnPolicySummary: string;
  announcementEnabled: boolean;
  announcementText: string;
  heroImage: UploadedImage | null;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function SettingsForm({ initial }: { initial: SettingsValues }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(saveSettingsAction, {});
  const [hero, setHero] = useState<UploadedImage[]>(initial.heroImage ? [initial.heroImage] : []);
  const e = state.fieldErrors ?? {};

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.set("heroImage", JSON.stringify(hero[0] ?? null));
        startTransition(() => formAction(data));
      }}
      className="space-y-6"
    >
      <Notice state={state} />

      <Section title="Store">
        <Field label="Store name" name="storeName" error={e.storeName} required>
          <input id="storeName" name="storeName" defaultValue={initial.storeName} required className={inputClass} />
        </Field>
        <ImageUploader value={hero} onChange={setHero} folder="hero" max={1} label="Homepage hero image (optional)" />
        <p className="-mt-3 text-xs text-stone-500">Shown on the right of the homepage banner. A wide, dark-toned photo works best.</p>
      </Section>

      <Section title="Contact">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Primary phone" name="primaryPhone" error={e.primaryPhone}><input id="primaryPhone" name="primaryPhone" defaultValue={initial.primaryPhone} className={inputClass} /></Field>
          <Field label="Secondary phone" name="secondaryPhone" error={e.secondaryPhone}><input id="secondaryPhone" name="secondaryPhone" defaultValue={initial.secondaryPhone} className={inputClass} /></Field>
          <Field label="WhatsApp number" name="whatsappPhone" error={e.whatsappPhone}><input id="whatsappPhone" name="whatsappPhone" defaultValue={initial.whatsappPhone} className={inputClass} /></Field>
        </div>
        <Field label="Contact email" name="contactEmail" error={e.contactEmail}><input id="contactEmail" name="contactEmail" type="email" defaultValue={initial.contactEmail} className={inputClass} /></Field>
        <Field label="Address" name="address" error={e.address}><textarea id="address" name="address" rows={2} defaultValue={initial.address} className={inputClass} /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Instagram link" name="instagramUrl" error={e.instagramUrl}><input id="instagramUrl" name="instagramUrl" type="url" placeholder="https://instagram.com/yourstore" defaultValue={initial.instagramUrl} className={inputClass} /></Field>
          <Field label="TikTok link" name="tiktokUrl" error={e.tiktokUrl}><input id="tiktokUrl" name="tiktokUrl" type="url" placeholder="https://tiktok.com/@yourstore" defaultValue={initial.tiktokUrl} className={inputClass} /></Field>
        </div>
      </Section>

      <Section title="Delivery & returns">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Delivery fee (Rs.)" name="deliveryFee" error={e.deliveryFee} required><input id="deliveryFee" name="deliveryFee" type="number" min="0" step="1" defaultValue={initial.deliveryFee} required className={inputClass} /></Field>
          <Field label="Free shipping above (Rs.)" name="freeShippingThreshold" error={e.freeShippingThreshold}><input id="freeShippingThreshold" name="freeShippingThreshold" type="number" min="0" step="1" defaultValue={initial.freeShippingThreshold} className={inputClass} /></Field>
          <Field label="Return window (days)" name="returnWindowDays" error={e.returnWindowDays}><input id="returnWindowDays" name="returnWindowDays" type="number" min="0" max="90" defaultValue={initial.returnWindowDays} className={inputClass} /></Field>
        </div>
        <Checkbox name="freeShippingEnabled" label="Offer free shipping above that amount" defaultChecked={initial.freeShippingEnabled} />
        <Field label="Return policy summary" name="returnPolicySummary" error={e.returnPolicySummary}><textarea id="returnPolicySummary" name="returnPolicySummary" rows={2} defaultValue={initial.returnPolicySummary} className={inputClass} /></Field>
      </Section>

      <Section title="Announcement banner">
        <Checkbox name="announcementEnabled" label="Show a banner at the top of the store" defaultChecked={initial.announcementEnabled} />
        <Field label="Banner text" name="announcementText" error={e.announcementText}><input id="announcementText" name="announcementText" maxLength={200} defaultValue={initial.announcementText} className={inputClass} /></Field>
      </Section>

      <SubmitButton pending={pending}>Save settings</SubmitButton>
    </form>
  );
}
