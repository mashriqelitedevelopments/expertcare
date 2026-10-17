import Link from "next/link";
import { AtlasTile, Eyebrow, Hero } from "@/components/Sections";
import { getAreas } from "@/lib/content";
import { lp } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import type { Locale } from "@/lib/locale";
import { JsonLd, abs, absL } from "@/lib/seo";
import { ui } from "@/lib/ui";

export function Areas({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const a = t.areas;
  const areas = getAreas(locale);
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: a.h1,
    inLanguage: "en-AE",
    itemListElement: areas.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: absL(locale, `/areas/${x.slug}/`), image: abs(ogImage(x.image)) })),
  };
  return (
    <>
      <JsonLd data={list} />
      <Hero
        small
        image="area-dubai-marina"
        locale={locale}
        crumbs={[
          { name: t.chrome.home, path: "/" },
          { name: t.footer.areas, path: "/areas/" },
        ]}
        h1={a.h1}
        lede={a.lede}
        caption="Dubai Marina"
        foot={
          <ul className="chips">
            {areas.map((x) => (
              <li key={x.slug}>
                <Link href={lp(locale, `/areas/${x.slug}/`)}>{x.name}</Link>
              </li>
            ))}
          </ul>
        }
      />
      <section className="sec tight" aria-labelledby="compare-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={1}>{a.compareEyebrow}</Eyebrow>
              <h2 id="compare-h">{a.compareH}</h2>
            </div>
          </div>
          <div className="tbl-wrap">
            <table className="tbl tbl-left tbl-wide">
              <thead>
                <tr>
                  <th scope="col">{a.thArea}</th>
                  <th scope="col">{a.thHomes}</th>
                  <th scope="col">{a.thSuits}</th>
                  <th scope="col">{a.thTransport}</th>
                  <th scope="col">{a.thDeveloper}</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((x) => (
                  <tr key={x.slug}>
                    <th scope="row">
                      <Link href={lp(locale, `/areas/${x.slug}/`)}>{x.name}</Link>
                    </th>
                    <td>{x.homes.join(". ")}</td>
                    <td>{x.suits.join(". ")}</td>
                    <td>{x.transport.join(". ")}</td>
                    <td>{x.developer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="atlas-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow n={2}>{a.atlasEyebrow}</Eyebrow>
              <h2 id="atlas-h">{a.atlasH}</h2>
            </div>
          </div>
          <div className="atlas">
            {areas.map((x, i) => (
              <AtlasTile key={x.slug} a={x} locale={locale} idx={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
