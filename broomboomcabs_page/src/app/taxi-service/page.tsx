import React from "react";
import { Metadata } from "next";
import { TaxiServiceDirectoryClient } from "./TaxiServiceDirectoryClient";

export const metadata: Metadata = {
  title: "Taxi Service in India | Online Cab Booking & Car Rental | BroomBoom Cabs",
  description:
    "Book 24x7 verified taxi service across 100+ Indian cities. Lowest one-way outstation cab fares with zero return fare, airport transfers, hourly rentals, pet-friendly cabs, and self-drive cars.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/taxi-service",
  },
  openGraph: {
    title: "All India Taxi Service & Online Cab Booking | BroomBoom Cabs",
    description:
      "Reliable AC Hatchbacks, Sedans & SUVs with verified commercial chauffeurs. Fast doorstep pickup, zero cancellation, and guaranteed lowest rates.",
    url: "https://dev.broomboomcabs.com/taxi-service",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function TaxiServicePage() {
  return <TaxiServiceDirectoryClient />;
}
