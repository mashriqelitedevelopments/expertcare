import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, Rich } from "@/components/Blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ServiceCard } from "@/components/ServiceCard";
import { GuideLink, Hero } from "@/components/Sections";
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
      <Hero small image={s.image} crumbs={crumbs} h1={s.title} lede={s.dek} locale={locale} />

      <section className="sec">
        <div className="wrap article">
          <div className="prose">
            <aside className="keypoints" aria-labelledby="in-short">
              <h2 id="in-short">{sv.inShort}</h2>
              <ul>
                {s.summary.map((x) => (
                  <li key={x}>
                    <Rich text={x} locale={locale} />
                  </li>
                ))}
              </ul>
            </aside>

            <h2 id="how">{sv.stepsH}</h2>
            <div className="steps">
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

            {s.sections.map((sec) => (
              <section key={sec.id} id={sec.id} aria-labelledby={`${sec.id}-h`}>
                <h2 id={`${sec.id}-h`}>{sec.h}</h2>
                <Blocks blocks={sec.blocks} locale={locale} />
              </section>
            ))}

            <div className="fee-box" id="fees">
              <h2>{sv.feesH}</h2>
              <p>
                <Rich text={s.fees} locale={locale} />
              </p>
            </div>

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
            <div className="panel" id="enquire">
              <h2 className="aside-h">{sv.enquireH}</h2>
              <p className="aside-p">{sv.enquireLede}</p>
              <EnquiryForm locale={locale} intent={s.intent} context={s.short} />
            </div>
          </aside>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="sec stone" aria-labelledby="guides-h">
          <div className="wrap">
            <h2 id="guides-h" className="rv" style={{ marginBottom: 28 }}>
              {sv.guidesH}
            </h2>
            <div className="guide-list">
              {guides.slice(0, 4).map((g) => (
                <GuideLink key={g.slug} g={g} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec" aria-labelledby="other-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="other-h">{sv.otherH}</h2>
            <Link href={lp(locale, "/services/")} className="more">
              {t.home.allServices}
            </Link>
          </div>
          <div className="services">
            {others.map((x) => (
              <ServiceCard key={x.slug} s={x} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
