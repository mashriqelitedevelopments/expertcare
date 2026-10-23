import Link from "next/link";
import { ContactButtons } from "./ContactButtons";
import { Pin } from "./Icons";
import { Pic } from "./Pic";
import { SaveButton } from "./SaveButton";
import type { ListingView } from "@/lib/content";
import { contactFor } from "@/lib/contact";
import { unitsFor } from "@/lib/units";
import { aed, num } from "@/lib/format";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

/** "Studio to 2 bed", "3 to 5 bed", "1 bed". */
export function bedRange(locale: Locale, l: Pick<ListingView, "beds" | "bedsMax">) {
  const t = ui(locale).card;
  if (l.beds === l.bedsMax) return l.beds === 0 ? t.studio : `${l.beds} ${t.bed}`;
  return `${l.beds === 0 ? t.studio : l.beds} ${t.to} ${l.bedsMax} ${t.bed}`;
}

/** "From AED 1,450,000", or "Price on request" when the developer publishes no price. */
export function priceLine(locale: Locale, l: Pick<ListingView, "price">) {
  const t = ui(locale).card;
  return l.price ? `${t.from} ${aed(l.price, locale)}` : t.onRequest;
}

/** Rows have no column headings any more: each listing is a photograph with three lines under it. */
export function LedgerHead(_props: { locale: Locale }) {
  return null;
}

/**
 * A listing card: the photograph with its status, then the project, where it is, what it offers,
 * the starting price and a way to act without opening the page (call and WhatsApp, or the
 * enquiry form until those numbers exist).
 */
export function ListingRow({ l, locale, sizes = "(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw", priority = false }: { l: ListingView; locale: Locale; sizes?: string; priority?: boolean }) {
  const t = ui(locale).card;
  const href = lp(locale, `/properties/${l.slug}/`);
  const c = contactFor(l);
  const units = unitsFor(l.slug);
  const u = ui(locale).units;
  return (
    <article className="lcard">
      <div className="lcard-media">
        <Pic name={l.images[0]} sizes={sizes} priority={priority} locale={locale} />
        <ul className="lcard-tags">
          <li>{l.status === "off-plan" ? t.offPlan : t.ready}</li>
          {l.handover && (
            <li>
              {t.handover} {l.handover}
            </li>
          )}
          {units && units.length > 0 && <li>{units.length === 1 ? u.chipOne : u.chipMany.replace("{n}", String(units.length))}</li>}
        </ul>
        <div className="lcard-save">
          <SaveButton slug={l.slug} title={l.title} locale={locale} />
        </div>
      </div>
      <div className="lcard-body">
        <h3>
          <Link href={href} className="lcard-link">
            {l.title}
          </Link>
        </h3>
        <p className="lcard-place">
          <Pin />
          <span>
            {l.place} · <span dir="ltr">{l.developer}</span>
          </span>
        </p>
        <ul className="lcard-specs">
          <li>{l.typeLabel}</li>
          <li>{bedRange(locale, l)}</li>
          {l.size && (
            <li>
              {t.fromSize} {num(l.size)} {t.sqft}
            </li>
          )}
        </ul>
        <div className="lcard-foot">
          <p className="lcard-price">
            <span>{l.price ? t.startingFrom : t.price}</span>
            <strong>{l.price ? aed(l.price, locale) : t.onRequest}</strong>
          </p>
          {l.planLabel && <span className="lcard-plan">{l.planLabel}</span>}
        </div>
        <ContactButtons phone={c.phone} whatsapp={c.whatsapp} message={c.message} fallback={{ href: `${href}#enquire`, label: t.ask }} locale={locale} className="cta-pair lcard-cta" />
      </div>
    </article>
  );
}
export const ListingCard = ListingRow;
