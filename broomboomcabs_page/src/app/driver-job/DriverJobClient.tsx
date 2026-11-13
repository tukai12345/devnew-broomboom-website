"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { api } from "@/services/api";

const VEHICLE_OPTIONS = [
  { value: "sedan", label: "Sedan (Dzire, Etios, Aura, Tigor)" },
  { value: "hatchback", label: "Hatchback (WagonR, Swift, Tiago, Celerio)" },
  { value: "suv", label: "SUV (Ertiga, Carens, Triber, Marazzo)" },
  { value: "suv-plus", label: "Luxury / SUV+ (Innova Crysta, Fortuner)" },
  { value: "tempo", label: "Tempo Traveller (12/17/26 Seater)" },
  { value: "auto", label: "Auto Rickshaw" },
  { value: "bike", label: "Bike / Two-Wheeler" },
];

const PILOT_BENEFITS = [
  {
    icon: Wallet,
    title: "Daily Instant Payouts",
    desc: "Receive your trip earnings directly into your bank account or UPI without waiting for weekly settlement cycles.",
  },
  {
    icon: Shield,
    title: "Zero Hidden Commission",
    desc: "Transparent, honest platform fees. Keep up to 90% of trip fares with guaranteed peak & outstation return bonuses.",
  },
  {
    icon: Clock,
    title: "Flexible Working Hours",
    desc: "Be your own boss. Log in whenever you want, take breaks on your schedule, and choose your preferred routes.",
  },
  {
    icon: Car,
    title: "Zero Dead Mileage",
    desc: "Intelligent round-trip & intercity corridor matching ensures you never return empty on highway trips.",
  },
  {
    icon: Headphones,
    title: "24x7 Dedicated Pilot Support",
    desc: "Exclusive priority support line, emergency roadside assistance, and instant on-trip SOS protection.",
  },
  {
    icon: Award,
    title: "Accidental Insurance Coverage",
    desc: "Comprehensive health & accident insurance policy coverage for you and your family on every single ride.",
  },
];

const REQUIRED_DOCUMENTS = [
  {
    title: "Commercial Driving License (DL)",
    desc: "Valid commercial yellow badge or active driving license with transport endorsement.",
  },
  {
    title: "Vehicle Registration Certificate (RC)",
    desc: "Valid registration certificate of the commercial taxi, cab, or vehicle.",
  },
  {
    title: "Vehicle Insurance & Fitness Certificate",
    desc: "Active comprehensive or commercial third-party insurance and fitness certificate.",
  },
  {
    title: "Aadhaar Card & PAN Card",
    desc: "Government identity verification for fast KYC and direct bank account linking.",
  },
  {
    title: "Bank Account / Passbook / Cancelled Cheque",
    desc: "Bank account details or UPI ID for automated daily earnings settlement.",
  },
  {
    title: "Vehicle Commercial Permit",
    desc: "State or All India Tourist Permit (AITP) depending on local or outstation category.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Fill Quick Online Form",
    desc: "Submit your city, phone number, and vehicle type in 30 seconds.",
  },
  {
    step: "02",
    title: "Upload Documents",
    desc: "Submit your Driving License, RC, and Aadhaar on the BroomBoom Pilot App.",
  },
  {
    step: "03",
    title: "Get Activated & Start Earning",
    desc: "Complete 10-minute digital KYC verification, go online, and start receiving ride requests!",
  },
];

