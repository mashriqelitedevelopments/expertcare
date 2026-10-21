import type { ImgKey } from "./images";

/**
 * Area guides. Every area is freehold for foreign buyers: the first seven from the Bayut freehold
 * list (Aug 2026); the five added on 17 Oct 2026 carry their own source in the comment above each
 * entry. Transport for the first seven checked 15 Sep 2026 against the Gulf News station-renaming
 * guide, RTA and Property Finder area guides; master developers from emaar.com, nakheel.com and
 * dubaiholding.com. Blue Line opening date (9 Sep 2029): Dubai Media Office, Nov 2025. Of the areas
 * below, the Blue Line serves only Dubai Creek Harbour.
 *
 * Prose rewritten 17 Oct 2026. No figures beyond the checked facts; no prices anywhere.
 */
export type Area = {
  slug: string;
  name: string;
  image: ImgKey;
  card: string;
  intro: string;
  overview: string[];
  homes: string[];
  suits: string[];
  transport: string[];
  developer: string;
  seoTitle: string;
  seoDescription: string;
  /** Named places in the area. */
  landmarks?: string[];
  /** Schools and nurseries, only where a checked source names them. */
  schools?: string[];
  /** One sentence on who rents there. No figures. */
  rentNote?: string;
  /** One sentence for an owner thinking of selling. No figures. */
  sellNote?: string;
  /** Slugs of neighbouring areas in this list. */
  nearby?: string[];
};

