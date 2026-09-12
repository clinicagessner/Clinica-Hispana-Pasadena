import type { ServiceFaq } from "@/types";

/**
 * FAQs por servicio (clave = slug). Bilingüe. Se usan en la página de
 * detalle del servicio, en llms-full.txt y para el JSON-LD FAQPage.
 * Tres preguntas propias por servicio, redactadas para Pasadena; las de
 * cita y seguro viven en HOME_FAQS y no se repiten aquí.
 */
export const SERVICE_FAQS: Record<string, ServiceFaq[]> = {
  "condiciones-cronicas": [
    {
      question: "¿Cada cuánto debo revisarme si tengo diabetes o presión alta?",
      answer: "Mientras se ajusta el tratamiento, cada 4 a 8 semanas. Con los números en meta, cada 3 meses con A1C si tienes diabetes y cada 3 a 6 meses para presión y colesterol, más los análisis completos, revisión de pies y vista una vez al año.",
      questionEn: "How often should I be checked if I have diabetes or high blood pressure?",
      answerEn: "While treatment is being adjusted, every 4 to 8 weeks. With numbers on target, every 3 months with an A1C if you have diabetes and every 3 to 6 months for blood pressure and cholesterol, plus full labs, foot and eye checks once a year.",
    },
    {
      question: "¿Qué metas de azúcar, presión y colesterol se usan?",
      answer: "Para la mayoría de los adultos: A1C por debajo de 7 %, presión por debajo de 130/80, colesterol LDL por debajo de 100 y triglicéridos por debajo de 150. El médico las ajusta según tu edad y otras condiciones.",
      questionEn: "Which sugar, blood pressure and cholesterol targets are used?",
      answerEn: "For most adults: A1C under 7%, blood pressure under 130/80, LDL cholesterol under 100 and triglycerides under 150. The physician adjusts them for your age and other conditions.",
    },
    {
      question: "¿Pueden ajustar los medicamentos que ya tomo?",
      answer: "Sí. Trae tus frascos: se revisan dosis, duplicados y efectos secundarios, y si un medicamento no alcanza la meta o te cae mal, se cambia en la misma consulta.",
      questionEn: "Can you adjust the medications I already take?",
      answerEn: "Yes. Bring your bottles: doses, duplicates and side effects are reviewed, and if a medication misses the target or does not agree with you, it is changed at the same visit.",
    },
  ],
  "tiroides": [
    {
      question: "¿Qué doctor atiende la tiroides?",
      answer: "El médico general: ordena TSH, T3 y T4, interpreta los resultados, inicia el tratamiento y ajusta la dosis. El endocrinólogo se necesita solo en casos complejos, como nódulos que requieren estudio o hipertiroidismo difícil de controlar.",
      questionEn: "Which doctor treats the thyroid?",
      answerEn: "The primary-care physician: orders TSH, T3 and T4, interprets the results, starts treatment and adjusts the dose. An endocrinologist is needed only in complex cases, such as nodules that require workup or hard-to-control hyperthyroidism.",
    },
    {
      question: "¿Necesito ayuno para la prueba de tiroides?",
      answer: "No. La TSH y las demás pruebas de tiroides se toman a cualquier hora sin ayuno. Si vas a tomar tu levotiroxina, hazlo después de la extracción o dilo al tomar la muestra.",
      questionEn: "Do I need to fast for the thyroid test?",
      answerEn: "No. TSH and the other thyroid tests can be drawn at any time without fasting. If you take levothyroxine, take it after the draw or mention it when the sample is taken.",
    },
    {
      question: "¿Cada cuánto se controla la tiroides en tratamiento?",
      answer: "Con TSH cada 6 a 8 semanas mientras se ajusta la dosis de levotiroxina y, una vez estable, cada 6 a 12 meses. El tratamiento suele ser de largo plazo y no debe suspenderse sin hablar con el médico.",
      questionEn: "How often is the thyroid checked during treatment?",
      answerEn: "With a TSH every 6 to 8 weeks while the levothyroxine dose is adjusted and, once stable, every 6 to 12 months. Treatment is usually long term and should not be stopped without talking to the physician.",
    },
  ],
  "alergias": [
    {
      question: "¿Cómo sé si es alergia o resfriado?",
      answer: "La alergia no da fiebre, pica en nariz y ojos, dura semanas y empeora en ciertas épocas o lugares; el resfriado dura una o dos semanas, puede dar fiebre y no pica. Si se repite cada año en la misma temporada, casi siempre es alergia.",
      questionEn: "How do I know if it is an allergy or a cold?",
      answerEn: "An allergy causes no fever, itches in the nose and eyes, lasts weeks and worsens in certain seasons or places; a cold lasts one or two weeks, can cause fever and does not itch. If it returns every year in the same season, it is almost always an allergy.",
    },
    {
      question: "¿Hacen pruebas de alergia?",
      answer: "La causa se identifica con una historia detallada y, cuando hace falta confirmarla, con un análisis de sangre de anticuerpos a los alérgenos más comunes de la zona. Las pruebas cutáneas especializadas se refieren al alergólogo.",
      questionEn: "Do you do allergy testing?",
      answerEn: "The cause is identified through a detailed history and, when confirmation is needed, with a blood test for antibodies to the most common allergens in the area. Specialized skin testing is referred to an allergist.",
    },
    {
      question: "¿Cuándo una reacción alérgica es una emergencia?",
      answer: "Cuando hay hinchazón de labios, lengua o garganta, dificultad para respirar, mareo o ronchas que se extienden rápido tras comer algo, una picadura o un medicamento. Llama al 911 o ve a emergencias de inmediato.",
      questionEn: "When is an allergic reaction an emergency?",
      answerEn: "When there is swelling of the lips, tongue or throat, trouble breathing, dizziness or hives spreading fast after eating something, an insect sting or a medication. Call 911 or go to the emergency room right away.",
    },
  ],
  "enfermedades-respiratorias": [
    {
      question: "¿Hacen la prueba de flu y COVID en la misma visita?",
      answer: "Sí. Se toma una muestra nasal, la prueba rápida de influenza A y B y la de COVID-19 se procesan en la clínica y el resultado se tiene durante la misma visita, junto con el tratamiento.",
      questionEn: "Do you test for flu and COVID at the same visit?",
      answerEn: "Yes. A nasal swab is taken, the rapid influenza A and B test and the COVID-19 test are run in the clinic and the result is ready during the same visit, along with treatment.",
    },
    {
      question: "¿Me van a dar antibiótico para la gripe?",
      answer: "No, porque la gripe, el resfriado y la mayoría de las bronquitis son virales. Para la influenza existe un antiviral si se empieza en las primeras 48 horas; el antibiótico solo se receta cuando hay una infección bacteriana confirmada, como sinusitis o neumonía.",
      questionEn: "Will I get an antibiotic for the flu?",
      answerEn: "No, because the flu, colds and most bronchitis are viral. For influenza there is an antiviral if started within the first 48 hours; an antibiotic is prescribed only when a bacterial infection is confirmed, such as sinusitis or pneumonia.",
    },
    {
      question: "¿Cuándo debo ir a emergencias por una infección respiratoria?",
      answer: "Con dificultad para respirar en reposo, labios o uñas azulados, dolor en el pecho, confusión, fiebre que no baja tras tres días de tratamiento, o un niño que respira muy rápido, no bebe o está muy decaído.",
      questionEn: "When should I go to the emergency room for a respiratory infection?",
      answerEn: "With trouble breathing at rest, blue lips or nails, chest pain, confusion, fever that does not come down after three days of treatment, or a child who breathes very fast, will not drink or is very listless.",
    },
  ],
  "examen-fisico-escolar": [
    {
      question: "¿Llenan el formulario de la escuela o del equipo?",
      answer: "Sí. Trae el formulario impreso o en el teléfono con la parte del padre o tutor firmada; el médico lo completa y firma en la misma visita. Si tu escuela no te dio uno, se emite una constancia de examen físico.",
      questionEn: "Do you complete the school or team form?",
      answerEn: "Yes. Bring the form printed or on your phone with the parent or guardian section signed; the physician completes and signs it at the same visit. If your school did not give you one, a physical exam certificate is issued.",
    },
    {
      question: "¿Cada cuánto se renueva el físico deportivo escolar en Texas?",
      answer: "Cada año, normalmente antes de la temporada. Conviene hacerlo con semanas de anticipación por si aparece algo que estudiar, como un soplo, y haya tiempo de resolverlo sin perder la inscripción.",
      questionEn: "How often is the school sports physical renewed in Texas?",
      answerEn: "Every year, usually before the season. It is best done weeks in advance in case something needs workup, such as a murmur, so there is time to resolve it without losing enrollment.",
    },
    {
      question: "¿El menor tiene que venir acompañado?",
      answer: "Sí, por su padre, madre o tutor, con identificación del adulto. Trae también el registro de vacunas si la escuela lo pide, los lentes si los usa y la lista de medicamentos, incluido el inhalador.",
      questionEn: "Does the minor have to come with someone?",
      answerEn: "Yes, with a parent or guardian, with the adult's ID. Also bring the vaccine record if the school requests it, glasses if used and the medication list, including the inhaler.",
    },
  ],
  "ginecologia": [
    {
      question: "¿Cada cuánto se hace el Papanicolaou?",
      answer: "Desde los 21 años, cada 3 años si sale normal; entre los 30 y los 65 puede combinarse con la prueba de VPH y espaciarse a cada 5 años. Si tuviste un resultado anormal, el médico fija el intervalo.",
      questionEn: "How often is a Pap smear done?",
      answerEn: "From age 21, every 3 years if normal; between 30 and 65 it can be combined with an HPV test and spaced to every 5 years. If you had an abnormal result, the physician sets the interval.",
    },
    {
      question: "¿Tratan las infecciones vaginales el mismo día?",
      answer: "En la mayoría de los casos sí: se toma un cultivo o prueba rápida que distingue hongos, vaginosis bacteriana e infección urinaria, y el tratamiento empieza en la misma visita según la causa.",
      questionEn: "Do you treat vaginal infections the same day?",
      answerEn: "In most cases yes: a culture or rapid test tells apart yeast, bacterial vaginosis and urinary infection, and treatment starts at the same visit according to the cause.",
    },
    {
      question: "¿Cómo me preparo para el Papanicolaou?",
      answer: "Evita relaciones, duchas vaginales y óvulos 48 horas antes y procura no venir con el periodo. Trae la fecha de tu último periodo y la lista de tus medicamentos. Puedes venir acompañada.",
      questionEn: "How should I prepare for a Pap smear?",
      answerEn: "Avoid sex, douching and vaginal suppositories for 48 hours beforehand and try not to come during your period. Bring the date of your last period and your medication list. You may bring someone with you.",
    },
  ],
  "prueba-embarazo": [
    {
      question: "¿Desde cuándo es confiable la prueba de embarazo?",
      answer: "La de orina, desde el primer día de retraso del periodo; antes puede dar negativo aunque haya embarazo. La de sangre detecta la hormona unos días antes y, en su versión cuantitativa, mide la cantidad.",
      questionEn: "From when is the pregnancy test reliable?",
      answerEn: "The urine test, from the first day of a missed period; earlier it can be negative even if there is a pregnancy. The blood test detects the hormone a few days earlier and, in its quantitative version, measures the amount.",
    },
    {
      question: "¿Qué pasa si sale positiva?",
      answer: "Se confirma, se calcula la fecha probable de parto, se indican ácido fólico y vitaminas prenatales y se programa un ultrasonido entre las 6 y las 8 semanas. Para el control prenatal completo te orientamos con una referencia a obstetricia.",
      questionEn: "What happens if it is positive?",
      answerEn: "It is confirmed, the due date is estimated, folic acid and prenatal vitamins are started and an ultrasound is scheduled between 6 and 8 weeks. For full prenatal care we guide you with an obstetrics referral.",
    },
    {
      question: "¿El resultado es confidencial?",
      answer: "Sí. El resultado es tuyo y no se comparte con nadie sin tu permiso; no se pide estatus migratorio. La conversación sobre tus opciones es informativa y respetuosa.",
      questionEn: "Is the result confidential?",
      answerEn: "Yes. The result is yours and is not shared with anyone without your permission; no immigration status is requested. The conversation about your options is informative and respectful.",
    },
  ],
  "anticonceptivos": [
    {
      question: "¿Qué métodos anticonceptivos inician en la clínica?",
      answer: "Pastillas anticonceptivas, combinadas o solo de progestina, y la inyección que se aplica cada 3 meses. Sobre parche, anillo, implante y DIU te orientamos y, si te conviene uno, te indicamos dónde colocarlo.",
      questionEn: "Which contraceptive methods do you start at the clinic?",
      answerEn: "Birth control pills, combined or progestin-only, and the injection given every 3 months. For the patch, ring, implant and IUD we give guidance and, if one fits you, tell you where to have it placed.",
    },
    {
      question: "¿Necesito Papanicolaou para que me den anticonceptivos?",
      answer: "No. Basta con revisar tu presión arterial y tu historial. Si te toca el Papanicolaou, puede hacerse en la misma visita, pero no es requisito para iniciar el método.",
      questionEn: "Do I need a Pap smear to get birth control?",
      answerEn: "No. Checking your blood pressure and history is enough. If you are due for a Pap smear, it can be done at the same visit, but it is not a requirement to start the method.",
    },
    {
      question: "¿Cuándo empieza a proteger el método?",
      answer: "Las pastillas, desde el primer día si se inician en los primeros cinco días del periodo; si no, usa condón la primera semana. La inyección protege desde el primer día si se aplica dentro de los primeros siete días del periodo.",
      questionEn: "When does the method start protecting?",
      answerEn: "Pills, from day one if started within the first five days of your period; otherwise, use condoms for the first week. The injection protects from day one if given within the first seven days of your period.",
    },
  ],
  "extraccion-implantes": [
    {
      question: "¿Duele retirar el implante anticonceptivo?",
      answer: "Se siente el piquete de la anestesia local y después solo presión. El procedimiento dura entre 10 y 20 minutos, no requiere puntos y sales caminando; en los días siguientes puede haber un moretón que se controla con hielo.",
      questionEn: "Does removing the contraceptive implant hurt?",
      answerEn: "You feel the prick of the local anesthesia and then only pressure. The procedure takes 10 to 20 minutes, needs no stitches and you walk out; in the following days there may be a bruise, managed with ice.",
    },
    {
      question: "¿Cuándo hay que retirar el implante?",
      answer: "Cuando se cumplen los 3 años para los que está aprobado, o antes si quieres embarazarte, si los sangrados irregulares no te convienen o si decides cambiar de método. No hace falta esperar a que caduque.",
      questionEn: "When does the implant need to be removed?",
      answerEn: "When the 3 years it is approved for are up, or earlier if you want to get pregnant, if irregular bleeding does not suit you or if you decide to switch methods. You do not have to wait for it to expire.",
    },
    {
      question: "¿Cuándo regresa la fertilidad después de retirarlo?",
      answer: "Rápido: la hormona sale del cuerpo en pocos días y puedes ovular en el primer mes. Si no buscas embarazo, hay que iniciar otro método el mismo día; en la clínica se inician pastillas o inyección en esa visita.",
      questionEn: "When does fertility return after removal?",
      answerEn: "Quickly: the hormone leaves the body within days and you can ovulate in the first month. If you are not trying to get pregnant, another method must start the same day; pills or the injection can be started at that visit.",
    },
  ],
  "salud-hombre": [
    {
      question: "¿A qué edad se revisa la próstata con PSA?",
      answer: "Se conversa con el médico a partir de los 50 años, y desde los 45 si tu padre o un hermano tuvieron cáncer de próstata. Un PSA alto no significa cáncer: también sube con infección, inflamación o crecimiento benigno.",
      questionEn: "At what age is the prostate checked with PSA?",
      answerEn: "It is discussed with the physician from age 50, and from 45 if your father or a brother had prostate cancer. A high PSA does not mean cancer: it also rises with infection, inflammation or benign enlargement.",
    },
    {
      question: "¿Cuándo conviene medir la testosterona?",
      answer: "Con cansancio persistente, menos deseo sexual, dificultad para la erección, pérdida de masa muscular o ánimo bajo sin causa clara. La muestra se toma por la mañana y, si sale baja, se repite para confirmar.",
      questionEn: "When is testosterone worth measuring?",
      answerEn: "With persistent tiredness, lower sex drive, erection difficulty, loss of muscle mass or low mood without a clear cause. The sample is drawn in the morning and, if low, repeated to confirm.",
    },
    {
      question: "¿Qué incluye la promoción de testosterona?",
      answer: "Revisa tu Testosterona cuesta $79 e incluye examen de testosterona, examen de orina y consulta médica gratis. El Perfil Hormonal para Hombres cuesta $200. Para PSA suelto o análisis completos, llama por el precio.",
      questionEn: "What does the testosterone promotion include?",
      answerEn: "Check Your Testosterone costs $79 and includes a testosterone test, urine test and a free medical visit. The Men's Hormone Panel costs $200. For a stand-alone PSA or full labs, call for the price.",
    },
  ],
  "examenes-sangre": [
    {
      question: "¿Necesito ayuno para el análisis de sangre?",
      answer: "Para glucosa en ayunas y perfil de lípidos, entre 8 y 12 horas sin comer; puedes tomar agua. Para biometría, tiroides, B12 o pruebas hormonales no hace falta ayunar.",
      questionEn: "Do I need to fast for the blood test?",
      answerEn: "For fasting glucose and the lipid panel, 8 to 12 hours without food; water is fine. For a blood count, thyroid, B12 or hormone tests no fasting is needed.",
    },
    {
      question: "¿Cuánto cuesta un examen de sangre en Pasadena?",
      answer: "Los precios publicados son los de las promociones: Chequeo General Completo por $99 (examen general de sangre, A1C, examen de orina y consulta gratis) y Examen General de Sangre con Vitamina B12 por $99. Para pruebas sueltas, llama y te damos el precio.",
      questionEn: "How much does a blood test cost in Pasadena?",
      answerEn: "The published prices are those of the promotions: Complete General Checkup for $99 (general blood test, A1C, urine test and free visit) and General Blood Test with Vitamin B12 for $99. For single tests, call and we give you the price.",
    },
    {
      question: "¿Cuándo tengo los resultados?",
      answer: "La mayoría están listos rápido; te avisamos en cuanto los tenemos y, al tomar la muestra, te decimos cuánto suele tardar tu prueba. Después los revisas con el equipo médico en español.",
      questionEn: "When do I get the results?",
      answerEn: "Most are ready quickly; we let you know as soon as we have them and, when the sample is drawn, we tell you how long your test usually takes. Then you review them with the medical team.",
    },
  ],
  "infecciones-urinarias": [
    {
      question: "¿Puedo recibir tratamiento el mismo día?",
      answer: "Sí. El examen de orina se analiza en la clínica y, si confirma infección, sales con el antibiótico ese día. Si se envía cultivo por infección repetida, fiebre, embarazo o diabetes, te avisamos con el resultado.",
      questionEn: "Can I get treatment the same day?",
      answerEn: "Yes. The urine test is analyzed in the clinic and, if it confirms infection, you leave with the antibiotic that day. If a culture is sent because of recurrent infection, fever, pregnancy or diabetes, we let you know the result.",
    },
    {
      question: "¿Cómo doy la muestra de orina?",
      answer: "De preferencia sin haber orinado en la última hora. Se toma de la parte media del chorro tras limpiar la zona, para que no se contamine. Te damos el recipiente y las indicaciones en recepción.",
      questionEn: "How do I give the urine sample?",
      answerEn: "Preferably without having urinated in the last hour. It is taken midstream after cleaning the area, so it is not contaminated. We give you the container and instructions at the front desk.",
    },
    {
      question: "¿Cuándo una infección urinaria es urgente?",
      answer: "Cuando además del ardor hay fiebre, escalofríos, dolor en la espalda baja o a un lado, o náusea: puede haber llegado al riñón. Ven el mismo día, sin cita.",
      questionEn: "When is a urinary infection urgent?",
      answerEn: "When besides the burning there is fever, chills, pain in the lower back or one side, or nausea: it may have reached the kidney. Come the same day, no appointment needed.",
    },
  ],
  "examen-heces": [
    {
      question: "¿Cómo se recolecta la muestra de heces?",
      answer: "En el recipiente que te damos, sin que toque el agua del inodoro ni la orina, una cantidad del tamaño de una nuez. Anota nombre, fecha y hora y tráela el mismo día, o refrigérala hasta 24 horas si te lo indicaron.",
      questionEn: "How is the stool sample collected?",
      answerEn: "In the container we give you, without letting it touch toilet water or urine, an amount the size of a walnut. Write your name, date and time and bring it the same day, or refrigerate for up to 24 hours if instructed.",
    },
    {
      question: "¿Por qué piden tres muestras para parásitos?",
      answer: "Porque los parásitos y sus huevos no se eliminan todos los días; muestras de tres días distintos aumentan la probabilidad de encontrarlos. El médico te dice si tu caso lo requiere.",
      questionEn: "Why are three samples requested for parasites?",
      answerEn: "Because parasites and their eggs are not shed every day; samples from three different days raise the chance of finding them. The physician tells you whether your case requires it.",
    },
    {
      question: "¿Cuándo llevar a un niño por un examen de heces?",
      answer: "Con diarrea de más de una semana, dolor abdominal repetido, comezón anal nocturna, palidez o poca ganancia de peso. Si hay fiebre alta, sangre en las heces o signos de deshidratación, ven el mismo día.",
      questionEn: "When should a child have a stool test?",
      answerEn: "With diarrhea for more than a week, repeated abdominal pain, anal itching at night, paleness or poor weight gain. If there is high fever, blood in the stool or signs of dehydration, come the same day.",
    },
  ],
  "prueba-strep": [
    {
      question: "¿Cuánto tarda el resultado del strep test?",
      answer: "Minutos: se toma la muestra de garganta con un hisopo y el resultado se tiene en la misma visita. Si sale negativo pero los síntomas apuntan a estreptococo, se puede enviar un cultivo que confirma en uno o dos días.",
      questionEn: "How long does the strep test result take?",
      answerEn: "Minutes: the throat sample is taken with a swab and the result is ready at the same visit. If it is negative but symptoms point to strep, a culture can be sent that confirms in one or two days.",
    },
    {
      question: "¿Cuándo dejo de contagiar con estreptococo?",
      answer: "A las 24 horas de empezar el antibiótico, si ya no hay fiebre, puedes volver al trabajo o la escuela. El tratamiento se completa los 10 días aunque te sientas bien antes.",
      questionEn: "When am I no longer contagious with strep?",
      answerEn: "After 24 hours of antibiotics, if there is no fever, you can return to work or school. The full 10-day course is completed even if you feel better sooner.",
    },
    {
      question: "¿Cómo sé si es estreptococo o un virus?",
      answer: "El estreptococo suele dar dolor intenso al tragar, fiebre, ganglios en el cuello y placas blancas, sin tos ni mocos; el virus viene con tos, congestión y ronquera. La prueba es la única forma segura de distinguirlos.",
      questionEn: "How do I know if it is strep or a virus?",
      answerEn: "Strep usually causes intense pain when swallowing, fever, swollen neck glands and white patches, without cough or runny nose; a virus comes with cough, congestion and hoarseness. The test is the only sure way to tell.",
    },
  ],
  "prueba-tuberculosis": [
    {
      question: "¿Tengo que regresar para leer la prueba de tuberculosis?",
      answer: "Con la prueba cutánea (PPD) sí: se lee entre 48 y 72 horas después y si no vuelves se anula. Con la prueba en sangre (IGRA) no hace falta volver; es la que exige USCIS y la mejor si tienes la vacuna BCG.",
      questionEn: "Do I have to come back to read the tuberculosis test?",
      answerEn: "With the skin test (PPD) yes: it is read 48 to 72 hours later and is void if you do not return. With the blood test (IGRA) no return is needed; it is the one USCIS requires and the best choice if you had the BCG vaccine.",
    },
    {
      question: "¿Qué significa que la prueba salga positiva?",
      answer: "Que tu cuerpo tuvo contacto con la bacteria, no que estés enfermo. La mayoría son infección latente: no contagias ni tienes síntomas. Se pide una radiografía de tórax para descartar enfermedad activa.",
      questionEn: "What does a positive test mean?",
      answerEn: "That your body had contact with the bacteria, not that you are sick. Most are latent infection: you are not contagious and have no symptoms. A chest X-ray is ordered to rule out active disease.",
    },
    {
      question: "¿La vacuna BCG afecta el resultado?",
      answer: "Puede dar un falso positivo en la prueba cutánea. Si sabes que tienes BCG, conviene la prueba en sangre desde el principio; si la cutánea ya salió positiva, la de sangre ayuda a aclararlo.",
      questionEn: "Does the BCG vaccine affect the result?",
      answerEn: "It can cause a false positive on the skin test. If you know you had BCG, the blood test is best from the start; if the skin test was already positive, the blood test helps clarify.",
    },
  ],
  "enfermedades-transmision-sexual": [
    {
      question: "¿Las pruebas de ETS son confidenciales?",
      answer: "Sí. El resultado es tuyo y no se comparte con tu pareja, tu familia ni tu empleador; no se pregunta estatus migratorio. En recepción solo dices que vienes por una prueba; los detalles se hablan en consulta.",
      questionEn: "Are STD tests confidential?",
      answerEn: "Yes. The result is yours and is not shared with your partner, family or employer; no immigration status is asked. At the front desk you only say you are here for a test; details are discussed in the exam room.",
    },
    {
      question: "¿Cuándo debo hacerme la prueba después de una exposición?",
      answer: "Ten en cuenta el periodo ventana: a los pocos días puede salir negativa. Para VIH y sífilis conviene repetirla a las 4 a 6 semanas y a los 3 meses. Ante síntomas, ven de inmediato.",
      questionEn: "When should I get tested after an exposure?",
      answerEn: "Keep the window period in mind: a few days after exposure it can be negative. For HIV and syphilis it is worth repeating at 4 to 6 weeks and at 3 months. With symptoms, come right away.",
    },
    {
      question: "¿Dan tratamiento si sale positiva?",
      answer: "Clamidia, gonorrea, sífilis y tricomonas se tratan con antibióticos en la misma clínica. Para VIH y herpes se orienta el tratamiento y, en el caso del VIH, la referencia a un centro especializado.",
      questionEn: "Do you treat it if the test is positive?",
      answerEn: "Chlamydia, gonorrhea, syphilis and trichomonas are treated with antibiotics at the same clinic. For HIV and herpes, treatment is guided and, for HIV, a referral to a specialized center is arranged.",
    },
  ],
  "examen-alcohol-drogas": [
    {
      question: "¿Entregan documentación para el trabajo?",
      answer: "Sí. La prueba rápida da resultado en la clínica y se documenta por escrito; si tu empleador exige confirmación de laboratorio, la muestra se envía y el resultado se entrega en documento para tu empleador o trámite.",
      questionEn: "Do you provide documentation for work?",
      answerEn: "Yes. The rapid test gives a result in the clinic and is documented in writing; if your employer requires lab confirmation, the sample is sent out and the result is delivered as a document for your employer or process.",
    },
    {
      question: "¿Hacen la prueba de drogas federal DOT para conductores?",
      answer: "El examen físico DOT para la licencia CDL sí se hace en la clínica. Si tu empleador exige el protocolo federal de drogas con cadena de custodia y laboratorio certificado, confírmalo por teléfono antes de venir.",
      questionEn: "Do you do the federal DOT drug test for drivers?",
      answerEn: "The DOT physical for the CDL is done at the clinic. If your employer requires the federal drug-test protocol with chain of custody and a certified lab, confirm by phone before coming.",
    },
    {
      question: "¿Qué medicamentos pueden dar positivo?",
      answer: "Analgésicos opioides, medicamentos para el TDAH, ciertos ansiolíticos y jarabes con codeína, entre otros. Trae tus recetas o frascos: la confirmación de laboratorio distingue un medicamento indicado y se documenta.",
      questionEn: "Which medications can cause a positive?",
      answerEn: "Opioid pain relievers, ADHD medications, certain anti-anxiety drugs and codeine cough syrups, among others. Bring your prescriptions or bottles: lab confirmation tells a prescribed medication apart and it is documented.",
    },
  ],
  "electrocardiograma": [
    {
      question: "¿El electrocardiograma duele?",
      answer: "No. Se colocan electrodos adhesivos en pecho, brazos y piernas y se registra unos segundos; no envía electricidad al cuerpo ni usa radiación. En total toma unos 10 minutos y puede hacerse en el embarazo.",
      questionEn: "Does the electrocardiogram hurt?",
      answerEn: "No. Adhesive electrodes are placed on the chest, arms and legs and it records for a few seconds; it sends no electricity into the body and uses no radiation. In all it takes about 10 minutes and can be done in pregnancy.",
    },
    {
      question: "¿Necesito preparación para el electrocardiograma?",
      answer: "No hace falta ayuno. Evita cremas en el pecho, ejercicio intenso y café justo antes, y trae tu lista de medicamentos y electrocardiogramas anteriores si los tienes.",
      questionEn: "Do I need preparation for the electrocardiogram?",
      answerEn: "No fasting is needed. Avoid creams on the chest, hard exercise and coffee right before, and bring your medication list and previous electrocardiograms if you have them.",
    },
    {
      question: "¿Qué pasa si el electrocardiograma sale alterado?",
      answer: "Muchas alteraciones son variantes normales o se explican por la presión o un medicamento. Si requiere estudio, se ordenan análisis, se ajusta el tratamiento y, si corresponde, se orienta la referencia a cardiología.",
      questionEn: "What if the electrocardiogram is abnormal?",
      answerEn: "Many abnormalities are normal variants or are explained by blood pressure or a medication. If workup is needed, labs are ordered, treatment is adjusted and, when appropriate, a cardiology referral is arranged.",
    },
  ],
  "ultrasonido": [
    {
      question: "¿Cómo me preparo para el ultrasonido?",
      answer: "Abdominal: 6 a 8 horas de ayuno. Pélvico y de embarazo temprano: vejiga llena, toma agua una hora antes y no orines hasta terminar. Tiroides, tejidos blandos y embarazo avanzado: sin preparación.",
      questionEn: "How do I prepare for the ultrasound?",
      answerEn: "Abdominal: 6 to 8 hours of fasting. Pelvic and early pregnancy: full bladder, drink water an hour before and do not urinate until done. Thyroid, soft tissue and late pregnancy: no preparation.",
    },
    {
      question: "¿El ultrasonido es seguro en el embarazo?",
      answer: "Sí. No usa radiación, a diferencia de los rayos X, y se emplea de forma rutinaria durante todo el embarazo. El gel solo ayuda a que pasen las ondas y se limpia al terminar.",
      questionEn: "Is ultrasound safe in pregnancy?",
      answerEn: "Yes. It uses no radiation, unlike X-rays, and is used routinely throughout pregnancy. The gel only helps the waves pass through and is wiped off when you finish.",
    },
    {
      question: "¿Necesito orden médica para un ultrasonido?",
      answer: "No es obligatoria. Puedes llegar sin cita y el médico decide contigo qué estudio corresponde según tus síntomas. Si traes una orden de otro doctor, se sigue tal cual.",
      questionEn: "Do I need a doctor's order for an ultrasound?",
      answerEn: "It is not required. You can walk in and the physician decides with you which study fits your symptoms. If you bring an order from another doctor, it is followed as written.",
    },
  ],
  "examen-dot": [
    {
      question: "¿Me entregan el certificado DOT el mismo día?",
      answer: "Sí, al terminar el examen, si calificas. Dura hasta 24 meses; con presión alta, diabetes o apnea del sueño controladas puede ser de un año o tres meses para revisar tu control más seguido.",
      questionEn: "Do I get the DOT certificate the same day?",
      answerEn: "Yes, when the exam is finished, if you qualify. It lasts up to 24 months; with controlled high blood pressure, diabetes or sleep apnea it may be for one year or three months so your control is rechecked more often.",
    },
    {
      question: "¿Qué debo llevar al examen DOT?",
      answer: "Licencia vigente, lentes o aparato auditivo, lista de medicamentos con dosis y, según tu caso, A1C reciente, el formulario de insulina, el reporte de CPAP, carta del cardiólogo y tu certificado anterior.",
      questionEn: "What should I bring to the DOT exam?",
      answerEn: "A valid license, glasses or hearing aid, a medication list with doses and, depending on your case, a recent A1C, the insulin form, the CPAP report, a cardiologist letter and your previous certificate.",
    },
    {
      question: "¿Qué pasa si la presión sale alta el día del examen?",
      answer: "Se puede repetir la medición el mismo día o en una visita corta tras unos días de control. De 140/90 suele darse certificado de un año; de 180/110 no se certifica hasta que baje. El tratamiento se inicia en la misma clínica.",
      questionEn: "What if my blood pressure is high on exam day?",
      answerEn: "The reading can be repeated the same day or at a short visit after a few days of control. From 140/90 a one-year certificate is usual; at 180/110 you are not certified until it comes down. Treatment starts at the same clinic.",
    },
  ],
  "examenes-inmigracion": [
    {
      question: "¿El médico está autorizado por USCIS?",
      answer: "Sí. El examen lo realiza un médico designado por USCIS (civil surgeon), único que puede firmar y sellar el Formulario I-693. Puedes verificar cualquier médico en la herramienta pública de búsqueda de USCIS.",
      questionEn: "Is the physician authorized by USCIS?",
      answerEn: "Yes. The exam is performed by a USCIS-designated physician (civil surgeon), the only one who can sign and seal Form I-693. You can verify any physician in the public USCIS search tool.",
    },
    {
      question: "¿Cuándo me entregan el sobre sellado del I-693?",
      answer: "Cuando están completos los resultados de laboratorio y las vacunas, porque el formulario debe incluirlos; te avisamos para recogerlo. Pide una copia antes del sellado y no abras el sobre.",
      questionEn: "When do I get the sealed I-693 envelope?",
      answerEn: "Once the lab results and vaccines are complete, because the form must include them; we let you know when to pick it up. Ask for a copy before sealing and do not open the envelope.",
    },
    {
      question: "¿Qué vacunas piden para el I-693?",
      answer: "Depende de la edad: para adultos, Td o Tdap, MMR, varicela, hepatitis B e influenza en temporada; desde los 65, neumococo. La de COVID-19 ya no es requisito. Trae tu registro para aplicar solo las que falten.",
      questionEn: "Which vaccines are required for the I-693?",
      answerEn: "It depends on age: for adults, Td or Tdap, MMR, varicella, hepatitis B and the flu shot in season; from 65, pneumococcal. COVID-19 is no longer required. Bring your record so only missing ones are given.",
    },
  ],
  "vacunas": [
    {
      question: "¿Qué vacunas aplican en la clínica?",
      answer: "La anual contra la influenza y el toxoide tetánico (Td o Tdap) para adultos, y las que exige el examen de inmigración cuando faltan en tu registro: MMR, varicela, hepatitis B y neumococo según la edad. Para otras, llama antes.",
      questionEn: "Which vaccines do you give at the clinic?",
      answerEn: "The yearly flu vaccine and the tetanus toxoid (Td or Tdap) for adults, and those required by the immigration exam when missing from your record: MMR, varicella, hepatitis B and pneumococcal by age. For others, call first.",
    },
    {
      question: "¿Cada cuánto se pone el refuerzo del tétanos?",
      answer: "Cada 10 años, con al menos una dosis de Tdap en la vida adulta y en cada embarazo. Tras una herida sucia, conviene ponerlo si han pasado más de 5 años desde el último.",
      questionEn: "How often is the tetanus booster given?",
      answerEn: "Every 10 years, with at least one Tdap dose in adulthood and in every pregnancy. After a dirty wound, it is worth getting if more than 5 years have passed since the last one.",
    },
    {
      question: "¿Puedo vacunarme si estoy embarazada?",
      answer: "La influenza y la Tdap sí se aplican en el embarazo; la MMR y la varicela no. Con fiebre o enfermedad aguda ese día, se espera a recuperarse. Todo se revisa en una conversación breve antes de la inyección.",
      questionEn: "Can I be vaccinated if I am pregnant?",
      answerEn: "The flu and Tdap vaccines are given in pregnancy; MMR and varicella are not. With a fever or acute illness that day, you wait until recovered. All of this is reviewed in a short conversation before the injection.",
    },
  ],
  "sueros-vitaminados": [
    {
      question: "¿Quién aplica el suero vitaminado?",
      answer: "Personal médico de la clínica, después de una evaluación breve de tu presión, antecedentes y medicamentos. La infusión dura entre 30 y 60 minutos con personal presente todo el tiempo.",
      questionEn: "Who gives the IV vitamin drip?",
      answerEn: "The clinic's medical staff, after a brief evaluation of your blood pressure, history and medications. The infusion takes 30 to 60 minutes with staff present the whole time.",
    },
    {
      question: "¿Quién no debe recibir un suero vitaminado?",
      answer: "Personas con insuficiencia renal o cardiaca, embarazadas sin indicación médica y quien tenga alergia a algún componente. Por eso siempre hay evaluación antes; no se aplica sin revisar.",
      questionEn: "Who should not receive an IV vitamin drip?",
      answerEn: "People with kidney or heart failure, pregnant women without a medical indication and anyone allergic to a component. That is why there is always an evaluation first; it is never given without that review.",
    },
    {
      question: "¿La inyección de B12 va incluida en alguna promoción?",
      answer: "Sí: el Examen General de Sangre con Vitamina B12 cuesta $99 e incluye el examen general de sangre, la inyección de B12 y la orientación de resultados. Para la inyección suelta o un esquema de varias dosis, llama por el precio.",
      questionEn: "Is the B12 injection included in any promotion?",
      answerEn: "Yes: the General Blood Test with Vitamin B12 costs $99 and includes the general blood test, the B12 injection and a review of your results. For a single shot or a multi-dose schedule, call for the price.",
    },
  ],
  "suturas-heridas": [
    {
      question: "¿Cuánto tiempo tengo para que me pongan puntos?",
      answer: "Lo ideal es dentro de las primeras 6 a 8 horas; en cara y cuero cabelludo, hasta 24. Pasado ese tiempo, el médico puede optar por dejar la herida abierta y curarla. Mientras vienes, presiona con una gasa limpia.",
      questionEn: "How long do I have to get stitches?",
      answerEn: "Ideally within the first 6 to 8 hours; on the face and scalp, up to 24. After that, the physician may choose to leave the wound open and treat it. On your way, press with a clean gauze.",
    },
    {
      question: "¿Cuándo se quitan los puntos?",
      answer: "Cara, 5 a 7 días; cuero cabelludo y tronco, 7 a 10; brazos y piernas, 10 a 14; articulaciones, hasta 14. El retiro se hace en la clínica en minutos y sin cita.",
      questionEn: "When are stitches removed?",
      answerEn: "Face, 5 to 7 days; scalp and trunk, 7 to 10; arms and legs, 10 to 14; joints, up to 14. Removal is done at the clinic in minutes with no appointment.",
    },
    {
      question: "¿Qué heridas deben ir a emergencias en vez de a la clínica?",
      answer: "Sangrado que no para con presión, mordeduras profundas, cortes con pérdida de sensibilidad o movimiento, heridas en el ojo, objetos clavados o cortes muy extensos. El resto se atiende aquí sin cita.",
      questionEn: "Which wounds should go to the emergency room instead of the clinic?",
      answerEn: "Bleeding that does not stop with pressure, deep bites, cuts with loss of sensation or movement, eye wounds, embedded objects or very extensive cuts. The rest is treated here with no appointment.",
    },
  ],
  "curacion-heridas": [
    {
      question: "¿Hacen cambios de vendaje y seguimiento?",
      answer: "Sí. En cada curación se lava la herida, se retira tejido muerto si lo hay, se aplica el apósito indicado y se revisan signos de infección. Las heridas simples se revisan cada 2 a 3 días hasta cerrar; las úlceras, según evolución.",
      questionEn: "Do you do dressing changes and follow-up?",
      answerEn: "Yes. At each visit the wound is washed, dead tissue is removed if present, the right dressing is applied and infection signs are checked. Simple wounds are checked every 2 to 3 days until closed; ulcers, according to progress.",
    },
    {
      question: "¿Qué hago con una quemadura antes de venir?",
      answer: "Enfría con agua corriente fresca 10 a 20 minutos, sin hielo ni remedios caseros, no revientes las ampollas y cubre con un paño limpio. Quemaduras de cara, manos, pies, genitales o más grandes que la palma van a emergencias.",
      questionEn: "What should I do with a burn before coming?",
      answerEn: "Cool it under fresh running water for 10 to 20 minutes, without ice or home remedies, do not pop blisters and cover with a clean cloth. Burns on the face, hands, feet, genitals or larger than the palm go to the emergency room.",
    },
    {
      question: "¿Por qué mi herida no cierra?",
      answer: "Diabetes con azúcar alta, mala circulación, presión constante sobre la zona, infección o tabaco retrasan la cicatrización. Si lleva más de dos semanas sin mejorar, además de curarla se busca la causa con análisis.",
      questionEn: "Why is my wound not closing?",
      answerEn: "Diabetes with high sugar, poor circulation, constant pressure on the area, infection or tobacco delay healing. If it has gone more than two weeks without improving, besides treating it the cause is looked for with lab tests.",
    },
  ],
  "cirugias-menores": [
    {
      question: "¿Qué cirugías menores realizan?",
      answer: "Extracción de lunares, verrugas y acrocordones, quistes sebáceos y lipomas, retiro de cuerpos extraños como astillas o vidrio, y biopsia de lesiones de piel cuando el médico necesita saber qué son. Todo con anestesia local, en la clínica.",
      questionEn: "Which minor surgeries do you perform?",
      answerEn: "Removal of moles, warts and skin tags, sebaceous cysts and lipomas, removal of foreign bodies such as splinters or glass, and biopsy of skin lesions when the physician needs to know what they are. All under local anesthesia, at the clinic.",
    },
    {
      question: "¿Qué lunares conviene revisar?",
      answer: "Los asimétricos, de bordes irregulares, con varios colores, de más de 6 milímetros o que cambiaron hace poco. En esos casos el tejido se envía a análisis y, si el aspecto es muy sospechoso, se refiere a dermatología antes de tocarlo.",
      questionEn: "Which moles should be checked?",
      answerEn: "Those that are asymmetric, have irregular borders, several colors, are larger than 6 millimeters or changed recently. In those cases the tissue is sent for analysis and, if highly suspicious, a dermatology referral comes before touching it.",
    },
    {
      question: "¿Cuánto dura y deja cicatriz?",
      answer: "Entre 15 y 45 minutos según el tamaño. Toda incisión deja una marca; se minimiza con puntos finos en las líneas de la piel, manteniendo seco 24 a 48 horas y sin sol sobre la cicatriz durante meses.",
      questionEn: "How long does it take, and does it scar?",
      answerEn: "Between 15 and 45 minutes depending on size. Every incision leaves a mark; it is minimized with fine stitches along the skin lines, keeping it dry for 24 to 48 hours and keeping the scar out of the sun for months.",
    },
  ],
  "drenaje-abscesos": [
    {
      question: "¿El drenaje de un absceso duele?",
      answer: "Se aplica anestesia local antes de la pequeña incisión; el alivio es casi inmediato porque desaparece la presión del pus. Dura entre 15 y 30 minutos y sales con vendaje.",
      questionEn: "Does abscess drainage hurt?",
      answerEn: "Local anesthesia is given before the small incision; relief is almost immediate because the pressure of the pus is gone. It takes 15 to 30 minutes and you leave with a dressing.",
    },
    {
      question: "¿Por qué no basta con antibiótico?",
      answer: "Porque el pus está encapsulado y el medicamento no llega bien adentro. Hay que abrir y drenar; el antibiótico se añade cuando hay celulitis alrededor, fiebre, varios abscesos o diabetes. No lo aprietes en casa.",
      questionEn: "Why is an antibiotic not enough?",
      answerEn: "Because the pus is walled off and the medication does not reach well inside. It must be opened and drained; an antibiotic is added when there is cellulitis around it, fever, several abscesses or diabetes. Do not squeeze it at home.",
    },
    {
      question: "¿Qué cuidados hay después del drenaje?",
      answer: "Cambiar el vendaje una o dos veces al día, lavar en la ducha, no meter la zona en tina ni piscina y volver en 24 a 48 horas para revisar o retirar la mecha. Cierra solo desde adentro en una o dos semanas.",
      questionEn: "What care is needed after drainage?",
      answerEn: "Change the dressing once or twice a day, wash in the shower, do not soak the area in a tub or pool and return in 24 to 48 hours to check or remove the packing. It closes on its own from the inside in one or two weeks.",
    },
  ],
  "unas-encarnadas": [
    {
      question: "¿Cómo tratan la uña encarnada?",
      answer: "Se anestesia el dedo con dos pequeñas inyecciones, se retira la porción de uña encarnada, se limpia el tejido inflamado y se drena el pus si lo hay. Dura entre 15 y 30 minutos y sales caminando con calzado holgado.",
      questionEn: "How do you treat an ingrown toenail?",
      answerEn: "The toe is numbed with two small injections, the ingrown portion of the nail is removed, the inflamed tissue is cleaned and pus is drained if present. It takes 15 to 30 minutes and you walk out in loose footwear.",
    },
    {
      question: "¿Puedo tratarla en casa?",
      answer: "Solo si hay enrojecimiento leve sin pus: remojos en agua tibia con sal, levantar el borde con algodón y calzado abierto. Con pus, hinchazón, dolor que impide caminar, diabetes o mala circulación, hace falta la clínica.",
      questionEn: "Can I treat it at home?",
      answerEn: "Only if there is mild redness without pus: warm salt-water soaks, lifting the edge with cotton and open shoes. With pus, swelling, pain that keeps you from walking, diabetes or poor circulation, the clinic is needed.",
    },
    {
      question: "¿Cómo evito que vuelva a encarnarse?",
      answer: "Corta la uña recta, sin redondear las esquinas ni dejarla muy corta; usa zapatos con espacio para los dedos y mantén los pies secos. Cuando se repite, el médico puede tratar la raíz de ese borde.",
      questionEn: "How do I keep it from growing in again?",
      answerEn: "Cut the nail straight across, without rounding the corners or leaving it too short; wear shoes with room for the toes and keep your feet dry. When it keeps recurring, the physician can treat the root of that edge.",
    },
  ],
  "farmacia": [
    {
      question: "¿Puedo recoger mi medicamento en la clínica?",
      answer: "Sí. Los medicamentos de la receta emitida en tu consulta se entregan en la misma clínica antes de irte, en genérico cuando existe, con la explicación de cómo tomarlos. Si alguno no está disponible, te damos la receta para surtirla donde prefieras.",
      questionEn: "Can I pick up my medication at the clinic?",
      answerEn: "Yes. Medications prescribed at your visit are provided at the same clinic before you leave, as generics when they exist, with an explanation of how to take them. If one is not available, we give you the prescription to fill wherever you prefer.",
    },
    {
      question: "¿Los genéricos funcionan igual que los de marca?",
      answer: "Sí: mismo principio activo, misma dosis y mismos controles de calidad, a una fracción del precio. Cuando hay una diferencia relevante, el médico te lo dice.",
      questionEn: "Do generics work the same as brand names?",
      answerEn: "Yes: same active ingredient, same dose and same quality controls, at a fraction of the price. When there is a relevant difference, the physician tells you.",
    },
    {
      question: "¿Venden medicamentos de venta libre sin consulta?",
      answer: "Sí, productos para gripe, dolor, alergia y estómago. Los medicamentos de receta requieren consulta en la clínica; si traes una receta de otro consultorio, pregunta por teléfono si se puede surtir.",
      questionEn: "Do you sell over-the-counter medications without a visit?",
      answerEn: "Yes, products for colds, pain, allergies and stomach upset. Prescription medications require a visit at the clinic; if you bring a prescription from another office, ask by phone whether it can be filled.",
    },
  ],
};

/** FAQs de un servicio por slug (vacío si no tiene). */
export function getServiceFaqs(slug: string): ServiceFaq[] {
  return SERVICE_FAQS[slug] ?? [];
}
