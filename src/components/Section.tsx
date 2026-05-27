import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHero({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--brand-blue-deep)] via-[color:var(--brand-blue)] to-[color:var(--brand-blue-deep)] text-white py-20 md:py-28">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--brand-red)]/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="container-pro relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold max-w-4xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`py-16 md:py-24 ${className}`}>{children}</section>;
}

export function SectionHeader({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--brand-red)] mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-5xl font-extrabold text-[color:var(--brand-blue-deep)]">{title}</h2>
      {subtitle && <p className={`mt-4 text-lg text-muted-foreground ${center ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>{subtitle}</p>}
    </div>
  );
}
