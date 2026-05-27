import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { PageHero, Section } from "@/components/Section";
import { CTABand } from "@/components/CTABand";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Maxima Transit Care" },
      { name: "description", content: "Real stories from patients, families, and healthcare partners who trust Maxima Transit Care." },
      { property: "og:title", content: "Patient & Family Testimonials" },
      { property: "og:description", content: "See why families across the USA trust Maxima Transit Care." },
    ],
  }),
  component: TestimonialsPage,
});

const items = [
  { name: "Sarah Miller", role: "Daughter of patient", text: "Maxima made my mother's dialysis trips stress-free. Drivers are kind, on-time, and incredibly professional. I never worry when she's with them." },
  { name: "Dr. James Patel", role: "Hospital Discharge Coordinator", text: "Reliable hospital discharge transport every single time. Our patients feel safe and cared for from the moment they leave our facility." },
  { name: "Linda Garcia", role: "Senior client", text: "I rely on them weekly for doctor visits. They treat me like family — patient, kind, and always punctual. I couldn't ask for better service." },
  { name: "Marcus Johnson", role: "Veteran", text: "From my VA appointments to physical therapy, Maxima has been a lifesaver. Clean vehicles, respectful drivers, smooth booking." },
  { name: "Emily Thompson", role: "Caregiver", text: "Booking is effortless and the live GPS tracking gives our family real peace of mind during long medical transfers." },
  { name: "Robert Chen", role: "Dialysis patient", text: "Three times a week for two years — never once late. The drivers know me by name. This level of care is rare." },
];

function TestimonialsPage() {
  return (
    <>
      <PageHero title="What Our Riders Say" subtitle="Real stories of trust, care, and reliability from the families and patients we serve every day." />
      <Section>
        <div className="container-pro grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative bg-white p-8 rounded-3xl border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-[color:var(--brand-red)]/15" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-[color:var(--brand-red)] text-[color:var(--brand-red)]" />)}
              </div>
              <p className="text-foreground/85 leading-relaxed">"{t.text}"</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="font-bold text-[color:var(--brand-blue-deep)]">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <CTABand />
      <div className="h-16" />
    </>
  );
}
