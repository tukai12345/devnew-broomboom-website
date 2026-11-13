"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  Heart,
  Plane,
  Clock,
  Navigation,
  ShieldCheck,
  Star,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  PhoneCall,
  MapPin,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { LoginModal } from "@/components/LoginModal";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { isUserLoggedIn } from "@/utils/auth";
import { TOP_10_CITIES_SERVICES } from "@/data/cityServicesData";

const TAXI_CATEGORIES = [
  {
    id: "outstation",
    title: "Outstation Cabs",
    badge: "One-Way & Round Trip",
    desc: "Guaranteed lowest one-way fares with zero return penalty. AC Hatchbacks, Sedans & SUVs across 100+ cities.",
    href: "/outstation-cabs",
    icon: <Navigation className="w-5 h-5 text-amber-500" />,
  },
  {
    id: "airport",
    title: "Airport Transfers",
    badge: "24x7 Terminal Drops",
    desc: "Flight-tracked on-time pickups, free 45-min waiting at CCU, DEL, BOM, BLR & all major international airports.",
    href: "/airport-cabs",
    icon: <Plane className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "rental",
    title: "Hourly Car Rentals",
    badge: "2h to 12h Packages",
    desc: "Chauffeur-driven local cabs for city meetings, wedding disposal, shopping, or family day outs with unlimited stops.",
    href: "/car-rental",
    icon: <Clock className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: "pet-friendly",
    title: "Pet-Friendly Cabs",
    badge: "Dogs & Cats Welcome",
    desc: "100% pet-welcoming verified pilots, clean seat covers, and stress-free rides for vet visits, beaches & trips.",
    href: "/taxi-service/pet-friendly-cabs-in-kolkata",
    icon: <Heart className="w-5 h-5 text-rose-500" />,
  },
  {
    id: "taxi-near",
    title: "Taxi Near Me",
    badge: "3-8 Min Local Pickup",
    desc: "Fast doorstep pickup with zero peak-hour surge pricing. Verified local drivers with instant booking.",
    href: "/taxi-near",
    icon: <MapPin className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: "self-drive",
    title: "Self-Driven Rentals",
    badge: "Zero Security Deposit",
    desc: "Rent premium Hatchbacks, Sedans, and 4x4 SUVs by day or month with unlimited kilometers.",
    href: "/self-driven",
    icon: <KeyRound className="w-5 h-5 text-purple-500" />,
  },
];

const POPULAR_PET_CITIES = [
  { city: "Kolkata", slug: "pet-friendly-cab-in-kolkata", state: "West Bengal" },
  { city: "Delhi NCR", slug: "pet-friendly-cab-in-delhi", state: "Delhi" },
  { city: "Mumbai", slug: "pet-friendly-cab-in-mumbai", state: "Maharashtra" },
  { city: "Bangalore", slug: "pet-friendly-cab-in-bangalore", state: "Karnataka" },
  { city: "Pune", slug: "pet-friendly-cab-in-pune", state: "Maharashtra" },
  { city: "Hyderabad", slug: "pet-friendly-cab-in-hyderabad", state: "Telangana" },
  { city: "Jaipur", slug: "pet-friendly-cab-in-jaipur", state: "Rajasthan" },
  { city: "Chandigarh", slug: "pet-friendly-cab-in-chandigarh", state: "Punjab/Haryana" },
  { city: "Ahmedabad", slug: "pet-friendly-cab-in-ahmedabad", state: "Gujarat" },
  { city: "Kochi", slug: "pet-friendly-cab-in-kochi", state: "Kerala" },
  { city: "Lucknow", slug: "pet-friendly-cab-in-lucknow", state: "Uttar Pradesh" },
  { city: "Chennai", slug: "pet-friendly-cab-in-chennai", state: "Tamil Nadu" },
];

