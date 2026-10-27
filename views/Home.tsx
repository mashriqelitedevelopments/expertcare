import Link from "next/link";
import { Rich } from "@/components/Blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HomeSearch } from "@/components/HomeSearch";
import { Arrow } from "@/components/Icons";
import { ListingRow } from "@/components/ListingCard";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Partners } from "@/components/Partners";
import { Pic } from "@/components/Pic";
import { Rail } from "@/components/Rail";
import { Reviews } from "@/components/Reviews";
import { AtlasTile, Hero, Plate } from "@/components/Sections";
import { areaName, getAreas, getGuides, getListings, getServices } from "@/lib/content";
import { aed, num, plainText } from "@/lib/format";
import { HOME_FAQS } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import { MARKET, signedPct } from "@/lib/market";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import { JsonLd } from "@/lib/seo";
import { PROMISES } from "@/lib/site";
import { SHOW_LISTINGS } from "@/lib/listings";
import { ui } from "@/lib/ui";

/** One project per developer, up to six, highest starting price first: the focus is the upper end
 * of the market. Projects priced on request follow the priced ones. */
function pickFeatured<T extends { developer: string; price: number | null }>(list: T[]) {
  const all = [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  const seen = new Set<string>();
  const first = all.filter((l) => (seen.has(l.developer) ? false : (seen.add(l.developer), true)));
  return [...first, ...all.filter((l) => !first.includes(l))].slice(0, 6);
}

/** "Beyond buying and selling": off-plan leads as the large tile. */
const BENTO = ["off-plan-advisory", "investor-services", "golden-visa-through-property", "property-management-in-dubai", "relocation-to-dubai"];

const DOORS = [
  { slug: "buying-property-in-dubai", key: "buy", inset: "handover" },
  { slug: "selling-property-in-dubai", key: "sell", inset: "area-downtown-dubai" },
  { slug: "property-management-in-dubai", key: "manage", inset: "l-marina" },
  { slug: "investor-services", key: "invest", inset: "terrace-dusk" },
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
      <Hero image="hero2" mobile="hero2-m" h1={h.h1} lede={h.sub} locale={locale} foot={SHOW_LISTINGS ? <HomeSearch locale={locale} /> : undefined} />

      <section className="sec tight partners-sec">
        <Partners locale={locale} />
      </section>

      <section className="sec" aria-labelledby="doors-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <h2 id="doors-h">{h.doorsH}</h2>
              <p className="lede">{h.doorsLede}</p>
            </div>
          </div>
          <div className="doors stagger rv">
            {doors.map((x) => (
              <Link key={x.slug} href={lp(locale, servicePath(x.slug))} className="door">
                <div className="door-media">
                  <Pic name={x.s.image} sizes="(max-width: 560px) 50vw, (max-width: 1000px) 50vw, 25vw" locale={locale} />
                </div>
                <div className="door-panel">
                  <div>
                    <h3>{x.copy.h}</h3>
                    <p>{x.copy.p}</p>
                  </div>
                  <span className="door-arrow" aria-hidden="true">
                    <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {SHOW_LISTINGS && (
      <section className="sec tight" aria-labelledby="homes-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="homes-h">{h.homesH}</h2>
            <Link href={lp(locale, "/properties/")} className="more">
              {h.allHomes} {all.length} {h.homesWord} <Arrow />
            </Link>
          </div>
          <Rail prevLabel={h.railPrev} nextLabel={h.railNext}>
            {featured.map((l, i) => (
              <div key={l.slug} className="rv">
                <ListingRow l={l} locale={locale} priority={i === 0} sizes="(max-width: 600px) 84vw, (max-width: 1000px) 50vw, 33vw" />
              </div>
            ))}
          </Rail>
        </div>
      </section>
      )}

      <Plate
        image="area-downtown-dubai"
        h2={h.marketH}
        lede={h.marketLede}
        line={h.marketLine.replace("{psf}", aed(d.medianPsf ?? 0, locale)).replace("{change}", d.changePct != null ? signedPct(d.changePct) : "").replace("{sales}", num(d.sales))}
        caption="Downtown Dubai"
        locale={locale}
        after={
          <dl className="plate-list">
            {top.map(([slug, a]) => (
              <div key={slug}>
                <dt>
                  <Link href={lp(locale, `/dubai-property-prices/${slug}/`)}>{areaName(locale, slug)}</Link>
                </dt>
                <dd>{aed(a.last12.medianPsf ?? 0, locale)}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <Link href={lp(locale, "/dubai-property-prices/")} className="btn">
          {h.marketCta}
        </Link>
      </Plate>

      <section className="sec" aria-labelledby="areas-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="areas-h">{h.areasH}</h2>
            <Link href={lp(locale, "/areas/")} className="more">
              {t.common.allAreas} <Arrow />
            </Link>
          </div>
          <div className="atlas stagger rv">
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
          <div className="bento stagger rv">
            {BENTO.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean).map((s, i) => (
              <Link key={s.slug} href={lp(locale, servicePath(s.slug))} className={`tile${i === 0 ? " tile-big" : ""}`}>
                <div className="tile-media">
                  <Pic name={s.image} sizes={i === 0 ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 100vw, 25vw"} locale={locale} />
                </div>
                <div className="tile-body">
                  <h3>{s.short}</h3>
                  <p>{s.dek}</p>
                  <span className="tile-more">
                    {t.common.readMore} <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Plate image="l-creek" h2={h.offPlanH} lede={h.offPlanLede} caption={h.offPlanCaption} locale={locale}>
        <Link href={lp(locale, SHOW_LISTINGS ? "/off-plan/" : "/off-plan/#brief")} className="btn">
          {SHOW_LISTINGS ? h.offPlanCta : t.noListings.offPlanCta}
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

      <Reviews locale={locale} />

      <section className="sec tight sand" aria-labelledby="guides-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="guides-h">{h.guidesH}</h2>
            <Link href={lp(locale, "/guides/")} className="more">
              {t.common.allGuides} <Arrow />
            </Link>
          </div>
          <div className="ledger stagger rv">
            {getGuides(locale)
              .slice(0, 3)
              .map((g) => (
                <article key={g.slug} className="row">
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

      <NewsletterSection locale={locale} />

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
