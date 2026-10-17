"use client";

import { useEffect } from "react";
import { startAnalytics, track } from "@/lib/analytics";

/**
 * Starts measurement for a visitor who has allowed it, and counts every press on a WhatsApp link,
 * a telephone number or an email address as `generate_lead` with its method. One listener on the
 * document, so a contact link added later is counted without wiring. The enquiry form opens
 * WhatsApp or email from a button, so it calls track() itself.
 *
 * `data-lead` on an ancestor names where a lead came from; otherwise the header, the footer or
 * the nearest id is used.
 */
const METHODS: [RegExp, string][] = [
  [/^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)\//i, "whatsapp"],
  [/^tel:/i, "phone"],
  [/^mailto:/i, "email"],
];

function sourceOf(a: Element): string {
  const tagged = a.closest<HTMLElement>("[data-lead]")?.dataset.lead;
  if (tagged) return tagged;
  if (a.closest("header")) return "header";
  if (a.closest("footer")) return "footer";
  return a.closest("[id]")?.id || "page";
}

export function Analytics() {
  useEffect(() => {
    startAnalytics();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const method = METHODS.find(([re]) => re.test(a.getAttribute("href") ?? ""))?.[1];
      if (method) track("generate_lead", { method, lead_source: sourceOf(a) });
    };
    // auxclick too: a middle-click opens WhatsApp Web in a new tab just the same.
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);
  return null;
}