export const AREAS: Area[] = [
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    image: "area-dubai-marina",
    card: "Towers around the water, with the beach a short walk away.",
    intro: "Apartment towers on both sides of a man-made marina, with JBR beach, the tram and two Metro stations within reach.",
    overview: [
      "Dubai Marina runs along a canal cut in from the sea and lined on both banks with residential towers. Marina Walk follows the water the whole way round, and Jumeirah Beach Residence sits between the towers and the sand.",
      "If you are buying, almost everything on offer is an apartment. Studios and one-bedrooms fill the older towers near the Metro; larger homes and penthouses sit in the taller buildings with sea views. Ready homes dominate, so you can view what you buy.",
      "If you are renting, the Marina is one of the easiest places in Dubai to live without a car. The tram loops through the district, the Red Line runs along its edge and most errands are on foot.",
      "If you own here, your buyer pool is wide: end users who want the beach close, and investors who want a home that lets quickly. A clear view of the water or the sea is what sets one apartment apart from the next.",
    ],
    homes: ["Studios and one- to four-bedroom apartments", "Penthouses in the taller towers", "Marina, sea and skyline views"],
    suits: ["Buyers who want the beach and the water close", "Professionals who commute by Metro or tram", "Investors buying apartments to let"],
    transport: [
      "Dubai Metro Red Line: Sobha Realty and DMCC stations",
      "Dubai Tram: six stops, including Dubai Marina, Marina Towers, Dubai Marina Mall, JBR 1 and JBR 2",
    ],
    developer: "Emaar",
    landmarks: ["Marina Walk", "Dubai Marina Mall", "The Beach at JBR", "Ain Dubai on Bluewaters"],
    rentNote: "Tenants here are mostly single professionals and couples who want the beach, the tram and the Metro without owning a car.",
    sellNote: "A marina or sea view and a tower with a well-run owners' association are what buyers ask about first, so have the service charge history ready.",
    nearby: ["jumeirah-lake-towers", "palm-jumeirah"],
    seoTitle: "Dubai Marina property for sale: area guide",
    seoDescription:
      "Apartments for sale in Dubai Marina, with a guide for buyers, tenants and sellers: homes, views, Metro and tram stops, landmarks and freehold ownership.",
  },
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    image: "area-downtown-dubai",
    card: "Burj Khalifa, The Dubai Mall and homes that work on foot.",
    intro: "The district around Burj Khalifa and The Dubai Mall, where the Boulevard links the towers, the fountain and the opera house.",
    overview: [
      "Downtown Dubai is the block of the city around Burj Khalifa, The Dubai Mall and the Dubai Fountain. Mohammed Bin Rashid Boulevard loops through it, and Dubai Opera sits at one end.",
      "Buyers choose between compact one-bedrooms in the Boulevard buildings and large residences in the towers that face the fountain or Burj Khalifa itself. Everything is an apartment, and most buildings are complete and lived in.",
      "For tenants, Downtown is the place to be if you work in DIFC or Business Bay and want to walk to the mall, the Metro and the restaurants on the Boulevard. Parking and service charges are higher than in outlying areas, so check both before you sign.",
      "For owners, the address itself does much of the selling. A fountain view or a direct line of sight to the tower is what separates a quick sale from a slow one, so lead with the view in your listing.",
    ],
    homes: ["One- to four-bedroom apartments", "Penthouses and large residences", "Burj Khalifa, fountain and boulevard views"],
    suits: ["Buyers who want the city on foot", "Owners who value a landmark view", "Investors letting to professionals"],
    transport: ["Dubai Metro Red Line: Burj Khalifa/Dubai Mall station"],
    developer: "Emaar",
    landmarks: ["Burj Khalifa", "The Dubai Mall", "Dubai Fountain", "Dubai Opera", "Mohammed Bin Rashid Boulevard", "Burj Park"],
    rentNote: "Renters are professionals from DIFC and Business Bay, and short-stay guests in the buildings that allow holiday lets.",
    sellNote: "Buyers compare your apartment with the others in the same tower, so a renovated kitchen or a rare view is what justifies a higher ask.",
    nearby: ["business-bay", "mohammed-bin-rashid-city"],
    seoTitle: "Downtown Dubai property for sale: area guide",
    seoDescription:
      "Apartments for sale in Downtown Dubai around Burj Khalifa and The Dubai Mall, with a guide for buyers, tenants and sellers: homes, views, Metro and freehold.",
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    image: "area-palm-jumeirah",
    card: "Villas with their own beach and apartments over the sea.",
    intro: "The palm-shaped island: villas along the fronds, apartment buildings and hotels on the trunk, resorts on the crescent.",
    overview: [
      "Palm Jumeirah is a man-made island laid out as a palm. The trunk carries apartment buildings and hotels, the fronds carry villas, and the crescent that wraps the outside is given over to resorts, with Atlantis at its centre.",
      "If you are buying a villa, most of them on the fronds open straight onto their own beach. Apartment buyers on the trunk and the crescent get sea views or a view back across the water to the Marina towers. Penthouses and branded residences sit in the newer buildings.",
      "Tenants here pay for the beach and the privacy. Families take the frond villas; couples take trunk apartments near Nakheel Mall and the Monorail. A car is still useful, because the island has one road in.",
      "If you are selling, Palm Jumeirah is one of the few areas in Dubai where a beachfront villa is a category of its own. Buyers want to know the plot, the beach frontage and whether the home has been extended, so have the drawings ready.",
    ],
    homes: ["Beachfront villas on the fronds", "Apartments and penthouses on the trunk and crescent", "Sea, beach and skyline views"],
    suits: ["Families who want a villa on the beach", "Buyers looking for a landmark address", "Owners who want a home by the sea in the city"],
    transport: [
      "Palm Monorail along the trunk, with stations including Gateway, Al Ittihad Park and Atlantis Aquaventure",
      "Dubai Tram: the Palm Jumeirah stop, a walk from the Monorail's Gateway station",
    ],
    developer: "Nakheel",
    landmarks: ["Atlantis The Palm", "Nakheel Mall", "Palm West Beach", "Al Ittihad Park", "The View at The Palm"],
    rentNote: "Families rent the frond villas for the private beach, and couples rent trunk apartments to be near the mall, the restaurants and the Monorail.",
    sellNote: "Villa buyers here pay for beach frontage and plot size above everything else, so lead with both and keep any extension approvals to hand.",
    nearby: ["dubai-marina"],
    seoTitle: "Palm Jumeirah property for sale: area guide",
    seoDescription:
      "Villas and apartments for sale on Palm Jumeirah, with a guide for buyers, tenants and sellers: beachfront villas, apartments, the Monorail and freehold.",
  },
  {
    slug: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    image: "l-hills",
    card: "Villas, townhouses and apartments around a park and a golf course.",
    intro: "A planned community built around a golf course, a central park and Dubai Hills Mall.",
    overview: [
      "Dubai Hills Estate is a planned community with a golf course at its centre, a long central park and Dubai Hills Mall on its northern edge. It is part of the wider Mohammed Bin Rashid City plan but is marketed and run as its own address.",
      "Buyers get a real choice of home type. Villas and townhouses sit on quiet streets with gardens, many backing onto the course or the park. Apartment buildings cluster near the mall and along the park, which is where first-time buyers tend to look.",
      "For tenants, this is a family area. The schools, the park and the mall are inside the community, and King's College Hospital is on its edge. There is no Metro, so budget for a car or the bus to Equiti station.",
      "For owners, demand comes from families moving up from apartments and from buyers who want green space without leaving the city. A garden that faces the course or the park is the detail that moves a villa fastest.",
    ],
    homes: ["Villas and townhouses, many with gardens", "Apartments near the park and mall", "Golf course and park views"],
    suits: ["Families who want a villa and a garden", "Buyers who want green space in the city", "Owners who drive to work"],
    transport: ["No Metro station. RTA bus DH1 connects the community to Equiti station on the Red Line"],
    developer: "Emaar and Meraas",
    landmarks: ["Dubai Hills Mall", "Dubai Hills Golf Club", "Dubai Hills Park", "King's College Hospital London Dubai"],
    rentNote: "Families with school-age children rent the villas and townhouses, and young professionals rent the apartments by the park and the mall.",
    sellNote: "Villa buyers here compare plots, garden orientation and whether the home backs onto the course or the park, so state all three in your listing.",
    nearby: ["mohammed-bin-rashid-city", "arjan"],
    seoTitle: "Dubai Hills Estate property for sale: area guide",
    seoDescription:
      "Villas, townhouses and apartments for sale in Dubai Hills Estate, with a guide for buyers, tenants and sellers: homes, the park, transport and freehold.",
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    image: "area-business-bay",
    card: "Towers on the canal, one stop from Downtown.",
    intro: "A mixed district of offices, hotels and apartment towers along the Dubai Water Canal, next door to Downtown Dubai.",
    overview: [
      "Business Bay lies south of Downtown Dubai along the Dubai Water Canal. Offices, hotels and residential towers share the same streets, and a promenade runs along both banks of the canal.",
      "Buyers here get Downtown's location at a different price point. Homes are apartments, from studios to three-bedrooms, in towers that face the canal, the Burj Khalifa skyline or each other. Ready buildings and new off-plan towers sit side by side.",
      "Tenants are mostly people who work in the district or in DIFC and Downtown and want a short commute. Business Bay Metro station is on the Red Line, and the canal walk links the district to Downtown and Jumeirah on foot.",
      "If you are selling, the canal view is the premium. The towers vary a lot in build quality and management, so buyers will ask about the service charge and the owners' association before they ask about the finish.",
    ],
    homes: ["Studios and one- to three-bedroom apartments", "Canal and skyline views", "Ready homes and new off-plan towers"],
    suits: ["Professionals who work in the centre", "Buyers who want to be close to Downtown", "Investors buying apartments to let"],
    transport: ["Dubai Metro Red Line: Business Bay station"],
    developer: "Dubai Properties (Dubai Holding)",
    landmarks: ["Dubai Water Canal", "Marasi Promenade", "Bay Avenue", "Bay Square"],
    rentNote: "Tenants are office workers from Business Bay, DIFC and Downtown who want to walk or take one Metro stop to work.",
    sellNote: "The canal-facing towers sell on the view and the rest sell on price, so know which side of that line your apartment sits.",
    nearby: ["downtown-dubai", "mohammed-bin-rashid-city"],
    seoTitle: "Business Bay property for sale: area guide",
    seoDescription:
      "Apartments for sale in Business Bay on the Dubai Water Canal, with a guide for buyers, tenants and sellers: homes, views, Metro access, landmarks and freehold.",
  },
  {
    slug: "jumeirah-village-circle",
    name: "Jumeirah Village Circle",
    image: "l-jvc",
    card: "Apartments, townhouses and parks at a lower entry point.",
    intro: "A circular community of low- and mid-rise buildings, townhouses and villas, with parks at its centre and new buildings going up around them.",
    overview: [
      "Jumeirah Village Circle, or JVC, is laid out as a ring with parks in the middle. Low- and mid-rise apartment buildings line the outer roads, and townhouses and villas sit on the quieter streets inside.",
      "Buyers come here because the entry point sits below the waterfront districts. Much of the stock is new: studios and one- and two-bedrooms in buildings sold off-plan, alongside ready homes you can move into now. Circle Mall sits in the middle of the community.",
      "For tenants, JVC is one of the better-value addresses between the Marina and Dubai Hills. There is no Metro, so most residents drive; bus J01 runs to Mall of the Emirates for the Red Line.",
      "For owners, the buyer pool is investors looking for a rental home and first-time buyers trading up from renting. The buildings differ widely, so a well-run building with a pool and a gym and a park view is what separates your apartment from the rest.",
    ],
    homes: ["Studios and one- to three-bedroom apartments", "Townhouses and villas", "Ready homes and off-plan buildings"],
    suits: ["First-time buyers", "Investors looking for rental homes", "Buyers who want space for their budget"],
    transport: ["No Metro station. Bus J01 runs to Mall of the Emirates, with other routes across the community"],
    developer: "Nakheel",
    landmarks: ["Circle Mall", "The JVC community parks", "Floareá Skies by Mashriq Elite"],
    rentNote: "Renters are young professionals and small families who want a new building and a lower rent than the coast, and who drive to work.",
    sellNote: "Buyers weigh your building against dozens of newer ones nearby, so a strong management record and a park or pool view matter more than the finish.",
    nearby: ["arjan"],
    seoTitle: "JVC property for sale: Jumeirah Village Circle area guide",
    seoDescription:
      "Apartments and townhouses for sale in Jumeirah Village Circle (JVC), with a guide for buyers, tenants and sellers: homes, off-plan, transport and freehold.",
  },
  {
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    image: "area-dubai-creek-harbour",
    card: "A new district on the creek, facing the Downtown skyline.",
    intro: "A waterfront district on Dubai Creek beside the Ras Al Khor sanctuary, with the Downtown skyline across the water and a Blue Line station on the way.",
    overview: [
      "Dubai Creek Harbour sits on the creek beside the Ras Al Khor Wildlife Sanctuary. From the promenade, you look straight across the water to Burj Khalifa and the Downtown skyline.",
      "Buyers here choose between apartment buildings that are already lived in around Creek Marina and off-plan towers sold on payment plans. Homes run from one to four bedrooms, and the view is either the creek, the skyline or the sanctuary.",
      "For tenants, the district is quieter than Downtown and the promenade, Creek Beach and the marina are on your doorstep. The nearest Metro today is Creek on the Green Line; the Blue Line will add a station inside the district when it opens in September 2029.",
      "For owners, the Blue Line is the thing to watch. A station on the doorstep changes who will buy, so an apartment close to the station site will draw more interest than one at the far end of the promenade.",
    ],
    homes: ["One- to four-bedroom apartments", "Off-plan homes on payment plans", "Creek, skyline and sanctuary views"],
    suits: ["Buyers who want a new home on the water", "Off-plan buyers planning around a payment plan", "Buyers who want a view of the skyline"],
    transport: [
      "No Metro station yet. The Blue Line is due to open in September 2029 with a Dubai Creek Harbour station",
      "Nearest station today: Creek, on the Green Line",
    ],
    developer: "Emaar",
    landmarks: ["Creek Marina", "Creek Beach", "The Dubai Creek Harbour promenade", "Ras Al Khor Wildlife Sanctuary"],
    rentNote: "Tenants are couples and small families who want a new apartment on the water and are happy to drive until the Blue Line opens.",
    sellNote: "Buyers of resale here compare your apartment with the developer's off-plan releases next door, so a ready home with a skyline view is your strongest card.",
    nearby: ["downtown-dubai", "mohammed-bin-rashid-city"],
    seoTitle: "Dubai Creek Harbour property for sale: area guide",
    seoDescription:
      "Apartments and off-plan homes for sale in Dubai Creek Harbour, with a guide for buyers, tenants and sellers: homes, views, the Blue Line station and freehold.",
  },

  // Dubai Islands, checked 17 Oct 2026. Nakheel development page (five islands, over 20 km of
  // beaches, a Blue Flag beach, Infinity Bridge, Souk Al Marfa, ten minutes from Gold Souq station):
  // https://www.nakheel.com/en/developments/nakheel-collections/dubaiislands. Freehold for foreign
  // buyers: Metropolitan Dubai Islands property guide 2025
  // https://metropolitan.realestate/blog/guides/dubai-islands-property-guide-2025/ and Nakheel's own
  // note that its homes sit in designated freehold zones
  // https://www.nakheel.com/en/media-centre/blogs/detail/dubai-property-investment-for-foreigners-why-nakheel-remains-a-top-choice
  // (Bayut's area guide returned 503 on the check date). Bus SM1 and Gold Souq as nearest Metro:
  // dubizzle area overview https://www.dubizzle.com/blog/property/area-overview-dubai-islands/.
  // Projects: Ellington's Meriva Collection and Mashriq Elite's Floareá Breeze (lib/data/projects.json).
  {
    slug: "dubai-islands",
    name: "Dubai Islands",
    image: "p/ellington-the-meriva-collection-1",
    card: "Five new islands off Deira, with beaches, marinas and golf.",
    intro: "Nakheel's five islands off the Deira coast, reached by the Infinity Bridge, with beachfront apartments and villas going up around long public beaches.",
    overview: [
      "Dubai Islands is a group of five man-made islands off the coast of Deira, developed by Nakheel. The islands are named Central, Marina, Shore, Golf and Elite, and they are linked to the city by the Infinity Bridge and to each other by smaller bridges.",
      "If you are buying, most of what is on offer is off-plan: beachfront apartment buildings, branded residences and villa communities such as Bay Villas. Nakheel sells the land and builds the beaches and roads; the homes come from a growing list of developers, including Ellington's Meriva Collection and Mashriq Elite's Floareá Breeze. Check each project's escrow account and construction progress before you commit.",
      "If you plan to rent here, the islands are still being built, so ready homes are few and the shops and restaurants are mostly at Souk Al Marfa for now. The nearest Metro is Gold Souq on the Green Line, a short drive over the bridge, and there is no station on the islands.",
      "If you own a plot or an off-plan home here, your buyer is someone who wants a beach address that is not Palm Jumeirah. A direct beach view and a short walk to the sand are what buyers pay for, so show both.",
    ],
    homes: ["Beachfront apartments and penthouses", "Villas and townhouses in gated communities", "Off-plan homes on payment plans"],
    suits: ["Buyers who want a new beach address", "Off-plan buyers planning around a payment plan", "Buyers who like Deira and the old city close by"],
    transport: [
      "No Metro station. Nearest: Gold Souq on the Green Line, about ten minutes by road",
      "RTA bus SM1 serves Souk Al Marfa at the entrance to the islands",
      "Road access over the Infinity Bridge from Deira",
    ],
    developer: "Nakheel",
    landmarks: ["Infinity Bridge", "Souk Al Marfa", "The Blue Flag beach", "Rixos Dubai Islands", "Bay Villas", "The Meriva Collection by Ellington", "Floareá Breeze by Mashriq Elite"],
    rentNote: "The first tenants are couples and small families who want a beach apartment and do not mind that the islands are still being built around them.",
    sellNote: "Most resale here is off-plan, so your buyer will compare your payment plan and construction progress with the developer's own releases.",
    seoTitle: "Dubai Islands property for sale: area guide",
    seoDescription:
      "Apartments and villas for sale on Dubai Islands, Nakheel's five islands off Deira, with a guide for buyers, tenants and sellers: homes, transport and freehold.",
  },

  // Jumeirah Lake Towers, checked 17 Oct 2026. Freehold, 26 clusters A to Z, three lakes, JLT Park,
  // Metro stations, the JLT Link shuttle and named nurseries: Bayut area guide
  // https://www.bayut.com/area-guides/jumeirah-lake-towers/. DMCC as master developer, Almas Tower,
  // Saba Tower: Property Finder https://www.propertyfinder.ae/en/area-insights/dubai/jumeirah-lake-towers.
  // Uptown Dubai as a DMCC district: https://www.dmcc.ae/jlt. Station renaming: JLT became DMCC in
  // Sep 2018 and Dubai Marina became Sobha Realty in Aug 2021 (Khaleej Times full list
  // https://www.khaleejtimes.com/uae/dubai-metro-stations-names-full-list). Tram: the Jumeirah Lakes
  // Towers stop links to DMCC station by footbridge (Gulf News
  // https://gulfnews.com/living-in-uae/transport/uae-which-dubai-metro-station-is-connected-to-the-tram-1.1688651610018).
  {
    slug: "jumeirah-lake-towers",
    name: "Jumeirah Lake Towers",
    image: "area-jlt",
    card: "Towers around three lakes, across the road from the Marina.",
    intro: "A freehold district of towers in 26 clusters around three lakes and a park, with two Red Line stations and the Marina across Sheikh Zayed Road.",
    overview: [
      "Jumeirah Lake Towers, or JLT, sits on the inland side of Sheikh Zayed Road opposite Dubai Marina. Its towers stand in 26 clusters lettered A to Z around three lakes and a central park, and the DMCC free zone has its headquarters in Almas Tower at the centre.",
      "Buyers get apartments from studios to four-bedrooms, with penthouses in a few of the taller towers. Almost everything is ready, since the district was built out in the 2000s and early 2010s, and the towers vary in age, finish and management. Uptown Dubai, DMCC's newer district on the southern edge, adds a taller skyline.",
      "For tenants, JLT is one of the best-connected areas in the city. DMCC and Sobha Realty stations are both on the Red Line, the Jumeirah Lakes Towers tram stop links to DMCC station by footbridge, and the JLT Link electric shuttle runs two loops around the clusters. Many of the companies in the free zone are within walking distance of home.",
      "If you are selling, your apartment is one of many in a district with a lot of stock, so the tower matters as much as the unit. A lake view, a well-kept building and a short walk to a station are what move a sale here.",
    ],
    homes: ["Studios and one- to four-bedroom apartments", "Penthouses in a few of the taller towers", "Lake, park and Marina skyline views"],
    suits: ["Professionals who work in DMCC or the Marina", "Buyers who want the Marina's location at a different price point", "Investors buying apartments to let"],
    transport: [
      "Dubai Metro Red Line: DMCC and Sobha Realty stations",
      "Dubai Tram: the Jumeirah Lakes Towers stop, linked to DMCC station by footbridge",
      "JLT Link electric shuttle: two loops connecting the clusters to the two Metro stations",
    ],
    developer: "DMCC",
    landmarks: ["Almas Tower", "JLT Park", "Lake Almas West", "Lake Almas East", "JLT Lake", "Uptown Dubai"],
    schools: [
      "Dewdrops Nursery",
      "Learning Ladders Nursery",
      "Paddington Nursery",
      "Oakfield Early Learning Centre",
      "Emirates International School (The Meadows, nearby)",
    ],
    rentNote: "Tenants are free-zone employees and Marina workers who want a Metro station close and a lower rent than the towers across the road.",
    sellNote: "Buyers here shop by cluster and tower before they shop by apartment, so a strong building record and a lake view are what you lead with.",
    nearby: ["dubai-marina"],
    seoTitle: "JLT property for sale: Jumeirah Lake Towers area guide",
    seoDescription:
      "Apartments for sale in Jumeirah Lake Towers (JLT), with a guide for buyers, tenants and sellers: the lakes, DMCC and Sobha Realty stations and freehold.",
  },

  // Mohammed Bin Rashid City, checked 17 Oct 2026. Freehold for overseas buyers, home types, Al Khail
  // Road access: Property Finder https://www.propertyfinder.ae/en/area-insights/dubai/mohammed-bin-rashid-city.
  // Crystal Lagoon in District One, Meydan Racecourse, Meydan One Mall (upcoming), Ras Al Khor
  // sanctuary, Hartland International School, North London Collegiate School Dubai, nearest stations
  // Business Bay and ONPASSIVE: Bayut area guide https://www.bayut.com/area-guides/mohammed-bin-rashid-city/.
  // Meydan Group as master developer of MBR City and District One: Gulf News
  // https://gulfnews.com/business/property/construction-on-phase-3-of-meydans-mbr-city-starts-1.2258560.
  // Sobha Hartland II inside MBR City, lagoon, two international schools ten minutes away: Sobha
  // https://sobharealty.com/properties-in-dubai/sobha-hartland-2/skyvue/stellar.
  {
    slug: "mohammed-bin-rashid-city",
    name: "Mohammed Bin Rashid City",
    image: "p/sobha-hartland-ii-skyvue-stellar-1",
    card: "Lagoons, villas and new towers between Downtown and the creek.",
    intro: "A large master plan south of Downtown Dubai, home to District One and its Crystal Lagoon, Sobha Hartland, Sobha Hartland II and the Meydan racecourse.",
    overview: [
      "Mohammed Bin Rashid City, or MBR City, is a master plan by Meydan that stretches from Business Bay and Downtown Dubai towards the Ras Al Khor sanctuary and Al Khail Road. Inside it sit several communities with their own names: District One around the Crystal Lagoon, Sobha Hartland on the creek side, Sobha Hartland II next to it, Meydan Horizon and District 11.",
      "Buyers have the widest range of home types of any area near the centre. District One is villas and mansions on the lagoon with some apartment phases. Sobha Hartland and Hartland II mix villas, townhouses and towers; Hartland II is sold off-plan around its own lagoon, with towers such as Skyvue Stellar. Ellington's Everly Place sits in Meydan Horizon.",
      "For tenants, MBR City is a car area. There is no Metro station; Business Bay on the Red Line is the nearest, and most residents drive via Al Khail Road or Al Meydan Road. In return you get lagoons, parks and two international schools inside Sobha Hartland.",
      "If you are selling, your buyer is a family who wants a villa or a large apartment close to Downtown without the density. Off-plan supply in Hartland II and District One West competes with resale, so a ready home with a lagoon or skyline view is what stands out.",
    ],
    homes: ["Villas and mansions around the lagoons", "Townhouses in Sobha Hartland and Hartland II", "Apartments in mid-rise buildings and new towers"],
    suits: ["Families who want a villa near Downtown", "Buyers who want a lagoon or park on the doorstep", "Off-plan buyers planning around a payment plan"],
    transport: [
      "No Metro station. Nearest: Business Bay on the Red Line, a drive away",
      "Most residents drive via Al Khail Road and Al Meydan Road",
    ],
    developer: "Meydan",
    landmarks: ["District One Crystal Lagoon", "Meydan Racecourse", "Meydan One Mall (under construction)", "Ras Al Khor Wildlife Sanctuary", "Sobha Hartland II lagoon"],
    schools: ["Hartland International School", "North London Collegiate School Dubai"],
    rentNote: "Families with children at the two schools in Sobha Hartland rent the villas and townhouses, and professionals from Business Bay rent the apartments.",
    sellNote: "Resale here competes with the developers' own off-plan launches next door, so a ready home with a lagoon or skyline view is your advantage.",
    nearby: ["downtown-dubai", "business-bay", "dubai-hills-estate", "dubai-creek-harbour"],
    seoTitle: "MBR City property for sale: Mohammed Bin Rashid City guide",
    seoDescription:
      "Villas and apartments for sale in Mohammed Bin Rashid City (MBR City), with a guide for buyers, tenants and sellers: District One, Sobha Hartland and freehold.",
  },

  // Dubai South, checked 17 Oct 2026. Freehold for overseas buyers, eight districts, Emaar South,
  // The Pulse, South Bay, the airport: Property Finder
  // https://www.propertyfinder.ae/en/area-insights/dubai/dubai-south. Expo City Dubai districts
  // (Expo Downtown, Expo Business, Expo Hills, Expo Valley, Expo Fields), Terra and the residential
  // projects: https://www.expocitydubai.com/. Route 2020 branch of the Red Line, Expo 2020 station as
  // the terminus, opened 1 June 2021, rename to Expo City Dubai planned: Wikipedia
  // https://en.wikipedia.org/wiki/Expo_2020_(Dubai_Metro). Nurseries in the Residential District and
  // South View School in nearby Remraam: Property Finder
  // https://www.propertyfinder.ae/blog/schools-in-dubai-south/. Master developer: Dubai South
  // (Dubai Aviation City Corporation), https://www.dubaisouth.ae/.
  {
    slug: "dubai-south",
    name: "Dubai South",
    image: "area-dubai-south",
    card: "Low-rise homes beside Expo City and Al Maktoum airport.",
    intro: "The planned city around Al Maktoum International Airport and Expo City Dubai, with townhouses, villas and low-rise apartments and the Expo station at the end of the Red Line.",
    overview: [
      "Dubai South is the district built around Al Maktoum International Airport on the southern edge of the city. It launched as Dubai World Central and took its current name in 2015. Expo City Dubai, the former Expo 2020 site, sits on its northern side and is now a neighbourhood of its own.",
      "Buyers find townhouses, villas and low-rise apartments rather than towers. Emaar South is built around an 18-hole golf course; The Pulse and South Bay are the main communities in the Residential District; Expo City is adding apartment buildings and villas of its own, such as Sky Residences and Mangrove Residences. Much of the stock is off-plan or newly handed over.",
      "For tenants, the pull is the airport, the free zone and the space. Expo 2020 station, the terminus of the Red Line's Route 2020 branch, sits at Expo City; the rest of the district is a car area. Two nurseries sit inside the Residential District, and South View School is in Remraam next door.",
      "If you are selling, your buyer is an airport or free-zone employee, or an investor who is betting on the airport expansion. A townhouse with a garden in a handed-over phase is easier to sell than an apartment, because that is what most tenants here are looking for.",
    ],
    homes: ["Townhouses and villas in gated communities", "Low-rise apartments in the Residential District and Expo City", "Golf-course homes in Emaar South"],
    suits: ["Buyers who work at the airport, in Expo City or in Jebel Ali", "Families who want a townhouse and a garden", "Investors buying before the airport expansion"],
    transport: [
      "Dubai Metro Red Line, Route 2020 branch: Expo 2020 station at Expo City Dubai, the end of the line",
      "Al Maktoum International Airport is inside the district",
      "Road access from Expo Road and Sheikh Mohammed Bin Zayed Road",
    ],
    developer: "Dubai South",
    landmarks: ["Al Maktoum International Airport", "Expo City Dubai", "Terra", "Emaar South golf course", "The Pulse"],
    schools: ["CreaKids Nursery (Residential District)", "Little Woods Nursery (Residential District)", "South View School (Remraam, nearby)"],
    rentNote: "Tenants are airport, Expo City and Jebel Ali employees who want a townhouse or a garden apartment close to work.",
    sellNote: "Buyers here want to know which phase your home sits in and when the roads and shops around it were completed, so have the handover papers ready.",
    seoTitle: "Dubai South property for sale: area guide",
    seoDescription:
      "Townhouses and apartments for sale in Dubai South, beside Expo City and Al Maktoum airport, with a guide for buyers, tenants and sellers: Metro and freehold.",
  },

  // Arjan, checked 17 Oct 2026. Freehold, developed by Dubai Properties inside Dubailand, Miracle
  // Garden and Butterfly Garden, named schools and nurseries, nearest station Dubai Internet City:
  // Bayut area guide https://www.bayut.com/area-guides/arjan/. Bus routes F36 and F37, Mall of the
  // Emirates as the other nearby station: Binghatti area guide https://www.binghatti.com/en/area-guides/arjan.
  // Floareá Residence (206 homes) handed over by August 2025: Khaleej Times
  // https://www.khaleejtimes.com/business/property/mashriq-elite-announces-on-time-handover-of-floarea-residence-in-arjan
  // and Gulf News https://gulfnews.com/business/property/mashriq-elite-hands-over-floarea-residence-in-arjan-on-time-1.500295937.
  {
    slug: "arjan",
    name: "Arjan",
    image: "area-arjan",
    card: "Low-rise apartments next to Miracle Garden, at a lower entry point.",
    intro: "A freehold district in Dubailand beside Dubai Miracle Garden, with low- and mid-rise apartment buildings between Al Barsha South and Motor City.",
    overview: [
      "Arjan is a district inside Dubailand, developed by Dubai Properties, at the junction of Sheikh Mohammed Bin Zayed Road and Umm Suqeim Street. Dubai Miracle Garden and Dubai Butterfly Garden sit on its edge, and Al Barsha South, Motor City and JVC are its neighbours.",
      "Buyers get apartments, mostly studios to three-bedrooms, in low- and mid-rise buildings with shops on the ground floor. Villas are rare. Mashriq Elite's Floareá Residence, with 206 homes, was handed over here by August 2025, and its Floareá Grandé is in the same district.",
      "For tenants, Arjan is one of the lower-rent addresses close to the schools of Al Barsha South, including Nord Anglia, Brighton College and Repton. There is no Metro station; RTA buses F36 and F37 serve the district, and Mall of the Emirates and Dubai Internet City are the nearest Red Line stations by car.",
      "If you are selling, your buyer is a first-time buyer or an investor who wants a tenant quickly. Buildings here are judged on their pool, gym and management before their finish, so a completed building with a good record and a garden view is what sells.",
    ],
    homes: ["Studios and one- to three-bedroom apartments", "Low- and mid-rise buildings with ground-floor shops", "Ready homes and off-plan buildings"],
    suits: ["First-time buyers", "Investors looking for rental homes", "Families who want the Al Barsha South schools close"],
    transport: [
      "No Metro station. RTA bus routes F36 and F37 serve the district",
      "Nearest Red Line stations by car: Mall of the Emirates and Dubai Internet City",
    ],
    developer: "Dubai Properties (Dubai Holding)",
    landmarks: ["Dubai Miracle Garden", "Dubai Butterfly Garden", "Floareá Residence by Mashriq Elite", "Floareá Grandé by Mashriq Elite"],
    schools: [
      "Safa Community School",
      "Dubai Heights Academy",
      "Nord Anglia International School Dubai",
      "Brighton College Dubai (Al Barsha South, nearby)",
      "Repton School Dubai (Al Barsha South, nearby)",
      "Happy Bees Early Learning Centre",
      "Chubby Cheeks Nursery",
    ],
    rentNote: "Tenants are young professionals and families with children at the Al Barsha South schools who want a new apartment and a lower rent than Dubai Hills next door.",
    sellNote: "Buyers compare your apartment with the new buildings still being released around it, so a completed building with a strong management record is your advantage.",
    nearby: ["jumeirah-village-circle", "dubai-hills-estate"],
    seoTitle: "Arjan property for sale: Dubailand area guide",
    seoDescription:
      "Apartments for sale in Arjan, Dubailand, next to Dubai Miracle Garden, with a guide for buyers, tenants and sellers: homes, schools, buses and freehold.",
  },
];

