import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";
import { PageHero, Section } from "@/components/Section";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book A Ride — Maxima Transit Care" },
      { name: "description", content: "Book your non-emergency medical transportation online in under 2 minutes. Available 24/7." },
      { property: "og:title", content: "Book A Ride — Maxima Transit Care" },
      { property: "og:description", content: "Reserve your medical transport ride online." },
    ],
  }),
  component: BookingPage,
});

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  email: z.string().trim().email("Valid email required").max(255),
  pickup: z.string().trim().min(3, "Pickup address required").max(255),
  destination: z.string().trim().min(3, "Destination required").max(255),
  date: z.string().min(1, "Date required"),
  time: z.string().min(1, "Time required"),
  mobility: z.string().min(1, "Select mobility type"),
  roundTrip: z.boolean(),
  notes: z.string().max(1000).optional(),
});

function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      pickup: String(fd.get("pickup") ?? ""),
      destination: String(fd.get("destination") ?? ""),
      date: String(fd.get("date") ?? ""),
      time: String(fd.get("time") ?? ""),
      mobility: String(fd.get("mobility") ?? ""),
      roundTrip: fd.get("roundTrip") === "on",
      notes: String(fd.get("notes") ?? ""),
    };
    const result = bookingSchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  const field = "w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)]/50 transition";
  const label = "block text-sm font-semibold mb-1.5 text-[color:var(--brand-blue-deep)]";
  const err = "mt-1 text-xs text-[color:var(--brand-red)] font-medium";

  return (
    <>
      <PageHero title="Book A Ride" subtitle="Fill out the form below and our dispatch team will confirm your ride within minutes. For urgent requests, call (800) 555-1234." />
      <Section>
        <div className="container-pro max-w-3xl">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-10 border border-border shadow-[var(--shadow-elegant)] text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)] flex items-center justify-center mb-4">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h2 className="text-2xl font-extrabold text-[color:var(--brand-blue-deep)]">Booking received!</h2>
              <p className="mt-2 text-muted-foreground">Our dispatch team will call you shortly to confirm your ride details.</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary mt-6 hover:opacity-90">Book Another Ride</button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-[var(--shadow-card)] space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={label}>Patient Name *</label>
                  <input name="name" className={field} placeholder="John Doe" maxLength={100} />
                  {errors.name && <p className={err}>{errors.name}</p>}
                </div>
                <div>
                  <label className={label}>Phone *</label>
                  <input name="phone" type="tel" className={field} placeholder="(555) 123-4567" maxLength={20} />
                  {errors.phone && <p className={err}>{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className={label}>Email *</label>
                <input name="email" type="email" className={field} placeholder="you@example.com" maxLength={255} />
                {errors.email && <p className={err}>{errors.email}</p>}
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={label}>Pickup Address *</label>
                  <input name="pickup" className={field} placeholder="123 Main St, City, State" maxLength={255} />
                  {errors.pickup && <p className={err}>{errors.pickup}</p>}
                </div>
                <div>
                  <label className={label}>Destination Address *</label>
                  <input name="destination" className={field} placeholder="456 Hospital Dr" maxLength={255} />
                  {errors.destination && <p className={err}>{errors.destination}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className={label}>Appointment Date *</label>
                  <input name="date" type="date" className={field} />
                  {errors.date && <p className={err}>{errors.date}</p>}
                </div>
                <div>
                  <label className={label}>Appointment Time *</label>
                  <input name="time" type="time" className={field} />
                  {errors.time && <p className={err}>{errors.time}</p>}
                </div>
                <div>
                  <label className={label}>Mobility Type *</label>
                  <select name="mobility" className={field} defaultValue="">
                    <option value="" disabled>Select…</option>
                    <option>Ambulatory</option>
                    <option>Wheelchair</option>
                    <option>Stretcher</option>
                    <option>Other</option>
                  </select>
                  {errors.mobility && <p className={err}>{errors.mobility}</p>}
                </div>
              </div>
              <label className="flex items-center gap-3 p-4 rounded-xl bg-secondary cursor-pointer">
                <input type="checkbox" name="roundTrip" className="h-5 w-5 accent-[color:var(--brand-red)]" />
                <span className="font-semibold">Round trip (return ride needed)</span>
              </label>
              <div>
                <label className={label}>Additional Notes</label>
                <textarea name="notes" rows={4} maxLength={1000} className={field} placeholder="Any special needs or instructions..." />
              </div>
              <button type="submit" className="btn-primary hover:btn-primary-hover w-full text-base py-4">
                <Calendar className="h-5 w-5" /> Submit Booking Request
              </button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
