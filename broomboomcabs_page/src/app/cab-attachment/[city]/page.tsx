import React from "react";
import { Metadata } from "next";
import { CabAttachmentClientPage } from "./CabAttachmentClientPage";

export const CAB_ATTACHMENT_CITIES = [
  { cityId: "pune", cityName: "Pune", stateName: "Maharashtra" },
  { cityId: "mumbai", cityName: "Mumbai", stateName: "Maharashtra" },
  { cityId: "kolkata", cityName: "Kolkata", stateName: "West Bengal" },
  { cityId: "delhi", cityName: "Delhi NCR", stateName: "Delhi" },
  { cityId: "bangalore", cityName: "Bangalore", stateName: "Karnataka" },
  { cityId: "hyderabad", cityName: "Hyderabad", stateName: "Telangana" },
  { cityId: "ahmedabad", cityName: "Ahmedabad", stateName: "Gujarat" },
  { cityId: "chennai", cityName: "Chennai", stateName: "Tamil Nadu" },
];

type PageProps = {
  params: Promise<{
    city: string;
  }> | {
    city: string;
  };
};

export async function generateStaticParams() {
  return CAB_ATTACHMENT_CITIES.map((c) => ({
    city: c.cityId,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolved = await props.params;
  const rawCity = resolved.city?.toLowerCase() || "pune";
  const found = CAB_ATTACHMENT_CITIES.find((c) => c.cityId === rawCity);

  const cityName =
    found?.cityName || rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
  const stateName = found?.stateName || "India";

  return {
    title: `Cab Attachment in ${cityName} | Attach Taxi & Car in ${cityName} — Earn up to ₹85,000/Month | BroomBoom Cabs`,
    description: `Attach your cab in ${cityName} with BroomBoom Cabs. Zero joining fee, instant daily bank payouts, zero dead mileage on expressway trips, low commission, and 24x7 pilot support. Register online in 2 minutes.`,
    keywords: `cab attachment in ${cityName}, attach taxi in ${cityName}, car attachment ${cityName}, attach car with cab company ${cityName}, driver partner registration ${cityName}, commercial cab attachment ${cityName}, attach dzire ertiga in ${cityName}`,
    alternates: {
      canonical: `https://www.broomboomcabs.com/cab-attachment/${rawCity}`,
    },
    openGraph: {
      title: `Cab Attachment in ${cityName} — Daily Payouts & Zero Joining Fee | BroomBoom Cabs`,
      description: `Join the BroomBoom Pilot Fleet in ${cityName}. Attach Sedan, SUV, Hatchback, Auto, or Tempo Traveller. Instant daily bank payouts & guaranteed return rides.`,
      url: `https://www.broomboomcabs.com/cab-attachment/${rawCity}`,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Cab Attachment in ${cityName} | BroomBoom Cabs`,
      description: `Attach your cab in ${cityName} with BroomBoom Cabs. Zero joining fee and daily bank payouts.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CabAttachmentCityPage(props: PageProps) {
  const resolved = await props.params;
  const rawCity = resolved.city?.toLowerCase() || "pune";
  const found = CAB_ATTACHMENT_CITIES.find((c) => c.cityId === rawCity);

  const cityName =
    found?.cityName || rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
  const stateName = found?.stateName || "Maharashtra";

  return (
    <CabAttachmentClientPage
      cityId={rawCity}
      cityName={cityName}
      stateName={stateName}
    />
  );
}
