import { CostCalculator, MortgageCalculator } from "@/components/Calculators";
import { Crumbs, GuideLink } from "@/components/Sections";
import { getGuide } from "@/lib/content";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export function BuyingCosts({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const tools = t.guides.tools;
  return (
    <>
      <div className="wrap narrow phead">
        <Crumbs
          items={[
            { name: t.chrome.home, path: "/" },
            { name: t.costsPage.crumb, path: "/buying-costs/" },
          ]}
          locale={locale}
        />
        <h1>{t.costsPage.h1}</h1>
        <p className="lede">{t.costsPage.lede}</p>
      </div>
      <div className="wrap narrow">
        <CostCalculator locale={locale} />
      </div>
      <section className="sec">
        <div className="wrap narrow guide-list">
          <GuideLink g={getGuide(locale, "cost-of-buying-property-in-dubai")!} locale={locale} />
          <GuideLink g={tools[3]} locale={locale} />
        </div>
      </section>
    </>
  );
}

export function Mortgage({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const tools = t.guides.tools;
  return (
    <>
      <div className="wrap narrow phead">
        <Crumbs
          items={[
            { name: t.chrome.home, path: "/" },
            { name: t.mortgagePage.crumb, path: "/mortgage-calculator/" },
          ]}
          locale={locale}
        />
        <h1>{t.mortgagePage.h1}</h1>
        <p className="lede">{t.mortgagePage.lede}</p>
      </div>
      <div className="wrap narrow">
        <MortgageCalculator locale={locale} />
      </div>
      <section className="sec">
        <div className="wrap narrow guide-list">
          <GuideLink g={getGuide(locale, "mortgages-in-dubai")!} locale={locale} />
          <GuideLink g={tools[2]} locale={locale} />
        </div>
      </section>
    </>
  );
}

export function Shortlist({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = ui(locale);
  return (
    <>
      <div className="wrap phead">
        <h1>{t.shortlist.title}</h1>
      </div>
      <div className="wrap results">{children}</div>
    </>
  );
}
