import React from "react";
import { Metadata } from "next";
import { CorporateDirectoryClient } from "./CorporateDirectoryClient";

export const metadata: Metadata = {
  title: "Corporate Employee Pick & Drop Cabs Kolkata — Sector V & New Town | BroomBoom Cabs",
  description:
    "Safe & punctual corporate employee transport in Kolkata. Dedicated office shuttles & daily cab service for Sector V, New Town, and Bantala with 24x7 female safety & GST billing.",
  keywords:
    "corporate pick and drop kolkata, employee cab service kolkata, office cab sector v, new town office pick drop, monthly office cab kolkata, corporate cab rental salt lake, bpo night shift cabs kolkata, staff transportation kolkata",
  alternates: {
    canonical: "https://www.broomboomcabs.com/corporate-pick-drop-kolkata",
  },
  openGraph: {
    title: "Corporate Pick & Drop Kolkata | Employee Transportation - BroomBoom Cabs",
    description:
      "Enterprise employee transport solutions for Kolkata IT hubs: Sector V, New Town, and Bantala SEZ. Safe night-shift cabs, verified chauffeurs, and monthly commuter passes.",
    url: "https://www.broomboomcabs.com/corporate-pick-drop-kolkata",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Pick & Drop Kolkata | BroomBoom Cabs",
    description:
      "Enterprise employee transport solutions for Kolkata IT hubs: Sector V, New Town, and Bantala SEZ.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CorporateDirectoryPage() {
  return <CorporateDirectoryClient />;
}
