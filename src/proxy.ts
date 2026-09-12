import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next 16 renombró middleware.ts → proxy.ts. next-intl maneja la
// negociación de locale y los prefijos de ruta (as-needed).
const intl = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // /BLOG o /Services respondían 200: URLs duplicadas rastreables. Un 308 a
  // minúsculas deja una sola versión canónica por página.
  const lower = pathname.toLowerCase();
  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }
  return intl(request);
}

export const config = {
  // Excluye api, archivos internos de Next/Vercel y rutas con extensión.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
