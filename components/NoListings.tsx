import { EnquiryForm } from "./EnquiryForm";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/ui";

/** Shown where listings would be while lib/listings.ts SHOW_LISTINGS is off: a brief instead. */
export function NoListings({ locale, sand = false }: { locale: Locale; sand?: boolean }) {
  const t = ui(locale).noListings;
  return (
    <section className={`sec${sand ? " sand" : ""}`} aria-labelledby="nolist-h">
      <div className="wrap twin">
        <div className="rv">
          <h2 id="nolist-h">{t.h}</h2>
          <p className="lede" style={{ marginTop: 20 }}>
            {t.p}
          </p>
        </div>
        <div className="panel rv" id="brief">
          <EnquiryForm locale={locale} intent="brief" />
        </div>
      </div>
    </section>
  );
}
