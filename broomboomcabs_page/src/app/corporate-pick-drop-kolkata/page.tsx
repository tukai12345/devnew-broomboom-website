import React from "react";
import { Metadata } from "next";
import { CorporateDirectoryClient } from "./CorporateDirectoryClient";

export const metadata: Metadata = {
  title: "Corporate Pick & Drop Kolkata | Employee Cab Services Sector V & New Town - BroomBoom Cabs",
  description:
    "Reliable corporate employee pick and drop cab services in Kolkata. Dedicated staff shuttles, daily office cabs, and monthly carpooling for TCS, Technopolis, Wipro, Infosys, HCL, Cognizant, Concentrix, and Accenture. 99.8% on-time SLA, 24x7 night shift female safety protocol, and automated GST billing.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/corporate-pick-drop-kolkata",
  },
  openGraph: {
    title: "Corporate Pick & Drop Kolkata | Employee Transportation - BroomBoom Cabs",
    description:
      "Enterprise employee transport solutions for Kolkata IT hubs: Sector V, New Town, and Bantala SEZ. Safe night-shift cabs, verified chauffeurs, and monthly commuter passes.",
    url: "https://dev.broomboomcabs.com/corporate-pick-drop-kolkata",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function CorporateDirectoryPage() {
  return <CorporateDirectoryClient />;
}
