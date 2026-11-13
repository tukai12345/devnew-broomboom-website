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
  Info,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import {
  ShoppingMallDetail,
  SHOPPING_MALLS_MAP,
  SHOPPING_MALL_SLUGS,
} from "@/data/shoppingMallKolkataRoutes";

interface MallDetailClientProps {
  mall: ShoppingMallDetail;
}

export function MallDetailClient({ mall }: MallDetailClientProps) {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("hourly");

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || "Kolkata",
      to: params.toCity || mall.name,
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

  const otherMalls = SHOPPING_MALL_SLUGS.filter((s) => s !== mall.slug)
    .map((s) => SHOPPING_MALLS_MAP[s])
    .filter(Boolean);

  return (
    <main className="min-h-screen flex flex-col bg-[#fbfbfb] text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fb7185_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-rose-400 font-semibold mb-5 flex-wrap">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/taxi-service" className="hover:underline">Taxi Service</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/taxi-service-shoppingmalls-kolkata" className="hover:underline">
              Shopping Malls Taxi
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-300">{mall.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{mall.mallType} • Curbside Drop-off &amp; Waiting Cabs</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {mall.name} <span className="text-rose-400">Taxi Service</span>
              </h1>
              <p className="text-sm font-medium text-rose-200 mt-2">{mall.location}</p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{mall.zone}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Hours: {mall.openingHours}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Parking Hassle</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/90 backdrop-blur-md border border-rose-500/30 rounded-2xl p-5 text-center shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                Point-to-Point Ride from
              </span>
              <div className="text-3xl font-black text-white mt-1">
                ₹{mall.startingPrice.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate-400"> onwards</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Or book 4-hour / 8-hour rentals with unlimited shopping stops and AC waiting during movies.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Surge Pricing Guaranteed</span>
              </div>
            </div>
          </div>

          {/* HeroSearch Preloaded for this mall */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900">
            <HeroSearch
              activeTripType={activeTripType}
              onTripTypeChange={(type) => setActiveTripType(type)}
              initialFrom="Kolkata"
              initialTo={mall.name}
              onSearch={handleHeroSearch}
            />
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        {/* Mall Overview Strip */}
        <div className="bg-gradient-to-r from-rose-50 via-white to-rose-50 border border-rose-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider mb-4">
            <ShoppingBag className="w-4 h-4 text-rose-600" />
            <span>Mall Highlights &amp; Visitor Info</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Mall Type</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{mall.mallType}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Nearby Landmarks</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{mall.landmarksNearby}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Operational Hours</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{mall.openingHours}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Recommended Booking</span>
              <span className="font-bold text-rose-700 text-sm leading-snug">4 Hr / 40 Km Hourly Rental</span>
            </div>
          </div>
        </div>

        {/* Fleet & Hourly Rental Pricing */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                Transparent Shopping Fares
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {mall.name} Taxi Rates
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              *Point-to-point one-way or flexible hourly packages with waiting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mall.fleetFares.map((fare, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between shadow-xs ${
                  fare.badge
                    ? "border-rose-400 ring-2 ring-rose-400/20"
                    : "border-slate-200 hover:border-rose-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {fare.category.split(" ")[0]}
                    </span>
                    {fare.badge && (
                      <span className="text-[10px] font-black uppercase text-white bg-rose-500 px-2.5 py-0.5 rounded-full shadow-2xs">
                        {fare.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{fare.category}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{fare.model}</p>
                  
                  <div className="mt-3 space-y-1 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{fare.seating}</span>
                    </p>
                    <p className="flex items-center gap-1.5 font-medium text-rose-700">
                      <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
                      <span>{fare.bootCapacity}</span>
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Point-to-Point Drop:</span>
                      <strong className="text-slate-900 font-bold">{fare.pointToPointFare}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">4 Hr / 40 Km Package:</span>
                      <strong className="text-rose-700 font-bold">{fare.package4hr}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">8 Hr / 80 Km Package:</span>
                      <strong className="text-slate-800 font-semibold">{fare.package8hr}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      const qs = new URLSearchParams({
                        from: "Kolkata",
                        to: mall.name,
                        tripType: "hourly",
                        vehicle: fare.category.toLowerCase().includes("sedan")
                          ? "sedan"
                          : fare.category.toLowerCase().includes("suv")
                          ? "suv"
                          : "hatchback",
                      }).toString();
                      router.push(`/fleet?${qs}`);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition text-center shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Book {fare.category.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Commute Routes Across Kolkata */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
              Easy City Access
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Popular Routes to {mall.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Estimated drive durations from key Kolkata residential neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mall.popularCorridors.map((corridor, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-rose-50/40 hover:border-rose-300 transition"
              >
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 mb-1">
                  <span>{corridor.fromArea}</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                    {corridor.duration} ({corridor.distance})
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Via:</strong> {corridor.routeVia}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* About & Shopping Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
              About {mall.name}
            </h2>
            <div className="prose prose-sm text-slate-600 leading-relaxed space-y-4">
              <p>{mall.description}</p>
              <p>
                From festive puja shopping to weekend blockbuster movies and family dinners, carrying heavy retail bags through crowded streets or waiting in long auto queues is exhausting. BroomBoom Cabs provides doorstep service with generous boot space and chilled air-conditioned cabins.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-rose-500/10 to-pink-600/5 rounded-2xl border border-rose-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-600" />
              <span>Smart Shopping &amp; Cab Tips</span>
            </h3>

            <ul className="space-y-3">
              {mall.shoppingTips.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-rose-200/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Need Immediate Mall Cab Dispatch?</p>
                  <a href="tel:+917003589163" className="text-sm font-black text-slate-900 hover:text-rose-700 transition">
                    +91 70035 89163 (24x7 Helpdesk)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
              Visitor Questions
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions: {mall.name} Cabs
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {mall.faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-start gap-2">
                  <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Shopping Malls */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                More Destinations
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Other Premier Shopping Malls in Kolkata
              </h2>
            </div>
            <Link
              href="/taxi-service-shoppingmalls-kolkata"
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>View All 4 Malls</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {otherMalls.map((other) => (
              <Link
                key={other.slug}
                href={`/taxi-service-shoppingmalls-kolkata/${other.slug}`}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-rose-400 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded">
                    {other.zone}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-rose-600 transition mt-2">
                    {other.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{other.location}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Rides from ₹{other.startingPrice}</span>
                  <span className="text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    View Fares &rarr;
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
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Cab ride from</span>
          <span className="text-base font-black text-slate-900">₹{mall.startingPrice}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const qs = new URLSearchParams({
              from: "Kolkata",
              to: mall.name,
              tripType: "hourly",
            }).toString();
            router.push(`/fleet?${qs}`);
          }}
          className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
        >
          <span>Book Mall Cab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Footer />
      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
