/** The parts of lib/units.ts with no imports, so scripts/mashriq/units.mjs can load them in Node. */

export const UNITS_SHEET = "13QOcyILo221_6BcIBdvsX4Dn2GK4a_rnXdbq-2WaH4k";
const SELECT = "select A,B,C,D,E,H,R,N,O,P,Q where upper(K) contains 'YES'";
export const UNITS_FEED = `https://docs.google.com/spreadsheets/d/${UNITS_SHEET}/gviz/tq?sheet=Inventory&tqx=out:csv&tq=${encodeURIComponent(SELECT)}`;

/** The sheet's project codes, mapped to this site's listing slugs. */
export const UNIT_CODES: Record<string, string> = {
  FS: "mashriq-elite-floarea-skies",
  FO: "mashriq-elite-floarea-oasis",
  FB: "mashriq-elite-floarea-breeze",
  FG: "mashriq-elite-floarea-grande",
};

export type Unit = {
  project: string;
  unit: string;
  unitType: string;
  type: string;
  view: string;
  size: number | null;
  parking: string;
  plans: string[];
};

const PLAN_LABEL: Record<string, string> = {
  standard: "30/70",
  "standard - flexi": "30/70 flexi",
  "post handover": "30/35/35",
  "post handover flexi": "30/35/35 flexi",
};

/** "1 BR + S" → "1 bedroom + study", "Town House - 03 BR + S" → "3 bedroom townhouse + study". */
export function unitTypeLabel(raw: string) {
  const s = raw.trim();
  if (/^studio/i.test(s)) return "Studio";
  const beds = s.match(/(\d+)\s*BR/i);
  if (!beds) return s;
  const n = Number(beds[1]);
  const town = /town\s*house/i.test(s);
  const study = /\+\s*(s\b|study)/i.test(s);
  const maid = /maid/i.test(s);
  return `${n} bedroom${town ? " townhouse" : ""}${study ? " + study" : ""}${maid ? " + maid's room" : ""}`;
}

/** "Type - A1" / "TYPE - A1" → "A1". */
export const typeLabel = (raw: string) => raw.trim().replace(/^type\s*-\s*/i, "") || "";

/** One parsed row of the feed (columns A,B,C,D,E,H,R,N,O,P,Q), or null if it is not one of ours. */
export function rowToUnit(r: string[]): Unit | null {
  const project = UNIT_CODES[(r[0] ?? "").trim().toUpperCase()];
  if (!project || !r[1]) return null;
  const size = Number.parseFloat(r[5] ?? "");
  return {
    project,
    unit: r[1].trim(),
    unitType: unitTypeLabel(r[2] ?? ""),
    type: typeLabel(r[3] ?? ""),
    view: (r[4] ?? "").trim(),
    size: Number.isFinite(size) ? Math.round(size) : null,
    parking: (r[6] ?? "").trim(),
    plans: r
      .slice(7, 11)
      .map((p) => PLAN_LABEL[p.trim().toLowerCase()] ?? "")
      .filter(Boolean),
  };
}

/** A small CSV reader for the feed: quoted fields, commas and doubled quotes inside them. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let f = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (q) {
      if (c === '"' && text[i + 1] === '"') {
        f += '"';
        i++;
      } else if (c === '"') q = false;
      else f += c;
    } else if (c === '"') q = true;
    else if (c === ",") {
      row.push(f);
      f = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(f);
      rows.push(row);
      row = [];
      f = "";
    } else f += c;
  }
  if (f || row.length) {
    row.push(f);
    rows.push(row);
  }
  return rows;
}

const bedsOf = (u: Unit) => (u.unitType === "Studio" ? 0 : Number.parseInt(u.unitType, 10) || 9);
export const sortUnits = (list: Unit[]) =>
  [...list].sort((a, b) => bedsOf(a) - bedsOf(b) || a.unit.localeCompare(b.unit, "en", { numeric: true }));
