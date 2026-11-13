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
  Compass,
  AlertCircle,
  Award,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import {
  CorporateDetail,
  CORPORATE_DETAILS_MAP,
  CORPORATE_PICK_DROP_SLUGS,
} from "@/data/corporatePickDropRoutes";

interface CorporateDetailClientProps {
  corp: CorporateDetail;
}

export function CorporateDetailClient({ corp }: CorporateDetailClientProps) {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState("hourly");

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || "Kolkata",
      to: params.toCity || corp.name,
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

  const otherCompanies = CORPORATE_PICK_DROP_SLUGS.filter((s) => s !== corp.slug)
    .slice(0, 4)
    .map((s) => CORPORATE_DETAILS_MAP[s])
    .filter(Boolean);

  return (
    <main className="min-h-screen flex flex-col bg-[#fbfbfb] text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-5 flex-wrap">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/corporate-pick-drop-kolkata" className="hover:underline">
              Corporate Pick &amp; Drop Kolkata
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-300">{corp.companyName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{corp.zone} • Daily Commute &amp; Staff Shuttles</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {corp.name} <span className="text-sky-400">Pick &amp; Drop Cabs</span>
              </h1>
              <p className="text-sm font-medium text-slate-300 mt-2">{corp.campusName}</p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span className="line-clamp-1">{corp.hubLocation.split(",")[0]}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Airport: {corp.distanceFromAirport.split("(")[0]}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>99.8% On-Time SLA</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/90 backdrop-blur-md border border-sky-500/30 rounded-2xl p-5 text-center shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                Monthly Commuter Subscription
              </span>
              <div className="text-3xl font-black text-white mt-1">
                ₹{corp.monthlyPassEstimate.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Guaranteed AC seat, doorstep morning pickup, evening drop &amp; zero ride cancellations.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>GST Tax Invoices for Corporate Reimbursement</span>
              </div>
            </div>
          </div>

          {/* HeroSearch Preloaded for this corporate hub */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900">
            <HeroSearch
              activeTripType={activeTripType}
              onTripTypeChange={(type) => setActiveTripType(type)}
              initialFrom="Kolkata"
              initialTo={corp.name}
              onSearch={handleHeroSearch}
            />
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        {/* Shift Timings & Transport Schedule */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-sm uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4 text-sky-600" />
            <span>Shift Timings &amp; Transport Operations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
            Custom Commuter Schedules for {corp.companyName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corp.shiftTimings.map((shift, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center mb-2">
                  #{idx + 1}
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{shift}</p>
                <span className="text-[10px] text-emerald-600 font-bold mt-3 block">
                  ✓ Doorstep Service Available
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet & Pricing Comparison */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                Transparent Fleet Plans
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {corp.name} Employee Commute Rates
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              *Available for individual associates or company B2B contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corp.fleetOptions.map((fleet, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between shadow-xs ${
                  fleet.badge
                    ? "border-sky-400 ring-2 ring-sky-400/20"
                    : "border-slate-200 hover:border-sky-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {fleet.vehicle.split(" ")[0]}
                    </span>
                    {fleet.badge && (
                      <span className="text-[10px] font-black uppercase text-white bg-sky-600 px-2.5 py-0.5 rounded-full shadow-2xs">
                        {fleet.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{fleet.vehicle}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{fleet.model}</p>
                  <p className="text-xs font-medium text-slate-600 mt-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{fleet.seating}</span>
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Per Trip Rate:</span>
                      <strong className="text-slate-900 font-bold">{fleet.perTripRate}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Monthly Seat Pass:</span>
                      <strong className="text-sky-700 font-bold">{fleet.monthlyPerSeat}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Dedicated Full Cab:</span>
                      <strong className="text-slate-800 font-semibold">{fleet.dedicatedCabMonthly}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      const qs = new URLSearchParams({
                        from: "Kolkata",
                        to: corp.name,
                        tripType: "hourly",
                        vehicle: fleet.vehicle.toLowerCase().includes("sedan")
                          ? "sedan"
                          : fleet.vehicle.toLowerCase().includes("suv")
                          ? "suv"
                          : "hatchback",
                      }).toString();
                      router.push(`/fleet?${qs}`);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition text-center shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Book {fleet.vehicle.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Commute Corridors Across Kolkata */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
              Commute Routes
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Popular Pickup Corridors to {corp.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Estimated transit times during morning peak and evening departure hours via optimal expressway routes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {corp.itineraryCorridors.map((corridor, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-sky-50/40 hover:border-sky-300 transition"
              >
                <div className="flex items-center justify-between text-xs font-bold text-sky-700 mb-1">
                  <span>{corridor.fromArea}</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                    {corridor.duration} ({corridor.distance})
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Via:</strong> {corridor.routeVia}
                </p>
                <p className="text-[11px] text-slate-500 mt-2">
                  <strong>Peak Travel Window:</strong> {corridor.peakHours}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Compliance Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
              About {corp.name} Mobility Services
            </h2>
            <div className="prose prose-sm text-slate-600 leading-relaxed space-y-4">
              <p>{corp.description}</p>
              <p>
                BroomBoom eliminates the daily hassles of unpredictable app surge pricing, public bus overcrowding, and auto haggling. Associates enjoy a guaranteed AC seat, pre-assigned chauffeurs, and dedicated tracking from their apartment complex straight to their office turnstiles.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-sky-500/10 to-blue-600/5 rounded-2xl border border-sky-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
              <span>Enterprise Safety &amp; Compliance</span>
            </h3>

            <ul className="space-y-3">
              {corp.complianceFeatures.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-sky-200/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Company Transport / HR Inquiry?</p>
                  <a href="tel:+917003589163" className="text-sm font-black text-slate-900 hover:text-sky-700 transition">
                    +91 70035 89163 (Corporate Desk)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
              Have Questions?
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions: {corp.name} Commute
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {corp.faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Tech Hubs Quick Links */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                Other Tech Parks
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Explore Other Corporate Campuses in Kolkata
              </h2>
            </div>
            <Link
              href="/corporate-pick-drop-kolkata"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All 8 Tech Hubs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherCompanies.map((other) => (
              <Link
                key={other.slug}
                href={`/corporate-pick-drop-kolkata/${other.slug}`}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-sky-400 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded">
                    {other.zone}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition mt-2">
                    {other.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{other.campusName}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Pass from ₹{other.monthlyPassEstimate}/mo</span>
                  <span className="text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Explore &rarr;
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
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Monthly seat pass</span>
          <span className="text-base font-black text-slate-900">₹{corp.monthlyPassEstimate}/mo</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const qs = new URLSearchParams({
              from: "Kolkata",
              to: corp.name,
              tripType: "hourly",
            }).toString();
            router.push(`/fleet?${qs}`);
          }}
          className="px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
        >
          <span>Book Commuter Cab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Footer />
      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </main>
  );
}
