import React from "react";
import { Metadata } from "next";
import { parseTaxiServiceSlug } from "@/utils/taxiRouteParser";
import { RouteTaxiClient } from "@/app/taxi-service/[slug]/RouteTaxiClient";
import { PetFriendlyCityClient } from "@/app/taxi-service/[slug]/PetFriendlyCityClient";
import { AreaTaxiClient } from "@/app/taxi-service/[slug]/AreaTaxiClient";
import { KOLKATA_ROUTES } from "@/data/kolkataRoutes";

interface PageProps {
  params: Promise<{
    city: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return KOLKATA_ROUTES.map((slug) => ({
    city: "kolkata",
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, slug } = await params;
  const parsed = parseTaxiServiceSlug(slug, city);

  return {
    title: parsed.pageTitle,
    description: parsed.pageDescription,
    alternates: {
      canonical: parsed.canonicalUrl,
    },
    openGraph: {
      title: parsed.pageTitle,
      description: parsed.pageDescription,
      url: parsed.canonicalUrl,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function CityRouteSlugPage({ params }: PageProps) {
  const { city, slug } = await params;
  const parsed = parseTaxiServiceSlug(slug, city);

  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1);

  if (parsed.type === "pet") {
    return <PetFriendlyCityClient cityName={parsed.cityName} citySlug={slug} />;
  }

  if (parsed.type === "route" || parsed.type === "tour") {
    return (
      <RouteTaxiClient
        route={parsed}
        parentHref={`/outstation-cabs/${city}`}
        parentLabel={`${formattedCity} Outstation Cabs`}
      />
    );
  }

  return <AreaTaxiClient route={parsed} />;
}
