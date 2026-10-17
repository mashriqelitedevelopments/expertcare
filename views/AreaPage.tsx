import Link from "next/link";
import { notFound } from "next/navigation";
import { Rich } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import { Pic } from "@/components/Pic";
import { ListingCard } from "@/components/ListingCard";
import { AreaTile, GuideLink, Hero } from "@/components/Sections";
import { areaFaqs, getArea, getAreas, getGuide, listingsInArea } from "@/lib/content";
import { fill, plainText } from "@/lib/format";
import { marketFor } from "@/lib/market";
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
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };

  return (
    <>
      <JsonLd data={place} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero small image={a.image} crumbs={crumbs} h1={a.name} lede={a.intro} locale={locale} />

      <section className="sec" aria-labelledby="living-h">
        <div className="wrap split top">
          <div>
            <h2 id="living-h" className="rv">
              {t.areas.livingIn} {a.name}
            </h2>
            <div className="stack">
              {a.overview.map((p) => (
                <p key={p} className="lede rv">
                  {p}
                </p>
              ))}
            </div>
            {marketFor(a.slug) && (
              <Link href={lp(locale, `/dubai-property-prices/${a.slug}/`)} className="more" style={{ marginTop: 28 }}>
                {fill(t.prices.areaH1, { area: a.name })} <Arrow />
              </Link>
            )}
          </div>
          <div className="area-facts rv">
            <div>
              <h3>{t.areas.homesLabel}</h3>
              <ul>
                {a.homes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{t.areas.suitsLabel}</h3>
              <ul>
                {a.suits.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{t.areas.transportLabel}</h3>
              <ul>
                {a.transport.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            {a.landmarks && a.landmarks.length > 0 && (
              <div>
                <h3>{t.areas.landmarksLabel}</h3>
                <ul>
                  {a.landmarks.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3>{t.areas.ownershipLabel}</h3>
              <ul>
                <li>{t.areas.freehold}</li>
                <li>
                  {t.areas.developerLabel}: {a.developer}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec stone" id="homes" aria-labelledby="homes-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="homes-h">
              {t.common.forSaleIn} {a.name}
            </h2>
            {homes.length > 0 && (
              <Link href={`${lp(locale, "/properties/")}?area=${a.slug}`} className="more">
                {t.common.searchArea} {a.name} <Arrow />
              </Link>
            )}
          </div>
          {homes.length > 0 ? (
            <div className="grid">
              {homes.map((l) => (
                <ListingCard key={l.slug} l={l} locale={locale} />
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
        <section className="sec" aria-label={`${t.areas.rentH} ${t.areas.sellH}`}>
          <div className="wrap service-pair">
            {a.rentNote && (
              <Link href={lp(locale, "/rent/")}>
                <Pic name="l-jvc" sizes="(max-width: 800px) 100vw, 50vw" locale={locale} />
                <div className="pair-in">
                  <h3>
                    {t.areas.rentH} {a.name}
                  </h3>
                  <p>{a.rentNote}</p>
                  <span className="more">
                    {t.areas.rentCta} <Arrow />
                  </span>
                </div>
              </Link>
            )}
            {a.sellNote && (
              <Link href={lp(locale, "/sell/")}>
                <Pic name="guide-keys" sizes="(max-width: 800px) 100vw, 50vw" locale={locale} />
                <div className="pair-in">
                  <h3>
                    {t.areas.sellH} {a.name}
                  </h3>
                  <p>{a.sellNote}</p>
                  <span className="more">
                    {t.areas.sellCta} <Arrow />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </section>
      )}

      <section className="sec" aria-labelledby="faq-h">
        <div className="wrap narrow">
          <h2 id="faq-h" className="rv">
            {t.areas.questionsAbout} {a.name}
          </h2>
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

      <section className="sec" aria-labelledby="more-h">
        <div className="wrap sec-head">
          <h2 id="more-h">{t.common.moreAreas}</h2>
          <Link href={lp(locale, "/areas/")} className="more">
            {t.common.allAreas} <Arrow />
          </Link>
        </div>
        <div className="rail">
          {[...getAreas(locale).filter((x) => a.nearby?.includes(x.slug)), ...getAreas(locale).filter((x) => x.slug !== a.slug && !a.nearby?.includes(x.slug))]
            .slice(0, 6)
            .map((x) => (
              <AreaTile key={x.slug} a={x} locale={locale} />
            ))}
        </div>
      </section>

      <section className="sec stone" aria-labelledby="before-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="before-h">{t.common.beforeYouBuy}</h2>
          </div>
          <div className="guide-list">
            {["how-to-buy-property-in-dubai", "cost-of-buying-property-in-dubai"].map((s) => (
              <GuideLink key={s} g={getGuide(locale, s)!} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
