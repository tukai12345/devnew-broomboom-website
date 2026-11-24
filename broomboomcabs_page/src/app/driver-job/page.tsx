import React from "react";
import { Metadata } from "next";
import { DriverJobClient } from "./DriverJobClient";

export const metadata: Metadata = {
  title: "Become a BroomBoom Pilot — Driver Job & Cab Attachment Registration | Earn Daily",
  description:
    "Drive with BroomBoom on your own terms. Daily instant payouts, zero commission options, free accidental insurance, and 24x7 pilot support. Attach your car or taxi today.",
  keywords:
    "driver job, cab attachment, attach car with cab company, taxi driver registration, driver partner signup, attach taxi daily payout, broomboom pilot registration, commercial driver job india, car attachment for outstation",
  alternates: {
    canonical: "https://www.broomboomcabs.com/driver-job",
  },
  openGraph: {
    title: "Become a BroomBoom Pilot | Driver Job & Partner Registration",
    description:
      "Drive with BroomBoom on your own terms. Daily instant payouts, zero commission, and verified intercity return trips.",
    url: "https://www.broomboomcabs.com/driver-job",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a BroomBoom Pilot | Driver Job & Partner Registration",
    description:
      "Drive with BroomBoom on your own terms. Daily instant payouts, zero commission, and verified intercity return trips.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DriverJobPage() {
  return <DriverJobClient />;
}
