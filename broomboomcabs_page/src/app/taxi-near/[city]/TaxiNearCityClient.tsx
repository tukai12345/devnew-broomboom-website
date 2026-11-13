"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Car,
  Star,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { LoginModal } from "@/components/LoginModal";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { isUserLoggedIn } from "@/utils/auth";
import { getCityServiceData } from "@/data/cityServicesData";

interface TaxiNearCityClientProps {
  cityName: string;
  citySlug: string;
}

export const TaxiNearCityClient: React.FC<TaxiNearCityClientProps> = ({
  cityName,
  citySlug,
}) => {
  const router = useRouter();
  const [activeTripType, setActiveTripType] = useState<string>("hourly");
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSearchParams, setPendingSearchParams] = useState<SearchParams | null>(null);

  const cityData = getCityServiceData(citySlug);

  const localHotspots = cityData?.popularLocalHotspots || [
    "Railway Station & Inter-State Bus Terminals",
    "International & Domestic Airport Terminals",
    "Central Business Districts & Tech Parks",
    "Major Shopping Malls & Healthcare Hubs",
  ];

  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const proceedWithSearch = (
    params: Partial<SearchParams> & {
      tripType?: any;
      fromCity?: string;
      toCity?: string;
    }
  ) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || cityName,
      to: params.toCity || params.fromCity || cityName,
      tripType: params.tripType || "hourly",
      type: params.tripType || "hourly",
      date: params.pickupDate || getTodayStr(),
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

  const cityFaqs = [
    {
      category: "Local Pickup",
      question: `How fast will a taxi arrive at my location in ${cityName}?`,
      answer: `Our average cab arrival time in ${cityName} is between 3 to 7 minutes. Once you confirm your ride, the closest verified BroomBoom pilot is dispatched immediately.`,
    },
    {
      category: "Fare Rates",
      question: `What are the local taxi rates in ${cityName}?`,
      answer: `Fares start at ₹120 for Hatchbacks (₹11/km), ₹160 for Sedans (₹13/km), and ₹250 for 6-seater SUVs (₹18/km). There is zero peak-hour surge pricing in ${cityName}.`,
    },
    {
      category: "Airport & Station",
      question: `Can I book a cab near me for airport or railway station drops in ${cityName}?`,
      answer: `Yes, we provide 24x7 doorstep pickups for early morning flights, late-night train arrivals, and all major transport hubs in and around ${cityName}.`,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsMyBookingsOpen(true)} />

      {/* Hero Banner */}
      <section
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.88), rgba(10, 16, 26, 0.94)), url('https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>&rsaquo;</span>
            <Link href="/taxi-near" className="hover:underline">
              Taxi Near Me
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-300">{cityName}</span>
          </nav>

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>{cityName} Live Fleet Active &bull; 4 Min Avg ETA</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Taxi Near Me in {cityName}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-2xl">
              Book the nearest verified cab in {cityName} in seconds. Clean AC Hatchbacks, Sedans &amp; SUVs with transparent per-km billing and zero peak surge pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Search Box */}
      <div className="relative -mt-12 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <HeroSearch
          activeTripType={activeTripType}
          onTripTypeChange={(type) => setActiveTripType(type)}
          onSearch={handleSearch}
          initialFrom={cityName}
          initialTo={cityName}
          heading={{
            title: `Book Taxi Near You in ${cityName}`,
            subtitle: `Instant commercial cab dispatch across all neighbourhoods in ${cityName}`,
            badge: `${cityName} • Rapid Doorstep Pickup`,
          }}
        />
      </div>

      {/* Hotspots in City */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">
              Coverage &amp; Hotspots
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Top Pickup Locations in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Chauffeurs stationed across commercial and residential hubs for quickest response.
            </p>
          </div>
          <a
            href="tel:+918240765499"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 8240765499</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {localHotspots.map((spot, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-amber-400 transition-all flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">{spot}</h3>
                <p className="text-xs text-slate-400 mt-1">Avg 3-5 min pickup</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick City Car Categories */}
      <section className="py-14 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">
              Fleet Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Available Cabs Near You in {cityName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Economy 4-Seater
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-4">Hatchback</h3>
              <p className="text-xs text-slate-500 mt-1">WagonR, Swift, Tiago or similar</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-slate-900">₹11</span>
                  <span className="text-xs text-slate-400 font-semibold"> / km</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">Base ₹120</span>
              </div>
              <button
                onClick={() => proceedWithSearch({ tripType: "hourly", fromCity: cityName, toCity: cityName })}
                className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Book Hatchback
              </button>
            </div>

            <div className="bg-amber-50/60 rounded-2xl p-6 border-2 border-amber-400 shadow-md relative">
              <span className="absolute -top-3 right-6 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                Most Chosen
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                Comfort Sedan
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-4">Sedan</h3>
              <p className="text-xs text-slate-500 mt-1">Dzire, Etios, Aura or similar</p>
              <div className="mt-4 pt-4 border-t border-amber-200/60 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-slate-900">₹13</span>
                  <span className="text-xs text-slate-400 font-semibold"> / km</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">Base ₹160</span>
              </div>
              <button
                onClick={() => proceedWithSearch({ tripType: "hourly", fromCity: cityName, toCity: cityName })}
                className="mt-5 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors"
              >
                Book Sedan
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Spacious 6-Seater
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-4">SUV</h3>
              <p className="text-xs text-slate-500 mt-1">Ertiga, Triber, Carens or similar</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-slate-900">₹18</span>
                  <span className="text-xs text-slate-400 font-semibold"> / km</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">Base ₹250</span>
              </div>
              <button
                onClick={() => proceedWithSearch({ tripType: "hourly", fromCity: cityName, toCity: cityName })}
                className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Book SUV
              </button>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title={`Taxi Near Me in ${cityName} — FAQs`}
            subtitle={`Common questions about booking cabs in ${cityName}`}
            items={cityFaqs}
          />
        </div>
      </section>

      <Footer />

      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => {
            setIsLoginModalOpen(false);
            if (pendingSearchParams) {
              proceedWithSearch(pendingSearchParams);
              setPendingSearchParams(null);
            }
          }}
        />
      )}

      {isMyBookingsOpen && (
        <MyBookingsDrawer
          isOpen={isMyBookingsOpen}
          onClose={() => setIsMyBookingsOpen(false)}
        />
      )}
    </main>
  );
};
