import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MetaPixel } from "@/components/tracking/meta-pixel";
import { MetaPixelSPATracker } from "@/components/tracking/meta-pixel-spa-tracker";
import { GoogleAds } from "@/components/tracking/google-ads";
import { CallRail } from "@/components/tracking/callrail";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const description = isEn
    ? SITE_CONFIG.descriptionEn
    : SITE_CONFIG.description;
  const tagline = isEn ? SITE_CONFIG.taglineEn : SITE_CONFIG.tagline;

  return {
    metadataBase: new URL(SITE_CONFIG.baseUrl),
    title: {
      default: `${SITE_CONFIG.name} · ${tagline}`,
      template: "%s",
    },
    description,
    applicationName: SITE_CONFIG.name,
    authors: [{ name: SITE_CONFIG.name }],
    // Search Console verificado por DNS (propiedad de Dominio). Este meta tag
    // es solo un método alternativo opcional; se activa si se define la env.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
    openGraph: {
      type: "website",
      siteName: SITE_CONFIG.name,
      locale: isEn ? "en_US" : "es_US",
      title: `${SITE_CONFIG.name} · ${tagline}`,
      description,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_CONFIG.name} · ${tagline}`,
      description,
      images: [SITE_CONFIG.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale as Locale);
  const messages = await getMessages();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        {/* Meta Pixel: script crudo, antes de la hidratación */}
        <MetaPixel />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MetaPixelSPATracker />
          {children}
        </NextIntlClientProvider>
        <GoogleAds />
        <CallRail />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
