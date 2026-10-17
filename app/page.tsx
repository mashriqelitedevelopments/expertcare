import { Home } from "@/views/Home";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.homeTitle,
  description: t.meta.homeDesc,
  path: "/",
  absolute: true,
});

export default function Page() {
  return <Home locale={LOCALE} />;
}
