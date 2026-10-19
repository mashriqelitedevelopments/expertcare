import Link from "next/link";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

/** The fixed WhatsApp button. With a number in lib/site.ts it opens a chat; until then it leads
 * to the contact form, so the button is in place before the number is. */
export function WhatsApp({ locale }: { locale: Locale }) {
  const t = ui(locale).chrome;
  const inner = (
    <>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.3 4.4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.3s1 2.7 1.1 2.9c.2.2 2 3.1 4.9 4.2 2.4.9 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-1-2.2c-.2-.5-.4-.5-.6-.5h-.4z"
        />
      </svg>
      <span>{t.whatsapp}</span>
    </>
  );
  const cls = "wa";
  return site.whatsapp ? (
    <a className={cls} href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={t.whatsappAria}>
      {inner}
    </a>
  ) : (
    <Link className={cls} href={`${lp(locale, "/contact/")}#brief`} aria-label={t.whatsappAria}>
      {inner}
    </Link>
  );
}
