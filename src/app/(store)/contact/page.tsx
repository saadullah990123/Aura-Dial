import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { WhatsAppIcon } from "@/components/store/brand-icons";
import { getStoreSettings } from "@/lib/queries/store";
import { normalizePakistanPhone } from "@/lib/utils/phone";

export const metadata: Metadata = { title: "Contact | Aura Dial" };

export default async function ContactPage() {
  const settings = await getStoreSettings();

  const phones = [settings.primaryPhone, settings.secondaryPhone].filter(
    (phone): phone is string => Boolean(phone),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
        We&apos;re here to help
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
        Contact us
      </h1>

      <ul className="mt-8 space-y-4">
        {phones.map((phone) => (
          <li key={phone} className="flex items-center gap-4 rounded-xl border border-sand bg-white p-5">
            <Phone className="size-5 text-gold-deep" />
            <a href={`tel:+${normalizePakistanPhone(phone)}`} className="font-medium text-ink hover:text-gold-deep">
              {phone}
            </a>
          </li>
        ))}

        {settings.whatsappPhone ? (
          <li className="flex items-center gap-4 rounded-xl border border-sand bg-white p-5">
            <WhatsAppIcon className="size-5 text-gold-deep" />
            <a
              href={`https://wa.me/${normalizePakistanPhone(settings.whatsappPhone)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink hover:text-gold-deep"
            >
              Chat on WhatsApp
            </a>
          </li>
        ) : null}

        {settings.contactEmail ? (
          <li className="flex items-center gap-4 rounded-xl border border-sand bg-white p-5">
            <Mail className="size-5 text-gold-deep" />
            <a href={`mailto:${settings.contactEmail}`} className="font-medium text-ink hover:text-gold-deep">
              {settings.contactEmail}
            </a>
          </li>
        ) : null}

        {settings.address ? (
          <li className="flex items-center gap-4 rounded-xl border border-sand bg-white p-5">
            <MapPin className="size-5 text-gold-deep" />
            <span className="font-medium text-ink">{settings.address}</span>
          </li>
        ) : null}
      </ul>

      {phones.length === 0 && !settings.whatsappPhone && !settings.contactEmail ? (
        <p className="mt-8 text-stone-500">Contact details will be available soon.</p>
      ) : null}
    </div>
  );
}
