import { Services } from "@/views/Services";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({ locale: LOCALE, title: t.services.metaTitle, description: t.services.metaDesc, path: "/services/" });

export default function Page() {
  return <Services locale={LOCALE} />;
}
