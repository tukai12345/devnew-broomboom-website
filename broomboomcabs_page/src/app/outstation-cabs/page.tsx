import React from "react";
import { Metadata } from "next";
import { ServiceCategoryClientPage } from "@/components/ServiceCategoryClientPage";

export const metadata: Metadata = {
  title: "Outstation Cabs Across India — Lowest Fares & Zero Return Fare | BroomBoom Cabs",
  description:
    "Book verified one-way and round-trip outstation cabs across 100+ cities in India. Zero return fare, clean AC cars, professional highway chauffeurs, and 24x7 support.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/outstation-cabs",
  },
  openGraph: {
    title: "Outstation Cabs Across India — Lowest Fares | BroomBoom Cabs",
    description: "Book verified outstation cabs across India. One-way & round-trip intercity taxi at zero return fare.",
    url: "https://dev.broomboomcabs.com/outstation-cabs",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  robots: 'noindex, nofollow',
};

export default function OutstationCategoryPage() {
  return <ServiceCategoryClientPage serviceId="outstation" />;
}
