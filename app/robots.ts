import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** AI search and answer crawlers, named so the welcome is explicit rather than inherited from "*".
 * Names checked against each company's crawler documentation on 16 Sep 2026. Google-Extended and
 * Applebot-Extended are robots.txt control tokens, not separate crawlers. Recheck at launch. */
const AI_CRAWLERS = [
  "Meta-ExternalAgent",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

/** Closed to every crawler until the brokerage is licensed and the inventory is real (site.live). */
export default function robots(): MetadataRoute.Robots {
  if (!site.live) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/shortlist/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/shortlist/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
