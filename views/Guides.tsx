import { GuideLink, Hero } from "@/components/Sections";
import { getGuides } from "@/lib/content";
import { TOPICS } from "@/lib/guides";
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
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    itemListElement: [...guides.map((x) => ({ name: x.title, url: absL(locale, `/guides/${x.slug}/`) })), ...g.tools.map((x) => ({ name: x.title, url: absL(locale, x.href) }))].map(
      (it, i) => ({ "@type": "ListItem", position: i + 1, ...it }),
    ),
  };
  return (
    <>
      <JsonLd data={list} />
      <Hero
        small
        image="guide-keys"
        locale={locale}
        crumbs={[
          { name: t.chrome.home, path: "/" },
          { name: t.footer.guides, path: "/guides/" },
        ]}
        h1={g.h1}
        lede={g.lede}
      />
      <section className="sec">
        <div className="wrap">
          {TOPICS.map((topic) => {
            const inTopic = guides.filter((x) => x.topic === topic);
            if (inTopic.length === 0) return null;
            const id = `topic-${topic.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <section key={topic} className="guide-group" aria-labelledby={id}>
                <h2 id={id}>{g.topics[topic]}</h2>
                <div className="guide-list">
                  {inTopic.map((x) => (
                    <GuideLink key={x.slug} g={x} locale={locale} />
                  ))}
                </div>
              </section>
            );
          })}
          <section className="guide-group" aria-labelledby="topic-tools">
            <h2 id="topic-tools">{g.toolsH}</h2>
            <div className="guide-list">
              {g.tools.map((x) => (
                <GuideLink key={x.slug} g={x} locale={locale} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
