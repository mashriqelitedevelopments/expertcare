export * from "./blocks";
export { SOURCES } from "./sources";
import type { Guide } from "./blocks";
import type { Locale } from "./locale";
import { GUIDES_A } from "./guides/a";
import { GUIDES_B } from "./guides/b";

/** Every guide on the site, in reading order: buying first, then costs, off-plan, owning, residency. */
export const GUIDES: Guide[] = [...GUIDES_A, ...GUIDES_B];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);

export const HOME_FAQS = [
  {
    q: "Can foreigners buy property in Dubai?",
    a: "Yes. Buyers of any nationality can own freehold property in Dubai's designated freehold areas, which include Dubai Marina, Downtown Dubai and Palm Jumeirah, and they do not need a UAE residence visa to buy. [How to buy a home in Dubai](/guides/how-to-buy-property-in-dubai/) takes you through each step.",
  },
  {
    q: "What fees do you pay when buying property in Dubai?",
    a: "On a ready home bought with cash, about 7% of the price: the 4% DLD transfer fee, AED 520 in title deed fees, the registration trustee fee of AED 4,000 plus VAT, a customary 2% agency fee plus VAT and the developer's NOC fee. [What it costs to buy](/guides/cost-of-buying-property-in-dubai/) explains each one.",
  },
  {
    q: "How much deposit do you need for a mortgage in Dubai?",
    a: "At least 20% of the price for an expatriate buying a first home worth up to AED 5 million, because the Central Bank of the UAE caps lending at 80%. The minimum rises to 30% above AED 5 million, 40% on a second home and 50% on an off-plan home. See [how mortgages work in Dubai](/guides/mortgages-in-dubai/).",
  },
  {
    q: "Are off-plan payments protected in Dubai?",
    a: "Dubai Law No. 8 of 2007 requires off-plan payments to go into an escrow account for the project, to be used only for its construction. Check the developer, the escrow account and the payment plan before you reserve; [buying off-plan in Dubai](/guides/buying-off-plan-in-dubai/) lists what to look for.",
  },
  {
    q: "Does buying property in Dubai give you a visa?",
    a: "Property worth AED 2 million or more lets an investor apply for a Golden Visa, which the Dubai Land Department and GDRFA describe as ten years and renewable. See [the Golden Visa through property](/guides/golden-visa-through-property/).",
  },
  {
    q: "Which areas of Dubai are freehold?",
    a: "Freehold areas were first designated in Regulation No. 3 of 2006 and more have been added since. They include every community in our [area guides](/areas/): Dubai Marina, Downtown Dubai, Palm Jumeirah, Dubai Hills Estate, Business Bay, Jumeirah Village Circle and Dubai Creek Harbour.",
  },
];

export const formatDate = (iso: string, locale: Locale = "en") =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === "ar" ? "ar-AE-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
