import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/Section";
import { CTABand } from "@/components/CTABand";
import { motion } from "framer-motion";

export const Route = createFileRoute("/service-areas")({
  head: () => ({
    meta: [
      { title: "Service Areas — Maxima Transit Care" },
      { name: "description", content: "Nationwide non-emergency medical transportation. Serving all 50 states across the United States." },
      { property: "og:title", content: "Service Areas — Nationwide NEMT" },
      { property: "og:description", content: "Coast-to-coast medical transportation coverage." },
    ],
  }),
  component: AreasPage,
});

const states = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

function AreasPage() {
  return (
    <>
      <PageHero title="Service Areas" subtitle="Maxima Transit Care provides non-emergency medical transportation in all 50 U.S. states — from major metro hubs to rural communities." />
      <Section>
        <div className="container-pro">
          <SectionHeader eyebrow="Nationwide Coverage" title="Serving all 50 states" subtitle="Wherever you need to go, we'll get you there safely." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {states.map((s, i) => (
              <motion.div key={s} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.01 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-border hover:border-[color:var(--brand-red)]/40 hover:shadow-[var(--shadow-card)] transition">
                <MapPin className="h-4 w-4 text-[color:var(--brand-red)] shrink-0" />
                <span className="text-sm font-semibold">{s}</span>
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
