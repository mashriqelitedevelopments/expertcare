/** The brokerage itself. Empty strings are details that do not exist yet: the UI hides them
 * rather than showing an invented value. Fill every one before `live` goes true. */
export const site = {
  name: "ExpertCare",
  legalName: "ExpertCare Real Estate",
  // Placeholder domain: confirm the registered domain before launch.
  url: "https://expertcare.ae",
  // While false the whole site is noindex and robots.txt disallows crawling.
  live: false,
  description:
    "ExpertCare is a full-service real estate brokerage in Dubai: buying, selling, renting, off-plan advice and property management, with the full cost of every move explained before you commit.",
  email: "",
  phone: "",
  whatsapp: "", // digits only, with country code, e.g. 9715XXXXXXXX
  // RERA requires the brokerage's office registration number (ORN) on its website and adverts.
  orn: "",
  licence: "",
  address: "Dubai, United Arab Emirates",
  social: { instagram: "", linkedin: "", facebook: "", youtube: "", tiktok: "" },
};

/** What the brokerage commits to. Each must stay true of the live site and the service. */
export const PROMISES = [
  {
    title: "The whole number, first.",
    text: "Before a viewing, you know the price plus the Dubai Land Department, trustee, agency and bank fees. Nothing arrives later as a surprise.",
  },
  {
    title: "Only permitted adverts.",
    text: "Every listing carries its Dubai Land Department permit number. If a home cannot be advertised legally, it is not on this site.",
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
  { label: "Rent", href: "/rent/" },
  { label: "Landlords", href: "/landlords/" },
  { label: "Areas", href: "/areas/" },
  { label: "Guides", href: "/guides/" },
];
