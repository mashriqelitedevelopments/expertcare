import Link from "next/link";
import { PropertySearch } from "@/components/PropertySearch";
import { Hero } from "@/components/Sections";
import { collections } from "@/lib/collections";
import { getListings, places } from "@/lib/content";
import { lp } from "@/lib/i18n";
import { NoListings } from "@/components/NoListings";
import { SHOW_LISTINGS, developers } from "@/lib/listings";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";
import { collectionH1 } from "@/views/Collection";

export function Properties({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const p = t.properties;
  const all = getListings(locale);
  const order = ["developer", "type", "community", "type-area", "budget"];
  const popular = collections()
    .filter((c) => order.includes(c.kind))
    .sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: t.detail.crumbProperties, path: "/properties/" },
  ];
  if (!SHOW_LISTINGS) {
    return (
      <>
        <Hero small image="l-marina" crumbs={crumbs} h1={p.h1} lede={t.noListings.propertiesLede} locale={locale} />
        <NoListings locale={locale} />
      </>
    );
  }
  return (
    <>
      <Hero small image="l-marina" crumbs={crumbs} h1={p.h1} lede={t.meta.propertiesDesc} locale={locale} />

      <section className="wrap figs" aria-label={p.figsAria}>
        <div>
          <strong className="num">{all.length}</strong>
          <span>{p.figProjects}</span>
        </div>
        <div>
          <strong className="num">{developers().length}</strong>
          <span>{p.figDevelopers}</span>
        </div>
        <div>
          <strong className="num">{places(locale).length}</strong>
          <span>{p.figPlaces}</span>
        </div>
        <div>
          <strong className="num">{all.filter((l) => l.plan).length}</strong>
          <span>{p.figPlans}</span>
        </div>
      </section>

      <PropertySearch locale={locale} level="h2" />

      <section className="sec" aria-labelledby="popular-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="popular-h">{t.collection.popular}</h2>
          </div>
          <ul className="chips">
            {popular.map((c) => (
              <li key={c.slug}>
                <Link href={lp(locale, `/buy/${c.slug}/`)}>{collectionH1(locale, c, all)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
