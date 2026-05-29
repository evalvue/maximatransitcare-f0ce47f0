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
    { to: "/why-choose-us", label: t("nav.why") },
    { to: "/testimonials", label: t("nav.testimonials") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container-pro flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Maxima Transit Care" className="h-14 w-auto" width={56} height={56} />
          <div className="hidden sm:block leading-tight">
            <div className="font-extrabold text-[color:var(--brand-red)] text-lg">Maxima</div>
            <div className="text-xs font-semibold text-[color:var(--brand-blue)] -mt-0.5">Transit Care</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-[color:var(--brand-red)] transition-colors rounded-md"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-[color:var(--brand-red)] rounded-md" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a href="tel:+18005551234" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-blue)] hover:text-[color:var(--brand-red)] transition-colors">
            <Phone className="h-4 w-4" /> (800) 555-1234
          </a>
          <Link to="/booking" className="btn-primary hover:btn-primary-hover text-sm">
            <Calendar className="h-4 w-4" /> {t("cta.book")}
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher compact />
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-pro py-4 flex flex-col gap-1">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md font-medium hover:bg-secondary">
                {n.label}
              </Link>
            ))}
            <a href="tel:+18005551234" className="px-3 py-2.5 font-semibold text-[color:var(--brand-blue)] flex items-center gap-2">
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
