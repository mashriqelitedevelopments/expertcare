import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Pic } from "@/components/Pic";
import { Hero } from "@/components/Sections";
import { getGuides } from "@/lib/content";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const n = t.notFound;
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: n.crumb, path: "/404/" },
  ];
  return (
    <>
      <Hero
        small
        image="hero"
        crumbs={crumbs}
        h1={n.h1}
        lede={n.lede}
        locale={locale}
        foot={
          <div className="btns">
            <Link href={lp(locale, "/properties/")} className="btn">
              {n.browse}
            </Link>
            <Link href={lp(locale, "/guides/")} className="btn btn-ghost">
              {n.guides}
            </Link>
            <Link href={lp(locale, "/")} className="btn btn-ghost">
              {n.home}
            </Link>
          </div>
        }
      />
      {/* A light section between the photo and the dark footer: two dark blocks never touch. */}
      <section className="sec" aria-labelledby="nf-guides-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="nf-guides-h">{n.guidesH}</h2>
            <Link href={lp(locale, "/guides/")} className="more">
              {t.common.allGuides} <Arrow />
            </Link>
          </div>
          <div className="ledger">
            {getGuides(locale)
              .slice(0, 3)
              .map((g) => (
                <article key={g.slug} className="row">
                  <div className="row-media">
                    <Pic name={g.image} sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw" locale={locale} />
                  </div>
                  <div className="row-title">
                    <h3>
                      <Link href={lp(locale, `/guides/${g.slug}/`)} className="row-link">
                        {g.title}
                      </Link>
                    </h3>
                    <p className="m">{g.topic}</p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
