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
