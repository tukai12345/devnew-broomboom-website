import React from "react";
import { Metadata } from "next";
import { MallDirectoryClient } from "./MallDirectoryClient";

export const metadata: Metadata = {
  title: "Kolkata Shopping Malls Taxi Service | City Centre 1, Quest, Avani, Acropolis - BroomBoom Cabs",
  description:
    "Book hourly rental cabs and point-to-point taxis to Kolkata's top shopping malls: City Centre 1 Salt Lake, Quest Mall Ballygunge, Avani Riverside Mall Howrah, and Acropolis Mall Kasba. Zero parking delays, spacious boot space for shopping bags, and AC waiting during movies & dining.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/taxi-service-shoppingmalls-kolkata",
  },
  openGraph: {
    title: "Kolkata Shopping Malls Taxi Service | BroomBoom Cabs",
    description:
      "Comfortable city cabs and hourly rentals for shopping sprees, family dining, and cinema visits at Kolkata's premier malls.",
    url: "https://dev.broomboomcabs.com/taxi-service-shoppingmalls-kolkata",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function ShoppingMallDirectoryPage() {
  return <MallDirectoryClient />;
}
