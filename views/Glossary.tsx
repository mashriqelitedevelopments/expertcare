import Link from "next/link";
import { Hero } from "@/components/Sections";
import { getGlossary, getGuide } from "@/lib/content";
import { GLOSSARY_UPDATED } from "@/lib/glossary";
import { formatDate } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

const PATH = "/dubai-property-glossary/";

export function Glossary({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const terms = getGlossary(locale);
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: t.footer.guides, path: "/guides/" },
    { name: t.glossary.h1, path: PATH },
  ];
  const label = (href: string) => {
    const slug = href.match(/^\/guides\/([^/]+)\/$/)?.[1];
    if (slug) return getGuide(locale, slug)?.title ?? t.glossary.readMore;
    return t.glossary.factsLabel;
  };
  const set = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": absL(locale, PATH),
    name: t.glossary.h1,
    description: t.meta.glossaryDesc,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    publisher: { "@id": ORG_ID },
    dateModified: GLOSSARY_UPDATED,
    hasDefinedTerm: terms.map((x) => ({
      "@type": "DefinedTerm",
      "@id": `${absL(locale, PATH)}#${x.id}`,
      name: x.term,
      ...(x.full ? { alternateName: x.full } : {}),
      description: x.def,
      inDefinedTermSet: absL(locale, PATH),
      url: `${absL(locale, PATH)}#${x.id}`,
    })),
  };

  return (
    <>
      <JsonLd data={set} />
      <JsonLd data={breadcrumbs(locale, crumbs)} />
      <Hero
        small
        image="area-dubai-creek-harbour"
        crumbs={crumbs}
        h1={t.glossary.h1}
        lede={t.glossary.lede}
        byline={`${t.common.updated} ${formatDate(GLOSSARY_UPDATED, locale)}`}
        locale={locale}
      />
      <section className="sec">
        <div className="wrap narrow">
          <nav className="letters" aria-label={t.glossary.termsNav}>
            {terms.map((x) => (
              <a key={x.id} href={`#${x.id}`}>
                {x.term}
              </a>
            ))}
          </nav>
          <dl className="terms">
            {terms.map((x) => (
              <div key={x.id} id={x.id}>
                <dt>
                  {x.term}
                  {x.full && <span>{x.full}</span>}
                </dt>
                <dd>
                  {x.def}
                  {x.link && (
                    <>
                      {" "}
                      <Link href={lp(locale, x.link)}>{label(x.link)}</Link>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
