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
  params: {
    city: string;
  };
}

export async function generateStaticParams() {
  return TOP_10_CITIES_SERVICES.map((c) => ({
    city: c.cityId,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityServiceData(params.city);
  const serviceMeta = getServiceMeta("airport");

  if (!cityData || !serviceMeta) {
    return {
      title: "Airport Transfers | BroomBoom Cabs",
    };
  }

  return {
    title: `Airport Cabs in ${cityData.cityName} (${cityData.airportCode}) | On-Time Guarantee — BroomBoom Cabs`,
    description: `Book dependable airport taxi to and from ${cityData.airportName} (${cityData.airportCode}) in ${cityData.cityName}. Live flight tracking, 45 mins free wait time, and zero surge.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/airport-cabs/${cityData.cityId}`,
    },
  };
}

export default function AirportCityPage({ params }: PageProps) {
  const cityData = getCityServiceData(params.city);
  const serviceMeta = getServiceMeta("airport");

  if (!cityData || !serviceMeta) {
    notFound();
  }

  return (
    <CityServiceClientPage
      cityData={cityData}
      serviceMeta={serviceMeta}
    />
  );
}

