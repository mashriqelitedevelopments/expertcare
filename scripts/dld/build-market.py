"""Dubai property price statistics from the DLD Real Estate Transactions open dataset.

Source: Dubai Land Department, "Real Estate Transactions", Data.Dubai
(https://data.dubai/en/l/470061), used under the Dubai Open Data Licence. The statistics are our own
analysis; DLD does not produce or endorse them, and the page must not say or imply that it does.

Usage:
  python3 scripts/dld/build-market.py <folder with part*.csv.gz> [snapshot YYYY-MM-DD]
Writes lib/data/market.json. Re-run on each new snapshot (the dataset is refreshed daily).

Rules (all visible on the site's method section):
  - trans_group_en == "Sales" and procedure_name_en is an ordinary sale: "Sell",
    "Sell - Pre registration" (off-plan) or "Delayed Sell". Lease-to-own, development
    registrations and bulk transfers are left out.
  - property_usage_en == "Residential"; flats (Unit/Flat) and villas (Villa) only.
  - price = actual_worth; size = procedure_area in square metres; price per sq ft is
    price / (size x 10.7639). Rows with no price or size are dropped.
  - Only complete calendar quarters from 2019 Q1 are used.
  - A median is published only when at least MIN_SALES sales back it.
  - Communities are matched on DLD's official area name AND the community (master project)
    name, so Dubai Marina excludes JBR and Dubai Harbour, which share the "Marsa Dubai" area.
"""
import csv
import gzip
import json
import statistics
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

SQFT_PER_SQM = 10.7639
MIN_SALES = 10
FIRST_YEAR = 2019
SALE_PROCEDURES = {"Sell", "Sell - Pre registration", "Delayed Sell"}

# site slug -> (official DLD area name, accepted community names, matched case-insensitively)
COMMUNITIES = {
    "dubai-marina": ("Marsa Dubai", ["dubai marina"]),
    "downtown-dubai": ("Burj Khalifa", ["downtown dubai"]),
    "palm-jumeirah": ("Palm Jumeirah", ["palm jumeirah"]),
    "dubai-hills-estate": ("Hadaeq Sheikh Mohammed Bin Rashid", ["dubai hills estate", "dubai hills"]),
    "business-bay": ("Business Bay", ["business bay"]),
    "jumeirah-village-circle": ("Al Barsha South Fourth", ["jumeirah village circle"]),
    "dubai-creek-harbour": ("Al Khairan First", ["dubai creek harbour"]),
}

OUT = Path(__file__).resolve().parents[2] / "lib" / "data" / "market.json"


def community_of(area: str, project: str):
    p = project.strip().lower()
    for slug, (official, names) in COMMUNITIES.items():
        if area != official:
            continue
        for n in names:
            # "dubai hills" also covers "DUBAI HILLS - MAPLE 3" style sub-community rows
            if p == n or (n == "dubai hills" and p.startswith("dubai hills")):
                return slug
    return None


def quarter_of(d: str):
    y, m = int(d[0:4]), int(d[5:7])
    return y, (m - 1) // 3 + 1


def last_complete_quarter(snapshot: date):
    y, q = snapshot.year, (snapshot.month - 1) // 3 + 1
    q -= 1
    if q == 0:
        y, q = y - 1, 4
    return y, q


def summarise(prices, psf):
    n = len(prices)
    if n < MIN_SALES:
        return {"sales": n, "medianPrice": None, "medianPsf": None}
    return {"sales": n, "medianPrice": round(statistics.median(prices)), "medianPsf": round(statistics.median(psf))}


