import Link from "next/link";
import { Hero, nn } from "@/components/Sections";
import { getGlossary, getGuide } from "@/lib/content";
import { GLOSSARY_UPDATED } from "@/lib/glossary";
import { formatDate } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { JsonLd, ORG_ID, absL, breadcrumbs } from "@/lib/seo";
import { ui } from "@/lib/ui";

const PATH = "/dubai-property-glossary/";

const initial = (term: string) => term.trim().charAt(0).toUpperCase();

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
  const letters = Array.from(new Set(terms.map((x) => initial(x.term)))).sort();
  const groups = letters.map((L) => ({ L, id: `letter-${L.toLowerCase()}`, items: terms.filter((x) => initial(x.term) === L) }));
  const position = new Map(terms.map((x, i) => [x.id, i]));
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

      <section className="sec tight">
        <div className="wrap">
          <nav aria-label={t.glossary.az}>
            <ul className="chips">
              {groups.map((g) => (
                <li key={g.L}>
                  <a href={`#${g.id}`}>{g.L}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {groups.map((g) => (
        <section className="sec tight glossary-letter" id={g.id} key={g.L} aria-labelledby={`${g.id}-h`}>
          <div className="wrap">
            <div className="sec-head">
              <h2 id={`${g.id}-h`}>{g.L}</h2>
            </div>
            <div className="index no-thumb">
              {g.items.map((x) => (
                <article className="index-row" id={x.id} key={x.id}>
                  <span className="idx">{nn(position.get(x.id) ?? 0)}</span>
                  <div className="row-title">
                    <h3>{x.term}</h3>
                    {x.full && <p className="m">{x.full}</p>}
                  </div>
                  <p className="row-text">
                    {x.def}
                    {x.link && (
                      <>
                        {" "}
                        <Link href={lp(locale, x.link)}>{label(x.link)}</Link>
                      </>
                    )}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
