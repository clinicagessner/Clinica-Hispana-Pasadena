import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingFloatingCall } from "@/components/landing/landing-floating-call";
import type { Locale } from "@/types";

// Grupo (landing): chrome propio, distinto del sitio principal.
export default async function LandingLayout({
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
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
      <LandingFloatingCall />
    </>
  );
}
