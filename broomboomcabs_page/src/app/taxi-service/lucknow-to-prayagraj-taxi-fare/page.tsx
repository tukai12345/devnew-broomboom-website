import React from "react";
import { Metadata } from "next";
import { LucknowToPrayagrajClient } from "./LucknowToPrayagrajClient";

export const metadata: Metadata = {
  title: "Lucknow to Prayagraj Taxi Fare — Lowest One-Way & Round-Trip Cabs | BroomBoom",
  description:
    "Book Lucknow to Prayagraj cab starting at ₹1,999 with BroomBoom. Transparent taxi fares, zero return fare on one-way drops, verified highway chauffeurs, clean AC Sedans & Innova Crysta for Triveni Sangam visits.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/taxi-service/lucknow-to-prayagraj-taxi-fare",
  },
  openGraph: {
    title: "Lucknow to Prayagraj Taxi Fare — Lowest Rates & Zero Return Charge",
    description:
      "Comfortable Lucknow to Prayagraj/Allahabad cab service via NH30 (approx 200 km, 4.5 hrs). One-way, round trip, airport transfer & Sangam darshan packages.",
    url: "https://dev.broomboomcabs.com/taxi-service/lucknow-to-prayagraj-taxi-fare",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function LucknowToPrayagrajPage() {
  return <LucknowToPrayagrajClient />;
}

