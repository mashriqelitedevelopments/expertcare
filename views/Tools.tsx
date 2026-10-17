import { CostCalculator, MortgageCalculator } from "@/components/Calculators";
import { Eyebrow, GuideLink, Hero } from "@/components/Sections";
import { getGuide } from "@/lib/content";
import type { ImgKey } from "@/lib/images";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

type Reading = Parameters<typeof GuideLink>[0]["g"];

/** The two calculator pages share one frame: the split hero, the calculator beside its explanation, then the guides that go with it. */
function ToolPage({
  locale,
  image,
  path,
  copy,
  calculator,
  reading,
}: {
  locale: Locale;
  image: ImgKey;
  path: string;
  copy: { h1: string; lede: string; crumb: string; explainH: string; explain: string[]; keypointsH: string; keypoints: string[] };
  calculator: React.ReactNode;
  reading: Reading[];
}) {
  const t = ui(locale);
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: copy.crumb, path },
  ];
  return (
    <>
      <Hero small image={image} crumbs={crumbs} h1={copy.h1} lede={copy.lede} locale={locale} />

      <section className="sec">
        <div className="wrap twin even">
          <div>{calculator}</div>
          <div className="prose">
            <aside className="keypoints" aria-labelledby="keypoints-h">
              <h2 id="keypoints-h">{copy.keypointsH}</h2>
              <ul>
                {copy.keypoints.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </aside>
            <h2 id="explain-h">{copy.explainH}</h2>
            {copy.explain.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight" aria-labelledby="reading-h">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <Eyebrow n={1}>{t.footer.guides}</Eyebrow>
              <h2 id="reading-h">{t.common.keepReading}</h2>
            </div>
          </div>
          <div className="index">
            {reading.map((g, i) => (
              <GuideLink key={g.slug} g={g} locale={locale} idx={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function BuyingCosts({ locale }: { locale: Locale }) {
  const t = ui(locale);
  return (
    <ToolPage
      locale={locale}
      image="guide-keys"
      path="/buying-costs/"
      copy={t.costsPage}
      calculator={<CostCalculator locale={locale} />}
      reading={[getGuide(locale, "cost-of-buying-property-in-dubai")!, t.guides.tools[3]]}
    />
  );
}

export function Mortgage({ locale }: { locale: Locale }) {
  const t = ui(locale);
  return (
    <ToolPage
      locale={locale}
      image="l-downtown"
      path="/mortgage-calculator/"
      copy={t.mortgagePage}
      calculator={<MortgageCalculator locale={locale} />}
      reading={[getGuide(locale, "mortgages-in-dubai")!, t.guides.tools[2]]}
    />
  );
}

export function Shortlist({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = ui(locale);
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: t.shortlist.title, path: "/shortlist/" },
  ];
  return (
    <>
      <Hero small image="l-marina" crumbs={crumbs} h1={t.shortlist.title} lede={t.meta.shortlistDesc} locale={locale} />
      <section className="sec">
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}
