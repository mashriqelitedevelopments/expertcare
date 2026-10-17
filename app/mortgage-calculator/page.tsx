import { Mortgage } from "@/views/Tools";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.mortgageTitle,
  description: t.meta.mortgageDesc,
  path: "/mortgage-calculator/",
});

export default function Page() {
  return <Mortgage locale={LOCALE} />;
}
