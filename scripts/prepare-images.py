"""Crop each master to its aspect with an anchor, then emit AVIF/WebP/JPEG at each width.

Usage: python3 scripts/prepare-images.py masters [key ...]
Masters are named <key>.png|jpg. A spec with "src" crops a second output from another master
(hero-m is the phone crop of hero). Never hand-drop an image into public/img.
Every key here must match lib/images.ts.
"""
import sys
from pathlib import Path
from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "public" / "img"

WIDE = [640, 1280, 1920, 2560]
PHOTO = [640, 960, 1440, 2160]

SPECS = {
    "hero": {"aspect": (16, 9), "widths": WIDE},
    "hero-m": {"src": "hero", "aspect": (4, 5), "x": 0.6, "widths": [640, 960, 1280]},
    "l-marina": {"aspect": (3, 2), "widths": PHOTO},
    "l-palm": {"aspect": (3, 2), "widths": PHOTO},
    "l-hills": {"aspect": (3, 2), "widths": PHOTO},
    "l-jvc": {"aspect": (3, 2), "widths": PHOTO},
    "l-downtown": {"aspect": (3, 2), "widths": PHOTO},
    "l-creek": {"aspect": (3, 2), "widths": PHOTO},
    "guide-keys": {"aspect": (3, 2), "widths": PHOTO},
    "viewing": {"aspect": (3, 2), "widths": PHOTO},
    "area-dubai-marina": {"aspect": (16, 9), "y": 0.5, "widths": WIDE},
    "area-downtown-dubai": {"aspect": (16, 9), "y": 0.45, "widths": WIDE},
    "area-palm-jumeirah": {"aspect": (16, 9), "y": 0.4, "widths": WIDE},
    "area-business-bay": {"aspect": (16, 9), "y": 0.5, "widths": WIDE},
    "area-dubai-creek-harbour": {"aspect": (16, 9), "y": 0.55, "widths": WIDE},
    "area-jlt": {"aspect": (16, 9), "y": 0.5, "widths": WIDE},
    "area-dubai-south": {"aspect": (16, 9), "y": 0.5, "widths": WIDE},
    "area-arjan": {"aspect": (16, 9), "y": 0.5, "widths": WIDE},
    "band-marina": {"aspect": (2560, 1097), "y": 0.55, "widths": [960, 1920, 2560]},
    # 19 Oct 2026, Higgsfield gpt_image_2_5 (max, 4K): the ExpertCare set.
    "hero2": {"aspect": (16, 9), "widths": WIDE},
    "hero2-m": {"src": "hero2", "aspect": (4, 5), "x": 0.42, "widths": [640, 960, 1280]},
    "handover": {"aspect": (3, 2), "widths": PHOTO},
    "desk": {"aspect": (3, 2), "widths": PHOTO},
    "keys-bowl": {"aspect": (3, 2), "widths": PHOTO},
    "family-balcony": {"aspect": (3, 2), "widths": PHOTO},
    "terrace-dusk": {"aspect": (3, 2), "widths": PHOTO},
    "viewing-2": {"aspect": (3, 2), "widths": PHOTO},
}


def crop(im, aspect, x=0.5, y=0.5):
    w, h = im.size
    ar = aspect[0] / aspect[1]
    if w / h > ar:
        nw = round(h * ar)
        left = round((w - nw) * x)
        return im.crop((left, 0, left + nw, h))
    nh = round(w / ar)
    top = round((h - nh) * y)
    return im.crop((0, top, w, top + nh))


def main():
    src = Path(sys.argv[1])
    only = set(sys.argv[2:])
    OUT.mkdir(parents=True, exist_ok=True)
    for key, spec in SPECS.items():
        if only and key not in only:
            continue
        stem = spec.get("src", key)
        master = next((p for p in src.iterdir() if p.stem == stem), None)
        if master is None:
            print(f"MISSING {key}")
            continue
        im = crop(Image.open(master).convert("RGB"), spec["aspect"], spec.get("x", 0.5), spec.get("y", 0.5))
        for w in spec["widths"]:
            if w > im.width:
                print(f"skip {key} {w}: crop is only {im.width} wide")
                continue
            h = round(w * spec["aspect"][1] / spec["aspect"][0])
            r = im.resize((w, h), Image.LANCZOS)
            r.save(OUT / f"{key}-{w}.jpg", quality=82, optimize=True, progressive=True)
            r.save(OUT / f"{key}-{w}.webp", quality=80, method=6)
            r.save(OUT / f"{key}-{w}.avif", quality=58)
        kb = sum(p.stat().st_size for p in OUT.glob(f"{key}-*")) // 1024
        print(f"ok {key} from {master.name} crop {im.size} total {kb} KB")


if __name__ == "__main__":
    main()
