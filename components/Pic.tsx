import { ALT_AR, IMAGES, srcset, type ImgKey } from "@/lib/images";
import type { Locale } from "@/lib/locale";

/** A responsive <picture>: AVIF, WebP, JPEG. `mobile` swaps in an art-directed crop on phones. */
export function Pic({
  name,
  sizes = "100vw",
  priority = false,
  alt,
  mobile,
  className,
  locale = "en",
}: {
  name: ImgKey;
  sizes?: string;
  priority?: boolean;
  alt?: string;
  mobile?: ImgKey;
  className?: string;
  locale?: Locale;
}) {
  const spec = IMAGES[name];
  const largest = spec.widths.at(-1)!;
  const fallback = spec.widths[Math.min(1, spec.widths.length - 1)];
  const phone = "(max-width: 700px)";
  return (
    <picture className={className}>
      {mobile && <source media={phone} type="image/avif" srcSet={srcset(mobile, "avif")} sizes="100vw" />}
      {mobile && <source media={phone} type="image/webp" srcSet={srcset(mobile, "webp")} sizes="100vw" />}
      <source type="image/avif" srcSet={srcset(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, "webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${fallback}.jpg`}
        srcSet={srcset(name, "jpg")}
        sizes={sizes}
        width={largest}
        height={Math.round((largest * spec.ratio[1]) / spec.ratio[0])}
        alt={alt ?? (locale === "ar" ? ALT_AR[name] : spec.alt)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
