"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LedgerHead, ListingRow, bedRange, priceLine } from "./ListingCard";
import { getListing, type ListingView } from "@/lib/content";
import { buyingCosts } from "@/lib/costs";
import { aed, num } from "@/lib/format";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { useShortlist } from "@/lib/shortlist";
import { ui } from "@/lib/ui";

export function ShortlistView({ locale }: { locale: Locale }) {
  const t = ui(locale).shortlist;
  const saved = useShortlist();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const list = saved.map((slug) => getListing(locale, slug)).filter((l): l is ListingView => Boolean(l));
  if (list.length === 0)
    return (
      <div className="empty">
        <h2>{t.emptyH}</h2>
        <p>{t.emptyP}</p>
        <div className="btns">
          <Link href={lp(locale, "/properties/")} className="btn">
            {t.browse}
          </Link>
        </div>
      </div>
    );

  const sqft = locale === "ar" ? "قدم مربع" : "sq ft";
  const comma = locale === "ar" ? "، " : ", ";
  const rows: [string, (l: ListingView) => string][] = [
    [t.rows.price, (l) => priceLine(locale, l)],
    [t.rows.withFees, (l) => (l.price ? aed(buyingCosts({ price: l.price, status: l.status, locale }).total, locale) : "—")],
    [t.rows.developer, (l) => l.developer],
    [t.rows.area, (l) => l.place],
    [t.rows.type, (l) => l.typeLabel],
    [t.rows.bedrooms, (l) => bedRange(locale, l)],
    [t.rows.builtUp, (l) => (l.size ? `${num(l.size)} ${sqft}` : "—")],
    [t.rows.plan, (l) => l.planLabel ?? (l.plan ? l.plan.map((s) => s.pct).join(" / ") : "—")],
    [t.rows.status, (l) => (l.status === "ready" ? t.ready : `${t.offPlan}${l.handover ? `${comma}${t.handover} ${l.handover}` : ""}`)],
  ];

  return (
    <>
      <div className="ledger">
        <LedgerHead locale={locale} />
        {list.map((l) => (
          <ListingRow key={l.slug} l={l} locale={locale} />
        ))}
      </div>
      {list.length > 1 && (
        <section className="sec tight" aria-labelledby="compare-h">
          <div className="sec-head">
            <h2 id="compare-h">{t.compare}</h2>
          </div>
          <div className="tbl-wrap">
            <table className="tbl tbl-left">
              <thead>
                <tr>
                  <td />
                  {list.map((l) => (
                    <th scope="col" key={l.slug}>
                      <Link href={lp(locale, `/properties/${l.slug}/`)}>{l.title}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {list.map((l) => (
                      <td key={l.slug}>{value(l)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
