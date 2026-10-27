"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { setStoredUser } from "@/utils/auth";
import {
  X,
  Car,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Building2,
  User as UserIcon,
  Mail,
  Coins,
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: {
    identifier: string;
    role: string;
    name?: string;
    phone?: string;
    email?: string;
  }) => void;
  initialMessage?: string;
}

interface CountryCodeOption {
  code: string;
  country: string;
  flag: string;
  iso: string;
}

const COUNTRY_CODES: CountryCodeOption[] = [
  { code: "+91", country: "India", flag: "🇮🇳", iso: "IN" },
  { code: "+1", country: "United States", flag: "🇺🇸", iso: "US" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", iso: "GB" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪", iso: "AE" },
  { code: "+1", country: "Canada", flag: "🇨🇦", iso: "CA" },
  { code: "+61", country: "Australia", flag: "🇦🇺", iso: "AU" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", iso: "SG" },
  { code: "+49", country: "Germany", flag: "🇩🇪", iso: "DE" },
  { code: "+33", country: "France", flag: "🇫🇷", iso: "FR" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", iso: "SA" },
  { code: "+974", country: "Qatar", flag: "🇶🇦", iso: "QA" },
  { code: "+968", country: "Oman", flag: "🇴🇲", iso: "OM" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼", iso: "KW" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭", iso: "BH" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", iso: "MY" },
  { code: "+66", country: "Thailand", flag: "🇹🇭", iso: "TH" },
  { code: "+81", country: "Japan", flag: "🇯🇵", iso: "JP" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿", iso: "NZ" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", iso: "NL" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", iso: "CH" },
  { code: "+39", country: "Italy", flag: "🇮🇹", iso: "IT" },
  { code: "+34", country: "Spain", flag: "🇪🇸", iso: "ES" },
  { code: "+46", country: "Sweden", flag: "🇸🇪", iso: "SE" },
  { code: "+353", country: "Ireland", flag: "🇮🇪", iso: "IE" },
  { code: "+27", country: "South Africa", flag: "🇿🇦", iso: "ZA" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩", iso: "BD" },
  { code: "+977", country: "Nepal", flag: "🇳🇵", iso: "NP" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰", iso: "LK" },
  { code: "+975", country: "Bhutan", flag: "🇧🇹", iso: "BT" },
];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMessage,
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeOption>(COUNTRY_CODES[0]); // Default +91 India
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Slide carousel data for left panel
  const slides = [
    {
      title: "Sign up now to get",
      features: [
        {
          icon: <Car className="w-5 h-5 text-amber-400" />,
          title: "Get FLAT 10% OFF*",
          desc: "on Hourly Rentals",
        },
        {
          icon: <Clock className="w-5 h-5 text-amber-400" />,
          title: "Choose flexible packages",
          desc: "on for work or leisure",
        },
        {
          icon: <Coins className="w-5 h-5 text-amber-400" />,
          title: "Pay 20% now,",
          desc: "pay the rest to the driver",
        },
      ],
    },
    {
      title: "Why Travel with BroomBoom",
      features: [
        {
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
          title: "100% Verified Chauffeurs",
          desc: "Police verified & background checked",
        },
        {
          icon: <Car className="w-5 h-5 text-emerald-400" />,
          title: "Zero Surge Guarantee",
          desc: "Same transparent rates 24 hours a day",
        },
        {
          icon: <Clock className="w-5 h-5 text-emerald-400" />,
          title: "Free 45 Mins Airport Wait",
          desc: "Automated flight delay tracking",
        },
      ],
    },
    {
      title: "Member Exclusive Benefits",
      features: [
        {
          icon: <Coins className="w-5 h-5 text-yellow-400" />,
          title: "Earn BroomBoom Coins",
          desc: "Redeem on intercity & outstation rides",
        },
        {
          icon: <Building2 className="w-5 h-5 text-yellow-400" />,
          title: "Instant GST Tax Invoices",
          desc: "Automated business trip expensing",
        },
        {
          icon: <ShieldCheck className="w-5 h-5 text-yellow-400" />,
          title: "Priority 24x7 Support",
          desc: "Dedicated VIP chauffeur desk helpline",
        },
      ],
    },
  ];

  // Auto-rotate left slide every 5 seconds
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen, slides.length]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const isFormValid =
    fullName.trim().length >= 2 &&
    phoneNumber.trim().length >= 7 &&
    email.trim().includes("@") &&
    email.trim().includes(".");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    const fullPhone = `${selectedCountry.code} ${phoneNumber.trim()}`;
    const cleanPhone = `${selectedCountry.code}${phoneNumber.trim()}`.replace(/\s+/g, "");

    let backendId = "";
    try {
      // Connect to BroomBoom User Backend
      const backendUser = await api.createUser({
        name: fullName.trim() || `User ${phoneNumber.slice(-4)}`,
        phone: cleanPhone,
        email: email.trim(),
        status: "Active",
        leadType: "New",
      });
      backendId = backendUser.id || backendUser._id || "";
    } catch (err) {
      console.warn("Backend user sync notice:", err);
    }

    const loggedUser = {
      id: backendId,
      identifier: fullPhone,
      role: "user",
      name: fullName.trim() || `User ${phoneNumber.slice(-4)}`,
      phone: fullPhone,
      email: email.trim(),
    };

    // Save to session-scoped auth storage (auto logout when user leaves the website)
    setStoredUser(loggedUser);

    if (onSuccess) {
      onSuccess(loggedUser);
    }
    setIsSubmitting(false);
    onClose();
    router.push("/fleet");
  };

  if (!isOpen || !mounted) return null;

  const activeSlideData = slides[currentSlide];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[840px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200 my-auto flex flex-col md:flex-row min-h-[540px] max-h-[95vh]"
      >
        {/* ======================================================== */}
        {/* LEFT PANEL: PROMOTIONAL BANNER & CAR KEY IMAGE (40% width) */}
        {/* ======================================================== */}
        <div className="relative md:w-[40%] bg-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden shrink-0">
          {/* Background Hand Over Car Key Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80')",
            }}
          />
          {/* Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60" />

          {/* Top Brand Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-amber-400 p-0.5 flex items-center justify-center shadow-sm shrink-0">
                <img
                  src="/logo.png"
                  alt="BroomBoom Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="font-black text-lg text-white">
                broom<span className="text-amber-400">boom</span>
              </span>
            </div>

            {/* Slide Title */}
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-6">
              {activeSlideData.title}
            </h3>

            {/* Benefit Features List */}
            <div className="space-y-5">
              {activeSlideData.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-center shrink-0 shadow-xs">
                    {feat.icon}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-white leading-snug">
                      {feat.title}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5 font-normal">
                      {feat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Carousel Navigation Dots (< • • • >) */}
          <div className="relative z-10 pt-6 flex items-center justify-center gap-3 text-slate-400">
            <button
              type="button"
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
              }
              className="p-1 hover:text-white transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === i ? "w-6 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-1 hover:text-white transition"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: LOGIN / REGISTRATION FORM (60% width) */}
        {/* ======================================================== */}
        <div className="relative flex-1 p-6 sm:p-8 md:p-9 flex flex-col justify-between bg-white overflow-y-auto">
          {/* Close Button on Top Right */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition active:scale-95 cursor-pointer z-20"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div>
            {/* Notification/Trigger alert banner if triggered from search */}
            {initialMessage && (
              <div className="mb-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>{initialMessage}</span>
              </div>
            )}

            {/* Header */}
            <div className="mb-6 pr-8 flex items-start gap-3">
              <div className="lg:hidden w-10 h-10 rounded-full overflow-hidden bg-amber-400 p-0.5 shrink-0 shadow-sm">
                <img
                  src="/logo.png"
                  alt="BroomBoom Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h2
                  id="login-modal-title"
                  className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
                >
                  Login or Sign Up
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your contact details to access fares, cabs & discounts
                </p>
              </div>
            </div>

            {/* Contact Details Form (Direct Login / Registration without OTP) */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Full Name Field */}
              <div>
                <label
                  htmlFor="login-fullname"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="login-fullname"
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm font-medium outline-none transition placeholder:text-slate-400"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* 2. Phone Number with Country Code Dropdown */}
              <div>
                <label
                  htmlFor="login-phone"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-xl border border-slate-300 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 transition bg-white overflow-hidden shadow-2xs">
                  {/* Country Code Picker Dropdown */}
                  <div className="relative flex items-center bg-slate-50 border-r border-slate-200 px-3 cursor-pointer hover:bg-slate-100 shrink-0 transition">
                    <span className="text-lg mr-1.5">{selectedCountry.flag}</span>
                    <span className="text-xs font-black text-slate-800 tracking-tight">
                      {selectedCountry.code}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1.5 pointer-events-none" />
                    <select
                      aria-label="Select Country Code"
                      value={`${selectedCountry.iso}_${selectedCountry.code}`}
                      onChange={(e) => {
                        const [iso, code] = e.target.value.split("_");
                        const found = COUNTRY_CODES.find(
                          (c) => c.iso === iso && c.code === code
                        );
                        if (found) setSelectedCountry(found);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    >
                      {COUNTRY_CODES.map((c, i) => (
                        <option
                          key={`${c.iso}-${c.code}-${i}`}
                          value={`${c.iso}_${c.code}`}
                        >
                          {c.flag} {c.country} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Input */}
                  <input
                    id="login-phone"
                    type="tel"
                    placeholder={
                      selectedCountry.code === "+91"
                        ? "Enter 10-digit mobile number"
                        : "Enter phone number"
                    }
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    maxLength={selectedCountry.code === "+91" ? 10 : 15}
                    className="flex-1 px-3.5 py-3 text-sm font-medium outline-none bg-transparent placeholder:text-slate-400"
                    required
                  />
                </div>
                {selectedCountry.code === "+91" ? (
                  <p className="text-[11px] text-slate-400 mt-1">
                    🇮🇳 India selected as default (+91). Click flag to change country.
                  </p>
                ) : (
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">
                    {selectedCountry.flag} International code {selectedCountry.code} ({selectedCountry.country}) selected.
                  </p>
                )}
              </div>

              {/* 3. Email Address Field */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm font-medium outline-none transition placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Direct Login Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3.5 rounded-xl font-black text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2 ${
                  isFormValid
                    ? "bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-[0.99] cursor-pointer shadow-md shadow-amber-400/20 border border-amber-300"
                    : "bg-[#94a3b8] text-white/90 cursor-not-allowed opacity-90"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </span>
                ) : (
                  <span>Login / Sign Up</span>
                )}
              </button>
            </form>

            {/* App Store & Google Play Badges Row */}
            <div className="grid grid-cols-2 gap-3 pt-6">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=com.broomboom.customer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white flex items-center justify-center gap-2 transition active:scale-95 shadow-2xs group"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M3.609 1.814L13.792 12 3.61 22.186a2.036 2.036 0 0 1-.61-.956V2.77c0-.36.147-.706.61-.956z"
                    fill="#4285F4"
                  />
                  <path
                    d="M14.909 13.117l2.25 2.25-11.45 6.55 9.2-8.8z"
                    fill="#EA4335"
                  />
                  <path
                    d="M14.909 10.883l-9.2-8.8 11.45 6.55-2.25 2.25z"
                    fill="#34A853"
                  />
                  <path
                    d="M16.026 12l2.844-1.625a1.8 1.8 0 0 1 0 3.25L16.026 12z"
                    fill="#FBBC05"
                  />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                    GET IT ON
                  </div>
                  <div className="text-xs font-black text-slate-900 mt-0.5">Google Play</div>
                </div>
              </a>

              {/* Apple App Store */}
              <a
                href="https://apps.apple.com/app/broomboom-cabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white flex items-center justify-center gap-2 transition active:scale-95 shadow-2xs group"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.03-.5 2.63-1.23z"
                    fill="#0f172a"
                  />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                    Download on the
                  </div>
                  <div className="text-xs font-black text-slate-900 mt-0.5">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom Legal Agreement */}
          <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-500 text-center leading-relaxed">
            By proceeding, you agree to BroomBoom&apos;s{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Privacy Policy
            </a>
            ,{" "}
            <a href="#" className="text-amber-600 hover:underline">
              User Agreement
            </a>{" "}
            and{" "}
            <a href="#" className="text-amber-600 hover:underline">
              T&Cs
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

