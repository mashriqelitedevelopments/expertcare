import Link from "next/link";
import { PropertySearch } from "@/components/PropertySearch";
import { collections } from "@/lib/collections";
import { getListings } from "@/lib/content";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";
import { collectionH1 } from "@/views/Collection";

export function Properties({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const all = getListings(locale);
  const order = ["developer", "type", "community", "type-area", "budget"];
  const popular = collections()
    .filter((c) => order.includes(c.kind))
    .sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));
  return (
    <>
      <PropertySearch locale={locale} />
      <section className="sec stone" aria-labelledby="popular-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="popular-h">{t.collection.popular}</h2>
          </div>
          <ul className="links">
            {popular.map((c) => {
              return (
                <li key={c.slug}>
                  <Link href={lp(locale, `/buy/${c.slug}/`)}>{collectionH1(locale, c, all)}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
