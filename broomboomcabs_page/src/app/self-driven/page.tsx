import React from "react";
import { Metadata } from "next";
import { SelfDrivenHubClient } from "./SelfDrivenHubClient";

export const metadata: Metadata = {
  title: "Self-Drive Car Rental in India | Rent Cars by Day or Month | BroomBoom Cabs",
  description:
    "Rent verified self-drive cars across India with unlimited kilometers and zero security deposit options. Hatchbacks, Sedans, Creta, Thar 4x4, and Innova Crysta with doorstep delivery.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/self-driven",
  },
  openGraph: {
    title: "Self-Drive Car Rental Across India | BroomBoom Cabs",
    description:
      "Drive yourself with complete freedom. Clean, well-maintained self-drive cars starting at ₹1,199/day with 24x7 roadside assistance.",
    url: "https://dev.broomboomcabs.com/self-driven",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function SelfDrivenPage() {
  return <SelfDrivenHubClient />;
}
