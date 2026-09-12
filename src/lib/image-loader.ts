import variants from "./image-variants.json";

type Manifest = Record<string, { widths: number[]; original: number }>;
const MANIFEST = variants as Manifest;

// Loader personalizado de next/image: sin el optimizador de Vercel, elige la
// variante pregenerada (scripts/generate-image-variants.mjs) más pequeña que
// cubra el ancho pedido, o el original. Las URLs remotas pasan sin cambios.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const entry = MANIFEST[src];
  if (!entry) return src;
  const w = entry.widths.find((candidate) => candidate >= width);
  if (!w) return src;
  return src.replace(/\.webp$/i, `-${w}.webp`);
}
