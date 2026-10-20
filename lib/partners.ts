/**
 * The developers shown in the partner marquee: the larger names first. Each entry names a file in
 * public/img/logos (documented in SOURCES.md) and the width the mark is drawn at, chosen so every
 * wordmark reads at the same visual weight; `h` overrides the 26px height for square lockups.
 */
export type Partner = { slug: string; name: string; file: string; w: number; h?: number };

export const PARTNERS: Partner[] = [
  { slug: "nakheel", name: "Nakheel", file: "nakheel.svg", w: 150 },
  { slug: "damac", name: "DAMAC Properties", file: "damac.svg", w: 150 },
  { slug: "aldar", name: "Aldar Properties", file: "aldar.png", w: 44, h: 44 },
  { slug: "arada", name: "Arada", file: "arada.svg", w: 165 },
  { slug: "wasl", name: "wasl", file: "wasl.png", w: 64 },
  { slug: "binghatti", name: "Binghatti", file: "binghatti.svg", w: 150 },
  { slug: "omniyat", name: "Omniyat", file: "omniyat.svg", w: 180 },
  { slug: "nshama", name: "Nshama", file: "nshama.svg", w: 210 },
  { slug: "imtiaz", name: "Imtiaz Developments", file: "imtiaz.svg", w: 92 },
  { slug: "samana", name: "Samana Developers", file: "samana.png", w: 80 },
];
