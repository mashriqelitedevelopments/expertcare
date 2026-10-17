import { ShortlistView } from "@/components/ShortlistView";
import { Shortlist } from "@/views/Tools";
import { pageMeta } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata = pageMeta({
  locale: LOCALE,
  title: t.meta.shortlistTitle,
  description: t.meta.shortlistDesc,
  path: "/shortlist/",
  noindex: true,
});

export default function Page() {
  return (
    <Shortlist locale={LOCALE}>
      <ShortlistView locale={LOCALE} />
    </Shortlist>
  );
}
