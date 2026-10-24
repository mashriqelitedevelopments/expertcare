import type { ListingView } from "./content";
import type { Area } from "./areas";
import { aed } from "./format";
import type { Guide } from "./guides";
import type { Locale } from "./locale";
import type { Service } from "./services";

/** Joins sentences while the result stays within a search result's ~160 characters (the first always stays). */
export function fit(parts: string[], max = 160) {
  let out = "";
  for (const p of parts.filter(Boolean)) {
    const next = out ? `${out} ${p}` : p;
    if (out && next.length > max) break;
    out = next;
  }
  return out;
}

/** Page titles and descriptions built from content, so route files stay thin. */
export function listingMeta(locale: Locale, l: ListingView) {
  const price = l.price ? `from ${aed(l.price, locale)}` : "price on request";
  const handover = l.handover ? `, handover ${l.handover}` : "";
  const base = `${l.title} by ${l.developer}, ${l.place}`;
  return {
    // The price joins the title only when there is one and it still fits a search result.
    title: l.price && `${base}: ${price}`.length <= 60 ? `${base}: ${price}` : base,
    description: fit([l.summary, `Off-plan ${l.typeLabel.toLowerCase()} in ${l.place}, Dubai, ${price}${handover}.`]),
  };
}

export const areaMeta = (a: Area) => ({ title: a.seoTitle, description: a.seoDescription });
export const guideMeta = (g: Guide) => ({ title: g.seoTitle, description: g.seoDescription });
export const serviceMeta = (s: Service) => ({ title: s.seoTitle, description: s.seoDescription });
