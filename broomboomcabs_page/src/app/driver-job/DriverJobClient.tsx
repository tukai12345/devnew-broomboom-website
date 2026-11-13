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
        className="relative pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 bg-cover bg-center bg-no-repeat overflow-hidden border-b border-slate-900"
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
                  alt="Taxi Driver Job BroomBoomCabs"
                  width={600}
                  height={380}
                  className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 order-2">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-tight mb-5">
                <span className="text-amber-500">TAXI DRIVER JOB-</span>
                <span className="text-slate-900">BroomBoomCabs</span>
              </h2>
              <div className="border-l-4 border-amber-400 pl-4 sm:pl-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Be a full-time driver or a part time driver at your flexible time and hour of the day to earn huge earnings. BroomBoomCabs bring huge opportunities for the driver who needs driving jobs in India. Be it male driver or female driver, all get equal chance to drive in India at their own convenience at any hour of the day or night. More than thousands of riders request rides from BroomBoomCabs everyday, grab the chance and use your vehicle to earn as a driver in your city by dropping the riders wherever they want to go. There are so many ways to earn here. You can also earn by referring your other driver friends or driver partners to drive in India in BroomBoomCabs.
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
                  Invite friends and families by referring them to join the BroomBoomCabs Community in India. Share your refer code when they register in the BroomBoom Pilot App and earn when they complete a certain number of trips with BroomBoomCabs. Refer drivers (be it cab driver, taxi driver or bike-taxi driver) or your driver partners in the BroomBoom Pilot App and earn a huge reward!
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
                <span className="text-slate-900">BroomBoomCabs</span>
              </h2>
              <div className="border-l-4 border-amber-400 pl-4 sm:pl-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  BroomBoomCabs offer driver job alternatives in all major rural and urban areas of India, including Kolkata, Delhi, Chandigarh, Bangalore and many more of all sizes across the Country.If you are looking for driver jobs in India, &ldquo;install BroomBoom Pilot App&rdquo; from the play store and get paid to drive whenever you want from anywhere on this platform. This platform helps in connecting huge number of active riders 24/7 with full assistance and support. There are many traditional driving jobs in India but driving with BroomBoomCabs in India offers a flexible earning opportunity for all who are looking for full-time driver jobs, part-time driver jobs, or seasonal employment, or a rideshare driver who want to increase their monthly income by becoming a driver(pilot) using the BroomBoomCabs platform.
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
                  <span className="text-slate-900">BroomBoomCabs:</span>
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
                    <span>Choose the City where you will drive with BroomBoomCabs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Choose your Vehicle to register as a Pilot in BroomBoomCabs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>Submit your profile details and proper valid documents for registration as a driver with BroomBoomCabs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-900 font-bold shrink-0">•</span>
                    <span>After your document verification completes, you can go “on-duty” to ride and earn huge incentives and bonus.</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-slate-600 text-xs sm:text-sm max-w-3xl mx-auto pt-4 font-normal leading-relaxed">
              Follow the above said steps to register and drive with BroomBoomCabs and help your other driver friends by referring them with your referral code to register and earn huge incentives and bonus on this driving platform.
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
                  Drivers using BroomBoomCabs are independent contractors coming from all backgrounds and industries, to work independently by setting their own schedule with flexible driving hours and huge driver salary to make their life easy. You must meet certain requirements to drive with BroomBoom. We welcome drivers from any driving industry like commercial drivers, rideshare drivers and other drivers also who have been active on other driving apps and services.
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
              Driving with BroomBoomCabs is the best way to earn additional money for the drivers. Register and Join now to be a part of BroomBoom Drivers Community!
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