import Link from "next/link";
import { Rich } from "@/components/Blocks";
import { ColumnChart, LineChart, type Point } from "@/components/charts/Charts";
import { HBars, TableView } from "@/components/charts/TableView";
import { Hero } from "@/components/Sections";
import { getAreas } from "@/lib/content";
import { aed, fill, num, plainText } from "@/lib/format";
import { formatDate } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { MARKET, MARKET_SOURCE, coverage, quarterLabel, signedPct, type ScopeBlock } from "@/lib/market";
import { JsonLd, ORG_ID, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

const PATH = "/dubai-property-prices/";

/** The two quarterly charts, each with its table twin. Shared by the Dubai and area pages. */
export function MarketCharts({ locale, block, psfTitle, salesTitle, scopeName }: { locale: Locale; block: ScopeBlock; psfTitle: string; salesTitle: string; scopeName: string }) {
  const p = ui(locale).prices;
  const psfPoints: Point[] = block.quarters.map((x) => ({ key: x.q, label: quarterLabel(locale, x.q), value: x.medianPsf }));
  const salesPoints: Point[] = block.quarters.map((x) => ({ key: x.q, label: quarterLabel(locale, x.q), value: x.sales }));
  const rows = [...block.quarters].reverse().map((x) => [quarterLabel(locale, x.q), x.medianPsf ? aed(x.medianPsf, locale) : p.tooFew, num(x.sales)]);
  return (
    <div className="chart-grid">
      <div className="chart-card rv">
        <h3>{psfTitle}</h3>
        <p className="unit">{p.unitPsf}</p>
        <LineChart points={psfPoints} unit="aed" locale={locale} ariaLabel={`${psfTitle}, ${scopeName}`} />
        <TableView summary={p.showTable} caption={psfTitle} head={[p.thQuarter, p.thPsf, p.thSales]} rows={rows} />
      </div>
      <div className="chart-card rv">
        <h3>{salesTitle}</h3>
        <p className="unit">{p.unitSales}</p>
        <ColumnChart points={salesPoints} unit="count" locale={locale} ariaLabel={`${salesTitle}, ${scopeName}`} />
        <TableView summary={p.showTable} caption={salesTitle} head={[p.thQuarter, p.thSales]} rows={[...block.quarters].reverse().map((x) => [quarterLabel(locale, x.q), num(x.sales)])} />
      </div>
    </div>
  );
}

export function MethodNote({ locale }: { locale: Locale }) {
  const p = ui(locale).prices;
  const date = formatDate(MARKET.snapshot, locale);
  return (
    <section className="sec stone" aria-labelledby="method-h">
      <div className="wrap narrow">
        <h2 id="method-h">{p.methodH}</h2>
        <div className="method prose" style={{ marginTop: 24 }}>
          {p.method.map((m) => (
            <p key={m}>
              <Rich text={fill(m, { date })} locale={locale} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function datasetLd(locale: Locale, name: string, description: string, path: string, place?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    url: absL(locale, path),
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    creator: { "@id": ORG_ID },
    isBasedOn: MARKET_SOURCE.url,
    license: MARKET_SOURCE.licence,
    temporalCoverage: coverage(),
    dateModified: MARKET.snapshot,
    spatialCoverage: { "@type": "Place", name: place ?? "Dubai", address: { "@type": "PostalAddress", addressRegion: "Dubai", addressCountry: "AE" } },
    variableMeasured: ["Median sale price per square foot (AED)", "Median sale price (AED)", "Number of residential sales"],
    measurementTechnique: "Median of residential flat and villa sales registered with the Dubai Land Department, per calendar quarter",
  };
}

export function Prices({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const p = t.prices;
  const d = MARKET.dubai;
  const q = quarterLabel(locale, MARKET.lastQuarter);
  const change = d.last12.changePct != null ? signedPct(d.last12.changePct) : p.noChange;
  const lede = fill(p.lede, { q, sales: num(d.last12.sales), psf: num(d.last12.medianPsf ?? 0), change });
  const areas = getAreas(locale)
    .map((a) => ({ a, m: MARKET.areas[a.slug] }))
    .filter((x) => x.m && x.m.last12.medianPsf);
  const ranked = [...areas].sort((x, y) => y.m.last12.medianPsf! - x.m.last12.medianPsf!);
  const top = ranked[0];
  const low = ranked[ranked.length - 1];
  const faqs = [
    { q: p.faqCityQ, a: fill(p.faqCityA, { q, psf: num(d.last12.medianPsf ?? 0), sales: num(d.last12.sales) }) },
    ...(top && low && top !== low
      ? [{ q: p.faqTopQ, a: fill(p.faqTopA, { top: top.a.name, psf: num(top.m.last12.medianPsf!), low: low.a.name, lowPsf: num(low.m.last12.medianPsf!) }) }]
      : []),
  ];
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: p.crumb, path: PATH },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };

  return (
    <>
      <JsonLd data={datasetLd(locale, p.h1, p.metaDesc, PATH)} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero
        small
        image="area-downtown-dubai"
        crumbs={crumbs}
        h1={p.h1}
        lede={lede}
        byline={fill(p.byline, { q, date: formatDate(MARKET.snapshot, locale) })}
        locale={locale}
      />

      <section className="sec">
        <div className="wrap">
          <MarketCharts locale={locale} block={d} psfTitle={p.cityPsf} salesTitle={p.citySales} scopeName={t.collection.inDubai} />
        </div>
      </section>

      <section className="sec stone" aria-labelledby="compare-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="compare-h">{p.compareH}</h2>
          </div>
          <HBars
            label={p.compareH}
            format={(n) => aed(n, locale)}
            rows={ranked.map((x) => ({ key: x.a.slug, label: x.a.name, href: lp(locale, `${PATH}${x.a.slug}/`), value: x.m.last12.medianPsf! }))}
          />
          <h3 style={{ marginTop: 56 }}>{p.tableH}</h3>
          <div className="tbl-wrap" style={{ marginTop: 16 }}>
            <table className="tbl tbl-wide">
              <thead>
                <tr>
                  <th scope="col">{p.thArea}</th>
                  <th scope="col">{p.thPsf}</th>
                  <th scope="col">{p.thChange}</th>
                  <th scope="col">{p.thSales}</th>
                  <th scope="col">{p.thOffPlan}</th>
                  <th scope="col">{p.thPrice}</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map(({ a, m }) => (
                  <tr key={a.slug}>
                    <th scope="row">
                      <Link href={lp(locale, `${PATH}${a.slug}/`)}>{a.name}</Link>
                    </th>
                    <td>{aed(m.last12.medianPsf!, locale)}</td>
                    <td>{m.last12.changePct != null ? signedPct(m.last12.changePct) : "—"}</td>
                    <td>{num(m.last12.sales)}</td>
                    <td>{m.last12.offPlanShare != null ? `${m.last12.offPlanShare}%` : "—"}</td>
                    <td>{m.last12.medianPrice ? aed(m.last12.medianPrice, locale) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

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

      <MethodNote locale={locale} />
    </>
  );
}
