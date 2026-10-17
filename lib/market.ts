import data from "./data/market.json";
import type { Locale } from "./locale";

/**
 * Price statistics computed by scripts/dld/build-market.py from the DLD Real Estate Transactions
 * open dataset (Data.Dubai, Dubai Open Data Licence). Our analysis: never present it as DLD's.
 */
export type Stat = { sales: number; medianPrice: number | null; medianPsf: number | null };
export type QuarterStat = Stat & { q: string };
export type ScopeBlock = {
  quarters: QuarterStat[];
  last12: Stat & { previous12MedianPsf: number | null; changePct: number | null; offPlanShare: number | null };
  segments: Record<string, Stat>;
};

export const MARKET = data as unknown as {
  snapshot: string;
  firstQuarter: string;
  lastQuarter: string;
  last12From: string;
  minSales: number;
  salesUsed: number;
  dubai: ScopeBlock;
  areas: Record<string, ScopeBlock>;
};

export const MARKET_SOURCE = {
  url: "https://data.dubai/en/l/470061",
  licence: "https://data.dubai/documents/d/guest/open-data-license-english-1-1-pdf",
};

export const marketFor = (slug: string): ScopeBlock | undefined => MARKET.areas[slug];

const Q_AR = ["الأول", "الثاني", "الثالث", "الرابع"];

export function quarterLabel(locale: Locale, key: string) {
  const [y, q] = key.split("-Q");
  return locale === "ar" ? `الربع ${Q_AR[Number(q) - 1]} ${y}` : `Q${q} ${y}`;
}

/** First and last calendar day covered, for Dataset temporalCoverage. */
export function coverage() {
  const [fy, fq] = MARKET.firstQuarter.split("-Q").map(Number);
  const [ly, lq] = MARKET.lastQuarter.split("-Q").map(Number);
  const start = `${fy}-${String((fq - 1) * 3 + 1).padStart(2, "0")}-01`;
  const endMonth = lq * 3;
  const endDay = new Date(Date.UTC(ly, endMonth, 0)).getUTCDate();
  return `${start}/${ly}-${String(endMonth).padStart(2, "0")}-${endDay}`;
}

export const signedPct = (n: number) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(1)}%`;
