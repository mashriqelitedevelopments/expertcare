import Link from "next/link";
import { ConsentChoice } from "@/components/Consent";
import { Hero } from "@/components/Sections";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

const PATH = "/privacy/";

/** The "Measuring visits" block, which carries the consent choice. */
const MEASURE = 3;

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function Privacy({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const p = t.privacy;
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: p.crumb, path: PATH },
  ];
  const sections = p.blocks.map((b) => ({ ...b, id: slug(b.h) }));
  return (
    <>
      <Hero small image="area-business-bay" crumbs={crumbs} h1={p.h1} byline={p.updated} locale={locale} />

      <section className="sec">
        <div className="wrap article">
          <div className="prose">
            {sections.map((b, i) => (
              <section key={b.id}>
                <h2 id={b.id}>{b.h}</h2>
                {b.p.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                {i === MEASURE && <ConsentChoice locale={locale} />}
                {b.ul.length > 0 && (
                  <ul>
                    {b.ul.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section>
              <h2 id="rights">{p.rightsH}</h2>
              <p>
                {p.rightsP}{" "}
                {site.email ? (
                  <>
                    {p.rightsWrite} <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </>
                ) : (
                  <>
                    {p.rightsContact} <Link href={lp(locale, "/contact/")}>{p.rightsContactLink}</Link>.
                  </>
                )}
              </p>
            </section>
          </div>
          <aside className="aside">
            <nav className="toc" aria-label={t.common.onThisPage}>
              <h2>{t.common.onThisPage}</h2>
              <ol>
                {sections.map((b) => (
                  <li key={b.id}>
                    <a href={`#${b.id}`}>{b.h}</a>
                  </li>
                ))}
                <li>
                  <a href="#rights">{p.rightsH}</a>
                </li>
              </ol>
            </nav>
          </aside>
        </div>
      </section>
    </>
  );
}
