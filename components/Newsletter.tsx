"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { track } from "@/lib/analytics";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { NEWSLETTER_TOPICS, subscribe } from "@/lib/newsletter";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

type State = { kind: "idle" } | { kind: "done"; email: string } | { kind: "email" } | { kind: "whatsapp" } | { kind: "offline" };

/**
 * The market-note sign-up: a photograph beside a light panel with one field. Posts to the
 * subscriber sheet when lib/newsletter.ts has its endpoint; until then it hands the request to the
 * brokerage's email or WhatsApp, like the enquiry forms.
 */
export function Newsletter({ locale, media, headingLevel = 2 }: { locale: Locale; media: React.ReactNode; headingLevel?: 2 | 3 }) {
  const t = ui(locale).newsletter;
  const id = useId();
  const [state, setState] = useState<State>({ kind: "idle" });
  const H = headingLevel === 2 ? "h2" : "h3";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // A filled honeypot is a bot: thank it and send nothing.
    if (String(data.get("company") ?? "")) return setState({ kind: "done", email: String(data.get("email")) });
    const email = String(data.get("email") ?? "").trim();
    const topics = data.getAll("topic").map((x) => t.topics[x as keyof typeof t.topics]);
    if (subscribe(email, topics)) {
      track("sign_up", { method: "newsletter" });
      return setState({ kind: "done", email });
    }
    const text = [t.request, `${t.label}: ${email}`, topics.length ? `${t.topicsLine}: ${topics.join(", ")}` : ""].filter(Boolean).join("\n");
    if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(text)}`;
      track("sign_up", { method: "newsletter_email" });
      return setState({ kind: "email" });
    }
    if (site.whatsapp) {
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      track("sign_up", { method: "newsletter_whatsapp" });
      return setState({ kind: "whatsapp" });
    }
    setState({ kind: "offline" });
  }

  const status =
    state.kind === "done" ? t.done.replace("{email}", state.email) : state.kind === "email" ? t.sentEmail : state.kind === "whatsapp" ? t.sentWhatsapp : state.kind === "offline" ? t.offline : "";

  return (
    <div className="news rv">
      <div className="news-media">{media}</div>
      <div className="news-body">
        <H id={`${id}-h`}>{t.h}</H>
        <p className="news-lede">{t.lede}</p>
        {state.kind === "done" ? (
          <p className="news-status news-done" role="status">
            {status}
          </p>
        ) : (
          <form className="news-form" onSubmit={submit} aria-labelledby={`${id}-h`}>
            <div className="news-bar">
              <label htmlFor={`${id}-email`} className="sr">
                {t.label}
              </label>
              <input id={`${id}-email`} name="email" type="email" required autoComplete="email" inputMode="email" dir="ltr" placeholder={t.placeholder} />
              <button type="submit" className="cta cta-solid">
                {t.submit}
              </button>
            </div>
            <div className="sr" aria-hidden="true">
              <label htmlFor={`${id}-company`}>Company</label>
              <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <fieldset className="news-topics">
              <legend>{t.topicsLegend}</legend>
              <div>
                {NEWSLETTER_TOPICS.map((k) => (
                  <label key={k}>
                    <input type="checkbox" name="topic" value={k} />
                    <span>{t.topics[k]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="news-note">
              {t.consent} <Link href={lp(locale, "/privacy/")}>{t.privacy}</Link>.
            </p>
            {status && (
              <p className="news-status" role="status">
                {status}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
