import { AREAS } from "./areas";
import type { Locale } from "./locale";
import { servicePath } from "./paths";
import { ORG_ID, abs } from "./seo";
import { SERVICES } from "./services";
import { site } from "./site";
import { ui } from "./ui";

/** One organisation entity for the whole site, and one WebSite node. */
export const orgLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": ORG_ID,
  name: site.name,
  legalName: site.legalName,
  knowsAbout: [
    "Buying property in Dubai",
    "Selling property in Dubai",
    "Renting property in Dubai",
    "Property management in Dubai",
    "Dubai Land Department fees",
    "Off-plan property in Dubai",
    "UAE mortgages",
    "Dubai Golden Visa through property",
    ...AREAS.map((a) => a.name),
  ],
  url: site.url,
  logo: abs("/icon.svg"),
  image: abs("/img/hero-1280.jpg"),
  description: site.description,
  areaServed: { "@type": "City", name: "Dubai" },
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  availableLanguage: ["en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${site.name} services`,
    itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: abs(servicePath(s.slug)) } })),
  },
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.email ? { email: site.email } : {}),
  ...(Object.values(site.social).some(Boolean) ? { sameAs: Object.values(site.social).filter(Boolean) } : {}),
};

export const websiteLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: `${site.url}/`,
  inLanguage: "en-AE",
  description: ui(locale).meta.homeDesc,
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${site.url}/properties/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});
