# One JSON file per researcher: an array of project objects.
{
  "slug": "sobha-hartland-ii-skyscape",          // kebab-case, developer + project
  "name": "Skyscape",                              // project name as the developer writes it
  "developer": "Sobha Realty",
  "developerUrl": "https://www.sobharealty.com",
  "projectUrl": "https://...",                     // official project page used
  "community": "Sobha Hartland II",                // marketing community / master community
  "district": "Mohammed Bin Rashid City",          // wider district as commonly named
  "unitTypes": ["Apartment"],                      // subset of Apartment | Penthouse | Villa | Townhouse
  "bedrooms": { "min": 1, "max": 3 },              // 0 = studio; exactly as published
  "priceFrom": 1450000,                            // AED starting price AS PUBLISHED on an official page, else null
  "priceFromUnit": "1 bedroom",                    // which unit the starting price is for, if stated, else null
  "sizeFrom": 750,                                 // sq ft of the smallest unit if published, else null
  "handover": "Q4 2028",                           // exactly as the developer publishes it, else null
  "paymentPlan": [{ "stage": "On booking", "pct": 10 }, ...],   // must sum to 100, else null
  "paymentPlanLabel": "60/40",                     // developer's own label, else null
  "launched": "2025-03",                           // if known, else null
  "availability": "Selling",                       // what the official page says (Selling / Now selling / Register interest …) — only include projects that are currently selling
  "highlights": ["...", "..."],                    // 3–5 short FACTS, own words
  "amenities": ["Pool", "Gym", ...],               // up to 8, as published
  "description": ["para 1", "para 2"],             // 2 short paragraphs, 40–70 words each, YOUR OWN WORDS, factual, no hype, no copied marketing text
  "dldProjectNumber": null,                        // only if printed on an official page/brochure
  "escrowAccount": null,                           // bank + account no. only if printed officially
  "reraPermit": null,                              // only if printed officially
  "images": [{ "file": "img/<slug>/1.jpg", "sourceUrl": "https://...", "alt": "what the render shows", "kind": "exterior|interior|amenity|aerial" }],
  "sources": ["https://...", "..."],
  "checked": "2026-09-16",
  "uncertain": ["anything you could not confirm, or where sources disagree"]
}
