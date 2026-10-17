import type { Guide } from "../blocks";
import { SOURCES as S } from "../sources";

export const REFERENCE_GUIDES: Guide[] = [
  {
    slug: "how-to-buy-property-in-dubai",
    topic: "Buying",
    seoTitle: "How to buy property in Dubai: a step-by-step guide for buyers",
    seoDescription:
      "How to buy a home in Dubai from start to finish: who can buy, budgeting for fees, mortgage pre-approval, Form F, the developer NOC, the transfer and your title deed.",
    title: "How to buy a home in Dubai, step by step",
    dek: "From setting your budget to collecting the title deed: every stage of buying a ready home, what you sign and what you pay.",
    image: "guide-keys",
    summary: [
      "Buyers of any nationality can own freehold property in Dubai's designated freehold areas, and they do not need to live in the UAE.",
      "On a ready home bought with cash, budget about 7% on top of the price: the 4% DLD transfer fee, a 2% agency fee plus VAT, and the trustee, title deed and NOC fees.",
      "The sale contract between buyer and seller is Form F. By custom the buyer pays a 10% deposit when it is signed.",
      "Ownership passes at a Dubai Land Department registration trustee office, where the title deed is issued in the buyer's name.",
    ],
    updated: "2026-09-15",
    sections: [
      {
        id: "who-can-buy",
        h: "Who can buy",
        blocks: [
          {
            p: "Buyers of any nationality can own property outright, as freehold, in Dubai's designated freehold areas. They were first set out in Regulation No. 3 of 2006 and more have been added since. They include Dubai Marina, Palm Jumeirah, Downtown Dubai, Business Bay, Dubai Hills Estate, Jumeirah Village Circle and Dubai Creek Harbour.",
          },
          {
            p: "You do not need to live in the UAE to buy: non-resident foreigners identify themselves with a valid passport at the registration trustee, and an attorney can sign for you. [Buying property in Dubai from abroad](/guides/buying-property-in-dubai-from-abroad/) explains how, and [how mortgages work in Dubai](/guides/mortgages-in-dubai/) covers borrowing as a non-resident.",
          },
        ],
      },
      {
        id: "steps",
        h: "The steps",
        blocks: [
          {
            ol: [
              {
                t: "Set a budget that includes the fees.",
                d: "On a ready home bought with cash, plan for about 7% on top of the price: the 4% Dubai Land Department transfer fee, the customary 2% agency fee plus VAT, the registration trustee fee, the title deed fees and the developer's NOC fee. The [buying costs calculator](/buying-costs/) works it out for any price.",
              },
              {
                t: "Arrange your mortgage before you choose.",
                d: "If you are borrowing, ask a bank for pre-approval first. It tells you how much you can borrow. The Central Bank of the UAE sets the ceiling: an expatriate buying a first home worth up to AED 5 million can borrow up to 80% of the price.",
              },
              {
                t: "Appoint your broker.",
                d: "Form B is the Dubai Land Department's standard contract between a buyer and a broker. It sets out what the broker does for you and the commission.",
              },
              {
                t: "View homes, and check every advert.",
                d: "Every property advert in Dubai must carry a Trakheesi permit number, and printed and video adverts carry a Madmoun QR code you can scan to confirm the advert is valid.",
              },
              {
                t: "Agree the terms and sign Form F.",
                d: "Form F, often called the MOU, is the Dubai Land Department's standard sale contract between buyer and seller. It records the price, the deposit and the transfer date. By custom the buyer pays a 10% deposit when it is signed, held until the transfer.",
              },
              {
                t: "The developer issues its NOC.",
                d: "The developer confirms it has no objection to the transfer, for a fee of AED 500 to 5,000 that it sets itself. Who pays it is agreed in Form F.",
              },
              {
                t: "Transfer ownership at a registration trustee.",
                d: "Buyer and seller, or their representatives, meet at a Dubai Land Department registration trustee office. The seller is paid, the transfer fee, title deed fees and the trustee's fee of AED 4,000 plus VAT (AED 2,000 plus VAT under AED 500,000) are settled, and the sale is registered.",
              },
              {
                t: "Receive your title deed.",
                d: "The title deed is issued in your name. If you have a mortgage, the bank's charge is registered at the same time, for 0.25% of the loan plus AED 270.",
              },
            ],
          },
        ],
      },
      {
        id: "off-plan",
        h: "If you are buying off-plan",
        blocks: [
          {
            p: "Buying from a developer before a building is complete follows a different path: you reserve, sign the developer's sale agreement, pay in stages into the project's escrow account, and register the purchase on the Oqood system for 4% of the price. [Buying off-plan in Dubai](/guides/buying-off-plan-in-dubai/) covers it in full.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can foreigners buy property in Dubai?",
        a: "Yes. Buyers of any nationality can own freehold property in Dubai's designated freehold areas, which include most of the best-known communities, among them Dubai Marina, Downtown Dubai and Palm Jumeirah.",
      },
      {
        q: "How much deposit do I pay when I agree to buy?",
        a: "By custom, 10% of the price when you sign Form F, the sale contract with the seller. It is market practice rather than a legal requirement, and it is held until the transfer.",
      },
      {
        q: "How much are the fees on top of the price?",
        a: "For a ready home bought with cash, about 7%: the 4% DLD transfer fee, a 2% agency fee plus VAT, the registration trustee fee, the DLD title deed fees and the developer's NOC fee. A mortgage adds registration, valuation and arrangement fees.",
      },
      {
        q: "Do I need a UAE residence visa to buy?",
        a: "No. Non-residents can buy freehold property in Dubai, and can borrow from UAE banks, which usually lend them a smaller share of the price, commonly 50% to 60%.",
      },
    ],
    sources: [S.dldSale, S.freeholdReg, S.freeholdList, S.formF, S.legalSteps, S.dldMadmoun, S.dldMortgage, S.kt],
  },
  {
    slug: "cost-of-buying-property-in-dubai",
    topic: "Costs and mortgages",
    seoTitle: "Cost of buying property in Dubai (2026): DLD, agency and mortgage fees",
    seoDescription:
      "Every fee a buyer pays in Dubai, checked against the Dubai Land Department: the 4% transfer fee, title deed and trustee fees, agency commission, Oqood and mortgage fees, with a calculator.",
    title: "What it costs to buy property in Dubai",
    dek: "Every fee on a ready home, an off-plan home and a mortgage, with the government figures checked against the Dubai Land Department.",
    image: "hero",
    summary: [
      "The Dubai Land Department transfer fee is 4% of the price, and by custom the buyer pays all of it.",
      "DLD title deed fees are AED 520 for an apartment or villa. The registration trustee charges AED 4,000 plus VAT, or AED 2,000 plus VAT under AED 500,000.",
      "The customary agency fee is 2% plus VAT, and developers charge AED 500 to 5,000 for a resale NOC.",
      "A ready AED 2,000,000 home bought with cash carries about AED 131,720 in fees, 6.6% of the price.",
      "Off-plan purchases pay 4% plus AED 20 to register on Oqood. A mortgage adds 0.25% of the loan plus AED 270 at DLD, and the bank's own fees.",
    ],
    updated: "2026-09-15",
    sections: [
      {
        id: "ready",
        h: "Buying a ready home",
        blocks: [
          { p: "These are the costs on a resale home, one that is already built and has a title deed." },
          {
            table: {
              head: ["Fee", "Set by", "Amount"],
              rows: [
                ["Transfer fee", "Dubai Land Department", "4% of the price"],
                ["Title deed fees", "Dubai Land Department", "AED 520 for an apartment or villa: AED 250 title deed, AED 250 for the unit, and AED 10 each in knowledge and innovation fees"],
                ["Registration trustee fee", "Dubai Land Department", "AED 4,000 + VAT, or AED 2,000 + VAT under AED 500,000"],
                ["Agency fee", "Market custom", "Usually 2% of the price + VAT"],
                ["Developer NOC", "The developer", "AED 500 to 5,000"],
              ],
            },
          },
          {
            p: "By custom the buyer pays the whole 4% transfer fee. The Dubai Land Department's own schedule divides it equally between buyer and seller, so the two sides can agree a different split in Form F.",
          },
        ],
      },
      {
        id: "example",
        h: "A worked example",
        blocks: [
          { p: "A ready apartment at AED 2,000,000, bought with cash:" },
          { example: 2_000_000 },
          { p: "That is about 6.6% on top of the price. The calculator below works it out for any price, with or without a mortgage." },
        ],
      },
      {
        id: "off-plan",
        h: "Buying off-plan",
        blocks: [
          {
            p: "When you buy from a developer before completion, the purchase is registered on the Dubai Land Department's Oqood system. The fee is the same 4% of the price, plus AED 10 knowledge and AED 10 innovation fees. There is no developer NOC on a first sale from the developer.",
          },
          { p: "Developers may add their own administration charges, and these vary. Ask for them in writing before you reserve." },
        ],
      },
      {
        id: "mortgage",
        h: "Buying with a mortgage",
        blocks: [
          {
            table: {
              head: ["Fee", "Set by", "Amount"],
              rows: [
                ["Mortgage registration", "Dubai Land Department", "0.25% of the loan + AED 270"],
                ["Valuation", "Your bank", "Typically AED 2,500 to 3,500 + VAT"],
                ["Arrangement fee", "Your bank", "Typically 0.5% to 1% of the loan + VAT"],
              ],
            },
          },
          {
            p: "If you repay the loan early, the Central Bank of the UAE caps the early settlement fee at 1% of the outstanding balance or AED 10,000, whichever is lower.",
          },
        ],
      },
      { id: "calculator", h: "Work out your costs", blocks: [{ tool: "costs" }] },
      {
        id: "after",
        h: "Costs once you own",
        blocks: [
          {
            p: "Owners in managed buildings and communities pay an annual service charge for the upkeep of shared areas, and the rate differs from one building to the next. Ask for the current service charge on any home you consider, and budget for it alongside moving and furnishing.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Who pays the 4% DLD transfer fee?",
        a: "By custom the buyer pays the full 4%. The Dubai Land Department's schedule divides it equally between buyer and seller, so the two sides can agree a different split in the sale contract.",
      },
      { q: "Is the 2% agency fee set by law?", a: "No. 2% plus VAT is the customary rate in Dubai, but commission is agreed with your broker." },
      {
        q: "What fees do I pay on an off-plan home?",
        a: "The 4% Oqood registration fee plus AED 20 in admin fees to the Dubai Land Department, and any administration charge the developer sets. There is no developer NOC on a first sale.",
      },
      {
        q: "How much should I budget on top of the price?",
        a: "About 7% for a ready home bought with cash. A mortgage adds around 1.3% of the loan in registration and arrangement fees, plus the bank's valuation fee.",
      },
    ],
    sources: [S.dldSale, S.dldMortgage, S.dldInitial, S.pfFees, S.bayutCosts, S.earlySettle],
  },
  {
    slug: "mortgages-in-dubai",
    topic: "Costs and mortgages",
    seoTitle: "Mortgages in Dubai (2026): how much you can borrow, deposits and fees",
    seoDescription:
      "How mortgages work in Dubai for expatriates, UAE nationals and non-residents: Central Bank loan limits, deposits, the 25-year term, the 50% debt burden rule and fees, with a calculator.",
    title: "How mortgages work in Dubai",
    dek: "How much a bank can lend you, the deposit you need, the fees, and the limits set by the Central Bank of the UAE.",
    image: "viewing",
    summary: [
      "The Central Bank of the UAE caps lending at 80% of the price for an expatriate's first home up to AED 5 million, 70% above that, 60% for a second home and 50% off-plan.",
      "UAE nationals may borrow five points more on ready homes: 85%, 75% and 65%.",
      "Non-residents typically borrow 50% to 60% of the price; each bank sets its own limit.",
      "A mortgage runs for up to 25 years, and all monthly debt repayments must stay within 50% of income.",
    ],
    updated: "2026-09-15",
    sections: [
      {
        id: "limits",
        h: "How much you can borrow",
        blocks: [
          {
            p: "The Central Bank of the UAE caps the share of a home's price a bank may lend. The cap depends on who you are, the price, and whether this is your first home.",
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
          { p: "The rest of the price is your deposit, and the buying fees come on top." },
        ],
      },
      {
        id: "non-residents",
        h: "If you live outside the UAE",
        blocks: [
          {
            p: "Non-residents can borrow from UAE banks too. The limits for them are set by each bank rather than by regulation; banks commonly lend 50% to 60% of the price on a ready home, and 50% off-plan.",
          },
        ],
      },
      {
        id: "affordability",
        h: "Term, age and affordability",
        blocks: [
          {
            ul: [
              "**Term.** A mortgage can run for up to 25 years.",
              "**Age.** Each bank sets the age by which the loan must be repaid. Many use about 65 for salaried borrowers and 70 for the self-employed.",
              "**Debt burden.** All your monthly debt repayments together, the new mortgage included, may not exceed 50% of your income.",
            ],
          },
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
              "Arrangement fee: typically 0.5% to 1% of the loan plus VAT",
              "Early settlement: capped at 1% of the outstanding balance or AED 10,000, whichever is lower",
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
              { t: "Get pre-approval.", d: "A bank reviews your income and debts and confirms how much it will lend, ideally before you make an offer." },
              { t: "Agree the purchase.", d: "Sign Form F with a transfer date that leaves time for the bank's valuation and final offer." },
              {
                t: "Valuation and final offer.",
                d: "The bank values the home and makes its final offer. If the valuation is below the price, the bank lends against the lower figure and your deposit grows.",
              },
              { t: "Transfer.", d: "The bank pays the seller at the registration trustee, and its mortgage is registered against your title deed." },
            ],
          },
        ],
      },
      { id: "calculator", h: "Estimate your repayments", blocks: [{ tool: "mortgage" }] },
    ],
    faqs: [
      {
        q: "What deposit do I need to buy in Dubai with a mortgage?",
        a: "At least 20% of the price for an expatriate buying a first home worth up to AED 5 million, and 15% for a UAE national, because the Central Bank caps lending at 80% and 85%. Above AED 5 million the minimum rises to 30% and 25%; a second home needs 40% and 35%.",
      },
      { q: "Can non-residents get a mortgage in Dubai?", a: "Yes. Each bank sets its own limit for non-residents, commonly 50% to 60% of the price on a ready home." },
      { q: "How long can a Dubai mortgage run?", a: "Up to 25 years. The bank also sets the age by which it must be repaid." },
      {
        q: "How much can I borrow on my income?",
        a: "Your monthly repayments on all debts, the new mortgage included, must stay within 50% of your income. The [mortgage calculator](/mortgage-calculator/) shows the income a repayment needs.",
      },
    ],
    sources: [S.cbuae, S.kt, S.nonRes, S.dldMortgage, S.bayutCosts, S.earlySettle],
  },
  {
    slug: "buying-off-plan-in-dubai",
    topic: "Off-plan",
    seoTitle: "Buying off-plan property in Dubai: payment plans, escrow and Oqood",
    seoDescription:
      "How buying off-plan in Dubai works: payment plans, the escrow law that protects your payments, Oqood registration and fees, what an off-plan advert must show, and the checks before you reserve.",
    title: "Buying off-plan in Dubai",
    dek: "How payment plans work, where your money is held, what you register with the Dubai Land Department, and what to check before you reserve.",
    image: "l-creek",
    summary: [
      "Off-plan payments go into a project escrow account under Dubai Law No. 8 of 2007 and can be used only to build that project.",
      "The purchase is registered on the Dubai Land Department's Oqood system for 4% of the price plus AED 20.",
      "An off-plan advert must show a Trakheesi permit for the unit, the developer, the escrow account number and the expected completion date.",
      "Banks may lend up to 50% of an off-plan home's price.",
    ],
    updated: "2026-09-15",
    sections: [
      {
        id: "what",
        h: "What off-plan means",
        blocks: [
          {
            p: "An off-plan home is bought from the developer before the building is complete. Instead of paying the price at a transfer, you pay in stages set out in a payment plan: a first payment when you reserve, instalments while the building rises, and the balance at or after handover.",
          },
        ],
      },
      {
        id: "escrow",
        h: "Where your money goes",
        blocks: [
          {
            p: "Under Dubai Law No. 8 of 2007, off-plan buyers' payments go into an escrow account opened for that one project with an approved escrow agent. The money can be used only to build that project, and the developer's creditors cannot seize it.",
          },
          { p: "Off-plan adverts must show the project's escrow account number. Make every payment to that account and no other." },
        ],
      },
      {
        id: "oqood",
        h: "Registering your purchase",
        blocks: [
          {
            p: "The purchase is registered on the Dubai Land Department's Oqood system, which records you as the buyer before a title deed exists. The fee is 4% of the price plus AED 20. Developers may add their own administration charge, so ask for it in writing.",
          },
        ],
      },
      {
        id: "adverts",
        h: "What an off-plan advert must show",
        blocks: [
          {
            ul: [
              "A Trakheesi advertising permit. Since April 2024 each off-plan unit needs its own permit, not just the project",
              "The developer's name and the project's escrow account number",
              "The expected completion date",
              "A Madmoun QR code, on printed and video adverts",
            ],
          },
        ],
      },
      {
        id: "checks",
        h: "Checks before you reserve",
        blocks: [
          {
            ol: [
              { t: "The developer and the project.", d: "Confirm who the developer is and that the project is registered with the Dubai Land Department." },
              { t: "The escrow account.", d: "Match the account number on the advert with the one in your agreement, and never pay into any other account." },
              { t: "The payment plan.", d: "Read every instalment's amount and what triggers it: a date, or a stage of construction." },
              { t: "The completion date.", d: "Note the expected completion date and read what the sale agreement says about delays." },
              { t: "Every cost.", d: "The 4% Oqood fee, any developer charges, and the service charge you will pay once the building is handed over." },
            ],
          },
        ],
      },
      {
        id: "finance",
        h: "Mortgages and off-plan",
        blocks: [
          {
            p: "Under the Central Bank of the UAE's limits, a bank may lend up to 50% of the price of an off-plan home. Some buyers pay the construction instalments themselves and arrange a mortgage for the balance at handover. Ask a bank what it offers for the specific project.",
          },
        ],
      },
      {
        id: "visa",
        h: "Off-plan and the Golden Visa",
        blocks: [
          {
            p: "The Dubai Land Department's and GDRFA's pages on the property Golden Visa do not say whether an off-plan home counts towards the AED 2 million threshold. Confirm with GDRFA before you buy with the visa in mind. [The Golden Visa guide](/guides/golden-visa-through-property/) sets out the published rules.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is my money protected when I buy off-plan in Dubai?",
        a: "Dubai Law No. 8 of 2007 requires off-plan payments to go into an escrow account for the project, used only for its construction and out of reach of the developer's creditors. Pay only into the escrow account named for the project.",
      },
      { q: "What is Oqood?", a: "The Dubai Land Department's register for off-plan sales. It records your purchase before the title deed is issued, for 4% of the price plus AED 20." },
      { q: "Can I get a mortgage on an off-plan home?", a: "Yes, for up to 50% of the price under the Central Bank of the UAE's limits, subject to the bank's policy on the project." },
      {
        q: "What should an off-plan advert show?",
        a: "Its Trakheesi permit number, the developer, the project's escrow account number and the expected completion date. Printed and video adverts also carry a Madmoun QR code.",
      },
    ],
    sources: [S.escrow, S.dldInitial, S.trakheesi, S.pfTrakheesi, S.dldMadmoun, S.kt, S.dldVisa, S.gdrfa],
  },
  {
    slug: "golden-visa-through-property",
    topic: "Residency",
    seoTitle: "Dubai Golden Visa through property: the AED 2 million rule (2026)",
    seoDescription:
      "Who qualifies for the UAE Golden Visa through property in Dubai: the AED 2 million threshold, mortgaged and jointly owned homes, off-plan homes, and where to apply.",
    title: "The Golden Visa through property",
    dek: "Who qualifies through property in Dubai, how mortgaged and jointly owned homes count, and what to confirm before you buy with the visa in mind.",
    image: "area-downtown-dubai",
    summary: [
      "Property worth AED 2 million or more, in one property or several, lets an investor in Dubai apply for a Golden Visa, which the Dubai Land Department and GDRFA describe as ten years and renewable.",
      "Mortgaged homes qualify with a letter from the bank. Joint owners qualify only if their own share is worth AED 2 million.",
      "Below that, DLD lists a two-year investor residence visa: a sole owner qualifies with property of any value, and a joint owner with a share of at least AED 400,000.",
      "In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system, so confirm the channel and fees when you apply.",
    ],
    updated: "2026-09-16",
    sections: [
      {
        id: "threshold",
        h: "The threshold",
        blocks: [
          { p: "A property investor in Dubai can apply for a Golden Visa with property worth at least AED 2 million. The value can come from one property or several." },
          {
            p: "The Dubai Land Department and GDRFA describe it as a ten-year visa that can be renewed. The federal government portal shows a different length for property investors, so confirm the term when you apply.",
          },
        ],
      },
      { id: "mortgaged", h: "Mortgaged homes", blocks: [{ p: "A home with a mortgage can qualify. The Dubai Land Department asks for a no-objection letter from the lending bank." }] },
      { id: "joint", h: "Homes owned jointly", blocks: [{ p: "If you own a home with someone else, GDRFA counts it only when your own share is worth AED 2 million or more." }] },
      {
        id: "off-plan",
        h: "Off-plan homes",
        blocks: [{ p: "Neither the Dubai Land Department's page nor GDRFA's addresses off-plan homes. Confirm with GDRFA before relying on an off-plan purchase for the visa." }],
      },
      {
        id: "two-year",
        h: "The two-year investor visa",
        blocks: [
          {
            p: "For property below AED 2 million, the Dubai Land Department's service page lists a two-year investor residence visa. A sole owner qualifies with a property of any value; a joint owner needs a share worth at least AED 400,000. DLD lists the investor fee as AED 10,212.50.",
          },
        ],
      },
      {
        id: "apply",
        h: "Where to apply",
        blocks: [
          {
            p: "The Dubai Land Department has run the Golden Visa and investor visa services for property owners, and lists the Golden Visa fees for the main applicant as AED 9,884.75. In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system, so check the current channel, requirements and fees before you apply.",
          },
          { note: "ExpertCare does not give immigration advice. Decisions on visas rest with the UAE authorities." },
        ],
      },
    ],
    faqs: [
      { q: "How much property do I need for a Golden Visa in Dubai?", a: "Property worth AED 2 million or more, in one property or several." },
      { q: "Does a mortgaged property count?", a: "Yes. The Dubai Land Department asks for a no-objection letter from the lending bank." },
      { q: "Can joint owners combine their shares?", a: "GDRFA counts a jointly owned property only when the applicant's own share is worth AED 2 million or more." },
      { q: "Does an off-plan property qualify?", a: "The official DLD and GDRFA pages do not say. Confirm with GDRFA before you buy." },
      {
        q: "Can I get a UAE residence visa with property under AED 2 million?",
        a: "The Dubai Land Department lists a two-year investor residence visa for property owners: a sole owner qualifies with property of any value, and a joint owner needs a share of at least AED 400,000.",
      },
      { q: "How long is the Golden Visa?", a: "The Dubai Land Department and GDRFA describe it as ten years, renewable. Confirm the term when you apply." },
    ],
    sources: [S.dldVisa, S.investorVisa, S.gdrfa, S.gdrfaMove, S.uae],
  },
  {
    slug: "off-plan-vs-ready-property-in-dubai",
    topic: "Off-plan",
    seoTitle: "Off-plan vs ready property in Dubai: payments, fees, mortgages and risk",
    seoDescription:
      "Off-plan or ready property in Dubai? A side-by-side comparison of how you pay, DLD fees, mortgage limits, where your money is held, and when you can move in or let.",
    title: "Off-plan or ready: how to choose in Dubai",
    dek: "How the two compare on payments, fees, mortgages, protection and moving in, using the rules that apply to each.",
    image: "l-downtown",
    updated: "2026-09-16",
    summary: [
      "A ready home is paid for at transfer and can be lived in or let straight away. An off-plan home is paid in stages while it is built.",
      "Both pay a 4% Dubai Land Department fee: the transfer fee on a ready home, Oqood registration on an off-plan one.",
      "Banks may lend up to 80% on an expatriate's first ready home worth up to AED 5 million, but only 50% on an off-plan home.",
      "Off-plan payments are held in the project's escrow account under Dubai Law No. 8 of 2007.",
    ],
    sections: [
      {
        id: "compare",
        h: "Side by side",
        blocks: [
          {
            table: {
              head: ["", "Ready home", "Off-plan home"],
              rows: [
                ["How you pay", "The price at transfer, after a deposit that by custom is 10% on Form F", "In stages set by the payment plan, through construction and at or after handover"],
                ["Dubai Land Department fee", "4% transfer fee plus AED 520 in title deed fees", "4% Oqood registration plus AED 20"],
                ["Other fees", "Registration trustee fee, agency fee, developer NOC", "Any administration charge the developer sets"],
                ["Mortgage limit", "Up to 80% for an expatriate's first home up to AED 5 million", "Up to 50%"],
                ["Where your money goes", "To the seller at transfer", "Into the project's escrow account"],
                ["Moving in or letting", "From the day of transfer", "After handover"],
                ["What you can inspect", "The home itself", "Plans, specifications and, where there is one, a show apartment"],
              ],
            },
          },
        ],
      },
      {
        id: "ready",
        h: "When a ready home makes sense",
        blocks: [
          {
            ul: [
              "You need to move in, or start earning rent, soon",
              "You want to borrow more than half the price",
              "You want to see and inspect exactly what you are buying",
            ],
          },
        ],
      },
      {
        id: "off-plan",
        h: "When off-plan makes sense",
        blocks: [
          {
            ul: [
              "You would rather spread payments over the construction period",
              "You want a new home in a district that is still being built",
              "You can wait for handover and plan around the expected completion date",
            ],
          },
        ],
      },
      {
        id: "weigh",
        h: "What to weigh",
        blocks: [
          {
            p: "With a ready home, the questions are the condition of the home, the service charge, and the price against similar homes in the same building or community. With off-plan, they are the developer, the escrow account, what triggers each instalment, and what the sale agreement says about delays. [Buying off-plan in Dubai](/guides/buying-off-plan-in-dubai/) lists the checks, and the [buying costs calculator](/buying-costs/) shows the fees on either.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is off-plan property cheaper than ready property in Dubai?",
        a: "Not as a rule. Developers set off-plan prices and the resale market sets ready prices, so compare the price per square foot of similar homes in the same area, and remember an off-plan home can only be lived in or let after handover.",
      },
      {
        q: "Which is easier to finance, off-plan or ready?",
        a: "A ready home. Under the Central Bank of the UAE's limits a bank may lend up to 80% on an expatriate's first ready home worth up to AED 5 million, against 50% on an off-plan home.",
      },
      {
        q: "Are the Dubai Land Department fees different?",
        a: "Both pay 4% of the price. A ready home adds AED 520 in title deed fees and the registration trustee fee; Oqood registration of an off-plan home adds AED 20.",
      },
      {
        q: "Where does my money go when I buy off-plan?",
        a: "Into the project's escrow account, which under Dubai Law No. 8 of 2007 can be used only to build that project.",
      },
    ],
    sources: [S.dldSale, S.dldInitial, S.cbuae, S.kt, S.escrow, S.formF],
  },
  {
    slug: "buying-property-in-dubai-from-abroad",
    topic: "Buying",
    seoTitle: "Buying property in Dubai from abroad: a guide for non-residents (2026)",
    seoDescription:
      "How non-residents buy property in Dubai: passport identification, powers of attorney issued abroad, paying the price and fees, mortgages for non-residents, residence visas through property, and tax.",
    title: "Buying property in Dubai from abroad",
    dek: "How non-residents buy without living in the UAE: identification, powers of attorney, paying, borrowing, and the visas property can bring.",
    image: "area-dubai-marina",
    updated: "2026-09-16",
    summary: [
      "Non-residents can buy freehold property in Dubai, and a valid passport serves as identification at the registration trustee.",
      "If you cannot attend, an attorney can sign for you. A power of attorney issued abroad must be notarised there, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and issued within two years.",
      "DLD's fully digital sale service needs an Emirates ID, UAE Pass and a UAE bank account, so it is not open to non-residents.",
      "UAE banks commonly lend non-residents 50% to 60% of the price of a ready home.",
      "Owning property can support a two-year investor residence visa, or a Golden Visa from AED 2 million.",
    ],
    sections: [
      {
        id: "who",
        h: "Who can buy",
        blocks: [
          {
            p: "Buyers of any nationality can own freehold property in Dubai's designated freehold areas. Dubai Law No. 7 of 2006 allows non-UAE nationals to hold freehold there without a time limit, or leasehold rights for up to 99 years. You do not need a UAE residence visa to buy.",
          },
        ],
      },
      {
        id: "documents",
        h: "Identification and documents",
        blocks: [
          {
            p: "At a Dubai Land Department registration trustee, buyers and sellers identify themselves with an Emirates ID or, for non-resident foreigners, a valid passport. On a resale in a freehold area DLD also requires the developer's electronic no-objection certificate, the e-NOC, which is issued through the Dubai REST app.",
          },
        ],
      },
      {
        id: "attorney",
        h: "If you cannot be in Dubai",
        blocks: [
          {
            p: "You can appoint someone to complete the purchase for you with a power of attorney. Under DLD Circular No. 29/R/2025, as summarised by Dubai law firms, a power of attorney issued outside the UAE must be:",
          },
          {
            ul: [
              "Notarised by the competent authority in the country where it is issued",
              "Legalised by the UAE embassy or consulate there",
              "Attested by the UAE Ministry of Foreign Affairs",
              "Presented as the original document, not a scan",
              "Translated in full into Arabic by a UAE-licensed translator, if it is in another language",
              "Issued no more than two years before it is used",
            ],
          },
          {
            p: "A power of attorney notarised in the UAE and entered in the electronic register generally remains valid unless it states a time limit. Either way, its wording must clearly authorise the transaction; general wording is rejected, so have it drafted for the purchase.",
          },
        ],
      },
      {
        id: "paying",
        h: "Paying for the home",
        blocks: [
          {
            p: "DLD accepts its fees by ePay, Dubai Pay, the Noqodi wallet and manager's cheque. By market practice the price itself is paid to the seller by manager's cheque from a UAE bank, so plan how your funds will reach the UAE well before the transfer date.",
          },
          {
            p: "DLD's Digital Sale service on the Dubai Now app runs a whole sale online, but both parties need an Emirates ID, an active UAE Pass and a UAE bank account, and the home must be a mortgage-free unit in a freehold area with a single owner.",
          },
        ],
      },
      {
        id: "borrowing",
        h: "Borrowing as a non-resident",
        blocks: [
          {
            p: "UAE banks lend to non-residents at their own discretion, commonly 50% to 60% of the price of a ready home and 50% off-plan. [How mortgages work in Dubai](/guides/mortgages-in-dubai/) covers the fees and the order to do things in.",
          },
        ],
      },
      {
        id: "visas",
        h: "Residence visas through property",
        blocks: [
          {
            ul: [
              "**Investor residence visa, two years.** The Dubai Land Department's service page lists it for a sole owner of property of any value, or a joint owner whose share is worth at least AED 400,000, with an investor fee of AED 10,212.50.",
              "**Golden Visa, ten years.** For property worth AED 2 million or more, in one property or several, including mortgaged property with a letter from the bank. [The Golden Visa through property](/guides/golden-visa-through-property/) has the detail.",
            ],
          },
          { p: "In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system, so confirm the current channel and fees before you apply." },
        ],
      },
      {
        id: "tax",
        h: "Tax on owning and letting",
        blocks: [
          {
            p: "The UAE does not levy income tax on individuals. Under Cabinet Decision No. 49 of 2023, a person's income from property held in their own name is not subject to UAE corporate tax, whatever the amount, as long as the activity is not carried out, and is not required to be carried out, under a licence. Your home country may tax that income, so check with an adviser there.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I buy property in Dubai without visiting?",
        a: "Yes, through an attorney appointed with a power of attorney. One issued abroad must be notarised, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and issued no more than two years before it is used.",
      },
      {
        q: "Do I need a UAE bank account to buy property in Dubai?",
        a: "Not to pay DLD's fees, which it accepts by ePay, Dubai Pay, the Noqodi wallet or manager's cheque. By market practice the price is paid by manager's cheque from a UAE bank, and DLD's fully digital sale service requires a UAE bank account.",
      },
      {
        q: "Does buying property in Dubai give me residency?",
        a: "It can. The Dubai Land Department lists a two-year investor residence visa for a sole owner of property of any value (a joint owner needs a share of at least AED 400,000), and a ten-year Golden Visa for property worth AED 2 million or more.",
      },
      {
        q: "Do non-residents pay tax on rental income from Dubai property?",
        a: "The UAE has no personal income tax, and a person's rental income from property in their own name is not subject to UAE corporate tax when no licence is required. The buyer's country of residence may tax it.",
      },
    ],
    sources: [S.freeholdList, S.law7, S.dldSale, S.poa, S.poa2, S.digitalSale, S.dubaiRest, S.nonRes, S.investorVisa, S.dldVisa, S.gdrfaMove, S.ftaRei, S.uaeTax],
  },
  {
    slug: "service-charges-in-dubai",
    topic: "Owning and letting",
    seoTitle: "Service charges in Dubai: who approves them and how to check (2026)",
    seoDescription:
      "What service charges on Dubai property cover, how RERA approves them under Law No. 6 of 2019, how to check a building's approved charges with the Service Charge Index, and what happens if they go unpaid.",
    title: "Service charges in Dubai",
    dek: "What owners pay each year for their building or community, who approves the amount, how to look it up before you buy, and what happens if it goes unpaid.",
    image: "l-marina",
    updated: "2026-09-16",
    summary: [
      "Service charges are the annual charges owners pay to manage, operate, maintain and repair jointly owned property.",
      "Under Dubai Law No. 6 of 2019, a management company may not charge them without approval from RERA, which first requires a budget approved by a certified audit firm.",
      "You can look up a building's approved service charges with DLD's Service Charge Index, on the DLD website through Mollak or in the Dubai REST app.",
      "Unpaid service charges are a lien on the home, and it cannot be sold until they are paid.",
    ],
    sections: [
      {
        id: "what",
        h: "What service charges are",
        blocks: [
          {
            p: "Dubai Law No. 6 of 2019 defines service charges as the annual charges collected from owners to cover the cost of managing, operating, maintaining and repairing jointly owned property: the building or community and its shared areas and facilities.",
          },
        ],
      },
      {
        id: "approval",
        h: "Who sets and approves them",
        blocks: [
          {
            p: "Each jointly owned building or community is run by a management entity. Under Article 27 of Law No. 6 of 2019, it may not charge owners service charges without approval from the Real Estate Regulatory Agency (RERA), and RERA will not approve a budget unless a certified audit firm has approved it first.",
          },
          {
            p: "RERA oversees budgets, owners' invoices and management companies through its Mollak system. Owners are represented by an owners committee formed under the same law.",
          },
        ],
      },
      {
        id: "check",
        h: "How to check before you buy",
        blocks: [
          {
            ol: [
              {
                t: "Look up the approved charges.",
                d: "DLD's Service Charge Index shows the service charges RERA has approved for jointly owned properties. It is on the DLD website, through Mollak, and in the Dubai REST app.",
              },
              {
                t: "Confirm nothing is owed.",
                d: "A home cannot be disposed of while its service charges are unpaid, and in practice the developer's NOC for a resale confirms dues are clear.",
              },
              {
                t: "Budget for them every year.",
                d: "Add the annual service charge to your running costs, and take it off the rent before you judge a home's return.",
              },
            ],
          },
        ],
      },
      {
        id: "unpaid",
        h: "If service charges go unpaid",
        blocks: [
          {
            ul: [
              "The management entity has a lien on the unit, and the unit may not be sold until the charges are paid",
              "After a written notice approved by RERA, the owner has 30 days to pay before the claim can be enforced through the execution judge at the Rental Dispute Settlement Centre",
              "The judge may order the unit sold at public auction, and the owner bears the court and legal fees",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Who approves service charges in Dubai?",
        a: "RERA, the Real Estate Regulatory Agency. Under Dubai Law No. 6 of 2019 a management entity may not charge owners without RERA's approval, and RERA requires a budget approved by a certified audit firm.",
      },
      { q: "How can I check the service charges on a building in Dubai?", a: "Use the Dubai Land Department's Service Charge Index, on the DLD website through Mollak or in the Dubai REST app." },
      { q: "Can I sell a property with unpaid service charges?", a: "No. Unpaid service charges are a lien on the unit, and under Law No. 6 of 2019 it may not be disposed of until they are paid." },
      { q: "Who pays service charges, the owner or the tenant?", a: "Law No. 6 of 2019 defines service charges as charges collected from owners." },
    ],
    sources: [S.law6, S.sci, S.mollak, S.dubaiRest, S.pfNoc],
  },
  {
    slug: "renting-out-property-in-dubai",
    topic: "Owning and letting",
    seoTitle: "Renting out property in Dubai: Ejari, rent increases, notice and tax (2026)",
    seoDescription:
      "What Dubai landlords need to know: Ejari registration and fees, the rent increase bands in Decree No. 43 of 2013 and the Smart Rental Index, 90-day and 12-month notice rules, holiday home permits and tax on rent.",
    title: "Renting out your Dubai property",
    dek: "Registering a tenancy, how far rent can rise, the notice each side must give, holiday home permits and tax, from the laws that apply.",
    image: "l-jvc",
    updated: "2026-09-16",
    summary: [
      "Every tenancy contract must be registered with RERA through Ejari; registration online costs AED 177.75.",
      "Rent can rise at renewal only when it is more than 10% below the rent index average for similar homes, by 5% and at most 20%.",
      "Either side must give at least 90 days' notice before the contract ends to change its terms or not renew, unless the contract says otherwise.",
      "To end a tenancy at expiry because you want to sell, or so you or a first-degree relative can move in, the law requires 12 months' notice through a notary public or by registered mail.",
      "Individuals pay no UAE income tax, and rental income from property in their own name is outside corporate tax when no licence is required.",
    ],
    sections: [
      {
        id: "ejari",
        h: "Registering the tenancy with Ejari",
        blocks: [
          {
            p: "Article 4 of Dubai Law No. 26 of 2007, as amended by Law No. 33 of 2008, requires every lease contract to be registered with RERA, through the Ejari system. The landlord, the tenant or someone holding a power of attorney can register it.",
          },
          {
            table: {
              head: ["Where you register", "Fee"],
              rows: [
                ["Dubai REST app or DLD website", "AED 177.75: AED 100 registration, AED 10 knowledge fee, AED 10 innovation fee, AED 55 service fee and VAT"],
                ["Registration trustee centre", "AED 100, AED 10 and AED 10, plus a AED 95 service fee and VAT"],
              ],
            },
          },
        ],
      },
      {
        id: "rent",
        h: "How much the rent can rise",
        blocks: [
          { p: "Decree No. 43 of 2013 ties any increase at renewal to how far the current rent sits below the average rent for similar homes in RERA's rent index:" },
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
            p: "Since January 2025 the Dubai Land Department's Smart Rental Index sets that average, classifying each building by its specification, finishes, location and facilities. The increase bands did not change.",
          },
        ],
      },
      {
        id: "notice",
        h: "Notice periods",
        blocks: [
          {
            ul: [
              "**Changing the terms or not renewing:** at least 90 days' notice before the contract ends, unless the contract says otherwise (Article 14 of Law No. 26 of 2007)",
              "**Ending a tenancy at expiry to sell, move in, rebuild or carry out major maintenance:** at least 12 months' notice before the eviction date, served through a notary public or by registered mail (Article 25(2), as amended by Law No. 33 of 2008)",
            ],
          },
          { p: "Moving in applies when the owner or a first-degree relative needs the home and has no other suitable property." },
        ],
      },
      {
        id: "holiday-homes",
        h: "Holiday homes and shared housing",
        blocks: [
          {
            p: "Short-term holiday lets need a holiday home permit from Dubai's Department of Economy and Tourism (DET), and individual owners can register their own homes as well as companies. Gulf News lists the usual documents as the title deed or sale agreement, the developer's NOC where one is needed, identification, a recent DEWA bill and insurance; check DET's current requirements and fees before you list a home.",
          },
          { p: "Separately, Law No. 4 of 2026, issued in March 2026, requires a permit before any unit is used as shared housing." },
        ],
      },
      {
        id: "tax",
        h: "Tax on rental income",
        blocks: [
          {
            ul: [
              "The UAE does not levy income tax on individuals",
              "Under Cabinet Decision No. 49 of 2023, a person's income from real estate investment is not subject to corporate tax, whatever the amount, as long as the activity is not carried out, and is not required to be carried out, under a licence",
              "Residential leases are generally exempt from VAT; commercial property is charged at 5%",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Is Ejari registration mandatory in Dubai?", a: "Yes. Dubai Law No. 26 of 2007 requires every tenancy contract to be registered with RERA, through Ejari. Online registration costs AED 177.75." },
      {
        q: "How much can a landlord increase the rent in Dubai?",
        a: "Only when the rent is more than 10% below the rent index average for similar homes: by 5% if it is 11% to 20% below, 10% if 21% to 30% below, 15% if 31% to 40% below, and 20% if more than 40% below (Decree No. 43 of 2013).",
      },
      {
        q: "How much notice must a landlord give to sell a rented home?",
        a: "To evict at the end of the tenancy because the owner wants to sell, at least 12 months before the eviction date, served through a notary public or by registered mail.",
      },
      {
        q: "Do landlords pay tax on rental income in Dubai?",
        a: "The UAE has no personal income tax, and a person's rental income from property in their own name is not subject to corporate tax when the activity does not require a licence.",
      },
    ],
    sources: [S.law26, S.law33, S.ejari, S.decree43, S.smartRent, S.holidayHomes, S.sharedHousing, S.ftaRei, S.uaeTax, S.mofVat],
  },
  {
    slug: "handover-and-snagging-in-dubai",
    topic: "Off-plan",
    seoTitle: "Handover and snagging in Dubai: title deeds and developer defect liability",
    seoDescription:
      "Taking the keys to a new Dubai home: the completion certificate, when Oqood becomes a title deed, snagging before you accept, the developer's 1-year and 10-year defect liability, delays, and reselling before handover.",
    title: "Handover and snagging in Dubai",
    dek: "What happens when an off-plan home is completed: the completion certificate, your title deed, inspecting for defects, and how long the developer must put things right.",
    image: "viewing",
    updated: "2026-09-16",
    summary: [
      "Once a project has its completion certificate, the developer must register sold units in the names of buyers who have met their obligations, so the Oqood registration becomes a title deed.",
      "Snagging is inspecting a new home before you accept it and listing defects and unfinished work for the developer to fix.",
      "Under Article 40 of Dubai Law No. 6 of 2019, the developer must repair or replace defective installations for one year from handover, and fix structural defects for ten years from the completion certificate.",
      "Any agreement that reduces those liabilities is void.",
    ],
    sections: [
      {
        id: "completion",
        h: "Completion and your title deed",
        blocks: [
          {
            p: "A building is complete when its planning authority issues a completion certificate: the Dubai Development Authority, Trakhees or Dubai Municipality, depending on the area. Under Article 8 of Law No. 13 of 2008, the developer must then enter the project in the property register, including registering sold units in the names of buyers who have met their obligations. That is when your Oqood registration gives way to a title deed; DLD's title deed issuance fee is AED 250.",
          },
        ],
      },
      {
        id: "snagging",
        h: "Snagging before you accept",
        blocks: [
          {
            p: "Snagging is an industry practice rather than a legal procedure, so arrange it before you sign the handover documents. Walk the home with a checklist, or with a professional inspector, and give the developer a written list.",
          },
          {
            ol: [
              { t: "Finishes.", d: "Walls, floors, tiling, joinery, doors and windows: cracks, chips, gaps and uneven work." },
              { t: "Installations.", d: "Air conditioning, electrics and sockets, water pressure, hot water and drainage, each tested while running." },
              { t: "Kitchen and bathrooms.", d: "Appliances, sealing, taps and waterproofing." },
              { t: "Against your agreement.", d: "The layout, size and specification, checked against the sale and purchase agreement." },
            ],
          },
        ],
      },
      {
        id: "liability",
        h: "What the developer must fix, and for how long",
        blocks: [
          {
            table: {
              head: ["Defect", "Developer liable for", "Counted from"],
              rows: [
                ["Defective installations: mechanical, electrical, sanitary and sewerage", "1 year", "Handover of the unit, or the completion certificate if the owner refuses possession"],
                ["Defects in the structural parts of the building", "10 years", "The completion certificate"],
              ],
            },
          },
          {
            p: "Both come from Article 40 of Dubai Law No. 6 of 2019, which makes any agreement to the contrary void. Separately, the UAE's new Civil Transactions Law, Federal Decree-Law No. 25 of 2025, holds contractors and engineers jointly liable for ten years for collapse or defects that threaten a building's stability or safety (Articles 821 to 824, in force from 1 June 2026).",
          },
        ],
      },
      {
        id: "delays",
        h: "Delays, defaults and cancellation",
        blocks: [
          {
            p: "Law No. 13 of 2008, as amended by Law No. 19 of 2020, sets out what happens if a buyer stops paying: after a 30-day notice served through DLD, a developer may terminate and keep up to 40% of the unit's value on a project more than 60% complete, or up to 25% below that, refunding the rest within a year or within 60 days of reselling the unit, whichever is sooner. If a project never starts for reasons beyond the developer's control, or RERA cancels it, the developer must refund buyers' payments under the escrow law.",
          },
          { p: "For delays by the developer, your sale and purchase agreement sets out what you are entitled to, so read that clause before you sign." },
        ],
      },
      {
        id: "resale",
        h: "Selling before handover",
        blocks: [
          {
            p: "An off-plan home can be resold before completion, but under Article 3 of Law No. 13 of 2008 every such sale must be entered in the interim register or it is void. Developers set their own conditions for issuing a resale NOC, written into the sale and purchase agreement.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How long is a developer responsible for defects in Dubai?",
        a: "One year from handover for defective mechanical, electrical, sanitary and sewerage installations, and ten years from the completion certificate for structural defects, under Article 40 of Dubai Law No. 6 of 2019.",
      },
      { q: "What is snagging?", a: "Inspecting a new home before you accept it and listing defects and unfinished work for the developer to fix. It is an industry practice, not a legal procedure." },
      {
        q: "When do I get the title deed for an off-plan home?",
        a: "After the project receives its completion certificate. The developer must then register sold units in the names of buyers who have met their obligations, under Article 8 of Law No. 13 of 2008.",
      },
      { q: "Can I sell an off-plan property before handover?", a: "Yes, subject to the developer's conditions, and the sale must be entered in DLD's interim register or it is void." },
    ],
    sources: [S.law6, S.law13, S.law19, S.escrow, S.decennial, S.dda, S.dldSale],
  },
];


/** Answers on the home page, each drawn from a checked guide. */
