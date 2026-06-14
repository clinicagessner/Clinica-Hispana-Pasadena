"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type FbqWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};

/**
 * Dispara PageView de Meta SOLO en cambios de ruta (SPA). No carga el pixel:
 * de eso se encarga MetaPixel (script crudo en el layout). Evita duplicar el
 * PageView inicial que ya emite el script base.
 */
export function MetaPixelSPATracker() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const w = window as FbqWindow;
    if (typeof w.fbq === "function") {
      w.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
