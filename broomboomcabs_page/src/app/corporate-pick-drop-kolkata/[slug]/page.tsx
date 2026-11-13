import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  parseCorporateSlug,
  CORPORATE_PICK_DROP_SLUGS,
  CORPORATE_DETAILS_MAP,
} from "@/data/corporatePickDropRoutes";
import { CorporateDetailClient } from "./CorporateDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CORPORATE_PICK_DROP_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const corp = parseCorporateSlug(slug);

  if (!corp) {
    return {
      title: "Corporate Pick & Drop Kolkata | BroomBoom Cabs",
      description: "Dedicated employee transportation, daily office cabs, and staff shuttles across Kolkata.",
    };
  }

  const canonicalUrl = `https://dev.broomboomcabs.com/corporate-pick-drop-kolkata/${encodeURIComponent(
    corp.slug
  )}`;
  const title = `${corp.name} Corporate Pick & Drop Cabs Kolkata | Employee Commute - BroomBoom Cabs`;
  const description = `Reliable employee pick and drop cab service for ${corp.name} (${corp.hubLocation}). Starting at ₹${corp.startingPricePerTrip}/trip or ₹${corp.monthlyPassEstimate}/month pass. 99.8% on-time SLA, GPS tracking, female employee night safety, and AC cars.`;

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

export default async function CorporateSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const corp = parseCorporateSlug(slug);

  if (!corp) {
    notFound();
  }

  return <CorporateDetailClient corp={corp} />;
}
