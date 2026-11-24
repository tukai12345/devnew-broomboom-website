import React from "react";
import { Metadata } from "next";
import { MallDirectoryClient } from "./MallDirectoryClient";

export const metadata: Metadata = {
  title: "Kolkata Shopping Malls Taxi Service — Quest, City Centre, South City & Acropolis | BroomBoom Cabs",
  description:
    "Book hourly rental cabs and point-to-point taxis to Kolkata's premier shopping malls. Zero parking hassle, spacious boot space for shopping bags, and AC waiting during movies & dining.",
  keywords:
    "kolkata shopping mall taxi, quest mall cab service, city centre salt lake taxi, south city mall cab, acropolis mall taxi kolkata, shopping car rental kolkata, hourly cab for shopping kolkata, avani mall cab",
  alternates: {
    canonical: "https://www.broomboomcabs.com/taxi-service-shoppingmalls-kolkata",
  },
  openGraph: {
    title: "Kolkata Shopping Malls Taxi Service | BroomBoom Cabs",
    description:
      "Comfortable city cabs and hourly rentals for shopping sprees, family dining, and cinema visits at Kolkata's premier malls.",
    url: "https://www.broomboomcabs.com/taxi-service-shoppingmalls-kolkata",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kolkata Shopping Malls Taxi Service | BroomBoom Cabs",
    description:
      "Comfortable city cabs and hourly rentals for shopping sprees and dining at Kolkata's premier malls.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShoppingMallDirectoryPage() {
  return <MallDirectoryClient />;
}
