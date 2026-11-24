import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All India Cab Services Directory — 100+ Cities Network | BroomBoom Cabs",
  description:
    "Explore all BroomBoom cab services: outstation one-way drops, round trips, airport transfers, hourly rentals, and self-drive cars across 100+ cities in India.",
  keywords:
    "cab services directory, all india taxi network, outstation cab services, local city cab services, airport transfer services, car rental services directory, broomboom cabs network",
  alternates: {
    canonical: "https://www.broomboomcabs.com/services",
  },
  openGraph: {
    title: "All India Cab Services Directory | BroomBoom Cabs",
    description:
      "Explore BroomBoom cab services across 100+ cities: outstation cabs, airport transfers, hourly car rentals & self-drive cars.",
    url: "https://www.broomboomcabs.com/services",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All India Cab Services Directory | BroomBoom Cabs",
    description:
      "Explore BroomBoom cab services across 100+ cities: outstation cabs, airport transfers, hourly car rentals & self-drive cars.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
