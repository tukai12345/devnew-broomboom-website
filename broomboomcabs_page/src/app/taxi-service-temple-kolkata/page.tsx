import React from "react";
import { Metadata } from "next";
import { TempleDirectoryClient } from "./TempleDirectoryClient";

export const metadata: Metadata = {
  title: "Kolkata Temple Pilgrimage Taxi Service | Book Cabs for Famous Bengal Temples",
  description:
    "Book dedicated round-trip pilgrimage cabs from Kolkata to Dakshineswar, Kalighat, Belur Math, Tarakeswar, Mayapur ISKCON, Hangseshwari, Tarapith, 108 Shiva Temples, and Puri Jagannath Temple. 24x7 doorstep pickup, sanitized AC cars, and polite chauffeurs.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/taxi-service-temple-kolkata",
  },
  openGraph: {
    title: "Kolkata Temple Pilgrimage Taxi Service | BroomBoom Cabs",
    description:
      "Comfortable, senior-friendly temple pilgrimage cabs from Kolkata. Clean AC cabs, early morning darshan pickups, and transparent round-trip rates.",
    url: "https://dev.broomboomcabs.com/taxi-service-temple-kolkata",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function TempleDirectoryPage() {
  return <TempleDirectoryClient />;
}
