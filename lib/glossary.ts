/**
 * The Dubai property glossary. Definitions checked 15–16 Sep 2026 against DLD service pages, the
 * Dubai Legislation Portal and the sources in lib/guides.ts. Terms that could not be confirmed on
 * an official or reputable source (Form I, musataha terms) are left out on purpose.
 */
export type Term = { id: string; term: string; full?: string; def: string; link?: string };

const TERMS: Term[] = [
  { id: "brn", term: "BRN", full: "Broker Registration Number", def: "The registration number of an individual broker licensed by RERA. With the brokerage's ORN, it must appear in property adverts.", link: "/dubai-property-facts/" },
  {
    id: "completion-certificate",
    term: "Completion certificate",
    def: "The certificate a planning authority issues when a building is complete: the Dubai Development Authority, Trakhees or Dubai Municipality, depending on the area. It starts the developer's ten-year liability for structural defects.",
    link: "/guides/handover-and-snagging-in-dubai/",
  },
  { id: "dbr", term: "Debt burden ratio", full: "DBR", def: "The share of income that goes on debt repayments. All monthly debt repayments together, a mortgage included, may not exceed 50% of income.", link: "/guides/mortgages-in-dubai/" },
  { id: "dld", term: "DLD", full: "Dubai Land Department", def: "The Dubai government department that registers property sales, mortgages and leases and keeps the property register. Its regulatory arm is RERA." },
  {
    id: "dubai-rest",
    term: "Dubai REST",
    def: "The Dubai Land Department's real estate app: service charges, lease registration, rental and sales indices, off-plan project tracking, broker checks and the developer's e-NOC for a sale.",
  },
  { id: "ejari", term: "Ejari", def: "The system for registering tenancy contracts with RERA. Dubai Law No. 26 of 2007 requires every lease to be registered.", link: "/guides/renting-out-property-in-dubai/" },
  {
    id: "escrow-account",
    term: "Escrow account",
    def: "The bank account of a development project into which off-plan buyers' payments are made. Under Dubai Law No. 8 of 2007 the money may be used only to build that project.",
    link: "/guides/buying-off-plan-in-dubai/",
  },
  { id: "form-a", term: "Form A", def: "RERA's standard contract between a seller and the broker marketing the property." },
  { id: "form-b", term: "Form B", def: "RERA's standard contract between a buyer and the broker acting for them." },
  {
    id: "form-f",
    term: "Form F",
    full: "MOU",
    def: "RERA's standard sale contract between buyer and seller, recording the price, the deposit and the transfer date. By custom the buyer pays a 10% deposit when it is signed.",
    link: "/guides/how-to-buy-property-in-dubai/",
  },
  { id: "freehold", term: "Freehold", def: "Outright ownership with no time limit. Under Dubai Law No. 7 of 2006, non-UAE nationals can own freehold property in the areas designated for it." },
  { id: "golden-visa", term: "Golden Visa", def: "A long-term UAE residence visa. Property investors in Dubai can apply with property worth AED 2 million or more.", link: "/guides/golden-visa-through-property/" },
  { id: "handover", term: "Handover", def: "The delivery of a completed home to its buyer. It starts the developer's one-year liability for defective installations.", link: "/guides/handover-and-snagging-in-dubai/" },
  { id: "leasehold", term: "Leasehold", full: "usufruct", def: "The right to use and benefit from property for a fixed term. Dubai Law No. 7 of 2006 allows non-UAE nationals to hold it for up to 99 years in designated areas." },
  {
    id: "ltv",
    term: "Loan-to-value",
    full: "LTV",
    def: "A mortgage as a share of the property's price. The Central Bank of the UAE caps it at 80% for an expatriate's first home up to AED 5 million, down to 50% for an off-plan home.",
    link: "/guides/mortgages-in-dubai/",
  },
  { id: "madmoun", term: "Madmoun", def: "The QR code issued with each Trakheesi advertising permit, which lets anyone confirm a property advert is approved. It has been required on printed and video adverts since 24 April 2023." },
  {
    id: "management-entity",
    term: "Management entity",
    def: "The company that manages a jointly owned building or community and collects service charges under Dubai Law No. 6 of 2019. Owners are represented by an owners committee.",
    link: "/guides/service-charges-in-dubai/",
  },
  { id: "mollak", term: "Mollak", def: "RERA's system for regulating jointly owned property: service charge budgets, owners' invoices and oversight of management companies.", link: "/guides/service-charges-in-dubai/" },
  {
    id: "noc",
    term: "NOC",
    full: "No-objection certificate",
    def: "The developer's certificate that it does not object to a resale. For a sale in a freehold area DLD requires the electronic version, the e-NOC, issued through Dubai REST.",
  },
  { id: "off-plan", term: "Off-plan", def: "A home bought from the developer before it is built, paid in stages under a payment plan.", link: "/guides/buying-off-plan-in-dubai/" },
  { id: "oqood", term: "Oqood", def: "The Dubai Land Department's interim register for off-plan homes, which records the buyer before a title deed exists. Registration costs 4% of the price plus AED 20.", link: "/guides/buying-off-plan-in-dubai/" },
  { id: "orn", term: "ORN", full: "Office Registration Number", def: "A brokerage's registration number with RERA. It must appear in the brokerage's property adverts.", link: "/dubai-property-facts/" },
  { id: "payment-plan", term: "Payment plan", def: "The schedule of payments for an off-plan home: a first payment on booking, instalments during construction and a balance at or after handover." },
  {
    id: "registration-trustee",
    term: "Registration trustee",
    def: "A DLD-approved centre that registers property sales and mortgages. Its fee on a sale is AED 4,000 plus VAT, or AED 2,000 plus VAT under AED 500,000.",
    link: "/guides/cost-of-buying-property-in-dubai/",
  },
  { id: "rera", term: "RERA", full: "Real Estate Regulatory Agency", def: "The regulatory arm of the Dubai Land Department. It approves service charges, registers leases through Ejari and regulates brokers and property advertising." },
  { id: "service-charges", term: "Service charges", def: "The annual charges owners pay to manage, operate, maintain and repair jointly owned property. RERA must approve them.", link: "/guides/service-charges-in-dubai/" },
  { id: "service-charge-index", term: "Service Charge Index", def: "The Dubai Land Department's service for looking up the service charges RERA has approved for a jointly owned property, on the DLD website or in Dubai REST." },
  {
    id: "smart-rental-index",
    term: "Smart Rental Index",
    def: "The Dubai Land Department's rent index since January 2025, which classifies buildings by specification, finishes, location and facilities. Rent increases at renewal depend on how far a rent sits below its average.",
    link: "/guides/renting-out-property-in-dubai/",
  },
  { id: "snagging", term: "Snagging", def: "Inspecting a new home before accepting it and listing defects and incomplete work for the developer to fix. It is an industry practice, not a legal procedure.", link: "/guides/handover-and-snagging-in-dubai/" },
  { id: "spa", term: "SPA", full: "Sale and purchase agreement", def: "The developer's sale contract for an off-plan home, setting out the price, the payment plan and the completion terms. Every off-plan sale must be entered in DLD's interim register." },
  { id: "title-deed", term: "Title deed", def: "The Dubai Land Department's certificate of ownership, issued when a sale is registered in the property register. Title deed fees on a sale total AED 520 for an apartment or villa." },
  { id: "trakheesi", term: "Trakheesi", def: "The Dubai Land Department's system for issuing property advertising permits. Every property advert must show its Trakheesi permit number." },
];

export const GLOSSARY = [...TERMS].sort((a, b) => a.term.localeCompare(b.term));
export const GLOSSARY_UPDATED = "2026-09-16";
