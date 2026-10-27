"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { buyingCosts, type Status } from "@/lib/costs";
import { aed, num } from "@/lib/format";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

const digits = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;

/** Plain digits while typing (so the caret never jumps), grouped with commas once you leave. */
function PriceInput({ id, value, onChange, label }: { id: string; value: number; onChange: (n: number) => void; label: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <div className="affix">
        <span className="unit">AED</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          dir="ltr"
          value={value ? (focused ? String(value) : num(value)) : ""}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(digits(e.target.value))}
        />
      </div>
    </div>
  );
}

/** A radio pair drawn as two cells; the legend is styled as the row's label. */
function Toggle<T extends string>({ legend, name, value, onChange, options }: { legend: string; name: string; value: T; onChange: (v: T) => void; options: [T, string][] }) {
  return (
    <fieldset className="input">
      <legend className="label">{legend}</legend>
      <div className="toggle">
        {options.map(([v, label]) => (
          <label key={v}>
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CostCalculator({
  locale,
  price: p0 = 2_000_000,
  status: s0 = "ready",
  fixed = false,
}: {
  locale: Locale;
  price?: number;
  status?: Status;
  fixed?: boolean;
}) {
  const t = ui(locale).calc;
  const id = useId();
  const [price, setPrice] = useState(p0);
  const [status, setStatus] = useState<Status>(s0);
  const r = buyingCosts({ price, status, locale });

  return (
    <div className="calc">
      {!fixed && <PriceInput id={`${id}-price`} value={price} onChange={setPrice} label={t.price} />}
      {!fixed && (
        <Toggle
          legend={t.homeIs}
          name={`${id}-status`}
          value={status}
          onChange={setStatus}
          options={[
            ["ready", t.ready],
            ["off-plan", t.offPlan],
          ]}
        />
      )}
      <div className="calc-out" aria-live="polite">
        <div className="tbl-wrap">
          <table className="tbl">
            <caption className="sr">
              {t.feesCaption} {aed(price, locale)}
            </caption>
            <thead>
              <tr>
                <th scope="col">{t.fee}</th>
                <th scope="col">{t.amount}</th>
              </tr>
            </thead>
            <tbody>
              {r.lines.map((l) => (
                <tr key={l.label}>
                  <td>
                    {l.label}
                    {l.note && <span className="fine" style={{ display: "block" }}>{l.note}</span>}
                  </td>
                  <td>{aed(l.amount, locale)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>{t.feesTotal}</td>
                <td>{aed(r.fees, locale)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <dl className="calc-sum">
          <div className="total">
            <dt>{t.pricePlusFees}</dt>
            <dd>{aed(r.total, locale)}</dd>
          </div>
          <div>
            <dt>{t.feesShare}</dt>
            <dd>{price ? `${((r.fees / price) * 100).toFixed(1)}%` : "0%"}</dd>
          </div>
        </dl>
        <p className="fine">
          {t.note} <Link href={lp(locale, "/guides/cost-of-buying-property-in-dubai/")}>{t.noteLink}</Link>
        </p>
      </div>
    </div>
  );
}
