import React from "react";
import { Metadata } from "next";
import { TempleDirectoryClient } from "./TempleDirectoryClient";

export const metadata: Metadata = {
  title: "Kolkata Temple Pilgrimage Taxi Service — Dakshineswar, Kalighat & Mayapur | BroomBoom Cabs",
  description:
    "Book dedicated round-trip pilgrimage cabs from Kolkata to Dakshineswar, Kalighat, Belur Math, Tarakeswar, Mayapur ISKCON, and Tarapith. Senior-friendly drivers & clean AC cars.",
  keywords:
    "kolkata temple taxi service, dakshineswar kalighat cab, mayapur iskcon tour cab kolkata, belur math taxi, tarapith temple cab from kolkata, tarakeswar taxi service, pilgrimage car rental kolkata, temple darshan cab package",
  alternates: {
    canonical: "https://www.broomboomcabs.com/taxi-service-temple-kolkata",
  },
  openGraph: {
    title: "Kolkata Temple Pilgrimage Taxi Service | BroomBoom Cabs",
    description:
      "Comfortable, senior-friendly temple pilgrimage cabs from Kolkata. Clean AC cabs, early morning darshan pickups, and transparent round-trip rates.",
    url: "https://www.broomboomcabs.com/taxi-service-temple-kolkata",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kolkata Temple Pilgrimage Taxi Service | BroomBoom Cabs",
    description:
      "Comfortable temple pilgrimage cabs from Kolkata with clean AC cars and polite chauffeurs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TempleDirectoryPage() {
  return <TempleDirectoryClient />;
}
