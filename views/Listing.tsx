import Link from "next/link";
import { notFound } from "next/navigation";
import { PaymentPlan } from "@/components/Blocks";
import { CostCalculator, MortgageCalculator } from "@/components/Calculators";
import { EnquiryForm } from "@/components/EnquiryForm";
import { AdviserCard } from "@/components/AdviserCard";
import { ContactButtons } from "@/components/ContactButtons";
import { Gallery } from "@/components/Gallery";
import { Arrow, WhatsAppIcon } from "@/components/Icons";
import { LedgerHead, ListingRow, bedRange, priceLine } from "@/components/ListingCard";
import { Pic } from "@/components/Pic";
import { SaveButton } from "@/components/SaveButton";
import { Crumbs } from "@/components/Sections";
import { getArea, getListing, getListings } from "@/lib/content";
import { contactFor, waLink } from "@/lib/contact";
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
  const c = contactFor(l);
  const refs = [
    [d.reference, l.ref],
    [d.projectNo, l.projectNumber],
    [d.permit, l.permit],
    [d.escrow, l.escrow],
    [d.orn, site.orn],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />

      <section className="hero hero-sm on-photo lhero">
        <div className="hero-media">
          <Pic name={l.images[0]} priority sizes="100vw" locale={locale} />
        </div>
        <div className="hero-copy lhero-copy">
          <div className="lhero-main">
            <Crumbs items={crumbs} locale={locale} />
            <h1>{l.title}</h1>
            <ul className="lhero-chips">
              <li>{l.status === "off-plan" ? t.card.offPlan : t.card.ready}</li>
              <li>{l.typeLabel}</li>
              <li>{bedRange(locale, l)}</li>
              {l.size && (
                <li>
                  {t.card.fromSize} {num(l.size)} {sqft}
                </li>
              )}
              {l.handover && (
                <li>
                  {d.handover} {l.handover}
                </li>
              )}
            </ul>
            <Gallery
              labels={t.gallery}
              thumbs={l.images.map((k) => (
                <Pic key={k} name={k} sizes="120px" locale={locale} />
              ))}
              slides={l.images.map((k) => (
                <Pic key={k} name={k} sizes="100vw" locale={locale} />
              ))}
            />
          </div>
          <div className="lhero-card">
            <p className="lhero-label">{l.price ? t.card.startingFrom : t.card.price}</p>
            <p className="lhero-price">{l.price ? aed(l.price, locale) : d.onRequest}</p>
            {allIn && (
              <p className="lhero-fees">
                {aed(allIn, locale)} {d.withFeesShort} · <a href="#costs">{d.breakdown}</a>
              </p>
            )}
            <a href="#enquire" className="cta cta-solid cta-wide">
              {d.askAvailability}
            </a>
            <ContactButtons phone={c.phone} whatsapp={c.whatsapp} message={c.message} locale={locale} />
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="wrap article">
          <div className="prose">
            <p className="byline">
              {l.typeLabel} {d.inArea} {area ? <Link href={lp(locale, `/areas/${area.slug}/`)}>{area.name}</Link> : l.community}
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

            <p className="lede">{l.summary}</p>
            {l.description.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <section aria-labelledby="features-h">
              <h2 id="features-h">{l.amenities.length > 0 ? d.featuresAmenities : d.features}</h2>
              <div className="cols cols-2">
                <div>
                  <h3>{d.features}</h3>
                  <ul>
                    {l.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                {l.amenities.length > 0 && (
                  <div>
                    <h3>{d.amenities}</h3>
                    <ul>
                      {l.amenities.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {l.plan && (
              <section id="payment-plan" aria-labelledby="plan-h">
                <h2 id="plan-h">
                  {d.paymentPlan}
                  {l.planLabel ? ` ${l.planLabel}` : ""}
                </h2>
                <PaymentPlan l={l} locale={locale} />
              </section>
            )}

            <section id="costs" aria-labelledby="costs-h">
              <h2 id="costs-h">{d.totalCost}</h2>
              <p className="note">{l.price ? d.atStartingPrice : d.noPrice}</p>
              <CostCalculator locale={locale} price={calcPrice} status={l.status} />
            </section>

            <section id="mortgage" aria-labelledby="mortgage-h">
              <h2 id="mortgage-h">{d.monthly}</h2>
              <MortgageCalculator locale={locale} price={calcPrice} status={l.status} />
            </section>

            {area && (
              <section aria-labelledby="area-h">
                <h2 id="area-h">
                  {d.livingIn} {area.name}
                </h2>
                <p>{area.overview[0]}</p>
                <div className="cols cols-2">
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
                <p>
                  <Link href={lp(locale, `/areas/${area.slug}/`)} className="more">
                    {d.livingIn} {area.name} <Arrow />
                  </Link>
                </p>
              </section>
            )}

            <p className="source-line">
              {d.sourceLine} {formatDate(l.checked, locale)}:{" "}
              <a href={l.source} rel="nofollow noopener" target="_blank">
                {d.sourceLink}
              </a>
            </p>
          </div>

          <aside className="aside" aria-label={d.priceAndViewing}>
            <div className="panel" id="enquire">
              <h2 className="aside-h">{d.enquireProject}</h2>
              <EnquiryForm locale={locale} intent="viewing" context={`${l.ref}, ${l.title}, ${l.developer}, ${l.place}`} />
            </div>
            <div className="aside-stick">
              <div className="panel">
                <dl className="calc-sum">
                  <div className="big">
                    <dt>{d.startingPrice}</dt>
                    <dd className="num">{priceLine(locale, l)}</dd>
                  </div>
                  {allIn && (
                    <div>
                      <dt>
                        {d.withFees} <a href="#costs">{d.breakdown}</a>
                      </dt>
                      <dd className="num">{aed(allIn, locale)}</dd>
                    </div>
                  )}
                </dl>
                <p className="aside-p" style={{ marginTop: 14 }}>
                  {l.typeLabel} · {bedRange(locale, l)}
                  {l.size ? ` · ${d.smallest} ${num(l.size)} ${sqft}` : ""}
                </p>
                <div className="btns">
                  <a href="#enquire" className="btn btn-clay">
                    {d.askAvailability}
                  </a>
                  <SaveButton slug={l.slug} title={l.title} locale={locale} wide />
                </div>
                <ul className="aside-ref" style={{ marginTop: 18 }}>
                  {refs.map(([label, value]) => (
                    <li key={label}>
                      {label} {value}
                    </li>
                  ))}
                </ul>
              </div>
              {c.adviser && <AdviserCard a={c.adviser} message={c.message} locale={locale} />}
            </div>
          </aside>
        </div>
      </section>

      <section className="sec sand" aria-labelledby="similar-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="similar-h">{d.similarProjects}</h2>
            <Link href={lp(locale, "/off-plan/")} className="more">
              {d.allProjects} <Arrow />
            </Link>
          </div>
          <div className="ledger">
            <LedgerHead locale={locale} />
            {similar.map((x) => (
              <ListingRow key={x.slug} l={x} locale={locale} />
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
        <a href="#enquire" className="btn btn-clay">
          {d.askAvailability}
        </a>
        {c.whatsapp && (
          <a href={waLink(c.whatsapp, c.message)} className="mbar-wa" target="_blank" rel="noopener noreferrer" aria-label={t.contactButtons.whatsapp}>
            <WhatsAppIcon />
          </a>
        )}
      </div>
    </>
  );
}
