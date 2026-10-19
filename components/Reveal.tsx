"use client";

import { useEffect } from "react";

/**
 * Motion, all of it progressive: without JavaScript the html.js class is never set and nothing is
 * hidden or moved.
 *  - .rv elements get .in as they enter the viewport (fade up; photographs inside clip in and
 *    settle from a slight zoom; .stagger children follow one another)
 *  - [data-parallax] elements drift against the scroll
 * Checks run on scroll and resize as well as through an IntersectionObserver, because observers
 * stay silent in hidden or throttled documents and a section must never stay invisible.
 */
export function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pending = false;
    const check = () => {
      pending = false;
      const limit = window.innerHeight * 0.94;
      document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < limit) el.classList.add("in");
      });
      if (!reduce) {
        const mid = window.innerHeight / 2;
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          const f = Number(el.dataset.parallax) || 0.12;
          el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - mid) * -f).toFixed(1)}px, 0)`;
        });
      }
    };
    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(check);
      setTimeout(check, 60);
    };
    const index = () => document.querySelectorAll<HTMLElement>(".stagger").forEach((p) => Array.from(p.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i))));
    index();
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const e of entries) if (e.isIntersecting) e.target.classList.add("in");
            },
            { rootMargin: "0px 0px -6% 0px" },
          )
        : null;
    const observeAll = () => io && document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(() => {
      index();
      observeAll();
      schedule();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    const safety = window.setTimeout(() => document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => el.classList.add("in")), 6000);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      io?.disconnect();
      mo.disconnect();
      window.clearTimeout(safety);
    };
  }, []);
  return null;
}
