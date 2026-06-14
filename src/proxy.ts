import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next 16 renombró middleware.ts → proxy.ts. next-intl maneja la
// negociación de locale y los prefijos de ruta (as-needed).
export default createMiddleware(routing);

export const config = {
  // Excluye api, archivos internos de Next/Vercel y rutas con extensión.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
