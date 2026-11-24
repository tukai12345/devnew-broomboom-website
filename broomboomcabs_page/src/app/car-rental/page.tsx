import React from "react";
import { Metadata } from "next";
import { ServiceCategoryClientPage } from "@/components/ServiceCategoryClientPage";

export const metadata: Metadata = {
  title: "Hourly Car Rental with Chauffeur — Flexible Local Packages | BroomBoom Cabs",
  description:
    "Rent AC cabs with verified chauffeur by the hour across India. Flexible 4hr, 8hr, and 12hr packages, unlimited city stops, zero surge pricing, and instant confirmation.",
  keywords:
    "hourly car rental, car rental with driver, local cab rental, 8 hr 80 km cab package, chauffeur driven car hire, full day taxi rental, local car hire with driver, city car rental india, broomboom hourly cabs",
  alternates: {
    canonical: "https://www.broomboomcabs.com/car-rental",
  },
  openGraph: {
    title: "Hourly Car Rental Across India | BroomBoom Cabs",
    description: "Book verified car rentals across India. Hourly packages with professional chauffeur and unlimited stops.",
    url: "https://www.broomboomcabs.com/car-rental",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hourly Car Rental Across India | BroomBoom Cabs",
    description: "Book verified car rentals across India. Hourly packages with professional chauffeur and unlimited stops.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CarRentalCategoryPage() {
  return <ServiceCategoryClientPage serviceId="rental" />;
}
