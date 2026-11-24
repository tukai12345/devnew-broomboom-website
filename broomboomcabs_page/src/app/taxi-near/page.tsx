import React from "react";
import { Metadata } from "next";
import { TaxiNearHubClient } from "./TaxiNearHubClient";

export const metadata: Metadata = {
  title: "Taxi Near Me — Fast 3-Minute Doorstep Pickup & 24x7 Local Cabs | BroomBoom Cabs",
  description:
    "Find and book the nearest available taxi in 3 to 8 minutes. AC Hatchbacks, Sedans, and SUVs with zero peak-hour surge pricing and verified local chauffeurs across India.",
  keywords:
    "taxi near me, cab near me, nearest taxi service, book taxi near me now, local cab near me, 24 hour taxi near me, fast cab pickup nearby, taxi cab booking near me, emergency cab near me",
  alternates: {
    canonical: "https://www.broomboomcabs.com/taxi-near",
  },
  openGraph: {
    title: "Taxi Near Me — 24x7 Cab Booking & Rapid Pickup | BroomBoom Cabs",
    description:
      "Instant cab booking near you with live pilot dispatch. Reliable local taxi rides with zero cancellation and clear per-km billing.",
    url: "https://www.broomboomcabs.com/taxi-near",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi Near Me — 24x7 Cab Booking & Rapid Pickup | BroomBoom Cabs",
    description:
      "Instant cab booking near you with live pilot dispatch. Reliable local taxi rides with zero cancellation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TaxiNearPage() {
  return <TaxiNearHubClient />;
}
