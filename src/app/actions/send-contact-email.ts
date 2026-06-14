"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";
import { renderContactEmailHtml } from "@/emails/contact-email";
import { sendMetaLeadEvent } from "@/lib/meta-capi";
import { CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";

export interface ContactResult {
  ok: boolean;
  error?: "validation" | "send";
}

// Remitente configurable por env. Default = remitente de prueba de Resend
// (funciona sin verificar dominio; en modo prueba solo entrega a tu propio
// correo de la cuenta Resend). Para producción, verifica el dominio y define
// RESEND_FROM="Formulario Web <noreply@clinicahispanans4.com>".
const FROM =
  process.env.RESEND_FROM || "Clínica Hispana Nueva Salud Pasadena <onboarding@resend.dev>";

/**
 * Server action del formulario de contacto:
 * 1. Revalida con Zod (honeypot incluido).
 * 2. Envía el email con Resend.
 * 3. Dispara Meta CAPI (Lead) con el MISMO eventId del pixel cliente (dedup).
 * Si faltan credenciales (placeholders), omite ese paso sin fallar el flujo.
 */
export async function sendContactEmail(
  raw: unknown,
  eventId?: string,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "validation" };
  }
  const data = parsed.data;

  // Honeypot: descartar silenciosamente.
  if (data.company) {
    return { ok: true };
  }

  // 1) Email con Resend (si hay API key).
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: FROM,
        to: [CONTACT_INFO.email],
        replyTo: data.email || undefined,
        subject: `Nuevo cliente desde el sitio web — ${data.name}${
          data.service ? ` · ${data.service}` : ""
        }`,
        html: renderContactEmailHtml({
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          message: data.message,
        }),
      });
      if (error) {
        return { ok: false, error: "send" };
      }
    } catch {
      return { ok: false, error: "send" };
    }
  }

  // 2) Meta CAPI Lead (server-side, dedup con el pixel cliente).
  try {
    const h = await headers();
    await sendMetaLeadEvent({
      eventId,
      email: data.email,
      phone: data.phone,
      name: data.name,
      clientIp:
        h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
      userAgent: h.get("user-agent") ?? undefined,
      sourceUrl: `${SITE_CONFIG.baseUrl}/#contacto`,
    });
  } catch {
    // El tracking no debe romper el flujo del usuario.
  }

  return { ok: true };
}
