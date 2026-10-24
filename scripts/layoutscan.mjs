#!/usr/bin/env node
/**
 * Layout and responsiveness scan. Serves the static build and loads EVERY page in headless Chrome at
 * phone, tablet and desktop widths, then reports:
 *  - horizontal page overflow, with the elements that cause it;
 *  - text that overflows its own box (headings, buttons, table cells);
 *  - images that fail to load, and images with no alt attribute;
 *  - text smaller than 11px (the small-caps labels are 11px by design), and buttons, fields and stand-alone links under 32px tall on phones;
 *  - failed requests (4xx/5xx or network errors) and uncaught script errors.
 *
 *   node scripts/layoutscan.mjs <dist-dir>        exit 1 on any finding
 *   WIDTHS=390 ROUTES=/,/about/ node scripts/layoutscan.mjs out
 */
import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdtempSync, readdirSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, relative } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const dist = process.argv[2] || "out";
const PORT = 4381;
const DEBUG_PORT = 9465;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml", ".ico": "image/x-icon" };

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const ROUTES = process.env.ROUTES
  ? process.env.ROUTES.split(",")
  : walk(dist)
      .filter((f) => f.endsWith("index.html") && !f.includes("/_") && !/(^|\/)admin\//.test(relative(dist, f)))
      .map((f) => "/" + relative(dist, f).replace(/index\.html$/, ""))
      .sort();
const WIDTHS = (process.env.WIDTHS || "390,768,1440").split(",").map(Number);

const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(dist, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { file = join(dist, "404.html"); res.statusCode = 404; }
  res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream");
  createReadStream(file).pipe(res);
}).listen(PORT);

const PROBE = String.raw`(async () => {
  const vw = document.documentElement.clientWidth, out = [];
  const name = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className.trim() ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "");
  const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && !el.closest(".sr, [aria-hidden=true], [inert], .menu, dialog:not([open]), .cons"); };
  // load lazy images
  document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"));
  for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  scrollTo(0, 0);
  await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000); }))));
  // page overflow and its causes
  if (document.documentElement.scrollWidth > vw + 1) {
    const causes = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 0 && getComputedStyle(el).position !== "fixed" && !el.closest(".menu, .marquee, .marquee-line, .rail, .tbl-wrap, dialog, .partners-sec")) causes.push(name(el) + " right " + Math.round(r.right));
      if (causes.length > 4) break;
    }
    out.push("page overflows to " + document.documentElement.scrollWidth + "px: " + causes.join(", "));
  }
  // text overflowing its own box
  for (const el of document.querySelectorAll("h1, h2, h3, .btn, .cta, button, td, th, .chips a, .lcard h3, .tile h3, .door h3")) {
    if (!visible(el)) continue;
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX === "visible" && !el.closest(".tbl-wrap, .rail")) out.push("text overflows " + name(el) + ": " + JSON.stringify(el.textContent.trim().slice(0, 40)));
  }
  // images
  for (const i of document.images) {
    if (!i.closest("dialog") && i.complete && i.naturalWidth === 0 && i.currentSrc) out.push("broken image " + i.currentSrc.replace(location.origin, ""));
    if (!i.hasAttribute("alt")) out.push("image without alt " + (i.currentSrc || i.src).replace(location.origin, ""));
  }
  // small text
  const small = new Set();
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) {
    const t = tw.currentNode; if (!t.textContent.trim()) continue;
    const el = t.parentElement; if (!el || !visible(el)) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 11) small.add(name(el) + " " + fs + "px " + JSON.stringify(t.textContent.trim().slice(0, 24)));
    if (small.size > 5) break;
  }
  for (const s of small) out.push("small text " + s);
  // tap targets on phones
  if (vw < 600) {
    const tiny = [];
    for (const el of document.querySelectorAll("a, button, input:not([type=hidden]), select, summary")) {
      if (!visible(el)) continue;
      const inText = el.tagName === "A" && el.closest("p, li, dd, td, figcaption, label, .crumbs, .source-line, .note") && getComputedStyle(el).display === "inline";
      // Stretched links cover their whole card; radios and checkboxes sit inside larger labels.
      if (inText || el.matches(".lcard-link, .row-link, input[type=radio], input[type=checkbox]")) continue;
      const r = el.getBoundingClientRect();
      if (r.height < 32 && r.width < 200) tiny.push(name(el) + " " + Math.round(r.width) + "x" + Math.round(r.height) + " " + JSON.stringify((el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 20)));
      if (tiny.length > 5) break;
    }
    for (const t of tiny) out.push("small tap target " + t);
  }
  return out;
})()`;

