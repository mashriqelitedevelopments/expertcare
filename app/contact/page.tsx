import { Contact } from "@/views/Contact";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.contactTitle,
  description: t.meta.contactDesc,
  path: "/contact/",
  image: "/img/band-marina-1920.jpg",
});

export default function Page() {
  return <Contact locale={LOCALE} />;
}
