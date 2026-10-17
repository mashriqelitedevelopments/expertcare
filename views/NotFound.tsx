import Link from "next/link";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = ui(locale).notFound;
  return (
    <div className="wrap narrow phead" style={{ paddingBottom: "var(--space)" }}>
      <h1>{t.h1}</h1>
      <p className="lede">{t.lede}</p>
      <div className="btns">
        <Link href={lp(locale, "/properties/")} className="btn">
          {t.browse}
        </Link>
        <Link href={lp(locale, "/")} className="btn btn-ghost">
          {t.home}
        </Link>
      </div>
    </div>
  );
}
