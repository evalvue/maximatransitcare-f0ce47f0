import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Languages, Phone, FileText, Mic, Gavel, Award, Stethoscope, CheckCircle2, Globe2, ArrowRight,
} from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/Section";
import { CTABand } from "@/components/CTABand";

export const Route = createFileRoute("/language-services")({
  head: () => ({
    meta: [
      { title: "Language Services — Maxima Transit Care" },
      { name: "description", content: "Professional interpretation and translation services in 200+ languages — On-Site, OPI, ASL, Document Translation, and Court Certified Interpreters." },
      { property: "og:title", content: "Language Services — Maxima Transit Care" },
      { property: "og:description", content: "On-Site & Over-the-Phone interpretation in 200+ languages, document translation, ASL, and court certified interpreters." },
    ],
  }),
  component: LanguageServicesPage,
});

const offerings = [
  { icon: Globe2, title: "On-Site Interpretation", desc: "In-person interpreters dispatched to your appointment, deposition, or evaluation." },
  { icon: Phone, title: "Over-the-Phone Interpretation", desc: "200+ languages on demand with a free digital copy of the recording." },
  { icon: FileText, title: "Document Translation", desc: "Fast, accurate translations delivered by our experienced certified translators." },
  { icon: Languages, title: "American Sign Language", desc: "Qualified ASL interpreters for medical, legal, and educational settings." },
  { icon: Gavel, title: "Court Certified Interpreters", desc: "Court certified language professionals available whenever required." },
  { icon: Mic, title: "Recorded Statements & Transcription", desc: "Recorded statements with transcription in client-specific format within 48 hours." },
];

const certifications = [
  "American Translators Association",
  "Registry of Interpreters for the Deaf",
  "California Court Certified Interpreters",
  "CMI — Certified Medical Interpreters",
  "CCHI — California Certified Interpreters",
  "ATA — Certification for Written Translations",
  "NAJIT — Legal Certified Interpreters",
];

const appointments = [
  "IMEs — Independent Medical Evaluations",
  "QMEs — Qualified Medical Evaluations",
  "FCEs — Functional Capacity Exams",
  "Depositions / Mediations / Trials",
  "Medical Appointments",
  "Psychiatric Evaluations",
  "Physical Therapy",
  "Case Manager Assessments",
];

const languages = [
  "Afrikaans","Albanian","Amharic","Arabic (Egyptian Spoken)","Arabic (Levantine)","Arabic (Modern Standard)",
  "Arabic (Moroccan Spoken)","Arabic (Overview)","Aramaic","Armenian","Bengali","Bosnian","Bulgarian","Burmese",
  "Cantonese","Catalan","Chechen","Cherokee","Croatian","Czech","Dakota","Danish","Dutch","French","Georgian",
  "German","Greek","Guarani","Gujarati","Haitian Creole","Hawaiian","Hawaiian Creole","Hebrew","Hindi","Hungarian",
  "Igbo","Ilocano","Indonesian (Bahasa Indonesia)","Inuit/Inupiaq","Irish Gaelic","Italian","Japanese","Jarai",
  "Javanese","K’iche’","Khmer","Korean","Kurdish","Kyrgyz","Lao","Latin","Latvian","Lingala","Lithuanian",
  "Macedonian","Maithili","Malagasy","Malay (Bahasa Melayu)","Malayalam","Mandarin (Chinese)","Marathi","Mende",
  "Mongolian","Nahuatl","Navajo","Nepali","Norwegian","Romanian","Russian","Rwanda","Samoan","Sanskrit","Serbian",
  "Sindhi","Slovak","Slovene","Somali","Spanish","Swahili","Swedish","Tachelhit","Tagalog","Tajiki","Tamil","Tatar",
].sort((a, b) => a.localeCompare(b));

function LanguageServicesPage() {
  return (
    <>
      <PageHero
        title="Language Services"
        subtitle="At Maxima Transit Care we understand the power of communication. Reduce breakdowns between claimants and physicians with our 200+ language interpretation and translation network."
      />

      <Section>
        <div className="container-pro">
          <SectionHeader
            eyebrow="What We Offer"
            title="Interpretation & Translation Services"
            subtitle="A full suite of language solutions designed for medical, legal, and insurance professionals."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o, i) => {
              const Icon = o.icon;
              return (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group bg-white rounded-3xl p-7 border border-border hover:border-[color:var(--brand-red)]/40 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[color:var(--brand-blue)] to-[color:var(--brand-blue-deep)] flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)] mb-2">{o.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{o.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <div className="container-pro grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl p-8 border border-border shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-2xl bg-[color:var(--brand-red)]/10 flex items-center justify-center text-[color:var(--brand-red)]">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[color:var(--brand-blue-deep)]">Certifications & Credentialing</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Our interpreters and translators are certified by leading industry organizations and complete in-house certifications to maintain our high standard.
            </p>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-[color:var(--brand-blue)] shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-border shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-2xl bg-[color:var(--brand-blue)]/10 flex items-center justify-center text-[color:var(--brand-blue)]">
                <Stethoscope className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[color:var(--brand-blue-deep)]">Appointments We Cover</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Trusted by attorneys, claims adjusters, physicians, and case managers across the United States.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {appointments.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-[color:var(--brand-red)] shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-pro">
          <SectionHeader
            eyebrow="200+ Languages"
            title="Some of the Languages We Offer"
            subtitle="From globally spoken languages to rare dialects — our network has you covered."
          />
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-[var(--shadow-card)]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-3">
              {languages.map((l) => (
                <div key={l} className="flex items-center gap-2 text-sm text-[color:var(--brand-blue-deep)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)]" />
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Don't see your language? <Link to="/contact" className="text-[color:var(--brand-red)] font-semibold inline-flex items-center gap-1">Contact us <ArrowRight className="h-4 w-4" /></Link> — we likely support it.
            </p>
          </div>
        </div>
      </Section>

      <CTABand />
      <div className="h-16" />
    </>
  );
}
