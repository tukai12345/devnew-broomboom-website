import React from "react";
import { Metadata } from "next";
import { PetFriendlyCityClient } from "./PetFriendlyCityClient";
import { getCityServiceData } from "@/data/cityServicesData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function parseCityFromSlug(slug: string): { cityName: string; isPetFriendly: boolean } {
  const isPet = /^pet-friendly-cabs?-in-/i.test(slug);
  const raw = isPet ? slug.replace(/^pet-friendly-cabs?-in-/i, "") : slug;

  const known = getCityServiceData(raw);
  if (known) {
    return {
      cityName: known.cityName,
      isPetFriendly: isPet,
    };
  }

  const formatted = raw
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    cityName: formatted || "India",
    isPetFriendly: isPet,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { cityName, isPetFriendly } = parseCityFromSlug(slug);

  if (isPetFriendly) {
    return {
      title: `Pet Friendly Cabs in ${cityName} | Travel with Dogs & Cats | BroomBoom Cabs`,
      description: `Book 100% verified pet-friendly cabs in ${cityName} with BroomBoom. Safe, clean, and spacious AC cabs for dogs, cats & pets. Local clinic visits, vet rides, airport drops & outstation trips.`,
      alternates: {
        canonical: `https://dev.broomboomcabs.com/taxi-service/${slug}`,
      },
      openGraph: {
        title: `Pet Friendly Cabs in ${cityName} — Dog & Cat Friendly Rides | BroomBoom`,
        description: `Travel stress-free with your fur babies across ${cityName}. Verified pet-loving drivers, seat covers, sanitized AC Hatchback, Sedan & SUV cabs.`,
        url: `https://dev.broomboomcabs.com/taxi-service/${slug}`,
        siteName: "BroomBoom Cabs",
        locale: "en_IN",
        type: "website",
      },
    };
  }

  return {
    title: `Taxi Service in ${cityName} | Cab Booking Online | BroomBoom Cabs`,
    description: `Book verified 24x7 taxi service in ${cityName}. One-way outstation cabs, airport drops, and hourly rentals with zero cancellation and best rates.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/taxi-service/${slug}`,
    },
  };
}

export default async function TaxiServiceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const { cityName } = parseCityFromSlug(slug);

  return <PetFriendlyCityClient cityName={cityName} citySlug={slug} />;
}
