import { Phone, WhatsAppIcon } from "./Icons";
import { telLink, waLink } from "@/lib/contact";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

/**
 * Call and WhatsApp, side by side. Each appears only when its number exists; with neither, the
 * `fallback` link (usually the listing's enquiry form) takes their place, so a card is never
 * left without an action.
 */
export function ContactButtons({
  phone,
  whatsapp,
  message,
  fallback,
  locale,
  className = "cta-pair",
}: {
  phone: string;
  whatsapp: string;
  message: string;
  fallback?: { href: string; label: string };
  locale: Locale;
  className?: string;
}) {
  const t = ui(locale).contactButtons;
  if (!phone && !whatsapp) {
    return fallback ? (
      <div className={className}>
        <a href={fallback.href} className="cta cta-solid">
          {fallback.label}
        </a>
      </div>
    ) : null;
  }
  return (
    <div className={className}>
      {phone && (
        <a href={telLink(phone)} className="cta">
          <Phone />
          {t.call}
        </a>
      )}
      {whatsapp && (
        <a href={waLink(whatsapp, message)} className="cta cta-solid" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {t.whatsapp}
        </a>
      )}
    </div>
  );
}
