"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  Building2,
  Users,
  MapPin,
  Car,
  FileText,
  Lock,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import {
  CORPORATE_DETAILS_MAP,
  CORPORATE_PICK_DROP_SLUGS,
  CorporateDetail,
} from "@/data/corporatePickDropRoutes";

export function CorporateDirectoryClient() {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("hourly");

  const corporates = CORPORATE_PICK_DROP_SLUGS.map(
    (slug) => CORPORATE_DETAILS_MAP[slug]
  ).filter(Boolean);

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || "Kolkata",
      to: params.toCity || "TCS Gitanjali Park New Town",
      tripType: params.tripType || "hourly",
      type: params.tripType || "hourly",
      date: params.pickupDate || new Date().toISOString().split("T")[0],
      time: params.pickupTime || "08:30 AM",
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
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">Corporate Employee Pick & Drop Kolkata</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>B2B Employee Mobility • Staff Shuttles • Daily IT Office Commute</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Corporate Pick &amp; Drop <span className="text-sky-400">Kolkata</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Safe, punctual, and cost-effective daily employee commute solutions for Kolkata&apos;s leading IT parks &amp; MNCs across Salt Lake Sector V, New Town, Rajarhat, and Bantala SEZ.
            </p>
          </div>

          {/* Hero Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900">
            <HeroSearch
              activeTripType={activeTripType}
              onTripTypeChange={(type) => setActiveTripType(type)}
              initialFrom="Kolkata"
              initialTo="Sector V Salt Lake IT Hub"
              onSearch={handleHeroSearch}
            />
          </div>
        </div>
      </section>

      {/* Corporate Tech Parks & MNCs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-widest mb-1">
              <Building2 className="w-4 h-4" />
              <span>Major IT Campuses &amp; Business Parks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Select Your Office Hub in Kolkata
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Click on your company campus below to explore shift timings, popular residential pickup corridors, monthly pass rates, and corporate transport contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corporates.map((corp: CorporateDetail) => {
            const detailHref = `/corporate-pick-drop-kolkata/${corp.slug}`;

            return (
              <div
                key={corp.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:border-sky-400"
              >
                <div>
                  {/* Card Header */}
                  <div className="p-5 pb-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      {corp.zone}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mt-2">
                      {corp.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{corp.campusName}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{corp.hubLocation}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{corp.employeeCountEstimate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Airport: <strong>{corp.distanceFromAirport.split("(")[0]}</strong></span>
                    </div>

                    <p className="text-[11px] text-slate-500 pt-2 line-clamp-2 border-t border-slate-100">
                      {corp.description}
                    </p>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Monthly Pass from</span>
                    <span className="text-base font-black text-slate-900">₹{corp.monthlyPassEstimate.toLocaleString("en-IN")}<span className="text-[10px] font-normal text-slate-500">/mo</span></span>
                  </div>

                  <Link
                    href={detailHref}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition shadow-sm"
                  >
                    <span>View Rates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enterprise Transport Value Pillars */}
      <section className="bg-white py-14 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Enterprise SLA &amp; Compliance</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Why Top IT Companies Partner with BroomBoom
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Trusted by tech firms, BPOs, and consulting teams for seamless employee commute and night-shift security.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-sky-50/60 border border-sky-200/60">
              <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">99.8% On-Time SLA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated driver dispatch 15 minutes before shift windows to eliminate login delays.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-sky-50/60 border border-sky-200/60">
              <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Female Employee Safety</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                NASSCOM compliant: Security escort guards on night trips, door-to-door escort, and SOS button.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-sky-50/60 border border-sky-200/60">
              <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Comprehensive Fleet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                AC Sedans (Dzire), compact SUVs (Ertiga), and 13 to 26 seater Force Urbania staff shuttles.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-sky-50/60 border border-sky-200/60">
              <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold mb-3 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Automated MIS &amp; GST</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monthly consolidated GST billing with detailed trip logs for corporate tax credits and expense audit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Call to Action */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">Need a Custom Fleet Contract for Your Company?</h3>
            <p className="text-xs sm:text-sm text-sky-100 mt-1">
              Speak directly with our Kolkata Corporate Mobility Specialist for route audits, pilot trials, and SLA agreements.
            </p>
          </div>
          <a
            href="tel:+917003589163"
            className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-sky-600" />
            <span>Call +91 70035 89163</span>
          </a>
        </div>
      </section>

      <Footer />
      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
