import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  parseReservedCabSlug,
  RESERVED_CABS_SLUGS,
  RESERVED_CABS_MAP,
} from "@/data/reservedCabsRoutes";
import { ReservedDetailClient } from "./ReservedDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return RESERVED_CABS_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = parseReservedCabSlug(slug);

  if (!route) {
    return {
      title: "Reserved Airport Cabs | BroomBoom Cabs",
      description: "Dedicated airport and mountain private cab transfers across India.",
    };
  }

  const canonicalUrl = `https://www.broomboomcabs.com/reserved-cabs/${encodeURIComponent(
    route.slug
  )}`;
  const title = `${route.name} | Private Airport Taxi Fare & Booking - BroomBoom Cabs`;
  const description = `Book reserved private cabs from ${route.originAirport} to ${route.destination}. Starting at ₹${route.startingPrice}. Mountain-certified drivers, 60-min free flight delay buffer, and clean AC SUVs.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "BroomBoom Cabs",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function ReservedCabSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const route = parseReservedCabSlug(slug);

  if (!route) {
    notFound();
  }

  return <ReservedDetailClient route={route} />;
}
