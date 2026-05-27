import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Wifi, Sparkles, ShieldCheck, Accessibility, Activity } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/Section";
import { CTABand } from "@/components/CTABand";
import fleetWheel from "@/assets/fleet-wheelchair.jpg";
import fleetMed from "@/assets/fleet-medical.jpg";
import fleetAmb from "@/assets/fleet-ambulance.jpg";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Our Fleet — Maxima Transit Care" },
      { name: "description", content: "Sanitized, GPS-tracked wheelchair vans, medical transport vehicles, and ambulance-style vehicles." },
      { property: "og:title", content: "Our Medical Transport Fleet" },
      { property: "og:description", content: "Clean, modern, GPS-tracked vehicles built for safe medical transport." },
    ],
  }),
  component: FleetPage,
});

const fleet = [
  { img: fleetWheel, name: "Wheelchair Vans", icon: Accessibility, features: ["Hydraulic lift", "Secure tie-downs", "Spacious cabin", "ADA compliant"] },
  { img: fleetMed, name: "Medical Transport Vans", icon: Activity, features: ["Comfortable seating", "Climate controlled", "Trained driver", "Companion seating"] },
  { img: fleetAmb, name: "Ambulance-Style Vehicles", icon: Activity, features: ["Stretcher equipped", "Oxygen ready", "EMT-trained driver", "Monitoring equipment"] },
];

const features = [
  { icon: MapPin, title: "Live GPS Tracking", desc: "Real-time vehicle location for families and facilities." },
  { icon: Sparkles, title: "Sanitized Fleet", desc: "Hospital-grade disinfection between every passenger." },
  { icon: Wifi, title: "Modern Technology", desc: "Digital dispatch, ETA updates, and contactless billing." },
  { icon: ShieldCheck, title: "Safety First", desc: "Regular maintenance, inspections, and certified drivers." },
];

function FleetPage() {
  return (
    <>
      <PageHero title="Our Fleet" subtitle="Modern, sanitized, GPS-tracked vehicles purpose-built for safe and comfortable non-emergency medical transport." />
      <Section>
        <div className="container-pro grid md:grid-cols-3 gap-6">
          {fleet.map((f, i) => (
            <motion.div key={f.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden bg-white border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={f.img} alt={f.name} className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" width={1024} height={768} />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-[color:var(--brand-blue)] text-white flex items-center justify-center">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)]">{f.name}</h3>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {f.features.map(x => (
                    <li key={x} className="flex items-center gap-2 text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)]" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <Section className="bg-secondary/40">
        <div className="container-pro">
          <SectionHeader eyebrow="Fleet Standards" title="Built for safety, comfort, and trust" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-3xl bg-white border border-border text-center">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)] flex items-center justify-center mb-4">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-[color:var(--brand-blue-deep)]">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
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
