import React from "react";
import { Metadata } from "next";
import { CareersClientPage } from "./CareersClientPage";

export const metadata: Metadata = {
  title: "Careers at BroomBoom | Job Openings & Opportunities — Join Our Team",
  description:
    "Explore exciting career opportunities at BroomBoom Cabs in Engineering, Product, Operations, and Business Growth. Join India's fastest-growing intercity and local car rental network.",
  openGraph: {
    title: "Careers at BroomBoom | Job Openings & Opportunities",
    description:
      "Join the team revolutionizing intercity mobility across India. Check out open positions in Tech, Product, and Operations.",
    type: "website",
    url: "https://broomboomcabs.com/careers",
  },
};

export default function CareersPage() {
  return <CareersClientPage />;
}
