import type { Guide } from "../blocks";
import { SOURCES as S } from "../sources";

export const GUIDES_B: Guide[] = [
  {
    slug: "off-plan-vs-ready-property-in-dubai",
    topic: "Off-plan",
    seoTitle: "Off-plan vs ready property in Dubai: how the two compare",
    seoDescription:
      "A ready home is paid at transfer and usable at once; an off-plan home is paid in stages while it is built. We compare fees, mortgage caps, escrow and timing.",
    title: "Off-plan or ready: which suits you in Dubai",
    dek: "The same decision from both sides: what you pay and when, what a bank will lend, where your money sits, and when you get the keys.",
    image: "l-downtown",
    updated: "2026-09-16",
    summary: [
      "With a ready home you pay the price at transfer and can move in or let it the same day. With an off-plan home you pay in instalments while the developer builds it.",
      "The Dubai Land Department takes 4% on both. On a ready home that is the transfer fee; on an off-plan home it is the Oqood registration fee.",
      "A bank may lend an expatriate up to 80% on a first ready home worth AED 5 million or less. On an off-plan home the limit is 50%.",
      "Every dirham you pay on an off-plan home goes into the project's escrow account under Dubai Law No. 8 of 2007.",
    ],
    sections: [
      {
        id: "meaning",
        h: "What ready and off-plan mean",
        blocks: [
          {
            p: "A ready home exists. It has a title deed, a service charge history and, often, a tenant or a previous owner. You buy it from that owner, through a Dubai Land Department registration trustee, and you own it from the day of transfer.",
          },
          {
            p: "An off-plan home does not exist yet, or is still being built. You buy it from the developer against plans and a specification. The sale is recorded on the Dubai Land Department's Oqood register, and a title deed is issued only once the building is complete and you have paid in full.",
          },
        ],
      },
      {
        id: "compare",
        h: "The two compared",
        blocks: [
          {
            table: {
              head: ["", "Ready home", "Off-plan home"],
              rows: [
                ["When you pay", "A deposit on Form F, by custom 10%, then the balance at transfer", "In instalments fixed by the payment plan, during construction and at or after handover"],
                ["Dubai Land Department fee", "4% transfer fee and AED 520 in title deed fees", "4% Oqood registration and AED 20 in admin fees"],
                ["Other fees", "Registration trustee fee, agency fee, the developer's NOC fee", "Whatever administration charge the developer sets"],
                ["Most a bank will lend", "80% for an expatriate's first home up to AED 5 million", "50%"],
                ["Where the money goes", "To the seller, at transfer", "Into the project's escrow account"],
                ["Living in it or letting it", "From the day of transfer", "After handover"],
                ["What you can see first", "The home, the building and the neighbours", "Drawings, a specification and sometimes a show apartment"],
              ],
            },
          },
          {
            p: "Two rows decide most cases: the mortgage limit and the timing. If you need to borrow more than half the price, or need the home this year, the table has answered the question.",
          },
        ],
      },
      {
        id: "paying",
        h: "How the payments differ",
        blocks: [
          {
            p: "On a ready home the money moves twice. By custom you pay a 10% deposit when you and the seller sign Form F, the sale contract. You pay the rest at the registration trustee office on transfer day, usually by manager's cheque. If a bank is lending, its cheque is part of that payment.",
          },
          {
            p: "On an off-plan home the developer's payment plan sets the dates. Some plans ask for a share at reservation, instalments tied to construction milestones, and a final share at handover. Others carry part of the price past handover. Each instalment is paid into the escrow account, not to the developer's general account.",
          },
          {
            ul: [
              "Read the plan for what triggers each instalment: a date, or a construction stage",
              "Ask what happens if a milestone slips: whether the instalment moves with it",
              "Add the 4% Oqood fee to your first payments, because it is due at registration",
            ],
          },
        ],
      },
      {
        id: "fees",
        h: "The fees on each",
        blocks: [
          {
            p: "On a ready home the Dubai Land Department charges 4% of the price, plus AED 520 in title deed fees for an apartment or villa. The registration trustee charges AED 4,000 plus VAT when the price is AED 500,000 or more, and AED 2,000 plus VAT below that. The agency fee is 2% plus VAT by custom. The developer's no-objection certificate costs AED 500 to 5,000, set by the developer, and Form F records who pays it.",
          },
          {
            p: "On an off-plan home bought from the developer, the Dubai Land Department charges the same 4% to register the sale on Oqood, plus AED 10 knowledge and AED 10 innovation fees. There is no NOC on a first sale from the developer. Any other charge is the developer's own administration fee, so ask for it in writing. The [buying costs calculator](/buying-costs/) shows both sets of fees at any price.",
          },
        ],
      },
      {
        id: "borrowing",
        h: "What a bank will lend",
        blocks: [
          {
            p: "The Central Bank of the UAE caps how much of the price a bank may lend. The cap depends on who you are, whether it is your first home, and whether the home is ready or off-plan.",
          },
          {
            table: {
              head: ["Home", "Expatriate", "UAE national"],
              rows: [
                ["First ready home, AED 5 million or less", "80%", "85%"],
                ["First ready home, over AED 5 million", "70%", "75%"],
                ["Second or investment ready home", "60%", "65%"],
                ["Off-plan home", "50%", "50%"],
              ],
            },
          },
          {
            p: "The off-plan cap means you fund at least half the price yourself, in cash, through the payment plan. Loans run for at most 25 years, and all your monthly debt repayments together may not exceed half your income. [How mortgages work in Dubai](/guides/mortgages-in-dubai/) covers the fees and the order to do things in.",
          },
        ],
      },
      {
        id: "money",
        h: "Where your money sits",
        blocks: [
          {
            p: "When you buy a ready home, the price goes to the seller at transfer and the title deed is issued to you in the same sitting. The exchange is simultaneous, which is the point of the trustee office.",
          },
          {
            p: "When you buy off-plan, Dubai Law No. 8 of 2007 requires every payment to go into an escrow account opened for that project. The money can be used only to build that project, and the developer's creditors cannot seize it. The account number must appear on the project's adverts, and you can ask the developer for it before you pay a dirham.",
          },
        ],
      },
      {
        id: "choose",
        h: "Which to choose",
        blocks: [
          { p: "A ready home fits when:" },
          {
            ul: [
              "You want to live in it, or earn rent from it, within weeks",
              "You need to borrow more than half the price",
              "You want to walk through the exact home, and meet the building, before you commit",
            ],
          },
          { p: "An off-plan home fits when:" },
          {
            ul: [
              "You would rather pay in stages over the build than all at once",
              "You want a new home in a district that is still taking shape",
              "You can wait for handover, and your plans can absorb a delay",
            ],
          },
        ],
      },
      {
        id: "questions",
        h: "Questions to settle first",
        blocks: [
          {
            ol: [
              { t: "On a ready home: the condition, the service charge and the price.", d: "Compare the asking price with recent sales of similar homes in the same building or community, and read the service charge before you judge the return." },
              { t: "On an off-plan home: the developer, the escrow account and the plan.", d: "Check the project is registered, confirm the escrow account, and read what the sale agreement says about delays and what each instalment is tied to." },
              { t: "On either: the total cost, not the price.", d: "Fees differ between the two, and the [buying costs calculator](/buying-costs/) puts them side by side. [Buying off-plan in Dubai](/guides/buying-off-plan-in-dubai/) lists the off-plan checks in full." },
            ],
          },
          { p: "If you cannot answer one of these for a home you like, that gap is the risk you would be buying." },
        ],
      },
    ],
    faqs: [
      {
        q: "Is an off-plan home cheaper than a ready one in Dubai?",
        a: "Not by rule. The developer sets an off-plan price and the resale market sets a ready price, so compare the price per square foot of similar homes in the same area. Remember too that an off-plan home earns nothing until handover.",
      },
      {
        q: "Can I get a bigger mortgage on a ready home or an off-plan home?",
        a: "On a ready home. The Central Bank of the UAE lets a bank lend up to 80% on an expatriate's first ready home worth AED 5 million or less, but only 50% on any off-plan home.",
      },
      {
        q: "Do I pay the 4% DLD fee on both?",
        a: "Yes. On a ready home it is the 4% transfer fee plus AED 520 in title deed fees and the registration trustee fee. On an off-plan home it is 4% to register the sale on Oqood plus AED 20.",
      },
      {
        q: "Is there a developer NOC when I buy off-plan from the developer?",
        a: "No. The NOC is needed on a resale, when a developer confirms the seller has no outstanding dues. On a first sale from the developer there is nothing to confirm.",
      },
      {
        q: "Where do my off-plan payments go?",
        a: "Into an escrow account opened for the project. Under Dubai Law No. 8 of 2007 the money may be used only to build that project, and the developer's creditors cannot touch it.",
      },
      {
        q: "When can I move into or let each type of home?",
        a: "A ready home from the day of transfer, when the title deed is issued in your name. An off-plan home after handover, once the building is complete and you have paid what is due.",
      },
      {
        q: "What can I inspect before buying off-plan?",
        a: "The drawings, the specification and, where the developer has built one, a show apartment. On a ready home you inspect the home itself, so a ready purchase carries less uncertainty about what you get.",
      },
    ],
    sources: [S.dldSale, S.dldInitial, S.cbuae, S.kt, S.escrow, S.formF],
  },
  {
    slug: "buying-property-in-dubai-from-abroad",
    topic: "Buying",
    seoTitle: "Buying property in Dubai from abroad: a non-resident guide",
    seoDescription:
      "Non-residents can buy freehold in Dubai with a passport, or by power of attorney if they cannot attend. How to pay, what banks lend, and the visas it brings.",
    title: "How to buy property in Dubai when you live abroad",
    dek: "What changes when you are not in the UAE: the documents, the power of attorney rules, moving the money, borrowing, visas and tax.",
    image: "area-dubai-marina",
    updated: "2026-09-16",
    summary: [
      "A non-resident can own freehold property in Dubai's designated areas, and a valid passport is all the identification the registration trustee needs.",
      "If you cannot be in Dubai, an attorney can sign for you. A power of attorney issued abroad must be notarised there, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and dated within the last two years.",
      "DLD's fully digital sale runs on Emirates ID, UAE Pass and a UAE bank account, so non-residents complete at a trustee office.",
      "UAE banks commonly lend non-residents 50% to 60% of the price of a ready home.",
      "Owning property can bring a two-year investor residence visa, or a Golden Visa from AED 2 million.",
    ],
    sections: [
      {
        id: "who",
        h: "Can a non-resident buy in Dubai",
        blocks: [
          {
            p: "Yes. Dubai Law No. 7 of 2006 lets non-UAE nationals hold freehold property without a time limit, or leasehold rights of up to 99 years, in the areas designated for it. Those areas were first listed in 2006 and have grown since; every community in our [area guides](/areas/) is one of them. You do not need a residence visa, a local sponsor or a UAE company to buy.",
          },
          { p: "This guide covers an individual buying in their own name. A company buying through its licence has its own document list at the trustee, and a foreign company needs more of it." },
        ],
      },
      {
        id: "documents",
        h: "What identification you need",
        blocks: [
          {
            p: "The Dubai Land Department registers sales through registration trustee offices. A UAE resident shows an Emirates ID. A non-resident foreigner shows a valid passport. That is the whole identification requirement at the trustee.",
          },
          {
            p: "On a resale in a freehold area the trustee also needs the developer's electronic no-objection certificate. The seller applies for it through the Dubai REST app, and it confirms the seller has paid the developer what is due. The sale contract, Form F, sets out who pays the NOC fee.",
          },
        ],
      },
      {
        id: "attorney",
        h: "Buying without flying in",
        blocks: [
          {
            p: "You can give someone a power of attorney to sign for you. DLD Circular No. 29/R/2025, as summarised by Dubai law firms, sets the standard for a power of attorney issued outside the UAE. It must be:",
          },
          {
            ul: [
              "Notarised by the competent authority in the country of issue",
              "Legalised by the UAE embassy or consulate in that country",
              "Attested by the UAE Ministry of Foreign Affairs",
              "Produced as the original, not a copy or a scan",
              "Translated in full into Arabic by a UAE-licensed translator, where it is in another language",
              "Dated within the two years before it is used",
            ],
          },
          {
            p: "A power of attorney notarised inside the UAE and entered in the electronic register generally stays valid unless it states an end date. Whichever route you use, the document must name the transaction. General wording is rejected at the trustee, so have it drafted for this purchase, naming the property if you already know it.",
          },
          {
            p: "Choose the attorney with care. A lawyer, a relative in the UAE or the brokerage can act, and the power of attorney can be limited to signing the contract and the transfer, with no authority over the money.",
          },
        ],
      },
      {
        id: "paying",
        h: "Getting the money to Dubai",
        blocks: [
          {
            p: "DLD takes its own fees by ePay, Dubai Pay, the Noqodi wallet or manager's cheque. The price itself is a matter between you and the seller. By market practice it is paid by manager's cheque drawn on a UAE bank, handed over at the trustee office on transfer day. Plan how the funds will reach a UAE bank weeks before the transfer, not days: your own account if a bank will open one for you, or a lawyer's client account.",
          },
          {
            p: "DLD's Digital Sale service on the Dubai Now app completes a sale online, but it is built for residents: both sides need an Emirates ID, an active UAE Pass and a UAE bank account, and the home must be a mortgage-free unit in a freehold area with one owner. Non-residents use a trustee office, in person or through an attorney.",
          },
          {
            p: "Budget the fees before you send money. On a ready home they come to about 7% of the price: the 4% transfer fee, AED 520 in title deed fees, the trustee fee, the agency fee and the NOC. The [buying costs calculator](/buying-costs/) gives the exact sum.",
          },
        ],
      },
      {
        id: "borrowing",
        h: "Mortgages for non-residents",
        blocks: [
          {
            p: "No regulation stops a UAE bank lending to a non-resident, so each bank decides for itself. In practice banks lend non-residents 50% to 60% of the price of a ready home, and 50% off-plan, which is the Central Bank's cap for off-plan lending to anyone. Banks ask for proof of income and bank statements from your home country, and they may insist on a UAE account for the repayments.",
          },
          {
            p: "Get the pre-approval before you sign Form F. By custom the deposit is 10%, and a buyer who cannot complete can lose it. [How mortgages work in Dubai](/guides/mortgages-in-dubai/) explains the fees, the valuation and the order of events.",
          },
        ],
      },
      {
        id: "visas",
        h: "Visas that property can bring",
        blocks: [
          {
            ul: [
              "**A two-year investor residence visa.** The Dubai Land Department's service page lists it for a sole owner of property of any value, or a joint owner whose share is worth at least AED 400,000, with an investor fee of AED 10,212.50.",
              "**A Golden Visa.** For property worth AED 2 million or more, in one home or several, including a mortgaged home with a letter from the bank. DLD and GDRFA Dubai describe it as ten years and renewable. [The Golden Visa through property](/guides/golden-visa-through-property/) sets out the conditions.",
            ],
          },
          {
            p: "In April 2026 GDRFA Dubai and DLD agreed to move property residency services into GDRFA Dubai's system. Confirm the current channel and fees before you apply, because the pages that describe them are changing.",
          },
        ],
      },
      {
        id: "tax",
        h: "Tax when you own from abroad",
        blocks: [
          {
            p: "The UAE has no income tax on individuals. Under Cabinet Decision No. 49 of 2023, income from property you hold in your own name is outside UAE corporate tax, whatever the amount, as long as the activity is not carried out, and need not be carried out, under a licence. Residential leases are generally exempt from VAT.",
          },
          {
            p: "Your own country may tax rent and gains from Dubai property, and some countries tax worldwide income. Ask an adviser at home before you buy, not after.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can a foreigner who does not live in the UAE buy property in Dubai?",
        a: "Yes. Any nationality can own freehold property in Dubai's designated freehold areas under Law No. 7 of 2006, and no residence visa is needed. A valid passport identifies a non-resident at the registration trustee.",
      },
      {
        q: "Can I complete a Dubai purchase without visiting?",
        a: "Yes, through an attorney holding a power of attorney. One issued abroad must be notarised there, legalised by the UAE embassy or consulate, attested by the UAE Ministry of Foreign Affairs, translated into Arabic and dated within the last two years.",
      },
      {
        q: "Do I need a UAE bank account to buy?",
        a: "Not for DLD's fees, which it accepts by ePay, Dubai Pay, Noqodi or manager's cheque. The price is paid by manager's cheque from a UAE bank by market practice, and DLD's digital sale service requires a UAE account, so most non-residents open one or use a lawyer's client account.",
      },
      {
        q: "Can I use DLD's online sale service from abroad?",
        a: "No. The Digital Sale service on the Dubai Now app needs an Emirates ID, an active UAE Pass and a UAE bank account from both parties, which non-residents do not have. Non-residents complete at a registration trustee office.",
      },
      {
        q: "How much will a UAE bank lend a non-resident?",
        a: "Each bank decides. Commonly 50% to 60% of the price of a ready home and 50% on an off-plan home, which is the Central Bank of the UAE's off-plan cap for all buyers.",
      },
      {
        q: "Does owning property in Dubai give me a residence visa?",
        a: "It can. DLD lists a two-year investor residence visa for a sole owner of property of any value, or a joint owner with a share of at least AED 400,000, and a ten-year Golden Visa for property worth AED 2 million or more.",
      },
      {
        q: "Will I pay UAE tax on rent from a Dubai property?",
        a: "No personal income tax applies in the UAE, and rental income from property held in your own name is outside corporate tax when no licence is needed. Your country of residence may tax the income.",
      },
    ],
    sources: [S.freeholdList, S.law7, S.dldSale, S.poa, S.poa2, S.digitalSale, S.dubaiRest, S.nonRes, S.investorVisa, S.dldVisa, S.gdrfaMove, S.ftaRei, S.uaeTax],
  },
  {
    slug: "service-charges-in-dubai",
    topic: "Owning and letting",
    seoTitle: "Service charges in Dubai: what they are and how to check",
    seoDescription:
      "Service charges pay to run a Dubai building. RERA approves them under Law No. 6 of 2019, and the Service Charge Index shows the approved rate for any building.",
    title: "Service charges in Dubai, explained for owners and buyers",
    dek: "What the annual charge pays for, who sets it, where to look it up before you buy, and what the law does when an owner stops paying.",
    image: "l-marina",
    updated: "2026-09-16",
    summary: [
      "A service charge is the yearly amount each owner pays to manage, operate, maintain and repair the shared parts of a building or community.",
      "Dubai Law No. 6 of 2019 stops a management company charging it until RERA has approved a budget that a certified audit firm has already approved.",
      "You can see the approved charge for any building on DLD's Service Charge Index, through Mollak or in the Dubai REST app.",
      "Unpaid charges are a lien on the home. It cannot be sold until they are cleared.",
    ],
    sections: [
      {
        id: "what",
        h: "What the charge pays for",
        blocks: [
          {
            p: "Every apartment building and most villa communities in Dubai are jointly owned property: you own your unit, and all owners share the lobby, lifts, pool, gym, corridors, landscaping, security and the structure itself. Dubai Law No. 6 of 2019 defines service charges as the annual charges collected from owners to meet the cost of managing, operating, maintaining and repairing those shared parts.",
          },
          {
            p: "The charge is set per square foot of your unit, so a larger home pays more. Buildings with more facilities cost more to run, and so do older buildings that need more repair. A reserve fund for future replacement, such as lifts and chillers, sits inside the budget.",
          },
          {
            p: "The charge does not cover your own unit. Repairs inside the home, your DEWA account and, where there is district cooling, your unit's chiller consumption are separate costs.",
          },
        ],
      },
      {
        id: "budget-lines",
        h: "What a budget contains",
        blocks: [
          { p: "An approved budget is itemised, and the manager must show it to owners. The usual lines are:" },
          {
            ul: [
              "Cleaning, security and concierge staff",
              "Lifts, fire systems, pumps and air handling: maintenance contracts and repairs",
              "Pool, gym and landscaping",
              "Electricity and water for the shared areas",
              "Building insurance",
              "The management company's fee",
              "The reserve fund contribution for future replacement of major plant",
            ],
          },
          { p: "Ask which lines rose in the last budget and why. A jump in insurance or a new maintenance contract explains most increases." },
        ],
      },
      {
        id: "approval",
        h: "Who sets the amount",
        blocks: [
          {
            p: "Each jointly owned building or community has a management entity: an owners' association, the developer, or a management company. Article 27 of Law No. 6 of 2019 forbids that entity from charging owners until the Real Estate Regulatory Agency (RERA) has approved the amount. RERA will not approve a budget that a certified audit firm has not approved first.",
          },
          {
            p: "RERA runs this through Mollak, its system for service charge budgets, invoices and the companies that manage buildings. Owners are represented by an owners committee formed under the same law, which reviews the budget and raises concerns with the manager and with RERA.",
          },
        ],
      },
      {
        id: "check",
        h: "How to check a building before you buy",
        blocks: [
          {
            ol: [
              {
                t: "Look up the approved rate.",
                d: "DLD's Service Charge Index lists the service charges RERA has approved for jointly owned properties. It is on the DLD website, through Mollak, and in the Dubai REST app. Search by the building or community name.",
              },
              {
                t: "Multiply by the unit's area.",
                d: "The index gives a rate per square foot. Multiply by the area on the title deed to get the yearly charge for the home you are looking at.",
              },
              {
                t: "Confirm the seller is paid up.",
                d: "A home cannot be disposed of while its service charges are unpaid. On a resale the developer's no-objection certificate confirms the dues are clear, and Form F records who pays the NOC fee.",
              },
              {
                t: "Ask about the reserve fund and recent increases.",
                d: "A low reserve can mean a large one-off levy later. Ask the manager for the last two approved budgets.",
              },
            ],
          },
          { p: "If the seller cannot show a service charge statement, ask the manager directly before you sign Form F. The lien attaches to the unit, not to the seller, so arrears become the buyer's problem at transfer unless the NOC confirms they are clear." },
        ],
      },
      {
        id: "budget",
        h: "Service charges and your return",
        blocks: [
          {
            p: "The charge is an owner's cost, every year, whether the home is let or empty. Law No. 6 of 2019 defines it as a charge collected from owners, so a landlord pays it, not the tenant, unless a tenancy contract says otherwise. Take it off the rent before you judge a home's yield, and add it to your running costs alongside insurance and any management fee.",
          },
          {
            p: "If you are comparing two homes at similar prices, the service charge can decide between them. A difference of a few dirhams per square foot on a large apartment adds up over the years you own it.",
          },
        ],
      },
      {
        id: "unpaid",
        h: "When an owner does not pay",
        blocks: [
          {
            ul: [
              "The management entity holds a lien over the unit, and the unit cannot be sold until the charges are paid (Article 32)",
              "After a written notice approved by RERA, the owner has 30 days to pay before the entity can enforce the claim through the execution judge at the Rental Dispute Settlement Centre",
              "The judge can order the unit sold at public auction, with the court and legal fees falling on the owner",
            ],
          },
          {
            p: "If you believe a charge is wrong, raise it with the owners committee and through Mollak before you withhold payment. Non-payment does not pause the lien.",
          },
        ],
      },
      {
        id: "disputes",
        h: "If you disagree with the budget",
        blocks: [
          {
            p: "The audit and RERA approval exist to keep budgets honest, but they do not make every budget right for every owner. The owners committee is the first route. It can ask the manager for the detail behind any line, and it can take concerns to RERA through Mollak. Disputes over jointly owned property go to the Rental Dispute Settlement Centre, which has handled them since Law No. 6 of 2019.",
          },
          {
            ul: [
              "Ask the manager for the line-by-line budget and the audit firm's approval",
              "Raise it through the owners committee, which can take it to RERA through Mollak",
              "For a claim, file at the Rental Dispute Settlement Centre",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What are service charges in Dubai?",
        a: "The annual charges each owner pays to manage, operate, maintain and repair the shared parts of a jointly owned building or community, as defined in Dubai Law No. 6 of 2019.",
      },
      {
        q: "Who approves service charges in Dubai?",
        a: "RERA. Under Article 27 of Law No. 6 of 2019 a management entity may not charge owners until RERA has approved the amount, and RERA first requires a budget approved by a certified audit firm.",
      },
      {
        q: "How do I find the service charge for a building in Dubai?",
        a: "On the Dubai Land Department's Service Charge Index, available on the DLD website through Mollak and in the Dubai REST app. It gives the approved rate per square foot, which you multiply by the unit's area.",
      },
      {
        q: "Does the tenant or the owner pay service charges?",
        a: "The owner. Law No. 6 of 2019 defines service charges as charges collected from owners. A tenancy contract can shift some costs, but the obligation to the building sits with the owner.",
      },
      {
        q: "Can I sell a home with unpaid service charges?",
        a: "No. Unpaid service charges are a lien on the unit under Law No. 6 of 2019, and the unit cannot be disposed of until they are paid. The developer's NOC on a resale confirms the dues are clear.",
      },
      {
        q: "What happens if an owner refuses to pay service charges?",
        a: "After a RERA-approved written notice and 30 days to pay, the management entity can enforce through the execution judge at the Rental Dispute Settlement Centre, who may order the unit sold at auction with the costs on the owner.",
      },
      {
        q: "Can service charges go up?",
        a: "Yes, but only through a new budget approved by a certified audit firm and then by RERA. Ask for the last two approved budgets to see the trend before you buy.",
      },
    ],
    sources: [S.law6, S.sci, S.mollak, S.dubaiRest, S.pfNoc],
  },
  {
    slug: "renting-out-property-in-dubai",
    topic: "Owning and letting",
    seoTitle: "Renting out property in Dubai: the landlord's guide",
    seoDescription:
      "Register the tenancy on Ejari, raise rent only within Decree No. 43 of 2013, give the 90-day or 12-month notice the law requires, and pay no income tax on rent.",
    title: "How to rent out your Dubai property",
    dek: "The landlord's side of Dubai tenancy law: registering the contract, what rent increase the index allows, the two notice rules, holiday lets and tax.",
    image: "l-jvc",
    updated: "2026-09-16",
    summary: [
      "A tenancy contract must be registered with RERA through Ejari. Online registration costs AED 177.75.",
      "Rent can rise at renewal only when it is more than 10% below the rent index average for similar homes, and then by 5% to at most 20%, in bands set by Decree No. 43 of 2013.",
      "To change the terms or not renew, either side gives at least 90 days' notice before the contract ends, unless the contract says otherwise.",
      "To end a tenancy at expiry so you can sell, or move in yourself or a first-degree relative, you must give 12 months' notice through a notary public or by registered mail.",
      "There is no UAE income tax on individuals, and rent from property in your own name is outside corporate tax when no licence is needed.",
    ],
    sections: [
      {
        id: "ejari",
        h: "Register the contract on Ejari",
        blocks: [
          {
            p: "Article 4 of Dubai Law No. 26 of 2007, as amended by Law No. 33 of 2008, requires every lease to be registered with RERA. The system is Ejari. Without it the tenant cannot connect DEWA in their name and neither side can file a case at the Rental Dispute Settlement Centre. The landlord, the tenant or a holder of a power of attorney can register.",
          },
          {
            table: {
              head: ["Where you register", "Fee"],
              rows: [
                ["Dubai REST app or the DLD website", "AED 177.75: AED 100 registration, AED 10 knowledge fee, AED 10 innovation fee, AED 55 service fee and VAT"],
                ["A registration trustee centre", "AED 100, AED 10 and AED 10, plus a AED 95 service fee and VAT"],
              ],
            },
          },
          {
            p: "You need the title deed, the tenant's passport and Emirates ID, your own identification and the signed contract. Register the renewal each year as well, because an expired Ejari blocks the same services as a missing one.",
          },
        ],
      },
      {
        id: "rent",
        h: "How much you can raise the rent",
        blocks: [
          {
            p: "You cannot raise the rent during a contract. At renewal, Decree No. 43 of 2013 ties any increase to how far the current rent sits below the average for similar homes in RERA's rent index:",
          },
          {
            table: {
              head: ["Current rent against the index average", "Largest increase allowed"],
              rows: [
                ["Up to 10% below", "None"],
                ["11% to 20% below", "5%"],
                ["21% to 30% below", "10%"],
                ["31% to 40% below", "15%"],
                ["More than 40% below", "20%"],
              ],
            },
          },
          {
            p: "Since January 2025 the Dubai Land Department's Smart Rental Index has set that average. It classifies every building by its specification, finishes, location and facilities, so two buildings on the same street can carry different averages. The bands themselves did not change. Check the index in the Dubai REST app before you propose a new rent, because a tenant can take an increase outside the bands to the Rental Dispute Settlement Centre.",
          },
        ],
      },
      {
        id: "notice",
        h: "The two notice rules",
        blocks: [
          {
            ul: [
              "**To change the terms or not renew:** at least 90 days before the contract ends, unless the contract sets a different period (Article 14 of Law No. 26 of 2007). This covers a rent increase within the bands.",
              "**To end the tenancy at expiry to sell, move in, demolish and rebuild, or carry out major maintenance:** at least 12 months before the eviction date, served through a notary public or by registered mail (Article 25(2), as amended by Law No. 33 of 2008).",
            ],
          },
          {
            p: "The moving-in ground applies when you or a first-degree relative need the home and have no other suitable property. A notice sent by email or WhatsApp does not meet the 12-month rule. If a tenant does not leave after valid notice, the Rental Dispute Settlement Centre decides.",
          },
        ],
      },
      {
        id: "contract",
        h: "What to put in the contract",
        blocks: [
          {
            ol: [
              { t: "The rent and how it is paid.", d: "The number of cheques and their dates. Fewer cheques is a stronger position for the landlord, and the market usually prices it." },
              { t: "The security deposit.", d: "How much, what it covers and when it is returned. A dated inventory with photographs avoids the argument at the end." },
              { t: "Maintenance.", d: "Who pays for what. By custom the landlord carries major items such as air conditioning and the tenant carries minor wear, but write it down." },
              { t: "Service charges and chiller.", d: "Service charges are the owner's cost under Law No. 6 of 2019. Say in the contract who pays any district cooling charges." },
              { t: "Subletting and use.", d: "Whether the tenant may sublet, and that the home is for residential use only." },
            ],
          },
          { p: "Register exactly what you both signed. Extra terms go in an addendum signed by both sides, because the Rental Dispute Settlement Centre reads the registered contract, not the messages around it." },
        ],
      },
      {
        id: "holiday-homes",
        h: "Holiday lets and shared housing",
        blocks: [
          {
            p: "Short-term holiday lets need a holiday home permit from Dubai's Department of Economy and Tourism (DET). Individual owners can register their own homes, not only companies. Gulf News lists the usual documents as the title deed or sale agreement, the developer's NOC where the building requires one, identification, a recent DEWA bill and insurance. Check DET's current requirements and fees before you list, and check your building's rules, because some owners' associations restrict short lets.",
          },
          { p: "Separately, Law No. 4 of 2026, issued in March 2026, requires a permit before any unit is used as shared housing. Letting rooms to several unrelated tenants falls under it." },
        ],
      },
      {
        id: "tax",
        h: "Tax on the rent",
        blocks: [
          {
            ul: [
              "The UAE levies no income tax on individuals",
              "Under Cabinet Decision No. 49 of 2023, a person's income from real estate investment is outside corporate tax, whatever the amount, as long as the activity is not carried out, and need not be carried out, under a licence",
              "Residential leases are generally exempt from VAT; commercial property rent carries 5%",
            ],
          },
          {
            p: "If you live outside the UAE, your own country may tax the rent. Non-resident owners should read [buying property in Dubai from abroad](/guides/buying-property-in-dubai-from-abroad/) and ask an adviser at home.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Do I have to register a tenancy on Ejari?",
        a: "Yes. Article 4 of Dubai Law No. 26 of 2007 requires every lease to be registered with RERA, through Ejari. Online registration costs AED 177.75 and a registration trustee centre charges a AED 95 service fee in place of the AED 55 online fee.",
      },
      {
        q: "How much can I raise the rent in Dubai?",
        a: "Nothing if the rent is within 10% of the index average for similar homes. Otherwise 5% when it is 11% to 20% below, 10% at 21% to 30% below, 15% at 31% to 40% below, and 20% when it is more than 40% below, under Decree No. 43 of 2013.",
      },
      {
        q: "What is the Smart Rental Index?",
        a: "The Dubai Land Department's rent index since January 2025. It classifies each building by specification, finishes, location and facilities to set the average rent that Decree No. 43 of 2013 measures increases against.",
      },
      {
        q: "How much notice must I give to raise the rent or not renew?",
        a: "At least 90 days before the contract ends, unless the contract sets another period, under Article 14 of Law No. 26 of 2007.",
      },
      {
        q: "How do I get my property back to sell it or live in it?",
        a: "Serve at least 12 months' notice before the eviction date, through a notary public or by registered mail, under Article 25(2) of Law No. 26 of 2007 as amended by Law No. 33 of 2008. Moving in requires that you or a first-degree relative have no other suitable home.",
      },
      {
        q: "Can I let my Dubai home on Airbnb?",
        a: "Only with a holiday home permit from the Department of Economy and Tourism. Individual owners can apply, with documents such as the title deed, the developer's NOC where required, identification, a DEWA bill and insurance.",
      },
      {
        q: "Is rental income taxed in Dubai?",
        a: "The UAE has no personal income tax, and under Cabinet Decision No. 49 of 2023 rent from property held in your own name is outside corporate tax when no licence is required. Residential leases are generally exempt from VAT.",
      },
    ],
    sources: [S.law26, S.law33, S.ejari, S.decree43, S.smartRent, S.holidayHomes, S.sharedHousing, S.ftaRei, S.uaeTax, S.mofVat],
  },
  {
    slug: "handover-and-snagging-in-dubai",
    topic: "Off-plan",
    seoTitle: "Handover and snagging in Dubai: what happens at completion",
    seoDescription:
      "At completion your Oqood registration becomes a title deed, you inspect the home for defects, and the developer stays liable for one year and for ten years.",
    title: "Handover and snagging: taking the keys to a new Dubai home",
    dek: "The completion certificate, your title deed, the inspection before you accept, and the years the developer stays responsible for defects.",
    image: "viewing",
    updated: "2026-09-16",
    summary: [
      "When a project receives its completion certificate, the developer must register each sold unit in the name of the buyer who has met their obligations. Your Oqood registration becomes a title deed.",
      "Snagging is the inspection you carry out before you accept the home. You list every defect and every piece of incomplete work for the developer to put right.",
      "Article 40 of Dubai Law No. 6 of 2019 makes the developer liable for defective installations for one year from handover and for structural defects for ten years from the completion certificate.",
      "Any clause that cuts those liabilities short is void.",
    ],
    sections: [
      {
        id: "completion",
        h: "The completion certificate and your deed",
        blocks: [
          {
            p: "A building is complete when its planning authority says so by issuing a completion certificate. Depending on the area that authority is the Dubai Development Authority, Trakhees or Dubai Municipality. Until the certificate exists the developer cannot hand over, whatever the marketing says.",
          },
          {
            p: "Once it exists, Article 8 of Law No. 13 of 2008 requires the developer to enter the project in the property register and to register each sold unit in the name of the buyer who has met their obligations. That is the moment your Oqood registration gives way to a title deed. DLD's fee for issuing the deed is AED 250. If you still owe an instalment, settle it first, because the registration waits for buyers who have paid.",
          },
        ],
      },
      {
        id: "before",
        h: "Before handover day",
        blocks: [
          {
            ul: [
              "Read the handover notice for what the developer asks you to pay: the final instalment, any administration charge, and the first service charge period",
              "Check the service charge against what the sale agreement said, and ask for the RERA-approved budget",
              "Confirm the DEWA connection process and whether a deposit is collected at handover",
              "Book a snagging inspection for a date before you sign the handover documents, not after",
            ],
          },
          { p: "The developer's handover team will have an appointment system and a document list, usually your identification and proof that the final payment has cleared. Ask for the list in advance so the appointment is not wasted, and ask whether the keys are released on the day or after the deed is issued." },
        ],
      },
      {
        id: "snagging",
        h: "The snagging inspection",
        blocks: [
          {
            p: "Snagging is market practice rather than a legal step, so nothing in the law forces the developer to wait for it. The developer's handover documents usually include an acceptance form, and once you sign it the leverage shifts. Inspect first. Walk every room with a checklist, or hire an inspector who does this for a living, and hand the developer a written, dated list with photographs.",
          },
          {
            ol: [
              { t: "Finishes.", d: "Walls, ceilings, floors, tiling, joinery, doors and windows. Look for cracks, chips, gaps, scratches and uneven lines." },
              { t: "Installations.", d: "Air conditioning, electrics, every socket and switch, water pressure, hot water, drainage and extraction, each tested while running." },
              { t: "Kitchen and bathrooms.", d: "Appliances, silicone and grout, taps and shower screens, waterproofing under and around wet areas." },
              { t: "Against the contract.", d: "Layout, size and specification checked against the sale and purchase agreement and the brochure you bought from." },
              { t: "Outside.", d: "Balcony drainage, railings, external doors and, on a villa, the boundary wall, garden drainage and the roof." },
            ],
          },
          {
            p: "Agree a date for the developer to clear the list and a second visit to confirm it. Keep copies of everything. The one-year installation liability starts at handover, so the clock is already running once you take the keys.",
          },
        ],
      },
      {
        id: "liability",
        h: "How long the developer is liable",
        blocks: [
          {
            table: {
              head: ["Defect", "Developer liable for", "Counted from"],
              rows: [
                ["Defective installations: mechanical, electrical, sanitary and sewerage", "1 year", "Handover of the unit, or the completion certificate if the owner refuses to take possession"],
                ["Defects in the structural parts of the building", "10 years", "The completion certificate"],
              ],
            },
          },
          {
            p: "Both periods come from Article 40 of Dubai Law No. 6 of 2019, and the same article makes any agreement to the contrary void. A clause in your sale agreement that shortens them has no effect. Separately, the UAE's Civil Transactions Law, Federal Decree-Law No. 25 of 2025, holds contractors and engineers jointly liable for ten years for collapse or for defects that threaten a building's stability or safety, in Articles 821 to 824, in force from 1 June 2026.",
          },
          {
            p: "Report defects in writing as soon as you find them, with dates, so that a claim inside the period is easy to prove.",
          },
        ],
      },
      {
        id: "delays",
        h: "Delays, defaults and cancelled projects",
        blocks: [
          {
            p: "If the delay is yours, Law No. 13 of 2008 as amended by Law No. 19 of 2020 applies. After a 30-day notice served through DLD, the developer may terminate and keep up to 40% of the unit's value where the project is more than 60% complete, or up to 25% below that, and must refund the rest within a year or within 60 days of reselling the unit, whichever comes first.",
          },
          {
            p: "If the delay is the developer's, the sale and purchase agreement governs. Read the clause on late completion before you sign, because it sets whatever compensation you are entitled to. If a project never starts for reasons outside the developer's control, or RERA cancels it, the developer must refund buyers' payments under the escrow law.",
          },
        ],
      },
      {
        id: "resale",
        h: "Selling before the keys",
        blocks: [
          {
            p: "You can resell an off-plan home before completion. Under Article 3 of Law No. 13 of 2008 every such sale must be entered in the interim register, or it is void. The developer sets its own conditions for the resale NOC, written into the sale and purchase agreement, including how much of the price must already be paid. [Selling property in Dubai](/guides/selling-property-in-dubai/) covers the steps.",
          },
          { p: "Ask the developer for its consent conditions and any administration fee in writing before you agree a price with a buyer. No deed changes hands; the Oqood record is updated to the buyer's name, and the deed is issued to them at completion." },
        ],
      },
    ],
    faqs: [
      {
        q: "When does an off-plan buyer get the title deed?",
        a: "After the project's completion certificate is issued. Article 8 of Law No. 13 of 2008 then requires the developer to register each sold unit in the name of the buyer who has met their obligations. DLD's deed issuance fee is AED 250.",
      },
      {
        q: "What is snagging?",
        a: "The inspection of a new home before you accept it. You list defects and incomplete work for the developer to put right. It is market practice, not a legal procedure, so arrange it before you sign the handover documents.",
      },
      {
        q: "How long must a developer fix defects in Dubai?",
        a: "One year from handover for defective mechanical, electrical, sanitary and sewerage installations, and ten years from the completion certificate for structural defects, under Article 40 of Dubai Law No. 6 of 2019. Any agreement to the contrary is void.",
      },
      {
        q: "Who issues the completion certificate?",
        a: "The planning authority for the area: the Dubai Development Authority, Trakhees or Dubai Municipality.",
      },
      {
        q: "What happens if I stop paying before handover?",
        a: "After a 30-day notice through DLD the developer may terminate and keep up to 40% of the unit's value on a project more than 60% complete, or up to 25% below that, refunding the balance within a year or 60 days of resale, under Law No. 13 of 2008 as amended by Law No. 19 of 2020.",
      },
      {
        q: "What if the developer is late?",
        a: "Your sale and purchase agreement sets your entitlement, so read the late completion clause before you sign. If the project never starts or RERA cancels it, the escrow law requires your payments to be refunded.",
      },
      {
        q: "Can I sell an off-plan home before handover?",
        a: "Yes, subject to the developer's conditions and NOC. Under Article 3 of Law No. 13 of 2008 the sale must be entered in DLD's interim register or it is void.",
      },
    ],
    sources: [S.law6, S.law13, S.law19, S.escrow, S.decennial, S.dda, S.dldSale],
  },
  {
    slug: "selling-property-in-dubai",
    topic: "Owning and letting",
    seoTitle: "Selling property in Dubai: the process, forms and fees",
    seoDescription:
      "How to sell a home in Dubai: Form A, the Trakheesi permit, Form F, the developer NOC, releasing a mortgage, the DLD transfer, and who pays which fee by custom.",
    title: "How to sell property in Dubai, step by step",
    dek: "From the listing agreement to the transfer at the trustee office: the forms you sign, the certificates you need, the fees by custom, and how an off-plan unit is sold before handover.",
    image: "guide-keys",
    updated: "2026-10-17",
    summary: [
      "A sale in Dubai runs through three RERA forms: Form A appoints your broker, Form F is the sale contract with the buyer, and the broker's Form B binds the buyer to them.",
      "Before transfer you need the developer's no-objection certificate and, if the home is mortgaged, a liability letter from your bank so the buyer's money can clear the loan.",
      "Ownership passes at a Dubai Land Department registration trustee office. By custom the buyer pays the 4% transfer fee and the agency fee is 2% plus VAT.",
      "An off-plan unit can be sold before handover with the developer's consent. The sale is recorded on the Oqood register, not by a title deed.",
    ],
    sections: [
      {
        id: "listing",
        h: "Appoint a broker with Form A",
        blocks: [
          {
            p: "Dubai's brokers work on standard RERA contracts. Form A is the agreement between you and the brokerage to market your home. The Dubai Land Department's brokerage practice guide describes it as the marketing agreement between the seller and the brokerage, and every licensed broker must use it. If the home is jointly owned, every owner signs.",
          },
          {
            p: "Once signed, it is submitted through DLD's Trakheesi system, which issues the advertising permit for your home. Bayut's guide notes that an owner can hold up to three Form A agreements at a time, one per brokerage, so you can give the listing to more than one firm or keep it exclusive.",
          },
          {
            ul: [
              "Check the broker's card and the brokerage's registration before you sign; [choosing a real estate broker in Dubai](/guides/choosing-a-real-estate-broker-in-dubai/) shows how",
              "Agree the asking price, the commission and the term of the agreement in the form, not by message",
              "Ask how the home will be advertised: every advert must carry the Trakheesi permit number, and printed and video adverts a Madmoun QR code",
            ],
          },
        ],
      },
      {
        id: "offer",
        h: "Agree the sale with Form F",
        blocks: [
          {
            p: "When a buyer's offer is accepted, both of you sign Form F, the sale contract RERA calls the memorandum of understanding. It records the price, the deposit, the completion date, the fees and who pays each, and the commission due to each side's broker. It is valid only once the seller and the buyer have both signed and the broker has witnessed and dated it.",
          },
          {
            p: "By custom the buyer pays a 10% deposit on signing. The broker usually holds the deposit cheque until transfer. Form F also sets the consequences if either side withdraws, so read that clause as carefully as the price.",
          },
        ],
      },
      {
        id: "noc",
        h: "Get the developer's NOC",
        blocks: [
          {
            p: "On a resale in a freehold area the trustee will not transfer without the developer's no-objection certificate. The NOC confirms you owe the developer nothing: no service charges, no penalties, no restriction on the unit. You apply for it, and the developer issues it electronically through the Dubai REST app.",
          },
          {
            p: "Developers charge AED 500 to 5,000 for the NOC, and each sets its own fee and processing time. Form F records which side pays it. Clear any service charge arrears before you apply, because the developer will not issue the certificate while they stand. Under Law No. 6 of 2019 a home cannot be sold while its service charges are unpaid; [service charges in Dubai](/guides/service-charges-in-dubai/) explains the lien.",
          },
        ],
      },
      {
        id: "mortgage",
        h: "If the home is mortgaged",
        blocks: [
          {
            p: "A mortgaged home can be sold, but the loan must be cleared and the bank's charge released before the deed can pass. Bayut's guide sets out the sequence:",
          },
          {
            ol: [
              { t: "Liability letter.", d: "Ask your bank for a letter stating the amount outstanding. It is addressed to DLD and has a limited validity, so time the request against the transfer date." },
              { t: "Blocking.", d: "You, the buyer and the brokers attend a registration trustee office with the liability letter, Form F, the NOC and the title deed. The trustee blocks the property in the buyer's name, so you cannot sell it to anyone else while the buyer pays off your loan." },
              { t: "Clearance.", d: "The buyer pays the outstanding balance to your bank. The bank then issues a mortgage release letter and returns the original title deed." },
              { t: "Transfer.", d: "You return to the trustee office. The mortgage is released, the balance of the price is paid to you, and the new deed is issued to the buyer." },
            ],
          },
          {
            p: "If the buyer is also borrowing, their bank handles the clearance and receives the original deed, so the blocking step falls away but the timetable is longer. Early settlement fees on a UAE mortgage are capped at 1% of the outstanding balance or AED 10,000, whichever is lower.",
          },
        ],
      },
      {
        id: "transfer",
        h: "The transfer at the trustee office",
        blocks: [
          {
            p: "Ownership passes at a Dubai Land Department registration trustee office. Both sides attend, or send an attorney with a valid power of attorney. You bring the original title deed, the NOC, Form F and your identification: an Emirates ID, or a passport for a non-resident. The buyer brings manager's cheques for the price and the fees. The trustee registers the sale, DLD issues the new deed in the buyer's name, and you leave with the cheque.",
          },
          {
            table: {
              head: ["Fee", "Amount", "Paid by custom"],
              rows: [
                ["DLD transfer fee", "4% of the price. DLD's schedule splits it 2% and 2%, but Form F usually puts it on the buyer", "Buyer"],
                ["Title deed fees", "AED 520 for an apartment or villa", "Buyer"],
                ["Registration trustee fee", "AED 4,000 plus VAT at AED 500,000 and above; AED 2,000 plus VAT below", "Buyer"],
                ["Agency fee", "2% of the price plus VAT, the customary rate; it is set by agreement, not by law", "Buyer, unless Form A or Form F says otherwise"],
                ["Developer NOC", "AED 500 to 5,000, set by the developer", "As agreed in Form F"],
              ],
            },
          },
          {
            p: "Property Finder's guide confirms the 2% resale commission is usually paid by the buyer, and that an exclusive agreement can change who pays. If your Form A promises the brokerage a fee from you, that fee is due at transfer. The [buying costs calculator](/buying-costs/) shows the buyer's side at any price.",
          },
        ],
      },
      {
        id: "timeline",
        h: "How long it takes",
        blocks: [
          {
            p: "Nothing in the law sets the timetable. The pace is set by the slowest document: the developer's NOC, the buyer's bank approval and valuation, and, on a mortgaged sale, the bank's liability letter and release. A cash sale with the NOC in hand can complete soon after Form F. A sale where both sides have banks involved takes longer, because two lenders and the developer must each act in order. Set the completion date in Form F with those steps in mind, and ask for the NOC early.",
          },
          {
            ol: [
              { t: "Form A signed, advert permitted.", d: "The brokerage markets the home under its Trakheesi permit." },
              { t: "Offer accepted, Form F signed.", d: "The buyer pays the customary 10% deposit." },
              { t: "NOC requested.", d: "You apply to the developer; arrears must be cleared first." },
              { t: "Bank steps.", d: "The buyer's valuation and final approval; your liability letter if the home is mortgaged." },
              { t: "Transfer.", d: "Both sides at the trustee office with the deed, the NOC, Form F and the cheques." },
            ],
          },
        ],
      },
      {
        id: "off-plan",
        h: "Selling an off-plan unit before handover",
        blocks: [
          {
            p: "An off-plan unit has no title deed yet. What you own is your contract with the developer, registered on DLD's Oqood interim register. Selling it means assigning that contract to a new buyer, who takes over the remaining instalments. Under Article 3 of Law No. 13 of 2008 the sale must be entered in the interim register, or it is void.",
          },
          {
            ul: [
              "The developer must consent and issue an NOC, and most sale agreements allow a resale only once a share of the price has been paid; Betterhomes puts the usual threshold at 30% to 40%, but your own agreement sets the figure",
              "Your instalments must be up to date, because a developer will not consent while arrears stand",
              "The buyer pays the 4% DLD fee on the resale price, and the developer may charge its own transfer or administration fee, so ask for the amounts in writing",
              "The new buyer's name replaces yours on Oqood, and the title deed is issued to them at completion",
            ],
          },
          {
            p: "[Handover and snagging in Dubai](/guides/handover-and-snagging-in-dubai/) explains what happens if you keep the unit to completion.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What is Form A in Dubai real estate?",
        a: "The RERA listing agreement between a seller and a brokerage. It authorises the brokerage to market the home and, once submitted through Trakheesi, produces the advertising permit. An owner can hold up to three at a time, one per brokerage.",
      },
      {
        q: "What is Form F?",
        a: "The RERA sale contract between buyer and seller, often called the MOU. It records the price, deposit, completion date, fees and commissions, and it is valid once both parties have signed and the broker has witnessed and dated it.",
      },
      {
        q: "Who pays the 4% DLD transfer fee, the buyer or the seller?",
        a: "By custom the buyer. DLD's own schedule divides the 4% equally between buyer and seller, so the split is a matter for Form F, and the market practice is to put the whole fee on the buyer.",
      },
      {
        q: "Does the seller pay a commission in Dubai?",
        a: "Usually not on a residential resale. The customary 2% plus VAT is paid by the buyer, though an exclusive listing agreement can put a fee on the seller. The rate is set by agreement, not by law.",
      },
      {
        q: "Can I sell a property in Dubai with a mortgage on it?",
        a: "Yes. You get a liability letter from your bank, the property is blocked in the buyer's name at the trustee office, the buyer's payment clears the loan, the bank releases the mortgage and returns the deed, and the transfer completes.",
      },
      {
        q: "What is a developer NOC and do I need one to sell?",
        a: "A no-objection certificate from the developer confirming you owe nothing on the unit. The trustee requires it on a resale in a freehold area. Developers charge AED 500 to 5,000, and Form F records who pays.",
      },
      {
        q: "Can I sell an off-plan property before handover in Dubai?",
        a: "Yes, with the developer's consent. The contract is assigned to the new buyer and the change is registered on DLD's Oqood interim register. Most developers require a share of the price to have been paid first; the sale agreement sets it.",
      },
      {
        q: "How long does it take to sell a property in Dubai?",
        a: "The law sets no period. A cash sale with the developer's NOC in hand completes soon after Form F; a sale with a mortgage on either side takes longer, because the banks' letters and approvals must each come in order.",
      },
    ],
    sources: [S.brokerGuide, S.bayutForms, S.trakheesi, S.pfTrakheesi, S.dldMadmoun, S.formF, S.pfNoc, S.dubaiRest, S.law6, S.bayutSellMortgaged, S.earlySettle, S.dldSale, S.pfCommission, S.law13, S.bhOffPlanExit],
  },
  {
    slug: "renting-a-home-in-dubai",
    topic: "Owning and letting",
    seoTitle: "Renting a home in Dubai: the tenant's guide to the rules",
    seoDescription:
      "What a Dubai tenant should know: Ejari, the deposit and agency fee by custom, rent cheques, rent increase bands, notice rules and the Rental Disputes Center.",
    title: "Renting a home in Dubai: what every tenant should know",
    dek: "The law behind a Dubai tenancy, what you pay up front, how much the rent can rise, the notice you are entitled to, and where to go when something goes wrong.",
    image: "l-jvc",
    updated: "2026-10-17",
    summary: [
      "Dubai tenancies are governed by Law No. 26 of 2007, as amended by Law No. 33 of 2008. Every contract must be registered with RERA through Ejari.",
      "By market custom the security deposit is 5% of the annual rent for an unfurnished home and 10% for a furnished one, and the tenant pays an agency fee of about 5% of the annual rent plus VAT.",
      "Rent can rise at renewal only within the bands of Decree No. 43 of 2013, measured against the Smart Rental Index, and only with 90 days' notice.",
      "A landlord who wants the home back at expiry to sell it or live in it must give 12 months' notice through a notary public or by registered mail. Disputes go to the Rental Disputes Center.",
    ],
    sections: [
      {
        id: "law",
        h: "The law that protects you",
        blocks: [
          {
            p: "Dubai Law No. 26 of 2007, amended by Law No. 33 of 2008, governs the relationship between landlords and tenants. It fixes the notice periods, the grounds on which a landlord can take a home back, and the rule that a contract runs to its end date even if the home is sold. Decree No. 43 of 2013 limits rent increases. The Rental Disputes Center, set up by Decree No. 26 of 2013, decides disputes.",
          },
          {
            p: "The centre's jurisdiction covers rent disputes across Dubai, including the free zones, except where a free zone has its own tribunal.",
          },
        ],
      },
      {
        id: "costs",
        h: "What you pay to move in",
        blocks: [
          {
            table: {
              head: ["Cost", "Amount", "Set by"],
              rows: [
                ["Security deposit", "5% of the annual rent unfurnished, 10% furnished, refundable at the end", "Market custom"],
                ["Agency fee", "About 5% of the annual rent plus VAT, often with a minimum the agency sets", "Market custom"],
                ["Ejari registration", "AED 177.75 online through Dubai REST or the DLD website", "Dubai Land Department"],
                ["DEWA deposit", "AED 2,000 for an apartment, AED 4,000 for a villa, refundable", "DEWA"],
                ["Housing fee", "5% of the annual rent, collected monthly on the DEWA bill", "Dubai Municipality"],
              ],
            },
          },
          {
            p: "The deposit and the agency fee are custom, not law. Bayut's guide to the costs of renting gives the deposit as 5% unfurnished and 10% furnished, and the agency fee as 5% or more of the annual rent. Property Finder's guide puts the residential agency fee at about 5%, often with a minimum of around AED 5,000, paid by the tenant with VAT added. Both can be negotiated, and the agency fee must be declared in the contract.",
          },
          {
            p: "The landlord may deduct from the deposit for damage beyond ordinary wear, which in practice means repainting and minor repairs. Photograph the home on the day you move in and send the pictures to the agent.",
          },
        ],
      },
      {
        id: "cheques",
        h: "Rent cheques",
        blocks: [
          {
            p: "Rent in Dubai is usually paid by cheque, in a number of instalments agreed in the contract. One cheque for the year is the landlord's preference and often earns a lower rent; two or four cheques are common. The cheques are post-dated to the instalment dates and handed over when the contract is signed. Keep the account funded on each date.",
          },
          { p: "Keep a copy of every cheque and a receipt for every payment, naming the property and the period." },
        ],
      },
      {
        id: "ejari",
        h: "Register the contract on Ejari",
        blocks: [
          {
            p: "Article 4 of Law No. 26 of 2007 requires every lease to be registered with RERA. The system is Ejari, and either side can register, though the tenant usually pays. Registration online through the Dubai REST app or the DLD website costs AED 177.75: AED 100 registration, AED 10 knowledge fee, AED 10 innovation fee, AED 55 service fee and VAT. A registration trustee centre charges a AED 95 service fee instead of AED 55.",
          },
          {
            p: "You need the signed contract, your passport, visa and Emirates ID, and the landlord's title deed and identification. The Ejari certificate is what DEWA asks for to connect water and electricity, what your employer or school may ask for as proof of address, and what the Rental Disputes Center requires before it hears a case. Renew it with each renewal of the contract.",
          },
        ],
      },
      {
        id: "dewa",
        h: "Connecting DEWA",
        blocks: [
          {
            p: "Dubai Electricity and Water Authority connects the home in your name once Ejari is registered. Bayut lists the refundable deposit as AED 2,000 for an apartment and AED 4,000 for a villa, with a connection charge of AED 100 for small meters and AED 300 for large ones plus small knowledge and innovation fees. The 5% housing fee is a Dubai Municipality charge on tenants, spread across the year on the DEWA bill. In buildings with district cooling, the chiller account is separate, and the contract should say who pays it.",
          },
          {
            ul: [
              "Apply once Ejari is registered, with the certificate, your Emirates ID and the deposit",
              "Close the account when you move out; the deposit is refunded after the final bill",
            ],
          },
        ],
      },
      {
        id: "increase",
        h: "How much the rent can rise",
        blocks: [
          {
            p: "Not during the contract. At renewal, Decree No. 43 of 2013 allows an increase only when the current rent sits more than 10% below the average for similar homes in RERA's index, and caps it in bands:",
          },
          {
            table: {
              head: ["Your rent against the index average", "Largest increase allowed"],
              rows: [
                ["Up to 10% below", "None"],
                ["11% to 20% below", "5%"],
                ["21% to 30% below", "10%"],
                ["31% to 40% below", "15%"],
                ["More than 40% below", "20%"],
              ],
            },
          },
          {
            p: "Since January 2025 the average comes from the Dubai Land Department's Smart Rental Index, which rates each building on its specification, finishes, location and facilities. You can check the index in the Dubai REST app. A landlord who wants an increase must tell you at least 90 days before the contract ends, under Article 14 of Law No. 26 of 2007, unless the contract sets a different period. An increase outside the bands, or one notified late, can be challenged at the Rental Disputes Center.",
          },
        ],
      },
      {
        id: "notice",
        h: "When a landlord can ask you to leave",
        blocks: [
          {
            p: "During the contract, only on the grounds in Article 25(1) of Law No. 26 of 2007, which include not paying rent within 30 days of a written notice, subletting without the landlord's written consent, using the home for an illegal purpose or causing it damage. A sale of the building is not a ground: the new owner takes over the contract.",
          },
          {
            p: "At the end of the contract, only on the grounds in Article 25(2), as amended by Law No. 33 of 2008: the owner wants to sell, the owner or a first-degree relative needs the home and has no other suitable property, the building is to be demolished and rebuilt, or it needs major maintenance that cannot be done with you in it. In every case the landlord must give at least 12 months' notice before the eviction date, through a notary public or by registered mail. A message or an email does not count.",
          },
          {
            p: "If you want to leave or change the terms yourself, you give the same 90 days' notice before expiry. Leaving early is governed by the contract, which usually sets a penalty, so read that clause before you sign.",
          },
        ],
      },
      {
        id: "rdc",
        h: "The Rental Disputes Center",
        blocks: [
          {
            p: "The Rental Disputes Center is a judicial body within the Dubai Land Department, established by Decree No. 26 of 2013. It has exclusive jurisdiction over rent disputes between landlords and tenants in Dubai, including the free zones that have no tribunal of their own. Since 2019 it also hears disputes over jointly owned property under Law No. 6 of 2019.",
          },
          {
            ul: [
              "A case starts in the conciliation department, which tries to settle it within 15 days of the parties' first appearance; a settlement it approves can be enforced like a judgment",
              "If conciliation fails, a first instance committee decides, and an appeal committee hears appeals where the decree allows one",
              "The judgment execution department enforces decisions, including eviction orders and money claims",
              "Cases can be filed and followed through the Dubai REST app; a registration fee applies, and half of it is refunded if the case settles in conciliation",
            ],
          },
          {
            p: "Typical tenant cases are an increase outside the bands, a deposit not returned, an eviction notice served without 12 months or without a notary, and repairs the landlord will not do. Bring the Ejari certificate, the contract, the cheques and every message.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What law covers tenants in Dubai?",
        a: "Dubai Law No. 26 of 2007, as amended by Law No. 33 of 2008, with rent increases limited by Decree No. 43 of 2013. Disputes are decided by the Rental Disputes Center, set up by Decree No. 26 of 2013.",
      },
      {
        q: "How much is the security deposit for renting in Dubai?",
        a: "By market custom 5% of the annual rent for an unfurnished home and 10% for a furnished one. It is refundable at the end, less any deduction for damage beyond ordinary wear. The figure is custom, not a legal cap.",
      },
      {
        q: "How much is the agency fee for a tenant in Dubai?",
        a: "By market custom about 5% of the annual rent plus VAT, often with a minimum the agency sets. It is negotiable and must be declared in the contract.",
      },
      {
        q: "Is Ejari compulsory for tenants?",
        a: "Yes. Article 4 of Law No. 26 of 2007 requires every lease to be registered with RERA through Ejari. Online registration costs AED 177.75, and DEWA, employers and the Rental Disputes Center all ask for the certificate.",
      },
      {
        q: "How much can my landlord raise the rent?",
        a: "Nothing if your rent is within 10% of the Smart Rental Index average for similar homes. Otherwise 5%, 10%, 15% or at most 20% depending on how far below the average it sits, under Decree No. 43 of 2013, and only with 90 days' notice before the contract ends.",
      },
      {
        q: "Can my landlord evict me to sell the property?",
        a: "Only at the end of the contract and only with at least 12 months' notice served through a notary public or by registered mail, under Article 25(2) of Law No. 26 of 2007 as amended. Until then the contract stands, and a buyer takes it over.",
      },
      {
        q: "What does the Rental Disputes Center do?",
        a: "It decides disputes between landlords and tenants in Dubai. A case goes first to conciliation, then to a first instance committee, with an appeal committee and an enforcement department. Cases can be filed through the Dubai REST app.",
      },
      {
        q: "Who pays the DEWA deposit and housing fee?",
        a: "The tenant. Bayut lists the refundable DEWA deposit as AED 2,000 for an apartment and AED 4,000 for a villa, and the Dubai Municipality housing fee as 5% of the annual rent, collected monthly on the DEWA bill.",
      },
    ],
    sources: [S.law26, S.law33, S.ejari, S.decree43, S.smartRent, S.bayutRentCosts, S.pfCommission, S.rdc, S.decree26, S.dubaiRest, S.law6],
  },
  {
    slug: "investing-in-dubai-property",
    topic: "Costs and mortgages",
    seoTitle: "Investing in Dubai property: how to judge a buy-to-let",
    seoDescription:
      "How to evaluate a Dubai investment property: gross and net yield, the costs that reduce rent, tax, holiday lets, DLD price data, risks and the Golden Visa link.",
    title: "Investing in Dubai property: how to judge a deal",
    dek: "A method, not a forecast: work out the yield that is left after costs, read the price data, weigh off-plan against ready, and understand the tax and visa rules that apply.",
    image: "area-business-bay",
    updated: "2026-10-17",
    summary: [
      "Gross yield is the annual rent divided by the price. Net yield takes off service charges, management, vacancy and the buying costs before it divides, and it is the number that matters.",
      "The UAE levies no income tax on individuals, and rent from property held in your own name is outside corporate tax when no licence is required.",
      "A ready home earns from the day of transfer and can be borrowed against at up to 60% for a second home. An off-plan home earns nothing until handover and can be borrowed against at 50%.",
      "Property worth AED 2 million or more can support a Golden Visa application.",
    ],
    sections: [
      {
        id: "yield",
        h: "Gross yield and net yield",
        blocks: [
          {
            p: "Gross yield is the simplest measure and the one adverts use. Divide the annual rent by the purchase price and multiply by 100. It ignores every cost.",
          },
          {
            p: "Net yield is the measure to decide on. Start with the annual rent. Take off the service charge, the management fee if an agent runs the tenancy, an allowance for the weeks the home may sit empty between tenants, insurance and maintenance. Divide what is left by the full cost of buying: the price plus the DLD fee, the trustee fee, the agency fee and the NOC. Multiply by 100.",
          },
          {
            table: {
              head: ["Measure", "Formula"],
              rows: [
                ["Gross yield", "Annual rent ÷ purchase price × 100"],
                ["Net yield", "(Annual rent − service charge − management − vacancy allowance − insurance and maintenance) ÷ (price + buying costs) × 100"],
                ["Cash-on-cash return, with a mortgage", "(Net rent − annual mortgage payments) ÷ (cash you put in) × 100"],
              ],
            },
          },
          {
            p: "Rent and price change by building and by month, so we publish no yield figures. Use the formula with the actual asking rent for the unit, the RERA-approved service charge for the building, and the fees from the [buying costs calculator](/buying-costs/).",
          },
        ],
      },
      {
        id: "costs",
        h: "The costs that reduce the yield",
        blocks: [
          {
            ul: [
              "**Buying costs.** On a ready home about 7% of the price: the 4% DLD transfer fee, AED 520 in title deed fees, the trustee fee of AED 4,000 plus VAT at AED 500,000 and above, the customary 2% agency fee plus VAT, and a developer NOC of AED 500 to 5,000. On an off-plan home, 4% Oqood registration plus AED 20.",
              "**Service charges.** An annual owner's cost approved by RERA under Law No. 6 of 2019. Look the building up on DLD's Service Charge Index before you offer; [service charges in Dubai](/guides/service-charges-in-dubai/) explains how.",
              "**Management.** If an agent finds tenants and runs the tenancy, their fee is set by agreement. Ask for it as a percentage of rent and as a fixed sum, and check what it covers.",
              "**Vacancy.** Every change of tenant costs weeks of rent plus repainting. Build an allowance in rather than assuming twelve months of rent every year.",
              "**Ejari and letting fees.** Ejari registration is AED 177.75 online. The tenant's agency fee is by custom paid by the tenant, not the landlord.",
              "**Mortgage costs.** Mortgage registration at 0.25% of the loan plus AED 270, a bank valuation of typically AED 2,500 to 3,500 plus VAT, and an arrangement fee of up to 1% of the loan plus VAT.",
            ],
          },
          { p: "A lower service charge or a shorter void can outweigh a higher gross yield." },
        ],
      },
      {
        id: "tax",
        h: "Tax on a Dubai investment",
        blocks: [
          {
            p: "The UAE does not levy income tax on individuals, so rent received by a person is not taxed as income. Under Cabinet Decision No. 49 of 2023, as explained by the Federal Tax Authority, a natural person's income from real estate investment is outside corporate tax, whatever the amount, as long as the activity is not carried out, and is not required to be carried out, under a licence. The FTA's guidance covers income from selling as well as letting such property.",
          },
          {
            p: "VAT does apply to property, but residential leases are generally exempt and the first supply of a new residential home within three years of completion is zero-rated. Commercial property carries 5%. Your own country may tax the rent and any gain, so take advice there before you buy.",
          },
        ],
      },
      {
        id: "holiday",
        h: "Short lets and holiday homes",
        blocks: [
          {
            p: "A home can be let by the night, but only with a holiday home permit from the Department of Economy and Tourism, and individual owners can apply. Gulf News lists the usual documents as the title deed or sale agreement, the developer's NOC where the building requires one, identification, a recent DEWA bill and insurance. Short lets bring higher gross income and higher costs: furnishing, cleaning, utilities and platform fees. Run the net yield formula on both models before you choose, and check that the building allows short lets.",
          },
          { p: "Separately, Law No. 4 of 2026 requires a permit before a unit is used as shared housing, so letting rooms to several tenants is not a way round the rules." },
        ],
      },
      {
        id: "data",
        h: "Reading the price data",
        blocks: [
          {
            p: "The Dubai Land Department publishes every registered transaction as an open dataset on Data.Dubai. Our [Dubai property prices](/dubai-property-prices/) pages are built from it. They show, for Dubai and for each of our areas, the number of sales, the median price and the median price per square foot by quarter, the change over the last twelve months and the share of sales that were off-plan. The analysis is ours, not DLD's.",
          },
          {
            ol: [
              { t: "Compare the asking price with the median price per square foot.", d: "A price well above the median needs a reason: floor, view, condition or size." },
              { t: "Look at the trend, not one quarter.", d: "Twelve months tells you more than three, because launches and seasons move the quarterly figures." },
              { t: "Read the off-plan share.", d: "A high share means the area's future supply is still under construction, which matters for rent when it all hands over." },
              { t: "Check the rent side separately.", d: "The Smart Rental Index in the Dubai REST app shows what similar homes rent for, and it is the index the law uses to cap increases." },
            ],
          },
        ],
      },
      {
        id: "offplan",
        h: "Off-plan or ready for an investor",
        blocks: [
          {
            p: "A ready home earns rent from the day of transfer and a bank may lend up to 60% to an expatriate on a second or investment home, or 65% to a UAE national. An off-plan home earns nothing until handover and the loan cap is 50%. In exchange the payments are spread over the build and the money sits in the project's escrow account under Law No. 8 of 2007.",
          },
          {
            p: "If you buy off-plan to let, treat the first service charge, the handover date and the rent at handover as unknowns. [Off-plan or ready](/guides/off-plan-vs-ready-property-in-dubai/) compares the two in full.",
          },
        ],
      },
      {
        id: "risks",
        h: "The risks to price in",
        blocks: [
          {
            ul: [
              "Rent on a sitting tenant can rise only within the bands of Decree No. 43 of 2013, so a home let below the index catches up slowly",
              "Service charges are approved yearly and can rise with a new budget",
              "Vacancy runs longer in areas with a lot of new supply handing over at once",
              "An off-plan handover can slip, and the sale agreement sets what you get if it does",
              "Prices move in both directions; the DLD data shows the last twelve months, not the next",
            ],
          },
          { p: "These are the inputs the net yield formula needs, and the ones an advert leaves out." },
        ],
      },
      {
        id: "visa",
        h: "The Golden Visa link",
        blocks: [
          {
            p: "Property worth AED 2 million or more lets the owner apply for a Golden Visa, which the Dubai Land Department and GDRFA Dubai describe as ten years and renewable.",
          },
          {
            ul: [
              "The AED 2 million can be in one home or several",
              "A mortgaged home qualifies with a no-objection letter from the bank",
              "A jointly owned home counts only when your own share is worth AED 2 million or more",
              "The federal government portal shows a different term from DLD and GDRFA, and the official pages do not address off-plan property",
            ],
          },
          { p: "[The Golden Visa through property](/guides/golden-visa-through-property/) sets out the conditions and what the official pages leave open." },
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate rental yield on a Dubai property?",
        a: "Gross yield is the annual rent divided by the price, times 100. Net yield takes off service charges, management, a vacancy allowance, insurance and maintenance, then divides by the price plus buying costs. Net yield is the figure to decide on.",
      },
      {
        q: "What costs reduce the return on a Dubai investment property?",
        a: "Buying costs of about 7% on a ready home, the annual service charge, any management fee, vacancy between tenants, maintenance, and on a mortgaged purchase the registration, valuation and arrangement fees.",
      },
      {
        q: "Is rental income taxed in Dubai?",
        a: "Not for individuals. The UAE has no personal income tax, and under Cabinet Decision No. 49 of 2023 a person's income from property held in their own name is outside corporate tax when no licence is required. Residential leases are generally exempt from VAT.",
      },
      {
        q: "Is there capital gains tax on property in Dubai?",
        a: "The UAE levies no income tax on individuals. The Federal Tax Authority's guidance on real estate investment by natural persons covers income from selling as well as letting property held in their own name, and treats it as outside corporate tax when no licence is required.",
      },
      {
        q: "Can I let my investment property as a holiday home?",
        a: "Yes, with a holiday home permit from the Department of Economy and Tourism, which individual owners can apply for. Check the building's rules as well, and compare the net yield of short and long lets before choosing.",
      },
      {
        q: "Where can I see Dubai property prices by area?",
        a: "On our Dubai property prices pages, built from the Dubai Land Department's open transactions dataset on Data.Dubai. They show sales counts, median prices and price per square foot by quarter for Dubai and for each area we cover.",
      },
      {
        q: "Is off-plan or ready better for investment in Dubai?",
        a: "A ready home earns rent at once and can be borrowed against at up to 60% as a second home. An off-plan home earns nothing until handover and is capped at 50% lending, but spreads the payments and holds them in escrow. The choice depends on when you need the income.",
      },
      {
        q: "Does a Dubai investment property qualify me for a Golden Visa?",
        a: "Property worth AED 2 million or more does, in one home or several, including a mortgaged home with a letter from the bank. The Dubai Land Department and GDRFA Dubai describe the visa as ten years and renewable.",
      },
    ],
    sources: [S.dldSale, S.dldInitial, S.dldMortgage, S.pfFees, S.bayutCosts, S.law6, S.sci, S.ejari, S.cbuae, S.kt, S.escrow, S.ftaRei, S.uaeTax, S.mofVat, S.holidayHomes, S.openData, S.decree43, S.smartRent, S.dldVisa, S.gdrfa, S.uae, S.sharedHousing],
  },
  {
    slug: "choosing-a-real-estate-broker-in-dubai",
    topic: "Buying",
    seoTitle: "Choosing a real estate broker in Dubai: how to check one",
    seoDescription:
      "How to verify a Dubai broker: the RERA card and BRN, the brokerage ORN, the Dubai REST app, permits and QR codes on adverts, the forms and the cold-calling ban.",
    title: "How to choose a real estate broker in Dubai",
    dek: "The checks that take five minutes, the forms a licensed broker must use, what commission is by custom, the 2026 ban on cold contact, and the questions worth asking before you sign.",
    image: "viewing",
    updated: "2026-10-17",
    summary: [
      "Every broker in Dubai must hold a RERA broker card with a broker registration number (BRN), and work for a brokerage with an office registration number (ORN). Both can be checked in the Dubai REST app.",
      "A genuine advert carries a Trakheesi permit number, the broker's and office's registration numbers and, on printed and video adverts, a Madmoun QR code.",
      "Licensed brokers work on RERA's standard contracts: Form A with the seller, Form B with the buyer, Form F between buyer and seller.",
      "Since February 2026 a DLD circular bars brokerages from contacting owners or investors to offer, market or buy property; brokers may contact only owners who have registered on RERA's green list. RERA's stated penalty for cold calling is a AED 50,000 fine and a card suspension of at least three months.",
    ],
    sections: [
      {
        id: "card",
        h: "Check the broker card and BRN",
        blocks: [
          {
            p: "Bylaw No. 85 of 2006 regulates the register of real estate brokers in Dubai. A person may not act as a broker without being on it. The Dubai Land Department's brokerage practice guide sets out the route: the brokerage obtains a licence, registers it on DLD's Trakheesi system, and applies there for each broker's card, which is issued electronically once the fees are paid.",
          },
          {
            p: "Ask the broker for the card. It names the broker and the brokerage and carries the broker registration number (BRN). Then check it yourself. The Dubai REST app, which RERA requires every broker to use, holds the register of brokers and their performance levels. Search by name or BRN and confirm the card is active, the photograph matches and the brokerage named is the one you are dealing with.",
          },
        ],
      },
      {
        id: "orn",
        h: "Check the brokerage and ORN",
        blocks: [
          {
            p: "The brokerage holds its own registration, the office registration number (ORN), issued through Trakheesi with its registration certificate. Both the BRN and the ORN must appear on the firm's adverts. A valid broker card is worth nothing if the office behind it is suspended, so check the firm as well as the person, in the same app. RERA also classifies brokerages and brokers, and the guide says every broker should aim for a five-star rating or the golden category; the rating shows in the app.",
          },
          {
            ul: [
              "Search the brokerage by name or ORN and confirm it is active",
              "Confirm the broker's card names this brokerage",
              "Check the expiry dates on both",
            ],
          },
        ],
      },
      {
        id: "adverts",
        h: "Check the advert",
        blocks: [
          {
            ul: [
              "**Trakheesi permit number.** The brokerage must obtain a permit for every advert through Trakheesi and show the number on it. The permit is tied to a Form A signed by the owner, so a permit means the owner has agreed to the sale.",
              "**Madmoun QR code.** Printed and video adverts must carry a QR code, mandatory since 24 April 2023, which opens the permit details so you can confirm the advert is genuine.",
              "**ORN and BRN.** Both registration numbers must appear on the advert.",
              "**Off-plan adverts.** These must also show the developer, the project's escrow account number and the expected completion date, and the broker must hold a marketing agreement with the developer. You can check that a project is registered in the Dubai REST app's Mashrooi section.",
            ],
          },
          {
            p: "An advert without a permit number is either unlicensed or an invitation to contact someone who is not the listing broker. Either way, walk on.",
          },
        ],
      },
      {
        id: "forms",
        h: "The forms a licensed broker uses",
        blocks: [
          {
            p: "RERA requires brokers to use its smart contracts. The brokerage practice guide names three:",
          },
          {
            table: {
              head: ["Form", "Between", "What it does"],
              rows: [
                ["Form A", "Seller and brokerage", "Appoints the brokerage to market the home; submitted through Trakheesi to obtain the advertising permit"],
                ["Form B", "Buyer and broker", "Records what you want to buy, your budget, the commission and how the agreement ends"],
                ["Form F", "Seller and buyer", "The sale contract, witnessed and dated by the broker, recording price, deposit, fees and each side's commission"],
              ],
            },
          },
          {
            p: "A broker who asks you to sign something else, or nothing at all, is working outside the system. Bayut's guide adds that a buyer who wants to end a Form B for cause does so in writing, with the reason and the date. A dispute over Form F can be taken to RERA's amicable settlement service through Trakheesi before it goes to court.",
          },
        ],
      },
      {
        id: "commission",
        h: "What commission is by custom",
        blocks: [
          {
            p: "No law fixes the rate. Property Finder's guide gives the customary figures: on a residential resale about 2% of the price plus VAT, usually paid by the buyer, with lower rates sometimes negotiated on high-value homes; on a rental about 5% of the annual rent plus VAT, paid by the tenant, often with a minimum the agency sets. On an off-plan sale from a developer the developer usually pays the broker, so the buyer pays no brokerage fee.",
          },
          {
            p: "Only a licensed brokerage may charge commission, and the amount must be written into Form B and Form F. If a broker quotes a rate, ask whether it includes VAT, and have the figure in the form before you pay anything. The [buying costs calculator](/buying-costs/) shows the customary 2% alongside the other fees.",
          },
        ],
      },
      {
        id: "cold",
        h: "The ban on cold contact",
        blocks: [
          {
            p: "The brokerage practice guide describes RERA's green list: owners who register on it agree to be contacted by brokers, and brokers may not contact owners who have not. On 27 February 2026 DLD issued a circular, listed on its rules and regulations page as the regulations governing communication with property owners and the prohibition of cold calling. It bars brokerages from obtaining owner or investor data by unlawful means and from contacting owners or investors by phone or any other channel to offer, market or buy property.",
          },
          {
            p: "RERA's stated penalty for cold calling, set out when it fined a brokerage in April 2022, is AED 50,000 and/or suspension of the broker's card for no less than three months. That case suspended nine brokers. If a broker calls you about a home you never listed, you can report it through the Report Malicious Calls service in the Dubai REST app. A broker who found you that way has already shown how they work.",
          },
        ],
      },
      {
        id: "good",
        h: "What a good broker does",
        blocks: [
          {
            ul: [
              "Shows you the card before you ask, and names the brokerage on it",
              "Puts the listing agreement, the buyer agreement and the sale contract on the RERA forms, with the commission written in",
              "Tells you the fees in full before you offer, including the ones that are custom rather than law",
              "Says what they do not know, and checks rather than guesses: the service charge, the NOC fee, the mortgage cap",
              "Checks a project's registration and escrow account before marketing it off-plan",
              "Keeps the deposit cheque safe and hands it over only on the terms in Form F",
            ],
          },
          { p: "None of this is extra service. It is what the licence requires, and a broker who treats it as optional is telling you how the rest of the deal will go." },
        ],
      },
      {
        id: "questions",
        h: "Questions to ask before you sign",
        blocks: [
          {
            ol: [
              { t: "What is your BRN and the brokerage's ORN?", d: "Then check both in the Dubai REST app while they wait." },
              { t: "Is this listing under a Form A, and does the advert have a permit?", d: "If not, the owner may not have agreed to sell through this broker." },
              { t: "What is your commission, with VAT, and who pays it?", d: "Have it written into Form B or Form F." },
              { t: "What is the service charge on this building, and who pays the NOC?", d: "The Service Charge Index gives the first; Form F settles the second." },
              { t: "For off-plan: is the project registered, and what is the escrow account number?", d: "Both are on the Dubai REST app and the advert." },
              { t: "How did you get my number?", d: "The answer should be that you gave it to them." },
            ],
          },
          { p: "A licensed broker can answer all six on the spot." },
        ],
      },
    ],
    faqs: [
      {
        q: "How do I check if a real estate broker in Dubai is licensed?",
        a: "Ask for their RERA broker card and search the broker registration number (BRN) in the Dubai REST app. Confirm the card is active, the photograph matches and the brokerage named is the firm you are dealing with. Check the brokerage's office registration number (ORN) the same way.",
      },
      {
        q: "What is a BRN and an ORN?",
        a: "The BRN is the broker registration number on an individual broker's RERA card. The ORN is the office registration number of the brokerage. Both are issued through DLD's Trakheesi system and both must appear on adverts.",
      },
      {
        q: "What should a property advert in Dubai show?",
        a: "A Trakheesi permit number, the brokerage's ORN and the broker's BRN, and on printed and video adverts a Madmoun QR code, mandatory since 24 April 2023. Off-plan adverts must also show the developer, the escrow account number and the expected completion date.",
      },
      {
        q: "What are Forms A, B and F?",
        a: "RERA's standard contracts. Form A appoints a brokerage to market a seller's home and leads to the advertising permit. Form B is the agreement between a buyer and their broker. Form F is the sale contract between seller and buyer, witnessed by the broker.",
      },
      {
        q: "How much commission does a broker charge in Dubai?",
        a: "By custom about 2% of the price plus VAT on a residential resale, usually paid by the buyer, and about 5% of the annual rent plus VAT on a rental, paid by the tenant. No law fixes the rate, and it must be written into the RERA forms.",
      },
      {
        q: "Are brokers allowed to cold call property owners in Dubai?",
        a: "No. A DLD circular of 27 February 2026 bars brokerages from contacting owners or investors by phone or other channels to offer, market or buy property, and from obtaining their data unlawfully. Brokers may contact only owners who have registered on RERA's green list.",
      },
      {
        q: "What is the penalty for cold calling by a broker?",
        a: "RERA's stated penalty is a fine of AED 50,000 and/or suspension of the broker's card for at least three months. In April 2022 it fined a brokerage AED 50,000 and suspended nine of its brokers for three months. Unsolicited calls can be reported through the Dubai REST app.",
      },
      {
        q: "Do I need a broker to buy property in Dubai?",
        a: "No law requires one, but a licensed broker handles the RERA forms, the Trakheesi permit, the NOC and the trustee appointment, and only a licensed brokerage may charge commission. If you use one, check the card and the office first.",
      },
    ],
    sources: [S.brokerGuide, S.dubaiRest, S.trakheesi, S.pfTrakheesi, S.dldMadmoun, S.bayutForms, S.formF, S.pfCommission, S.dldRules, S.dldColdCall, S.escrow],
  },
];
