import { AREAS, areaFaqs as baseAreaFaqs, type Area } from "./areas";
import { FACTS, FACT_FAQS, FACT_SOURCES } from "./facts";
import { GLOSSARY, type Term } from "./glossary";
import { GUIDES, type Guide } from "./guides";
import { LISTINGS, devSlug, type Listing } from "./listings";
import type { Locale } from "./locale";
import { SERVICES, type Service } from "./services";

/**
 * One place to read content. The data modules are the single source of structure, slugs, numbers,
 * images and dates; a second language would be merged over them here, field by field, so a
 * missing translation shows English rather than an empty page.
 */
export function getAreas(_locale: Locale = "en"): Area[] {
  return AREAS;
}
export const getArea = (locale: Locale, slug: string) => getAreas(locale).find((a) => a.slug === slug);
export const areaName = (locale: Locale, slug: string) => getArea(locale, slug)?.name ?? slug;

/** A listing with its display labels: `type` stays English because filters and URLs use it. */
export type ListingView = Listing & { typeLabel: string; planLabels?: string[]; place: string };

const TYPE_EN: Record<Listing["type"], string> = { Apartment: "Apartments", Penthouse: "Penthouses", Villa: "Villas", Townhouse: "Townhouses" };

/** Projects with display labels; `place` is the area guide's name when the project sits in one,
 * else the community. */
export function getListings(locale: Locale = "en"): ListingView[] {
  return LISTINGS.map((l) => ({
    ...l,
    typeLabel: l.types.map((x) => TYPE_EN[x]).join(", "),
    place: l.area ? areaName(locale, l.area) : l.community,
  }));
}

/** Search locations: the area guides first, then every other community in the inventory. */
/** Search locations: only places with homes listed, so no search option leads to an empty page. */
export function places(locale: Locale = "en"): { value: string; label: string }[] {
  const listed = new Set(getListings(locale).map((l) => l.area).filter(Boolean));
  const guides = getAreas(locale)
    .filter((a) => listed.has(a.slug))
    .map((a) => ({ value: a.slug, label: a.name }));
  const seen = new Set(guides.map((g) => g.value));
  const others = getListings(locale)
    .filter((l) => !l.area)
    .map((l) => ({ value: devSlug(l.community), label: l.community }))
    .filter((o) => (seen.has(o.value) ? false : (seen.add(o.value), true)))
    .sort((a, b) => a.label.localeCompare(b.label, "en"));
  return [...guides, ...others];
}
/** Does a listing sit in the searched location (an area guide slug or a community slug)? */
export const inPlace = (l: Listing, place: string) => l.area === place || devSlug(l.community) === place;

export const getListing = (locale: Locale, slug: string) => getListings(locale).find((l) => l.slug === slug);
export const listingsInArea = (locale: Locale, area: string) => getListings(locale).filter((l) => l.area === area);

export function getGuides(_locale: Locale = "en"): Guide[] {
  return GUIDES;
}
export const getGuide = (locale: Locale, slug: string) => getGuides(locale).find((g) => g.slug === slug);

/** The order services appear in everywhere (menu, footer, services page): the resale and off-plan
 * work first, renting and relocation last. Any slug not listed keeps its place at the end. */
const SERVICE_ORDER = [
  "buying-property-in-dubai",
  "off-plan-advisory",
  "selling-property-in-dubai",
  "investor-services",
  "golden-visa-through-property",
  "property-management-in-dubai",
  "renting-a-home-in-dubai",
  "relocation-to-dubai",
];
const rank = (slug: string) => {
  const i = SERVICE_ORDER.indexOf(slug);
  return i === -1 ? SERVICE_ORDER.length : i;
};
const ORDERED = [...SERVICES].sort((a, b) => rank(a.slug) - rank(b.slug));

export function getServices(_locale: Locale = "en"): Service[] {
  return ORDERED;
}
export const getService = (locale: Locale, slug: string) => getServices(locale).find((s) => s.slug === slug);

export function getFacts(_locale: Locale = "en") {
  return { sections: FACTS, faqs: FACT_FAQS, sources: FACT_SOURCES };
}

export function getGlossary(_locale: Locale = "en"): Term[] {
  return GLOSSARY;
}

/** Questions people ask about an area, built only from the checked facts in the area data. */
export const areaFaqs = (_locale: Locale, a: Area) => baseAreaFaqs(a);
