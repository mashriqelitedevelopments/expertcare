import Link from "next/link";
import { Arrow } from "./Icons";
import { Pic } from "./Pic";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import type { Service } from "@/lib/services";
import { ui } from "@/lib/ui";

export function ServiceCard({ s, locale }: { s: Service; locale: Locale }) {
  return (
    <article className="service rv">
      <Pic name={s.image} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" locale={locale} />
      <div className="service-in">
        <h3>{s.short}</h3>
        <p>{s.dek}</p>
        <p className="service-fee">{s.fees}</p>
        <Link href={lp(locale, servicePath(s.slug))} className="more">
          {ui(locale).common.readMore} <Arrow />
        </Link>
      </div>
    </article>
  );
}
