import { Properties } from "@/views/Properties";
import { pageMeta } from "@/lib/i18n";
import { SHOW_LISTINGS } from "@/lib/listings";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.propertiesTitle,
  description: SHOW_LISTINGS ? t.meta.propertiesDesc : t.noListings.propertiesDesc,
  path: "/properties/",
});

export default function Page() {
  return <Properties locale={LOCALE} />;
}
