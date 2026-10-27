/**
 * The cost of buying in Dubai. Checked 15 Sep 2026:
 * - DLD service pages for sale registration and initial (off-plan) sale (dubailand.gov.ae,
 *   updated 8 Sep 2026): transfer 4%, itemised title deed fees, trustee fees, Oqood 4% + AED 10 + 10.
 * - Agency commission and developer NOC fees are custom or set by the developer, not by law
 *   (Bayut, Property Finder guides, 2025–2026).
 */
import type { Locale } from "./locale";

export const VAT = 0.05;

export const FEES = {
  transferPct: 0.04,
  titleDeed: 520, // AED 250 title deed + AED 250 (apartments and villas) + AED 10 + AED 10
  trusteeHigh: 4000, // + VAT, price AED 500,000 and above
  trusteeLow: 2000, // + VAT, below AED 500,000
  trusteeThreshold: 500_000,
  agencyPct: 0.02, // + VAT; customary, negotiable
  nocHigh: 5000, // developers charge AED 500 to 5,000
  oqoodAdmin: 20, // AED 10 + AED 10
};

export type Status = "ready" | "off-plan";

/** Fee names and the note under each, in both editions. */
const LINES: Record<Locale, Record<string, { label: string; note: string }>> = {
  en: {
    transfer: { label: "DLD transfer fee", note: "4% of the price, customarily paid by the buyer" },
    titleDeed: { label: "DLD title deed fees", note: "Itemised by DLD for apartments and villas" },
    trusteeHigh: { label: "Registration trustee fee", note: "AED 4,000 + VAT" },
    trusteeLow: { label: "Registration trustee fee", note: "AED 2,000 + VAT" },
    agency: { label: "Agency fee", note: "2% + VAT, the customary rate" },
    noc: { label: "Developer NOC", note: "AED 500 to 5,000, set by the developer; who pays is agreed in Form F. The top of the range is shown" },
    oqood: { label: "DLD Oqood registration", note: "4% of the price" },
    oqoodAdmin: { label: "DLD admin fees", note: "AED 10 + AED 10" },
  },
  ar: {
    transfer: { label: "رسم نقل الملكية", note: "4% من السعر، ويسدّده المشتري عادةً" },
    titleDeed: { label: "رسوم شهادة الملكية", note: "مفصّلة من الدائرة للشقق والفلل" },
    trusteeHigh: { label: "رسم أمين التسجيل العقاري", note: "4,000 د.إ + ضريبة القيمة المضافة" },
    trusteeLow: { label: "رسم أمين التسجيل العقاري", note: "2,000 د.إ + ضريبة القيمة المضافة" },
    agency: { label: "أتعاب الوساطة", note: "2% + ضريبة القيمة المضافة، وهي النسبة المعتادة" },
    noc: { label: "شهادة عدم ممانعة المطوّر", note: "من 500 إلى 5,000 د.إ يحددها المطوّر، ويُتفق على من يسددها في النموذج F. يظهر هنا الحد الأعلى" },
    oqood: { label: "رسم التسجيل في نظام عقود", note: "4% من السعر" },
    oqoodAdmin: { label: "رسوم إدارية للدائرة", note: "10 د.إ + 10 د.إ" },
  },
};

export type CostLine = { label: string; amount: number; note?: string };

export function buyingCosts({
  price,
  status,
  locale = "en",
}: {
  price: number;
  status: Status;
  locale?: Locale;
}) {
  const L = LINES[locale];
  const lines: CostLine[] = [];
  if (status === "ready") {
    const trustee = price >= FEES.trusteeThreshold ? L.trusteeHigh : L.trusteeLow;
    lines.push(
      { ...L.transfer, amount: price * FEES.transferPct },
      { ...L.titleDeed, amount: FEES.titleDeed },
      { ...trustee, amount: (price >= FEES.trusteeThreshold ? FEES.trusteeHigh : FEES.trusteeLow) * (1 + VAT) },
      { ...L.agency, amount: price * FEES.agencyPct * (1 + VAT) },
      { ...L.noc, amount: FEES.nocHigh },
    );
  } else {
    lines.push({ ...L.oqood, amount: price * FEES.transferPct }, { ...L.oqoodAdmin, amount: FEES.oqoodAdmin });
  }
  const fees = lines.reduce((s, l) => s + l.amount, 0);
  return { lines, fees, total: price + fees };
}

