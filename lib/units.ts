/**
 * Mashriq Elite's available homes, unit by unit.
 *
 * Mashriq Elite keeps its live inventory in a Google Sheet, and its own site reads it through
 * Google's visualisation endpoint. So do we, with a query that asks only for the columns a buyer
 * needs: unit, unit type, type, view, size, parking and the payment plans it is sold on. Price and
 * completion columns are never requested, because Mashriq Elite quotes prices on request and
 * publishes no handover dates (company decision, 12 Sep 2026). Sold, held and blocked rows never
 * leave Google: the query keeps only rows marked available.
 *
 * `npm run units` writes a snapshot to lib/data/mashriq-units.json for the build; each project
 * page then refreshes the table from the live sheet when it opens.
 */
import SNAPSHOT from "./data/mashriq-units.json";
import { UNIT_CODES, sortUnits, type Unit } from "./units-core";

export * from "./units-core";

export const UNITS_CHECKED: string = SNAPSHOT.checked;
const ALL = SNAPSHOT.units as Unit[];

/** Units for a listing from the build snapshot; undefined for listings the sheet does not cover. */
export function unitsFor(slug: string): Unit[] | undefined {
  if (!Object.values(UNIT_CODES).includes(slug)) return undefined;
  return sortUnits(ALL.filter((u) => u.project === slug));
}
