import { BuyingCosts } from "@/views/Tools";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.costsTitle,
  description: t.meta.costsDesc,
  path: "/buying-costs/",
});

export default function Page() {
  return <BuyingCosts locale={LOCALE} />;
}
