import type { Locale } from "@/types";

export interface ComparisonRow {
  feature: string;
  clinic: boolean;
  others: boolean;
}

export interface LandingContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaCall: string;
  ctaForm: string;
  comparisonTitle: string;
  clinicLabel: string;
  othersLabel: string;
  comparison: ComparisonRow[];
  diffTitle: string;
  differentiators: { title: string; body: string }[];
  offeringsTitle: string;
  offerings: string[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  reviewsTitle: string;
  finalTitle: string;
  finalBody: string;
}

const CONTENT: Record<Locale, LandingContent> = {
  es: {
    metaTitle: "Comparación de Clínicas en Pasadena | Nueva Salud Pasadena",
    metaDescription:
      "Compara Clínica Hispana Nueva Salud Pasadena con otras clínicas en Pasadena: atención en español, sin cita y precios accesibles, sin necesidad de seguro.",
    eyebrow: "Comparación de clínicas en Pasadena",
    title: "¿Buscas una clínica en Pasadena? Compara y decide",
    subtitle:
      "En Clínica Hispana Nueva Salud Pasadena recibes atención médica 100% en español, sin cita previa y con precios accesibles, sin necesidad de seguro. Compara lo que ofrecemos frente a otras clínicas.",
    ctaCall: "Llamar ahora",
    ctaForm: "Pedir información",
    comparisonTitle: "Nueva Salud Pasadena frente a otras clínicas",
    clinicLabel: "Nueva Salud Pasadena",
    othersLabel: "Otras clínicas",
    comparison: [
      { feature: "Atención 100% en español", clinic: true, others: false },
      { feature: "Sin cita previa", clinic: true, others: false },
      { feature: "Sin necesidad de seguro", clinic: true, others: false },
      { feature: "Abierto todos los días 9 AM–9 PM", clinic: true, others: false },
      { feature: "Laboratorio el mismo día", clinic: true, others: false },
      { feature: "Examen de inmigración I-693", clinic: true, others: false },
      { feature: "Precios accesibles y transparentes", clinic: true, others: false },
    ],
    diffTitle: "Por qué nos eligen",
    differentiators: [
      { title: "Tu idioma, siempre", body: "Un equipo que te escucha y te explica todo en español, sin barreras." },
      { title: "Sin esperas innecesarias", body: "Atención el mismo día, sin cita y con horario amplio toda la semana." },
      { title: "Todo en un lugar", body: "Consulta, laboratorio, exámenes y más bajo un mismo techo." },
    ],
    offeringsTitle: "Lo que encuentras con nosotros",
    offerings: [
      "Medicina familiar para toda la familia",
      "Examen médico de inmigración I-693",
      "Laboratorio clínico con resultados el mismo día",
      "Control de diabetes e hipertensión",
      "Ginecología y salud de la mujer",
      "Examen físico DOT para licencia CDL",
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        question: "¿Necesito cita para que me atiendan?",
        answer: "No. Atendemos sin cita de lunes a domingo de 9 AM a 9 PM.",
      },
      {
        question: "¿Atienden sin seguro?",
        answer: "Sí. No necesitas seguro; manejamos precios accesibles.",
      },
      {
        question: "¿El personal habla español?",
        answer: "Sí, te atendemos 100% en español.",
      },
    ],
    reviewsTitle: "Pacientes que ya confían en nosotros",
    finalTitle: "Da el paso. Tu salud no espera.",
    finalBody: "Llámanos o pide información y te atendemos hoy mismo, en español.",
  },
  en: {
    metaTitle: "Compare Clinics in Pasadena | Nueva Salud Pasadena",
    metaDescription:
      "Compare Clínica Hispana Nueva Salud Pasadena with other clinics in Pasadena: care in Spanish, walk-ins and affordable pricing, no insurance required.",
    eyebrow: "Comparing clinics in Pasadena",
    title: "Looking for a clinic in Pasadena? Compare and decide",
    subtitle:
      "At Clínica Hispana Nueva Salud Pasadena you get medical care 100% in Spanish, with no appointment and affordable pricing, no insurance required. Compare what we offer against other clinics.",
    ctaCall: "Call now",
    ctaForm: "Request information",
    comparisonTitle: "Nueva Salud Pasadena vs. other clinics",
    clinicLabel: "Nueva Salud Pasadena",
    othersLabel: "Other clinics",
    comparison: [
      { feature: "Care 100% in Spanish", clinic: true, others: false },
      { feature: "Walk-ins welcome", clinic: true, others: false },
      { feature: "No insurance required", clinic: true, others: false },
      { feature: "Open every day 9 AM–9 PM", clinic: true, others: false },
      { feature: "Same-day lab work", clinic: true, others: false },
      { feature: "I-693 immigration exam", clinic: true, others: false },
      { feature: "Affordable, transparent pricing", clinic: true, others: false },
    ],
    diffTitle: "Why patients choose us",
    differentiators: [
      { title: "Your language, always", body: "A team that listens and explains everything in Spanish, with no barriers." },
      { title: "No unnecessary waits", body: "Same-day care, no appointment and wide hours all week." },
      { title: "Everything in one place", body: "Visits, lab, exams and more under one roof." },
    ],
    offeringsTitle: "What you'll find with us",
    offerings: [
      "Family medicine for the whole family",
      "I-693 immigration medical exam",
      "Clinical lab with same-day results",
      "Diabetes and hypertension management",
      "Gynecology and women's health",
      "DOT physical exam for CDL license",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "Do I need an appointment to be seen?",
        answer: "No. We welcome walk-ins Monday to Sunday from 9 AM to 9 PM.",
      },
      {
        question: "Do you see patients without insurance?",
        answer: "Yes. You don't need insurance; we offer affordable pricing.",
      },
      {
        question: "Does the staff speak Spanish?",
        answer: "Yes, we care for you 100% in Spanish.",
      },
    ],
    reviewsTitle: "Patients who already trust us",
    finalTitle: "Take the step. Your health can't wait.",
    finalBody: "Call us or request information and we'll see you today, in Spanish.",
  },
};

export function getLandingContent(locale: Locale): LandingContent {
  return CONTENT[locale === "en" ? "en" : "es"];
}
