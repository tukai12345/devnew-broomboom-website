import React from "react";
import { Metadata } from "next";
import { ServiceCategoryClientPage } from "@/components/ServiceCategoryClientPage";

export const metadata: Metadata = {
  title: "Airport Cabs & Taxi Transfers Across India — On-Time Guaranteed | BroomBoom Cabs",
  description:
    "Pre-book dependable airport taxi pickups & drops across 100+ airports in India. 100% on-time guarantee, live flight delay tracking, 45-min free wait time, and zero surge.",
  keywords:
    "airport cab, airport taxi booking, prepaid airport taxi, airport pickup and drop, airport transfer cab, book airport cab online, flight delay wait airport taxi, domestic airport cab service, terminal drop taxi",
  alternates: {
    canonical: "https://www.broomboomcabs.com/airport-cabs",
  },
  openGraph: {
    title: "Airport Cabs Across India | BroomBoom Cabs",
    description: "Book verified airport cabs across India. Reliable doorstep to terminal transfers with live flight tracking.",
    url: "https://www.broomboomcabs.com/airport-cabs",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airport Cabs Across India | BroomBoom Cabs",
    description: "Book verified airport cabs across India. Reliable doorstep to terminal transfers with live flight tracking.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AirportCategoryPage() {
  return <ServiceCategoryClientPage serviceId="airport" />;
}
