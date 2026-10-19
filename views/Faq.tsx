import Link from "next/link";
import { Rich } from "@/components/Blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Eyebrow, Hero } from "@/components/Sections";
import { FAQ_GROUPS } from "@/lib/faq";
import { plainText } from "@/lib/format";
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
  const total = FAQ_GROUPS.reduce((n, g) => n + g.faqs.length, 0);
  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero
        small
        image="keys-bowl"
        locale={locale}
        crumbs={crumbs}
        h1={f.h1}
        lede={f.lede}
        byline={`${total} ${f.answersWord} · ${FAQ_GROUPS.length} ${f.groupsWord}`}
        foot={
          <ul className="chips">
            {FAQ_GROUPS.map((g) => (
              <li key={g.id}>
                <Link href={`#${g.id}`}>{g.h}</Link>
              </li>
            ))}
          </ul>
        }
      />
      <section className="sec">
        <div className="wrap article">
          <div className="faq-groups">
            {FAQ_GROUPS.map((g, i) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`}>
                <Eyebrow n={i + 1}>{f.groupWord}</Eyebrow>
                <h2 id={`${g.id}-h`} style={{ marginTop: 14, marginBottom: 18 }}>
                  {g.h}
                </h2>
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
            <div className="panel">
              <h2 className="aside-h">{f.stillH}</h2>
              <p className="aside-p">{f.stillP}</p>
              <EnquiryForm locale={locale} intent="general" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
