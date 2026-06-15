// Genera la imagen OG a partir del logo real transparente
// (public/logo-nueva-salud.png). Reproducible:
//   node scripts/generate-assets.mjs
// NOTA: los favicons / iconos PWA los provee el cliente
// (src/app/{icon,apple-icon,favicon.ico}, public/web-app-manifest-*).
import sharp from "sharp";

const LOGO = "public/logo-nueva-salud.png";
const BLUE = "#1565c0";
const BLUE_DEEP = "#0b2a4a";
const TEAL = "#0e9aa7";
const RED = "#d32f2f";

const logo = await sharp(LOGO).resize(380, 380).toBuffer();
const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${BLUE_DEEP}"/><stop offset="1" stop-color="${BLUE}"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1060" cy="120" r="220" fill="${TEAL}" opacity="0.20"/>
  <circle cx="160" cy="560" r="180" fill="${RED}" opacity="0.16"/>
  <text x="540" y="300" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="800" fill="#ffffff">Nueva Salud</text>
  <text x="540" y="362" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#7fe3ec">Pasadena, TX</text>
  <text x="120" y="560" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#cfe2f6">Atención médica 100% en español · Sin cita · Sin seguro necesario</text>
</svg>`);
await sharp(bg)
  .composite([{ input: logo, top: 125, left: 110 }])
  .png()
  .toFile("public/images/og/og-default.png");
console.log("wrote public/images/og/og-default.png");
