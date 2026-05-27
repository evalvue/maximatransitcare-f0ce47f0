import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Timer, Users, ShieldCheck, DollarSign, BadgeCheck, Lock, FileCheck, MapPin } from "lucide-react";
import { PageHero, Section } from "@/components/Section";
import { CTABand } from "@/components/CTABand";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Us — Maxima Transit Care" },
      { name: "description", content: "24/7 availability, on-time pickup, HIPAA compliance, Medicaid accepted, GPS tracking — discover why thousands trust Maxima Transit Care." },
      { property: "og:title", content: "Why Choose Maxima Transit Care" },
      { property: "og:description", content: "The most trusted NEMT provider — here's why." },
    ],
  }),
  component: WhyPage,
});

const reasons = [
  { icon: Clock, title: "24/7 Availability", desc: "Day or night, weekends or holidays — we're here when you need us." },
  { icon: Timer, title: "On-Time Pickup", desc: "Punctuality is our promise. Live ETA updates with every booking." },
  { icon: Users, title: "Professional Drivers", desc: "CPR certified, background-checked, and trained in passenger care." },
  { icon: ShieldCheck, title: "Safe & Secure", desc: "Modern, sanitized vehicles with safety equipment for every passenger." },
  { icon: DollarSign, title: "Affordable Rates", desc: "Transparent pricing with no hidden fees — ever." },
  { icon: BadgeCheck, title: "Medicaid Accepted", desc: "We work with most Medicaid plans and major insurance providers." },
  { icon: FileCheck, title: "Fully Insured", desc: "Comprehensive liability and vehicle coverage for total peace of mind." },
  { icon: Lock, title: "HIPAA Compliant", desc: "Patient privacy is built into every step of our operations." },
  { icon: MapPin, title: "Live GPS Tracking", desc: "Track your ride in real time and share ETAs with loved ones." },
];

function WhyPage() {
  return (
    <>
      <PageHero title="Why Choose Maxima Transit Care" subtitle="Nine reasons families, hospitals, and care facilities trust us with their most important passengers." />
      <Section>
        <div className="container-pro grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-7 rounded-3xl bg-white border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[color:var(--brand-red)] to-[color:var(--brand-blue)] text-white flex items-center justify-center mb-4">
                <r.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)]">{r.title}</h3>
              <p className="mt-2 text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      <CTABand />
      <div className="h-16" />
    </>
  );
}
