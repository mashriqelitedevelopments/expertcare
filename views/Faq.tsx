import Link from "next/link";
import { Rich } from "@/components/Blocks";
import { Hero } from "@/components/Sections";
import { FAQ_GROUPS } from "@/lib/faq";
import { plainText } from "@/lib/format";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { JsonLd, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

export function Faq({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const f = t.faq;
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: f.crumb, path: "/faq/" },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-AE",
    mainEntity: FAQ_GROUPS.flatMap((g) => g.faqs).map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: plainText(q.a) } })),
  };
  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero small image="guide-keys" locale={locale} crumbs={crumbs} h1={f.h1} lede={f.lede} />
      <section className="sec">
        <div className="wrap article">
          <div className="prose faq-groups">
            {FAQ_GROUPS.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`}>
                <h2 id={`${g.id}-h`}>{g.h}</h2>
                <div className="faq">
                  {g.faqs.map((q) => (
                    <details key={q.q}>
                      <summary>{q.q}</summary>
                      <p>
                        <Rich text={q.a} locale={locale} />
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <aside className="aside">
            <nav className="toc" aria-labelledby="toc-h">
              <h2 id="toc-h" className="aside-h">
                {t.common.onThisPage}
              </h2>
              <ol>
                {FAQ_GROUPS.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`}>{g.h}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="panel">
              <h2 className="aside-h">{f.stillH}</h2>
              <p className="aside-p">{f.stillP}</p>
              <Link href={lp(locale, "/contact/")} className="btn">
                {t.chrome.adviser}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
