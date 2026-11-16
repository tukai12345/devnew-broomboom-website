"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/services/api";

function CashfreePaymentSuccessContent() {
  const searchParams = useSearchParams();

  const queryOrderId =
    searchParams.get("order_id") ||
    searchParams.get("orderId") ||
    searchParams.get("booking_id") ||
    searchParams.get("bookingId") ||
    "";
  const queryStatus =
    searchParams.get("order_status") ||
    searchParams.get("status") ||
    "";
  const queryAmount =
    searchParams.get("order_amount") ||
    searchParams.get("amount") ||
    "";

  const [orderId, setOrderId] = useState<string>(queryOrderId);
  const [orderStatus, setOrderStatus] = useState<string>(queryStatus || "ACTIVE");
  const [orderAmount, setOrderAmount] = useState<string>(queryAmount || "813");

  useEffect(() => {
    // If not provided in URL, retrieve from stored user bookings
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("broomboom_user_bookings");
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list) && list.length > 0) {
            const latest = list[0];
            if (!queryOrderId) {
              setOrderId(latest.bookingId || latest.orderId || "order_2266929325_100544");
            }
            if (!queryStatus) {
              setOrderStatus(latest.status === "CONFIRMED" ? "PAID" : latest.status || "ACTIVE");
            }
            if (!queryAmount && (latest.amountPaid || latest.totalFare || latest.fare)) {
              setOrderAmount(String(latest.amountPaid || latest.totalFare || latest.fare));
            }
          }
        }
      } catch (err) {
        console.error("Failed to load local booking:", err);
      }
    }

    if (!orderId && !queryOrderId) {
      setOrderId("order_2266929325_100544");
    }
  }, [queryOrderId, queryStatus, queryAmount, orderId]);

  // Optional: check backend for real-time status update if orderId is available
  useEffect(() => {
    if (orderId && orderId !== "order_2266929325_100544") {
      api.checkPaymentStatus(orderId)
        .then((res) => {
          if (res) {
            if (res.paymentStatus) setOrderStatus(res.paymentStatus);
            if (res.paidAmount) setOrderAmount(String(res.paidAmount));
          }
        })
        .catch(() => {});
    }
  }, [orderId]);

  const isSuccess =
    orderStatus.toUpperCase() === "SUCCESS" ||
    orderStatus.toUpperCase() === "PAID" ||
    orderStatus.toUpperCase() === "CONFIRMED";

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center max-w-3xl mx-auto w-full">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
          <span className="text-[#FBBF24]">Payment </span>
          <span className="text-slate-900">
            {isSuccess ? "Successful" : "Pending"}
          </span>
        </h1>

        {/* Order Details */}
        <div className="space-y-1.5 text-base sm:text-lg text-slate-800 font-medium mb-8">
          <p>
            <span className="font-bold">Order Id:</span>{" "}
            <span className="text-slate-700">{orderId || "order_2266929325_100544"}</span>
          </p>
          <p>
            <span className="font-bold">Order Status:</span>{" "}
            <span className="text-slate-700 uppercase">{orderStatus}</span>
          </p>
          <p>
            <span className="font-bold">Order Amount:</span>{" "}
            <span className="text-slate-700">{orderAmount}</span>
          </p>
        </div>

        {/* Informative message */}
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-3">
          Your booking has been placed successfully. To view more details, please
          download our app or go to my trips section.
        </p>

        {/* Reservation Desk Contact */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          <span>
            For getting Pilot and Vehicle Details manually, Contact BroomBoom Reservation Desk,
          </span>
          <a
            href="tel:+918240765499"
            className="inline-flex items-center px-3 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-[#059669] text-white hover:bg-[#047857] transition shadow-sm align-middle"
          >
            Call us now.
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
          {/* My trips button */}
          <Link
            href="/my-trip"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-900 font-semibold px-8 py-3.5 rounded-lg shadow-sm hover:shadow transition-all text-base min-w-[170px]"
          >
            My trips
          </Link>

          {/* Google Play Badge button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.broomboom.user"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-lg border border-neutral-700 shadow-sm transition-all min-w-[170px]"
          >
            {/* Google Play icon */}
            <svg
              className="w-6 h-6 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.609 1.813a1.53 1.53 0 0 0-.36 1.054v18.266c0 .416.13.793.36 1.054l.056.054 10.224-10.224v-.235L3.665 1.76l-.056.054Z"
                fill="#00E5FF"
              />
              <path
                d="M17.3 15.421l-3.411-3.41v-.234l3.411-3.411.077.044 4.04 2.296c1.153.655 1.153 1.73 0 2.385l-4.04 2.296-.077.034Z"
                fill="#FFC400"
              />
              <path
                d="M13.889 12.011 3.609 22.187c.381.403 1.026.456 1.758.04l12.01-6.806-3.488-3.41Z"
                fill="#FF3A44"
              />
              <path
                d="M13.889 11.989 17.377 8.58 5.367 1.773C4.635 1.357 3.99 1.41 3.609 1.813l10.28 10.176Z"
                fill="#00E676"
              />
            </svg>
            <div className="text-left leading-tight">
              <span className="block text-[9px] tracking-wider uppercase text-neutral-300 font-medium">
                GET IT ON
              </span>
              <span className="block text-sm font-bold tracking-tight">
                Google Play
              </span>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}

export default function CashfreePaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <CashfreePaymentSuccessContent />
    </Suspense>
  );
}
