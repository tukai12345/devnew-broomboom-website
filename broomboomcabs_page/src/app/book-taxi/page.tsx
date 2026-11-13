import React, { Suspense } from "react";
import { Metadata } from "next";
import { FleetClientPage } from "@/app/fleet/FleetClientPage";

export const metadata: Metadata = {
  title: "Book Taxi Online | Lowest Cab Fares Across India — BroomBoom Cabs",
  description:
    "Book verified outstation, local rental, and airport taxi service online. Zero return fare on one-way trips, instant confirmation, 100% sanitized AC cabs & 24x7 helpline.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/book-taxi",
  },
  openGraph: {
    title: "Book Taxi Online | BroomBoom Cabs",
    description: "Search and book verified cabs across India at guaranteed lowest fares.",
    url: "https://dev.broomboomcabs.com/book-taxi",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
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
