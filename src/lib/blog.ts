import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost, Locale } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

// Posts que YA tienen portada en /public/images/blog/<slug>.webp.
// Vacío por ahora: el cliente entregará las portadas. Mientras tanto la card
// usa el fallback de CSS. Agregar el slug aquí cuando exista la imagen.
const BLOG_IMAGE_SLUGS = new Set<string>([
  "bienvenidos-clinica-hispana-nueva-salud",
  "atencion-medica-sin-seguro-pasadena",
  "control-diabetes-pasadena-guia-pacientes",
  "examen-dot-cdl-camioneros-pasadena",
  "ginecologos-hispanos-pasadena-hablan-espanol",
  "guia-examen-medico-inmigracion-i693-pasadena",
  "laboratorio-clinico-pasadena-analisis-sangre",
  "medicos-autorizados-uscis-pasadena-civil-surgeon",
  "salud-mujer-pasadena-servicios-ginecologia",
]);

function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// El parser quita el "# Title" inicial: la página ya emite el título del
// frontmatter como h1.
function stripLeadingTitle(content: string): string {
  return content.replace(/^\s*#\s+.*(\r?\n)+/, "");
}

/** Slugs enumerados SIEMPRE desde el directorio es/. */
export function getPostSlugs(): string[] {
  const esDir = path.join(BLOG_DIR, "es");
  if (!fs.existsSync(esDir)) return [];
  return fs
    .readdirSync(esDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPost(slug: string, locale: Locale): BlogPost | undefined {
  const localized = path.join(BLOG_DIR, locale, `${slug}.md`);
  const fallback = path.join(BLOG_DIR, "es", `${slug}.md`);
  const target = fs.existsSync(localized)
    ? localized
    : fs.existsSync(fallback)
      ? fallback
      : null;
  if (!target) return undefined;

  const raw = fs.readFileSync(target, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;
  const body = stripLeadingTitle(content);

  const hasCover = BLOG_IMAGE_SLUGS.has(slug);
  return {
    ...fm,
    slug,
    content: body,
    readingMinutes: readingMinutes(body),
    hasCover,
    // La portada se deriva del slug para que siempre apunte al archivo real
    // (/images/blog/<slug>.webp), ignorando el `cover` del frontmatter.
    cover: hasCover ? `/images/blog/${slug}.webp` : fm.cover,
  };
}

export function getAllPosts(locale: Locale): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPost(slug, locale))
    .filter((p): p is BlogPost => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecentPosts(locale: Locale, count = 3): BlogPost[] {
  return getAllPosts(locale).slice(0, count);
}
