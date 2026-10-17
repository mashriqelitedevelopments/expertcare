import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

/**
 * The developers whose projects the site lists, as a single-colour logo strip. Each logo is a
 * CSS mask filled with the ink colour, so every mark reads in the same weight and colour whatever
 * its original palette. Files and their sources: public/img/logos/SOURCES.md.
 */
const DEVELOPERS: { slug: string; name: string; file: string; w: number }[] = [
  { slug: "mashriq-elite", name: "Mashriq Elite", file: "mashriq-elite.png", w: 170 },
  { slug: "sobha", name: "Sobha Realty", file: "sobha.svg", w: 96 },
  { slug: "damac", name: "DAMAC Properties", file: "damac.svg", w: 150 },
  { slug: "emaar", name: "Emaar", file: "emaar.svg", w: 150 },
  { slug: "nakheel", name: "Nakheel", file: "nakheel.svg", w: 150 },
  { slug: "ellington", name: "Ellington Properties", file: "ellington.png", w: 116 },
  { slug: "binghatti", name: "Binghatti", file: "binghatti.svg", w: 170 },
  { slug: "danube", name: "Danube Properties", file: "danube.png", w: 130 },
];

export function Partners({ locale }: { locale: Locale }) {
  const t = ui(locale).home;
  return (
    <section className="wrap partners" aria-labelledby="partners-h">
      <h2 id="partners-h" className="partners-h">
        {t.partnersH}
      </h2>
      <ul className="marquee-track">
        {DEVELOPERS.map((d) => (
          <li key={d.slug}>
            <span className="partner-logo" role="img" aria-label={d.name} style={{ width: d.w, WebkitMaskImage: `url(/img/logos/${d.file})`, maskImage: `url(/img/logos/${d.file})` }} />
          </li>
        ))}
      </ul>
    </section>
  );
}
