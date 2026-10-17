import type { Metadata } from "next";
import { ServicePage } from "@/views/ServicePage";
import { getService } from "@/lib/content";
import { pageMeta } from "@/lib/i18n";
import { ogImage } from "@/lib/images";

const LOCALE = "en" as const;
const SLUG = "property-management-in-dubai";

export function generateMetadata(): Metadata {
  const s = getService(LOCALE, SLUG);
  if (!s) return {};
  return pageMeta({ locale: LOCALE, title: s.seoTitle, description: s.seoDescription, path: "/landlords/", image: ogImage(s.image) });
}

export default function Page() {
  return <ServicePage locale={LOCALE} slug={SLUG} />;
}
