import Link from "next/link";
import { Rich } from "@/components/Blocks";
import { CostCalculator } from "@/components/Calculators";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Partners } from "@/components/Partners";
import { HomeSearch } from "@/components/HomeSearch";
import { Arrow } from "@/components/Icons";
import { ListingCard } from "@/components/ListingCard";
import { Pic } from "@/components/Pic";
import { ServiceCard } from "@/components/ServiceCard";
import { AreaTile, Band, GuideLink, Hero } from "@/components/Sections";
import { getAreas, getGuides, getListings, getServices } from "@/lib/content";
import { aed, num, plainText } from "@/lib/format";
import { HOME_FAQS } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import { developers } from "@/lib/listings";
import { MARKET, signedPct } from "@/lib/market";
import type { Locale } from "@/lib/locale";
import { JsonLd } from "@/lib/seo";
import { PROMISES } from "@/lib/site";
import { ui } from "@/lib/ui";

/** One project per developer, in inventory order, up to six: the grid shows the range. */
function pickFeatured<T extends { developer: string }>(all: T[]) {
  const seen = new Set<string>();
  const first = all.filter((l) => (seen.has(l.developer) ? false : (seen.add(l.developer), true)));
  return [...first, ...all.filter((l) => !first.includes(l))].slice(0, 6);
}

