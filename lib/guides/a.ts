import type { Guide } from "../blocks";
import { SOURCES as S } from "../sources";

export const GUIDES_A: Guide[] = [
  {
    slug: "how-to-buy-property-in-dubai",
    topic: "Buying",
    seoTitle: "How to buy property in Dubai: the steps from offer to deed",
    seoDescription:
      "Budget about 7% for fees, get pre-approved, sign Form F with a 10% deposit, get the developer NOC and transfer at a DLD trustee. Each step of buying in Dubai.",
    title: "Buying a home in Dubai: the process from start to keys",
    dek: "Who can own, what to budget, which forms you sign, and what happens at the registration trustee when the home becomes yours.",
    image: "guide-keys",
    summary: [
      "Anyone can buy freehold property in Dubai's designated freehold areas, whatever their nationality, and a UAE residence visa is not required.",
      "Plan for about 7% on top of the price of a ready home bought with cash. That covers the 4% DLD transfer fee, the customary 2% agency fee plus VAT, and the trustee, title deed and NOC fees.",
      "You and the seller sign Form F, the DLD's standard sale contract, and by custom you pay a 10% deposit at that point.",
      "The home becomes yours at a DLD registration trustee office, where the seller is paid and your title deed is issued.",
    ],
    updated: "2026-09-15",
    sections: [
      {
        id: "who-can-buy",
        h: "Who can buy property in Dubai",
        blocks: [
          {
            p: "Dubai lets buyers of every nationality own property outright in its designated freehold areas. Regulation No. 3 of 2006 listed the first of these areas, and the list has grown since. Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, Dubai Hills Estate, Jumeirah Village Circle and Dubai Creek Harbour are all on it. Our [area guides](/areas/) cover each of them.",
          },
          {
            p: "Under Dubai Law No. 7 of 2006, a non-UAE national may hold freehold title in a designated area with no time limit, or a leasehold right of up to 99 years. Outside the designated areas the rules differ, so confirm that an area is freehold before you make an offer.",
          },
          {
            p: "You do not have to live in the UAE. A non-resident buyer identifies themselves with a valid passport at the registration trustee. If you cannot attend in person, an attorney can sign for you under a power of attorney. One issued abroad must be notarised, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and less than two years old. [Buying property in Dubai from abroad](/guides/buying-property-in-dubai-from-abroad/) walks through it.",
          },
        ],
      },
      {
        id: "budget",
        h: "Setting a budget that includes the fees",
        blocks: [
          {
            p: "The price is not the whole number. On a ready home bought with cash, the fees come to about 7% of the price. Fix your budget with those fees inside it from the start.",
          },
          {
            ul: [
              "**DLD transfer fee:** 4% of the price, paid by the buyer by custom",
              "**Title deed fees:** AED 520 for an apartment or villa",
              "**Registration trustee fee:** AED 4,000 plus VAT, or AED 2,000 plus VAT when the price is under AED 500,000",
              "**Agency fee:** usually 2% of the price plus VAT",
              "**Developer NOC:** AED 500 to 5,000, set by the developer",
            ],
          },
          {
            p: "A mortgage adds the DLD mortgage registration fee of 0.25% of the loan plus AED 270, the bank's valuation fee and its arrangement fee. The [buying costs calculator](/buying-costs/) gives the full figure for any price, and [the cost of buying property in Dubai](/guides/cost-of-buying-property-in-dubai/) explains each line.",
          },
        ],
      },
      {
        id: "finance",
        h: "Get your mortgage pre-approval first",
        blocks: [
          {
            p: "If you are borrowing, speak to a bank before you start viewing. Pre-approval tells you the most the bank will lend. You then look only at homes you can afford, and your offer carries a figure the seller can rely on.",
          },
          {
            p: "The Central Bank of the UAE sets the ceiling. An expatriate buying a first home worth AED 5 million or less can borrow up to 80% of the price. A UAE national can borrow up to 85%. The limits are lower for homes over AED 5 million, for second homes and for off-plan homes, and non-residents borrow at each bank's discretion. [How mortgages work in Dubai](/guides/mortgages-in-dubai/) has the full table.",
          },
          {
            p: "What ExpertCare does for you here: before a viewing you know the price plus the DLD, trustee, agency and bank fees, so the figure you take to the bank is the figure you will pay. If you want help with the mortgage, we work on the application alongside the search.",
          },
        ],
      },
      {
        id: "broker",
        h: "Appointing a broker and checking adverts",
        blocks: [
          {
            p: "Form B is the Dubai Land Department's standard contract between a buyer and a broker. It records what the broker will do for you and the commission you will pay. Sign it before the broker starts work, so the terms are on paper.",
          },
          {
            p: "Every property advert in Dubai must carry a Trakheesi advertising permit number, together with the brokerage's office registration number (ORN) and the broker's registration number (BRN). Printed and video adverts have carried a Madmoun QR code since 24 April 2023. Scan it and the Dubai Land Department confirms whether the advert is valid.",
          },
          {
            p: "What ExpertCare does for you here: every home on this site carries its permit number. If a home cannot be advertised legally, we do not show it. The adviser who shows you a home stays with you through the offer, the mortgage, the transfer and the handover.",
          },
        ],
      },
      {
        id: "steps",
        h: "The steps from offer to title deed",
        blocks: [
          {
            ol: [
              {
                t: "Make your offer.",
                d: "Your broker puts the offer to the seller's side. Agree the price, the deposit, the transfer date and who pays the developer's NOC fee.",
              },
              {
                t: "Sign Form F.",
                d: "Form F is the Dubai Land Department's standard sale contract between buyer and seller, often called the MOU. It records the price, the deposit and the date of transfer. By custom you pay a 10% deposit when you sign, and it is held until the transfer.",
              },
              {
                t: "Finalise the mortgage.",
                d: "The bank values the home and issues its final offer. If the valuation is lower than the price, the bank lends against the valuation and the difference comes from you.",
              },
              {
                t: "Obtain the developer's NOC.",
                d: "The developer of the building issues a no-objection certificate confirming it does not object to the transfer. The fee is AED 500 to 5,000, set by the developer, and Form F records who pays it.",
              },
              {
                t: "Transfer at a registration trustee.",
                d: "Buyer and seller, or their attorneys, meet at a Dubai Land Department registration trustee office. The seller is paid, the fees are settled and the sale is registered.",
              },
              {
                t: "Collect your title deed.",
                d: "The title deed is issued in your name. If you have a mortgage, the bank's charge is registered against it at the same time, for 0.25% of the loan plus AED 270.",
              },
            ],
          },
        ],
      },
      {
        id: "transfer-day",
        h: "What happens on transfer day",
        blocks: [
          {
            p: "The transfer is the moment ownership passes. It takes place at a Dubai Land Department registration trustee office, an approved office that handles the registration on DLD's behalf.",
          },
          {
            ul: [
              "The seller receives the balance of the price. If you have a mortgage, the bank pays its share",
              "You pay the 4% transfer fee and the AED 520 title deed fees to the Dubai Land Department",
              "You pay the trustee's fee: AED 4,000 plus VAT, or AED 2,000 plus VAT when the price is under AED 500,000",
              "The sale is registered and the title deed is issued in your name",
            ],
          },
          {
            p: "Bring your passport. If an attorney attends for you, they bring the original power of attorney in the form the Dubai Land Department accepts.",
          },
        ],
      },
      {
        id: "off-plan",
        h: "Buying off-plan instead",
        blocks: [
          {
            p: "A home bought from a developer before the building is complete follows a different route. You reserve, sign the developer's sale agreement, pay in instalments into the project's escrow account, and register the purchase on the Oqood system for 4% of the price plus AED 20. There is no Form F with a private seller and no developer NOC on a first sale.",
          },
          {
            p: "[Buying off-plan in Dubai](/guides/buying-off-plan-in-dubai/) covers the whole process, and [off-plan or ready](/guides/off-plan-vs-ready-property-in-dubai/) helps you choose between the two.",
          },
        ],
      },
      {
        id: "expertcare",
        h: "What ExpertCare does for you",
        blocks: [
          {
            ul: [
              "**Before you view:** the price plus the DLD, trustee, agency and bank fees on every home, so you know the whole number first",
              "**During the search:** only homes with a valid advertising permit, and one adviser from the first viewing to the keys",
              "**At the offer:** the offer, Form F and the transfer date handled with the seller's side, and the mortgage application alongside",
              "**After the deal:** if you plan to let the home, the same team finds the tenant and handles rent collection, maintenance and renewals",
            ],
          },
          {
            p: "Every figure in this guide names its source: the Dubai Land Department, the Central Bank of the UAE and the Dubai Legislation Portal. The [facts page](/dubai-property-facts/) gathers them in one place.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can a foreigner buy property in Dubai?",
        a: "Yes. Buyers of any nationality can own freehold property in Dubai's designated freehold areas, which were first listed in Regulation No. 3 of 2006 and include Dubai Marina, Downtown Dubai, Palm Jumeirah and Dubai Hills Estate. A UAE residence visa is not required.",
      },
      {
        q: "What is Form F?",
        a: "Form F is the Dubai Land Department's standard sale contract between a buyer and a seller, often called the MOU. It records the price, the deposit, the transfer date and who pays the developer's NOC fee.",
      },
      {
        q: "How much deposit do I pay when I sign Form F?",
        a: "By custom, 10% of the price. It is market practice rather than a legal requirement, and the deposit is held until the transfer.",
      },
      {
        q: "What is Form B?",
        a: "Form B is the Dubai Land Department's standard contract between a buyer and a broker. It sets out what the broker does for you and the commission you pay.",
      },
      {
        q: "How much are the fees when buying property in Dubai?",
        a: "About 7% of the price on a ready home bought with cash: the 4% DLD transfer fee, AED 520 in title deed fees, the registration trustee fee of AED 4,000 plus VAT, the customary 2% agency fee plus VAT, and the developer's NOC fee of AED 500 to 5,000. A mortgage adds registration, valuation and arrangement fees.",
      },
      {
        q: "Where does the transfer take place?",
        a: "At a Dubai Land Department registration trustee office. Buyer and seller, or their attorneys, meet there. The seller is paid, the fees are settled, the sale is registered and the title deed is issued in the buyer's name.",
      },
      {
        q: "Do I need to be in Dubai to buy?",
        a: "No. A non-resident buyer identifies themselves with a valid passport at the registration trustee, and an attorney can sign under a power of attorney that has been notarised, legalised, attested, translated into Arabic and issued within the last two years.",
      },
      {
        q: "How do I check that a property advert is genuine?",
        a: "Look for the Trakheesi permit number and the brokerage's ORN and broker's BRN. Printed and video adverts carry a Madmoun QR code. Scan it to confirm the advert with the Dubai Land Department.",
      },
    ],
    sources: [S.dldSale, S.freeholdReg, S.freeholdList, S.law7, S.poa, S.formF, S.legalSteps, S.trakheesi, S.dldMadmoun, S.dldMortgage, S.kt],
  },
  {
    slug: "cost-of-buying-property-in-dubai",
    topic: "Costs and mortgages",
    seoTitle: "Cost of buying property in Dubai: every fee (2026)",
    seoDescription:
      "Fees add about 7% to a ready home in Dubai: the 4% DLD transfer fee, AED 520 title deed fees, trustee, agency and NOC fees. Plus off-plan and mortgage fees.",
    title: "The cost of buying property in Dubai, fee by fee",
    dek: "What the Dubai Land Department charges, what the broker, developer and bank charge, who pays each one, and a worked example at AED 2,000,000.",
    image: "hero",
    summary: [
      "On a ready home bought with cash, fees add about 7% to the price. The largest is the Dubai Land Department transfer fee of 4%, which by custom the buyer pays in full.",
      "Fixed DLD fees are AED 520 for the title deed and AED 4,000 plus VAT for the registration trustee, or AED 2,000 plus VAT below AED 500,000. The customary agency fee is 2% plus VAT, and the developer's NOC costs AED 500 to 5,000.",
      "At AED 2,000,000 the fees total about AED 131,720, or 6.6% of the price.",
      "Off-plan homes pay 4% plus AED 20 on Oqood. A mortgage adds 0.25% of the loan plus AED 270 at DLD, plus the bank's valuation and arrangement fees.",
    ],
    updated: "2026-09-15",
    sections: [
      {
        id: "ready",
        h: "Fees on a ready home",
        blocks: [
          {
            p: "A ready home is one that is built and has a title deed. When you buy one from its owner, five fees apply. Three go to the Dubai Land Department or its registration trustee, one to your broker and one to the developer of the building.",
          },
          {
            table: {
              head: ["Fee", "Amount", "Who sets it"],
              rows: [
                ["Transfer fee", "4% of the price", "Dubai Land Department"],
                [
                  "Title deed fees",
                  "AED 520 for an apartment or villa: AED 250 for the title deed, AED 250 for the unit, AED 10 knowledge fee and AED 10 innovation fee",
                  "Dubai Land Department",
                ],
                ["Registration trustee fee", "AED 4,000 plus VAT at AED 500,000 and above; AED 2,000 plus VAT below", "Dubai Land Department"],
                ["Agency fee", "Usually 2% of the price plus VAT", "Market custom, agreed with your broker"],
                ["Developer NOC", "AED 500 to 5,000", "The developer"],
              ],
            },
          },
          {
            p: "VAT in the UAE is 5%. It is added to the trustee fee and the agency fee, and to the bank's valuation and arrangement fees if you borrow. The transfer fee and the title deed fees are shown without it.",
          },
          {
            p: "The transfer fee is a percentage, so it scales with the price. The title deed and trustee fees are fixed, so they weigh more on a cheaper home. That is why the total sits a little under 7% at AED 2,000,000 and a little over it on a smaller purchase: at AED 1,000,000 the same five fees come to about AED 70,720, or 7.1%.",
          },
        ],
      },
      {
        id: "who-pays",
        h: "Who pays which fee",
        blocks: [
          {
            p: "By custom the buyer pays the whole 4% transfer fee. The Dubai Land Department's own fee schedule splits it equally between buyer and seller, so a different split is possible if both sides agree to it in Form F, the sale contract.",
          },
          {
            ul: [
              "**Transfer fee:** the buyer, by custom",
              "**Title deed and trustee fees:** settled at the transfer; our calculator shows them against the buyer",
              "**Agency fee:** agreed between you and your broker. 2% plus VAT is the customary rate, not a legal one",
              "**Developer NOC:** whoever Form F says. Agree it before you sign",
            ],
          },
          {
            p: "If you are selling, the same schedule applies from the other side of the table. By custom your buyer pays the transfer fee, and your own agency fee is agreed in writing before the home is listed.",
          },
          {
            p: "The NOC matters to both sides. Under Dubai Law No. 6 of 2019 a home may not be sold while its service charges are unpaid, so a seller settles them before the developer issues the certificate. Agree in Form F who pays the NOC fee, and ask for the figure before you sign rather than at the transfer.",
          },
        ],
      },
      {
        id: "example",
        h: "A worked example at AED 2,000,000",
        blocks: [
          {
            p: "Take a ready apartment at AED 2,000,000, bought with cash and no mortgage. The price is above AED 500,000, so the higher trustee fee applies. The NOC is shown at the top of the developer's range.",
          },
          { example: 2_000_000 },
          {
            p: "The fees come to about AED 131,720, which is 6.6% of the price. Add a mortgage and the bank's fees and the DLD registration fee come on top. The calculator further down runs the same sum for any price.",
          },
        ],
      },
      {
        id: "off-plan",
        h: "Fees on an off-plan home",
        blocks: [
          {
            p: "A home bought from the developer before completion is registered on the Dubai Land Department's Oqood system rather than transferred at a trustee. The fee is the same 4% of the price, plus AED 10 knowledge and AED 10 innovation fees. At AED 2,000,000 that is AED 80,000 plus AED 20.",
          },
          {
            ul: [
              "**No trustee or title deed fee at this stage.** Our calculator shows only the Oqood fee and the AED 20 admin fees on an off-plan purchase. The title deed is issued once the project has its completion certificate",
              "**No developer NOC.** There is no previous owner on a first sale from the developer",
              "**Developer administration fees.** Some developers charge their own, and they vary. Ask for them in writing before you reserve",
            ],
          },
          {
            p: "[Buying off-plan in Dubai](/guides/buying-off-plan-in-dubai/) covers the payment plan, the escrow account that holds your instalments, and the checks to make before you reserve.",
          },
        ],
      },
      {
        id: "mortgage",
        h: "Fees when you buy with a mortgage",
        blocks: [
          {
            table: {
              head: ["Fee", "Amount", "Who sets it"],
              rows: [
                ["Mortgage registration", "0.25% of the loan plus AED 270", "Dubai Land Department"],
                ["Valuation", "Typically AED 2,500 to 3,500 plus VAT", "Your bank"],
                ["Arrangement fee", "Typically 0.5% to 1% of the loan plus VAT", "Your bank"],
              ],
            },
          },
          {
            p: "There is no Central Bank cap on arrangement fees; each bank sets its own, so compare them. Registration and a 1% arrangement fee together add about 1.3% of the loan, plus the valuation fee.",
          },
          {
            p: "On the AED 2,000,000 example above, an expatriate's first-home loan of AED 1,600,000 adds AED 4,270 in DLD registration, AED 3,150 for a valuation at AED 3,000 plus VAT, and AED 16,800 for an arrangement fee of 1% plus VAT. The fees rise from about AED 131,720 to about AED 155,940.",
          },
          {
            p: "If you repay early, the Central Bank of the UAE caps the early settlement fee at 1% of the outstanding balance or AED 10,000, whichever is lower. [How mortgages work in Dubai](/guides/mortgages-in-dubai/) sets out the loan limits and the deposit you need.",
          },
        ],
      },
      { id: "calculator", h: "Work out your costs", blocks: [{ tool: "costs" }] },
      {
        id: "after",
        h: "Costs once you own",
        blocks: [
          { p: "Owning carries running costs that are not part of the purchase but belong in the same budget." },
          {
            ul: [
              "**Service charges:** an annual charge for the upkeep of shared areas in a managed building or community. The rate differs by building. Under Dubai Law No. 6 of 2019 it needs RERA's approval on a budget approved by a certified audit firm, and a home cannot be sold while its service charges are unpaid. See [service charges in Dubai](/guides/service-charges-in-dubai/)",
              "**Income tax:** the UAE does not levy income tax on individuals. Rental income from property held in your own name is not subject to corporate tax when the activity does not require a licence, under Cabinet Decision No. 49 of 2023",
              "**VAT on letting:** residential leases are generally exempt. The first supply of a new residential property within three years of completion is zero-rated",
              "**Moving and furnishing:** there is no official figure. Budget for them alongside the fees",
            ],
          },
          { p: "Ask for the current service charge on any home you consider, and ask before you make the offer rather than after." },
        ],
      },
      {
        id: "expertcare",
        h: "How ExpertCare shows the cost",
        blocks: [
          {
            p: "Every home on this site shows the price plus the Dubai Land Department, trustee, agency and bank fees before you book a viewing. The figures come from the same sources as this guide, and the [buying costs calculator](/buying-costs/) lets you run any price, ready or off-plan, with or without a loan. If a home needs a developer NOC, who pays it is settled before Form F is signed, not after.",
          },
          {
            p: "Owners who let through us get the same approach after the purchase: rent collection, maintenance and renewals handled by the team that found the tenant, with the costs set out before you commit. [Renting out property in Dubai](/guides/renting-out-property-in-dubai/) explains the rules a landlord works under.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How much does it cost to buy property in Dubai?",
        a: "About 7% of the price on a ready home bought with cash. The 4% DLD transfer fee is the largest part. The rest is AED 520 in title deed fees, the trustee fee of AED 4,000 plus VAT, the customary 2% agency fee plus VAT and the developer's NOC of AED 500 to 5,000. At AED 2,000,000 the total is about AED 131,720.",
      },
      {
        q: "Who pays the 4% DLD transfer fee?",
        a: "The buyer, by custom. The Dubai Land Department's own schedule divides the fee equally between buyer and seller, so the two sides can agree a different split in Form F.",
      },
      {
        q: "What are the DLD title deed fees?",
        a: "AED 520 for an apartment or villa: AED 250 for the title deed, AED 250 for the unit, and AED 10 each in knowledge and innovation fees.",
      },
      {
        q: "What is the registration trustee fee?",
        a: "AED 4,000 plus VAT when the price is AED 500,000 or more, and AED 2,000 plus VAT below that. The trustee is the DLD-approved office where the transfer takes place.",
      },
      {
        q: "Is the agency fee fixed by law?",
        a: "No. 2% of the price plus VAT is the customary rate in Dubai. The commission is agreed between you and your broker.",
      },
      {
        q: "What fees does an off-plan purchase carry?",
        a: "4% of the price to register on Oqood, plus AED 10 knowledge and AED 10 innovation fees, and any administration charge the developer sets. There is no developer NOC on a first sale from the developer.",
      },
      {
        q: "What fees does a mortgage add?",
        a: "DLD mortgage registration of 0.25% of the loan plus AED 270, a bank valuation of typically AED 2,500 to 3,500 plus VAT, and an arrangement fee of typically 0.5% to 1% of the loan plus VAT. Early settlement is capped at 1% of the balance or AED 10,000, whichever is lower.",
      },
      {
        q: "Is there property tax in Dubai?",
        a: "The UAE does not levy income tax on individuals. Rental income from property held in your own name is not subject to corporate tax when the activity does not require a licence, under Cabinet Decision No. 49 of 2023. Residential leases are generally exempt from VAT.",
      },
    ],
    sources: [S.dldSale, S.dldMortgage, S.dldInitial, S.pfFees, S.bayutCosts, S.earlySettle, S.law6, S.uaeTax, S.ftaRei, S.mofVat],
  },
  {
    slug: "mortgages-in-dubai",
    topic: "Costs and mortgages",
    seoTitle: "Mortgages in Dubai: loan limits, deposits and fees (2026)",
    seoDescription:
      "A Dubai bank may lend an expatriate up to 80% of a first home up to AED 5 million, over 25 years, within a 50% debt rule. Deposits, fees, non-resident limits.",
    title: "Mortgages in Dubai: what a bank will lend and what it costs",
    dek: "The Central Bank's loan limits, the deposit each one implies, the 25-year term, the 50% debt rule, the fees, and the order to do things in.",
    image: "viewing",
    summary: [
      "For an expatriate, a bank in Dubai may lend up to 80% of the price of a first home worth AED 5 million or less, 70% above that, 60% on a second home and 50% on an off-plan home. The caps are set by the Central Bank of the UAE.",
      "UAE nationals can borrow five points more on ready homes: 85%, 75% and 65%. Off-plan is 50% for everyone.",
      "Non-residents borrow at each bank's discretion, commonly 50% to 60% of a ready home's price.",
      "The term is up to 25 years, and all your monthly debt repayments together must stay within 50% of your income.",
    ],
    updated: "2026-09-15",
    sections: [
      {
        id: "limits",
        h: "How much a bank can lend",
        blocks: [
          {
            p: "The Central Bank of the UAE sets the maximum share of a home's price a bank may lend. Three things decide it: whether you are an expatriate or a UAE national, the price, and whether this is your first home or a second one.",
          },
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
            p: "These are ceilings. A bank may lend less, and it decides case by case on your income, your debts and the home itself.",
          },
          {
            p: "The AED 5 million line refers to the price of the home, not the size of the loan. A first home at AED 5 million or less carries the 80% cap for an expatriate; above that line the cap is 70%. A second or investment home carries 60% whatever its price, and an off-plan home 50% for everyone.",
          },
          {
            p: "On a first home at AED 2,000,000, an expatriate may borrow up to AED 1,600,000. A UAE national may borrow up to AED 1,700,000. On a second home at the same price the figures fall to AED 1,200,000 and AED 1,300,000.",
          },
        ],
      },
      {
        id: "deposit",
        h: "The deposit each limit implies",
        blocks: [
          { p: "Whatever the bank does not lend, you pay. The minimum deposit is the mirror of the cap." },
          {
            table: {
              head: ["Home", "Expatriates", "UAE nationals"],
              rows: [
                ["First home, AED 5 million or less", "20% of the price", "15%"],
                ["First home, over AED 5 million", "30%", "25%"],
                ["Second or investment home", "40%", "35%"],
                ["Off-plan home", "50%", "50%"],
              ],
            },
          },
          {
            p: "The buying fees come on top of the deposit. On a ready home they are about 7% of the price with cash, and a loan adds its own fees, listed below. The [buying costs calculator](/buying-costs/) shows the cash you need for any price and loan, and [the cost of buying property in Dubai](/guides/cost-of-buying-property-in-dubai/) explains each fee.",
          },
          {
            p: "Take an expatriate buying a first home at AED 2,000,000 with the full 80% loan of AED 1,600,000. The deposit is AED 400,000. The calculator puts the fees, with the DLD registration and the bank's valuation and arrangement fees, at about AED 155,940. The cash you need on the day is therefore about AED 555,940, before moving and furnishing.",
          },
        ],
      },
      {
        id: "non-residents",
        h: "Mortgages for non-residents",
        blocks: [
          {
            p: "You do not need to live in the UAE to borrow from a UAE bank. The Central Bank's caps do not set the figure for non-residents; each bank sets its own policy. Banks commonly lend 50% to 60% of the price on a ready home, and 50% on an off-plan home.",
          },
          {
            p: "Ask the bank for its non-resident terms in writing before you make an offer, so the deposit you plan for is the deposit you will need. A mortgage is an option, not a requirement: a non-resident can buy with cash and identify themselves with a passport at the registration trustee. [Buying property in Dubai from abroad](/guides/buying-property-in-dubai-from-abroad/) covers the rest of the process for a buyer overseas.",
          },
        ],
      },
      {
        id: "affordability",
        h: "Term, age and the 50% rule",
        blocks: [
          {
            ul: [
              "**Term:** up to 25 years",
              "**Age:** each bank sets the age by which the loan must be repaid. Many use about 65 for salaried borrowers and 70 for the self-employed",
              "**Debt burden:** all your monthly debt repayments, the new mortgage included, may not exceed 50% of your income",
            ],
          },
          {
            p: "The 50% rule is the one that limits most borrowers. A car loan or a credit card balance counts against it, so clearing smaller debts before you apply can raise what the bank will lend. The [mortgage calculator](/mortgage-calculator/) shows the repayment on any loan, rate and term, and the income that repayment needs.",
          },
          {
            p: "A shorter term means a higher monthly repayment and less interest over the life of the loan. A longer term, up to the 25-year limit, lowers the repayment and makes the 50% rule easier to meet.",
          },
          {
            p: "The rule works in both directions. A repayment of AED 10,000 a month needs an income of at least AED 20,000 a month if you have no other debts. If you already pay AED 2,000 a month on a car loan, the mortgage repayment may take no more than AED 8,000 of that income, so the bank lends less or asks for a longer term.",
          },
        ],
      },
      {
        id: "fees",
        h: "What a mortgage costs",
        blocks: [
          {
            table: {
              head: ["Fee", "Amount", "Who sets it"],
              rows: [
                ["Mortgage registration", "0.25% of the loan plus AED 270", "Dubai Land Department"],
                ["Valuation", "Typically AED 2,500 to 3,500 plus VAT", "Your bank"],
                ["Arrangement fee", "Typically 0.5% to 1% of the loan plus VAT", "Your bank"],
                ["Early settlement", "Capped at 1% of the outstanding balance or AED 10,000, whichever is lower", "Central Bank of the UAE"],
              ],
            },
          },
          {
            p: "There is no Central Bank cap on arrangement fees, so compare them between banks. Registration and a 1% arrangement fee together add about 1.3% of the loan, plus the valuation fee.",
          },
          {
            p: "The early settlement cap matters if you expect to sell or refinance within a few years. Read that clause in the final offer before you sign.",
          },
          {
            p: "On a loan of AED 1,600,000, the DLD registration fee is AED 4,270. A valuation at AED 3,000 plus VAT costs AED 3,150, and an arrangement fee of 1% plus VAT costs AED 16,800. The three together are about AED 24,220, on top of the fees you would pay buying with cash.",
          },
        ],
      },
      {
        id: "compare",
        h: "What to compare between banks",
        blocks: [
          {
            p: "The Central Bank sets the caps, the term and the debt rule, and they are the same at every bank. The things that differ between banks are the ones to compare.",
          },
          {
            ul: [
              "**The arrangement fee.** There is no cap, and the range of 0.5% to 1% plus VAT is a wide one on a large loan",
              "**The valuation fee.** Typically AED 2,500 to 3,500 plus VAT, and paid whether or not the loan goes ahead, so ask",
              "**The age limit.** Each bank sets the age by which the loan must be repaid, which decides the longest term it will offer you",
              "**The early settlement terms.** The cap is 1% of the balance or AED 10,000, whichever is lower, but read how each bank applies it",
              "**Non-resident terms.** If you live abroad, the share of the price each bank lends is its own policy, commonly 50% to 60%",
              "**Off-plan projects.** Each bank decides which projects it lends on, so ask about the specific project early",
            ],
          },
        ],
      },
      {
        id: "order",
        h: "The order to do it in",
        blocks: [
          {
            ol: [
              {
                t: "Get pre-approval.",
                d: "Before you view, the bank checks your income and debts and tells you the most it will lend. Your offer then rests on a figure the bank has confirmed.",
              },
              {
                t: "Make your offer and sign Form F.",
                d: "Set a transfer date in Form F that leaves time for the valuation and the final offer.",
              },
              {
                t: "Valuation.",
                d: "The bank values the home. If the valuation is lower than the price, it lends against the lower figure, and the difference comes from you.",
              },
              {
                t: "Final offer.",
                d: "The bank issues its final offer, with the rate, the term and the fees. Read the early settlement terms before you sign.",
              },
              {
                t: "Transfer.",
                d: "At the registration trustee the bank pays the seller its share, and its mortgage is registered against your title deed for 0.25% of the loan plus AED 270.",
              },
            ],
          },
          {
            p: "What ExpertCare does for you here: we help with the mortgage alongside the search, and we set the transfer date in Form F around the bank's steps so the two do not collide. The adviser who shows you the home stays with you through the mortgage and the transfer.",
          },
        ],
      },
      { id: "calculator", h: "Estimate your repayments", blocks: [{ tool: "mortgage" }] },
    ],
    faqs: [
      {
        q: "How much can I borrow for a property in Dubai?",
        a: "Up to 80% of the price as an expatriate buying a first home worth AED 5 million or less, 70% above AED 5 million, 60% for a second home and 50% for an off-plan home. UAE nationals may borrow 85%, 75% and 65% on ready homes. The caps are set by the Central Bank of the UAE.",
      },
      {
        q: "What deposit do I need for a mortgage in Dubai?",
        a: "At least 20% for an expatriate's first home worth up to AED 5 million, and 15% for a UAE national. Above AED 5 million the minimum is 30% and 25%. On a second home it is 40% and 35%, and on an off-plan home 50%. The buying fees come on top.",
      },
      {
        q: "Can I get a mortgage in Dubai if I live abroad?",
        a: "Yes. Lending to non-residents is set by each bank rather than by the Central Bank. Banks commonly lend 50% to 60% of the price on a ready home and 50% on an off-plan home.",
      },
      {
        q: "What is the maximum mortgage term in Dubai?",
        a: "25 years. Each bank also sets the age by which the loan must be repaid, often about 65 for salaried borrowers and 70 for the self-employed.",
      },
      {
        q: "What is the 50% debt burden rule?",
        a: "All your monthly debt repayments together, the new mortgage included, may not exceed 50% of your income. Car loans and credit card payments count towards it.",
      },
      {
        q: "What fees come with a Dubai mortgage?",
        a: "DLD mortgage registration of 0.25% of the loan plus AED 270, a bank valuation of typically AED 2,500 to 3,500 plus VAT, and an arrangement fee of typically 0.5% to 1% of the loan plus VAT. Early settlement is capped at 1% of the balance or AED 10,000, whichever is lower.",
      },
      {
        q: "Should I get pre-approval before I view homes?",
        a: "Yes. Pre-approval tells you the most the bank will lend before you make an offer, so your budget and your offer rest on a figure the bank has confirmed.",
      },
      {
        q: "What happens if the bank values the home below the price?",
        a: "The bank lends against the valuation, not the price, so your deposit grows by the difference. Leave time in Form F for the valuation before the transfer date.",
      },
    ],
    sources: [S.cbuae, S.kt, S.nonRes, S.dldMortgage, S.bayutCosts, S.earlySettle],
  },
  {
    slug: "buying-off-plan-in-dubai",
    topic: "Off-plan",
    seoTitle: "Buying off-plan in Dubai: escrow, Oqood and payment plans",
    seoDescription:
      "Off-plan payments in Dubai go into a project escrow account by law, and the sale is registered on Oqood for 4% plus AED 20. Adverts, mortgages and handover too.",
    title: "Buying off-plan in Dubai: how it works and what to check",
    dek: "Payment plans, the escrow law behind every instalment, Oqood registration, what an advert must show, borrowing against an unbuilt home, and handover.",
    image: "l-creek",
    summary: [
      "When you buy off-plan in Dubai, every payment goes into an escrow account opened for that project under Dubai Law No. 8 of 2007, and the money can be used only to build it.",
      "The sale is registered on the Dubai Land Department's Oqood system for 4% of the price plus AED 20, before a title deed exists.",
      "Each off-plan advert needs a Trakheesi permit for the unit and must show the developer, the escrow account number and the expected completion date.",
      "A bank may lend up to 50% of an off-plan home's price.",
    ],
    updated: "2026-09-15",
    sections: [
      {
        id: "what",
        h: "What buying off-plan means",
        blocks: [
          {
            p: "An off-plan home is one you buy from the developer before the building is complete, sometimes before construction starts. You do not pay the price at a transfer. You pay in stages set by a payment plan: a first payment at reservation, instalments as the building rises, and the balance at handover or after it.",
          },
          {
            p: "Payment plans differ from one developer to the next. Some ask for most of the price during construction, and some leave a larger share to handover or after it. The plan is part of the sale agreement, so read it as closely as the price.",
          },
          {
            p: "Because there is no title deed yet, the protections differ from a resale. Two matter most: the escrow account that holds your money, and the Oqood register that records you as the buyer. [Off-plan or ready](/guides/off-plan-vs-ready-property-in-dubai/) weighs the two routes against each other.",
          },
        ],
      },
      {
        id: "escrow",
        h: "Where your money is held",
        blocks: [
          {
            p: "Dubai Law No. 8 of 2007 requires a developer to open an escrow account for each project with an approved escrow agent. Buyers' payments go into that account and may be spent only on building that project. The developer's creditors cannot seize the money.",
          },
          {
            p: "The escrow account number must appear on every off-plan advert. Check that the number in your sale agreement matches the one on the advert, and make every payment to that account. Keep the receipt for each instalment, because the record of your payments is what shows you have met your obligations when the unit is registered in your name.",
          },
          {
            note: "Never pay an off-plan instalment into a personal account, a broker's account or any account other than the project's escrow account. The protection in Law No. 8 of 2007 applies to money in that account.",
          },
        ],
      },
      {
        id: "oqood",
        h: "Registering your purchase on Oqood",
        blocks: [
          {
            p: "Oqood is the Dubai Land Department's register of off-plan sales. Once your purchase is registered, DLD's records show you as the buyer of that unit, even though the title deed will not exist until the building is complete.",
          },
          {
            ul: [
              "**Oqood fee:** 4% of the price, the same rate as the transfer fee on a ready home",
              "**Admin fees:** AED 10 knowledge fee and AED 10 innovation fee",
              "**Developer charges:** some developers add their own administration fee. Ask for it in writing before you reserve",
              "**No NOC:** a first sale from the developer carries no developer NOC fee",
            ],
          },
          {
            p: "Once the project has its completion certificate, the developer must register the sold units in the names of the buyers who have met their obligations, under Article 8 of Dubai Law No. 13 of 2008. That is when your title deed is issued. The [buying costs calculator](/buying-costs/) shows the off-plan fees for any price.",
          },
        ],
      },
      {
        id: "adverts",
        h: "What an off-plan advert must show",
        blocks: [
          {
            p: "Dubai's advertising rules ask more of an off-plan advert than of a resale advert. Before you take one seriously, look for all of these.",
          },
          {
            ul: [
              "A Trakheesi advertising permit number. Since April 2024 each off-plan unit needs its own permit, not only the project",
              "The developer's name",
              "The project's escrow account number",
              "The expected completion date",
              "A Madmoun QR code on printed and video adverts, which you scan to confirm the advert with the Dubai Land Department",
              "The brokerage's ORN and the broker's BRN, as on every property advert",
            ],
          },
          {
            p: "An advert missing any of these is a reason to stop and ask questions before you pay anything.",
          },
        ],
      },
      {
        id: "checks",
        h: "Checks before you reserve",
        blocks: [
          {
            ol: [
              {
                t: "The developer and the project.",
                d: "Confirm the developer's name and that the project is registered with the Dubai Land Department with an escrow account.",
              },
              {
                t: "The escrow account number.",
                d: "Match it between the advert, the sale agreement and the payment instructions.",
              },
              {
                t: "The payment plan.",
                d: "Read each instalment: the amount, and whether a date or a stage of construction triggers it.",
              },
              {
                t: "The completion date and the delay terms.",
                d: "Note the expected completion date on the advert, and read what the sale agreement says if the developer is late.",
              },
              {
                t: "Every fee.",
                d: "The 4% Oqood fee and AED 20 in admin fees, any developer administration charge, and the service charge once the building is handed over.",
              },
              {
                t: "What happens if you cannot pay.",
                d: "Under Law No. 13 of 2008 as amended by Law No. 19 of 2020, a developer may keep up to 40% of the unit's value if the project is more than 60% complete, or up to 25% below that, when a buyer defaults. Know this before you commit to a plan.",
              },
            ],
          },
          {
            p: "What ExpertCare does for you here: we show off-plan homes with their permit, developer and escrow details, and we set out the payment plan with the Oqood fee and the service charge beside it, so you see the whole number before you reserve. The same adviser stays with you to handover.",
          },
        ],
      },
      {
        id: "finance",
        h: "Borrowing against an off-plan home",
        blocks: [
          {
            p: "The Central Bank of the UAE caps a mortgage on an off-plan home at 50% of the price, for expatriates and UAE nationals alike. On a home at AED 2,000,000 the loan is at most AED 1,000,000, and the other half comes from you, with the Oqood fee and the bank's fees on top. Each bank also decides which projects it will lend on, so ask about the specific project early.",
          },
          {
            p: "Some buyers pay the construction instalments from their own funds and arrange a mortgage for the balance due at handover. If that is your plan, get the bank's view on the project before you reserve, not at handover. A bank that declines a project is not a verdict on the project, but it does mean the balance must come from you. [How mortgages work in Dubai](/guides/mortgages-in-dubai/) has the limits for every kind of buyer.",
          },
        ],
      },
      {
        id: "handover",
        h: "Handover and defects",
        blocks: [
          {
            p: "At handover you inspect the home, settle what the payment plan says is due, and receive the keys. Your title deed follows once the developer registers the unit after the completion certificate. From that point the home is a ready home: if you sell it later, the buyer pays the 4% transfer fee by custom and the transfer takes place at a registration trustee.",
          },
          {
            ul: [
              "The developer must repair or replace defective installations for one year from handover, under Article 40 of Dubai Law No. 6 of 2019",
              "The developer must fix structural defects for ten years from the completion certificate, under the same article",
              "Service charges apply once the building is handed over. Ask for the figure before you reserve, not at handover",
            ],
          },
          {
            p: "[Handover and snagging in Dubai](/guides/handover-and-snagging-in-dubai/) explains the inspection and what belongs on the snag list.",
          },
        ],
      },
      {
        id: "visa",
        h: "Off-plan and the Golden Visa",
        blocks: [
          {
            p: "The Dubai Land Department's and GDRFA Dubai's pages on the property Golden Visa do not say whether an off-plan home counts towards the AED 2 million threshold. If the visa is part of your reason to buy, confirm the position with GDRFA before you reserve. [The Golden Visa through property](/guides/golden-visa-through-property/) sets out the published rules.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is my money safe when I buy off-plan in Dubai?",
        a: "Dubai Law No. 8 of 2007 requires off-plan payments to go into an escrow account opened for the project, to be spent only on building it, and the developer's creditors cannot seize it. The protection applies to money paid into that account, so pay nowhere else.",
      },
      {
        q: "What is Oqood?",
        a: "Oqood is the Dubai Land Department's register for off-plan sales. It records you as the buyer before a title deed exists. The fee is 4% of the price plus AED 20.",
      },
      {
        q: "How much are the fees on an off-plan purchase?",
        a: "4% of the price plus AED 20 to the Dubai Land Department for Oqood registration, and any administration charge the developer sets. There is no developer NOC on a first sale from the developer.",
      },
      {
        q: "Can I get a mortgage on an off-plan property in Dubai?",
        a: "Yes, for up to 50% of the price under the Central Bank of the UAE's limits. Each bank decides which projects it lends on, so ask about the specific project before you reserve.",
      },
      {
        q: "What must an off-plan advert in Dubai show?",
        a: "A Trakheesi permit for the unit, the developer's name, the project's escrow account number and the expected completion date, plus a Madmoun QR code on printed and video adverts.",
      },
      {
        q: "What happens if I cannot keep up with the payment plan?",
        a: "Under Law No. 13 of 2008 as amended by Law No. 19 of 2020, the developer may keep up to 40% of the unit's value on a project more than 60% complete, or up to 25% on one below that.",
      },
      {
        q: "How long is a developer liable for defects?",
        a: "One year from handover for defective installations, and ten years from the completion certificate for structural defects, under Article 40 of Dubai Law No. 6 of 2019.",
      },
      {
        q: "Does an off-plan home count for the Golden Visa?",
        a: "The Dubai Land Department and GDRFA Dubai pages on the property Golden Visa do not address off-plan homes. Confirm with GDRFA before you buy with the visa in mind.",
      },
    ],
    sources: [S.escrow, S.dldInitial, S.law13, S.law19, S.law6, S.trakheesi, S.pfTrakheesi, S.dldMadmoun, S.kt, S.dldVisa, S.gdrfa],
  },
  {
    slug: "golden-visa-through-property",
    topic: "Residency",
    seoTitle: "Dubai Golden Visa through property: the AED 2 million rule",
    seoDescription:
      "Property worth AED 2 million lets an investor in Dubai apply for a Golden Visa, ten years per DLD and GDRFA. How mortgaged, joint and off-plan homes count.",
    title: "The Golden Visa through property in Dubai",
    dek: "The AED 2 million threshold, how a mortgage or a co-owner changes the count, the silence on off-plan, the two-year investor visa below the line, and where to apply.",
    image: "area-downtown-dubai",
    summary: [
      "Property in Dubai worth AED 2 million or more, in one home or several, lets an investor apply for a Golden Visa. The Dubai Land Department and GDRFA Dubai describe it as ten years and renewable; the federal portal shows a different term.",
      "A mortgaged home counts with a no-objection letter from the bank. A jointly owned home counts only when your own share is worth AED 2 million.",
      "Below AED 2 million, DLD lists a two-year investor residence visa: any value for a sole owner, or a share of at least AED 400,000 for a joint owner.",
      "In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system, so confirm the channel and the fees when you apply.",
    ],
    updated: "2026-09-16",
    sections: [
      {
        id: "threshold",
        h: "The AED 2 million threshold",
        blocks: [
          {
            p: "The rule is a value, not a number of homes. Property worth at least AED 2 million makes a property investor in Dubai eligible to apply for a Golden Visa. One home at AED 2 million qualifies, and so do two homes worth AED 1 million each.",
          },
          {
            p: "The Dubai Land Department and GDRFA Dubai describe the visa as ten years and renewable. The federal government portal shows a different term for property investors. The sources do not agree, so confirm the term with GDRFA when you apply rather than planning around either figure.",
          },
          {
            ul: [
              "**Minimum value:** AED 2 million, in one property or several",
              "**Term:** ten years, renewable, according to DLD and GDRFA Dubai",
              "**Mortgaged property:** qualifies with a no-objection letter from the lending bank",
              "**Jointly owned property:** counts only when the applicant's own share is worth AED 2 million or more",
              "**Off-plan property:** not addressed on the official pages",
            ],
          },
        ],
      },
      {
        id: "mortgaged",
        h: "Homes with a mortgage",
        blocks: [
          {
            p: "You do not need to own the home outright. The Dubai Land Department accepts a mortgaged property with a no-objection letter from the lending bank.",
          },
          {
            p: "Ask the bank for the letter before you apply, since the application needs it. If you are still choosing a lender, raise the letter with the bank at the start so it is not a surprise later. [How mortgages work in Dubai](/guides/mortgages-in-dubai/) covers the loan itself.",
          },
        ],
      },
      {
        id: "joint",
        h: "Homes owned with someone else",
        blocks: [
          {
            p: "If you co-own a home, GDRFA Dubai counts only your own share, and that share must itself be worth AED 2 million or more. A couple who own a home worth AED 3 million in equal halves each hold AED 1.5 million, so neither qualifies on that home alone.",
          },
          {
            p: "On the published rule, a co-owner qualifies when their own share reaches AED 2 million, whatever the other shares are worth. Two people who hold a home worth AED 4 million in equal halves each hold AED 2 million, so each meets the threshold on that home. Decide how a home will be held before the transfer, because the title deed records the shares.",
          },
          {
            p: "The threshold is the same whether you buy with cash or with a mortgage. What changes is the paperwork: a mortgaged home needs the bank's letter, and a co-owned home needs your share to reach the line on its own.",
          },
        ],
      },
      {
        id: "off-plan",
        h: "Off-plan homes",
        blocks: [
          {
            p: "Neither the Dubai Land Department's service page nor GDRFA Dubai's says whether an off-plan home counts towards the threshold. Off-plan is where an answer would matter most, since instalments are paid over years before a title deed exists.",
          },
          {
            p: "Do not rely on an off-plan purchase for the visa until GDRFA confirms the position in writing. [Buying off-plan in Dubai](/guides/buying-off-plan-in-dubai/) covers the purchase itself.",
          },
        ],
      },
      {
        id: "two-year",
        h: "Below AED 2 million: the two-year investor visa",
        blocks: [
          {
            p: "For property under the threshold, the Dubai Land Department's service page lists a two-year investor residence visa. A sole owner qualifies with a property of any value. A joint owner needs a share worth at least AED 400,000.",
          },
          {
            table: {
              head: ["Visa", "Property", "Term", "Fee listed by DLD"],
              rows: [
                ["Golden Visa", "AED 2 million or more, in one property or several", "Ten years, renewable, according to DLD and GDRFA Dubai", "AED 9,884.75 for the main applicant"],
                ["Investor residence visa", "Any value for a sole owner; a share of AED 400,000 or more for a joint owner", "Two years", "AED 10,212.50"],
              ],
            },
          },
          {
            p: "Both services have been run by the Dubai Land Department for property owners, and the fees above are the ones DLD lists. They may change when the services move to GDRFA Dubai.",
          },
          {
            p: "The investor visa fee DLD lists, AED 10,212.50, is higher than the Golden Visa fee it lists for the main applicant, AED 9,884.75. The fee is not what separates the two routes. The property value and the term are.",
          },
        ],
      },
      {
        id: "purchase",
        h: "The purchase behind the visa",
        blocks: [
          {
            p: "The visa follows the property, so the purchase comes first and runs as any other does. You can buy freehold in Dubai's designated freehold areas whatever your nationality, and you do not need a residence visa to buy. [How to buy a home in Dubai](/guides/how-to-buy-property-in-dubai/) sets out each step.",
          },
          {
            ul: [
              "**The fees.** On a ready home at AED 2,000,000 bought with cash, the fees are about AED 131,720: the 4% DLD transfer fee, AED 520 in title deed fees, the trustee fee of AED 4,000 plus VAT, the customary 2% agency fee plus VAT and the developer's NOC. The [buying costs calculator](/buying-costs/) runs any price",
              "**The title deed.** It is issued in your name at the registration trustee and records your share of the home. It is the document that shows what you own",
              "**A mortgage.** An expatriate may borrow up to 80% of a first home worth AED 5 million or less, and the home still qualifies with the bank's no-objection letter",
              "**Several homes.** The threshold can be met across more than one property, so two smaller homes can add up to it",
            ],
          },
          {
            p: "Buying off-plan to reach the threshold is the one route the official pages do not confirm. Treat it as open until GDRFA answers in writing.",
          },
        ],
      },
      {
        id: "apply",
        h: "Where to apply and what it costs",
        blocks: [
          {
            p: "The Dubai Land Department has handled the Golden Visa and the investor visa for property owners, and lists the Golden Visa fee for the main applicant as AED 9,884.75. In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system.",
          },
          {
            p: "Because the channel is changing, check three things before you apply: where to submit the application, which documents it needs, and the fee on the day.",
          },
          {
            note: "ExpertCare does not give immigration advice. Decisions on visas rest with the UAE authorities. Confirm every requirement with GDRFA Dubai before you buy with the visa in mind.",
          },
        ],
      },
      {
        id: "before",
        h: "If the visa is part of why you are buying",
        blocks: [
          {
            ol: [
              {
                t: "Fix the value, not the count.",
                d: "Add up the homes you will own. The total must reach AED 2 million, counting only your own share of any co-owned home.",
              },
              {
                t: "Check the term with GDRFA.",
                d: "The official pages disagree on it. Ask before you plan around ten years.",
              },
              {
                t: "Ask the bank for its letter.",
                d: "A mortgaged home needs a no-objection letter from the lender.",
              },
              {
                t: "Treat off-plan as unconfirmed.",
                d: "The official pages are silent. Get a written answer first.",
              },
              {
                t: "Confirm the channel and the fee.",
                d: "The services are moving from DLD to GDRFA Dubai, and the published fees may change with them.",
              },
            ],
          },
          {
            p: "What ExpertCare does for you here: when you tell us the visa matters, we search within the threshold, show the value of your share on any co-owned home, and point you to the published DLD and GDRFA rules. The application itself is yours to make with GDRFA Dubai.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How much property do I need for a Golden Visa in Dubai?",
        a: "Property worth AED 2 million or more. The value can come from one property or several.",
      },
      {
        q: "How long is the Golden Visa for property investors?",
        a: "The Dubai Land Department and GDRFA Dubai describe it as ten years and renewable. The federal government portal shows a different term for property investors, so confirm it with GDRFA when you apply.",
      },
      {
        q: "Does a property with a mortgage qualify?",
        a: "Yes. The Dubai Land Department asks for a no-objection letter from the lending bank.",
      },
      {
        q: "Can co-owners add their shares together?",
        a: "No. GDRFA Dubai counts a jointly owned property only when the applicant's own share is worth AED 2 million or more.",
      },
      {
        q: "Does an off-plan property count towards the Golden Visa?",
        a: "The official Dubai Land Department and GDRFA Dubai pages do not say. Get a written answer from GDRFA before you buy off-plan with the visa in mind.",
      },
      {
        q: "Is there a residence visa for property under AED 2 million?",
        a: "The Dubai Land Department lists a two-year investor residence visa. A sole owner qualifies with property of any value, and a joint owner needs a share worth at least AED 400,000. DLD lists the fee as AED 10,212.50.",
      },
      {
        q: "Where do I apply for the property Golden Visa?",
        a: "The Dubai Land Department has run the service and lists the fee for the main applicant as AED 9,884.75. In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system, so check the current channel before you apply.",
      },
    ],
    sources: [S.dldVisa, S.investorVisa, S.gdrfa, S.gdrfaMove, S.uae],
  },
];
