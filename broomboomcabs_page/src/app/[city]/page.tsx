import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  TOP_10_CITIES_SERVICES,
  getCityServiceData,
  getServiceMeta,
} from "@/data/cityServicesData";
import { CityServiceClientPage } from "@/app/services/[service]/[city]/CityServiceClientPage";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return TOP_10_CITIES_SERVICES.map((c) => ({
    city: c.cityId,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityServiceData(city);

  if (!cityData) {
    return {
      title: "Cab Service | BroomBoom Cabs",
    };
  }

  return {
    title: `Taxi & Cab Service in ${cityData.cityName} | Lowest Fares — BroomBoom Cabs`,
    description: `Book 24x7 verified cabs in ${cityData.cityName}. One-way outstation cabs, airport drops, and hourly car rentals with professional chauffeurs.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/${cityData.cityId}`,
    },
    openGraph: {
      title: `Taxi & Cab Service in ${cityData.cityName} | BroomBoom Cabs`,
      description: `Book outstation, airport, and local cabs in ${cityData.cityName} at lowest rates.`,
      url: `https://dev.broomboomcabs.com/${cityData.cityId}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function CityHubPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = getCityServiceData(city);
  const serviceMeta = getServiceMeta("outstation");

  if (!cityData || !serviceMeta) {
    notFound();
  }

  return <CityServiceClientPage cityData={cityData} serviceMeta={serviceMeta} />;
}
