// Genera variantes reducidas de las imágenes de public/images para que
// next/image pueda emitir srcset sin el optimizador de Vercel (cuota agotada,
// /_next/image devuelve 402). Escribe src/lib/image-variants.json, que usa
// src/lib/image-loader.ts para saber qué anchos existen por imagen.
// Uso: node scripts/generate-image-variants.mjs  (se ejecuta en prebuild)
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("public/images");
const WIDTHS = [256, 384, 512, 640, 828];
const manifest = {};

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.webp$/i.test(entry.name) && !/-\d+\.webp$/i.test(entry.name)) await variants(full);
  }
}

async function variants(file) {
  const { width } = await sharp(file).metadata();
  if (!width) return;
  const key = "/images/" + path.relative(ROOT, file).split(path.sep).join("/");
  const made = [];
  for (const w of WIDTHS) {
    if (w >= width) continue;
    const out = file.replace(/\.webp$/i, `-${w}.webp`);
    const srcStat = await fs.stat(file);
    const outStat = await fs.stat(out).catch(() => null);
    if (!outStat || outStat.mtimeMs < srcStat.mtimeMs) {
      await sharp(file).resize({ width: w }).webp({ quality: 78 }).toFile(out);
    }
    made.push(w);
  }
  if (made.length) manifest[key] = { widths: made, original: width };
}

await walk(ROOT);
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile("src/lib/image-variants.json", JSON.stringify(sorted, null, 2) + "\n");
console.log(`image variants: ${Object.keys(sorted).length} sources`);
