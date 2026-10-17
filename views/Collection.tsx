import Link from "next/link";
import { notFound } from "next/navigation";
import { Rich } from "@/components/Blocks";
import { Arrow } from "@/components/Icons";
import { LedgerHead, ListingRow } from "@/components/ListingCard";
import { Hero } from "@/components/Sections";
import { areaFaqs, getArea, getListings, type ListingView } from "@/lib/content";
import { collectionBySlug, collectionCopy, collections, type Collection } from "@/lib/collections";
import { aedShort, homeCount, plainText } from "@/lib/format";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { JsonLd, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

/** The localised place a collection is about: its area guide, its community, or Dubai. */
export function collectionPlace(locale: Locale, c: Collection, all: ListingView[]) {
  if (c.area) return getArea(locale, c.area)?.name ?? ui(locale).collection.inDubai;
  if (c.community) return all.find((l) => c.slugs.includes(l.slug))?.community ?? c.community;
  return ui(locale).collection.inDubai;
}

/** Heading of any collection, for link lists. */
export function collectionH1(locale: Locale, c: Collection, all: ListingView[]) {
  const homes = c.slugs.map((s) => all.find((l) => l.slug === s)!).filter(Boolean);
  return collectionCopy(locale, c, collectionPlace(locale, c, all), homes).h1;
}

/** Sibling searches: the same homes seen another way. Keeps these pages linked to each other. */
function related(slug: string) {
  const c = collectionBySlug(slug)!;
  const all = collections().filter((x) => x.slug !== slug);
  const sameArea = c.area ? all.filter((x) => x.area === c.area) : [];
  const sameType = c.type ? all.filter((x) => x.type === c.type && x.area !== c.area) : [];
  const overlap = all.filter((x) => (x.kind === "developer" || x.kind === "community") && x.slugs.some((s) => c.slugs.includes(s)));
  const budgets = all.filter((x) => x.kind === "budget");
  return [...sameArea, ...overlap, ...sameType, ...budgets].filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 9);
}

export function CollectionPage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = ui(locale);
  const c = collectionBySlug(slug);
  if (!c) notFound();
  const all = getListings(locale);
  const homes = c.slugs.map((s) => all.find((l) => l.slug === s)!).filter(Boolean);
  const area = c.area ? getArea(locale, c.area) : undefined;
  const copy = collectionCopy(locale, c, collectionPlace(locale, c, all), homes);
  const path = `/buy/${c.slug}/`;
  const image = area?.image ?? homes[0]?.images[0] ?? "hero";
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: t.detail.crumbProperties, path: "/properties/" },
    { name: copy.h1, path },
  ];
  const prices = homes.map((h) => h.price).filter((p): p is number => p !== null);
  const from = prices.length ? aedShort(Math.min(...prices), locale) : "";
  const to = prices.length ? aedShort(Math.max(...prices), locale) : "";
  const unpriced = homes.length - prices.length;
  const priceFaq =
    locale === "ar"
      ? {
          q: `ما أسعار ${copy.h1}؟`,
          a: `${
            prices.length ? `تبدأ أسعار المشاريع المعروضة هنا ${prices.length > 1 && from !== to ? `من ${from} إلى ${to}` : `من ${from}`}، وفق ما يعلنه المطوّرون.` : ""
          }${unpriced ? ` ${unpriced === 1 ? "ويعلن مطوّر مشروع واحد السعر عند الطلب." : "ويعلن مطوّرو بعض المشاريع الأسعار عند الطلب."}` : ""} ويظهر مع كل مشروع خطة السداد وإجمالي تكلفة الشراء، بما فيها رسم التسجيل في نظام عقود 4%.`.trim(),
        }
      : {
          q: `How much does this cost?`,
          a: `${
            prices.length ? `Starting prices for the projects here run ${prices.length > 1 && from !== to ? `from ${from} to ${to}` : `from ${from}`}, as the developers publish them.` : ""
          }${unpriced ? ` ${unpriced === 1 ? "One developer shares prices on request." : "Some developers share prices on request."}` : ""} Every project shows its payment plan and the full cost of buying, including the 4% Oqood registration fee.`.trim(),
        };
  const faqs = area ? [priceFaq, ...areaFaqs(locale, area).slice(0, 1), areaFaqs(locale, area).at(-1)!] : [priceFaq];

  const cl = t.collection;
  const devCount = new Set(homes.map((h) => h.developer)).size;
  const offPlan = homes.filter((h) => h.status === "off-plan").length;
  const figs: [React.ReactNode, string][] = [
    [homes.length, cl.figProjects],
    prices.length ? [from, cl.figFrom] : [t.detail.onRequest, cl.figOnRequest],
    prices.length > 1 && from !== to ? [to, cl.figTo] : [devCount, cl.figDevelopers],
    area ? [area.developer, t.areas.developerLabel] : [offPlan, cl.figOffPlan],
  ];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.h1,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    numberOfItems: homes.length,
    itemListElement: homes.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: l.title, url: absL(locale, `/properties/${l.slug}/`) })),
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero small image={image} crumbs={crumbs} h1={copy.h1} lede={copy.lede} locale={locale} />

      <section className="wrap figs" aria-label={cl.figsAria}>
        {figs.map(([n, label]) => (
          <div key={label}>
            <strong className="num">{n}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="sec tight" aria-label={copy.h1}>
        <div className="wrap">
          <div className="results-bar">
            <p>{homeCount(locale, homes.length)}</p>
            {area ? (
              <Link href={lp(locale, `/areas/${area.slug}/`)} className="more">
                {t.areas.livingIn} {area.name} <Arrow />
              </Link>
            ) : (
              <Link href={lp(locale, "/properties/")} className="more">
                {cl.browseAll} <Arrow />
              </Link>
            )}
          </div>
          <div className="ledger">
            <LedgerHead locale={locale} />
            {homes.map((l, i) => (
              <ListingRow key={l.slug} l={l} locale={locale} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="faq-h">
        <div className="wrap narrow">
          <div className="sec-head">
            <h2 id="faq-h">{t.common.questions}</h2>
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

      <section className="sec sand" aria-labelledby="other-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="other-h">{cl.other}</h2>
            <Link href={lp(locale, "/properties/")} className="more">
              {cl.browseAll} <Arrow />
            </Link>
          </div>
          <ul className="chips">
            {related(slug).map((x) => (
              <li key={x.slug}>
                <Link href={lp(locale, `/buy/${x.slug}/`)}>{collectionH1(locale, x, all)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
