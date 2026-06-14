import type { ServiceFaq } from "@/types";

// FAQs generales del home (bilingüe). También alimentan el FAQPage JSON-LD.
export const HOME_FAQS: ServiceFaq[] = [
  {
    question: "¿Necesito cita para que me atiendan?",
    answer:
      "No. Atendemos sin cita previa de lunes a domingo de 9:00 AM a 9:00 PM. También puedes llamarnos para reservar un horario.",
    questionEn: "Do I need an appointment to be seen?",
    answerEn:
      "No. We welcome walk-ins Monday to Sunday from 9:00 AM to 9:00 PM. You can also call us to reserve a time.",
  },
  {
    question: "¿Atienden a pacientes sin seguro médico?",
    answer:
      "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
    questionEn: "Do you see patients without health insurance?",
    answerEn:
      "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
  },
  {
    question: "¿El personal habla español?",
    answer:
      "Sí, todo nuestro equipo te atiende 100% en español. También ofrecemos atención en inglés.",
    questionEn: "Does the staff speak Spanish?",
    answerEn:
      "Yes, our entire team cares for you 100% in Spanish. We also offer care in English.",
  },
  {
    question: "¿Qué servicios ofrecen?",
    answer:
      "Medicina familiar, exámenes de inmigración I-693, laboratorio, ultrasonido, ginecología, examen DOT, control de diabetes e hipertensión y mucho más.",
    questionEn: "What services do you offer?",
    answerEn:
      "Family medicine, I-693 immigration exams, lab work, ultrasound, gynecology, DOT exams, diabetes and hypertension management and much more.",
  },
  {
    question: "¿Dónde están ubicados?",
    answer:
      "Estamos en 9606 Spencer Hwy Ste D, Pasadena, TX 77571, sirviendo a Deer Park, Pasadena, Shoreacres, Morgan's Point, Lomax y el área de Houston.",
    questionEn: "Where are you located?",
    answerEn:
      "We are at 9606 Spencer Hwy Ste D, Pasadena, TX 77571, serving Deer Park, Pasadena, Shoreacres, Morgan's Point, Lomax and the greater Houston area.",
  },
  {
    question: "¿Realizan el examen médico de inmigración?",
    answer:
      "Sí, realizamos el examen I-693 con médico autorizado por USCIS, incluyendo vacunas y el formulario sellado el mismo día.",
    questionEn: "Do you perform the immigration medical exam?",
    answerEn:
      "Yes, we perform the I-693 exam with a USCIS-authorized physician, including vaccines and the sealed form the same day.",
  },
];