/** Joins list items into one sentence; names keep their capital letter. */
const KEEP_CASE =
  /^(Burj|Dubai|Palm|Emaar|Nakheel|JBR|DMCC|Sobha|RTA|Ain |Al |Almas|Atlantis|Bay |Circle|Creek|District|Expo|Floareá|Infinity|JLT|JVC|King's|Lake|Marasi|Marina|Meydan|Mohammed|Ras |Rixos|Souk|Terra|The Dubai Mall|The Beach|The Pulse|The View|The Meriva|Uptown|Hartland|North London|Safa|Nord|Brighton|Repton|Happy|Chubby|Dewdrops|Learning|Paddington|Oakfield|Emirates|CreaKids|Little|South)/;
function joinList(items: string[]) {
  const parts = items.map((s, i) => (i === 0 || KEEP_CASE.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1)));
  if (parts.length < 2) return parts.join("");
  const sep = parts.some((p) => p.includes(",")) ? "; " : ", ";
  return `${parts.slice(0, -1).join(sep)}${sep === "; " ? "; and " : " and "}${parts.at(-1)}`;
}

/** Questions buyers ask about an area, answered only from the checked facts above. */
export function areaFaqs(a: Area) {
  const faqs = [
    {
      q: `Can foreigners buy property in ${a.name}?`,
      a: `Yes. ${a.name} is a freehold area, so buyers of any nationality can own homes there outright, and they do not need to live in the UAE to buy.`,
    },
    { q: `What types of property are there in ${a.name}?`, a: `${joinList(a.homes)}.` },
    { q: `How do you get around ${a.name} by public transport?`, a: `${a.transport.join(". ")}.` },
    { q: `Who is ${a.name} a good fit for?`, a: `${joinList(a.suits)}.` },
    { q: `Who is the master developer of ${a.name}?`, a: `${a.developer}.` },
  ];
  if (a.landmarks?.length) {
    faqs.push({ q: `What are the landmarks in ${a.name}?`, a: `${joinList(a.landmarks)}.` });
  }
  if (a.schools?.length) {
    faqs.push({ q: `Which schools and nurseries are near ${a.name}?`, a: `${joinList(a.schools)}.` });
  }
  if (a.rentNote) {
    faqs.push({ q: `Who rents in ${a.name}?`, a: a.rentNote });
  }
  if (a.sellNote) {
    faqs.push({ q: `What should I know before selling a home in ${a.name}?`, a: a.sellNote });
  }
  const neighbours = (a.nearby ?? []).map(areaName).filter((n) => n !== a.name);
  if (neighbours.length) {
    faqs.push({ q: `Which areas are next to ${a.name}?`, a: `${joinList(neighbours)}.` });
  }
  faqs.push({
    q: `What are the costs of buying a home in ${a.name}?`,
    a: "The same fees apply across Dubai. A ready home carries the 4% DLD transfer fee, AED 520 in title deed fees, the registration trustee fee and usually a 2% agency fee plus VAT; an off-plan home carries 4% Oqood registration plus AED 20. The [buying costs calculator](/buying-costs/) works it out for any price.",
  });
  return faqs;
}

export type AreaSlug = (typeof AREAS)[number]["slug"];

export const areaBySlug = (slug: string) => AREAS.find((a) => a.slug === slug);
export const areaName = (slug: string) => areaBySlug(slug)?.name ?? slug;
