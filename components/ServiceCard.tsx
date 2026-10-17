import { IndexRow } from "./Sections";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import type { Service } from "@/lib/services";

/** A service as one row of the services index. */
export function ServiceRow({ s, locale, idx }: { s: Service; locale: Locale; idx: number }) {
  return <IndexRow idx={idx} title={s.short} text={s.dek} href={servicePath(s.slug)} image={s.image} locale={locale} />;
}
export const ServiceCard = ServiceRow;
