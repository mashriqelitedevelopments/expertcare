"use client";

import { Heart } from "./Icons";
import { track } from "@/lib/analytics";
import type { Locale } from "@/lib/locale";
import { toggleShortlist, useShortlist } from "@/lib/shortlist";
import { ui } from "@/lib/ui";

export function SaveButton({ slug, title, locale, wide = false }: { slug: string; title: string; locale: Locale; wide?: boolean }) {
  const t = ui(locale).card;
  const saved = useShortlist().includes(slug);
  return (
    <button
      type="button"
      className={wide ? "save save-wide" : "save"}
      aria-pressed={saved}
      aria-label={wide ? undefined : `${saved ? t.remove : t.saveTo}: ${title}`}
      onClick={(e) => {
        e.preventDefault();
        if (!saved) track("add_to_wishlist", { item_id: slug });
        toggleShortlist(slug);
      }}
    >
      <Heart />
      {wide && <span>{saved ? t.savedWide : t.saveWide}</span>}
    </button>
  );
}
