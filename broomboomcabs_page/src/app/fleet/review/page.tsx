import React, { Suspense } from "react";
import { Metadata } from "next";
import { ReviewClientPage } from "./ReviewClientPage";

export const metadata: Metadata = {
  title: "Review Booking | BroomBoom Cabs",
  description: "Review your BroomBoom cab trip details, inclusions, add-ons, and secure your ride with zero cancellation fee.",
};

export default function ReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold text-sm">
          Loading booking details...
        </div>
      }
    >
      <ReviewClientPage />
    </Suspense>
  );
}

