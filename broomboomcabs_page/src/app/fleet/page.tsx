import React, { Suspense } from "react";
import { Metadata } from "next";
import { FleetClientPage } from "./FleetClientPage";
import { RouteTransitionLoader } from "@/components/RouteTransitionLoader";

export const metadata: Metadata = {
  title: "Available Cabs Fleet | BroomBoom Cabs",
  description: "Browse verified BroomBoom cabs including Hatchbacks, Sedans, SUVs, and Electric EV cabs with zero return fare guarantee.",
};

export default function FleetPage() {
  return (
    <Suspense
      fallback={
        <RouteTransitionLoader mode="search-to-fleet" />
      }
    >
      <FleetClientPage />
    </Suspense>
  );
}

