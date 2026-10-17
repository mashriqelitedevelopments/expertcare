import type { ImgKey } from "./images";

/**
 * Buying guides. Every figure was checked on 15 Sep 2026 against the sources listed on each guide.
 * Where official sources disagree or are silent (Golden Visa length, off-plan eligibility), the
 * guide says so instead of picking a side. Links use [label](href); bold uses **text**.
 */
export type Block =
  | { p: string }
  | { ul: string[] }
  | { ol: { t: string; d: string }[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }
  | { tool: "costs" | "mortgage" }
  | { example: number };

export const TOPICS = ["Buying", "Costs and mortgages", "Off-plan", "Owning and letting", "Residency"] as const;

export type Guide = {
  slug: string;
  topic: (typeof TOPICS)[number];
  seoTitle: string;
  seoDescription: string;
  title: string;
  dek: string;
  image: ImgKey;
  updated: string;
  /** "In short": the direct answer, first on the page, for readers and for AI answers that quote it. */
  summary: string[];
  sections: { id: string; h: string; blocks: Block[] }[];
  faqs: { q: string; a: string }[];
  sources: { label: string; url: string }[];
};
