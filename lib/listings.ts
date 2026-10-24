import PROJECTS from "./data/projects.json";
import type { ImgKey } from "./images";
import type { Status } from "./costs";

/**
 * The inventory: off-plan projects currently selling, each researched from the developer's own
 * website, brochure or sales records (source and date on every entry). Generated into
 * `lib/data/projects.json` by `scripts/offplan/build.py`; edit the research files, not the JSON.
 *
 * A project is listed by its starting home: `price` is the developer's published starting price
 * (null when the developer does not publish one), `beds`..`bedsMax` the bedroom range and `size`
 * the smallest published home. Nothing is estimated: a field the developer does not publish is
 * null and the page leaves it out.
 *
 * Before any listing is advertised, DLD rules require a marketing agreement with the developer,
 * the project's DLD registration and escrow account, and a Trakheesi permit (with the Madmoun QR
 * on print and video). The UI shows `permit`, `projectNumber` and `escrow` as soon as they are set.
 */
export type PropertyType = "Apartment" | "Penthouse" | "Villa" | "Townhouse";

export type Listing = {
  slug: string;
  ref: string;
  title: string;
  developer: string;
  developerUrl: string;
  /** Marketing community, e.g. "Sobha Hartland II". */
  community: string;
  /** One of the site's area guides when the project sits inside it. */
  area: string | null;
  type: PropertyType;
  types: PropertyType[];
  status: Status;
  price: number | null;
  priceNote: string | null;
  beds: number;
  bedsMax: number;
  size: number | null;
  images: ImgKey[];
  summary: string;
  description: string[];
  features: string[];
  amenities: string[];
  handover: string | null;
  plan: { stage: string; pct: number }[] | null;
  planLabel: string | null;
  permit: string;
  projectNumber: string;
  escrow: string;
  source: string;
  checked: string;
};

/**
 * Which developers' projects appear on the site; null shows every project in the inventory.
 * Since 24 Oct 2026 only Mashriq Elite's projects are listed: the other developers' projects stay in
 * the research data and lib/data, and come back by adding their names here or setting null.
 * Everything built from LISTINGS follows: project pages, /buy/ pages, the rail, search, shortlist,
 * area sections, sitemap. With no listings at all, those places show a brief form instead.
 */
export const LISTED_DEVELOPERS: string[] | null = ["Mashriq Elite"];

export const ALL_LISTINGS = PROJECTS as Listing[];
export const LISTINGS = LISTED_DEVELOPERS ? ALL_LISTINGS.filter((l) => LISTED_DEVELOPERS.includes(l.developer)) : ALL_LISTINGS;
export const SHOW_LISTINGS = LISTINGS.length > 0;

export const listingBySlug = (slug: string) => LISTINGS.find((l) => l.slug === slug);
export const inArea = (area: string) => LISTINGS.filter((l) => l.area === area);
/** Does the project offer homes with this many bedrooms (0 = studio)? */
export const hasBeds = (l: Pick<Listing, "beds" | "bedsMax">, beds: number) => beds >= l.beds && beds <= l.bedsMax;

export const PROPERTY_TYPES = ["Apartment", "Penthouse", "Villa", "Townhouse"] as const;
export const PRICE_STEPS = [1_000_000, 2_000_000, 3_000_000, 5_000_000, 10_000_000, 20_000_000, 50_000_000];

export const devSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\b(properties|developers|developments|realty)\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Developers in the inventory, most projects first. */
export function developers() {
  const map = new Map<string, number>();
  for (const l of LISTINGS) map.set(l.developer, (map.get(l.developer) ?? 0) + 1);
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count, slug: devSlug(name) }));
}
