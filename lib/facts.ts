import { AREAS } from "./areas";
import { SOURCES as S, type Block } from "./guides";

/**
 * The reference page: every rule and figure a buyer needs, in one sourced place. Built from the
 * same checked facts as lib/costs.ts, lib/areas.ts and the guides (15 Sep 2026). Written to be
 * quoted: each line states one fact with its number and who sets it.
 */
export const FACTS_UPDATED = "2026-09-16";

export const FACTS: { id: string; h: string; blocks: Block[] }[] = [
  {
    id: "fees",
    h: "Buying fees",
    blocks: [
      {
        table: {
          head: ["Fee", "Amount", "Set by"],
          rows: [
            ["Transfer fee, ready homes", "4% of the price, customarily paid by the buyer", "Dubai Land Department"],
            ["Title deed fees", "AED 520 for an apartment or villa: AED 250 + AED 250 + AED 10 + AED 10", "Dubai Land Department"],
            ["Registration trustee fee", "AED 4,000 + VAT at AED 500,000 and above; AED 2,000 + VAT below", "Dubai Land Department"],
            ["Oqood registration, off-plan homes", "4% of the price + AED 20", "Dubai Land Department"],
            ["Mortgage registration", "0.25% of the loan + AED 270", "Dubai Land Department"],
            ["Agency fee", "Usually 2% of the price + VAT", "Market custom"],
            ["Developer NOC, resales", "AED 500 to 5,000", "The developer"],
            ["Bank valuation", "Typically AED 2,500 to 3,500 + VAT", "The bank"],
            ["Bank arrangement fee", "Typically 0.5% to 1% of the loan + VAT", "The bank"],
          ],
        },
      },
      { p: "VAT in the UAE is 5%. A ready home bought with cash typically carries fees of about 7% of the price; the [buying costs calculator](/buying-costs/) works out the exact figure." },
    ],
  },
  {
    id: "mortgages",
    h: "Mortgage limits",
    blocks: [
      {
        table: {
          head: ["Home", "Expatriates", "UAE nationals"],
          rows: [
            ["First home, AED 5 million or less", "80% of the price", "85% of the price"],
            ["First home, over AED 5 million", "70%", "75%"],
            ["Second or investment home", "60%", "65%"],
            ["Off-plan home", "50%", "50%"],
          ],
        },
      },
      {
        ul: [
          "Limits are set by the Central Bank of the UAE. Non-residents are lent to at each bank's discretion, commonly 50% to 60% on a ready home",
          "Maximum term: 25 years. Each bank sets the age by which the loan must be repaid",
          "Debt burden: all monthly debt repayments together may not exceed 50% of income",
          "Early settlement fee: capped at 1% of the outstanding balance or AED 10,000, whichever is lower",
        ],
      },
    ],
  },
  {
    id: "ownership",
    h: "Who can own",
    blocks: [
      {
        p: "Buyers of any nationality can own freehold property in Dubai's designated freehold areas, first listed in Regulation No. 3 of 2006 and extended since. A UAE residence visa is not needed to buy.",
      },
      {
        ul: [
          "Under Dubai Law No. 7 of 2006, non-UAE nationals may hold freehold without a time limit, or leasehold rights of up to 99 years, in designated areas",
          "Non-resident foreigners identify themselves with a valid passport at the registration trustee",
          "A power of attorney issued abroad must be notarised, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and issued within two years (DLD Circular No. 29/R/2025, as summarised by Dubai law firms)",
        ],
      },
    ],
  },
  {
    id: "off-plan",
    h: "Off-plan protections",
    blocks: [
      {
        ul: [
          "Under Dubai Law No. 8 of 2007, off-plan payments go into an escrow account for the project and may be used only to build it",
          "The developer's creditors cannot seize money held in a project escrow account",
          "Off-plan sales are registered on the Dubai Land Department's Oqood system before a title deed exists",
          "Since April 2024, each off-plan unit needs its own advertising permit, not only the project",
        ],
      },
    ],
  },
  {
    id: "advertising",
    h: "Advertising rules",
    blocks: [
      {
        ul: [
          "Every property advert in Dubai must show its Trakheesi advertising permit number",
          "Printed and video property adverts must carry a Madmoun QR code, mandatory since 24 April 2023",
          "Brokerages and brokers must show their office (ORN) and broker (BRN) registration numbers in adverts",
          "Off-plan adverts must also show the developer, the project's escrow account number and the expected completion date",
        ],
      },
    ],
  },
  {
    id: "golden-visa",
    h: "Golden Visa through property",
    blocks: [
      {
        ul: [
          "Minimum value: property worth AED 2 million or more, in one property or several",
          "Term: ten years and renewable, according to the Dubai Land Department and GDRFA Dubai; the federal government portal shows a different term",
          "Mortgaged property qualifies with a no-objection letter from the lending bank",
          "Jointly owned property counts only when the applicant's own share is worth AED 2 million or more",
          "The official DLD and GDRFA pages do not address off-plan property",
          "Below AED 2 million, DLD lists a two-year investor residence visa for a sole owner of property of any value, or a joint owner with a share of at least AED 400,000",
          "In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system",
        ],
      },
    ],
  },
  {
    id: "owning",
    h: "Owning and letting",
    blocks: [
      {
        ul: [
          "Service charges on jointly owned property need RERA's approval, which requires a budget approved by a certified audit firm (Dubai Law No. 6 of 2019, Article 27)",
          "A home may not be sold while its service charges are unpaid (Article 32)",
          "Every tenancy contract must be registered with RERA through Ejari; online registration costs AED 177.75",
          "Rent may rise at renewal only when it is more than 10% below the rent index average for similar homes, by 5%, 10%, 15% or at most 20% (Decree No. 43 of 2013)",
          "Changing tenancy terms or not renewing requires at least 90 days' notice before the contract ends, unless the contract says otherwise",
          "Ending a tenancy at expiry to sell, or for the owner or a first-degree relative to move in, requires at least 12 months' notice through a notary public or by registered mail",
        ],
      },
    ],
  },
  {
    id: "tax",
    h: "Tax",
    blocks: [
      {
        ul: [
          "The UAE does not levy income tax on individuals",
          "A person's rental income from property held in their own name is not subject to corporate tax when the activity does not require a licence (Cabinet Decision No. 49 of 2023)",
          "Residential leases are generally exempt from VAT; the first supply of a new residential property within three years of completion is zero-rated",
        ],
      },
    ],
  },
  {
    id: "handover",
    h: "Handover and defects",
    blocks: [
      {
        ul: [
          "Developers must repair or replace defective installations for one year from handover (Dubai Law No. 6 of 2019, Article 40)",
          "Developers must fix structural defects for ten years from the completion certificate (Article 40)",
          "Once a project has its completion certificate, the developer must register sold units in the names of buyers who have met their obligations (Law No. 13 of 2008, Article 8)",
          "If an off-plan buyer defaults, the developer may keep up to 40% of the unit's value on a project more than 60% complete, or up to 25% below that (Law No. 13 of 2008 as amended by Law No. 19 of 2020)",
        ],
      },
    ],
  },
  {
    id: "numbers",
    h: "Dubai in numbers",
    blocks: [
      {
        ul: [
          "In 2025 Dubai recorded more than 270,000 real estate transactions worth AED 917 billion, 20% more than in 2024 (Dubai Media Office, January 2026)",
          "Real estate transactions in the first quarter of 2026 reached AED 252 billion, up 31% on a year earlier (Dubai Land Department, April 2026)",
          "Dubai's population passed 4.58 million at the end of 2025, up 7.5% in a year (WAM, July 2026)",
        ],
      },
    ],
  },
  {
    id: "areas",
    h: "Areas at a glance",
    blocks: [
      {
        table: {
          head: ["Area", "Freehold", "Public transport", "Master developer"],
          rows: AREAS.map((a) => [a.name, "Yes", a.transport.join(". "), a.developer]),
        },
      },
    ],
  },
  {
    id: "transport",
    h: "Transport changes to know",
    blocks: [
      {
        ul: [
          "The Dubai Metro Blue Line is due to open on 9 September 2029, with a station at Dubai Creek Harbour",
          "Two Red Line stations near Dubai Marina were renamed: Sobha Realty (formerly Dubai Marina) and DMCC (formerly Jumeirah Lakes Towers)",
        ],
      },
    ],
  },
];

