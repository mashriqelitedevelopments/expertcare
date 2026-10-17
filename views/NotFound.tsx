import Link from "next/link";
import { Hero } from "@/components/Sections";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const n = t.notFound;
  const crumbs = [
    { name: t.chrome.home, path: "/" },
    { name: n.crumb, path: "/404/" },
  ];
  return (
    <Hero
      small
      image="hero"
      crumbs={crumbs}
      h1={n.h1}
      lede={n.lede}
      locale={locale}
      foot={
        <div className="btns">
          <Link href={lp(locale, "/properties/")} className="btn">
            {n.browse}
          </Link>
          <Link href={lp(locale, "/guides/")} className="btn btn-ghost">
            {n.guides}
          </Link>
          <Link href={lp(locale, "/")} className="btn btn-ghost">
            {n.home}
          </Link>
        </div>
      }
    />
  );
}
