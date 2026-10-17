"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { track } from "@/lib/analytics";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

export type Intent = "viewing" | "brief" | "general" | "valuation" | "landlord" | "tenant";

/**
 * A static site has no server to post to, so the form composes the enquiry and hands it to
 * WhatsApp (preferred) or email, whichever is set in lib/site.ts. With neither set it says so.
 * Intents: viewing and brief (buyers), valuation (sellers), landlord (management), tenant (renters).
 */
export function EnquiryForm({ locale, intent = "general", context }: { locale: Locale; intent?: Intent; context?: string }) {
  const t = ui(locale).form;
  const id = useId();
  const [sent, setSent] = useState<"" | "whatsapp" | "email" | "offline">("");
  const f = (k: string) => `${id}-${k}`;
  const keys = ["name", "phone", "email", "address", "sellWhen", "sellWhy", "units", "tenanted", "rentBudget", "moveIn", "when", "format", "budget", "areas", "type", "beds", "status", "finance", "timing", "message"] as const;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const rows = keys.map((k) => [t.labels[k], String(data.get(k) ?? "").trim()] as const).filter(([, v]) => v);
    const text = [`${t.subjects[intent]} ${t.from}`, context ? `${t.labels.home}: ${context}` : "", ...rows.map(([k, v]) => `${k}: ${v}`)].filter(Boolean).join("\n");
    if (site.whatsapp) {
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setSent("whatsapp");
      track("generate_lead", { method: "whatsapp", lead_source: `form_${intent}` });
    } else if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(t.subjects[intent])}&body=${encodeURIComponent(text)}`;
      setSent("email");
      track("generate_lead", { method: "email", lead_source: `form_${intent}` });
    } else {
      setSent("offline");
    }
  }

  const select = (k: keyof typeof t.options, label: string) => (
    <div className="input">
      <label htmlFor={f(k)}>{label}</label>
      <select id={f(k)} name={k} defaultValue="">
        <option value="">{t.choose}</option>
        {t.options[k].map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form className="form" onSubmit={submit}>
      <div className="inputs">
        <div className="input full">
          <label htmlFor={f("name")}>{t.name}</label>
          <input id={f("name")} name="name" autoComplete="name" required />
        </div>
        <div className="input">
          <label htmlFor={f("phone")}>{t.phone}</label>
          <input id={f("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" required />
        </div>
        <div className="input">
          <label htmlFor={f("email")}>{t.email}</label>
          <input id={f("email")} name="email" type="email" autoComplete="email" dir="ltr" />
        </div>
        {intent === "viewing" && (
          <>
            {select("when", t.when)}
            {select("format", t.format)}
            {select("finance", t.finance)}
            {select("timing", t.timing)}
          </>
        )}
        {intent === "brief" && (
          <>
            {select("budget", t.budget)}
            {select("finance", t.finance)}
            {select("type", t.type)}
            {select("beds", t.beds)}
            {select("status", t.status)}
            {select("timing", t.timing)}
            <div className="input full">
              <label htmlFor={f("areas")}>{t.areas}</label>
              <input id={f("areas")} name="areas" placeholder={t.areasPlaceholder} />
            </div>
          </>
        )}
        {intent === "valuation" && (
          <>
            <div className="input full">
              <label htmlFor={f("address")}>{t.address}</label>
              <input id={f("address")} name="address" placeholder={t.addressPlaceholder} required />
            </div>
            {select("type", t.type)}
            {select("beds", t.beds)}
            {select("tenanted", t.tenanted)}
            {select("sellWhen", t.sellWhen)}
            {select("sellWhy", t.sellWhy)}
          </>
        )}
        {intent === "landlord" && (
          <>
            <div className="input full">
              <label htmlFor={f("address")}>{t.address}</label>
              <input id={f("address")} name="address" placeholder={t.addressPlaceholder} />
            </div>
            {select("units", t.units)}
            {select("tenanted", t.tenanted)}
            {select("type", t.type)}
          </>
        )}
        {intent === "tenant" && (
          <>
            {select("rentBudget", t.rentBudget)}
            {select("type", t.type)}
            {select("beds", t.beds)}
            {select("moveIn", t.moveIn)}
            <div className="input full">
              <label htmlFor={f("areas")}>{t.areas}</label>
              <input id={f("areas")} name="areas" placeholder={t.areasPlaceholder} />
            </div>
          </>
        )}
        <div className="input full">
          <label htmlFor={f("message")}>{intent === "general" ? t.messageGeneral : t.messageElse}</label>
          <textarea id={f("message")} name="message" required={intent === "general"} />
        </div>
        <label className="check full">
          <input type="checkbox" required />
          <span>
            {t.consent} <Link href={lp(locale, "/privacy/")}>{t.consentLink}</Link>.
          </span>
        </label>
      </div>
      <button type="submit" className="btn">
        {intent === "viewing" ? t.submitViewing : intent === "brief" ? t.submitBrief : intent === "valuation" ? t.submitValuation : intent === "landlord" ? t.submitLandlord : intent === "tenant" ? t.submitTenant : t.submitGeneral}
      </button>
      <p className="form-status" role="status" hidden={!sent}>
        {sent === "whatsapp" && t.sentWhatsapp}
        {sent === "email" && t.sentEmail}
        {sent === "offline" && t.offline}
      </p>
    </form>
  );
}
