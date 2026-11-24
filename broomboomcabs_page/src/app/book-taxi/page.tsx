import React, { Suspense } from "react";
import { Metadata } from "next";
import { FleetClientPage } from "@/app/fleet/FleetClientPage";

export const metadata: Metadata = {
  title: "Book Taxi Online — Guaranteed Lowest Fares Across India | BroomBoom Cabs",
  description:
    "Book verified outstation, local hourly rental, and airport taxi service online. Zero return fare on one-way trips, instant confirmation, 100% sanitized AC cabs & 24x7 support.",
  keywords:
    "book taxi online, online cab booking, instant taxi reservation, cheap cab booking india, online car booking with driver, lowest fare cab booking, sanitized ac taxi booking, advance cab booking app",
  alternates: {
    canonical: "https://www.broomboomcabs.com/book-taxi",
  },
  openGraph: {
    title: "Book Taxi Online | BroomBoom Cabs",
    description: "Search and book verified cabs across India at guaranteed lowest fares.",
    url: "https://www.broomboomcabs.com/book-taxi",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Taxi Online | BroomBoom Cabs",
    description: "Search and book verified cabs across India at guaranteed lowest fares.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookTaxiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold text-sm">
          Loading BroomBoom Booking Engine...
        </div>
      }
    >
      <FleetClientPage />
    </Suspense>
  );
}
