"""Build the off-plan inventory: research files in, site data and responsive images out.

Usage: python3 scripts/offplan/build.py

Reads
  content/offplan/<developer>.json   researched projects (one array per file, see SCHEMA.md)
  content/offplan/overrides.json     per-slug edits: summary (required), area, DLD project number, …
  content/offplan/ar*.json           Arabic text per slug (optional; English shows where missing)
  masters/offplan/<slug>/<n>.jpg     the developer images named in each project's `images`
Writes
  lib/data/projects.json, lib/data/projects-ar.json, lib/data/project-images.json
  public/img/p/<slug>-<n>-<width>.{jpg,webp,avif}, public/img/p/CREDITS.md

Fails loudly on anything the site must not show: a payment plan that does not add up to 100,
a project without a source, a summary or an image, or an image too small to use.
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "content" / "offplan"
MASTERS = ROOT / "masters" / "offplan"
OUT_IMG = ROOT / "public" / "img" / "p"
DATA = ROOT / "lib" / "data"

# Inventory order: the order projects appear in "featured" and default search results.
FILES = ["mashriq-elite", "sobha", "damac", "emaar-nakheel", "ellington-binghatti", "extra"]
WIDTHS = [640, 960, 1600]
MIN_WIDTH = 960
RATIO = (3, 2)
MAX_IMAGES = 3
TYPES = {"Apartment", "Penthouse", "Villa", "Townhouse"}

# Community or district words that place a project inside one of the site's area guides.
AREA_MATCH = [
    (r"\bdubai marina\b", "dubai-marina"),
    (r"\bdowntown dubai\b", "downtown-dubai"),
    (r"\bpalm jumeirah\b", "palm-jumeirah"),
    (r"\bdubai hills\b", "dubai-hills-estate"),
    (r"\bbusiness bay\b", "business-bay"),
    (r"\bjumeirah village circle\b|\bjvc\b", "jumeirah-village-circle"),
    (r"\bdubai creek harbour\b|\bcreek harbour\b", "dubai-creek-harbour"),
]


def fail(msg):
    sys.exit(f"build.py: {msg}")


def crop(im):
    w, h = im.size
    ar = RATIO[0] / RATIO[1]
    if w / h > ar:
        nw = round(h * ar)
        left = (w - nw) // 2
        return im.crop((left, 0, left + nw, h))
    nh = round(w / ar)
    top = (h - nh) // 2
    return im.crop((0, top, w, top + nh))


def area_for(p, override):
    if "area" in override:
        return override["area"]
    text = f"{p['community']} {p.get('district') or ''}".lower()
    for pattern, slug in AREA_MATCH:
        if re.search(pattern, text):
            return slug
    return None


def images_for(p, credits):
    keys, specs = [], {}
    for n, img in enumerate(p["images"][:MAX_IMAGES], start=1):
        master = MASTERS / p["slug"] / Path(img["file"]).name
        if not master.exists():
            fail(f"{p['slug']}: missing image {master}")
        im = crop(Image.open(master).convert("RGB"))
        if im.width < MIN_WIDTH:
            print(f"  skip {master.name}: {im.width}px after crop")
            continue
        key = f"p/{p['slug']}-{n}"
        widths = [w for w in WIDTHS if w <= im.width]
        for w in widths:
            r = im.resize((w, round(w * RATIO[1] / RATIO[0])), Image.LANCZOS)
            base = OUT_IMG / f"{p['slug']}-{n}-{w}"
            r.save(base.with_suffix(".jpg"), quality=78, optimize=True, progressive=True)
            r.save(base.with_suffix(".webp"), quality=80, method=6)
            r.save(base.with_suffix(".avif"), quality=58)
        keys.append(key)
        specs[key] = {"ratio": list(RATIO), "widths": widths, "alt": img["alt"], "altAr": img.get("altAr") or img["alt"], "src": img["sourceUrl"]}
        credits.append(f"- `{key}`: {p['developer']}, {p['name']}. {img['sourceUrl']}")
    if not keys:
        fail(f"{p['slug']}: no usable image")
    return keys, specs


def main():
    overrides = json.loads((SRC / "overrides.json").read_text())
    ar_text = {}
    for f in sorted(SRC.glob("ar*.json")):
        ar_text.update(json.loads(f.read_text()))
    OUT_IMG.mkdir(parents=True, exist_ok=True)
    for old in OUT_IMG.glob("*"):
        old.unlink()

    projects, image_specs, credits = [], {}, []
    for name in FILES:
        if not (SRC / f"{name}.json").exists():
            print(f"WARNING: content/offplan/{name}.json is missing")
            continue
        for p in json.loads((SRC / f"{name}.json").read_text()):
            o = overrides.get(p["slug"], {})
            if o.get("skip"):
                print(f"skip {p['slug']}: {o['skip']}")
                continue
            p = {**p, **o.get("patch", {})}
            print(p["slug"])
            if not o.get("summary"):
                fail(f"{p['slug']}: no summary in overrides.json")
            if not p.get("sources"):
                fail(f"{p['slug']}: no sources")
            types = p["unitTypes"]
            if not types or set(types) - TYPES:
                fail(f"{p['slug']}: bad unitTypes {types}")
            plan = p.get("paymentPlan")
            if plan is not None and sum(s["pct"] for s in plan) != 100:
                fail(f"{p['slug']}: payment plan adds up to {sum(s['pct'] for s in plan)}")
            keys, specs = images_for(p, credits)
            image_specs.update(specs)
            projects.append(
                {
                    "slug": p["slug"],
                    "ref": f"HP-{2001 + len(projects)}",
                    "title": p["name"],
                    "developer": p["developer"],
                    "developerUrl": p["developerUrl"],
                    "community": p["community"],
                    "area": area_for(p, o),
                    "type": types[0],
                    "types": types,
                    "status": "off-plan",
                    "price": p.get("priceFrom"),
                    "priceNote": p.get("priceFromUnit"),
                    "beds": p["bedrooms"]["min"],
                    "bedsMax": p["bedrooms"]["max"],
                    "size": round(p["sizeFrom"]) if p.get("sizeFrom") else None,
                    "images": keys,
                    "summary": o["summary"],
                    "description": p["description"],
                    "features": p["highlights"],
                    "amenities": p.get("amenities") or [],
                    "handover": p.get("handover"),
                    "plan": plan,
                    "planLabel": p.get("paymentPlanLabel"),
                    "permit": o.get("permit") or p.get("reraPermit") or "",
                    "projectNumber": str(o.get("projectNumber") or p.get("dldProjectNumber") or ""),
                    "escrow": o.get("escrow") or p.get("escrowAccount") or "",
                    "source": p.get("projectUrl") or p["sources"][0],
                    "checked": p["checked"],
                }
            )

    ar_out = {}
    for proj in projects:
        t = ar_text.get(proj["slug"])
        if not t:
            continue
        for field in ("description", "features", "amenities"):
            if len(t.get(field, [])) != len(proj[field]):
                fail(f"{proj['slug']}: Arabic {field} has {len(t.get(field, []))} items, English {len(proj[field])}")
        if proj["plan"] and len(t.get("planStages", [])) != len(proj["plan"]):
            fail(f"{proj['slug']}: Arabic planStages does not match the plan")
        ar_out[proj["slug"]] = t
        for i, key in enumerate(proj["images"]):
            if t.get("alts") and i < len(t["alts"]):
                image_specs[key]["altAr"] = t["alts"][i]

    (DATA / "projects.json").write_text(json.dumps(projects, ensure_ascii=False, indent=1) + "\n")
    (DATA / "projects-ar.json").write_text(json.dumps(ar_out, ensure_ascii=False, indent=1) + "\n")
    (DATA / "project-images.json").write_text(json.dumps(image_specs, ensure_ascii=False, indent=1) + "\n")
    (OUT_IMG / "CREDITS.md").write_text(
        "# Project images\n\nDeveloper renders and photographs, used to present each developer's project. "
        "Written permission from each developer (normally part of the marketing agreement) is needed before launch.\n\n"
        + "\n".join(credits)
        + "\n"
    )
    kb = sum(f.stat().st_size for f in OUT_IMG.glob("*")) // 1024
    print(f"{len(projects)} projects, {len(image_specs)} images, {kb} KB, Arabic for {len(ar_out)}")


if __name__ == "__main__":
    main()
