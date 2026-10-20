"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";
import { Pic } from "./Pic";
import { lp } from "@/lib/i18n";
import type { ImgKey } from "@/lib/images";
import type { Locale } from "@/lib/locale";

export type StoryItem = { key: string; title: string; text: string; cta: string; href: string; image: ImgKey; inset?: ImgKey; tags?: string[] };

/**
 * Chapters read down the left; on the right one photograph fills the viewport and stays pinned,
 * changing with the chapter in view, with a second smaller photograph layered over it and a
 * four-segment progress line. On a phone each chapter carries its own photograph.
 * The active chapter comes from scroll position (not an observer), so it works everywhere.
 */
export function Story({ h2, lede, items, locale, id }: { h2: string; lede?: string; items: StoryItem[]; locale: Locale; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let pending = false;
    const update = () => {
      pending = false;
      const blocks = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      const line = window.innerHeight * 0.5;
      let i = 0;
      blocks.forEach((b, n) => {
        if (b.getBoundingClientRect().top < line) i = n;
      });
      setActive(i);
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
      setTimeout(update, 80);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="story" ref={ref}>
      <div className="story-copy">
        <h2 className="rv" id={id}>
          {h2}
        </h2>
        {lede && <p className="lede rv">{lede}</p>}
        <ol className="story-steps">
          {items.map((it, i) => (
            <li key={it.key} className={`story-step rv${i === active ? " is-active" : ""}`} data-step={i}>
              <div className="story-step-media" aria-hidden="true">
                <Pic name={it.image} sizes="100vw" locale={locale} />
              </div>
              <h3>
                <Link href={lp(locale, it.href)} className="row-link">
                  {it.title}
                </Link>
              </h3>
              <p>{it.text}</p>
              {it.tags && it.tags.length > 0 && (
                <ul className="story-tags">
                  {it.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              <span className="more">
                {it.cta} <Arrow />
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="story-media" aria-hidden="true">
        <div className="story-frame">
          {items.map((it, i) => (
            <div key={it.key} className={`story-img${i === active ? " is-active" : ""}`}>
              <Pic name={it.image} sizes="(max-width: 900px) 100vw, 58vw" locale={locale} priority={i === 0} />
            </div>
          ))}
          <div className="story-inset">
            {items.map((it, i) => (
              <div key={it.key} className={`story-img${i === active ? " is-active" : ""}`}>
                <Pic name={it.inset ?? it.image} sizes="320px" locale={locale} />
              </div>
            ))}
          </div>
          <span className="story-caption">{items[active]?.title}</span>
          <div className="story-progress">
            {items.map((it, i) => (
              <i key={it.key} className={i === active ? "is-active" : undefined} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
