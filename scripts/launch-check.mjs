#!/usr/bin/env node
/**
 * What still stands between this site and launch. Reads the site's own settings and data and lists
 * every missing item; exit 1 while any blocker remains. Warnings do not fail it.
 *
 *   npm run launch-check
 */
import { readFileSync } from "node:fs";
import { resolve as dnsResolve } from "node:dns/promises";

const { site } = await import("../lib/site.ts");
const { NEWSLETTER_ENDPOINT } = await import("../lib/newsletter.ts");
const { REVIEWS, MIN_REVIEWS } = await import("../lib/reviews.ts");
const { ADVISERS } = await import("../lib/team.ts");
const { GA4 } = await import("../lib/analytics.ts");
const projects = JSON.parse(readFileSync(new URL("../lib/data/projects.json", import.meta.url)));
const listingsSrc = readFileSync(new URL("../lib/listings.ts", import.meta.url), "utf8");
const listed = (listingsSrc.match(/LISTED_DEVELOPERS: string\[\] \| null = (\[[^\]]*\]|null)/) || [])[1];
const developers = listed && listed !== "null" ? JSON.parse(listed) : null;
const shown = projects.filter((p) => !developers || developers.includes(p.developer));

const blockers = [];
const warnings = [];
const need = (ok, msg) => ok || blockers.push(msg);
const nice = (ok, msg) => ok || warnings.push(msg);

need(site.phone || site.whatsapp || site.email, "No way to reach the brokerage: set phone, WhatsApp or email in lib/site.ts (enquiry forms cannot send without one)");
need(site.whatsapp, "WhatsApp number missing in lib/site.ts (the WhatsApp buttons and the forms' preferred route)");
need(site.email, "Email address missing in lib/site.ts");
need(site.phone, "Phone number missing in lib/site.ts");
need(site.orn, "RERA office registration number (ORN) missing in lib/site.ts: required on the website and every advert");
need(site.licence, "Trade licence number missing in lib/site.ts (the about page shows \"Pending\")");
for (const p of shown) need(p.permit, `Trakheesi permit number missing for ${p.title} (content/offplan, then npm run offplan)`);
nice(site.hours, "Office hours empty in lib/site.ts: the contact page hides the row");
nice(Object.values(site.social).some(Boolean), "No social profile links in lib/site.ts");
nice(NEWSLETTER_ENDPOINT, "Newsletter sheet not connected: set NEWSLETTER_ENDPOINT in lib/newsletter.ts (scripts/newsletter-sheet.gs)");
nice(ADVISERS.length > 0, "No advisers in lib/team.ts: listing pages show no adviser card");
nice(REVIEWS.length >= MIN_REVIEWS, `Fewer than ${MIN_REVIEWS} Google reviews in lib/reviews.ts: the reviews section stays hidden`);
nice(GA4, "No GA4 measurement ID in lib/analytics.ts: no measurement and no consent notice");
for (const p of shown) nice(p.projectNumber, `DLD project number missing for ${p.title}`);

const host = new URL(site.url).hostname;
try {
  await dnsResolve(host);
} catch {
  blockers.push(`${host} does not resolve in DNS: register or point the domain, or change site.url in lib/site.ts`);
}
need(site.live, "site.live is false: every page is noindex and robots.txt blocks crawling. Set it true last, after the items above");

console.log(`Launch check for ${site.name} (${site.url}), ${shown.length} listings shown\n`);
if (blockers.length) console.log("BLOCKERS\n" + blockers.map((b) => "  - " + b).join("\n") + "\n");
if (warnings.length) console.log("WARNINGS\n" + warnings.map((w) => "  - " + w).join("\n") + "\n");
console.log(blockers.length ? `${blockers.length} blockers, ${warnings.length} warnings` : `Ready: no blockers, ${warnings.length} warnings`);
process.exit(blockers.length ? 1 : 0);
