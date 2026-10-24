import type { Metadata } from "next";
import { CollectionPage } from "@/views/Collection";
import { collectionBySlug, collectionCopy, collections } from "@/lib/collections";
import { getArea, getListings } from "@/lib/content";
import { pageMeta } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;

export const dynamicParams = false;
// A static export cannot build a dynamic route with no pages. While listings are switched off
// (lib/listings.ts SHOW_LISTINGS) one placeholder renders the 404 page; "/_" paths are outside the page
// gate, the sitemap and every link.
export const generateStaticParams = () => {
  const all = collections();
  return all.length ? all.map((c) => ({ slug: c.slug })) : [{ slug: "_none" }];
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  if (!c) return {};
  const all = getListings(LOCALE);
  const homes = c.slugs.map((s) => all.find((l) => l.slug === s)!).filter(Boolean);
  const area = c.area ? getArea(LOCALE, c.area) : undefined;
  const copy = collectionCopy(LOCALE, c, area?.name ?? ui(LOCALE).collection.inDubai, homes);
  return pageMeta({
    locale: LOCALE,
    title: copy.title,
    description: copy.description,
    path: `/buy/${slug}/`,
    image: ogImage(area?.image ?? homes[0]?.images[0] ?? "hero"),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CollectionPage locale={LOCALE} slug={slug} />;
}
