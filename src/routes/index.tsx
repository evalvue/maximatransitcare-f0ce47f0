import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, Calendar, ShieldCheck, Clock, Award, HeartPulse, MapPin, Star, CheckCircle2 } from "lucide-react";
import hero from "@/assets/hero.jpg";
import fleetWheel from "@/assets/fleet-wheelchair.jpg";
import fleetMed from "@/assets/fleet-medical.jpg";
import fleetAmb from "@/assets/fleet-ambulance.jpg";
import { Section, SectionHeader } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABand } from "@/components/CTABand";
import { services } from "@/data/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maxima Transit Care — Safe NEMT Transportation USA" },
      { name: "description", content: "Professional non-emergency medical transportation: wheelchair, ambulatory, dialysis, hospital discharge, and stretcher services across the United States." },
      { property: "og:title", content: "Maxima Transit Care — NEMT Services" },
      { property: "og:description", content: "Safe & reliable medical transport across the USA. Book in 2 minutes." },
    ],
  }),
  component: HomePage,
});

const trustStats = [
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Award, label: "Licensed & Insured" },
  { icon: HeartPulse, label: "CPR Certified Drivers" },
  { icon: Clock, label: "24/7 Availability" },
];

const whyUs = [
  "24/7 Availability", "On-Time Pickup", "Professional Drivers", "Safe & Secure",
  "Affordable Rates", "Medicaid Accepted", "Fully Insured", "Live GPS Tracking", "HIPAA Compliant",
];

const areas = ["California", "Texas", "Florida", "New York", "Illinois", "Pennsylvania", "Ohio", "Georgia", "Arizona", "North Carolina", "Michigan", "Washington"];

const testimonials = [
  { name: "Sarah Miller", role: "Daughter of patient", text: "Maxima made my mother's dialysis trips stress-free. Drivers are kind, on-time, and incredibly professional." },
  { name: "Dr. James Patel", role: "Hospital Coordinator", text: "Reliable hospital discharge transport every single time. Our patients feel safe and cared for." },
  { name: "Linda Garcia", role: "Senior client", text: "I rely on them weekly for doctor visits. They treat me like family — I couldn't ask for better service." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <img src={hero} alt="Medical transport" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container-pro relative py-20 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="h-2 w-2 rounded-full bg-[color:var(--brand-red)] animate-pulse" />
              Trusted Nationwide NEMT Provider
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05]">
              Safe & Reliable <span className="text-[color:var(--brand-red)]">Non-Emergency</span> Medical Transportation
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl">
              Professional wheelchair, ambulatory, dialysis, hospital discharge, and stretcher transportation services across the United States.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="btn-primary hover:btn-primary-hover">
                <Calendar className="h-5 w-5" /> Book A Ride
              </Link>
              <a href="tel:+18005551234" className="btn-outline-white hover:bg-white/10">
                <Phone className="h-5 w-5" /> Call Now: (800) 555-1234
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {trustStats.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-sm">
                  <s.icon className="h-5 w-5 text-[color:var(--brand-red)]" />
                  <span className="font-semibold">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED */}
      <Section className="bg-[color:var(--background)]">
        <div className="container-pro grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--brand-red)] mb-3">Trusted Healthcare Transportation</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[color:var(--brand-blue-deep)]">
              A team that treats every passenger like family.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              For years, Maxima Transit Care has delivered compassionate, on-time non-emergency medical transportation. Our HIPAA-trained drivers, sanitized fleet, and live GPS tracking give families peace of mind every mile of the way.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {["HIPAA-compliant operations","Background-checked drivers","Sanitized vehicles","Insurance & Medicaid billing"].map(item => (
                <li key={item} className="flex items-start gap-2 text-foreground/80">
                  <CheckCircle2 className="h-5 w-5 text-[color:var(--brand-red)] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-secondary mt-8 hover:opacity-90">Learn About Us</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4">
            <img src={fleetWheel} alt="Wheelchair van interior" className="rounded-3xl aspect-square object-cover shadow-[var(--shadow-card)]" loading="lazy" width={1024} height={768} />
            <img src={fleetMed} alt="Medical transport van" className="rounded-3xl aspect-square object-cover shadow-[var(--shadow-card)] mt-8" loading="lazy" width={1024} height={768} />
          </motion.div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="bg-secondary/40">
        <div className="container-pro">
          <SectionHeader eyebrow="Our Services" title="Complete medical transport solutions" subtitle="From routine appointments to long-distance medical transfers, we've got every passenger covered." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-secondary hover:opacity-90">View All Services</Link>
          </div>
        </div>
      </Section>

      {/* WHY US */}
      <Section>
        <div className="container-pro">
          <SectionHeader eyebrow="Why Maxima" title="Why families choose Maxima Transit Care" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((w, i) => (
              <motion.div key={w} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-border shadow-[var(--shadow-card)] hover:border-[color:var(--brand-red)]/40 transition">
                <div className="h-12 w-12 rounded-xl bg-[color:var(--brand-blue)]/10 text-[color:var(--brand-blue)] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <span className="font-semibold text-foreground">{w}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FLEET */}
      <Section className="bg-[color:var(--brand-blue-deep)] text-white">
        <div className="container-pro">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--brand-red)] mb-3">Our Fleet</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">Clean, sanitized, GPS-tracked vehicles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: fleetWheel, name: "Wheelchair Vans", desc: "Hydraulic lifts, secure tie-downs, spacious cabins." },
              { img: fleetMed, name: "Medical Transport Vans", desc: "Comfortable ambulatory rides with trained drivers." },
              { img: fleetAmb, name: "Ambulance-Style Vehicles", desc: "Stretcher-equipped vehicles for non-emergency transfers." },
            ].map((v, i) => (
              <motion.div key={v.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-[color:var(--brand-red)]/50 transition group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={v.img} alt={v.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={1024} height={768} />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg">{v.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/fleet" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red)]/90 font-bold transition">Explore Our Fleet</Link>
          </div>
        </div>
      </Section>

      {/* SERVICE AREAS */}
      <Section>
        <div className="container-pro">
          <SectionHeader eyebrow="Service Areas" title="Coast-to-coast coverage" subtitle="Serving major metro areas and rural communities across the United States." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {areas.map(a => (
              <div key={a} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-border hover:border-[color:var(--brand-red)]/40 shadow-sm transition">
                <MapPin className="h-4 w-4 text-[color:var(--brand-red)]" />
                <span className="text-sm font-semibold">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="bg-secondary/40">
        <div className="container-pro">
          <SectionHeader eyebrow="Testimonials" title="What our riders & families say" />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-7 rounded-3xl border border-border shadow-[var(--shadow-card)]">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-5 w-5 fill-[color:var(--brand-red)] text-[color:var(--brand-red)]" />)}
                </div>
                <p className="text-foreground/85 leading-relaxed">"{t.text}"</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="font-bold text-[color:var(--brand-blue-deep)]">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* INSURANCE */}
      <Section>
        <div className="container-pro">
          <div className="rounded-3xl bg-gradient-to-br from-secondary to-white p-10 md:p-14 border border-border text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--brand-red)]">Insurance & Medicaid</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[color:var(--brand-blue-deep)]">We accept most major insurance and Medicaid plans</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">No upfront paperwork stress — our billing team works directly with your provider so you can focus on care.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Medicaid","Medicare Advantage","Veterans Affairs","Private Insurance","Workers' Comp","Self-Pay"].map(x => (
                <span key={x} className="px-5 py-2.5 rounded-full bg-white border border-border font-semibold text-sm">{x}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
      <div className="h-16" />
    </>
  );
}