def main():
    folder = Path(sys.argv[1])
    snapshot = date.fromisoformat(sys.argv[2]) if len(sys.argv) > 2 else date.today()
    last_y, last_q = last_complete_quarter(snapshot)
    last_key = (last_y, last_q)

    # buckets[(scope, (y, q))] -> ([prices], [psf]); scope is "dubai" or a community slug
    buckets = defaultdict(lambda: ([], []))
    # segments over the last four complete quarters: (scope, type, reg) -> ([prices], [psf])
    segments = defaultdict(lambda: ([], []))
    last4 = []
    y, q = last_y, last_q
    for _ in range(4):
        last4.append((y, q))
        q -= 1
        if q == 0:
            y, q = y - 1, 4
    prev4 = []
    for _ in range(4):
        prev4.append((y, q))
        q -= 1
        if q == 0:
            y, q = y - 1, 4

    rows = kept = 0
    for part in sorted(folder.glob("part*.csv.gz")):
        with gzip.open(part, "rt", encoding="utf-8", newline="") as fh:
            for r in csv.DictReader(fh):
                rows += 1
                if r["trans_group_en"] != "Sales" or r["procedure_name_en"] not in SALE_PROCEDURES:
                    continue
                if r["property_usage_en"] != "Residential":
                    continue
                ptype = r["property_type_en"]
                if ptype == "Unit" and r["property_sub_type_en"] == "Flat":
                    kind = "apartment"
                elif ptype == "Villa":
                    kind = "villa"
                else:
                    continue
                d = r["instance_date"]
                if len(d) < 10 or int(d[0:4]) < FIRST_YEAR:
                    continue
                key = quarter_of(d)
                if key > last_key:
                    continue
                try:
                    price = float(r["actual_worth"])
                    sqm = float(r["procedure_area"])
                except ValueError:
                    continue
                if price <= 0 or sqm <= 0:
                    continue
                psf = price / (sqm * SQFT_PER_SQM)
                reg = "off-plan" if r["reg_type_en"].startswith("Off-Plan") else "ready"
                kept += 1
                scopes = ["dubai"]
                slug = community_of(r["area_name_en"], r["master_project_en"])
                if slug:
                    scopes.append(slug)
                for s in scopes:
                    b = buckets[(s, key)]
                    b[0].append(price)
                    b[1].append(psf)
                    if key in last4:
                        for seg in ((s, kind, reg), (s, "all", "all"), (s, "all", reg), (s, kind, "all")):
                            segments[seg][0].append(price)
                            segments[seg][1].append(psf)
                    if key in prev4:
                        p = segments[(s, "prev", "all")]
                        p[0].append(price)
                        p[1].append(psf)

    quarters = []
    y, q = FIRST_YEAR, 1
    while (y, q) <= last_key:
        quarters.append((y, q))
        q += 1
        if q == 5:
            y, q = y + 1, 1

    def scope_block(s):
        series = []
        for key in quarters:
            prices, psf = buckets.get((s, key), ([], []))
            series.append({"q": f"{key[0]}-Q{key[1]}", **summarise(prices, psf)})
        seg = {}
        for kind in ("all", "apartment", "villa"):
            for reg in ("all", "ready", "off-plan"):
                prices, psf = segments.get((s, kind, reg), ([], []))
                seg[f"{kind}:{reg}"] = summarise(prices, psf)
        prev = summarise(*segments.get((s, "prev", "all"), ([], [])))
        now = seg["all:all"]
        change = None
        if now["medianPsf"] and prev["medianPsf"]:
            change = round((now["medianPsf"] / prev["medianPsf"] - 1) * 100, 1)
        off = seg["all:off-plan"]["sales"]
        return {
            "quarters": series,
            "last12": {**now, "previous12MedianPsf": prev["medianPsf"], "changePct": change, "offPlanShare": round(off / now["sales"] * 100) if now["sales"] else None},
            "segments": seg,
        }

    data = {
        "snapshot": snapshot.isoformat(),
        "firstQuarter": f"{FIRST_YEAR}-Q1",
        "lastQuarter": f"{last_y}-Q{last_q}",
        "last12From": f"{last4[-1][0]}-Q{last4[-1][1]}",
        "minSales": MIN_SALES,
        "rowsRead": rows,
        "salesUsed": kept,
        "dubai": scope_block("dubai"),
        "areas": {slug: scope_block(slug) for slug in COMMUNITIES},
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=1))
    print(f"read {rows:,} rows, used {kept:,} residential sales, quarters {data['firstQuarter']}..{data['lastQuarter']}")
    for slug, block in data["areas"].items():
        l = block["last12"]
        print(f"  {slug:26} sales12 {l['sales']:>6}  median psf {l['medianPsf']}  change {l['changePct']}%  off-plan {l['offPlanShare']}%")
    l = data["dubai"]["last12"]
    print(f"  {'dubai':26} sales12 {l['sales']:>6}  median psf {l['medianPsf']}  change {l['changePct']}%  off-plan {l['offPlanShare']}%")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
