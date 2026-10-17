import { Guides } from "@/views/Guides";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.guidesTitle,
  description: t.meta.guidesDesc,
  path: "/guides/",
  image: "/img/guide-keys-1440.jpg",
});

export default function Page() {
  return <Guides locale={LOCALE} />;
}
