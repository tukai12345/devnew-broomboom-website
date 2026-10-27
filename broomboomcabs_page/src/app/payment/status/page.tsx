"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  Car,
  User,
  Phone,
  RotateCw,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { api, CashfreeStatusResponse } from "@/services/api";
import { triggerCashfreePayment } from "@/utils/cashfree";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryBookingId = searchParams.get("bookingId") || searchParams.get("booking_id") || "";
  const queryOrderId = searchParams.get("order_id") || "";

  const [bookingId, setBookingId] = useState(queryBookingId);
  const [loading, setLoading] = useState(true);
  const [retryingPayment, setRetryingPayment] = useState(false);
  const [statusData, setStatusData] = useState<CashfreeStatusResponse | null>(null);
  const [localBooking, setLocalBooking] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // If bookingId wasn't passed directly, try finding the latest pending booking in localStorage
  useEffect(() => {
    if (!bookingId && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("broomboom_user_bookings");
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list) && list.length > 0) {
            setBookingId(list[0].bookingId);
          }
        }
      } catch {}
    }
  }, [bookingId]);

  // Load local booking data for fallback preview details
  useEffect(() => {
    if (typeof window !== "undefined" && bookingId) {
      try {
        const stored = localStorage.getItem("broomboom_user_bookings");
        if (stored) {
          const list = JSON.parse(stored);
          const match = list.find((b: any) => b.bookingId === bookingId);
          if (match) setLocalBooking(match);
        }
      } catch {}
    }
  }, [bookingId]);

  const verifyPayment = async (targetId: string) => {
    if (!targetId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.checkPaymentStatus(targetId);
      setStatusData(res);

      // If backend confirms payment is successful, update localStorage status
      if (res.paymentStatus === "SUCCESS" && typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("broomboom_user_bookings");
          if (stored) {
            const list = JSON.parse(stored);
            const updated = list.map((b: any) => {
              if (b.bookingId === targetId) {
                return {
                  ...b,
                  status: "CONFIRMED",
                  amountPaid: res.paidAmount || b.amountPaid,
                  remainingAmount: res.dueFare !== undefined ? res.dueFare : b.remainingAmount,
                  paymentMode: res.paymentMethod ? `Paid via ${res.paymentMethod}` : b.paymentMode,
                };
              }
              return b;
            });
            localStorage.setItem("broomboom_user_bookings", JSON.stringify(updated));
            const updatedMatch = updated.find((b: any) => b.bookingId === targetId);
            if (updatedMatch) setLocalBooking(updatedMatch);
          }
        } catch {}
      }
    } catch (err: any) {
      console.warn("Status verification notice:", err);
      setErrorMessage(err?.message || "Could not reach payment verification server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) {
      verifyPayment(bookingId);
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const handleCopyId = () => {
    if (bookingId) {
      navigator.clipboard.writeText(bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRetryPayment = async () => {
    if (!bookingId) return;
    setRetryingPayment(true);
    try {
      const returnUrl = `${window.location.origin}/payment/status?bookingId=${bookingId}&order_id={order_id}`;
      const order = await api.createCashfreeOrder({
        bookingId,
        returnUrl,
      });

      if (order?.paymentSessionId) {
        await triggerCashfreePayment({
          paymentSessionId: order.paymentSessionId,
          environment: order.environment || "sandbox",
          redirectTarget: "_self",
        });
      } else {
        alert("Could not generate a new Cashfree checkout session. Please check backend connection.");
        setRetryingPayment(false);
      }
    } catch (err: any) {
      alert(`Retry payment error: ${err?.message || "Something went wrong"}`);
      setRetryingPayment(false);
    }
  };

  const isSuccess =
    statusData?.paymentStatus === "SUCCESS" ||
    localBooking?.status === "CONFIRMED";

  const isPending =
    statusData?.paymentStatus === "PENDING" ||
    (!statusData && !errorMessage);

  const displayBooking = statusData?.booking || localBooking;
  const fare = statusData?.fare || displayBooking?.totalAmount || displayBooking?.fare || 0;
  const paid = statusData?.paidAmount || displayBooking?.amountPaid || displayBooking?.advance || 0;
  const due =
    statusData?.dueFare !== undefined
      ? statusData.dueFare
      : displayBooking?.remainingAmount !== undefined
      ? displayBooking.remainingAmount
      : Math.max(0, fare - paid);

  return (
    <div className="min-h-screen bg-[#edf2f7] text-slate-800 flex flex-col font-sans">
      <Navbar onMyBookingsClick={() => setIsMyBookingsOpen(true)} />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-12">
        {loading ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center animate-spin">
              <RotateCw className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Verifying Payment with Cashfree...
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Please wait while our backend connects with Cashfree to verify transaction status for Booking ID{" "}
              <strong className="text-slate-900 font-mono">{bookingId || "..."}</strong>.
            </p>
          </div>
        ) : isSuccess ? (
          /* ================= SUCCESS STATE ================= */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/80 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-3">
              <div className="relative w-20 h-20 mx-auto">
                <img
                  src="/logo.png"
                  alt="BroomBoom Cabs"
                  className="w-20 h-20 rounded-full object-contain shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                <span>Cashfree Verified • Payment Successful</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Booking Confirmed!
              </h1>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500">
                <span>Booking ID:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  {bookingId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  title="Copy Booking ID"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Fare</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">₹{fare.toLocaleString("en-IN")}</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Amount Paid (Cashfree)</div>
                <div className="text-lg font-black text-emerald-700 mt-0.5">₹{paid.toLocaleString("en-IN")}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Online Token Paid</div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Balance to Driver</div>
                <div className="text-lg font-black text-amber-900 mt-0.5">
                  {due <= 0 ? "₹0 (Fully Paid)" : `₹${due.toLocaleString("en-IN")}`}
                </div>
                <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Pay via Cash/UPI at ride end</div>
              </div>
            </div>

            {/* Trip Details Card */}
            {displayBooking && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-200">
                  Trip & Passenger Details
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 font-semibold">Pickup Location</div>
                      <div className="font-bold text-slate-900">
                        {displayBooking.pickupAddress || displayBooking.fromCity || "Pickup Location"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 font-semibold">Drop Location</div>
                      <div className="font-bold text-slate-900">
                        {displayBooking.dropAddress || displayBooking.toCity || "Drop Location"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 font-semibold">Date & Time</div>
                      <div className="font-bold text-slate-900">
                        {displayBooking.pickupDate} {displayBooking.pickupTime ? `at ${displayBooking.pickupTime}` : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Car className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 font-semibold">Vehicle</div>
                      <div className="font-bold text-slate-900">
                        {displayBooking.vehicleCategory || displayBooking.cabName || "Cab Vehicle"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{displayBooking.customerName || displayBooking.traveller?.name || "Passenger"}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>+91 {displayBooking.customerMobile || displayBooking.traveller?.phone || ""}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Chauffeur WhatsApp / SMS Notice */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 text-xs text-slate-700 flex items-start gap-3">
              <span className="text-xl">🚕</span>
              <div>
                <strong className="text-slate-900 block font-bold mb-0.5">
                  Driver & Vehicle details on the way!
                </strong>
                Chauffeur contact details and car registration number will be SMSed & WhatsApped to your registered mobile 2 hours prior to scheduled departure.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsMyBookingsOpen(true)}
                className="flex-1 py-3.5 px-4 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 transition text-center cursor-pointer shadow-xs"
              >
                View My Bookings
              </button>

              <Link
                href="/fleet"
                className="flex-1 py-3.5 px-4 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 transition text-center shadow-xs"
              >
                Book Another Cab
              </Link>

              <Link
                href="/"
                className="flex-1 py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition text-center shadow-md shadow-amber-400/20 border border-amber-300"
              >
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          /* ================= PENDING / FAILED / RETRY STATE ================= */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/80 space-y-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-12 h-12 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-wider border border-amber-200">
                <span>Payment Status: {statusData?.paymentStatus || "Pending Verification"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Cashfree Payment Verification
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                {errorMessage ||
                  "Your payment session was initiated. If you completed payment, click Refresh Status. If the transaction was not finished, you can retry checkout below."}
              </p>
              {bookingId && (
                <div className="text-xs text-slate-400 font-mono font-bold">
                  Booking ID: {bookingId}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center max-w-md mx-auto">
              <button
                type="button"
                onClick={() => verifyPayment(bookingId)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>Refresh Status</span>
              </button>

              <button
                type="button"
                onClick={handleRetryPayment}
                disabled={retryingPayment}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-amber-400/20 border border-amber-300 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {retryingPayment ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Opening Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Retry Payment with Cashfree</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Global My Bookings Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}

