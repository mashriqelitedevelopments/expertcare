import Link from "next/link";
import { ConsentChoice } from "@/components/Consent";
import { Crumbs } from "@/components/Sections";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

/** The "Measuring visits" block, which carries the consent choice. */
const MEASURE = 3;

export function Privacy({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const p = t.privacy;
  return (
    <>
      <div className="wrap narrow phead">
        <Crumbs
          items={[
            { name: t.chrome.home, path: "/" },
            { name: p.crumb, path: "/privacy/" },
          ]}
          locale={locale}
        />
        <h1>{p.h1}</h1>
        <p className="lede">{p.updated}</p>
      </div>
      <div className="wrap narrow">
        <div className="prose" style={{ paddingBottom: "var(--space)" }}>
          {p.blocks.map((b, i) => (
            <section key={b.h}>
              <h2>{b.h}</h2>
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
          <h2>{p.rightsH}</h2>
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
        </div>
      </div>
    </>
  );
}
