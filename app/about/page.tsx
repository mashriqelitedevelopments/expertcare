import { About } from "@/views/About";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.aboutTitle,
  description: t.meta.aboutDesc,
  path: "/about/",
  image: "/img/viewing-1440.jpg",
});

export default function Page() {
  return <About locale={LOCALE} />;
}
