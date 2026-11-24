import React from "react";
import { Metadata } from "next";
import { TaxiServiceDirectoryClient } from "./TaxiServiceDirectoryClient";

export const metadata: Metadata = {
  title: "Taxi Service in India — 24x7 Online Cab Booking & Intercity Rides | BroomBoom Cabs",
  description:
    "Find verified 24x7 taxi services across India. Book local city taxis, one-way outstation cabs, airport rides, and pet-friendly cabs with polite commercial chauffeurs.",
  keywords:
    "taxi service india, online taxi booking, 24x7 cab service, city taxi service, book cab online india, reliable taxi provider, pet friendly taxi, commercial taxi booking, broomboom taxi service",
  alternates: {
    canonical: "https://www.broomboomcabs.com/taxi-service",
  },
  openGraph: {
    title: "All India Taxi Service & Online Cab Booking | BroomBoom Cabs",
    description:
      "Reliable AC Hatchbacks, Sedans & SUVs with verified commercial chauffeurs. Fast doorstep pickup, zero cancellation, and guaranteed lowest rates.",
    url: "https://www.broomboomcabs.com/taxi-service",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All India Taxi Service & Online Cab Booking | BroomBoom Cabs",
    description:
      "Reliable AC Hatchbacks, Sedans & SUVs with verified chauffeurs. Fast doorstep pickup & guaranteed lowest rates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TaxiServicePage() {
  return <TaxiServiceDirectoryClient />;
}
