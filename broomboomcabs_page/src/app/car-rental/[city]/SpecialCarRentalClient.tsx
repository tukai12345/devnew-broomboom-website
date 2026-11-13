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
  ChevronRight,
  Users,
  Navigation,
  Fuel,
  ArrowRight,
  Luggage,
  Award,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { SpecialCarRentalInfo } from "@/data/carRentalRoutes";

interface SpecialCarRentalClientProps {
  info: SpecialCarRentalInfo;
}

export function SpecialCarRentalClient({ info }: SpecialCarRentalClientProps) {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("hourly");

  const cityName = info.cityName;

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || cityName,
      to: params.toCity || "",
      tripType: params.tripType || activeTripType,
      type: params.tripType || activeTripType,
      date: params.pickupDate || new Date().toISOString().split("T")[0],
      time: params.pickupTime || "09:00 AM",
      vehiclePreference: info.vehicleName,
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.returnTime || params.dropTime)
      queryObj.dropTime = params.returnTime || params.dropTime || "";
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

  const scrollToSearch = () => {
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const packages = [
    {
      name: "Half Day Local",
      duration: "4 Hours / 40 KM",
      priceText: "From ₹2,499",
      ideal: "City meetings, airport transfers, quick family errands",
    },
    {
      name: "Full Day Disposal",
      duration: "8 Hours / 80 KM",
      priceText: "From ₹4,299",
      popular: true,
      ideal: "Sightseeing, corporate client duties, wedding shopping",
    },
    {
      name: "Extended Day Rental",
      duration: "12 Hours / 120 KM",
      priceText: "From ₹5,899",
      ideal: "Multi-stop excursions, full day events, temple tours",
    },
    {
      name: "Outstation Intercity",
      duration: "Per KM Billing",
      priceText: info.startingPrice,
      ideal: "Weekend getaways, group vacations, intercity highway tours",
    },
  ];

  const faqs = [
    {
      question: `How do I book a ${info.vehicleName} in ${cityName}?`,
      answer: `Booking is easy: select your pickup location in ${cityName}, date, and required duration (hourly package or outstation). You can also call our instant support helpline at +91 8240765499 for custom itineraries and group quotes.`,
    },
    {
      question: `What amenities are included in ${info.vehicleName}?`,
      answer: `All our ${info.vehicleName} vehicles come equipped with high-efficiency air conditioning, pushback recliner seats, ample boot luggage space, overhead luggage rack, music system, and charging ports.`,
    },
    {
      question: `Are driver charges, fuel, and tolls included?`,
      answer: `Fuel and chauffeur charges are included in standard hourly packages. State permits, toll taxes, and parking fees are charged transparently at actuals based on government receipt.`,
    },
    {
      question: `Can we use this vehicle for outstation travel from ${cityName}?`,
      answer: `Yes! Our fleet is fully licensed with national / all-India tourist permits, comprehensive commercial insurance, and experienced highway drivers.`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      <main className="flex-grow pt-4 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 space-x-2">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/car-rental" className="hover:text-amber-600 transition-colors">
              Car Rental
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold truncate">{info.h1}</span>
          </nav>
        </div>

        {/* Hero Header */}
        <section className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pb-8 pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-semibold mb-4 border border-amber-300">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Verified Commercial Fleet &bull; {info.seats} &bull; Chauffeur Driven
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {info.h1}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {info.pageDescription}
              </p>
            </div>

            {/* Embedded HeroSearch */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 sm:p-4 md:p-6 mb-8">
              <HeroSearch
                activeTripType={activeTripType}
                onTripTypeChange={(type) => setActiveTripType(type)}
                onSearch={handleHeroSearch}
                initialFrom={cityName}
                heading={{
                  title: `Hire ${info.vehicleName} in ${cityName}`,
                  subtitle: "Local disposal, wedding travel, corporate transfer & outstation tours",
                  badge: `${cityName} • Premium Rental`,
                }}
              />
            </div>

            {/* Trust Highlights Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                <Users className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{info.seats}</div>
                  <div className="text-[11px] text-slate-500">Spacious Pushback Seating</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                <Luggage className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Large Luggage Space</div>
                  <div className="text-[11px] text-slate-500">Rear Boot &amp; Roof Carrier</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Verified Chauffeurs</div>
                  <div className="text-[11px] text-slate-500">Experienced Highway Drivers</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                <Clock className="w-6 h-6 text-purple-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">24x7 Assistance</div>
                  <div className="text-[11px] text-slate-500">Helpline: +91 8240765499</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Packages */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Features Box */}
            <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Vehicle Amenities
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1 mb-4">
                Why Hire {info.vehicleName}?
              </h2>
              <ul className="space-y-3">
                {info.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-xs font-bold text-amber-900">Starting Rental Rate</div>
                <div className="text-lg font-black text-amber-700 mt-0.5">{info.startingPrice}</div>
                <div className="text-[11px] text-amber-800 mt-1">
                  Includes driver allowance &amp; AC fuel.
                </div>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900">Rental Packages Available</h3>
                <p className="text-xs text-slate-500">
                  Choose from hourly packages with unlimited local stops or custom outstation trips.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-xl border ${
                      pkg.popular
                        ? "border-amber-500 bg-amber-50/20 ring-1 ring-amber-500"
                        : "border-slate-200 bg-white"
                    } p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 right-4 bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        Most Popular
                      </span>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{pkg.name}</h4>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5">{pkg.duration}</div>
                      <p className="text-xs text-slate-600 mt-2">{pkg.ideal}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-extrabold text-amber-600 text-sm">{pkg.priceText}</span>
                      <button
                        onClick={scrollToSearch}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant Call Banner */}
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg">
                    Need Custom Group Booking or Multi-Day Tour?
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Get an instant customized quote with dedicated fleet support in {cityName}.
                  </p>
                </div>
                <a
                  href="tel:+918240765499"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call +91 8240765499</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <FaqSection items={faqs} />
        </section>
      </main>

      <Footer />

      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </div>
  );
}
