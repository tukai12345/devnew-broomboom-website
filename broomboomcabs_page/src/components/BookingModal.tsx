"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  ChevronDown, 
  LogIn,
  X 
} from "lucide-react";
import { CabVehicle } from "@/data/cabsData";
import { SearchParams } from "@/components/HeroSearch";
import { api } from "@/services/api";

export interface BookingModalProps {
  cab?: CabVehicle | null;
  searchParams?: SearchParams;
  isOpen?: boolean;
  onClose?: () => void;
  appliedPromo?: string;
}

export function BookingModal({
  cab,
  searchParams,
  isOpen = true,
  onClose,
  appliedPromo,
}: BookingModalProps) {
  // Form State
  const [pickupLocation, setPickupLocation] = useState("");
  const [fullName, setFullName] = useState("Partha Sarkar");
  const [gender, setGender] = useState("Male");
  const [mobile, setMobile] = useState("8583992978");
  const [email, setEmail] = useState("sakarpartha222@gmail.com");
  const [usePickupAsBilling, setUsePickupAsBilling] = useState(true);
  
  // Payment State
  const [paymentChoice, setPaymentChoice] = useState<"advance" | "full">("advance");

  // Add-ons State
  const [addonLanguage, setAddonLanguage] = useState(false);
  const [addonNewVehicle, setAddonNewVehicle] = useState(false);
  const [addonRefundable, setAddonRefundable] = useState(false);

  // Live Addon Pricing from backend / admin settings
  const [addonPricing, setAddonPricing] = useState({
    language: 209,
    newVehicle: 262,
    refundable: 751,
  });

  useEffect(() => {
    let isMounted = true;
    api.getAddons().then((pricing) => {
      if (isMounted && pricing) {
        setAddonPricing({
          language: pricing.language,
          newVehicle: pricing.newVehicle,
          refundable: pricing.refundable || 751,
        });
      }
    }).catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Terms Agreement State
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Dynamic Fare & Advance Calculations
  const baseFare = cab?.discountedPrice ?? 750;
  const addonsTotal =
    (addonLanguage ? addonPricing.language : 0) +
    (addonNewVehicle ? addonPricing.newVehicle : 0) +
    (addonRefundable ? addonPricing.refundable : 0);

  // If add-on service is added, add to BOTH advance and total fare
  const totalFare = baseFare + addonsTotal;
  const baseAdvance = Math.round(baseFare * 0.2);
  const advanceToken = baseAdvance + addonsTotal;

  // Exact car illustration image
  const carImage =
    cab?.image ||
    (cab?.category?.toLowerCase() === "suv" || cab?.name?.toLowerCase().includes("ertiga")
      ? "/cars/suv-ertiga.png"
      : cab?.category?.toLowerCase()?.includes("prime") || cab?.name?.toLowerCase().includes("crysta")
      ? "/cars/suv-plus-innova-crysta.png"
      : cab?.category?.toLowerCase()?.includes("tempo")
      ? "/cars/tempo-traveller.png"
      : "/cars/sedan-dzire.png");

  if (isOpen === false) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="min-h-screen sm:min-h-0 w-full max-w-6xl bg-slate-50 font-sans pb-16 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 my-auto">
        {/* Top Navbar / Modal Header */}
        <header className="bg-[#0B1527] text-white py-4 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition cursor-pointer text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <Link href="/" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            )}
            <h1 className="text-xl font-bold tracking-wide">Review booking</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/my-bookings" className="text-amber-400 font-semibold text-sm hover:underline">
              My Bookings
            </Link>
            <div className="bg-amber-400 text-slate-900 px-3 py-1.5 rounded-md font-black flex items-center gap-2 text-sm">
              <img src="/logo.png" alt="BroomBoom Logo" className="w-5 h-5 rounded object-contain" />
              <span>BROOMBOOM</span>
            </div>
          </div>
        </header>

        {/* Main Content Layout */}
        <main className="max-w-6xl mx-auto mt-6 px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN (Add-ons & Traveller Details) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Selected Cab Summary Card */}
            {cab && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{cab.name}</h3>
                    {cab.badge && (
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                        {cab.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{cab.models}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-2 uppercase tracking-wide">
                    {cab.category} • AC • {cab.seats} Seats
                  </p>
                </div>
                <div className="w-24 sm:w-28 h-16 sm:h-20 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-xs">
                  <img
                    src={carImage}
                    alt={cab.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
            
            {/* Add-ons Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">
                Available Trip Add-ons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Add-on 1 */}
                <label className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition select-none ${addonLanguage ? "border-amber-400 bg-amber-50/30" : "border-slate-200 hover:border-amber-300"}`}>
                  <input
                    type="checkbox"
                    checked={addonLanguage}
                    onChange={(e) => setAddonLanguage(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm text-slate-800">Preferred Driver Language</span>
                      <span className="text-sm font-bold text-slate-900">+₹{addonPricing.language}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Assigns driver fluent in English, Hindi, or Bengali
                    </p>
                  </div>
                </label>

                {/* Add-on 2 */}
                <label className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition select-none ${addonNewVehicle ? "border-amber-400 bg-amber-50/30" : "border-slate-200 hover:border-amber-300"}`}>
                  <input
                    type="checkbox"
                    checked={addonNewVehicle}
                    onChange={(e) => setAddonNewVehicle(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm text-slate-800">New Vehicle (2023+)</span>
                      <span className="text-sm font-bold text-slate-900">+₹{addonPricing.newVehicle}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Promised latest 2023 or newer car model with pristine interior
                    </p>
                  </div>
                </label>

                {/* Add-on 3 */}
                <label className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition select-none md:col-span-2 lg:col-span-1 ${addonRefundable ? "border-amber-400 bg-amber-50/30" : "border-slate-200 hover:border-amber-300"}`}>
                  <input
                    type="checkbox"
                    checked={addonRefundable}
                    onChange={(e) => setAddonRefundable(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm text-slate-800">Upgrade to Refundable booking</span>
                      <span className="text-sm font-bold text-slate-900">+₹{addonPricing.refundable}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      100% full refund guarantee on cancellation up to 6 hours before pickup
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Traveller Details Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wide">Traveller Details</h2>
              
              {/* Pickup Input */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-500 mb-2">Pickup Details</label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="ENTER PICKUP LOCATION" 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 uppercase placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-500">Traveller Contact Details</span>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Gender</label>
                  <div className="relative">
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg py-2.5 px-3 text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:border-amber-500 bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 rounded-l-lg bg-slate-50 text-slate-700 text-sm font-bold">
                      +91
                    </span>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => {
                        let clean = e.target.value.replace(/[^0-9]/g, "");
                        if (clean.length === 12 && clean.startsWith("91")) {
                          clean = clean.slice(2);
                        }
                        setMobile(clean.slice(0, 10));
                      }}
                      maxLength={10}
                      placeholder="10-digit mobile"
                      className="w-full border border-slate-300 rounded-r-lg py-2.5 px-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Email ID</label>
                    <span className="text-[9px] text-slate-400">(optional)</span>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Login & Checkbox Row */}
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <button type="button" className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                  <span className="text-slate-500 font-normal">Or</span>
                  <LogIn className="w-4 h-4" />
                  LOG INTO EXISTING ACCOUNT
                </button>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={usePickupAsBilling}
                    onChange={(e) => setUsePickupAsBilling(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500 accent-amber-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Use pickup location as billing address</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Fare & Payment Options) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Fare Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-slate-800">Base Trip Fare</span>
                  <span className="text-sm font-bold text-slate-800">₹{baseFare}</span>
                </div>
                <p className="text-[11px] text-slate-500">Cab charges, Chauffeur &amp; Fuel included</p>

                {addonsTotal > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>Selected Add-ons</span>
                      <span>+₹{addonsTotal}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 space-y-0.5 mt-1">
                      {addonLanguage && <div className="flex justify-between"><span>Driver Language</span><span>+₹{addonPricing.language}</span></div>}
                      {addonNewVehicle && <div className="flex justify-between"><span>New Vehicle (2023+)</span><span>+₹{addonPricing.newVehicle}</span></div>}
                      {addonRefundable && <div className="flex justify-between"><span>Upgrade to Refundable Booking</span><span>+₹{addonPricing.refundable}</span></div>}
                    </div>
                  </div>
                )}
              </div>

              {/* Total Fare Row */}
              <div className="p-5 bg-amber-50/70 border-t border-amber-200/80 flex justify-between items-center">
                <span className="text-sm font-black text-slate-900 uppercase tracking-wider">Total Fare</span>
                <span className="text-2xl font-black text-slate-900">₹{totalFare}</span>
              </div>

              {/* Terms, Conditions & Privacy Checkbox below Total Fare */}
              <div className="p-4 bg-slate-50/90 border-t border-slate-200">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer accent-amber-500 shrink-0"
                  />
                  <span className="text-[11px] text-slate-600 leading-relaxed">
                    I have read and agree to BroomBoom&apos;s{" "}
                    <Link href="/terms-of-service" target="_blank" className="text-blue-600 hover:underline font-semibold">
                      Terms &amp; Conditions
                    </Link>
                    ,{" "}
                    <Link href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline font-semibold">
                      Privacy Policy
                    </Link>
                    ,{" "}
                    <Link href="/user-agreement" target="_blank" className="text-blue-600 hover:underline font-semibold">
                      User Agreement
                    </Link>{" "}
                    &amp;{" "}
                    <Link href="/cancellation-rules" target="_blank" className="text-blue-600 hover:underline font-semibold">
                      Cancellation Rules
                    </Link>
                    .
                  </span>
                </label>
                {!agreedToTerms && (
                  <div className="text-[10px] text-amber-600 font-semibold mt-1.5 ml-6">
                    * Please check the box to agree and continue
                  </div>
                )}
              </div>
            </div>

            {/* Payment Options Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">Payment Options</h3>
              
              <div className="space-y-3 mb-6">
                {/* Advance Option */}
                <label 
                  onClick={() => setPaymentChoice("advance")}
                  className={`block border-2 rounded-xl p-4 cursor-pointer transition select-none ${
                    paymentChoice === "advance" ? "border-amber-400 bg-amber-50/30 ring-1 ring-amber-300" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentChoice === "advance" ? "border-amber-500" : "border-slate-300"}`}>
                        {paymentChoice === "advance" && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        Pay 20% Advance Token{addonsTotal > 0 ? " + Add-ons" : ""}
                      </span>
                    </div>
                    <span className="font-black text-slate-900">₹{advanceToken}</span>
                  </div>
                  <p className="text-xs text-slate-500 ml-6">Pay balance ₹{Math.max(0, totalFare - advanceToken)} to driver</p>
                </label>

                {/* Full Pay Option */}
                <label 
                  onClick={() => setPaymentChoice("full")}
                  className={`block border-2 rounded-xl p-4 cursor-pointer transition select-none ${
                    paymentChoice === "full" ? "border-amber-400 bg-amber-50/30 ring-1 ring-amber-300" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentChoice === "full" ? "border-amber-500" : "border-slate-300"}`}>
                        {paymentChoice === "full" && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">Pay Full 100%</span>
                    </div>
                    <span className="font-black text-slate-900">₹{totalFare}</span>
                  </div>
                  <p className="text-xs text-slate-500 ml-6">Complete amount with zero cash hassle</p>
                </label>
              </div>

              {/* Pay Now Button */}
              <button
                type="button"
                disabled={!agreedToTerms}
                onClick={() => {
                  if (!agreedToTerms) {
                    alert("Please check and agree to the Terms & Conditions and Privacy Policy.");
                    return;
                  }
                  const rawDigits = mobile.replace(/[^0-9]/g, "");
                  const tenDigit = rawDigits.length >= 10 ? rawDigits.slice(-10) : rawDigits;
                  const phoneWith91 = `91${tenDigit}`;
                  const amountToPay = paymentChoice === "advance" ? advanceToken : totalFare;
                  const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 900000 + 100000)}`;

                  try {
                    const sp = searchParams as any;
                    const computedServiceType =
                      sp?.tripType === "outstation-round"
                        ? "Outstation Round-Trip"
                        : sp?.tripType === "hourly" || sp?.activeTab === "rental"
                        ? "Hourly Rental"
                        : "Outstation One-Way";

                    const newBooking = {
                      bookingId: orderId,
                      orderId,
                      pickupAddress: pickupLocation || sp?.fromCity || "Pickup Location",
                      dropAddress: sp?.toCity || "Drop Location",
                      customerName: fullName || "Customer",
                      customerMobile: phoneWith91,
                      customerEmail: email,
                      pickupDate: sp?.pickupDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                      pickupTime: sp?.pickupTime || "10:00 AM",
                      serviceType: computedServiceType,
                      cabCategory: cab?.category || "Sedan",
                      cabName: cab?.name || "Sedan (Dzire / Etios)",
                      fare: totalFare,
                      totalFare,
                      amountPaid: amountToPay,
                      remainingAmount: paymentChoice === "advance" ? Math.max(0, totalFare - advanceToken) : 0,
                      status: "ACTIVE",
                      addons: {
                        language: addonLanguage,
                        newVehicle: addonNewVehicle,
                        refundableBooking: addonRefundable,
                      },
                    };

                    const stored = localStorage.getItem("broomboom_user_bookings");
                    const list = stored ? JSON.parse(stored) : [];
                    list.unshift(newBooking);
                    localStorage.setItem("broomboom_user_bookings", JSON.stringify(list));
                  } catch (e) {
                    console.error("Failed to save booking:", e);
                  }

                  window.location.href = `/cashfree/payments/success?order_id=${orderId}&order_status=ACTIVE&order_amount=${amountToPay}`;
                }}
                className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] disabled:opacity-50 text-slate-950 font-black text-sm uppercase tracking-wide py-4 rounded-xl shadow-sm transition cursor-pointer"
              >
                PAY NOW (₹{paymentChoice === "advance" ? advanceToken : totalFare})
              </button>

              {/* Advance and Total summary */}
              <div className="text-center text-xs text-slate-600 font-semibold mt-3">
                Advance: ₹{advanceToken} &nbsp;|&nbsp; Total Fare: ₹{totalFare}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default BookingModal;
