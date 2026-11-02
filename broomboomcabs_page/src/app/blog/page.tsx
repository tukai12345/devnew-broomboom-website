import React, { Suspense } from "react";
import { Metadata } from "next";
import { BlogClientPage } from "./BlogClientPage";

export const metadata: Metadata = {
  title: "Blog & Travel Guides | BroomBoom Cabs — India Outstation Tips & Itineraries",
  description:
    "Explore travel guides, road trip itineraries, taxi fare saving tips, airport transfer advice, and outstation highway guides across India by BroomBoom Cabs.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/blog",
  },
};

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold text-sm">
          Loading BroomBoom Blog...
        </div>
      }
    >
      <BlogClientPage />
    </Suspense>
  );
}
