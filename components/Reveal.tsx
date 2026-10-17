"use client";

import { useEffect } from "react";

/**
 * Marks the document as scripted and reveals .rv elements as they come into view. Without
 * JavaScript the html.js class is never set, so nothing is hidden. The check runs on scroll and
 * resize as well as through an IntersectionObserver, because observers stay silent in hidden or
 * throttled documents (preview panes, background tabs) and a section must never stay invisible.
 */
export function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    let pending = false;
    const check = () => {
      pending = false;
      const limit = window.innerHeight * 0.94;
      document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < limit) el.classList.add("in");
      });
    };
    const schedule = () => {
      if (pending) return;
      pending = true;
      setTimeout(check, 60);
    };
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
      observeAll();
      schedule();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // Anything still hidden after a while is revealed regardless, so a stalled observer never costs a section.
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
