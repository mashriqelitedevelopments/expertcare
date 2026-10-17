import Link from "next/link";
import { Arrow } from "./Icons";
import { Pic } from "./Pic";
import type { Area } from "@/lib/areas";
import { listingsInArea } from "@/lib/content";
import { homeCount } from "@/lib/format";
import type { Guide } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import type { ImgKey } from "@/lib/images";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export type Crumb = { name: string; path: string };

export function Crumbs({ items, locale }: { items: Crumb[]; locale: Locale }) {
  return (
    <nav aria-label={ui(locale).common.breadcrumb}>
      <ol className="crumbs">
        {items.map((it, i) => (
          <li key={it.path}>
            {i === items.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={lp(locale, it.path)}>{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Two-digit index for eyebrows and lists. */
export const nn = (i: number) => String(i + 1).padStart(2, "0");

/** Section labels are gone from the design: the heading carries the section on its own. */
export function Eyebrow(_props: { n?: string | number; children?: React.ReactNode; plain?: boolean }) {
  return null;
}

/** The hero: a full-bleed photograph with the type in its lower left. */
export function Hero({
  image,
  mobile,
  h1,
  lede,
  crumbs,
  byline,
  caption,
  small = false,
  locale,
  children,
  foot,
}: {
  image: ImgKey;
  mobile?: ImgKey;
  h1: React.ReactNode;
  lede?: string;
  crumbs?: Crumb[];
  byline?: string;
  eyebrow?: string;
  caption?: string;
  small?: boolean;
  locale: Locale;
  children?: React.ReactNode;
  foot?: React.ReactNode;
}) {
  return (
    <section className={`hero on-photo${small ? " hero-sm" : ""}`}>
      <div className="hero-media">
        <Pic name={image} mobile={mobile} priority sizes="100vw" locale={locale} />
        {caption && <span className="caption">{caption}</span>}
      </div>
      <div className="hero-copy">
        <div>
          {crumbs && <Crumbs items={crumbs} locale={locale} />}
          <h1>{h1}</h1>
          {lede && <p className="lede">{lede}</p>}
          {byline && <p className="byline">{byline}</p>}
          {children}
        </div>
        {foot}
      </div>
    </section>
  );
}

/** A full-bleed photograph with a bone card sitting on its lower edge. */
export function Plate({ image, h2, lede, caption, locale, children }: { image: ImgKey; h2: string; lede?: string; caption?: string; locale: Locale; children?: React.ReactNode }) {
  return (
    <section className="plate on-photo">
      <Pic name={image} sizes="100vw" locale={locale} />
      {caption && <span className="caption">{caption}</span>}
      <div className="plate-card rv">
        <h2>{h2}</h2>
        {lede && <p>{lede}</p>}
        {children && <div className="btns">{children}</div>}
      </div>
    </section>
  );
}
export const Band = Plate;

export function AtlasTile({ a, locale, idx, sizes = "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" }: { a: Area; locale: Locale; idx?: number; sizes?: string }) {
  const n = listingsInArea(locale, a.slug).length;
  const t = ui(locale);
  return (
    <Link href={lp(locale, `/areas/${a.slug}/`)}>
      <div className="atlas-media">
        <Pic name={a.image} sizes={sizes} locale={locale} />
      </div>
      <div className="atlas-in">
        <h3>{a.name}</h3>
        {idx !== undefined && <span className="idx">{nn(idx)}</span>}
        <span className="m">
          {a.developer}
          {n > 0 ? ` · ${homeCount(locale, n)} ${t.common.homesForSale}` : ""}
        </span>
        <p>{a.card}</p>
      </div>
    </Link>
  );
}
export const AreaTile = AtlasTile;

/** One ruled row of an index: number, title, text, an optional thumbnail, an arrow. */
export function IndexRow({
  idx,
  title,
  text,
  meta,
  href,
  image,
  locale,
  sizes = "180px",
}: {
  idx: number;
  title: string;
  text?: string;
  meta?: string;
  href: string;
  image?: ImgKey;
  locale: Locale;
  sizes?: string;
}) {
  return (
    <article className="index-row">
      <span className="idx">{nn(idx)}</span>
      <div className="row-title">
        <h3>
          <Link href={lp(locale, href)} className="row-link">
            {title}
          </Link>
        </h3>
        {meta && <p className="m">{meta}</p>}
      </div>
      {text && <p className="row-text">{text}</p>}
      {image && (
        <div className="thumb">
          <Pic name={image} sizes={sizes} locale={locale} />
        </div>
      )}
      <span className="row-arrow" aria-hidden="true">
        <Arrow />
      </span>
    </article>
  );
}

export function GuideLink({ g, locale, idx = 0 }: { g: Pick<Guide, "slug" | "title" | "dek"> & { href?: string; image?: string; topic?: string; updated?: string }; locale: Locale; idx?: number }) {
  return <IndexRow idx={idx} title={g.title} text={g.dek} meta={g.topic} href={g.href ?? `/guides/${g.slug}/`} image={g.image as ImgKey | undefined} locale={locale} />;
}
