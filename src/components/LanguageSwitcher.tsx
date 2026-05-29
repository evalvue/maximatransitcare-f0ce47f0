import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LANGUAGES, useT, type Lang } from "@/i18n/LanguageContext";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find(l => l.code === lang)!;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Change language"
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold text-[color:var(--brand-blue)] hover:bg-secondary transition-colors border border-border"
      >
        <Globe className="h-4 w-4" />
        <span>{current.flag}</span>
        {!compact && <span className="hidden sm:inline">{current.code.toUpperCase()}</span>}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-border shadow-[var(--shadow-elegant)] overflow-hidden z-50">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code as Lang); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary transition ${lang === l.code ? "bg-secondary/60 font-semibold" : ""}`}
            >
              <span className="flex items-center gap-2"><span>{l.flag}</span>{l.label}</span>
              {lang === l.code && <Check className="h-4 w-4 text-[color:var(--brand-red)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
