import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es" | "hi" | "ur" | "ar";

export const LANGUAGES: { code: Lang; label: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", label: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "ur", label: "اردو", flag: "🇵🇰", dir: "rtl" },
  { code: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl" },
];

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  en: {
    "nav.home": "Home", "nav.about": "About", "nav.services": "Services", "nav.fleet": "Fleet",
    "nav.areas": "Service Areas", "nav.languages": "Language Services", "nav.why": "Why Us", "nav.testimonials": "Testimonials", "nav.contact": "Contact",
    "cta.book": "Book A Ride", "cta.call": "Call Now",
    "booking.title": "Book A Ride",
    "booking.subtitle": "Complete the steps below — our dispatch team will confirm your ride within minutes.",
    "booking.step1": "Patient Info", "booking.step2": "Trip Details", "booking.step3": "Medical Needs", "booking.step4": "Review & Submit",
    "booking.next": "Next Step", "booking.back": "Back", "booking.submit": "Submit Booking Request",
    "booking.another": "Book Another Ride", "booking.received": "Booking received!",
    "booking.confirm": "Our dispatch team will call you shortly to confirm your ride details.",
    "field.name": "Patient Name", "field.phone": "Phone", "field.email": "Email",
    "field.dob": "Date of Birth", "field.weight": "Patient Weight (lbs)",
    "field.pickup": "Pickup Address", "field.destination": "Destination Address",
    "field.date": "Appointment Date", "field.time": "Appointment Time",
    "field.mobility": "Mobility Type", "field.roundtrip": "Round trip (return ride needed)",
    "field.returnTime": "Return Pickup Time", "field.passengers": "Additional Passengers",
    "field.oxygen": "Oxygen required", "field.attendant": "Medical attendant needed",
    "field.stairs": "Stairs assistance", "field.wheelchairOwn": "Patient brings own wheelchair",
    "field.insurance": "Insurance / Payment", "field.policy": "Policy / Member ID",
    "field.notes": "Additional Notes",
  },
  es: {
    "nav.home": "Inicio", "nav.about": "Nosotros", "nav.services": "Servicios", "nav.fleet": "Flota",
    "nav.areas": "Áreas", "nav.languages": "Idiomas", "nav.why": "Por qué nosotros", "nav.testimonials": "Testimonios", "nav.contact": "Contacto",
    "cta.book": "Reservar viaje", "cta.call": "Llamar ahora",
    "booking.title": "Reservar un viaje",
    "booking.subtitle": "Complete los pasos a continuación — nuestro equipo confirmará su viaje en minutos.",
    "booking.step1": "Información", "booking.step2": "Detalles del viaje", "booking.step3": "Necesidades médicas", "booking.step4": "Revisar y enviar",
    "booking.next": "Siguiente", "booking.back": "Atrás", "booking.submit": "Enviar solicitud",
    "booking.another": "Reservar otro viaje", "booking.received": "¡Reserva recibida!",
    "booking.confirm": "Nuestro equipo lo llamará para confirmar los detalles.",
    "field.name": "Nombre del paciente", "field.phone": "Teléfono", "field.email": "Correo",
    "field.dob": "Fecha de nacimiento", "field.weight": "Peso (lbs)",
    "field.pickup": "Dirección de recogida", "field.destination": "Destino",
    "field.date": "Fecha de la cita", "field.time": "Hora de la cita",
    "field.mobility": "Tipo de movilidad", "field.roundtrip": "Ida y vuelta (regreso)",
    "field.returnTime": "Hora de regreso", "field.passengers": "Pasajeros adicionales",
    "field.oxygen": "Oxígeno requerido", "field.attendant": "Asistente médico",
    "field.stairs": "Ayuda con escaleras", "field.wheelchairOwn": "Trae su propia silla de ruedas",
    "field.insurance": "Seguro / Pago", "field.policy": "ID de póliza",
    "field.notes": "Notas adicionales",
  },
  hi: {
    "nav.home": "होम", "nav.about": "हमारे बारे में", "nav.services": "सेवाएँ", "nav.fleet": "वाहन",
    "nav.areas": "सेवा क्षेत्र", "nav.languages": "भाषा सेवाएँ", "nav.why": "हम क्यों", "nav.testimonials": "प्रशंसापत्र", "nav.contact": "संपर्क",
    "cta.book": "राइड बुक करें", "cta.call": "कॉल करें",
    "booking.title": "राइड बुक करें",
    "booking.subtitle": "नीचे दिए गए चरण पूरे करें — हमारी टीम मिनटों में पुष्टि करेगी।",
    "booking.step1": "मरीज़ की जानकारी", "booking.step2": "यात्रा विवरण", "booking.step3": "चिकित्सा आवश्यकताएँ", "booking.step4": "समीक्षा करें",
    "booking.next": "अगला", "booking.back": "पीछे", "booking.submit": "अनुरोध भेजें",
    "booking.another": "एक और बुक करें", "booking.received": "बुकिंग प्राप्त!",
    "booking.confirm": "हमारी टीम आपको शीघ्र ही कॉल करेगी।",
    "field.name": "मरीज़ का नाम", "field.phone": "फ़ोन", "field.email": "ईमेल",
    "field.dob": "जन्म तिथि", "field.weight": "वज़न (पौंड)",
    "field.pickup": "पिकअप पता", "field.destination": "गंतव्य",
    "field.date": "अपॉइंटमेंट तिथि", "field.time": "समय",
    "field.mobility": "गतिशीलता प्रकार", "field.roundtrip": "राउंड ट्रिप (वापसी)",
    "field.returnTime": "वापसी का समय", "field.passengers": "अतिरिक्त यात्री",
    "field.oxygen": "ऑक्सीजन आवश्यक", "field.attendant": "चिकित्सा सहायक",
    "field.stairs": "सीढ़ी सहायता", "field.wheelchairOwn": "अपनी व्हीलचेयर लाएँगे",
    "field.insurance": "बीमा / भुगतान", "field.policy": "पॉलिसी ID",
    "field.notes": "अतिरिक्त नोट्स",
  },
  ur: {
    "nav.home": "ہوم", "nav.about": "ہمارے بارے میں", "nav.services": "خدمات", "nav.fleet": "گاڑیاں",
    "nav.areas": "علاقے", "nav.languages": "زبان کی خدمات", "nav.why": "ہم کیوں", "nav.testimonials": "آراء", "nav.contact": "رابطہ",
    "cta.book": "رائیڈ بک کریں", "cta.call": "ابھی کال کریں",
    "booking.title": "رائیڈ بک کریں",
    "booking.subtitle": "نیچے دیے گئے مراحل مکمل کریں — ہماری ٹیم منٹوں میں تصدیق کرے گی۔",
    "booking.step1": "مریض کی معلومات", "booking.step2": "سفر کی تفصیلات", "booking.step3": "طبی ضروریات", "booking.step4": "جائزہ لیں",
    "booking.next": "اگلا", "booking.back": "پیچھے", "booking.submit": "درخواست بھیجیں",
    "booking.another": "ایک اور بک کریں", "booking.received": "بکنگ موصول ہوئی!",
    "booking.confirm": "ہماری ٹیم جلد آپ کو کال کرے گی۔",
    "field.name": "مریض کا نام", "field.phone": "فون", "field.email": "ای میل",
    "field.dob": "تاریخ پیدائش", "field.weight": "وزن (پاؤنڈ)",
    "field.pickup": "پک اپ ایڈریس", "field.destination": "منزل",
    "field.date": "اپائنٹمنٹ تاریخ", "field.time": "وقت",
    "field.mobility": "نقل و حرکت کی قسم", "field.roundtrip": "راؤنڈ ٹرپ (واپسی)",
    "field.returnTime": "واپسی کا وقت", "field.passengers": "اضافی مسافر",
    "field.oxygen": "آکسیجن درکار", "field.attendant": "طبی معاون",
    "field.stairs": "سیڑھیوں کی مدد", "field.wheelchairOwn": "اپنی وہیل چیئر لائیں گے",
    "field.insurance": "انشورنس / ادائیگی", "field.policy": "پالیسی ID",
    "field.notes": "اضافی نوٹس",
  },
  ar: {
    "nav.home": "الرئيسية", "nav.about": "من نحن", "nav.services": "الخدمات", "nav.fleet": "الأسطول",
    "nav.areas": "مناطق الخدمة", "nav.languages": "خدمات اللغة", "nav.why": "لماذا نحن", "nav.testimonials": "آراء", "nav.contact": "اتصل بنا",
    "cta.book": "احجز رحلة", "cta.call": "اتصل الآن",
    "booking.title": "احجز رحلة",
    "booking.subtitle": "أكمل الخطوات أدناه — سيؤكد فريقنا حجزك خلال دقائق.",
    "booking.step1": "معلومات المريض", "booking.step2": "تفاصيل الرحلة", "booking.step3": "احتياجات طبية", "booking.step4": "مراجعة وإرسال",
    "booking.next": "التالي", "booking.back": "السابق", "booking.submit": "إرسال الطلب",
    "booking.another": "حجز رحلة أخرى", "booking.received": "تم استلام الحجز!",
    "booking.confirm": "سيتصل بك فريقنا قريبًا لتأكيد التفاصيل.",
    "field.name": "اسم المريض", "field.phone": "الهاتف", "field.email": "البريد الإلكتروني",
    "field.dob": "تاريخ الميلاد", "field.weight": "الوزن (رطل)",
    "field.pickup": "عنوان الاستلام", "field.destination": "الوجهة",
    "field.date": "تاريخ الموعد", "field.time": "الوقت",
    "field.mobility": "نوع التنقل", "field.roundtrip": "ذهاب وعودة",
    "field.returnTime": "وقت العودة", "field.passengers": "ركاب إضافيون",
    "field.oxygen": "أكسجين مطلوب", "field.attendant": "مرافق طبي",
    "field.stairs": "مساعدة في السلالم", "field.wheelchairOwn": "يحضر كرسيه المتحرك",
    "field.insurance": "التأمين / الدفع", "field.policy": "رقم البوليصة",
    "field.notes": "ملاحظات إضافية",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; dir: "ltr" | "rtl" };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  useEffect(() => {
    const dir = LANGUAGES.find(l => l.code === lang)?.dir ?? "ltr";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: string) => translations[lang][k] ?? translations.en[k] ?? k;
  const dir = LANGUAGES.find(l => l.code === lang)?.dir ?? "ltr";

  return <LanguageContext.Provider value={{ lang, setLang, t, dir }}>{children}</LanguageContext.Provider>;
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be inside LanguageProvider");
  return ctx;
}
