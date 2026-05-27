import { Accessibility, Activity, Stethoscope, Droplet, Hospital, UserRound, Plane, MapPinned, HeartPulse, LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
};

export const services: Service[] = [
  { slug: "wheelchair", title: "Wheelchair Transportation", icon: Accessibility, description: "Spacious wheelchair-accessible vans with secure lifts and trained attendants for safe door-to-door rides." },
  { slug: "ambulatory", title: "Ambulatory Transportation", icon: UserRound, description: "Comfortable sedans and vans for patients who can walk but need a reliable, friendly driver." },
  { slug: "stretcher", title: "Stretcher Transportation", icon: Activity, description: "Bariatric and standard stretcher transport with EMT-trained drivers and continuous monitoring." },
  { slug: "dialysis", title: "Dialysis Transportation", icon: Droplet, description: "Recurring on-time rides to dialysis centers — your schedule is our priority." },
  { slug: "discharge", title: "Hospital Discharge Transport", icon: Hospital, description: "Smooth transitions from hospital to home with curb-to-curb or door-through-door service." },
  { slug: "senior", title: "Senior Transportation", icon: HeartPulse, description: "Compassionate, patient assistance for seniors going to appointments, pharmacies, or family visits." },
  { slug: "long-distance", title: "Long Distance Medical Transport", icon: MapPinned, description: "State-to-state non-emergency medical transportation with rest stops and comfort built in." },
  { slug: "airport", title: "Airport Medical Transportation", icon: Plane, description: "Medical escort and wheelchair assistance to and from airports nationwide." },
  { slug: "patient", title: "Non Emergency Patient Transport", icon: Stethoscope, description: "Scheduled non-emergency transport to clinics, therapy, imaging, and routine appointments." },
];
