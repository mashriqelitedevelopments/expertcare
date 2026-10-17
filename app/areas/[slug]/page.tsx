import type { Metadata } from "next";
import { AreaPage } from "@/views/AreaPage";
import { getArea } from "@/lib/content";
import { pageMeta } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import { areaMeta } from "@/lib/meta";
import { AREAS } from "@/lib/areas";

const LOCALE = "en" as const;

export const dynamicParams = false;
export const generateStaticParams = () => AREAS.map((x) => ({ slug: x.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getArea(LOCALE, slug);
  if (!item) return {};
  const m = areaMeta(item);
  return pageMeta({ locale: LOCALE, title: m.title, description: m.description, path: `/areas/${slug}/`, image: ogImage(item.image) });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AreaPage locale={LOCALE} slug={slug} />;
}
