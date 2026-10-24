"use client";

import { useEffect, useMemo, useState } from "react";
import type { Enquiry, EnquiryStatus, Store } from "./store";
import { csv, download, when } from "./util";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "viewing", "closed", "spam"];
const INTENT: Record<string, string> = { viewing: "Viewing", brief: "Buyer brief", general: "Enquiry", valuation: "Valuation", landlord: "Landlord", tenant: "Rental brief" };
const digits = (s: string) => s.replace(/[^\d]/g, "");

export function Enquiries({ store, onCount }: { store: Store; onCount: (n: number) => void }) {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<EnquiryStatus | "all">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Enquiry | null>(null);

  useEffect(() => {
    if (!open) return;
    const esc = (k: KeyboardEvent) => k.key === "Escape" && setOpen(null);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  const load = async () => {
    try {
      const r = await store.listEnquiries();
      setRows(r);
      onCount(r.filter((e) => e.status === "new").length);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (rows ?? []).filter(
      (e) =>
        (filter === "all" || e.status === filter) &&
        (!term || [e.name, e.phone, e.email, e.context, e.unit, ...Object.values(e.fields)].join(" ").toLowerCase().includes(term)),
    );
  }, [rows, filter, q]);

  const patch = async (e: Enquiry, p: Partial<Pick<Enquiry, "status" | "notes">>) => {
    await store.updateEnquiry(e.id, p);
    const next = { ...e, ...p };
    setOpen(next);
    setRows((r) => {
      const out = (r ?? []).map((x) => (x.id === e.id ? next : x));
      onCount(out.filter((x) => x.status === "new").length);
      return out;
    });
  };

  if (error) return <p className="admin-error">Could not load enquiries: {error}</p>;
  if (!rows) return <p className="admin-muted">Loading enquiries</p>;

  return (
    <section className="admin-section">
      <div className="admin-bar">
        <h2>Enquiries</h2>
        <div className="admin-chips">
          {(["all", ...STATUSES] as const).map((s) => (
            <button key={s} type="button" className={filter === s ? "on" : ""} onClick={() => setFilter(s)}>
              {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)} <small>{s === "all" ? rows.length : rows.filter((e) => e.status === s).length}</small>
            </button>
          ))}
        </div>
        <input className="admin-search" type="search" placeholder="Search name, phone, project" value={q} onChange={(e) => setQ(e.target.value)} />
        <button
          type="button"
          className="admin-btn ghost"
          onClick={() =>
            download(
              `expertcare-enquiries-${new Date().toISOString().slice(0, 10)}.csv`,
              csv(shown.map((e) => ({ received: e.created_at, status: e.status, type: INTENT[e.intent] ?? e.intent, name: e.name, phone: e.phone, email: e.email, home: e.context, unit: e.unit, details: Object.entries(e.fields).map(([k, v]) => `${k}: ${v}`).join("; "), page: e.page, notes: e.notes }))),
            )
          }
        >
          Export CSV
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="admin-empty">{rows.length ? "No enquiries match." : "No enquiries yet. Every form on the site lands here."}</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Name</th>
                <th>Type</th>
                <th>Home or unit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((e) => (
                <tr key={e.id} className={e.status === "new" ? "is-new" : ""} onClick={() => setOpen(e)} tabIndex={0} onKeyDown={(k) => k.key === "Enter" && setOpen(e)}>
                  <td>{when(e.created_at)}</td>
                  <td>
                    <strong>{e.name}</strong>
                    <span>{e.phone || e.email}</span>
                  </td>
                  <td>{INTENT[e.intent] ?? e.intent}</td>
                  <td>
                    {e.context.split(",")[1]?.trim() || e.context || "-"}
                    {e.unit && <span>Unit {e.unit}</span>}
                  </td>
                  <td>
                    <span className={`admin-status s-${e.status}`}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="admin-drawer" role="dialog" aria-modal="true" aria-label={`Enquiry from ${open.name}`} onClick={(ev) => ev.target === ev.currentTarget && setOpen(null)}>
          <div className="admin-drawer-in">
            <button type="button" className="admin-x" onClick={() => setOpen(null)} aria-label="Close">
              ×
            </button>
            <p className="admin-kicker">
              {INTENT[open.intent] ?? open.intent} · {when(open.created_at)}
            </p>
            <h3>{open.name}</h3>
            <div className="admin-actions">
              {open.phone && (
                <a className="admin-btn" href={`https://wa.me/${digits(open.phone)}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              )}
              {open.phone && (
                <a className="admin-btn ghost" href={`tel:${open.phone.replace(/[^\d+]/g, "")}`}>
                  Call
                </a>
              )}
              {open.email && (
                <a className="admin-btn ghost" href={`mailto:${open.email}`}>
                  Email
                </a>
              )}
            </div>
            <dl className="admin-dl">
              {open.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>{open.phone}</dd>
                </div>
              )}
              {open.email && (
                <div>
                  <dt>Email</dt>
                  <dd>{open.email}</dd>
                </div>
              )}
              {open.context && (
                <div>
                  <dt>Home</dt>
                  <dd>{open.context}</dd>
                </div>
              )}
              {open.unit && (
                <div>
                  <dt>Unit</dt>
                  <dd>{open.unit}</dd>
                </div>
              )}
              {Object.entries(open.fields).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              {open.page && (
                <div>
                  <dt>Sent from</dt>
                  <dd>
                    <a href={open.page} target="_blank" rel="noopener">
                      {open.page}
                    </a>
                    {open.referrer && ` (came from ${open.referrer})`}
                  </dd>
                </div>
              )}
            </dl>
            <label className="admin-field">
              Status
              <select value={open.status} onChange={(ev) => void patch(open, { status: ev.target.value as EnquiryStatus })}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <Notes key={open.id} value={open.notes} onSave={(notes) => patch(open, { notes })} />
            <button
              type="button"
              className="admin-link danger"
              onClick={async () => {
                if (!confirm("Delete this enquiry? This cannot be undone.")) return;
                await store.deleteEnquiry(open.id);
                setRows((r) => (r ?? []).filter((x) => x.id !== open.id));
                setOpen(null);
              }}
            >
              Delete enquiry
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Notes({ value, onSave }: { value: string; onSave: (v: string) => Promise<void> }) {
  const [v, setV] = useState(value);
  const [state, setState] = useState("");
  return (
    <label className="admin-field">
      Notes
      <textarea rows={4} value={v} onChange={(e) => setV(e.target.value)} placeholder="Calls, viewings, next step" />
      <span className="admin-row">
        <button
          type="button"
          className="admin-btn ghost small"
          disabled={v === value}
          onClick={async () => {
            setState("Saving");
            await onSave(v);
            setState("Saved");
          }}
        >
          Save notes
        </button>
        <small className="admin-muted">{state}</small>
      </span>
    </label>
  );
}
