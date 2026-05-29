import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Calendar, User, MapPin, HeartPulse, ClipboardCheck,
  ChevronRight, ChevronLeft, Phone, Mail, Clock, Accessibility, Plus, Minus,
} from "lucide-react";
import { PageHero, Section } from "@/components/Section";
import { useT } from "@/i18n/LanguageContext";

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

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  email: z.string().trim().email("Valid email required").max(255),
  dob: z.string().optional(),
  weight: z.string().max(10).optional(),
  pickup: z.string().trim().min(3, "Pickup address required").max(255),
  destination: z.string().trim().min(3, "Destination required").max(255),
  date: z.string().min(1, "Date required"),
  time: z.string().min(1, "Time required"),
  mobility: z.string().min(1, "Select mobility type"),
  roundTrip: z.boolean(),
  returnTime: z.string().optional(),
  passengers: z.number().min(0).max(4),
  oxygen: z.boolean(),
  attendant: z.boolean(),
  stairs: z.boolean(),
  wheelchairOwn: z.boolean(),
  insurance: z.string().min(1, "Select payment option"),
  policy: z.string().max(60).optional(),
  notes: z.string().max(1000).optional(),
});
type FormData = z.infer<typeof schema>;

const initialData: FormData = {
  name: "", phone: "", email: "", dob: "", weight: "",
  pickup: "", destination: "", date: "", time: "",
  mobility: "", roundTrip: false, returnTime: "", passengers: 0,
  oxygen: false, attendant: false, stairs: false, wheelchairOwn: false,
  insurance: "", policy: "", notes: "",
};

