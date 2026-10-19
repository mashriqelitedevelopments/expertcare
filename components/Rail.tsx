"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";

/** A horizontal, snap-scrolling rail with two arrows. Drag or swipe on touch; arrows move one card. */
export function Rail({ children, prevLabel, nextLabel }: { children: React.ReactNode; prevLabel: string; nextLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    read();
    el.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      el.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > *");
    const w = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="rail-wrap">
      <div className="rail" ref={ref}>
        {children}
      </div>
      <div className="rail-nav">
        <button type="button" className="rail-btn" onClick={() => step(-1)} disabled={edge.start} aria-label={prevLabel}>
          <span className="flip">
            <Arrow />
          </span>
        </button>
        <button type="button" className="rail-btn" onClick={() => step(1)} disabled={edge.end} aria-label={nextLabel}>
          <Arrow />
        </button>
      </div>
    </div>
  );
}
