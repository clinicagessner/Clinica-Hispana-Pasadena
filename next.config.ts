import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// CSP estricta con allowlist de terceros: Meta Pixel/CAPI, GA/GTM, Google Ads,
// Google Maps, CallRail y Vercel Analytics. Si agregas un script/fetch de
// tercero nuevo, extiende la directiva correspondiente o se bloqueará en prod.
// React necesita eval() SOLO en desarrollo (nunca en producción).
const isDev = process.env.NODE_ENV === "development";
const scriptEval = isDev ? " 'unsafe-eval'" : "";
// HMR de Turbopack y herramientas locales (Console Ninja) usan WebSockets a
// localhost SOLO en desarrollo. En producción no se añade nada.
const connectDev = isDev
  ? " ws://127.0.0.1:* ws://localhost:* http://127.0.0.1:* http://localhost:*"
  : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${scriptEval} https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://www.google.com https://googleads.g.doubleclick.net https://js.callrail.com https://cdn.callrail.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${connectDev} https://graph.facebook.com https://connect.facebook.net https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://places.googleapis.com https://maps.googleapis.com https://js.callrail.com https://api.callrail.com https://vitals.vercel-insights.com https://va.vercel-scripts.com`,
  "frame-src 'self' https://www.google.com https://maps.google.com https://td.doubleclick.net https://www.facebook.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Optimizador de Vercel desactivado: la cuenta tiene topada la cuota de Image
    // Optimization (/_next/image devuelve 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
    // y las imágenes nuevas no cargan en prod). Servimos los originales de public/,
    // ya comprimidos a mano (webp q80 + png pngquant/oxipng).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "places.googleapis.com" },
      { protocol: "https", hostname: "maps.googleapis.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
