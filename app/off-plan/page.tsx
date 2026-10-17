import { OffPlan } from "@/views/OffPlan";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.offPlanTitle,
  description: t.meta.offPlanDesc,
  path: "/off-plan/",
  image: "/img/l-creek-1440.jpg",
});

export default function Page() {
  return <OffPlan locale={LOCALE} />;
}
