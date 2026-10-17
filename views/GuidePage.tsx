import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Blocks, Rich } from "@/components/Blocks";
import { GuideLink, Hero } from "@/components/Sections";
import { getGuide, getGuides } from "@/lib/content";
import { plainText } from "@/lib/format";
import { formatDate } from "@/lib/guides";
import { ogImage } from "@/lib/images";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID, abs, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

export function GuidePage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = ui(locale);
  const g = getGuide(locale, slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}/`;
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: t.footer.guides, path: "/guides/" },
    { name: g.title, path },
  ];
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.seoDescription,
    image: abs(ogImage(g.image)),
    datePublished: g.updated,
    dateModified: g.updated,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    abstract: g.summary.map(plainText).join(" "),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absL(locale, path),
    citation: g.sources.map((s) => s.url),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
  const others = getGuides(locale).filter((x) => x.slug !== g.slug);
  const related = [...others.filter((x) => x.topic === g.topic), ...others.filter((x) => x.topic !== g.topic)].slice(0, 2);

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero small image={g.image} crumbs={crumbs} h1={g.title} lede={g.dek} byline={`${t.common.updated} ${formatDate(g.updated, locale)}`} locale={locale} />

      <section className="sec">
        <div className="wrap article">
          <div className="prose">
            <aside className="keypoints" aria-labelledby="in-short">
              <h2 id="in-short">{t.common.inShort}</h2>
              <ul>
                {g.summary.map((s) => (
                  <li key={s}>
                    <Rich text={s} locale={locale} />
                  </li>
                ))}
              </ul>
            </aside>
            {g.sections.map((s) => (
              <Fragment key={s.id}>
                <h2 id={s.id}>{s.h}</h2>
                <Blocks blocks={s.blocks} locale={locale} />
              </Fragment>
            ))}
            <h2 id="questions">{t.common.questions}</h2>
            <div className="faq">
              {g.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>
                    <Rich text={f.a} locale={locale} />
                  </p>
                </details>
              ))}
            </div>
            <h2 id="sources">{t.common.sources}</h2>
            <ul className="sources">
              {g.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav className="toc" aria-label={t.common.onThisPage}>
            {g.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.h}
              </a>
            ))}
            <a href="#questions">{t.common.questions}</a>
            <a href="#sources">{t.common.sources}</a>
          </nav>
        </div>
      </section>

      <section className="sec stone" aria-labelledby="related-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="related-h">{t.common.keepReading}</h2>
          </div>
          <div className="guide-list">
            {related.map((x) => (
              <GuideLink key={x.slug} g={x} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
