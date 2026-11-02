import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import {
  TOP_10_CITIES_SERVICES,
  SERVICES_LIST,
  getCityServiceData,
  getServiceMeta,
  ServiceType,
} from "@/data/cityServicesData";
import { CityServiceClientPage } from "./CityServiceClientPage";

type PageProps = {
  params: Promise<{
    service: string;
    city: string;
  }> | {
    service: string;
    city: string;
  };
};

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

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolved = await props.params;
  const cityData = getCityServiceData(resolved.city);
  const serviceMeta = getServiceMeta(resolved.service);

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

export default async function ServiceCityPage(props: PageProps) {
  const resolved = await props.params;
  if (resolved.service === "outstation") {
    redirect(`/outstation-cabs/${resolved.city}`);
  }
  if (resolved.service === "airport") {
    redirect(`/airport-cabs/${resolved.city}`);
  }
  if (resolved.service === "rental") {
    redirect(`/car-rental/${resolved.city}`);
  }

  const cityData = getCityServiceData(resolved.city);
  const serviceMeta = getServiceMeta(resolved.service);

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

