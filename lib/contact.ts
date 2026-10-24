import { site } from "./site";
import { adviserFor } from "./team";
import type { Listing } from "./listings";

/** A wa.me link with the message filled in. */
export const waLink = (number: string, text?: string) => `https://wa.me/${number.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** "971505591729" → "+971 50 559 1729"; other lengths are shown with just the plus sign. */
export const displayPhone = (digits: string) => {
  const d = digits.replace(/\D/g, "");
  const m = d.match(/^971(5\d)(\d{3})(\d{4})$/);
  return m ? `+971 ${m[1]} ${m[2]} ${m[3]}` : `+${d}`;
};

/** A tel: link from any written form of a number. */
export const telLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Who answers for a listing: its adviser when there is one, else the brokerage. Empty strings
 * mean the channel does not exist yet and its button stays hidden. */
export function contactFor(l: Pick<Listing, "slug" | "area" | "title" | "ref">) {
  const a = adviserFor(l);
  const phone = a?.phone || site.phone;
  const whatsapp = a?.whatsapp || site.whatsapp;
  return {
    adviser: a,
    phone,
    whatsapp,
    message: `Hello ${site.name}, I would like to know more about ${l.title} (ref ${l.ref}).`,
  };
}
