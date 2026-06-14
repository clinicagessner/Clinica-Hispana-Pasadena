import crypto from "node:crypto";

function sha256(value?: string): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function hashPhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  return crypto.createHash("sha256").update(digits).digest("hex");
}

export interface MetaLeadParams {
  eventId?: string;
  email?: string;
  phone?: string;
  name?: string;
  clientIp?: string;
  userAgent?: string;
  sourceUrl: string;
}

/**
 * Dispara el evento Lead server-side a Meta Conversions API (Graph v21.0).
 * PII hasheada con SHA-256. Usa el mismo eventId que el pixel cliente para
 * deduplicar. No-op si faltan las credenciales (placeholders hasta config).
 */
export async function sendMetaLeadEvent(params: MetaLeadParams): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) return;

  const [firstName, ...rest] = (params.name ?? "").trim().split(/\s+/);
  const lastName = rest.join(" ");

  const userData: Record<string, unknown> = {
    em: sha256(params.email) ? [sha256(params.email)] : undefined,
    ph: hashPhone(params.phone) ? [hashPhone(params.phone)] : undefined,
    fn: sha256(firstName) ? [sha256(firstName)] : undefined,
    ln: sha256(lastName) ? [sha256(lastName)] : undefined,
    client_ip_address: params.clientIp,
    client_user_agent: params.userAgent,
  };

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: params.eventId,
        action_source: "website",
        event_source_url: params.sourceUrl,
        user_data: userData,
      },
    ],
  };

  const testCode = process.env.META_TEST_EVENT_CODE;
  if (testCode) body.test_event_code = testCode;

  await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}
