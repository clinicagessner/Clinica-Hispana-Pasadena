import Script from "next/script";

/**
 * Google Ads global site tag (gtag.js). Carga vía next/script.
 * No-op si falta NEXT_PUBLIC_GOOGLE_ADS_ID (formato AW-XXXXXXXXX).
 */
export function GoogleAds() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!adsId) return null;

  return (
    <>
      <Script
        id="google-ads-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${adsId}');`}
      </Script>
    </>
  );
}
