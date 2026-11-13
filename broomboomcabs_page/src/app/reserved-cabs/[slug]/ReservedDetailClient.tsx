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
  Info,
  Calendar,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import {
  ReservedCabRoute,
  RESERVED_CABS_MAP,
  RESERVED_CABS_SLUGS,
} from "@/data/reservedCabsRoutes";

interface ReservedDetailClientProps {
  route: ReservedCabRoute;
}

export function ReservedDetailClient({ route }: ReservedDetailClientProps) {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("airport");

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || route.originAirport,
      to: params.toCity || route.destination,
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

  const otherRoutes = RESERVED_CABS_SLUGS.filter((s) => s !== route.slug)
    .map((s) => RESERVED_CABS_MAP[s])
    .filter(Boolean);

  return (
    <main className="min-h-screen flex flex-col bg-[#fbfbfb] text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-5 flex-wrap">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/reserved-cabs" className="hover:underline">Reserved Cabs</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-300">{route.originCode} to {route.destination.split("&")[0].split("(")[0].trim()}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Mountain className="w-3.5 h-3.5" />
                <span>{route.region} • Dedicated Mountain Transfer</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {route.name}
              </h1>
              <p className="text-sm font-medium text-emerald-200 mt-2">
                From {route.originAirport} ➔ {route.destination}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{route.distance}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Duration: {route.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Plane className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free Flight Tracking</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-5 text-center shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Reserved Private Cab from
              </span>
              <div className="text-3xl font-black text-white mt-1">
                ₹{route.startingPrice.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate-400"> onwards</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                All-inclusive rate: includes terminal meet &amp; greet, fuel, toll taxes, and hill permits.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Hidden Mountain Surcharges</span>
              </div>
            </div>
          </div>

          {/* HeroSearch Preloaded for this corridor */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900">
            <HeroSearch
              activeTripType={activeTripType}
              onTripTypeChange={(type) => setActiveTripType(type)}
              initialFrom={route.originAirport}
              initialTo={route.destination}
              onSearch={handleHeroSearch}
            />
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        {/* Route Details Card */}
        <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Essential Route &amp; Travel Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Highway / Route</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{route.highway}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Best Season to Visit</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{route.bestTimeToVisit.split("(")[0]}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Permit &amp; Checkpost</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{route.permitRequirement.split(".")[0]}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Flight Delay Buffer</span>
              <span className="font-bold text-emerald-700 text-sm leading-snug">60 Minutes Free Waiting at Terminal</span>
            </div>
          </div>
        </div>

        {/* Fleet & Pricing Table */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Transparent Mountain Fares
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {route.name} Cab Pricing
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              *Full private reserved cab with dedicated chauffeur. No sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {route.fleetFares.map((fare, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between shadow-xs ${
                  fare.badge
                    ? "border-emerald-400 ring-2 ring-emerald-400/20"
                    : "border-slate-200 hover:border-emerald-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {fare.category.split(" ")[0]}
                    </span>
                    {fare.badge && (
                      <span className="text-[10px] font-black uppercase text-slate-950 bg-emerald-400 px-2.5 py-0.5 rounded-full shadow-2xs">
                        {fare.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{fare.category}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{fare.model}</p>
                  <p className="text-xs font-medium text-slate-600 mt-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{fare.seating}</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">One-Way Drop:</span>
                      <strong className="text-slate-900 font-bold text-sm">{fare.oneWayFare}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Reserved Package:</span>
                      <strong className="text-emerald-700 font-bold text-sm">{fare.roundTripFare}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      const qs = new URLSearchParams({
                        from: route.originAirport,
                        to: route.destination,
                        tripType: "airport",
                        vehicle: fare.category.toLowerCase().includes("sedan")
                          ? "sedan"
                          : fare.category.toLowerCase().includes("suv")
                          ? "suv"
                          : "hatchback",
                      }).toString();
                      router.push(`/fleet?${qs}`);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition text-center shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve {fare.category.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Airport Transit Itinerary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Seamless Journey
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Airport Pickup &amp; Mountain Transit Timeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Step-by-step transfer guide from touchdown at the terminal to your mountain hotel lobby.
            </p>
          </div>

          <div className="relative border-l-2 border-emerald-300 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {route.itinerary.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-slate-950">
                  {idx + 1}
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[11px] font-bold mb-1">
                  {step.stage}
                </div>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scenic Stops Along the Route */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Sightseeing En Route
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Popular Stops &amp; Viewpoints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {route.scenicStops.map((stop, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-emerald-300 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-2">
                  #{idx + 1}
                </div>
                <h3 className="font-bold text-sm text-slate-900">{stop.place}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{stop.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Route & Safety Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
              About {route.name}
            </h2>
            <div className="prose prose-sm text-slate-600 leading-relaxed space-y-4">
              <p>{route.description}</p>
              <p>
                Unlike local spot taxi counters where passengers face unpredictable quotes, hidden luggage penalties, and non-AC vehicles, BroomBoom Reserved Cabs guarantees upfront fixed pricing, polite drivers with extensive hill experience, and sanitized AC vehicles.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-500/10 to-teal-600/5 rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Mountain Highway Safety Guarantee</span>
            </h3>

            <ul className="space-y-3">
              {route.mountainSafety.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-emerald-200/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Need Immediate Airport Dispatch?</p>
                  <a href="tel:+917003589163" className="text-sm font-black text-slate-900 hover:text-emerald-700 transition">
                    +91 70035 89163 (24x7 Airport Desk)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Travel Help
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions: {route.name}
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {route.faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-start gap-2">
                  <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Reserved Routes Quick Links */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Other Corridors
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                More Reserved Himalayan &amp; Northeast Airport Routes
              </h2>
            </div>
            <Link
              href="/reserved-cabs"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All Corridors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {otherRoutes.map((other) => (
              <Link
                key={other.slug}
                href={`/reserved-cabs/${other.slug}`}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-emerald-400 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {other.originCode} Transfer
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition mt-2">
                    {other.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{other.destination}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Starts ₹{other.startingPrice}</span>
                  <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    View Cabs &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Bottom Bar on Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 z-40 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Private cab from</span>
          <span className="text-base font-black text-slate-900">₹{route.startingPrice}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const qs = new URLSearchParams({
              from: route.originAirport,
              to: route.destination,
              tripType: "airport",
            }).toString();
            router.push(`/fleet?${qs}`);
          }}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5"
        >
          <span>Reserve Cab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Footer />
      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
