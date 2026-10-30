"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Car,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Tag,
  ArrowRight,
  Share2,
  Check
} from "lucide-react";
import { CabVehicle } from "@/data/cabsData";
import { SearchParams } from "./HeroSearch";
import { api } from "@/services/api";
import { triggerCashfreePayment } from "@/utils/cashfree";
import { getStoredUser } from "@/utils/auth";

interface BookingModalProps {
  cab: CabVehicle | null;
  searchParams: SearchParams;
  isOpen: boolean;
  onClose: () => void;
  appliedPromo?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  cab,
  searchParams,
  isOpen,
  onClose,
  appliedPromo = "BROOMFIRST",
}) => {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [paymentChoice, setPaymentChoice] = useState<"advance" | "full" | "driver">("advance");
  const [bookingStatus, setBookingStatus] = useState<"filling" | "processing" | "confirmed">("filling");
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-populate from logged-in user if available
  useEffect(() => {
    if (isOpen) {
      const user = getStoredUser();
      if (user) {
        if (user.name && !name) setName(user.name);
        if (user.phone && !phone) setPhone(user.phone);
        if (user.email && !email) setEmail(user.email);
      }
    }
  }, [isOpen]);

  if (!isOpen || !cab || !mounted) return null;

  const basePrice = Math.round(cab.discountedPrice);
  // Total Fare shown on web: Base Fare
  const finalPayable = basePrice; 
  const advanceToken = Math.round(finalPayable * 0.2);

  // Hidden GST (5%) & Gateway (2%) added when redirecting to Cashfree
  const gstCharge = Math.round(finalPayable * 0.05);
  const gatewayCharge = Math.round(finalPayable * 0.02);
  const totalExtraCharges = gstCharge + gatewayCharge; // 7% extra

  const cashfreePayable = paymentChoice === "advance"
    ? Math.round(advanceToken + totalExtraCharges * (advanceToken / Math.max(1, finalPayable)))
    : finalPayable + totalExtraCharges;

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !pickupAddress.trim()) {
      alert("Please fill your Name, Phone Number, and Complete Pickup Address.");
      return;
    }

    setBookingStatus("processing");
    let officialBookingId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Connect to BroomBoom User Backend
      const backendBooking = await api.createBooking({
        customerName: name.trim(),
        customerMobile: phone.trim(),
        customerEmail: email.trim(),
        serviceType:
          searchParams.tripType === "outstation-oneway"
            ? "Outstation oneway"
            : searchParams.tripType === "outstation-round"
            ? "Outstation roundtrip"
            : searchParams.tripType === "hourly"
            ? "Hourly"
            : "Airport",
        state: "Maharashtra",
        pickupAddress: pickupAddress.trim(),
        dropAddress: `${searchParams.toCity}, India`,
        pickupDate: searchParams.pickupDate || new Date().toISOString().split("T")[0],
        pickupTime: searchParams.pickupTime || "10:00 AM",
        returnDate: searchParams.returnDate || "",
        returnTime: searchParams.returnTime || "",
        vehicleCategory: cab?.name || "Sedan",
        seater: cab?.seats || 4,
        fare: finalPayable,
        advance: cashfreePayable,
        dueFare: Math.max(0, finalPayable - (paymentChoice === "advance" ? advanceToken : finalPayable)),
        status: "Pending",
        paymentStatus: "PENDING",
      });

      if (backendBooking?.bookingId) {
        officialBookingId = backendBooking.bookingId;
      }
    } catch (err) {
      console.warn("Backend booking sync notice:", err);
    }

    setBookingId(officialBookingId);

    // Save to localStorage for instant local access
    try {
      const newBooking = {
        bookingId: officialBookingId,
        date: new Date().toISOString(),
        tripType: searchParams.tripType,
        fromCity: searchParams.fromCity,
        toCity: searchParams.toCity,
        pickupDate: searchParams.pickupDate,
        pickupTime: searchParams.pickupTime,
        dropDate: searchParams.returnDate,
        dropTime: searchParams.returnTime,
        cabName: cab?.name,
        cabCategory: cab?.category,
        status: paymentChoice === "driver" ? "CONFIRMED" : "PENDING_PAYMENT",
        totalAmount: finalPayable,
        amountPaid: paymentChoice === "full" ? finalPayable : paymentChoice === "advance" ? advanceToken : 0,
        remainingAmount: paymentChoice === "full" ? 0 : paymentChoice === "advance" ? finalPayable - advanceToken : finalPayable,
        paymentMode: paymentChoice === "driver" ? "Cash to Driver" : "Online via Cashfree",
        traveller: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          pickupAddress: pickupAddress.trim(),
        },
      };
      const existingRaw = localStorage.getItem("broomboom_user_bookings");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const filtered = existing.filter((b: any) => b.bookingId !== officialBookingId);
      filtered.unshift(newBooking);
      localStorage.setItem("broomboom_user_bookings", JSON.stringify(filtered));
    } catch {}

    // If driver cash option, show confirmed modal right away
    if (paymentChoice === "driver") {
      setBookingStatus("confirmed");
      return;
    }

    // Otherwise redirect to Cashfree payment gateway
    try {
      const returnUrl = `${window.location.origin}/payment/status?bookingId=${officialBookingId}&order_id={order_id}`;
      const cashfreeOrder = await api.createCashfreeOrder({
        bookingId: officialBookingId,
        returnUrl,
      });

      if (cashfreeOrder?.paymentSessionId) {
        await triggerCashfreePayment({
          paymentSessionId: cashfreeOrder.paymentSessionId,
          environment: cashfreeOrder.environment || "sandbox",
          redirectTarget: "_self",
        });
        return;
      } else {
        throw new Error(cashfreeOrder?.message || "Cashfree payment session could not be created");
      }
    } catch (payErr: any) {
      console.error("Cashfree checkout error:", payErr);
      alert(
        `Failed to redirect to Cashfree: ${
          payErr?.message || "Please check backend connection on port 5004"
        }`
      );
      setBookingStatus("filling");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-400 p-0.5 shadow-sm shrink-0">
              <img
                src="/logo.png"
                alt="BroomBoom Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-2 py-0.5 rounded">
                  Fast Checkout
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  • 100% Free Cancellation
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                {bookingStatus === "confirmed" ? "Booking Confirmed 🎉" : "Review & Confirm Booking"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {bookingStatus === "confirmed" ? (
          /* SUCCESS SCREEN */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="relative mx-auto w-16 h-16">
              <img
                src="/logo.png"
                alt="BroomBoom Cabs"
                className="w-16 h-16 rounded-full object-contain shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-black text-slate-900">
                Your Cab is Successfully Reserved!
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Booking ID: <strong className="text-amber-600 font-mono text-base">{bookingId}</strong>
              </p>
            </div>

            {/* Trip Brief Card */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-500" />
                  <span className="font-extrabold text-slate-900 text-sm">{cab.name}</span>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Confirmed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-slate-400 font-medium">Route:</div>
                  <div className="font-bold text-slate-800">
                    {searchParams.fromCity} → {searchParams.tripType === "hourly" ? searchParams.hourlyPackage : searchParams.toCity}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Pickup Schedule:</div>
                  <div className="font-bold text-slate-800">
                    {searchParams.pickupDate} at {searchParams.pickupTime}
                    {searchParams.tripType === "outstation-round" && (
                      <span className="text-amber-700 block text-[11px] font-bold">
                        Return Drop: {searchParams.returnDate} at {searchParams.returnTime}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Passenger Name:</div>
                  <div className="font-bold text-slate-800">{name || "Traveller"}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Amount to Pay:</div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    ₹{paymentChoice === "advance" ? `${advanceToken} Advance Token` : `${finalPayable} (Full)`}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chauffeur & car details will be sent via SMS & WhatsApp 2 hours before pickup.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <a
                href={`https://wa.me/918240765499?text=Hi%20BroomBoom,%20I%20have%20booked%20cab%20${bookingId}%20for%20${searchParams.fromCity}%20to%20${searchParams.toCity}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Get WhatsApp Updates</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
              >
                Done & Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleConfirmBooking} className="p-4 sm:p-6 space-y-5">
            {/* Cab & Route Summary */}
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={cab.image}
                  alt={cab.name}
                  className="w-16 h-12 rounded-lg object-cover border border-amber-300"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{cab.name}</div>
                  <div className="text-xs text-slate-500">
                    {searchParams.fromCity} → {searchParams.tripType === "hourly" ? searchParams.hourlyPackage : searchParams.toCity}
                  </div>
                  <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
                    {searchParams.pickupDate} • {searchParams.pickupTime}
                    {searchParams.tripType === "outstation-round" && (
                      <span> → Return Drop: {searchParams.returnDate} • {searchParams.returnTime}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Fare</div>
                <div className="text-xl font-black text-slate-900">₹{finalPayable}</div>
              </div>
            </div>

            {/* Passenger Contact Info */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>Primary Passenger Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Mobile Number (for Driver SMS/Call) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Email ID (for Tax Invoice)
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Complete Doorstep Pickup Address *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No, Landmark, Street, City"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>
            </div>



            {/* Payment Choice Selection */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Select How You Wish to Pay
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label
                  onClick={() => setPaymentChoice("advance")}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition text-left flex flex-col justify-between ${
                    paymentChoice === "advance"
                      ? "border-amber-400 bg-amber-50/60 shadow-xs"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Pay 20% Advance</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentChoice === "advance"}
                      onChange={() => setPaymentChoice("advance")}
                      className="accent-amber-500"
                    />
                  </div>
                  <div className="text-xs font-black text-amber-700">₹{advanceToken} Today</div>
                  <div className="text-[10px] text-slate-400">Balance to driver at trip end</div>
                </label>

                <label
                  onClick={() => setPaymentChoice("full")}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition text-left flex flex-col justify-between ${
                    paymentChoice === "full"
                      ? "border-amber-400 bg-amber-50/60 shadow-xs"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Pay Full 100%</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentChoice === "full"}
                      onChange={() => setPaymentChoice("full")}
                      className="accent-amber-500"
                    />
                  </div>
                  <div className="text-xs font-black text-slate-900">₹{finalPayable} Now</div>
                  <div className="text-[10px] text-emerald-600 font-bold">Extra ₹50 UPI Cashback</div>
                </label>

                <label
                  onClick={() => setPaymentChoice("driver")}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition text-left flex flex-col justify-between ${
                    paymentChoice === "driver"
                      ? "border-amber-400 bg-amber-50/60 shadow-xs"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Pay Cash to Driver</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentChoice === "driver"}
                      onChange={() => setPaymentChoice("driver")}
                      className="accent-amber-500"
                    />
                  </div>
                  <div className="text-xs font-black text-slate-900">₹0 Advance</div>
                  <div className="text-[10px] text-slate-400">Pay entire sum during ride</div>
                </label>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Trip Fare:</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Chauffeur &amp; Fuel Allowance:</span>
                <span className="text-emerald-600 font-bold">FREE (Included)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                <span>Total Trip Fare:</span>
                <span className="text-amber-600">₹{finalPayable}</span>
              </div>
            </div>

            {/* Action Submit Button in YELLOW */}
            <button
              type="submit"
              disabled={bookingStatus === "processing"}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 text-base font-black shadow-lg shadow-amber-400/25 hover:shadow-xl hover:shadow-amber-400/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-amber-300"
            >
              {bookingStatus === "processing" ? (
                <span>Confirming Your Ride...</span>
              ) : (
                <>
                  <span>
                    {paymentChoice === "advance"
                      ? `CONFIRM & PAY ₹${advanceToken} TOKEN`
                      : paymentChoice === "full"
                      ? `PAY ₹${finalPayable} & CONFIRM`
                      : "CONFIRM CAB BOOKING"}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};