import type { Metadata } from "next";
import { Listing } from "@/views/Listing";
import { getListing } from "@/lib/content";
import { pageMeta } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import { listingMeta } from "@/lib/meta";
import { LISTINGS } from "@/lib/listings";

const LOCALE = "en" as const;

export const dynamicParams = false;
export const generateStaticParams = () => LISTINGS.map((x) => ({ slug: x.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getListing(LOCALE, slug);
  if (!item) return {};
  const m = listingMeta(LOCALE, item);
  return pageMeta({ locale: LOCALE, title: m.title, description: m.description, path: `/properties/${slug}/`, image: ogImage(item.images[0]) });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Listing locale={LOCALE} slug={slug} />;
}
