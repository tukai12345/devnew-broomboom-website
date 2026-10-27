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
import { CabVehicle, RentalPackage } from "@/data/cabsData";

export default function Home() {
  const router = useRouter();
  const [activeTripType, setActiveTripType] = useState<string>("outstation-oneway");
  const [fromCity, setFromCity] = useState<string>("Mumbai");
  const [toCity, setToCity] = useState<string>("Delhi");

  const [currentSearchParams, setCurrentSearchParams] = useState<SearchParams>({
    tripType: "outstation-oneway",
    fromCity: "Mumbai",
    toCity: "Delhi",
    pickupDate: "2026-10-24",
    pickupTime: "10:00 AM",
    returnDate: "2026-10-26",
    returnTime: "08:00 PM",
    dropTime: "09:45 PM",
    hourlyPackage: "4 hrs 40 kms",
    airportMode: "to-airport",
    flightNumber: "",
  });

  const [selectedCabForBooking, setSelectedCabForBooking] = useState<CabVehicle | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSearchParams, setPendingSearchParams] = useState<SearchParams | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string>("BROOMFIRST");

  const proceedWithSearch = (params: SearchParams) => {
    setCurrentSearchParams(params);
    setActiveTripType(params.tripType);
    setFromCity(params.fromCity);
    setToCity(params.toCity);

    const queryObj: Record<string, string> = {
      from: params.fromCity,
      to: params.toCity,
      type: params.tripType,
      date: params.pickupDate,
      time: params.pickupTime,
    };
    if (params.distanceKm) queryObj.distance = String(params.distanceKm);
    if (params.durationMinutes) queryObj.duration = String(params.durationMinutes);

    const query = new URLSearchParams(queryObj).toString();
    router.push(`/fleet?${query}`);
  };

  const handleSearch = (params: SearchParams) => {
    const isLoggedIn =
      typeof window !== "undefined" && Boolean(localStorage.getItem("broomboom_user"));

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
      router.push("/fleet");
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
    </main>
  );
}
