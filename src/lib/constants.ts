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
    longDescription: `Las enfermedades crónicas como la diabetes, la hipertensión y las dislipidemias (colesterol y triglicéridos altos) se controlan mejor con seguimiento constante. En Clínica Hispana Nueva Salud Pasadena diseñamos un plan claro y te acompañamos paso a paso, en español.

## ¿Qué incluye?

- Evaluación inicial y exámenes de laboratorio
- Monitoreo de glucosa, presión arterial, colesterol y triglicéridos
- Ajuste de medicamentos según tu evolución
- Plan de alimentación y actividad física
- Educación sobre tu condición en tu idioma

## Por qué es importante el control

Una diabetes, presión o colesterol mal controlados dañan con el tiempo el corazón, los riñones, los ojos y los nervios. Un buen seguimiento previene complicaciones y mejora tu calidad de vida.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Chronic conditions like diabetes, hypertension and dyslipidemia (high cholesterol and triglycerides) are best controlled with consistent follow-up. At Clínica Hispana Nueva Salud Pasadena we design a clear plan and support you every step of the way, in Spanish.

## What's included?

- Initial evaluation and lab work
- Monitoring of glucose, blood pressure, cholesterol and triglycerides
- Medication adjustment based on your progress
- Nutrition and physical-activity plan
- Education about your condition in your language

## Why control matters

Poorly managed diabetes, blood pressure or cholesterol damage the heart, kidneys, eyes and nerves over time. Good follow-up prevents complications and improves your quality of life.

${WHY_EN}

${PAYMENT_EN}

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
    longDescription: `Las alergias pueden afectar tu respiración, tu piel y tu descanso. En Clínica Hispana Nueva Salud Pasadena identificamos qué las provoca y te ayudamos a controlarlas para que recuperes tu bienestar.

## ¿Qué incluye?

- Evaluación de síntomas y posibles desencadenantes
- Tratamiento de alergias estacionales y respiratorias
- Manejo de rinitis, estornudos y congestión
- Atención de alergias en la piel (ronchas, comezón)
- Recomendaciones para evitar las crisis

## Cuándo consultar

Estornudos frecuentes, ojos llorosos, comezón, ronchas o congestión que no mejora son señales de alergia. Un tratamiento adecuado marca la diferencia.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Allergies can affect your breathing, your skin and your rest. At Clínica Hispana Nueva Salud Pasadena we identify what triggers them and help you control them so you feel well again.

## What's included?

- Evaluation of symptoms and possible triggers
- Treatment of seasonal and respiratory allergies
- Management of rhinitis, sneezing and congestion
- Care for skin allergies (hives, itching)
- Recommendations to avoid flare-ups

## When to seek care

Frequent sneezing, watery eyes, itching, hives or congestion that won't improve are signs of allergy. The right treatment makes the difference.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "enfermedades-respiratorias",
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
    longDescription: `Cuando empiezan la fiebre, la tos o el malestar, saber si es flu o COVID ayuda a tratarte a tiempo. En Clínica Hispana Nueva Salud Pasadena hacemos pruebas rápidas y te damos tratamiento el mismo día, sin cita.

## ¿Qué incluye?

- Prueba rápida de influenza (flu)
- Prueba de COVID-19
- Evaluación de síntomas respiratorios
- Tratamiento de gripe, tos, bronquitis e infecciones de garganta
- Indicaciones de recuperación y cuidado

## No dejes que avance

Si la fiebre es alta, la tos no mejora o cuesta respirar, es mejor evaluarte. Un diagnóstico oportuno acorta la enfermedad y evita complicaciones.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `When fever, cough or discomfort begin, knowing whether it's flu or COVID helps treat you in time. At Clínica Hispana Nueva Salud Pasadena we run rapid tests and provide same-day treatment, no appointment needed.

## What's included?

- Rapid influenza (flu) test
- COVID-19 test
- Respiratory symptom evaluation
- Treatment of flu, cough, bronchitis and throat infections
- Recovery and care instructions

## Don't let it progress

