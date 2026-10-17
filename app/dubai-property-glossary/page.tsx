import { Glossary } from "@/views/Glossary";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.glossaryTitle,
  description: t.meta.glossaryDesc,
  path: "/dubai-property-glossary/",
  image: "/img/area-dubai-creek-harbour-1280.jpg",
});

export default function Page() {
  return <Glossary locale={LOCALE} />;
}
