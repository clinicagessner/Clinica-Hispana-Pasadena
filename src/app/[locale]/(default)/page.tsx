import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Promotions } from "@/components/sections/promotions";
import { Services } from "@/components/sections/services";
import { Gynecology } from "@/components/sections/gynecology";
import { MensHealth } from "@/components/sections/mens-health";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Faq } from "@/components/sections/faq";
import { Location } from "@/components/sections/location";
import { Contact } from "@/components/sections/contact";
import { ScrollSpyUrl } from "@/components/shared/scroll-spy-url";
import { SITE_CONFIG } from "@/lib/constants";
import { buildAlternates } from "@/lib/seo";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn
      ? "Clínica Hispana Nueva Salud Pasadena, TX - Care in Spanish"
      : "Clínica Hispana Nueva Salud Pasadena, TX - Atención en Español",
    description: isEn ? SITE_CONFIG.descriptionEn : SITE_CONFIG.description,
    alternates: buildAlternates("/", locale as Locale),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <ScrollSpyUrl />
      <Hero />
      <Promotions />
      <Services />
      <Gynecology />
      <MensHealth />
      <Testimonials />
      <BlogPreview />
      <Faq />
      <Location />
      <Contact />
    </>
  );
}
