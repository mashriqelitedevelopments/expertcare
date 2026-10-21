"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow, Close, Grid } from "./Icons";

type Labels = { view: string; of: string; close: string; prev: string; next: string; open: string; photo: string };

/**
 * A thumbnail strip with a "View gallery (n)" button, opening a full-screen lightbox. The
 * pictures are rendered on the server and passed in, so this only adds the open, step and close
 * behaviour. Arrow keys step, Escape closes, a swipe steps on touch.
 */
export function Gallery({ thumbs, slides, labels }: { thumbs: React.ReactNode[]; slides: React.ReactNode[]; labels: Labels }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const n = slides.length;
  const touch = useRef<number | null>(null);

  const open = (at: number) => {
    setI(at);
    ref.current?.showModal();
    document.documentElement.classList.add("has-modal");
  };
  const close = useCallback(() => ref.current?.close(), []);
  const step = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onClose = () => document.documentElement.classList.remove("has-modal");
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("close", onClose);
    window.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      window.removeEventListener("keydown", onKey);
    };
  }, [step]);

  return (
    <div className="gal">
      <ul className="gal-thumbs">
        {thumbs.map((t, k) => (
          <li key={k}>
            <button type="button" onClick={() => open(k)} aria-label={`${labels.open} ${k + 1} ${labels.of} ${n}`}>
              {t}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="gal-all" onClick={() => open(0)}>
        <Grid />
        {labels.view} ({n})
      </button>

      <dialog
        ref={ref}
        className="lightbox"
        aria-label={labels.view}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0]!.clientX - touch.current;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <div className="lightbox-top">
          <span className="lightbox-count" aria-live="polite">
            {labels.photo} {i + 1} {labels.of} {n}
          </span>
          <button type="button" className="lightbox-btn" onClick={close} aria-label={labels.close}>
            <Close />
          </button>
        </div>
        <div className="lightbox-stage">
          {slides.map((s, k) => (
            <div key={k} className={`lightbox-slide${k === i ? " is-on" : ""}`} aria-hidden={k !== i}>
              {s}
            </div>
          ))}
        </div>
        {n > 1 && (
          <div className="lightbox-nav">
            <button type="button" className="lightbox-btn" onClick={() => step(-1)} aria-label={labels.prev}>
              <span className="flip">
                <Arrow />
              </span>
            </button>
            <button type="button" className="lightbox-btn" onClick={() => step(1)} aria-label={labels.next}>
              <Arrow />
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
