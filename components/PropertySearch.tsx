"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { LedgerHead, ListingRow } from "./ListingCard";
import { getListings, inPlace, places, type ListingView } from "@/lib/content";
import type { Status } from "@/lib/costs";
import { aedShort, homeCount } from "@/lib/format";
import { lp } from "@/lib/i18n";
import { PRICE_STEPS, PROPERTY_TYPES, developers, hasBeds } from "@/lib/listings";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

type Level = "h1" | "h2";

export function headingFor(locale: Locale, { status, area, type }: { status?: string; area?: string; type?: string }) {
  const t = ui(locale).results;
  const where = area ? (places(locale).find((p) => p.value === area)?.label ?? t.dubai) : t.dubai;
  const plural = type ? t.typePlural[type as keyof typeof t.typePlural] : undefined;
  if (locale === "ar") {
    const what = plural ?? "عقارات";
    return `${what}${status === "off-plan" ? " على المخطط" : ""} للبيع في ${where}`;
  }
  const what = plural ?? "property";
  const text = `${status === "off-plan" ? "off-plan " : ""}${what} for sale in ${where}`;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** One cell of the ticket: a label over a select. */
function Field({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Filters live in the query string so every search can be shared and bookmarked. The server
 * renders the unfiltered list (what search engines index); the browser reads the query string
 * after mount and updates it with history.replaceState. No useSearchParams, so no Suspense
 * boundary: under a static export that boundary left the prerendered fallback in the page.
 */
export function PropertySearch({ locale, fixedStatus, level = "h1" }: { locale: Locale; fixedStatus?: Status; level?: Level }) {
  const t = ui(locale);
  const id = useId();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const read = () => setQuery(window.location.search);
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const sp = new URLSearchParams(query);
  const get = (k: string) => sp.get(k) ?? "";
  const status = fixedStatus ?? get("status");
  const area = get("area");
  const type = get("type");
  const beds = Number(get("beds")) || 0;
  const min = Number(get("min")) || 0;
  const max = Number(get("max")) || 0;
  const dev = get("dev");
  const sort = get("sort") || "featured";

  const write = (q: URLSearchParams) => {
    for (const [key, val] of [...q.entries()]) if (!val) q.delete(key);
    const s = q.toString();
    window.history.replaceState(window.history.state, "", s ? `${window.location.pathname}?${s}` : window.location.pathname);
    setQuery(s ? `?${s}` : "");
  };
  const set = (k: string, v: string) => {
    const q = new URLSearchParams(query);
    q.set(k, v);
    write(q);
  };
  const clear = () => write(new URLSearchParams());

  let list: ListingView[] = getListings(locale).filter(
    (l) =>
      (!status || l.status === status) &&
      (!area || inPlace(l, area)) &&
      (!type || l.types.includes(type as ListingView["type"])) &&
      (!dev || developers().find((d) => d.slug === dev)?.name === l.developer) &&
      (!beds || l.bedsMax >= beds || hasBeds(l, beds)) &&
      (!min || (l.price !== null && l.price >= min)) &&
      (!max || (l.price !== null && l.price <= max)),
  );
  // Projects without a published price sort last either way.
  const priceOf = (l: ListingView, dir: 1 | -1) => (l.price === null ? Infinity : dir * l.price);
  if (sort === "price-asc") list = [...list].sort((a, b) => priceOf(a, 1) - priceOf(b, 1));
  if (sort === "price-desc") list = [...list].sort((a, b) => priceOf(a, -1) - priceOf(b, -1));

  const setCount = [area, type, beds, min, max, dev, !fixedStatus && status].filter(Boolean).length;
  const active = setCount > 0;
  const prices: [string, string][] = PRICE_STEPS.map((p) => [String(p), aedShort(p, locale)]);
  const H = level;
  const heading =
    level === "h2" && !area && !type && (fixedStatus || !status)
      ? fixedStatus === "off-plan"
        ? t.results.allOffPlan
        : t.results.allHomes
      : headingFor(locale, { status, area, type });

  return (
    <>
      <section className="sec tight" aria-label={t.filters.label}>
        <div className="wrap">
          <div className="ticket wide" role="search">
            <div className="ticket-head">
              <span>{t.filters.label}</span>
              {!fixedStatus && (
                <div className="seg" role="group" aria-label={t.filters.status}>
                  {(
                    [
                      ["", t.filters.readyAndOffPlan],
                      ["ready", t.filters.ready],
                      ["off-plan", t.filters.offPlan],
                    ] as [string, string][]
                  ).map(([value, label]) => (
                    <button key={value} type="button" aria-pressed={status === value} onClick={() => set("status", value)}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="ticket-rows">
              <Field
                id={`${id}-area`}
                label={t.filters.area}
                value={area}
                onChange={(v) => set("area", v)}
                options={[["", t.filters.allAreas], ...places(locale).map((p): [string, string] => [p.value, p.label])]}
              />
              <Field
                id={`${id}-dev`}
                label={t.filters.developer}
                value={dev}
                onChange={(v) => set("dev", v)}
                options={[["", t.filters.anyDeveloper], ...developers().map((d): [string, string] => [d.slug, d.name])]}
              />
              <Field
                id={`${id}-type`}
                label={t.filters.type}
                value={type}
                onChange={(v) => set("type", v)}
                options={[["", t.filters.anyType], ...PROPERTY_TYPES.map((p): [string, string] => [p, t.results.typePlural[p]])]}
              />
              <Field
                id={`${id}-beds`}
                label={t.filters.beds}
                value={beds ? String(beds) : ""}
                onChange={(v) => set("beds", v)}
                options={[["", t.filters.anyBeds], ...[1, 2, 3, 4, 5].map((n): [string, string] => [String(n), `${n}${t.filters.bedsPlus}`])]}
              />
              <Field id={`${id}-min`} label={t.filters.min} value={min ? String(min) : ""} onChange={(v) => set("min", v)} options={[["", t.filters.noMin], ...prices]} />
              <Field id={`${id}-max`} label={t.filters.max} value={max ? String(max) : ""} onChange={(v) => set("max", v)} options={[["", t.filters.noMax], ...prices]} />
              <Field
                id={`${id}-sort`}
                label={t.filters.sort}
                value={sort}
                onChange={(v) => set("sort", v === "featured" ? "" : v)}
                options={[
                  ["featured", t.filters.featured],
                  ["price-asc", t.filters.priceAsc],
                  ["price-desc", t.filters.priceDesc],
                ]}
              />
              <div className="field">
                <span className="label">{t.filters.active}</span>
                {active ? (
                  <button type="button" className="clear" onClick={clear}>
                    {t.filters.clear} ({setCount})
                  </button>
                ) : (
                  <span>{t.filters.none}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec tight" aria-labelledby={`${id}-results`}>
        <div className="wrap">
          <div className="sec-head">
            <H id={`${id}-results`}>{heading}</H>
            <p className="results-bar" aria-live="polite">
              {homeCount(locale, list.length)}
            </p>
          </div>
          {list.length > 0 ? (
            <div className="ledger">
              <LedgerHead locale={locale} />
              {list.map((l, i) => (
                <ListingRow key={l.slug} l={l} locale={locale} priority={i < 3 && level === "h1"} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>{t.results.emptyH}</h2>
              <p>{t.results.emptyP}</p>
              <div className="btns">
                <button type="button" className="btn btn-ghost" onClick={clear}>
                  {t.filters.clear}
                </button>
                <Link href={`${lp(locale, "/contact/")}#brief`} className="btn">
                  {t.results.sendBrief}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