If the fever is high, the cough won't improve or breathing is hard, it's best to get evaluated. Timely diagnosis shortens the illness and prevents complications.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examen-fisico-escolar",
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
    longDescription: `Antes de inscribirse en la escuela o practicar un deporte, los niños y jóvenes necesitan un chequeo físico. En Clínica Hispana Nueva Salud Pasadena lo hacemos de forma rápida y completa, con todos los formularios listos.

## ¿Qué incluye?

- Examen físico general
- Revisión de signos vitales (peso, talla, presión)
- Evaluación de visión y audición
- Llenado de los formularios requeridos
- Recomendaciones de salud

## Para la escuela y el deporte

Cumple los requisitos de inscripción escolar y la evaluación para practicar deportes con seguridad. Trae el formulario de tu escuela o equipo y lo completamos.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Before enrolling in school or playing a sport, children and teens need a physical exam. At Clínica Hispana Nueva Salud Pasadena we do it quickly and thoroughly, with all the forms ready.

## What's included?

- General physical exam
- Vital-signs check (weight, height, blood pressure)
- Vision and hearing screening
- Completion of required forms
- Health recommendations

## For school and sports

Meet school enrollment requirements and the evaluation to play sports safely. Bring your school or team form and we'll complete it.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "ginecologia",
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
    longDescription: `Tu salud como mujer merece un espacio de confianza. En Clínica Hispana Nueva Salud Pasadena ofrecemos atención ginecológica en español, con la privacidad y el respeto que mereces.

## ¿Qué incluye?

- Papanicolaou y chequeo ginecológico
- Cultivos vaginales para identificar infecciones
- Tratamiento de infecciones vaginales (hongos, bacterias)
- Evaluación de molestias y flujo anormal
- Referencias cuando se necesita un especialista

## No te quedes con la duda

Comezón, ardor, flujo diferente o mal olor son señales de que algo necesita atención. Un cultivo permite un diagnóstico correcto y un tratamiento que sí resuelve.

## Ginecología en una clínica hispana cerca de ti

Si buscas ginecólogos hispanos que hablen español en Pasadena o el área de Houston, TX, en nuestro centro médico te atendemos sin cita previa, con privacidad y sin necesidad de seguro.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Your health as a woman deserves a space of trust. At Clínica Hispana Nueva Salud Pasadena we offer gynecology care in Spanish, with the privacy and respect you deserve.

## What's included?

- Pap smear and gynecological checkup
- Vaginal cultures to identify infections
- Treatment of vaginal infections (yeast, bacteria)
- Evaluation of discomfort and abnormal discharge
- Referrals when a specialist is needed

## Don't stay in doubt

Itching, burning, unusual discharge or odor are signs that something needs attention. A culture allows an accurate diagnosis and treatment that truly resolves it.

## Gynecology at a Hispanic clinic near you

If you're looking for Spanish-speaking, Hispanic gynecology care in Pasadena or the Houston, TX area, our medical center sees you with no appointment, with privacy and no insurance needed.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "prueba-embarazo",
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
    longDescription: `Si crees que podrías estar embarazada, una prueba confiable te da tranquilidad y claridad. En Clínica Hispana Nueva Salud Pasadena realizamos pruebas de embarazo y te orientamos sobre lo que sigue, en español y sin juicios.

## ¿Qué incluye?

- Prueba de embarazo (orina o sangre)
- Confirmación médica del resultado
- Orientación sobre tus siguientes pasos
- Información sobre control prenatal y referencias

## Con confianza y respeto

Te explicamos el resultado con claridad y te acompañamos en la decisión que tomes, siempre con respeto y privacidad.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `If you think you might be pregnant, a reliable test gives you peace of mind and clarity. At Clínica Hispana Nueva Salud Pasadena we perform pregnancy tests and guide you on what comes next, in Spanish and without judgment.

## What's included?

- Pregnancy test (urine or blood)
- Medical confirmation of the result
- Guidance on your next steps
- Information on prenatal care and referrals

## With trust and respect

We explain the result clearly and support you in whatever decision you make, always with respect and privacy.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "anticonceptivos",
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
    longDescription: `Decidir cuándo y cómo formar tu familia es tu derecho. En Clínica Hispana Nueva Salud Pasadena te damos información clara y sin juicios para que elijas el método anticonceptivo que mejor se adapta a ti.

## ¿Qué incluye?

- Consulta de orientación personalizada
- Información sobre los distintos métodos
- Pastillas anticonceptivas e inyección
- Inicio y seguimiento del método elegido
- Resolución de dudas y efectos secundarios

## Una decisión informada

Cada cuerpo y cada vida es distinta. Te ayudamos a comparar opciones según tu salud, tus planes y tu comodidad para que tomes la mejor decisión.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Deciding when and how to build your family is your right. At Clínica Hispana Nueva Salud Pasadena we give you clear, judgment-free information so you can choose the contraceptive method that best fits you.

## What's included?

- Personalized guidance visit
- Information about the different methods
- Birth control pills and injection
- Starting and following up on the chosen method
- Answers to questions and side effects

## An informed decision

Every body and every life is different. We help you compare options based on your health, your plans and your comfort so you make the best decision.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "extraccion-implantes",
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
    longDescription: `Si llegó el momento de retirar tu implante subdérmico —porque caducó o porque deseas cambiar de método— en Clínica Hispana Nueva Salud Pasadena lo hacemos de forma segura, rápida y con cuidado.

