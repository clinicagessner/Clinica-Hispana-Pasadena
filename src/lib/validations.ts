import { z } from "zod";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Campos siempre presentes (el form los inicializa en "") para que el tipo
// de entrada y salida de Zod coincidan (evita conflictos con zodResolver).
export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "min" }).max(100, { message: "max" }),
  // Teléfono de EE. UU.: exactamente 10 dígitos (el input solo deja escribir dígitos).
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: "invalid" }),
  // Email obligatorio y con formato válido.
  email: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .max(120)
    .regex(EMAIL_RE, { message: "invalid" }),
  service: z.string().trim().max(140),
  // Mensaje opcional: puede ir vacío.
  message: z.string().trim().max(2000, { message: "max" }),
  // Honeypot anti-spam: debe quedar vacío.
  company: z.string().max(0),
});

export type ContactInput = z.infer<typeof contactSchema>;
