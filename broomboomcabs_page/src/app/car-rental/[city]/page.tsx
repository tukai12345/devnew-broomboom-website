import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  TOP_10_CITIES_SERVICES,
  getCityServiceData,
  getServiceMeta,
} from "@/data/cityServicesData";
import { CityServiceClientPage } from "@/app/services/[service]/[city]/CityServiceClientPage";
import {
  CAR_RENTAL_SPECIAL_ROUTES,
  parseSpecialCarRentalSlug,
} from "@/data/carRentalRoutes";
import { SpecialCarRentalClient } from "./SpecialCarRentalClient";
import { CarRentalCityClientSections } from "./CarRentalCityClientSections";

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
  const specialRoutes = CAR_RENTAL_SPECIAL_ROUTES.map((city) => ({
    city,
  }));
  return [...topCities, ...specialRoutes];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolved = await props.params;
  const rawSlug = resolved.city;

  // Check special vehicle / package first
  const specialInfo = parseSpecialCarRentalSlug(rawSlug);
  if (specialInfo) {
    return {
      title: specialInfo.pageTitle,
      description: specialInfo.pageDescription,
      alternates: {
        canonical: specialInfo.canonicalUrl,
      },
      openGraph: {
        title: specialInfo.pageTitle,
        description: specialInfo.pageDescription,
        url: specialInfo.canonicalUrl,
        siteName: "BroomBoom Cabs",
        locale: "en_IN",
        type: "website",
      },
    };
  }

  // Check city service data
  const cityData = getCityServiceData(rawSlug);
  const serviceMeta = getServiceMeta("rental");

  if (!cityData || !serviceMeta) {
    return {
      title: "Hourly Car Rentals | BroomBoom Cabs",
    };
  }

  const cleanCity = rawSlug.toLowerCase();

  return {
    title: `Car Rentals in ${cityData.cityName} | Chauffeur & Unlimited Stops — BroomBoom Cabs`,
    description: `Book private car rentals in ${cityData.cityName}, ${cityData.state}. Flexible 2h to 12h packages, unlimited local stops, professional chauffeur, and transparent pricing.`,
    keywords: `car rental in ${cityData.cityName}, hourly car hire ${cityData.cityName}, chauffeur driven car ${cityData.cityName}, local cab package ${cityData.cityName}, full day taxi ${cityData.cityName}, 8 hr 80 km cab ${cityData.cityName}, car hire with driver ${cityData.cityName}`,
    alternates: {
      canonical: `https://www.broomboomcabs.com/car-rental/${cleanCity}`,
    },
    openGraph: {
      title: `Car Rentals in ${cityData.cityName} | BroomBoom Cabs`,
      description: `Book private car rentals in ${cityData.cityName}. Transparent pricing with chauffeur and unlimited stops.`,
      url: `https://www.broomboomcabs.com/car-rental/${cleanCity}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Car Rentals in ${cityData.cityName} | BroomBoom Cabs`,
      description: `Book private car rentals in ${cityData.cityName} with verified chauffeur and unlimited stops.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HourlyRentalCityPage(props: PageProps) {
  const resolved = await props.params;
  const rawSlug = resolved.city;

  // 1. Check special vehicle rental / tempo traveller / tour package
  const specialInfo = parseSpecialCarRentalSlug(rawSlug);
  if (specialInfo) {
    return <SpecialCarRentalClient info={specialInfo} />;
  }

  // 2. City car rental
  const cityData = getCityServiceData(rawSlug);
  const serviceMeta = getServiceMeta("rental");

  if (!cityData || !serviceMeta) {
    notFound();
  }

  return (
    <CityServiceClientPage
      cityData={cityData}
      serviceMeta={serviceMeta}
      showServiceContentSection={false}
    >
      <CarRentalCityClientSections cityData={cityData} />
    </CityServiceClientPage>
  );
}
