import type { Metadata } from "next";
import { PricesArea } from "@/views/PricesArea";
import { getArea } from "@/lib/content";
import { fill, num } from "@/lib/format";
import { pageMeta } from "@/lib/i18n";
import { ogImage } from "@/lib/images";
import { MARKET, marketFor } from "@/lib/market";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(MARKET.areas).map((area) => ({ area }));

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const a = getArea(LOCALE, area);
  const m = marketFor(area);
  if (!a || !m) return {};
  const p = ui(LOCALE).prices;
  return pageMeta({
    locale: LOCALE,
    title: fill(p.metaAreaTitle, { area: a.name }),
    description: fill(p.metaAreaDesc, { area: a.name, psf: num(m.last12.medianPsf ?? 0), sales: num(m.last12.sales) }),
    path: `/dubai-property-prices/${area}/`,
    image: ogImage(a.image),
  });
}

export default async function Page({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  return <PricesArea locale={LOCALE} slug={area} />;
}
