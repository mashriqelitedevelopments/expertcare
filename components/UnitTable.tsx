"use client";

import { useEffect, useState } from "react";
import { UNITS_FEED, parseCsv, rowToUnit, sortUnits, type Unit } from "@/lib/units-core";

type Labels = {
  unit: string;
  unitType: string;
  type: string;
  view: string;
  size: string;
  parking: string;
  plans: string;
  ask: string;
  sqft: string;
  live: string;
  snapshot: string;
  none: string;
  caption: string;
};

/**
 * The homes still available in a Mashriq Elite project, one row per unit. Rendered from the build
 * snapshot, then refreshed from the developer's live sheet in the browser; if the sheet cannot be
 * reached the snapshot stays, with its date.
 */
export function UnitTable({ slug, initial, checked, labels }: { slug: string; initial: Unit[]; checked: string; labels: Labels }) {
  const [units, setUnits] = useState(initial);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let off = false;
    fetch(UNITS_FEED)
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((text) => {
        const rows = parseCsv(text).slice(1);
        const list = sortUnits(rows.map(rowToUnit).filter((u): u is Unit => !!u && u.project === slug));
        if (!off) {
          setUnits(list);
          setLive(true);
        }
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, [slug]);

  /** Stay on the page: note the unit in the address, tell the form, and scroll to it. */
  const pick = (e: React.MouseEvent, unit: string) => {
    e.preventDefault();
    history.replaceState(null, "", `?unit=${encodeURIComponent(unit)}#enquire`);
    window.dispatchEvent(new CustomEvent("ec-unit", { detail: unit }));
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (units.length === 0) return <p className="units-note">{labels.none}</p>;

  return (
    <>
      <div className="tbl-wrap">
        <table className="tbl units">
          <caption className="sr">{labels.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{labels.unit}</th>
              <th scope="col">{labels.unitType}</th>
              <th scope="col">{labels.type}</th>
              <th scope="col">{labels.view}</th>
              <th scope="col">{labels.size}</th>
              <th scope="col">{labels.parking}</th>
              <th scope="col">{labels.plans}</th>
              <th scope="col">
                <span className="sr">{labels.ask}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {units.map((u) => (
              <tr key={u.unit}>
                <th scope="row">{u.unit}</th>
                <td>{u.unitType}</td>
                <td>{u.type}</td>
                <td>{u.view}</td>
                <td className="tnum">{u.size ? `${u.size.toLocaleString("en-US")} ${labels.sqft}` : ""}</td>
                <td className="tnum">{u.parking}</td>
                <td>{u.plans.join(", ")}</td>
                <td>
                  <a className="unit-ask" href={`?unit=${encodeURIComponent(u.unit)}#enquire`} onClick={(e) => pick(e, u.unit)}>
                    {labels.ask}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="units-note">{live ? labels.live : labels.snapshot.replace("{date}", checked)}</p>
    </>
  );
}
