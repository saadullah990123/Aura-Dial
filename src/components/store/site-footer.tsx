import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/store/brand-icons";
import { getPolicyLinks, getStoreSettings } from "@/lib/queries/store";
import { normalizePakistanPhone } from "@/lib/utils/phone";

function VisaBadge() {
  return (
    <div
      className="flex h-7 w-12 items-center justify-center rounded border border-white/15 bg-white/[0.05] px-1.5 transition hover:border-gold/40 hover:bg-white/10"
      title="Visa"
      aria-label="Visa"
    >
      <span className="font-serif text-[11px] font-black italic tracking-wider text-white">
        VISA
      </span>
    </div>
  );
}

function MastercardBadge() {
  return (
    <div
      className="flex h-7 w-12 items-center justify-center rounded border border-white/15 bg-white/[0.05] px-1.5 transition hover:border-gold/40 hover:bg-white/10"
      title="Mastercard"
      aria-label="Mastercard"
    >
      <svg viewBox="0 0 32 20" className="h-4 w-auto" fill="none" aria-hidden="true">
        <circle cx="11" cy="10" r="7.5" fill="#EB001B" />
        <circle cx="21" cy="10" r="7.5" fill="#F79E1B" fillOpacity="0.88" />
      </svg>
    </div>
  );
}

function JazzCashBadge() {
  return (
    <div
      className="flex h-7 w-14 items-center justify-center rounded border border-white/15 bg-white/[0.05] px-1.5 transition hover:border-gold/40 hover:bg-white/10"
      title="JazzCash"
      aria-label="JazzCash"
    >
      <span className="font-sans text-[10px] font-black tracking-tight leading-none">
        <span className="text-[#FF2E2E]">Jazz</span>
        <span className="text-[#FFB300]">Cash</span>
      </span>
    </div>
  );
}

function EasypaisaBadge() {
  return (
    <div
      className="flex h-7 w-14 items-center justify-center rounded border border-white/15 bg-white/[0.05] px-1.5 transition hover:border-gold/40 hover:bg-white/10"
      title="Easypaisa"
      aria-label="Easypaisa"
    >
      <div className="flex items-center gap-1">
        <span className="flex size-3.5 items-center justify-center rounded-full bg-[#00A651] text-[9px] font-bold text-white leading-none">
          e
        </span>
        <span className="text-[10px] font-semibold tracking-tight text-white leading-none">
          easypaisa
        </span>
      </div>
    </div>
  );
}

