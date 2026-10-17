/**
 * The export strips the lang and dir attributes from the document rendered by
 * app/global-not-found.tsx, because it renders its own <html>. Put them back, in the FIRST
 * <html> tag of each exported 404 file only.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = process.env.NEXT_DIST_DIR || ".next";
const files = ["404.html", join("404", "index.html")];
let fixed = 0;

for (const rel of files) {
  const file = join(dist, rel);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  if (/<html[^>]*\slang=/.test(html)) continue;
  const patched = html.replace("<html", '<html lang="en-AE" dir="ltr"');
  if (patched !== html) {
    writeFileSync(file, patched);
    fixed += 1;
  }
}

console.log(`postbuild: lang restored in ${fixed} 404 file(s)`);