## ¿Qué incluye?

- Evaluación y localización del implante
- Extracción ambulatoria con anestesia local
- Indicaciones claras de cuidado posterior
- Orientación sobre tus próximos pasos de planificación

## Un procedimiento sencillo

El retiro suele tomar pocos minutos y se realiza con una pequeña incisión. Te explicamos cada paso en español para que estés tranquila.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `If it's time to remove your subdermal implant —because it expired or you want to switch methods— at Clínica Hispana Nueva Salud Pasadena we do it safely, quickly and with care.

## What's included?

- Evaluation and location of the implant
- Outpatient removal with local anesthesia
- Clear after-care instructions
- Guidance on your next family-planning steps

## A simple procedure

Removal usually takes only a few minutes through a small incision. We explain every step in Spanish so you feel at ease.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "salud-hombre",
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
    longDescription: `La salud del hombre muchas veces se posterga. En Clínica Hispana Nueva Salud Pasadena facilitamos los exámenes que ayudan a detectar a tiempo cambios importantes, con resultados explicados en español.

## ¿Qué incluye?

- Examen de antígeno prostático (PSA)
- Medición del nivel de testosterona
- Chequeo general y de signos vitales
- Evaluación de síntomas urinarios o de energía
- Referencia a especialista si se requiere

## Por qué es importante

El PSA ayuda a vigilar la salud de la próstata y la testosterona influye en la energía, el ánimo y la salud general. Un control sencillo te da tranquilidad.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Men's health is often postponed. At Clínica Hispana Nueva Salud Pasadena we make it easy to get the exams that help catch important changes early, with results explained in Spanish.

## What's included?

- Prostate antigen (PSA) test
- Testosterone level measurement
- General checkup and vital signs
- Evaluation of urinary or energy symptoms
- Referral to a specialist if needed

## Why it matters

PSA helps monitor prostate health, and testosterone influences energy, mood and overall health. A simple check gives you peace of mind.

${WHY_EN}

${PAYMENT_EN}

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
    longDescription: `El examen de orina ayuda a detectar infecciones urinarias y otras condiciones. En Clínica Hispana Nueva Salud Pasadena te hacemos la prueba y, si hay infección, empezamos el tratamiento el mismo día.

## ¿Qué incluye?

- Examen general de orina (urianálisis)
- Evaluación de síntomas
- Diagnóstico de infección urinaria
- Tratamiento adecuado el mismo día
- Indicaciones para evitar que regrese

## Síntomas frecuentes

Ardor al orinar, ganas constantes de ir al baño, orina turbia o con mal olor y dolor en la parte baja del abdomen. No esperes: una infección sin tratar puede llegar a los riñones.

## Urología en una clínica hispana cerca de ti

Si buscas atención de urología en español en Pasadena o el área de Houston, TX, en nuestro centro médico evaluamos tus síntomas urinarios, hacemos el examen de orina y comenzamos el tratamiento el mismo día. Y si tu caso necesita un urólogo especialista, te referimos con uno de confianza.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A urine test helps detect urinary infections and other conditions. At Clínica Hispana Nueva Salud Pasadena we run the test and, if there's an infection, we start treatment the same day.

## What's included?

- General urinalysis
- Symptom evaluation
- Diagnosis of urinary infection
- Appropriate same-day treatment
- Tips to prevent it from coming back

## Common symptoms

Burning when urinating, a constant urge to go, cloudy or foul-smelling urine and lower-abdomen pain. Don't wait: an untreated infection can reach the kidneys.

## Urology at a Hispanic clinic near you

If you're looking for urology care in Spanish in Pasadena or the Houston, TX area, our medical center evaluates your urinary symptoms, runs the urinalysis and starts treatment the same day. And if your case needs a specialist urologist, we refer you to a trusted one.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examen-heces",
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
    longDescription: `Los problemas digestivos a veces tienen una causa que solo un análisis de heces puede revelar. En Clínica Hispana Nueva Salud Pasadena realizamos exámenes de heces fecales para encontrar el origen y darte el tratamiento correcto.

## ¿Qué incluye?

