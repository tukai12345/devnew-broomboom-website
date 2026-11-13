import React from "react";
import { Metadata } from "next";
import { TaxiNearCityClient } from "./TaxiNearCityClient";
import { getCityServiceData } from "@/data/cityServicesData";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

function formatCityName(slug: string): string {
  const known = getCityServiceData(slug);
  if (known) return known.cityName;

  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatCityName(city);

  return {
    title: `Taxi Near Me in ${cityName} — Instant Cab Booking 24x7 | BroomBoom Cabs`,
    description: `Book the nearest available taxi in ${cityName} with 3 to 8 minute doorstep pickup. AC Hatchback, Sedan, and SUV cabs with zero peak-hour surge pricing.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/taxi-near/${city}`,
    },
    openGraph: {
      title: `Taxi Near Me in ${cityName} — Rapid 24x7 Cab Service | BroomBoom`,
      description: `Instant cab booking in ${cityName}. Clean AC cabs with verified local chauffeurs, live GPS tracking, and lowest transparent fares.`,
      url: `https://dev.broomboomcabs.com/taxi-near/${city}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function TaxiNearCityPage({ params }: PageProps) {
  const { city } = await params;
  const cityName = formatCityName(city);

  return <TaxiNearCityClient cityName={cityName} citySlug={city} />;
}
