import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

// Wrappers locale-aware: usar estos Link/redirect/usePathname/useRouter
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
