"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  ShieldCheck,
  Fuel,
  Gauge,
  CheckCircle2,
  Calendar,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  PhoneCall,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Check,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";

interface SelfDriveCar {
  name: string;
  category: string;
  image: string;
  seats: string;
  fuel: string;
  transmission: string;
  pricePerDay: number;
  badge?: string;
  highlights: string[];
}

const SELF_DRIVE_FLEET: SelfDriveCar[] = [
  {
    name: "Maruti Swift / Hyundai Grand i10",
    category: "Hatchback",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    seats: "5 Seater",
    fuel: "Petrol",
    transmission: "Manual / Automatic",
    pricePerDay: 1199,
    badge: "Budget Friendly",
    highlights: ["Unlimited KMs available", "22+ km/l mileage", "Compact city parking"],
  },
  {
    name: "Maruti Dzire / Honda Amaze",
    category: "Sedan",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    seats: "5 Seater",
    fuel: "Petrol / CNG",
    transmission: "Manual / Automatic",
    pricePerDay: 1699,
    badge: "Most Popular",
    highlights: ["Spacious 378L boot space", "Plush highway comfort", "Cruise control"],
  },
  {
    name: "Hyundai Creta / Maruti Brezza",
    category: "Compact SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    seats: "5 Seater",
    fuel: "Diesel / Petrol",
    transmission: "Automatic",
    pricePerDay: 2499,
    badge: "Road Trip Favourite",
    highlights: ["190mm ground clearance", "Panoramic sunroof", "Apple CarPlay & Android Auto"],
  },
  {
    name: "Mahindra Thar 4x4 / Scorpio-N",
    category: "Adventure SUV",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    seats: "4 / 7 Seater",
    fuel: "mStallion / mHawk Diesel",
    transmission: "Manual / Automatic",
    pricePerDay: 3799,
    badge: "Off-Road Ready",
    highlights: ["True 4x4 low range", "Rugged all-terrain tyres", "Hill hold & descent assist"],
  },
  {
    name: "Toyota Innova Crysta",
    category: "Luxury 7-Seater",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    seats: "7 / 8 Seater",
    fuel: "Diesel Turbo",
    transmission: "Automatic",
    pricePerDay: 4199,
    badge: "Family & Executive",
    highlights: ["Captain seats & rear AC", "Exceptional highway stability", "Huge luggage capacity"],
  },
];

const SELF_DRIVE_CITIES = [
  { city: "Kolkata", slug: "kolkata", cars: "45+ Cars Available" },
  { city: "Delhi NCR", slug: "delhi", cars: "80+ Cars Available" },
  { city: "Mumbai", slug: "mumbai", cars: "70+ Cars Available" },
  { city: "Bangalore", slug: "bangalore", cars: "85+ Cars Available" },
  { city: "Goa", slug: "goa", cars: "95+ Cars Available" },
  { city: "Pune", slug: "pune", cars: "50+ Cars Available" },
  { city: "Hyderabad", slug: "hyderabad", cars: "60+ Cars Available" },
  { city: "Jaipur", slug: "jaipur", cars: "40+ Cars Available" },
  { city: "Chandigarh", slug: "chandigarh", cars: "35+ Cars Available" },
  { city: "Kochi", slug: "kochi", cars: "30+ Cars Available" },
  { city: "Ahmedabad", slug: "ahmedabad", cars: "40+ Cars Available" },
];

const SELF_DRIVE_FAQS = [
  {
    category: "Eligibility & Documents",
    question: "What documents do I need to rent a self-drive car with BroomBoom?",
    answer:
      "You need a valid original Indian Driving License (minimum 1 year old) and an Aadhaar Card or Passport for identity and address proof. International travelers need an International Driving Permit (IDP) and Passport.",
  },
  {
    category: "Security Deposit",
    question: "Is there any security deposit required?",
    answer:
      "BroomBoom offers Zero Security Deposit options on select verified profiles with UPI autopay. For other rentals, a minimal refundable deposit (₹2,000 to ₹5,000 depending on vehicle class) is refunded directly within 24 hours of safe vehicle return.",
  },
  {
    category: "Kilometer Limits & Fuel",
    question: "Are kilometers unlimited, and how does fuel work?",
    answer:
      "We provide both Unlimited Kilometer packages and capped packages (150 km/day, 300 km/day). Cars are delivered with a full tank and should be returned with the same fuel level, or you can opt for convenient prepaid fuel.",
  },
  {
    category: "Doorstep Delivery",
    question: "Can the self-drive car be delivered to my home, hotel, or airport?",
    answer:
      "Yes! We provide doorstep car delivery and pickup at your home, hotel, railway station, or airport terminal in all covered cities for a nominal fee.",
  },
];

