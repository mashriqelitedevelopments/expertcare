import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Pic } from "@/components/Pic";
import { Hero } from "@/components/Sections";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID } from "@/lib/seo";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

export function Contact({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const c = t.contact;
  const contactLd = { "@context": "https://schema.org", "@type": "ContactPage", name: t.meta.contactTitle, description: t.meta.contactDesc, about: { "@id": ORG_ID } };
  return (
    <>
      <JsonLd data={contactLd} />
      <Hero
        small
        image="band-marina"
        locale={locale}
        crumbs={[
          { name: t.chrome.home, path: "/" },
          { name: t.footer.contact, path: "/contact/" },
        ]}
        h1={c.h1}
        lede={c.lede}
      />
      <section className="sec">
        <div className="wrap split top">
          <section id="brief" aria-labelledby="brief-h">
            <h2 id="brief-h">{c.briefH}</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              {c.briefLede}
            </p>
            <div className="calc-wrap">
              <EnquiryForm locale={locale} intent="brief" />
            </div>
          </section>
          <div>
            <h2>{c.findH}</h2>
            <dl className="contact-list">
              {site.whatsapp && (
                <div>
                  <dt>{c.whatsapp}</dt>
                  <dd>
                    <a href={`https://wa.me/${site.whatsapp}`} dir="ltr">
                      +{site.whatsapp}
                    </a>
                  </dd>
                </div>
              )}
              {site.phone && (
                <div>
                  <dt>{c.phone}</dt>
                  <dd>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              )}
              {site.email && (
                <div>
                  <dt>{c.email}</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} dir="ltr">
                      {site.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt>{c.office}</dt>
                <dd>{site.address}</dd>
              </div>
              <div>
                <dt>{c.hours}</dt>
                <dd>{c.hoursValue}</dd>
              </div>
            </dl>
            <h3 style={{ marginTop: 36 }}>{c.sellH}</h3>
            <p style={{ marginTop: 10 }}>{c.sellP}</p>
            <div className="btns">
              <Link href={`${lp(locale, "/sell/")}#enquire`} className="btn btn-ghost">
                {c.sellCta}
              </Link>
              <Link href={`${lp(locale, "/landlords/")}#enquire`} className="btn btn-ghost">
                {c.landlordCta}
              </Link>
            </div>
            <div className="split-media calc-wrap">
              <Pic name="area-downtown-dubai" sizes="(max-width: 900px) 100vw, 50vw" locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
