import React from "react";
import { Metadata } from "next";
import { TaxiNearHubClient } from "./TaxiNearHubClient";

export const metadata: Metadata = {
  title: "Taxi Near Me — 24x7 Cab Booking & Fast Local Pickup | BroomBoom Cabs",
  description:
    "Find and book the nearest available taxi in 3 to 8 minutes. AC Hatchbacks, Sedans, and SUVs with zero peak-hour surge pricing and verified local chauffeurs across India.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/taxi-near",
  },
  openGraph: {
    title: "Taxi Near Me — 24x7 Cab Booking & Rapid Pickup | BroomBoom Cabs",
    description:
      "Instant cab booking near you with live pilot dispatch. Reliable local taxi rides with zero cancellation and clear per-km billing.",
    url: "https://dev.broomboomcabs.com/taxi-near",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function TaxiNearPage() {
  return <TaxiNearHubClient />;
}
