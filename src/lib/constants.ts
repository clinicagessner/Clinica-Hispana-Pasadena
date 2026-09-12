import type {
  NavLink,
  Promotion,
  Service,
  ServiceCategory,
  Testimonial,
} from "@/types";

// Normaliza la URL del sitio: añade https:// si falta el esquema y quita la
// barra final. Evita que un valor mal puesto en la env (p. ej.
// "clinicahispanans4.com" sin https) rompa `new URL()` en el build.
function normalizeBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  return withScheme.replace(/\/+$/, "");
}

const SITE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.clinicahispanans4.com",
);

export const SITE_CONFIG = {
  name: "Clínica Hispana Nueva Salud Pasadena",
  shortName: "Nueva Salud Pasadena",
  tagline: "Atención médica 100% en español en Pasadena, TX",
  taglineEn: "Healthcare 100% in Spanish in Pasadena, TX",
  description:
    "Clínica hispana en Pasadena, TX (1101 Spencer Hwy): médico primario, análisis de sangre, inmigración y ginecología. Sin cita, 7 días de 9 AM a 9 PM.",
  descriptionEn:
    "Hispanic clinic in Pasadena, TX (1101 Spencer Hwy): primary care, blood tests, immigration exams and gynecology. Walk-ins, 7 days 9 AM to 9 PM.",
  baseUrl: SITE_URL,
  locale: "es-MX",
  logoUrl: "/logo-nueva-salud.webp",
  ogImage: "/images/og/og-default.png",
} as const;

export const CONTACT_INFO = {
  address: "1101 Spencer Hwy Suite H",
  // Ciudad postal real del listado de Google (77587 = South Houston). La marca
  // y el SEO objetivo siguen siendo "Pasadena". TODO(confirmar con cliente).
  city: "South Houston",
  state: "TX",
  zip: "77587",
  phone: "+12817478817",
  phoneFormatted: "+1 (281) 747-8817",
  phoneDisplay: "(281) 747-8817",
  // WhatsApp — número EXCLUSIVO para chat. Nunca usarlo en tel:, NAP ni schema.
  // El teléfono de llamadas sigue siendo `phone`; CallRail hace swap solo sobre ese.
  whatsapp: "13462221006", // E.164 sin "+", listo para wa.me
  whatsappDisplay: "(346) 222-1006",
  email: "clinicamolina04@gmail.com",
  hours: "Lunes a Domingo: 9:00 AM - 9:00 PM",
  hoursEn: "Monday to Sunday: 9:00 AM - 9:00 PM",
  hoursWeekday: "Lunes a Viernes: 9:00 AM - 9:00 PM",
  hoursWeekend: "Sábado y Domingo: 9:00 AM - 9:00 PM",
  // Coordenadas exactas del listado de Google Maps.
  coordinates: { lat: 29.665125, lng: -95.2171965 },
  // Place ID real de Google (Places API New + enlaces directos).
  googlePlaceId: "ChIJw20fu-SZQIYRodyzwnf4zns",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Hispana+Nueva+Salud+Pasadena&query_place_id=ChIJw20fu-SZQIYRodyzwnf4zns",
  // Enlace directo al cuadro de "escribir reseña" de Google (Place ID real).
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJw20fu-SZQIYRodyzwnf4zns",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=1101+Spencer+Hwy+Suite+H,+South+Houston,+TX+77587&t=m&z=16&ie=UTF8&iwloc=&output=embed",
} as const;

// Horario estructurado para JSON-LD (openingHoursSpecification).
export const OPENING_HOURS = [
  { day: "Monday", opens: "09:00", closes: "21:00" },
  { day: "Tuesday", opens: "09:00", closes: "21:00" },
  { day: "Wednesday", opens: "09:00", closes: "21:00" },
  { day: "Thursday", opens: "09:00", closes: "21:00" },
  { day: "Friday", opens: "09:00", closes: "21:00" },
  { day: "Saturday", opens: "09:00", closes: "21:00" },
  { day: "Sunday", opens: "09:00", closes: "21:00" },
] as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/clinicahispanansaludpasadena",
  instagram: "https://www.instagram.com/clinicahispanansaludpasadena",
} as const;

// Fallback de build para rating/reseñas. La data en vivo la trae
// getGooglePlaceData() cuando hay GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID.
export const GOOGLE_REVIEWS_DATA = {
  averageRating: 4.9,
  totalReviews: 407,
} as const;

