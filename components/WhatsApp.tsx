import Link from "next/link";
import { WhatsAppIcon } from "./Icons";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { waLink } from "@/lib/contact";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

/** The fixed WhatsApp button. With a number in lib/site.ts it opens a chat; until then it leads
 * to the contact form, so the button is in place before the number is. */
export function WhatsApp({ locale }: { locale: Locale }) {
  const t = ui(locale).chrome;
  const inner = (
    <>
      <WhatsAppIcon />
      <span>{t.whatsapp}</span>
    </>
  );
  const cls = "wa";
  return site.whatsapp ? (
    <a className={cls} href={waLink(site.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label={t.whatsappAria}>
      {inner}
    </a>
  ) : (
    <Link className={cls} href={`${lp(locale, "/contact/")}#brief`} aria-label={t.whatsappAria}>
      {inner}
    </Link>
  );
}
