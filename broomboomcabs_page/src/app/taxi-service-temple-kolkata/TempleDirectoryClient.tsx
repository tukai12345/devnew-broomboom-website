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
  Compass,
  ChevronRight,
  Star,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TEMPLE_DETAILS_MAP, CANONICAL_TEMPLE_SLUGS, TempleDetail } from "@/data/templeKolkataRoutes";

export function TempleDirectoryClient() {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("outstation-round");
  const temples = CANONICAL_TEMPLE_SLUGS.map((slug) => TEMPLE_DETAILS_MAP[slug]).filter(Boolean);

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || "Kolkata",
      to: params.toCity || "Dakshineswar Kali Temple",
      tripType: params.tripType || "outstation-round",
      type: params.tripType || "outstation-round",
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

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/taxi-service" className="hover:underline">Taxi Service</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">Temple Pilgrimage Cabs</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Darshan • Teerth Yatra • Round-Trip Pilgrimage Cabs</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Kolkata Temple Pilgrimage <span className="text-amber-400">Taxi Service</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Book dedicated AC cabs from Kolkata for sacred temple darshans across Bengal and Odisha.
              Enjoy doorstep pickup, 4:00 AM early morning departures, courteous chauffeurs, and peaceful waiting during puja.
            </p>
          </div>

          {/* Hero Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900">
            <HeroSearch
              activeTripType={activeTripType}
              onTripTypeChange={(type) => setActiveTripType(type)}
              initialFrom="Kolkata"
              initialTo="Dakshineswar Kali Temple"
              onSearch={handleHeroSearch}
            />
          </div>
        </div>
      </section>

      {/* 9 Sacred Temples Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
              <Compass className="w-4 h-4" />
              <span>Top Holy Shrines from Kolkata</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Bengal & Puri Temple Darshan Cabs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Click any temple below to explore detailed darshan timings, aarti schedules, recommended itineraries, and transparent car rental fares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {temples.map((temple: TempleDetail) => {
            const detailHref = `/taxi-service-temple-kolkata/${temple.slug === "iskcon(mayapur)" ? "iskcon(mayapur)" : temple.slug}`;

            return (
              <div
                key={temple.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image & Distance Badge */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={temple.image}
                    alt={temple.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow-md">
                    {temple.distanceFromKolkata.split(" ")[0]} {temple.distanceFromKolkata.split(" ")[1]}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-semibold text-amber-300">{temple.bengaliName}</p>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {temple.name}
                    </h3>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="space-y-2 mb-4 text-xs text-slate-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{temple.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Travel Time: <strong className="text-slate-800">{temple.travelTime}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="line-clamp-1">Darshan: {temple.darshanTimings}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {temple.description}
                    </p>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Starts from</span>
                      <span className="text-lg font-black text-slate-900">₹{temple.startingPrice.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={detailHref}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition shadow-sm"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose BroomBoom for Temple Yatra */}
      <section className="bg-white py-14 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Devotees Trust BroomBoom for Teerth Yatra
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Pilgrimages should be sacred, peaceful, and entirely free from travel fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/60">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Guaranteed 4:00 AM Pickups</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reach for Mangala Aarti or early morning temple rituals without cancellation worries.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/60">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Elder-Friendly Chauffeurs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Polite, respectful drivers who assist senior citizens with boarding, luggage, and closer drops.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/60">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Secure Waiting During Puja</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leave bags, smartphones, and shoes safely locked in your cab while you attend the inner sanctum.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/60">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Clean & Sanitized Fleet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Spotless AC Sedans, Ertigas, Innova Crystas, and Tempo Travellers for joint family pilgrimages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Overview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pilgrimage Fleet Options & Rates
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Transparent per-km and fixed package pricing. Zero surge rates on festival days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-amber-400 transition">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Budget AC</span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Hatchback</h3>
            <p className="text-xs text-slate-500">WagonR / Tiago AC</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-xl font-black text-slate-900">₹11<span className="text-xs font-normal text-slate-500">/km</span></div>
              <p className="text-[11px] text-slate-500 mt-1">4 Passengers • 2 Small Bags</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-amber-400 p-5 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              Most Popular
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Comfort AC</span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Sedan</h3>
            <p className="text-xs text-slate-500">Swift Dzire / Etios AC</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-xl font-black text-slate-900">₹12.5<span className="text-xs font-normal text-slate-500">/km</span></div>
              <p className="text-[11px] text-slate-500 mt-1">4 Passengers • 3 Bags • Great Boot</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-amber-400 transition">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Family SUV</span>
            <h3 className="text-base font-bold text-slate-900 mt-2">SUV</h3>
            <p className="text-xs text-slate-500">Maruti Ertiga / Carens AC</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-xl font-black text-slate-900">₹16<span className="text-xs font-normal text-slate-500">/km</span></div>
              <p className="text-[11px] text-slate-500 mt-1">6 Passengers • 4 Bags • Extra Legroom</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-amber-400 transition">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Luxury / Group</span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Innova Crysta / Tempo</h3>
            <p className="text-xs text-slate-500">Innova / 13-26 Seater</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-xl font-black text-slate-900">₹21<span className="text-xs font-normal text-slate-500">/km</span></div>
              <p className="text-[11px] text-slate-500 mt-1">7 to 26 Passengers • Luxury Yatra</p>
            </div>
          </div>
        </div>
      </section>

      {/* 24x7 Assistance CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">Planning a Multi-Temple Family Yatra?</h3>
            <p className="text-xs sm:text-sm text-slate-900 mt-1">
              Talk to our temple travel coordinator for custom itineraries, senior citizen assistance, and group tempo travellers.
            </p>
          </div>
          <a
            href="tel:+917003589163"
            className="inline-flex items-center gap-2 bg-slate-950 text-white hover:bg-slate-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Call +91 70035 89163</span>
          </a>
        </div>
      </section>

      <Footer />
      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
