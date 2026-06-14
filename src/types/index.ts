import type { Locale } from "@/i18n/config";

export type { Locale };

export type ServiceCategory =
  | "medicina-general"
  | "salud-mujer"
  | "examenes"
  | "laboratorio"
  | "tratamientos";

/**
 * Servicio médico. Campos bilingües: el español es la base y cada campo
 * tiene su variante `*En`. La localización se resuelve con
 * `getLocalizedService` (fallback a español si falta el inglés).
 */
export interface Service {
  slug: string;
  order: number;
  category: ServiceCategory;
  /** Nombre de icono de lucide-react (PascalCase). */
  icon: string;
  highlighted?: boolean;

  // Español (base)
  title: string;
  shortDescription: string;
  description: string;
  keywords: string[];
  features: string[];
  longDescription: string;

  // Inglés
  titleEn: string;
  shortDescriptionEn: string;
  descriptionEn: string;
  keywordsEn: string[];
  featuresEn: string[];
  longDescriptionEn: string;
}

/** Servicio ya resuelto a un locale concreto. */
export interface LocalizedService {
  slug: string;
  order: number;
  category: ServiceCategory;
  icon: string;
  highlighted: boolean;
  title: string;
  shortDescription: string;
  description: string;
  keywords: string[];
  features: string[];
  longDescription: string;
}

/** DTO ligero para tarjetas (sin longDescription, seguro de serializar al cliente). */
export interface ServiceCardData {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  category: ServiceCategory;
  categoryLabel: string;
  /** Path de la foto de fondo (solo si el servicio ya tiene imagen). */
  image?: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
  questionEn: string;
  answerEn: string;
}

export interface LocalizedFaq {
  question: string;
  answer: string;
}

export interface Testimonial {
  author: string;
  rating: number;
  text: string;
  textEn: string;
  relativeTime?: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  cover: string;
  coverAlt: string;
  keywords?: string[];
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  readingMinutes: number;
  /** true si ya existe la imagen de portada en /images/blog/<slug>.webp */
  hasCover: boolean;
}

export interface NavLink {
  key: string;
  href: string;
}
