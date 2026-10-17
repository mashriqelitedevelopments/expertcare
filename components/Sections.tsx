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

export function Hero({
  image,
  mobile,
  h1,
  lede,
  crumbs,
  byline,
  small = false,
  locale,
  children,
}: {
  image: ImgKey;
  mobile?: ImgKey;
  h1: string;
  lede?: string;
  crumbs?: Crumb[];
  byline?: string;
  small?: boolean;
  locale: Locale;
  children?: React.ReactNode;
}) {
  return (
    <section className={`hero on-photo${small ? " hero-sm" : ""}`}>
      <Pic name={image} mobile={mobile} priority sizes="100vw" className="hero-media" locale={locale} />
      <div className="wrap hero-in">
        {crumbs && <Crumbs items={crumbs} locale={locale} />}
        <h1>{h1}</h1>
        {lede && <p className="lede">{lede}</p>}
        {byline && <p className="byline">{byline}</p>}
        {children}
      </div>
    </section>
  );
}

export function Band({ image, h2, lede, locale, children }: { image: ImgKey; h2: string; lede?: string; locale: Locale; children?: React.ReactNode }) {
  return (
    <section className="band on-photo">
      <Pic name={image} sizes="100vw" locale={locale} />
      <div className="wrap band-in rv">
        <h2>{h2}</h2>
        {lede && <p className="lede">{lede}</p>}
        {children && <div className="btns">{children}</div>}
      </div>
    </section>
  );
}

export function AreaTile({ a, locale, sizes = "(max-width: 700px) 80vw, 25vw" }: { a: Area; locale: Locale; sizes?: string }) {
  const n = listingsInArea(locale, a.slug).length;
  return (
    <Link href={lp(locale, `/areas/${a.slug}/`)} className="tile">
      <Pic name={a.image} sizes={sizes} locale={locale} />
      <div className="tile-in">
        <h3>{a.name}</h3>
        <p>{a.card}</p>
        {n > 0 && (
          <p>
            {homeCount(locale, n)} {ui(locale).common.homesForSale}
          </p>
        )}
      </div>
    </Link>
  );
}

export function GuideLink({ g, locale }: { g: Pick<Guide, "slug" | "title" | "dek"> & { href?: string; cta?: string; image?: string }; locale: Locale }) {
  return (
    <article className={`guide rv${g.image ? " has-img" : ""}`}>
      {g.image && (
        <div className="guide-media">
          <Pic name={g.image as ImgKey} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" locale={locale} />
        </div>
      )}
      <h3>{g.title}</h3>
      <p>{g.dek}</p>
      <Link href={lp(locale, g.href ?? `/guides/${g.slug}/`)} className="more">
        {g.cta ?? ui(locale).common.readGuide} <Arrow />
      </Link>
    </article>
  );
}
