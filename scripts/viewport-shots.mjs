#!/usr/bin/env node
/**
 * Screenshots of the served static build, one viewport at a time, scrolling like a visitor.
 *
 *   node scripts/viewport-shots.mjs http://localhost:4331 <out-dir> [desktop|mobile|both]
 *
 * Why not one tall window: every hero and company panel is 100svh, so a 9,400px-tall capture
 * window stretches them to 9,400px and misrepresents the page. Why not the Browser pane: it
 * paints nothing once scrolled. This drives headless Chrome over the DevTools protocol with a
 * real 1440x900 or 390x844 viewport (emulated, so the 500px headless width clamp does not apply).
 * The temp profile is named hp-cdp-*; Chrome is killed in `finally`.
 */
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEBUG_PORT = 9461;
const [base, outDir, which = "both"] = process.argv.slice(2);
const ALL_ROUTES = ["/", "/properties/", "/off-plan/", "/areas/", "/areas/dubai-marina/", "/guides/", "/guides/cost-of-buying-property-in-dubai/",
  "/properties/dubai-creek-harbour-two-bedroom-off-plan/", "/buying-costs/", "/about/", "/contact/"];
// ROUTES=/,/about/ limits the run to those pages.
const ROUTES = process.env.ROUTES ? process.env.ROUTES.split(",") : ALL_ROUTES;
const DEVICES = {
  desktop: { width: 1440, height: 900, mobile: false },
  mobile: { width: 390, height: 844, mobile: true },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(outDir, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), "hp-cdp-"));
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--disable-extensions", "--force-color-profile=srgb", `--user-data-dir=${profile}`,
  `--remote-debugging-port=${DEBUG_PORT}`, "about:blank"], { stdio: "ignore" });

let ws;
try {
  let url;
  for (let i = 0; i < 100 && !url; i++) {
    try { url = (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`)).json()).webSocketDebuggerUrl; }
    catch { await sleep(100); }
  }
  if (!url) throw new Error("Chrome never opened its debugging port");
  ws = new WebSocket(url);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let seq = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(m.error.message)) : resolve(m.result);
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

  const selected = which === "both" ? Object.keys(DEVICES) : [which];
  for (const device of selected) {
    const { width, height, mobile } = DEVICES[device];
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    // The consent notice is answered before any page loads, so it never hides the review.
    await send("Page.addScriptToEvaluateOnNewDocument", { source: "try{localStorage.setItem('hp-consent','{\"analytics\":false,\"at\":\"review\"}')}catch{}" }, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile }, sessionId);
    for (const route of ROUTES) {
      const name = route.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";
      await send("Page.navigate", { url: base + route }, sessionId);
      await sleep(3000);
      const probe = await send("Runtime.evaluate", { returnByValue: true, expression:
        "(() => { const v = document.querySelector('.hero video'); return v ? { currentTime: +v.currentTime.toFixed(2), paused: v.paused, readyState: v.readyState, loop: v.loop, muted: v.muted, error: v.error && v.error.code, src: v.currentSrc.split('/').pop() } : null; })()" }, sessionId);
      if (probe.result.value) console.log(`${device.padEnd(8)} ${route.padEnd(30)} hero video`, JSON.stringify(probe.result.value));
      const { result } = await send("Runtime.evaluate",
        { expression: "document.documentElement.scrollHeight", returnByValue: true }, sessionId);
      const total = result.value;
      const steps = Math.min(16, Math.ceil(total / height));
      for (let i = 0; i < steps; i++) {
        await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${i * height})` }, sessionId);
        await sleep(1000);
        const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 72 }, sessionId);
        writeFileSync(join(outDir, `${device}-${name}-${String(i).padStart(2, "0")}.jpg`), Buffer.from(data, "base64"));
      }
      console.log(`${device.padEnd(8)} ${route.padEnd(30)} height ${total}  shots ${steps}`);
    }
  }
} finally {
  try { ws?.close(); } catch {}
  chrome.kill("SIGKILL");
  await sleep(500);
  rmSync(profile, { recursive: true, force: true });
}
