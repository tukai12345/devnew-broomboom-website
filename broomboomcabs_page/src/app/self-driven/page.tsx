import React from "react";
import { Metadata } from "next";
import { SelfDrivenHubClient } from "./SelfDrivenHubClient";

export const metadata: Metadata = {
  title: "Self Drive Car Rental Across India — Unlimited Kms & Zero Deposit | BroomBoom Cabs",
  description:
    "Rent self-drive cars in India with unlimited kilometers & doorstep delivery. Hatchbacks, Sedans, Thar 4x4, Creta, & Innova Crysta at transparent daily & monthly rates.",
  keywords:
    "self drive car rental, rent a car without driver, self drive cars india, unlimited km self drive, monthly car rental self drive, rent thar 4x4, innova crysta self drive, doorstep self drive delivery, rent car self drive online",
  alternates: {
    canonical: "https://www.broomboomcabs.com/self-driven",
  },
  openGraph: {
    title: "Self-Drive Car Rental Across India | BroomBoom Cabs",
    description:
      "Drive yourself with complete freedom. Clean, well-maintained self-drive cars starting at ₹1,199/day with 24x7 roadside assistance.",
    url: "https://www.broomboomcabs.com/self-driven",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Drive Car Rental Across India | BroomBoom Cabs",
    description:
      "Drive yourself with complete freedom. Clean, well-maintained self-drive cars with unlimited km options.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SelfDrivenPage() {
  return <SelfDrivenHubClient />;
}
