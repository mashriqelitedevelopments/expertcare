/**
 * Measurement: Google Analytics 4, and only with consent.
 *
 * Nothing runs at build time or before the visitor has answered the consent notice.
 * startAnalytics() reads the stored answer and does nothing unless it is "allow"; only then is
 * gtag.js requested from Google. A visitor who declines, or never answers, sends Google no
 * request and gets no cookie.
 *
 * Advertising features are off: no Google signals, no ad personalisation, ad storage denied.
 * What is sent is the page and, for a lead, how it was made (WhatsApp, telephone, email) and
 * where on the site. Never a name, a number, an email address or a message.
 */
/** ExpertCare's own GA4 measurement ID ("G-…"). Empty until the property exists: nothing loads and the
 * consent notice stays hidden. (G-GX0JR24HPJ, here before 24 Oct 2026, is Hamd Properties' tag.) */
export const GA4 = "";

const KEY = "ec-consent";

export type Consent = { analytics: boolean; at: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** What was chosen, or null if the visitor has not been asked yet. */
export function consent(): Consent | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null") as Consent | null;
  } catch {
    return null;
  }
}

const CHANGE = "ec-consent-change";

/** Record an answer. Allowing starts measurement at once, on this page. */
export function setConsent(analytics: boolean): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, at: new Date().toISOString() }));
  } catch {
    /* storage blocked: the notice returns next visit */
  }
  window.dispatchEvent(new Event(CHANGE));
  if (analytics) startAnalytics();
}

/** Runs `fn` whenever the answer changes on this page (the notice and the privacy page both listen). */
export function onConsentChange(fn: () => void): () => void {
  window.addEventListener(CHANGE, fn);
  return () => window.removeEventListener(CHANGE, fn);
}

let started = false;

export function startAnalytics(): void {
  if (!GA4 || started || typeof window === "undefined" || consent()?.analytics !== true) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the Arguments object itself; a copied array is ignored.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA4, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4}`;
  document.head.appendChild(s);
}

/** An event, for a visitor who allowed measurement; nothing otherwise. */
export function track(event: string, params: Record<string, string | number> = {}): void {
  if (started && window.gtag) window.gtag("event", event, params);
}

/** Consent withdrawn: remove the cookies Google Analytics set. The caller reloads, so no script
 * is left running either. */
export function forgetAnalytics(): void {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` + (d ? `; domain=${d}` : "");
    }
  }
}
