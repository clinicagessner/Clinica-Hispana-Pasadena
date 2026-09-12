import Script from "next/script";

/**
 * GA4 + Google Ads con un solo gtag.js. La inicialización (dataLayer, gtag y
 * los config) va inline en afterInteractive para que cualquier evento se
 * encole desde el principio; la descarga de gtag.js (~170 KB) se pospone a
 * después de window.load para que no se precargue por delante del hero (LCP).
 * gtag.js procesa la cola al llegar, así que no se pierde ningún evento.
 * No-op si faltan las dos variables.
 */
export function GoogleTags() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const loaderId = gaId ?? adsId;
  if (!loaderId) return null;

  const configs = [gaId, adsId]
    .filter(Boolean)
    .map((id) => `gtag('config', '${id}');`)
    .join("\n");

  return (
    <>
      <Script id="google-tags-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configs}`}
      </Script>
      <Script
        id="google-tags-src"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
      />
    </>
  );
}
