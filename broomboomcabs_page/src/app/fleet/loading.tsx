import React from "react";
import { RouteTransitionLoader } from "@/components/RouteTransitionLoader";

export default function FleetLoading() {
  return <RouteTransitionLoader mode="search-to-fleet" />;
}
