import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/store/brand-icons";
import { getPolicyLinks, getStoreSettings } from "@/lib/queries/store";
import { normalizePakistanPhone } from "@/lib/utils/phone";

export async function SiteFooter() {
  const [settings, policies] = await Promise.all([getStoreSettings(), getPolicyLinks()]);

  const whatsappUrl = settings.whatsappPhone
    ? `https://wa.me/${normalizePakistanPhone(settings.whatsappPhone)}`
    : null;

  // Hardcoded Aura Dial social links — update these URLs to change the footer links
  const AURA_SOCIALS = [
    { label: "TikTok", href: "https://www.tiktok.com/@auradial1", Icon: TikTokIcon },
    { label: "Instagram", href: "https://www.instagram.com/aura_dial_1", Icon: InstagramIcon },
    { label: "Facebook", href: "https://www.facebook.com/share/1DSKM1wF6p/", Icon: FacebookIcon },
    ...(whatsappUrl ? [{ label: "WhatsApp", href: whatsappUrl, Icon: WhatsAppIcon }] : []),
  ];

  const headingClass = "text-[11px] font-semibold uppercase tracking-[0.2em] text-gold";

  return (
    <footer className="bg-ink text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/brand/logo-full.png"
            alt="Aura Dial"
            width={482}
            height={417}
            sizes="160px"
            className="h-auto w-36"
          />
          <p className="mt-4 max-w-xs text-sm leading-6 text-stone-400">
            Watches and glasses for every style, delivered across Pakistan.
          </p>
        </div>

        <div>
          <h3 className={headingClass}>Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "Watches", href: "/collections/watches" },
              { label: "Glasses", href: "/collections/glasses" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Track Order", href: "/track-order" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={headingClass}>Follow Us</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {AURA_SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition hover:text-gold"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={headingClass}>Get In Touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {settings.primaryPhone ? (
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-gold" />
                <a href={`tel:+${normalizePakistanPhone(settings.primaryPhone)}`} className="hover:text-gold">
                  {settings.primaryPhone}
                </a>
              </li>
            ) : null}
            {settings.secondaryPhone ? (
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-gold" />
                <a href={`tel:+${normalizePakistanPhone(settings.secondaryPhone)}`} className="hover:text-gold">
                  {settings.secondaryPhone}
                </a>
              </li>
            ) : null}
            {settings.contactEmail ? (
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-gold" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-gold">
                  {settings.contactEmail}
                </a>
              </li>
            ) : null}
            {settings.address ? (
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{settings.address}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-5 text-center text-xs text-stone-500">
        {policies.length > 0 ? (
          <nav aria-label="Policies" className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
            {policies.map((policy) => (
              <Link key={policy.slug} href={policy.href} className="transition hover:text-gold">
                {policy.title}
              </Link>
            ))}
          </nav>
        ) : null}
        © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
      </div>
    </footer>
  );
}
