"use client";

import React, { useState } from "react";
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
  {
    type: "Prime Sedan",
    models: "Dzire, Etios, Aura, Tigor, Amaze",
    monthlyEarning: "₹48,000 - ₹68,000",
    dailyTrips: "8 - 12 Trips/Day",
    popularRoute: "Pune - Mumbai Expressway & Hinjawadi IT Hubs",
    tag: "High Demand",
  },
  {
    type: "Family SUV (6+1)",
    models: "Ertiga, Triber, Carens, Marazzo",
    monthlyEarning: "₹65,000 - ₹88,000",
    dailyTrips: "4 - 8 Outstation / Rental",
    popularRoute: "Pune to Shirdi, Mahabaleshwar & Lonavala",
    tag: "Highest Outstation Fares",
  },
  {
    type: "Premium SUV+ / Luxury",
    models: "Innova Crysta, Fortuner, XUV700",
    monthlyEarning: "₹85,000 - ₹1,20,000",
    dailyTrips: "Airport & Corporate Disposal",
    popularRoute: "Pune Airport (PNQ) & Corporate Chakan Corridors",
    tag: "Top Earnings",
  },
  {
    type: "Hatchback",
    models: "WagonR, Tiago, Celerio, Swift",
    monthlyEarning: "₹38,000 - ₹52,000",
    dailyTrips: "10 - 14 City Rides",
    popularRoute: "Kothrud, Viman Nagar, PCMC, Hadapsar",
    tag: "Consistent Daily Cashflow",
  },
  {
    type: "Tempo Traveller",
    models: "12 / 17 / 26 Seater Winger / Force",
    monthlyEarning: "₹95,000 - ₹1,45,000",
    dailyTrips: "Corporate & Weekend Tours",
    popularRoute: "Pune to Goa, Konkan & Ashtavinayak Tours",
    tag: "Fleet Favorite",
  },
  {
    type: "Auto Rickshaw",
    models: "Bajaj, Piaggio (CNG / EV / Petrol)",
    monthlyEarning: "₹25,000 - ₹38,000",
    dailyTrips: "15 - 20 Local Rides",
    popularRoute: "Swargate, Shivajinagar, Station & PCMC",
    tag: "Zero Idle Waiting",
  },
];

const PUNE_HIGH_DEMAND_HUBS = [
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
];

const REQUIRED_DOCUMENTS = [
  {
    title: "Commercial Driving License (DL)",
    desc: "Valid transport / commercial badge or active driving license.",
  },
  {
    title: "Vehicle RC (Commercial T-Permit)",
    desc: "Registration Certificate with commercial yellow-plate MH-12 or MH-14 permit.",
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
    desc: "Maharashtra state transport permit or All India Tourist Permit for outstation cabs.",
  },
];

const FAQS = [
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
];

