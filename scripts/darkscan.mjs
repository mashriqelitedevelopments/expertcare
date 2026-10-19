#!/usr/bin/env node
/**
 * No dark on dark. Serves the static build, drives headless Chrome over the DevTools protocol at
 * desktop and phone widths, and on each page checks every painted element:
 *  - a dark background or dark border must sit on a light ground: the ground is whatever paints
 *    beneath the element's centre once the element itself is hidden (so fixed notices, badges and
 *    buttons over heroes, plates and dark sections are caught, not just nested ones);
 *  - dark type must sit on a light ground, and light type over a photograph must sit on a dark
 *    enough part of it: the composited pixels under each light text block are sampled from a
 *    screenshot of the same scroll position (threshold: mean luminance 0.32, about 2.6:1 for bone);
 *  - two dark blocks may not touch: no dark section directly before another dark section or
 *    before the footer.
 * Photographs count as dark ground (type and chrome over them must be light).
 *
 *   node scripts/darkscan.mjs <dist-dir>        exit 1 on any hit, listing page, viewport and element
 */
import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const dist = process.argv[2] || ".next-build";
const PORT = 4379;
const DEBUG_PORT = 9463;
const ROUTES = (process.env.ROUTES ? process.env.ROUTES.split(",") : [
  "/", "/properties/", "/off-plan/", "/properties/sobha-orbis/", "/buy/apartments-for-sale-in-dubai/", "/shortlist/",
  "/sell/", "/rent/", "/landlords/", "/services/", "/services/mortgage-advisory/", "/areas/", "/areas/dubai-marina/",
  "/guides/", "/guides/selling-property-in-dubai/", "/faq/", "/dubai-property-facts/", "/dubai-property-glossary/",
  "/dubai-property-prices/", "/dubai-property-prices/dubai-marina/", "/buying-costs/", "/mortgage-calculator/",
  "/about/", "/contact/", "/privacy/", "/nothing-here/",
]);
const DEVICES = { desktop: { width: 1440, height: 900, mobile: false }, mobile: { width: 390, height: 844, mobile: true } };
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The scan that runs inside the page. Returns a list of problems, each a short description.
const SCAN = String.raw`(() => {
  const lum = (c) => { const m = (c || "").match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/); if (!m) return null;
    const a = m[4] === undefined ? 1 : +m[4]; if (a < 0.45) return null;
    const [r, g, b] = [+m[1], +m[2], +m[3]].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const DARK = 0.2;
  const name = (el) => el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : "");
  const isPhoto = (el) => el.matches("img, picture, video") || el.matches(".hero, .plate, .hero-media, .door-media, .atlas-media");
  const groundOf = (el) => { // what paints beneath the element at its centre (overlays above it are not ground)
    const r = el.getBoundingClientRect(); const cx = Math.min(innerWidth - 1, Math.max(0, r.left + r.width / 2)); const cy = Math.min(innerHeight - 1, Math.max(0, r.top + r.height / 2));
    const stack = document.elementsFromPoint(cx, cy); let i = stack.indexOf(el); if (i < 0) i = stack.findIndex((g) => el.contains(g));
    for (const g of stack.slice(i + 1)) { if (g === el || el.contains(g) || g.closest("nextjs-portal")) continue;
      if (g.parentElement === el.parentElement && g.tagName === el.tagName) continue; // parts of one glyph (burger bars)
      if (isPhoto(g)) return { dark: true, name: name(g) };
      const l = lum(getComputedStyle(g).backgroundColor); if (l !== null) return { dark: l < DARK, name: name(g) }; }
    return { dark: false, name: "body" }; };
  const out = new Set();
  const els = [...document.querySelectorAll("body *")].filter((el) => !el.closest("nextjs-portal, script, style, svg *"));
  for (const el of els) {
    const cs = getComputedStyle(el); if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect(); if (r.width < 6 || r.height < 6) continue;
    if (r.bottom < 0 || r.top > innerHeight || r.right <= 0 || r.left >= innerWidth) continue; // only what is on screen
    if (el.closest("[inert], [aria-hidden=\"true\"]")) continue; // hidden from everyone
    const bg = lum(cs.backgroundColor); const darkBg = bg !== null && bg < DARK;
    const bl = cs.borderTopStyle !== "none" && parseFloat(cs.borderTopWidth) > 0 ? lum(cs.borderTopColor) : null; const darkBorder = bl !== null && bl < DARK && bg === null;
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const col = hasText ? lum(cs.color) : null; const darkText = col !== null && col < DARK;
    if (!darkBg && !darkBorder && !darkText) continue;
    if (darkBg || darkBorder) { const g = groundOf(el); if (g.dark) out.add((darkBg ? "dark background " : "dark border ") + name(el) + " on " + g.name); }
    if (darkText && !darkBg) { // the text's own ground: nearest painted ancestor or photo
      let p = el, found = null; while (p && p !== document.body) { if (isPhoto(p)) { found = { dark: true, name: name(p) }; break; }
        const l = lum(getComputedStyle(p).backgroundColor); if (l !== null) { found = { dark: l < DARK, name: name(p) }; break; } p = p.parentElement; }
      if (found && found.dark) out.add("dark text " + JSON.stringify(el.textContent.trim().slice(0, 30)) + " in " + found.name); }
  }
  // touching dark blocks
  const blocks = [...document.querySelectorAll("main > section, main > div, footer")].filter((b) => getComputedStyle(b).display !== "none");
  const darkBlock = (b) => { const l = lum(getComputedStyle(b).backgroundColor); return l !== null && l < DARK; };
  for (let i = 1; i < blocks.length; i++) if (darkBlock(blocks[i - 1]) && darkBlock(blocks[i])) out.add("dark block " + name(blocks[i - 1]) + " touches dark block " + name(blocks[i]));
  return [...out];
})()`;

