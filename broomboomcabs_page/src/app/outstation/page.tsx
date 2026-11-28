import React from "react";
import { Metadata } from "next";
import { ServiceCategoryClientPage } from "@/components/ServiceCategoryClientPage";

export const metadata: Metadata = {
  title: "Outstation Cabs Across India — Lowest One-Way Fares & Zero Return Fare | BroomBoom Cabs",
  description:
    "Book verified one-way and round-trip outstation cabs across 100+ cities in India. Zero return fare, clean AC sedans & SUVs, verified highway chauffeurs, and 24x7 support.",
  keywords:
    "outstation cab, one way cab, outstation taxi booking, intercity cab service, zero return fare cab, outstation round trip taxi, best outstation cabs india, highway cab booking, outstation car rental with driver",
  alternates: {
    canonical: "https://www.broomboomcabs.com/outstation",
  },
  openGraph: {
    title: "Outstation Cabs Across India — Lowest Fares | BroomBoom Cabs",
    description:
      "Book verified outstation cabs across India. One-way & round-trip intercity taxi at zero return fare.",
    url: "https://www.broomboomcabs.com/outstation",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outstation Cabs Across India — Lowest Fares | BroomBoom Cabs",
    description:
      "Book verified outstation cabs across India. One-way & round-trip intercity taxi at zero return fare.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OutstationPage() {
  return <ServiceCategoryClientPage serviceId="outstation" />;
}
