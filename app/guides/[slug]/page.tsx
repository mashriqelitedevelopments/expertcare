import type { Metadata } from "next";
import { GuidePage } from "@/views/GuidePage";
import { getGuide } from "@/lib/content";
import { pageMeta } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import { guideMeta } from "@/lib/meta";
import { GUIDES } from "@/lib/guides";

const LOCALE = "en" as const;

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((x) => ({ slug: x.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getGuide(LOCALE, slug);
  if (!item) return {};
  const m = guideMeta(item);
  return pageMeta({ locale: LOCALE, title: m.title, description: m.description, path: `/guides/${slug}/`, image: ogImage(item.image) });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GuidePage locale={LOCALE} slug={slug} />;
}
