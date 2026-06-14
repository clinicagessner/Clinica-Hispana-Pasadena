import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FaqSection } from "@/components/sections/faq-section";
import { HOME_FAQS } from "@/lib/home-faqs";
import { CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";
import { buildAlternates } from "@/lib/seo";
import type { Locale } from "@/types";

const COPY = {
  es: {
    title: "Política de privacidad",
    subtitle: "Cómo tratamos y protegemos tu información.",
    intro: `En ${SITE_CONFIG.name} valoramos tu privacidad. Esta política explica qué información recopilamos a través de nuestro sitio web y cómo la usamos.`,
    sections: [
      {
        h: "Información que recopilamos",
        p: "Cuando completas nuestro formulario de contacto, recopilamos los datos que nos proporcionas: nombre, teléfono, correo electrónico, servicio de interés y tu mensaje.",
      },
      {
        h: "Cómo usamos tu información",
        p: "Usamos tus datos únicamente para responder a tu solicitud y coordinar tu atención. No vendemos ni compartimos tu información personal con terceros para fines de marketing.",
      },
      {
        h: "Cookies y analítica",
        p: "Nuestro sitio utiliza herramientas de analítica y publicidad (como Google Analytics, Google Ads y Meta) para entender el uso del sitio y mejorar nuestros servicios. Puedes administrar las cookies desde la configuración de tu navegador.",
      },
      {
        h: "Tus derechos",
        p: "Puedes solicitar acceso, corrección o eliminación de tus datos personales escribiéndonos al correo de contacto.",
      },
      {
        h: "Contacto",
        p: `Si tienes preguntas sobre esta política, escríbenos a ${CONTACT_INFO.email} o llámanos al ${CONTACT_INFO.phoneFormatted}.`,
      },
    ],
  },
  en: {
    title: "Privacy policy",
    subtitle: "How we handle and protect your information.",
    intro: `At ${SITE_CONFIG.name} we value your privacy. This policy explains what information we collect through our website and how we use it.`,
    sections: [
      {
        h: "Information we collect",
        p: "When you complete our contact form, we collect the data you provide: name, phone, email, service of interest and your message.",
      },
      {
        h: "How we use your information",
        p: "We use your data solely to respond to your request and coordinate your care. We do not sell or share your personal information with third parties for marketing purposes.",
      },
      {
        h: "Cookies and analytics",
        p: "Our site uses analytics and advertising tools (such as Google Analytics, Google Ads and Meta) to understand site usage and improve our services. You can manage cookies from your browser settings.",
      },
      {
        h: "Your rights",
        p: "You may request access, correction or deletion of your personal data by writing to our contact email.",
      },
      {
        h: "Contact",
        p: `If you have questions about this policy, email us at ${CONTACT_INFO.email} or call us at ${CONTACT_INFO.phoneFormatted}.`,
      },
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = COPY[locale === "en" ? "en" : "es"];
  return {
    title: c.title,
    description: c.subtitle,
    alternates: buildAlternates("/privacy", locale as Locale),
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const c = COPY[locale === "en" ? "en" : "es"];

  return (
    <>
    <section className="bg-cloud py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-dark">
          {c.title}
        </h1>
        <p className="mt-3 text-lg text-slate-primary">{c.subtitle}</p>
        <div className="mt-5 h-0.5 w-24 rounded-full bg-gradient-to-r from-blue-primary to-teal" />

        <div className="mt-10 rounded-2xl border border-blue-light bg-white px-6 py-8 shadow-sm sm:px-10">
          <p className="leading-relaxed text-slate-primary">{c.intro}</p>
          <div className="mt-6 space-y-6">
            {c.sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-heading text-xl font-bold text-slate-dark">
                  {s.h}
                </h2>
                <p className="mt-2 leading-relaxed text-slate-primary">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <FaqSection items={HOME_FAQS} className="bg-sky-bg" />
    </>
  );
}
