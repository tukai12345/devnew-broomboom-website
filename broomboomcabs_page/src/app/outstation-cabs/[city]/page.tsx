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
  const serviceMeta = getServiceMeta("outstation");

  if (!cityData || !serviceMeta) {
    return {
      title: "Outstation Cabs | BroomBoom Cabs",
    };
  }

  return {
    title: `Outstation Cabs in ${cityData.cityName} | Lowest Fares & Zero Return Fare — BroomBoom Cabs`,
    description: `Book verified one-way & round-trip outstation cabs in ${cityData.cityName}, ${cityData.state}. Zero return fare, 100% AC cars, GPS live tracking, and 24x7 customer support.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/outstation-cabs/${cityData.cityId}`,
    },
    openGraph: {
      title: `Outstation Cabs in ${cityData.cityName} | Lowest Fares — BroomBoom Cabs`,
      description: `Book verified outstation cabs from ${cityData.cityName}. Zero return fare on one-way drops, GPS tracking & 24x7 support.`,
      url: `https://dev.broomboomcabs.com/outstation-cabs/${cityData.cityId}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function OutstationCityPage({ params }: PageProps) {
  const cityData = getCityServiceData(params.city);
  const serviceMeta = getServiceMeta("outstation");

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

