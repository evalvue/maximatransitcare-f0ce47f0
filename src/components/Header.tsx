import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Calendar } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container-pro flex items-center justify-between gap-4 h-20">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Maxima Transit Care" className="h-12 w-12 md:h-14 md:w-14 object-contain" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-extrabold text-[color:var(--brand-red)] text-lg md:text-xl tracking-tight">Maxima</span>
            <span className="text-[11px] md:text-xs font-semibold text-[color:var(--brand-blue)] uppercase tracking-wider -mt-0.5">Transit Care</span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1.5 flex-1 justify-center">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3.5 py-2 text-[13px] font-semibold rounded-full border border-[color:var(--brand-blue)]/15 text-[color:var(--brand-blue)] bg-white hover:bg-[color:var(--brand-blue)] hover:text-white hover:border-[color:var(--brand-blue)] hover:shadow-md transition-all duration-200"
              activeProps={{ className: "px-3.5 py-2 text-[13px] font-semibold rounded-full bg-[color:var(--brand-red)] text-white border border-[color:var(--brand-red)] shadow-md hover:bg-[color:var(--brand-red)] hover:text-white hover:border-[color:var(--brand-red)]" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <LanguageSwitcher />
          <a href="tel:+18005551234" className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-blue)] hover:text-[color:var(--brand-red)] transition-colors">
            <Phone className="h-4 w-4" /> (800) 555-1234
          </a>
          <Link to="/booking" className="btn-primary hover:btn-primary-hover text-sm !py-2.5 !px-5">
            <Calendar className="h-4 w-4" /> {t("cta.book")}
          </Link>
        </div>

        <div className="xl:hidden flex items-center gap-2">
          <LanguageSwitcher compact />
          <button className="p-2 rounded-md hover:bg-secondary transition-colors" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-white">
          <div className="container-pro py-4 flex flex-col gap-1.5">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-full font-semibold text-sm border border-[color:var(--brand-blue)]/15 text-[color:var(--brand-blue)] hover:bg-[color:var(--brand-blue)] hover:text-white transition-all"
                activeProps={{ className: "px-4 py-2.5 rounded-full font-semibold text-sm bg-[color:var(--brand-red)] text-white border border-[color:var(--brand-red)] shadow-md" }}
                activeOptions={{ exact: n.to === "/" }}>
                {n.label}
              </Link>
            ))}
            <a href="tel:+18005551234" className="px-4 py-2.5 font-semibold text-[color:var(--brand-blue)] flex items-center gap-2">
              <Phone className="h-4 w-4" /> (800) 555-1234
            </a>
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary mt-2">
              <Calendar className="h-4 w-4" /> {t("cta.book")}
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
