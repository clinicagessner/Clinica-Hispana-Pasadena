import type { ReactNode } from "react";

// Passthrough: el chrome de la landing vive en (landing)/layout.tsx.
export default function ComparacionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
