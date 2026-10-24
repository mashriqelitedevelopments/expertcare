import { Mail, Phone, WhatsAppIcon } from "./Icons";
import { telLink, waLink } from "@/lib/contact";
import type { Locale } from "@/lib/locale";
import { initials, type Adviser } from "@/lib/team";
import { ui } from "@/lib/ui";

/** The named adviser for a listing, with direct lines. Rendered only when an adviser exists. */
/** `phone` and `whatsapp` are the lines to use: the adviser's own, or the brokerage's when the adviser has none. */
export function AdviserCard({ a, phone, whatsapp, message, locale }: { a: Adviser; phone: string; whatsapp: string; message: string; locale: Locale }) {
  const t = ui(locale);
  return (
    <div className="panel adviser">
      <h2 className="aside-h">{t.adviser.h}</h2>
      <div className="adviser-who">
        {a.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="adviser-face" src={a.photo} alt="" width={64} height={64} loading="lazy" />
        ) : (
          <span className="adviser-face" aria-hidden="true">
            {initials(a.name)}
          </span>
        )}
        <div>
          <p className="adviser-name">{a.name}</p>
          <p className="adviser-title">
            {a.title}
            {a.brn ? ` · ${t.adviser.brn} ${a.brn}` : ""}
          </p>
          {a.languages && a.languages.length > 0 && (
            <p className="adviser-title">
              {t.adviser.speaks} {a.languages.join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className="cta-pair">
        {phone && (
          <a href={telLink(phone)} className="cta cta-solid">
            <Phone />
            {t.contactButtons.call}
          </a>
        )}
        {a.email && (
          <a href={`mailto:${a.email}`} className="cta">
            <Mail />
            {t.contactButtons.email}
          </a>
        )}
      </div>
      {whatsapp && (
        <a href={waLink(whatsapp, message)} className="adviser-wa" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {t.adviser.orWhatsapp}
        </a>
      )}
    </div>
  );
}
