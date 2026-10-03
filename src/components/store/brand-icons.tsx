type IconProps = { className?: string };

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 3c.3 2.4 1.7 3.9 4 4.1v3c-1.4.1-2.7-.3-4-1.1v6.2c0 3.9-3.2 6.3-6.5 5.7-2.6-.5-4.5-2.8-4.3-5.6.2-3 2.8-5.2 5.8-4.8v3.1c-1.7-.4-3.1.8-3 2.3.1 1.4 1.3 2.3 2.6 2.1 1.1-.2 1.9-1.1 1.9-2.3V3h3.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M3.5 20.5l1.3-4.6A8.5 8.5 0 1 1 8.2 19.3L3.5 20.5Z" strokeLinejoin="round" />
      <path d="M9 8.5c.2 3.2 2.6 5.8 6 6.5l1-1.4-2-1-.9.8c-.9-.4-1.7-1.2-2.1-2.1l.8-.9-1-2L9 8.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
    </svg>
  );
}
