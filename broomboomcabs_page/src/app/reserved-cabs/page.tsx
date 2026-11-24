import React from "react";
import { Metadata } from "next";
import { ReservedDirectoryClient } from "./ReservedDirectoryClient";

export const metadata: Metadata = {
  title: "Reserved Airport Cabs — Bagdogra & Guwahati Himalayan Mountain Transfers | BroomBoom Cabs",
  description:
    "Pre-book private reserved airport cabs from Bagdogra (IXB) to Sikkim & Kalimpong, and Guwahati (GAU) to Shillong. Verified mountain pilots, high-clearance SUVs & flight buffer.",
  keywords:
    "reserved airport cabs, bagdogra to sikkim cab, bagdogra to gangtok taxi, guwahati to shillong cab, bagdogra to kalimpong cab, himalayan airport taxi, ixb airport private cab, gau airport transfer, mountain taxi booking",
  alternates: {
    canonical: "https://www.broomboomcabs.com/reserved-cabs",
  },
  openGraph: {
    title: "Reserved Airport Cabs | Mountain & Airport Transfers - BroomBoom Cabs",
    description:
      "Reliable reserved airport cabs for Sikkim, Kalimpong, Shillong, and Nepal. High-clearance SUVs, flight delay buffer, and transparent fares.",
    url: "https://www.broomboomcabs.com/reserved-cabs",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserved Airport Cabs | Mountain Transfers - BroomBoom Cabs",
    description:
      "Reliable reserved airport cabs for Sikkim, Kalimpong, Shillong, and Nepal. High-clearance SUVs and transparent fares.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReservedDirectoryPage() {
  return <ReservedDirectoryClient />;
}
