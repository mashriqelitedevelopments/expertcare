import { Fragment } from "react";
import { Blocks, Rich } from "@/components/Blocks";
import { Hero } from "@/components/Sections";
import { getFacts } from "@/lib/content";
import { FACTS_UPDATED } from "@/lib/facts";
import { plainText } from "@/lib/format";
import { formatDate } from "@/lib/guides";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID, abs, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

const PATH = "/dubai-property-facts/";

export function Facts({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const { sections, faqs, sources } = getFacts(locale);
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: t.footer.guides, path: "/guides/" },
    { name: t.facts.h1, path: PATH },
  ];
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.facts.h1,
    description: t.meta.factsDesc,
    image: abs("/img/area-business-bay-1280.jpg"),
    datePublished: FACTS_UPDATED,
    dateModified: FACTS_UPDATED,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absL(locale, PATH),
    citation: sources.map((s) => s.url),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero small image="area-business-bay" crumbs={crumbs} h1={t.facts.h1} lede={t.facts.lede} byline={`${t.common.checked} ${formatDate(FACTS_UPDATED, locale)}`} locale={locale} />
      <section className="sec">
        <div className="wrap article">
          <div className="prose">
            {sections.map((s) => (
              <Fragment key={s.id}>
                <h2 id={s.id}>{s.h}</h2>
                <Blocks blocks={s.blocks} locale={locale} />
              </Fragment>
            ))}
            <h2 id="questions">{t.common.quickAnswers}</h2>
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
            <h2 id="sources">{t.common.sources}</h2>
            <ul className="sources">
              {sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav className="toc" aria-label={t.common.onThisPage}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.h}
              </a>
            ))}
            <a href="#questions">{t.common.quickAnswers}</a>
            <a href="#sources">{t.common.sources}</a>
          </nav>
        </div>
      </section>
    </>
  );
}
