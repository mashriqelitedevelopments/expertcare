"use client";

import { useEffect, useMemo, useState } from "react";
import type { Img, ListingRow, PlanStep, Store } from "./store";
import { slugify, when } from "./util";
import { AREAS } from "@/lib/areas";

const TYPES = ["Apartment", "Penthouse", "Villa", "Townhouse"];
const REPO = "mashriqelitedevelopments/expertcare";

const blank = (sort: number): ListingRow => ({
  id: "",
  slug: "",
  ref: "",
  title: "",
  developer: "",
  developer_url: "",
  community: "",
  area: null,
  types: ["Apartment"],
  status: "off-plan",
  price: null,
  price_note: null,
  beds: 1,
  beds_max: 1,
  size: null,
  summary: "",
  description: [],
  features: [],
  amenities: [],
  handover: null,
  plan: null,
  plan_label: null,
  permit: "",
  project_number: "",
  escrow: "",
  source: "",
  checked: new Date().toISOString().slice(0, 10),
  images: [],
  published: false,
  sort,
});

/** When the public site was last rebuilt from the listings (the newest commit on the hostinger branch). */
function useLastPublish() {
  const [at, setAt] = useState<string>("");
  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/commits?sha=hostinger&per_page=1`)
      .then((r) => (r.ok ? r.json() : []))
      .then((c) => setAt(c?.[0]?.commit?.committer?.date ?? ""))
      .catch(() => {});
  }, []);
  return at;
}

export function Listings({ store }: { store: Store }) {
  const [rows, setRows] = useState<ListingRow[] | null>(null);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [show, setShow] = useState<"all" | "published" | "draft">("all");
  const [edit, setEdit] = useState<ListingRow | null>(null);
  const published = useLastPublish();

  useEffect(() => {
    store.listListings().then(setRows, (e) => setError((e as Error).message));
  }, [store]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [edit]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (rows ?? []).filter(
      (r) =>
        (show === "all" || (show === "published" ? r.published : !r.published)) &&
        (!term || [r.title, r.developer, r.community, r.area ?? "", r.ref].join(" ").toLowerCase().includes(term)),
    );
  }, [rows, q, show]);

  if (error) return <p className="admin-error">Could not load listings: {error}</p>;
  if (!rows) return <p className="admin-muted">Loading listings</p>;
  if (edit)
    return (
      <Editor
        store={store}
        row={edit}
        taken={rows.filter((r) => r.id !== edit.id).map((r) => r.slug)}
        onClose={() => setEdit(null)}
        onSaved={(saved) => {
          setRows((r) => {
            const list = r ?? [];
            return list.some((x) => x.id === saved.id) ? list.map((x) => (x.id === saved.id ? saved : x)) : [...list, saved];
          });
          setEdit(null);
        }}
        onDeleted={(id) => {
          setRows((r) => (r ?? []).filter((x) => x.id !== id));
          setEdit(null);
        }}
      />
    );

  return (
    <section className="admin-section">
      <div className="admin-bar">
        <h2>Listings</h2>
        <div className="admin-chips">
          {(["all", "published", "draft"] as const).map((s) => (
            <button key={s} type="button" className={show === s ? "on" : ""} onClick={() => setShow(s)}>
              {s === "all" ? "All" : s === "published" ? "On the site" : "Hidden"}{" "}
              <small>{s === "all" ? rows.length : rows.filter((r) => (s === "published" ? r.published : !r.published)).length}</small>
            </button>
          ))}
        </div>
        <input className="admin-search" type="search" placeholder="Search title, developer, area" value={q} onChange={(e) => setQ(e.target.value)} />
        <button type="button" className="admin-btn" onClick={() => setEdit(blank(rows.length))}>
          New listing
        </button>
      </div>
      <p className="admin-note">
        Changes reach the website at its next rebuild, which checks for edits every 15 minutes.
        {published && ` Last rebuilt ${when(published)} (Dubai time).`}
      </p>
      <div className="admin-cards">
        {shown.map((r) => (
          <button key={r.id} type="button" className="admin-listing" onClick={() => setEdit(structuredClone(r))}>
            <span className="admin-thumb">{r.images[0] ? <img src={store.imageUrl(r.images[0], 640)} alt="" loading="lazy" /> : <i>No photo</i>}</span>
            <span className="admin-listing-body">
              <strong>{r.title || "Untitled"}</strong>
              <span>
                {r.developer} · {AREAS.find((a) => a.slug === r.area)?.name ?? r.community}
              </span>
              <span className="admin-row">
                <span className={`admin-status ${r.published ? "s-closed" : "s-spam"}`}>{r.published ? "On the site" : "Hidden"}</span>
                <small className="admin-muted">{r.ref}</small>
              </span>
            </span>
          </button>
        ))}
      </div>
      {shown.length === 0 && <p className="admin-empty">No listings match.</p>}
    </section>
  );
}

const lines = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean);
const paras = (v: string) => v.split(/\n\s*\n/).map((s) => s.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean);
const numOrNull = (v: string) => (v.trim() === "" ? null : Math.max(0, Math.round(Number(v.replace(/[^\d.]/g, "")) || 0)) || null);

function Editor({ store, row, taken, onClose, onSaved, onDeleted }: { store: Store; row: ListingRow; taken: string[]; onClose: () => void; onSaved: (r: ListingRow) => void; onDeleted: (id: string) => void }) {
  const [r, setR] = useState<ListingRow>(row);
  const [slugTouched, setSlugTouched] = useState(Boolean(row.id));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(0);
  const set = <K extends keyof ListingRow>(k: K, v: ListingRow[K]) => setR((x) => ({ ...x, [k]: v }));
  const planSum = (r.plan ?? []).reduce((s, p) => s + (Number(p.pct) || 0), 0);

  const problems = [
    !r.title.trim() && "Add a title.",
    !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.slug) && "The web address can use only lower-case letters, numbers and hyphens.",
    taken.includes(r.slug) && "Another listing already uses this web address.",
    !r.types.length && "Pick at least one home type.",
    r.beds_max < r.beds && "Most bedrooms cannot be fewer than fewest bedrooms.",
    r.plan && r.plan.length > 0 && planSum !== 100 && `The payment plan adds up to ${planSum}%, not 100%.`,
    r.published && !r.images.length && "A listing on the site needs at least one photo.",
    r.published && !r.summary.trim() && "A listing on the site needs a summary.",
  ].filter(Boolean) as string[];

  const save = async () => {
    if (problems.length) return setMsg(problems[0]);
    setBusy(true);
    setMsg("");
    try {
      const out = await store.saveListing({ ...r, ref: r.ref || `EC-${Date.now().toString().slice(-5)}` });
      onSaved(out);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    if (!r.slug) return setMsg("Add a title first: photos are filed under the listing's web address.");
    setUploading(files.length);
    try {
      const added: Img[] = [];
      for (const f of Array.from(files)) {
        if (!/^image\/(jpeg|png|webp)$/.test(f.type)) {
          setMsg(`${f.name}: use JPEG, PNG or WebP.`);
          continue;
        }
        if (f.size > 15 * 1024 * 1024) {
          setMsg(`${f.name}: larger than 15 MB.`);
          continue;
        }
        added.push(await store.uploadImage(r.slug, f));
        setUploading((n) => n - 1);
      }
      set("images", [...r.images, ...added]);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setUploading(0);
    }
  };

  const moveImg = (i: number, d: number) => {
    const imgs = [...r.images];
    const j = i + d;
    if (j < 0 || j >= imgs.length) return;
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
    set("images", imgs);
  };
  const setPlan = (plan: PlanStep[] | null) => set("plan", plan && plan.length ? plan : null);

  return (
    <section className="admin-section admin-editor">
      <div className="admin-bar">
        <button type="button" className="admin-link" onClick={onClose}>
          ← All listings
        </button>
        <h2>{row.id ? r.title || "Edit listing" : "New listing"}</h2>
        <label className="admin-toggle">
          <input type="checkbox" checked={r.published} onChange={(e) => set("published", e.target.checked)} />
          <span>{r.published ? "On the site" : "Hidden"}</span>
        </label>
        <button type="button" className="admin-btn" onClick={save} disabled={busy}>
          {busy ? "Saving" : "Save"}
        </button>
      </div>
      {msg && <p className="admin-error">{msg}</p>}

      <div className="admin-form">
        <fieldset>
          <legend>Basics</legend>
          <label className="wide">
            Title
            <input
              value={r.title}
              onChange={(e) => {
                const title = e.target.value;
                setR((x) => ({ ...x, title, slug: slugTouched ? x.slug : slugify(`${x.developer} ${title}`) }));
              }}
            />
          </label>
          <label>
            Developer
            <input
              value={r.developer}
              onChange={(e) => {
                const developer = e.target.value;
                setR((x) => ({ ...x, developer, slug: slugTouched ? x.slug : slugify(`${developer} ${x.title}`) }));
              }}
            />
          </label>
          <label>
            Developer website
            <input type="url" value={r.developer_url} onChange={(e) => set("developer_url", e.target.value)} placeholder="https://" />
          </label>
          <label>
            Web address
            <span className="admin-prefix">
              /properties/
              <input
                value={r.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
              />
            </span>
          </label>
          <label>
            Reference
            <input value={r.ref} onChange={(e) => set("ref", e.target.value)} placeholder="Given on save" />
          </label>
          <label>
            Area guide
            <select value={r.area ?? ""} onChange={(e) => set("area", e.target.value || null)}>
              <option value="">None (use the community)</option>
              {AREAS.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Community
            <input value={r.community} onChange={(e) => set("community", e.target.value)} placeholder="e.g. Dubai Islands" />
          </label>
          <div className="admin-group">
            <span>Home types</span>
            <div className="admin-checks">
              {TYPES.map((t) => (
                <label key={t}>
                  <input type="checkbox" checked={r.types.includes(t)} onChange={(e) => set("types", e.target.checked ? [...r.types, t] : r.types.filter((x) => x !== t))} />
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div className="admin-group">
            <span>Status</span>
            <div className="admin-checks">
              {(["off-plan", "ready"] as const).map((s) => (
                <label key={s}>
                  <input type="radio" name="status" checked={r.status === s} onChange={() => set("status", s)} />
                  {s === "off-plan" ? "Off-plan" : "Ready (resale)"}
                </label>
              ))}
            </div>
          </div>
          <label>
            Order on the site
            <input type="number" value={r.sort} onChange={(e) => set("sort", Number(e.target.value) || 0)} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Price and size</legend>
          <label>
            Price from (AED)
            <input inputMode="numeric" value={r.price ?? ""} onChange={(e) => set("price", numOrNull(e.target.value))} placeholder="Empty shows 'Price on request'" />
          </label>
          <label>
            Price note
            <input value={r.price_note ?? ""} onChange={(e) => set("price_note", e.target.value || null)} placeholder="e.g. 1 bedroom" />
          </label>
          <label>
            Fewest bedrooms (0 = studio)
            <input type="number" min={0} max={20} value={r.beds} onChange={(e) => set("beds", Number(e.target.value) || 0)} />
          </label>
          <label>
            Most bedrooms
            <input type="number" min={0} max={20} value={r.beds_max} onChange={(e) => set("beds_max", Number(e.target.value) || 0)} />
          </label>
          <label>
            Smallest home (sq ft)
            <input inputMode="numeric" value={r.size ?? ""} onChange={(e) => set("size", numOrNull(e.target.value))} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Words</legend>
          <label className="wide">
            Summary (one or two sentences, shown on cards and in search results)
            <textarea rows={2} value={r.summary} onChange={(e) => set("summary", e.target.value)} />
          </label>
          <label className="wide">
            Description (leave a blank line between paragraphs)
            <textarea rows={6} defaultValue={r.description.join("\n\n")} onBlur={(e) => set("description", paras(e.target.value))} />
          </label>
          <label>
            Features (one per line)
            <textarea rows={6} defaultValue={r.features.join("\n")} onBlur={(e) => set("features", lines(e.target.value))} />
          </label>
          <label>
            Amenities (one per line)
            <textarea rows={6} defaultValue={r.amenities.join("\n")} onBlur={(e) => set("amenities", lines(e.target.value))} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Payment plan and handover</legend>
          <label>
            Plan label
            <input value={r.plan_label ?? ""} onChange={(e) => set("plan_label", e.target.value || null)} placeholder="e.g. 30/70" />
          </label>
          <label>
            Handover
            <input value={r.handover ?? ""} onChange={(e) => set("handover", e.target.value || null)} placeholder="Empty hides it" />
          </label>
          <div className="admin-group wide">
            <span>
              Stages {r.plan?.length ? <small className={planSum === 100 ? "admin-ok" : "admin-bad"}>{planSum}%</small> : null}
            </span>
            {(r.plan ?? []).map((p, i) => (
              <div className="admin-plan" key={i}>
                <input value={p.stage} placeholder="Stage, e.g. On booking" onChange={(e) => setPlan((r.plan ?? []).map((x, j) => (j === i ? { ...x, stage: e.target.value } : x)))} />
                <input type="number" min={0} max={100} value={p.pct} onChange={(e) => setPlan((r.plan ?? []).map((x, j) => (j === i ? { ...x, pct: Number(e.target.value) || 0 } : x)))} />
                <span>%</span>
                <button type="button" className="admin-link danger" onClick={() => setPlan((r.plan ?? []).filter((_, j) => j !== i))}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="admin-btn ghost small" onClick={() => setPlan([...(r.plan ?? []), { stage: "", pct: 0 }])}>
              Add stage
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>Permits and source</legend>
          <label>
            Trakheesi permit number
            <input value={r.permit} onChange={(e) => set("permit", e.target.value)} />
          </label>
          <label>
            DLD project number
            <input value={r.project_number} onChange={(e) => set("project_number", e.target.value)} />
          </label>
          <label>
            Escrow account
            <input value={r.escrow} onChange={(e) => set("escrow", e.target.value)} />
          </label>
          <label>
            Source (developer page or document)
            <input value={r.source} onChange={(e) => set("source", e.target.value)} />
          </label>
          <label>
            Details checked on
            <input type="date" value={r.checked} onChange={(e) => set("checked", e.target.value)} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Photos (the first is the cover)</legend>
          <div className="admin-photos wide">
            {r.images.map((img, i) => (
              <figure key={(img.key || img.path || "") + i}>
                <img src={store.imageUrl(img, 640)} alt="" />
                <input value={img.alt} placeholder="Describe the photo" onChange={(e) => set("images", r.images.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))} />
                <span className="admin-row">
                  <button type="button" onClick={() => moveImg(i, -1)} disabled={i === 0} aria-label="Move earlier">
                    ←
                  </button>
                  <button type="button" onClick={() => moveImg(i, 1)} disabled={i === r.images.length - 1} aria-label="Move later">
                    →
                  </button>
                  <button type="button" className="danger" onClick={() => set("images", r.images.filter((_, j) => j !== i))}>
                    Remove
                  </button>
                </span>
              </figure>
            ))}
            <label className="admin-drop">
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => void addFiles(e.target.files)} />
              {uploading ? `Uploading ${uploading}` : "Add photos (JPEG, PNG or WebP, landscape, at least 1600 px wide)"}
            </label>
          </div>
        </fieldset>
      </div>

      {msg && <p className="admin-error">{msg}</p>}
      <div className="admin-bar end">
        {row.id && (
          <button
            type="button"
            className="admin-link danger"
            onClick={async () => {
              if (!confirm(`Delete ${row.title}? Hiding it keeps it for later; deleting cannot be undone.`)) return;
              await store.deleteListing(row);
              onDeleted(row.id);
            }}
          >
            Delete listing
          </button>
        )}
        <button type="button" className="admin-btn ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="admin-btn" onClick={save} disabled={busy}>
          {busy ? "Saving" : "Save"}
        </button>
      </div>
    </section>
  );
}