function BookingPage() {
  const { t } = useT();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { key: "patient", label: t("booking.step1"), icon: User, fields: ["name", "phone", "email", "dob", "weight"] },
    { key: "trip", label: t("booking.step2"), icon: MapPin, fields: ["pickup", "destination", "date", "time", "mobility", "roundTrip", "returnTime", "passengers"] },
    { key: "medical", label: t("booking.step3"), icon: HeartPulse, fields: ["oxygen", "attendant", "stairs", "wheelchairOwn", "insurance", "policy"] },
    { key: "review", label: t("booking.step4"), icon: ClipboardCheck, fields: [] },
  ] as const;

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  function update<K extends keyof FormData>(k: K, v: FormData[K]) {
    setData(d => ({ ...d, [k]: v }));
    if (errors[k as string]) setErrors(e => { const c = { ...e }; delete c[k as string]; return c; });
  }

  function validateStep(s: number): boolean {
    const fields = steps[s].fields as readonly string[];
    if (!fields.length) return true;
    const partial: Record<string, unknown> = {};
    fields.forEach(f => (partial[f] = (data as Record<string, unknown>)[f]));
    const merged = { ...data, ...partial };
    const res = schema.safeParse(merged);
    if (res.success) { setErrors({}); return true; }
    const errs: Record<string, string> = {};
    res.error.issues.forEach(i => {
      const key = i.path[0] as string;
      if (fields.includes(key)) errs[key] = i.message;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    setStep(s => Math.min(s + 1, steps.length - 1));
  }
  function back() { setStep(s => Math.max(s - 1, 0)); }

  function submit() {
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      // jump to first step with errors
      const idx = steps.findIndex(s => s.fields.some(f => errs[f]));
      if (idx >= 0) setStep(idx);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  const field = "w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)]/50 transition";
  const label = "block text-sm font-semibold mb-1.5 text-[color:var(--brand-blue-deep)]";
  const errCls = "mt-1 text-xs text-[color:var(--brand-red)] font-medium";

  if (submitted) {
    return (
      <>
        <PageHero title={t("booking.title")} subtitle={t("booking.subtitle")} />
        <Section>
          <div className="container-pro max-w-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-10 border border-border shadow-[var(--shadow-elegant)] text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)] flex items-center justify-center mb-4">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h2 className="text-2xl font-extrabold text-[color:var(--brand-blue-deep)]">{t("booking.received")}</h2>
              <p className="mt-2 text-muted-foreground">{t("booking.confirm")}</p>
              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
                <a href="tel:+18005551234" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary font-semibold"><Phone className="h-4 w-4" /> Call</a>
                <a href="mailto:info@maximatransitcare.com" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary font-semibold"><Mail className="h-4 w-4" /> Email</a>
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary font-semibold"><Clock className="h-4 w-4" /> 24/7</div>
              </div>
              <button onClick={() => { setSubmitted(false); setStep(0); setData(initialData); }} className="btn-secondary mt-6 hover:opacity-90">
                {t("booking.another")}
              </button>
            </motion.div>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero title={t("booking.title")} subtitle={t("booking.subtitle")} />
      <Section>
        <div className="container-pro max-w-4xl">
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between gap-2">
              {steps.map((s, i) => {
                const active = i === step;
                const done = i < step;
                const Icon = s.icon;
                return (
                  <div key={s.key} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className={`h-11 w-11 rounded-full flex items-center justify-center font-bold transition ${
                        done ? "bg-[color:var(--brand-red)] text-white" :
                        active ? "bg-[color:var(--brand-blue)] text-white ring-4 ring-[color:var(--brand-blue)]/20" :
                        "bg-secondary text-muted-foreground"
                      }`}>
                        {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <div className={`text-xs font-semibold text-center hidden sm:block ${active ? "text-[color:var(--brand-blue-deep)]" : "text-muted-foreground"}`}>
                        {s.label}
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-1 flex-1 rounded-full mx-1 -mt-6 sm:-mt-8 transition ${done ? "bg-[color:var(--brand-red)]" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 border border-border shadow-[var(--shadow-card)]">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">

                {step === 0 && (
                  <>
                    <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)] flex items-center gap-2"><User className="h-5 w-5 text-[color:var(--brand-red)]" /> {t("booking.step1")}</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={label}>{t("field.name")} *</label>
                        <input value={data.name} onChange={e => update("name", e.target.value)} className={field} placeholder="John Doe" maxLength={100} />
                        {errors.name && <p className={errCls}>{errors.name}</p>}
                      </div>
                      <div>
                        <label className={label}>{t("field.phone")} *</label>
                        <input value={data.phone} onChange={e => update("phone", e.target.value)} type="tel" className={field} placeholder="(555) 123-4567" maxLength={20} />
                        {errors.phone && <p className={errCls}>{errors.phone}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className={label}>{t("field.email")} *</label>
                        <input value={data.email} onChange={e => update("email", e.target.value)} type="email" className={field} placeholder="you@example.com" maxLength={255} />
                        {errors.email && <p className={errCls}>{errors.email}</p>}
                      </div>
                      <div>
                        <label className={label}>{t("field.dob")}</label>
                        <input value={data.dob} onChange={e => update("dob", e.target.value)} type="date" className={field} max={today} />
                      </div>
                      <div>
                        <label className={label}>{t("field.weight")}</label>
                        <input value={data.weight} onChange={e => update("weight", e.target.value)} type="number" min={0} max={1000} className={field} placeholder="e.g. 160" />
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)] flex items-center gap-2"><MapPin className="h-5 w-5 text-[color:var(--brand-red)]" /> {t("booking.step2")}</h3>
                    <div>
                      <label className={label}>{t("field.pickup")} *</label>
                      <input value={data.pickup} onChange={e => update("pickup", e.target.value)} className={field} placeholder="123 Main St, City, State" maxLength={255} />
                      {errors.pickup && <p className={errCls}>{errors.pickup}</p>}
                    </div>
                    <div>
                      <label className={label}>{t("field.destination")} *</label>
                      <input value={data.destination} onChange={e => update("destination", e.target.value)} className={field} placeholder="456 Hospital Dr" maxLength={255} />
                      {errors.destination && <p className={errCls}>{errors.destination}</p>}
                    </div>
                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className={label}>{t("field.date")} *</label>
                        <input value={data.date} onChange={e => update("date", e.target.value)} type="date" min={today} className={field} />
                        {errors.date && <p className={errCls}>{errors.date}</p>}
                      </div>
                      <div>
                        <label className={label}>{t("field.time")} *</label>
                        <input value={data.time} onChange={e => update("time", e.target.value)} type="time" className={field} />
                        {errors.time && <p className={errCls}>{errors.time}</p>}
                      </div>
                      <div>
                        <label className={label}>{t("field.mobility")} *</label>
                        <select value={data.mobility} onChange={e => update("mobility", e.target.value)} className={field}>
                          <option value="" disabled>Select…</option>
                          <option>Ambulatory</option>
                          <option>Wheelchair</option>
                          <option>Stretcher</option>
                          <option>Bariatric</option>
                          <option>Other</option>
                        </select>
                        {errors.mobility && <p className={errCls}>{errors.mobility}</p>}
                      </div>
                    </div>

                    <label className="flex items-center gap-3 p-4 rounded-xl bg-secondary cursor-pointer">
                      <input type="checkbox" checked={data.roundTrip} onChange={e => update("roundTrip", e.target.checked)} className="h-5 w-5 accent-[color:var(--brand-red)]" />
                      <span className="font-semibold">{t("field.roundtrip")}</span>
                    </label>

                    {data.roundTrip && (
                      <div>
                        <label className={label}>{t("field.returnTime")}</label>
                        <input value={data.returnTime} onChange={e => update("returnTime", e.target.value)} type="time" className={field} />
                      </div>
                    )}

                    <div>
                      <label className={label}>{t("field.passengers")}</label>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => update("passengers", Math.max(0, data.passengers - 1))}
                          className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center hover:bg-[color:var(--brand-red)]/10 transition">
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="min-w-12 text-center text-lg font-bold">{data.passengers}</div>
                        <button type="button" onClick={() => update("passengers", Math.min(4, data.passengers + 1))}
                          className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center hover:bg-[color:var(--brand-red)]/10 transition">
                          <Plus className="h-4 w-4" />
                        </button>
                        <span className="text-sm text-muted-foreground ml-2">family / caregiver</span>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)] flex items-center gap-2"><HeartPulse className="h-5 w-5 text-[color:var(--brand-red)]" /> {t("booking.step3")}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {([
                        ["oxygen", t("field.oxygen")],
                        ["attendant", t("field.attendant")],
                        ["stairs", t("field.stairs")],
                        ["wheelchairOwn", t("field.wheelchairOwn")],
                      ] as const).map(([k, lbl]) => (
                        <label key={k} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                          (data as Record<string, unknown>)[k] ? "border-[color:var(--brand-red)] bg-[color:var(--brand-red)]/5" : "border-border bg-white hover:border-[color:var(--brand-blue)]/40"
                        }`}>
                          <input type="checkbox" checked={Boolean((data as Record<string, unknown>)[k])}
                            onChange={e => update(k as keyof FormData, e.target.checked as never)}
                            className="h-5 w-5 accent-[color:var(--brand-red)]" />
                          <Accessibility className="h-5 w-5 text-[color:var(--brand-blue)]" />
                          <span className="font-semibold">{lbl}</span>
                        </label>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={label}>{t("field.insurance")} *</label>
                        <select value={data.insurance} onChange={e => update("insurance", e.target.value)} className={field}>
                          <option value="" disabled>Select…</option>
                          <option>Medicaid</option>
                          <option>Medicare Advantage</option>
                          <option>Veterans Affairs</option>
                          <option>Private Insurance</option>
                          <option>Workers' Comp</option>
                          <option>Self-Pay</option>
                        </select>
                        {errors.insurance && <p className={errCls}>{errors.insurance}</p>}
                      </div>
                      <div>
                        <label className={label}>{t("field.policy")}</label>
                        <input value={data.policy} onChange={e => update("policy", e.target.value)} className={field} maxLength={60} placeholder="Optional" />
                      </div>
                    </div>
                    <div>
                      <label className={label}>{t("field.notes")}</label>
                      <textarea value={data.notes} onChange={e => update("notes", e.target.value)} rows={4} maxLength={1000} className={field} placeholder="Any special needs or instructions..." />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)] flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-[color:var(--brand-red)]" /> {t("booking.step4")}</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <ReviewRow label={t("field.name")} value={data.name} />
                      <ReviewRow label={t("field.phone")} value={data.phone} />
                      <ReviewRow label={t("field.email")} value={data.email} />
                      <ReviewRow label={t("field.dob")} value={data.dob} />
                      <ReviewRow label={t("field.pickup")} value={data.pickup} />
                      <ReviewRow label={t("field.destination")} value={data.destination} />
                      <ReviewRow label={t("field.date")} value={data.date} />
                      <ReviewRow label={t("field.time")} value={data.time} />
                      <ReviewRow label={t("field.mobility")} value={data.mobility} />
                      <ReviewRow label={t("field.roundtrip")} value={data.roundTrip ? "Yes" + (data.returnTime ? ` @ ${data.returnTime}` : "") : "No"} />
                      <ReviewRow label={t("field.passengers")} value={String(data.passengers)} />
                      <ReviewRow label={t("field.insurance")} value={data.insurance} />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {data.oxygen && <Chip>{t("field.oxygen")}</Chip>}
                      {data.attendant && <Chip>{t("field.attendant")}</Chip>}
                      {data.stairs && <Chip>{t("field.stairs")}</Chip>}
                      {data.wheelchairOwn && <Chip>{t("field.wheelchairOwn")}</Chip>}
                    </div>
                    {data.notes && (
                      <div className="p-4 rounded-xl bg-secondary">
                        <div className="text-xs font-bold uppercase text-muted-foreground mb-1">{t("field.notes")}</div>
                        <div className="text-sm">{data.notes}</div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={back} disabled={step === 0}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold border border-border bg-white hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition">
                <ChevronLeft className="h-4 w-4" /> {t("booking.back")}
              </button>
              {step < steps.length - 1 ? (
                <button type="button" onClick={next} className="btn-secondary hover:opacity-90">
                  {t("booking.next")} <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="button" onClick={submit} className="btn-primary hover:btn-primary-hover">
                  <Calendar className="h-5 w-5" /> {t("booking.submit")}
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="p-3 rounded-xl bg-secondary/60 border border-border">
      <div className="text-xs font-bold uppercase text-muted-foreground">{label}</div>
      <div className="font-semibold text-[color:var(--brand-blue-deep)] truncate">{value || "—"}</div>
    </div>
  );
}
function Chip({ children }: { children: React.ReactNode }) {
  return <span className="px-3 py-1.5 rounded-full bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)] text-xs font-bold">{children}</span>;
}
