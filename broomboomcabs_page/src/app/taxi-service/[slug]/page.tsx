import React from "react";
import { Metadata } from "next";
import { PetFriendlyCityClient } from "./PetFriendlyCityClient";
import { RouteTaxiClient } from "./RouteTaxiClient";
import { AreaTaxiClient } from "./AreaTaxiClient";
import { parseTaxiServiceSlug } from "@/utils/taxiRouteParser";
import { TAXI_SERVICE_ROUTES } from "@/data/taxiServiceRoutes";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for top routes for high-speed prerendering
export async function generateStaticParams() {
  return TAXI_SERVICE_ROUTES.slice(0, 100).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseTaxiServiceSlug(slug);

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

export default async function TaxiServiceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseTaxiServiceSlug(slug);

  if (parsed.type === "pet") {
    return <PetFriendlyCityClient cityName={parsed.cityName} citySlug={slug} />;
  }

  if (parsed.type === "route") {
    return <RouteTaxiClient route={parsed} />;
  }

  return <AreaTaxiClient route={parsed} />;
}
