import Link from "next/link";
import { Rich } from "@/components/Blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HomeSearch } from "@/components/HomeSearch";
import { Arrow } from "@/components/Icons";
import { LedgerHead, ListingRow } from "@/components/ListingCard";
import { Partners } from "@/components/Partners";
import { Pic } from "@/components/Pic";
import { AtlasTile, Eyebrow, Hero, Plate, nn } from "@/components/Sections";
import { ServiceRow } from "@/components/ServiceCard";
import { areaName, getAreas, getGuides, getListings, getServices } from "@/lib/content";
import { aed, num, plainText } from "@/lib/format";
import { HOME_FAQS } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import { developers } from "@/lib/listings";
import { MARKET, signedPct } from "@/lib/market";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import { JsonLd } from "@/lib/seo";
import { PROMISES } from "@/lib/site";
import { ui } from "@/lib/ui";

/** One project per developer, in inventory order, up to six: the rows show the range. */
function pickFeatured<T extends { developer: string }>(all: T[]) {
  const seen = new Set<string>();
  const first = all.filter((l) => (seen.has(l.developer) ? false : (seen.add(l.developer), true)));
  return [...first, ...all.filter((l) => !first.includes(l))].slice(0, 6);
}

const DOORS = [
  { slug: "buying-property-in-dubai", key: "buy" },
  { slug: "selling-property-in-dubai", key: "sell" },
  { slug: "renting-a-home-in-dubai", key: "rent" },
  { slug: "property-management-in-dubai", key: "let" },
] as const;

