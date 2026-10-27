"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { ServiceContentSection } from "@/components/ServiceContentSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { LoginModal } from "@/components/LoginModal";
import { Footer } from "@/components/Footer";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { CityServiceInfo, ServiceMeta } from "@/data/cityServicesData";
import { FAQS } from "@/data/cabsData";
import { isUserLoggedIn } from "@/utils/auth";

interface CityServiceClientPageProps {
  cityData: CityServiceInfo;
  serviceMeta: ServiceMeta;
}

export const CityServiceClientPage: React.FC<CityServiceClientPageProps> = ({
  cityData,
  serviceMeta,
}) => {
  const router = useRouter();
  const [activeTripType, setActiveTripType] = useState<string>(serviceMeta.tripType);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSearchParams, setPendingSearchParams] = useState<SearchParams | null>(null);

  const initialToCity =
    serviceMeta.id === "outstation" && cityData.outstationRoutes.length > 0
      ? cityData.outstationRoutes[0].destination
      : serviceMeta.id === "airport"
      ? cityData.airportName
      : cityData.cityName;

  const [currentSearchParams, setCurrentSearchParams] = useState<SearchParams>({
    tripType: serviceMeta.tripType,
    fromCity: cityData.cityName,
    toCity: initialToCity,
    pickupDate: "2026-10-25",
    pickupTime: "10:00 AM",
    returnDate: "2026-10-26",
    returnTime: "08:00 PM",
    dropTime: "09:45 PM",
    hourlyPackage: "4 hrs 40 kms",
    airportMode: "to-airport",
    flightNumber: "",
  });

  const proceedWithSearch = (params: SearchParams) => {
    setCurrentSearchParams(params);
    const queryObj: Record<string, string> = {
      from: params.fromCity,
      to: params.toCity,
      tripType: params.tripType,
      type: params.tripType,
      pickupDate: params.pickupDate,
      date: params.pickupDate,
      pickupTime: params.pickupTime,
      time: params.pickupTime,
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.returnTime) queryObj.dropTime = params.returnTime;
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

    const query = new URLSearchParams(queryObj).toString();
    router.push(`/fleet?${query}`);
  };

  const handleSearch = (params: SearchParams) => {
    const isLoggedIn = isUserLoggedIn();

    if (!isLoggedIn) {
      setPendingSearchParams(params);
      setIsLoginModalOpen(true);
      return;
    }

    proceedWithSearch(params);
  };

  const handleLoginSuccess = () => {
    if (pendingSearchParams) {
      proceedWithSearch(pendingSearchParams);
      setPendingSearchParams(null);
    } else {
      router.push(`/fleet?from=${cityData.cityName}&type=${serviceMeta.tripType}`);
    }
  };

  // Dynamic heading above the search form
  const pageHeadingTitle =
    serviceMeta.id === "outstation"
      ? `Outstation Cabs in ${cityData.cityName}`
      : serviceMeta.id === "rental"
      ? `Hourly Car Rentals in ${cityData.cityName}`
      : `Airport Cabs in ${cityData.cityName}`;

  const pageHeadingSubtitle =
    serviceMeta.id === "outstation"
      ? `Guaranteed lowest one-way fares from ${cityData.cityName} with verified highway chauffeurs and zero return fare.`
      : serviceMeta.id === "rental"
      ? `Flexible 2 to 12-hour chauffeur-driven car rental packages in ${cityData.cityName} with unlimited stops.`
      : `On-time airport transfer pickups and drops for ${cityData.airportName} (${cityData.airportCode}) with live flight tracking.`;

  const pageHeadingBadge = `${cityData.cityName}, ${cityData.state} • ${serviceMeta.name}`;

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      {/* 1. TOP NAVBAR */}
      <Navbar
        onMyBookingsClick={() => setIsMyBookingsOpen(true)}
        activeService={serviceMeta.id}
        onSelectService={() => {}}
      />

      {/* 2. HERO SEARCH BOX WITH DYNAMIC HEADING ABOVE FORM */}
      <HeroSearch
        activeTripType={activeTripType}
        onTripTypeChange={(type) => setActiveTripType(type)}
        onSearch={handleSearch}
        initialFrom={cityData.cityName}
        initialTo={initialToCity}
        heading={{
          title: pageHeadingTitle,
          subtitle: pageHeadingSubtitle,
          badge: pageHeadingBadge,
        }}
      />

      {/* 3. DEDICATED EDITORIAL CONTENT & IMAGE SECTION (Varies by Service & City) */}
      <div id="service-content-section">
        <ServiceContentSection
          serviceId={serviceMeta.id}
          cityData={cityData}
        />
      </div>

      {/* 4. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection
        items={[...cityData.cityFaqs, ...FAQS.slice(0, 4)]}
        title={`Frequently Asked Questions — ${cityData.cityName} Cab Services`}
        subtitle={`Everything you need to know about BroomBoom outstation, airport, and rental cabs in ${cityData.cityName}.`}
      />

      {/* 6. FOOTER */}
      <Footer />

      {/* 7. MY BOOKINGS DRAWER */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />

      {/* 8. MOBILE BOTTOM NAV */}
      <MobileBottomNav
        onSearchClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMyBookingsClick={() => setIsMyBookingsOpen(true)}
        onOffersClick={() => {
          const el = document.getElementById("service-content-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />
      {/* 9. LOGIN / SIGN-UP MODAL */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
        initialMessage="Please sign in or register to search and book cabs with exclusive member discounts!"
      />
    </main>
  );
};
