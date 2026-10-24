/** The site-wide FAQ page, grouped. Answers may use [label](href) links and **bold**. Figures must
 * match lib/costs.ts and lib/facts.ts. */
export type FaqGroup = { id: string; h: string; faqs: { q: string; a: string }[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "buying",
    h: "Buying",
    faqs: [
      {
        q: "Can foreigners buy property in Dubai?",
        a: "Yes. Buyers of any nationality can own freehold property in Dubai's designated freehold areas, first set out in Regulation No. 3 of 2006 and extended since. They include Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, Dubai Hills Estate, Jumeirah Village Circle and Dubai Creek Harbour. You do not need a UAE residence visa to buy. [How to buy a home in Dubai](/guides/how-to-buy-property-in-dubai/) takes you through each step.",
      },
      {
        q: "How does ExpertCare work for a buyer?",
        a: "We take your brief, work out the full budget with the fees, help with mortgage pre-approval, shortlist homes whose adverts carry a valid Trakheesi permit, negotiate the offer and handle Form F, the developer's NOC and the transfer. The contract between you and us is Form B, the Dubai Land Department's standard buyer-broker agreement. [Buying property in Dubai](/services/buying-property-in-dubai/) sets out each step.",
      },
      {
        q: "What deposit do I pay when I agree to buy?",
        a: "By custom, 10% of the price when you sign Form F, RERA's standard sale contract between buyer and seller. It is market practice rather than a legal rule, and the deposit is held until the transfer.",
      },
      {
        q: "What is Form F?",
        a: "RERA's standard sale contract between buyer and seller, often called the MOU. It records the price, the deposit, who pays the developer's NOC fee and the transfer date. Form A is the seller's contract with their broker and Form B the buyer's; the [glossary](/dubai-property-glossary/) defines each.",
      },
      {
        q: "Can I buy without visiting Dubai?",
        a: "Yes, through an attorney appointed with a power of attorney. One issued abroad must be notarised there, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and issued no more than two years before it is used. [Buying property in Dubai from abroad](/guides/buying-property-in-dubai-from-abroad/) covers identification, paying and borrowing.",
      },
      {
        q: "How do I know an advert is genuine?",
        a: "Every property advert in Dubai must show its Trakheesi permit number, and printed and video adverts carry a Madmoun QR code you can scan to confirm the advert is approved. Brokerages must also show their ORN and the broker's BRN. We check all three before a home goes on your shortlist.",
      },
      {
        q: "Should I buy ready or off-plan?",
        a: "A ready home is paid for at transfer and can be lived in or let from that day; an off-plan home is paid in stages while it is built and can be financed only up to 50%. Both pay a 4% Dubai Land Department fee. [Off-plan or ready](/guides/off-plan-vs-ready-property-in-dubai/) compares them side by side.",
      },
    ],
  },
  {
    id: "off-plan",
    h: "Off-plan",
    faqs: [
      {
        q: "Is my money protected when I buy off-plan?",
        a: "Dubai Law No. 8 of 2007 requires off-plan payments to go into an escrow account for the project, used only for its construction and out of reach of the developer's creditors. Pay only into the escrow account named on the advert and in your agreement. [Buying off-plan in Dubai](/guides/buying-off-plan-in-dubai/) lists the checks.",
      },
      {
        q: "What is Oqood and what does it cost?",
        a: "The Dubai Land Department's interim register for off-plan sales. It records you as the buyer before a title deed exists, for 4% of the price plus AED 20. Developers may add their own administration charge, so ask for it in writing.",
      },
      {
        q: "What must an off-plan advert show?",
        a: "A Trakheesi permit for the unit itself, which every off-plan unit has needed since April 2024, the developer's name, the project's escrow account number and the expected completion date. Printed and video adverts also carry a Madmoun QR code.",
      },
      {
        q: "Can I get a mortgage on an off-plan home?",
        a: "Yes, for up to 50% of the price under the Central Bank of the UAE's limits, subject to the bank's policy on the project. Some buyers pay the construction instalments themselves and arrange a mortgage for the balance at handover.",
      },
      {
        q: "What does ExpertCare check before I reserve?",
        a: "The developer, the project's registration with the Dubai Land Department, the escrow account number, the project's status in the Dubai REST app, every instalment in the payment plan, the delay clause in the sale agreement and the service charge after handover. When you buy from a developer, the developer pays our commission. [Off-plan advisory](/services/off-plan-advisory/) sets out the process.",
      },
      {
        q: "How long is the developer liable for defects?",
        a: "One year from handover for defective mechanical, electrical, sanitary and sewerage installations, and ten years from the completion certificate for structural defects, under Article 40 of Dubai Law No. 6 of 2019. Any agreement to the contrary is void. [Handover and snagging in Dubai](/guides/handover-and-snagging-in-dubai/) explains what to inspect.",
      },
      {
        q: "What happens if I stop paying?",
        a: "After a 30-day notice served through DLD, the developer may terminate under Law No. 13 of 2008 as amended by Law No. 19 of 2020. It may keep up to 40% of the unit's value if the project is more than 60% complete, or up to 25% below that. It refunds the rest within a year, or within 60 days of reselling the unit, whichever is sooner.",
      },
      {
        q: "Can I sell an off-plan home before handover?",
        a: "Yes, subject to the developer's conditions for a resale NOC. Under Article 3 of Law No. 13 of 2008 every such sale must be entered in DLD's interim register or it is void.",
      },
    ],
  },
  {
    id: "selling",
    h: "Selling",
    faqs: [
      {
        q: "How does ExpertCare sell a home?",
        a: "We value it against our analysis of the Dubai Land Department's open transaction data, sign Form A, obtain the Trakheesi permit, market the home, qualify buyers, run viewings, bring you every offer in writing, prepare Form F, obtain the developer's NOC and attend the transfer at the registration trustee. [Selling property in Dubai](/sell/) sets out the process.",
      },
      {
        q: "What is Form A?",
        a: "RERA's standard contract between a seller and the broker marketing the home. It records the asking price, the listing term and the commission, and it is signed before the home is advertised.",
      },
      {
        q: "Who pays the fees when I sell?",
        a: "By custom the buyer pays the 4% Dubai Land Department transfer fee, although DLD's own schedule divides it equally and the split can be agreed in Form F. The developer's NOC fee of AED 500 to 5,000 is split as agreed in Form F. Our commission is agreed in Form A.",
      },
      {
        q: "How is my home valued?",
        a: "Against recent sales of similar homes in the same building or community, using our analysis of DLD's open transaction data on the [prices pages](/dubai-property-prices/), and the homes competing with yours. The statistics are our analysis, not a DLD valuation.",
      },
      {
        q: "Can I sell with a tenant in place?",
        a: "Yes. The tenancy and its Ejari contract pass to the buyer. If the buyer wants vacant possession, ending the tenancy at expiry because of the sale needs at least 12 months' notice served through a notary public or by registered mail.",
      },
      {
        q: "Can I sell with unpaid service charges?",
        a: "No. Under Dubai Law No. 6 of 2019 unpaid service charges are a lien on the home and it cannot be sold until they are paid. [Service charges in Dubai](/guides/service-charges-in-dubai/) explains how they are set and checked.",
      },
      {
        q: "Can I sell from abroad?",
        a: "Yes, through an attorney under a power of attorney that is notarised in the country of issue, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and issued within two years. DLD's fully digital sale service needs an Emirates ID, a UAE Pass and a UAE bank account, so non-residents use the trustee office or an attorney.",
      },
    ],
  },
  {
    id: "renting",
    h: "Renting",
    faqs: [
      {
        q: "Is Ejari registration mandatory?",
        a: "Yes. Dubai Law No. 26 of 2007 requires every tenancy contract to be registered with RERA through Ejari. Online registration costs AED 177.75; at a registration trustee centre the fees are AED 100, AED 10 and AED 10 plus a AED 95 service fee and VAT. The landlord, the tenant or an attorney can register it.",
      },
      {
        q: "How is rent paid in Dubai?",
        a: "Rent is quoted per year and, by market practice, paid in advance by post-dated cheques from a UAE bank account. The number of cheques is agreed with the landlord and written into the contract, and fewer cheques can bring the rent down.",
      },
      {
        q: "How much can my rent go up at renewal?",
        a: "Only within Decree No. 43 of 2013. If the rent is up to 10% below the Smart Rental Index average for similar homes there is no increase; the limit is 5% if it is 11% to 20% below, 10% if 21% to 30% below, 15% if 31% to 40% below, and 20% if more than 40% below.",
      },
      {
        q: "How much notice must I get if the landlord will not renew?",
        a: "At least 90 days before the contract ends, unless the contract says otherwise. To take the home back to sell it or for the owner or a first-degree relative to move in, the landlord must give at least 12 months' notice through a notary public or by registered mail.",
      },
      {
        q: "When do I get my security deposit back?",
        a: "At the end of the tenancy, less any deductions agreed for damage beyond normal wear. A written condition report with photographs at move-in and move-out protects both sides.",
      },
      {
        q: "What does ExpertCare do for tenants?",
        a: "We shortlist homes that fit your brief, confirm each advert carries a Trakheesi permit, negotiate the rent, cheques and deposit, check the landlord's title deed, draw up the contract and register it on Ejari. [Renting a home in Dubai](/rent/) sets out the steps, and our fee is agreed in writing before you sign.",
      },
      {
        q: "Should I rent or buy when I move to Dubai?",
        a: "Most people rent first. A tenancy needs no borrowing and can be left with at least 90 days' notice at expiry, while a ready home bought with cash carries about 7% in fees and a mortgage needs a deposit of at least 20%. [Relocation to Dubai](/services/relocation-to-dubai/) sets out both routes.",
      },
    ],
  },
  {
    id: "letting",
    h: "Letting and management",
    faqs: [
      {
        q: "What does ExpertCare's property management include?",
        a: "Finding and vetting the tenant, the contract and Ejari registration, banking the cheques and paying you the rent, maintenance, inspections with written reports, renewal notices and rent proposals within the law, and an annual statement. The fee is a share of the annual rent, agreed in writing. [Property management in Dubai](/landlords/) has the detail.",
      },
      {
        q: "How much can I raise the rent?",
        a: "Only when the rent is more than 10% below the Smart Rental Index average for similar homes: by 5% if it is 11% to 20% below, 10% if 21% to 30% below, 15% if 31% to 40% below, and 20% if more than 40% below, under Decree No. 43 of 2013. [Renting out property in Dubai](/guides/renting-out-property-in-dubai/) has the table.",
      },
      {
        q: "How much notice must I give a tenant?",
        a: "At least 90 days before the contract ends to change the terms or not renew, unless the contract says otherwise. To take the home back to sell it, or for you or a first-degree relative to live in, at least 12 months through a notary public or by registered mail.",
      },
      {
        q: "Do I pay tax on rental income?",
        a: "The UAE does not levy income tax on individuals, and under Cabinet Decision No. 49 of 2023 a person's rental income from property in their own name is not subject to corporate tax when the activity does not require a licence. Residential leases are generally exempt from VAT. Your country of residence may tax the income.",
      },
      {
        q: "Who pays the service charges?",
        a: "Dubai Law No. 6 of 2019 defines service charges as charges collected from owners. RERA must approve them, and you can check the approved figure for any building on DLD's Service Charge Index. Take them off the rent before judging the return.",
      },
      {
        q: "Can I let my home for short stays?",
        a: "With a holiday home permit from Dubai's Department of Economy and Tourism, which individual owners can obtain for their own homes. Shared housing needs a separate permit under Law No. 4 of 2026. Check the current requirements and fees before you list.",
      },
      {
        q: "How does ExpertCare work out a return for investors?",
        a: "The likely annual rent from the Smart Rental Index and recent lets, less the approved service charge and the management fee, against the price plus the buying fees from the [buying costs calculator](/buying-costs/). We show the inputs with their sources rather than a headline percentage, and we do not give investment advice. [Investor services](/services/investor-services/) explains the method.",
      },
    ],
  },
  {
    id: "fees-visas-law",
    h: "Fees, visas and law",
    faqs: [
      {
        q: "What fees do I pay when buying a ready home?",
        a: "About 7% of the price with cash. That covers the 4% Dubai Land Department transfer fee, AED 520 in title deed fees and the registration trustee fee of AED 4,000 plus VAT (AED 2,000 plus VAT under AED 500,000). It also covers the customary 2% agency fee plus VAT and the developer's NOC fee of AED 500 to 5,000. The [buying costs calculator](/buying-costs/) works it out for any price.",
      },
      {
        q: "What does a mortgage add to the fees?",
        a: "Dubai Land Department mortgage registration at 0.25% of the loan plus AED 270, a bank valuation of typically AED 2,500 to 3,500 plus VAT and an arrangement fee of typically 0.5% to 1% of the loan plus VAT. Early settlement is capped at 1% of the outstanding balance or AED 10,000, whichever is lower. The [mortgage calculator](/mortgage-calculator/) shows the repayments.",
      },
      {
        q: "How much can I borrow?",
        a: "The Central Bank of the UAE caps lending at 80% of the price for an expatriate's first home up to AED 5 million, 70% above that, 60% for a second home and 50% off-plan; UAE nationals may borrow 85%, 75% and 65% on ready homes. Non-residents are lent to at each bank's discretion, commonly 50% to 60%. The term is up to 25 years and all debt repayments must stay within 50% of income. See [how mortgages work in Dubai](/guides/mortgages-in-dubai/).",
      },
      {
        q: "Is the 2% agency fee set by law?",
        a: "No. 2% of the price plus VAT is the customary rate on a resale in Dubai, agreed with your broker in Form B. On an off-plan purchase from a developer, the developer pays the broker and the buyer pays nothing extra.",
      },
      {
        q: "How much property do I need for a Golden Visa?",
        a: "Property worth AED 2 million or more, in one property or several. The Dubai Land Department and GDRFA describe the visa as ten years and renewable; the federal portal shows a different term, so confirm it when you apply. Mortgaged homes qualify with a letter from the bank, and joint owners need a share worth AED 2 million. [The Golden Visa through property](/guides/golden-visa-through-property/) has the published rules.",
      },
      {
        q: "Can I get a residence visa with property under AED 2 million?",
        a: "The Dubai Land Department lists a two-year investor residence visa: a sole owner qualifies with property of any value, and a joint owner needs a share of at least AED 400,000. In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system, so confirm the channel and fees before you apply.",
      },
      {
        q: "Is there tax on property in Dubai?",
        a: "The UAE has no personal income tax. Rental income from property held in a person's own name is outside corporate tax when no licence is required, under Cabinet Decision No. 49 of 2023. Residential leases are generally exempt from VAT, and the first supply of a new residential property within three years of completion is zero-rated. [Dubai property facts](/dubai-property-facts/) lists every rule with its source.",
      },
      {
        q: "Which laws protect buyers and tenants?",
        a: "Law No. 7 of 2006 on property registration and freehold ownership, Law No. 8 of 2007 on off-plan escrow accounts, Law No. 13 of 2008 on the interim register, Law No. 26 of 2007 and Law No. 33 of 2008 on landlords and tenants, Decree No. 43 of 2013 on rent increases and Law No. 6 of 2019 on jointly owned property and developer liability. Each is cited on [Dubai property facts](/dubai-property-facts/).",
      },
    ],
  },
];
