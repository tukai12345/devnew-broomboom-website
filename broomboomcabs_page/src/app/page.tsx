"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { OffersSection } from "@/components/OffersSection";
import { PopularRoutes } from "@/components/PopularRoutes";
import { CabBookingInfo } from "@/components/CabBookingInfo";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { FaqSection } from "@/components/FaqSection";
import { BookingModal } from "@/components/BookingModal";
import { LoginModal } from "@/components/LoginModal";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Footer } from "@/components/Footer";
import { RouteTransitionLoader } from "@/components/RouteTransitionLoader";
import { CabVehicle, RentalPackage } from "@/data/cabsData";
import { isUserLoggedIn, getStoredUser } from "@/utils/auth";
import { api } from "@/services/api";

export default function Home() {
  const router = useRouter();

  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const [activeTripType, setActiveTripType] = useState<string>("outstation-oneway");
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");

  const [currentSearchParams, setCurrentSearchParams] = useState<SearchParams>({
    tripType: "outstation-oneway",
    fromCity: "",
    toCity: "",
    pickupDate: getTodayStr(),
    pickupTime: "10:00 AM",
    returnDate: getTodayStr(),
    returnTime: "08:00 PM",
    dropTime: "09:45 PM",
    hourlyPackage: "8 hrs 80 kms",
    airportMode: "to-airport",
    flightNumber: "",
  });

  const [selectedCabForBooking, setSelectedCabForBooking] = useState<CabVehicle | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSearchParams, setPendingSearchParams] = useState<SearchParams | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string>("BROOMFIRST");
  const [isNavigatingToFleet, setIsNavigatingToFleet] = useState(false);
  const [transitionRoute, setTransitionRoute] = useState<{ from?: string; to?: string } | null>(null);

  const proceedWithSearch = (params: SearchParams) => {
    setCurrentSearchParams(params);
    setActiveTripType(params.tripType);
    setFromCity(params.fromCity);
    setToCity(params.toCity);
    setTransitionRoute({ from: params.fromCity, to: params.toCity });
    setIsNavigatingToFleet(true);

    const queryObj: Record<string, string> = {
      from: params.fromCity,
      to: params.toCity,
      type: params.tripType,
      date: params.pickupDate,
      time: params.pickupTime,
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.dropTime || params.returnTime) queryObj.dropTime = params.dropTime || params.returnTime;
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
    setTimeout(() => {
      router.push(`/fleet?${query}`);
    }, 750);
  };

  const handleSearch = (params: SearchParams) => {
    const hasPickup = Boolean(params.fromCity && params.fromCity.trim().length > 0);
    const hasDrop = params.tripType === "hourly" || Boolean(params.toCity && params.toCity.trim().length > 0);

    if (!hasPickup || !hasDrop) {
      alert("Please enter both pickup and drop locations to view available cabs.");
      return;
    }

    const isLoggedIn = isUserLoggedIn();

    if (!isLoggedIn) {
      setPendingSearchParams(params);
      setIsLoginModalOpen(true);
      return;
    }

    proceedWithSearch(params);
  };

  const handleLoginSuccess = (user?: { identifier: string; role: string; name?: string; phone?: string; email?: string }) => {
    if (pendingSearchParams) {
      const activeUser = user || getStoredUser();
      const detectedPhone = activeUser?.phone || activeUser?.identifier;
      const detectedName = activeUser?.name;

      if (detectedPhone) {
        api.createBookingLead({
          serviceType: pendingSearchParams.tripType,
          tripType: pendingSearchParams.tripType,
          fromCity: pendingSearchParams.fromCity,
          toCity: pendingSearchParams.toCity || undefined,
          pickupAddress: pendingSearchParams.fromCity,
          dropAddress: pendingSearchParams.toCity || undefined,
          pickupDate: pendingSearchParams.pickupDate,
          pickupTime: pendingSearchParams.pickupTime,
          returnDate: pendingSearchParams.tripType === "outstation-round" ? pendingSearchParams.returnDate : undefined,
          returnTime: pendingSearchParams.dropTime || undefined,
          dropTime: pendingSearchParams.dropTime || undefined,
          hourlyPackage: pendingSearchParams.tripType === "hourly" ? pendingSearchParams.hourlyPackage : undefined,
          airportMode: pendingSearchParams.tripType === "airport" ? pendingSearchParams.airportMode : undefined,
          distanceKm: pendingSearchParams.distanceKm,
          durationMinutes: pendingSearchParams.durationMinutes,
          customerName: detectedName,
          customerMobile: detectedPhone,
          source: "Hero Search (Registered)",
          rawSearchParams: {
            ...pendingSearchParams,
            customerMobile: detectedPhone,
            timestamp: new Date().toISOString(),
          },
        }).catch(() => {});
      }

      const hasPickup = Boolean(pendingSearchParams.fromCity && pendingSearchParams.fromCity.trim().length > 0);
      const hasDrop = pendingSearchParams.tripType === "hourly" || Boolean(pendingSearchParams.toCity && pendingSearchParams.toCity.trim().length > 0);

      if (hasPickup && hasDrop) {
        proceedWithSearch(pendingSearchParams);
      }
      setPendingSearchParams(null);
    }
  };

  const handleSelectRoute = (from: string, to: string) => {
    setFromCity(from);
    setToCity(to);
    setCurrentSearchParams((prev) => ({
      ...prev,
      tripType: "outstation-oneway",
      fromCity: from,
      toCity: to,
    }));
    setActiveTripType("outstation-oneway");

    setTimeout(() => {
      const resultsElement = document.getElementById("cab-results-section");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleBookCab = (cab: CabVehicle) => {
    setSelectedCabForBooking(cab);
    setIsBookingModalOpen(true);
  };

  const handleSelectPackage = (pkg: RentalPackage) => {
    setActiveTripType("hourly");
    setCurrentSearchParams((prev) => ({
      ...prev,
      tripType: "hourly",
      hourlyPackage: `${pkg.duration} / ${pkg.km}`,
    }));

    setTimeout(() => {
      const resultsElement = document.getElementById("cab-results-section");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleBookAirport = () => {
    setActiveTripType("airport");
    setCurrentSearchParams((prev) => ({
      ...prev,
      tripType: "airport",
      toCity: "Airport Terminal",
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToOffers = () => {
    const el = document.getElementById("offers-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        onMyBookingsClick={() => setIsMyBookingsOpen(true)}
        activeService={activeTripType}
        onSelectService={(service) => {
          setActiveTripType(service);
          setCurrentSearchParams((prev) => ({
            ...prev,
            tripType: service as any,
          }));
        }}
      />

      {/* Hero Section */}
      <HeroSearch
        activeTripType={activeTripType}
        onTripTypeChange={(type) => setActiveTripType(type)}
        onSearch={handleSearch}
        initialFrom={fromCity}
        initialTo={toCity}
      />

      {/* Offers Section (Exact 1:1 match with screenshot) */}
      <div id="offers-section">
        <OffersSection
          onApplyPromo={(code) => {
            setAppliedPromo(code);
          }}
        />
      </div>

      {/* Popular Highway Outstation Corridors */}
      <PopularRoutes onSelectRoute={handleSelectRoute} />

      {/* Online Cab Booking on BroomBoom (SEO & Traveler Information Guide) */}
      <CabBookingInfo />

      {/* Why Choose BroomBoom Cabs (Value Proposition) */}
      <WhyChooseUs />

      {/* Customer Testimonials & Reviews */}
      <Testimonials />

      {/* FAQs */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Confirmation Drawer/Modal */}
      <BookingModal
        cab={selectedCabForBooking}
        searchParams={currentSearchParams}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        appliedPromo={appliedPromo}
      />

      {/* My Bookings Side Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />

      {/* Mobile Sticky Bottom Action Nav */}
      <MobileBottomNav
        onSearchClick={scrollToHero}
        onMyBookingsClick={() => setIsMyBookingsOpen(true)}
        onOffersClick={scrollToOffers}
      />
      {/* Global Login / Sign-up Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
        initialMessage="Please sign in or register to search and book cabs with exclusive member discounts!"
      />

      {/* Animated Route Transition Loader (Login/Search -> Fleet) */}
      {isNavigatingToFleet && (
        <RouteTransitionLoader
          mode="search-to-fleet"
          from={transitionRoute?.from}
          to={transitionRoute?.to}
        />
      )}
    </main>
  );
}
