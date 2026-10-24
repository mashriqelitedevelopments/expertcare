/** The brokerage itself. Empty strings are details that do not exist yet: the UI hides them
 * rather than showing an invented value. Fill every one before `live` goes true. */
export const site = {
  name: "ExpertCare",
  // As registered with DET (licence 516808) and RERA (ORN 33504); documents of 12 Feb 2026, valid to 19 Feb 2027.
  legalName: "Expert Care Real Estate L.L.C",
  // The domain, chosen 24 Oct 2026. Canonicals, the sitemap and structured data are built from it.
  url: "https://expertcarerealestate.com",
  // While false the whole site is noindex and robots.txt disallows crawling.
  live: false,
  description:
    "ExpertCare is a real estate brokerage in Dubai focused on prime resale homes and off-plan projects, with selling, investor services, mortgages and property management from the same team. The full cost of every move is explained before you commit.",
  email: "info@expertcarerealestate.com",
  phone: "+971 56 401 4835",
  whatsapp: "971564014835", // digits only, with country code
  // RERA requires the brokerage's office registration number (ORN) on its website and adverts.
  orn: "33504",
  licence: "516808",
  address: "Office 2901, Business Bay, Dubai, United Arab Emirates",
  postal: { street: "Office 2901, Business Bay", poBox: "82449" },
  // Office hours as the brokerage publishes them, e.g. "Monday to Saturday, 9am to 7pm". Hidden while empty.
  hours: "",
  social: { instagram: "", linkedin: "", facebook: "", youtube: "", tiktok: "" },
};

/** What the brokerage commits to. Each must stay true of the live site and the service. */
export const PROMISES = [
  {
    title: "The whole number, first.",
    text: "Before a viewing, your adviser gives you the price plus the Dubai Land Department, trustee, agency and bank fees. Nothing arrives later as a surprise.",
  },
  {
    title: "Only permitted adverts.",
    text: "Every advert we run carries its Dubai Land Department permit number. If a home cannot be advertised legally, we do not advertise it.",
  },
  {
    title: "One adviser, start to keys.",
    text: "The adviser who shows you a home stays with you through the offer, the mortgage, the transfer and the handover.",
  },
  {
    title: "Figures you can check.",
    text: "Every guide names its source: the Dubai Land Department, the Central Bank of the UAE, GDRFA Dubai and the Dubai Legislation Portal.",
  },
  {
    title: "Care after the deal.",
    text: "Owners who let through us get rent collection, maintenance and renewals handled by the same team that found the tenant.",
  },
];

export type NavLink = { label: string; href: string };

export const NAV: NavLink[] = [
  { label: "Buy", href: "/properties/" },
  { label: "Off-plan", href: "/off-plan/" },
  { label: "Sell", href: "/sell/" },
  { label: "Investors", href: "/services/investor-services/" },
  { label: "Areas", href: "/areas/" },
  { label: "Guides", href: "/guides/" },
];
