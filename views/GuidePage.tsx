import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, Rich } from "@/components/Blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arrow } from "@/components/Icons";
import { Eyebrow, Hero, IndexRow } from "@/components/Sections";
import { getGuide, getGuides, getServices } from "@/lib/content";
import { plainText } from "@/lib/format";
import { formatDate } from "@/lib/guides";
import { ogImage } from "@/lib/images";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
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
    inLanguage: "en-AE",
    abstract: g.summary.map(plainText).join(" "),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absL(locale, path),
    citation: g.sources.map((s) => s.url),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-AE",
    mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
  const others = getGuides(locale).filter((x) => x.slug !== g.slug);
  const related = [...others.filter((x) => x.topic === g.topic), ...others.filter((x) => x.topic !== g.topic)].slice(0, 3);
  const service = getServices(locale).find((s) => s.guides.includes(g.slug));

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero
        small
        image={g.image}
        crumbs={crumbs}
        h1={g.title}
        lede={g.dek}
        byline={`${g.topic} · ${t.common.updated} ${formatDate(g.updated, locale)} · ${g.sources.length} ${t.common.sourcesWord}`}
        locale={locale}
      />

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
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>{s.h}</h2>
                <Blocks blocks={s.blocks} locale={locale} />
              </section>
            ))}
            <section id="questions" aria-labelledby="questions-h">
              <h2 id="questions-h">{t.common.questions}</h2>
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
            </section>
            <section id="sources" className="sources" aria-labelledby="sources-h">
              <h2 id="sources-h">{t.common.sources}</h2>
              <ul>
                {g.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <aside className="aside">
            <nav className="toc" aria-labelledby="toc-h">
              <h2 id="toc-h">{t.common.onThisPage}</h2>
              <ol>
                {g.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.h}</a>
                  </li>
                ))}
                <li>
                  <a href="#questions">{t.common.questions}</a>
                </li>
                <li>
                  <a href="#sources">{t.common.sources}</a>
                </li>
              </ol>
            </nav>
            {service && (
              <div className="panel">
                <p className="aside-ref">{t.services.crumb}</p>
                <h2 className="aside-h">{service.short}</h2>
                <p className="aside-p">{service.dek}</p>
                <Link href={lp(locale, servicePath(service.slug))} className="btn btn-ghost">
                  {t.common.readMore} <Arrow />
                </Link>
              </div>
            )}
            <div className="panel">
              <h2 className="aside-h">{t.common.askH}</h2>
              <p className="aside-p">{t.common.askP}</p>
              <EnquiryForm locale={locale} intent="general" context={g.title} />
            </div>
          </aside>
        </div>
      </section>

      <section className="sec sand" aria-labelledby="related-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={g.sections.length + 1}>{t.common.keepReading}</Eyebrow>
              <h2 id="related-h">{t.common.relatedH}</h2>
            </div>
            <Link href={lp(locale, "/guides/")} className="more">
              {t.common.allGuides} <Arrow />
            </Link>
          </div>
          <div className="index">
            {related.map((x, i) => (
              <IndexRow key={x.slug} idx={i} title={x.title} text={x.dek} meta={x.topic} href={`/guides/${x.slug}/`} image={x.image} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
