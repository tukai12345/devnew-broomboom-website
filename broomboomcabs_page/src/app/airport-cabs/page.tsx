import React from "react";
import { Metadata } from "next";
import { ServiceCategoryClientPage } from "@/components/ServiceCategoryClientPage";

export const metadata: Metadata = {
  title: "Airport Cabs Across India — Reliable Airport Transfers | BroomBoom Cabs",
  description:
    "Book verified airport taxi across 100+ cities in India. 100% on-time guarantee, live flight tracking, 45 minutes free wait time, and zero surge pricing.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/airport-cabs",
  },
  openGraph: {
    title: "Airport Cabs Across India | BroomBoom Cabs",
    description: "Book verified airport cabs across India. Reliable doorstep to terminal transfers with live flight tracking.",
    url: "https://dev.broomboomcabs.com/airport-cabs",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function AirportCategoryPage() {
  return <ServiceCategoryClientPage serviceId="airport" />;
}
