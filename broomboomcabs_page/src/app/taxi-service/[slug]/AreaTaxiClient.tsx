"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  MapPin,
  ChevronRight,
  Fuel,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { ParsedTaxiSlug } from "@/utils/taxiRouteParser";

interface AreaTaxiClientProps {
  route: ParsedTaxiSlug;
}

export function AreaTaxiClient({ route }: AreaTaxiClientProps) {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("outstation-oneway");

  const areaName = route.from;

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || areaName,
      to: params.toCity || "",
      tripType: params.tripType || activeTripType,
      type: params.tripType || activeTripType,
      date: params.pickupDate || new Date().toISOString().split("T")[0],
      time: params.pickupTime || "10:00 AM",
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.returnTime || params.dropTime) queryObj.dropTime = params.returnTime || params.dropTime || "";
    if (params.hourlyPackage) queryObj.package = params.hourlyPackage;
    if (params.distanceKm) queryObj.distance = String(params.distanceKm);
    if (params.durationMinutes) queryObj.duration = String(params.durationMinutes);
    if (params.fromCoords) {
      queryObj.pickupLat = String(params.fromCoords.lat);
      queryObj.pickupLng = String(params.fromCoords.lng);
    }
    if (params.toCoords) {
      queryObj.dropLat = String(params.toCoords.lat);
      queryObj.dropLng = String(params.toCoords.lng);
    }
    const searchString = new URLSearchParams(queryObj).toString();
    router.push(`/book-taxi?${searchString}`);
  };

  const faqs = [
    {
      question: `How fast can I get a taxi pickup in ${areaName}?`,
      answer: `BroomBoom drivers are stationed locally across ${areaName}. For local rides and airport drops, cabs typically arrive within 10-15 minutes of booking confirmation. You can also pre-schedule rides 24x7.`,
    },
    {
      question: `Can I book outstation cabs from ${areaName}?`,
      answer: `Yes! BroomBoom offers dedicated one-way and round-trip outstation cabs starting directly from your doorstep in ${areaName} to all intercity destinations across India.`,
    },
    {
      question: `Are hourly car rental packages available in ${areaName}?`,
      answer: `Yes, we provide flexible hourly packages (4hr/40km, 8hr/80km, 12hr/120km) with unlimited stops, perfect for shopping, meetings, weddings, and local sightseeing in ${areaName}.`,
    },
    {
      question: `What types of vehicles are available in ${areaName}?`,
      answer: `We provide clean AC Hatchbacks (WagonR/Tiago), executive Sedans (Dzire/Etios), 6-seater SUVs (Ertiga), and luxury vehicles (Innova Crysta) with courteous drivers.`,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Top Navbar */}
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      {/* 2. Top Hero Search Banner (Identical layout to Main & Outstation Pages) */}
      <HeroSearch
        activeTripType={activeTripType}
        onTripTypeChange={(type) => setActiveTripType(type)}
        onSearch={handleHeroSearch}
        initialFrom={areaName}
        navigateOnTabClick={true}
        heading={{
          title: (
            <>
              Taxi Service in <span className="text-amber-400">{areaName}</span>
            </>
          ),
          subtitle: `24x7 Doorstep Pickup • Zero Surge Guarantee • Verified Chauffeurs in ${areaName}`,
          badge: `${areaName} • 24x7 Cab Service`,
        }}
      />

      {/* 3. Page Content Below Hero */}
      <div className="flex-grow pt-4 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 space-x-2">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/taxi-service" className="hover:text-amber-600 transition-colors">
              Taxi Service
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold truncate">{areaName}</span>
          </nav>
        </div>

        {/* Trust Highlights Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
              <MapPin className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Doorstep Pickup</div>
                <div className="text-[11px] text-slate-500">Fast arrival in {areaName}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
              <Fuel className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Zero Surge Pricing</div>
                <div className="text-[11px] text-slate-500">Fair fixed per-km rates</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Clean & Sanitized</div>
                <div className="text-[11px] text-slate-500">AC cabs maintained daily</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
              <Clock className="w-6 h-6 text-purple-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">24x7 Helpline</div>
                <div className="text-[11px] text-slate-500">+91 8240765499</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose BroomBoom */}
        <WhyChooseUs />

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <FaqSection items={faqs} />
        </section>
      </div>

      <Footer />

      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
