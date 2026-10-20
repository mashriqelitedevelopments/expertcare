import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/Analytics";
import { ConsentNotice } from "@/components/Consent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { WhatsApp } from "@/components/WhatsApp";
import { orgLd, websiteLd } from "@/lib/orgLd";
import { JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

const LOCALE = "en" as const;
const t = ui(LOCALE);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: t.meta.homeTitle, template: `%s | ${site.name}` },
  description: t.meta.homeDesc,
  applicationName: site.name,
  robots: site.live ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#f4f4f1", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AE" dir="ltr">
      <head>
        <link rel="preload" href="/fonts/jakarta.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/urbanist.woff2" as="font" type="font/woff2" crossOrigin="" />
                <JsonLd data={orgLd} />
        <JsonLd data={websiteLd(LOCALE)} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="ExpertCare for AI assistants" />
      </head>
      <body>
        <a className="skip" href="#main">
          {t.chrome.skip}
        </a>
        <Header locale={LOCALE} />
        <main id="main">{children}</main>
        <Footer locale={LOCALE} />
        <WhatsApp locale={LOCALE} />
        <ConsentNotice locale={LOCALE} />
        <Analytics />
        <Reveal />
      </body>
    </html>
  );
}
