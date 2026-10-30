import type { Metadata } from "next";
import { MenuPageClient } from "@/components/menu/MenuPageClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Lunch, dinner, tasting, café, and wine at Maison Verdant — with dietary filters.",
};

export default function MenuPage() {
  return <MenuPageClient />;
}
