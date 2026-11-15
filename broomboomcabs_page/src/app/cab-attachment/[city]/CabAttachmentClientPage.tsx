"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Shield,
  Clock,
  Car,
  Headphones,
  Award,
  CheckCircle2,
  PhoneCall,
  MapPin,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Smartphone,
  Star,
  Users,
  FileText,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Building2,
  Check,
  Send,
  Loader2,
  Briefcase,
  Plane,
  Heart,
  Truck,
  Route,
  Globe,
  Gift,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { api } from "@/services/api";

interface CabAttachmentClientPageProps {
  cityId: string;
  cityName: string;
  stateName: string;
}

const VEHICLE_TIERS = [
  { type: "4 Seater", tag: "High Demand" },
  { type: "6 Seater", tag: "Highest Outstation Fares" },
  { type: "10 Seater", tag: "Fleet Favorite" },
  { type: "13 Seater", tag: "Fleet Favorite" },
  { type: "15 seater", tag: "Fleet Favorite" },
  { type: "24 Seater", tag: "Fleet Favorite" },
];

/* ------------------------------------------------------------------ */
/* City-specific content (Delhi-first, Pune fallback, generic default) */
/* ------------------------------------------------------------------ */

type Hub = { name: string; desc: string; badge: string };

const CITY_HUBS: Record<string, Hub[]> = {
  delhi: [
    {
      name: "IGI Airport & Aerocity Corridor",
      desc: "24x7 airport cab attachment for Terminal 1, 2, 3 with priority pickup queues, pre-booked arrivals, and corporate flyer drops to Aerocity & Gurugram.",
      badge: "24x7 Airport Dispatch",
    },
    {
      name: "Delhi – NCR Outstation Routes",
      desc: "High-demand one-way and round-trip outstation cabs from Delhi to Jaipur, Agra, Chandigarh, Shimla, Haridwar, and Rishikesh with return booking matching.",
      badge: "Outstation Guarantee",
    },
    {
      name: "Corporate & IT Hubs (Gurugram / Noida)",
      desc: "Cyber City, Golf Course Road, Sohna Road, Noida Sector 62 & 125, and Okhla Phase 3 for daily employee transport and executive disposal.",
      badge: "Peak Corporate Trips",
    },
    {
      name: "Wedding & Event Venues",
      desc: "Premium sedan, SUV, and tempo traveller attachment for weddings, family functions, and corporate events across Delhi, Gurugram, and Noida.",
      badge: "Wedding Season Fares",
    },
    {
      name: "Delhi City Local & Tourist Routes",
      desc: "Full-day and half-day Delhi sightseeing car rental packages — India Gate, Qutub Minar, Red Fort, Akshardham — with steady local booking volume.",
      badge: "Daily City Bookings",
    },
    {
      name: "Station Transfers (NDLS / NZM / ANVT)",
      desc: "New Delhi, Hazrat Nizamuddin, and Anand Vihar railway station transfer bookings with fixed pickup windows and return trip pairing.",
      badge: "Station Transfer Duty",
    },
  ],
  pune: [
    {
      name: "Pune - Mumbai Expressway Corridor",
      desc: "Wakad, Baner, Hinjawadi to Navi Mumbai, BKC, and Mumbai Airport. Highest return bonuses with guaranteed return booking matching.",
      badge: "Expressway Guarantee",
    },
    {
      name: "Major IT & Tech Parks",
      desc: "Hinjawadi Rajiv Gandhi Infotech Park (Phase 1, 2, 3), Magarpatta Cybercity, Kharadi EON Free Zone, and Yerwada Commerzone.",
      badge: "Peak Corporate Trips",
    },
    {
      name: "Pune International Airport (PNQ)",
      desc: "Dedicated 24x7 priority flight pickup queue at Lohegaon terminal with pre-booked domestic & international arrival commuters.",
      badge: "24x7 Airport Dispatch",
    },
    {
      name: "PCMC & Chakan Industrial Belts",
      desc: "Pimpri, Chinchwad, Bhosari, Talegaon, and Chakan MIDC for plant visits, vendor transit, and executive disposal.",
      badge: "Industrial Daily Duty",
    },
    {
      name: "Weekend & Pilgrimage Corridors",
      desc: "Pune to Shirdi Sai Baba, Mahabaleshwar-Panchgani, Lonavala-Khandala, Alibaug beaches, and Ashtavinayak temple darshan.",
      badge: "Outstation Fares",
    },
  ],
};

const GENERIC_HUBS: Hub[] = [
  {
    name: "Airport & Station Transfers",
    desc: "24x7 priority airport and railway station pickup queues with pre-booked arrival and departure commuters.",
    badge: "24x7 Transfers",
  },
  {
    name: "Corporate & IT Hubs",
    desc: "Daily employee transport and executive disposal across major business districts and IT parks.",
    badge: "Peak Corporate Trips",
  },
  {
    name: "Outstation Corridors",
    desc: "High-demand one-way and round-trip outstation cabs with guaranteed return booking matching.",
    badge: "Outstation Guarantee",
  },
  {
    name: "Wedding & Event Venues",
    desc: "Premium sedan, SUV, and tempo traveller attachment for weddings, family functions, and corporate events.",
    badge: "Wedding Season Fares",
  },
  {
    name: "City Local & Tourist Routes",
    desc: "Full-day and half-day sightseeing car rental packages with steady local booking volume.",
    badge: "Daily City Bookings",
  },
];

