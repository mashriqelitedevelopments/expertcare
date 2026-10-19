import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Eyebrow, Hero } from "@/components/Sections";
import { ServiceRow } from "@/components/ServiceCard";
import { getServices } from "@/lib/content";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import { JsonLd, ORG_ID, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

export function Services({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const s = t.services;
  const services = getServices(locale);
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: s.crumb, path: "/services/" },
  ];
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: s.h1,
    itemListElement: services.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: absL(locale, servicePath(x.slug)) })),
  };
  const offers = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${t.chrome.homeAria.split(",")[0]} services`,
    provider: { "@id": ORG_ID },
    itemListElement: services.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x.name, url: absL(locale, servicePath(x.slug)) } })),
  };
  return (
    <>
      <JsonLd data={list} />
      <JsonLd data={offers} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero small image="viewing-2" locale={locale} crumbs={crumbs} h1={s.h1} lede={s.lede} caption={s.heroCaption} />
      <section className="sec tight">
        <div className="wrap">
          <div className="tbl-wrap">
            <table className="tbl tbl-left">
              <caption>{s.tableCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">{s.colService}</th>
                  <th scope="col">{s.colFor}</th>
                  <th scope="col">{s.colFee}</th>
                </tr>
              </thead>
              <tbody>
                {services.map((x) => (
                  <tr key={x.slug}>
                    <td>
                      <Link href={lp(locale, servicePath(x.slug))}>{x.short}</Link>
                    </td>
                    <td>{x.dek}</td>
                    <td>{x.fees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="index-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={1}>{s.indexEyebrow}</Eyebrow>
              <h2 id="index-h">{s.indexH}</h2>
            </div>
            <Link href={lp(locale, "/contact/")} className="more">
              {t.chrome.adviser} <Arrow />
            </Link>
          </div>
          <div className="index stagger rv">
            {services.map((x, i) => (
              <ServiceRow key={x.slug} s={x} locale={locale} idx={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