export async function SiteFooter() {
  const [settings, policies] = await Promise.all([getStoreSettings(), getPolicyLinks()]);

  // Keep previous mobile numbers and any custom numbers configured
  const defaultPhones = ["03419200326", "03115059434"];
  const phones = Array.from(
    new Set(
      [settings.primaryPhone, settings.secondaryPhone, ...defaultPhones].filter(
        (phone): phone is string => Boolean(phone?.trim()),
      ),
    ),
  );

  // Email requested by user: auradial001@gmail.com
  const emails = Array.from(
    new Set(
      ["auradial001@gmail.com", settings.contactEmail].filter(
        (email): email is string => Boolean(email?.trim()),
      ),
    ),
  );

  const address = settings.address?.trim() || "Pakistan";

  const whatsappNumber = settings.whatsappPhone || "03419200326";
  const whatsappUrl = `https://wa.me/${normalizePakistanPhone(whatsappNumber)}`;

  // Hardcoded Aura Dial social links — update these URLs to change the footer links
  const AURA_SOCIALS = [
    { label: "TikTok", href: settings.tiktokUrl || "https://www.tiktok.com/@auradial1", Icon: TikTokIcon },
    { label: "Instagram", href: settings.instagramUrl || "https://www.instagram.com/aura_dial_1", Icon: InstagramIcon },
    { label: "Facebook", href: "https://www.facebook.com/share/1DSKM1wF6p/", Icon: FacebookIcon },
    { label: "WhatsApp", href: whatsappUrl, Icon: WhatsAppIcon },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Watches", href: "/collections/watches" },
    { label: "Glasses", href: "/collections/glasses" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Track Order", href: "/track-order" },
  ];

  const headingClass =
    "mb-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-gold";

  return (
    <footer className="bg-ink text-stone-300">
      <div className="mx-auto max-w-md px-4 py-10 sm:max-w-xl sm:px-6 md:max-w-7xl md:px-8 md:py-12">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-4">
          {/* Brand & Description - centered on mobile, left-aligned on desktop */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link href="/" className="inline-block transition hover:opacity-90">
              <Image
                src="/brand/logo-full.png"
                alt="Aura Dial"
                width={482}
                height={417}
                sizes="(max-width: 640px) 180px, 160px"
                className="h-auto w-40 sm:w-44 lg:w-36"
              />
            </Link>
            <p className="mt-3.5 max-w-xs text-xs sm:text-sm leading-relaxed text-stone-400">
              Watches and glasses for every style, delivered across Pakistan.
            </p>
          </div>

          {/* Quick Links & Follow Us - 2 equal columns on mobile side-by-side */}
          <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:col-span-2">
            {/* Quick Links */}
            <div className="min-w-0">
              <h3 className={headingClass}>Quick Links</h3>
              <ul className="space-y-0.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex h-9 items-center justify-between text-xs sm:text-sm text-stone-300 transition hover:text-gold"
                    >
                      <span className="truncate">{link.label}</span>
                      <ChevronRight
                        className="size-3.5 shrink-0 text-gold/75 transition-transform group-hover:translate-x-0.5 group-hover:text-gold"
                        strokeWidth={1.8}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div className="min-w-0">
              <h3 className={headingClass}>Follow Us</h3>
              <ul className="space-y-0.5">
                {AURA_SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-9 items-center justify-between text-xs sm:text-sm text-stone-300 transition hover:text-gold"
                    >
                      <span className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                        <Icon className="size-3.5 sm:size-4 shrink-0 transition-colors group-hover:text-gold" />
                        <span className="truncate">{label}</span>
                      </span>
                      <ChevronRight
                        className="size-3.5 shrink-0 text-gold/75 transition-transform group-hover:translate-x-0.5 group-hover:text-gold"
                        strokeWidth={1.8}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Get In Touch - below columns on mobile, 4th column on desktop */}
          <div className="min-w-0 border-t border-white/5 pt-6 lg:border-t-0 lg:pt-0">
            <h3 className={headingClass}>Get In Touch</h3>
            <ul className="space-y-0.5 sm:space-y-1">
              {phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:+${normalizePakistanPhone(phone)}`}
                    className="group flex h-9 items-center justify-between text-xs sm:text-sm text-stone-300 transition hover:text-gold"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Phone className="size-3.5 sm:size-4 shrink-0 text-gold" strokeWidth={1.8} />
                      <span className="truncate">{phone}</span>
                    </span>
                    <ChevronRight
                      className="size-3.5 shrink-0 text-gold/75 transition-transform group-hover:translate-x-0.5 group-hover:text-gold"
                      strokeWidth={1.8}
                    />
                  </a>
                </li>
              ))}

              {emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="group flex h-9 items-center justify-between text-xs sm:text-sm text-stone-300 transition hover:text-gold"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Mail className="size-3.5 sm:size-4 shrink-0 text-gold" strokeWidth={1.8} />
                      <span className="truncate">{email}</span>
                    </span>
                    <ChevronRight
                      className="size-3.5 shrink-0 text-gold/75 transition-transform group-hover:translate-x-0.5 group-hover:text-gold"
                      strokeWidth={1.8}
                    />
                  </a>
                </li>
              ))}

              <li>
                <div className="group flex h-9 items-center justify-between text-xs sm:text-sm text-stone-300">
                  <span className="flex min-w-0 items-center gap-2">
                    <MapPin className="size-3.5 sm:size-4 shrink-0 text-gold" strokeWidth={1.8} />
                    <span className="truncate">{address}</span>
                  </span>
                  <ChevronRight className="size-3.5 shrink-0 text-gold/75" strokeWidth={1.8} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom: Policies, Copyright & Payment Badges */}
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-stone-500">
        {policies.length > 0 ? (
          <nav aria-label="Policies" className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-1.5">
            {policies.map((policy) => (
              <Link key={policy.slug} href={policy.href} className="transition hover:text-gold">
                {policy.title}
              </Link>
            ))}
          </nav>
        ) : null}

        <p className="text-stone-400">
          © {new Date().getFullYear()} {settings.storeName || "Aura Dial"}. All rights reserved.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5" aria-label="Payment methods">
          <VisaBadge />
          <MastercardBadge />
          <JazzCashBadge />
          <EasypaisaBadge />
        </div>
      </div>
    </footer>
  );
}