// Light type over photographs: sample the screenshot beneath each on-screen light text block.
const SAMPLE = (dataUrl) => String.raw`(async () => {
  const lum = (c) => { const m = (c || "").match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/); if (!m) return null;
    const a = m[4] === undefined ? 1 : +m[4]; if (a < 0.45) return null;
    const [r, g, b] = [+m[1], +m[2], +m[3]].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const name = (el) => el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : "");
  const img = new Image(); img.src = ${JSON.stringify(dataUrl)}; await img.decode();
  const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight; const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const sx = img.naturalWidth / innerWidth, sy = img.naturalHeight / innerHeight;
  const overlays = [...document.querySelectorAll(".cons, .mbar, .hdr")].filter((o) => { const cs = getComputedStyle(o); return cs.display !== "none" && lum(cs.backgroundColor) !== null; }).map((o) => o.getBoundingClientRect());
  const out = [];
  for (const el of document.querySelectorAll(".hero *, .plate *, .door-media *, .atlas-media *")) {
    if (el.closest("nextjs-portal, script, style, svg, .ticket, .panel, .cons")) continue;
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()); if (!hasText) continue;
    const cs = getComputedStyle(el); if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) continue;
    const col = lum(cs.color); if (col === null || col < 0.6) continue; // light type only
    const r = el.getBoundingClientRect(); if (r.width < 8 || r.height < 8 || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) continue;
    // under a fixed overlay (the consent card, the scrolled header, the mobile bar) the pixels are the overlay's, not the photograph's
    if (overlays.some((o) => r.left < o.right && r.right > o.left && r.top < o.bottom && r.bottom > o.top)) continue;
    const x0 = Math.max(0, Math.round(r.left * sx)), y0 = Math.max(0, Math.round(r.top * sy)), x1 = Math.min(c.width, Math.round(r.right * sx)), y1 = Math.min(c.height, Math.round(r.bottom * sy));
    if (x1 - x0 < 4 || y1 - y0 < 4) continue;
    // the text itself is light, so sample the darker half of the pixels: that is the ground between the glyphs
    const d = g.getImageData(x0, y0, x1 - x0, y1 - y0).data; const ls = [];
    for (let i = 0; i < d.length; i += 16) { const r1 = d[i] / 255, g1 = d[i + 1] / 255, b1 = d[i + 2] / 255; ls.push(0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1); }
    ls.sort((a, b) => a - b); const ground = ls.slice(0, Math.max(1, Math.floor(ls.length * 0.5))); const mean = ground.reduce((a, b) => a + b, 0) / ground.length;
    if (mean > 0.32) out.push("light text " + JSON.stringify(el.textContent.trim().slice(0, 28)) + " on a bright photo area (ground " + mean.toFixed(2) + ") in " + name(el.closest(".hero, .plate, .door-media, .atlas-media")));
  }
  return out;
})()`;

