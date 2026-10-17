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
import { ui } from "@/lib/ui";

/** Solid ivory by default. Over a full-bleed hero (main's first child is .hero) the CSS turns it
 * transparent until the page scrolls, so pages without a hero never flash white type on ivory. */
export function Header({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const raw = usePathname() || "/";
  const path = raw.length > 1 ? raw.replace(/\/$/, "") : raw;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  const cls = ["hdr", scrolled ? "is-scrolled" : "", open ? "is-open" : ""].filter(Boolean).join(" ");
  const home = lp(locale, "/");

  return (
    <header className={cls}>
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
      <div id="site-menu" className="menu dark" aria-hidden={!open} inert={!open}>
        <div className="wrap menu-in">
          <nav className="menu-main" aria-label={t.chrome.menuNav}>
            {[{ label: t.chrome.home, href: "/" }, ...t.nav, { label: t.footer.about, href: "/about/" }].map((n, i) => (
              <Link key={n.href} href={lp(locale, n.href)} style={{ transitionDelay: `${90 + i * 45}ms` }}>
                <span className="menu-no">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="menu-side">
            <nav aria-labelledby="menu-services" style={{ transitionDelay: "260ms" }}>
              <h2 id="menu-services">{t.services.crumb}</h2>
              <ul>
                {getServices(locale).map((s) => (
                  <li key={s.slug}>
                    <Link href={lp(locale, servicePath(s.slug))}>{s.short}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-labelledby="menu-areas" style={{ transitionDelay: "340ms" }}>
              <h2 id="menu-areas">{t.footer.areas}</h2>
              <ul>
                {getAreas(locale).map((a) => (
                  <li key={a.slug}>
                    <Link href={lp(locale, `/areas/${a.slug}/`)}>{a.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="menu-cta" style={{ transitionDelay: "420ms" }}>
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
  );
}
