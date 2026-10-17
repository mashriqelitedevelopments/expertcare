import Link from "next/link";
import { notFound } from "next/navigation";
import { Rich } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import { Hero } from "@/components/Sections";
import { getArea, getAreas } from "@/lib/content";
import { aed, fill, num, plainText } from "@/lib/format";
import { formatDate } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { MARKET, marketFor, quarterLabel, signedPct } from "@/lib/market";
import { JsonLd, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";
import { MarketCharts, MethodNote, datasetLd } from "./Prices";

const SEGMENTS = ["all:all", "apartment:ready", "apartment:off-plan", "villa:ready", "villa:off-plan"] as const;

export function PricesArea({ locale, slug }: { locale: Locale; slug: string }) {
  const t = ui(locale);
  const p = t.prices;
  const a = getArea(locale, slug);
  const m = marketFor(slug);
  if (!a || !m) notFound();
  const path = `/dubai-property-prices/${slug}/`;
  const q = quarterLabel(locale, MARKET.lastQuarter);
  const l = m.last12;
  const change = l.changePct != null ? signedPct(l.changePct) : p.noChange;
  const h1 = fill(p.areaH1, { area: a.name });
  const lede = fill(p.areaLede, { q, sales: num(l.sales), area: a.name, psf: num(l.medianPsf ?? 0), change, offplan: l.offPlanShare ?? 0 });
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: p.crumb, path: "/dubai-property-prices/" },
    { name: a.name, path },
  ];
  const faqs = [
    ...(l.medianPsf ? [{ q: fill(p.faqAreaQ, { area: a.name }), a: fill(p.faqAreaA, { area: a.name, q, psf: num(l.medianPsf), sales: num(l.sales) }) }] : []),
    ...(l.changePct != null
      ? [{ q: fill(p.faqTrendQ, { area: a.name }), a: fill(p.faqTrendA, { pct: `${Math.abs(l.changePct).toFixed(1)}%`, dir: l.changePct >= 0 ? p.up : p.down }) }]
      : []),
    ...(l.offPlanShare != null ? [{ q: fill(p.faqOffQ, { area: a.name }), a: fill(p.faqOffA, { area: a.name, pct: l.offPlanShare }) }] : []),
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
  const segRows = SEGMENTS.map((k) => ({ k, s: m.segments[k] })).filter((x) => x.s && x.s.sales > 0);

  return (
    <>
      <JsonLd data={datasetLd(locale, h1, fill(p.metaAreaDesc, { area: a.name, psf: num(l.medianPsf ?? 0), sales: num(l.sales) }), path, a.name)} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero
        small
        image={a.image}
        crumbs={crumbs}
        h1={h1}
        lede={lede}
        byline={fill(p.byline, { q, date: formatDate(MARKET.snapshot, locale) })}
        locale={locale}
      />

      <section className="sec">
        <div className="wrap">
          <MarketCharts locale={locale} block={m} psfTitle={`${p.areaPsf}${locale === "ar" ? "، " : ", "}${a.name}`} salesTitle={p.areaSales} scopeName={a.name} />
        </div>
      </section>

      <section className="sec stone" aria-labelledby="seg-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="seg-h">{p.segmentsH}</h2>
            <Link href={`${lp(locale, "/properties/")}?area=${slug}`} className="more">
              {p.homesLink} {a.name} <Arrow />
            </Link>
          </div>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col">{p.thSegment}</th>
                  <th scope="col">{p.thSales}</th>
                  <th scope="col">{p.thPrice}</th>
                  <th scope="col">{p.thPsf}</th>
                </tr>
              </thead>
              <tbody>
                {segRows.map(({ k, s }) => (
                  <tr key={k}>
                    <th scope="row">{p.seg[k]}</th>
                    <td>{num(s.sales)}</td>
                    <td>{s.medianPrice ? aed(s.medianPrice, locale) : p.tooFew}</td>
                    <td>{s.medianPsf ? aed(s.medianPsf, locale) : p.tooFew}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 28 }}>
            <Link href={lp(locale, `/areas/${slug}/`)} className="more">
              {p.guideLink}: {a.name} <Arrow />
            </Link>
          </p>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="sec" aria-labelledby="faq-h">
          <div className="wrap narrow">
            <h2 id="faq-h">{t.common.questions}</h2>
            <div className="faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>
                    <Rich text={f.a} locale={locale} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec" aria-labelledby="other-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="other-h">{p.otherAreas}</h2>
            <Link href={lp(locale, "/dubai-property-prices/")} className="more">
              {p.allPrices} <Arrow />
            </Link>
          </div>
          <ul className="links">
            {getAreas(locale)
              .filter((x) => x.slug !== slug && marketFor(x.slug))
              .map((x) => (
                <li key={x.slug}>
                  <Link href={lp(locale, `/dubai-property-prices/${x.slug}/`)}>{fill(p.areaH1, { area: x.name })}</Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <MethodNote locale={locale} />
    </>
  );
}
