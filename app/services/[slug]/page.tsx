import type { Metadata } from "next";
import { ServicePage } from "@/views/ServicePage";
import { getService } from "@/lib/content";
import { pageMeta } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import { isUnderServices } from "@/lib/paths";
import { SERVICES } from "@/lib/services";

const LOCALE = "en" as const;

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.filter((s) => isUnderServices(s.slug)).map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(LOCALE, slug);
  if (!s) return {};
  return pageMeta({ locale: LOCALE, title: s.seoTitle, description: s.seoDescription, path: `/services/${slug}/`, image: ogImage(s.image) });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServicePage locale={LOCALE} slug={slug} />;
}
