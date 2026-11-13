import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  parseTempleSlug,
  TEMPLE_KOLKATA_SLUGS,
  TEMPLE_DETAILS_MAP,
} from "@/data/templeKolkataRoutes";
import { TempleDetailClient } from "./TempleDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TEMPLE_KOLKATA_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const temple = parseTempleSlug(slug);

  if (!temple) {
    return {
      title: "Temple Taxi Service in Kolkata | BroomBoom Cabs",
      description: "Dedicated AC cabs for pilgrimage yatra and temple darshan from Kolkata.",
    };
  }

  const canonicalSlug = temple.slug === "iskcon(mayapur)" ? "iskcon(mayapur)" : temple.slug;
  const canonicalUrl = `https://dev.broomboomcabs.com/taxi-service-temple-kolkata/${encodeURIComponent(
    canonicalSlug
  )}`;
  const title = `${temple.name} Taxi Service from Kolkata | Cab Fare & Darshan Booking - BroomBoom Cabs`;
  const description = `Book dedicated round-trip taxi from Kolkata to ${temple.name} (${temple.location}). Starting at ₹${temple.startingPrice}. Clean AC Sedans & SUVs, experienced chauffeurs, doorstep pickup, and waiting during puja darshan.`;

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

export default async function TempleSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const temple = parseTempleSlug(slug);

  if (!temple) {
    notFound();
  }

  return <TempleDetailClient temple={temple} />;
}
