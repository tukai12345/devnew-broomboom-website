import React from "react";
import { Metadata } from "next";
import { DriverJobClient } from "../DriverJobClient";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Driver Job & Partner Registration in ${formattedCity} | BroomBoom Pilot`,
    description: `Drive and earn in ${formattedCity} with BroomBoom Cabs. Daily instant payouts, zero commission, free accidental insurance, and 24x7 support. Attach your Sedan, SUV, Hatchback, or Auto today.`,
    alternates: {
      canonical: `https://www.broomboomcabs.com/driver-job/${city.toLowerCase()}`,
    },
    openGraph: {
      title: `Driver Job & Partner Registration in ${formattedCity} | BroomBoom Cabs`,
      description: `Drive with BroomBoom in ${formattedCity}. Daily instant payouts, zero commission, and verified intercity return trips.`,
      url: `https://www.broomboomcabs.com/driver-job/${city.toLowerCase()}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function CityDriverJobPage({ params }: PageProps) {
  const { city } = await params;
  return <DriverJobClient initialCity={city} />;
}
