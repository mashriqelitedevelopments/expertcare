"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart } from "./Icons";
import { Logo } from "./Mark";
import { getAreas, getServices } from "@/lib/content";
import { lp } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

/** An ink utility strip above a bone header that stays at the top of the page. */
export function Header({ locale, strip }: { locale: Locale; strip: string[] }) {
  const t = ui(locale);
  const raw = usePathname() || "/";
  const path = raw.length > 1 ? raw.replace(/\/$/, "") : raw;
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(0);

  useEffect(() => {
    const read = () => {
      try {
        const v = JSON.parse(localStorage.getItem("ec-shortlist") || "[]");
        setSaved(Array.isArray(v) ? v.length : 0);
      } catch {
        setSaved(0);
      }
    };
    read();
    window.addEventListener("ec-shortlist", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("ec-shortlist", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  useEffect(() => setOpen(false), [raw]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (href: string) => {
    const h = href.replace(/\/$/, "");
    return path === h || path.startsWith(`${h}/`) ? "page" : undefined;
  };
  const home = lp(locale, "/");

  return (
    <>
      <div className="top">
        <div className="wrap top-in">
          <div className="top-l">
            {strip.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className="top-r">
            {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>}
            {site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>}
            <Link href={lp(locale, "/about/")}>{t.footer.about}</Link>
            <Link href={lp(locale, "/faq/")}>{t.faq.crumb}</Link>
            <Link href={lp(locale, "/contact/")}>{t.footer.contact}</Link>
          </div>
        </div>
      </div>
      <header className={`hdr${open ? " is-open" : ""}`}>
        <div className="wrap hdr-in">
          <Link href={home} aria-label={t.chrome.homeAria}>
            <Logo />
          </Link>
          <nav className="hdr-nav" aria-label={t.chrome.mainNav}>
            {t.nav.map((n) => (
              <Link key={n.href} href={lp(locale, n.href)} aria-current={current(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hdr-right">
            <Link href={lp(locale, "/shortlist/")} className="hdr-saved" aria-label={`${t.chrome.shortlistAria}, ${saved} ${t.chrome.saved}`}>
              <Heart />
              <span className="hdr-saved-label">{t.chrome.shortlist}</span>
              {saved > 0 && <span className="count">{saved}</span>}
            </Link>
            <Link href={lp(locale, "/contact/")} className="btn hdr-cta">
              {t.chrome.adviser}
            </Link>
            <button type="button" className="hdr-menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
              <span className="burger" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="hdr-menu-label">{open ? t.chrome.close : t.chrome.menu}</span>
            </button>
          </div>
        </div>
        <div id="site-menu" className="menu ink" aria-hidden={!open} inert={!open}>
          <div className="wrap menu-in">
            <nav className="menu-main" aria-label={t.chrome.menuNav}>
              {[{ label: t.chrome.home, href: "/" }, ...t.nav, { label: t.footer.about, href: "/about/" }, { label: t.faq.crumb, href: "/faq/" }].map((n, i) => (
                <Link key={n.href} href={lp(locale, n.href)}>
                  <span className="menu-no">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="menu-side">
              <nav aria-labelledby="menu-services">
                <h2 id="menu-services">{t.services.crumb}</h2>
                <ul>
                  {getServices(locale).map((s) => (
                    <li key={s.slug}>
                      <Link href={lp(locale, servicePath(s.slug))}>{s.short}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-labelledby="menu-areas">
                <h2 id="menu-areas">{t.footer.areas}</h2>
                <ul>
                  {getAreas(locale).map((a) => (
                    <li key={a.slug}>
                      <Link href={lp(locale, `/areas/${a.slug}/`)}>{a.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="menu-cta">
                <Link href={lp(locale, "/contact/")} className="btn">
                  {t.chrome.adviser}
                </Link>
                <Link href={lp(locale, "/shortlist/")} className="btn btn-ghost">
                  {t.chrome.shortlist}
                  {saved > 0 && <span className="count">{saved}</span>}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
