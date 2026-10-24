import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Eyebrow, Hero } from "@/components/Sections";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID } from "@/lib/seo";
import { displayPhone } from "@/lib/contact";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

export function Contact({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const c = t.contact;
  const contactLd = { "@context": "https://schema.org", "@type": "ContactPage", name: t.meta.contactTitle, description: t.meta.contactDesc, about: { "@id": ORG_ID } };
  const routes: { h: string; p: string; href: string; cta: string }[] = [
    { h: c.routeBuyH, p: c.routeBuyP, href: "#brief", cta: t.about.briefCta },
    { h: c.routeRentH, p: c.routeRentP, href: `${lp(locale, "/services/off-plan-advisory/")}#enquire`, cta: c.rentCta },
    { h: c.routeSellH, p: c.routeSellP, href: `${lp(locale, "/sell/")}#enquire`, cta: c.sellCta },
    { h: c.routeLetH, p: c.routeLetP, href: `${lp(locale, "/landlords/")}#enquire`, cta: c.landlordCta },
  ];
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
        caption="Dubai Marina"
        foot={
          <dl className="contact-list">
            {site.whatsapp && (
              <div>
                <dt>{c.whatsapp}</dt>
                <dd>
                  <a href={`https://wa.me/${site.whatsapp}`} dir="ltr">
                    {displayPhone(site.whatsapp)}
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
            {site.hours && (
              <div>
                <dt>{c.hours}</dt>
                <dd>{site.hours}</dd>
              </div>
            )}
          </dl>
        }
      />
      <section className="sec tight">
        <div className="wrap cols cols-4">
          {routes.map((r, i) => (
            <div key={r.h}>
              <Eyebrow n={i + 1}>{c.routeEyebrow}</Eyebrow>
              <h3 style={{ marginTop: 14 }}>{r.h}</h3>
              <p style={{ marginTop: 10 }}>{r.p}</p>
              <div className="btns">
                <Link href={r.href} className="btn btn-ghost">
                  {r.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="sec sand">
        <div className="wrap twin">
          <div>
            <Eyebrow n={5}>{c.briefEyebrow}</Eyebrow>
            <h2 id="brief-h" style={{ marginTop: 18 }}>
              {c.briefH}
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              {c.briefLede}
            </p>
          </div>
          <div className="panel" id="brief">
            <EnquiryForm locale={locale} intent="brief" />
          </div>
        </div>
      </section>
    </>
  );
}