const REQUIRED_DOCUMENTS = [
  {
    title: "Commercial Driving License (DL)",
    desc: "Valid transport / commercial badge or active driving license.",
  },
  {
    title: "Vehicle RC (Commercial T-Permit)",
    desc: "Registration Certificate with valid commercial yellow-plate permit.",
  },
  {
    title: "Vehicle Insurance & Fitness",
    desc: "Active commercial vehicle third-party/comprehensive insurance and fitness certificate.",
  },
  {
    title: "Aadhaar Card & PAN Card",
    desc: "Driver/Owner government ID proof for instant biometric & bank verification.",
  },
  {
    title: "Bank Account / Cancelled Cheque",
    desc: "Account details or UPI ID for automated instant daily earnings credit.",
  },
  {
    title: "Tourist Permit (State / AITP)",
    desc: "State transport permit or All India Tourist Permit for outstation cabs.",
  },
];

const CITY_FAQS: Record<string, { q: string; a: string }[]> = {
  delhi: [
    {
      q: "Is there any registration or cab attachment fee with BroomBoom in Delhi?",
      a: "No! Attaching your cab, taxi, or tempo traveller with BroomBoom Cabs in Delhi is 100% FREE. There are zero upfront registration charges, zero security deposits, and no hidden onboarding fees.",
    },
    {
      q: "How do I receive payments for completed trips?",
      a: "BroomBoom provides instant daily payouts. Your trip earnings are credited directly to your registered bank account or UPI ID every evening. You never have to wait for weekly or monthly settlement cycles.",
    },
    {
      q: "Can I attach my car for outstation trips from Delhi?",
      a: "Yes! BroomBoom supports outstation taxi attachment in Delhi with one-way and round-trip bookings to Jaipur, Agra, Chandigarh, Shimla, Haridwar, and other destinations. Our smart dispatch pairs you with verified return passengers so you avoid dead mileage.",
    },
    {
      q: "What types of vehicles are accepted for attachment in Delhi?",
      a: "We welcome commercial yellow-plate Sedans (Dzire, Etios, Aura), Hatchbacks (WagonR, Tiago), SUVs (Ertiga, Innova Crysta), Tempo Travellers, and commercial vehicles. Vehicles should be in neat, roadworthy condition with valid commercial documents.",
    },
    {
      q: "Can I attach my cab part-time or on weekends only?",
      a: "Yes! You have complete flexibility. You can log into the BroomBoom Pilot App full-time, part-time during morning/evening office peaks, or exclusively on weekends for outstation tourist trips and wedding car bookings.",
    },
    {
      q: "What safety and support does BroomBoom provide to drivers in Delhi?",
      a: "Every verified pilot receives 24x7 Hindi & English operational support, real-time in-app SOS emergency assistance, and free accidental insurance coverage for peace of mind on highway and city journeys.",
    },
  ],
  pune: [
    {
      q: "Is there any registration or cab attachment fee with BroomBoom in Pune?",
      a: "No! Attaching your cab, taxi, or auto with BroomBoom Cabs in Pune is 100% FREE. There are zero upfront registration charges, zero security deposits, and no hidden onboarding fees.",
    },
    {
      q: "How do I receive payments for completed trips?",
      a: "BroomBoom provides instant daily payouts. Your trip earnings are credited directly to your registered bank account or UPI ID every evening. You never have to wait for weekly or monthly settlement cycles.",
    },
    {
      q: "Can I drive on the Pune - Mumbai Expressway route?",
      a: "Yes! The Pune-Mumbai corridor is our highest-demand intercity route. Our smart dispatch system pairs you with verified return passengers so you never have to drive back with an empty vehicle.",
    },
    {
      q: "What types of vehicles are accepted for attachment in Pune?",
      a: "We welcome commercial yellow-plate Sedans (Dzire, Etios, Aura), Hatchbacks (WagonR, Tiago), SUVs (Ertiga, Innova Crysta), Tempo Travellers, and Auto Rickshaws. Vehicles should be in neat, roadworthy condition with valid commercial documents.",
    },
    {
      q: "Can I attach my cab part-time or on weekends only?",
      a: "Yes! You have complete flexibility. You can log into the BroomBoom Pilot App full-time, part-time during morning/evening office peaks, or exclusively on weekends for outstation tourist trips to Lonavala, Shirdi, and Mahabaleshwar.",
    },
    {
      q: "What safety and support does BroomBoom provide to drivers?",
      a: "Every verified pilot receives 24x7 Marathi & Hindi operational support, real-time in-app SOS emergency assistance, and ₹5 Lakh free accidental insurance coverage for peace of mind on highway journeys.",
    },
  ],
};

