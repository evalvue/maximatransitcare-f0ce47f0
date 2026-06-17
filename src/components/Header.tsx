import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Calendar, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { useT } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useT();

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/fleet", label: t("nav.fleet") },
    { to: "/service-areas", label: t("nav.areas") },
    { to: "/language-services", label: t("nav.languages") },
    { to: "/why-choose-us", label: t("nav.why") },
    { to: "/testimonials", label: t("nav.testimonials") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const navLinkClass =
    "inline-flex items-center justify-center rounded-full border border-transparent px-3 py-2 text-[12px] xl:text-[13px] font-bold text-[color:var(--brand-blue)] transition-all duration-200 hover:border-[color:var(--brand-blue)] hover:bg-[color:var(--brand-blue)] hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-red)] whitespace-nowrap";
  const activeNavLinkClass =
    "inline-flex items-center justify-center rounded-full border border-[color:var(--brand-red)] bg-[color:var(--brand-red)] px-3 py-2 text-[12px] xl:text-[13px] font-bold text-white shadow-md whitespace-nowrap";
  const mobileNavLinkClass =
    "flex items-center rounded-xl border border-transparent px-4 py-3 text-sm font-bold text-[color:var(--brand-blue)] transition-all hover:border-[color:var(--brand-blue)] hover:bg-[color:var(--brand-blue)] hover:text-white";
  const activeMobileNavLinkClass =
    "flex items-center rounded-xl border border-[color:var(--brand-red)] bg-[color:var(--brand-red)] px-4 py-3 text-sm font-bold text-white shadow-md";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-sm backdrop-blur-md">
      {/* Top utility bar */}
      <div className="hidden bg-[color:var(--brand-blue)] text-xs text-white md:block">
        <div className="container-pro flex h-9 items-center justify-between">
          <span className="font-medium opacity-90">24/7 Non-Emergency Medical Transportation across the USA</span>
          <div className="flex items-center gap-4">
            <a href="tel:+18005551234" className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-[color:var(--brand-red)]">
              <Phone className="h-3.5 w-3.5" /> (800) 555-1234
            </a>
            <a href="mailto:info@maximatransitcare.com" className="hidden items-center gap-1.5 font-medium opacity-90 hover:opacity-100 lg:inline-flex">
              <Mail className="h-3.5 w-3.5" />
              info@maximatransitcare.com
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-pro flex min-h-20 items-center justify-between gap-3 py-3">
        <Link to="/" onClick={() => setOpen(false)} className="group flex min-w-0 shrink-0 items-center gap-3">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[color:var(--brand-red)]/20 bg-white shadow-sm md:h-16 md:w-16">
            <div className="absolute inset-0 rounded-full bg-[color:var(--brand-red)]/10 blur-md transition-all group-hover:bg-[color:var(--brand-red)]/20" />
            <img src={logo} alt="Maxima Transit Care" className="relative h-11 w-11 object-contain md:h-12 md:w-12" />
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="text-lg font-extrabold text-[color:var(--brand-red)] md:text-xl">Maxima</span>
            <span className="text-[10px] font-bold uppercase text-[color:var(--brand-blue)] md:text-[11px]">Transit Care</span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={navLinkClass}
              activeProps={{ className: activeNavLinkClass }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Link to="/booking" className="btn-primary text-sm hover:btn-primary-hover !px-5 !py-2.5">
            <Calendar className="h-4 w-4" /> {t("cta.book")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-[color:var(--brand-blue)] transition-colors hover:bg-secondary"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white shadow-lg lg:hidden">
          <div className="container-pro flex flex-col gap-1.5 py-4">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className={mobileNavLinkClass}
                activeProps={{ className: activeMobileNavLinkClass }}
                activeOptions={{ exact: n.to === "/" }}>
                {n.label}
              </Link>
            ))}
            <a href="tel:+18005551234" className="flex items-center gap-2 px-4 py-3 font-bold text-[color:var(--brand-blue)]">
              <Phone className="h-4 w-4" /> (800) 555-1234
            </a>
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              <Calendar className="h-4 w-4" /> {t("cta.book")}
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
