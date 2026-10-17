import Link from "next/link";
import { notFound } from "next/navigation";
import { Rich } from "@/components/Blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arrow } from "@/components/Icons";
import { LedgerHead, ListingRow } from "@/components/ListingCard";
import { AtlasTile, Eyebrow, Hero, IndexRow, Plate } from "@/components/Sections";
import { areaFaqs, getArea, getAreas, getGuide, listingsInArea } from "@/lib/content";
import { aed, fill, plainText } from "@/lib/format";
import { MARKET, marketFor, signedPct } from "@/lib/market";
import { lp } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import type { Locale } from "@/lib/locale";
import { JsonLd, abs, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

export function AreaPage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = ui(locale);
  const a = getArea(locale, slug);
  if (!a) notFound();
  const homes = listingsInArea(locale, slug);
  const path = `/areas/${a.slug}/`;
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: t.footer.areas, path: "/areas/" },
    { name: a.name, path },
  ];
  const faqs = areaFaqs(locale, a);
  const market = marketFor(a.slug);
  const place = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: a.name,
    description: a.intro,
    image: abs(ogImage(a.image)),
    url: absL(locale, path),
    address: { "@type": "PostalAddress", addressLocality: a.name, addressRegion: "Dubai", addressCountry: "AE" },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-AE",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
  const all = getAreas(locale);
  const nearby = [...all.filter((x) => a.nearby?.includes(x.slug)), ...all.filter((x) => x.slug !== a.slug && !a.nearby?.includes(x.slug))].slice(0, 3);
  const facts: [string, string][] = [
    [t.areas.developerLabel, a.developer],
    [t.areas.ownershipLabel, t.areas.freehold],
    [t.common.homesForSale, String(homes.length)],
    ...(market ? ([[t.areas.medianPsf, market.last12.medianPsf != null ? aed(market.last12.medianPsf, locale) : "n/a"]] as [string, string][]) : []),
    ...(market && market.last12.changePct != null ? ([[t.areas.onYear, signedPct(market.last12.changePct)]] as [string, string][]) : []),
  ];

  return (
    <>
      <JsonLd data={place} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero small image={a.image} crumbs={crumbs} h1={a.name} lede={a.intro} caption={a.name} locale={locale} />

      <section className="sec tight">
        <div className="wrap">
          <dl className="facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="living-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={1}>{t.areas.livingEyebrow}</Eyebrow>
            <h2 id="living-h" style={{ marginTop: 18 }}>
              {t.areas.livingIn} {a.name}
            </h2>
            {market && (
              <div className="btns">
                <Link href={lp(locale, `/dubai-property-prices/${a.slug}/`)} className="more">
                  {fill(t.prices.areaH1, { area: a.name })} <Arrow />
                </Link>
              </div>
            )}
          </div>
          <div>
            <div className="stack">
              {a.overview.map((p) => (
                <p key={p} className="lede">
                  {p}
                </p>
              ))}
            </div>
            <div className="cols cols-2" style={{ marginTop: 36 }}>
              <div>
                <p className="eyebrow plain">{t.areas.homesLabel}</p>
                <ul className="stack" style={{ marginTop: 10 }}>
                  {a.homes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow plain">{t.areas.suitsLabel}</p>
                <ul className="stack" style={{ marginTop: 10 }}>
                  {a.suits.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow plain">{t.areas.transportLabel}</p>
                <ul className="stack" style={{ marginTop: 10 }}>
                  {a.transport.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              {a.landmarks && a.landmarks.length > 0 && (
                <div>
                  <p className="eyebrow plain">{t.areas.landmarksLabel}</p>
                  <ul className="stack" style={{ marginTop: 10 }}>
                    {a.landmarks.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sec tight" id="homes" aria-labelledby="homes-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={2}>{t.areas.homesEyebrow}</Eyebrow>
              <h2 id="homes-h">
                {t.common.forSaleIn} {a.name}
              </h2>
            </div>
            {homes.length > 0 && (
              <Link href={`${lp(locale, "/properties/")}?area=${a.slug}`} className="more">
                {t.common.searchArea} {a.name} <Arrow />
              </Link>
            )}
          </div>
          {homes.length > 0 ? (
            <div className="ledger">
              <LedgerHead locale={locale} />
              {homes.map((l) => (
                <ListingRow key={l.slug} l={l} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p className="lede">{t.common.noHomes}</p>
              <div className="btns">
                <Link href={`${lp(locale, "/contact/")}#brief`} className="btn">
                  {t.common.sendBrief}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {(a.rentNote || a.sellNote) && (
        <section className="sec ink" aria-label={`${t.areas.rentH} ${t.areas.sellH}`}>
          <div className="wrap cols cols-2">
            {a.rentNote && (
              <div>
                <Eyebrow n={3}>{t.areas.rentH}</Eyebrow>
                <h3 style={{ marginTop: 14 }}>
                  {t.areas.rentH} {a.name}
                </h3>
                <p style={{ marginTop: 10 }}>{a.rentNote}</p>
                <div className="btns">
                  <Link href={lp(locale, "/rent/")} className="btn">
                    {t.areas.rentCta}
                  </Link>
                </div>
              </div>
            )}
            {a.sellNote && (
              <div>
                <Eyebrow n={4}>{t.areas.sellH}</Eyebrow>
                <h3 style={{ marginTop: 14 }}>
                  {t.areas.sellH} {a.name}
                </h3>
                <p style={{ marginTop: 10 }}>{a.sellNote}</p>
                <div className="btns">
                  <Link href={`${lp(locale, "/sell/")}#enquire`} className="btn">
                    {t.areas.sellCta}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="sec" aria-labelledby="faq-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={5}>{t.common.quickAnswers}</Eyebrow>
            <h2 id="faq-h" style={{ marginTop: 18 }}>
              {t.areas.questionsAbout} {a.name}
            </h2>
          </div>
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

      <section className="sec sand" aria-labelledby="more-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={6}>{t.common.moreAreas}</Eyebrow>
              <h2 id="more-h">{t.areas.nearbyH}</h2>
            </div>
            <Link href={lp(locale, "/areas/")} className="more">
              {t.common.allAreas} <Arrow />
            </Link>
          </div>
          <div className="atlas">
            {nearby.map((x, i) => (
              <AtlasTile key={x.slug} a={x} locale={locale} idx={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="before-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={7}>{t.common.beforeYouBuy}</Eyebrow>
            <div className="index" style={{ marginTop: 18 }}>
              {["how-to-buy-property-in-dubai", "cost-of-buying-property-in-dubai"].map((s, i) => {
                const g = getGuide(locale, s)!;
                return <IndexRow key={s} idx={i} title={g.title} text={g.dek} href={`/guides/${g.slug}/`} locale={locale} />;
              })}
            </div>
          </div>
          <div className="panel" id="brief">
            <h2 className="aside-h" id="before-h">
              {t.areas.briefH} {a.name}
            </h2>
            <p className="aside-p">{t.areas.briefP}</p>
            <EnquiryForm locale={locale} intent="brief" context={a.name} />
          </div>
        </div>
      </section>
    </>
  );
}
