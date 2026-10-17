import Link from "next/link";
import { Pic } from "@/components/Pic";
import { ServiceCard } from "@/components/ServiceCard";
import { Hero } from "@/components/Sections";
import { getServices } from "@/lib/content";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID } from "@/lib/seo";
import { PROMISES } from "@/lib/site";
import { ui } from "@/lib/ui";

export function About({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const a = t.about;
  const aboutLd = { "@context": "https://schema.org", "@type": "AboutPage", name: t.meta.aboutTitle, description: t.meta.aboutDesc, about: { "@id": ORG_ID } };
  return (
    <>
      <JsonLd data={aboutLd} />
      <Hero
        small
        image="viewing"
        locale={locale}
        crumbs={[
          { name: t.chrome.home, path: "/" },
          { name: t.footer.about, path: "/about/" },
        ]}
        h1={a.h1}
        lede={a.lede}
      />

      <section className="sec" aria-labelledby="name-h">
        <div className="wrap split">
          <div className="split-media rv">
            <Pic name="guide-keys" sizes="(max-width: 900px) 100vw, 50vw" locale={locale} />
          </div>
          <div>
            <h2 id="name-h" className="rv">
              {a.nameH}
            </h2>
            <div className="stack">
              <p className="lede rv">{a.nameP1}</p>
              <p className="rv">{a.nameP2}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec stone" aria-labelledby="what-h">
        <div className="wrap">
          <h2 id="what-h" className="rv" style={{ marginBottom: 32 }}>
            {a.whatH}
          </h2>
          <div className="services">
            {getServices(locale).map((s) => (
              <ServiceCard key={s.slug} s={s} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="promise-h">
        <div className="wrap narrow">
          <h2 id="promise-h" className="rv">
            {a.promiseH}
          </h2>
          <div className="promises">
            {PROMISES.map((p) => (
              <div key={p.title} className="rv">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec stone" aria-labelledby="steps-h">
        <div className="wrap narrow">
          <h2 id="steps-h" className="rv">
            {a.stepsH}
          </h2>
          <div className="steps" style={{ marginTop: 28 }}>
            {a.steps.map((s) => (
              <div key={s.t} className="rv">
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="compliance-h">
        <div className="wrap narrow">
          <h2 id="compliance-h" className="rv">
            {a.complianceH}
          </h2>
          <p className="lede rv" style={{ marginTop: 20 }}>
            {a.complianceP}
          </p>
          <div className="btns">
            <Link href={`${lp(locale, "/contact/")}#brief`} className="btn">
              {a.briefCta}
            </Link>
            <Link href={lp(locale, "/properties/")} className="btn btn-ghost">
              {a.browseCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
