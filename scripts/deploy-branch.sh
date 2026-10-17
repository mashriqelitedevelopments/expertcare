#!/bin/sh
# Builds the static site and publishes it to the `hostinger` branch of this repo: plain HTML,
# CSS, JS and images at the branch root, which Hostinger's Git deployment clones straight into
# public_html. Run from the repo root after committing to main:  sh scripts/deploy-branch.sh
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"
NEXT_DIST_DIR=.next-deploy npx next build
WORK=$(mktemp -d)
git worktree add --detach "$WORK" >/dev/null 2>&1 || { rm -rf "$WORK"; exit 1; }
cd "$WORK"
git checkout -q --orphan hostinger
git rm -rfq . >/dev/null 2>&1 || true
rsync -a --exclude 'index.txt' "$ROOT/.next-deploy/" ./
cat > .htaccess <<'HT'
# Static Next.js export on Apache: pretty URLs resolve to their folder, 404 is the exported page.
Options -Indexes
ErrorDocument 404 /404.html
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !/$
  RewriteRule ^(.*)$ /$1/ [R=301,L]
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
</IfModule>
AddType image/avif .avif
AddType font/woff2 .woff2
HT
git add -A
git -c user.name="ExpertCare deploy" -c user.email="deploy@expertcare.local" commit -qm "Static export of main $(git -C "$ROOT" rev-parse --short HEAD), built $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f origin hostinger
cd "$ROOT"
git worktree remove --force "$WORK"
rm -rf .next-deploy
echo "hostinger branch updated"
