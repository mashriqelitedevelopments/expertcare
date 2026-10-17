import Link from "next/link";
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

export function ListingCard({
  l,
  locale,
  sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw",
  priority = false,
}: {
  l: ListingView;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
}) {
  const t = ui(locale).card;
  return (
    <article className="card">
      <div className="card-media">
        <Pic name={l.images[0]} sizes={sizes} priority={priority} locale={locale} />
        {l.status === "off-plan" && (
          <span className="card-tag">
            {t.offPlan}
            {l.handover ? ` · ${t.handover} ${l.handover}` : ""}
          </span>
        )}
        <SaveButton slug={l.slug} title={l.title} locale={locale} />
      </div>
      <div className="card-body">
        <p className="card-price num">{priceLine(locale, l)}</p>
        <h3 className="card-title">
          <Link href={lp(locale, `/properties/${l.slug}/`)} className="card-link">
            {l.title}
          </Link>
        </h3>
        <p className="card-meta">
          <span dir="ltr">{l.developer}</span> · {l.place}
        </p>
        <p className="card-meta">
          {l.typeLabel} · {bedRange(locale, l)}
        </p>
      </div>
    </article>
  );
}
