import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingButtons } from "@/components/layout/floating-buttons";
import { HashCleaner } from "@/components/shared/hash-cleaner";
import { JsonLdMedicalClinic } from "@/components/seo/json-ld";
import type { Locale } from "@/types";

export default async function DefaultLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      {/* JSON-LD MedicalClinic global (async, con rating en vivo) */}
      <JsonLdMedicalClinic locale={locale as Locale} />
      <HashCleaner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
