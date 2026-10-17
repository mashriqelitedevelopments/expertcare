import { ServiceCard } from "@/components/ServiceCard";
import { Hero } from "@/components/Sections";
import { getServices } from "@/lib/content";
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
      <Hero small image="viewing" locale={locale} crumbs={crumbs} h1={s.h1} lede={s.lede} />
      <section className="sec">
        <div className="wrap">
          <div className="services">
            {services.map((x) => (
              <ServiceCard key={x.slug} s={x} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
