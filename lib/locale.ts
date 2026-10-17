/** One edition is built today. The type keeps "ar" so the shared helpers' second-language branches
 * still compile; add "ar" to LOCALES, an app/(ar) route group and lib/ar/* to switch it on. */
export const LOCALES = ["en"] as const;
export type Locale = "en" | "ar";
