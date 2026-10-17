/**
 * The cost of buying in Dubai. Checked 15 Sep 2026:
 * - DLD service pages for sale registration, mortgage registration and initial (off-plan) sale
 *   (dubailand.gov.ae, updated 8 Sep 2026): transfer 4%, itemised title deed fees, trustee fees,
 *   mortgage registration 0.25% + AED 250 + 10 + 10, Oqood 4% + AED 10 + 10.
 * - Agency commission, bank valuation and arrangement fees and developer NOC fees are custom or
 *   set by the bank or developer, not by law (Bayut, Property Finder guides, 2025–2026).
 * - Loan-to-value caps: Central Bank of the UAE mortgage regulations (Circular 31/2013 as amended).
 *   Non-resident lending is bank policy, not regulation.
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
  mortgageRegPct: 0.0025,
  mortgageRegFixed: 270, // AED 250 + AED 10 + AED 10
  valuation: 3000, // + VAT; banks charge AED 2,500 to 3,500
  arrangementPct: 0.01, // + VAT; banks charge 0.5% to 1%
};

export type Buyer = "expat" | "national" | "nonresident";
export type Status = "ready" | "off-plan";

const BUYERS_BY_LOCALE: Record<Locale, { value: Buyer; label: string }[]> = {
  en: [
    { value: "expat", label: "UAE resident (expatriate)" },
    { value: "national", label: "UAE national" },
    { value: "nonresident", label: "Non-resident" },
  ],
  ar: [
    { value: "expat", label: "مقيم في الإمارات (وافد)" },
    { value: "national", label: "مواطن إماراتي" },
    { value: "nonresident", label: "غير مقيم" },
  ],
};

export const getBuyers = (locale: Locale) => BUYERS_BY_LOCALE[locale];

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
    mortgageReg: { label: "Mortgage registration", note: "0.25% of the loan + AED 270" },
    valuation: { label: "Bank valuation", note: "Typically AED 2,500 to 3,500 + VAT" },
    arrangement: { label: "Bank arrangement fee", note: "Up to 1% of the loan + VAT" },
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
    mortgageReg: { label: "تسجيل التمويل العقاري", note: "0.25% من مبلغ التمويل + 270 د.إ" },
    valuation: { label: "تقييم البنك", note: "عادةً من 2,500 إلى 3,500 د.إ + ضريبة القيمة المضافة" },
    arrangement: { label: "رسم ترتيب التمويل", note: "حتى 1% من مبلغ التمويل + ضريبة القيمة المضافة" },
  },
};

/** The most a bank may lend, as a share of the price. */
export function maxLtv(price: number, buyer: Buyer, firstHome: boolean, status: Status) {
  if (status === "off-plan") return 0.5;
  if (buyer === "nonresident") return 0.5; // banks commonly lend 50–60%; the calculator assumes the lower end
  const national = buyer === "national";
  if (!firstHome) return national ? 0.65 : 0.6;
  if (price <= 5_000_000) return national ? 0.85 : 0.8;
  return national ? 0.75 : 0.7;
}

export type CostLine = { label: string; amount: number; note?: string };

export function buyingCosts({
  price,
  status,
  loan = 0,
  locale = "en",
}: {
  price: number;
  status: Status;
  loan?: number;
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
  if (loan > 0) {
    lines.push(
      { ...L.mortgageReg, amount: loan * FEES.mortgageRegPct + FEES.mortgageRegFixed },
      { ...L.valuation, amount: FEES.valuation * (1 + VAT) },
      { ...L.arrangement, amount: loan * FEES.arrangementPct * (1 + VAT) },
    );
  }
  const fees = lines.reduce((s, l) => s + l.amount, 0);
  return { lines, fees, total: price + fees, cashNeeded: price - loan + fees };
}

export function monthlyPayment(loan: number, ratePct: number, years: number) {
  const n = years * 12;
  const r = ratePct / 100 / 12;
  if (n <= 0) return 0;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

export const MAX_TERM = 25;
export const DBR = 0.5;
