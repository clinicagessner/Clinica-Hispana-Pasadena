import {
  Activity,
  Baby,
  Bandage,
  Beaker,
  ClipboardCheck,
  ClipboardList,
  Droplet,
  Droplets,
  FlaskConical,
  Flower2,
  Footprints,
  HeartPulse,
  Leaf,
  Mars,
  Pill,
  ScanLine,
  Scissors,
  ShieldCheck,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Tablets,
  TestTube,
  TestTubes,
  Thermometer,
  Truck,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mapa curado: solo los iconos que usan los servicios (evita importar
// toda la librería y conserva el tree-shaking).
const ICONS: Record<string, LucideIcon> = {
  Activity,
  Baby,
  Bandage,
  Beaker,
  ClipboardCheck,
  ClipboardList,
  Droplet,
  Droplets,
  FlaskConical,
  Flower2,
  Footprints,
  HeartPulse,
  Leaf,
  Mars,
  Pill,
  ScanLine,
  Scissors,
  ShieldCheck,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Tablets,
  TestTube,
  TestTubes,
  Thermometer,
  Truck,
  Wind,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Stethoscope;
  return <Icon className={cn("h-6 w-6", className)} aria-hidden="true" />;
}
