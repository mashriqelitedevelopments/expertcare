import type { ListingView } from "./content";
import type { Area } from "./areas";
import { aed } from "./format";
import type { Guide } from "./guides";
import type { Locale } from "./locale";
import type { Service } from "./services";

/** Page titles and descriptions built from content, so route files stay thin. */
export function listingMeta(locale: Locale, l: ListingView) {
  const price = l.price ? `from ${aed(l.price, locale)}` : "price on request";
  const handover = l.handover ? `, handover ${l.handover}` : "";
  return {
    title: `${l.title} by ${l.developer}, ${l.place}: ${price}`,
    description: `${l.summary} Off-plan ${l.typeLabel.toLowerCase()} in ${l.place}, Dubai, ${price}${handover}.`,
  };
}

export const areaMeta = (a: Area) => ({ title: a.seoTitle, description: a.seoDescription });
export const guideMeta = (g: Guide) => ({ title: g.seoTitle, description: g.seoDescription });
export const serviceMeta = (s: Service) => ({ title: s.seoTitle, description: s.seoDescription });
