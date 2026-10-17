/** The three services people search for most have top-level URLs; the rest live under /services/. */
const TOP: Record<string, string> = {
  "selling-property-in-dubai": "/sell/",
  "renting-a-home-in-dubai": "/rent/",
  "property-management-in-dubai": "/landlords/",
};

export const servicePath = (slug: string) => TOP[slug] ?? `/services/${slug}/`;

/** Slugs that render under /services/<slug>/ (the rest have their own route files). */
export const isUnderServices = (slug: string) => !(slug in TOP);
