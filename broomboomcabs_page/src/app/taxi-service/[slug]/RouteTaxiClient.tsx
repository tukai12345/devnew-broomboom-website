"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ChevronRight,
  Users,
  Navigation,
  Fuel,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { ParsedTaxiSlug } from "@/utils/taxiRouteParser";

interface RouteTaxiClientProps {
  route: ParsedTaxiSlug;
  parentHref?: string;
  parentLabel?: string;
}

export function RouteTaxiClient({
  route,
  parentHref = "/taxi-service",
  parentLabel = "Taxi Service",
}: RouteTaxiClientProps) {
  const router = useRouter();
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeTripType, setActiveTripType] = useState(
    route.isAirport ? "airport" : "outstation-oneway"
  );

  const fromCity = route.from;
  const toCity = route.to || "All India Destinations";

  const handleHeroSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || fromCity,
      to: params.toCity || toCity,
      tripType: params.tripType || activeTripType,
      type: params.tripType || activeTripType,
      date: params.pickupDate || new Date().toISOString().split("T")[0],
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
    const searchString = new URLSearchParams(queryObj).toString();
    router.push(`/book-taxi?${searchString}`);
  };

  const scrollToSearch = () => {
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const vehicleOptions = [
    {
      name: "Hatchback",
      models: "WagonR, Tiago, Celerio or equivalent",
      seats: "4 Passengers",
      luggage: "2 Bags",
      ac: true,
      priceLabel: "Lowest Fare",
      rateText: "From ₹10.5 / km",
      ideal: "Solo travellers, couples & budget trips",
    },
    {
      name: "Sedan",
      models: "Dzire, Etios, Aura or equivalent",
      seats: "4 Passengers",
      luggage: "3 Bags (Boot Space)",
      ac: true,
      popular: true,
      priceLabel: "Most Popular",
      rateText: "From ₹12.5 / km",
      ideal: "Business travel, airport transfers & comfortable outstation",
    },
    {
      name: "SUV / Ertiga",
      models: "Ertiga, Triber, Carens or equivalent",
      seats: "6 Passengers",
      luggage: "4 Bags",
      ac: true,
      priceLabel: "Best for Families",
      rateText: "From ₹17.0 / km",
      ideal: "Family vacations, extra luggage & group outstation rides",
    },
    {
      name: "Premium SUV",
      models: "Innova Crysta, Scorpio or equivalent",
      seats: "7 Passengers",
      luggage: "5 Bags",
      ac: true,
      priceLabel: "Executive Luxury",
      rateText: "From ₹22.0 / km",
      ideal: "Luxury highway rides, executive pick-ups & VIP transfers",
    },
  ];

  const faqs = [
    {
      question: `How do I book a cab from ${fromCity} to ${toCity}?`,
      answer: `Booking is simple: enter your pickup address in ${fromCity}, choose your drop point in ${toCity}, pick your travel date and preferred car (Hatchback, Sedan, or SUV). Confirm with zero advance cancellation penalties.`,
    },
    {
      question: `Is the fare from ${fromCity} to ${toCity} one-way or round-trip?`,
      answer: `BroomBoom offers dedicated one-way cab fares. You only pay for the distance travelled from ${fromCity} to ${toCity} without paying any return toll or empty return charges. Round-trip bookings are also available.`,
    },
    {
      question: `Are toll taxes and state permits included in the ${fromCity} to ${toCity} fare?`,
      answer: `BroomBoom provides 100% transparent billing. Base kilometer fares and fuel are included. Toll charges, state taxes, and parking fees (if any) are either pre-calculated or payable transparently at actuals as per government tolls.`,
    },
    {
      question: `Can I get an airport pickup or doorstep pickup in ${fromCity}?`,
      answer: `Yes! Our chauffeurs provide doorstep pickup from anywhere in ${fromCity}, including railway stations, residences, hotels, and airport terminals. We monitor flights to ensure timely pickups without waiting charges.`,
    },
    {
      question: `What safety measures are followed for outstation trips?`,
      answer: `All BroomBoom cabs are GPS-tracked with 24x7 central safety monitoring, emergency SOS support, and verified highway drivers with clean background records.`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onMyBookingsClick={() => setIsBookingsOpen(true)} />

      <main className="flex-grow pt-4 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 space-x-2">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href={parentHref} className="hover:text-amber-600 transition-colors">
              {parentLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold truncate">
              {fromCity} to {toCity}
            </span>
          </nav>
        </div>

        {/* Hero Header */}
        <section className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pb-8 pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-semibold mb-4 border border-amber-300">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Verified Highway Chauffeurs • Zero Return Fare on One-Way
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {fromCity} to {toCity} <span className="text-amber-600">Taxi Service</span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Book verified, sanitized AC cabs from <strong>{fromCity}</strong> to{" "}
                <strong>{toCity}</strong> at transparent, lowest per-km rates. Instant confirmation,
                free cancellation, 24x7 helpline &amp; doorstep pickup.
              </p>
            </div>

            {/* Embedded HeroSearch */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 sm:p-4 md:p-6 mb-8">
              <HeroSearch
                activeTripType={activeTripType}
                onTripTypeChange={(type) => setActiveTripType(type)}
                onSearch={handleHeroSearch}
                initialFrom={fromCity}
                initialTo={toCity}
                heading={{
                  title: `${fromCity} to ${toCity} Cab Booking`,
                  subtitle: "Lowest one-way & round-trip taxi rates with verified chauffeurs",
                  badge: `${fromCity} ➔ ${toCity}`,
                }}
              />
            </div>

            {/* Trust Highlights Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Verified Drivers</div>
                  <div className="text-[11px] text-slate-500">Commercial License & Police Checked</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                <Fuel className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Zero Hidden Fees</div>
                  <div className="text-[11px] text-slate-500">All-Inclusive Transparent Fare</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">Zero Cancellation</div>
                  <div className="text-[11px] text-slate-500">Free Changes Before Pickup</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                <Clock className="w-6 h-6 text-purple-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">24x7 Assistance</div>
                  <div className="text-[11px] text-slate-500">Live Support: +91 8240765499</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Options Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Available Cabs from {fromCity} to {toCity}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Choose the perfect vehicle for your journey. All cabs include air conditioning, clean
              interiors, and professional drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleOptions.map((v) => (
              <div
                key={v.name}
                className={`relative bg-white rounded-2xl border ${
                  v.popular
                    ? "border-amber-500 shadow-lg ring-2 ring-amber-500/20"
                    : "border-slate-200 shadow-sm"
                } p-6 flex flex-col justify-between hover:shadow-md transition-shadow`}
              >
                {v.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {v.priceLabel}
                    </span>
                    <Car className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{v.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{v.models}</p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{v.seats}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{v.luggage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Sanitized &amp; AC Guaranteed</span>
                    </div>
                  </div>

                  <div className="mt-4 p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600">
                    <strong>Ideal for:</strong> {v.ideal}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-base font-extrabold text-amber-600 mb-3">{v.rateText}</div>
                  <button
                    onClick={scrollToSearch}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Route Information & Travel Highlights */}
        <section className="bg-white border-y border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-amber-600 font-bold text-sm tracking-wider uppercase">
                  Travel Highlights &amp; Route Guide
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  Travelling between {fromCity} and {toCity}
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                  Whether you are travelling for work, family holidays, airport connections, or an
                  emergency trip, BroomBoom Cabs ensures a smooth, uninterrupted ride between{" "}
                  <strong>{fromCity}</strong> and <strong>{toCity}</strong>.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">
                        Door-to-Door Pickup &amp; Drop
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        No need to drag luggage to bus stands or railway terminals. Our chauffeur
                        arrives right at your doorstep in {fromCity} and drops you at your exact
                        address in {toCity}.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">
                        Flexible Stoppages &amp; Highway Breaks
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Enjoy the journey with courteous drivers who accommodate refreshment breaks,
                        clean restroom stops, and scenic photo halts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">
                        Transparent Distance &amp; Time Calculation
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Clear, digital billing generated upon trip completion. Zero hidden charges,
                        night surcharges, or arbitrary driver demands.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast Booking Box */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-slate-950 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    24x7 Highway Support
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                    Need an immediate ride from {fromCity}?
                  </h3>
                  <p className="mt-3 text-slate-900 text-sm sm:text-base font-medium">
                    Our customer support team is available round-the-clock to assist with custom
                    cab requirements, group bookings, multi-city itineraries, and airport transfers.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <a
                      href="tel:+918240765499"
                      className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg"
                    >
                      <PhoneCall className="w-4 h-4 text-amber-400" />
                      <span>Call +91 8240765499</span>
                    </a>
                    <button
                      onClick={scrollToSearch}
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-bold py-3 px-6 rounded-xl transition-colors shadow"
                    >
                      <span>Check Fare Online</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose BroomBoom */}
        <WhyChooseUs />

        {/* Route FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <FaqSection items={faqs} />
        </section>
      </main>

      <Footer />

      <MyBookingsDrawer isOpen={isBookingsOpen} onClose={() => setIsBookingsOpen(false)} />
    </div>
  );
}
