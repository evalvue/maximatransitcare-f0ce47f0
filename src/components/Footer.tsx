import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[color:var(--brand-blue-deep)] text-white/90 mt-20">
      <div className="container-pro py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Maxima Transit Care" className="h-14 w-auto bg-white rounded-xl p-1" width={56} height={56} loading="lazy" />
            <div>
              <div className="font-extrabold text-white text-lg leading-tight">Maxima Transit Care</div>
              <div className="text-xs text-white/70">NEMT Services</div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Safe, reliable, and compassionate non-emergency medical transportation across the United States.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="h-9 w-9 rounded-full bg-white/10 hover:bg-[color:var(--brand-red)] flex items-center justify-center transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[["/","Home"],["/about","About"],["/fleet","Fleet"],["/service-areas","Service Areas"],["/why-choose-us","Why Choose Us"],["/booking","Book A Ride"]].map(([to,l]) => (
              <li key={to}><Link to={to} className="hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {["Wheelchair Transport","Ambulatory Transport","Stretcher Transport","Dialysis Transport","Hospital Discharge","Senior Transport"].map(s => (
              <li key={s}><Link to="/services" className="hover:text-white">{s}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-[color:var(--brand-red)]" /> <a href="tel:+18005551234">(800) 555-1234</a></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-[color:var(--brand-red)]" /> <a href="mailto:info@maximatransitcare.com">info@maximatransitcare.com</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[color:var(--brand-red)]" /> 123 Healthcare Blvd, USA</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 text-[color:var(--brand-red)]" /> 24/7 Availability</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-pro py-5 text-xs text-white/60 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Maxima Transit Care. All rights reserved.</p>
          <p>HIPAA Compliant • Licensed & Insured</p>
        </div>
      </div>
    </footer>
  );
}
