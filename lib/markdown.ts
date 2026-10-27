import { AREAS, areaFaqs } from "./areas";
import { buyingCosts } from "./costs";
import { FACTS, FACT_FAQS, FACT_SOURCES, FACTS_UPDATED } from "./facts";
import { GLOSSARY } from "./glossary";
import { GUIDES, HOME_FAQS, type Block } from "./guides";
import { LISTINGS } from "./listings";
import { servicePath } from "./paths";
import { SERVICES } from "./services";
import { FAQ_GROUPS } from "./faq";
import { site } from "./site";

/**
 * Plain-text editions of the site for AI assistants: /llms.txt (the llmstxt.org index) and
 * /llms-full.txt (every guide, the facts page and every area guide in full). Built from the same
 * data as the pages, so the two cannot drift. Off-plan projects are listed with their published
 * starting price, handover and developer, and the date each was checked.
 */
export const absUrl = (path: string) => new URL(path, site.url).toString();
const md = (t: string) => t.replace(/\]\((\/[^)]*)\)/g, (_m, p: string) => `](${absUrl(p)})`);
const money = (n: number) => `AED ${Math.round(n).toLocaleString("en-US")}`;

function table(head: string[], rows: string[][]) {
  return [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
}

export function blocksToMd(blocks: Block[]) {
  return blocks
    .map((b) => {
      if ("p" in b) return md(b.p);
      if ("ul" in b) return b.ul.map((t) => `- ${md(t)}`).join("\n");
      if ("ol" in b) return b.ol.map((s, i) => `${i + 1}. **${s.t}** ${md(s.d)}`).join("\n");
      if ("table" in b) return table(b.table.head, b.table.rows);
      if ("note" in b) return `> ${md(b.note)}`;
      if ("tool" in b)
        return `Calculator: ${absUrl("/buying-costs/")}`;
      const r = buyingCosts({ price: b.example, status: "ready" });
      return table(["Fee", "Amount"], [...r.lines.map((l) => [l.label, money(l.amount)]), ["Price plus fees", money(r.total)]]);
    })
    .join("\n\n");
}

const faqMd = (faqs: { q: string; a: string }[]) => faqs.map((f) => `**${f.q}**\n${md(f.a)}`).join("\n\n");

export function llmsTxt() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.name} is a real estate brokerage in Dubai, United Arab Emirates, registered since 2000 and focused on prime resale homes and off-plan projects, with selling, investor advice, Golden Visa guidance and property management from the same team. It publishes off-plan homes with the full cost of buying on each, and plain guides to buying, selling, renting and letting in Dubai whose figures are checked against the Dubai Land Department (DLD) and GDRFA Dubai. Facts last checked ${FACTS_UPDATED}.`,
    "",
    "Key facts for buyers in Dubai:",
    "",
    ...FACT_FAQS.map((f) => `- ${f.q} ${md(f.a)}`),
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => `- [${s.name}](${absUrl(servicePath(s.slug))}): ${s.dek} ${s.fees}`),
    "",
    "## Guides",
    "",
    ...GUIDES.map((g) => `- [${g.title}](${absUrl(`/guides/${g.slug}/`)}): ${g.dek}`),
    "",
    `- [Questions and answers](${absUrl("/faq/")}): ${FAQ_GROUPS.reduce((n, g) => n + g.faqs.length, 0)} answers on buying, selling, renting, letting, off-plan, fees, visas and the law`,
    "",
    "## Reference and tools",
    "",
    `- [Dubai property buying facts](${absUrl("/dubai-property-facts/")}): fees, ownership, off-plan protections, advertising rules, Golden Visa rules and area transport on one sourced page`,
    `- [Dubai property prices by area](${absUrl("/dubai-property-prices/")}): median price per sq ft and residential sales by quarter for Dubai and seven communities, our analysis of the Dubai Land Department's open transaction data (Data.Dubai, Dubai Open Data Licence)`,
    `- [Dubai property glossary](${absUrl("/dubai-property-glossary/")}): plain definitions of DLD, RERA, Oqood, Ejari, Form F, NOC, Trakheesi, Mollak, escrow, snagging and more`,
    `- [Buying costs calculator](${absUrl("/buying-costs/")}): every fee on a ready or off-plan home`,
    "",
    "## Off-plan projects for sale",
    "",
    ...LISTINGS.map(
      (l) =>
        `- [${l.title} by ${l.developer}](${absUrl(`/properties/${l.slug}/`)}): ${l.summary} ${l.price ? `From ${money(l.price)}` : "Price on request"}${
          l.handover ? `; handover ${l.handover}` : ""
        }${l.planLabel ? `; payment plan ${l.planLabel}` : ""}. Checked ${l.checked}.`,
    ),
    "",
    "## Area guides",
    "",
    ...AREAS.map((a) => `- [${a.name}](${absUrl(`/areas/${a.slug}/`)}): ${a.intro}`),
    "",
    "## Optional",
    "",
    `- [Full text of every guide, the facts page and every area guide](${absUrl("/llms-full.txt")})`,
    `- [Property for sale](${absUrl("/properties/")})`,
    `- [About ${site.name}](${absUrl("/about/")})`,
    `- [Contact](${absUrl("/contact/")})`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const parts: string[] = [
    `# ${site.name}: full text`,
    "",
    `> Services, guides, reference facts and area guides from ${absUrl("/")}. Figures checked against official sources; each section lists its own.`,
    "",
    "## Questions people ask",
    "",
    faqMd(HOME_FAQS),
    "",
    ...FAQ_GROUPS.flatMap((g) => ["", `### ${g.h}`, "", faqMd(g.faqs)]),
  ];
  for (const sv of SERVICES) {
    parts.push("", "---", "", `## ${sv.title}`, "", `URL: ${absUrl(servicePath(sv.slug))}`, "", sv.dek, "", "### In short", "", ...sv.summary.map((x) => `- ${md(x)}`), "", "### How it works", "", ...sv.steps.map((st, i) => `${i + 1}. **${st.t}** ${md(st.d)}`));
    for (const sec of sv.sections) parts.push("", `### ${sec.h}`, "", blocksToMd(sec.blocks));
    parts.push("", `### What it costs`, "", md(sv.fees), "", "### Questions", "", faqMd(sv.faqs));
  }
  for (const g of GUIDES) {
    parts.push(
      "",
      "---",
      "",
      `## ${g.title}`,
      "",
      `URL: ${absUrl(`/guides/${g.slug}/`)}`,
      `Updated: ${g.updated}`,
      "",
      g.dek,
      "",
      "### In short",
      "",
      ...g.summary.map((s) => `- ${md(s)}`),
    );
    for (const s of g.sections) parts.push("", `### ${s.h}`, "", blocksToMd(s.blocks));
    parts.push("", "### Questions", "", faqMd(g.faqs), "", "### Sources", "", ...g.sources.map((s) => `- [${s.label}](${s.url})`));
  }
  parts.push("", "---", "", "## Dubai property buying facts", "", `URL: ${absUrl("/dubai-property-facts/")}`, `Checked: ${FACTS_UPDATED}`);
  for (const s of FACTS) parts.push("", `### ${s.h}`, "", blocksToMd(s.blocks));
  parts.push("", "### Sources", "", ...FACT_SOURCES.map((s) => `- [${s.label}](${s.url})`));
  parts.push(
    "",
    "---",
    "",
    "## Dubai property glossary",
    "",
    `URL: ${absUrl("/dubai-property-glossary/")}`,
    "",
    ...GLOSSARY.map((t) => `- **${t.term}${t.full ? ` (${t.full})` : ""}:** ${t.def}`),
  );
  for (const a of AREAS) {
    parts.push(
      "",
      "---",
      "",
      `## ${a.name}`,
      "",
      `URL: ${absUrl(`/areas/${a.slug}/`)}`,
      "",
      a.intro,
      "",
      ...a.overview,
      "",
      `Homes: ${a.homes.join("; ")}.`,
      `Suits: ${a.suits.join("; ")}.`,
      `Getting around: ${a.transport.join(". ")}.`,
      `Master developer: ${a.developer}.`,
      "Ownership: freehold, open to buyers of any nationality.",
      "",
      "### Questions",
      "",
      faqMd(areaFaqs(a)),
    );
  }
  return `${parts.join("\n")}\n`;
}