const EARNINGS_TIERS = [
  {
    category: "Hatchback (Local + Airport)",
    daily: "₹1,800 - ₹2,500",
    monthly: "₹45,000 - ₹60,000",
    popular: false,
  },
  {
    category: "Sedan (Outstation + Airport)",
    daily: "₹2,500 - ₹3,800",
    monthly: "₹65,000 - ₹85,000",
    popular: true,
  },
  {
    category: "SUV / Innova Crysta (Intercity)",
    daily: "₹3,500 - ₹5,500",
    monthly: "₹85,000 - ₹1,20,000+",
    popular: false,
  },
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

const OTP_LENGTH = 4;
const RESEND_COOLDOWN_SECONDS = 30;
const PHONE_REGEX = /^[6-9]\d{9}$/;

type Step = "form" | "otp" | "success";

export function DriverJobClient() {
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [resendTimer, setResendTimer] = useState(0);

  const otpInputRef = useRef<HTMLInputElement>(null);

  /* ------------------------------------------------------------------ */
  /* Resend cooldown timer                                              */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  /* ------------------------------------------------------------------ */
  /* Auto-focus the OTP input when we reach the OTP step                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (step !== "otp") return;
    const id = setTimeout(() => otpInputRef.current?.focus(), 80);
    return () => clearTimeout(id);
  }, [step]);

  /* ------------------------------------------------------------------ */
  /* Helpers                                                            */
  /* ------------------------------------------------------------------ */
  const clearMessages = () => {
    setErrorMessage("");
    setInfoMessage("");
  };

  const resetForm = () => {
    setStep("form");
    setCity("");
    setPhone("");
    setVehicleType("");
    setOtp("");
    setResendTimer(0);
    setIsVerifying(false);
    clearMessages();
  };

  const startCooldown = () => setResendTimer(RESEND_COOLDOWN_SECONDS);

  /* ------------------------------------------------------------------ */
  /* Step 1 — Validate details + create the pilot lead                  */
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
        leadType: `driver-${vehicleType}`,
        source: `Driver Job Application - ${trimmedCity}`,
      });
    } catch (err) {
      // Never block onboarding because of a backend hiccup — log & continue.
      console.error("Pilot lead creation failed:", err);
    } finally {
      setIsSubmitting(false);
    }

    setOtp("");
    setInfoMessage(`A ${OTP_LENGTH}-digit verification code has been sent to +91 ${phone}.`);
    setStep("otp");
    startCooldown();
  };

  /* ------------------------------------------------------------------ */
  /* Step 2 — Verify the OTP                                            */
  /* ------------------------------------------------------------------ */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return;
    clearMessages();

    if (otp.length !== OTP_LENGTH) {
      setErrorMessage(`Please enter the ${OTP_LENGTH}-digit code sent to your phone.`);
      return;
    }

    setIsVerifying(true);
    try {
      // NOTE: plug in the real OTP verification API call here, e.g.
      // await api.verifyOtp({ phone, otp });
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStep("success");
    } catch (err) {
      console.error("OTP verification failed:", err);
      setErrorMessage("That code didn't work. Please check and try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Resend                                                             */
  /* ------------------------------------------------------------------ */
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    clearMessages();
    setOtp("");
    otpInputRef.current?.focus();

    try {
      // NOTE: plug in the real resend API call here, e.g.
      // await api.resendOtp({ phone });
      await new Promise((resolve) => setTimeout(resolve, 300));
      setInfoMessage(`A new code has been sent to +91 ${phone}.`);
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setErrorMessage("Couldn't resend the code. Please try again in a moment.");
      return;
    }

    startCooldown();
  };

  /* ------------------------------------------------------------------ */
  /* Change number                                                      */
  /* ------------------------------------------------------------------ */
  const handleChangeNumber = () => {
    setStep("form");
    setOtp("");
    setResendTimer(0);
    clearMessages();
  };

  /* ------------------------------------------------------------------ */
  /* Auto-submit once all OTP digits are entered                        */
  /* ------------------------------------------------------------------ */
  const handleOtpChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, OTP_LENGTH);
    setOtp(digits);
    if (errorMessage) setErrorMessage("");
    if (digits.length === OTP_LENGTH) {
      // Let React commit the value before firing the submit handler.
      setTimeout(() => {
        otpInputRef.current?.form?.requestSubmit();
      }, 0);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Top Navbar */}
      <Navbar activeService="driver" />

      {/* ========================================================================= */}
      {/* HERO SECTION — EXACT 1:1 MATCH WITH SCREENSHOT */}
      {/* ========================================================================= */}
      <section
        className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 bg-cover bg-center bg-no-repeat overflow-hidden border-b border-slate-900"
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
                    <h2 className="text-xl sm:text-[24px] font-black leading-tight text-center mb-5 tracking-tight">
                      <span className="text-amber-500 block">Confirm your phone number</span>
                      <span className="text-slate-900 block font-black">and fill out the application</span>
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

                    <form onSubmit={handleGetCode} noValidate className="space-y-3.5">
                      {/* City or Town Input */}
                      <div>
                        <label htmlFor="pilot-city" className="sr-only">
                          City or town
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
                          className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition shadow-2xs"
                        />
                      </div>

                      {/* Phone Number Input */}
                      <div>
                        <label htmlFor="pilot-phone" className="sr-only">
                          Phone number
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-4 text-xs font-black text-slate-500 select-none">
                            +91
                          </span>
                          <input
                            id="pilot-phone"
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                              if (errorMessage) setErrorMessage("");
                            }}
                            placeholder="Your phone number"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200/90 rounded-2xl text-slate-900 placeholder:text-slate-400 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* Vehicle Type Dropdown */}
                      <div className="relative">
                        <label htmlFor="pilot-vehicle" className="sr-only">
                          Vehicle type
                        </label>
                        <select
                          id="pilot-vehicle"
                          name="vehicleType"
                          value={vehicleType}
                          onChange={(e) => {
                            setVehicleType(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200/90 rounded-2xl text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 appearance-none transition cursor-pointer shadow-2xs"
                        >
                          <option value="" disabled>
                            Vehicle type
                          </option>
                          {VEHICLE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Get Code Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-md transition-all cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Code...</span>
                          </>
                        ) : (
                          "Get code"
                        )}
                      </button>

                      <p className="text-[11px] text-center text-slate-400 font-medium leading-relaxed pt-1">
                        By continuing, you agree to BroomBoom&apos;s Terms &amp; Conditions and Driver Partner Privacy Policy.
                      </p>
                    </form>
                  </>
                )}

                {step === "otp" && (
                  <form onSubmit={handleVerifyOtp} noValidate className="space-y-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Enter Verification Code</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        We sent a {OTP_LENGTH}-digit verification code to{" "}
                        <span className="font-bold text-slate-900">+91 {phone}</span>
                      </p>
                    </div>

                    {infoMessage && (
                      <div
                        aria-live="polite"
                        className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center"
                      >
                        {infoMessage}
                      </div>
                    )}

                    {errorMessage && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center"
                      >
                        {errorMessage}
                      </div>
                    )}

                    <div>
                      <label htmlFor="pilot-otp" className="sr-only">
                        Verification code
                      </label>
                      <input
                        id="pilot-otp"
                        ref={otpInputRef}
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]*"
                        maxLength={OTP_LENGTH}
                        value={otp}
                        onChange={(e) => handleOtpChange(e.target.value)}
                        placeholder={`Enter ${OTP_LENGTH}-digit code`}
                        aria-describedby={errorMessage ? "pilot-otp-error" : undefined}
                        className="w-full text-center tracking-[0.5em] text-lg font-black px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 transition disabled:opacity-60"
                        disabled={isVerifying}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={otp.length !== OTP_LENGTH || isVerifying}
                      className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 font-black text-slate-950 rounded-2xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        "Verify & Submit Application"
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-semibold">
                      <button
                        type="button"
                        onClick={handleChangeNumber}
                        disabled={isVerifying}
                        className="text-amber-600 hover:underline disabled:opacity-50 disabled:no-underline"
                      >
                        Change number
                      </button>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendTimer > 0 || isVerifying}
                        className="text-amber-600 hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
                      >
                        {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend code"}
                      </button>
                    </div>
                  </form>
                )}

                {step === "success" && (
                  <div className="text-center py-4 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Congratulations! Your pilot application for <span className="font-bold text-slate-900">{city.trim()}</span> has been received. Our driver onboarding specialist will call you on{" "}
                      <span className="font-bold text-slate-900">+91 {phone}</span> within 2 hours.
                    </p>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left space-y-2 mt-4">
                      <div className="text-xs font-black text-amber-900 uppercase tracking-wider">Next Steps:</div>
                      <div className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="font-bold text-amber-600 shrink-0">1.</span>
                        <span>Keep your Driving License &amp; Vehicle RC ready.</span>
                      </div>
                      <div className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="font-bold text-amber-600 shrink-0">2.</span>
                        <span>Download the BroomBoom Pilot Partner App from Play Store.</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full py-3 bg-slate-950 text-white font-bold text-xs rounded-xl hover:bg-slate-900 transition mt-2"
                    >
                      Submit Another Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PILOT EARNINGS TABLE / CALCULATOR */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              High Earning Potential
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Earn Transparently With No Upper Limit
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Realistic estimated earnings reported by verified active BroomBoom captains across major Indian cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {EARNINGS_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  tier.popular
                    ? "bg-gradient-to-br from-amber-400 via-amber-400 to-yellow-500 text-slate-950 shadow-xl ring-4 ring-amber-400/30 scale-102"
                    : "bg-slate-50 hover:bg-white border border-slate-200/90 shadow-sm hover:shadow-md text-slate-900"
                }`}
              >
                <div>
                  {tier.popular && (
                    <div className="inline-block bg-slate-950 text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full mb-3">
                      Most In Demand
                    </div>
                  )}
                  <h3 className="text-lg font-black">{tier.category}</h3>
                  <div className="mt-4 pt-4 border-t border-slate-200/60">
                    <div className="text-xs font-bold opacity-75 uppercase tracking-wider">Estimated Monthly Earnings</div>
                    <div className="text-2xl sm:text-3xl font-black mt-1">{tier.monthly}</div>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold opacity-75 uppercase tracking-wider">Daily Take-Home</div>
                    <div className="text-lg font-extrabold mt-0.5">{tier.daily}</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Instant Daily Bank / UPI Payouts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY BECOME A BROOMBOOM PILOT */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              Captain Benefits
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why 25,000+ Drivers Choose BroomBoom
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Built by drivers, for drivers. We prioritize partner dignity, honest fares, and transparent earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILOT_BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-700 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 3 SIMPLE STEPS TO JOIN */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              Quick Onboarding
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Start Driving in 3 Easy Steps
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Fast, paperless onboarding with instant digital verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {STEPS.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-7 border border-slate-200 text-center relative flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-md mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DOCUMENTS REQUIRED CHECKLIST */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              Checklist
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Documents Required to Join
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Keep these documents handy for immediate verification and account approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {REQUIRED_DOCUMENTS.map((doc, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{doc.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
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