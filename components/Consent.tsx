"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GA4, consent, forgetAnalytics, onConsentChange, setConsent } from "@/lib/analytics";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

/**
 * The consent notice. Google Analytics loads only after "Allow measurement"; until the visitor
 * answers nothing loads and no cookie is set. Hidden until mounted, so it never flashes for a
 * visitor who answered before (and localStorage does not exist during the build).
 */
export function ConsentNotice({ locale }: { locale: Locale }) {
  const c = ui(locale).consent;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const sync = () => setShow(consent() === null);
    sync();
    return onConsentChange(sync);
  }, []);

  if (!show || !GA4) return null;

  return (
    <aside className="cons" role="region" aria-label={c.label}>
      <p>
        {c.body} <Link href={lp(locale, "/privacy/")}>{c.more}</Link>
      </p>
      <div className="cons-b">
        <button type="button" className="btn" onClick={() => setConsent(true)}>
          {c.accept}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setConsent(false)}>
          {c.decline}
        </button>
      </div>
    </aside>
  );
}

/** On the privacy page: the current answer, and the way to change it. */
export function ConsentChoice({ locale }: { locale: Locale }) {
  const c = ui(locale).consent;
  const [state, setState] = useState<"unset" | "on" | "off" | null>(null);

  useEffect(() => {
    const sync = () => {
      const v = consent();
      setState(v === null ? "unset" : v.analytics ? "on" : "off");
    };
    sync();
    return onConsentChange(sync);
  }, []);

  if (state === null || !GA4) return null;

  const withdraw = () => {
    setConsent(false);
    forgetAnalytics();
    location.reload();
  };

  return (
    <div className="cons-choice">
      <p>
        <strong>{state === "on" ? c.stateOn : state === "off" ? c.stateOff : c.stateUnset}</strong>
      </p>
      <div className="cons-b">
        {state !== "on" && (
          <button type="button" className="btn" onClick={() => setConsent(true)}>
            {c.accept}
          </button>
        )}
        {state !== "off" && (
          <button type="button" className="btn btn-ghost" onClick={withdraw}>
            {state === "on" ? c.withdraw : c.decline}
          </button>
        )}
      </div>
    </div>
  );
}