const POPULAR_NEAR_CITIES = [
  { city: "Kolkata", slug: "kolkata", eta: "4 mins" },
  { city: "Delhi NCR", slug: "delhi", eta: "5 mins" },
  { city: "Mumbai", slug: "mumbai", eta: "6 mins" },
  { city: "Bangalore", slug: "bangalore", eta: "5 mins" },
  { city: "Pune", slug: "pune", eta: "6 mins" },
  { city: "Hyderabad", slug: "hyderabad", eta: "7 mins" },
  { city: "Ahmedabad", slug: "ahmedabad", eta: "5 mins" },
  { city: "Jaipur", slug: "jaipur", eta: "4 mins" },
  { city: "Chandigarh", slug: "chandigarh", eta: "4 mins" },
  { city: "Kochi", slug: "kochi", eta: "5 mins" },
];

const POPULAR_ROUTES = [
  { from: "Kolkata", to: "Digha", distance: "185 km", time: "4.5 hrs", fare: 2299, type: "Beach Getaway" },
  { from: "Delhi", to: "Agra", distance: "235 km", time: "3.5 hrs", fare: 2699, type: "Expressway" },
  { from: "Mumbai", to: "Pune", distance: "150 km", time: "3.0 hrs", fare: 2199, type: "Business Hub" },
  { from: "Bangalore", to: "Mysore", distance: "145 km", time: "2.5 hrs", fare: 2099, type: "Heritage Expressway" },
  { from: "Pune", to: "Mahabaleshwar", distance: "120 km", time: "3.2 hrs", fare: 2499, type: "Hill Station" },
  { from: "Lucknow", to: "Prayagraj", distance: "200 km", time: "4.0 hrs", fare: 2649, type: "Pilgrimage Highway" },
  { from: "Jaipur", to: "Delhi", distance: "280 km", time: "4.5 hrs", fare: 3199, type: "Golden Triangle" },
  { from: "Chandigarh", to: "Shimla", distance: "115 km", time: "3.5 hrs", fare: 2599, type: "Scenic Hills" },
];

const TAXI_FAQS = [
  {
    category: "General Booking",
    question: "How do I book a taxi service with BroomBoom?",
    answer:
      "Simply enter your pickup and drop city or local address in the search box above, select your trip date and time, choose your preferred car (Hatchback, Sedan, SUV, or Premium), and confirm your booking in under 60 seconds with instant driver confirmation.",
  },
  {
    category: "Pricing & Transparency",
    question: "Are there any hidden fees, night charges, or return fare penalties?",
    answer:
      "No. BroomBoom operates on 100% transparent pricing. On outstation one-way trips, you pay strictly for the one-way distance with zero return fare. Fuel, driver allowance, and GST are clearly detailed before checkout.",
  },
  {
    category: "Pet Policy",
    question: "Can I bring my pet (dog or cat) in the cab?",
    answer:
      "Yes! BroomBoom offers dedicated pet-friendly cabs with compassionate chauffeurs. Simply select or mention pet-friendly travel or visit our dedicated Pet Friendly Cabs directory to book.",
  },
  {
    category: "Safety & Reliability",
    question: "Are BroomBoom drivers police-verified and cabs sanitized?",
    answer:
      "Every chauffeur undergoes background verification, commercial license check, and professional customer etiquette training. All vehicles are sanitized, air-conditioned, and GPS-tracked 24x7 with emergency SOS support.",
  },
];

