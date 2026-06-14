# Clínica Hispana Nueva Salud Pasadena

Sitio web bilingüe (español por defecto, inglés bajo `/en`) de **Clínica Hispana
Nueva Salud Pasadena**, clínica médica hispana en Pasadena, TX (área de Houston).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 (`@theme inline` en
`globals.css`, sin `tailwind.config`) · shadcn/ui sobre Base UI · next-intl 4 ·
react-hook-form + Zod · Resend · GA4/Meta Pixel/Google Ads · Vercel Analytics.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000  (es)  ·  /en (inglés)
npm run build    # incluye type-check
npm run lint
```

## Convenciones

- Server Components por defecto; `"use client"` solo cuando hace falta. **No** `"use cache"`.
- i18n: middleware en `src/proxy.ts`; `<Link>` siempre desde `@/i18n/navigation`.
- Colores por variables/utilidades CSS de la paleta (azul `#1565C0`, rojo `#D32F2F`,
  turquesa `#0E9AA7`). Nunca hex hardcodeado ni `bg-white` en secciones.
- Imágenes: solo rutas en `/public/images/...` + `alt`; el cliente entrega las fotos.
  Mientras tanto, fallbacks CSS (sets `SERVICE_IMAGE_SLUGS` / `BLOG_IMAGE_SLUGS` vacíos).
- Secretos solo en `.env.local` (ver `.env.example`).

## Pendientes del cliente

`GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`, horario por día, credenciales reales
(Resend, Meta, GA4, Ads), verificación de dominio en Resend, token de Search Console,
logo real e imágenes personalizadas.

---

Desarrollado por [RC Web Solutions LLC](https://rcweb.dev).
