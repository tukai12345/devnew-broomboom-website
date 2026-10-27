"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Car,
  Plane,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  PhoneCall,
  Navigation,
  Check,
  ChevronDown,
  Percent,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TOP_10_CITIES_SERVICES, CityServiceInfo } from "@/data/cityServicesData";

export default function ServicesPage() {
  const [selectedCityId, setSelectedCityId] = useState<string>("kolkata");
  const [activeServiceTab, setActiveServiceTab] = useState<"all" | "outstation" | "rental" | "airport">("all");

  const currentCity: CityServiceInfo =
    TOP_10_CITIES_SERVICES.find((c) => c.cityId === selectedCityId) ||
    TOP_10_CITIES_SERVICES[0];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        onMyBookingsClick={() => {
          window.location.href = "/";
        }}
        activeService="services"
        onSelectService={() => {}}
      />

      {/* Hero Header Section */}
      <div
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-16 bg-cover bg-center bg-no-repeat text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.82), rgba(10, 16, 26, 0.92)), url('https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-300">Cab Services in 10 Cities</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pan-India Cab Packages & Transparent Rates</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              BroomBoom Cab Services Across 10 Major Cities
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Explore transparent rates for Outstation Highway Trips, Hourly Car Rentals, and Airport Transfers customized for your city. Zero surge pricing and verified chauffeurs on every trip.
            </p>
          </div>

          {/* 10 CITIES INTERACTIVE TABS */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Your City:</span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Click any city to switch localized fares & packages
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {TOP_10_CITIES_SERVICES.map((city) => {
                const isSelected = city.cityId === selectedCityId;
                return (
                  <button
                    key={city.cityId}
                    type="button"
                    onClick={() => setSelectedCityId(city.cityId)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-slate-950" : "text-amber-400"}`} />
                    <span>{city.cityName}</span>
                    <span className="text-[10px] opacity-75 font-normal">({city.state})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected City Overview Bar */}
      <div className="bg-white border-b border-slate-200/90 sticky top-[72px] z-30 shadow-xs">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold">City Selected:</div>
              <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {currentCity.cityName}, {currentCity.state}
              </div>
            </div>
          </div>

          {/* Service Filters */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveServiceTab("all")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeServiceTab === "all"
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              All Services
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceTab("outstation")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeServiceTab === "outstation"
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Outstation
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceTab("rental")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeServiceTab === "rental"
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Hourly Rentals
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceTab("airport")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeServiceTab === "airport"
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Airport
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-8 sm:py-10 space-y-10 sm:space-y-12">
        
        {/* ======================================================== */}
        {/* 1. OUTSTATION CABS SECTION */}
        {/* ======================================================== */}
        {(activeServiceTab === "all" || activeServiceTab === "outstation") && (
          <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-6 sm:p-8">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                    <Navigation className="w-3.5 h-3.5 text-amber-600" />
                    <span>Highway Outstation Rides</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Outstation Cabs from {currentCity.cityName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Guaranteed lowest one-way fares with doorstep pickup, verified chauffeurs, and zero return fare.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Tolls & GST transparent</span>
                </div>
              </div>

              {/* Outstation Routes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
                {currentCity.outstationRoutes.map((route, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top route badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-100 text-amber-900">
                          {route.tag || "Popular Route"}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {route.duration} • {route.distance}
                        </span>
                      </div>

                      {/* Route destination */}
                      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <span>{currentCity.cityName}</span>
                        <ArrowRight className="w-4 h-4 text-amber-500" />
                        <span>{route.destination}</span>
                      </h3>

                      {/* Vehicle Price Breakdown */}
                      <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Hatchback (WagonR / Tiago):</span>
                          <span className="font-extrabold text-slate-900">₹{route.hatchPrice.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Prime Sedan (Dzire / Etios):</span>
                          <span className="font-extrabold text-slate-900">₹{route.sedanPrice.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Family SUV (Ertiga / Carens):</span>
                          <span className="font-extrabold text-slate-900">₹{route.suvPrice.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Book CTA */}
                    <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting at</div>
                        <div className="text-xl font-black text-slate-900 leading-none">
                          ₹{route.hatchPrice.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <Link
                        href={`/?tripType=outstation-oneway&fromCity=${encodeURIComponent(currentCity.cityName)}&toCity=${encodeURIComponent(route.destination)}`}
                        className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                      >
                        <span>Book Cab</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 2. HOURLY LOCAL CAR RENTAL PACKAGES */}
        {/* ======================================================== */}
        {(activeServiceTab === "all" || activeServiceTab === "rental") && (
          <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-6 sm:p-8">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>City Disposal & Multiple Stops</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Hourly Car Rentals in {currentCity.cityName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Keep the cab and chauffeur with you for as long as you need. Stop anywhere, wait anytime.
                  </p>
                </div>

                <div className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  Zero Surge • Chauffeur Included
                </div>
              </div>

              {/* 4 Packages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
                {currentCity.rentalPackages.map((pkg) => (
                  <div
                    key={pkg.packageId}
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                      pkg.popular
                        ? "border-amber-400 bg-amber-50/40 shadow-md ring-2 ring-amber-400/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      {pkg.popular && (
                        <div className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-2">
                          Most Popular
                        </div>
                      )}

                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        {pkg.duration}
                      </div>
                      <div className="text-2xl font-black text-slate-900 mt-0.5">
                        {pkg.km}
                      </div>

                      <p className="text-xs text-slate-500 mt-2 leading-relaxed min-h-[36px]">
                        {pkg.idealFor}
                      </p>

                      {/* Tier pricing table */}
                      <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Hatchback:</span>
                          <span className="font-extrabold text-slate-900">₹{pkg.hatchPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Prime Sedan:</span>
                          <span className="font-extrabold text-slate-900">₹{pkg.sedanPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Family SUV:</span>
                          <span className="font-extrabold text-slate-900">₹{pkg.suvPrice}</span>
                        </div>
                      </div>

                      {/* Included checklist */}
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Multiple stops permitted</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Fuel & Chauffeur allowance</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>100% Free cancellation</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200/80">
                      <Link
                        href={`/?tripType=hourly&fromCity=${encodeURIComponent(currentCity.cityName)}&hourlyPackage=${encodeURIComponent(`${pkg.duration} / ${pkg.km}`)}`}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
                          pkg.popular
                            ? "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm"
                            : "bg-slate-900 hover:bg-slate-800 text-white"
                        }`}
                      >
                        <span>Select {pkg.duration}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 3. AIRPORT TRANSFERS SECTION */}
        {/* ======================================================== */}
        {(activeServiceTab === "all" || activeServiceTab === "airport") && (
          <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0b101b] rounded-3xl border border-white/10 shadow-xl p-6 sm:p-8 text-white relative overflow-hidden">
              
              {/* Background gradient accents */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-3">
                      <Plane className="w-3.5 h-3.5" />
                      <span>{currentCity.airportCode} Dedicated Airport Service</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Airport Cabs to & from {currentCity.airportName}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      On-time terminal pickup and drop with real-time flight tracking. Your chauffeur monitors flight delays live and arrives automatically.
                    </p>
                  </div>

                  {/* Airport Starting Price Highlight Card */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col sm:items-end justify-between shrink-0">
                    <div className="text-xs text-slate-300 font-semibold">Airport Fares Starting at</div>
                    <div className="text-3xl font-black text-amber-400 my-1">
                      ₹{currentCity.airportStartingPrice} <span className="text-xs text-white/70 font-normal">all-inclusive</span>
                    </div>
                    <Link
                      href={`/?tripType=airport&fromCity=${encodeURIComponent(currentCity.cityName)}&toCity=${encodeURIComponent(currentCity.airportName)}`}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition active:scale-95 flex items-center gap-1.5 shadow-md shadow-amber-400/20"
                    >
                      <span>Book Airport Cab</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-white text-xs sm:text-sm">45 Mins Free Wait</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Plenty of time to collect luggage without hurry</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <Plane className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-white text-xs sm:text-sm">Live Flight Tracking</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Pickup automatically adjusts if flight is delayed</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <Percent className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-white text-xs sm:text-sm">Zero Night Surcharge</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Same transparent pricing 24 hours a day</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-white text-xs sm:text-sm">Doorstep & Terminal Meet</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Chauffeur assists with heavy luggage</div>
                    </div>
                  </div>
                </div>

                {/* Major Terminal Drops in this city */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-semibold">Key Airport Transfer Corridors in {currentCity.cityName}:</span>
                  {currentCity.airportTerminalDrops.map((drop, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/10 text-[11px]"
                    >
                      {drop}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 4. LOCAL HOTSPOTS & COVERAGE IN THIS CITY */}
        {/* ======================================================== */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-black text-slate-900">
                100% Citywide Pickup & Drop Available Across {currentCity.cityName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Fast 15-minute doorstep dispatch across major hubs:{" "}
                <span className="font-bold text-slate-700">
                  {currentCity.popularLocalHotspots.join(" • ")}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:+917044022000"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Helpline</span>
              </a>

              <Link
                href={`/?fromCity=${encodeURIComponent(currentCity.cityName)}`}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              >
                <span>Book in {currentCity.cityName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

