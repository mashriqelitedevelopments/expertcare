/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: plain files on any host, fastest possible first byte for search.
  output: "export",
  // NEXT_DIST_DIR=.next-build lets a production build run while the dev server holds .next;
  // with output: "export" the exported site is then written inside that folder.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
