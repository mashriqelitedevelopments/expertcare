import { Areas } from "@/views/Areas";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.areasTitle,
  description: t.meta.areasDesc,
  path: "/areas/",
  image: "/img/area-dubai-marina-1280.jpg",
});

export default function Page() {
  return <Areas locale={LOCALE} />;
}
