"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { openReserve, toggleMobileNav, closeMobileNav } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/private-dining", label: "Private" },
  { href: "/journal", label: "Journal" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const mobileOpen = useAppSelector((s) => s.ui.mobileNavOpen);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-cream/85 backdrop-blur-md">
      <div className="container-wide flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-[1.65rem] leading-none tracking-tight text-ink md:text-[1.85rem]"
          onClick={() => dispatch(closeMobileNav())}
        >
          Maison Verdant
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[var(--text-sm)] tracking-[0.06em] transition-colors",
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-primary hidden sm:inline-flex"
            onClick={() => dispatch(openReserve())}
          >
            Reserve
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => dispatch(toggleMobileNav())}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-line bg-cream lg:hidden">
          <nav
            className="container-wide flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-[var(--text-lg)] font-display"
                onClick={() => dispatch(closeMobileNav())}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservations"
              className="py-3 text-[var(--text-lg)] font-display"
              onClick={() => dispatch(closeMobileNav())}
            >
              Reservations
            </Link>
            <button
              type="button"
              className="btn btn-primary mt-2 w-full"
              onClick={() => dispatch(openReserve())}
            >
              Reserve a table
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