async function launch() {
  const profile = mkdtempSync(join(tmpdir(), "ec-layoutscan-"));
  const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--disable-extensions",
    `--user-data-dir=${profile}`, `--remote-debugging-port=${DEBUG_PORT}`, "about:blank"], { stdio: "ignore" });
  let ws; let url;
  const close = async () => { try { ws?.close(); } catch {} chrome.kill("SIGKILL"); await sleep(300); rmSync(profile, { recursive: true, force: true }); };
  for (let i = 0; i < 100 && !url; i++) { try { url = (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch { await sleep(100); } }
  if (!url) { await close(); throw new Error("Chrome never opened its debugging port"); }
  ws = new WebSocket(url); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let seq = 0; const pending = new Map(); const listeners = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const { resolve, reject } = pending.get(m.id); pending.delete(m.id); m.error ? reject(new Error(m.error.message)) : resolve(m.result); }
    else if (m.method) listeners.forEach((f) => f(m));
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++seq;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`${method} timed out`)); }, 30000);
    pending.set(id, { resolve: (v) => (clearTimeout(timer), resolve(v)), reject: (e) => (clearTimeout(timer), reject(e)) });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  return { send, close, listeners };
}

async function openPage(b, width) {
  const { targetId } = await b.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await b.send("Target.attachToTarget", { targetId, flatten: true });
  await b.send("Page.enable", {}, sessionId);
  await b.send("Network.enable", {}, sessionId);
  await b.send("Runtime.enable", {}, sessionId);
  // Consent answered so the notice does not cover the page under test.
  await b.send("Page.addScriptToEvaluateOnNewDocument", { source: "try{localStorage.setItem('ec-consent',JSON.stringify({analytics:false,at:Date.now()}))}catch{}" }, sessionId);
  await b.send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 }, sessionId);
  return { targetId, sessionId };
}

let findings = 0; let views = 0;
let browser = await launch();
const net = [];
browser.listeners.push((m) => {
  if (m.method === "Network.responseReceived" && m.params.response.status >= 400 && m.params.response.url.includes(`127.0.0.1:${PORT}`) && m.params.type !== "Document") net.push(`${m.params.response.status} ${m.params.response.url.replace(/^.*:\d+/, "")}`);
  if (m.method === "Network.loadingFailed" && !m.params.canceled && m.params.type !== "Document" && !/google|doubleclick|docs\.google/.test(m.params.requestId)) net.push(`failed ${m.params.errorText} (${m.params.type})`);
  if (m.method === "Runtime.exceptionThrown") net.push("script error " + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).split("\n")[0]);
});
try {
  for (const width of WIDTHS) {
    let page = await openPage(browser, width);
    for (const route of ROUTES) {
      net.length = 0;
      let result = null;
      for (let attempt = 1; attempt <= 3 && !result; attempt++) {
        try {
          await browser.send("Page.navigate", { url: `http://127.0.0.1:${PORT}${route}` }, page.sessionId);
          await sleep(1200);
          const r = await browser.send("Runtime.evaluate", { expression: PROBE, awaitPromise: true, returnByValue: true }, page.sessionId);
          result = r.result.value || [];
        } catch (e) {
          if (attempt === 3) { result = ["scan failed: " + e.message]; break; }
          await browser.close(); browser = await launch(); browser.listeners.push(...[]); page = await openPage(browser, width);
        }
      }
      views += 1;
      const all = [...new Set([...result, ...net])];
      for (const f of all) { findings += 1; console.log(`${width} ${route}  ${f}`); }
    }
    await browser.send("Target.closeTarget", { targetId: page.targetId }).catch(() => {});
  }
} finally {
  await browser.close();
  server.close();
}
console.log(`layoutscan: ${views} page views at ${WIDTHS.join("/")}px, ${findings} findings`);
process.exit(findings ? 1 : 0);
