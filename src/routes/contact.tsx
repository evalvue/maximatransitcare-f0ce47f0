import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { PageHero, Section } from "@/components/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Maxima Transit Care" },
      { name: "description", content: "Get in touch with Maxima Transit Care. 24/7 dispatch, friendly support, and fast quotes for non-emergency medical transportation." },
      { property: "og:title", content: "Contact Maxima Transit Care" },
      { property: "og:description", content: "Call, email, or message us for NEMT bookings and quotes." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  message: z.string().trim().min(5).max(1000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Website inquiry from ${res.data.name}`);
    const body = encodeURIComponent(
      `Name: ${res.data.name}\nPhone: ${res.data.phone}\nEmail: ${res.data.email}\n\nMessage:\n${res.data.message}`,
    );
    window.location.href = `mailto:info@maximatransitcare.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field = "w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)]/50 transition";
  const label = "block text-sm font-semibold mb-1.5 text-[color:var(--brand-blue-deep)]";

  return (
    <>
      <PageHero title="Contact Us" subtitle="Our dispatch team is available 24/7. Reach out by phone, email, or send us a message — we respond fast." />
      <Section>
        <div className="container-pro grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "(800) 555-1234", href: "tel:+18005551234" },
              { icon: Mail, label: "Email", value: "info@maximatransitcare.com", href: "mailto:info@maximatransitcare.com" },
              { icon: MapPin, label: "Office", value: "United States" },
              { icon: Clock, label: "Hours", value: "24/7 Dispatch • Office: 8am–6pm" },
            ].map(item => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-border hover:border-[color:var(--brand-red)]/40 shadow-[var(--shadow-card)] transition">
                <div className="h-12 w-12 rounded-xl bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)] flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="font-semibold text-[color:var(--brand-blue-deep)] hover:text-[color:var(--brand-red)]">
                      {item.value}
                    </a>
                  ) : (
                    <div className="font-semibold text-[color:var(--brand-blue-deep)]">{item.value}</div>
                  )}
                </div>
              </motion.div>
            ))}
            <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] aspect-video bg-secondary">
              <iframe
                title="Office location"
                src="https://www.google.com/maps?q=United%20States&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-white rounded-3xl p-10 border border-border shadow-[var(--shadow-elegant)] text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)] flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h2 className="text-2xl font-extrabold text-[color:var(--brand-blue-deep)]">Message sent!</h2>
                <p className="mt-2 text-muted-foreground">We'll reply within one business hour.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-[var(--shadow-card)] space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className={label}>Full Name *</label>
                    <input name="name" className={field} maxLength={100} />
                    {errors.name && <p className="mt-1 text-xs text-[color:var(--brand-red)]">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={label}>Phone *</label>
                    <input name="phone" type="tel" className={field} maxLength={20} />
                    {errors.phone && <p className="mt-1 text-xs text-[color:var(--brand-red)]">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className={label}>Email *</label>
                  <input name="email" type="email" className={field} maxLength={255} />
                  {errors.email && <p className="mt-1 text-xs text-[color:var(--brand-red)]">{errors.email}</p>}
                </div>
                <div>
                  <label className={label}>Message *</label>
                  <textarea name="message" rows={6} className={field} maxLength={1000} placeholder="How can we help?" />
                  {errors.message && <p className="mt-1 text-xs text-[color:var(--brand-red)]">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary hover:btn-primary-hover w-full py-4">
                  <Send className="h-5 w-5" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
