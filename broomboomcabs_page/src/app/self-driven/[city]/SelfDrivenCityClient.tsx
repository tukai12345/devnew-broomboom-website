"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Check,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { getCityServiceData } from "@/data/cityServicesData";

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

const BASE_CARS: SelfDriveCar[] = [
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

interface SelfDrivenCityClientProps {
  cityName: string;
  citySlug: string;
}

export const SelfDrivenCityClient: React.FC<SelfDrivenCityClientProps> = ({
  cityName,
  citySlug,
}) => {
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<SelfDriveCar | null>(null);
  const cityData = getCityServiceData(citySlug);

  const localHubs = cityData?.airportTerminalDrops || [
    `${cityName} Airport Terminal 1 & 2`,
    `${cityName} Central Railway Station`,
    "City Center & Tech Hub Pickup",
    "Doorstep Delivery Across All Localities",
  ];

  const cityFaqs = [
    {
      category: "Documents",
      question: `What documents are required to rent a self-drive car in ${cityName}?`,
      answer: `You need a valid original Indian Driving License (minimum 1 year old) and an Aadhaar Card or Passport. Digital verification takes less than 2 minutes before handover in ${cityName}.`,
    },
    {
      category: "Security Deposit",
      question: `Is there any deposit for self-drive cars in ${cityName}?`,
      answer: `We offer Zero Security Deposit options on verified customer profiles. For standard rentals, a nominal ₹2,000 to ₹3,000 deposit is refunded within 24 hours of safe vehicle return.`,
    },
    {
      category: "Doorstep Delivery",
      question: `Can the car be delivered directly to my home or hotel in ${cityName}?`,
      answer: `Yes! Our pilot delivers the clean, sanitized car to your doorstep anywhere in ${cityName} or directly at the airport arrivals terminal.`,
    },
  ];

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
            <Link href="/self-driven" className="hover:underline">
              Self-Drive
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-300">{cityName}</span>
          </nav>

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-black uppercase tracking-wider mb-3">
              <KeyRound className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
              <span>{cityName} Self-Drive Fleet &bull; Unlimited KMs</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Self-Drive Car Rental in {cityName}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-2xl">
              Drive on your own terms in {cityName}. Hatchbacks, Sedans, Creta, Thar 4x4, and Innova Crysta available with doorstep delivery and zero security deposit options.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Hubs in City */}
      <div className="relative -mt-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Doorstep Delivery Available Across {cityName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Airport, railway station hubs &amp; direct home drops
                </p>
              </div>
            </div>

            <a
              href="tel:+918240765499"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: +91 8240765499</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
            {localHubs.map((hub, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate">{hub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Fleet in City */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-purple-600">
            {cityName} Fleet
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Available Self-Drive Cars in {cityName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Sanitized, well-maintained cars with full insurance coverage and 24x7 roadside support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BASE_CARS.map((car, idx) => (
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
                    onClick={() => setSelectedCar(car)}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WhyChooseUs />

      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title={`Self-Drive Cars in ${cityName} — FAQs`}
            subtitle={`Common questions about renting self-drive cars in ${cityName}`}
            items={cityFaqs}
          />
        </div>
      </section>

      <Footer />

      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Reserve {selectedCar.name} in {cityName}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Rate: ₹{selectedCar.pricePerDay}/day &bull; Unlimited KMs
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900">
              <p className="font-bold">Instant Doorstep Booking:</p>
              <p className="mt-1 text-slate-600">
                To lock your delivery slot in {cityName} and confirm paperwork, please call our 24x7 self-drive desk.
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
                onClick={() => setSelectedCar(null)}
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