export const TaxiServiceDirectoryClient: React.FC = () => {
  const router = useRouter();
  const [activeTripType, setActiveTripType] = useState<string>("outstation-oneway");
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSearchParams, setPendingSearchParams] = useState<SearchParams | null>(null);

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
      from: params.fromCity || "Kolkata",
      to: params.toCity || "Digha",
      tripType: params.tripType || "outstation-oneway",
      type: params.tripType || "outstation-oneway",
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

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Top Navbar */}
      <Navbar onMyBookingsClick={() => setIsMyBookingsOpen(true)} />

      {/* 2. Hero Search Banner (Identical layout to Main & Outstation Pages) */}
      <HeroSearch
        activeTripType={activeTripType}
        onTripTypeChange={(type) => setActiveTripType(type)}
        onSearch={handleSearch}
        initialFrom="Kolkata"
        initialTo="Digha"
        navigateOnTabClick={true}
        heading={{
          title: (
            <>
              All India Taxi Service &amp;{" "}
              <span className="text-amber-400">Online Cab Booking</span>
            </>
          ),
          subtitle:
            "Book one-way outstation cabs, 24x7 airport drops, hourly city rentals & pet-friendly rides across 100+ cities",
          badge: "All India Coverage • Best Price Guaranteed",
        }}
      />

      {/* Breadcrumb */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-1">
        <nav className="flex items-center text-xs sm:text-sm text-slate-500 space-x-2">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate">Taxi Service</span>
        </nav>
      </div>

      {/* 6 Core Taxi Service Categories */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            Comprehensive Travel Solutions
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Choose Your Preferred Taxi Service
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Tailored travel for daily commutes, intercity road trips, business meetings, and leisure holidays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TAXI_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                <span>Explore {cat.title}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pet-Friendly Cabs Highlight Section */}
      <section className="py-14 bg-gradient-to-br from-rose-50 via-amber-50/50 to-orange-50 border-y border-rose-100">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 border border-rose-300 text-xs font-black uppercase tracking-wider mb-2">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Pet-Friendly Taxi Service</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Pet-Friendly Cabs in Your City
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Travel comfortably with your dogs and cats. Seat protectors, pet-loving drivers, vet trips, and outstation holiday rides.
              </p>
            </div>
            <Link
              href="/taxi-service/pet-friendly-cabs-in-kolkata"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all shrink-0"
            >
              <span>View Kolkata Pet Cabs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {POPULAR_PET_CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/taxi-service/${c.slug}`}
                className="bg-white/90 backdrop-blur rounded-xl p-3.5 border border-rose-200/60 hover:border-rose-400 hover:shadow-md transition-all text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-4 h-4 fill-rose-400 text-rose-500" />
                </div>
                <div className="text-xs font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                  {c.city}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{c.state}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Taxi Near Me Section */}
      <section className="py-14 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Instant Doorstep Pickup</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Taxi Near Me — 3 to 8 Min Pickup
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Get an instant cab near your doorstep anywhere in India. Zero surge pricing, verified pilots, and clean AC cars.
            </p>
          </div>
          <Link
            href="/taxi-near"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all shrink-0"
          >
            <span>Explore Taxi Near Me Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {POPULAR_NEAR_CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/taxi-near/${c.slug}`}
              className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <MapPin className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  ETA {c.eta}
                </span>
              </div>
              <div className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                {c.city}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Taxi Near Me &rsaquo;</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Intercity Routes with Live Rates */}
      <section className="py-14 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">
              Trending Highway Corridors
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Popular Intercity Taxi Routes &amp; Fares
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Guaranteed lowest one-way fares with zero return fare charge on all major highways.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POPULAR_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {route.type}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{route.distance}</span>
                  </div>
                  <div className="text-base font-black text-slate-900">
                    {route.from} &rarr; {route.to}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Est. Duration: {route.time}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">One-Way from</div>
                    <div className="text-lg font-black text-slate-900">₹{route.fare}</div>
                  </div>
                  <button
                    onClick={() => {
                      proceedWithSearch({
                        tripType: "outstation-oneway",
                        fromCity: route.from,
                        toCity: route.to,
                        pickupDate: getTodayStr(),
                        pickupTime: "10:00 AM",
                      });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Drive Banner Section */}
      <section className="py-14 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 p-8 sm:p-12 text-white relative overflow-hidden border border-purple-500/30 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider mb-4">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Self-Drive Freedom</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Prefer Driving Yourself? Rent Cars by Day or Week
            </h2>
            <p className="text-xs sm:text-base text-slate-300 mt-3 leading-relaxed">
              Explore India on your own terms. Choose from Swift, Dzire, Brezza, Creta, Thar 4x4, or Innova Crysta with unlimited kilometers and zero security deposit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/self-driven"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <span>View Self-Drive Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+918240765499"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call +91 8240765499</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title="Taxi Service Frequently Asked Questions"
            subtitle="Everything you need to know about booking cabs with BroomBoom"
            items={TAXI_FAQS}
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
