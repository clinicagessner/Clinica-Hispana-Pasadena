import Script from "next/script";

/**
 * CallRail — number swap dinámico (DNI). swap.js sustituye el número de
 * teléfono del sitio por uno de rastreo para atribuir llamadas a campañas.
 *
 * La URL del swap.js es propia de la cuenta (Company ID + hash) y vive en
 * NEXT_PUBLIC_CALLRAIL_SWAP_SRC. No-op si la env no está definida.
 *
 * Los dominios de CallRail ya están en la allowlist de la CSP (next.config.ts).
 */
export function CallRail() {
  const src = process.env.NEXT_PUBLIC_CALLRAIL_SWAP_SRC;
  if (!src) return null;

  return <Script id="callrail-swap" strategy="afterInteractive" src={src} />;
}