const GENERIC_FAQS = [
  {
    q: "Is there any registration or cab attachment fee with BroomBoom?",
    a: "No! Attaching your cab, taxi, or tempo traveller with BroomBoom Cabs is 100% FREE. There are zero upfront registration charges, zero security deposits, and no hidden onboarding fees.",
  },
  {
    q: "How do I receive payments for completed trips?",
    a: "BroomBoom provides instant daily payouts. Your trip earnings are credited directly to your registered bank account or UPI ID every evening.",
  },
  {
    q: "Can I attach my car for outstation trips?",
    a: "Yes! BroomBoom supports outstation taxi attachment with one-way and round-trip bookings. Our smart dispatch pairs you with verified return passengers so you avoid dead mileage.",
  },
  {
    q: "What types of vehicles are accepted for attachment?",
    a: "We welcome commercial yellow-plate Sedans, Hatchbacks, SUVs, Tempo Travellers, and commercial vehicles in neat, roadworthy condition with valid commercial documents.",
  },
  {
    q: "Can I attach my cab part-time or on weekends only?",
    a: "Yes! You have complete flexibility. Drive full-time, part-time during office peaks, or exclusively on weekends for outstation and wedding car bookings.",
  },
  {
    q: "What safety and support does BroomBoom provide?",
    a: "Every verified pilot receives 24x7 operational support, real-time in-app SOS emergency assistance, and free accidental insurance coverage.",
  },
];

const CITY_TESTIMONIALS: Record<
  string,
  { name: string; location: string; vehicle: string; earning: string; quote: string }[]
> = {
  delhi: [
    {
      name: "Rajesh Kumar",
      location: "Dwarka, Delhi",
      vehicle: "Swift Dzire (Sedan)",
      earning: "₹68,000 / month",
      quote:
        "I attach my car for airport transfers and outstation trips to Jaipur and Agra. BroomBoom gives me confirmed return bookings so I never drive back empty. Daily UPI payout is a game changer.",
    },
    {
      name: "Amit Singh",
      location: "Rohini, Delhi",
      vehicle: "Toyota Innova (SUV)",
      earning: "₹82,000 / month",
      quote:
        "Corporate trips from Gurugram Cyber City and wedding bookings in the season keep my Innova fully booked. Commission is low, and support is always reachable on the phone.",
    },
    {
      name: "Vikram Chauhan",
      location: "Noida, Delhi NCR",
      vehicle: "Fleet Owner (4 Cars)",
      earning: "₹2,10,000 / month total",
      quote:
        "Attaching all four of my commercial cars took less than an hour. Zero registration fee, on-time daily settlements, and steady airport + outstation duty keep every car busy.",
    },
  ],
  pune: [
    {
      name: "Sachin Deshmukh",
      location: "Wakad, Pune",
      vehicle: "Swift Dzire (Sedan)",
      earning: "₹62,000 / month",
      quote:
        "Earlier with other aggregator apps, I used to get stuck returning empty from Mumbai. With BroomBoom, I get confirmed return passenger bookings back to Pune before I even cross the toll plaza.",
    },
    {
      name: "Rahul Jadhav",
      location: "Hadapsar, Pune",
      vehicle: "Maruti Ertiga (SUV)",
      earning: "₹78,000 / month",
      quote:
        "I drive outstation trips to Shirdi, Mahabaleshwar, and Lonavala. BroomBoom charges very low commission compared to big platforms, and support talks in Marathi whenever I need help.",
    },
    {
      name: "Santosh Patil",
      location: "PCMC, Pune",
      vehicle: "Fleet Owner (3 Cars)",
      earning: "₹1,85,000 / month total",
      quote:
        "Attaching all my three commercial cars took just half an hour. Zero registration fees, on-time daily settlements, and steady corporate duty trips keep all my cars busy.",
    },
  ],
};

const GENERIC_TESTIMONIALS = [
  {
    name: "Verified Pilot",
    location: "BroomBoom Network",
    vehicle: "Sedan",
    earning: "₹60,000+ / month",
    quote:
      "BroomBoom gives me steady bookings with low commission, instant daily payouts, and return-trip matching. Best platform I've driven with.",
  },
  {
    name: "Verified Pilot",
    location: "BroomBoom Network",
    vehicle: "SUV",
    earning: "₹75,000+ / month",
    quote:
      "Outstation and corporate bookings keep my SUV fully utilized. Support is responsive and settlements are always on time.",
  },
  {
    name: "Fleet Owner",
    location: "BroomBoom Network",
    vehicle: "Multi-Car Fleet",
    earning: "₹2,00,000+ / month",
    quote:
      "Attaching my entire fleet was quick and free. Daily settlements and steady duty keep all my vehicles earning.",
  },
];

