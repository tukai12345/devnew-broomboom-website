import React from "react";
import { Metadata } from "next";
import { PetFriendlyKolkataClient } from "./PetFriendlyKolkataClient";

export const metadata: Metadata = {
  title: "Pet Friendly Cabs in Kolkata | Travel with Dogs & Cats | BroomBoom Cabs",
  description:
    "Book 100% verified pet-friendly cabs in Kolkata with BroomBoom. Safe, clean, and spacious AC cabs for dogs, cats & pets. Local pet clinic visits, vet rides, airport drops & outstation trips.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/taxi-service/pet-friendly-cabs-in-kolkata",
  },
  openGraph: {
    title: "Pet Friendly Cabs in Kolkata — Dog & Cat Friendly Rides | BroomBoom",
    description:
      "Travel stress-free with your fur babies across Kolkata. Verified pet-loving drivers, seat covers, sanitized AC Hatchback, Sedan & SUV cabs.",
    url: "https://dev.broomboomcabs.com/taxi-service/pet-friendly-cabs-in-kolkata",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function PetFriendlyKolkataPage() {
  return <PetFriendlyKolkataClient />;
}

