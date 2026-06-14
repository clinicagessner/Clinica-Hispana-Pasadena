import sharp from "sharp";

const SRC = "_assets/logo.webp";
const meta = await sharp(SRC).metadata();
const side = Math.min(meta.width, meta.height);

function circleMask(size) {
  const r = size / 2;
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`,
  );
}

async function make(size, out) {
  const base = await sharp(SRC)
    .resize(side, side, { fit: "cover", position: "center" })
    .resize(size, size)
    .ensureAlpha()
    .toBuffer();
  const masked = await sharp(base)
    .composite([{ input: circleMask(size), blend: "dest-in" }])
    .png()
    .toBuffer();
  if (out.endsWith(".webp")) {
    await sharp(masked).webp({ quality: 92 }).toFile(out);
  } else {
    await sharp(masked).png().toFile(out);
  }
  console.log("wrote", out);
}

await make(512, "public/logo-nueva-salud.webp");
await make(512, "public/logo-nueva-salud.png");
await make(192, "public/web-app-manifest-192x192.png");
await make(512, "public/web-app-manifest-512x512.png");
// App icons (Next metadata file conventions)
await make(512, "src/app/icon.png");
await make(180, "src/app/apple-icon.png");
