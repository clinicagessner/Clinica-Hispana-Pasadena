"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendContactEmail } from "@/app/actions/send-contact-email";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { CONTACT_INFO } from "@/lib/constants";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

type FbqWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};

export function ContactForm({
  services,
}: {
  services: { value: string; label: string }[];
}) {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    // Valida cada campo al salir de él (blur) la primera vez y, una vez con
    // error, actualiza en vivo mientras el usuario corrige. Muestra los errores
    // sin forzarlos mientras aún escribe.
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
      company: "",
    },
  });

  // Tras enviar con éxito, volver al formulario vacío a los pocos segundos.
  useEffect(() => {
    if (status !== "success") return;
    const id = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(id);
  }, [status]);

  async function onSubmit(values: ContactInput) {
    setStatus("idle");
    const eventId = crypto.randomUUID();

    try {
      // Pixel cliente (dedup con CAPI server vía eventID)
      const w = window as FbqWindow;
      if (typeof w.fbq === "function") {
        w.fbq("track", "Lead", { content_name: "Contact Form" }, { eventID: eventId });
      }

      const result = await sendContactEmail(values, eventId);
      if (result.ok) {
        reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      // Cualquier fallo inesperado (red, server action) muestra error en vez
      // de dejar el formulario sin respuesta.
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-blue-light bg-white p-10 text-center shadow-sm">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-light text-blue-primary">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-heading text-xl font-bold text-slate-dark">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-slate-primary">{t("successBody")}</p>
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className={cn(ctaButton({ variant: "outline", size: "md" }), "mt-6")}
        >
          <Phone className="h-4 w-4" />
          {CONTACT_INFO.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-blue-light bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Honeypot oculto */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label={t("nameLabel")}
          invalid={!!errors.name}
          error={errors.name ? t("errorName") : undefined}
        >
          <Input
            id="name"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            className="h-11"
            {...register("name")}
          />
        </Field>

        <Field
          id="phone"
          label={t("phoneLabel")}
          invalid={!!errors.phone}
          error={errors.phone ? t("errorPhone") : undefined}
        >
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            aria-invalid={!!errors.phone}
            className="h-11"
            {...register("phone", {
              onChange: (e) => {
                // Solo dígitos, máximo 10 (teléfono de EE. UU.).
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
              },
            })}
          />
        </Field>

        <Field
          id="email"
          label={t("emailLabel")}
          invalid={!!errors.email}
          error={errors.email ? t("errorEmail") : undefined}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            className="h-11"
            {...register("email")}
          />
        </Field>

        <Field id="service" label={t("serviceLabel")}>
          <select
            id="service"
            className="h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-slate-dark outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            {...register("service")}
          >
            <option value="">{t("serviceGeneral")}</option>
            {services.map((s) => (
              <option key={s.value} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="message"
          label={`${t("messageLabel")} (${t("optional")})`}
          invalid={!!errors.message}
        >
          <Textarea
            id="message"
            rows={4}
            placeholder={t("messagePlaceholder")}
            aria-invalid={!!errors.message}
            {...register("message")}
          />
        </Field>
      </div>

      {status === "error" && (
        <div className="mt-5 rounded-lg border border-red-light bg-red-bg px-4 py-3 text-sm text-red-dark">
          <strong className="font-semibold">{t("errorTitle")}.</strong>{" "}
          {t("errorBody")}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(ctaButton({ size: "lg" }), "mt-6 w-full")}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {t("submit")}
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  invalid,
  error,
  children,
}: {
  id: string;
  label: string;
  invalid?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label
        htmlFor={id}
        className={cn("mb-1.5 text-slate-dark", invalid && "text-red-accent")}
      >
        {label}
      </Label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-accent">{error}</p>
      ) : null}
    </div>
  );
}
