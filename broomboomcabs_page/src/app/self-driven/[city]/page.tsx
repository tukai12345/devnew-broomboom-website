import React from "react";
import { Metadata } from "next";
import { SelfDrivenCityClient } from "./SelfDrivenCityClient";
import { getCityServiceData } from "@/data/cityServicesData";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

function formatCityName(slug: string): string {
  const known = getCityServiceData(slug);
  if (known) return known.cityName;

  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatCityName(city);

  return {
    title: `Self-Drive Car Rental in ${cityName} | Unlimited KMs & Doorstep Delivery | BroomBoom`,
    description: `Rent verified self-drive cars in ${cityName} starting from ₹1,199/day. Hatchback, Sedan, Creta, Thar 4x4, and Innova Crysta with zero security deposit options.`,
    alternates: {
      canonical: `https://dev.broomboomcabs.com/self-driven/${city}`,
    },
    openGraph: {
      title: `Self-Drive Car Rental in ${cityName} — Drive Freedom | BroomBoom`,
      description: `Well-maintained, clean self-drive cars in ${cityName} with doorstep delivery and unlimited kilometers. Rent by day or month.`,
      url: `https://dev.broomboomcabs.com/self-driven/${city}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function SelfDrivenCityPage({ params }: PageProps) {
  const { city } = await params;
  const cityName = formatCityName(city);

  return <SelfDrivenCityClient cityName={cityName} citySlug={city} />;
}
