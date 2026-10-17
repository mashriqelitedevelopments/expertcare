import Link from "next/link";
import { notFound } from "next/navigation";
import { PaymentPlan } from "@/components/Blocks";
import { CostCalculator, MortgageCalculator } from "@/components/Calculators";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arrow } from "@/components/Icons";
import { ListingCard, bedRange, priceLine } from "@/components/ListingCard";
import { Pic } from "@/components/Pic";
import { SaveButton } from "@/components/SaveButton";
import { Crumbs } from "@/components/Sections";
import { getArea, getListing, getListings } from "@/lib/content";
import { buyingCosts } from "@/lib/costs";
import { aed, num } from "@/lib/format";
import { formatDate } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID, abs, absL, breadcrumbs } from "@/lib/seo";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

/** Default price for the calculators when the developer publishes none. */
const NO_PRICE_DEFAULT = 1_500_000;

export function Listing({ locale, slug }: { locale: Locale; slug: string }) {
  const t = ui(locale);
  const d = t.detail;
  const l = getListing(locale, slug);
  if (!l) notFound();
  const area = l.area ? getArea(locale, l.area) : undefined;
  const path = `/properties/${l.slug}/`;
  const allIn = l.price ? buyingCosts({ price: l.price, status: l.status, locale }).total : null;
  const sqft = locale === "ar" ? "قدم مربع" : "sq ft";
  const comma = locale === "ar" ? "، " : ", ";
  const others = getListings(locale).filter((x) => x.slug !== l.slug);
  const similar = [
    ...others.filter((x) => l.area && x.area === l.area),
    ...others.filter((x) => x.community === l.community),
    ...others.filter((x) => x.type === l.type && x.developer !== l.developer),
    ...others,
  ]
    .filter((x, i, arr) => arr.findIndex((y) => y.slug === x.slug) === i)
    .slice(0, 3);
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: d.crumbProperties, path: "/properties/" },
    ...(area ? [{ name: area.name, path: `/areas/${area.slug}/` }] : []),
    { name: l.title, path },
  ];
  const ld = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: l.title,
    description: l.summary,
    url: absL(locale, path),
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    image: l.images.map((k) => abs(ogImage(k))),
    datePosted: l.checked,
    about: {
      "@type": "Residence",
      name: l.title,
      address: { "@type": "PostalAddress", addressLocality: l.place, addressRegion: "Dubai", addressCountry: "AE" },
      ...(l.amenities.length ? { amenityFeature: l.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })) } : {}),
    },
    ...(l.price
      ? { offers: { "@type": "Offer", price: l.price, priceCurrency: "AED", availability: "https://schema.org/PreOrder", offeredBy: { "@id": ORG_ID } } }
      : {}),
  };
  const calcPrice = l.price ?? NO_PRICE_DEFAULT;

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <div className="wrap">
        <div className="crumbs-nav">
          <Crumbs items={crumbs} locale={locale} />
        </div>
        <div className={`gallery${l.images.length === 1 ? " one" : l.images.length >= 3 ? " three" : ""}`}>
          {l.images.slice(0, 3).map((k, i) => (
            <Pic key={k} name={k} priority={i === 0} sizes={i === 0 ? "(max-width: 760px) 100vw, 66vw" : "33vw"} locale={locale} />
          ))}
        </div>

        <div className="detail">
          <div>
            <header className="detail-head">
              <h1>{l.title}</h1>
              <p className="detail-loc">
                {l.typeLabel} {d.inArea}{" "}
                {area ? <Link href={lp(locale, `/areas/${area.slug}/`)}>{area.name}</Link> : l.community}
                {comma}
                <span dir="ltr">{l.developer}</span>
                {comma}
                {l.status === "off-plan" ? `${d.offPlan}${l.handover ? `${comma}${d.expectedHandover} ${l.handover}` : ""}` : d.ready}
              </p>
              <dl className="facts">
                <div>
                  <dt>{d.startingPrice}</dt>
                  <dd>{l.price ? aed(l.price, locale) : d.onRequest}</dd>
                </div>
                <div>
                  <dt>{d.homes}</dt>
                  <dd>{bedRange(locale, l)}</dd>
                </div>
                {l.size && (
                  <div>
                    <dt>{d.smallest}</dt>
                    <dd>
                      {num(l.size)} {sqft}
                    </dd>
                  </div>
                )}
                <div>
                  <dt>{d.handover}</dt>
                  <dd>{l.handover ?? d.notPublished}</dd>
                </div>
                {!l.plan && l.planLabel && (
                  <div>
                    <dt>{d.paymentPlan}</dt>
                    <dd>{l.planLabel}</dd>
                  </div>
                )}
                <div>
                  <dt>{d.developer}</dt>
                  <dd dir="ltr">{l.developer}</dd>
                </div>
                <div>
                  <dt>{d.community}</dt>
                  <dd>{l.community}</dd>
                </div>
              </dl>
            </header>

            <section className="block prose-p" aria-label={d.aboutProject}>
              <p className="lede">{l.summary}</p>
              {l.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>

            <section className="block" aria-labelledby="features-h">
              <h2 id="features-h">{d.features}</h2>
              <ul className="ticks">
                {l.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            {l.amenities.length > 0 && (
              <section className="block" aria-labelledby="amenities-h">
                <h2 id="amenities-h">{d.amenities}</h2>
                <ul className="ticks">
                  {l.amenities.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </section>
            )}

            {l.plan && (
              <section className="block" id="payment-plan" aria-labelledby="plan-h">
                <h2 id="plan-h">
                  {d.paymentPlan}
                  {l.planLabel ? ` ${l.planLabel}` : ""}
                </h2>
                <PaymentPlan l={l} locale={locale} />
              </section>
            )}

            <section className="block" id="costs" aria-labelledby="costs-h">
              <h2 id="costs-h">{d.totalCost}</h2>
              <p className="note">{l.price ? d.atStartingPrice : d.noPrice}</p>
              <CostCalculator locale={locale} price={calcPrice} status={l.status} />
            </section>

            <section className="block" id="mortgage" aria-labelledby="mortgage-h">
              <h2 id="mortgage-h">{d.monthly}</h2>
              <MortgageCalculator locale={locale} price={calcPrice} status={l.status} />
            </section>

            {area && (
              <section className="block" aria-labelledby="area-h">
                <h2 id="area-h">
                  {d.livingIn} {area.name}
                </h2>
                <p>{area.overview[0]}</p>
                <div className="area-facts">
                  <div>
                    <h3>{d.gettingAround}</h3>
                    <ul>
                      {area.transport.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>{d.ownership}</h3>
                    <ul>
                      <li>{d.freehold}</li>
                      <li>
                        {d.masterDeveloper}: {area.developer}
                      </li>
                    </ul>
                  </div>
                </div>
                <Link href={lp(locale, `/areas/${area.slug}/`)} className="more">
                  {d.areaGuide} {area.name} <Arrow />
                </Link>
              </section>
            )}

            <section className="block" id="enquire" aria-labelledby="enquire-h">
              <h2 id="enquire-h">{d.enquireProject}</h2>
              <EnquiryForm locale={locale} intent="viewing" context={`${l.ref}, ${l.title}, ${l.developer}, ${l.place}`} />
            </section>

            <p className="source-line">
              {d.sourceLine} {formatDate(l.checked, locale)}:{" "}
              <a href={l.source} rel="nofollow noopener" target="_blank">
                {d.sourceLink}
              </a>
            </p>
          </div>

          <aside className="aside" aria-label={d.priceAndViewing}>
            <p className="aside-price num">{priceLine(locale, l)}</p>
            <p className="aside-sub">
              {l.typeLabel} · {bedRange(locale, l)}
              {l.size ? ` · ${d.smallest} ${num(l.size)} ${sqft}` : ""}
            </p>
            {allIn && (
              <div className="aside-all">
                <span>
                  {d.withFees}
                  <a href="#costs">{d.breakdown}</a>
                </span>
                <strong className="num">{aed(allIn, locale)}</strong>
              </div>
            )}
            <a href="#enquire" className="btn">
              {d.askAvailability}
            </a>
            <SaveButton slug={l.slug} title={l.title} locale={locale} wide />
            <p className="aside-ref">
              <span>
                {d.reference} {l.ref}
              </span>
              {l.projectNumber && (
                <span>
                  {d.projectNo} {l.projectNumber}
                </span>
              )}
              {l.permit && (
                <span>
                  {d.permit} {l.permit}
                </span>
              )}
              {l.escrow && (
                <span>
                  {d.escrow} {l.escrow}
                </span>
              )}
              {site.orn && (
                <span>
                  {d.orn} {site.orn}
                </span>
              )}
            </p>
          </aside>
        </div>
      </div>

      <section className="sec stone" aria-labelledby="similar-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="similar-h">{d.similarProjects}</h2>
            <Link href={lp(locale, "/off-plan/")} className="more">
              {d.allProjects} <Arrow />
            </Link>
          </div>
          <div className="grid">
            {similar.map((x) => (
              <ListingCard key={x.slug} l={x} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <div className="mbar">
        <div>
          <strong className="num">{priceLine(locale, l)}</strong>
          {allIn && (
            <span>
              {aed(allIn, locale)} {d.withFeesShort}
            </span>
          )}
        </div>
        <a href="#enquire" className="btn">
          {d.askAvailability}
        </a>
      </div>
    </>
  );
}
