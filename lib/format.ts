import type { Locale } from "./locale";

/** Digits stay Latin in both editions: that is how prices are written in the UAE market. */
export const num = (n: number) => Math.round(n).toLocaleString("en-US");

export const aed = (n: number, locale: Locale = "en") => (locale === "ar" ? `${num(n)} د.إ` : `AED ${num(n)}`);

/** AED 3.15M / 3.15 مليون د.إ: for filter options and tight spaces. */
export const aedShort = (n: number, locale: Locale = "en") => {
  if (n >= 1_000_000) {
    const v = +(n / 1_000_000).toFixed(2);
    // Arabic: whole numbers 3–10 take ملايين; 1, 2, 11+ and decimals (3.15) take مليون.
    const word = Number.isInteger(v) && v >= 3 && v <= 10 ? "ملايين" : "مليون";
    return locale === "ar" ? `${v} ${word} د.إ` : `AED ${v}M`;
  }
  if (n >= 1_000) {
    const v = Math.round(n / 1_000);
    return locale === "ar" ? `${v} ألف د.إ` : `AED ${v}K`;
  }
  return aed(n, locale);
};

export const sqft = (n: number, locale: Locale = "en") => (locale === "ar" ? `${num(n)} قدم مربع` : `${num(n)} sq ft`);

/** Arabic counts one, two, a few (3–10) and many (11+) differently. */
export function count(locale: Locale, n: number, forms: { one: string; two: string; few: string; many: string; en: string; enPlural: string }) {
  if (locale === "en") return `${n} ${n === 1 ? forms.en : forms.enPlural}`;
  if (n === 1) return forms.one;
  if (n === 2) return forms.two;
  if (n <= 10) return `${n} ${forms.few}`;
  return `${n} ${forms.many}`;
}

export const homeCount = (locale: Locale, n: number) => count(locale, n, { one: "مشروع واحد", two: "مشروعان", few: "مشاريع", many: "مشروعًا", en: "project", enPlural: "projects" });

/** Guide copy without its [label](href) and **bold** markup, for JSON-LD and plain text. */
export const plainText = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

/** Fills {name} placeholders in an interface string. */
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_m, k: string) => String(vars[k] ?? ""));

export const plural =(n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
