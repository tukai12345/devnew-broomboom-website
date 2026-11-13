import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  TOP_10_CITIES_SERVICES,
  getCityServiceData,
  getServiceMeta,
} from "@/data/cityServicesData";
import { CityServiceClientPage } from "@/app/services/[service]/[city]/CityServiceClientPage";
import { OutstationCityClientSections } from "./OutstationCityClientSections";

export const EXTRA_OUTSTATION_CITIES = [
  "kochi",
  "chandigarh",
  "ahmedabad",
  "kolkata1",
  "bareilly",
  "ernakulam",
  "sabarimala",
  "jamnagar",
  "jamshedpur",
  "amritsar",
  "visakhapatnam",
  "gwalior",
  "ambala",
  "ranikhet",
  "belgaum",
  "madurai",
];

type PageProps = {
  params: Promise<{
    city: string;
  }> | {
    city: string;
  };
};

export async function generateStaticParams() {
  const topCities = TOP_10_CITIES_SERVICES.map((c) => ({
    city: c.cityId,
  }));
  const extraCities = EXTRA_OUTSTATION_CITIES.map((city) => ({
    city,
  }));
  return [...topCities, ...extraCities];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolved = await props.params;
  const cityData = getCityServiceData(resolved.city);
  const serviceMeta = getServiceMeta("outstation");

  if (!cityData || !serviceMeta) {
    return {
      title: "Outstation Cabs | BroomBoom Cabs",
    };
  }

  const cleanCity = resolved.city.toLowerCase();

  return {
    title: `Outstation Cabs in ${cityData.cityName} | Lowest Fares & Zero Return Fare — BroomBoom Cabs`,
    description: `Book verified one-way & round-trip outstation cabs in ${cityData.cityName}, ${cityData.state}. Zero return fare, 100% AC cars, GPS live tracking, and 24x7 customer support.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/outstation-cabs/${cleanCity}`,
    },
    openGraph: {
      title: `Outstation Cabs in ${cityData.cityName} | Lowest Fares — BroomBoom Cabs`,
      description: `Book verified outstation cabs from ${cityData.cityName}. Zero return fare on one-way drops, GPS tracking & 24x7 support.`,
      url: `https://dev.broomboomcabs.com/outstation-cabs/${cleanCity}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function OutstationCityPage(props: PageProps) {
  const resolved = await props.params;
  const cityData = getCityServiceData(resolved.city);
  const serviceMeta = getServiceMeta("outstation");

  if (!cityData || !serviceMeta) {
    notFound();
  }

  return (
    <CityServiceClientPage
      cityData={cityData}
      serviceMeta={serviceMeta}
      showServiceContentSection={false}
    >
      <OutstationCityClientSections cityData={cityData} />
    </CityServiceClientPage>
  );
}
