import React from "react";
import { Metadata } from "next";
import { parseTaxiServiceSlug } from "@/utils/taxiRouteParser";
import { RouteTaxiClient } from "@/app/taxi-service/[slug]/RouteTaxiClient";
import { AreaTaxiClient } from "@/app/taxi-service/[slug]/AreaTaxiClient";

export const OUTSTATION_POPULAR_SLUGS = [
  "kolkata-to-digha",
  "kolkata-to-mandarmani",
  "kolkata-to-siliguri",
  "delhi-to-agra",
  "delhi-to-jaipur",
  "mumbai-to-pune",
  "bengaluru-to-mysore",
  "kolkata-to-puri",
];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return OUTSTATION_POPULAR_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseTaxiServiceSlug(slug, "outstation");

  const keywords =
    parsed.type === "route"
      ? `${parsed.from} to ${parsed.to} cab, ${parsed.from} to ${parsed.to} outstation cab, ${parsed.from} to ${parsed.to} taxi fare, ${parsed.from} to ${parsed.to} one way cab, book ${parsed.from} to ${parsed.to} cab`
      : `outstation taxi in ${parsed.cityName}, cab booking ${parsed.cityName}, 24x7 outstation cabs ${parsed.cityName}`;

  return {
    title: parsed.pageTitle,
    description: parsed.pageDescription,
    keywords,
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
    twitter: {
      card: "summary_large_image",
      title: parsed.pageTitle,
      description: parsed.pageDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function OutstationRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseTaxiServiceSlug(slug, "outstation");

  if (parsed.type === "route") {
    return (
      <RouteTaxiClient
        route={parsed}
        parentHref="/outstation"
        parentLabel="Outstation Cabs"
      />
    );
  }

  return <AreaTaxiClient route={parsed} />;
}
