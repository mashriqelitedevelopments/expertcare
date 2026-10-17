import Link from "next/link";
import { CostCalculator, MortgageCalculator } from "./Calculators";
import type { ListingView } from "@/lib/content";
import { buyingCosts } from "@/lib/costs";
import { aed } from "@/lib/format";
import type { Block } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export { plainText } from "@/lib/format";

/** [label](href) and **bold** inside guide copy. Internal links pick up the Arabic prefix here,
 * so the Arabic content files can keep the same paths as the English. */
export function Rich({ text, locale }: { text: string; locale: Locale }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link)
          return link[2].startsWith("/") ? (
            <Link key={i} href={lp(locale, link[2])}>
              {link[1]}
            </Link>
          ) : (
            <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
              {link[1]}
            </a>
          );
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        return part;
      })}
    </>
  );
}

export function CostExample({ price, locale }: { price: number; locale: Locale }) {
  const t = ui(locale).calc;
  const r = buyingCosts({ price, status: "ready", locale });
  return (
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
              <td>{l.label}</td>
              <td>{aed(l.amount, locale)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>{t.pricePlusFees}</td>
            <td>{aed(r.total, locale)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function Blocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ("p" in b)
          return (
            <p key={i}>
              <Rich text={b.p} locale={locale} />
            </p>
          );
        if ("ul" in b)
          return (
            <ul key={i}>
              {b.ul.map((text, j) => (
                <li key={j}>
                  <Rich text={text} locale={locale} />
                </li>
              ))}
            </ul>
          );
        if ("ol" in b)
          return (
            <ol key={i}>
              {b.ol.map((s, j) => (
                <li key={j}>
                  <strong>{s.t}</strong>
                  <Rich text={s.d} locale={locale} />
                </li>
              ))}
            </ol>
          );
        if ("table" in b)
          return (
            <div className="tbl-wrap" key={i}>
              <table className={`tbl tbl-left${b.table.head.length > 3 ? " tbl-wide" : ""}`}>
                <thead>
                  <tr>
                    {b.table.head.map((h, j) => (
                      <th scope="col" key={j}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, j) =>
                        j === 0 ? (
                          <th key={j} scope="row">
                            {cell}
                          </th>
                        ) : (
                          <td key={j}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        if ("note" in b)
          return (
            <p className="callout" key={i}>
              <Rich text={b.note} locale={locale} />
            </p>
          );
        if ("tool" in b) return b.tool === "costs" ? <CostCalculator key={i} locale={locale} /> : <MortgageCalculator key={i} locale={locale} />;
        return <CostExample key={i} price={b.example} locale={locale} />;
      })}
    </>
  );
}

export function PaymentPlan({ l, locale }: { l: ListingView; locale: Locale }) {
  const t = ui(locale).plan;
  if (!l.plan) return null;
  const price = l.price;
  return (
    <>
      <div className="tbl-wrap">
        <table className="tbl">
          <caption className="sr">
            {t.caption} {l.title}
          </caption>
          <thead>
            <tr>
              <th scope="col">{t.when}</th>
              <th scope="col">{t.share}</th>
              {price && <th scope="col">{t.amount}</th>}
            </tr>
          </thead>
          <tbody>
            {l.plan.map((s, i) => (
              <tr key={`${i}-${s.stage}`}>
                <td>{l.planLabels?.[i] ?? s.stage}</td>
                <td>{s.pct}%</td>
                {price && <td>{aed((price * s.pct) / 100, locale)}</td>}
              </tr>
            ))}
            <tr>
              <td>
                {t.oqood}
                <span className="note">{t.oqoodNote}</span>
              </td>
              <td>4%</td>
              {price && <td>{aed(price * 0.04 + 20, locale)}</td>}
            </tr>
          </tbody>
        </table>
      </div>
      {price && <p className="note">{ui(locale).detail.planAtStart}</p>}
    </>
  );
}
