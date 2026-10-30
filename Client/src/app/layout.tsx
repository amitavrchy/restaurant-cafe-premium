import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileReserveBar } from "@/components/layout/MobileReserveBar";
import { ReservationDrawer } from "@/components/reserve/ReservationDrawer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Maison Verdant",
    template: "%s · Maison Verdant",
  },
  description:
    "Fine dining and all-day café. An evening composed like a tasting menu.",
  openGraph: {
    title: "Maison Verdant",
    description:
      "Fine dining and all-day café. An evening composed like a tasting menu.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <AppProviders>
          <SiteHeader />
          <main className="flex-1 pt-[var(--header-h)] pb-20 md:pb-0">
            {children}
          </main>
          <SiteFooter />
          <MobileReserveBar />
          <ReservationDrawer />
        </AppProviders>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Maison Verdant",
              servesCuisine: ["French", "Contemporary"],
              priceRange: "$$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "18 Rue des Jardins",
                addressLocality: "Paris",
                postalCode: "75004",
                addressCountry: "FR",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "12:00",
                  closes: "15:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "18:00",
                  closes: "22:00",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