- Análisis general de heces fecales
- Detección de parásitos
- Identificación de infecciones intestinales
- Evaluación de sangre oculta cuando se requiere
- Resultados explicados en español

## Cuándo es útil

Diarrea persistente, dolor abdominal, gases, cambios en las evacuaciones o pérdida de peso sin explicación. El examen ayuda a un diagnóstico preciso.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Digestive problems sometimes have a cause that only a stool test can reveal. At Clínica Hispana Nueva Salud Pasadena we perform stool tests to find the source and give you the right treatment.

## What's included?

- General stool analysis
- Parasite detection
- Identification of intestinal infections
- Occult-blood evaluation when needed
- Results explained in Spanish

## When it helps

Persistent diarrhea, abdominal pain, gas, changes in bowel movements or unexplained weight loss. The test helps with an accurate diagnosis.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "prueba-strep",
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
    longDescription: `No todo dolor de garganta es igual: la faringitis por estreptococo necesita tratamiento específico. En Clínica Hispana Nueva Salud Pasadena hacemos la prueba rápida de strep y te damos el resultado y el tratamiento el mismo día.

## ¿Qué incluye?

- Prueba rápida de estreptococo (hisopado de garganta)
- Resultado en pocos minutos
- Evaluación del dolor de garganta
- Tratamiento adecuado si el resultado es positivo
- Indicaciones de recuperación

## Cuándo hacerla

Dolor de garganta fuerte, fiebre, dificultad para tragar o placas blancas en las amígdalas, sobre todo en niños. La prueba evita tratamientos innecesarios.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Not every sore throat is the same: strep throat needs specific treatment. At Clínica Hispana Nueva Salud Pasadena we run the rapid strep test and give you the result and treatment the same day.

## What's included?

- Rapid strep test (throat swab)
- Result in minutes
- Sore-throat evaluation
- Appropriate treatment if the result is positive
- Recovery instructions

## When to get it

Severe sore throat, fever, trouble swallowing or white patches on the tonsils, especially in children. The test avoids unnecessary treatments.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "prueba-tuberculosis",
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
    longDescription: `Muchos trabajos y escuelas piden una prueba de tuberculosis al día. En Clínica Hispana Nueva Salud Pasadena la aplicamos y leemos el resultado, con todo explicado en español.

## ¿Qué incluye?

- Prueba cutánea de tuberculosis (PPD)
- Cita de lectura del resultado (48–72 horas después)
- Documentación del resultado para tu trámite
- Orientación si el resultado requiere seguimiento

## Para qué la piden

Empleos de salud, escuelas, trámites y voluntariado suelen requerir una prueba de TB vigente. Te ayudamos a cumplir el requisito sin complicaciones.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Many jobs and schools require an up-to-date tuberculosis test. At Clínica Hispana Nueva Salud Pasadena we administer it and read the result, with everything explained in Spanish.

## What's included?

- Tuberculosis skin test (PPD)
- Result-reading appointment (48–72 hours later)
- Documentation of the result for your paperwork
- Guidance if the result needs follow-up

## Why it's required

Healthcare jobs, schools, paperwork and volunteering often require a current TB test. We help you meet the requirement without hassle.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "enfermedades-transmision-sexual",
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
    longDescription: `Cuidar tu salud sexual es un acto de responsabilidad. En Clínica Hispana Nueva Salud Pasadena ofrecemos pruebas de enfermedades de transmisión sexual de forma confidencial y respetuosa, con tratamiento cuando es necesario.

## ¿Qué incluye?

- Evaluación de síntomas y factores de riesgo
- Pruebas de las infecciones más comunes
- Análisis de laboratorio
- Tratamiento y orientación si el resultado es positivo
- Total confidencialidad

## Cuándo hacerte la prueba

Si tuviste contacto de riesgo, tienes síntomas o simplemente quieres estar tranquilo, hacerte la prueba es la mejor decisión. La detección temprana facilita el tratamiento.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Taking care of your sexual health is an act of responsibility. At Clínica Hispana Nueva Salud Pasadena we offer confidential, respectful testing for sexually transmitted diseases, with treatment when needed.

## What's included?

- Symptom and risk-factor assessment
- Testing for the most common infections
- Laboratory analysis
- Treatment and guidance if the result is positive
- Complete confidentiality

## When to get tested

If you had a risky encounter, have symptoms or simply want peace of mind, getting tested is the best decision. Early detection makes treatment easier.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examen-alcohol-drogas",
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
    longDescription: `Muchos empleos y trámites requieren una prueba de alcohol y drogas. En Clínica Hispana Nueva Salud Pasadena la realizamos de forma rápida y te entregamos la documentación que necesitas.

