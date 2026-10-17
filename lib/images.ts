import PROJECT_IMAGES from "./data/project-images.json";

/** Every photograph on the site. Keys and widths of the site images must match
 * scripts/prepare-images.py; project images (developer renders, credited per project in
 * public/img/p/CREDITS.md) are generated with their spec by scripts/offplan/build.py.
 * Unsplash photographs are credited in public/img/CREDITS.md; the rest are generated frames, used
 * as general imagery (the l-* frames were the sample listings' photos and now illustrate areas and
 * guides only). */
type Spec = { ratio: [number, number]; widths: number[]; alt: string };

const WIDE = [640, 1280, 1920, 2560];
const PHOTO = [640, 960, 1440, 2160];

const SITE_IMAGES = {
  hero: { ratio: [16, 9], widths: WIDE, alt: "A penthouse living room opening onto a terrace over the sea at sunset" },
  "hero-m": { ratio: [4, 5], widths: [640, 960, 1280], alt: "A penthouse living room opening onto a terrace over the sea at sunset" },
  "l-marina": { ratio: [3, 2], widths: PHOTO, alt: "Living room with a balcony over the yachts of Dubai Marina" },
  "l-palm": { ratio: [3, 2], widths: PHOTO, alt: "Beachfront villa with an infinity pool and palms at dusk" },
  "l-hills": { ratio: [3, 2], widths: PHOTO, alt: "Family villa with a lawn and pool beside the golf course" },
  "l-jvc": { ratio: [3, 2], widths: PHOTO, alt: "Bright one-bedroom apartment with an open kitchen and a park view" },
  "l-downtown": { ratio: [3, 2], widths: PHOTO, alt: "Apartment living room overlooking the city lights at dusk" },
  "l-creek": { ratio: [3, 2], widths: PHOTO, alt: "Show apartment balcony looking across the creek and wetland at sunrise" },
  "guide-keys": { ratio: [3, 2], widths: PHOTO, alt: "House keys resting on a folder beside a cup of Arabic coffee" },
  viewing: { ratio: [3, 2], widths: PHOTO, alt: "An adviser showing a couple the view from a new apartment" },
  "area-dubai-marina": { ratio: [16, 9], widths: WIDE, alt: "Yachts moored in Dubai Marina between residential towers" },
  "area-downtown-dubai": { ratio: [16, 9], widths: WIDE, alt: "Burj Khalifa and Downtown Dubai at twilight" },
  "area-palm-jumeirah": { ratio: [16, 9], widths: WIDE, alt: "Aerial view along the trunk and fronds of Palm Jumeirah" },
  "area-business-bay": { ratio: [16, 9], widths: WIDE, alt: "Towers around the water in Business Bay" },
  "area-dubai-creek-harbour": { ratio: [16, 9], widths: WIDE, alt: "The Downtown skyline across the water from Dubai Creek Harbour" },
  "band-marina": { ratio: [2560, 1097], widths: [960, 1920, 2560], alt: "The Dubai Marina skyline from the sea" },
} satisfies Record<string, Spec>;

type ProjectSpec = Spec & { src: string; altAr: string };
const PROJECTS = PROJECT_IMAGES as unknown as Record<`p/${string}`, ProjectSpec>;

export const IMAGES: Record<keyof typeof SITE_IMAGES | `p/${string}`, Spec> = { ...SITE_IMAGES, ...PROJECTS };

export type ImgKey = keyof typeof SITE_IMAGES | `p/${string}`;

/** Arabic alt text, one per image. Drafted in-house; needs a native review before launch. */
const SITE_ALT_AR: Record<keyof typeof SITE_IMAGES, string> = {
  hero: "غرفة معيشة في بنتهاوس تفتح على تراس يطل على البحر عند الغروب",
  "hero-m": "غرفة معيشة في بنتهاوس تفتح على تراس يطل على البحر عند الغروب",
  "l-marina": "غرفة معيشة بشرفة تطل على يخوت دبي مارينا",
  "l-palm": "فيلا على الشاطئ بمسبح لا متناهٍ ونخيل عند الغروب",
  "l-hills": "فيلا عائلية بحديقة ومسبح على حدود ملعب الغولف",
  "l-jvc": "شقة بغرفة نوم واحدة مشرقة بمطبخ مفتوح وإطلالة على الحديقة",
  "l-downtown": "غرفة معيشة في شقة تطل على أضواء المدينة عند المغيب",
  "l-creek": "شرفة شقة نموذجية تطل على الخور والمحمية عند الشروق",
  "guide-keys": "مفاتيح منزل على ملف إلى جانب فنجان قهوة عربية",
  viewing: "مستشارة تعرض على زوجين الإطلالة من شقة جديدة",
  "area-dubai-marina": "يخوت راسية في دبي مارينا بين الأبراج السكنية",
  "area-downtown-dubai": "برج خليفة ووسط مدينة دبي عند الغسق",
  "area-palm-jumeirah": "منظر جوي لجذع نخلة جميرا وأفرعها",
  "area-business-bay": "أبراج الخليج التجاري حول الماء",
  "area-dubai-creek-harbour": "أفق وسط مدينة دبي من خور دبي عبر الماء",
  "band-marina": "أفق دبي مارينا من جهة البحر",
};

export const ALT_AR: Record<ImgKey, string> = {
  ...SITE_ALT_AR,
  ...Object.fromEntries(Object.entries(PROJECTS).map(([k, v]) => [k, v.altAr])),
};

export const srcset = (key: ImgKey, ext: "avif" | "webp" | "jpg") =>
  IMAGES[key].widths.map((w) => `/img/${key}-${w}.${ext} ${w}w`).join(", ");

/** A mid-size JPEG for Open Graph and JSON-LD. */
export const ogImage = (key: ImgKey) => {
  const w = IMAGES[key].widths.find((x) => x >= 1200) ?? IMAGES[key].widths.at(-1)!;
  return `/img/${key}-${w}.jpg`;
};
