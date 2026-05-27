import { Link } from "@tanstack/react-router";
import { Phone, Calendar } from "lucide-react";

export function CTABand() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-pro">
        <div className="relative rounded-3xl bg-gradient-to-br from-[color:var(--brand-red)] to-[color:var(--brand-blue)] p-8 md:p-14 text-white shadow-[var(--shadow-elegant)] overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-white/80">Need a ride today?</p>
              <h3 className="mt-2 text-2xl md:text-4xl font-extrabold">Book your medical transport in under 2 minutes.</h3>
              <p className="mt-2 text-white/85">Available 24/7 across the United States. Insurance and Medicaid accepted.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/booking" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[color:var(--brand-blue-deep)] font-bold hover:scale-105 transition-transform">
                <Calendar className="h-5 w-5" /> Book A Ride
              </Link>
              <a href="tel:+18005551234" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/70 text-white font-bold hover:bg-white/10 transition">
                <Phone className="h-5 w-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