export const FACT_FAQS = [
  { q: "What is the DLD transfer fee in Dubai?", a: "4% of the purchase price of a ready home, customarily paid by the buyer. Off-plan purchases pay the same 4% to register on Oqood, plus AED 20." },
  {
    q: "What is the maximum mortgage loan-to-value in Dubai?",
    a: "80% for an expatriate's first home worth up to AED 5 million, 70% above AED 5 million, 60% for a second home and 50% for an off-plan home. UAE nationals may borrow 85%, 75% and 65% on ready homes.",
  },
  { q: "What is the agency fee for buying property in Dubai?", a: "Usually 2% of the price plus 5% VAT. It is market custom, not a fixed legal rate." },
  { q: "How much property do you need for a Dubai Golden Visa?", a: "Property worth AED 2 million or more, held in one property or several." },
  { q: "What protects off-plan buyers in Dubai?", a: "Dubai Law No. 8 of 2007, which requires off-plan payments to be held in a project escrow account and used only for that project's construction." },
  { q: "Can foreigners buy property in Dubai?", a: "Yes, as freehold owners in Dubai's designated freehold areas, without needing a UAE residence visa." },
  { q: "Is Ejari registration mandatory in Dubai?", a: "Yes. Dubai Law No. 26 of 2007 requires every tenancy contract to be registered with RERA, through Ejari." },
  {
    q: "How long is a developer liable for defects in Dubai?",
    a: "One year from handover for defective installations, and ten years from the completion certificate for structural defects, under Article 40 of Dubai Law No. 6 of 2019.",
  },
  { q: "How many real estate transactions did Dubai record in 2025?", a: "More than 270,000, worth AED 917 billion, according to the Dubai Media Office." },
];

export const FACT_SOURCES = [
  S.dldSale,
  S.dldMortgage,
  S.dldInitial,
  S.pfFees,
  S.bayutCosts,
  S.cbuae,
  S.kt,
  S.nonRes,
  S.earlySettle,
  S.freeholdReg,
  S.freeholdList,
  S.law7,
  S.poa,
  S.escrow,
  S.trakheesi,
  S.pfTrakheesi,
  S.dldMadmoun,
  S.dldVisa,
  S.investorVisa,
  S.gdrfa,
  S.gdrfaMove,
  S.uae,
  S.law6,
  S.law26,
  S.law33,
  S.ejari,
  S.decree43,
  S.ftaRei,
  S.mofVat,
  S.law13,
  S.law19,
  S.market2025,
  S.marketQ1,
  S.population,
];
