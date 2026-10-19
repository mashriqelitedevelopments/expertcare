import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Eyebrow, Hero, IndexRow } from "@/components/Sections";
import { getGuides } from "@/lib/content";
import { TOPICS } from "@/lib/guides";
import { lp } from "@/lib/i18n";
import type { ImgKey } from "@/lib/images";
import type { Locale } from "@/lib/locale";
import { JsonLd, absL } from "@/lib/seo";
import { ui } from "@/lib/ui";

export function Guides({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const g = t.guides;
  const guides = getGuides(locale);
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: g.h1,
    inLanguage: "en-AE",
    itemListElement: [...guides.map((x) => ({ name: x.title, url: absL(locale, `/guides/${x.slug}/`) })), ...g.tools.map((x) => ({ name: x.title, url: absL(locale, x.href) }))].map(
      (it, i) => ({ "@type": "ListItem", position: i + 1, ...it }),
    ),
  };
  let n = 0;
  return (
    <>
      <JsonLd data={list} />
      <Hero
        small
        image="desk"
        locale={locale}
        crumbs={[
          { name: t.chrome.home, path: "/" },
          { name: t.footer.guides, path: "/guides/" },
        ]}
        h1={g.h1}
        lede={g.lede}
        foot={
          <ul className="chips" aria-label={g.topicsLabel}>
            {TOPICS.map((topic) => (
              <li key={topic}>
                <a href={`#topic-${topic.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{g.topics[topic]}</a>
              </li>
            ))}
            <li>
              <a href="#topic-tools">{g.toolsH}</a>
            </li>
          </ul>
        }
      />
      <section className="sec">
        <div className="wrap">
          {TOPICS.map((topic, ti) => {
            const inTopic = guides.filter((x) => x.topic === topic);
            if (inTopic.length === 0) return null;
            const id = `topic-${topic.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <section key={topic} aria-labelledby={id} style={{ marginBottom: 56 }}>
                <div className="sec-head rv">
                  <div>
                    <Eyebrow n={ti + 1}>{g.topicsLabel}</Eyebrow>
                    <h2 id={id}>{g.topics[topic]}</h2>
                  </div>
                </div>
                <div className="index stagger rv">
                  {inTopic.map((x) => (
                    <IndexRow key={x.slug} idx={n++} title={x.title} text={x.dek} meta={`${t.common.updated} ${x.updated}`} href={`/guides/${x.slug}/`} image={x.image} locale={locale} />
                  ))}
                </div>
              </section>
            );
          })}
          <section aria-labelledby="topic-tools">
            <div className="sec-head rv">
              <div>
                <Eyebrow n={TOPICS.length + 1}>{g.toolsEyebrow}</Eyebrow>
                <h2 id="topic-tools">{g.toolsH}</h2>
              </div>
              <Link href={lp(locale, "/faq/")} className="more">
                {t.home.allFaq} <Arrow />
              </Link>
            </div>
            <div className="index stagger rv">
              {g.tools.map((x) => (
                <IndexRow key={x.slug} idx={n++} title={x.title} text={x.dek} meta={x.cta} href={x.href} image={x.image as ImgKey} locale={locale} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
