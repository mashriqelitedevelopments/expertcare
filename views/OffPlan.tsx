import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Pic } from "@/components/Pic";
import { PropertySearch } from "@/components/PropertySearch";
import { Hero } from "@/components/Sections";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export function OffPlan({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const o = t.offPlan;
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
      <PropertySearch locale={locale} fixedStatus="off-plan" level="h2" />
      <section className="sec stone" aria-labelledby="how-h">
        <div className="wrap split">
          <div className="split-media rv">
            <Pic name="area-dubai-creek-harbour" sizes="(max-width: 900px) 100vw, 50vw" locale={locale} />
          </div>
          <div>
            <h2 id="how-h" className="rv">
              {o.howH}
            </h2>
            <div className="promises">
              {o.how.map((p) => (
                <div key={p.t} className="rv">
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
            <div className="btns">
              <Link href={lp(locale, "/guides/buying-off-plan-in-dubai/")} className="more">
                {o.guideLink} <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
