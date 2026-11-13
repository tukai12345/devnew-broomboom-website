"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plane,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  MapPin,
  Car,
  Compass,
  Mountain,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import {
  RESERVED_CABS_MAP,
  RESERVED_CABS_SLUGS,
  ReservedCabRoute,
} from "@/data/reservedCabsRoutes";

export function ReservedDirectoryClient() {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("airport");

  const routes = RESERVED_CABS_SLUGS.map((s) => RESERVED_CABS_MAP[s]).filter(Boolean);

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || "Bagdogra Airport (IXB)",
      to: params.toCity || "Gangtok, Sikkim",
      tripType: params.tripType || "airport",
      type: params.tripType || "airport",
      date: params.pickupDate || new Date().toISOString().split("T")[0],
      time: params.pickupTime || "11:00 AM",
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
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/taxi-service" className="hover:underline">Taxi Service</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">Reserved Airport Cabs</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Mountain className="w-3.5 h-3.5" />
              <span>Himalayan &amp; Northeast Mountain Corridors • Private Airport Transfers</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Reserved Cabs <span className="text-emerald-400">Airport Transfers</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Pre-book private, sanitized mountain cabs from Bagdogra (IXB) and Guwahati (GAU) airports to Sikkim, Kalimpong, Nepal Border, and Shillong. Free 60-min flight delay waiting and hill-certified chauffeurs.
            </p>
          </div>

          {/* Hero Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900">
            <HeroSearch
              activeTripType={activeTripType}
              onTripTypeChange={(type) => setActiveTripType(type)}
              initialFrom="Bagdogra Airport (IXB)"
              initialTo="Gangtok, Sikkim"
              onSearch={handleHeroSearch}
            />
          </div>
        </div>
      </section>

      {/* 4 Premium Reserved Corridors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
              <Compass className="w-4 h-4" />
              <span>Eastern Himalaya &amp; Northeast Routes</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Dedicated Airport Reserved Cabs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Guaranteed private AC cabs with zero last-minute cancellations, transparent all-inclusive fares, and experienced mountain drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {routes.map((route: ReservedCabRoute) => {
            const detailHref = `/reserved-cabs/${route.slug}`;

            return (
              <div
                key={route.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:border-emerald-400"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 left-4 bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-md shadow-md flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5" />
                    <span>{route.originCode} Transfer</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-slate-900/90 text-white font-bold text-xs px-3 py-1 rounded-md backdrop-blur-xs border border-slate-700">
                    {route.distance}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-semibold text-emerald-300">{route.region}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mt-0.5">
                      {route.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-4 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>To:</strong> {route.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Drive Duration: <strong>{route.duration}</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mountain className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1"><strong>Route:</strong> {route.highway}</span>
                    </div>

                    <p className="text-xs text-slate-600 pt-2 line-clamp-2 border-t border-slate-100 leading-relaxed">
                      {route.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Private Cab from</span>
                      <span className="text-xl font-black text-slate-900">₹{route.startingPrice.toLocaleString("en-IN")}</span>
                    </div>

                    <Link
                      href={detailHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-sm"
                    >
                      <span>View Route &amp; Cabs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mountain Safety & Service Quality */}
      <section className="bg-white py-14 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Peace of Mind</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Why Reserve Your Mountain Transfer in Advance?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Avoid chaotic spot taxi haggling, overloaded shared jeeps, and delayed mountain transit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Flight Delay Buffer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We track inbound flight radars with 60 minutes free waiting at Bagdogra (IXB) and Guwahati (GAU).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Mountain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Hill-Certified Chauffeurs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skilled mountain drivers adept at navigating hairpins, mist, landslides, and high-altitude climbs safely.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">High-Clearance SUVs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Innova Crysta, Mahindra Scorpio, and Maruti Ertiga with luggage carriers and chilled climate control.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Permit &amp; Border Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Driver assistance for Sikkim ILP checks at Rangpo and Indo-Nepal border clearance at Panitanki.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 24x7 Airport Desk Hotline */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">Landing at Bagdogra or Guwahati Airport Today?</h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Contact our airport desk for instant cab dispatch, multi-day Sikkim or Meghalaya tour packages, and group tempo travellers.
            </p>
          </div>
          <a
            href="tel:+917003589163"
            className="inline-flex items-center gap-2 bg-slate-950 text-white hover:bg-slate-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Call +91 70035 89163</span>
          </a>
        </div>
      </section>

      <Footer />
      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
