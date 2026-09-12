import { getTranslations } from "next-intl/server";

// Bloque de definición de la entidad: encabezado en forma de pregunta y un
// solo párrafo de hechos verificables (qué es, dónde, horario, condiciones,
// idiomas, servicios, teléfonos, área) que buscadores e IAs pueden citar tal
// cual. Texto propio de Pasadena; no reutilizar en las clínicas hermanas.
export async function AboutClinic() {
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-blue-deep/10 bg-sand-bg"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <h2
            id="about-heading"
            className="font-heading text-2xl font-black tracking-tight text-slate-dark sm:text-3xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-slate-primary md:text-lg">
            {t("body")}
          </p>
        </div>
      </div>
    </section>
  );
}
