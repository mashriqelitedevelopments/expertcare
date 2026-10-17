import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

/**
 * The developers whose projects the site lists, as a continuous single-colour logo marquee.
 * Each logo is a CSS mask filled with the ink colour, so every mark reads in the same weight and
 * colour whatever its original palette. Files and their sources: public/img/logos/SOURCES.md.
 * The track is rendered twice so the loop is seamless; it pauses on hover and stops entirely for
 * visitors who prefer reduced motion.
 */
const DEVELOPERS: { slug: string; name: string; file: string; w: number }[] = [
  { slug: "mashriq-elite", name: "Mashriq Elite", file: "mashriq-elite.png", w: 200 },
  { slug: "sobha", name: "Sobha Realty", file: "sobha.svg", w: 110 },
  { slug: "damac", name: "DAMAC Properties", file: "damac.svg", w: 170 },
  { slug: "emaar", name: "Emaar", file: "emaar.svg", w: 170 },
  { slug: "nakheel", name: "Nakheel", file: "nakheel.svg", w: 170 },
  { slug: "ellington", name: "Ellington Properties", file: "ellington.png", w: 130 },
  { slug: "binghatti", name: "Binghatti", file: "binghatti.svg", w: 200 },
  { slug: "danube", name: "Danube Properties", file: "danube.png", w: 150 },
];

export function Partners({ locale }: { locale: Locale }) {
  const t = ui(locale).home;
  const items = [...DEVELOPERS, ...DEVELOPERS];
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
            <li key={`${d.slug}-${i}`} aria-hidden={i >= DEVELOPERS.length}>
              <span
                className="partner-logo"
                role="img"
                aria-label={d.name}
                style={{ width: d.w, WebkitMaskImage: `url(/img/logos/${d.file})`, maskImage: `url(/img/logos/${d.file})` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
