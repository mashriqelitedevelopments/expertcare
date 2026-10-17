import { Faq } from "@/views/Faq";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({ locale: LOCALE, title: t.faq.metaTitle, description: t.faq.metaDesc, path: "/faq/" });

export default function Page() {
  return <Faq locale={LOCALE} />;
}
