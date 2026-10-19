import Link from "next/link";
import { Rich } from "@/components/Blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HomeSearch } from "@/components/HomeSearch";
import { Arrow } from "@/components/Icons";
import { ListingRow } from "@/components/ListingCard";
import { Partners } from "@/components/Partners";
import { Pic } from "@/components/Pic";
import { AtlasTile, Hero, IndexRow, Plate } from "@/components/Sections";
import { areaName, getAreas, getGuides, getListings, getServices } from "@/lib/content";
import { aed, num, plainText } from "@/lib/format";
import { HOME_FAQS } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import { MARKET, signedPct } from "@/lib/market";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import { JsonLd } from "@/lib/seo";
import { PROMISES } from "@/lib/site";
import { ui } from "@/lib/ui";

/** One project per developer, in inventory order, up to six. */
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
  const top = Object.entries(MARKET.areas)
    .filter(([, a]) => a.last12.medianPsf != null)
    .sort((a, b) => (b[1].last12.medianPsf ?? 0) - (a[1].last12.medianPsf ?? 0))
    .slice(0, 4);

  return (
    <>
      <JsonLd data={faqLd} />
      <Hero image="hero2" mobile="hero2-m" h1={h.h1} lede={h.sub} locale={locale} foot={<HomeSearch locale={locale} />} />

      <section className="sec" aria-labelledby="doors-h">
        <div className="wrap">
          <div className="offset rv" style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}>
            <h2 id="doors-h">{h.doorsH}</h2>
          </div>
          <div className="doors">
            {doors.map((x) => (
              <Link key={x.slug} href={lp(locale, servicePath(x.slug))} className="door rv">
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
        </div>
      </section>

      <section className="sec tight" aria-labelledby="homes-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="homes-h">{h.homesH}</h2>
            <Link href={lp(locale, "/properties/")} className="more">
              {h.allHomes} {all.length} {h.homesWord} <Arrow />
            </Link>
          </div>
          <div className="ledger">
            {featured.map((l, i) => (
              <div key={l.slug} className="rv">
                <ListingRow l={l} locale={locale} priority={i === 0} sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              </div>
            ))}
          </div>
          <div className="wrap" style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
            <Partners locale={locale} />
          </div>
        </div>
      </section>

      <Plate image="area-downtown-dubai" h2={h.marketH} lede={`${h.marketLede} ${h.marketLine.replace("{psf}", aed(d.medianPsf ?? 0, locale)).replace("{change}", d.changePct != null ? signedPct(d.changePct) : "").replace("{sales}", num(d.sales))}`} caption="Downtown Dubai" locale={locale}>
        <Link href={lp(locale, "/dubai-property-prices/")} className="btn">
          {h.marketCta}
        </Link>
        <span className="chips" style={{ gap: "6px 18px" }}>
          {top.map(([slug, a]) => (
            <Link key={slug} href={lp(locale, `/dubai-property-prices/${slug}/`)}>
              {areaName(locale, slug)} {aed(a.last12.medianPsf ?? 0, locale)}
            </Link>
          ))}
        </span>
      </Plate>

      <section className="sec" aria-labelledby="areas-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="areas-h">{h.areasH}</h2>
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

      <section className="sec tight" aria-labelledby="services-h">
        <div className="wrap">
          <div className="offset rv" style={{ marginBottom: "clamp(40px, 5vw, 72px)" }}>
            <h2 id="services-h">{h.servicesH}</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              {h.servicesLede}
            </p>
            <div className="btns">
              <Link href={lp(locale, "/services/")} className="more">
                {h.allServices} <Arrow />
              </Link>
            </div>
          </div>
          <div className="index">
            {services.slice(4, 9).map((s, i) => (
              <div key={s.slug} className="rv">
                <IndexRow idx={i} title={s.short} text={s.dek} href={servicePath(s.slug)} image={s.image} locale={locale} sizes="(max-width: 800px) 100vw, 45vw" />
              </div>
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

      <section className="sec" aria-labelledby="how-h">
        <div className="wrap twin">
          <div className="rv">
            <h2 id="how-h">{h.howH}</h2>
            <div className="btns">
              <Link href={lp(locale, "/about/")} className="more">
                {t.footer.about} <Arrow />
              </Link>
            </div>
          </div>
          <div className="ladder rv">
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

      <section className="sec tight sand" aria-labelledby="guides-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="guides-h">{h.guidesH}</h2>
            <Link href={lp(locale, "/guides/")} className="more">
              {t.common.allGuides} <Arrow />
            </Link>
          </div>
          <div className="ledger">
            {getGuides(locale)
              .slice(0, 3)
              .map((g) => (
                <article key={g.slug} className="row rv">
                  <div className="row-media">
                    <Pic name={g.image} sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw" locale={locale} />
                  </div>
                  <div className="row-title">
                    <h3>
                      <Link href={lp(locale, `/guides/${g.slug}/`)} className="row-link">
                        {g.title}
                      </Link>
                    </h3>
                    <p className="m">{g.topic}</p>
                  </div>
                  <div className="row-meta">
                    <p style={{ fontSize: 14, color: "var(--body)", marginTop: 6 }}>{g.dek}</p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="faq-h">
        <div className="wrap twin">
          <div className="rv">
            <h2 id="faq-h">{h.faqH}</h2>
            <div className="btns">
              <Link href={lp(locale, "/faq/")} className="more">
                {h.allFaq} <Arrow />
              </Link>
            </div>
          </div>
          <div className="faq rv">
            {HOME_FAQS.slice(0, 6).map((f) => (
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

      <section className="sec sand" aria-labelledby="brief-h">
        <div className="wrap twin">
          <div className="rv">
            <h2 id="brief-h">{h.briefH}</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              {h.briefLede}
            </p>
          </div>
          <div className="panel rv" id="brief">
            <EnquiryForm locale={locale} intent="brief" />
          </div>
        </div>
      </section>
    </>
  );
}