export function Home({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const h = t.home;
  const all = getListings(locale);
  const featured = pickFeatured(all);
  const services = getServices(locale);
  const areas = getAreas(locale);
  const d = MARKET.dubai.last12;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-AE",
    mainEntity: HOME_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
  const doors = DOORS.map((x) => ({ ...x, s: services.find((s) => s.slug === x.slug)!, copy: h.doors[x.key] })).filter((x) => x.s);

  return (
    <>
      <JsonLd data={faqLd} />
      <Hero
        image="hero"
        mobile="hero-m"
        eyebrow={h.eyebrow}
        h1={h.h1}
        lede={h.sub}
        caption={h.heroCaption}
        locale={locale}
        foot={<HomeSearch locale={locale} />}
      />

      <section className="wrap figs" aria-label={h.statsAria}>
        <div>
          <strong className="num">{all.length}</strong>
          <span>{h.statProjects}</span>
        </div>
        <div>
          <strong className="num">{developers().length}</strong>
          <span>{h.statDevelopers}</span>
        </div>
        <div>
          <strong className="num">{aed(d.medianPsf ?? 0, locale)}</strong>
          <span>
            {h.marketPsf}
            {d.changePct != null ? ` (${signedPct(d.changePct)})` : ""}
          </span>
        </div>
        <div>
          <strong className="num">{num(MARKET.salesUsed)}</strong>
          <span>{h.statSales}</span>
        </div>
      </section>

      <section className="sec" aria-labelledby="doors-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={1}>{h.doorsEyebrow}</Eyebrow>
              <h2 id="doors-h">{h.doorsH}</h2>
            </div>
            <Link href={lp(locale, "/services/")} className="more">
              {h.allServices} <Arrow />
            </Link>
          </div>
        </div>
        <div className="doors">
          {doors.map((x) => (
            <Link key={x.slug} href={lp(locale, servicePath(x.slug))} className="door">
              <div className="door-media">
                <Pic name={x.s.image} sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw" locale={locale} />
              </div>
              <div className="door-in">
                <h3>{x.copy.h}</h3>
                <p>{x.copy.p}</p>
                <span className="more">
                  {x.copy.cta} <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec tight" aria-labelledby="homes-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={2}>{h.homesEyebrow}</Eyebrow>
              <h2 id="homes-h">{h.homesH}</h2>
            </div>
            <Link href={lp(locale, "/properties/")} className="more">
              {h.allHomes} {all.length} {h.homesWord} <Arrow />
            </Link>
          </div>
          <div className="ledger">
            <LedgerHead locale={locale} />
            {featured.map((l, i) => (
              <ListingRow key={l.slug} l={l} locale={locale} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <Partners locale={locale} />

      <section className="sec ink" aria-labelledby="market-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={3}>{h.marketEyebrow}</Eyebrow>
            <h2 id="market-h" style={{ marginTop: 18 }}>
              {h.marketH}
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              {h.marketLede}
            </p>
            <div className="btns">
              <Link href={lp(locale, "/dubai-property-prices/")} className="btn">
                {h.marketCta}
              </Link>
            </div>
          </div>
          <div className="tbl-wrap">
            <table className="tbl">
              <caption>{h.marketCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">{h.marketColArea}</th>
                  <th scope="col">{h.marketColPsf}</th>
                  <th scope="col">{h.marketColChange}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t.results.dubai}</td>
                  <td>{aed(d.medianPsf ?? 0, locale)}</td>
                  <td>{d.changePct != null ? signedPct(d.changePct) : "n/a"}</td>
                </tr>
                {Object.entries(MARKET.areas).map(([slug, a]) => (
                  <tr key={slug}>
                    <td>
                      <Link href={lp(locale, `/dubai-property-prices/${slug}/`)}>{areaName(locale, slug)}</Link>
                    </td>
                    <td>{a.last12.medianPsf != null ? aed(a.last12.medianPsf, locale) : "n/a"}</td>
                    <td>{a.last12.changePct != null ? signedPct(a.last12.changePct) : "n/a"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="areas-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={4}>{h.areasEyebrow}</Eyebrow>
              <h2 id="areas-h">{h.areasH}</h2>
            </div>
            <Link href={lp(locale, "/areas/")} className="more">
              {t.common.allAreas} <Arrow />
            </Link>
          </div>
          <div className="atlas">
            {areas.slice(0, 6).map((a, i) => (
              <AtlasTile key={a.slug} a={a} locale={locale} idx={i} />
            ))}
          </div>
        </div>
      </section>

      <Plate image="l-creek" h2={h.offPlanH} lede={h.offPlanLede} caption={h.offPlanCaption} locale={locale}>
        <Link href={lp(locale, "/off-plan/")} className="btn">
          {h.offPlanCta}
        </Link>
        <Link href={lp(locale, "/guides/buying-off-plan-in-dubai/")} className="btn btn-ghost">
          {h.offPlanCta2}
        </Link>
      </Plate>

      <section className="sec" aria-labelledby="services-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={5}>{h.servicesEyebrow}</Eyebrow>
              <h2 id="services-h">{h.servicesH}</h2>
            </div>
            <p className="lede">{h.servicesLede}</p>
          </div>
          <div className="index">
            {services.map((s, i) => (
              <ServiceRow key={s.slug} s={s} locale={locale} idx={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec sand" aria-labelledby="how-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={6}>{h.howEyebrow}</Eyebrow>
            <h2 id="how-h" style={{ marginTop: 18 }}>
              {h.howH}
            </h2>
            <div className="btns">
              <Link href={lp(locale, "/about/")} className="btn btn-ghost">
                {t.footer.about}
              </Link>
            </div>
          </div>
          <div className="ladder">
            {PROMISES.map((p) => (
              <div key={p.title}>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="guides-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={7}>{h.guidesEyebrow}</Eyebrow>
              <h2 id="guides-h">{h.guidesH}</h2>
            </div>
            <Link href={lp(locale, "/guides/")} className="more">
              {t.common.allGuides} <Arrow />
            </Link>
          </div>
          <div className="twin even">
            <div className="index no-thumb">
              {getGuides(locale)
                .slice(0, 5)
                .map((g, i) => (
                  <article key={g.slug} className="index-row">
                    <span className="idx">{nn(i)}</span>
                    <div className="row-title">
                      <h3>
                        <Link href={lp(locale, `/guides/${g.slug}/`)} className="row-link">
                          {g.title}
                        </Link>
                      </h3>
                      <p className="m">{g.topic}</p>
                    </div>
                    <p className="row-text">{g.dek}</p>
                    <span className="row-arrow" aria-hidden="true">
                      <Arrow />
                    </span>
                  </article>
                ))}
            </div>
            <div>
              <h3 style={{ marginBottom: 14 }}>{h.faqH}</h3>
              <div className="faq">
                {HOME_FAQS.slice(0, 5).map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>
                      <Rich text={f.a} locale={locale} />
                    </p>
                  </details>
                ))}
              </div>
              <div className="btns">
                <Link href={lp(locale, "/faq/")} className="more">
                  {h.allFaq} <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec ink" aria-labelledby="brief-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={8}>{h.briefEyebrow}</Eyebrow>
            <h2 id="brief-h" style={{ marginTop: 18 }}>
              {h.briefH}
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              {h.briefLede}
            </p>
          </div>
          <div className="panel" id="brief">
            <EnquiryForm locale={locale} intent="brief" />
          </div>
        </div>
      </section>
    </>
  );
}
