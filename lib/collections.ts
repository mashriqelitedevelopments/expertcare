import { AREAS } from "./areas";
import { aedShort } from "./format";
import { LISTINGS, PROPERTY_TYPES, devSlug, hasBeds, type Listing } from "./listings";
import type { Locale } from "./locale";

/**
 * Landing pages for the way buyers search: "apartments for sale in Dubai Marina",
 * "2-bedroom apartments in JVC", "property in Dubai under AED 3 million", "Sobha projects in
 * Dubai", "off-plan projects in Dubai Islands". Built from the inventory, so a page exists only
 * where there are projects to show: empty pages are thin content and would drag the rest of the
 * site down. The set follows the inventory as projects are added or sell out.
 */
export type CollectionKind = "type-area" | "type" | "beds-area" | "budget" | "developer" | "community";

export type Collection = {
  slug: string;
  kind: CollectionKind;
  area?: string;
  type?: (typeof PROPERTY_TYPES)[number];
  beds?: number;
  maxPrice?: number;
  /** Developer name as written in the inventory. */
  developer?: string;
  /** Community name (English) for projects outside the area guides. */
  community?: string;
  slugs: string[];
};

const TYPE_SLUG: Record<(typeof PROPERTY_TYPES)[number], string> = {
  Apartment: "apartments",
  Penthouse: "penthouses",
  Villa: "villas",
  Townhouse: "townhouses",
};

const BUDGETS = [1, 2, 3, 5, 10, 25, 50];

const MIN_TYPE_AREA = 1;
const MIN_OTHER = 2;

/** All collections worth a page, derived from the English inventory. */
export function collections(): Collection[] {
  const out: Collection[] = [];
  const add = (c: Omit<Collection, "slugs">, matches: Listing[], min: number) => {
    if (matches.length >= min && !out.some((x) => x.slug === c.slug)) out.push({ ...c, slugs: matches.map((l) => l.slug) });
  };

  for (const type of PROPERTY_TYPES) {
    const ofType = LISTINGS.filter((l) => l.types.includes(type));
    add({ slug: `${TYPE_SLUG[type]}-for-sale-in-dubai`, kind: "type", type }, ofType, MIN_OTHER);
    for (const area of AREAS) {
      const inArea = ofType.filter((l) => l.area === area.slug);
      add({ slug: `${TYPE_SLUG[type]}-for-sale-in-${area.slug}`, kind: "type-area", type, area: area.slug }, inArea, MIN_TYPE_AREA);
      for (const beds of [1, 2, 3, 4, 5]) {
        // A bedroom range covers every home type in a project, so it proves nothing about one type
        // in a mixed project: bedroom pages use single-type projects only.
        const withBeds = inArea.filter((l) => l.types.length === 1 && hasBeds(l, beds));
        add({ slug: `${beds}-bedroom-${TYPE_SLUG[type]}-for-sale-in-${area.slug}`, kind: "beds-area", type, area: area.slug, beds }, withBeds, MIN_TYPE_AREA);
      }
    }
  }

  const priced = LISTINGS.filter((l) => l.price !== null).length;
  for (const m of BUDGETS) {
    const maxPrice = m * 1_000_000;
    const under = LISTINGS.filter((l) => l.price !== null && l.price <= maxPrice);
    // Once a budget covers every priced project, higher budgets repeat it: stop at the first.
    add({ slug: `property-for-sale-in-dubai-under-${m}-million`, kind: "budget", maxPrice }, under, MIN_OTHER);
    if (under.length === priced) break;
  }

  for (const name of [...new Set(LISTINGS.map((l) => l.developer))]) {
    add({ slug: `${devSlug(name)}-projects-in-dubai`, kind: "developer", developer: name }, LISTINGS.filter((l) => l.developer === name), MIN_OTHER);
  }

  for (const community of [...new Set(LISTINGS.filter((l) => !l.area).map((l) => l.community))]) {
    add(
      { slug: `off-plan-projects-in-${devSlug(community)}`, kind: "community", community },
      LISTINGS.filter((l) => !l.area && l.community === community),
      MIN_OTHER,
    );
  }

  return out;
}

export const collectionBySlug = (slug: string) => collections().find((c) => c.slug === slug);

const typeLabel = (locale: Locale, type: (typeof PROPERTY_TYPES)[number]) =>
  locale === "ar" ? { Apartment: "شقق", Penthouse: "بنتهاوسات", Villa: "فلل", Townhouse: "تاون هاوس" }[type] : TYPE_SLUG[type];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Arabic counts bedrooms in three forms: one, two, and three or more. */
const bedsAr = (beds: number) => (beds === 1 ? "بغرفة نوم واحدة" : beds === 2 ? "بغرفتي نوم" : `بـ${beds} غرف نوم`);

/** "مشروع واحد" / "مشروعان" / "3 مشاريع" / "11 مشروعًا". */
const projectsAr = (n: number) => (n === 1 ? "مشروع واحد" : n === 2 ? "مشروعان" : n <= 10 ? `${n} مشاريع` : `${n} مشروعًا`);
const projectsEn = (n: number) => (n === 1 ? "1 project" : `${n} projects`);

type Named = Pick<Listing, "price"> & { place: string };

/**
 * Titles, headings and the opening line, composed from the data rather than written per page:
 * the count, the range of published starting prices and where the projects are.
 * `placeName` is the localised area or community name; `homes` carry localised `place` names.
 */
