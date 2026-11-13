"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  MapPin,
  Car,
  Compass,
  Sparkles,
  Film,
  Utensils,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import {
  SHOPPING_MALLS_MAP,
  SHOPPING_MALL_SLUGS,
  ShoppingMallDetail,
} from "@/data/shoppingMallKolkataRoutes";

export function MallDirectoryClient() {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("hourly");

  const malls = SHOPPING_MALL_SLUGS.map((slug) => SHOPPING_MALLS_MAP[slug]).filter(Boolean);

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || "Kolkata",
      to: params.toCity || "City Centre 1 Mall Salt Lake",
      tripType: params.tripType || "hourly",
      type: params.tripType || "hourly",
      date: params.pickupDate || new Date().toISOString().split("T")[0],
      time: params.pickupTime || "04:00 PM",
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.returnTime || params.dropTime) queryObj.dropTime = params.returnTime || params.dropTime || "";
    if (params.hourlyPackage) queryObj.package = params.hourlyPackage;
    if (params.distanceKm) queryObj.distance = String(params.distanceKm);

    const qs = new URLSearchParams(queryObj).toString();
    router.push(`/fleet?${qs}`);
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fb7185_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-rose-400 font-semibold mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/taxi-service" className="hover:underline">Taxi Service</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">Kolkata Shopping Malls</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Retail Shopping • Multiplex Movies • Weekend Dining Cabs</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Kolkata Shopping Malls <span className="text-rose-400">Taxi Service</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Book hourly rental cabs and point-to-point taxi rides to Kolkata&apos;s premier shopping destinations. Zero parking queues, spacious boots for heavy shopping bags, and AC waiting during movies and dining.
            </p>
          </div>

          {/* Hero Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900">
            <HeroSearch
              activeTripType={activeTripType}
              onTripTypeChange={(type) => setActiveTripType(type)}
              initialFrom="Kolkata"
              initialTo="City Centre 1 Mall Salt Lake"
              onSearch={handleHeroSearch}
            />
          </div>
        </div>
      </section>

      {/* 4 Premier Malls Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
              <Compass className="w-4 h-4" />
              <span>Top Retail &amp; Multiplex Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Select Your Shopping Destination in Kolkata
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Click on any mall to view store highlights, movie showtime cab booking, hourly waiting fares, and direct drop-off gates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {malls.map((mall: ShoppingMallDetail) => {
            const detailHref = `/taxi-service-shoppingmalls-kolkata/${mall.slug}`;

            return (
              <div
                key={mall.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:border-rose-400"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                  <img
                    src={mall.image}
                    alt={mall.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 left-4 bg-rose-500 text-white font-black text-xs px-3 py-1 rounded-md shadow-md flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{mall.mallType}</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-slate-900/90 text-white font-bold text-xs px-3 py-1 rounded-md backdrop-blur-xs border border-slate-700">
                    {mall.zone}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                      {mall.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">{mall.location}</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-4 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Hours: <strong>{mall.openingHours}</strong></span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        <strong>Key Anchors:</strong> {mall.keyAttractions.slice(0, 3).join(" • ")}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 pt-2 line-clamp-2 border-t border-slate-100 leading-relaxed">
                      {mall.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Cab ride from</span>
                      <span className="text-xl font-black text-slate-900">₹{mall.startingPrice.toLocaleString("en-IN")}</span>
                    </div>

                    <Link
                      href={detailHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition shadow-sm"
                    >
                      <span>View Fares &amp; Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Book BroomBoom for Mall Visits */}
      <section className="bg-white py-14 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Hassle-Free Shopping</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Why Take a BroomBoom Cab to the Mall?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Skip crowded basement parking queues, street jams, and heavy bag carrying.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-rose-50/60 border border-rose-200/60">
              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Zero Parking Hassle</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step right out at the front canopy and skip the 30-minute weekend basement parking chaos.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-rose-50/60 border border-rose-200/60">
              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Big Boot Space</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated 400+ liter sedan and SUV boots to store clothes, groceries, and home appliances safely.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-rose-50/60 border border-rose-200/60">
              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Waiting During Movies</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book a 4hr or 8hr rental; your chauffeur waits patiently and pulls up the moment your movie ends.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-rose-50/60 border border-rose-200/60">
              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Late-Night Pickups</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guaranteed rides home after late-night dinners, pub outings, and midnight movie shows past 11:30 PM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 24x7 Helpline CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">Planning a Weekend Family Shopping Trip?</h3>
            <p className="text-xs sm:text-sm text-rose-100 mt-1">
              Book an hourly rental cab with unlimited shopping stops, air-conditioned waiting, and zero surge pricing.
            </p>
          </div>
          <a
            href="tel:+917003589163"
            className="inline-flex items-center gap-2 bg-slate-950 text-white hover:bg-slate-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span>Call +91 70035 89163</span>
          </a>
        </div>
      </section>

      <Footer />
      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
