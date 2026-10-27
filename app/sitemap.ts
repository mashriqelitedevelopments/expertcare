import type { MetadataRoute } from "next";
import { AREAS } from "@/lib/areas";
import { collections } from "@/lib/collections";
import { GUIDES } from "@/lib/guides";
import { LISTINGS } from "@/lib/listings";
import { MARKET } from "@/lib/market";
import { servicePath } from "@/lib/paths";
import { SERVICES } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const BUILT = "2026-10-17";

/** Every page. /shortlist/ is left out: it is per-browser and noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; lastModified?: string }[] = [
    { path: "/", priority: 1 },
    { path: "/properties/", priority: 0.9 },
    { path: "/off-plan/", priority: 0.9 },
    { path: "/services/", priority: 0.8 },
    ...SERVICES.map((s) => ({ path: servicePath(s.slug), priority: s.slug.includes("selling") || s.slug.includes("management") || s.slug.includes("renting") ? 0.9 : 0.8 })),
    { path: "/areas/", priority: 0.8 },
    ...AREAS.map((a) => ({ path: `/areas/${a.slug}/`, priority: 0.8 })),
    ...LISTINGS.map((l) => ({ path: `/properties/${l.slug}/`, priority: 0.7, lastModified: l.checked })),
    ...collections().map((c) => ({ path: `/buy/${c.slug}/`, priority: 0.8 })),
    { path: "/guides/", priority: 0.7 },
    ...GUIDES.map((g) => ({ path: `/guides/${g.slug}/`, priority: 0.7, lastModified: g.updated })),
    { path: "/faq/", priority: 0.7 },
    { path: "/dubai-property-facts/", priority: 0.8, lastModified: "2026-09-16" },
    { path: "/dubai-property-prices/", priority: 0.9, lastModified: MARKET.snapshot },
    ...Object.keys(MARKET.areas).map((a) => ({ path: `/dubai-property-prices/${a}/`, priority: 0.8, lastModified: MARKET.snapshot })),
    { path: "/dubai-property-glossary/", priority: 0.7, lastModified: "2026-09-16" },
    { path: "/buying-costs/", priority: 0.7 },
    { path: "/about/", priority: 0.5 },
    { path: "/contact/", priority: 0.5 },
    { path: "/privacy/", priority: 0.2 },
  ];
  return pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: p.lastModified ?? BUILT, priority: p.priority }));
}
