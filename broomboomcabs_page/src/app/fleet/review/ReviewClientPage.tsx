"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Shield,
  Check,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  User as UserIcon,
  CheckCircle2,
  Car,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { api } from "@/services/api";
import { triggerCashfreePayment } from "@/utils/cashfree";
import { getStoredUser } from "@/utils/auth";
import { CITIES } from "@/data/cabsData";

export const ReviewClientPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  /* -------------------------- Query Parameters -------------------------- */
  const cabName = searchParams.get("cabName") || "WagonR, Swift";
  const modelType = searchParams.get("modelType") || "or similar";
  const modelBadgeText = searchParams.get("modelBadgeText") || "NEW";
  const cabCategory = (searchParams.get("cabCategory") || "Hatchback").toUpperCase();
  const cabFuel = searchParams.get("cabFuel") || "CNG/Diesel";
  const cabSeats = searchParams.get("cabSeats") || "4";
  const tripType = searchParams.get("tripType") || "Outstation Round-Trip";
  const fromCity = searchParams.get("from") || "Mumbai";
  const toCity = searchParams.get("to") || "Delhi";
  const pickupDate = searchParams.get("pickupDate") || "2026-10-25";
  const dropDate = searchParams.get("dropDate") || "2026-10-27";
  const pickupDateDisplay = searchParams.get("pickupDateDisplay") || pickupDate;
  const dropDateDisplay = searchParams.get("dropDateDisplay") || dropDate;
  const pickupTime = searchParams.get("pickupTime") || "11:00 AM";
  const dropTime = searchParams.get("dropTime") || "till 09:45 PM";
  const baseFareParam = parseInt(
    searchParams.get("baseFare") || searchParams.get("discountedPrice") || "0",
    10
  );
  const advanceParam = parseInt(searchParams.get("advance") || "0", 10);
  const dueFareParam = parseInt(searchParams.get("dueFare") || "0", 10);
  const distanceParam = parseFloat(searchParams.get("distance") || "0");
  const oneWayDistanceParam = parseFloat(searchParams.get("oneWayDistance") || "0");
  const includedKmsParam = parseInt(searchParams.get("includedKms") || "0", 10);
  const imageType = searchParams.get("imageType") || "hatchback";
  const extraKmRate = searchParams.get("extraKmRate") || "15";

  const [liveBaseFare, setLiveBaseFare] = useState<number>(baseFareParam || 2499);
  const [liveAdvance, setLiveAdvance] = useState<number>(advanceParam || 0);
  const [liveDueFare, setLiveDueFare] = useState<number>(dueFareParam || 0);
  const [liveKms, setLiveKms] = useState<number>(includedKmsParam || 150);

  useEffect(() => {
    if (baseFareParam > 0) {
      setLiveBaseFare(baseFareParam);
      if (advanceParam > 0) setLiveAdvance(advanceParam);
      if (dueFareParam > 0) setLiveDueFare(dueFareParam);
      if (includedKmsParam > 0) setLiveKms(includedKmsParam);
      return;
    }

    async function fetchLiveFare() {
      try {
        const tLower = tripType.toLowerCase();
        const isRound = tLower.includes("round");
        const isRental = tLower.includes("hourly") || tLower.includes("rental");
        const isAirport = tLower.includes("airport");
        const rideTypeParam: "Oneway" | "Roundtrip" | "Rental" | "Airport" =
          isRound ? "Roundtrip" : isRental ? "Rental" : isAirport ? "Airport" : "Oneway";

        const sourceState = CITIES.find(
          (c) =>
            c.name.toLowerCase() === fromCity.trim().toLowerCase() ||
            c.id.toLowerCase() === fromCity.trim().toLowerCase()
        )?.state;

        const effectiveTotalDist = distanceParam > 0 ? distanceParam : undefined;
        const effectiveOneWayDist = oneWayDistanceParam > 0
          ? oneWayDistanceParam
          : (distanceParam > 0 ? (isRound ? Math.round(distanceParam / 2) : distanceParam) : undefined);

        const res = await api.calculatePrice({
          rideType: rideTypeParam,
          sourceCity: fromCity,
          destinationCity: toCity,
          category: cabCategory || "Sedan",
          state: sourceState,
          distance: effectiveTotalDist,
          oneWayDistance: effectiveOneWayDist,
          pickupDate,
          pickupTime,
          returnDate: dropDate,
          returnTime: dropTime,
        });

        if (res && res.fare > 0) {
          setLiveBaseFare(res.fare);
          if (res.advance > 0) setLiveAdvance(res.advance);
          if (res.dueFare > 0) setLiveDueFare(res.dueFare);
          if (res.distance > 0) {
            setLiveKms(Math.round(res.distance));
          }
        }
      } catch (e) {
        console.warn("Review page backend fare calculation error:", e);
      }
    }

    fetchLiveFare();
  }, [baseFareParam, advanceParam, dueFareParam, includedKmsParam, tripType, fromCity, toCity, cabCategory, distanceParam, oneWayDistanceParam, pickupDate, pickupTime, dropDate, dropTime]);

  const baseFare = liveBaseFare;
  const includedKms = liveKms;

  /* ------------------------------- State -------------------------------- */
  // User Form
  const [pickupAddress, setPickupAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Male");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [useAsBillingAddress, setUseAsBillingAddress] = useState(true);

  // Auto-fill from authenticated user session
  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      if (user.name) setFullName(user.name);
      if (user.phone) setMobileNumber(user.phone.replace(/[^0-9]/g, ""));
      if (user.email) setEmailId(user.email);
    }
  }, []);

  // Add-ons
  const [addonRoofCarrier, setAddonRoofCarrier] = useState(false);
  const [addonLanguage, setAddonLanguage] = useState(false);
  const [addonNewVehicle, setAddonNewVehicle] = useState(false);
  const [addonSightseeing, setAddonSightseeing] = useState(false);

  const ROOF_FEE = 157;
  const LANGUAGE_FEE = 209;
  const NEW_VEHICLE_FEE = 262;
  const SIGHTSEEING_FEE = 787;

  // Payment Option: "part" | "full"
  const [paymentOption, setPaymentOption] = useState<"part" | "full">("part");

  // Fare Breakup Accordion
  const [showFareBreakup, setShowFareBreakup] = useState(true);

  // Booking Success Modal
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  /* ---------------------------- Calculations ---------------------------- */
  // GST: 5% of base fare
  const gstAmount = Math.round(baseFare * 0.05);

  // Payment Gateway Charges: 2% of base fare
  const gatewayCharges = Math.round(baseFare * 0.02);

  const addonsTotal =
    (addonRoofCarrier ? ROOF_FEE : 0) +
    (addonLanguage ? LANGUAGE_FEE : 0) +
    (addonNewVehicle ? NEW_VEHICLE_FEE : 0) +
    (addonSightseeing ? SIGHTSEEING_FEE : 0);

  // Total Fare: Base Fare + GST (5%) + Gateway Charges (2%) + Add-ons
  const finalTotal = baseFare + gstAmount + gatewayCharges + addonsTotal;

  // Part Pay: Use backend advance token (or proportional token)
  const partPayAmount = liveAdvance > 0
    ? Math.round(liveAdvance + (gstAmount + gatewayCharges + addonsTotal) * (liveAdvance / Math.max(1, baseFare)))
    : Math.round(finalTotal * 0.2);

  const payableNow = paymentOption === "part" ? partPayAmount : finalTotal;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStepText, setPaymentStepText] = useState("Processing Booking...");

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupAddress.trim()) {
      alert("Please enter your exact pickup location (e.g. hotel, home, or airport terminal).");
      return;
    }
    if (!fullName.trim() || !mobileNumber.trim()) {
      alert("Please enter traveller name and mobile number.");
      return;
    }

    setIsSubmitting(true);
    setPaymentStepText("Creating Booking in Backend...");
    let finalId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const sourceState = CITIES.find((c) => c.name.toLowerCase() === fromCity.trim().toLowerCase())?.state || "West Bengal";

      // Connect to BroomBoom User Backend
      const backendBooking = await api.createBooking({
        customerName: fullName.trim(),
        customerMobile: mobileNumber.trim(),
        customerEmail: emailId.trim(),
        serviceType:
          tripType.toLowerCase().includes("oneway") || tripType.toLowerCase().includes("one-way")
            ? "Outstation oneway"
            : tripType.toLowerCase().includes("round")
            ? "Outstation roundtrip"
            : tripType.toLowerCase().includes("hourly") || tripType.toLowerCase().includes("rental")
            ? "Hourly"
            : "Airport",
        state: sourceState,
        pickupAddress: pickupAddress.trim(),
        dropAddress: `${toCity}, India`,
        pickupDate: pickupDate || new Date().toISOString().split("T")[0],
        pickupTime: pickupTime || "10:00 AM",
        returnDate: dropDate || "",
        returnTime: dropTime || "",
        vehicleCategory: cabName || cabCategory || "Sedan",
        seater: parseInt(cabSeats, 10) || 4,
        fare: finalTotal,
        advance: payableNow,
        dueFare: Math.max(0, finalTotal - payableNow),
        status: "Pending",
        paymentStatus: "PENDING",
      });

      if (backendBooking?.bookingId) {
        finalId = backendBooking.bookingId;
      }
    } catch (err) {
      console.warn("Backend booking sync notice:", err);
    }

    setBookingId(finalId);

    // Save to user bookings locally with pending payment status
    try {
      const newBooking = {
        bookingId: finalId,
        date: new Date().toISOString(),
        tripType,
        fromCity,
        toCity,
        pickupDate,
        pickupTime,
        dropDate,
        dropTime,
        cabName,
        cabCategory,
        status: "PENDING_PAYMENT",
        totalAmount: finalTotal,
        amountPaid: payableNow,
        remainingAmount: finalTotal - payableNow,
        paymentMode: paymentOption === "part" ? "Part Pay via Cashfree" : "Full Pay via Cashfree",
        traveller: {
          name: fullName,
          phone: mobileNumber,
          email: emailId,
          pickupAddress,
        },
      };

      const existingRaw = localStorage.getItem("broomboom_user_bookings");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      // Remove any duplicate if present
      const filtered = existing.filter((b: any) => b.bookingId !== finalId);
      filtered.unshift(newBooking);
      localStorage.setItem("broomboom_user_bookings", JSON.stringify(filtered));
    } catch {}

    // Request Cashfree payment session from backend & redirect to Cashfree checkout
    try {
      setPaymentStepText("Connecting to Cashfree Gateway...");
      const returnUrl = `${window.location.origin}/payment/status?bookingId=${finalId}&order_id={order_id}`;
      const cashfreeOrder = await api.createCashfreeOrder({
        bookingId: finalId,
        returnUrl,
      });

      if (cashfreeOrder?.paymentSessionId) {
        setPaymentStepText("Redirecting to Cashfree Checkout...");
        await triggerCashfreePayment({
          paymentSessionId: cashfreeOrder.paymentSessionId,
          environment: cashfreeOrder.environment || "sandbox",
          redirectTarget: "_self",
        });
        return;
      } else {
        throw new Error(cashfreeOrder?.message || "Payment session could not be created.");
      }
    } catch (payErr: any) {
      console.error("Cashfree redirection error:", payErr);
      alert(
        `Could not initiate Cashfree payment: ${
          payErr?.message || "Please check backend connection on port 5004"
        }`
      );
      setIsSubmitting(false);
    }
  };

  const inr = (val: number) => `₹${val.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-[#edf2f7] text-slate-800 flex flex-col font-sans relative selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header Banner matching Reference Screenshot (Image 2) */}
      <header className="bg-[#0b1f38] text-white py-3.5 px-4 sm:px-8 shadow-sm sticky top-0 z-40 border-b border-slate-900">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/fleet"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs font-bold shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Back</span>
            </Link>
            <span className="text-slate-600 hidden xs:inline">|</span>
            <h1 className="text-sm sm:text-lg font-bold tracking-tight text-white truncate">
              Review booking
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsMyBookingsOpen(true)}
              className="hidden sm:inline text-xs font-bold text-amber-400 hover:text-amber-300 transition"
            >
              My Bookings
            </button>
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider transition shadow-sm shrink-0"
              title="Back to BroomBoom Home"
            >
              <img
                src="/logo.png"
                alt="BroomBoom Logo"
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-contain"
              />
              <span>BROOMBOOM</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-6 pb-12 flex-1 relative z-10">
        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================================================================ */}
          {/* LEFT COLUMN (Card 1: Summary + Inclusions, Card 2: Addons, 3: Traveller) */}
          {/* ================================================================ */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* 1. Trip Summary Card with INCLUSIONS integrated (matching Image 3) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              {/* Light Blue Header Section */}
              <div className="bg-[#ebf4fe] border-b border-blue-100/80 p-4 sm:p-5">
                <div className="text-[11px] font-semibold text-slate-600 mb-1">
                  {tripType}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-black text-slate-900">
                  <span>{fromCity}</span>
                  <span className="text-slate-400 font-normal">&gt;</span>
                  <span>{toCity}</span>
                  {tripType.toLowerCase().includes("round") && (
                    <>
                      <span className="text-slate-400 font-normal">&gt;</span>
                      <span>{fromCity}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                  <span>{fromCity}</span>
                  <span>{toCity}</span>
                  {tripType.toLowerCase().includes("round") && (
                    <span>{fromCity}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  <span>
                    {pickupDateDisplay}, {pickupTime}{dropDate ? ` - ${dropDateDisplay}, ${dropTime}` : ""}
                  </span>
                </div>
              </div>

              {/* White Cab Detail Row */}
              <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {cabName}
                    </h3>
                    {modelBadgeText && (
                      <span className="px-2 py-0.5 rounded bg-[#0066cc] text-white text-[10px] font-bold uppercase tracking-wider">
                        {modelBadgeText}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{modelType}</p>
                  <p className="text-xs font-semibold text-slate-600 mt-2 uppercase tracking-wide">
                    {cabCategory} • AC • {cabSeats} Seats
                  </p>
                </div>

                <div className="w-16 h-12 rounded-xl bg-[#ebf4fe] border border-blue-100/80 flex items-center justify-center p-2 shrink-0">
                  <Car className="w-9 h-9 text-[#1c75bc]" />
                </div>
              </div>

              {/* Cancellation Strip */}
              <div className="bg-[#fff9e6] border-y border-amber-200/70 px-4 sm:px-5 py-2.5 text-xs text-slate-800 flex items-center gap-2 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  Free cancellation till <strong className="font-bold text-slate-900">1 hour before departure</strong>
                </span>
              </div>

              {/* MOTU CABS Partner Banner */}
              <div className="bg-gradient-to-r from-amber-50/70 via-slate-50 to-amber-50/40 border-b border-amber-200/50 px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-300/60 flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">Our Top Rated Fleet Partner</span>
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold">
                        ★ 4.9 / 5
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      100% Verified Commercial Chauffeurs &amp; GPS Tracked Cabs
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  {/* MOTU CABS Brand Logo Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 text-white shadow-sm border border-slate-800">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
                      <Car className="w-3.5 h-3.5 fill-slate-950 stroke-[2.5]" />
                    </div>
                    <div className="flex flex-col leading-none text-left">
                      <span className="font-black text-xs tracking-wider uppercase">
                        MOTU <span className="text-amber-400">CABS</span>
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        Fleet Partner
                      </span>
                    </div>
                  </div>

                  {/* Group Company Pill */}
                  <span className="text-[10px] font-extrabold text-amber-950 bg-amber-100/90 px-2.5 py-1.5 rounded-xl border border-amber-300/80 shadow-2xs flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>BroomBoom Group Company</span>
                  </span>
                </div>
              </div>

              {/* INCLUSIONS Section (Directly inside Card 1 matching Image 3) */}
              <div className="p-4 sm:p-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3.5">
                  INCLUSIONS
                </h4>

                <div className="space-y-4">
                  {/* Kilometer Allowance */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {includedKms.toLocaleString("en-IN")} Km included
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        ₹{extraKmRate}/km will apply beyond the included kms
                      </div>
                    </div>
                  </div>

                  {/* Driver Allowance */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        Driver allowance
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Driver food and accommodation(stay) charges are included
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. TRIP ADD-ONS & COMFORT UPGRADES (matching Image 6 & Image 4) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide mb-3.5">
                TRIP ADD-ONS &amp; COMFORT UPGRADES
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Add-on 1: Roof Carrier */}
                <label
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    addonRoofCarrier
                      ? "border-amber-400 bg-amber-50/50 ring-1 ring-amber-300"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={addonRoofCarrier}
                    onChange={(e) => setAddonRoofCarrier(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-amber-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        Add Roof Carrier
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        +{inr(ROOF_FEE)}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      Fit 4 more large bags comfortably on luggage carrier
                    </p>
                  </div>
                </label>

                {/* Add-on 2: Preferred Language */}
                <label
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    addonLanguage
                      ? "border-amber-400 bg-amber-50/50 ring-1 ring-amber-300"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={addonLanguage}
                    onChange={(e) => setAddonLanguage(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-amber-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        Preferred Driver Language
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        +{inr(LANGUAGE_FEE)}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      Assigns driver fluent in English, Hindi, or Bengali
                    </p>
                  </div>
                </label>

                {/* Add-on 3: New Vehicle Guarantee */}
                <label
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    addonNewVehicle
                      ? "border-amber-400 bg-amber-50/50 ring-1 ring-amber-300"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={addonNewVehicle}
                    onChange={(e) => setAddonNewVehicle(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-amber-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        New Vehicle (2023+)
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        +{inr(NEW_VEHICLE_FEE)}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      Promised latest 2023 or newer car model with pristine interior
                    </p>
                  </div>
                </label>

                {/* Add-on 4: Local Sightseeing */}
                <label
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    addonSightseeing
                      ? "border-amber-400 bg-amber-50/50 ring-1 ring-amber-300"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={addonSightseeing}
                    onChange={(e) => setAddonSightseeing(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-amber-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        Local sightseeing package
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        +{inr(SIGHTSEEING_FEE)}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                      Covers extra hours of city touring and attractions
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. Traveller Details (matching Image 4) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4">
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
                Traveller Details
              </h3>

              {/* Pickup Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Pickup Details
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="ENTER PICKUP LOCATION"
                    className="w-full pl-10 pr-4 py-3 bg-[#f5f6f8] rounded-xl border border-slate-200 focus:border-amber-400 focus:bg-white focus:ring-1 focus:ring-amber-200 text-xs sm:text-sm font-bold text-slate-900 outline-none transition uppercase placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Traveller Contact Details */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Traveller Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Full Name */}
                  <div className="sm:col-span-8">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      FULL NAME
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 text-xs sm:text-sm font-bold text-slate-900 outline-none transition"
                    />
                  </div>

                  {/* Gender */}
                  <div className="sm:col-span-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      GENDER
                    </div>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 text-xs sm:text-sm font-bold text-slate-900 outline-none transition appearance-none cursor-pointer bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {/* Mobile Number */}
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      MOBILE NUMBER
                    </div>
                    <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-200 overflow-hidden bg-white">
                      <span className="px-3 text-xs font-bold text-slate-600 bg-slate-50 border-r border-slate-200">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                        maxLength={10}
                        placeholder="10-digit mobile"
                        className="w-full px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-900 outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Email ID */}
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      EMAIL ID
                    </div>
                    <input
                      type="email"
                      required
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      placeholder="e.g. name@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-200 text-xs sm:text-sm font-bold text-slate-900 outline-none transition"
                    />
                  </div>
                </div>

                {/* Login link & Billing Checkbox */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Or</span>
                    <button
                      type="button"
                      onClick={() => alert("Logged in as " + fullName)}
                      className="text-[#0066cc] hover:underline font-bold flex items-center gap-1 uppercase text-xs"
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>LOG INTO EXISTING ACCOUNT</span>
                    </button>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={useAsBillingAddress}
                      onChange={(e) => setUseAsBillingAddress(e.target.checked)}
                      className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                    />
                    <span>Use pickup location as billing address</span>
                  </label>
                </div>
              </div>

              {/* Legal Terms Disclaimer */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                By proceeding to book, I agree to BroomBoom&apos;s{" "}
                <span className="text-slate-700 hover:underline cursor-pointer font-semibold">
                  Privacy Policy
                </span>
                ,{" "}
                <span className="text-slate-700 hover:underline cursor-pointer font-semibold">
                  User Agreement
                </span>
                ,{" "}
                <span className="text-slate-700 hover:underline cursor-pointer font-semibold">
                  Terms of Service
                </span>
                , &amp;{" "}
                <span className="text-slate-700 hover:underline cursor-pointer font-semibold">
                  Cancellation Rules
                </span>
                .
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN (Fare Breakup & Payment Options)                    */}
          {/* ================================================================ */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-4">
            
            {/* 1. Fare Breakup & Total Fare Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Fare Breakup
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Transparent Pricing
                </span>
              </div>

              <div className="space-y-3 pt-3 text-xs">
                {/* Base Fare */}
                <div>
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Base Trip Fare</span>
                    <span>{inr(baseFare)}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Cab charges, Chauffeur &amp; Fuel included
                  </div>
                </div>

                {/* Goods & Services Tax (GST 5%) */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Goods &amp; Services Tax (GST 5%)</span>
                    <span>{inr(gstAmount)}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Government mandated tax
                  </div>
                </div>

                {/* Payment Gateway Charges (2%) */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Payment Gateway Charges (2%)</span>
                    <span>{inr(gatewayCharges)}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Cashfree secure online processing
                  </div>
                </div>

                {/* Add-ons if any */}
                {addonsTotal > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Selected Add-ons</span>
                      <span>+{inr(addonsTotal)}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 space-y-0.5 mt-0.5">
                      {addonRoofCarrier && <div className="flex justify-between"><span>Roof Carrier</span><span>+{inr(ROOF_FEE)}</span></div>}
                      {addonLanguage && <div className="flex justify-between"><span>Driver Language</span><span>+{inr(LANGUAGE_FEE)}</span></div>}
                      {addonNewVehicle && <div className="flex justify-between"><span>New Vehicle (2023+)</span><span>+{inr(NEW_VEHICLE_FEE)}</span></div>}
                      {addonSightseeing && <div className="flex justify-between"><span>City Sightseeing</span><span>+{inr(SIGHTSEEING_FEE)}</span></div>}
                    </div>
                  </div>
                )}

                {/* Total Fare Final Row */}
                <div className="pt-3.5 border-t-2 border-slate-200 mt-3 bg-amber-50/80 -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-4 sm:p-5 border-t border-amber-200/90 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                      TOTAL FARE
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      Inclusive of GST &amp; Gateway Charges
                    </div>
                  </div>
                  <div className="text-2xl sm:text-[26px] font-black text-slate-950">
                    {inr(finalTotal)}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Options Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Payment options
              </h3>

              {/* Option 1: Part Pay */}
              <label
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  paymentOption === "part"
                    ? "border-amber-400 bg-amber-50/60 ring-1 ring-amber-300"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <input
                    type="radio"
                    name="payOption"
                    checked={paymentOption === "part"}
                    onChange={() => setPaymentOption("part")}
                    className="mt-0.5 w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-black text-slate-900">Pay 20% Advance Token</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Pay balance {inr(finalTotal - partPayAmount)} to driver</div>
                  </div>
                </div>
                <div className="text-sm font-black text-slate-950">
                  {inr(partPayAmount)}
                </div>
              </label>

              {/* Option 2: Full Pay */}
              <label
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  paymentOption === "full"
                    ? "border-amber-400 bg-amber-50/60 ring-1 ring-amber-300"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <input
                    type="radio"
                    name="payOption"
                    checked={paymentOption === "full"}
                    onChange={() => setPaymentOption("full")}
                    className="mt-0.5 w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-black text-slate-900">Pay Full 100%</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Complete amount with zero cash hassle</div>
                  </div>
                </div>
                <div className="text-sm font-black text-slate-950">
                  {inr(finalTotal)}
                </div>
              </label>

              {/* CTA PAY NOW Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-slate-950 font-black text-sm uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-400/20 border border-amber-300 text-center cursor-pointer mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{paymentStepText}</span>
                  </>
                ) : (
                  <span>PAY NOW ({inr(payableNow)})</span>
                )}
              </button>
            </div>

          </div>
        </form>
      </main>

      {/* ==================================================================== */}
      {/* BOOKING CONFIRMATION SUCCESS MODAL                                   */}
      {/* ==================================================================== */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl ring-1 ring-slate-200/90 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200 mb-2">
                Booking Confirmed
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Your Cab is Booked!
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-mono font-bold">
                Booking ID: <span className="text-slate-900">{bookingId}</span>
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Route:</span>
                <span className="font-bold text-slate-900">{fromCity} → {toCity}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Cab:</span>
                <span className="font-bold text-slate-900">{cabName} ({cabCategory})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Departure:</span>
                <span className="font-bold text-slate-900">{pickupDate} at {pickupTime}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pickup At:</span>
                <span className="font-bold text-slate-900 truncate max-w-[200px]">{pickupAddress}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Amount Paid:</span>
                <span className="font-bold text-emerald-600">{inr(payableNow)}</span>
              </div>
              {paymentOption === "part" && (
                <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                  <span>Balance (Cash/UPI to Driver):</span>
                  <span className="font-black text-amber-600">{inr(finalTotal - payableNow)}</span>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-500 bg-amber-50 p-3 rounded-xl border border-amber-200/80 text-left">
              Chauffeur details &amp; car number will be SMSed &amp; WhatsApped to <strong>+91 {mobileNumber}</strong> 2 hours prior to departure.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/fleet"
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 transition text-center"
              >
                Book Another Cab
              </Link>
              <Link
                href="/"
                className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 border border-amber-300 transition text-center"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global My Bookings Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />
    </div>
  );
};
