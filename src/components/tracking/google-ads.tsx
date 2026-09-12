import Script from "next/script";

/**
 * Google Ads global site tag (gtag.js). Carga vía next/script.
 * No-op si falta NEXT_PUBLIC_GOOGLE_ADS_ID (formato AW-XXXXXXXXX).
 */
export function GoogleAds() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!adsId) return null;

  // Cuando GA4 está activo (@next/third-parties) ya carga gtag.js; volver a
  // cargarlo con el ID de Ads duplicaba ~230 KB por página. Basta con encolar
  // el config: gtag.js procesa dataLayer al llegar, sin importar el orden.
  return (
    <>
      {!gaId && (
        <Script
          id="google-ads-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
        />
      )}
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${adsId}');`}
      </Script>
    </>
  );
}
