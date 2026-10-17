import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { PropertySearch } from "@/components/PropertySearch";
import { Eyebrow, Hero, Plate } from "@/components/Sections";
import { getGuide, getListings } from "@/lib/content";
import { FEES } from "@/lib/costs";
import { lp } from "@/lib/i18n";
import { developers } from "@/lib/listings";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export function OffPlan({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const o = t.offPlan;
  const all = getListings(locale).filter((l) => l.status === "off-plan");
  const guide = getGuide(locale, "buying-off-plan-in-dubai");
  const guidePath = "/guides/buying-off-plan-in-dubai/";
  return (
    <>
      <Hero
        small
        image="l-creek"
        locale={locale}
        crumbs={[
          { name: t.chrome.home, path: "/" },
          { name: t.footer.offPlanHomes, path: "/off-plan/" },
        ]}
        h1={o.h1}
        lede={o.lede}
      />

      <section className="wrap figs" aria-label={o.figsAria}>
        <div>
          <strong className="num">{all.length}</strong>
          <span>{o.figProjects}</span>
        </div>
        <div>
          <strong className="num">{developers().length}</strong>
          <span>{o.figDevelopers}</span>
        </div>
        <div>
          <strong className="num">{Math.round(FEES.transferPct * 100)}%</strong>
          <span>{o.figOqood}</span>
        </div>
        <div>
          <strong className="num">{all.filter((l) => l.plan).length}</strong>
          <span>{o.figPlans}</span>
        </div>
      </section>

      <PropertySearch locale={locale} fixedStatus="off-plan" level="h2" />

      <section className="sec sand" aria-labelledby="how-h">
        <div className="wrap twin">
          <div>
            <Eyebrow plain>{o.howEyebrow}</Eyebrow>
            <h2 id="how-h" style={{ marginTop: 18 }}>
              {o.howH}
            </h2>
            <div className="btns">
              <Link href={lp(locale, guidePath)} className="more">
                {o.guideLink} <Arrow />
              </Link>
            </div>
          </div>
          <div className="ladder">
            {o.how.map((p) => (
              <div key={p.t}>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {guide && (
        <Plate image="area-dubai-creek-harbour" h2={guide.title} lede={guide.dek} caption={o.plateCaption} locale={locale}>
          <Link href={lp(locale, guidePath)} className="btn btn-clay">
            {o.guideLink}
          </Link>
        </Plate>
      )}
    </>
  );
}
