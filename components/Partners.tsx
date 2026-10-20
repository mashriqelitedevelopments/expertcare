import type { Locale } from "@/lib/locale";
import { PARTNERS } from "@/lib/partners";
import { BASE } from "@/lib/base";
import { ui } from "@/lib/ui";

/**
 * The partner marquee: every logo is a CSS mask filled with the ink colour, so each mark reads in
 * the same weight and colour whatever its original palette. The track is rendered twice so the
 * loop is seamless; it pauses on hover and stands still under prefers-reduced-motion.
 * Files and their sources: public/img/logos/SOURCES.md. The list lives in lib/partners.ts.
 */
export function Partners({ locale }: { locale: Locale }) {
  const t = ui(locale).home;
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <section className="partners" aria-labelledby="partners-h">
      <div className="wrap">
        <h2 id="partners-h" className="partners-h">
          {t.partnersH}
        </h2>
      </div>
      <div className="marquee" dir="ltr">
        <ul className="marquee-track">
          {items.map((d, i) => (
            <li key={`${d.slug}-${i}`} aria-hidden={i >= PARTNERS.length}>
              <span className="partner-logo" role="img" aria-label={d.name} style={{ width: d.w, height: d.h ?? 26, WebkitMaskImage: `url(${BASE}/img/logos/${d.file})`, maskImage: `url(${BASE}/img/logos/${d.file})` }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
