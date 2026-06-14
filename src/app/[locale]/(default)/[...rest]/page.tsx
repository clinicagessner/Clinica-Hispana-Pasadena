import { notFound } from "next/navigation";

// Catch-all dentro del grupo (default): cualquier ruta no resuelta → 404.
export default function CatchAllPage() {
  notFound();
}
