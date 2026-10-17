import { lp } from "./i18n";
import type { Locale } from "./locale";
import { site } from "./site";

/** `<` is escaped so no string in the data can close the script element. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const abs = (path: string) => new URL(path, site.url).toString();

/** The absolute URL of a path in one edition. */
export const absL = (locale: Locale, path: string) => abs(lp(locale, path));

/** One id for the brokerage in every JSON-LD block, so search and AI systems join them into one entity. */
export const ORG_ID = `${site.url}/#organization`;

export const breadcrumbs = (locale: Locale, items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absL(locale, it.path) })),
});
