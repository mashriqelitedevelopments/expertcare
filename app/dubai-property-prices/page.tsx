import { Prices } from "@/views/Prices";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.prices.metaTitle,
  description: t.prices.metaDesc,
  path: "/dubai-property-prices/",
  image: "/img/area-downtown-dubai-1280.jpg",
});

export default function Page() {
  return <Prices locale={LOCALE} />;
}
