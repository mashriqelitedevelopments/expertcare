import type { Block } from "./guides";
import type { ImgKey } from "./images";

/**
 * Service pages: what ExpertCare does for each kind of client. Every figure or rule quoted must
 * match lib/costs.ts, lib/facts.ts and the guides (same sources), and plain sentences only.
 */
export type Service = {
  slug: string;
  name: string;
  /** Short name for menus and cards. */
  short: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  dek: string;
  image: ImgKey;
  /** "In short": the direct answer, first on the page. */
  summary: string[];
  /** What the client gets, as a numbered sequence. */
  steps: { t: string; d: string }[];
  /** Deeper sections, same block model as the guides. */
  sections: { id: string; h: string; blocks: Block[] }[];
  /** What it costs the client, stated plainly ("free to buyers", "2% + VAT"). */
  fees: string;
  faqs: { q: string; a: string }[];
  /** Guides to link at the end, by slug. */
  guides: string[];
  /** The form intent the page's enquiry form uses. */
  intent: "viewing" | "brief" | "general" | "valuation" | "landlord" | "tenant";
};

export const SERVICES: Service[] = [
  {
    slug: "buying-property-in-dubai",
    name: "Buying property in Dubai",
    short: "Buying",
    seoTitle: "Buying property in Dubai: a broker on your side",
    seoDescription:
      "ExpertCare acts for buyers of ready and off-plan homes in Dubai: the shortlist, the checks, the offer and the transfer, with every fee shown before you view.",
    title: "Buying a home in Dubai with ExpertCare",
    dek: "A buyer's broker who shortlists, checks every advert, negotiates the price and stays with you to the title deed.",
    image: "viewing-2",
    summary: [
      "ExpertCare acts for buyers of ready and off-plan homes in Dubai's freehold areas, whether you live in the UAE or abroad.",
      "On a resale the customary agency fee is 2% of the price plus VAT, paid by the buyer. On an off-plan purchase from a developer, the developer pays the broker and you pay nothing extra for our work.",
      "Before the first viewing you see the whole number: the price plus the Dubai Land Department, trustee, agency and bank fees.",
    ],
    steps: [
      {
        t: "Brief and budget.",
        d: "We take your brief: areas, type, size, move-in date and how you will pay. Then we work out the full budget with the [buying costs calculator](/buying-costs/), every DLD, trustee, agency and bank fee included.",
      },
      {
        t: "Mortgage pre-approval.",
        d: "If you are borrowing, we help you get pre-approval first, so you know the ceiling before you view. The Central Bank of the UAE caps an expatriate's loan on a first home worth up to AED 5 million at 80% of the price.",
      },
      {
        t: "Form B.",
        d: "Form B is the Dubai Land Department's standard contract between a buyer and a broker. It records what we do for you and our commission before any viewing takes place.",
      },
      {
        t: "Shortlist and viewings.",
        d: "We shortlist homes that fit the brief, check each advert's Trakheesi permit, look up the building's approved service charges and arrange the viewings.",
      },
      {
        t: "Offer and Form F.",
        d: "We negotiate the price and the terms and prepare Form F, the sale contract between you and the seller. By custom you pay a 10% deposit when it is signed, held until the transfer.",
      },
      {
        t: "NOC and transfer.",
        d: "We obtain the developer's no-objection certificate, book the registration trustee and attend the transfer with you or your attorney.",
      },
      {
        t: "Title deed, and after.",
        d: "The title deed is issued in your name. The same adviser stays on for the move, the Ejari if you let, and snagging if the home is new.",
      },
    ],
    sections: [
      {
        id: "checks",
        h: "What we check before you offer",
        blocks: [
          {
            ul: [
              "The advert carries a valid Trakheesi permit number and, on printed and video adverts, a Madmoun QR code we scan",
              "The building's service charges approved by RERA, looked up on DLD's Service Charge Index, and whether any are unpaid, because a home cannot be sold while they are",
              "Recent sale prices for the same building or community, from our analysis of DLD's open transaction data on the [prices pages](/dubai-property-prices/)",
            ],
          },
        ],
      },
      {
        id: "costs",
        h: "What buying costs",
        blocks: [
          {
            p: "On a ready home bought with cash, plan for about 7% on top of the price: the 4% DLD transfer fee, AED 520 in title deed fees, the trustee fee of AED 4,000 plus VAT (AED 2,000 plus VAT under AED 500,000), the customary 2% agency fee plus VAT and the developer's NOC fee of AED 500 to 5,000.",
          },
          {
            p: "By custom the buyer pays the whole 4% transfer fee, although a different split can be agreed in Form F. A mortgage adds 0.25% of the loan plus AED 270 at DLD, the bank's valuation and its arrangement fee.",
          },
          { tool: "costs" },
        ],
      },
      {
        id: "off-plan",
        h: "If you buy off-plan",
        blocks: [
          {
            p: "When you buy from a developer before the building is complete, the developer pays our commission and you pay nothing extra. You pay in stages into the project's escrow account, which under Dubai Law No. 8 of 2007 can be used only to build that project, and the purchase is registered on Oqood for 4% of the price plus AED 20.",
          },
          {
            p: "Our [off-plan advisory](/services/off-plan-advisory/) covers the developer and project checks, the payment plan and the handover.",
          },
        ],
      },
      {
        id: "abroad",
        h: "If you live outside the UAE",
        blocks: [
          {
            p: "You do not need a residence visa to buy. A valid passport identifies you at the registration trustee, and if you cannot attend, an attorney signs for you. A power of attorney issued abroad must be notarised, legalised, attested, translated into Arabic and issued within two years.",
          },
          {
            p: "UAE banks lend non-residents at their own discretion, commonly 50% to 60% of the price of a ready home. [Buying property in Dubai from abroad](/guides/buying-property-in-dubai-from-abroad/) covers identification, paying and visas.",
          },
        ],
      },
    ],
    fees: "On a resale the customary agency fee is 2% of the price plus VAT, paid by the buyer and agreed in Form B; on an off-plan purchase from a developer, the developer pays us and you pay nothing extra.",
    faqs: [
      {
        q: "Do buyers pay an agency fee in Dubai?",
        a: "On a resale, yes. The customary fee is 2% of the price plus VAT, paid by the buyer and agreed in Form B, the contract between you and your broker.",
      },
      {
        q: "Is a buyer's broker free when buying off-plan?",
        a: "When you buy from a developer, the developer pays the broker's commission and you pay nothing extra for the broker's work. You still pay the 4% Oqood registration fee plus AED 20 to the Dubai Land Department.",
      },
      {
        q: "How much should I budget on top of the price?",
        a: "About 7% for a ready home bought with cash. The [buying costs calculator](/buying-costs/) itemises every fee for any price, with or without a mortgage.",
      },
      {
        q: "Can I buy without living in the UAE?",
        a: "Yes. Buyers of any nationality can own freehold property in Dubai's designated freehold areas, and a valid passport identifies a non-resident at the registration trustee.",
      },
      {
        q: "What is Form B?",
        a: "The Dubai Land Department's standard contract between a buyer and the broker acting for them. It sets out what the broker does and the commission, before any viewing.",
      },
      {
        q: "What deposit do I pay when I agree to buy?",
        a: "By custom, 10% of the price when you sign Form F, the sale contract with the seller. It is market practice rather than a legal rule, and it is held until the transfer.",
      },
    ],
    guides: [
      "how-to-buy-property-in-dubai",
      "cost-of-buying-property-in-dubai",
      "mortgages-in-dubai",
      "buying-property-in-dubai-from-abroad",
      "choosing-a-real-estate-broker-in-dubai",
      "service-charges-in-dubai",
    ],
    intent: "viewing",
  },
  {
    slug: "selling-property-in-dubai",
    name: "Selling property in Dubai",
    short: "Selling",
    seoTitle: "Selling property in Dubai: valuation to transfer",
    seoDescription:
      "ExpertCare sells homes in Dubai from a valuation built on real sales data to the transfer: Form A, Trakheesi permit, viewings, offers, Form F, NOC and trustee.",
    title: "Selling your Dubai property with ExpertCare",
    dek: "A valuation from real sales data, a permitted listing, qualified buyers and a transfer handled from the first viewing to the trustee office.",
    image: "desk",
    summary: [
      "ExpertCare values your home against recent sales in the same building or community, markets it under a Trakheesi permit, and handles offers, Form F, the developer's NOC and the transfer.",
      "The process runs from Form A, the listing agreement, to the registration trustee office where the buyer pays and the title deed changes hands.",
      "By custom the buyer pays the 4% DLD transfer fee. Our commission is agreed in Form A before marketing begins.",
    ],
    steps: [
      {
        t: "Valuation.",
        d: "We price the home from our analysis of DLD's open transaction data for the building or community, our own recent sales and the homes competing with yours. You get a written range and the reasons behind it.",
      },
      {
        t: "Form A.",
        d: "Form A is the Dubai Land Department's standard contract between a seller and the broker marketing the home. It records the asking price, the term and our commission.",
      },
      {
        t: "Trakheesi permit.",
        d: "Every property advert in Dubai must show a Trakheesi permit number, so we apply for the permit before the listing goes live. Printed and video adverts also carry a Madmoun QR code.",
      },
      {
        t: "Marketing.",
        d: "Photography, a listing on the portals and on this site, and a direct approach to buyers already briefed with us. Every advert shows our ORN and the adviser's BRN.",
      },
      {
        t: "Viewings and offers.",
        d: "We qualify each buyer, including mortgage pre-approval, run the viewings and bring you every offer in writing.",
      },
      {
        t: "Form F.",
        d: "Once you accept an offer we prepare Form F, the sale contract. By custom the buyer pays a 10% deposit on signing, held until the transfer, and the contract fixes the transfer date.",
      },
      {
        t: "NOC and transfer.",
        d: "We obtain the developer's no-objection certificate, confirm nothing is owed on service charges, book the registration trustee and attend the transfer. You are paid at the trustee office.",
      },
    ],
    sections: [
      {
        id: "valuation",
        h: "How we value your home",
        blocks: [
          {
            p: "A valuation starts with what similar homes in the same building or community have sold for, using our analysis of the Dubai Land Department's open transaction data on the [prices pages](/dubai-property-prices/), the sales we have handled and the homes on the market now.",
          },
          {
            ul: [
              "Floor, view and orientation, which separate two homes of the same size in the same tower",
              "Whether the home is vacant or let, and the rent and term if it is let",
            ],
          },
          { p: "The price statistics are our analysis of an open dataset, not a DLD valuation." },
        ],
      },
      {
        id: "documents",
        h: "The documents a sale needs",
        blocks: [
          {
            ul: [
              "Your title deed, and your passport or Emirates ID",
              "Form A, signed before the home is marketed",
              "The Trakheesi advertising permit for the listing",
              "The developer's no-objection certificate, for a fee of AED 500 to 5,000 that the developer sets; who pays it is agreed in Form F",
              "Confirmation that service charges are paid, because under Dubai Law No. 6 of 2019 a home cannot be sold while they are unpaid",
            ],
          },
        ],
      },
      {
        id: "transfer",
        h: "The transfer day",
        blocks: [
          {
            p: "Buyer and seller, or their attorneys, meet at a Dubai Land Department registration trustee office. By market practice the buyer pays the price by manager's cheque from a UAE bank. The 4% transfer fee, AED 520 in title deed fees and the trustee fee of AED 4,000 plus VAT (AED 2,000 plus VAT under AED 500,000) are settled, the sale is registered and the title deed is issued in the buyer's name.",
          },
          {
            p: "If the home is let, the tenancy passes to the buyer with its Ejari contract. Ending a tenancy at expiry because you are selling needs at least 12 months' notice served through a notary public or by registered mail.",
          },
        ],
      },
      {
        id: "abroad",
        h: "If you live outside the UAE",
        blocks: [
          {
            p: "You can sell through an attorney. A power of attorney issued abroad must be notarised, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and issued within two years, and its wording must clearly authorise the sale.",
          },
        ],
      },
    ],
    fees: "Our commission is agreed in Form A before marketing begins; by custom the buyer pays the 4% DLD transfer fee, and the developer's NOC fee of AED 500 to 5,000 is split as agreed in Form F.",
    faqs: [
      {
        q: "What is Form A?",
        a: "The Dubai Land Department's standard contract between a seller and the broker marketing the home. It records the asking price, the listing term and the commission, and it is signed before the home is advertised.",
      },
      {
        q: "Who pays the DLD transfer fee when selling?",
        a: "By custom the buyer pays the full 4%. DLD's own schedule divides the fee equally between buyer and seller, so the two sides can agree a different split in Form F.",
      },
      {
        q: "Can I sell a home with a tenant in place?",
        a: "Yes. The tenancy and its Ejari contract pass to the buyer. If the buyer wants the home empty, ending the tenancy at expiry because of the sale needs at least 12 months' notice served through a notary public or by registered mail.",
      },
      {
        q: "Can I sell with a mortgage on the home?",
        a: "Yes. The bank's balance is settled from the sale proceeds at the transfer, and the mortgage is released from the title deed before the buyer's name goes on it.",
      },
      {
        q: "Can I sell with unpaid service charges?",
        a: "No. Under Dubai Law No. 6 of 2019 unpaid service charges are a lien on the home, and it cannot be sold until they are paid.",
      },
      {
        q: "How long does a sale take?",
        a: "Form F fixes the transfer date, so the timing depends on the buyer's funding and the developer's NOC. A cash buyer with the NOC in hand completes sooner than one whose bank still needs to value the home.",
      },
    ],
    guides: [
      "selling-property-in-dubai",
      "cost-of-buying-property-in-dubai",
      "service-charges-in-dubai",
      "renting-out-property-in-dubai",
      "buying-property-in-dubai-from-abroad",
      "choosing-a-real-estate-broker-in-dubai",
    ],
    intent: "valuation",
  },
  {
    slug: "renting-a-home-in-dubai",
    name: "Renting a home in Dubai",
    short: "Renting",
    seoTitle: "Renting a home in Dubai: search, Ejari and move-in",
    seoDescription:
      "ExpertCare finds rental homes for tenants in Dubai, negotiates the rent, cheques and deposit, checks the landlord's title deed and registers the Ejari.",
    title: "Renting a home in Dubai with ExpertCare",
    dek: "A tenant's adviser who shortlists, checks the landlord, negotiates the terms and registers the contract on Ejari.",
    image: "handover",
    summary: [
      "ExpertCare finds rental homes for tenants across Dubai, negotiates the rent and the number of cheques, checks the landlord's title deed and registers the tenancy on Ejari.",
      "Every tenancy contract must be registered with RERA through Ejari; online registration costs AED 177.75.",
      "At renewal the rent can rise only within the bands of Decree No. 43 of 2013, and either side must give at least 90 days' notice to change the terms or not renew.",
    ],
    steps: [
      {
        t: "Brief.",
        d: "Areas, type, size, furnished or not, pets, parking, budget and move-in date. If you are new to Dubai, tell us where you will work and where children will go to school, and we shortlist by commute.",
      },
      {
        t: "Shortlist and viewings.",
        d: "We shortlist homes that fit, confirm each advert carries a Trakheesi permit number, and arrange viewings in person or by video if you are still abroad.",
      },
      {
        t: "Offer and terms.",
        d: "We negotiate the annual rent, the number of cheques, the security deposit, what is included and who handles maintenance, and put the agreed terms in writing before any contract is drawn up.",
      },
      {
        t: "Checks on the landlord.",
        d: "We match the title deed to the person letting the home, or to their attorney under a power of attorney, so you pay the right person.",
      },
      {
        t: "Contract and payment.",
        d: "The tenancy contract records the rent, the term, the deposit and the cheque dates. By market practice rent is paid in advance by post-dated cheques from a UAE bank account.",
      },
      {
        t: "Ejari.",
        d: "The contract is registered with RERA through Ejari. Online registration costs AED 177.75. The landlord, the tenant or an attorney can register it.",
      },
      {
        t: "Move-in.",
        d: "With the Ejari certificate in hand you open your DEWA account for electricity and water, collect the keys and record the condition of the home in writing, with photographs, so the deposit comes back cleanly.",
      },
    ],
    sections: [
      {
        id: "cheques",
        h: "Rent, cheques and the deposit",
        blocks: [
          {
            p: "Rent in Dubai is quoted per year and, by market practice, paid in advance by post-dated cheques from a UAE bank account. The number of cheques is agreed with the landlord, and fewer cheques often buys a lower rent.",
          },
          {
            p: "The landlord holds a security deposit for the term and returns it at the end, less any deductions agreed for damage beyond normal wear.",
          },
        ],
      },
      {
        id: "ejari",
        h: "Why Ejari matters",
        blocks: [
          {
            p: "Article 4 of Dubai Law No. 26 of 2007, as amended by Law No. 33 of 2008, requires every lease to be registered with RERA through Ejari. The certificate is what utilities, schools and government services ask for as proof of your address.",
          },
          {
            table: {
              head: ["Where you register", "Fee"],
              rows: [
                ["Dubai REST app or DLD website", "AED 177.75"],
                ["Registration trustee centre", "AED 100 + AED 10 + AED 10, plus a AED 95 service fee and VAT"],
              ],
            },
          },
        ],
      },
      {
        id: "rights",
        h: "Your rights at renewal",
        blocks: [
          {
            ul: [
              "**Rent increases.** The rent can rise at renewal only when it is more than 10% below the Smart Rental Index average for similar homes: by 5% if it is 11% to 20% below, 10% if 21% to 30% below, 15% if 31% to 40% below, and at most 20% if more than 40% below (Decree No. 43 of 2013)",
              "**Notice.** Either side must give at least 90 days' notice before the contract ends to change its terms or not renew, unless the contract says otherwise",
              "**Eviction at expiry.** A landlord who wants the home back to sell it, or for themselves or a first-degree relative to live in, must give at least 12 months' notice through a notary public or by registered mail",
            ],
          },
          { p: "We check any proposed increase against the index before you sign the renewal." },
        ],
      },
      {
        id: "after",
        h: "After you move in",
        blocks: [
          {
            p: "Your adviser stays your contact for the term: maintenance the contract puts on the landlord, the renewal and the next move. If you later buy, the same adviser carries your brief across to [buying a home in Dubai](/services/buying-property-in-dubai/).",
          },
        ],
      },
    ],
    fees: "Our fee for finding and securing a rental home is agreed with you in writing before you sign the tenancy contract; Ejari registration costs AED 177.75 online.",
    faqs: [
      {
        q: "Is Ejari registration mandatory for tenants in Dubai?",
        a: "Yes. Dubai Law No. 26 of 2007 requires every tenancy contract to be registered with RERA through Ejari. Online registration costs AED 177.75, and the landlord, the tenant or an attorney can do it.",
      },
      {
        q: "How many cheques do I pay rent with?",
        a: "The number is agreed with the landlord and written into the contract. By market practice rent is paid in advance by post-dated cheques from a UAE bank account.",
      },
      {
        q: "Can my landlord raise the rent at renewal?",
        a: "Only within Decree No. 43 of 2013. If the rent is up to 10% below the index average for similar homes there is no increase; above that the limit is 5%, 10%, 15% or at most 20%, depending on how far below the average the rent sits.",
      },
      {
        q: "How much notice do I get if the landlord will not renew?",
        a: "At least 90 days before the contract ends, unless the contract says otherwise. To take the home back to sell it or move in, the landlord must give at least 12 months' notice through a notary public or by registered mail.",
      },
      {
        q: "When do I get my deposit back?",
        a: "At the end of the tenancy, less any deductions agreed for damage beyond normal wear. A written condition report with photographs at move-in and move-out is the best protection for both sides.",
      },
      {
        q: "Can I rent before my residence visa is issued?",
        a: "The tenancy is registered on Ejari with your identification, and each landlord decides what they accept. Tell us where you are in the visa process and we match the landlord and the timing to it.",
      },
    ],
    guides: ["renting-a-home-in-dubai", "renting-out-property-in-dubai", "how-to-buy-property-in-dubai", "choosing-a-real-estate-broker-in-dubai"],
    intent: "tenant",
  },
  {
    slug: "property-management-in-dubai",
    name: "Property management in Dubai",
    short: "Management",
    seoTitle: "Property management in Dubai for landlords",
    seoDescription:
      "ExpertCare lets and manages homes for Dubai owners: tenant finding, Ejari, rent collection, maintenance, lawful renewals, inspections and an annual statement.",
    title: "Letting and managing your Dubai property",
    dek: "Tenants found and vetted, rent collected, maintenance handled and renewals kept within the law, with one statement a year.",
    image: "keys-bowl",
    summary: [
      "ExpertCare lets and manages homes for owners in Dubai: finding and vetting tenants, Ejari registration, rent collection, maintenance, renewals within the bands of Decree No. 43 of 2013, inspections and an annual statement.",
      "Our fee is a share of the annual rent, agreed in writing before we market the home.",
      "Rental income from property held in your own name is not subject to UAE corporate tax when the activity does not need a licence, under Cabinet Decision No. 49 of 2023.",
    ],
    steps: [
      {
        t: "Onboarding.",
        d: "We take the title deed, your identification, the keys and an inventory, confirm the service charges are paid and agree the asking rent against the Smart Rental Index and recent lets in the building.",
      },
      {
        t: "Marketing.",
        d: "The listing goes live under a Trakheesi permit, with our ORN and the adviser's BRN on every advert, on the portals and on this site.",
      },
      {
        t: "Tenant vetting.",
        d: "We check each applicant's identification, employment and funds, and bring you a recommendation with the proposed rent, cheques and deposit.",
      },
      {
        t: "Contract and Ejari.",
        d: "We draw up the tenancy contract, collect the cheques and the deposit, and register the contract with RERA through Ejari. Online registration costs AED 177.75.",
      },
      {
        t: "Rent and maintenance.",
        d: "Cheques are banked on their dates and the rent is paid to you. Maintenance requests come to us, are priced, approved by you above an agreed limit and carried out.",
      },
      {
        t: "Inspections and renewals.",
        d: "The home is inspected during the term with a written report. Before expiry we give any notice the law requires and propose the renewal rent within the Decree No. 43 of 2013 bands.",
      },
      {
        t: "Annual statement.",
        d: "Once a year you receive a statement of rent received, our fee, maintenance and service charges, ready for your records or your accountant.",
      },
    ],
    sections: [
      {
        id: "renewals",
        h: "How far the rent can rise at renewal",
        blocks: [
          { p: "Decree No. 43 of 2013 ties any increase to how far the current rent sits below the Smart Rental Index average for similar homes:" },
          {
            table: {
              head: ["Current rent against the index average", "Largest increase allowed"],
              rows: [
                ["Up to 10% below", "No increase"],
                ["11% to 20% below", "5%"],
                ["21% to 30% below", "10%"],
                ["31% to 40% below", "15%"],
                ["More than 40% below", "20%"],
              ],
            },
          },
          {
            p: "Changing the terms or not renewing needs at least 90 days' notice before the contract ends, unless the contract says otherwise. Taking the home back at expiry to sell it, or for you or a first-degree relative to live in, needs at least 12 months' notice through a notary public or by registered mail. We serve both on your instruction.",
          },
        ],
      },
      {
        id: "short-term",
        h: "Short-term lets and shared housing",
        blocks: [
          {
            p: "A home let for short stays needs a holiday home permit from Dubai's Department of Economy and Tourism, and individual owners can register their own homes. Law No. 4 of 2026 requires a separate permit before any unit is used as shared housing.",
          },
        ],
      },
      {
        id: "owner-costs",
        h: "What stays with the owner",
        blocks: [
          {
            ul: [
              "Service charges, which Dubai Law No. 6 of 2019 defines as charges collected from owners; RERA must approve them, and you can check the approved figure on DLD's Service Charge Index",
              "Unpaid service charges are a lien on the home, and after a RERA-approved notice the owner has 30 days to pay before the claim is enforced",
              "Repairs the tenancy contract leaves with the landlord, approved by you above an agreed limit",
            ],
          },
        ],
      },
      {
        id: "tax",
        h: "Tax on rental income",
        blocks: [
          {
            ul: [
              "The UAE does not levy income tax on individuals",
              "Under Cabinet Decision No. 49 of 2023, a person's income from property held in their own name is not subject to corporate tax, whatever the amount, as long as the activity is not carried out, and is not required to be carried out, under a licence",
              "Residential leases are generally exempt from VAT; commercial property is charged at 5%",
            ],
          },
          { note: "Your country of residence may tax income from Dubai property. ExpertCare does not give tax advice; check with an adviser there." },
        ],
      },
    ],
    fees: "Our management fee is a share of the annual rent, agreed in writing before we market the home.",
    faqs: [
      {
        q: "What does property management include?",
        a: "Finding and vetting the tenant, the contract and Ejari registration, banking the cheques and paying you the rent, maintenance, inspections with written reports, renewal notices and rent proposals within the law, and an annual statement.",
      },
      {
        q: "How much can I raise the rent at renewal?",
        a: "Only when the rent is more than 10% below the Smart Rental Index average for similar homes: by 5% if it is 11% to 20% below, 10% if 21% to 30% below, 15% if 31% to 40% below, and 20% if more than 40% below, under Decree No. 43 of 2013.",
      },
      {
        q: "How much notice must I give a tenant?",
        a: "At least 90 days before the contract ends to change the terms or not renew, unless the contract says otherwise. To take the home back to sell or move in, at least 12 months through a notary public or by registered mail.",
      },
      {
        q: "Do I pay tax on rent in Dubai?",
        a: "The UAE has no personal income tax, and under Cabinet Decision No. 49 of 2023 a person's rental income from property in their own name is outside corporate tax when no licence is required. Your home country may tax it.",
      },
      {
        q: "Who pays the service charges, me or the tenant?",
        a: "Dubai Law No. 6 of 2019 defines service charges as charges collected from owners. Budget for them each year and take them off the rent before judging the return.",
      },
      {
        q: "Can I let my home for short stays?",
        a: "With a holiday home permit from Dubai's Department of Economy and Tourism, which individual owners can obtain for their own homes. Check its current requirements and fees before you list.",
      },
    ],
    guides: ["renting-out-property-in-dubai", "service-charges-in-dubai", "investing-in-dubai-property", "renting-a-home-in-dubai"],
    intent: "landlord",
  },
  {
    slug: "off-plan-advisory",
    name: "Off-plan advisory",
    short: "Off-plan",
    seoTitle: "Off-plan advisory in Dubai: developer and project checks",
    seoDescription:
      "ExpertCare checks the developer, DLD registration, escrow account and payment plan before you reserve off-plan in Dubai, then handles Oqood and handover.",
    title: "Buying off-plan in Dubai with ExpertCare",
    dek: "The developer, the escrow account and the payment plan checked before you reserve, and the handover and snagging handled after.",
    image: "l-creek",
    summary: [
      "ExpertCare checks the developer, the project's Dubai Land Department registration, its escrow account and its payment plan before you reserve, and stays with you through Oqood registration, construction, handover and snagging.",
      "Under Dubai Law No. 8 of 2007 your payments go into the project's escrow account and can be used only to build that project.",
      "When you buy from a developer, the developer pays our commission and you pay nothing extra.",
    ],
    steps: [
      {
        t: "Brief.",
        d: "Budget, areas, size, when you need the home and whether you will live in it or let it. We also ask how you will pay the instalments, because banks lend at most 50% of an off-plan home's price.",
      },
      {
        t: "Developer and project checks.",
        d: "We confirm the developer, the project's registration with the Dubai Land Department, the escrow account number and its status in the Dubai REST app.",
      },
      {
        t: "Payment plan review.",
        d: "We read every instalment: the amount, whether a date or a construction stage triggers it, what falls due at handover and what the sale agreement says about delays.",
      },
      {
        t: "Reservation and sale agreement.",
        d: "You reserve, then sign the developer's sale and purchase agreement. We check it against the advert, the brochure and the payment plan before you sign.",
      },
      {
        t: "Oqood registration.",
        d: "The purchase is registered on the Dubai Land Department's Oqood system for 4% of the price plus AED 20. Developers may add an administration charge; we get it in writing first.",
      },
      {
        t: "Construction to handover.",
        d: "We track progress, flag each instalment before it falls due and arrange the handover appointment once the completion certificate is issued.",
      },
      {
        t: "Snagging and title deed.",
        d: "We walk the home with you or an inspector, list defects for the developer in writing, and follow the Oqood registration through to your title deed.",
      },
    ],
    sections: [
      {
        id: "checks",
        h: "What we check before you reserve",
        blocks: [
          {
            ul: [
              "The developer's identity and the project's registration with the Dubai Land Department",
              "The escrow account number on the advert matches the one in your agreement; you pay into that account and no other",
              "The advert carries a Trakheesi permit for the unit, the developer's name, the escrow account number and the expected completion date",
              "The payment plan, the handover payment and the delay clause in the sale and purchase agreement",
              "The service charge you will pay once the building is handed over",
            ],
          },
        ],
      },
      {
        id: "money",
        h: "Where your money goes",
        blocks: [
          {
            p: "Under Dubai Law No. 8 of 2007 off-plan buyers' payments go into an escrow account opened for that one project with an approved escrow agent. The money can be used only to build that project, and the developer's creditors cannot seize it.",
          },
          {
            p: "If a buyer stops paying, Law No. 13 of 2008 as amended by Law No. 19 of 2020 lets the developer, after a 30-day notice served through DLD, keep up to 40% of the unit's value on a project more than 60% complete, or up to 25% below that.",
          },
        ],
      },
      {
        id: "handover",
        h: "Handover and what the developer must fix",
        blocks: [
          {
            p: "Once the project has its completion certificate, the developer must register sold units in the names of buyers who have met their obligations, under Article 8 of Law No. 13 of 2008. That is when your Oqood registration becomes a title deed.",
          },
          {
            table: {
              head: ["Defect", "Developer liable for", "Counted from"],
              rows: [
                ["Defective mechanical, electrical, sanitary and sewerage installations", "1 year", "Handover"],
                ["Defects in the structural parts of the building", "10 years", "The completion certificate"],
              ],
            },
          },
          { p: "Both come from Article 40 of Dubai Law No. 6 of 2019, which makes any agreement to the contrary void." },
        ],
      },
      {
        id: "resale",
        h: "Selling before handover, and the Golden Visa",
        blocks: [
          {
            p: "An off-plan home can be resold before completion, subject to the developer's conditions for a resale NOC. Under Article 3 of Law No. 13 of 2008 every such sale must be entered in DLD's interim register or it is void.",
          },
          {
            p: "The Dubai Land Department's and GDRFA's pages on the property Golden Visa do not say whether an off-plan home counts towards the AED 2 million threshold. Confirm with GDRFA before you reserve with the visa in mind; our [Golden Visa service](/services/golden-visa-through-property/) sets out the published rules.",
          },
        ],
      },
    ],
    fees: "On a purchase from the developer, the developer pays our commission and you pay nothing extra; on an off-plan resale from another buyer, the customary 2% plus VAT applies and is agreed in Form B.",
    faqs: [
      {
        q: "Is my money protected when I buy off-plan in Dubai?",
        a: "Dubai Law No. 8 of 2007 requires off-plan payments to go into an escrow account for the project, used only for its construction and out of reach of the developer's creditors.",
      },
      {
        q: "What does off-plan advice cost me?",
        a: "Nothing extra when you buy from the developer, because the developer pays the broker's commission. You still pay the 4% Oqood registration fee plus AED 20 to the Dubai Land Department.",
      },
      {
        q: "Can I get a mortgage on an off-plan home?",
        a: "Yes, for up to 50% of the price under the Central Bank of the UAE's limits, subject to the bank's policy on the project.",
      },
      {
        q: "What should an off-plan advert show?",
        a: "A Trakheesi permit for the unit, the developer's name, the project's escrow account number and the expected completion date. Printed and video adverts also carry a Madmoun QR code.",
      },
      {
        q: "What happens if I cannot keep up the payments?",
        a: "After a 30-day notice served through DLD, the developer may terminate and keep up to 40% of the unit's value if the project is more than 60% complete, or up to 25% below that, and must refund the rest.",
      },
      {
        q: "When do I get the title deed?",
        a: "After the project receives its completion certificate, when the developer must register sold units in the names of buyers who have met their obligations under Article 8 of Law No. 13 of 2008.",
      },
    ],
    guides: ["buying-off-plan-in-dubai", "off-plan-vs-ready-property-in-dubai", "handover-and-snagging-in-dubai", "cost-of-buying-property-in-dubai", "golden-visa-through-property"],
    intent: "brief",
  },
  {
    slug: "mortgage-advisory",
    name: "Mortgage advisory",
    short: "Mortgages",
    seoTitle: "Mortgage advisory in Dubai: pre-approval to registration",
    seoDescription:
      "ExpertCare helps Dubai buyers get mortgage pre-approval and a final offer from UAE banks, within the Central Bank loan limits and the 50% debt burden rule.",
    title: "Mortgage help for buyers in Dubai",
    dek: "How much a bank can lend you, which documents it needs, and the order to do things in, from pre-approval to registration at DLD.",
    image: "guide-keys",
    summary: [
      "ExpertCare helps buyers prepare for a mortgage, obtain pre-approval and reach a final offer with UAE banks, then registers the mortgage at the Dubai Land Department alongside the sale.",
      "The Central Bank of the UAE caps lending at 80% of the price for an expatriate's first home up to AED 5 million, 70% above that, 60% for a second home and 50% off-plan; UAE nationals may borrow five points more on ready homes.",
      "A mortgage runs for up to 25 years and all monthly debt repayments must stay within 50% of income.",
      "ExpertCare is not a lender and does not give investment advice. The bank decides whether to lend and on what terms.",
    ],
    steps: [
      {
        t: "Assessment.",
        d: "We look at your income, existing debts, deposit and the kind of home you want, and show what the Central Bank limits and the 50% debt burden rule mean for your budget with the [mortgage calculator](/mortgage-calculator/).",
      },
      {
        t: "Documents.",
        d: "We prepare the pack the banks ask for and check it before it goes in, so the application is not held up by a missing page.",
      },
      {
        t: "Pre-approval.",
        d: "The bank reviews your income and debts and confirms how much it will lend. You view and make offers knowing the ceiling.",
      },
      {
        t: "Form F with the right dates.",
        d: "When you agree a purchase, we set a transfer date in Form F that leaves time for the bank's valuation and its final offer.",
      },
      {
        t: "Valuation and final offer.",
        d: "The bank values the home and makes its final offer. If the valuation is below the price, the bank lends against the lower figure and your deposit grows, so we flag that risk before you offer.",
      },
      {
        t: "Transfer and registration.",
        d: "The bank pays the seller at the registration trustee, and its mortgage is registered against your title deed at DLD for 0.25% of the loan plus AED 270.",
      },
    ],
    sections: [
      {
        id: "limits",
        h: "How much you can borrow",
        blocks: [
          {
            table: {
              head: ["Home", "Expatriates", "UAE nationals"],
              rows: [
                ["First home, AED 5 million or less", "80%", "85%"],
                ["First home, over AED 5 million", "70%", "75%"],
                ["Second or investment home", "60%", "65%"],
                ["Off-plan home", "50%", "50%"],
              ],
            },
          },
          {
            p: "Non-residents are lent to at each bank's discretion rather than under the regulation, commonly 50% to 60% of the price of a ready home and 50% off-plan. The rest of the price is your deposit, and the buying fees come on top.",
          },
        ],
      },
      {
        id: "affordability",
        h: "Term, age and affordability",
        blocks: [
          {
            ul: [
              "**Term.** A mortgage can run for up to 25 years",
              "**Age.** Each bank sets the age by which the loan must be repaid; many use about 65 for salaried borrowers and 70 for the self-employed",
              "**Debt burden.** All your monthly debt repayments together, the new mortgage included, may not exceed 50% of your income",
            ],
          },
          { tool: "mortgage" },
        ],
      },
      {
        id: "documents",
        h: "What the banks ask for",
        blocks: [
          {
            ul: [
              "Passport, and for residents the Emirates ID and residence visa",
              "Proof of income: a salary certificate and payslips for employees, or trade licence and audited accounts for the self-employed",
              "Bank statements showing salary credits and existing commitments",
              "Once a home is agreed, Form F, the seller's title deed and the developer's NOC",
            ],
          },
          { p: "Each bank has its own list, and non-residents are asked for more on income and funds. We confirm the exact list with the bank before the application goes in." },
        ],
      },
      {
        id: "fees",
        h: "Mortgage fees",
        blocks: [
          {
            ul: [
              "Dubai Land Department mortgage registration: 0.25% of the loan plus AED 270",
              "Bank valuation: typically AED 2,500 to 3,500 plus VAT",
              "Arrangement fee: typically 0.5% to 1% of the loan plus VAT, set by the bank",
              "Early settlement: capped by the Central Bank at 1% of the outstanding balance or AED 10,000, whichever is lower",
            ],
          },
          { note: "ExpertCare is not a lender and does not give investment advice. We help you prepare and present your application; the bank decides whether to lend and on what terms." },
        ],
      },
    ],
    fees: "Mortgage help is part of buying with us; the bank charges a valuation of typically AED 2,500 to 3,500 plus VAT and an arrangement fee of up to 1% of the loan plus VAT, and DLD charges 0.25% of the loan plus AED 270 to register the mortgage.",
    faqs: [
      {
        q: "What deposit do I need for a mortgage in Dubai?",
        a: "At least 20% of the price for an expatriate buying a first home worth up to AED 5 million, and 15% for a UAE national, because the Central Bank caps lending at 80% and 85%. Above AED 5 million the minimum rises to 30% and 25%; a second home needs 40% and 35%; an off-plan home needs 50%.",
      },
      {
        q: "Can non-residents get a mortgage in Dubai?",
        a: "Yes. Each bank sets its own limit for non-residents, commonly 50% to 60% of the price on a ready home and 50% off-plan. We work with banks that lend to non-residents and confirm their document list before you apply.",
      },
      {
        q: "How long can a Dubai mortgage run?",
        a: "Up to 25 years. Each bank also sets the age by which the loan must be repaid, often about 65 for salaried borrowers and 70 for the self-employed.",
      },
      {
        q: "How much can I borrow on my income?",
        a: "Your monthly repayments on all debts, the new mortgage included, must stay within 50% of your income. The [mortgage calculator](/mortgage-calculator/) shows the income a repayment needs.",
      },
      {
        q: "Should I get pre-approval before I view?",
        a: "Yes. Pre-approval tells you how much the bank will lend before you make an offer, and sellers take an offer with pre-approval behind it more seriously.",
      },
      {
        q: "Is ExpertCare a lender?",
        a: "No. ExpertCare is a real estate brokerage. We help you prepare and present a mortgage application to UAE banks and we do not give investment advice; the bank decides whether to lend and on what terms.",
      },
    ],
    guides: ["mortgages-in-dubai", "cost-of-buying-property-in-dubai", "how-to-buy-property-in-dubai", "buying-property-in-dubai-from-abroad", "off-plan-vs-ready-property-in-dubai"],
    intent: "brief",
  },
  {
    slug: "golden-visa-through-property",
    name: "Golden Visa through property",
    short: "Golden Visa",
    seoTitle: "Golden Visa through property in Dubai: how we help",
    seoDescription:
      "ExpertCare helps investors meet the AED 2 million Golden Visa threshold with Dubai property, prepares the document pack and books the visa appointment.",
    title: "The Golden Visa through property, with ExpertCare",
    dek: "What qualifies, where the official sources disagree, and how we prepare the purchase and the paperwork around it.",
    image: "terrace-dusk",
    summary: [
      "Property worth AED 2 million or more, in one property or several, lets an investor in Dubai apply for a Golden Visa, which the Dubai Land Department and GDRFA describe as ten years and renewable.",
      "ExpertCare helps you choose and buy property that meets the threshold, assembles the document pack and books the appointment with the authority.",
      "Where the official sources disagree, on the visa term and on off-plan homes, we say so rather than pick a side. ExpertCare does not give immigration advice.",
    ],
    steps: [
      {
        t: "Eligibility check.",
        d: "We look at what you own or plan to buy against the AED 2 million threshold, including how a mortgage or a joint owner affects it.",
      },
      {
        t: "Buying with the visa in mind.",
        d: "If you are still buying, we shortlist ready homes that meet the threshold, since the official pages do not address off-plan homes, and run the purchase through to the title deed.",
      },
      {
        t: "Bank letter if mortgaged.",
        d: "A mortgaged home qualifies with a no-objection letter from the lending bank. We request it from the bank.",
      },
      {
        t: "Document pack.",
        d: "Title deed, passport, photographs and the bank letter where needed, assembled and checked against the authority's current list.",
      },
      {
        t: "Appointment.",
        d: "We book the appointment with the Dubai Land Department or GDRFA Dubai, whichever runs the service when you apply, and go through the remaining steps the authority sets.",
      },
    ],
    sections: [
      {
        id: "rules",
        h: "The published rules",
        blocks: [
          {
            ul: [
              "Minimum value: property worth AED 2 million or more, in one property or several",
              "Mortgaged property qualifies with a no-objection letter from the lending bank",
              "Jointly owned property counts only when the applicant's own share is worth AED 2 million or more",
              "The Dubai Land Department lists the Golden Visa fees for the main applicant as AED 9,884.75",
            ],
          },
        ],
      },
      {
        id: "disagree",
        h: "Where the sources disagree or are silent",
        blocks: [
          {
            p: "The Dubai Land Department and GDRFA Dubai describe the visa as ten years and renewable. The federal government portal shows a different term for property investors. Confirm the term when you apply.",
          },
          {
            p: "Neither the Dubai Land Department's page nor GDRFA's addresses off-plan homes. If the visa is part of your plan, confirm with GDRFA before relying on an off-plan purchase, or buy a ready home.",
          },
        ],
      },
      {
        id: "below",
        h: "Below AED 2 million",
        blocks: [
          {
            p: "For property below the threshold, the Dubai Land Department's service page lists a two-year investor residence visa. A sole owner qualifies with a property of any value; a joint owner needs a share worth at least AED 400,000. DLD lists the investor fee as AED 10,212.50.",
          },
        ],
      },
      {
        id: "channel",
        h: "Where to apply",
        blocks: [
          {
            p: "The Dubai Land Department has run the Golden Visa and investor visa services for property owners. In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system, so we check the current channel, requirements and fees at the time you apply.",
          },
          { note: "ExpertCare does not give immigration advice. Decisions on visas rest with the UAE authorities." },
        ],
      },
    ],
    fees: "Our help with the purchase, the document pack and the appointment is part of buying with us; the Dubai Land Department lists the Golden Visa fee for the main applicant as AED 9,884.75, and the authority's fees apply when you apply.",
    faqs: [
      { q: "How much property do I need for a Golden Visa in Dubai?", a: "Property worth AED 2 million or more, in one property or several, according to the Dubai Land Department and GDRFA Dubai." },
      { q: "Does a mortgaged property count?", a: "Yes. The Dubai Land Department asks for a no-objection letter from the lending bank, which we request on your behalf." },
      { q: "Can joint owners combine their shares?", a: "GDRFA counts a jointly owned property only when the applicant's own share is worth AED 2 million or more." },
      { q: "Does an off-plan property qualify?", a: "The official DLD and GDRFA pages do not say. Confirm with GDRFA before you buy with the visa in mind, or choose a ready home." },
      { q: "How long is the Golden Visa?", a: "The Dubai Land Department and GDRFA describe it as ten years, renewable. The federal government portal shows a different term, so confirm it when you apply." },
      {
        q: "Can I get a residence visa with property under AED 2 million?",
        a: "The Dubai Land Department lists a two-year investor residence visa: a sole owner qualifies with property of any value, and a joint owner needs a share of at least AED 400,000. DLD lists the fee as AED 10,212.50.",
      },
    ],
    guides: ["golden-visa-through-property", "buying-property-in-dubai-from-abroad", "how-to-buy-property-in-dubai", "buying-off-plan-in-dubai"],
    intent: "general",
  },
  {
    slug: "investor-services",
    name: "Investor services",
    short: "Investors",
    seoTitle: "Dubai property investor services: sourcing to letting",
    seoDescription:
      "ExpertCare sources Dubai property for investors from DLD open data, works out the net return from rent, service charges and fees, and manages the home.",
    title: "Investing in Dubai property with ExpertCare",
    dek: "Homes sourced from the data, returns worked out the same way every time, and the letting handled by the team that found the home.",
    image: "area-business-bay",
    summary: [
      "ExpertCare sources property for investors in Dubai, works out the net return from the likely rent, the service charges and the buying fees, handles the purchase and then lets and manages the home.",
      "Our price statistics are our analysis of the Dubai Land Department's open transaction data, published on the [prices pages](/dubai-property-prices/).",
      "We do not promise a yield and we do not give investment advice; we show the inputs with their sources so you can judge them.",
    ],
    steps: [
      {
        t: "Brief.",
        d: "Budget, ready or off-plan, areas, whether you will let long-term or for short stays, and how long you plan to hold.",
      },
      {
        t: "The data.",
        d: "We show recent sale prices and price per square foot for each area and building from our analysis of DLD's open data, and the rent the Smart Rental Index and recent lets suggest.",
      },
      {
        t: "Shortlist with the return worked out.",
        d: "Each home comes with the same calculation: likely annual rent, less the approved service charge and the management fee, against the price plus the buying fees.",
      },
      {
        t: "Checks.",
        d: "The advert's Trakheesi permit, the title deed, the building's approved service charges and whether any are unpaid, and on off-plan the escrow account and the developer.",
      },
      {
        t: "Purchase.",
        d: "Form B, the offer, Form F, the developer's NOC and the transfer, or the reservation, sale agreement and Oqood registration on an off-plan home.",
      },
      {
        t: "Letting and management.",
        d: "The same team markets the home, vets the tenant, registers the Ejari and manages the tenancy, with an annual statement of rent, fees and costs.",
      },
    ],
    sections: [
      {
        id: "return",
        h: "How we work out a return",
        blocks: [
          {
            ol: [
              { t: "The rent.", d: "What similar homes in the building or community let for, from the Smart Rental Index and recent lets." },
              { t: "The running costs.", d: "The service charge RERA has approved for the building, looked up on DLD's Service Charge Index, plus our management fee and a provision for maintenance." },
              { t: "The full price.", d: "The price plus the buying fees: about 7% on a ready home bought with cash, or 4% plus AED 20 on Oqood for an off-plan home, worked out with the [buying costs calculator](/buying-costs/)." },
            ],
          },
          { p: "Net rent against the full price is the figure we compare homes on. We show the inputs rather than a headline percentage, because rent and service charges move." },
        ],
      },
      {
        id: "data",
        h: "The data we use",
        blocks: [
          {
            p: "We compute sales counts, median prices and median price per square foot by area and quarter from the Dubai Land Department's open transactions dataset. It is our analysis, not DLD's, published on the [prices pages](/dubai-property-prices/) with the dataset and licence named.",
          },
          {
            p: "Dubai recorded more than 270,000 real estate transactions worth AED 917 billion in 2025, 20% more than in 2024, according to the Dubai Media Office. Past figures do not tell you what a home will be worth.",
          },
        ],
      },
      {
        id: "letting",
        h: "Letting after you buy",
        blocks: [
          {
            ul: [
              "Every tenancy is registered with RERA through Ejari, for AED 177.75 online",
              "At renewal the rent can rise only within the bands of Decree No. 43 of 2013, from nothing to at most 20%",
              "Short stays need a holiday home permit from Dubai's Department of Economy and Tourism; shared housing needs a permit under Law No. 4 of 2026",
              "Our [property management](/landlords/) fee is a share of the annual rent, agreed in writing",
            ],
          },
        ],
      },
      {
        id: "tax",
        h: "Tax, and buying from abroad",
        blocks: [
          {
            p: "The UAE does not levy income tax on individuals. Under Cabinet Decision No. 49 of 2023, as explained by the Federal Tax Authority, a person's income from property held in their own name is not subject to corporate tax when the activity is not carried out, and is not required to be carried out, under a licence.",
          },
          {
            p: "Non-residents buy with a passport, and UAE banks commonly lend them 50% to 60% of the price of a ready home. Your country of residence may tax your Dubai income; we do not give tax advice.",
          },
        ],
      },
    ],
    fees: "Buying through us costs the customary 2% plus VAT on a resale and nothing extra on an off-plan purchase from a developer; management is a share of the annual rent, agreed in writing.",
    faqs: [
      {
        q: "What return can I expect on Dubai property?",
        a: "We do not promise a return. For each home we show the likely rent, the approved service charge, the management fee and the full price with fees, with sources, so you can judge the net figure.",
      },
      {
        q: "Where do your price figures come from?",
        a: "From our analysis of the Dubai Land Department's open real estate transactions dataset, published on our [prices pages](/dubai-property-prices/). They are our statistics, not DLD valuations.",
      },
      {
        q: "Do I pay tax on rental income in Dubai?",
        a: "The UAE has no personal income tax, and under Cabinet Decision No. 49 of 2023 rental income from property in your own name is outside corporate tax when no licence is required. Your home country may tax it.",
      },
      {
        q: "Can I let my investment for short stays?",
        a: "With a holiday home permit from Dubai's Department of Economy and Tourism, which individual owners can obtain for their own homes. Check its current requirements before you buy with short stays in mind.",
      },
      {
        q: "Is off-plan or ready better for investors?",
        a: "Neither as a rule. A ready home can be let from the day of transfer and financed up to 60% as a second home; an off-plan home is paid in stages, earns nothing until handover and is financed up to 50%. [Off-plan or ready](/guides/off-plan-vs-ready-property-in-dubai/) sets the two side by side.",
      },
      {
        q: "Can I invest without living in the UAE?",
        a: "Yes. Non-residents can own freehold property in Dubai's designated areas and borrow from UAE banks, which commonly lend them 50% to 60% of a ready home's price.",
      },
    ],
    guides: ["investing-in-dubai-property", "renting-out-property-in-dubai", "service-charges-in-dubai", "off-plan-vs-ready-property-in-dubai", "buying-property-in-dubai-from-abroad", "cost-of-buying-property-in-dubai"],
    intent: "brief",
  },
  {
    slug: "relocation-to-dubai",
    name: "Relocation to Dubai",
    short: "Relocation",
    seoTitle: "Relocating to Dubai: homes for families and companies",
    seoDescription:
      "ExpertCare helps families and companies moving to Dubai rent or buy, shortlist areas by commute, secure a home, register the Ejari and connect DEWA.",
    title: "Moving to Dubai with ExpertCare",
    dek: "Rent first or buy, which areas fit your commute, what a non-resident needs, and a home ready on the day you land.",
    image: "family-balcony",
    summary: [
      "ExpertCare helps families and companies moving to Dubai find a home before they arrive: rent or buy, areas chosen by commute, viewings by video, Ejari and utilities handled.",
      "Most people rent first, because a tenancy can be in place within weeks and a purchase carries about 7% in fees on a ready home.",
      "You do not need a residence visa to buy, and a valid passport identifies a non-resident at the registration trustee.",
    ],
    steps: [
      {
        t: "Brief.",
        d: "Who is moving, where you will work, where children will go to school, your budget, your arrival date and whether you want to rent or buy.",
      },
      {
        t: "Rent or buy.",
        d: "We set out both routes with their costs and timing, so the choice is made on numbers.",
      },
      {
        t: "Areas by commute.",
        d: "We map the shortlist against your workplace and schools using each area's Metro, tram and road links.",
      },
      {
        t: "Viewings.",
        d: "In person if you are visiting, or by video with the adviser walking the home, with the advert's permit and the service charge checked first.",
      },
      {
        t: "Contract and Ejari.",
        d: "For a rental we negotiate the rent, cheques and deposit, check the landlord's title deed, draw up the contract and register it on Ejari for AED 177.75 online.",
      },
      {
        t: "Utilities and arrival.",
        d: "With the Ejari certificate, the DEWA account for electricity and water is opened in your name, the keys are collected and the condition of the home is recorded.",
      },
    ],
    sections: [
      {
        id: "rent-or-buy",
        h: "Renting first or buying",
        blocks: [
          {
            table: {
              head: ["", "Renting", "Buying"],
              rows: [
                ["Upfront", "Rent in advance by post-dated cheques, a security deposit and AED 177.75 for Ejari", "The deposit, plus about 7% of the price in fees on a ready home bought with cash"],
                ["Borrowing", "Not needed", "Up to 80% of the price for an expatriate's first home up to AED 5 million; non-residents commonly 50% to 60%"],
                ["Flexibility", "At least 90 days' notice on either side to change terms or not renew", "Selling needs a transfer and the developer's NOC"],
                ["Residency", "No property visa", "A two-year investor visa, or a Golden Visa from AED 2 million"],
              ],
            },
          },
          { p: "The [buying costs calculator](/buying-costs/) shows the full purchase figure for any price." },
        ],
      },
      {
        id: "areas",
        h: "Areas by commute",
        blocks: [
          {
            ul: [
              "**Dubai Marina.** Apartments on the Red Line at Sobha Realty and DMCC stations, with the tram along the waterfront",
              "**Downtown Dubai and Business Bay.** Apartments in the centre, each with its own Red Line station: Burj Khalifa/Dubai Mall and Business Bay",
              "**Dubai Hills Estate.** Villas and apartments around the golf course; no Metro station, with RTA bus DH1 to Equiti station on the Red Line",
              "**Jumeirah Village Circle.** Lower-priced apartments and townhouses; no Metro station, with bus J01 to Mall of the Emirates",
              "**Dubai Creek Harbour.** New waterfront apartments; the Metro Blue Line, with a station here, is due to open on 9 September 2029",
            ],
          },
          { p: "Each [area guide](/areas/) has the homes, the transport and our price data; we mark the school commute for each shortlisted home." },
        ],
      },
      {
        id: "documents",
        h: "What a non-resident needs",
        blocks: [
          {
            ul: [
              "**To rent:** your passport, your visa status and a UAE bank account, because by market practice rent cheques are drawn on a UAE bank",
              "**To buy:** a valid passport, which identifies you at the registration trustee. If you cannot attend, an attorney signs under a power of attorney notarised abroad, legalised, attested, translated into Arabic and issued within two years",
              "**To borrow:** each bank sets its own list for non-residents",
            ],
          },
        ],
      },
      {
        id: "companies",
        h: "For companies moving staff",
        blocks: [
          {
            p: "We run one brief for a whole team: a shortlist per household, grouped viewings on a visit or by video, and one point of contact for the people team. Tenancy terms, cheques and deposits are negotiated to match your relocation policy.",
          },
          {
            p: "A timeline is set back from each arrival date: contract and Ejari first, then DEWA and keys. Where the move is permanent, the same adviser handles the purchase later; [buying a home in Dubai](/services/buying-property-in-dubai/) sets out that process.",
          },
        ],
      },
    ],
    fees: "Finding a rental home carries a fee agreed in writing before you sign; buying carries the customary 2% plus VAT on a resale and nothing extra on an off-plan purchase from a developer.",
    faqs: [
      {
        q: "Should I rent or buy when I move to Dubai?",
        a: "Most people rent first. A tenancy can be in place within weeks, needs no borrowing and can be left with at least 90 days' notice at expiry, while a purchase carries about 7% in fees on a ready home and a deposit of at least 20% if you borrow.",
      },
      {
        q: "Can I rent a home before I arrive?",
        a: "Yes. We view by video, negotiate the terms, check the landlord's title deed and prepare the contract so it is ready to sign and register on Ejari when you land.",
      },
      {
        q: "Do I need a residence visa to buy a home in Dubai?",
        a: "No. Buyers of any nationality can own freehold property in Dubai's designated areas, and a valid passport identifies a non-resident at the registration trustee.",
      },
      {
        q: "Which areas are best for commuting?",
        a: "Dubai Marina, Downtown Dubai and Business Bay each have a Red Line Metro station; Dubai Hills Estate and Jumeirah Village Circle rely on bus links; Dubai Creek Harbour gets a Blue Line station when the line opens on 9 September 2029.",
      },
      {
        q: "What is Ejari and do I need it to connect utilities?",
        a: "Ejari is the system for registering a tenancy with RERA, required by Dubai Law No. 26 of 2007 and costing AED 177.75 online. The certificate is the proof of address used when the DEWA account is opened in your name.",
      },
      {
        q: "Can you move a whole team?",
        a: "Yes. One brief covers every household, with a shortlist per family, grouped viewings and one contact for your people team.",
      },
    ],
    guides: ["renting-a-home-in-dubai", "how-to-buy-property-in-dubai", "buying-property-in-dubai-from-abroad", "cost-of-buying-property-in-dubai", "mortgages-in-dubai", "golden-visa-through-property"],
    intent: "general",
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