export function CabAttachmentClientPage({
  cityId,
  cityName,
  stateName,
}: CabAttachmentClientPageProps) {
  // Form State
  const [driverName, setDriverName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("sedan");
  const [locality, setLocality] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!driverName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createUser({
        name: `${driverName.trim()} (Cab Attachment - ${cityName})`,
        phone: phone.trim(),
        leadType: `cab-attachment-${vehicleType}`,
        source: `Cab Attachment Page - ${cityName} (${locality || "City"})`,
      });
    } catch (err) {
      console.error("Lead creation error:", err);
    } finally {
      setIsSubmitting(false);
      setStep("otp");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setErrorMsg("Please enter the 4-digit code sent to your phone.");
      return;
    }
    setErrorMsg("");
    setStep("success");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0e1d35] text-white overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/driver-job" className="hover:text-amber-400 transition">
              Attach Cab
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold capitalize">
              {cityName}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Proposition */}
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
                Attach your Sedan, Hatchback, SUV, Auto, or Tempo Traveller in{" "}
                {cityName}. Enjoy instant daily bank payouts, zero dead mileage
                on the Pune-Mumbai Expressway, low commission, and round-the-clock
                support. Start earning up to{" "}
                <span className="text-amber-300 font-bold">₹85,000/month</span> today!
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {[
                  "Daily Instant Bank / UPI Settlements",
                  "Guaranteed Return Trips on Expressway",
                  "Low Platform Fee (Keep up to 90%)",
                  "24x7 Marathi & Hindi Pilot Support",
                  "₹5 Lakh Free Accidental Insurance",
                  "Zero Upfront Registration Charges",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Direct Call / Helpline Badge */}
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3.5 text-xs text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">
                    Direct {cityName} Pilot Onboarding Desk:
                  </div>
                  <a
                    href="tel:+918240828414"
                    className="text-white hover:text-amber-300 font-black text-sm tracking-wide"
                  >
                    +91 8240828414
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Registration Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-600">
                      Fast 2-Minute Onboarding
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Attach Your Cab in {cityName}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Car className="w-5 h-5" />
                  </div>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {step === "form" && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        placeholder="e.g. Sachin Deshmukh"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Mobile Number (WhatsApp)
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 font-bold text-sm">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value.replace(/\D/g, ""))
                          }
                          placeholder="9876543210"
                          className="w-full px-4 py-3 rounded-r-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Vehicle Category
                      </label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition bg-white"
                      >
                        <option value="sedan">
                          Prime Sedan (Dzire, Etios, Aura, Tigor)
                        </option>
                        <option value="suv">
                          Family SUV (Ertiga, Triber, Carens)
                        </option>
                        <option value="luxury-suv">
                          Prime SUV+ (Innova Crysta, Fortuner)
                        </option>
                        <option value="hatchback">
                          Hatchback (WagonR, Tiago, Celerio)
                        </option>
                        <option value="tempo">
                          Tempo Traveller (12/17/26 Seater)
                        </option>
                        <option value="auto">Auto Rickshaw (CNG / Petrol)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Locality / Base in {cityName}
                      </label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Hinjawadi, Wakad, Hadapsar, PCMC"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-400/25 transition flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Quick Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[11px] text-slate-500 text-center leading-tight">
                      By continuing, you agree to receive SMS / WhatsApp trip
                      updates. 100% data privacy guaranteed.
                    </p>
                  </form>
                )}

                {step === "otp" && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-center">
                      <Smartphone className="w-7 h-7 text-amber-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-700">
                        Enter the verification code sent to{" "}
                        <strong className="text-slate-900">+91 {phone}</strong>
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 text-center">
                        Enter 4-Digit Code
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        autoFocus
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="1234"
                        className="w-full text-center tracking-[0.5em] text-2xl font-black px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm uppercase tracking-wider transition shadow-lg shadow-emerald-500/20"
                    >
                      Confirm &amp; Activate Pilot Account
                    </button>

                    <div className="flex justify-between items-center text-xs pt-1">
                      <button
                        type="button"
                        onClick={() => setStep("form")}
                        className="text-slate-500 hover:text-slate-800"
                      >
                        &larr; Change Details
                      </button>
                      <button
                        type="button"
                        onClick={() => alert("Verification code re-sent!")}
                        className="text-amber-600 hover:underline font-semibold"
                      >
                        Resend Code
                      </button>
                    </div>
                  </form>
                )}

                {step === "success" && (
                  <div className="text-center py-4 space-y-4 animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">
                        Registration Initiated!
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                        Welcome to the BroomBoom {cityName} Pilot Fleet,{" "}
                        <strong>{driverName}</strong>! Our local Pune onboarding
                        officer will call you within 15 minutes to complete
                        document verification.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
                      <div className="font-bold text-slate-800">
                        Next Steps for Immediate Activation:
                      </div>
                      <div className="text-slate-600">
                        1. Keep Commercial DL, RC &amp; Insurance handy.
                      </div>
                      <div className="text-slate-600">
                        2. Send photos to our WhatsApp verification desk.
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/918240828414?text=Hello%20BroomBoom,%20I%20have%20submitted%20my%20cab%20attachment%20form%20for%20${cityName}.%20My%20name%20is%20${driverName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Documents on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Earnings Potential Grid */}
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
                <p className="text-xs text-slate-500 mb-4">{tier.models}</p>

                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/90 to-yellow-50/60 border border-amber-200/80 mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    Est. Monthly Income
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">
                    {tier.monthlyEarning}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    Based on {tier.dailyTrips}
                  </div>
                </div>

                <div className="text-xs text-slate-600 flex items-start gap-2 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Top Corridor:</strong> {tier.popularRoute}
                  </span>
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

      {/* High Demand Earning Corridors in Pune */}
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
            {PUNE_HIGH_DEMAND_HUBS.map((hub, idx) => (
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

      {/* Documents & 3-Step Process */}
      <section className="py-16 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Required Documents */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              Checklist
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              Documents Required for Cab Attachment in {cityName}
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              To guarantee passenger safety and quick KYC verification, please
              keep clear photos or copies of the following commercial vehicle
              documents ready:
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
                    <h4 className="text-sm font-bold text-slate-900">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3 Steps to Attach Cab */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 sm:p-10 text-slate-950 shadow-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black uppercase tracking-wider mb-4">
              Fast Track
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Start Earning in 3 Simple Steps
            </h3>
            <p className="text-xs sm:text-sm text-amber-950/90 font-medium mb-8">
              No long office queues. Complete your cab attachment online or via
              WhatsApp in just under 20 minutes.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Submit Vehicle & Contact Details",
                  desc: "Fill the quick form on this page or message us directly on WhatsApp with your vehicle type and phone number.",
                },
                {
                  step: "02",
                  title: "Digital Document Verification",
                  desc: "Our Pune officer checks your DL, RC, and Insurance. FastTag and basic safety inspection are completed digitally.",
                },
                {
                  step: "03",
                  title: "Download Pilot App & Take First Ride",
                  desc: "Install the BroomBoom Pilot App, log in with your verified credentials, and start accepting high-fare trips instantly.",
                },
              ].map((s, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-950 text-amber-400 font-black text-base flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-950">
                      {s.title}
                    </h4>
                    <p className="text-xs text-amber-950/80 mt-1 leading-relaxed font-medium">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-amber-600/50 flex flex-wrap items-center justify-between gap-3">
              <a
                href="tel:+918240828414"
                className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call Onboarding Desk</span>
              </a>
              <a
                href={`https://wa.me/918240828414?text=Hi%20BroomBoom,%20I%20want%20to%20attach%20my%20cab%20in%20${cityName}`}
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

      {/* Pilot Testimonials from Pune */}
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
            {[
              {
                name: "Sachin Deshmukh",
                location: "Wakad, Pune",
                vehicle: "Swift Dzire (Sedan)",
                earning: "₹62,000 / month",
                quote:
                  "Earlier with other aggregator apps, I used to get stuck returning empty from Mumbai. With BroomBoom, I get confirmed return passenger bookings back to Pune before I even cross the toll plaza. Daily payment directly to UPI is the best part!",
              },
              {
                name: "Rahul Jadhav",
                location: "Hadapsar, Pune",
                vehicle: "Maruti Ertiga (SUV)",
                earning: "₹78,000 / month",
                quote:
                  "I drive outstation trips to Shirdi, Mahabaleshwar, and Lonavala. BroomBoom charges very low commission compared to big platforms, and customer support talks in Marathi whenever I need road assistance.",
              },
              {
                name: "Santosh Patil",
                location: "PCMC, Pune",
                vehicle: "Fleet Owner (3 Cars)",
                earning: "₹1,85,000 / month total",
                quote:
                  "Attaching all my three commercial cars took just half an hour. Zero registration fees, on-time daily settlements, and steady corporate duty trips from Hinjawadi and Chakan MIDC keep all my cars busy.",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
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

      {/* Frequently Asked Questions */}
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
          {FAQS.map((faq, idx) => (
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

      {/* Bottom CTA Banner */}
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
              Zero registration fee. Attach your car in 15 minutes and take your
              first ride today with instant daily payout security.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+918240828414"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: +91 8240828414</span>
            </a>
            <a
              href={`https://wa.me/918240828414?text=Hi%20BroomBoom,%20I%20want%20to%20attach%20my%20cab%20in%20${cityName}`}
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
