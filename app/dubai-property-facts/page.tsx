import { Facts } from "@/views/Facts";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.factsTitle,
  description: t.meta.factsDesc,
  path: "/dubai-property-facts/",
  image: "/img/area-business-bay-1280.jpg",
});

export default function Page() {
  return <Facts locale={LOCALE} />;
}
