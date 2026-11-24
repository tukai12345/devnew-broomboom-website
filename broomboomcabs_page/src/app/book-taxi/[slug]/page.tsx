import React from "react";
import { Metadata } from "next";
import { parseTaxiServiceSlug } from "@/utils/taxiRouteParser";
import { RouteTaxiClient } from "@/app/taxi-service/[slug]/RouteTaxiClient";
import { AreaTaxiClient } from "@/app/taxi-service/[slug]/AreaTaxiClient";
import { BOOK_TAXI_ROUTES } from "@/data/bookTaxiRoutes";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BOOK_TAXI_ROUTES.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseTaxiServiceSlug(slug, "book-taxi");

  const keywords =
    parsed.type === "route"
      ? `${parsed.from} to ${parsed.to} cab, ${parsed.from} to ${parsed.to} taxi fare, ${parsed.from} to ${parsed.to} one way cab, book ${parsed.from} to ${parsed.to} cab, online cab booking ${parsed.from} to ${parsed.to}`
      : parsed.type === "pet"
      ? `pet friendly cabs ${parsed.from}, dog taxi ${parsed.from}, cat cab ${parsed.from}, travel with pets cab ${parsed.from}`
      : `taxi service in ${parsed.cityName}, cab booking ${parsed.cityName}, cabs near ${parsed.cityName}, 24x7 taxi ${parsed.cityName}`;

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

export default async function BookTaxiSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseTaxiServiceSlug(slug, "book-taxi");

  if (parsed.type === "route") {
    return (
      <RouteTaxiClient
        route={parsed}
        parentHref="/book-taxi"
        parentLabel="Book Taxi"
      />
    );
  }

  return <AreaTaxiClient route={parsed} />;
}