// Navbar (header): sin "Sin cita".
export const NAV_LINKS: NavLink[] = [
  { key: "services", href: "/services" },
  { key: "promotions", href: "/promociones" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/#contacto" },
];

// Footer: incluye "Sin cita" (walk-in).
export const FOOTER_NAV_LINKS: NavLink[] = [
  { key: "services", href: "/services" },
  { key: "promotions", href: "/#promociones" },
  { key: "blog", href: "/blog" },
  { key: "walkIn", href: "/walk-in" },
  { key: "contact", href: "/#contacto" },
];

// Promociones / ofertas vigentes. Los flyers (ya optimizados a webp 1080x1350,
// 4:5) viven en /public/images/promotions/<slug>.webp. El precio está incrustado
// en el diseño del flyer; en datos se usa solo como dato de texto. Una sola
// fuente alimenta el carrusel de la home y la página /promociones.
// Redacción factual (sin claims médicos exagerados) por compliance de salud.
export const PROMOTIONS: Promotion[] = [
  {
    slug: "chequeo-general-completo",
    image: "/images/promotions/chequeo-general-completo.webp",
    price: "$99",
    order: 1,
    title: "Chequeo General Completo",
    blurb:
      "Cuídate hoy, vive mejor mañana. Chequeo general completo por $99 (valor regular $250), con consulta médica gratis y atención en español.",
    includes: [
      "Examen general de sangre",
      "A1C (hemoglobina glicosilada)",
      "Examen general de orina",
      "Consulta médica gratis",
    ],
    alt: "Flyer de la promoción Chequeo General Completo por $99 en Clínica Hispana Nueva Salud Pasadena: examen general de sangre, A1C, examen general de orina y consulta médica gratis.",
    titleEn: "Complete General Checkup",
    blurbEn:
      "Take care of yourself today, live better tomorrow. Complete general checkup for $99 (regular value $250), with a free medical consultation and care in Spanish.",
    includesEn: [
      "Complete blood panel",
      "A1C (glycated hemoglobin)",
      "Complete urine test",
      "Free medical consultation",
    ],
    altEn: "Flyer for the Complete General Checkup promotion for $99 at Clínica Hispana Nueva Salud Pasadena: complete blood panel, A1C, urine test and a free medical consultation.",
  },
  {
    slug: "salud-intima-femenina",
    image: "/images/promotions/salud-intima-femenina.webp",
    price: "$69",
    order: 2,
    title: "Salud Íntima Femenina",
    blurb:
      "¿Picazón, flujo o mal olor? No lo ignores. Atiende tu salud íntima con una evaluación profesional y discreta, con atención en español.",
    includes: ["Cultivo íntimo", "Consulta médica", "Examen de orina gratis"],
    alt: "Flyer de la promoción Salud Íntima Femenina por $69 en Clínica Hispana Nueva Salud Pasadena: cultivo íntimo, consulta médica y examen de orina gratis.",
    titleEn: "Women's Intimate Health",
    blurbEn:
      "Itching, discharge or odor? Don't ignore it. Take care of your intimate health with a professional, discreet evaluation and care in Spanish.",
    includesEn: [
      "Intimate culture test",
      "Medical consultation",
      "Free urine test",
    ],
    altEn: "Flyer for the Women's Intimate Health promotion for $69 at Clínica Hispana Nueva Salud Pasadena: intimate culture test, medical consultation and a free urine test.",
  },
  {
    slug: "general-sangre-b12",
    image: "/images/promotions/general-sangre-b12.webp",
    price: "$99",
    order: 3,
    title: "General de Sangre + Vitamina B12",
    blurb:
      "Examen general de sangre acompañado de una inyección de vitamina B12, para apoyar tu energía y bienestar. Resultados claros y atención en tu idioma.",
    includes: [
      "Examen general de sangre",
      "Inyección de vitamina B12",
      "Orientación de resultados",
    ],
    alt: "Flyer de la promoción especial Examen General de Sangre más Vitamina B12 por $99 en Clínica Hispana Nueva Salud Pasadena.",
    titleEn: "Blood Panel + Vitamin B12",
    blurbEn:
      "A complete blood panel paired with a vitamin B12 injection to support your energy and well-being. Clear results and care in your language.",
    includesEn: [
      "Complete blood panel",
      "Vitamin B12 injection",
      "Results guidance",
    ],
    altEn: "Flyer for the special Complete Blood Panel plus Vitamin B12 promotion for $99 at Clínica Hispana Nueva Salud Pasadena.",
  },
  {
    slug: "perfil-hormonal-hombres",
    image: "/images/promotions/perfil-hormonal-hombres.webp",
    price: "$200",
    order: 4,
    title: "Perfil Hormonal para Hombres",
    blurb:
      "Evaluación del perfil hormonal masculino, útil si presentas fatiga, cambios de ánimo, pérdida de masa muscular o disminución de la libido.",
    includes: [
      "Exámenes confiables",
      "Resultados precisos",
      "Atención profesional",
    ],
    alt: "Flyer de la promoción Perfil Hormonal para Hombres por $200 en Clínica Hispana Nueva Salud Pasadena: evaluación de fatiga, masa muscular y libido.",
    titleEn: "Men's Hormone Panel",
    blurbEn:
      "An evaluation of the male hormone profile — useful if you experience fatigue, mood changes, muscle loss or low libido.",
    includesEn: [
      "Reliable testing",
      "Accurate results",
      "Professional care",
    ],
    altEn: "Flyer for the Men's Hormone Panel promotion for $200 at Clínica Hispana Nueva Salud Pasadena: evaluation of fatigue, muscle mass and libido.",
  },
  {
    slug: "examen-testosterona",
    image: "/images/promotions/examen-testosterona.webp",
    price: "$79",
    order: 5,
    title: "Revisa tu Testosterona",
    blurb:
      "¿Cansancio, poca energía, menos deseo sexual o dificultad con la erección? Revisa tu nivel de testosterona por $79 (precio regular $220), con consulta médica gratis y atención en español.",
    includes: [
      "Examen de testosterona",
      "Examen de orina",
      "Consulta médica gratis",
    ],
    alt: "Flyer de la promoción Revisa tu Testosterona por $79 en Clínica Hispana Nueva Salud Pasadena: examen de testosterona, examen de orina y consulta médica gratis.",
    titleEn: "Check Your Testosterone",
    blurbEn:
      "Tired, low on energy, low sex drive or trouble with erections? Check your testosterone level for $79 (regular price $220), with a free medical consultation and care in Spanish.",
    includesEn: [
      "Testosterone test",
      "Urine test",
      "Free medical consultation",
    ],
    altEn: "Flyer for the Check Your Testosterone promotion for $79 at Clínica Hispana Nueva Salud Pasadena: testosterone test, urine test and a free medical consultation.",
  },
  {
    slug: "chequeo-completo-mujer",
    image: "/images/promotions/chequeo-completo-mujer.webp",
    price: "$179",
    order: 6,
    title: "Chequeo Completo de la Mujer",
    blurb:
      "Cuida tu salud con un chequeo completo de la mujer por $179 (precio regular $300): ultrasonido pélvico, papanicolaou y examen de orina, con consulta médica gratis y atención en español.",
    includes: [
      "Ultrasonido pélvico",
      "Papanicolaou",
      "Examen de orina",
      "Consulta médica gratis",
    ],
    alt: "Flyer de la promoción Chequeo Completo de la Mujer por $179 en Clínica Hispana Nueva Salud Pasadena: ultrasonido pélvico, papanicolaou, examen de orina y consulta médica gratis.",
    titleEn: "Complete Women's Checkup",
    blurbEn:
      "Take care of your health with a complete women's checkup for $179 (regular price $300): pelvic ultrasound, Pap smear and urine test, with a free medical consultation and care in Spanish.",
    includesEn: [
      "Pelvic ultrasound",
      "Pap smear",
      "Urine test",
      "Free medical consultation",
    ],
    altEn: "Flyer for the Complete Women's Checkup promotion for $179 at Clínica Hispana Nueva Salud Pasadena: pelvic ultrasound, Pap smear, urine test and a free medical consultation.",
  },
];

export const SERVICE_CATEGORIES: {
  value: ServiceCategory;
  label: string;
  labelEn: string;
}[] = [
  { value: "medicina-general", label: "Medicina general", labelEn: "General medicine" },
  { value: "salud-mujer", label: "Salud de la mujer", labelEn: "Women's health" },
  { value: "examenes", label: "Exámenes y certificados", labelEn: "Exams & certificates" },
  { value: "laboratorio", label: "Laboratorio y pruebas", labelEn: "Lab & testing" },
  { value: "tratamientos", label: "Tratamientos", labelEn: "Treatments" },
];

// Bloques de copy reutilizados (marca Nueva Salud + Pasadena).
const WHY_ES = `## ¿Por qué elegir Clínica Hispana Nueva Salud Pasadena?

Somos una clínica hispana y latina: tu centro médico cerca de ti en Pasadena. Te atendemos 100% en español, sin cita previa y con precios accesibles, sin necesidad de seguro médico. Estamos en ${CONTACT_INFO.address}, ${CONTACT_INFO.city}, ${CONTACT_INFO.state} ${CONTACT_INFO.zip}, con horario de lunes a domingo de 9 AM a 9 PM. Nuestro equipo trata a cada paciente con respeto, tiempo y explicaciones claras.`;

const WHY_EN = `## Why choose Clínica Hispana Nueva Salud Pasadena?

We are a Hispanic, Latino-friendly clinic: your medical center near you in Pasadena. We care for you 100% in Spanish, with no appointment needed and with affordable pricing, no insurance required. We are located at ${CONTACT_INFO.address}, ${CONTACT_INFO.city}, ${CONTACT_INFO.state} ${CONTACT_INFO.zip}, open Monday through Sunday from 9 AM to 9 PM. Our team treats every patient with respect, time and clear explanations.`;

const PAYMENT_ES = `## Formas de pago

No es necesario tener seguro médico. Manejamos precios accesibles y transparentes, y aceptamos efectivo y tarjetas. Pregúntanos por el costo de tu servicio antes de tu visita.`;

const PAYMENT_EN = `## Payment

You don't need health insurance. We offer affordable, transparent pricing and accept cash and cards. Ask us about the cost of your service before your visit.`;

const AREAS_ES = `## Centro médico cerca de ti en Pasadena y Houston, TX

Somos una clínica hispana en el área de Houston, TX: atendemos a pacientes de Pasadena y South Houston, South Belt, Genoa, Sagemont, Galena Park, Deer Park, Hobby (Houston) y comunidades cercanas.`;

const AREAS_EN = `## Medical center near you in Pasadena and Houston, TX

We are a Hispanic clinic in the Houston, TX area: we care for patients across Pasadena and South Houston, South Belt, Genoa, Sagemont, Galena Park, Deer Park, Hobby (Houston) and surrounding communities.`;


// Último cambio real del copy de servicios (git). Actualizar al reescribir
// contenido, no en refactors. Un servicio puede sobreescribirlo con dateModified.
export const SERVICES_LAST_MODIFIED = "2026-08-27";

export const SERVICES: Service[] = [
  {
    slug: "condiciones-cronicas",
    dateModified: "2026-09-12",
    order: 1,
    category: "medicina-general",
    icon: "Activity",
    highlighted: true,
    title: "Control de Diabetes, Hipertensión y Colesterol",
    titleEn: "Diabetes, Hypertension & Cholesterol Care",
    shortDescription:
      "Exámenes y control de diabetes, presión alta y dislipidemias (colesterol y triglicéridos), con seguimiento cercano.",
    shortDescriptionEn:
      "Testing and management of diabetes, high blood pressure and dyslipidemia (cholesterol and triglycerides), with close follow-up.",
    description:
      "Control de diabetes, hipertensión y dislipidemias en Pasadena, TX. Laboratorio y seguimiento en español, con precios accesibles.",
    descriptionEn:
      "Diabetes, hypertension and dyslipidemia management in Pasadena, TX. Lab work and follow-up in Spanish, with affordable pricing.",
    keywords: [
      "control de diabetes pasadena",
      "doctor diabetes español pasadena",
      "control de presion alta pasadena",
      "colesterol alto tratamiento pasadena",
    ],
    keywordsEn: [
      "diabetes management pasadena",
      "high blood pressure doctor pasadena",
      "cholesterol management pasadena",
      "chronic disease clinic pasadena",
    ],
    features: [
      "Diagnóstico y monitoreo de laboratorio",
      "Control de glucosa, presión y colesterol",
      "Ajuste de medicamentos",
      "Plan de alimentación y hábitos",
    ],
    featuresEn: [
      "Diagnosis and lab monitoring",
      "Glucose, blood pressure and cholesterol control",
      "Medication adjustment",
      "Nutrition and lifestyle plan",
    ],
    longDescription: `Diabetes, presión alta y colesterol suelen ir juntos y avanzan sin dar síntomas. El control funciona cuando hay un plan con números, revisiones a tiempo y alguien que te explique cada cambio en tu idioma. Eso es lo que hacemos en Clínica Hispana Nueva Salud Pasadena, sin cita y sin seguro.

## ¿Qué condiciones crónicas se controlan en la clínica?

Diabetes tipo 2 y prediabetes, presión arterial alta, colesterol y triglicéridos altos, y las que suelen acompañarlas: sobrepeso, hígado graso y tiroides. Se atiende tanto el diagnóstico nuevo como el paciente que ya toma medicamentos y necesita seguimiento, ajuste de dosis o una segunda opinión sobre su tratamiento.

## ¿Cómo es la primera consulta de control?

Se revisa tu historial y tus medicamentos, se toman presión, peso y glucosa, y se ordenan los análisis de base: A1C, perfil de lípidos, función del riñón y del hígado, y examen de orina. Si el médico lo considera, se hace un [electrocardiograma](/services/electrocardiograma) en la misma visita. Con los resultados en mano se fijan tus metas y tu plan: alimentación, actividad, medicamentos y fecha de la siguiente revisión.

## ¿Qué metas se usan?

Para la mayoría de los adultos: A1C por debajo de 7 %, presión por debajo de 130/80, colesterol LDL por debajo de 100 y triglicéridos por debajo de 150. Las metas se ajustan por edad y otras condiciones; el médico te dice las tuyas y las anota para compararlas en cada visita.

## ¿Cada cuánto debo venir?

Mientras se ajusta el tratamiento, cada 4 a 8 semanas. Cuando los números están en meta, cada 3 meses con A1C si tienes diabetes, y cada 3 a 6 meses para presión y colesterol. Una vez al año se repiten los análisis completos, la revisión de los pies y la vista, y las vacunas de temporada. No hace falta cita para ninguna de estas visitas.

## ¿Qué medicamentos se manejan?

Los de primera línea y sus ajustes: metformina y otros antidiabéticos orales, insulina cuando es necesaria, antihipertensivos y estatinas. Si un medicamento te cae mal o no alcanza la meta, se cambia en consulta. Trae siempre tus frascos para revisar dosis y evitar duplicados.

## ¿Cuánto cuesta el control en Pasadena?

La consulta de seguimiento se cobra como consulta; los análisis, según el panel. Como punto de partida, el Chequeo General Completo cuesta $99 e incluye examen general de sangre, A1C, examen de orina y consulta médica gratis. Para el precio de una consulta o un análisis suelto, llama al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta.

## Servicios relacionados

Los análisis de control se toman en [exámenes de sangre](/services/examenes-sangre). Si la glucosa o la presión aparecieron en un examen de trabajo, como el [examen DOT](/services/examen-dot), aquí se inicia el tratamiento para que puedas certificarte. Los problemas de tiroides se siguen en [tiroides](/services/tiroides).

${AREAS_ES}`,
    longDescriptionEn: `Diabetes, high blood pressure and cholesterol usually go together and progress without symptoms. Control works when there is a plan with numbers, timely checks and someone who explains each change in your language. That is what we do at Clínica Hispana Nueva Salud Pasadena, with no appointment and no insurance.

## Which chronic conditions are managed at the clinic?

Type 2 diabetes and prediabetes, high blood pressure, high cholesterol and triglycerides, and the ones that usually come with them: excess weight, fatty liver and thyroid problems. We see both the new diagnosis and the patient who already takes medication and needs follow-up, dose adjustment or a second opinion on their treatment.

## What is the first follow-up visit like?

Your history and medications are reviewed, blood pressure, weight and glucose are taken, and the baseline tests are ordered: A1C, lipid panel, kidney and liver function, and urinalysis. If the physician sees fit, an [EKG](/en/services/electrocardiograma) is done at the same visit. With results in hand, your targets and plan are set: diet, activity, medications and the date of the next check.

## Which targets are used?

For most adults: A1C under 7%, blood pressure under 130/80, LDL cholesterol under 100 and triglycerides under 150. Targets are adjusted for age and other conditions; the physician tells you yours and writes them down to compare at each visit.

## How often should I come?

While treatment is being adjusted, every 4 to 8 weeks. Once the numbers are on target, every 3 months with an A1C if you have diabetes, and every 3 to 6 months for blood pressure and cholesterol. Once a year the full labs, foot and eye checks and seasonal vaccines are repeated. No appointment is needed for any of these visits.

## Which medications are managed?

First-line ones and their adjustments: metformin and other oral diabetes drugs, insulin when needed, blood pressure medications and statins. If a medication does not agree with you or misses the target, it is changed at the visit. Always bring your bottles to check doses and avoid duplicates.

## How much does follow-up cost in Pasadena?

A follow-up is charged as an office visit; labs depend on the panel. As a starting point, the Complete General Checkup costs $99 and includes a general blood test, A1C, urine test and a free medical visit. For the price of a single visit or test, call (281) 747-8817. No health insurance is needed; we accept cash and cards.

## Related services

Monitoring labs are drawn under [blood tests](/en/services/examenes-sangre). If glucose or blood pressure showed up on a work exam, such as the [DOT physical](/en/services/examen-dot), treatment starts here so you can get certified. Thyroid problems are followed under [thyroid](/en/services/tiroides).

${AREAS_EN}`,
  },
  {
    slug: "tiroides",
    dateModified: "2026-09-12",
    order: 2,
    category: "medicina-general",
    icon: "Thermometer",
    title: "Doctor para la Tiroides: Exámenes y Tratamiento",
    titleEn: "Thyroid Doctor: Testing & Treatment",
    shortDescription:
      "Diagnóstico y tratamiento de enfermedades de la tiroides (hipotiroidismo e hipertiroidismo) con seguimiento en español.",
    shortDescriptionEn:
      "Diagnosis and treatment of thyroid conditions (hypothyroidism and hyperthyroidism) with follow-up in Spanish.",
    description:
      "Doctor para la tiroides en Pasadena, TX: pruebas TSH, T3 y T4, diagnóstico y tratamiento de hipotiroidismo e hipertiroidismo. En español, sin cita.",
    descriptionEn:
      "Thyroid doctor in Pasadena, TX: TSH, T3 and T4 tests, diagnosis and treatment of hypo- and hyperthyroidism. In Spanish, walk-ins welcome.",
    keywords: [
      "tiroides pasadena",
      "examen de tiroides pasadena",
      "hipotiroidismo tratamiento pasadena",
      "doctor tiroides español pasadena",
      "que doctor atiende la tiroides",
      "especialista en tiroides pasadena",
    ],
    keywordsEn: [
      "thyroid testing pasadena",
      "thyroid doctor pasadena",
      "hypothyroidism treatment pasadena",
      "thyroid clinic pasadena",
    ],
    features: [
      "Pruebas de función tiroidea (TSH, T3, T4)",
      "Diagnóstico de hipo e hipertiroidismo",
      "Tratamiento y ajuste de medicamentos",
      "Seguimiento en español",
    ],
    featuresEn: [
      "Thyroid function tests (TSH, T3, T4)",
      "Diagnosis of hypo- and hyperthyroidism",
      "Treatment and medication adjustment",
      "Follow-up in Spanish",
    ],
    longDescription: `Cansancio que no se quita, peso que sube o baja sin razón, frío o calor fuera de lo normal: muchas veces la explicación está en la tiroides. En Clínica Hispana Nueva Salud Pasadena revisamos tu tiroides con análisis de sangre, te explicamos los resultados en español y empezamos el tratamiento en la misma clínica.

## ¿Qué doctor atiende la tiroides?

El médico general o de atención primaria. Es quien ordena las pruebas, interpreta los resultados, inicia el tratamiento y ajusta la dosis en las visitas de seguimiento. El endocrinólogo, el especialista en glándulas, se necesita solo en casos complejos: nódulos que requieren estudio, hipertiroidismo difícil de controlar, embarazo con tiroides alterada o cáncer de tiroides. Si tu caso lo requiere, te lo decimos y te orientamos para la referencia; la mayoría de los pacientes con hipotiroidismo se controlan bien con su médico general.

## ¿Qué pruebas se hacen para revisar la tiroides?

La prueba principal es la TSH, la hormona que le ordena a la tiroides trabajar. Si la TSH sale alterada, se completa con T4 libre y, en algunos casos, T3, para saber si la glándula trabaja de menos (hipotiroidismo) o de más (hipertiroidismo). Cuando hay sospecha de causa autoinmune se piden anticuerpos tiroideos, y si el médico palpa un bulto en el cuello, se indica un [ultrasonido de tiroides](/services/ultrasonido). No hace falta ayuno para estas pruebas y la muestra se toma en la clínica, sin cita.

## ¿Cuáles son los síntomas de hipotiroidismo e hipertiroidismo?

Cuando la tiroides trabaja de menos: cansancio, aumento de peso, frío, piel seca, estreñimiento, caída de cabello, tristeza, periodos menstruales abundantes. Cuando trabaja de más: nerviosismo, palpitaciones, pérdida de peso con buen apetito, calor y sudoración, temblor en las manos, insomnio, periodos escasos. Los dos cuadros se confunden fácilmente con estrés o con otras condiciones, por eso la prueba de sangre es la que da la respuesta.

## ¿Cómo se trata la tiroides?

El hipotiroidismo se trata con levotiroxina, una pastilla diaria que repone la hormona; se toma en ayunas y la dosis se ajusta con controles de TSH cada 6 a 8 semanas hasta encontrar la correcta, y después cada 6 a 12 meses. El hipertiroidismo se trata con medicamentos que frenan la glándula y, según el caso, con referencia al especialista. El tratamiento suele ser de largo plazo; lo importante es no suspenderlo sin hablar con el médico.

## ¿Cuánto cuesta revisar la tiroides en Pasadena?

Te damos el precio de la prueba de TSH y del panel completo por teléfono antes de venir. No necesitas seguro médico; aceptamos efectivo y tarjeta. Las visitas de seguimiento para ajuste de dosis se cobran como consulta.

## ¿Cómo es la visita?

Llegas sin cita, de lunes a domingo de 9 AM a 9 PM. El médico revisa tus síntomas y tu cuello, ordena las pruebas y se toma la muestra ese día. Cuando el resultado está listo, te avisamos, lo revisas con el equipo médico y, si hay que tratar, sales con tu receta y tu fecha de control.

## Servicios relacionados

Los análisis de tiroides forman parte de [exámenes de sangre](/services/examenes-sangre). Si además tienes diabetes, presión alta o colesterol, el seguimiento se integra en [condiciones crónicas](/services/condiciones-cronicas).

${AREAS_ES}`,
    longDescriptionEn: `Tiredness that will not go away, weight going up or down for no reason, feeling cold or hot beyond the usual: the thyroid is often the explanation. At Clínica Hispana Nueva Salud Pasadena we check your thyroid with blood tests, explain the results in Spanish or English and start treatment at the same clinic.

## Which doctor treats the thyroid?

The general or primary-care physician. That is who orders the tests, interprets the results, starts treatment and adjusts the dose at follow-up visits. An endocrinologist, the gland specialist, is needed only in complex cases: nodules that need workup, hyperthyroidism that is hard to control, pregnancy with an altered thyroid or thyroid cancer. If your case calls for it, we tell you and guide the referral; most patients with hypothyroidism do well with their primary-care physician.

## Which tests check the thyroid?

The main test is TSH, the hormone that tells the thyroid to work. If TSH is off, it is completed with free T4 and, in some cases, T3, to learn whether the gland is underactive (hypothyroidism) or overactive (hyperthyroidism). When an autoimmune cause is suspected, thyroid antibodies are ordered, and if the physician feels a lump in the neck, a [thyroid ultrasound](/en/services/ultrasonido) is indicated. No fasting is needed for these tests, and the sample is drawn at the clinic, no appointment required.

## What are the symptoms of hypothyroidism and hyperthyroidism?

When the thyroid is underactive: tiredness, weight gain, feeling cold, dry skin, constipation, hair loss, low mood, heavy periods. When it is overactive: nervousness, palpitations, weight loss despite a good appetite, feeling hot and sweaty, hand tremor, insomnia, light periods. Both pictures are easily mistaken for stress or other conditions, which is why the blood test gives the answer.

## How is the thyroid treated?

Hypothyroidism is treated with levothyroxine, a daily pill that replaces the hormone; it is taken on an empty stomach, and the dose is adjusted with TSH checks every 6 to 8 weeks until the right one is found, then every 6 to 12 months. Hyperthyroidism is treated with medications that slow the gland and, depending on the case, with a specialist referral. Treatment is usually long term; the key is not to stop it without talking to the physician.

## How much does a thyroid check cost in Pasadena?

We give you the price of the TSH test and of the full panel by phone before you come. No health insurance is needed; we accept cash and cards. Follow-up visits for dose adjustment are charged as an office visit.

## What is the visit like?

Walk in, Monday to Sunday, 9 AM to 9 PM. The physician reviews your symptoms and your neck, orders the tests, and the sample is drawn that day. When the result is ready we let you know, you review it with the medical team and, if treatment is needed, you leave with your prescription and your follow-up date.

## Related services

Thyroid tests are part of [blood tests](/en/services/examenes-sangre). If you also have diabetes, high blood pressure or cholesterol, follow-up is combined under [chronic conditions](/en/services/condiciones-cronicas).

${AREAS_EN}`,
  },
  {
    slug: "alergias",
    dateModified: "2026-09-12",
    order: 3,
    category: "medicina-general",
    icon: "Leaf",
    title: "Exámenes y Tratamiento de Alergias",
    titleEn: "Allergy Testing & Treatment",
    shortDescription:
      "Evaluación y tratamiento de alergias estacionales, respiratorias y de la piel, con atención en español.",
    shortDescriptionEn:
      "Evaluation and treatment of seasonal, respiratory and skin allergies, with care in Spanish.",
    description:
      "Exámenes y tratamiento de alergias en Pasadena, TX. Diagnóstico y manejo en español, con precios accesibles.",
    descriptionEn:
      "Allergy testing and treatment in Pasadena, TX. Diagnosis and management in Spanish, with affordable pricing.",
    keywords: [
      "alergias pasadena",
      "tratamiento de alergias pasadena",
      "doctor de alergias español pasadena",
      "examen de alergias pasadena",
    ],
    keywordsEn: [
      "allergy treatment pasadena",
      "allergy testing pasadena",
      "allergy doctor pasadena",
      "allergy clinic pasadena",
    ],
    features: [
      "Evaluación de síntomas y desencadenantes",
      "Tratamiento de alergias respiratorias y de piel",
      "Manejo de rinitis y congestión",
      "Atención en español",
    ],
    featuresEn: [
      "Evaluation of symptoms and triggers",
      "Treatment of respiratory and skin allergies",
      "Management of rhinitis and congestion",
      "Care in Spanish",
    ],
    longDescription: `Estornudos cada mañana, ojos que pican, congestión que no se va con nada: en Houston las alergias no descansan, con polen de roble en primavera, ambrosía en otoño y moho y ácaros todo el año. En Clínica Hispana Nueva Salud Pasadena se evalúan y se tratan sin cita, en español.

## ¿Cómo sé si es alergia o un resfriado?

La alergia no da fiebre ni dolor de cuerpo, dura semanas o meses, pica (nariz, ojos, paladar) y empeora en ciertos lugares o épocas: al salir a la calle, al limpiar el polvo, con las mascotas, en primavera u otoño. El resfriado dura una o dos semanas, puede dar fiebre y no pica. Cuando los síntomas se repiten cada año en la misma temporada, casi siempre es alergia.

## ¿Qué alergias se atienden en la clínica?

Rinitis alérgica estacional y de todo el año (polen, ácaros, moho, caspa de mascota), conjuntivitis alérgica, urticaria y ronchas, dermatitis por contacto o por picaduras, y la tos y el silbido de pecho que la alergia provoca en quien tiene asma. Las alergias alimentarias y a medicamentos se evalúan en consulta y, si requieren pruebas especializadas, se orienta la referencia a un alergólogo.

## ¿Cómo se identifica la causa?

Con una historia detallada: cuándo empiezan los síntomas, dónde, qué los mejora y qué los empeora, y si hay familiares alérgicos. En muchos casos eso basta para saber el desencadenante y empezar el tratamiento. Cuando hace falta confirmarlo, se puede pedir un análisis de sangre de anticuerpos a los alérgenos más comunes en esta zona.

## ¿Qué tratamiento se da?

Según el síntoma principal: antihistamínicos de nueva generación que no dan sueño, aerosol nasal con esteroide para la congestión, gotas para los ojos, cremas para la piel y, en las crisis de urticaria, medicamento de acción rápida. Si hay asma, se ajusta el inhalador. El tratamiento se explica con horario y duración, y se revisa en unas semanas para ajustar.

## ¿Cuándo es una emergencia?

Hinchazón de labios, lengua o garganta, dificultad para respirar, mareo o ronchas que se extienden rápido tras comer algo, una picadura o un medicamento pueden ser una reacción grave (anafilaxia): llama al 911 o acude a emergencias de inmediato. Si ya te ha pasado, pregunta en consulta por el autoinyector de epinefrina.

## ¿Cómo reduzco los síntomas en casa?

Ducharte y cambiarte al llegar de la calle en temporada de polen, cerrar ventanas y usar aire acondicionado con filtro, lavar sábanas con agua caliente cada semana contra los ácaros, fundas antiácaros en almohadas, controlar la humedad para evitar moho y mantener a las mascotas fuera de la habitación. Cada una de estas medidas baja la dosis de medicamento que necesitas.

## ¿Cuánto cuesta la consulta de alergias en Pasadena?

Te damos el precio de la consulta y, si se pide, del análisis por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta. Llegas sin cita de 9 AM a 9 PM. Si tus síntomas son más de tos y fiebre que de comezón, revisa [enfermedades respiratorias](/services/enfermedades-respiratorias); las picaduras o heridas de piel infectadas se atienden en [curación de heridas](/services/curacion-heridas).

${AREAS_ES}`,
    longDescriptionEn: `Sneezing every morning, itchy eyes, congestion that nothing clears: in Houston allergies never rest, with oak pollen in spring, ragweed in fall and mold and dust mites all year. At Clínica Hispana Nueva Salud Pasadena they are evaluated and treated with no appointment, in Spanish or English.

## How do I know if it is an allergy or a cold?

An allergy causes no fever or body aches, lasts weeks or months, itches (nose, eyes, roof of the mouth) and gets worse in certain places or seasons: outdoors, when dusting, around pets, in spring or fall. A cold lasts one or two weeks, can cause fever and does not itch. When symptoms return every year in the same season, it is almost always an allergy.

## Which allergies are treated at the clinic?

Seasonal and year-round allergic rhinitis (pollen, dust mites, mold, pet dander), allergic conjunctivitis, hives and welts, contact or insect-bite dermatitis, and the cough and wheezing that allergies trigger in people with asthma. Food and drug allergies are evaluated at the visit and, if they require specialized testing, we guide the referral to an allergist.

## How is the cause identified?

Through a detailed history: when the symptoms start, where, what improves them and what makes them worse, and whether there are allergic relatives. In many cases that is enough to know the trigger and start treatment. When confirmation is needed, a blood test for antibodies to the most common allergens in this area can be ordered.

## What treatment is given?

According to the main symptom: newer-generation antihistamines that do not cause drowsiness, a steroid nasal spray for congestion, eye drops, skin creams and, in hives flare-ups, fast-acting medication. If there is asthma, the inhaler is adjusted. The treatment is explained with schedule and duration, and reviewed in a few weeks to adjust.

## When is it an emergency?

Swelling of the lips, tongue or throat, trouble breathing, dizziness or hives spreading fast after eating something, an insect sting or a medication can be a severe reaction (anaphylaxis): call 911 or go to the emergency room right away. If it has happened to you before, ask at the visit about an epinephrine auto-injector.

## How do I reduce symptoms at home?

Shower and change clothes when you come in from outside during pollen season, keep windows closed and use air conditioning with a filter, wash sheets in hot water every week against dust mites, use mite-proof pillow covers, control humidity to prevent mold and keep pets out of the bedroom. Each of these measures lowers the dose of medication you need.

## How much does an allergy visit cost in Pasadena?

We give you the price of the visit and, if ordered, of the blood test by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards. Walk in from 9 AM to 9 PM. If your symptoms are more cough and fever than itching, see [respiratory illnesses](/en/services/enfermedades-respiratorias); infected bites or skin wounds are treated under [wound care](/en/services/curacion-heridas).

${AREAS_EN}`,
  },
  {
    slug: "enfermedades-respiratorias",
    dateModified: "2026-09-12",
    order: 4,
    category: "medicina-general",
    icon: "Wind",
    title: "Pruebas de Flu y COVID y Enfermedades Respiratorias",
    titleEn: "Flu & COVID Testing and Respiratory Illness Care",
    shortDescription:
      "Pruebas de detección de influenza (flu) y COVID, y tratamiento de gripe, tos y enfermedades respiratorias.",
    shortDescriptionEn:
      "Influenza (flu) and COVID detection testing, plus treatment of flu, cough and respiratory illnesses.",
    description:
      "Pruebas de flu y COVID y tratamiento de enfermedades respiratorias en Pasadena, TX. Sin cita previa, en español.",
    descriptionEn:
      "Flu and COVID testing and respiratory illness treatment in Pasadena, TX. Walk-ins welcome, in Spanish.",
    keywords: [
      "prueba de covid pasadena",
      "prueba de flu pasadena",
      "tratamiento gripe pasadena",
      "enfermedades respiratorias pasadena",
    ],
    keywordsEn: [
      "covid test pasadena",
      "flu test pasadena",
      "flu treatment pasadena",
      "respiratory illness pasadena",
    ],
    features: [
      "Prueba rápida de flu y COVID",
      "Diagnóstico el mismo día",
      "Tratamiento de gripe, tos y bronquitis",
      "Atención sin cita en español",
    ],
    featuresEn: [
      "Rapid flu and COVID testing",
      "Same-day diagnosis",
      "Treatment of flu, cough and bronchitis",
      "Walk-in care in Spanish",
    ],
    longDescription: `Fiebre, tos y cuerpo cortado se parecen en la gripe, el COVID-19 y un resfriado fuerte, pero el tratamiento no es el mismo. En Clínica Hispana Nueva Salud Pasadena las pruebas rápidas se hacen en la clínica, sin cita, y sales con el diagnóstico y el tratamiento en la misma visita.

## ¿Es gripe, COVID o resfriado?

El resfriado empieza despacio con congestión y estornudos, casi sin fiebre. La influenza llega de golpe: fiebre alta, dolor de cuerpo, cansancio intenso y tos seca. El COVID-19 puede parecerse a cualquiera de los dos y a veces añade pérdida de olfato o gusto. Como los síntomas se cruzan, la única forma de saberlo es la prueba, y de ella depende si conviene un antiviral.

## ¿Qué pruebas se hacen y cuánto tardan?

Prueba rápida de influenza A y B y prueba de COVID-19 con muestra nasal, con resultado en la clínica durante la misma visita. Cuando hay dolor de garganta con placas o fiebre sin tos, se añade la [prueba de estreptococo](/services/prueba-strep). Si la tos lleva más de tres semanas, hay dificultad para respirar o sonidos en el pecho, el médico evalúa bronquitis o neumonía y decide si hace falta una radiografía.

## ¿Qué tratamiento se da?

Depende del resultado. Para la influenza existe un antiviral que acorta la enfermedad si se empieza en las primeras 48 horas, sobre todo en mayores de 65, embarazadas y personas con asma, diabetes o enfermedades del corazón. Para el COVID-19 hay antivirales indicados en los primeros días para quienes tienen mayor riesgo. Para el resfriado y la mayoría de las bronquitis, que son virales, el tratamiento es de los síntomas: los antibióticos no sirven y solo se recetan cuando hay una infección bacteriana confirmada, como sinusitis o neumonía.

## ¿Cuándo debo ir a emergencias?

Dificultad para respirar en reposo, labios o uñas azulados, dolor en el pecho, confusión, fiebre que no baja después de tres días de tratamiento, o un niño que respira muy rápido, no bebe líquidos o está muy decaído. En esos casos no esperes a la clínica.

## ¿Cómo evito contagiar a mi familia?

Con influenza o COVID, quédate en casa mientras tengas fiebre y hasta 24 horas después de que baje sin medicamento, usa cubrebocas si convives con adultos mayores o bebés, lávate las manos y ventila la casa. La [vacuna de la influenza](/services/vacunas) cada temporada reduce las probabilidades de que la próxima gripe sea grave.

## ¿Cuánto cuesta la consulta con prueba en Pasadena?

Te damos el precio de la consulta y de cada prueba por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM; si tienes fiebre y tos, pide un cubrebocas en recepción. Se toma la muestra, se espera el resultado en la clínica y el médico te examina el pecho, la garganta y los oídos. Sales con receta, indicaciones y, si lo necesitas, una constancia para el trabajo o la escuela. Las [alergias](/services/alergias) que imitan un resfriado que nunca se quita también se atienden aquí.

${AREAS_ES}`,
    longDescriptionEn: `Fever, cough and body aches look alike in the flu, COVID-19 and a bad cold, but the treatment is not the same. At Clínica Hispana Nueva Salud Pasadena rapid tests are done in the clinic, with no appointment, and you leave with the diagnosis and treatment at the same visit.

## Is it the flu, COVID or a cold?

A cold starts slowly with congestion and sneezing, with little or no fever. The flu hits suddenly: high fever, body aches, intense tiredness and a dry cough. COVID-19 can look like either and sometimes adds loss of smell or taste. Because the symptoms overlap, the only way to know is the test, and whether an antiviral makes sense depends on it.

## Which tests are done, and how long do they take?

A rapid influenza A and B test and a COVID-19 test with a nasal swab, with the result in the clinic during the same visit. When there is a sore throat with white patches or fever without cough, the [strep test](/en/services/prueba-strep) is added. If the cough has lasted more than three weeks, there is trouble breathing or sounds in the chest, the physician evaluates for bronchitis or pneumonia and decides whether an X-ray is needed.

## What treatment is given?

It depends on the result. For the flu there is an antiviral that shortens the illness if started within the first 48 hours, especially for people over 65, pregnant women and those with asthma, diabetes or heart disease. For COVID-19 there are antivirals indicated in the first days for those at higher risk. For colds and most bronchitis, which are viral, treatment is for the symptoms: antibiotics do not help and are prescribed only when a bacterial infection is confirmed, such as sinusitis or pneumonia.

## When should I go to the emergency room?

Trouble breathing at rest, blue lips or nails, chest pain, confusion, fever that does not come down after three days of treatment, or a child who breathes very fast, will not drink fluids or is very listless. In those cases do not wait for the clinic.

## How do I avoid infecting my family?

With the flu or COVID, stay home while you have a fever and until 24 hours after it comes down without medication, wear a mask if you live with older adults or babies, wash your hands and air out the house. The [flu vaccine](/en/services/vacunas) every season lowers the odds that the next flu will be severe.

## How much does a visit with testing cost in Pasadena?

We give you the price of the visit and of each test by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards.

## What is the visit like?

Walk in from 9 AM to 9 PM; if you have fever and cough, ask for a mask at the front desk. The sample is taken, the result is awaited in the clinic and the physician examines your chest, throat and ears. You leave with a prescription, instructions and, if needed, a note for work or school. [Allergies](/en/services/alergias) that mimic a cold that never goes away are also seen here.

${AREAS_EN}`,
  },
  {
    slug: "examen-fisico-escolar",
    dateModified: "2026-09-12",
    order: 5,
    category: "examenes",
    icon: "ClipboardList",
    title: "Chequeos Físicos Escolares y Deportivos",
    titleEn: "School & Sports Physical Exams",
    shortDescription:
      "Exámenes físicos para la escuela y los deportes, rápidos y con los formularios completados.",
    shortDescriptionEn:
      "Physical exams for school and sports, fast and with the forms completed.",
    description:
      "Chequeos físicos escolares y deportivos en Pasadena, TX. Rápidos, en español y con precios accesibles.",
    descriptionEn:
      "School and sports physical exams in Pasadena, TX. Fast, in Spanish, with affordable pricing.",
    keywords: [
      "examen fisico escolar pasadena",
      "physical para la escuela pasadena",
      "examen deportivo pasadena",
      "chequeo escolar pasadena",
    ],
    keywordsEn: [
      "school physical pasadena",
      "sports physical pasadena",
      "school physical exam pasadena",
      "kids physical pasadena",
    ],
    features: [
      "Examen físico completo",
      "Revisión de signos vitales",
      "Formularios escolares y deportivos llenados",
      "Atención en español",
    ],
    featuresEn: [
      "Complete physical exam",
      "Vital-signs check",
      "School and sports forms completed",
      "Care in Spanish",
    ],
    longDescription: `Cada agosto llega la misma carrera: el formulario de la escuela o del equipo, la firma del médico y el plazo que se acaba. En Clínica Hispana Nueva Salud Pasadena el examen físico escolar y deportivo se hace sin cita, en español, y sales con el formulario llenado y firmado el mismo día.

## ¿Qué formularios se llenan?

El de evaluación física previa a la participación deportiva que usan las escuelas de Texas (el formulario de la UIL para deportes escolares), el físico de ingreso que piden algunas escuelas y guarderías, y los formularios de campamentos, ligas y programas. Trae el formulario impreso o en el teléfono; si tu escuela no te dio uno, el médico emite una constancia de examen físico.

## ¿Qué revisa el médico?

Historial de salud y antecedentes familiares, con atención especial a desmayos, dolor de pecho con el ejercicio, asma, alergias, lesiones previas y muertes cardiacas tempranas en la familia; signos vitales con peso, talla y presión arterial; visión y audición; corazón y pulmones; abdomen; columna y articulaciones; y un chequeo general de crecimiento. Si algo requiere estudio, por ejemplo un soplo, el médico lo indica antes de firmar.

## ¿El físico deportivo es lo mismo que el escolar?

Casi. El deportivo pone el foco en el corazón, la respiración y las lesiones, porque su objetivo es que el joven entrene con seguridad; el escolar es un chequeo general de crecimiento y salud. En la misma visita se pueden cubrir los dos y llenar ambos formularios.

## ¿Cada cuánto se necesita?

El físico deportivo escolar en Texas se renueva cada año, normalmente antes de la temporada. El de ingreso se pide al entrar a una nueva escuela o etapa. Conviene hacerlo con semanas de anticipación: si aparece algo que estudiar, hay tiempo de resolverlo sin perder la inscripción.

## ¿Qué debo traer?

El formulario de la escuela o del equipo, con la parte del padre o tutor ya llenada y firmada; identificación del adulto; el registro de vacunas del menor, si la escuela lo pide; lentes o aparato auditivo si los usa; y la lista de medicamentos, incluido el inhalador. Un padre, madre o tutor acompaña a los menores.

## ¿Cuánto cuesta el examen físico escolar en Pasadena?

Te damos el precio por teléfono al (281) 747-8817 antes de venir. No necesitas seguro médico; aceptamos efectivo y tarjeta. Si el joven necesita además un análisis o una vacuna, se hace en la misma visita y se cotiza aparte.

## Servicios relacionados

Si el formulario pide vacunas al día, consulta [vacunas](/services/vacunas). Para un chequeo con análisis de sangre, [exámenes de sangre](/services/examenes-sangre). Si el joven tiene asma o alergias, el seguimiento está en [alergias](/services/alergias) y [enfermedades respiratorias](/services/enfermedades-respiratorias).

${AREAS_ES}`,
    longDescriptionEn: `Every August brings the same rush: the school or team form, the physician's signature and a deadline running out. At Clínica Hispana Nueva Salud Pasadena the school and sports physical is done with no appointment, in Spanish or English, and you leave with the form completed and signed the same day.

## Which forms are completed?

The pre-participation physical evaluation used by Texas schools (the UIL form for school sports), the entry physical some schools and daycares require, and forms for camps, leagues and programs. Bring the form printed or on your phone; if your school did not give you one, the physician issues a physical exam certificate.

## What does the physician check?

Health history and family history, with special attention to fainting, chest pain with exercise, asthma, allergies, previous injuries and early cardiac deaths in the family; vital signs with weight, height and blood pressure; vision and hearing; heart and lungs; abdomen; spine and joints; and a general growth check. If something needs workup, such as a murmur, the physician orders it before signing.

## Is the sports physical the same as the school physical?

Almost. The sports physical focuses on the heart, breathing and injuries, because its goal is for the student to train safely; the school physical is a general growth and health check. Both can be covered at the same visit and both forms completed.

## How often is it needed?

The school sports physical in Texas is renewed every year, usually before the season. The entry physical is required when starting a new school or stage. It is best done weeks in advance: if something needs workup, there is time to resolve it without losing enrollment.

## What should I bring?

The school or team form, with the parent or guardian section already filled out and signed; the adult's ID; the child's vaccine record, if the school asks for it; glasses or hearing aid if used; and the medication list, including the inhaler. A parent or guardian accompanies minors.

## How much does a school physical cost in Pasadena?

We give you the price by phone at (281) 747-8817 before you come. No health insurance is needed; we accept cash and cards. If the student also needs a lab test or a vaccine, it is done at the same visit and quoted separately.

## Related services

If the form requires up-to-date vaccines, see [vaccines](/en/services/vacunas). For a checkup with lab work, [blood tests](/en/services/examenes-sangre). If the student has asthma or allergies, follow-up is under [allergies](/en/services/alergias) and [respiratory illnesses](/en/services/enfermedades-respiratorias).

${AREAS_EN}`,
  },
  {
    slug: "ginecologia",
    dateModified: "2026-09-12",
    order: 6,
    category: "salud-mujer",
    icon: "Flower2",
    highlighted: true,
    title: "Atención Ginecológica: Papanicolaou y Cultivos",
    titleEn: "Gynecology Care: Pap Smear & Cultures",
    shortDescription:
      "Papanicolaou, cultivos vaginales y tratamiento de infecciones vaginales, con privacidad y en español.",
    shortDescriptionEn:
      "Pap smear, vaginal cultures and treatment of vaginal infections, with privacy and in Spanish.",
    description:
      "Ginecología en Pasadena, TX: papanicolaou, cultivos vaginales y tratamiento de infecciones. Atención en español, sin cita y con precios accesibles.",
    descriptionEn:
      "Gynecology at your Hispanic clinic in Pasadena, TX, near Houston: Pap smear, vaginal cultures and infection treatment. In Spanish, with affordable pricing.",
    keywords: [
      "ginecologo pasadena español",
      "ginecologos hispanos cerca de mi",
      "clinica hispana ginecologia houston tx",
      "papanicolaou pasadena",
      "cultivo vaginal pasadena",
      "infeccion vaginal tratamiento pasadena",
    ],
    keywordsEn: [
      "gynecologist pasadena spanish",
      "hispanic gynecologist near me",
      "pap smear pasadena",
      "vaginal culture pasadena",
      "vaginal infection treatment pasadena",
    ],
    features: [
      "Papanicolaou y chequeo ginecológico",
      "Cultivos vaginales",
      "Tratamiento de infecciones vaginales",
      "Atención privada en español",
    ],
    featuresEn: [
      "Pap smear and gynecological checkup",
      "Vaginal cultures",
      "Treatment of vaginal infections",
      "Private care in Spanish",
    ],
    longDescription: `Atención ginecológica en español, sin cita y con la privacidad que corresponde. En Clínica Hispana Nueva Salud Pasadena el Papanicolaou, los cultivos, las pruebas y el tratamiento de infecciones se hacen en la misma visita, y cada paso se explica antes de hacerlo.

## ¿Qué servicios ginecológicos ofrece la clínica?

Papanicolaou y prueba de VPH; cultivos vaginales y de orina; diagnóstico y tratamiento de infecciones vaginales por hongos o bacterias y de infecciones urinarias; pruebas de infecciones de transmisión sexual; prueba de embarazo y consulta prenatal inicial; consulta de anticoncepción con inicio de pastillas o inyección y orientación sobre los demás métodos; retiro del implante subdérmico; ultrasonido pélvico; y evaluación de la menopausia. Si un caso requiere cirugía o un especialista, se orienta la referencia.

## ¿Cada cuánto se hace el Papanicolaou?

Desde los 21 años, cada 3 años si el resultado es normal. Entre los 30 y los 65, puede combinarse con la prueba de VPH y espaciarse a cada 5 años. Después de los 65, con resultados previos normales, suele suspenderse. Si tuviste un resultado anormal, el intervalo lo fija el médico. Para la toma, evita relaciones, duchas vaginales y óvulos 48 horas antes y procura no venir con el periodo.

## ¿Qué pasa si tengo flujo, comezón o ardor?

Se toma un cultivo o una prueba rápida y en la mayoría de los casos el tratamiento empieza el mismo día: óvulos, crema o pastillas según la causa. Los síntomas que se confunden entre sí, como hongos, vaginosis bacteriana e infección urinaria, se distinguen con la prueba, no a ojo, para no tratar mal. Si la infección se repite, se buscan causas como diabetes o cambios hormonales.

## ¿Atienden pruebas y tratamiento de ETS?

Sí, con la misma confidencialidad que el resto de la consulta. Se hacen pruebas de clamidia, gonorrea, sífilis, VIH y otras según tu situación, y el tratamiento se indica en la misma clínica cuando el resultado lo confirma. No se pide estatus migratorio ni se comparte información con terceros.

## ¿Cuánto cuesta la consulta ginecológica en Pasadena?

Los precios publicados son los de las promociones vigentes: Chequeo Completo de la Mujer por $179, que incluye ultrasonido pélvico, Papanicolaou, examen de orina y consulta médica gratis; y Salud Íntima Femenina por $69, con cultivo íntimo, consulta médica y examen de orina gratis. Para una consulta o prueba suelta, llama al (281) 747-8817. No necesitas seguro médico.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM. La consulta empieza con una conversación sobre tu ciclo, tu método anticonceptivo y tus molestias; el examen se hace solo si es necesario y se explica antes. Puedes venir acompañada. Sales con el tratamiento o con la fecha para revisar resultados.

## Servicios relacionados

Si buscas confirmar un embarazo, empieza por la [prueba de embarazo](/services/prueba-embarazo). Para elegir o cambiar método, consulta [anticonceptivos](/services/anticonceptivos); para retirar el implante, [extracción de implantes](/services/extraccion-implantes). El estudio por imagen se hace en [ultrasonido](/services/ultrasonido).

${AREAS_ES}`,
    longDescriptionEn: `Gynecological care in Spanish or English, with no appointment and the privacy it deserves. At Clínica Hispana Nueva Salud Pasadena the Pap smear, cultures, testing and treatment of infections are done at the same visit, and each step is explained before it happens.

## Which gynecology services does the clinic offer?

Pap smear and HPV test; vaginal and urine cultures; diagnosis and treatment of yeast or bacterial vaginal infections and urinary infections; sexually transmitted infection tests; pregnancy test and initial prenatal visit; contraception counseling with pills or the injection started here and guidance on the other methods; subdermal implant removal; pelvic ultrasound; and menopause evaluation. If a case requires surgery or a specialist, we guide the referral.

## How often is a Pap smear done?

From age 21, every 3 years if the result is normal. Between 30 and 65 it can be combined with an HPV test and spaced to every 5 years. After 65, with previous normal results, it is usually stopped. If you had an abnormal result, the physician sets the interval. Before the sample, avoid sex, douching and vaginal suppositories for 48 hours and try not to come during your period.

## What if I have discharge, itching or burning?

A culture or rapid test is taken and in most cases treatment starts the same day: suppositories, cream or pills depending on the cause. Symptoms that mimic each other, such as yeast, bacterial vaginosis and urinary infection, are told apart by the test, not by eye, so you are not treated for the wrong thing. If the infection keeps coming back, causes such as diabetes or hormonal changes are looked for.

## Do you test and treat STIs?

Yes, with the same confidentiality as the rest of the visit. Tests for chlamydia, gonorrhea, syphilis, HIV and others are done according to your situation, and treatment is prescribed at the same clinic once the result confirms it. No immigration status is requested and no information is shared with third parties.

## How much does a gynecology visit cost in Pasadena?

The published prices are those of the current promotions: Complete Women's Checkup for $179, which includes a pelvic ultrasound, Pap smear, urine test and a free medical visit; and Women's Intimate Health for $69, with an intimate culture, medical visit and free urine test. For a single visit or test, call (281) 747-8817. No health insurance is needed.

## What is the visit like?

Walk in from 9 AM to 9 PM. The visit starts with a conversation about your cycle, your birth control and your symptoms; the exam is done only if needed and is explained first. You may bring someone with you. You leave with treatment or with the date to review results.

## Related services

If you want to confirm a pregnancy, start with the [pregnancy test](/en/services/prueba-embarazo). To choose or switch methods, see [birth control](/en/services/anticonceptivos); to remove the implant, [implant removal](/en/services/extraccion-implantes). Imaging is done under [ultrasound](/en/services/ultrasonido).

${AREAS_EN}`,
  },
  {
    slug: "prueba-embarazo",
    dateModified: "2026-09-12",
    order: 7,
    category: "salud-mujer",
    icon: "Baby",
    title: "Examen y Diagnóstico de Embarazo",
    titleEn: "Pregnancy Testing & Confirmation",
    shortDescription:
      "Pruebas de embarazo confiables y orientación sobre tus siguientes pasos, en español.",
    shortDescriptionEn:
      "Reliable pregnancy tests and guidance on your next steps, in Spanish.",
    description:
      "Examen y diagnóstico de embarazo en Pasadena, TX. Pruebas confiables y orientación en español, con precios accesibles.",
    descriptionEn:
      "Pregnancy testing and confirmation in Pasadena, TX. Reliable tests and guidance in Spanish, with affordable pricing.",
    keywords: [
      "prueba de embarazo pasadena",
      "examen de embarazo pasadena",
      "confirmar embarazo pasadena",
      "test de embarazo español pasadena",
    ],
    keywordsEn: [
      "pregnancy test pasadena",
      "pregnancy confirmation pasadena",
      "confirm pregnancy pasadena",
      "pregnancy testing pasadena",
    ],
    features: [
      "Prueba de embarazo confiable",
      "Confirmación médica",
      "Orientación sobre próximos pasos",
      "Atención en español",
    ],
    featuresEn: [
      "Reliable pregnancy test",
      "Medical confirmation",
      "Guidance on next steps",
      "Care in Spanish",
    ],
    longDescription: `Un retraso, náuseas por la mañana o simplemente la duda: la prueba de embarazo en Clínica Hispana Nueva Salud Pasadena se hace sin cita, con resultado confirmado por el equipo médico y una conversación en español sobre lo que sigue, sea cual sea tu decisión.

## ¿Qué prueba de embarazo se hace y cuándo es confiable?

La prueba de orina detecta la hormona del embarazo (hCG) y es confiable desde el primer día de retraso del periodo; si se hace antes, puede dar negativo aunque haya embarazo. La prueba de sangre detecta la hormona unos días antes que la de orina y, en su versión cuantitativa, mide la cantidad, útil para calcular el tiempo o vigilar un embarazo temprano. El médico te indica cuál conviene según tus fechas.

## ¿Qué pasa si la prueba sale positiva?

Se confirma el resultado, se calcula la fecha probable de parto a partir de tu último periodo y se revisan tus antecedentes: presión, diabetes, medicamentos que tomas y embarazos previos. Se indica ácido fólico y vitaminas prenatales desde ese día, se piden los análisis iniciales si lo deseas, y se programa un [ultrasonido](/services/ultrasonido) entre las 6 y las 8 semanas para confirmar que el embarazo está en el útero y ver el latido. Para el control prenatal completo te orientamos con una referencia a obstetricia.

## ¿Y si sale negativa pero el periodo no llega?

Se repite la prueba en una semana o se hace la de sangre. Si sigue negativa, se buscan otras causas del retraso: estrés, cambios de peso, tiroides, ovarios poliquísticos o la perimenopausia. Un análisis de tiroides y hormonas suele aclararlo, y el seguimiento se hace en [ginecología](/services/ginecologia).

## ¿Es confidencial y sin juicios?

Sí. El resultado es tuyo y no se comparte con nadie sin tu permiso. No se pide estatus migratorio. La conversación sobre tus opciones es informativa y respetuosa; el equipo médico responde tus preguntas y te orienta a los recursos que necesites.

## ¿Cuándo debo venir de inmediato?

Si con la prueba positiva tienes sangrado, dolor fuerte en un lado del vientre, mareo o desmayo, ven el mismo día o acude a emergencias: hay que descartar un embarazo fuera del útero. Vómitos que no permiten retener líquidos también requieren atención.

## ¿Cuánto cuesta la prueba de embarazo en Pasadena?

Te damos el precio de la prueba de orina o de sangre por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta. El Chequeo Completo de la Mujer por $179 incluye ultrasonido pélvico, Papanicolaou, examen de orina y consulta, y puede ser un buen punto de partida si además llevas tiempo sin revisión.

## Servicios relacionados

Si buscas evitar el embarazo, consulta [anticonceptivos](/services/anticonceptivos). Si estás embarazada y necesitas vacunas o análisis, se hacen en la clínica: [vacunas](/services/vacunas) y [exámenes de sangre](/services/examenes-sangre).

${AREAS_ES}`,
    longDescriptionEn: `A late period, morning nausea or simply the doubt: the pregnancy test at Clínica Hispana Nueva Salud Pasadena is done with no appointment, with the result confirmed by the medical team and a conversation in Spanish or English about what comes next, whatever your decision.

## Which pregnancy test is done, and when is it reliable?

The urine test detects the pregnancy hormone (hCG) and is reliable from the first day of a missed period; done earlier, it can be negative even if there is a pregnancy. The blood test detects the hormone a few days before the urine test and, in its quantitative version, measures the amount, useful for dating or monitoring an early pregnancy. The physician tells you which one fits your dates.

## What happens if the test is positive?

The result is confirmed, the due date is estimated from your last period and your history is reviewed: blood pressure, diabetes, medications you take and previous pregnancies. Folic acid and prenatal vitamins are started that day, initial lab work is ordered if you wish, and an [ultrasound](/en/services/ultrasonido) is scheduled between 6 and 8 weeks to confirm the pregnancy is in the uterus and see the heartbeat. For full prenatal care we guide you with an obstetrics referral.

## What if it is negative but the period does not come?

The test is repeated in a week or the blood test is done. If it stays negative, other causes of the delay are looked for: stress, weight changes, thyroid, polycystic ovaries or perimenopause. A thyroid and hormone test usually clears it up, and follow-up is done under [gynecology](/en/services/ginecologia).

## Is it confidential and judgment-free?

Yes. The result is yours and is not shared with anyone without your permission. No immigration status is requested. The conversation about your options is informative and respectful; the medical team answers your questions and points you to the resources you need.

## When should I come right away?

If with a positive test you have bleeding, strong pain on one side of the belly, dizziness or fainting, come the same day or go to the emergency room: a pregnancy outside the uterus must be ruled out. Vomiting that keeps you from holding down fluids also needs care.

## How much does a pregnancy test cost in Pasadena?

We give you the price of the urine or blood test by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards. The Complete Women's Checkup for $179 includes a pelvic ultrasound, Pap smear, urine test and visit, and can be a good starting point if you have also gone a while without a checkup.

## Related services

If you want to prevent pregnancy, see [birth control](/en/services/anticonceptivos). If you are pregnant and need vaccines or lab work, they are done at the clinic: [vaccines](/en/services/vacunas) and [blood tests](/en/services/examenes-sangre).

${AREAS_EN}`,
  },
  {
    slug: "anticonceptivos",
    dateModified: "2026-09-12",
    order: 8,
    category: "salud-mujer",
    icon: "Tablets",
    title: "Tratamientos Anticonceptivos",
    titleEn: "Contraceptive Methods",
    shortDescription:
      "Orientación y métodos anticonceptivos (pastillas, inyección y más) para decidir con información, en español.",
    shortDescriptionEn:
      "Guidance and contraceptive methods (pills, injection and more) to decide with clear information, in Spanish.",
    description:
      "Tratamientos anticonceptivos en Pasadena, TX: orientación, pastillas e inyección. En español, con precios accesibles.",
    descriptionEn:
      "Contraceptive methods in Pasadena, TX: guidance, pills and injection. In Spanish, with affordable pricing.",
    keywords: [
      "anticonceptivos pasadena",
      "metodos anticonceptivos pasadena",
      "inyeccion anticonceptiva pasadena",
      "pastillas anticonceptivas pasadena",
    ],
    keywordsEn: [
      "birth control pasadena",
      "contraception clinic pasadena",
      "birth control shot pasadena",
      "birth control pills pasadena",
    ],
    features: [
      "Orientación personalizada",
      "Pastillas e inyección anticonceptiva",
      "Inicio y seguimiento del método",
      "Atención en español",
    ],
    featuresEn: [
      "Personalized guidance",
      "Birth control pills and injection",
      "Method start and follow-up",
      "Care in Spanish",
    ],
    longDescription: `Elegir método anticonceptivo es una decisión tuya, y la consulta sirve para que la tomes con información y sin presión. En Clínica Hispana Nueva Salud Pasadena iniciamos y damos seguimiento a las pastillas y a la inyección anticonceptiva, en español, sin cita y con la misma confidencialidad que el resto de la atención.

## ¿Qué métodos ofrece la clínica?

Pastillas anticonceptivas, combinadas o solo de progestina, y la inyección anticonceptiva que se aplica cada 3 meses. En la consulta también se explican los demás métodos, como el parche, el anillo, el implante y el DIU, y si uno de ellos es el que te conviene, te orientamos a dónde colocarlo. Si ya tienes un implante y quieres retirarlo, lo hacemos en la clínica: [extracción de implantes](/services/extraccion-implantes).

## ¿Cómo se elige el método?

Con una conversación sobre tu salud y tu rutina: si fumas, tu presión arterial, migrañas, si estás amamantando, si quieres embarazarte en uno o en cinco años, y qué tan fácil te resulta tomar una pastilla a la misma hora. Las pastillas combinadas no se recomiendan con presión alta sin control, migraña con aura o tabaquismo después de los 35; en esos casos la pastilla de progestina o la inyección son opciones. El médico revisa tu presión y tu historial antes de recetar.

## ¿Cuándo empieza a proteger?

Si las pastillas se inician en los primeros cinco días del periodo, protegen desde ese momento; si se inician otro día, se usa condón durante la primera semana. La inyección protege desde el primer día si se aplica dentro de los primeros siete días del periodo. En cualquier caso, el condón sigue siendo el único método que también previene infecciones de transmisión sexual.

## ¿Qué efectos secundarios son normales y cuáles no?

Sangrado irregular los primeros meses, sensibilidad en los senos o cambios leves de ánimo suelen pasar. Con la inyección es común que el periodo se vuelva escaso o desaparezca, y al suspenderla la fertilidad puede tardar varios meses en regresar. Dolor fuerte en la pierna, dolor en el pecho, dificultad para respirar o dolor de cabeza intenso y nuevo no son normales: consulta de inmediato.

## ¿Necesito Papanicolaou para que me den anticonceptivos?

No. Se puede iniciar el método sin examen pélvico; solo hace falta revisar presión e historial. Si te toca el Papanicolaou, se puede hacer en la misma visita en [ginecología](/services/ginecologia), pero no es requisito.

## ¿Cuánto cuestan los anticonceptivos en Pasadena?

La consulta y la inyección se cotizan por teléfono al (281) 747-8817; las pastillas se surten con receta en la farmacia de tu preferencia. No necesitas seguro médico. El Chequeo Completo de la Mujer por $179 incluye ultrasonido pélvico, Papanicolaou, examen de orina y consulta, si quieres aprovechar la visita para una revisión completa.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM; puedes venir sola o acompañada. Tras la conversación y la toma de presión, sales con tu receta o con la inyección aplicada, y con la fecha de la siguiente dosis o del control a los 3 meses. Si sospechas embarazo antes de iniciar, primero se hace la [prueba de embarazo](/services/prueba-embarazo).

${AREAS_ES}`,
    longDescriptionEn: `Choosing a contraceptive method is your decision, and the visit is there so you make it with information and without pressure. At Clínica Hispana Nueva Salud Pasadena we start and follow up birth control pills and the contraceptive injection, in Spanish or English, with no appointment and the same confidentiality as the rest of your care.

## Which methods does the clinic offer?

Birth control pills, combined or progestin-only, and the contraceptive injection given every 3 months. At the visit the other methods are explained too, such as the patch, ring, implant and IUD, and if one of them is the right fit, we guide you on where to get it placed. If you already have an implant and want it out, we remove it at the clinic: [implant removal](/en/services/extraccion-implantes).

## How is the method chosen?

Through a conversation about your health and routine: whether you smoke, your blood pressure, migraines, whether you are breastfeeding, whether you want a pregnancy in one year or five, and how easy it is for you to take a pill at the same time every day. Combined pills are not recommended with uncontrolled high blood pressure, migraine with aura or smoking after 35; in those cases the progestin-only pill or the injection are options. The physician checks your blood pressure and history before prescribing.

## When does it start protecting?

If pills are started within the first five days of your period, they protect from then on; if started on another day, use condoms for the first week. The injection protects from day one if given within the first seven days of your period. Either way, the condom remains the only method that also prevents sexually transmitted infections.

## Which side effects are normal, and which are not?

Irregular bleeding in the first months, breast tenderness or mild mood changes usually pass. With the injection it is common for periods to become light or stop, and after stopping it fertility can take several months to return. Severe leg pain, chest pain, trouble breathing or a new, intense headache are not normal: seek care right away.

## Do I need a Pap smear to get birth control?

No. The method can be started without a pelvic exam; only blood pressure and history need review. If you are due for a Pap smear, it can be done at the same visit under [gynecology](/en/services/ginecologia), but it is not a requirement.

## How much does birth control cost in Pasadena?

The visit and the injection are quoted by phone at (281) 747-8817; pills are filled with a prescription at the pharmacy of your choice. No health insurance is needed. The Complete Women's Checkup for $179 includes a pelvic ultrasound, Pap smear, urine test and visit, if you want to use the visit for a full checkup.

## What is the visit like?

Walk in from 9 AM to 9 PM; you can come alone or with someone. After the conversation and a blood pressure check, you leave with your prescription or the injection given, and with the date of the next dose or the 3-month follow-up. If you suspect pregnancy before starting, a [pregnancy test](/en/services/prueba-embarazo) is done first.

${AREAS_EN}`,
  },
  {
    slug: "extraccion-implantes",
    dateModified: "2026-09-12",
    order: 9,
    category: "salud-mujer",
    icon: "Bandage",
    title: "Extracción de Implantes Subdérmicos",
    titleEn: "Subdermal Implant Removal",
    shortDescription:
      "Retiro seguro de implantes anticonceptivos subdérmicos del brazo, por personal capacitado.",
    shortDescriptionEn:
      "Safe removal of subdermal arm contraceptive implants by trained staff.",
    description:
      "Extracción de implantes subdérmicos en Pasadena, TX, procedimiento seguro y en español. Con precios accesibles.",
    descriptionEn:
      "Subdermal implant removal in Pasadena, TX, a safe procedure in Spanish. With affordable pricing.",
    keywords: [
      "extraccion de implante subdermico pasadena",
      "quitar implante del brazo pasadena",
      "retiro de implante anticonceptivo pasadena",
      "remover implante pasadena",
    ],
    keywordsEn: [
      "subdermal implant removal pasadena",
      "arm implant removal pasadena",
      "contraceptive implant removal pasadena",
      "birth control implant removal pasadena",
    ],
    features: [
      "Procedimiento ambulatorio",
      "Anestesia local",
      "Personal capacitado",
      "Cuidado posterior explicado",
    ],
    featuresEn: [
      "Outpatient procedure",
      "Local anesthesia",
      "Trained staff",
      "After-care explained",
    ],
    longDescription: `El implante anticonceptivo del brazo tiene fecha de caducidad y también puede retirarse antes si ya no lo quieres. En Clínica Hispana Nueva Salud Pasadena la extracción se hace en la clínica, con anestesia local, en una visita corta y sin cita.

## ¿Cuándo hay que retirar el implante?

El implante subdérmico que se usa en Estados Unidos está aprobado para 3 años; pasado ese tiempo hay que retirarlo o cambiarlo. También se retira antes si quieres embarazarte, si los sangrados irregulares o los efectos secundarios no te convienen, o si decides cambiar de método. No hace falta esperar a que caduque para pedir la extracción.

## ¿Cómo es el procedimiento?

Se localiza el implante al tacto en la cara interna del brazo, se limpia la zona y se aplica anestesia local. A través de una incisión de unos milímetros, el médico extrae la varilla con una pinza. Dura entre 10 y 20 minutos. No requiere puntos: se cierra con cinta adhesiva estéril y se coloca una venda compresiva que se deja unas 24 horas. Sales caminando y puedes seguir con tu día.

## ¿Duele?

El piquete de la anestesia es lo que más se siente; después, solo presión. En los días siguientes puede haber un moretón y sensibilidad en la zona, que se controlan con hielo y un analgésico común. Si el implante está muy profundo o no se palpa, no se intenta a ciegas: se pide un [ultrasonido](/services/ultrasonido) para localizarlo y, si es necesario, se refiere a un especialista.

## ¿Cuándo vuelve la fertilidad?

Rápido: la hormona sale del cuerpo en pocos días y puedes ovular en el primer mes. Si no buscas embarazo, hay que empezar otro método el mismo día de la extracción; en la clínica iniciamos [pastillas o inyección](/services/anticonceptivos) en esa misma visita.

## ¿Qué cuidados hay después?

Mantener la venda compresiva 24 horas y la cinta adhesiva 3 a 5 días, no mojar la zona el primer día, evitar cargar peso con ese brazo un par de días, y vigilar señales de infección: enrojecimiento que crece, calor, pus o fiebre. Con eso, la cicatriz queda mínima.

## ¿Cuánto cuesta retirar el implante en Pasadena?

Te damos el precio por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta. Si en la misma visita quieres iniciar otro método, se cotiza aparte.

## ¿Qué debo traer?

Identificación con foto y, si la tienes, la tarjeta o el registro con la fecha en que te pusieron el implante y el brazo donde está. Ven con ropa que deje libre el brazo. Si tomas anticoagulantes o tienes alergia a la anestesia local, dilo en recepción.

${AREAS_ES}`,
    longDescriptionEn: `The contraceptive implant in the arm has an expiration date, and it can also be removed earlier if you no longer want it. At Clínica Hispana Nueva Salud Pasadena removal is done at the clinic, under local anesthesia, in a short visit and with no appointment.

## When does the implant need to be removed?

The subdermal implant used in the United States is approved for 3 years; after that it must be removed or replaced. It is also removed earlier if you want to get pregnant, if irregular bleeding or side effects do not suit you, or if you decide to switch methods. You do not have to wait for it to expire to ask for removal.

## What is the procedure like?

The implant is located by touch on the inner arm, the area is cleaned and local anesthesia is applied. Through an incision of a few millimeters, the physician removes the rod with forceps. It takes 10 to 20 minutes. No stitches are needed: it is closed with sterile adhesive strips and a pressure bandage is placed for about 24 hours. You walk out and can go on with your day.

## Does it hurt?

The prick of the anesthesia is what you feel most; after that, only pressure. In the following days there may be a bruise and tenderness, managed with ice and a common pain reliever. If the implant is very deep or cannot be felt, it is not attempted blind: an [ultrasound](/en/services/ultrasonido) is ordered to locate it and, if necessary, you are referred to a specialist.

## When does fertility return?

Quickly: the hormone leaves the body within days and you can ovulate in the first month. If you are not trying to get pregnant, another method must start the same day as removal; at the clinic we start [pills or the injection](/en/services/anticonceptivos) at that same visit.

## What care is needed afterward?

Keep the pressure bandage on for 24 hours and the adhesive strips for 3 to 5 days, do not get the area wet the first day, avoid lifting with that arm for a couple of days, and watch for signs of infection: spreading redness, warmth, pus or fever. With that, the scar stays minimal.

## How much does implant removal cost in Pasadena?

We give you the price by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards. If you want to start another method at the same visit, it is quoted separately.

## What should I bring?

A photo ID and, if you have it, the card or record with the date the implant was placed and which arm it is in. Wear clothing that leaves the arm free. If you take blood thinners or are allergic to local anesthesia, say so at the front desk.

${AREAS_EN}`,
  },
  {
    slug: "salud-hombre",
    dateModified: "2026-09-12",
    order: 10,
    category: "medicina-general",
    icon: "Mars",
    highlighted: true,
    title: "Exámenes del Hombre: PSA y Testosterona",
    titleEn: "Men's Health Exams: PSA & Testosterone",
    shortDescription:
      "Exámenes de salud del hombre: antígeno prostático (PSA), testosterona y chequeo general, en español.",
    shortDescriptionEn:
      "Men's health exams: prostate antigen (PSA), testosterone and general checkup, in Spanish.",
    description:
      "Exámenes del hombre en Pasadena, TX: PSA y testosterona. Laboratorio y atención en español, con precios accesibles.",
    descriptionEn:
      "Men's health exams in Pasadena, TX: PSA and testosterone. Lab work and care in Spanish, with affordable pricing.",
    keywords: [
      "examen del hombre pasadena",
      "prueba psa pasadena",
      "examen de prostata pasadena",
      "examen de testosterona pasadena",
    ],
    keywordsEn: [
      "mens health pasadena",
      "psa test pasadena",
      "prostate exam pasadena",
      "testosterone test pasadena",
    ],
    features: [
      "Antígeno prostático (PSA)",
      "Nivel de testosterona",
      "Chequeo general del hombre",
      "Resultados explicados en español",
    ],
    featuresEn: [
      "Prostate antigen (PSA)",
      "Testosterone level",
      "General men's checkup",
      "Results explained in Spanish",
    ],
    longDescription: `Los hombres llegan al médico tarde y con la presión, el azúcar o la próstata ya afectadas. El chequeo del hombre en Clínica Hispana Nueva Salud Pasadena está pensado para el que trabaja todo el día: sin cita, hasta las 9 de la noche, en español, y con los análisis en la misma visita.

## ¿Qué incluye el chequeo del hombre?

Consulta con revisión de presión, peso y síntomas; análisis de sangre con glucosa, colesterol, función de riñón e hígado; antígeno prostático (PSA) cuando corresponde por edad o antecedentes; medición de testosterona si hay síntomas; examen de orina; y, si el médico lo indica, un electrocardiograma. Los resultados se explican con calma y se traducen a un plan: qué repetir, qué tratar y cuándo volver.

## ¿A qué edad se revisa la próstata?

La prueba de PSA se conversa con el médico a partir de los 50 años, y desde los 45 si tu padre o un hermano tuvieron cáncer de próstata. Un PSA elevado no significa cáncer: sube también con infección, inflamación o crecimiento benigno de la próstata, que es muy común después de los 50. Síntomas como levantarse varias veces a orinar, chorro débil o goteo merecen consulta a cualquier edad.

## ¿Cuándo conviene medir la testosterona?

Cuando hay cansancio persistente, menos deseo sexual, dificultad para la erección, pérdida de masa muscular o ánimo bajo sin causa clara. La muestra se toma por la mañana, cuando el nivel es más alto, y si sale baja se repite para confirmar antes de hablar de tratamiento. La testosterona baja suele ir acompañada de sobrepeso, diabetes o apnea del sueño, y tratarlas mejora el nivel.

## ¿Qué pruebas de infecciones se hacen?

Pruebas de clamidia, gonorrea, sífilis y VIH, con tratamiento en la misma clínica cuando el resultado lo confirma, y evaluación de infecciones urinarias con examen de orina. Todo con confidencialidad: los resultados son tuyos y no se comparten.

## ¿Cuánto cuestan los exámenes del hombre en Pasadena?

Los precios publicados son los de las promociones vigentes: Revisa tu Testosterona por $79, que incluye examen de testosterona, examen de orina y consulta médica gratis; y el Perfil Hormonal para Hombres por $200. Para el PSA suelto o un chequeo con análisis completos, llama al (281) 747-8817 y te damos el precio. No necesitas seguro médico.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM; si vienes por testosterona, mejor por la mañana. Se toma la muestra y, cuando el resultado está listo, lo revisas con el equipo médico y sales con tu plan por escrito. Si algo requiere un urólogo o un cardiólogo, se orienta la referencia.

## Servicios relacionados

Los análisis se toman en [exámenes de sangre](/services/examenes-sangre). Si aparece presión alta, azúcar o colesterol, el seguimiento continúa en [condiciones crónicas](/services/condiciones-cronicas). Las molestias al orinar se atienden en [infecciones urinarias](/services/infecciones-urinarias) y las pruebas de ETS en [enfermedades de transmisión sexual](/services/enfermedades-transmision-sexual).

${AREAS_ES}`,
    longDescriptionEn: `Men come to the doctor late, with blood pressure, sugar or the prostate already affected. The men's checkup at Clínica Hispana Nueva Salud Pasadena is built for the man who works all day: no appointment, open until 9 at night, in Spanish or English, and with lab work at the same visit.

## What does the men's checkup include?

A visit with blood pressure, weight and symptom review; blood tests with glucose, cholesterol, kidney and liver function; prostate-specific antigen (PSA) when age or family history call for it; testosterone if there are symptoms; urinalysis; and, if the physician orders it, an EKG. Results are explained calmly and turned into a plan: what to repeat, what to treat and when to return.

## At what age is the prostate checked?

The PSA test is discussed with the physician from age 50, and from 45 if your father or a brother had prostate cancer. A high PSA does not mean cancer: it also rises with infection, inflammation or benign prostate enlargement, which is very common after 50. Symptoms such as getting up several times at night to urinate, a weak stream or dribbling deserve a visit at any age.

## When is testosterone worth measuring?

When there is persistent tiredness, lower sex drive, erection difficulty, loss of muscle mass or low mood without a clear cause. The sample is drawn in the morning, when the level is highest, and if it is low it is repeated to confirm before discussing treatment. Low testosterone often comes with excess weight, diabetes or sleep apnea, and treating those improves the level.

## Which infection tests are done?

Tests for chlamydia, gonorrhea, syphilis and HIV, with treatment at the same clinic once the result confirms it, and evaluation of urinary infections with a urinalysis. All confidential: the results are yours and are not shared.

## How much do men's exams cost in Pasadena?

The published prices are those of the current promotions: Check Your Testosterone for $79, which includes a testosterone test, urine test and a free medical visit; and the Men's Hormone Panel for $200. For a stand-alone PSA or a checkup with full labs, call (281) 747-8817 and we give you the price. No health insurance is needed.

## What is the visit like?

Walk in from 9 AM to 9 PM; if you come for testosterone, morning is best. The sample is drawn and, when the result is ready, you review it with the medical team and leave with your plan in writing. If something calls for a urologist or cardiologist, we guide the referral.

## Related services

Labs are drawn under [blood tests](/en/services/examenes-sangre). If high blood pressure, sugar or cholesterol shows up, follow-up continues under [chronic conditions](/en/services/condiciones-cronicas). Urinary symptoms are seen under [urinary infections](/en/services/infecciones-urinarias) and STI testing under [sexually transmitted diseases](/en/services/enfermedades-transmision-sexual).

${AREAS_EN}`,
  },
  {
    slug: "examenes-sangre",
    dateModified: "2026-09-12",
    order: 11,
    category: "laboratorio",
    icon: "FlaskConical",
    highlighted: true,
    title: "Análisis y Exámenes de Sangre | Laboratorio",
    titleEn: "Blood Tests & Blood Work | Lab",
    shortDescription:
      "Análisis de sangre completos con resultados rápidos e interpretación en español, sin cita previa.",
    shortDescriptionEn:
      "Complete blood work with fast results and results explained in Spanish, no appointment needed.",
    description:
      "Exámenes de sangre en Pasadena, TX: biometría, química, glucosa, colesterol y más. Resultados en español, con precios accesibles.",
    descriptionEn:
      "Blood tests in Pasadena, TX: CBC, chemistry, glucose, cholesterol and more. Results in Spanish, with affordable pricing.",
    keywords: [
      "examenes de sangre pasadena",
      "analisis de sangre pasadena",
      "laboratorio pasadena",
      "laboratorio cerca de mi pasadena",
    ],
    keywordsEn: [
      "blood test pasadena",
      "blood work pasadena",
      "lab near me pasadena",
      "clinical lab pasadena",
    ],
    features: [
      "Biometría y química sanguínea",
      "Glucosa, colesterol y triglicéridos",
      "Pruebas de tiroides, hígado y riñón",
      "Resultados explicados en español",
    ],
    featuresEn: [
      "CBC and blood chemistry",
      "Glucose, cholesterol and triglycerides",
      "Thyroid, liver and kidney tests",
      "Results explained in Spanish",
    ],
    longDescription: `Un análisis de sangre sin cita, tomado en la clínica y explicado en tu idioma. Llegas, das tu muestra y el equipo médico te dice qué significa cada número cuando el resultado está listo.

## ¿Qué exámenes de sangre se hacen en la clínica?

En Clínica Hispana Nueva Salud Pasadena tomamos la muestra en la clínica y la procesamos con laboratorio clínico. Los estudios más pedidos son: biometría hemática completa, química sanguínea, glucosa en ayunas, hemoglobina glicosilada (A1C), perfil de lípidos (colesterol total, HDL, LDL y triglicéridos), pruebas de tiroides (TSH, T3 y T4), función del hígado y del riñón, vitamina B12, perfil hormonal, testosterona, PSA para próstata y pruebas de infecciones de transmisión sexual. Si necesitas un estudio que no está en la lista, pregúntanos: muchos paneles se arman según lo que el médico quiera revisar.

## ¿Necesito ayuno para el análisis?

Depende de la prueba. Para glucosa en ayunas y perfil de lípidos se recomiendan entre 8 y 12 horas sin comer; puedes tomar agua. Para biometría, tiroides, B12 o pruebas hormonales no hace falta ayunar. Si vienes en ayunas, procura llegar por la mañana; si no, te decimos qué pruebas sí se pueden tomar ese mismo día y cuáles conviene repetir en ayunas.

## ¿Cuánto cuesta un examen de sangre en Pasadena?

Los precios que publicamos son los de nuestras promociones vigentes. El Chequeo General Completo cuesta $99 e incluye examen general de sangre, A1C, examen general de orina y consulta médica gratis. El paquete de Examen General de Sangre con Vitamina B12 cuesta $99 e incluye la inyección de B12 y la orientación de resultados. Para pruebas sueltas o paneles específicos, llama y te damos el precio antes de tomar la muestra. No necesitas seguro médico y aceptamos efectivo y tarjeta.

## ¿Cuándo conviene hacerse un análisis de sangre?

- Una vez al año como chequeo, aunque te sientas bien.
- Si tienes diabetes, presión alta o colesterol y llevas control.
- Si notas cansancio constante, caída de cabello, aumento o pérdida de peso sin causa, sed excesiva o sueño irregular.
- Si te lo piden para el trabajo, la escuela, un trámite de inmigración o antes de una cirugía.
- Si empezaste un medicamento nuevo y el médico quiere vigilar el hígado o el riñón.

## ¿Cómo funciona la visita?

1. Llegas sin cita en nuestro horario: lunes a domingo de 9 AM a 9 PM.
2. En recepción indicas qué prueba necesitas o describes tus síntomas; si no sabes cuál te conviene, el médico te orienta.
3. Se toma la muestra en la clínica. La extracción tarda unos minutos.
4. La mayoría de los resultados están listos rápido. Te avisamos en cuanto los tenemos y, al tomar la muestra, te decimos cuánto suele tardar tu prueba.
5. Revisas el resultado con el equipo médico, en español, y sales con un plan: repetir, tratar, o dar seguimiento.

## ¿Qué debo traer?

Una identificación con foto, la lista de medicamentos que tomas y, si los tienes, resultados anteriores para comparar. Si el análisis es para un trámite, trae la orden o el formulario que te pidieron.

## Servicios relacionados

Si el resultado muestra la tiroides alterada, seguimos el caso en [pruebas y tratamiento de tiroides](/services/tiroides). Para glucosa, presión o colesterol fuera de rango, el control continúa en [condiciones crónicas](/services/condiciones-cronicas). Los hombres que piden PSA o testosterona pueden completar su chequeo en [salud del hombre](/services/salud-hombre), y la inyección de B12 forma parte de [sueros vitaminados](/services/sueros-vitaminados).

${AREAS_ES}`,
    longDescriptionEn: `A blood test with no appointment, drawn at the clinic and explained in your language. You walk in, give your sample, and the medical team tells you what each number means once the result is ready.

## Which blood tests does the clinic run?

At Clínica Hispana Nueva Salud Pasadena we draw the sample in the clinic and process it through a clinical laboratory. The most requested tests are: complete blood count, blood chemistry, fasting glucose, A1C (glycated hemoglobin), lipid panel (total cholesterol, HDL, LDL and triglycerides), thyroid tests (TSH, T3 and T4), liver and kidney function, vitamin B12, hormone panel, testosterone, PSA for the prostate and sexually transmitted infection tests. If you need a test that is not on the list, ask us: many panels are built around what the physician wants to check.

## Do I need to fast?

It depends on the test. Fasting glucose and the lipid panel call for 8 to 12 hours without food; water is fine. A blood count, thyroid, B12 or hormone tests do not require fasting. If you come fasting, try to arrive in the morning; if not, we tell you which tests can be drawn that day and which are better repeated while fasting.

## How much does a blood test cost in Pasadena?

The prices we publish are those of our current promotions. The Complete General Checkup costs $99 and includes a general blood test, A1C, a general urine test and a free medical visit. The General Blood Test with Vitamin B12 package costs $99 and includes the B12 injection and a review of your results. For single tests or specific panels, call us and we give you the price before drawing the sample. No health insurance is required, and we accept cash and cards.

## When is a blood test worth doing?

- Once a year as a checkup, even if you feel fine.
- If you have diabetes, high blood pressure or high cholesterol and are under follow-up.
- If you notice constant tiredness, hair loss, unexplained weight gain or loss, excessive thirst or irregular sleep.
- If it is required for work, school, an immigration process or before surgery.
- If you started a new medication and the physician wants to monitor your liver or kidneys.

## How does the visit work?

1. Walk in during our hours: Monday to Sunday, 9 AM to 9 PM.
2. At the front desk, say which test you need or describe your symptoms; if you are unsure, the physician guides you.
3. The sample is drawn in the clinic. The draw takes a few minutes.
4. Most results are ready quickly. We let you know as soon as we have them and, when we draw the sample, we tell you how long your test usually takes.
5. You review the result with the medical team, in Spanish or English, and leave with a plan: repeat, treat or follow up.

## What should I bring?

A photo ID, the list of medications you take and, if you have them, previous results to compare. If the test is for a formal process, bring the order or form you were given.

## Related services

If the result shows an altered thyroid, we follow the case in [thyroid testing and treatment](/en/services/tiroides). For glucose, blood pressure or cholesterol out of range, care continues in [chronic conditions](/en/services/condiciones-cronicas). Men who request PSA or testosterone can complete their checkup in [men's health](/en/services/salud-hombre), and the B12 injection is part of [IV vitamin therapy](/en/services/sueros-vitaminados).

${AREAS_EN}`,
  },
  {
    slug: "infecciones-urinarias",
    dateModified: "2026-09-12",
    order: 12,
    category: "tratamientos",
    icon: "Droplet",
    title: "Urología: Examen de Orina e Infecciones Urinarias",
    titleEn: "Urology: Urinalysis & Urinary Infections",
    shortDescription:
      "Atención de urología general: examen de orina y tratamiento de infecciones urinarias el mismo día, en español.",
    shortDescriptionEn:
      "General urology care: urinalysis and same-day urinary infection treatment, in Spanish.",
    description:
      "Examen de orina y tratamiento de infecciones urinarias el mismo día en Pasadena, TX. Atención en español, sin cita y con precios accesibles.",
    descriptionEn:
      "Urology at your Hispanic clinic in Pasadena, TX, near Houston: urinalysis and same-day urinary infection treatment. In Spanish, with affordable pricing.",
    keywords: [
      "urologia pasadena",
      "urologo en español cerca de mi",
      "examen de orina pasadena",
      "infeccion urinaria pasadena",
      "tratamiento infeccion urinaria pasadena",
      "doctor infeccion de orina pasadena",
    ],
    keywordsEn: [
      "urology pasadena",
      "spanish speaking urology near me",
      "urinalysis pasadena",
      "urinary tract infection pasadena",
      "uti treatment pasadena",
      "uti doctor pasadena",
    ],
    features: [
      "Examen de orina en la clínica",
      "Diagnóstico de infección urinaria",
      "Tratamiento el mismo día",
      "Atención sin cita en español",
    ],
    featuresEn: [
      "In-clinic urinalysis",
      "Diagnosis of urinary infection",
      "Same-day treatment",
      "Walk-in care in Spanish",
    ],
    longDescription: `Ardor al orinar, ganas constantes y orina turbia: una infección urinaria no espera a la cita del mes que viene. En Clínica Hispana Nueva Salud Pasadena el examen de orina se hace en la clínica, sin cita, y el tratamiento empieza el mismo día cuando el resultado lo confirma.

## ¿Cómo sé si tengo infección urinaria?

Los síntomas típicos son ardor o dolor al orinar, necesidad de ir muchas veces y con poca cantidad, urgencia, orina turbia o con mal olor, y presión en la parte baja del vientre. En la mujer es mucho más frecuente por la anatomía. Si además hay fiebre, escalofríos, dolor en la espalda baja o a un lado, o náusea, la infección puede haber subido al riñón y hay que atenderla ese mismo día.

## ¿Qué prueba se hace?

Un examen general de orina con tira reactiva y análisis en la clínica, que detecta glóbulos blancos, sangre y nitritos, señales de infección. Cuando la infección se repite, hay fiebre, eres hombre, estás embarazada o tienes diabetes, se manda además un urocultivo, que identifica la bacteria y a qué antibiótico responde. La muestra se toma de la parte media del chorro, tras limpiar la zona, para que no se contamine.

## ¿Qué tratamiento se da?

Un antibiótico elegido según los síntomas, tu historial y, si existe, el cultivo previo; en cistitis no complicada suele durar de 3 a 7 días. Es importante completarlo aunque el ardor desaparezca al segundo día. Se indican también líquidos abundantes y algo para el dolor si hace falta. Si en 48 a 72 horas no mejoras, o empeoras, vuelve: puede que la bacteria sea resistente y haya que cambiar el antibiótico con el resultado del cultivo.

## ¿Por qué me repite la infección?

Las causas más comunes son aguantar la orina, poca ingesta de agua, relaciones sexuales sin orinar después, diabetes mal controlada, cambios hormonales de la menopausia y, en el hombre, crecimiento de la próstata. Tres o más infecciones al año merecen un estudio: cultivo, glucosa y, en algunos casos, ultrasonido de vías urinarias.

## ¿Cuánto cuesta atender una infección urinaria en Pasadena?

La consulta con examen de orina se cotiza por teléfono al (281) 747-8817 antes de venir; el cultivo, si se necesita, va aparte. No necesitas seguro médico; aceptamos efectivo y tarjeta. El examen general de orina está incluido en el Chequeo General Completo por $99 junto con el examen general de sangre, A1C y consulta.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM, de preferencia sin haber orinado en la última hora para poder dar la muestra. Se analiza en la clínica, el médico te examina y sales con la receta y las indicaciones. Si se envió cultivo, te avisamos con el resultado.

## Servicios relacionados

Las infecciones vaginales que se confunden con las urinarias se atienden en [ginecología](/services/ginecologia). Si la infección viene con diabetes descontrolada, el seguimiento está en [condiciones crónicas](/services/condiciones-cronicas). Las pruebas de infecciones de transmisión sexual, que pueden dar síntomas parecidos, se hacen en [enfermedades de transmisión sexual](/services/enfermedades-transmision-sexual).

${AREAS_ES}`,
    longDescriptionEn: `Burning when you urinate, a constant urge and cloudy urine: a urinary infection does not wait for next month's appointment. At Clínica Hispana Nueva Salud Pasadena the urine test is done in the clinic, with no appointment, and treatment starts the same day once the result confirms it.

## How do I know if I have a urinary infection?

The typical symptoms are burning or pain when urinating, needing to go often with little output, urgency, cloudy or foul-smelling urine, and pressure in the lower belly. It is far more common in women because of anatomy. If there is also fever, chills, pain in the lower back or one side, or nausea, the infection may have reached the kidney and needs to be seen that same day.

## Which test is done?

A general urine test with a dipstick and in-clinic analysis, which detects white blood cells, blood and nitrites, the signs of infection. When the infection recurs, there is fever, you are a man, you are pregnant or you have diabetes, a urine culture is also sent, which identifies the bacteria and which antibiotic it responds to. The sample is taken midstream, after cleaning the area, so it is not contaminated.

## What treatment is given?

An antibiotic chosen according to your symptoms, your history and, if there is one, a previous culture; for uncomplicated cystitis it usually lasts 3 to 7 days. It is important to finish it even if the burning is gone by the second day. Plenty of fluids and something for pain are also advised if needed. If you do not improve in 48 to 72 hours, or get worse, come back: the bacteria may be resistant and the antibiotic may need to change based on the culture result.

## Why does my infection keep coming back?

The most common causes are holding urine, drinking little water, sex without urinating afterward, poorly controlled diabetes, hormonal changes of menopause and, in men, prostate enlargement. Three or more infections a year deserve a workup: culture, glucose and, in some cases, an ultrasound of the urinary tract.

## How much does treating a urinary infection cost in Pasadena?

The visit with urine test is quoted by phone at (281) 747-8817 before you come; the culture, if needed, is separate. No health insurance is needed; we accept cash and cards. The general urine test is included in the Complete General Checkup for $99 along with the general blood test, A1C and visit.

## What is the visit like?

Walk in from 9 AM to 9 PM, preferably without having urinated in the last hour so you can give the sample. It is analyzed in the clinic, the physician examines you and you leave with the prescription and instructions. If a culture was sent, we let you know the result.

## Related services

Vaginal infections that are mistaken for urinary ones are seen under [gynecology](/en/services/ginecologia). If the infection comes with uncontrolled diabetes, follow-up is under [chronic conditions](/en/services/condiciones-cronicas). Sexually transmitted infection tests, which can cause similar symptoms, are done under [sexually transmitted diseases](/en/services/enfermedades-transmision-sexual).

${AREAS_EN}`,
  },
  {
    slug: "examen-heces",
    dateModified: "2026-09-12",
    order: 13,
    category: "laboratorio",
    icon: "TestTubes",
    title: "Exámenes de Heces Fecales",
    titleEn: "Stool Tests",
    shortDescription:
      "Análisis de heces fecales para detectar infecciones y problemas digestivos, en español.",
    shortDescriptionEn:
      "Stool analysis to detect infections and digestive problems, in Spanish.",
    description:
      "Exámenes de heces fecales en Pasadena, TX. Detección de parásitos e infecciones, en español, con precios accesibles.",
    descriptionEn:
      "Stool tests in Pasadena, TX. Detection of parasites and infections, in Spanish, with affordable pricing.",
    keywords: [
      "examen de heces pasadena",
      "analisis de heces fecales pasadena",
      "examen de parasitos pasadena",
      "laboratorio heces pasadena",
    ],
    keywordsEn: [
      "stool test pasadena",
      "stool analysis pasadena",
      "parasite test pasadena",
      "stool lab pasadena",
    ],
    features: [
      "Análisis de heces fecales",
      "Detección de parásitos e infecciones",
      "Evaluación de síntomas digestivos",
      "Resultados explicados en español",
    ],
    featuresEn: [
      "Stool analysis",
      "Detection of parasites and infections",
      "Digestive symptom evaluation",
      "Results explained in Spanish",
    ],
    longDescription: `Diarrea que no se quita, dolor de estómago recurrente, un niño que no sube de peso o la sospecha de parásitos: el examen de heces responde preguntas que la consulta sola no puede. En Clínica Hispana Nueva Salud Pasadena te damos el recipiente y las instrucciones, analizamos la muestra y te explicamos el resultado en español.

## ¿Qué detecta el examen de heces?

Parásitos y sus huevos (amebas, giardia, lombrices), infecciones bacterianas intestinales, sangre oculta que no se ve a simple vista, y signos de mala absorción o inflamación. Según los síntomas, el médico pide el examen general (coproparasitoscópico), la prueba de sangre oculta, un coprocultivo para identificar bacterias o, según la disponibilidad del laboratorio, pruebas específicas como la de *H. pylori* en heces.

## ¿Cómo se recolecta la muestra en casa?

1. Te entregamos un recipiente limpio con tapa; no uses frascos caseros.
2. Recoge la muestra sobre papel limpio o un recipiente seco, sin que toque el agua del inodoro ni la orina.
3. Con la paleta del recipiente, toma una cantidad del tamaño de una nuez, o unas cucharadas si es líquida, y cierra bien.
4. Anota tu nombre y la fecha y hora; tráela a la clínica el mismo día, en menos de dos horas si es posible, o guárdala en el refrigerador hasta 24 horas si te lo indicaron.
5. Para parásitos, a veces se piden tres muestras de días distintos, porque no se eliminan todos los días.

## ¿Necesito alguna preparación?

Para el examen general, no. Para la prueba de sangre oculta, según el tipo, se pide evitar carne roja, antiinflamatorios y ciertas vitaminas unos días antes; te lo indicamos al entregarte el recipiente. Si tomas antibióticos o antidiarreicos, dilo: pueden alterar el resultado y a veces conviene esperar.

## ¿Cuándo pedirlo para un niño?

Diarrea de más de una semana, dolor abdominal repetido, comezón anal por la noche, apetito raro, palidez o poca ganancia de peso son motivos frecuentes. Los parásitos son comunes en niños que van a guardería o que visitaron zonas rurales, y el tratamiento suele ser corto y eficaz. Si un niño tiene diarrea con fiebre alta, sangre o signos de deshidratación (boca seca, poca orina, decaimiento), ven el mismo día.

## ¿Qué tratamiento sigue?

Depende del hallazgo: antiparasitarios de uno o varios días, antibiótico solo si el cultivo lo justifica, tratamiento para *H. pylori*, o cambios en la dieta y seguimiento si hay mala absorción. Sangre oculta positiva en un adulto requiere estudiar la causa, incluida la referencia para colonoscopia según edad y antecedentes.

## ¿Cuánto cuesta el examen de heces en Pasadena?

Te damos el precio de cada prueba por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM, el médico evalúa los síntomas y te entrega el recipiente con las instrucciones; traes la muestra y te avisamos con el resultado para revisarlo juntos. Si el cuadro viene con vómito o deshidratación, los [análisis de sangre](/services/examenes-sangre) y la hidratación se atienden en la misma clínica.

${AREAS_ES}`,
    longDescriptionEn: `Diarrhea that will not go away, recurring stomach pain, a child who is not gaining weight or a suspicion of parasites: the stool test answers questions the visit alone cannot. At Clínica Hispana Nueva Salud Pasadena we give you the container and instructions, analyze the sample and explain the result in Spanish or English.

## What does the stool test detect?

Parasites and their eggs (amoebas, giardia, worms), bacterial intestinal infections, hidden blood that is not visible to the eye, and signs of malabsorption or inflammation. Depending on symptoms, the physician orders the general exam (ova and parasites), the occult blood test, a stool culture to identify bacteria, or, depending on lab availability, specific tests such as *H. pylori* in stool.

## How is the sample collected at home?

1. We give you a clean container with a lid; do not use household jars.
2. Collect the sample on clean paper or a dry container, without letting it touch toilet water or urine.
3. With the container's scoop, take an amount the size of a walnut, or a few spoonfuls if liquid, and close it tightly.
4. Write your name, date and time; bring it to the clinic the same day, within two hours if possible, or keep it in the refrigerator for up to 24 hours if instructed.
5. For parasites, three samples from different days are sometimes requested, because they are not shed every day.

## Do I need any preparation?

For the general exam, no. For the occult blood test, depending on the type, you may be asked to avoid red meat, anti-inflammatories and certain vitamins for a few days beforehand; we tell you when we give you the container. If you take antibiotics or anti-diarrheals, say so: they can alter the result and sometimes it is better to wait.

## When should I request it for a child?

Diarrhea for more than a week, repeated abdominal pain, anal itching at night, odd appetite, paleness or poor weight gain are common reasons. Parasites are common in children who attend daycare or who visited rural areas, and treatment is usually short and effective. If a child has diarrhea with high fever, blood or signs of dehydration (dry mouth, little urine, listlessness), come the same day.

## What treatment follows?

It depends on the finding: antiparasitic medication for one or several days, an antibiotic only if the culture justifies it, treatment for *H. pylori*, or diet changes and follow-up if there is malabsorption. Positive occult blood in an adult requires looking for the cause, including a colonoscopy referral depending on age and history.

## How much does a stool test cost in Pasadena?

We give you the price of each test by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards.

## What is the visit like?

Walk in from 9 AM to 9 PM, the physician evaluates the symptoms and gives you the container with instructions; you bring the sample and we let you know the result to review it together. If the illness comes with vomiting or dehydration, [blood tests](/en/services/examenes-sangre) and hydration are handled at the same clinic.

${AREAS_EN}`,
  },
  {
    slug: "prueba-strep",
    dateModified: "2026-09-12",
    order: 14,
    category: "laboratorio",
    icon: "TestTube",
    title: "Prueba de Estreptococo (Strep Test)",
    titleEn: "Strep Test",
    shortDescription:
      "Prueba rápida de estreptococo (strep) para el dolor de garganta, con resultado el mismo día.",
    shortDescriptionEn:
      "Rapid strep test for sore throat, with same-day result.",
    description:
      "Prueba de estreptococo (strep test) en Pasadena, TX. Resultado rápido y tratamiento en español, con precios accesibles.",
    descriptionEn:
      "Strep test in Pasadena, TX. Fast result and treatment in Spanish, with affordable pricing.",
    keywords: [
      "prueba de estreptococo pasadena",
      "strep test pasadena",
      "prueba de garganta pasadena",
      "dolor de garganta doctor pasadena",
    ],
    keywordsEn: [
      "strep test pasadena",
      "rapid strep test pasadena",
      "sore throat test pasadena",
      "strep throat doctor pasadena",
    ],
    features: [
      "Prueba rápida de estreptococo",
      "Resultado el mismo día",
      "Tratamiento si es positivo",
      "Atención sin cita en español",
    ],
    featuresEn: [
      "Rapid strep test",
      "Same-day result",
      "Treatment if positive",
      "Walk-in care in Spanish",
    ],
    longDescription: `Dolor de garganta fuerte, fiebre y placas blancas en las amígdalas: puede ser estreptococo, y esa sí necesita antibiótico. En Clínica Hispana Nueva Salud Pasadena la prueba rápida se hace en la clínica, sin cita, y el resultado y el tratamiento salen en la misma visita.

## ¿Cómo distingo una faringitis por estreptococo de una viral?

La bacteriana suele dar dolor intenso al tragar, fiebre, ganglios inflamados en el cuello, amígdalas rojas con puntos o placas blancas, y a veces dolor de cabeza o de estómago, sin tos ni congestión. La viral viene con tos, mocos, ronquera y ojos irritados. Como la apariencia engaña, la única forma segura de saberlo es la prueba.

## ¿Cómo es la prueba rápida?

Se pasa un hisopo por las amígdalas y la parte de atrás de la garganta durante unos segundos; da náusea breve, no dolor. El resultado se tiene en minutos. Si sale negativo pero los síntomas apuntan a estreptococo, sobre todo en niños, se puede enviar un cultivo de garganta que confirma en uno o dos días. No comas ni bebas nada justo antes de la prueba.

## ¿Qué tratamiento se da?

Si es positivo, un antibiótico de 10 días, normalmente de la familia de la penicilina, o una alternativa si eres alérgico. A las 24 horas de tratamiento dejas de contagiar y puedes volver al trabajo o la escuela si no hay fiebre. Es importante completar los 10 días aunque te sientas bien al tercero: así se evita la fiebre reumática, una complicación rara pero seria. Si es negativo, el tratamiento es para aliviar: líquidos, analgésico y reposo; el antibiótico no sirve.

## ¿Cuándo debo venir de inmediato?

Dificultad para respirar o tragar saliva, no poder abrir bien la boca, hinchazón de un lado del cuello, voz apagada o fiebre que no baja después de dos días de antibiótico. Esos signos pueden indicar un absceso y requieren atención el mismo día.

## ¿Se puede repetir en la familia?

Sí. Si alguien en casa tiene estreptococo, quienes desarrollen síntomas deben hacerse la prueba; no se trata a quien no tiene síntomas. Cambiar el cepillo de dientes después de las primeras 24 horas de antibiótico ayuda a no reinfectarse.

## ¿Cuánto cuesta la prueba de estreptococo en Pasadena?

Te damos el precio de la consulta con prueba rápida por teléfono al (281) 747-8817; el cultivo, si se necesita, va aparte. No necesitas seguro médico; aceptamos efectivo y tarjeta.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM, se toma la muestra, esperas el resultado en la clínica y el médico revisa garganta, oídos y cuello. Sales con receta y, si lo necesitas, constancia para el trabajo o la escuela. Si además hay tos y cuerpo cortado, la prueba de [influenza y COVID](/services/enfermedades-respiratorias) se hace en la misma visita; las [vacunas](/services/vacunas) de temporada también.

${AREAS_ES}`,
    longDescriptionEn: `A severe sore throat, fever and white patches on the tonsils: it may be strep, and that one does need an antibiotic. At Clínica Hispana Nueva Salud Pasadena the rapid test is done in the clinic, with no appointment, and the result and treatment come out at the same visit.

## How do I tell strep throat from a viral sore throat?

The bacterial kind usually causes intense pain when swallowing, fever, swollen glands in the neck, red tonsils with spots or white patches, and sometimes headache or stomachache, without cough or congestion. The viral kind comes with cough, runny nose, hoarseness and irritated eyes. Since looks can deceive, the only sure way to know is the test.

## What is the rapid test like?

A swab is passed over the tonsils and the back of the throat for a few seconds; it causes brief gagging, not pain. The result is ready in minutes. If it is negative but symptoms point to strep, especially in children, a throat culture can be sent, which confirms in one or two days. Do not eat or drink anything right before the test.

## What treatment is given?

If positive, a 10-day antibiotic, usually from the penicillin family, or an alternative if you are allergic. After 24 hours of treatment you are no longer contagious and can return to work or school if there is no fever. It is important to finish the 10 days even if you feel fine by day three: that is how rheumatic fever, a rare but serious complication, is prevented. If negative, treatment is for relief: fluids, pain reliever and rest; an antibiotic does not help.

## When should I come right away?

Trouble breathing or swallowing saliva, not being able to open the mouth well, swelling on one side of the neck, a muffled voice or fever that does not come down after two days of antibiotics. Those signs may point to an abscess and need same-day care.

## Can it spread in the family?

Yes. If someone at home has strep, those who develop symptoms should be tested; people without symptoms are not treated. Changing the toothbrush after the first 24 hours of antibiotics helps avoid reinfection.

## How much does a strep test cost in Pasadena?

We give you the price of the visit with rapid test by phone at (281) 747-8817; the culture, if needed, is separate. No health insurance is needed; we accept cash and cards.

## What is the visit like?

Walk in from 9 AM to 9 PM, the sample is taken, you wait for the result in the clinic and the physician checks your throat, ears and neck. You leave with a prescription and, if needed, a note for work or school. If there is also cough and body aches, the [flu and COVID](/en/services/enfermedades-respiratorias) test is done at the same visit; seasonal [vaccines](/en/services/vacunas) too.

${AREAS_EN}`,
  },
  {
    slug: "prueba-tuberculosis",
    dateModified: "2026-09-12",
    order: 15,
    category: "laboratorio",
    icon: "ShieldPlus",
    title: "Examen de Tuberculosis (TB)",
    titleEn: "Tuberculosis (TB) Test",
    shortDescription:
      "Prueba de tuberculosis (PPD) para trabajo, escuela o trámites, con lectura en español.",
    shortDescriptionEn:
      "Tuberculosis (PPD) test for work, school or paperwork, with reading in Spanish.",
    description:
      "Examen de tuberculosis (TB/PPD) en Pasadena, TX. Para trabajo y escuela, en español, con precios accesibles.",
    descriptionEn:
      "Tuberculosis (TB/PPD) test in Pasadena, TX. For work and school, in Spanish, with affordable pricing.",
    keywords: [
      "examen de tuberculosis pasadena",
      "prueba ppd pasadena",
      "prueba de tb pasadena",
      "tb test español pasadena",
    ],
    keywordsEn: [
      "tuberculosis test pasadena",
      "ppd test pasadena",
      "tb test pasadena",
      "tb skin test pasadena",
    ],
    features: [
      "Prueba cutánea de tuberculosis (PPD)",
      "Lectura del resultado",
      "Útil para trabajo y escuela",
      "Atención en español",
    ],
    featuresEn: [
      "Tuberculosis skin test (PPD)",
      "Result reading",
      "Useful for work and school",
      "Care in Spanish",
    ],
    longDescription: `Para trabajar en salud, guarderías o escuelas, para un trámite de inmigración o porque estuviste en contacto con alguien enfermo: la prueba de tuberculosis se pide por muchas razones, y hay dos formas de hacerla. En Clínica Hispana Nueva Salud Pasadena te decimos cuál corresponde a tu caso y te entregamos el resultado documentado.

## ¿Prueba en la piel o en sangre?

La **prueba cutánea (PPD o Mantoux)** se aplica con una pequeña inyección bajo la piel del antebrazo y se lee entre 48 y 72 horas después: hay que volver a la clínica para la lectura. Es la que suelen pedir empleadores y escuelas. La **prueba en sangre (IGRA)** se hace con una sola extracción, no requiere volver, y no se altera por la vacuna BCG que muchos recibimos de niños en Latinoamérica; es la que exige USCIS para el examen de inmigración y la más recomendable si tienes BCG.

## ¿Qué significa un resultado positivo?

Que en algún momento tu cuerpo tuvo contacto con la bacteria de la tuberculosis, no que estés enfermo. La mayoría de los positivos son infección latente: la bacteria está dormida, no contagias y no tienes síntomas. Para descartar la enfermedad activa se pide una radiografía de tórax y se revisan síntomas como tos de más de tres semanas, fiebre, sudores nocturnos o pérdida de peso. Con radiografía normal, el trámite sigue y, según el caso, se ofrece tratamiento preventivo.

## ¿Qué pasa si tuve la vacuna BCG?

Con la prueba cutánea puede salir un falso positivo por la vacuna. Si sabes que la tienes, lo mejor es la prueba en sangre desde el principio; si ya te hicieron la cutánea y salió positiva, la de sangre ayuda a aclararlo.

## ¿Cómo se lee la prueba cutánea?

Se mide la induración, el bulto endurecido, no el enrojecimiento. El corte para considerarla positiva depende de tu riesgo: 5 mm en contactos cercanos o personas con defensas bajas, 10 mm en quienes trabajan en salud, llegaron de países con tuberculosis frecuente o tienen diabetes, y 15 mm en el resto. Si no vuelves a la lectura en 72 horas, la prueba se anula y hay que repetirla.

## ¿Cuánto cuesta la prueba de tuberculosis en Pasadena?

Te damos el precio de la prueba cutánea, que incluye la lectura, y de la prueba en sangre por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta.

## ¿Qué debo traer?

Identificación con foto, el formulario de tu empleador, escuela o trámite si te dieron uno, y resultados previos de tuberculosis o radiografías si los tienes. Llegas sin cita de 9 AM a 9 PM; para la cutánea, elige un día en que puedas volver 48 a 72 horas después.

## Servicios relacionados

Para el examen de inmigración, la prueba en sangre forma parte del proceso: [examen médico de inmigración](/services/examenes-inmigracion). La extracción se hace en [exámenes de sangre](/services/examenes-sangre). Si tienes tos persistente, se evalúa en [enfermedades respiratorias](/services/enfermedades-respiratorias).

${AREAS_ES}`,
    longDescriptionEn: `To work in healthcare, daycare or schools, for an immigration case or because you were in contact with someone who is sick: the tuberculosis test is requested for many reasons, and there are two ways to do it. At Clínica Hispana Nueva Salud Pasadena we tell you which one fits your case and give you a documented result.

## Skin test or blood test?

The **skin test (PPD or Mantoux)** is given with a small injection under the skin of the forearm and read 48 to 72 hours later: you must return to the clinic for the reading. It is the one employers and schools usually request. The **blood test (IGRA)** is done with a single draw, requires no return visit and is not affected by the BCG vaccine many of us received as children in Latin America; it is the one USCIS requires for the immigration exam and the best choice if you had BCG.

## What does a positive result mean?

That at some point your body had contact with the tuberculosis bacteria, not that you are sick. Most positives are latent infection: the bacteria is dormant, you are not contagious and you have no symptoms. To rule out active disease, a chest X-ray is ordered and symptoms such as a cough lasting more than three weeks, fever, night sweats or weight loss are reviewed. With a normal X-ray, the process continues and, depending on the case, preventive treatment is offered.

## What if I had the BCG vaccine?

The skin test can give a false positive because of the vaccine. If you know you had it, the blood test is best from the start; if you already had the skin test and it was positive, the blood test helps clarify.

## How is the skin test read?

The induration, the hardened bump, is measured, not the redness. The cutoff for a positive depends on your risk: 5 mm in close contacts or people with weak immunity, 10 mm in healthcare workers, people from countries where tuberculosis is common or people with diabetes, and 15 mm in everyone else. If you do not return for the reading within 72 hours, the test is void and must be repeated.

## How much does a tuberculosis test cost in Pasadena?

We give you the price of the skin test, which includes the reading, and of the blood test by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards.

## What should I bring?

A photo ID, your employer's, school's or case form if you were given one, and previous tuberculosis results or X-rays if you have them. Walk in from 9 AM to 9 PM; for the skin test, pick a day when you can return 48 to 72 hours later.

## Related services

For the immigration exam, the blood test is part of the process: [immigration medical exam](/en/services/examenes-inmigracion). The draw is done under [blood tests](/en/services/examenes-sangre). If you have a persistent cough, it is evaluated under [respiratory illnesses](/en/services/enfermedades-respiratorias).

${AREAS_EN}`,
  },
  {
    slug: "enfermedades-transmision-sexual",
    dateModified: "2026-09-12",
    order: 16,
    category: "laboratorio",
    icon: "ShieldCheck",
    title: "Pruebas de Enfermedades de Transmisión Sexual (STD)",
    titleEn: "Sexually Transmitted Disease (STD) Testing",
    shortDescription:
      "Pruebas de enfermedades de transmisión sexual confidenciales y sin juicios, con tratamiento.",
    shortDescriptionEn:
      "Confidential, judgment-free sexually transmitted disease testing, with treatment.",
    description:
      "Pruebas de ETS/STD confidenciales en Pasadena, TX. Resultados y tratamiento en español, con precios accesibles.",
    descriptionEn:
      "Confidential STD testing in Pasadena, TX. Results and treatment in Spanish, with affordable pricing.",
    keywords: [
      "prueba std pasadena",
      "examen de transmision sexual pasadena",
      "prueba ets confidencial pasadena",
      "clinica std español pasadena",
    ],
    keywordsEn: [
      "std testing pasadena",
      "std test near me pasadena",
      "confidential std clinic pasadena",
      "sti testing pasadena",
    ],
    features: [
      "Pruebas confidenciales y sin juicios",
      "Evaluación de síntomas y riesgo",
      "Tratamiento disponible",
      "Atención en español",
    ],
    featuresEn: [
      "Confidential, judgment-free testing",
      "Symptom and risk assessment",
      "Treatment available",
      "Care in Spanish",
    ],
    longDescription: `La mayoría de las infecciones de transmisión sexual no dan síntomas al principio, y la única forma de saberlo es la prueba. En Clínica Hispana Nueva Salud Pasadena se hace sin cita, en español, con resultado confidencial y tratamiento en la misma clínica cuando corresponde.

## ¿Qué pruebas de ETS se hacen?

Clamidia y gonorrea en muestra de orina o hisopado; sífilis y VIH en sangre; hepatitis B y C en sangre; y, cuando hay lesiones o flujo, evaluación de herpes, tricomonas y otras infecciones. El médico elige el panel según tus síntomas, tus prácticas y tu última prueba; no hace falta pedirlas una por una.

## ¿Cuándo debo hacerme la prueba?

Una vez al año si eres sexualmente activo; cada 3 a 6 meses si tienes parejas nuevas o más de una; siempre que una pareja te avise de un resultado positivo; al inicio del embarazo; y ante síntomas como flujo distinto, ardor al orinar, llagas, verrugas o dolor pélvico. Ten en cuenta el periodo ventana: una prueba hecha a los pocos días de la exposición puede salir negativa; para VIH y sífilis conviene repetirla a las 4 a 6 semanas y a los 3 meses.

## ¿Es confidencial?

Sí. El resultado es tuyo: no se comparte con tu pareja, tu familia ni tu empleador, y no se pregunta estatus migratorio. En recepción solo necesitas decir que vienes por una prueba; los detalles se hablan en consulta. Si prefieres, puedes preguntar precios por WhatsApp al (346) 222-1006 antes de venir.

## ¿Qué pasa si sale positiva?

Clamidia, gonorrea, sífilis y tricomonas se curan con antibióticos que se indican en la misma clínica. El herpes y el VIH no se curan, pero se controlan con tratamiento; en el caso del VIH, se orienta la referencia a un centro especializado donde el medicamento puede ser gratuito o de bajo costo. En todos los casos se recomienda avisar a las parejas recientes para que también se hagan la prueba y evitar reinfecciones.

## ¿Cómo evito una ETS?

El condón en cada relación es lo único que previene la mayoría de ellas. Además, la vacuna del VPH protege contra las cepas que causan cáncer de cuello uterino y verrugas, y la de hepatitis B se aplica en la clínica: consulta [vacunas](/services/vacunas). Si tuviste una exposición de alto riesgo al VIH en las últimas 72 horas, acude de inmediato a emergencias para valorar la profilaxis.

## ¿Cuánto cuestan las pruebas de ETS en Pasadena?

Te damos el precio del panel completo o de cada prueba por teléfono al (281) 747-8817, sin que tengas que dar tu nombre. No necesitas seguro médico; aceptamos efectivo y tarjeta.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM. Para la muestra de orina, procura no orinar en la hora previa. Se toma la muestra de sangre en la clínica y te avisamos cuando el resultado esté listo; si hay síntomas, el tratamiento puede empezar el mismo día. Las revisiones de [ginecología](/services/ginecologia) y de [salud del hombre](/services/salud-hombre) incluyen estas pruebas cuando se solicitan.

${AREAS_ES}`,
    longDescriptionEn: `Most sexually transmitted infections cause no symptoms at first, and the only way to know is the test. At Clínica Hispana Nueva Salud Pasadena it is done with no appointment, in Spanish or English, with a confidential result and treatment at the same clinic when needed.

## Which STD tests are done?

Chlamydia and gonorrhea on a urine sample or swab; syphilis and HIV on blood; hepatitis B and C on blood; and, when there are sores or discharge, evaluation for herpes, trichomonas and other infections. The physician chooses the panel based on your symptoms, your practices and your last test; you do not need to ask for them one by one.

## When should I get tested?

Once a year if you are sexually active; every 3 to 6 months if you have new or multiple partners; whenever a partner tells you about a positive result; at the start of pregnancy; and with symptoms such as unusual discharge, burning when urinating, sores, warts or pelvic pain. Keep the window period in mind: a test done a few days after exposure can be negative; for HIV and syphilis it is worth repeating at 4 to 6 weeks and at 3 months.

## Is it confidential?

Yes. The result is yours: it is not shared with your partner, your family or your employer, and no immigration status is asked. At the front desk you only need to say you are here for a test; details are discussed in the exam room. If you prefer, you can ask about prices on WhatsApp at (346) 222-1006 before coming.

## What if it is positive?

Chlamydia, gonorrhea, syphilis and trichomonas are cured with antibiotics prescribed at the same clinic. Herpes and HIV are not cured but are controlled with treatment; for HIV, we guide the referral to a specialized center where the medication may be free or low cost. In every case, recent partners should be told so they can get tested too and reinfection is avoided.

## How do I prevent an STD?

A condom every time is the only thing that prevents most of them. In addition, the HPV vaccine protects against the strains that cause cervical cancer and warts, and the hepatitis B vaccine is given at the clinic: see [vaccines](/en/services/vacunas). If you had a high-risk HIV exposure in the last 72 hours, go to the emergency room right away to be evaluated for prophylaxis.

## How much do STD tests cost in Pasadena?

We give you the price of the full panel or of each test by phone at (281) 747-8817, without you having to give your name. No health insurance is needed; we accept cash and cards.

## What is the visit like?

Walk in from 9 AM to 9 PM. For the urine sample, try not to urinate in the hour before. The blood sample is drawn in the clinic and we let you know when the result is ready; if there are symptoms, treatment can start the same day. [Gynecology](/en/services/ginecologia) and [men's health](/en/services/salud-hombre) checkups include these tests when requested.

${AREAS_EN}`,
  },
  {
    slug: "examen-alcohol-drogas",
    dateModified: "2026-09-12",
    order: 17,
    category: "examenes",
    icon: "Beaker",
    title: "Exámenes de Alcohol y Drogas",
    titleEn: "Alcohol & Drug Testing",
    shortDescription:
      "Pruebas de alcohol y drogas para trabajo y trámites, rápidas y con documentación.",
    shortDescriptionEn:
      "Alcohol and drug testing for work and paperwork, fast and with documentation.",
    description:
      "Exámenes de alcohol y drogas en Pasadena, TX. Para empleo y trámites, en español, con precios accesibles.",
    descriptionEn:
      "Alcohol and drug testing in Pasadena, TX. For employment and paperwork, in Spanish, with affordable pricing.",
    keywords: [
      "examen de drogas pasadena",
      "prueba de alcohol y drogas pasadena",
      "drug test pasadena español",
      "examen de drogas para trabajo pasadena",
    ],
    keywordsEn: [
      "drug test pasadena",
      "alcohol and drug test pasadena",
      "employment drug test pasadena",
      "drug screening pasadena",
    ],
    features: [
      "Prueba de drogas para empleo",
      "Prueba de alcohol",
      "Proceso rápido",
      "Documentación del resultado",
    ],
    featuresEn: [
      "Drug test for employment",
      "Alcohol test",
      "Fast process",
      "Result documentation",
    ],
    longDescription: `Un empleo nuevo, una promoción, un contrato o un trámite legal: cada vez más procesos piden una prueba de drogas y alcohol. En Clínica Hispana Nueva Salud Pasadena se hace sin cita, con discreción, y sales con la documentación del resultado para entregar.

## ¿Qué pruebas de drogas y alcohol se hacen?

Prueba de drogas en orina con panel de las sustancias más solicitadas por los empleadores (marihuana, cocaína, anfetaminas, opiáceos, fenciclidina y, en paneles ampliados, benzodiacepinas, barbitúricos, metadona y otras) y prueba de alcohol. La prueba rápida da resultado en la clínica; cuando el empleador exige confirmación de laboratorio, la muestra se envía y el resultado se entrega por escrito.

## ¿Sirve para el trabajo?

Sí, para pruebas de preempleo, aleatorias o por sospecha razonable que pide una empresa, y para trámites personales o legales que requieran constancia. Si tu empleador exige el protocolo federal para conductores comerciales (prueba DOT con cadena de custodia y laboratorio certificado), confírmalo por teléfono antes de venir para indicarte si podemos realizarla o a dónde acudir. El [examen físico DOT](/services/examen-dot) para la licencia CDL sí se hace en la clínica.

## ¿Cuánto tiempo se detectan las sustancias?

Depende de la sustancia y del uso. En orina, el alcohol se detecta hasta 12 a 24 horas; la cocaína, 2 a 4 días; las anfetaminas, 2 a 4 días; los opiáceos, 2 a 4 días; la marihuana, de 3 días en uso ocasional a 30 días o más en uso frecuente. Son rangos generales, no garantías.

## ¿Qué medicamentos pueden dar positivo?

Algunos medicamentos con receta y sin receta pueden dar un resultado positivo inicial: analgésicos opioides, medicamentos para el TDAH, ciertos ansiolíticos y jarabes con codeína, entre otros. Trae tus recetas o los frascos: si el resultado inicial es positivo por un medicamento indicado, la confirmación de laboratorio lo distingue y se documenta.

## ¿Cómo es la toma de muestra?

Se verifica tu identidad, se toma la muestra de orina en un baño de la clínica siguiendo las indicaciones del personal y se sella el recipiente frente a ti. Para la prueba de alcohol, se usa el método disponible según lo que solicite tu empleador o trámite. Todo el proceso toma unos minutos; evita beber grandes cantidades de agua antes, porque una orina muy diluida puede invalidar la muestra.

## ¿Cuánto cuesta la prueba de drogas en Pasadena?

Te damos el precio de la prueba rápida y de la confirmación por laboratorio por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta. Si la paga tu empleador, tráelo indicado por escrito.

## ¿Qué debo traer?

Identificación con foto vigente, el formulario o la solicitud del empleador si te dieron uno, la lista de medicamentos que tomas y, si aplica, la orden del trámite. Llegas sin cita de 9 AM a 9 PM. Los [exámenes de sangre](/services/examenes-sangre) que a veces acompañan el ingreso laboral se toman en la misma visita.

${AREAS_ES}`,
    longDescriptionEn: `A new job, a promotion, a contract or a legal process: more and more procedures require a drug and alcohol test. At Clínica Hispana Nueva Salud Pasadena it is done with no appointment, discreetly, and you leave with the result documentation to hand in.

## Which drug and alcohol tests are done?

A urine drug test with a panel of the substances employers most often request (marijuana, cocaine, amphetamines, opiates, phencyclidine and, in extended panels, benzodiazepines, barbiturates, methadone and others) and an alcohol test. The rapid test gives a result in the clinic; when the employer requires lab confirmation, the sample is sent out and the result is delivered in writing.

## Does it work for employment?

Yes, for pre-employment, random or reasonable-suspicion tests a company requests, and for personal or legal processes that require proof. If your employer requires the federal protocol for commercial drivers (a DOT test with chain of custody and a certified lab), confirm by phone before coming so we can tell you whether we can perform it or where to go. The [DOT physical](/en/services/examen-dot) for the CDL is done at the clinic.

## How long are substances detectable?

It depends on the substance and the use. In urine, alcohol is detectable for up to 12 to 24 hours; cocaine, 2 to 4 days; amphetamines, 2 to 4 days; opiates, 2 to 4 days; marijuana, from 3 days with occasional use to 30 days or more with frequent use. These are general ranges, not guarantees.

## Which medications can cause a positive?

Some prescription and over-the-counter medications can cause an initial positive: opioid pain relievers, ADHD medications, certain anti-anxiety drugs and codeine cough syrups, among others. Bring your prescriptions or bottles: if the initial result is positive because of a prescribed medication, lab confirmation tells the difference and it is documented.

## How is the sample collected?

Your identity is verified, the urine sample is collected in a clinic restroom following staff instructions and the container is sealed in front of you. For the alcohol test, the available method is used according to what your employer or process requests. The whole process takes a few minutes; avoid drinking large amounts of water beforehand, since very diluted urine can invalidate the sample.

## How much does a drug test cost in Pasadena?

We give you the price of the rapid test and of lab confirmation by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards. If your employer pays, bring that in writing.

## What should I bring?

A valid photo ID, the employer's form or request if you were given one, the list of medications you take and, if applicable, the order for the process. Walk in from 9 AM to 9 PM. The [blood tests](/en/services/examenes-sangre) that sometimes go with a new job are drawn at the same visit.

${AREAS_EN}`,
  },
  {
    slug: "electrocardiograma",
    dateModified: "2026-09-12",
    order: 18,
    category: "laboratorio",
    icon: "HeartPulse",
    title: "Electrocardiograma (EKG)",
    titleEn: "Electrocardiogram (EKG)",
    shortDescription:
      "Electrocardiograma (EKG) rápido y sin dolor para evaluar la salud de tu corazón, en español.",
    shortDescriptionEn:
      "Fast, painless electrocardiogram (EKG) to evaluate your heart health, in Spanish.",
    description:
      "Electrocardiograma EKG en Pasadena, TX, rápido y sin dolor. Resultados y atención en español, con precios accesibles.",
    descriptionEn:
      "Electrocardiogram EKG in Pasadena, TX, fast and painless. Results and care in Spanish, with affordable pricing.",
    keywords: [
      "electrocardiograma pasadena",
      "ekg pasadena español",
      "examen del corazon pasadena",
      "ecg pasadena",
    ],
    keywordsEn: [
      "electrocardiogram pasadena",
      "ekg pasadena",
      "heart test pasadena",
      "ecg pasadena spanish",
    ],
    features: [
      "Estudio rápido y sin dolor",
      "Evaluación del ritmo cardiaco",
      "Útil para exámenes médicos",
      "Resultados en español",
    ],
    featuresEn: [
      "Fast and painless test",
      "Heart-rhythm evaluation",
      "Useful for medical exams",
      "Results in Spanish",
    ],
    longDescription: `Un electrocardiograma registra en unos minutos cómo late tu corazón: el ritmo, la velocidad y las señales de que el músculo sufre. En Clínica Hispana Nueva Salud Pasadena se hace en la clínica, sin cita, y el equipo médico lo interpreta contigo en la misma visita.

## ¿Para qué sirve un electrocardiograma?

Para detectar arritmias como la fibrilación auricular, signos de un infarto reciente o antiguo, falta de riego al corazón, crecimiento del músculo cardiaco por presión alta de años, y alteraciones por potasio o calcio fuera de rango. También forma parte de exámenes médicos de trabajo, chequeos preoperatorios y evaluaciones deportivas cuando el médico lo indica.

## ¿Cuándo debo hacérmelo?

Si tienes palpitaciones, dolor u opresión en el pecho, falta de aire con el esfuerzo, mareos o desmayos; si tienes presión alta, diabetes o colesterol alto y nunca te lo han hecho; si empiezas un medicamento que afecta el ritmo; o si un formulario lo exige. Con dolor en el pecho intenso, sudor frío o dolor que se corre al brazo o la mandíbula, no vengas a la clínica: llama al 911.

## ¿Cómo se hace y cuánto dura?

Te recuestas, se limpian pequeñas zonas de la piel del pecho, brazos y piernas y se colocan electrodos adhesivos conectados al equipo. Debes quedarte quieto y relajado unos segundos mientras se registra. En total toma unos 10 minutos. No duele, no usa electricidad hacia el cuerpo ni radiación, y puedes hacerlo aunque estés embarazada.

## ¿Necesito preparación?

No hace falta ayuno. Evita cremas o aceites en el pecho ese día, ven con ropa fácil de quitar y, si es posible, no hagas ejercicio intenso ni tomes café justo antes, porque aceleran el pulso. Trae la lista de tus medicamentos y, si tienes, electrocardiogramas anteriores para comparar.

## ¿Qué pasa si sale alterado?

Muchas alteraciones son variantes normales o se explican por la presión, el pulso rápido o un medicamento. Cuando el trazo muestra algo que requiere estudio, el médico ordena análisis, ajusta el tratamiento de [presión, diabetes o colesterol](/services/condiciones-cronicas) y, si corresponde, orienta la referencia a cardiología para un ecocardiograma, un Holter o una prueba de esfuerzo. Si el hallazgo es urgente, se indica ir a emergencias ese momento.

## ¿Cuánto cuesta un electrocardiograma en Pasadena?

Te damos el precio por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta. Cuando forma parte de un chequeo con análisis, se cotiza junto.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM, el médico revisa tus síntomas y tu presión, se hace el estudio y se interpreta en la misma visita. Sales con tu resultado y las indicaciones. Los [análisis de sangre](/services/examenes-sangre) que suelen acompañarlo, como colesterol y glucosa, se toman al mismo tiempo; para el [examen DOT](/services/examen-dot) o el [chequeo del hombre](/services/salud-hombre) se incluye cuando el médico lo indica.

${AREAS_ES}`,
    longDescriptionEn: `An electrocardiogram records in a few minutes how your heart beats: the rhythm, the rate and the signs that the muscle is under strain. At Clínica Hispana Nueva Salud Pasadena it is done in the clinic, with no appointment, and the medical team interprets it with you at the same visit.

## What is an electrocardiogram for?

To detect arrhythmias such as atrial fibrillation, signs of a recent or old heart attack, poor blood flow to the heart, thickening of the heart muscle from years of high blood pressure, and changes caused by potassium or calcium out of range. It is also part of work physicals, pre-surgery checkups and sports evaluations when the physician orders it.

## When should I have one?

If you have palpitations, chest pain or pressure, shortness of breath with exertion, dizziness or fainting; if you have high blood pressure, diabetes or high cholesterol and have never had one; if you start a medication that affects heart rhythm; or if a form requires it. With intense chest pain, cold sweat or pain spreading to the arm or jaw, do not come to the clinic: call 911.

## How is it done, and how long does it take?

You lie down, small areas of skin on the chest, arms and legs are cleaned, and adhesive electrodes connected to the machine are placed. You need to stay still and relaxed for a few seconds while it records. In all it takes about 10 minutes. It does not hurt, sends no electricity into the body and uses no radiation, and you can have it even if you are pregnant.

## Do I need preparation?

No fasting is needed. Avoid creams or oils on the chest that day, wear clothing that is easy to remove and, if possible, do not exercise hard or drink coffee right before, since they speed up the pulse. Bring your medication list and, if you have them, previous electrocardiograms to compare.

## What if it is abnormal?

Many abnormalities are normal variants or are explained by blood pressure, a fast pulse or a medication. When the tracing shows something that needs workup, the physician orders labs, adjusts treatment for [blood pressure, diabetes or cholesterol](/en/services/condiciones-cronicas) and, when appropriate, guides a cardiology referral for an echocardiogram, a Holter monitor or a stress test. If the finding is urgent, you are sent to the emergency room right then.

## How much does an electrocardiogram cost in Pasadena?

We give you the price by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards. When it is part of a checkup with labs, it is quoted together.

## What is the visit like?

Walk in from 9 AM to 9 PM, the physician reviews your symptoms and blood pressure, the study is done and interpreted at the same visit. You leave with your result and instructions. The [blood tests](/en/services/examenes-sangre) that usually go with it, such as cholesterol and glucose, are drawn at the same time; for the [DOT physical](/en/services/examen-dot) or the [men's checkup](/en/services/salud-hombre) it is included when the physician orders it.

${AREAS_EN}`,
  },
  {
    slug: "ultrasonido",
    dateModified: "2026-09-12",
    order: 19,
    category: "laboratorio",
    icon: "ScanLine",
    title: "Ultrasonido y Ecografía",
    titleEn: "Ultrasound & Sonography",
    shortDescription:
      "Ultrasonidos diagnósticos y de embarazo con equipo moderno y atención en español.",
    shortDescriptionEn:
      "Diagnostic and pregnancy ultrasounds with modern equipment and care in Spanish.",
    description:
      "Ultrasonido y ecografía en Pasadena, TX: abdominal, pélvico y de embarazo. En español, con precios accesibles.",
    descriptionEn:
      "Ultrasound and sonography in Pasadena, TX: abdominal, pelvic and pregnancy. In Spanish, with affordable pricing.",
    keywords: [
      "ultrasonido pasadena",
      "ecografia pasadena español",
      "ultrasonido de embarazo pasadena",
      "sonograma pasadena",
    ],
    keywordsEn: [
      "ultrasound pasadena",
      "sonogram pasadena",
      "pregnancy ultrasound pasadena",
      "abdominal ultrasound pasadena",
    ],
    features: [
      "Ultrasonido abdominal y pélvico",
      "Ultrasonido de embarazo",
      "Equipo moderno",
      "Atención en español",
    ],
    featuresEn: [
      "Abdominal and pelvic ultrasound",
      "Pregnancy ultrasound",
      "Modern equipment",
      "Care in Spanish",
    ],
    longDescription: `El ultrasonido muestra en tiempo real lo que pasa dentro del cuerpo usando ondas de sonido, sin radiación y sin dolor. En Clínica Hispana Nueva Salud Pasadena lo hacemos en la misma clínica, con personal que te explica lo que ve, en español.

## ¿Qué tipos de ultrasonido hacen en la clínica?

- **Abdominal:** hígado, vesícula y vías biliares, páncreas, bazo y riñones. Se pide por dolor abdominal, sospecha de piedras en la vesícula o el riñón, o resultados de hígado alterados.
- **Pélvico:** útero y ovarios en la mujer; vejiga y próstata en el hombre. Se usa para dolor pélvico, sangrado irregular, quistes o miomas.
- **De embarazo:** confirma el embarazo, calcula la edad gestacional, revisa el latido y el crecimiento del bebé y sirve de control durante el seguimiento prenatal.
- **De tiroides y tejidos blandos:** estudia nódulos en el cuello, bultos bajo la piel o ganglios inflamados.

Si el médico necesita un estudio distinto, te lo indica y te orienta a dónde hacerlo.

## ¿Cómo debo prepararme?

Depende del estudio. Para el abdominal conviene venir con 6 a 8 horas de ayuno, para que la vesícula esté llena y el intestino con menos gas. Para el pélvico y el de embarazo temprano se pide la vejiga llena: toma unos vasos de agua una hora antes y no orines hasta terminar. Para tiroides, tejidos blandos y embarazo avanzado no hace falta preparación. Usa ropa cómoda de dos piezas.

## ¿El ultrasonido es seguro en el embarazo?

Sí. No usa radiación, a diferencia de los rayos X o la tomografía, y se emplea de forma rutinaria durante todo el embarazo. El gel que se aplica sobre la piel solo sirve para que las ondas pasen mejor; se limpia al terminar.

## ¿Cuánto dura y cuándo tengo los resultados?

El estudio suele tomar entre 15 y 30 minutos. Las imágenes se ven en el momento y el equipo médico las revisa contigo en la misma visita; si hace falta un reporte escrito o compartir el estudio con otro médico, lo preparamos y te avisamos en cuanto esté listo.

## ¿Cuánto cuesta un ultrasonido en Pasadena?

El precio varía según la zona que se estudia; te lo confirmamos por teléfono antes de venir. No necesitas seguro médico y aceptamos efectivo y tarjeta.

## ¿Necesito orden médica?

No es obligatoria. Puedes llegar sin cita, de lunes a domingo de 9 AM a 9 PM, y el médico decide contigo qué estudio corresponde según tus síntomas. Si traes una orden de otro doctor, la seguimos tal cual.

## Servicios relacionados

Un ultrasonido de embarazo empieza con una [prueba de embarazo](/services/prueba-embarazo); el control ginecológico continúa en [ginecología](/services/ginecologia). Los nódulos de tiroides se evalúan junto con los análisis de [tiroides](/services/tiroides).

${AREAS_ES}`,
    longDescriptionEn: `Ultrasound shows in real time what is happening inside the body using sound waves, with no radiation and no pain. At Clínica Hispana Nueva Salud Pasadena we do it at the clinic itself, with staff who explain what they see, in Spanish or English.

## Which types of ultrasound does the clinic do?

- **Abdominal:** liver, gallbladder and bile ducts, pancreas, spleen and kidneys. Ordered for abdominal pain, suspected gallstones or kidney stones, or abnormal liver results.
- **Pelvic:** uterus and ovaries in women; bladder and prostate in men. Used for pelvic pain, irregular bleeding, cysts or fibroids.
- **Pregnancy:** confirms the pregnancy, estimates gestational age, checks the heartbeat and the baby's growth and serves as a check during prenatal follow-up.
- **Thyroid and soft tissue:** studies neck nodules, lumps under the skin or swollen lymph nodes.

If the physician needs a different study, they tell you and guide you on where to get it.

## How should I prepare?

It depends on the study. For an abdominal scan, come with 6 to 8 hours of fasting so the gallbladder is full and the bowel has less gas. For pelvic and early pregnancy scans, a full bladder is needed: drink a few glasses of water an hour before and do not urinate until you are done. Thyroid, soft-tissue and late-pregnancy scans need no preparation. Wear comfortable two-piece clothing.

## Is ultrasound safe in pregnancy?

Yes. It uses no radiation, unlike X-rays or CT scans, and it is used routinely throughout pregnancy. The gel applied to the skin only helps the waves pass through; it is wiped off when you finish.

## How long does it take, and when do I get results?

The study usually takes 15 to 30 minutes. The images are seen on the spot and the medical team reviews them with you at the same visit; if a written report is needed or the study must be shared with another physician, we prepare it and let you know as soon as it is ready.

## How much does an ultrasound cost in Pasadena?

The price varies with the area studied; we confirm it by phone before you come. No health insurance is needed, and we accept cash and cards.

## Do I need a doctor's order?

It is not required. You can walk in, Monday to Sunday, 9 AM to 9 PM, and the physician decides with you which study fits your symptoms. If you bring an order from another doctor, we follow it as written.

## Related services

A pregnancy ultrasound starts with a [pregnancy test](/en/services/prueba-embarazo); gynecological follow-up continues under [gynecology](/en/services/ginecologia). Thyroid nodules are evaluated together with [thyroid](/en/services/tiroides) lab work.

${AREAS_EN}`,
  },
  {
    slug: "examen-dot",
    dateModified: "2026-09-12",
    order: 20,
    category: "examenes",
    icon: "Truck",
    highlighted: true,
    title: "Examen Físico DOT en Español - Licencia CDL",
    titleEn: "DOT Physical Exam - CDL License",
    shortDescription:
      "Examen físico DOT para conductores comerciales (CDL), con certificado el mismo día.",
    shortDescriptionEn:
      "DOT physical exam for commercial drivers (CDL), with same-day certificate.",
    description:
      "Examen físico DOT en Pasadena, TX para licencia CDL, certificado el mismo día y en español. Con precios accesibles.",
    descriptionEn:
      "DOT physical exam in Pasadena, TX for CDL license, same-day certificate, in Spanish. With affordable pricing.",
    keywords: [
      "examen dot pasadena",
      "examen fisico dot pasadena español",
      "examen cdl pasadena",
      "dot physical pasadena español",
    ],
    keywordsEn: [
      "dot physical pasadena",
      "dot exam pasadena",
      "cdl physical pasadena",
      "dot medical exam pasadena",
    ],
    features: [
      "Certificado DOT el mismo día",
      "Para licencia CDL",
      "Proceso rápido",
      "Atención en español",
    ],
    featuresEn: [
      "Same-day DOT certificate",
      "For CDL license",
      "Fast process",
      "Care in Spanish",
    ],
    longDescription: `Si manejas camión, autobús o cualquier vehículo comercial, necesitas un certificado médico DOT vigente para obtener o renovar tu licencia CDL. En Clínica Hispana Nueva Salud Pasadena hacemos el examen en español, sin cita, y te entregamos el certificado al terminar si cumples los requisitos.

## ¿Qué se revisa en el examen físico DOT?

El examen sigue el formato que exige la FMCSA (la agencia federal de transporte). Incluye: cuestionario de salud e historial médico; medición de presión arterial y pulso; examen de visión, donde se pide ver al menos 20/40 en cada ojo, con o sin lentes, y distinguir colores de semáforo; prueba de audición, con capacidad de oír un susurro a 5 pies; análisis de orina para detectar proteína, sangre o azúcar (no es una prueba de drogas); y un examen físico general que revisa corazón, pulmones, abdomen, columna y extremidades. Al final el médico decide si calificas y por cuánto tiempo.

## ¿Cuánto dura el certificado DOT?

Hasta 24 meses cuando no hay condiciones que vigilar. Si tienes presión alta, diabetes, apnea del sueño u otra condición controlada, el certificado puede ser de un año, tres meses o menos, para que el médico revise tu control con más frecuencia. La presión arterial es la causa más común de certificados cortos: una lectura de 140/90 o más suele acortar la vigencia, y de 180/110 o más descalifica hasta que baje.

## ¿Qué pasa si tengo diabetes o presión alta?

Puedes aprobar el examen si tu condición está controlada. Trae tus medicamentos y, si tienes diabetes, tu último resultado de A1C; si usas insulina, la FMCSA pide un formulario adicional de tu médico tratante. Si tu presión sale alta el día del examen, el médico puede repetir la medición o darte un certificado corto mientras la controlas; en la misma clínica tratamos [presión alta y diabetes](/services/condiciones-cronicas).

## ¿Cuánto cuesta el examen DOT en Pasadena?

Te damos el precio por teléfono antes de venir; no necesitas seguro médico y aceptamos efectivo y tarjeta. Si necesitas repetir alguna medición o traer documentación adicional, te lo decimos en la misma visita para que no pierdas tiempo.

## ¿Qué debo traer?

- Licencia de conducir vigente.
- Lentes o aparato auditivo, si los usas.
- Lista de medicamentos con dosis.
- Si tienes diabetes, resultado reciente de A1C; si usas insulina, el formulario de tu médico.
- Si usas CPAP para apnea del sueño, el reporte de uso del aparato.
- Tu certificado DOT anterior, si lo tienes.

## ¿Cómo es la visita?

Llegas sin cita en nuestro horario de 9 AM a 9 PM, todos los días. Llenas el cuestionario de salud, pasas a las mediciones y luego al examen con el médico. Si calificas, sales con tu certificado médico firmado, listo para presentarlo en el DPS de Texas y para tu empleador.

## Servicios relacionados

Si tu empresa te pide además una prueba de drogas o alcohol, la hacemos en [examen de alcohol y drogas](/services/examen-alcohol-drogas). Los análisis de laboratorio que complementan el chequeo están en [exámenes de sangre](/services/examenes-sangre).

${AREAS_ES}`,
    longDescriptionEn: `If you drive a truck, a bus or any commercial vehicle, you need a current DOT medical certificate to get or renew your CDL. At Clínica Hispana Nueva Salud Pasadena we do the exam in Spanish or English, no appointment needed, and hand you the certificate when you finish if you meet the requirements.

## What is checked in the DOT physical?

The exam follows the format required by the FMCSA (the federal transportation agency). It includes: a health questionnaire and medical history; blood pressure and pulse; a vision test, where you need at least 20/40 in each eye, with or without glasses, and must tell traffic-light colors apart; a hearing test, with the ability to hear a forced whisper at 5 feet; a urinalysis to detect protein, blood or sugar (it is not a drug test); and a general physical exam covering heart, lungs, abdomen, spine and limbs. At the end the physician decides whether you qualify and for how long.

## How long is the DOT certificate valid?

Up to 24 months when there are no conditions to monitor. If you have high blood pressure, diabetes, sleep apnea or another controlled condition, the certificate may be for one year, three months or less, so the physician can recheck your control more often. Blood pressure is the most common reason for short certificates: a reading of 140/90 or higher usually shortens it, and 180/110 or higher disqualifies you until it comes down.

## What if I have diabetes or high blood pressure?

You can pass the exam if your condition is controlled. Bring your medications and, if you have diabetes, your latest A1C result; if you use insulin, the FMCSA requires an additional form from your treating physician. If your blood pressure is high on exam day, the physician can repeat the reading or issue a short certificate while you get it under control; at the same clinic we treat [high blood pressure and diabetes](/en/services/condiciones-cronicas).

## How much does the DOT exam cost in Pasadena?

We give you the price by phone before you come; no health insurance is needed, and we accept cash and cards. If you need to repeat a measurement or bring extra paperwork, we tell you at the same visit so you do not lose time.

## What should I bring?

- A valid driver's license.
- Glasses or hearing aids, if you use them.
- A list of medications with doses.
- If you have diabetes, a recent A1C result; if you use insulin, your physician's form.
- If you use a CPAP for sleep apnea, the device usage report.
- Your previous DOT certificate, if you have one.

## What is the visit like?

Walk in during our hours, 9 AM to 9 PM every day. You fill out the health questionnaire, go through the measurements and then see the physician. If you qualify, you leave with your signed medical certificate, ready for Texas DPS and your employer.

## Related services

If your company also requires a drug or alcohol test, we do it under [drug and alcohol testing](/en/services/examen-alcohol-drogas). The lab work that complements the checkup is under [blood tests](/en/services/examenes-sangre).

${AREAS_EN}`,
  },
  {
    slug: "examenes-inmigracion",
    dateModified: "2026-09-12",
    order: 21,
    category: "examenes",
    icon: "ClipboardCheck",
    title: "Examen Médico de Inmigración I-693",
    titleEn: "Immigration Medical Exam I-693",
    shortDescription:
      "Examen médico de inmigración con médico autorizado por USCIS y el Formulario I-693 sellado.",
    shortDescriptionEn:
      "Immigration medical exam with a USCIS-authorized physician and the sealed Form I-693.",
    description:
      "Examen médico de inmigración I-693 en Pasadena, TX con médico autorizado por USCIS. Vacunas y formulario sellado.",
    descriptionEn:
      "I-693 immigration medical exam in Pasadena, TX with a USCIS-authorized physician. Vaccines and sealed form.",
    keywords: [
      "examen de inmigracion pasadena",
      "examen medico i-693 pasadena",
      "civil surgeon pasadena español",
      "medico autorizado uscis pasadena",
    ],
    keywordsEn: [
      "immigration medical exam pasadena",
      "i-693 exam pasadena",
      "civil surgeon pasadena",
      "uscis authorized doctor pasadena",
    ],
    features: [
      "Médico autorizado (civil surgeon)",
      "Formulario I-693 sellado",
      "Vacunas requeridas disponibles",
      "Proceso explicado en español",
    ],
    featuresEn: [
      "Authorized civil surgeon",
      "Sealed Form I-693",
      "Required vaccines available",
      "Process explained in Spanish",
    ],
    longDescription: `El examen médico de inmigración es el paso médico del ajuste de estatus: un médico autorizado por USCIS (civil surgeon) revisa tu salud, verifica tus vacunas y llena el Formulario I-693. En Clínica Hispana Nueva Salud Pasadena lo hacemos completo, en español, y te entregamos el sobre sellado listo para tu trámite.

## ¿Qué revisa el médico en el examen I-693?

El examen tiene cuatro partes. Primero, tu historial: enfermedades previas, medicamentos y vacunas. Segundo, un examen físico general. Tercero, las pruebas que exige USCIS: la de tuberculosis, que para mayores de 2 años se hace con una prueba de sangre (IGRA) y, si sale positiva, una radiografía de tórax; y, según tu edad, pruebas de sífilis y gonorrea. Cuarto, la revisión de vacunas: se comparan las que tienes con las que USCIS pide para tu edad y se aplican las que falten. Todo se registra en el I-693, que el médico firma y sella.

## ¿Qué vacunas piden para inmigración?

Depende de la edad, y la lista la fija USCIS con base en el calendario del CDC. Las más comunes para adultos son tétanos y difteria (Td o Tdap), sarampión, paperas y rubéola (MMR), varicela, hepatitis B, y la de influenza durante la temporada de gripe. Los mayores de 65 años suelen necesitar también la vacuna contra el neumococo. Si traes tu cartilla o registro de vacunas, solo se aplican las que falten; si no tienes registro, el médico decide qué corresponde. La vacuna contra COVID-19 ya no es requisito del I-693.

## ¿Cuánto tarda y cuándo me entregan el sobre?

La consulta y el examen físico se hacen el mismo día en que vienes, sin cita. El sobre se sella cuando están completos los resultados de laboratorio y las vacunas, porque el formulario debe incluirlos. Te avisamos en cuanto esté listo. Importante: el sobre debe entregarse a USCIS cerrado; si lo abres, pierde validez. Pide una copia del formulario para tu archivo antes de que se selle.

## ¿Cuánto tiempo es válido el I-693?

Según la política vigente de USCIS, los formularios I-693 firmados por el civil surgeon a partir del 1 de noviembre de 2023 no vencen mientras se usen para una solicitud. Aun así, conviene presentarlo con la solicitud o cuando USCIS lo pida, y confirmar la regla actual en uscis.gov, porque puede cambiar.

## ¿Cuánto cuesta el examen de inmigración en Pasadena?

El precio depende de qué pruebas y vacunas necesites, así que lo confirmamos por teléfono antes de tu visita. No hace falta seguro médico; aceptamos efectivo y tarjeta. Si ya tienes pruebas recientes o vacunas registradas, se descuentan del proceso.

## ¿Qué debo traer?

- Identificación con foto vigente.
- Cartilla o registro de vacunas, en cualquier idioma.
- Resultados médicos recientes, si los tienes: radiografía de tórax, prueba de tuberculosis, análisis.
- Lista de medicamentos y diagnósticos previos.
- El nombre exacto como aparece en tu solicitud, para que coincida en el formulario.

## Servicios relacionados

Las vacunas que falten se aplican en la misma visita: consulta [vacunas](/services/vacunas). La prueba de tuberculosis se describe en [prueba de tuberculosis](/services/prueba-tuberculosis) y los análisis en [exámenes de sangre](/services/examenes-sangre).

${AREAS_ES}`,
    longDescriptionEn: `The immigration medical exam is the medical step of adjustment of status: a USCIS-authorized physician (civil surgeon) reviews your health, checks your vaccines and completes Form I-693. At Clínica Hispana Nueva Salud Pasadena we do the whole process, in Spanish or English, and hand you the sealed envelope ready for your case.

## What does the physician check in the I-693 exam?

The exam has four parts. First, your history: previous illnesses, medications and vaccines. Second, a general physical exam. Third, the tests USCIS requires: tuberculosis screening, done for everyone over 2 years old with a blood test (IGRA) and, if positive, a chest X-ray; and, depending on your age, syphilis and gonorrhea tests. Fourth, the vaccine review: the vaccines you have are compared with those USCIS requires for your age, and any missing ones are given. Everything is recorded on the I-693, which the physician signs and seals.

## Which vaccines are required for immigration?

It depends on age, and USCIS sets the list based on the CDC schedule. The most common ones for adults are tetanus and diphtheria (Td or Tdap), measles, mumps and rubella (MMR), varicella, hepatitis B and the flu shot during flu season. People over 65 usually also need the pneumococcal vaccine. If you bring your vaccine card or record, only the missing ones are given; without a record, the physician decides what applies. The COVID-19 vaccine is no longer an I-693 requirement.

## How long does it take, and when do I get the envelope?

The visit and physical exam happen the same day you walk in, no appointment needed. The envelope is sealed once the lab results and vaccines are complete, because the form must include them. We let you know as soon as it is ready. Important: the envelope must reach USCIS sealed; opening it voids it. Ask for a copy of the form for your records before it is sealed.

## How long is the I-693 valid?

Under current USCIS policy, I-693 forms signed by the civil surgeon on or after November 1, 2023 do not expire while used for an application. Even so, it is best to file it with your application or when USCIS requests it, and to confirm the current rule at uscis.gov, since it can change.

## How much does the immigration exam cost in Pasadena?

The price depends on which tests and vaccines you need, so we confirm it by phone before your visit. No health insurance is needed; we accept cash and cards. If you already have recent tests or documented vaccines, they are taken off the process.

## What should I bring?

- A valid photo ID.
- Your vaccine card or record, in any language.
- Recent medical results, if you have them: chest X-ray, tuberculosis test, lab work.
- A list of medications and previous diagnoses.
- Your name exactly as it appears on your application, so it matches the form.

## Related services

Missing vaccines are given at the same visit: see [vaccines](/en/services/vacunas). Tuberculosis screening is described under [tuberculosis test](/en/services/prueba-tuberculosis) and lab work under [blood tests](/en/services/examenes-sangre).

${AREAS_EN}`,
  },
  {
    slug: "vacunas",
    dateModified: "2026-09-12",
    order: 22,
    category: "tratamientos",
    icon: "Syringe",
    title: "Vacunas contra la Influenza y Toxoide Tetánico",
    titleEn: "Flu and Tetanus (Tdap) Vaccines",
    shortDescription:
      "Vacuna contra la influenza (flu) y toxoide tetánico, aplicadas por personal médico, en español.",
    shortDescriptionEn:
      "Influenza (flu) vaccine and tetanus toxoid, administered by medical staff, in Spanish.",
    description:
      "Vacunas de flu y toxoide tetánico en Pasadena, TX. Aplicación por personal médico en español, con precios accesibles.",
    descriptionEn:
      "Flu and tetanus vaccines in Pasadena, TX. Administered by medical staff in Spanish, with affordable pricing.",
    keywords: [
      "vacuna de la flu pasadena",
      "vacuna contra la influenza pasadena",
      "toxoide tetanico pasadena",
      "vacuna del tetano pasadena",
    ],
    keywordsEn: [
      "flu shot pasadena",
      "flu vaccine pasadena",
      "tetanus shot pasadena",
      "tdap vaccine pasadena",
    ],
    features: [
      "Vacuna contra la influenza (flu)",
      "Toxoide tetánico",
      "Aplicación por personal médico",
      "Atención en español",
    ],
    featuresEn: [
      "Influenza (flu) vaccine",
      "Tetanus toxoid",
      "Administered by medical staff",
      "Care in Spanish",
    ],
    longDescription: `Ponerse al día con las vacunas toma minutos y evita semanas de enfermedad. En Clínica Hispana Nueva Salud Pasadena las aplica personal médico, sin cita, con orientación en español sobre cuál te toca y cuándo viene el refuerzo.

## ¿Qué vacunas aplican en la clínica?

La vacuna anual contra la influenza y el toxoide tetánico (Td o Tdap) para adultos. Además, las vacunas que exige el examen médico de inmigración cuando faltan en tu registro: sarampión, paperas y rubéola (MMR), varicela, hepatitis B y neumococo, según la edad. Si necesitas una vacuna distinta, llama antes para confirmar disponibilidad y te orientamos a dónde conseguirla si no la tenemos.

## ¿Cuándo toca la vacuna de la influenza?

Cada temporada, idealmente entre septiembre y octubre, aunque sirve ponerla en cualquier momento mientras circule el virus. Es una sola dosis anual para adultos. Está especialmente indicada para mayores de 65, embarazadas, personas con diabetes, asma, enfermedades del corazón o del riñón, y quienes cuidan a bebés o adultos mayores. Los efectos habituales son dolor en el brazo y malestar leve uno o dos días.

## ¿Cada cuánto se pone el tétanos?

Un refuerzo de Td cada 10 años. Se recomienda una dosis de Tdap, que además protege contra tos ferina, al menos una vez en la vida adulta y en cada embarazo. Si te cortas con algo sucio u oxidado y no recuerdas cuándo fue tu último refuerzo, conviene ponerlo si han pasado más de 5 años; en la clínica también se [cura la herida](/services/curacion-heridas) en la misma visita.

## ¿Qué necesito para el examen de inmigración?

Traer tu registro de vacunas en cualquier idioma. El médico compara lo que tienes con la lista de USCIS para tu edad y aplica solo lo que falta; algunas vacunas van en series de dos o tres dosis y la siguiente se programa. El detalle del proceso está en [examen médico de inmigración](/services/examenes-inmigracion).

## ¿Quién no debe vacunarse o debe esperar?

Quien tenga fiebre o una enfermedad aguda ese día espera a recuperarse. Quien haya tenido una reacción alérgica grave a una dosis previa o a un componente lo informa antes. En el embarazo la influenza y la Tdap sí se aplican; la MMR y la varicela no. Todo esto se revisa en una conversación breve antes de la inyección.

## ¿Cuánto cuestan las vacunas en Pasadena?

Te damos el precio de cada vacuna por teléfono al (281) 747-8817. No necesitas seguro médico; aceptamos efectivo y tarjeta. Cada vacuna queda registrada y te entregamos constancia para tu archivo, la escuela o el trámite.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM, se revisa tu registro y tus antecedentes, se aplica la vacuna y esperas unos 15 minutos en la clínica por si hubiera reacción. Sales con tu constancia y la fecha de la siguiente dosis si aplica.

${AREAS_ES}`,
    longDescriptionEn: `Catching up on vaccines takes minutes and prevents weeks of illness. At Clínica Hispana Nueva Salud Pasadena they are given by medical staff, with no appointment, with guidance in Spanish or English on which one you are due for and when the booster comes.

## Which vaccines does the clinic give?

The yearly flu vaccine and the tetanus toxoid (Td or Tdap) for adults. In addition, the vaccines required by the immigration medical exam when missing from your record: measles, mumps and rubella (MMR), varicella, hepatitis B and pneumococcal, by age. If you need a different vaccine, call first to confirm availability, and we guide you on where to get it if we do not have it.

## When is the flu shot due?

Every season, ideally in September or October, though it is worth getting at any time while the virus is circulating. It is a single yearly dose for adults. It is especially indicated for people over 65, pregnant women, people with diabetes, asthma, heart or kidney disease, and those who care for babies or older adults. The usual effects are a sore arm and mild malaise for a day or two.

## How often is the tetanus shot given?

A Td booster every 10 years. One dose of Tdap, which also protects against whooping cough, is recommended at least once in adulthood and in every pregnancy. If you cut yourself on something dirty or rusty and do not remember your last booster, it is worth getting one if more than 5 years have passed; the clinic also does [wound care](/en/services/curacion-heridas) at the same visit.

## What do I need for the immigration exam?

Bring your vaccine record in any language. The physician compares what you have with the USCIS list for your age and gives only what is missing; some vaccines come in series of two or three doses, and the next one is scheduled. The process is detailed under [immigration medical exam](/en/services/examenes-inmigracion).

## Who should not be vaccinated, or should wait?

Anyone with a fever or an acute illness that day waits until recovered. Anyone who had a severe allergic reaction to a previous dose or a component says so beforehand. In pregnancy, the flu and Tdap vaccines are given; MMR and varicella are not. All of this is reviewed in a short conversation before the injection.

## How much do vaccines cost in Pasadena?

We give you the price of each vaccine by phone at (281) 747-8817. No health insurance is needed; we accept cash and cards. Each vaccine is recorded, and you receive proof for your records, the school or your case.

## What is the visit like?

Walk in from 9 AM to 9 PM; your record and history are reviewed, the vaccine is given and you wait about 15 minutes at the clinic in case of a reaction. You leave with your proof and the date of the next dose if applicable.

${AREAS_EN}`,
  },
  {
    slug: "sueros-vitaminados",
    dateModified: "2026-09-12",
    order: 23,
    category: "tratamientos",
    icon: "Droplets",
    title: "Sueros Vitaminados (Terapia IV)",
    titleEn: "Vitamin IV Therapy",
    shortDescription:
      "Sueros vitaminados intravenosos para hidratación y energía, aplicados por personal médico.",
    shortDescriptionEn:
      "Intravenous vitamin drips for hydration and energy, administered by medical staff.",
    description:
      "Sueros vitaminados (terapia IV) en Pasadena, TX. Hidratación y vitaminas en español, con precios accesibles.",
    descriptionEn:
      "Vitamin IV therapy in Pasadena, TX. Hydration and vitamins in Spanish, with affordable pricing.",
    keywords: [
      "sueros vitaminados pasadena",
      "terapia iv pasadena",
      "suero de vitaminas pasadena",
      "hidratacion intravenosa pasadena",
    ],
    keywordsEn: [
      "vitamin iv therapy pasadena",
      "iv drip pasadena",
      "iv hydration pasadena",
      "vitamin drip pasadena",
    ],
    features: [
      "Hidratación intravenosa",
      "Vitaminas y minerales",
      "Aplicación por personal médico",
      "Atención en español",
    ],
    featuresEn: [
      "Intravenous hydration",
      "Vitamins and minerals",
      "Administered by medical staff",
      "Care in Spanish",
    ],
    longDescription: `Un suero vitaminado es una infusión intravenosa aplicada por personal médico en unos 30 a 60 minutos. En Clínica Hispana Nueva Salud Pasadena se indica después de una evaluación breve, sin cita, y se acompaña de la inyección de vitamina B12 cuando hace falta.

## ¿Qué es un suero vitaminado?

Una infusión que entra por una vía en el brazo y llega directamente a la sangre, sin pasar por el estómago. El equipo médico la indica según el motivo de la visita y tu historial, después de una evaluación breve; no es la misma para todos ni se aplica sin revisar antes.

## ¿Cuándo puede ayudar?

Cuando hay deshidratación por calor, vómito, diarrea o exceso de alcohol; después de una gripe o una infección que dejó debilidad; en periodos de cansancio con mala alimentación; y en personas con deficiencia de vitaminas confirmada que no absorben bien las pastillas. En esos casos repone líquidos y vitaminas más rápido que por la boca. No sustituye el tratamiento de una enfermedad ni una alimentación adecuada, y no "quema grasa" ni "desintoxica": eso no lo prometemos.

## ¿Quién no debe recibirlo?

Personas con insuficiencia renal o cardiaca, porque el exceso de líquido les hace daño; embarazadas sin indicación médica; y quien tenga alergia a alguno de los componentes. Por eso antes de la infusión el equipo médico revisa tu presión, tus antecedentes y tus medicamentos, y si conviene, pide un análisis.

## ¿Duele o tiene efectos secundarios?

Se siente el piquete de la vía y, a veces, frío en el brazo mientras pasa la infusión. Puede quedar un pequeño moretón en el sitio. Reacciones mayores son raras y por eso la infusión se hace en la clínica, con personal presente todo el tiempo.

## ¿Y la inyección de vitamina B12?

Se aplica en el músculo en segundos y está indicada cuando la B12 en sangre sale baja o hay factores de riesgo: dieta vegetariana, más de 50 años, metformina, antiácidos o cirugía de estómago. El paquete de Examen General de Sangre con Vitamina B12 cuesta $99 e incluye el examen general de sangre, la inyección de B12 y la orientación de resultados. Si quieres saber cómo es la inyección y cada cuánto se pone, lee nuestra [guía de la vitamina B12](/blog/vitamina-b12-beneficios-inyecciones-pasadena).

## ¿Cuánto cuesta el suero vitaminado en Pasadena?

El precio depende de la mezcla; te lo damos por teléfono al (281) 747-8817 antes de venir. No necesitas seguro médico; aceptamos efectivo y tarjeta.

## ¿Cómo es la visita?

Llegas sin cita de 9 AM a 9 PM, hidratado y habiendo comido algo. Tras la evaluación, te sientas cómodo durante la infusión, entre 30 y 60 minutos, y sales caminando. Si el médico detecta una causa de fondo, como anemia o [tiroides](/services/tiroides) alterada, se estudia con [análisis de sangre](/services/examenes-sangre).

${AREAS_ES}`,
    longDescriptionEn: `An IV vitamin drip is an intravenous infusion given by medical staff in about 30 to 60 minutes. At Clínica Hispana Nueva Salud Pasadena it is ordered after a brief evaluation, with no appointment, and paired with a vitamin B12 injection when needed.

## What is an IV vitamin drip?

An infusion that enters through an IV line in the arm and goes straight into the blood, bypassing the stomach. The medical team orders it according to the reason for the visit and your history, after a brief evaluation; it is not the same for everyone and is never given without that review.

## When can it help?

With dehydration from heat, vomiting, diarrhea or too much alcohol; after a flu or infection that left you weak; during periods of tiredness with poor eating; and in people with a confirmed vitamin deficiency who do not absorb pills well. In those cases it replaces fluids and vitamins faster than by mouth. It does not replace treatment for an illness or a proper diet, and it does not "burn fat" or "detox": we do not promise that.

## Who should not receive it?

People with kidney or heart failure, because the extra fluid harms them; pregnant women without a medical indication; and anyone allergic to one of the components. That is why, before the infusion, the medical team checks your blood pressure, history and medications, and orders a lab test if appropriate.

## Does it hurt, or have side effects?

You feel the prick of the IV line and sometimes coolness in the arm while the infusion runs. A small bruise may remain at the site. Major reactions are rare, which is why the infusion is done at the clinic with staff present the whole time.

## What about the vitamin B12 injection?

It is given into the muscle in seconds and is indicated when blood B12 is low or there are risk factors: a vegetarian diet, age over 50, metformin, antacids or stomach surgery. The General Blood Test with Vitamin B12 package costs $99 and includes the general blood test, the B12 injection and a review of your results. To learn what the shot is like and how often it is given, read our [vitamin B12 guide](/en/blog/vitamina-b12-beneficios-inyecciones-pasadena).

## How much does an IV vitamin drip cost in Pasadena?

The price depends on the mix; we give it to you by phone at (281) 747-8817 before you come. No health insurance is needed; we accept cash and cards.

## What is the visit like?

Walk in from 9 AM to 9 PM, hydrated and having eaten something. After the evaluation, you sit comfortably during the infusion, 30 to 60 minutes, and walk out afterward. If the physician detects an underlying cause, such as anemia or an altered [thyroid](/en/services/tiroides), it is studied with [blood tests](/en/services/examenes-sangre).

${AREAS_EN}`,
  },
  {
    slug: "suturas-heridas",
    order: 24,
    category: "tratamientos",
    icon: "Scissors",
    title: "Suturas de Heridas",
    titleEn: "Wound Suturing",
    shortDescription:
      "Suturas (puntos) para cerrar heridas de forma segura, sin cita previa y en español.",
    shortDescriptionEn:
      "Sutures (stitches) to close wounds safely, walk-ins welcome and in Spanish.",
    description:
      "Suturas de heridas en Pasadena, TX. Cierre de cortes y heridas en español, con precios accesibles.",
    descriptionEn:
      "Wound suturing in Pasadena, TX. Closing cuts and wounds in Spanish, with affordable pricing.",
    keywords: [
      "suturas pasadena",
      "puntos para herida pasadena",
      "cerrar herida pasadena",
      "doctor para cortadas pasadena",
    ],
    keywordsEn: [
      "wound suturing pasadena",
      "stitches pasadena",
      "laceration repair pasadena",
      "cut treatment pasadena",
    ],
    features: [
      "Cierre de heridas con suturas",
      "Limpieza y desinfección",
      "Atención sin cita previa",
      "Indicaciones de cuidado posterior",
    ],
    featuresEn: [
      "Wound closure with sutures",
      "Cleaning and disinfection",
      "Walk-ins welcome",
      "After-care instructions",
    ],
    longDescription: `Una herida que no cierra bien puede infectarse o dejar cicatriz. En Clínica Hispana Nueva Salud Pasadena cerramos cortes y heridas con suturas de forma segura, sin cita y con atención en español.

## ¿Qué incluye?

- Evaluación y limpieza de la herida
- Cierre con suturas (puntos)
- Aplicación de anestesia local
- Indicaciones de cuidado y signos de alarma
- Retiro de puntos cuando corresponde

## Cuándo acudir

Cortes profundos, heridas que sangran o no cierran solas, o que tienen bordes abiertos. Atender pronto reduce el riesgo de infección y mejora la cicatrización.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A wound that doesn't close well can get infected or leave a scar. At Clínica Hispana Nueva Salud Pasadena we close cuts and wounds with sutures safely, no appointment needed and with care in Spanish.

## What's included?

- Wound evaluation and cleaning
- Closure with sutures (stitches)
- Local anesthesia
- Care instructions and warning signs
- Suture removal when appropriate

## When to come in

Deep cuts, wounds that bleed or won't close on their own, or that have open edges. Treating them promptly reduces the risk of infection and improves healing.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "curacion-heridas",
    order: 25,
    category: "tratamientos",
    icon: "Bandage",
    title: "Cura y Curación de Heridas",
    titleEn: "Wound Care",
    shortDescription:
      "Limpieza, curación y cambio de vendajes de heridas para una buena cicatrización, en español.",
    shortDescriptionEn:
      "Cleaning, wound care and dressing changes for proper healing, in Spanish.",
    description:
      "Cura y curación de heridas en Pasadena, TX. Limpieza y vendajes en español, con precios accesibles.",
    descriptionEn:
      "Wound care in Pasadena, TX. Cleaning and dressings in Spanish, with affordable pricing.",
    keywords: [
      "curacion de heridas pasadena",
      "cura de heridas pasadena",
      "cambio de vendaje pasadena",
      "limpieza de herida pasadena",
    ],
    keywordsEn: [
      "wound care pasadena",
      "wound dressing pasadena",
      "dressing change pasadena",
      "wound cleaning pasadena",
    ],
    features: [
      "Limpieza y desinfección",
      "Cambio de vendajes",
      "Seguimiento de la cicatrización",
      "Atención en español",
    ],
    featuresEn: [
      "Cleaning and disinfection",
      "Dressing changes",
      "Healing follow-up",
      "Care in Spanish",
    ],
    longDescription: `Una buena curación evita infecciones y ayuda a que la herida sane más rápido. En Clínica Hispana Nueva Salud Pasadena limpiamos, curamos y vendamos tus heridas, y te seguimos hasta que cicatricen.

## ¿Qué incluye?

- Limpieza y desinfección de la herida
- Aplicación de apósitos y vendajes
- Cambio periódico de vendajes
- Vigilancia de signos de infección
- Indicaciones de cuidado en casa

## Para todo tipo de heridas

Heridas postoperatorias, úlceras, quemaduras leves o heridas que tardan en sanar. Te ayudamos con curaciones regulares para una mejor recuperación.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Good wound care prevents infections and helps the wound heal faster. At Clínica Hispana Nueva Salud Pasadena we clean, treat and dress your wounds, and follow you until they heal.

## What's included?

- Wound cleaning and disinfection
- Application of dressings and bandages
- Periodic dressing changes
- Monitoring for signs of infection
- Home-care instructions

## For all kinds of wounds

Post-surgical wounds, ulcers, minor burns or wounds that are slow to heal. We help with regular dressing changes for a better recovery.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "cirugias-menores",
    order: 26,
    category: "tratamientos",
    icon: "Stethoscope",
    title: "Cirugías Menores",
    titleEn: "Minor Surgery",
    shortDescription:
      "Procedimientos de cirugía menor ambulatoria (lunares, quistes, lipomas) con anestesia local.",
    shortDescriptionEn:
      "Minor outpatient surgical procedures (moles, cysts, lipomas) with local anesthesia.",
    description:
      "Cirugías menores en Pasadena, TX: lunares, quistes y lipomas. Procedimiento ambulatorio en español, con precios accesibles.",
    descriptionEn:
      "Minor surgery in Pasadena, TX: moles, cysts and lipomas. Outpatient procedure in Spanish, with affordable pricing.",
    keywords: [
      "cirugia menor pasadena",
      "quitar lunar pasadena",
      "extraccion de quiste pasadena",
      "cirugia ambulatoria pasadena",
    ],
    keywordsEn: [
      "minor surgery pasadena",
      "mole removal pasadena",
      "cyst removal pasadena",
      "lipoma removal pasadena",
    ],
    features: [
      "Procedimientos ambulatorios",
      "Anestesia local",
      "Extracción de lunares, quistes y lipomas",
      "Cuidado posterior explicado",
    ],
    featuresEn: [
      "Outpatient procedures",
      "Local anesthesia",
      "Removal of moles, cysts and lipomas",
      "After-care explained",
    ],
    longDescription: `Muchos problemas de piel y tejidos blandos se resuelven con un procedimiento sencillo. En Clínica Hispana Nueva Salud Pasadena realizamos cirugías menores ambulatorias con anestesia local, en un mismo día.

## ¿Qué incluye?

- Evaluación del lunar, quiste o lesión
- Procedimiento ambulatorio con anestesia local
- Extracción de lunares, quistes y lipomas
- Indicaciones claras de cuidado posterior
- Retiro de puntos cuando corresponde

## Rápido y seguro

La mayoría de estos procedimientos toman poco tiempo y no requieren hospitalización. Te explicamos cada paso en español para que estés tranquilo.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Many skin and soft-tissue problems are solved with a simple procedure. At Clínica Hispana Nueva Salud Pasadena we perform minor outpatient surgery with local anesthesia, in a single day.

## What's included?

- Evaluation of the mole, cyst or lesion
- Outpatient procedure with local anesthesia
- Removal of moles, cysts and lipomas
- Clear after-care instructions
- Suture removal when appropriate

## Fast and safe

Most of these procedures take little time and don't require hospitalization. We explain every step in Spanish so you feel at ease.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "drenaje-abscesos",
    order: 27,
    category: "tratamientos",
    icon: "Droplet",
    title: "Drenaje de Abscesos",
    titleEn: "Abscess Drainage",
    shortDescription:
      "Drenaje de abscesos e infecciones de piel para aliviar el dolor y favorecer la curación.",
    shortDescriptionEn:
      "Drainage of abscesses and skin infections to relieve pain and promote healing.",
    description:
      "Drenaje de abscesos en Pasadena, TX. Tratamiento de infecciones de piel en español, con precios accesibles.",
    descriptionEn:
      "Abscess drainage in Pasadena, TX. Treatment of skin infections in Spanish, with affordable pricing.",
    keywords: [
      "drenaje de absceso pasadena",
      "drenar absceso pasadena",
      "infeccion de piel pasadena",
      "tratamiento de absceso pasadena",
    ],
    keywordsEn: [
      "abscess drainage pasadena",
      "drain abscess pasadena",
      "skin infection pasadena",
      "boil treatment pasadena",
    ],
    features: [
      "Drenaje del absceso",
      "Limpieza y desinfección",
      "Anestesia local",
      "Indicaciones de cuidado posterior",
    ],
    featuresEn: [
      "Abscess drainage",
      "Cleaning and disinfection",
      "Local anesthesia",
      "After-care instructions",
    ],
    longDescription: `Un absceso es una acumulación de pus que causa dolor e hinchazón y necesita drenarse. En Clínica Hispana Nueva Salud Pasadena lo tratamos de forma segura para aliviar la molestia y prevenir que la infección avance.

## ¿Qué incluye?

- Evaluación del absceso o infección de piel
- Drenaje con anestesia local
- Limpieza y desinfección de la zona
- Tratamiento de la infección cuando se requiere
- Indicaciones de cuidado y seguimiento

## No lo dejes pasar

Un bulto rojo, caliente y doloroso, a veces con fiebre, necesita atención. Drenarlo a tiempo evita complicaciones y alivia el dolor rápidamente.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `An abscess is a buildup of pus that causes pain and swelling and needs to be drained. At Clínica Hispana Nueva Salud Pasadena we treat it safely to relieve the discomfort and prevent the infection from spreading.

## What's included?

- Evaluation of the abscess or skin infection
- Drainage with local anesthesia
- Cleaning and disinfection of the area
- Treatment of the infection when needed
- Care and follow-up instructions

## Don't let it go

A red, warm, painful lump, sometimes with fever, needs attention. Draining it in time prevents complications and relieves pain quickly.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "unas-encarnadas",
    order: 28,
    category: "tratamientos",
    icon: "Footprints",
    title: "Extracción de Uñas Encarnadas",
    titleEn: "Ingrown Toenail Removal",
    shortDescription:
      "Tratamiento de uñas encarnadas para aliviar el dolor y prevenir infecciones, en español.",
    shortDescriptionEn:
      "Ingrown toenail treatment to relieve pain and prevent infection, in Spanish.",
    description:
      "Extracción de uñas encarnadas en Pasadena, TX. Procedimiento con anestesia local en español, con precios accesibles.",
    descriptionEn:
      "Ingrown toenail removal in Pasadena, TX. Procedure with local anesthesia in Spanish, with affordable pricing.",
    keywords: [
      "uña encarnada pasadena",
      "extraccion de uña encarnada pasadena",
      "tratamiento uña encarnada pasadena",
      "doctor para uña encarnada pasadena",
    ],
    keywordsEn: [
      "ingrown toenail pasadena",
      "ingrown toenail removal pasadena",
      "ingrown nail treatment pasadena",
      "toenail doctor pasadena",
    ],
    features: [
      "Tratamiento de la uña encarnada",
      "Anestesia local",
      "Alivio del dolor",
      "Indicaciones de cuidado posterior",
    ],
    featuresEn: [
      "Ingrown toenail treatment",
      "Local anesthesia",
      "Pain relief",
      "After-care instructions",
    ],
    longDescription: `Una uña encarnada puede doler mucho e infectarse si no se trata. En Clínica Hispana Nueva Salud Pasadena la atendemos con un procedimiento sencillo y anestesia local para aliviarte el mismo día.

## ¿Qué incluye?

- Evaluación de la uña y el dedo
- Procedimiento con anestesia local
- Extracción de la porción encarnada de la uña
- Tratamiento de la infección si la hay
- Indicaciones de cuidado para evitar que regrese

## Cuándo acudir

Dolor, enrojecimiento, hinchazón o pus alrededor de la uña, sobre todo del dedo gordo del pie. Atenderla pronto evita una infección mayor.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `An ingrown toenail can hurt a lot and get infected if untreated. At Clínica Hispana Nueva Salud Pasadena we treat it with a simple procedure and local anesthesia to relieve you the same day.

## What's included?

- Evaluation of the nail and toe
- Procedure with local anesthesia
- Removal of the ingrown portion of the nail
- Treatment of the infection if present
- Care instructions to prevent recurrence

## When to come in

Pain, redness, swelling or pus around the nail, especially the big toe. Treating it promptly prevents a larger infection.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "farmacia",
    order: 29,
    category: "tratamientos",
    icon: "Pill",
    title: "Farmacia",
    titleEn: "Pharmacy",
    shortDescription:
      "Recoge tus medicamentos al terminar la consulta, sin ir a otra farmacia.",
    shortDescriptionEn:
      "Pick up your medications right after your visit — no second stop.",
    description:
      "Farmacia en Pasadena, TX dentro de la clínica. Surtimos tu receta al terminar la consulta, atención en español.",
    descriptionEn:
      "Pharmacy in Pasadena, TX inside the clinic. We fill your prescription right after your visit, service in Spanish.",
    keywords: [
      "farmacia en pasadena",
      "farmacia hispana pasadena",
      "farmacia cerca de mí pasadena",
      "surtir receta pasadena",
    ],
    keywordsEn: [
      "pharmacy pasadena",
      "hispanic pharmacy pasadena",
      "pharmacy near me pasadena",
      "fill prescription pasadena",
    ],
    features: [
      "Surtido de tu receta al instante",
      "Medicamentos de marca y genéricos",
      "Medicamentos de venta libre (OTC)",
      "Asesoría sobre tus medicamentos en español",
    ],
    featuresEn: [
      "Prescriptions filled on the spot",
      "Brand-name and generic medications",
      "Over-the-counter (OTC) medications",
      "Guidance about your medications in Spanish",
    ],
    longDescription: `Al terminar tu consulta en Clínica Hispana Nueva Salud Pasadena puedes recoger tus medicamentos en nuestra propia farmacia, sin tener que ir a otro lugar. Es la comodidad de resolver todo en una sola visita, con atención en español.

## ¿Qué incluye?

- Surtido de tu receta justo al terminar la consulta
- Medicamentos de marca y genéricos
- Medicamentos de venta libre (OTC) para gripe, dolor, alergias y más
- Asesoría del personal sobre cómo tomar tus medicamentos
- Resurtido de recetas

## ¿Por qué usar nuestra farmacia?

Te ahorras una segunda parada: el médico te atiende, te receta y recoges tu medicamento en el mismo lugar. Te explicamos en español la dosis, los horarios y los cuidados.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `After your visit at Clínica Hispana Nueva Salud Pasadena you can pick up your medications at our own pharmacy, without going anywhere else. It's the convenience of getting everything done in a single visit, with service in Spanish.

## What's included?

- Your prescription filled right after your visit
- Brand-name and generic medications
- Over-the-counter (OTC) medications for colds, pain, allergies and more
- Staff guidance on how to take your medications
- Prescription refills

## Why use our pharmacy?

You skip the second stop: the doctor sees you, writes your prescription, and you pick up your medication in the same place. We explain the dosage, schedule and precautions in Spanish.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
];

// Testimonios de respaldo para el carrusel cuando no hay data en vivo de Google.
export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    author: "María G.",
    rating: 5,
    text: "Excelente atención y todo en español. Me explicaron cada paso de mi examen. Muy recomendados.",
    textEn: "Excellent care and everything in Spanish. They explained every step of my exam. Highly recommended.",
    relativeTime: "Hace 2 semanas",
  },
  {
    author: "José R.",
    rating: 5,
    text: "Llegué sin cita por una infección y me atendieron rápido. El doctor muy amable y los precios accesibles.",
    textEn: "I walked in without an appointment for an infection and was seen quickly. The doctor was very kind and the prices affordable.",
    relativeTime: "Hace 1 mes",
  },
  {
    author: "Carmen L.",
    rating: 5,
    text: "Llevo mi control de diabetes aquí y me siento muy bien cuidada. El seguimiento es muy bueno.",
    textEn: "I manage my diabetes here and feel very well cared for. The follow-up is excellent.",
    relativeTime: "Hace 1 mes",
  },
  {
    author: "Luis M.",
    rating: 5,
    text: "Hice mi examen DOT y salí el mismo día con mi certificado. Proceso rápido y sin complicaciones.",
    textEn: "I did my DOT exam and left the same day with my certificate. Fast process with no complications.",
    relativeTime: "Hace 2 meses",
  },
  {
    author: "Ana P.",
    rating: 5,
    text: "Una clínica donde te tratan con respeto y cariño. El laboratorio entregó mis resultados muy rápido.",
    textEn: "A clinic where they treat you with respect and care. The lab delivered my results very fast.",
    relativeTime: "Hace 3 meses",
  },
];
