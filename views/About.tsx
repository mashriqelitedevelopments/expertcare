import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Eyebrow, Hero, Plate } from "@/components/Sections";
import { ServiceRow } from "@/components/ServiceCard";
import { getServices } from "@/lib/content";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID } from "@/lib/seo";
import { PROMISES, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export function About({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const a = t.about;
  const aboutLd = { "@context": "https://schema.org", "@type": "AboutPage", name: t.meta.aboutTitle, description: t.meta.aboutDesc, about: { "@id": ORG_ID } };
  const register: [string, string][] = [
    [a.regName, site.name],
    [a.regOrn, site.orn || a.pending],
    [a.regLicence, site.licence || a.pending],
    [a.regOffice, site.address],
    [a.regRegulator, "RERA, Dubai Land Department"],
  ];
  return (
    <>
      <JsonLd data={aboutLd} />
      <Hero
        small
        image="viewing-2"
        locale={locale}
        crumbs={[
          { name: t.chrome.home, path: "/" },
          { name: t.footer.about, path: "/about/" },
        ]}
        h1={a.h1}
        lede={a.lede}
        caption={a.heroCaption}
      />

      <section className="sec tight">
        <div className="wrap">
          <dl className="facts">
            {register.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="name-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={1}>{a.nameEyebrow}</Eyebrow>
            <h2 id="name-h" style={{ marginTop: 18 }}>
              {a.nameH}
            </h2>
          </div>
          <div className="cols cols-2">
            <div>
              <h3>{a.expertH}</h3>
              <p style={{ marginTop: 12 }}>{a.nameP1}</p>
            </div>
            <div>
              <h3>{a.careH}</h3>
              <p style={{ marginTop: 12 }}>{a.nameP2}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec ink" aria-labelledby="promise-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={2}>{a.promiseEyebrow}</Eyebrow>
            <h2 id="promise-h" style={{ marginTop: 18 }}>
              {a.promiseH}
            </h2>
          </div>
          <div className="ladder">
            {PROMISES.map((p) => (
              <div key={p.title}>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="steps-h">
        <div className="wrap twin">
          <div>
            <Eyebrow n={3}>{a.stepsEyebrow}</Eyebrow>
            <h2 id="steps-h" style={{ marginTop: 18 }}>
              {a.stepsH}
            </h2>
          </div>
          <div className="ladder">
            {a.steps.map((s) => (
              <div key={s.t}>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Plate image="area-downtown-dubai" h2={a.complianceH} lede={a.complianceP} caption="Downtown Dubai" locale={locale}>
        <Link href={lp(locale, "/dubai-property-facts/")} className="btn">
          {t.footer.facts}
        </Link>
      </Plate>

      <section className="sec" aria-labelledby="what-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={4}>{t.services.crumb}</Eyebrow>
              <h2 id="what-h">{a.whatH}</h2>
            </div>
            <Link href={`${lp(locale, "/contact/")}#brief`} className="more">
              {a.briefCta} <Arrow />
            </Link>
          </div>
          <div className="index">
            {getServices(locale).map((s, i) => (
              <ServiceRow key={s.slug} s={s} locale={locale} idx={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
