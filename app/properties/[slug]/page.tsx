import type { Metadata } from "next";
import { Listing } from "@/views/Listing";
import { getListing } from "@/lib/content";
import { pageMeta } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import { listingMeta } from "@/lib/meta";
import { LISTINGS } from "@/lib/listings";

const LOCALE = "en" as const;

export const dynamicParams = false;
// A static export cannot build a dynamic route with no pages. While listings are switched off
// (lib/listings.ts SHOW_LISTINGS) one placeholder renders the 404 page; "/_" paths are outside the page
// gate, the sitemap and every link.
export const generateStaticParams = () => (LISTINGS.length ? LISTINGS.map((x) => ({ slug: x.slug })) : [{ slug: "_none" }]);

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
