import type { Metadata } from "next";
import type { Locale } from "./locale";
import { site } from "./site";

/** A site path in the given edition. Paths start and end with "/". One edition today. */
export const lp = (_locale: Locale, path: string) => path;

/** Per-page metadata: its own canonical plus Open Graph and Twitter cards. */
export function pageMeta({
  title,
  description,
  path,
  image = "/img/hero2-1280.jpg",
  absolute = false,
  noindex = false,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  image?: string;
  absolute?: boolean;
  noindex?: boolean;
}): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_AE",
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
