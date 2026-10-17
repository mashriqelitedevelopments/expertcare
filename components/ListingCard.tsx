import Link from "next/link";
import { Arrow } from "./Icons";
import { Pic } from "./Pic";
import { SaveButton } from "./SaveButton";
import type { ListingView } from "@/lib/content";
import { aed } from "@/lib/format";
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

/** A listing: the photograph, then project, homes, status and price. */
export function ListingRow({ l, locale, sizes = "140px", priority = false }: { l: ListingView; locale: Locale; sizes?: string; priority?: boolean }) {
  const t = ui(locale).card;
  return (
    <article className="row">
      <div className="row-media">
        <Pic name={l.images[0]} sizes={sizes} priority={priority} locale={locale} />
      </div>
      <div className="row-title">
        <h3>
          <Link href={lp(locale, `/properties/${l.slug}/`)} className="row-link">
            {l.title}
          </Link>
        </h3>
        <p className="m">
          <span dir="ltr">{l.developer}</span> · {l.place}
        </p>
      </div>
      <div className="row-meta">
        <p className="m">{l.typeLabel}</p>
        <p className="m">{bedRange(locale, l)}</p>
      </div>
      <div className="row-meta">
        <p className="m">{l.status === "off-plan" ? `${t.offPlan}${l.handover ? ` · ${l.handover}` : ""}` : t.ready}</p>
        {l.planLabel && <p className="m">{l.planLabel}</p>}
      </div>
      <div className="row-price">
        <p className="price">
          {l.price ? aed(l.price, locale) : t.onRequest}
          {l.price && <small>{t.from}</small>}
        </p>
      </div>
      <div className="row-save">
        <SaveButton slug={l.slug} title={l.title} locale={locale} />
      </div>
      <span className="row-arrow" aria-hidden="true">
        <Arrow />
      </span>
    </article>
  );
}
export const ListingCard = ListingRow;
