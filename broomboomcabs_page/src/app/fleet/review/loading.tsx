import React from "react";
import { RouteTransitionLoader } from "@/components/RouteTransitionLoader";

export default function ReviewLoading() {
  return <RouteTransitionLoader mode="fleet-to-review" />;
}
