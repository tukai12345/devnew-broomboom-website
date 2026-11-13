"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  Car,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Sun,
  Flame,
  Users,
  Compass,
  Info,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { TempleDetail, TEMPLE_DETAILS_MAP, CANONICAL_TEMPLE_SLUGS } from "@/data/templeKolkataRoutes";

interface TempleDetailClientProps {
  temple: TempleDetail;
}

export function TempleDetailClient({ temple }: TempleDetailClientProps) {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState(
    temple.recommendedTripType === "Local Hourly Rental"
      ? "hourly"
      : "outstation-round"
  );

  const handleHeroSearch = (params: SearchParams) => {
    const defaultTripType =
      temple.recommendedTripType === "Local Hourly Rental"
        ? "local"
        : "outstation-round";

    const queryObj: Record<string, string> = {
      from: params.fromCity || "Kolkata",
      to: params.toCity || temple.name,
      tripType: params.tripType || defaultTripType,
      type: params.tripType || defaultTripType,
      date: params.pickupDate || new Date().toISOString().split("T")[0],
      time: params.pickupTime || "06:00 AM",
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.returnTime || params.dropTime) queryObj.dropTime = params.returnTime || params.dropTime || "";
    if (params.hourlyPackage) queryObj.package = params.hourlyPackage;
    if (params.distanceKm) queryObj.distance = String(params.distanceKm);

    const qs = new URLSearchParams(queryObj).toString();
    router.push(`/fleet?${qs}`);
  };

  const otherTemples = CANONICAL_TEMPLE_SLUGS.filter(
    (slug) => slug !== temple.slug && slug !== "iskcon%28mayapur%29"
  )
    .slice(0, 4)
    .map((slug) => TEMPLE_DETAILS_MAP[slug])
    .filter(Boolean);

  return (
    <main className="min-h-screen flex flex-col bg-[#fbfbfb] text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-5 flex-wrap">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/taxi-service" className="hover:underline">Taxi Service</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/taxi-service-temple-kolkata" className="hover:underline">
              Temple Pilgrimage Cabs
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-300 line-clamp-1">{temple.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{temple.deity}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Kolkata to {temple.name} <span className="text-amber-400">Taxi Service</span>
              </h1>
              <p className="text-sm font-medium text-amber-200/90 mt-1">{temple.bengaliName}</p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{temple.distanceFromKolkata}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Travel Time: {temple.travelTime}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Darshan: {temple.darshanTimings.split("&")[0]}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-5 text-center shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Round-Trip / Same Day Fare
              </span>
              <div className="text-3xl font-black text-white mt-1">
                ₹{temple.startingPrice.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate-400"> onwards</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Includes doorstep pickup in Kolkata, AC comfort, and driver waiting during darshan.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Advance Booking • Pay Post Ride</span>
              </div>
            </div>
          </div>

          {/* Integrated HeroSearch Preloaded for this temple */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900">
            <HeroSearch
              activeTripType={activeTripType}
              onTripTypeChange={(type) => setActiveTripType(type)}
              initialFrom="Kolkata"
              initialTo={temple.name}
              onSearch={handleHeroSearch}
            />
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        {/* Quick Darshan Facts Card */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Essential Darshan & Yatra Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Presiding Deity</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{temple.deity}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Darshan Timings</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{temple.darshanTimings}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Aarti Schedule</span>
              <span className="font-bold text-slate-900 text-sm leading-snug">{temple.aartiTimings}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-2xs">
              <span className="text-slate-500 font-semibold block mb-1">Recommended Package</span>
              <span className="font-bold text-amber-700 text-sm leading-snug">{temple.suggestedPackage}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Fare Comparison */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Transparent Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Kolkata to {temple.name} Cab Fare
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              *Tolls, parking, and driver allowance clear & transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {temple.fleetFares.map((fare, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between shadow-xs ${
                  fare.badge
                    ? "border-amber-400 ring-2 ring-amber-400/20"
                    : "border-slate-200 hover:border-amber-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {fare.category.split(" ")[0]}
                    </span>
                    {fare.badge && (
                      <span className="text-[10px] font-black uppercase text-amber-950 bg-amber-400 px-2 py-0.5 rounded-full shadow-2xs">
                        {fare.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{fare.category}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{fare.model}</p>
                  <p className="text-[11px] font-medium text-slate-600 mt-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{fare.capacity}</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Same-Day / Tour:</span>
                      <strong className="text-slate-900 font-bold">{fare.sameDayFare}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Round-Trip:</span>
                      <strong className="text-amber-700 font-bold">{fare.roundTripFare}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Extra per Km:</span>
                      <span className="text-slate-700 font-semibold">{fare.perKmRate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      const qs = new URLSearchParams({
                        from: "Kolkata",
                        to: temple.name,
                        tripType: "outstation-round",
                        vehicle: fare.category.toLowerCase().includes("sedan")
                          ? "sedan"
                          : fare.category.toLowerCase().includes("suv")
                          ? "suv"
                          : "hatchback",
                      }).toString();
                      router.push(`/fleet?${qs}`);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition text-center shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Book {fare.category.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Suggested Pilgrimage Itinerary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Hassle-Free Darshan Plan
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Recommended Kolkata to {temple.name} Pilgrimage Itinerary
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Curated by our temple travel experts to ensure maximum darshan time with zero stress for elderly family members.
            </p>
          </div>

          <div className="relative border-l-2 border-amber-300 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {temple.itinerary.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-6 h-6 rounded-full bg-amber-400 border-4 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-slate-950">
                  {idx + 1}
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-bold mb-1">
                  {step.time}
                </div>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Spiritual Significance & Temple Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
              About {temple.name}
            </h2>
            <div className="prose prose-sm text-slate-600 leading-relaxed space-y-4">
              <p>{temple.description}</p>
              <p>
                Whether you are traveling for annual family prayers, special puja offerings (Manat), or taking elderly grandparents for holy darshan, having a dedicated BroomBoom vehicle gives you complete peace of mind. Your chauffeur handles luggage, waits safely in parking lots, and coordinates pickups directly at the pedestrian gate.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Shrine Highlights & Spiritual Heritage</span>
            </h3>

            <ul className="space-y-3">
              {temple.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-amber-200/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Need Custom Puja Arrangements?</p>
                  <a href="tel:+917003589163" className="text-sm font-black text-slate-900 hover:text-amber-700 transition">
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
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Have Questions?
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions: Kolkata to {temple.name} Taxi
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {temple.faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Temple Darshan Links */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Explore More Shrines
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Other Popular Temple Cabs from Kolkata
              </h2>
            </div>
            <Link
              href="/taxi-service-temple-kolkata"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>View All 9 Temples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherTemples.map((other) => (
              <Link
                key={other.slug}
                href={`/taxi-service-temple-kolkata/${other.slug}`}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-amber-400 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                    {other.distanceFromKolkata.split(" ")[0]} {other.distanceFromKolkata.split(" ")[1]}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition mt-2">
                    {other.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{other.location}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">From ₹{other.startingPrice}</span>
                  <span className="text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Bottom Sticky Bar on Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 z-40 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Fare starts at</span>
          <span className="text-base font-black text-slate-900">₹{temple.startingPrice}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const qs = new URLSearchParams({
              from: "Kolkata",
              to: temple.name,
              tripType: "outstation-round",
            }).toString();
            router.push(`/fleet?${qs}`);
          }}
          className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5"
        >
          <span>Book Darshan Cab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Footer />
      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
