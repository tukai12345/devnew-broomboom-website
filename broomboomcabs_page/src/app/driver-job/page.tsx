import React from "react";
import { Metadata } from "next";
import { DriverJobClient } from "./DriverJobClient";

export const metadata: Metadata = {
  title: "Become a BroomBoom Pilot | Driver Partner & Cab Attachment Registration",
  description:
    "Become a BroomBoom pilot on your own terms. Daily instant payouts, zero commission models, free accidental insurance, and 24x7 support. Attach your Sedan, Hatchback, SUV, or Auto today.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/driver-job",
  },
  openGraph: {
    title: "Become a BroomBoom Pilot | Driver Job & Partner Registration",
    description:
      "Drive with BroomBoom on your own terms. Daily instant payouts, zero commission, and verified intercity return trips.",
    url: "https://dev.broomboomcabs.com/driver-job",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function DriverJobPage() {
  return <DriverJobClient />;
}
