import { Newsletter } from "./Newsletter";
import { Pic } from "./Pic";
import type { Locale } from "@/lib/locale";

/** The market-note sign-up as a page section. */
export function NewsletterSection({ locale }: { locale: Locale }) {
  return (
    <section className="sec">
      <div className="wrap">
        <Newsletter locale={locale} media={<Pic name="family-balcony" sizes="(max-width: 900px) 100vw, 46vw" locale={locale} />} />
      </div>
    </section>
  );
}
