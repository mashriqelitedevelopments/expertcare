import { Mail, Phone, WhatsAppIcon } from "./Icons";
import { telLink, waLink } from "@/lib/contact";
import type { Locale } from "@/lib/locale";
import { initials, type Adviser } from "@/lib/team";
import { ui } from "@/lib/ui";

/** The named adviser for a listing, with direct lines. Rendered only when an adviser exists. */
export function AdviserCard({ a, message, locale }: { a: Adviser; message: string; locale: Locale }) {
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
        {a.phone && (
          <a href={telLink(a.phone)} className="cta cta-solid">
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
      {a.whatsapp && (
        <a href={waLink(a.whatsapp, message)} className="adviser-wa" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {t.adviser.orWhatsapp}
        </a>
      )}
    </div>
  );
}
