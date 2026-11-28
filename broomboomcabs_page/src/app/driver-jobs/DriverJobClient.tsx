"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  CheckCircle2,
  Shield,
  Clock,
  Wallet,
  Car,
  Headphones,
  Award,
  FileText,
  Smartphone,
  PhoneCall,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Star,
  Users,
  Loader2,
  ThumbsUp,
  UserCheck,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { api } from "@/services/api";

const VEHICLE_OPTIONS = [
  { value: "sedan-4", label: "4 Seater" },
  { value: "suv-6", label: "6 Seater" },
  { value: "suv-plus-7", label: "7 Seater" },
  { value: "cab-10", label: "10 Seater" },
  { value: "tempo-13", label: "13 Seater" },
  { value: "tempo-15", label: "15 Seater" },
  { value: "tempo-24", label: "24 Seater" },
];

const FAQS = [
  {
    q: "Who is eligible to become a BroomBoom pilot?",
    a: "Any commercial driver holding a valid commercial driving license, aged 21 years or older, with a registered commercial vehicle (or wishing to attach to a fleet) is eligible.",
  },
  {
    q: "How soon will my account be activated after submitting the application?",
    a: "Once you submit your application and upload your documents, our partner onboarding team verifies your KYC within 2 to 4 business hours.",
  },
  {
    q: "How and when do I get paid?",
    a: "Earnings are credited instantly or daily directly into your linked bank account or UPI ID. Cash payments from customers belong to you immediately.",
  },
  {
    q: "Can I choose between outstation trips and local city rides?",
    a: "Yes! As a BroomBoom pilot, you have full freedom to accept one-way outstation trips, airport transfers, round-trips, or local hourly rentals based on your preference.",
  },
  {
    q: "Do I have to pay any upfront registration fee?",
    a: "No! Driver registration and onboarding on BroomBoom are completely free of charge. There are zero hidden registration fees.",
  },
];

const PHONE_REGEX = /^[6-9]\d{9}$/;

type Step = "form" | "thankyou";

interface DriverJobClientProps {
  initialCity?: string;
}

