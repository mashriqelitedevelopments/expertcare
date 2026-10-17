import { Privacy } from "@/views/Privacy";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.privacyTitle,
  description: t.meta.privacyDesc,
  path: "/privacy/",
});

export default function Page() {
  return <Privacy locale={LOCALE} />;
}
