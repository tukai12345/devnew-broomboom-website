import React from "react";
import { Metadata } from "next";
import { ServiceCategoryClientPage } from "@/components/ServiceCategoryClientPage";

export const metadata: Metadata = {
  title: "Hourly Car Rentals Across India — Flexible Chauffeur Packages | BroomBoom Cabs",
  description:
    "Book hourly car rentals with verified chauffeurs across 100+ cities in India. 5hr to 12hr packages, unlimited stops, transparent pricing, and 24x7 support.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/car-rental",
  },
  openGraph: {
    title: "Hourly Car Rentals Across India | BroomBoom Cabs",
    description: "Book verified car rentals across India. Hourly packages with professional chauffeur and unlimited stops.",
    url: "https://dev.broomboomcabs.com/car-rental",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function CarRentalCategoryPage() {
  return <ServiceCategoryClientPage serviceId="rental" />;
}
