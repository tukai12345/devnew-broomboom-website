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
  const serviceMeta = getServiceMeta("rental");

  if (!cityData || !serviceMeta) {
    return {
      title: "Hourly Car Rentals | BroomBoom Cabs",
    };
  }

  return {
    title: `Hourly Car Rentals in ${cityData.cityName} | Chauffeur & Unlimited Stops — BroomBoom Cabs`,
    description: `Book private hourly rental cabs in ${cityData.cityName}, ${cityData.state}. Flexible 2h to 12h packages, unlimited local stops, professional chauffeur, and transparent pricing.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/hourly-rentals/${cityData.cityId}`,
    },
  };
}

export default function HourlyRentalCityPage({ params }: PageProps) {
  const cityData = getCityServiceData(params.city);
  const serviceMeta = getServiceMeta("rental");

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

