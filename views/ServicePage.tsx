import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, Rich } from "@/components/Blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arrow } from "@/components/Icons";
import { Eyebrow, Hero, IndexRow } from "@/components/Sections";
import { ServiceRow } from "@/components/ServiceCard";
import { getGuides, getService, getServices } from "@/lib/content";
import { plainText } from "@/lib/format";
import { ogImage } from "@/lib/images";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import { JsonLd, ORG_ID, abs, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

export function ServicePage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = ui(locale);
  const s = getService(locale, slug);
  if (!s) notFound();
  const path = servicePath(s.slug);
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: t.services.crumb, path: "/services/" },
    { name: s.short, path },
  ];
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.seoDescription,
    image: abs(ogImage(s.image)),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Dubai" },
    url: absL(locale, path),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-AE",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: s.title,
    description: s.summary.map(plainText).join(" "),
    step: s.steps.map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.t, text: plainText(st.d) })),
  };
  const guides = getGuides(locale).filter((g) => s.guides.includes(g.slug));
  const others = getServices(locale).filter((x) => x.slug !== s.slug).slice(0, 3);
  const sv = t.services;

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faq} />
      <JsonLd data={howTo} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero small image={s.image} crumbs={crumbs} h1={s.title} lede={s.dek} locale={locale} foot={
          <p className="note">
            <Rich text={s.fees} locale={locale} />
          </p>
        } />

      <section className="sec tight">
        <div className="wrap twin">
          <div className="keypoints">
            <h2>{sv.inShort}</h2>
            <ul>
              {s.summary.map((x) => (
                <li key={x}>
                  <Rich text={x} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow n={1}>{sv.stepsH}</Eyebrow>
            <div className="ladder" style={{ marginTop: 16 }}>
              {s.steps.map((st) => (
                <div key={st.t}>
                  <div>
                    <h3>{st.t}</h3>
                    <p>
                      <Rich text={st.d} locale={locale} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap article">
          <div className="prose">
            {s.sections.map((sec) => (
              <section key={sec.id} id={sec.id} aria-labelledby={`${sec.id}-h`}>
                <h2 id={`${sec.id}-h`}>{sec.h}</h2>
                <Blocks blocks={sec.blocks} locale={locale} />
              </section>
            ))}
            <section aria-labelledby="fees-h" id="fees">
              <h2 id="fees-h">{sv.feesH}</h2>
              <p className="note">
                <Rich text={s.fees} locale={locale} />
              </p>
            </section>
            <section aria-labelledby="faq-h">
              <h2 id="faq-h">{sv.faqH}</h2>
              <div className="faq">
                {s.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>
                      <Rich text={f.a} locale={locale} />
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>
          <aside className="aside">
            <nav className="toc" aria-labelledby="toc-h">
              <h2 id="toc-h">{t.common.onThisPage}</h2>
              <ol>
                {s.sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`}>{sec.h}</a>
                  </li>
                ))}
                <li>
                  <a href="#fees">{sv.feesH}</a>
                </li>
                <li>
                  <a href="#enquire">{sv.enquireH}</a>
                </li>
              </ol>
            </nav>
            <div className="panel" id="enquire">
              <p className="aside-ref">{s.short}</p>
              <h2 className="aside-h">{sv.enquireH}</h2>
              <p className="aside-p">{sv.enquireLede}</p>
              <EnquiryForm locale={locale} intent={s.intent} context={s.short} />
            </div>
          </aside>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="sec sand" aria-labelledby="guides-h">
          <div className="wrap">
            <div className="sec-head rv">
              <div>
                <Eyebrow n={2}>{sv.guidesEyebrow}</Eyebrow>
                <h2 id="guides-h">{sv.guidesH}</h2>
              </div>
              <Link href={lp(locale, "/guides/")} className="more">
                {t.common.allGuides} <Arrow />
              </Link>
            </div>
            <div className="index">
              {guides.slice(0, 4).map((g, i) => (
                <IndexRow key={g.slug} idx={i} title={g.title} text={g.dek} meta={g.topic} href={`/guides/${g.slug}/`} image={g.image} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec" aria-labelledby="other-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={3}>{sv.crumb}</Eyebrow>
              <h2 id="other-h">{sv.otherH}</h2>
            </div>
            <Link href={lp(locale, "/services/")} className="more">
              {t.home.allServices} <Arrow />
            </Link>
          </div>
          <div className="index">
            {others.map((x, i) => (
              <ServiceRow key={x.slug} s={x} locale={locale} idx={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
