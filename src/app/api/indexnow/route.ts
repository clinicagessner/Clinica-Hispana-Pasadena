import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Ping a IndexNow (Bing, Yandex, etc.) para notificar URLs nuevas/actualizadas.
 * Requiere INDEXNOW_KEY en .env y el archivo de verificación servido en
 * /public/<INDEXNOW_KEY>.txt (cuyo contenido es la propia key).
 *
 * Body opcional: { "urls": ["https://.../a", "https://.../b"] }
 * Sin body, envía la home.
 */
export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY no configurada" },
      { status: 500 },
    );
  }

  const host = new URL(SITE_CONFIG.baseUrl).host;

  let urlList: string[] = [];
  try {
    const body = (await request.json()) as { urls?: unknown };
    if (Array.isArray(body?.urls)) {
      urlList = body.urls.filter((u): u is string => typeof u === "string");
    }
  } catch {
    // sin body válido → se usa el fallback
  }
  if (urlList.length === 0) urlList = [SITE_CONFIG.baseUrl];

  const payload = {
    host,
    key,
    keyLocation: `${SITE_CONFIG.baseUrl}/${key}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return NextResponse.json({ submitted: urlList.length, status: res.status });
}
