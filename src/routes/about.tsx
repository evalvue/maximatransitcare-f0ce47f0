import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Award, HeartPulse, Users, Target, Eye, Lock, BadgeCheck } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/Section";
import { CTABand } from "@/components/CTABand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Maxima Transit Care" },
      { name: "description", content: "Learn about Maxima Transit Care — HIPAA compliant, licensed & insured non-emergency medical transportation across the USA." },
      { property: "og:title", content: "About Maxima Transit Care" },
      { property: "og:description", content: "Our mission, vision, and commitment to compassionate medical transportation." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, title: "HIPAA Compliant", desc: "Patient privacy is at the core of everything we do — from dispatch to drop-off." },
  { icon: Award, title: "Licensed & Insured", desc: "Fully licensed nationwide with comprehensive liability and vehicle coverage." },
  { icon: HeartPulse, title: "CPR Certified Drivers", desc: "Every driver is CPR & First Aid certified, background-checked, and continuously trained." },
  { icon: Users, title: "Professional Staff", desc: "From dispatchers to attendants, our team is selected for compassion and reliability." },
  { icon: Lock, title: "Secure Operations", desc: "Vehicles equipped with GPS tracking and protocols for every passenger condition." },
  { icon: BadgeCheck, title: "Compassionate Care", desc: "We treat every passenger with the dignity, respect, and patience they deserve." },
];

function AboutPage() {
  return (
    <>
      <PageHero title="About Maxima Transit Care" subtitle="Driven by compassion. Built on trust. Serving patients across the United States with the highest standard of non-emergency medical transportation." />
      <Section>
        <div className="container-pro grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-[color:var(--brand-blue)] to-[color:var(--brand-blue-deep)] text-white">
            <Target className="h-10 w-10 text-[color:var(--brand-red)] mb-4" />
            <h2 className="text-3xl font-extrabold">Our Mission</h2>
            <p className="mt-4 text-white/85 leading-relaxed">
              To make healthcare accessible by providing safe, reliable, and compassionate non-emergency medical transportation — so no patient ever misses an appointment due to lack of a ride.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-white border border-border shadow-[var(--shadow-card)]">
            <Eye className="h-10 w-10 text-[color:var(--brand-red)] mb-4" />
            <h2 className="text-3xl font-extrabold text-[color:var(--brand-blue-deep)]">Our Vision</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To become the most trusted NEMT provider in the United States — known for punctuality, dignity, and the quality of care we deliver to every passenger, every trip.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <div className="container-pro">
          <SectionHeader eyebrow="Our Values" title="What sets us apart" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white p-7 rounded-3xl border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition">
                <div className="h-14 w-14 rounded-2xl bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)] flex items-center justify-center mb-4">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)]">{v.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      <CTABand />
      <div className="h-16" />
    </>
  );
}
