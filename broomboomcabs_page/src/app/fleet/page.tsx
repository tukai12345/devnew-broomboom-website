import React, { Suspense } from "react";
import { Metadata } from "next";
import { FleetClientPage } from "./FleetClientPage";

export const metadata: Metadata = {
  title: "Available Cabs Fleet | BroomBoom Cabs",
  description: "Browse verified BroomBoom cabs including Hatchbacks, Sedans, SUVs, and Electric EV cabs with zero return fare guarantee.",
};

export default function FleetPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold text-sm">
          Loading BroomBoom Fleet...
        </div>
      }
    >
      <FleetClientPage />
    </Suspense>
  );
}