export const SelfDrivenHubClient: React.FC = () => {
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [selectedTransmission, setSelectedTransmission] = useState("all");
  const [fuelPolicy, setFuelPolicy] = useState<"without" | "with">("without");
  const [bookingSuccessModal, setBookingSuccessModal] = useState<SelfDriveCar | null>(null);

  const filteredFleet = SELF_DRIVE_FLEET.filter((car) => {
    if (selectedTransmission === "manual") return car.transmission.includes("Manual");
    if (selectedTransmission === "auto") return car.transmission.includes("Automatic");
    return true;
  });

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-purple-500 selection:text-white">
      <Navbar onMyBookingsClick={() => setIsMyBookingsOpen(true)} />

      {/* Hero Banner */}
      <section
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-24 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.88), rgba(10, 16, 26, 0.94)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-300">Self-Drive Car Rentals</span>
          </nav>

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-black uppercase tracking-wider mb-3">
              <KeyRound className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
              <span>Drive Freedom &bull; Unlimited KMs &bull; Zero Deposit Options</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Self-Drive Car Rentals Across India
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-2xl">
              Take the wheel and explore at your own pace. Clean, sanitized Hatchbacks, Sedans, Creta, Thar 4x4, and Innova Crysta with doorstep delivery and 24x7 roadside assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Quick City & Rental Form */}
      <div className="relative -mt-12 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-purple-600 mb-1">
                Quick Car Search
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Find Self-Drive Cars in Your City
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
              <button
                onClick={() => setFuelPolicy("without")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  fuelPolicy === "without"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Without Fuel (Most Popular)
              </button>
              <button
                onClick={() => setFuelPolicy("with")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  fuelPolicy === "with"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                With Fuel Included
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                City / Location
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {SELF_DRIVE_CITIES.map((c) => (
                  <option key={c.slug} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Transmission
              </label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Transmissions</option>
                <option value="manual">Manual Transmission</option>
                <option value="auto">Automatic Transmission</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Duration
              </label>
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900">
                1 Day (24 Hours)
              </div>
            </div>

            <div className="flex items-end">
              <a
                href="tel:+918240765499"
                className="w-full py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call to Book: 8240765499</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Catalog */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-purple-600">
            Premium Verified Fleet
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Choose Your Self-Drive Machine
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every car is mechanically inspected, sanitized, and equipped with fast FasTag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFleet.map((car, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    {car.category}
                  </div>
                  {car.badge && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      {car.badge}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900">{car.name}</h3>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Seats</div>
                      <div className="text-xs font-black text-slate-900">{car.seats}</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Gearbox</div>
                      <div className="text-xs font-black text-slate-900 truncate">
                        {car.transmission.split("/")[0]}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Fuel</div>
                      <div className="text-xs font-black text-slate-900">{car.fuel.split("/")[0]}</div>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-1.5">
                    {car.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Starting from</div>
                    <div className="text-2xl font-black text-slate-900">
                      ₹{car.pricePerDay}
                      <span className="text-xs text-slate-400 font-semibold"> / day</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingSuccessModal(car)}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Steps How It Works */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400">
              Effortless Booking
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              How Self-Drive Rental Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From reservation to unlocking the car in 4 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-black text-sm flex items-center justify-center mb-4 border border-purple-400/30">
                01
              </div>
              <h3 className="text-base font-black text-white">Select Car &amp; Dates</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Choose your preferred car model, pickup hub or doorstep address, and trip dates.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-black text-sm flex items-center justify-center mb-4 border border-purple-400/30">
                02
              </div>
              <h3 className="text-base font-black text-white">Fast Digital KYC</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Upload your Driving License and Aadhaar/Passport in under 2 minutes for instant approval.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-black text-sm flex items-center justify-center mb-4 border border-purple-400/30">
                03
              </div>
              <h3 className="text-base font-black text-white">Doorstep Delivery</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Our pilot delivers the sanitized car right to your doorstep, airport terminal, or railway station.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-black text-sm flex items-center justify-center mb-4 border border-purple-400/30">
                04
              </div>
              <h3 className="text-base font-black text-white">Drive Freedom</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Turn the ignition and hit the highway with 24x7 roadside assistance and zero return hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* City Directory for Self-Drive */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-purple-600 mb-1">
              Nationwide Coverage
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Self-Drive Cars by City
            </h2>
          </div>
          <a
            href="tel:+918240765499"
            className="inline-flex items-center gap-2 text-xs font-black text-white bg-purple-600 hover:bg-purple-700 px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Instant Booking: +91 8240765499</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {SELF_DRIVE_CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/self-driven/${c.slug}`}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all text-center group"
            >
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Car className="w-4 h-4" />
              </div>
              <div className="text-xs font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                {c.city}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{c.cars}</div>
            </Link>
          ))}
        </div>
      </section>

      <WhyChooseUs />

      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title="Self-Drive Rental Frequently Asked Questions"
            subtitle="Clear answers on documentation, security deposit, fuel, and delivery"
            items={SELF_DRIVE_FAQS}
          />
        </div>
      </section>

      <Footer />

      {/* Reservation Popup Modal */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Reserve {bookingSuccessModal.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              City: {selectedCity} &bull; Starting from ₹{bookingSuccessModal.pricePerDay}/day
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900">
              <p className="font-bold">Instant Reservation via Customer Desk:</p>
              <p className="mt-1 text-slate-600">
                To confirm vehicle availability and doorstep delivery slot in {selectedCity}, please call our self-drive fleet manager directly.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href="tel:+918240765499"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call +91 8240765499</span>
              </a>
              <button
                onClick={() => setBookingSuccessModal(null)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isMyBookingsOpen && (
        <MyBookingsDrawer
          isOpen={isMyBookingsOpen}
          onClose={() => setIsMyBookingsOpen(false)}
        />
      )}
    </main>
  );
};
