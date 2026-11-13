import React from "react";
import { Metadata } from "next";
import { ReservedDirectoryClient } from "./ReservedDirectoryClient";

export const metadata: Metadata = {
  title: "Reserved Airport Cabs | Bagdogra & Guwahati Himalayan Transfers - BroomBoom Cabs",
  description:
    "Pre-book private reserved airport cabs from Bagdogra Airport (IXB) to Sikkim, Kalimpong, and Nepal Border, and Guwahati Airport (GAU) to Shillong. 100% verified mountain drivers, flight tracking with 60-min free waiting, and clean AC SUVs.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/reserved-cabs",
  },
  openGraph: {
    title: "Reserved Airport Cabs | Mountain & Airport Transfers - BroomBoom Cabs",
    description:
      "Reliable reserved airport cabs for Sikkim, Kalimpong, Shillong, and Nepal. High-clearance SUVs, flight delay buffer, and transparent fares.",
    url: "https://dev.broomboomcabs.com/reserved-cabs",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function ReservedDirectoryPage() {
  return <ReservedDirectoryClient />;
}
