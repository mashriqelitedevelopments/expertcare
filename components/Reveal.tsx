"use client";

import { useEffect } from "react";

/** Marks the document as scripted and reveals .rv elements as they enter the viewport.
 * Without JavaScript the html.js class is never set, so nothing is hidden. */
export function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const mo = new MutationObserver(() => document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => io.observe(el)));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
