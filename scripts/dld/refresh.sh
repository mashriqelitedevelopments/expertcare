#!/bin/sh
# Refresh the Dubai property price pages from the latest DLD open data snapshot.
#   sh scripts/dld/refresh.sh [/path/to/download/folder]
# Downloads every CSV part of the Real Estate Transactions dataset (Data.Dubai, dataset 470061;
# no key needed), then rebuilds lib/data/market.json. Signed links expire 600 seconds after the
# listing is fetched, so the listing is fetched again before each part. The snapshot date is read
# from the file names.
set -eu
DIR="${1:-${TMPDIR:-/tmp}/dld-transactions}"
LIST="https://data.dubai/o/dda/data-services/dataset-download?datasetId=470061"
mkdir -p "$DIR"

# Prints "<count> <snapshot>" for no argument, or the fresh URL of part N.
part() {
  curl -s --fail --max-time 60 "$LIST" | python3 -c '
import json, sys
meta = json.load(sys.stdin)["data"]["metadata"]
files = [f for m in meta for f in m["files"] if f["file_name"].endswith(".csv.gz")]
if len(sys.argv) > 1:
    print(files[int(sys.argv[1]) - 1]["file_url"])
else:
    print(len(files), files[0]["file_name"].split("_")[1])
' "$@"
}

set -- $(part)
COUNT=$1
SNAPSHOT=$2
echo "$COUNT parts, snapshot $SNAPSHOT"
rm -f "$DIR"/part*.csv.gz
n=1
while [ "$n" -le "$COUNT" ]; do
  curl -s --fail --max-time 1800 -o "$DIR/part$n.csv.gz" "$(part "$n")"
  echo "part$n: $(wc -c < "$DIR/part$n.csv.gz") bytes"
  n=$((n + 1))
done
python3 "$(dirname "$0")/build-market.py" "$DIR" "$SNAPSHOT"