export function DriverJobClient({ initialCity = "" }: DriverJobClientProps) {
  const formattedCity = initialCity
    ? initialCity.charAt(0).toUpperCase() + initialCity.slice(1)
    : "";

  const [city, setCity] = useState(formattedCity);
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedVehicleLabel =
    VEHICLE_OPTIONS.find((opt) => opt.value === vehicleType)?.label || "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVehicleDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVehicleDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /* Helpers                                                            */
  /* ------------------------------------------------------------------ */
  const clearMessages = () => {
    setErrorMessage("");
  };

  const resetForm = () => {
    setStep("form");
    setCity(formattedCity);
    setPhone("");
    setVehicleType("");
    setIsVehicleDropdownOpen(false);
    clearMessages();
  };

  /* ------------------------------------------------------------------ */
  /* Step 1 — Validate details + submit application                     */
  /* ------------------------------------------------------------------ */
  const handleGetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    clearMessages();

    const trimmedCity = city.trim();

    if (trimmedCity.length < 2) {
      setErrorMessage("Please enter your city or town.");
      return;
    }
    if (!PHONE_REGEX.test(phone)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!vehicleType) {
      setErrorMessage("Please select your vehicle type.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createUser({
        name: `Pilot Applicant (${trimmedCity})`,
        phone,
        city: trimmedCity,
        vehicleType: vehicleType,
        leadType: `driver-${vehicleType}`,
        source: `Driver Job Application - ${trimmedCity}`,
        lastLoginAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Pilot lead creation failed:", err);
    } finally {
      setIsSubmitting(false);
      setStep("thankyou");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Top Navbar */}
      <Navbar activeService="driver" />

      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section
        className="relative pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 bg-cover bg-center bg-no-repeat overflow-visible border-b border-slate-900"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.72), rgba(10, 16, 26, 0.88)), url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Column: Heading */}
            <div className="lg:col-span-7 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>BroomBoom Pilot Partner Program</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight leading-[1.08]">
                <span className="text-amber-400 block">Become a</span>
                <span className="text-amber-400 block">broomboom</span>
                <span className="text-amber-400 block">pilot on your</span>
                <span className="text-white block">own terms</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed pt-2">
                Join India&apos;s fastest growing verified cab network. Enjoy daily direct bank payouts, zero dead-mileage on highway trips, and full flexibility to drive when you want.
              </p>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-white">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>25,000+ Active Pilots</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>4.9 / 5 Captain Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Free Accidental Cover</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Application Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full border border-slate-100 transition-all">
                {step === "form" && (
                  <>
                    <h2 className="text-2xl sm:text-[26px] font-black leading-tight text-center mb-6 tracking-tight">
                      <span className="text-[#FFC700] block">Confirm your phone number</span>
                      <span className="text-[#FFC700]">and fill out </span>
                      <span className="text-slate-950 font-black">the application</span>
                    </h2>

                    {errorMessage && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center"
                      >
                        {errorMessage}
                      </div>
                    )}

                    <form onSubmit={handleGetCode} noValidate className="space-y-4">
                      {/* City or Town Input */}
                      <div>
                        <label htmlFor="pilot-city" className="sr-only">
                          Your city or town
                        </label>
                        <input
                          id="pilot-city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          placeholder="Your city or town"
                          className="w-full px-5 py-4 bg-[#f3f4f6] text-slate-800 placeholder:text-slate-400 font-medium text-sm sm:text-base rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-[#FFC700] transition"
                        />
                      </div>

                      {/* Phone Number Input */}
                      <div>
                        <label htmlFor="pilot-phone" className="sr-only">
                          Your phone number
                        </label>
                        <input
                          id="pilot-phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                            if (errorMessage) setErrorMessage("");
                          }}
                          placeholder="Your phone number"
                          className="w-full px-5 py-4 bg-[#f3f4f6] text-slate-800 placeholder:text-slate-400 font-medium text-sm sm:text-base rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-[#FFC700] transition"
                        />
                      </div>

                      {/* Vehicle Type Dropdown (Opens Strictly Top-to-Bottom) */}
                      <div className="relative" ref={dropdownRef}>
                        <label id="pilot-vehicle-label" className="sr-only">
                          Vehicle type
                        </label>
                        <button
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded={isVehicleDropdownOpen}
                          aria-labelledby="pilot-vehicle-label"
                          onClick={() => setIsVehicleDropdownOpen((prev) => !prev)}
                          className={`w-full px-5 py-4 bg-[#f3f4f6] font-medium text-sm sm:text-base rounded-2xl border-0 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#FFC700] transition cursor-pointer ${
                            isVehicleDropdownOpen ? "ring-2 ring-[#FFC700]" : ""
                          } ${selectedVehicleLabel ? "text-slate-800" : "text-slate-400"}`}
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
                            aria-labelledby="pilot-vehicle-label"
                            className="absolute left-0 right-0 top-full mt-1 z-50 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 max-h-64 overflow-y-auto origin-top"
                          >
                            {VEHICLE_OPTIONS.map((opt) => {
                              const isSelected = vehicleType === opt.value;
                              return (
                                <li key={opt.value} role="option" aria-selected={isSelected}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setVehicleType(opt.value);
                                      setIsVehicleDropdownOpen(false);
                                      if (errorMessage) setErrorMessage("");
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

                      {/* Submit Button */}
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
                        Your application has been received successfully. Our driver onboarding specialist will connect with you shortly.
                      </p>
                    </div>
                    
                    {/* Install Text and Google Play Store Button */}
                    <div className="pt-5 pb-2 flex flex-col items-center justify-center gap-3">
                      <p className="text-sm font-bold text-slate-800">
                        Install App
                      </p>
                      <a 
                        href="https://play.google.com/store/apps/details?id=com.broomboom.pilot" 
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

      {/* ========================================================================= */}
      {/* 2. TAXI DRIVER JOB - BROOMBOOM CABS EDITORIAL & GUIDE (EXACT LIVE LAYOUT) */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

          {/* ROW 1: Left Image, Right Content (TAXI DRIVER JOB) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-1">
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm bg-slate-100">
                <Image
                  src="/images/driver-job/refer-drivers.jpg"
                  alt="Taxi Driver Job BroomBoom Cabs"
                  width={600}
                  height={380}
                  className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 order-2">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-tight mb-5">
                <span className="text-amber-500">TAXI DRIVER JOB-</span>
                <span className="text-slate-900">BroomBoom Cabs</span>
              </h2>
              <div className="border-l-4 border-amber-400 pl-4 sm:pl-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Be a full-time driver or a part time driver at your flexible time and hour of the day to earn huge earnings. BroomBoom Cabs bring huge opportunities for the driver who needs driving jobs in India. Be it male driver or female driver, all get equal chance to drive in India at their own convenience at any hour of the day or night. More than thousands of riders request rides from BroomBoom Cabs everyday, grab the chance and use your vehicle to earn as a driver in your city by dropping the riders wherever they want to go. There are so many ways to earn here. You can also earn by referring your other driver friends or driver partners to drive in India in BroomBoom Cabs.
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2: Left Content, Right Image (REFER DRIVERS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-tight mb-5">
                <span className="text-amber-500">REFER </span>
                <span className="text-slate-900">DRIVERS</span>
              </h2>
              <div className="border-l-4 border-amber-400 pl-4 sm:pl-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Invite friends and families by referring them to join the BroomBoom Cabs Community in India. Share your refer code when they register in the BroomBoom Pilot App and earn when they complete a certain number of trips with BroomBoom Cabs. Refer drivers (be it cab driver, taxi driver or bike-taxi driver) or your driver partners in the BroomBoom Pilot App and earn a huge reward!
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm bg-slate-100">
                <Image
                  src="/images/driver-job/driver-procedures.jpg"
                  alt="Refer Drivers to BroomBoom"
                  width={600}
                  height={380}
                  className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* ROW 3: Left Content, Right Image (Procedures to be a Taxi Driver) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-4xl lg:text-[38px] font-extrabold tracking-tight leading-tight mb-5">
                <span className="text-amber-500">Procedures to be a</span>
                <br />
                <span className="text-amber-500">Taxi Driver for </span>
                <span className="text-slate-900">BroomBoom Cabs</span>
              </h2>
              <div className="border-l-4 border-amber-400 pl-4 sm:pl-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  BroomBoom Cabs offer driver job alternatives in all major rural and urban areas of India, including Kolkata, Delhi, Chandigarh, Bangalore and many more of all sizes across the Country.If you are looking for driver jobs in India, &ldquo;install BroomBoom Pilot App&rdquo; from the play store and get paid to drive whenever you want from anywhere on this platform. This platform helps in connecting huge number of active riders 24/7 with full assistance and support. There are many traditional driving jobs in India but driving with BroomBoom Cabs in India offers a flexible earning opportunity for all who are looking for full-time driver jobs, part-time driver jobs, or seasonal employment, or a rideshare driver who want to increase their monthly income by becoming a driver(pilot) using the BroomBoom Cabs platform.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm bg-slate-100">
                <Image
                  src="/images/driver-job/driver-procedures.jpg"
                  alt="Taxi Driver Opportunities BroomBoom"
                  width={600}
                  height={380}
                  className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* ROW 4: Left Image, Right Content (6 Procedures Steps) */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-6 order-1">
                <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm bg-slate-100">
                  <Image
                    src="/images/driver-job/driver-why-choose.jpg"
                    alt="BroomBoom Pilot Procedures"
                    width={600}
                    height={380}
                    className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 order-2">
                <h2 className="text-2xl sm:text-4xl lg:text-[36px] font-extrabold tracking-tight leading-tight mb-5">
                  <span className="text-amber-500">There is very simple</span>
                  <br />
                  <span className="text-amber-500">procedure to be a</span>
                  <br />
                  <span className="text-amber-500">taxi driver in </span>
                  <span className="text-slate-900">BroomBoom Cabs:</span>
                </h2>
                <ul className="space-y-3 text-slate-700 text-xs sm:text-sm font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Install &quot;BroomBoom Pilot&quot; application from the google play store.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Sign up with your mobile number to complete the registration as a driver.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Choose the City where you will drive with BroomBoom Cabs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Choose your Vehicle to register as a Pilot in BroomBoom Cabs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Submit your profile details and proper valid documents for registration as a driver with BroomBoom Cabs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>After your document verification completes, you can go “on-duty” to ride and earn huge incentives and bonus.</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-slate-600 text-xs sm:text-sm max-w-3xl mx-auto pt-4 font-normal leading-relaxed">
              Follow the above said steps to register and drive with BroomBoom Cabs and help your other driver friends by referring them with your referral code to register and earn huge incentives and bonus on this driving platform.
            </p>
          </div>

          {/* ROW 5: Left Content, Right Image (How to apply for BroomBoom Driver Jobs) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-tight mb-5">
                <span className="text-amber-500">How to apply for</span>
                <br />
                <span className="text-amber-500">BroomBoom Driver </span>
                <span className="text-slate-900">Jobs</span>
              </h2>
              <div className="border-l-4 border-amber-400 pl-4 sm:pl-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Drivers using BroomBoom Cabs are independent contractors coming from all backgrounds and industries, to work independently by setting their own schedule with flexible driving hours and huge driver salary to make their life easy. You must meet certain requirements to drive with BroomBoom. We welcome drivers from any driving industry like commercial drivers, rideshare drivers and other drivers also who have been active on other driving apps and services.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm bg-slate-100">
                <Image
                  src="/images/driver-job/driver-procedures.jpg"
                  alt="How to apply for BroomBoom Driver Jobs"
                  width={600}
                  height={380}
                  className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* ROW 6: Left Image, Right Content (Documents required) */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-6 order-1">
                <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm bg-slate-100">
                  <Image
                    src="/images/driver-job/refer-drivers.jpg"
                    alt="Documents required to apply for BroomBoom Driver Jobs"
                    width={600}
                    height={380}
                    className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 order-2">
                <h2 className="text-2xl sm:text-4xl lg:text-[36px] font-extrabold tracking-tight leading-tight mb-5">
                  <span className="text-amber-500">Documents</span>
                  <br />
                  <span className="text-amber-500">required to apply</span>
                  <br />
                  <span className="text-amber-500">for BroomBoom </span>
                  <span className="text-slate-900">Driver Jobs:</span>
                </h2>
                <ul className="space-y-3 text-slate-700 text-xs sm:text-sm font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Driver profile photo must be forward facing, clear image.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Current address proof (Aadhar card, Voters ID, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>PAN Card and bank passbook/cancelled cheque for direct deposit</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Driving License must be unexpired commercial driving license and the driver&apos;s age must be at least 19 years old.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Vehicle Documents like Certificate of Registration, Vehicle Permit/ TR7 form, Vehicle Insurance. If Registration is in another&apos;s name, then NOC/Affidavit is required, Fitness Certificate.</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-slate-700 text-xs sm:text-sm max-w-3xl mx-auto pt-4 font-semibold leading-relaxed">
              Driving with BroomBoom Cabs is the best way to earn additional money for the drivers. Register and Join now to be a part of BroomBoom Drivers Community!
            </p>
          </div>

          {/* SECTION 7: WHY DRIVERS CHOOSE US */}
          <div className="pt-8 sm:pt-12">
            <h2 className="text-3xl sm:text-5xl font-black text-center mb-10 sm:mb-14">
              <span className="text-amber-500">Why drivers </span>
              <span className="text-slate-900">choose us?</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Card 1: Profitable rides */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-14 h-14 rounded-full border border-amber-400 flex items-center justify-center text-amber-500 mb-5 bg-white">
                  <ThumbsUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Profitable rides</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  Avail economical rides at the biggest deals.
                </p>
              </div>

              {/* Card 2: Where and when you want */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-14 h-14 rounded-full border border-amber-400 flex items-center justify-center text-amber-500 mb-5 bg-white">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Where and when you want</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  Full safe rides with Audio-Video Surveillance and instant emergency support.
                </p>
              </div>

              {/* Card 3: We are always here for you */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-14 h-14 rounded-full border border-amber-400 flex items-center justify-center text-amber-500 mb-5 bg-white">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">We are always here for you</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  Pre-schedule your ride in advance for your trip with us.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQS ACCORDION */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              Have Questions?
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions for Pilots
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-amber-700"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. APP DOWNLOAD / CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-12 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl p-6 sm:p-10 text-slate-950 shadow-xl">
            <div className="max-w-xl">
              <div className="inline-block bg-slate-950 text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full mb-2">
                Download Pilot Partner App
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Ready to Boost Your Daily Earnings?
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-2">
                Download the BroomBoom Pilot App, upload your documents, and start accepting trips today.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:+918240765499"
                className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call Onboarding Desk</span>
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <span>Apply Online Above</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}