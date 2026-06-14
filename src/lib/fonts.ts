import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

// Fraunces → titulares (variable --font-heading). Serif óptica, cálida y
// confiable: da una identidad editorial distinta a la familia.
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  // Fuente variable: omitimos `weight` para cubrir todo el rango (400–900)
  // y habilitamos los ejes ópticos para titulares con carácter editorial.
  axes: ["opsz", "SOFT"],
});

// Plus Jakarta Sans → cuerpo (variable --font-sans). Humanista moderna,
// muy legible y amable para una clínica.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Clase combinada para aplicar en <html>
export const fontVariables = `${fraunces.variable} ${jakarta.variable}`;
