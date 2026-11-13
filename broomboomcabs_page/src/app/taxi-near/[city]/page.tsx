import React from "react";
import { Metadata } from "next";
import { TaxiNearCityClient } from "./TaxiNearCityClient";
import { TOP_10_CITIES_SERVICES } from "@/data/cityServicesData";
import {
  TAXI_NEAR_ROUTES,
  formatTaxiNearCity,
} from "@/data/taxiNearRoutes";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  const topCities = TOP_10_CITIES_SERVICES.map((c) => ({
    city: c.cityId,
  }));
  const extraRoutes = TAXI_NEAR_ROUTES.map((city) => ({
    city,
  }));
  return [...topCities, ...extraRoutes];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatTaxiNearCity(city);
  const cleanCity = city.toLowerCase();

  return {
    title: `Taxi Near Me in ${cityName} — Instant Cab Booking 24x7 | BroomBoom Cabs`,
    description: `Book the nearest available taxi in ${cityName} with 3 to 8 minute doorstep pickup. AC Hatchback, Sedan, and SUV cabs with zero peak-hour surge pricing.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/taxi-near/${cleanCity}`,
    },
    openGraph: {
      title: `Taxi Near Me in ${cityName} — Rapid 24x7 Cab Service | BroomBoom`,
      description: `Instant cab booking in ${cityName}. Clean AC cabs with verified local chauffeurs, live GPS tracking, and lowest transparent fares.`,
      url: `https://dev.broomboomcabs.com/taxi-near/${cleanCity}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function TaxiNearCityPage({ params }: PageProps) {
  const { city } = await params;
  const cityName = formatTaxiNearCity(city);

  return <TaxiNearCityClient cityName={cityName} citySlug={city.toLowerCase()} />;
}
