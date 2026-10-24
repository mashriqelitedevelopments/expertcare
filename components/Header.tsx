"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart } from "./Icons";
import { Logo } from "./Mark";
import { getAreas, getServices } from "@/lib/content";
import { lp } from "@/lib/i18n";
import { SHOW_LISTINGS } from "@/lib/listings";
import type { Locale } from "@/lib/locale";
import { servicePath } from "@/lib/paths";
import { ui } from "@/lib/ui";

/** Always in view: blurred glass that turns dark over photographs and dark sections, light over the page ground. The menu is a half-width light panel. */
export function Header({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const raw = usePathname() || "/";
  const path = raw.length > 1 ? raw.replace(/\/$/, "") : raw;
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  // The header is always in view; its glass follows what sits beneath it: dark over photographs
  // and dark sections, light over the page ground.
  useEffect(() => {
    const lum = (c: string) => {
      const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
      if (!m) return null;
      const a = m[4] === undefined ? 1 : +m[4];
      if (a < 0.4) return null;
      const [r, g, b] = [+m[1], +m[2], +m[3]].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    let pending = false;
    const read = () => {
      pending = false;
      setScrolled(window.scrollY > 24);
      const y = 76 + 6;
      const stack = document.elementsFromPoint(window.innerWidth / 2, y);
      let isDark = false;
      for (const el of stack) {
        if (el.closest(".hdr, nextjs-portal, .cons, .wa")) continue;
        if (el.matches("img, picture, video") || el.closest(".hero, .plate, .door-media, .atlas-media, .story-media, .tile-media")) {
          isDark = true;
          break;
        }
        const l = lum(getComputedStyle(el).backgroundColor);
        if (l !== null) {
          isDark = l < 0.2;
          break;
        }
      }
      setDark(isDark);
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(read);
      setTimeout(read, 80);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [raw]);

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
      <header className={["hdr", scrolled ? "is-scrolled" : "", open ? "is-open" : "", dark && !open ? "is-dark" : ""].filter(Boolean).join(" ")}>
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
            {SHOW_LISTINGS && (
            <Link href={lp(locale, "/shortlist/")} className="hdr-saved" aria-label={`${t.chrome.shortlistAria}, ${saved} ${t.chrome.saved}`}>
              <Heart />
              <span className="hdr-saved-label">{t.chrome.shortlist}</span>
              {saved > 0 && <span className="count">{saved}</span>}
            </Link>
            )}
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
        <div id="site-menu" className="menu" aria-hidden={!open} inert={!open}>
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
                {SHOW_LISTINGS && (
                <Link href={lp(locale, "/shortlist/")} className="btn btn-ghost">
                  {t.chrome.shortlist}
                  {saved > 0 && <span className="count">{saved}</span>}
                </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
