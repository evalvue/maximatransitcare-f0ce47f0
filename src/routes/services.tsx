import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABand } from "@/components/CTABand";
import { services } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Maxima Transit Care NEMT" },
      { name: "description", content: "Wheelchair, ambulatory, stretcher, dialysis, hospital discharge, senior, and long-distance medical transportation services." },
      { property: "og:title", content: "Our NEMT Services" },
      { property: "og:description", content: "Complete non-emergency medical transportation services across the United States." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero title="Our Services" subtitle="Specialized non-emergency medical transportation for every need — from a single appointment to recurring dialysis schedules." />
      <Section>
        <div className="container-pro grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </Section>
      <CTABand />
      <div className="h-16" />
    </>
  );
}
