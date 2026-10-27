import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  TOP_10_CITIES_SERVICES,
  SERVICES_LIST,
  getCityServiceData,
  getServiceMeta,
  ServiceType,
} from "@/data/cityServicesData";
import { CityServiceClientPage } from "./CityServiceClientPage";

interface PageProps {
  params: {
    service: string;
    city: string;
  };
}

export async function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  const services: ServiceType[] = ["outstation", "rental", "airport"];

  for (const service of services) {
    for (const city of TOP_10_CITIES_SERVICES) {
      params.push({
        service,
        city: city.cityId,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityServiceData(params.city);
  const serviceMeta = getServiceMeta(params.service);

  if (!cityData || !serviceMeta) {
    return {
      title: "Cab Services | BroomBoom Cabs",
    };
  }

  return {
    title: `${serviceMeta.name} in ${cityData.cityName} | Lowest Fares — BroomBoom Cabs`,
    description: `Book verified ${serviceMeta.name.toLowerCase()} in ${cityData.cityName}, ${cityData.state}. Transparent pricing, clean sanitized cabs, zero surge, and 24x7 helpline.`,
  };
}

export default function ServiceCityPage({ params }: PageProps) {
  const cityData = getCityServiceData(params.city);
  const serviceMeta = getServiceMeta(params.service);

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