export function collectionCopy(locale: Locale, c: Collection, placeName: string, homes: Named[]) {
  const ar = locale === "ar";
  const prices = homes.map((h) => h.price).filter((p): p is number => p !== null);
  const from = prices.length ? aedShort(Math.min(...prices), locale) : "";
  const to = prices.length ? aedShort(Math.max(...prices), locale) : "";
  const n = homes.length;
  const count = ar ? projectsAr(n) : projectsEn(n);
  const range = !prices.length
    ? ""
    : ar
      ? from === to
        ? `، بأسعار تبدأ من ${from}`
        : `، بأسعار تبدأ من ${from} إلى ${to}`
      : from === to
        ? `, with homes from ${from}`
        : `, with starting prices from ${from} to ${to}`;
  const type = c.type ? typeLabel(locale, c.type) : ar ? "عقارات" : "property";
  const whereList = [...new Set(homes.map((h) => h.place))].join(ar ? "، " : ", ");

  if (c.kind === "type-area" || c.kind === "beds-area") {
    const beds = c.beds ? `${c.beds}-bedroom ` : "";
    const h1 = ar ? `${type}${c.beds ? ` ${bedsAr(c.beds)}` : ""} للبيع في ${placeName}` : cap(`${beds}${type} for sale in ${placeName}`);
    return {
      h1,
      title: `${h1}: ${count}`,
      description: ar
        ? `${h1}: ${count} قيد البيع الآن${range}. مع خطة السداد وإجمالي تكلفة الشراء لكل مشروع. ${placeName} منطقة تمليك حر.`
        : `${h1}: ${count} selling now${range}. Each shows its payment plan and the full cost of buying. ${placeName} is a freehold area.`,
      lede: ar
        ? `${count} قيد البيع في ${placeName}${range}. و${placeName} منطقة تمليك حر، فيمكن لمشترين من جميع الجنسيات التملّك فيها.`
        : `${cap(count)} selling now in ${placeName}${range}. ${placeName} is freehold, so buyers of any nationality can own here.`,
    };
  }

  if (c.kind === "type") {
    const h1 = ar ? `${type} للبيع في دبي` : cap(`${type} for sale in Dubai`);
    return {
      h1,
      title: ar ? `${h1}: ${count} على المخطط` : `${h1}: ${count} off-plan`,
      description: ar
        ? `${h1}: ${count} على المخطط قيد البيع الآن${range}، في ${whereList}. مع خطة السداد وإجمالي تكلفة الشراء لكل مشروع.`
        : `${h1}: ${count} off-plan and selling now${range}, in ${whereList}. Each shows its payment plan and the full cost of buying.`,
      lede: ar ? `${count} قيد البيع الآن في دبي${range}.` : `${cap(count)} selling now across Dubai${range}.`,
    };
  }

  if (c.kind === "budget") {
    const capText = aedShort(c.maxPrice!, locale);
    const h1 = ar ? `عقارات للبيع في دبي حتى ${capText}` : `Property for sale in Dubai under ${capText}`;
    return {
      h1,
      title: `${h1}: ${count}`,
      description: ar
        ? `${h1}: ${count} على المخطط بوحدات يبدأ سعرها من ${capText} أو أقل. مع خطة السداد ورسم التسجيل 4% لكل مشروع.`
        : `${h1}: ${count} off-plan with homes starting at ${capText} or less. Each shows its payment plan and the 4% Oqood registration fee.`,
      lede: ar
        ? `${count} بوحدات يبدأ سعرها من ${capText} أو أقل${range}. ويُضاف رسم التسجيل في نظام عقود 4% إلى سعر العقار على المخطط.`
        : `${cap(count)} with homes starting at ${capText} or less${range}. Off-plan purchases add the 4% Oqood registration fee to the price.`,
    };
  }

  if (c.kind === "developer") {
    const dev = c.developer!;
    const h1 = ar ? `مشاريع ${dev} في دبي` : `${dev} projects in Dubai`;
    return {
      h1,
      title: ar ? `${h1}: ${count} على المخطط` : `${h1}: ${count} off-plan`,
      description: ar
        ? `${count} على المخطط من ${dev} قيد البيع في دبي، في ${whereList}${range}. مع خطة السداد وإجمالي تكلفة الشراء لكل مشروع.`
        : `${cap(count)} by ${dev} selling now in Dubai, in ${whereList}${range}. Each shows its payment plan and the full cost of buying.`,
      lede: ar ? `${count} من ${dev} قيد البيع الآن في ${whereList}${range}.` : `${cap(count)} by ${dev} selling now in ${whereList}${range}.`,
    };
  }

  const h1 = ar ? `مشاريع على المخطط في ${placeName}` : `Off-plan projects in ${placeName}`;
  return {
    h1,
    title: `${h1}: ${count}`,
    description: ar
      ? `${count} على المخطط قيد البيع في ${placeName}، دبي${range}. مع خطة السداد وإجمالي تكلفة الشراء لكل مشروع.`
      : `${cap(count)} selling off-plan in ${placeName}, Dubai${range}. Each shows its payment plan and the full cost of buying.`,
    lede: ar ? `${count} قيد البيع الآن في ${placeName}${range}.` : `${cap(count)} selling now in ${placeName}${range}.`,
  };
}
