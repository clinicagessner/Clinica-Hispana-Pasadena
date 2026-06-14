import { cva, type VariantProps } from "class-variance-authority";

/**
 * Estilos de CTA de marketing (links/botones grandes, estética editorial).
 * Para los formularios y UI fina se usan los componentes de @/components/ui.
 */
export const ctaButton = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-dark text-white shadow-sm hover:bg-blue-deep hover:shadow-md focus-visible:ring-blue-primary",
        gold: "bg-teal text-slate-dark shadow-sm hover:bg-teal-deep hover:text-white focus-visible:ring-teal",
        red: "bg-red-accent text-white shadow-sm hover:bg-red-dark focus-visible:ring-red-accent",
        outline:
          "border border-blue-primary/70 text-blue-dark hover:bg-sky-bg focus-visible:ring-blue-primary",
        white:
          "bg-white text-blue-dark shadow-sm hover:bg-sky-bg focus-visible:ring-white",
        ghost: "text-blue-dark hover:bg-sky-bg focus-visible:ring-blue-primary",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type CtaButtonProps = VariantProps<typeof ctaButton>;
