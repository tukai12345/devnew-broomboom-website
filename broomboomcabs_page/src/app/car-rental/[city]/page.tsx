import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  TOP_10_CITIES_SERVICES,
  getCityServiceData,
  getServiceMeta,
} from "@/data/cityServicesData";
import { CityServiceClientPage } from "@/app/services/[service]/[city]/CityServiceClientPage";

type PageProps = {
  params: Promise<{
    city: string;
  }> | {
    city: string;
  };
};

export async function generateStaticParams() {
  return TOP_10_CITIES_SERVICES.map((c) => ({
    city: c.cityId,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolved = await props.params;
  const cityData = getCityServiceData(resolved.city);
  const serviceMeta = getServiceMeta("rental");

  if (!cityData || !serviceMeta) {
    return {
      title: "Hourly Car Rentals | BroomBoom Cabs",
    };
  }

  return {
    title: `Car Rentals in ${cityData.cityName} | Chauffeur & Unlimited Stops — BroomBoom Cabs`,
    description: `Book private car rentals in ${cityData.cityName}, ${cityData.state}. Flexible 5h to 12h packages, unlimited local stops, professional chauffeur, and transparent pricing.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/car-rental/${cityData.cityId}`,
    },
  };
}

export default async function HourlyRentalCityPage(props: PageProps) {
  const resolved = await props.params;
  const cityData = getCityServiceData(resolved.city);
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

