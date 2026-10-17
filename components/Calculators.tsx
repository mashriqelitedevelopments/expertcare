"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { DBR, MAX_TERM, buyingCosts, getBuyers, maxLtv, monthlyPayment, type Buyer, type Status } from "@/lib/costs";
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

/** A slider row: label, the live value on the right, the slider, and the floor or cap under it. */
function Range({
  id,
  label,
  value,
  min,
  max,
  onChange,
  output,
  foot,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  output: React.ReactNode;
  foot: string;
}) {
  return (
    <div className="range-row">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{output}</output>
      <input id={id} type="range" min={min} max={max} step={1} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <div className="ticks">
        <span>{min}%</span>
        <span>{foot}</span>
      </div>
    </div>
  );
}

function BuyerInputs({
  id,
  locale,
  buyer,
  setBuyer,
  first,
  setFirst,
  status,
}: {
  id: string;
  locale: Locale;
  buyer: Buyer;
  setBuyer: (b: Buyer) => void;
  first: boolean;
  setFirst: (f: boolean) => void;
  status: Status;
}) {
  const t = ui(locale).calc;
  return (
    <>
      <div className="input">
        <label htmlFor={`${id}-buyer`}>{t.youAre}</label>
        <select id={`${id}-buyer`} value={buyer} onChange={(e) => setBuyer(e.target.value as Buyer)}>
          {getBuyers(locale).map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>
      {status === "ready" && buyer !== "nonresident" && (
        <Toggle
          legend={t.thisWillBe}
          name={`${id}-first`}
          value={first ? "first" : "second"}
          onChange={(v) => setFirst(v === "first")}
          options={[
            ["first", t.firstHome],
            ["second", t.secondHome],
          ]}
        />
      )}
    </>
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
  const [finance, setFinance] = useState<"cash" | "mortgage">("cash");
  const [buyer, setBuyer] = useState<Buyer>("expat");
  const [first, setFirst] = useState(true);
  const cap = Math.round(maxLtv(price, buyer, first, status) * 100);
  const [ltvWanted, setLtv] = useState(80);
  const ltv = Math.min(ltvWanted, cap);
  const loan = finance === "mortgage" ? Math.round((price * ltv) / 100) : 0;
  const r = buyingCosts({ price, status, loan, locale });

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
      <Toggle
        legend={t.paying}
        name={`${id}-finance`}
        value={finance}
        onChange={setFinance}
        options={[
          ["cash", t.cash],
          ["mortgage", t.mortgage],
        ]}
      />
      {finance === "mortgage" && (
        <>
          <BuyerInputs id={id} locale={locale} buyer={buyer} setBuyer={setBuyer} first={first} setFirst={setFirst} status={status} />
          <Range
            id={`${id}-ltv`}
            label={t.loanShare}
            value={ltv}
            min={10}
            max={cap}
            onChange={setLtv}
            output={
              <>
                {ltv}%, <strong className="num">{aed(loan, locale)}</strong>
              </>
            }
            foot={`${t.upTo} ${cap}%`}
          />
        </>
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
          {status === "ready" && finance === "mortgage" ? (
            <div>
              <dt>{t.depositAndFees}</dt>
              <dd>{aed(r.cashNeeded, locale)}</dd>
            </div>
          ) : (
            <div>
              <dt>{t.feesShare}</dt>
              <dd>{price ? `${((r.fees / price) * 100).toFixed(1)}%` : "0%"}</dd>
            </div>
          )}
        </dl>
        <p className="fine">
          {t.note} <Link href={lp(locale, "/guides/cost-of-buying-property-in-dubai/")}>{t.noteLink}</Link>
        </p>
      </div>
    </div>
  );
}

export function MortgageCalculator({
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
  const [buyer, setBuyer] = useState<Buyer>("expat");
  const [first, setFirst] = useState(true);
  const minDeposit = 100 - Math.round(maxLtv(price, buyer, first, status) * 100);
  const [depositWanted, setDeposit] = useState(20);
  const deposit = Math.max(depositWanted, minDeposit);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);
  const loan = Math.round((price * (100 - deposit)) / 100);
  const monthly = monthlyPayment(loan, rate, years);
  const interest = monthly * years * 12 - loan;
  const fees = buyingCosts({ price, status, loan, locale })
    .lines.slice(status === "ready" ? 5 : 2)
    .reduce((s, l) => s + l.amount, 0);

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
      <BuyerInputs id={id} locale={locale} buyer={buyer} setBuyer={setBuyer} first={first} setFirst={setFirst} status={status} />
      <Range
        id={`${id}-deposit`}
        label={t.deposit}
        value={deposit}
        min={minDeposit}
        max={90}
        onChange={setDeposit}
        output={
          <>
            {deposit}%, <strong className="num">{aed((price * deposit) / 100, locale)}</strong>
          </>
        }
        foot={`${t.atLeast} ${minDeposit}%`}
      />
      <div className="input">
        <label htmlFor={`${id}-rate`}>{t.rate}</label>
        <div className="affix">
          <input id={`${id}-rate`} type="number" inputMode="decimal" dir="ltr" min={0} max={15} step={0.05} value={rate} onChange={(e) => setRate(Math.max(0, Number(e.target.value)))} />
          <span className="unit">{t.perYear}</span>
        </div>
      </div>
      <div className="input">
        <label htmlFor={`${id}-years`}>{t.term}</label>
        <div className="affix">
          <input
            id={`${id}-years`}
            type="number"
            inputMode="numeric"
            dir="ltr"
            min={1}
            max={MAX_TERM}
            step={1}
            value={years}
            onChange={(e) => setYears(Math.min(MAX_TERM, Math.max(1, Math.round(Number(e.target.value)) || 1)))}
          />
          <span className="unit">{t.years}</span>
        </div>
      </div>
      <div className="calc-out" aria-live="polite">
        <dl className="calc-sum">
          <div className="total">
            <dt>{t.monthly}</dt>
            <dd>{aed(monthly, locale)}</dd>
          </div>
          <div>
            <dt>{t.loan}</dt>
            <dd>{aed(loan, locale)}</dd>
          </div>
          <div>
            <dt>{t.interest}</dt>
            <dd>{aed(Math.max(0, interest), locale)}</dd>
          </div>
          <div>
            <dt>{t.income}</dt>
            <dd>{aed(monthly / DBR, locale)}</dd>
          </div>
          <div>
            <dt>{t.upfront}</dt>
            <dd>{aed(fees, locale)}</dd>
          </div>
        </dl>
        <p className="fine">
          {t.mortgageNote} <Link href={lp(locale, "/guides/mortgages-in-dubai/")}>{t.mortgageNoteLink}</Link>
        </p>
      </div>
    </div>
  );
}
