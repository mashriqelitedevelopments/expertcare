import type { Listing } from "./listings";

/**
 * The advisers. Empty until the brokerage supplies real people: every place that shows an
 * adviser (the card on each listing page, the call and WhatsApp buttons on listing cards) falls
 * back to the brokerage's own number in lib/site.ts, and hides when that is empty too.
 *
 * `photo` is a path under public/, e.g. "/img/team/sara-ahmed.jpg" (square, at least 240px).
 * Without one the card shows the adviser's initials.
 *
 * Routing: a listing goes to the adviser who names its slug in `projects`, then to the one who
 * names its area in `areas`, then to the first adviser in the list.
 */
export type Adviser = {
  slug: string;
  name: string;
  title: string;
  /** International format, e.g. "+971 50 123 4567". */
  phone: string;
  /** Digits only with country code, e.g. "971501234567". */
  whatsapp: string;
  email: string;
  photo?: string;
  languages?: string[];
  /** RERA broker card number (BRN), shown under the name when set. */
  brn?: string;
  areas?: string[];
  projects?: string[];
};

export const ADVISERS: Adviser[] = [
  {
    // RERA broker card 66981, three-star classification, valid 15 Feb 2024 to 15 Feb 2027. No photo yet:
    // the card shows initials. Direct lines empty, so the buttons use the brokerage's numbers.
    slug: "muhammad-arif-hanif",
    name: "Muhammad Arif Muhammad Hanif",
    title: "Real estate broker",
    phone: "",
    whatsapp: "",
    email: "",
    brn: "66981",
  },
];

export function adviserFor(l: Pick<Listing, "slug" | "area">): Adviser | undefined {
  return (
    ADVISERS.find((a) => a.projects?.includes(l.slug)) ??
    (l.area ? ADVISERS.find((a) => a.areas?.includes(l.area!)) : undefined) ??
    ADVISERS[0]
  );
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
