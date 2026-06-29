"use client";

import { usePathname } from "next/navigation";
import { LocationSelector } from "@/components/LocationSelector";

export function LocationSelectorConditional() {
  const pathname = usePathname();

  if (!pathname.startsWith("/kategori/")) {
    return null;
  }

  return <LocationSelector />;
}
