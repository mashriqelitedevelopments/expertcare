/**
 * The gate. Builds the site into .next-build, then checks every exported page:
 * - no Arabic script, no leftover "Hamd", no "artist's impression", no em-dash, no "endure"/"finished"
 * - no fee traps (AED 580 title deed, AED 290 mortgage admin)
 * - every JSON-LD block parses
 * - every page has exactly one <h1>, a <title>, a meta description and a canonical
 * - every internal link resolves to an exported page
 * - then scripts/darkscan.mjs: no dark element, type or block on a dark ground, in headless Chrome
 * Exit code is the number of failing pages, capped at 1; never mask it.
 */
import { execSync, spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const dist = process.env.NEXT_DIST_DIR || ".next-build";
if (!process.argv.includes("--no-build")) {
  execSync("NEXT_DIST_DIR=" + dist + " npx next build", { stdio: "inherit", env: { ...process.env, NEXT_DIST_DIR: dist } });
}

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const pages = walk(dist).filter((f) => f.endsWith(".html") && !f.includes("/_"));
const urls = new Set(pages.map((f) => "/" + relative(dist, f).replace(/index\.html$/, "").replace(/\.html$/, "")));
const BAD = [
  [/[؀-ۿ]/, "Arabic script"],
  [/Hamd/, "Hamd"],
  [/artist['’]s impression/i, "artist's impression"],
  [/—/, "em-dash"],
  [/\bendure\b/i, "endure"],
  [/\bfinished\b/i, "finished"],
  [/AED 580\b/, "title deed AED 580 (it is 520)"],
  [/AED 290\b/, "mortgage admin AED 290 (it is 270)"],
  [/\bleading brokerage\b|\btrusted by thousands\b|\baward-winning\b/i, "superlative"],
];
let failed = 0;
for (const f of pages) {
  const html = readFileSync(f, "utf8");
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  const problems = [];
  for (const [re, label] of BAD) if (re.test(text)) problems.push(label);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${h1} h1`);
  if (!/<title>/.test(html)) problems.push("no title");
  if (!/name="description"/.test(html)) problems.push("no description");
  if (!/rel="canonical"/.test(html) && !/(^|\/)404(\.html|\/)/.test(relative(dist, f))) problems.push("no canonical");
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      problems.push("JSON-LD does not parse");
    }
  }
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const h = m[1];
    if (/\.(xml|txt|svg|png|jpg|webp|avif|woff2|css|js|ico)$/.test(h) || h.startsWith("/_next")) continue;
    const u = h.endsWith("/") ? h : h + "/";
    if (!urls.has(u) && !existsSync(join(dist, h))) problems.push(`dead link ${h}`);
  }
  if (problems.length) {
    failed += 1;
    console.log(`FAIL ${relative(dist, f)}: ${[...new Set(problems)].join("; ")}`);
  }
}
console.log(`${pages.length} pages, ${failed} failing`);
if (failed) process.exit(1);

// Then the colour rule: no dark on dark, checked in a real browser at two widths.
const dark = spawnSync("node", ["scripts/darkscan.mjs", dist], { stdio: "inherit" });
process.exit(dark.status === 0 ? 0 : 1);
