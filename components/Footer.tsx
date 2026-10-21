import Link from "next/link";
import { Logo } from "./Mark";
import { collections } from "@/lib/collections";
import { getAreas, getGuides, getListings, getServices } from "@/lib/content";
import { collectionH1 } from "@/views/Collection";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

export function Footer({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const f = t.footer;
  const areas = getAreas(locale);
  const guides = getGuides(locale).slice(0, 7);
  const services = getServices(locale);
  const all = getListings(locale);
  const cols = collections();
  const popular = [
    { key: "area", h: t.popular.byArea, items: cols.filter((c) => c.kind === "type-area" || c.kind === "beds-area" || c.kind === "community") },
    { key: "type", h: t.popular.byType, items: cols.filter((c) => c.kind === "type") },
    { key: "budget", h: t.popular.byBudget, items: cols.filter((c) => c.kind === "budget") },
    { key: "developer", h: t.popular.byDeveloper, items: cols.filter((c) => c.kind === "developer") },
  ].filter((g) => g.items.length > 0);
  const L = (path: string) => lp(locale, path);
  const social = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="ftr ink">
      <div className="wrap">
        <div className="marquee-line" aria-hidden="true">
          <div className="marquee-track-line">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k}>
                {[site.name, f.mq1, f.mq2, f.mq3, f.mq4].map((w) => (
                  <em key={w}>{w}</em>
                ))}
              </span>
            ))}
          </div>
        </div>
        <div className="ftr-top">
          <div className="ftr-brand">
            <Link href={L("/")} aria-label={t.chrome.homeAria}>
              <Logo />
            </Link>
            <p className="ftr-note">{f.note}</p>
            {social.length > 0 && (
              <ul className="ftr-social">
                {social.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} rel="noopener noreferrer" target="_blank">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <nav aria-labelledby="f-services">
            <h2 id="f-services">{t.services.crumb}</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={L(servicePath(s.slug))}>{s.short}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="f-homes">
            <h2 id="f-homes">{f.homes}</h2>
            <ul>
              <li>
                <Link href={L("/properties/")}>{f.propertyForSale}</Link>
              </li>
              <li>
                <Link href={L("/off-plan/")}>{f.offPlanHomes}</Link>
              </li>
              <li>
                <Link href={L("/buy/apartments-for-sale-in-dubai/")}>{f.apartments}</Link>
              </li>
              <li>
                <Link href={L("/buy/villas-for-sale-in-dubai/")}>{f.villas}</Link>
              </li>
              <li>
                <Link href={L("/dubai-property-prices/")}>{f.prices}</Link>
              </li>
              <li>
                <Link href={L("/shortlist/")}>{f.yourShortlist}</Link>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="f-areas">
            <h2 id="f-areas">{f.areas}</h2>
            <ul>
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={L(`/areas/${a.slug}/`)}>{a.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="f-guides">
            <h2 id="f-guides">{f.guides}</h2>
            <ul>
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={L(`/guides/${g.slug}/`)}>{g.title}</Link>
                </li>
              ))}
              <li>
                <Link href={L("/guides/")}>{f.allGuides}</Link>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="f-company">
            <h2 id="f-company">{f.company}</h2>
            <ul>
              <li>
                <Link href={L("/about/")}>{f.about}</Link>
              </li>
              <li>
                <Link href={L("/contact/")}>{f.contact}</Link>
              </li>
              <li>
                <Link href={L("/faq/")}>{f.faq}</Link>
              </li>
              <li>
                <Link href={L("/dubai-property-facts/")}>{f.facts}</Link>
              </li>
              <li>
                <Link href={L("/dubai-property-glossary/")}>{f.glossary}</Link>
              </li>
              <li>
                <Link href={L("/buying-costs/")}>{f.buyingCosts}</Link>
              </li>
              <li>
                <Link href={L("/mortgage-calculator/")}>{f.mortgage}</Link>
              </li>
              <li>
                <Link href={L("/privacy/")}>{f.privacy}</Link>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="ftr-popular" aria-labelledby="f-popular">
          <h2 id="f-popular">{t.popular.h}</h2>
          <div className="ftr-popular-grid">
            {popular.map((g) => (
              <div key={g.key} className={`ftr-popular-col${g.key === "area" ? " is-wide" : ""}`}>
                <h3>{g.h}</h3>
                <ul>
                  {g.items.map((c) => (
                    <li key={c.slug}>
                      <Link href={L(`/buy/${c.slug}/`)}>{collectionH1(locale, c, all)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        <div className="ftr-base">
          <span>{f.rights}</span>
          {site.orn && (
            <span>
              {f.orn} {site.orn}
            </span>
          )}
          {site.licence && (
            <span>
              {f.licence} {site.licence}
            </span>
          )}
          <span>{site.address}</span>
        </div>
      </div>
    </footer>
  );
}
