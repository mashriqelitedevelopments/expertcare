#!/usr/bin/env node
/**
 * Portal → site. Before a build, pull the PUBLISHED listings from the portal database into
 * lib/data/projects.json (the file the whole site is built from), download photos uploaded in /admin
 * and cut their web sizes into public/img/p, and write lib/data/listings-version.txt so the scheduled
 * rebuild can tell whether anything changed.
 *
 * Drafts never leave the database: only published rows are written, so nothing hidden reaches the
 * public bundle. With the portal not connected (lib/backend.ts empty) the committed files stay as they are.
 *
 *   node scripts/portal/sync-listings.mjs
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DATA = join(ROOT, "lib", "data");
const OUT_IMG = join(ROOT, "public", "img", "p");
const WIDTHS = [640, 960, 1600];

const cfg = readFileSync(join(ROOT, "lib", "backend.ts"), "utf8");
const URL_ = process.env.SUPABASE_URL || (cfg.match(/SUPABASE_URL = "([^"]*)"/) || [])[1] || "";
const KEY = process.env.SUPABASE_ANON_KEY || (cfg.match(/SUPABASE_ANON_KEY = "([^"]*)"/) || [])[1] || "";

if (!URL_ || !KEY) {
  console.log("sync-listings: portal not connected (lib/backend.ts); keeping lib/data/projects.json");
  writeFileSync(join(DATA, "listings-version.txt"), "static\n");
  process.exit(0);
}

const res = await fetch(`${URL_}/rest/v1/listings?select=*&published=eq.true&order=sort.asc,created_at.asc`, {
  headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
});
if (!res.ok) throw new Error(`sync-listings: database answered ${res.status} ${await res.text()}`);
const rows = await res.json();

const specs = JSON.parse(readFileSync(join(DATA, "project-images.json"), "utf8"));
let sharp;
const cut = async (path, slug) => {
  const key = `p/${slug}-u${createHash("sha1").update(path).digest("hex").slice(0, 8)}`;
  const base = key.slice(2);
  if (specs[key] && existsSync(join(OUT_IMG, `${base}-${specs[key].widths.at(-1)}.jpg`))) return key;
  sharp ??= (await import("sharp")).default;
  const img = await fetch(`${URL_}/storage/v1/object/public/listings/${path.split("/").map(encodeURIComponent).join("/")}`);
  if (!img.ok) throw new Error(`sync-listings: photo ${path} answered ${img.status}`);
  const buf = Buffer.from(await img.arrayBuffer());
  const meta = await sharp(buf).metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  // Crop to 3:2 around the centre, as the inventory build does.
  const cw = Math.min(w, Math.round((h * 3) / 2));
  const ch = Math.round((cw * 2) / 3);
  const left = Math.round((w - cw) / 2);
  const top = Math.round((h - ch) / 2);
  const widths = WIDTHS.filter((x) => x <= cw);
  if (!widths.length) widths.push(cw);
  for (const width of widths) {
    const s = sharp(buf).extract({ left, top, width: cw, height: ch }).resize(width, Math.round((width * 2) / 3));
    await s.clone().jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(join(OUT_IMG, `${base}-${width}.jpg`));
    await s.clone().webp({ quality: 80 }).toFile(join(OUT_IMG, `${base}-${width}.webp`));
    await s.clone().avif({ quality: 58 }).toFile(join(OUT_IMG, `${base}-${width}.avif`));
  }
  specs[key] = { ratio: [3, 2], widths, alt: "", altAr: "", src: "Uploaded in /admin" };
  return key;
};

const projects = [];
for (const r of rows) {
  const images = [];
  for (const i of r.images || []) {
    const key = i.key ? i.key : i.path ? await cut(i.path, r.slug) : null;
    if (!key || !specs[key]) continue;
    specs[key] = { ...specs[key], alt: i.alt || specs[key].alt, altAr: i.alt || specs[key].altAr };
    images.push(key);
  }
  if (!images.length) {
    console.log(`sync-listings: ${r.slug} has no usable photo; left off the site`);
    continue;
  }
  projects.push({
    slug: r.slug,
    ref: r.ref,
    title: r.title,
    developer: r.developer,
    developerUrl: r.developer_url,
    community: r.community,
    area: r.area,
    type: r.types[0],
    types: r.types,
    status: r.status,
    price: r.price,
    priceNote: r.price_note,
    beds: r.beds,
    bedsMax: r.beds_max,
    size: r.size,
    images,
    summary: r.summary,
    description: r.description,
    features: r.features,
    amenities: r.amenities,
    handover: r.handover,
    plan: r.plan,
    planLabel: r.plan_label,
    permit: r.permit,
    projectNumber: r.project_number,
    escrow: r.escrow,
    source: r.source,
    checked: r.checked,
    published: true,
  });
}

writeFileSync(join(DATA, "projects.json"), JSON.stringify(projects, null, 1) + "\n");
writeFileSync(join(DATA, "project-images.json"), JSON.stringify(specs, null, 1) + "\n");
const version = `${projects.length}:${rows.map((r) => r.updated_at).sort().at(-1) || "none"}`;
writeFileSync(join(DATA, "listings-version.txt"), version + "\n");
console.log(`sync-listings: ${projects.length} published listings, version ${version}`);