## ¿Qué incluye?

- Prueba de detección de drogas
- Prueba de alcohol
- Proceso ágil y discreto
- Documentación del resultado para tu empleador o trámite

## Para trabajo y trámites

Atendemos solicitudes de empleo, requisitos laborales y trámites personales. Te explicamos el proceso en español para que llegues tranquilo.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Many jobs and processes require an alcohol and drug test. At Clínica Hispana Nueva Salud Pasadena we perform it quickly and give you the documentation you need.

## What's included?

- Drug screening test
- Alcohol test
- Quick, discreet process
- Result documentation for your employer or paperwork

## For work and paperwork

We handle job applications, workplace requirements and personal paperwork. We explain the process in Spanish so you arrive with peace of mind.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "electrocardiograma",
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
    longDescription: `El electrocardiograma (EKG) registra la actividad eléctrica de tu corazón en pocos minutos y sin ninguna molestia. En Clínica Hispana Nueva Salud Pasadena lo realizamos como parte de chequeos y exámenes médicos.

## ¿Qué incluye?

- Estudio del ritmo y la actividad del corazón
- Interpretación por personal médico
- Útil para exámenes de trabajo, deporte o cirugía
- Resultados explicados en español

## Cuándo se recomienda

Si tienes palpitaciones, presión alta, dolor en el pecho o necesitas un examen médico completo, el EKG aporta información valiosa sobre tu corazón.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `The electrocardiogram (EKG) records your heart's electrical activity in just a few minutes with no discomfort. At Clínica Hispana Nueva Salud Pasadena we perform it as part of checkups and medical exams.

## What's included?

- Study of your heart's rhythm and activity
- Interpretation by medical staff
- Useful for work, sports or surgery exams
- Results explained in Spanish

## When it's recommended

If you have palpitations, high blood pressure, chest discomfort or need a complete medical exam, the EKG provides valuable information about your heart.

${WHY_EN}

${PAYMENT_EN}

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
    longDescription: `Las vacunas son una de las formas más sencillas de cuidar tu salud. En Clínica Hispana Nueva Salud Pasadena aplicamos la vacuna contra la influenza y el toxoide tetánico de forma segura y rápida.

## ¿Qué incluye?

- Vacuna anual contra la influenza (flu)
- Toxoide tetánico (refuerzo del tétanos)
- Aplicación por personal médico
- Orientación sobre cuándo aplicar refuerzos
- Atención en español

## Por qué vacunarte

La vacuna de la flu reduce el riesgo de enfermarte de gravedad en temporada de gripe, y el toxoide tetánico te protege ante cortes y heridas. Pregúntanos cuál te conviene.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Vaccines are one of the simplest ways to protect your health. At Clínica Hispana Nueva Salud Pasadena we administer the influenza vaccine and tetanus toxoid safely and quickly.

## What's included?

- Annual influenza (flu) vaccine
- Tetanus toxoid (tetanus booster)
- Administered by medical staff
- Guidance on when boosters are due
- Care in Spanish

## Why get vaccinated

The flu vaccine lowers your risk of getting seriously ill during flu season, and the tetanus toxoid protects you from cuts and wounds. Ask us which one you need.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "sueros-vitaminados",
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
    longDescription: `Los sueros vitaminados aportan hidratación, vitaminas y minerales directamente a tu organismo. En Clínica Hispana Nueva Salud Pasadena los aplicamos con personal médico y en un ambiente cómodo y seguro.

## ¿Qué incluye?

- Evaluación breve para elegir el suero adecuado
- Hidratación intravenosa
- Vitaminas y minerales
- Aplicación y monitoreo por personal médico
- Atención en español

## Cuándo pueden ayudar

Después de un periodo de cansancio, deshidratación o malestar, un suero vitaminado puede ayudarte a recuperar energía. Te orientamos sobre si es adecuado para ti.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Vitamin IV drips deliver hydration, vitamins and minerals directly into your body. At Clínica Hispana Nueva Salud Pasadena we administer them with medical staff in a comfortable, safe setting.

## What's included?

- A brief evaluation to choose the right drip
- Intravenous hydration
- Vitamins and minerals
- Administration and monitoring by medical staff
- Care in Spanish

## When they can help

After a period of fatigue, dehydration or feeling unwell, a vitamin drip can help you recover energy. We advise you on whether it's right for you.

${WHY_EN}

${PAYMENT_EN}

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
