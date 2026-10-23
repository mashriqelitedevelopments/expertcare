// Snapshot Mashriq Elite's available units into lib/data/mashriq-units.json (see lib/units.ts).
// Usage: npm run units
import { writeFileSync } from "node:fs";

const SHEET = "13QOcyILo221_6BcIBdvsX4Dn2GK4a_rnXdbq-2WaH4k";
const SELECT = "select A,B,C,D,E,H,R,N,O,P,Q where upper(K) contains 'YES'";
const url = `https://docs.google.com/spreadsheets/d/${SHEET}/gviz/tq?sheet=Inventory&tqx=out:csv&tq=${encodeURIComponent(SELECT)}`;

const { parseCsv, rowToUnit, sortUnits } = await import("../../lib/units-core.ts");
const res = await fetch(url);
if (!res.ok) throw new Error(`sheet answered ${res.status}`);
const rows = parseCsv(await res.text());
const head = rows.shift() ?? [];
if (!/project/i.test(head[0] ?? "") || !/unit/i.test(head[1] ?? "")) throw new Error(`unexpected header: ${head.join(" | ")}`);
const units = sortUnits(rows.map(rowToUnit).filter(Boolean));
const checked = new Date().toISOString().slice(0, 10);
writeFileSync(new URL("../../lib/data/mashriq-units.json", import.meta.url), JSON.stringify({ checked, units }, null, 1) + "\n");
const by = units.reduce((m, u) => ((m[u.project] = (m[u.project] ?? 0) + 1), m), {});
console.log(`mashriq units ${checked}:`, by);
