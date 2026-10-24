/**
 * The market note: where newsletter sign-ups go.
 *
 * The site is static, so a sign-up posts to a Google Apps Script web app bound to a Google Sheet
 * (scripts/newsletter-sheet.gs), which appends one row per address. The post is fire-and-forget:
 * `no-cors` because Apps Script answers with a cross-origin redirect, `keepalive` so a tab closed
 * straight after still delivers it.
 *
 * With the endpoint empty, the form hands the request to the brokerage's email or WhatsApp from
 * lib/site.ts instead, the same way the enquiry forms work. With neither, it says it is not
 * connected.
 */
import { publicInsert } from "./backend";

export const NEWSLETTER_ENDPOINT = "";

export const NEWSLETTER_TOPICS = ["offPlan", "resale", "prices"] as const;
export type NewsletterTopic = (typeof NEWSLETTER_TOPICS)[number];

export function subscribe(email: string, topics: string[]): boolean {
  // The portal database when it is connected (lib/backend.ts), else the Apps Script sheet below.
  if (publicInsert("subscribers", { email: email.slice(0, 160), topics, page: typeof location === "undefined" ? "" : location.pathname.slice(0, 300) })) return true;
  if (!NEWSLETTER_ENDPOINT || typeof window === "undefined") return false;
  const body = new URLSearchParams();
  body.set("email", email);
  body.set("topics", topics.join(", "));
  body.set("page", location.pathname);
  let referrer = "";
  try {
    referrer = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    /* opaque referrer */
  }
  body.set("referrer", referrer);
  try {
    void fetch(NEWSLETTER_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }).catch(() => {});
  } catch {
    /* the visitor's flow goes on */
  }
  return true;
}