export function Home({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const h = t.home;
  const all = getListings(locale);
  const featured = pickFeatured(all);
  const services = getServices(locale);
  const stats: [string, string][] = [
    [String(all.length), h.statProjects],
    [String(developers().length), h.statDevelopers],
    [num(MARKET.salesUsed), h.statSales],
    [String(getGuides(locale).length), h.statGuides],
  ];
  const d = MARKET.dubai.last12;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-AE",
    mainEntity: HOME_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
  const sell = services.find((s) => s.slug === "selling-property-in-dubai");
  const manage = services.find((s) => s.slug === "property-management-in-dubai");

  return (
    <>
      <JsonLd data={faqLd} />
      <Hero image="hero" mobile="hero-m" h1={h.h1} locale={locale}>
        <p className="sub">{h.sub}</p>
        <HomeSearch locale={locale} />
      </Hero>

      <section className="stats" aria-label={h.statsAria}>
        <div className="wrap stats-in">
          {stats.map(([n, label]) => (
            <div key={label}>
              <strong className="num">{n}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" aria-labelledby="services-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="services-h">{h.servicesH}</h2>
            <Link href={lp(locale, "/services/")} className="more">
              {h.allServices} <Arrow />
            </Link>
          </div>
          <p className="lede rv" style={{ maxWidth: "60ch", marginBottom: 36 }}>
            {h.servicesLede}
          </p>
          <div className="services">
            {services.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} s={s} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <Partners locale={locale} />

      <section className="sec" aria-labelledby="homes-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="homes-h">{h.homesH}</h2>
            <Link href={lp(locale, "/properties/")} className="more">
              {h.allHomes} {all.length} {h.homesWord} <Arrow />
            </Link>
          </div>
          <div className="grid grid-feature">
            {featured.map((l, i) => (
              <ListingCard key={l.slug} l={l} locale={locale} sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : undefined} />
            ))}
          </div>
        </div>
      </section>

      {sell && manage && (
        <section className="sec stone" aria-label={`${h.sellH} ${h.landlordH}`}>
          <div className="wrap service-pair">
            <Link href={lp(locale, "/sell/")}>
              <Pic name={sell.image} sizes="(max-width: 800px) 100vw, 50vw" locale={locale} />
              <div className="pair-in">
                <h3>{h.sellH}</h3>
                <p>{h.sellLede}</p>
                <span className="more">
                  {h.sellCta} <Arrow />
                </span>
              </div>
            </Link>
            <Link href={lp(locale, "/landlords/")}>
              <Pic name={manage.image} sizes="(max-width: 800px) 100vw, 50vw" locale={locale} />
              <div className="pair-in">
                <h3>{h.landlordH}</h3>
                <p>{h.landlordLede}</p>
                <span className="more">
                  {h.landlordCta} <Arrow />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="sec" aria-labelledby="market-h">
        <div className="wrap">
          <div className="market dark rv">
            <div>
              <h2 id="market-h">{h.marketH}</h2>
              <p className="lede">{h.marketLede}</p>
              <Link href={lp(locale, "/dubai-property-prices/")} className="btn">
                {h.marketCta}
              </Link>
            </div>
            <dl className="market-figs">
              <div>
                <dt>{h.marketPsf}</dt>
                <dd className="num">{aed(d.medianPsf ?? 0, locale)}</dd>
              </div>
              <div>
                <dt>{h.marketChange}</dt>
                <dd className="num">{d.changePct != null ? signedPct(d.changePct) : "n/a"}</dd>
              </div>
              <div>
                <dt>{h.marketSales}</dt>
                <dd className="num">{num(d.sales)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="areas-h">
        <div className="wrap sec-head rv">
          <h2 id="areas-h">{h.areasH}</h2>
          <Link href={lp(locale, "/areas/")} className="more">
            {t.common.allAreas} <Arrow />
          </Link>
        </div>
        <div className="rail">
          {getAreas(locale).map((a) => (
            <AreaTile key={a.slug} a={a} locale={locale} />
          ))}
        </div>
      </section>

      <section className="sec stone" aria-labelledby="costs-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic name="guide-keys" sizes="(max-width: 900px) 100vw, 50vw" locale={locale} />
          </div>
          <div>
            <h2 id="costs-h" className="rv">
              {h.costsH}
            </h2>
            <p className="lede rv">{h.costsLede}</p>
            <div className="calc-wrap">
              <CostCalculator locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <Band image="l-creek" h2={h.offPlanH} lede={h.offPlanLede} locale={locale}>
        <Link href={lp(locale, "/off-plan/")} className="btn">
          {h.offPlanCta}
        </Link>
        <Link href={lp(locale, "/guides/buying-off-plan-in-dubai/")} className="btn btn-ghost">
          {h.offPlanCta2}
        </Link>
      </Band>

      <section className="sec" aria-labelledby="how-h">
        <div className="wrap split">
          <div className="split-media rv">
            <Pic name="viewing" sizes="(max-width: 900px) 100vw, 50vw" locale={locale} />
          </div>
          <div>
            <h2 id="how-h" className="rv">
              {h.howH}
            </h2>
            <div className="promises">
              {PROMISES.map((p) => (
                <div key={p.title} className="rv">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
            <div className="btns">
              <Link href={lp(locale, "/contact/")} className="btn">
                {t.chrome.adviser}
              </Link>
              <Link href={lp(locale, "/about/")} className="btn btn-ghost">
                {t.footer.about}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec stone" aria-labelledby="brief-h">
        <div className="wrap split top">
          <div>
            <h2 id="brief-h" className="rv">
              {h.briefH}
            </h2>
            <p className="lede rv">{h.briefLede}</p>
          </div>
          <div className="panel rv" id="brief">
            <EnquiryForm locale={locale} intent="brief" />
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="faq-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic name="area-palm-jumeirah" sizes="(max-width: 900px) 100vw, 50vw" locale={locale} />
          </div>
          <div>
            <h2 id="faq-h" className="rv">
              {h.faqH}
            </h2>
            <div className="faq" style={{ marginTop: 24 }}>
              {HOME_FAQS.map((f) => (
                <details key={f.q} className="rv">
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
      </section>

      <section className="sec stone" aria-labelledby="guides-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="guides-h">{h.guidesH}</h2>
            <Link href={lp(locale, "/guides/")} className="more">
              {t.common.allGuides} <Arrow />
            </Link>
          </div>
          <div className="guide-list">
            {getGuides(locale)
              .slice(0, 4)
              .map((g) => (
                <GuideLink key={g.slug} g={g} locale={locale} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
