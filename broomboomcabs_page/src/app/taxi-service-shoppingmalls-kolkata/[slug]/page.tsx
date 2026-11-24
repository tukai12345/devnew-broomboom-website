import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  parseShoppingMallSlug,
  SHOPPING_MALL_SLUGS,
  SHOPPING_MALLS_MAP,
} from "@/data/shoppingMallKolkataRoutes";
import { MallDetailClient } from "./MallDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SHOPPING_MALL_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mall = parseShoppingMallSlug(slug);

  if (!mall) {
    return {
      title: "Kolkata Shopping Malls Taxi Service | BroomBoom Cabs",
      description: "Dedicated city cabs and hourly rentals for shopping malls across Kolkata.",
    };
  }

  const canonicalUrl = `https://www.broomboomcabs.com/taxi-service-shoppingmalls-kolkata/${encodeURIComponent(
    mall.slug
  )}`;
  const title = `${mall.name} Taxi Service Kolkata | Cab Fare & Hourly Rental - BroomBoom Cabs`;
  const description = `Book taxi to ${mall.name} (${mall.zone}, Kolkata). Starting at ₹${mall.startingPrice}. Point-to-point drop & 4hr/8hr hourly rentals with waiting, zero parking queues, large luggage boot, and clean AC cabs.`;
  const keywords = `${mall.name} taxi kolkata, cab to ${mall.name}, ${mall.name} hourly car rental, ${mall.name} shopping cab, taxi service in ${mall.zone}, shopping mall cab kolkata`;

  return {
    title,
    description,
    keywords,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ShoppingMallSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const mall = parseShoppingMallSlug(slug);

  if (!mall) {
    notFound();
  }

  return <MallDetailClient mall={mall} />;
}