const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(dist, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { file = join(dist, "404.html"); res.statusCode = 404; }
  res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream");
  createReadStream(file).pipe(res);
}).listen(PORT);

const profile = mkdtempSync(join(tmpdir(), "ec-darkscan-"));
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--disable-extensions",
  "--force-color-profile=srgb", `--user-data-dir=${profile}`, `--remote-debugging-port=${DEBUG_PORT}`, "about:blank"], { stdio: "ignore" });
let ws; let hits = 0; let pagesScanned = 0;
try {
  let url;
  for (let i = 0; i < 100 && !url; i++) { try { url = (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch { await sleep(100); } }
  if (!url) throw new Error("Chrome never opened its debugging port");
  ws = new WebSocket(url); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let seq = 0; const pending = new Map();
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { resolve, reject } = pending.get(m.id); pending.delete(m.id); m.error ? reject(new Error(m.error.message)) : resolve(m.result); } };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params, sessionId })); });
  for (const [device, { width, height, mobile }] of Object.entries(DEVICES)) {
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    // Consent unanswered on purpose: the notice is part of what must be checked. Reveal animations off.
    await send("Page.addScriptToEvaluateOnNewDocument", { source: "try{localStorage.removeItem('ec-consent')}catch{};document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.js .rv{opacity:1!important;transform:none!important}';document.head.appendChild(s)})" }, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile }, sessionId);
    for (const route of ROUTES) {
      await send("Page.navigate", { url: `http://127.0.0.1:${PORT}${route}` }, sessionId);
      await sleep(1500);
      const total = (await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true }, sessionId)).result.value;
      const found = new Set();
      for (let y = 0; y < total; y += Math.round(height * 0.8)) {
        await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` }, sessionId); await sleep(450);
        const { result } = await send("Runtime.evaluate", { expression: SCAN, returnByValue: true }, sessionId);
        for (const h of result.value || []) found.add(h);
        const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 70 }, sessionId);
        const sampled = await send("Runtime.evaluate", { expression: SAMPLE(`data:image/jpeg;base64,${shot.data}`), awaitPromise: true, returnByValue: true }, sessionId);
        for (const h of sampled.result.value || []) found.add(h);
      }
      // the open menu, at phone width where it is the navigation
      if (mobile) {
        await send("Runtime.evaluate", { expression: "window.scrollTo(0,0); document.querySelector('.hdr-menu')?.click()" }, sessionId); await sleep(700);
        const { result } = await send("Runtime.evaluate", { expression: SCAN, returnByValue: true }, sessionId);
        for (const h of result.value || []) found.add("menu open: " + h);
      }
      pagesScanned += 1;
      for (const h of found) { hits += 1; console.log(`FAIL ${device} ${route}: ${h}`); }
    }
    await send("Target.closeTarget", { targetId });
  }
} finally {
  try { ws?.close(); } catch {}
  chrome.kill("SIGKILL"); server.close(); await sleep(300); rmSync(profile, { recursive: true, force: true });
}
console.log(`darkscan: ${pagesScanned} page views, ${hits} dark-on-dark hits`);
process.exit(hits ? 1 : 0);
