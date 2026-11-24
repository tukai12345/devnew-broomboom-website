import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  TOP_10_CITIES_SERVICES,
  getCityServiceData,
  getServiceMeta,
} from "@/data/cityServicesData";
import { CityServiceClientPage } from "@/app/services/[service]/[city]/CityServiceClientPage";
import { AirportCityClientSections } from "./AirportCityClientSections";

export const EXTRA_AIRPORT_CITIES = [
  "kochi",
  "chandigarh",
  "ahmedabad",
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
  const extraCities = EXTRA_AIRPORT_CITIES.map((city) => ({
    city,
  }));
  return [...topCities, ...extraCities];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolved = await props.params;
  const cityData = getCityServiceData(resolved.city);
  const serviceMeta = getServiceMeta("airport");

  if (!cityData || !serviceMeta) {
    return {
      title: "Airport Transfers | BroomBoom Cabs",
    };
  }

  return {
    title: `Airport Cabs in ${cityData.cityName} (${cityData.airportCode}) | On-Time Guarantee — BroomBoom Cabs`,
    description: `Book dependable airport taxi to and from ${cityData.airportName} (${cityData.airportCode}) in ${cityData.cityName}. Live flight tracking, 45 mins free wait time, and zero surge.`,
    keywords: `airport cabs in ${cityData.cityName}, ${cityData.cityName} airport taxi, ${cityData.airportCode} airport cab booking, ${cityData.cityName} airport transfer, prepaid airport taxi ${cityData.cityName}, airport drop taxi ${cityData.cityName}, ${cityData.airportName} cab`,
    alternates: {
      canonical: `https://www.broomboomcabs.com/airport-cabs/${cityData.cityId}`,
    },
    openGraph: {
      title: `Airport Cabs in ${cityData.cityName} (${cityData.airportCode}) | BroomBoom Cabs`,
      description: `Book dependable airport taxi to and from ${cityData.airportName} in ${cityData.cityName}. Live flight tracking & zero surge.`,
      url: `https://www.broomboomcabs.com/airport-cabs/${cityData.cityId}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Airport Cabs in ${cityData.cityName} (${cityData.airportCode}) | BroomBoom Cabs`,
      description: `Book dependable airport taxi in ${cityData.cityName} with live flight tracking.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AirportCityPage(props: PageProps) {
  const resolved = await props.params;
  const cityData = getCityServiceData(resolved.city);
  const serviceMeta = getServiceMeta("airport");

  if (!cityData || !serviceMeta) {
    notFound();
  }

  return (
    <CityServiceClientPage
      cityData={cityData}
      serviceMeta={serviceMeta}
      showServiceContentSection={false}
    >
      <AirportCityClientSections cityData={cityData} />
    </CityServiceClientPage>
  );
}