const ATTACHMENT_VEHICLE_OPTIONS = [
  { value: "4 Seater", label: "4 Seater" },
  { value: "suv-6", label: "6 Seater" },
  { value: "suv-plus-7", label: "7 Seater" },
  { value: "cab-10", label: "10 Seater" },
  { value: "tempo-13", label: "13 Seater" },
  { value: "tempo-15", label: "15 Seater" },
  { value: "tempo-24", label: "24 Seater" },
];

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export function CabAttachmentClientPage({
  cityId,
  cityName,
  stateName,
}: CabAttachmentClientPageProps) {
  const cityKey = (cityName || "").toLowerCase();
  const cityHubs = CITY_HUBS[cityKey] || GENERIC_HUBS;
  const cityFaqs = CITY_FAQS[cityKey] || GENERIC_FAQS;
  const cityTestimonials = CITY_TESTIMONIALS[cityKey] || GENERIC_TESTIMONIALS;

  // Form State
  const [city, setCity] = useState(cityName || "");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "thankyou">("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedVehicleLabel =
    ATTACHMENT_VEHICLE_OPTIONS.find((opt) => opt.value === vehicleType)?.label || "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVehicleDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVehicleDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const resetForm = () => {
    setStep("form");
    setCity(cityName || "");
    setPhone("");
    setVehicleType("");
    setIsVehicleDropdownOpen(false);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg("");

    const trimmedCity = city.trim();
    if (trimmedCity.length < 2) {
      setErrorMsg("Please enter your city or town.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!vehicleType) {
      setErrorMsg("Please select your vehicle type.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createUser({
        name: `Cab Attachment Applicant (${trimmedCity})`,
        phone: phone.trim(),
        city: trimmedCity,
        vehicleType: vehicleType,
        leadType: `cab-attachment-${vehicleType}`,
        source: `Cab Attachment Application - ${trimmedCity}`,
        lastLoginAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Lead creation error:", err);
    } finally {
      setIsSubmitting(false);
      setStep("thankyou");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar />

      {/* ============================ HERO ============================ */}
      <section
        id="top"
        className="relative pt-4 sm:pt-6 lg:pt-8 pb-14 sm:pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0e1d35] text-white overflow-visible"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/driver-job" className="hover:text-amber-400 transition">
              Attach Cab
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold capitalize">{cityName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{cityName} Pilot Network &bull; Zero Joining Fee</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
                Cab Attachment in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                  {cityName}
                </span>{" "}
                with BroomBoom Cabs
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Attach your Sedan, Hatchback, SUV, Tempo Traveller, or commercial
                vehicle in {cityName}. Get airport transfers, outstation one-way &
                round-trip bookings, wedding car attachment, corporate duties, and
                city rentals — with instant daily payouts, low commission, and
                24x7 support. Earn up to{" "}
                <span className="text-amber-300 font-bold">₹10,000/month</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {[
                  "Daily Instant Bank / UPI Settlements",
                  "Guaranteed Return Outstation Trips",
                  "Low Platform Fee (Keep up to 90%)",
                  "24x7 Pilot Support",
                  "Free Accidental Insurance",
                  "Zero Upfront Registration Charges",
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3.5 text-xs text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">
                    Direct {cityName} Pilot Onboarding Desk:
                  </div>
                  <a
                    href="tel:+918240765499"
                    className="text-white hover:text-amber-300 font-black text-sm tracking-wide"
                  >
                    +91 8240765499
                  </a>
                </div>
              </div>
            </div>

            {/* Registration Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full border border-slate-100 transition-all">
                {step === "form" && (
                  <>
                    <h2 className="text-2xl sm:text-[26px] font-black leading-tight text-center mb-6 tracking-tight">
                      <span className="text-[#FFC700] block">
                        Confirm your phone number
                      </span>
                      <span className="text-[#FFC700]">and fill out </span>
                      <span className="text-slate-950 font-black">
                        the application
                      </span>
                    </h2>

                    {errorMsg && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center"
                      >
                        {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <div>
                        <label htmlFor="attachment-city" className="sr-only">
                          Your city or town
                        </label>
                        <input
                          id="attachment-city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (errorMsg) setErrorMsg("");
                          }}
                          placeholder="Your city or town"
                          className="w-full px-5 py-4 bg-[#f3f4f6] text-slate-800 placeholder:text-slate-400 font-medium text-sm sm:text-base rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-[#FFC700] transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="attachment-phone" className="sr-only">
                          Your phone number
                        </label>
                        <input
                          id="attachment-phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                            if (errorMsg) setErrorMsg("");
                          }}
                          placeholder="Your phone number"
                          className="w-full px-5 py-4 bg-[#f3f4f6] text-slate-800 placeholder:text-slate-400 font-medium text-sm sm:text-base rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-[#FFC700] transition"
                        />
                      </div>

                      <div className="relative" ref={dropdownRef}>
                        <label id="attachment-vehicle-label" className="sr-only">
                          Vehicle type
                        </label>
                        <button
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded={isVehicleDropdownOpen}
                          aria-labelledby="attachment-vehicle-label"
                          onClick={() => setIsVehicleDropdownOpen((prev) => !prev)}
                          className={`w-full px-5 py-4 bg-[#f3f4f6] font-medium text-sm sm:text-base rounded-2xl border-0 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#FFC700] transition cursor-pointer ${
                            isVehicleDropdownOpen ? "ring-2 ring-[#FFC700]" : ""
                          } ${
                            selectedVehicleLabel
                              ? "text-slate-800"
                              : "text-slate-400"
                          }`}
                        >
                          <span>{selectedVehicleLabel || "Vehicle type"}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                              isVehicleDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isVehicleDropdownOpen && (
                          <ul
                            role="listbox"
                            aria-labelledby="attachment-vehicle-label"
                            className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 max-h-64 overflow-y-auto origin-top"
                          >
                            {ATTACHMENT_VEHICLE_OPTIONS.map((opt) => {
                              const isSelected = vehicleType === opt.value;
                              return (
                                <li
                                  key={opt.value}
                                  role="option"
                                  aria-selected={isSelected}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setVehicleType(opt.value);
                                      setIsVehicleDropdownOpen(false);
                                      if (errorMsg) setErrorMsg("");
                                    }}
                                    className={`w-full px-5 py-2.5 text-left text-sm sm:text-base flex items-center justify-between transition cursor-pointer ${
                                      isSelected
                                        ? "bg-amber-50 text-slate-950 font-bold"
                                        : "text-slate-700 font-medium hover:bg-slate-100"
                                    }`}
                                  >
                                    <span>{opt.label}</span>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-amber-500 shrink-0" />
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>

                      <div className="pt-2 text-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-10 py-3.5 bg-[#FFC700] hover:bg-[#eab308] active:scale-95 text-slate-950 font-bold text-base rounded-2xl shadow-sm transition cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {step === "thankyou" && (
                  <div className="text-center py-6 px-2 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        Thank You!
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                        Your application has been received successfully. Our driver
                        onboarding specialist will connect with you shortly.
                      </p>
                    </div>
                    <div className="pt-4 pb-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.broomboompilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:scale-105 transition-transform duration-200"
                      >
                        <img
                          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                          alt="Get it on Google Play"
                          className="h-14 mx-auto object-contain"
                        />
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs text-amber-600 font-bold hover:underline pt-2 cursor-pointer inline-block"
                    >
                      Submit another application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW TO ATTACH YOUR CAR IN {CITY} ============ */}
      <section className="py-16 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            Complete Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2 mb-5">
            Attach Your Cab/Car/Taxi in {cityName}: How to Get Started
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            If you&apos;re wondering how to attach my cab, attach my taxi, or attach my
            car with the BroomBoom company in {cityName} City, the process is
            straightforward. Whether you&apos;re interested in outstation taxi
            attachment in {cityName}, airport cab attachment in {cityName}, or wedding
            car attachment in {cityName}, the BroomBoom Pilot application or online
            car attachment website provides the step-by-step process. Follow the 6
            steps below to begin.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            BroomBoom is the leading fastest-growing car rentals, outstation cab
            booking, airport/station transfers, and tour cab packages provider in all
            parts of India. Get multiple bookings in a day and grab the chance to earn
            by driving with BroomBoom Pilot daily from your {cityName} city anytime.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether it&apos;s a one-way cab attachment in {cityName} or round-trip
            bookings in {cityName}, we ensure that your vehicle is always utilized
            efficiently, giving you a steady income stream. From day-to-day rides to
            long-distance trips, we help you grow your business with us.
          </p>
        </div>
      </section>

      {/* ============ HOW TO ATTACH MY CAR FOR OUTSTATION ============ */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Outstation Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2 mb-4">
                How to Attach My Car for Outstation Services in {cityName}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Are you interested in offering outstation services? With outstation
                taxi attachment options in {cityName}, the BroomBoom Pilots application
                allows you to attach your car for long-distance rides. Whether
                it&apos;s a one-way cab attachment in {cityName} or round-trip bookings
                in {cityName}, we ensure that your vehicle is always utilized
                efficiently, giving you a steady income stream.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                From family vacations to corporate trips, attaching your car for
                outstation rides allows you to tap into a lucrative market with
                guaranteed return-trip matching so you never drive back empty.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-200">
                {[
                  `One-way outstation cab attachment in ${cityName}`,
                  "Round-trip outstation bookings",
                  "Guaranteed return passenger matching",
                  "Airport & station transfer bookings",
                  "Car rental packages for sightseeing",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center">
                  <Route className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">
                    Outstation Guarantee
                  </h4>
                  <p className="text-xs text-slate-400">
                    Return-trip matching included
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                Our smart dispatch pairs you with verified return passengers from{" "}
                {cityName} to Jaipur, Agra, Chandigarh, Shimla, Haridwar, and other
                destinations so you avoid dead mileage and maximize every trip.
              </p>
              <a
                href="#top"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition"
              >
                <span>Attach for Outstation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ATTACH MY CAR TO COMPANY IN {CITY} ============ */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Attach My Car to Company
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2 mb-4">
                Attach My Car to Company in {cityName}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Attaching your car with a reputable company of {cityName} like
                BroomBoom Pilots can open doors to multiple opportunities. Whether
                you&apos;re a fleet owner or a single cab owner, attaching your car in
                the BroomBoom Pilots app or BroomBoom Cabs Vendor app ensures access
                to a wide network of customers. Our platform offers cab attachment
                services in India, with a particular focus on metropolitan cities like{" "}
                {cityName}. From day-to-day rides to long-distance trips, we help you
                grow your business with us.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Join BroomBoom Pilots app in {cityName} City today. Whether you&apos;re
                an experienced driver, a single cab owner, or a fleet operator,
                attaching your car to the BroomBoom Pilots app in {cityName} opens up
                new avenues for growth. Our car driver app platform provides you with
                access to a wide variety of customers and services, including airport
                transfers, outstation trips, and much more cab services in {cityName}{" "}
                or taxi services in {cityName}.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Attach your taxi in {cityName}, attach a cab in {cityName}, or attach
                a car in {cityName} city today and become a part of our growing
                community. It&apos;s time to take your cab business in {cityName} to
                the next level with BroomBoom Pilots!
              </p>
              <a
                href="#top"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition"
              >
                <span>Attach My Car Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Building2,
                  label: "Corporate Cab Attachment",
                  desc: "Employee travel & executive disposal",
                },
                {
                  icon: Plane,
                  label: "Airport Cab Attachment",
                  desc: "24x7 airport transfers",
                },
                {
                  icon: Route,
                  label: "Outstation Taxi Attachment",
                  desc: "One-way & round-trip rides",
                },
                {
                  icon: Heart,
                  label: "Wedding Car Attachment",
                  desc: "Premium vehicles for events",
                },
                {
                  icon: Clock,
                  label: "City Rentals",
                  desc: "Full-day / half-day sightseeing",
                },
                {
                  icon: Truck,
                  label: "Commercial Vehicle Attachment",
                  desc: "Tempo traveller & seater variants",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900">{item.label}</h4>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ONLINE CAB ATTACHMENT ============ */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Online Cab Attachment in {cityName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2 mb-4">
                Online Cab Attachment in {cityName}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                With BroomBoom Pilots, the process of online cab attachment in{" "}
                {cityName} in the BroomBoom Pilots application is seamless. It&apos;s
                the best online cab application for cab drivers or cab vendor partners
                to earn daily more than{" "}
                <strong className="text-amber-300">Rs 100,000/-</strong> in a month
                with the rapidly growing BroomBoom Pilots app anywhere in the city.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Choose booking category as per your choice and time. Catch outstation
                one-way bookings, outstation round-trip bookings from {cityName} City
                or nearby areas, even car rental packages for sightseeing in the City
                too along with airport or station transfers.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                Whether you&apos;re a driver or a fleet operator, the cab driver app
                in {cityName}, the platform makes it easy for you to list your vehicle
                and start getting bookings. Once your car is attached to the BroomBoom
                company, you gain access to a consistent stream of passengers,
                allowing you to focus on providing excellent services to the
                customers.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-200">
                {[
                  "Choose booking category as per your choice and time",
                  "Catch outstation one-way & round-trip bookings",
                  "Car rental packages for sightseeing",
                  "Airport & station transfer bookings",
                  "Easy vehicle listing inside the Pilot app",
                  "Consistent stream of verified passengers",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">
                    BroomBoom Pilot App
                  </h4>
                  <p className="text-xs text-slate-400">Available on Google Play</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                <strong className="text-white">
                  Find Cab Attachment Near Me in {cityName}.
                </strong>{" "}
                If you&apos;re searching for a cab attachment near me in {cityName},
                BroomBoom Pilots offers services across various regions.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                With a presence in cities like Delhi, Mumbai, Pune, Chandigarh,
                Kerala, Hyderabad and beyond, we ensure that you can connect with
                customers wherever you are. We focus on building a network of reliable
                taxi car attachment services so that you can easily meet the growing
                demand for rides.
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.broomboompilot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-105 transition-transform"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-12 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MONTHLY EARNINGS ============ */}
      <section className="py-16 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Transparent Income Structure</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Estimated Monthly Earnings in {cityName}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Choose your vehicle tier and earn with full flexibility. No deductions,
            no surprise clawbacks, and instant daily payouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VEHICLE_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 group-hover:bg-amber-100 group-hover:text-amber-900 transition">
                    {tier.tag}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-1">
                  {tier.type}
                </h3>

                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/90 to-yellow-50/60 border border-amber-200/80 my-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    Est. Monthly Income
                  </div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">
                    Attach &amp; Start Earning
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    Based on steady daily bookings
                  </div>
                </div>
              </div>

              <a
                href="#top"
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-800 text-xs font-bold transition text-center"
              >
                Attach {tier.type}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ============ HIGH DEMAND HUBS ============ */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Where You Make Money
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Top Earning Hubs in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              BroomBoom routes you directly into the most profitable commercial &amp;
              outstation pickup spots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityHubs.map((hub, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-amber-400/50 transition-all shadow-md"
              >
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-3">
                  {hub.badge}
                </div>
                <h3 className="text-lg font-black text-white mb-2">{hub.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {hub.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUTSTATION / WEDDING / FLEET / COMMERCIAL ============ */}
      <section className="py-16 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Route,
              title: `Outstation Taxi Attachment in ${cityName}: Expanding Your Reach`,
              desc: `If you're looking to provide outstation services, the BroomBoom Pilots app for car drivers or cab vendors offers an excellent opportunity. With outstation taxi attachment, you can cater to long-distance travel needs. We offer a one-way cab attachment service in ${cityName} that connects travelers to destinations beyond city limits. From family vacations to corporate trips, attaching your car for outstation rides allows you to tap into a lucrative market.`,
            },
            {
              icon: Heart,
              title: `Attach a Taxi for Weddings, Tours, and Travels in BroomBoom Pilot App`,
              desc: `Looking for wedding car attachment in ${cityName} or car attachment in tours and travels? BroomBoom Pilots gives you the flexibility to offer your services for special occasions. Our platform allows you to provide exclusive prime top model vehicles for weddings, family trips, and corporate tours. This is a great way to ensure that your car is constantly in demand, even during peak seasons.`,
            },
            {
              icon: Building2,
              title: `Company / Corporate Cab Attachment`,
              desc: `Looking to provide company cab attachment services in ${cityName}? Whether you're a direct cab operator or part of a larger fleet, you can attach your vehicle to corporate accounts and cater to employees' travel needs. The demand for corporate transportation is growing, and BroomBoom Pilots offers the ideal platform for such services.`,
            },
            {
              icon: Users,
              title: `Taxi Car Attachment in ${cityName}: A Perfect Fit for Fleet Owners`,
              desc: `Are you a fleet owner in ${cityName} looking for a way to expand your business? Taxi car attachment in ${cityName} offers you a great way to scale up. By attaching your vehicles to the BroomBoom Pilots app platform, you can provide services like airport transfers in ${cityName}, outstation taxi attachment in ${cityName}, and even wedding car attachment in ${cityName}. With us, your fleet can grow efficiently without the hassle of managing every aspect of the operation.`,
            },
            {
              icon: Truck,
              title: `Attach Your Commercial Vehicle in ${cityName}: Tap into New Opportunities`,
              desc: `Don't limit yourself to only cars and taxis. If you own a commercial vehicle, you can also attach your commercial vehicle to BroomBoom Pilots. Our platform offers different seater tempo traveller attachment in ${cityName}, which is ideal for group bookings and tours. Whether it's for corporate travel, family tours, or events, attaching your commercial vehicle will increase your earning potential.`,
            },
            {
              icon: Briefcase,
              title: `Attach Your Taxi in ${cityName} Today`,
              desc: `Whether you're an experienced driver, a single cab owner, or a fleet operator, attaching your taxi or cab to BroomBoom Pilots app in ${cityName} opens up new avenues for growth. Apply now to become part of the trusted fleet of drivers and cab vendors in ${cityName}.`,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-lg transition"
            >
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Closing CTA — "Ready to get started?" */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
            Ready to get started? Apply now to become a part of BroomBoom Pilots app
            in {cityName} City, the trusted fleet of drivers and cab vendors in{" "}
            {cityName}. Don&apos;t miss out on the opportunity to grow your business
            with one of the leading cab attachment services in India.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition shadow-lg shadow-amber-400/25"
          >
            <span>Apply Now to Attach Your Vehicle</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ============ CITY CAB PARTNER BENEFITS ============ */}
      <section className="pb-16 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider mb-3">
                {cityName} Cab Partner
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                {cityName} Cab Partner: The Benefits of Joining BroomBoom Pilots in{" "}
                {cityName} City
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Becoming a cab partner with BroomBoom Pilots in your city means
                you&apos;re not just attaching a vehicle, or attach my car in{" "}
                {cityName}; you&apos;re joining a community of drivers and fleet owners
                dedicated to providing quality service all time. The partnership
                allows you to earn more, with flexible working hours and the potential
                to grow your business. Whether you&apos;re attaching a taxi in{" "}
                {cityName}, attaching a tempo traveller in {cityName}, or even
                attaching a commercial vehicle in {cityName}, we offer various car
                attachment options in {cityName}, in your City, even in all parts of
                India that suit your needs.
              </p>

              <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Company Cab Attachment in {cityName}: The Corporate Connection
                      Driver App
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2">
                      Are you looking to provide company cab attachment services in{" "}
                      {cityName} city? Whether you&apos;re a direct cab operator or
                      part of a larger fleet, you can attach your vehicle to corporate
                      accounts and cater to employees&apos; travel needs. The demand
                      for corporate transportation is growing, and BroomBoom Pilots
                      offers the ideal platform for such services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                "Earn more with low commission",
                "Flexible working hours",
                "Corporate account access",
                "Referral bonuses & incentives",
                "Free accidental insurance",
                "Instant daily settlements",
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-sm font-bold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS BANNER ============ */}
      <section className="pb-16 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 sm:p-10 text-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
                {cityName} Cab Partner Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                Joining BroomBoom Pilots Means More Than Attaching a Vehicle
              </h2>
              <p className="text-sm text-amber-950/90 font-medium leading-relaxed">
                You&apos;re joining a community of drivers and fleet owners dedicated
                to quality service. Enjoy flexible working hours, higher earnings, and
                the potential to grow your business with corporate cab attachment,
                taxi attachment, tempo traveller attachment, and commercial vehicle
                options tailored to your needs.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "Earn more with low commission",
                "Flexible working hours",
                "Corporate account access",
                "Referral bonuses & incentives",
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-sm font-bold text-slate-950"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ REFERRAL BONUS ============ */}
      <section className="pb-16 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Refer &amp; Earn Huge Incentives
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed max-w-xl">
                Help your other driver friends by referring them with your referral
                code to register and earn huge incentives and bonus on the BroomBoom
                driving platform.
              </p>
            </div>
          </div>
          <a
            href="tel:+918240765499"
            className="shrink-0 px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Get Your Referral Code</span>
          </a>
        </div>
      </section>

      {/* ============ DOCUMENTS & 6-STEP PROCESS ============ */}
      <section className="py-16 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              Checklist
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              Documents Required for Cab Attachment in {cityName}
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              To guarantee passenger safety and quick KYC verification, please keep
              clear photos or copies of the following commercial vehicle documents
              ready:
            </p>

            <div className="space-y-3.5">
              {REQUIRED_DOCUMENTS.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{doc.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 sm:p-10 text-slate-950 shadow-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black uppercase tracking-wider mb-4">
              Fast Track
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Start Earning in 6 Simple Steps
            </h3>
            <p className="text-xs sm:text-sm text-amber-950/90 font-medium mb-8">
              No long office queues. Complete your cab attachment online in just a few
              minutes.
            </p>

            <div className="space-y-5">
              {[
                {
                  step: "01",
                  title: "Sign Up",
                  desc: "Install the BroomBoom Pilots vendor or driver application page from the Play Store.",
                },
                {
                  step: "02",
                  title: "Submit Car Details",
                  desc: "Fill in the required information about your vehicle, including car registration details, type of car, and your contact information.",
                },
                {
                  step: "03",
                  title: "Documentation",
                  desc: "Upload necessary documents like your driver's license, vehicle insurance, and registration papers in the BroomBoom Pilots app.",
                },
                {
                  step: "04",
                  title: "Approval and Listing",
                  desc: `After verification, your vehicle will be approved and listed for bookings. Your cab attachment profile in ${cityName} will get verified automatically by the BroomBoom Pilot app.`,
                },
                {
                  step: "05",
                  title: "Recharge Your Wallet",
                  desc: "After the activation of your profile, recharge your wallet so that you can easily accept any bookings of your choice anytime.",
                },
                {
                  step: "06",
                  title: "Get Booking",
                  desc: "Accept bookings from the Upcoming Rides section to earn by completing the rides successfully with top ratings from the customer.",
                },
              ].map((s, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-950 text-amber-400 font-black text-base flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-950">{s.title}</h4>
                    <p className="text-xs text-amber-950/80 mt-1 leading-relaxed font-medium">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-amber-600/50 flex flex-wrap items-center justify-between gap-3">
              <a
                href="tel:+918240765499"
                className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call Onboarding Desk</span>
              </a>
              <a
                href={`https://wa.me/918240765499?text=Hi%20BroomBoom,%20I%20want%20to%20attach%20my%20cab%20in%20${cityName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">
              Trusted by Hundreds of Pilots
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              What {cityName} Drivers Say About BroomBoom
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cityTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">
                      {t.location} &bull; {t.vehicle}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                    {t.earning}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQS ============ */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Frequently Asked Questions — Cab Attachment in {cityName}
          </h2>
        </div>

        <div className="space-y-3.5">
          {cityFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-amber-600 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? "rotate-180 text-amber-600" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="py-12 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full mb-10">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#12223d] rounded-3xl p-8 sm:p-12 text-white border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Ready to Upgrade Your Daily Earnings?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Join the {cityName} BroomBoom Pilot Network Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Zero registration fee. Attach your car in 15 minutes and take your first
              ride today with instant daily payout security.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+918240765499"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: +91 8240765499</span>
            </a>
            <a
              href={`https://wa.me/918240765499?text=Hi%20BroomBoom,%20I%20want%20to%20attach%20my%20cab%20in%20${cityName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Attachment</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}