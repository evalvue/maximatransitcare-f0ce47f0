import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-white rounded-3xl p-7 border border-border hover:border-[color:var(--brand-red)]/40 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[color:var(--brand-blue)] to-[color:var(--brand-blue-deep)] flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-[color:var(--brand-blue-deep)] mb-2">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>
      <Link to="/booking" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-red)] hover:gap-2.5 transition-all">
        Book this service <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
