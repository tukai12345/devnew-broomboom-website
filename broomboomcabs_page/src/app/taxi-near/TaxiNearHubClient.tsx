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
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { LoginModal } from "@/components/LoginModal";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { isUserLoggedIn } from "@/utils/auth";

const NEARBY_CITIES = [
  { city: "Kolkata", slug: "kolkata", eta: "3-5 mins", cabs: "180+ Cabs Online" },
  { city: "Delhi NCR", slug: "delhi", eta: "4-6 mins", cabs: "350+ Cabs Online" },
  { city: "Mumbai", slug: "mumbai", eta: "4-7 mins", cabs: "290+ Cabs Online" },
  { city: "Bangalore", slug: "bangalore", eta: "5-7 mins", cabs: "320+ Cabs Online" },
  { city: "Pune", slug: "pune", eta: "4-6 mins", cabs: "160+ Cabs Online" },
  { city: "Hyderabad", slug: "hyderabad", eta: "5-8 mins", cabs: "210+ Cabs Online" },
  { city: "Ahmedabad", slug: "ahmedabad", eta: "4-6 mins", cabs: "140+ Cabs Online" },
  { city: "Jaipur", slug: "jaipur", eta: "3-5 mins", cabs: "120+ Cabs Online" },
  { city: "Chandigarh", slug: "chandigarh", eta: "3-5 mins", cabs: "110+ Cabs Online" },
  { city: "Kochi", slug: "kochi", eta: "4-6 mins", cabs: "95+ Cabs Online" },
  { city: "Lucknow", slug: "lucknow", eta: "4-6 mins", cabs: "130+ Cabs Online" },
  { city: "Chennai", slug: "chennai", eta: "5-7 mins", cabs: "220+ Cabs Online" },
];

const FARE_CARDS = [
  {
    name: "Hatchback",
    models: "WagonR, Swift, Tiago or similar",
    base: "₹120 (incl. 4 km)",
    perKm: "₹11 / km",
    seats: "4 Seater + AC",
    badge: "Budget Friendly",
  },
  {
    name: "Sedan",
    models: "Dzire, Etios, Aura or similar",
    base: "₹160 (incl. 4 km)",
    perKm: "₹13 / km",
    seats: "4 Seater + Boot Space",
    badge: "Most Popular",
    highlight: true,
  },
  {
    name: "SUV",
    models: "Ertiga, Triber, Carens or similar",
    base: "₹250 (incl. 4 km)",
    perKm: "₹18 / km",
    seats: "6 Seater + AC",
    badge: "Family & Luggage",
  },
  {
    name: "Premium SUV",
    models: "Innova Crysta, XUV700",
    base: "₹350 (incl. 4 km)",
    perKm: "₹24 / km",
    seats: "7 Seater + Luxury",
    badge: "Executive Comfort",
  },
];

const NEAR_FAQS = [
  {
    category: "Instant Booking",
    question: "How fast can I get a taxi near me with BroomBoom?",
    answer:
      "Our average doorstep pickup time is 3 to 8 minutes across major city hubs. Once booked, our system dispatches the closest active pilot instantly with real-time GPS tracking.",
  },
  {
    category: "Surge Pricing",
    question: "Does BroomBoom charge surge pricing during peak rain or rush hours?",
    answer:
      "No. BroomBoom does not apply arbitrary 2x or 3x surge multipliers. We offer fair, transparent per-kilometer rates around the clock.",
  },
  {
    category: "Payment Methods",
    question: "Can I pay in cash to the driver or online via UPI?",
    answer:
      "You can pay via UPI, credit/debit card, netbanking, or direct cash to the chauffeur at the end of the trip.",
  },
  {
    category: "Safety",
    question: "How safe is booking a local taxi near me?",
    answer:
      "All BroomBoom drivers undergo complete police background verification and commercial license checks. Every cab has live GPS tracking, emergency SOS support, and child lock safety compliance.",
  },
];

export const TaxiNearHubClient: React.FC = () => {
  const router = useRouter();
  const [activeTripType, setActiveTripType] = useState<string>("hourly");
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
      to: params.toCity || params.fromCity || "Kolkata",
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
            <span className="text-slate-300">Taxi Near Me</span>
          </nav>

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>Fastest Doorstep Pickup &bull; 3 to 8 Mins Average ETA</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Taxi Near Me — 24x7 Instant Cab Booking
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-2xl">
              Need a cab right now? Find the nearest available BroomBoom taxi in your area. Zero surge pricing, clean air-conditioned cars, and verified local chauffeurs ready at your doorstep.
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
          initialFrom="Kolkata"
          initialTo="Howrah"
          heading={{
            title: "Book Taxi Near You Instantly",
            subtitle: "Enter your pickup location to locate nearest available BroomBoom cabs",
            badge: "Live Dispatch • 3-8 Min Pickup Guarantee",
          }}
        />
      </div>

      {/* 4 Pillars of Taxi Near Me */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            Rapid Response Network
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Why Millions Choose BroomBoom for Local Rides
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            No driver cancellation calls asking &quot;Kahan jaana hai?&quot; — seamless rides whenever you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">3-8 Minute Arrival</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Our automated smart dispatch assigns the nearest verified cab to minimize your waiting time.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">Zero Peak Surge</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              No shocking 2x or 3x surge fares during rain, office peak hours, or late nights.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">100% Verified Pilots</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Background verified, polite, and professionally trained drivers with clean commercial vehicles.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-4 text-purple-600">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">Live GPS &amp; Safety SOS</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Share your live trip status with family and friends with instant emergency assistance.
            </p>
          </div>
        </div>
      </section>

      {/* City Directory for Taxi Near Me */}
      <section className="py-14 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">
                Local Presence
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Taxi Near Me in Major Indian Cities
              </h2>
            </div>
            <a
              href="tel:+918240765499"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-900 bg-amber-400 hover:bg-amber-500 px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Direct Cab Booking: +91 8240765499</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {NEARBY_CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/taxi-near/${c.slug}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ETA {c.eta}
                    </span>
                    <span className="text-[11px] text-slate-400">{c.cabs}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    Taxi Near Me in {c.city}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Book local cabs, station drops &amp; quick city rides.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                  <span>View Cabs in {c.city}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Local Fare Chart */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            Fair &amp; Transparent Rates
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Standard Local Taxi Fare Card
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            No hidden extras. Clear base fare, per-km rates, and complimentary waiting time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FARE_CARDS.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                card.highlight
                  ? "bg-amber-50/50 border-amber-300 shadow-md ring-2 ring-amber-400/20"
                  : "bg-white border-slate-200 shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                    {card.badge}
                  </span>
                  <span className="text-xs text-slate-500">{card.seats}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">{card.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{card.models}</p>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                    <span className="text-slate-500">Base Fare</span>
                    <span className="font-bold text-slate-900">{card.base}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                    <span className="text-slate-500">Rate per KM</span>
                    <span className="font-bold text-slate-900">{card.perKm}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-slate-500">Night Surcharge</span>
                    <span className="font-bold text-emerald-600">₹0 (Zero)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  proceedWithSearch({
                    tripType: "hourly",
                    fromCity: "Kolkata",
                    toCity: "Kolkata",
                    pickupDate: getTodayStr(),
                    pickupTime: "10:00 AM",
                  });
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center"
              >
                Book {card.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <WhyChooseUs />

      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title="Taxi Near Me Frequently Asked Questions"
            subtitle="Clear answers on local cab booking, pickup times, and billing"
            items={NEAR_FAQS}
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
