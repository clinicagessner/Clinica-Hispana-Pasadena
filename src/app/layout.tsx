import "./globals.css";
import type { ReactNode } from "react";

// Passthrough mínimo: el layout real (html, body, fuentes, providers,
// tracking, JSON-LD) vive en src/app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
