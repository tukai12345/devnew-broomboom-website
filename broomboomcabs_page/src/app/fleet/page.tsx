import React, { Suspense } from "react";
import { Metadata } from "next";
import { FleetClientPage } from "./FleetClientPage";
import { RouteTransitionLoader } from "@/components/RouteTransitionLoader";

export const metadata: Metadata = {
  title: "Browse Cab Fleet — Hatchback, Sedan, SUV & EV Cabs | BroomBoom Cabs",
  description:
    "Explore the BroomBoom cab fleet: WagonR, Dzire, Etios, Ertiga, Innova Crysta, and EV cabs. Transparent per-km rates, zero return fare guarantee, and AC comfort.",
  keywords:
    "cab fleet, sedan cab booking, suv cab rental, innova crysta outstation cab, ertiga cab booking, dzire taxi fare, ev cab booking, luxury suv cab hire, hatchback cab booking",
  alternates: {
    canonical: "https://www.broomboomcabs.com/fleet",
  },
  openGraph: {
    title: "Browse Cab Fleet | BroomBoom Cabs",
    description:
      "Explore the BroomBoom cab fleet: Hatchbacks, Sedans, Ertiga, Innova Crysta & EV cabs at transparent per-km rates.",
    url: "https://www.broomboomcabs.com/fleet",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Cab Fleet | BroomBoom Cabs",
    description:
      "Explore the BroomBoom cab fleet: Hatchbacks, Sedans, Ertiga, Innova Crysta & EV cabs at transparent per-km rates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FleetPage() {
  return (
    <Suspense
      fallback={
        <RouteTransitionLoader mode="search-to-fleet" />
      }
    >
      <FleetClientPage />
    </Suspense>
  );
}

