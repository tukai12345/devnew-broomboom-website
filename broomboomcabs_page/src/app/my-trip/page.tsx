"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wallet,
  ChevronDown,
  X,
  Phone,
  Tag,
  CheckCircle2,
  Clock,
  MapPin,
  Car,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { getStoredUser, removeStoredUser } from "@/utils/auth";
import { api } from "@/services/api";

interface TripItem {
  id: string;
  bookingId?: string;
  serviceType: string;
  dateStr: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | string;
  pickupAddress: string;
  dropAddress: string;
  fare?: number | string;
  amountPaid?: number | string;
  remainingAmount?: number | string;
  cabName?: string;
  driverName?: string;
  driverPhone?: string;
  carNo?: string;
  isUpcoming?: boolean;
}

export default function MyTripPage() {
  const router = useRouter();

  // Active Tab: "All Trips" | "Upcoming Trips" | "History"
  const [activeTab, setActiveTab] = useState<"All Trips" | "Upcoming Trips" | "History">("History");

  // User State
  const [currentUser, setCurrentUser] = useState<{ identifier: string; role: string; name?: string } | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Modals
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [couponsModalOpen, setCouponsModalOpen] = useState(false);
  const [detailsModalTrip, setDetailsModalTrip] = useState<TripItem | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Trips List
  const [trips, setTrips] = useState<TripItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync user authentication
  useEffect(() => {
    const user = getStoredUser();
    setCurrentUser(user);

    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch or retrieve bookings
  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true);
      const items: TripItem[] = [];

      // 1. Load from localStorage
      try {
        const stored = localStorage.getItem("broomboom_user_bookings");
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list)) {
            list.forEach((b: any) => {
              const isPast =
                b.status === "COMPLETED" ||
                b.status === "CANCELLED" ||
                (b.pickupDate && new Date(b.pickupDate).getTime() < Date.now());

              items.push({
                id: b.bookingId || b.id || `BB-${Math.random().toString(36).substring(2, 7)}`,
                bookingId: b.bookingId || b.id,
                serviceType: b.serviceType || (b.wayType === "round" ? "Outstation Round-Trip" : "Outstation One-Way"),
                dateStr: b.pickupDate
                  ? `${b.pickupDate} ${b.pickupTime || ""}`.trim()
                  : "02 Nov 2026 07:04 PM",
                status: b.status || "Pending",
                pickupAddress: b.pickupAddress || b.fromCity || "Kolkata, West Bengal 700029, India",
                dropAddress:
                  b.dropAddress ||
                  b.toCity ||
                  "Chandannagar Station Road, Last French Colony, Kolupukur Panchanantala, Chandannagar, West Bengal, India",
                fare: b.totalFare || b.fare || b.selectedBaseFare || 813,
                amountPaid: b.amountPaid || b.advanceAmount || 0,
                remainingAmount: b.remainingAmount || b.dueFare || b.totalFare || 813,
                cabName: b.cabName || b.cabCategory || "Sedan (Dzire / Etios)",
                driverName: b.driverName || "Assigned 1 hour prior to pickup",
                driverPhone: b.driverPhone || "+918240765499",
                carNo: b.carNo || "WB-02-XXXX",
                isUpcoming: !isPast,
              });
            });
          }
        }
      } catch (err) {
        console.error("Failed to read user bookings:", err);
      }

      // 2. Load from API if user phone is available
      const user = getStoredUser();
      const phone = user?.phone || user?.identifier;
      if (phone) {
        try {
          const backendList = await api.getUserBookings(phone);
          if (Array.isArray(backendList)) {
            backendList.forEach((b) => {
              if (!items.some((item) => item.bookingId === b.bookingId)) {
                items.push({
                  id: b.bookingId || b.id || `BBC-${Math.random().toString(36).substring(2, 7)}`,
                  bookingId: b.bookingId || b.id,
                  serviceType: b.serviceType || "Outstation One-Way",
                  dateStr: b.pickupDate ? `${b.pickupDate} ${b.pickupTime || ""}`.trim() : "Recent",
                  status: b.status || "Pending",
                  pickupAddress: b.pickupAddress || "Pickup Location",
                  dropAddress: b.dropAddress || "Drop Location",
                  fare: b.fare,
                  amountPaid: b.advance,
                  remainingAmount: b.dueFare,
                  cabName: b.vehicleCategory || "Sedan",
                  driverName: b.driverName,
                  driverPhone: b.driverNumber || (b as any).driverMobile,
                  carNo: b.carNo,
                  isUpcoming: b.status !== "COMPLETED" && b.status !== "CANCELLED",
                });
              }
            });
          }
        } catch (apiErr) {
          console.warn("Backend fetch failed, using stored bookings:", apiErr);
        }
      }

      // 3. If no bookings exist yet, display the default showcase trip from screenshot
      if (items.length === 0) {
        items.push({
          id: "BBC-8829472",
          bookingId: "order_2266929325_100544",
          serviceType: "Outstation One-Way",
          dateStr: "02 Nov 2026 07:04 PM",
          status: "Pending",
          pickupAddress: "Kolkata, West Bengal 700029, India",
          dropAddress:
            "Chandannagar Station Road, Last French Colony, Kolupukur Panchanantala, Chandannagar, West Bengal, India",
          fare: 813,
          amountPaid: 162,
          remainingAmount: 651,
          cabName: "Sedan (Dzire / Etios)",
          driverName: "Pilot will be assigned 1 hour before pickup",
          isUpcoming: false,
        });
      }

      setTrips(items);
      setIsLoading(false);
    };

    loadTrips();
  }, []);

  const handleLogout = () => {
    removeStoredUser();
    setCurrentUser(null);
    setUserDropdownOpen(false);
    router.push("/");
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  // Filter trips based on active tab
  const filteredTrips = trips.filter((trip) => {
    if (activeTab === "Upcoming Trips") {
      return trip.isUpcoming && trip.status !== "Cancelled";
    }
    if (activeTab === "History") {
      return !trip.isUpcoming || trip.status === "Pending" || trip.status === "Completed";
    }
    return true; // All Trips
  });

  const userName = currentUser?.name || "Partha Sarkar";

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 selection:bg-amber-100 selection:text-amber-900 flex flex-col font-sans">
      {/* 1. TOP NAVBAR (matching screenshot: White bar, circular yellow logo on left, wallet & user dropdown on right) */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Circular Yellow Logo on Left */}
          <Link
            href="/"
            aria-label="BroomBoom Home"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#FBBF24] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/logo.png"
                alt="BroomBoom Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Right Action Icons: Wallet & User Dropdown */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Wallet Button */}
            <button
              onClick={() => setWalletModalOpen(true)}
              aria-label="Wallet"
              className="p-1.5 text-slate-800 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition"
              title="BroomBoom Wallet"
            >
              <Wallet className="w-5 h-5 fill-slate-800 text-slate-800" />
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-amber-600 focus:outline-none py-1.5 px-2 rounded-lg transition"
              >
                <span>{userName}</span>
                <ChevronDown className="w-3.5 h-3.5 fill-current" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/my-trip"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition font-medium"
                  >
                    My Trip
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setCouponsModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition font-medium"
                  >
                    Coupons
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT BODY */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
          My Trips
        </h1>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-1">
          {(["All Trips", "Upcoming Trips", "History"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-5 py-2 rounded-md text-sm font-semibold transition-all shadow-sm ${
                  isActive
                    ? "bg-[#FEF3C7] text-amber-900 border border-amber-300"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Layout Grid: Trips List (Left) + Book A Ride Widget (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Trips (7-8 columns on lg) */}
          <div className="lg:col-span-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {activeTab}
            </h2>

            {isLoading ? (
              <div className="bg-white rounded-lg p-12 text-center border border-slate-200 shadow-sm">
                <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-slate-500 text-sm">Loading your trips...</p>
              </div>
            ) : filteredTrips.length === 0 ? (
              <div className="bg-white rounded-lg p-10 text-center border border-slate-200 shadow-sm">
                <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  No trips found in {activeTab}
                </h3>
                <p className="text-slate-500 text-sm mb-5">
                  You haven&apos;t taken any trips under this category yet.
                </p>
                <Link
                  href="/fleet"
                  className="inline-flex items-center gap-2 bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-900 font-semibold px-6 py-2.5 rounded-md text-sm shadow-sm transition"
                >
                  Book a Trip Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTrips.map((trip) => {
                  const isPending =
                    trip.status.toLowerCase() === "pending" ||
                    trip.status.toLowerCase() === "active";
                  const isConfirmed =
                    trip.status.toLowerCase() === "confirmed" ||
                    trip.status.toLowerCase() === "paid" ||
                    trip.status.toLowerCase() === "success";

                  return (
                    <div
                      key={trip.id}
                      className="bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
                    >
                      {/* Top Header: Badge, Date, Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                        <div className="flex items-center gap-3">
                          <span className="bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {trip.serviceType}
                          </span>
                          <span className="text-slate-500 text-xs sm:text-sm">
                            {trip.dateStr}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-semibold capitalize ${
                            isPending
                              ? "text-amber-500"
                              : isConfirmed
                              ? "text-emerald-600"
                              : "text-slate-600"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </div>

                      {/* Route Timeline with connected line */}
                      <div className="relative pl-6 space-y-4 mb-6">
                        {/* Connecting Line */}
                        <div className="absolute left-[7px] top-[10px] bottom-[10px] w-0.5 bg-slate-400"></div>

                        {/* Pickup Pin */}
                        <div className="relative flex items-start">
                          <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 bg-white"></span>
                          <p className="text-slate-900 text-sm sm:text-base font-semibold leading-snug">
                            {trip.pickupAddress}
                          </p>
                        </div>

                        {/* Drop Pin */}
                        <div className="relative flex items-start">
                          <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-slate-900"></span>
                          <p className="text-slate-900 text-sm sm:text-base font-semibold leading-snug">
                            {trip.dropAddress}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Action Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => setDetailsModalTrip(trip)}
                          className="bg-[#1E293B] hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-md transition shadow-sm active:scale-95"
                        >
                          View Details
                        </button>
                        <a
                          href="tel:+918240765499"
                          className="bg-[#475569] hover:bg-slate-600 text-white text-sm font-medium px-4 py-2 rounded-md transition shadow-sm active:scale-95"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: "Book A Ride Now" Sidebar Widget (4 columns on lg) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-slate-200 sticky top-24">
              {/* Graphic Banner: Mountains, Sun, Road & Yellow Car */}
              <div className="w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-3 relative">
                <svg
                  className="w-full h-auto max-h-[160px]"
                  viewBox="0 0 320 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Sky background */}
                  <rect width="320" height="160" rx="8" fill="#F8FAFC" />

                  {/* Sun / Pink Circle behind mountain */}
                  <circle cx="160" cy="65" r="28" fill="#F43F5E" opacity="0.85" />

                  {/* Left Mountain */}
                  <polygon
                    points="60,115 110,48 160,115"
                    fill="#334155"
                  />
                  <polygon
                    points="110,48 128,70 110,80 92,70"
                    fill="#475569"
                  />

                  {/* Right Mountain */}
                  <polygon
                    points="130,115 180,60 230,115"
                    fill="#1E293B"
                  />

                  {/* Round check badge on left */}
                  <g transform="translate(30, 48)">
                    <circle cx="14" cy="14" r="14" fill="#1E293B" />
                    <circle cx="14" cy="14" r="12" stroke="#FBBF24" strokeWidth="2" fill="none" />
                    <path
                      d="M9 14.5l3.5 3.5 7-7"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* Yellow Trees */}
                  <g transform="translate(205, 78)">
                    <circle cx="8" cy="8" r="5" fill="#EAB308" />
                    <line x1="8" y1="13" x2="8" y2="22" stroke="#78350F" strokeWidth="1.5" />
                    <circle cx="22" cy="6" r="6" fill="#F59E0B" />
                    <line x1="22" y1="12" x2="22" y2="22" stroke="#78350F" strokeWidth="1.5" />
                    <circle cx="34" cy="9" r="4.5" fill="#EAB308" />
                    <line x1="34" y1="13.5" x2="34" y2="22" stroke="#78350F" strokeWidth="1.5" />
                  </g>

                  {/* Road */}
                  <rect x="25" y="105" width="270" height="24" rx="12" fill="#E2E8F0" />
                  <line
                    x1="45"
                    y1="117"
                    x2="275"
                    y2="117"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />

                  {/* Yellow Car on Road */}
                  <g transform="translate(210, 94)">
                    {/* Car Body */}
                    <rect x="5" y="10" width="42" height="15" rx="3" fill="#FBBF24" />
                    <path
                      d="M12 10 L18 2 L34 2 L40 10 Z"
                      fill="#FBBF24"
                    />
                    {/* Windshields */}
                    <path
                      d="M14 9 L19 4 L26 4 L26 9 Z"
                      fill="#0F172A"
                    />
                    <path
                      d="M28 9 L28 4 L33 4 L37 9 Z"
                      fill="#0F172A"
                    />
                    {/* Roof Rack */}
                    <line x1="18" y1="1" x2="34" y2="1" stroke="#334155" strokeWidth="1.5" />
                    <line x1="21" y1="1" x2="21" y2="2.5" stroke="#334155" strokeWidth="1.5" />
                    <line x1="31" y1="1" x2="31" y2="2.5" stroke="#334155" strokeWidth="1.5" />
                    {/* Wheels */}
                    <circle cx="15" cy="24" r="5" fill="#1E293B" />
                    <circle cx="15" cy="24" r="2" fill="#94A3B8" />
                    <circle cx="37" cy="24" r="5" fill="#1E293B" />
                    <circle cx="37" cy="24" r="2" fill="#94A3B8" />
                    {/* Headlights */}
                    <circle cx="46" cy="15" r="1.5" fill="#FEF08A" />
                  </g>
                </svg>
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-slate-900 mt-4">
                Book A Ride Now
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Book an BroomBoom from your browser.
              </p>

              {/* Yellow Button */}
              <Link
                href="/fleet"
                className="bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-900 font-bold w-full py-3 rounded-md mt-5 text-center block transition shadow-sm active:scale-98"
              >
                Request a Ride
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 3. TRIP DETAILS MODAL */}
      {detailsModalTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDetailsModalTrip(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {detailsModalTrip.serviceType}
              </span>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                {detailsModalTrip.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Trip Details
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Booking ID: <span className="font-mono font-bold text-slate-800">{detailsModalTrip.bookingId || detailsModalTrip.id}</span>
            </p>

            {/* Route */}
            <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80 space-y-3 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Pickup Location
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {detailsModalTrip.pickupAddress}
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Drop Location
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {detailsModalTrip.dropAddress}
                </p>
              </div>
            </div>

            {/* Cab & Driver info */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-0.5">Vehicle</span>
                <span className="font-bold text-slate-800">{detailsModalTrip.cabName || "Sedan"}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-0.5">Schedule</span>
                <span className="font-bold text-slate-800">{detailsModalTrip.dateStr}</span>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="bg-amber-50/60 border border-amber-200/70 rounded-lg p-3.5 mb-5 space-y-2 text-sm">
              <div className="flex justify-between text-slate-700">
                <span>Total Fare:</span>
                <span className="font-bold text-slate-900">₹{detailsModalTrip.fare}</span>
              </div>
              {detailsModalTrip.amountPaid ? (
                <div className="flex justify-between text-emerald-700">
                  <span>Advance Paid:</span>
                  <span className="font-bold">₹{detailsModalTrip.amountPaid}</span>
                </div>
              ) : null}
              {detailsModalTrip.remainingAmount ? (
                <div className="flex justify-between text-slate-900 font-bold border-t border-amber-200/60 pt-2">
                  <span>Due to Driver:</span>
                  <span>₹{detailsModalTrip.remainingAmount}</span>
                </div>
              ) : null}
            </div>

            {/* Pilot Assistance info */}
            <div className="text-xs text-slate-600 bg-slate-100 p-3 rounded-lg mb-5 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Pilot and vehicle details are assigned 1 to 2 hours prior to journey. You will receive an SMS and WhatsApp update.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+918240765499"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm text-center transition flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Desk Support</span>
              </a>
              <button
                onClick={() => setDetailsModalTrip(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2.5 px-5 rounded-lg text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. WALLET MODAL */}
      {walletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 relative border border-slate-200">
            <button
              onClick={() => setWalletModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Wallet className="w-6 h-6 text-amber-600" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              BroomBoom Wallet
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Instant cashback &amp; seamless 1-click payments.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center mb-6">
              <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                Current Balance
              </span>
              <span className="text-3xl font-extrabold text-slate-900">
                ₹0.00
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 text-center">
              Recharge your wallet or earn cashback directly by downloading the BroomBoom Cabs mobile app.
            </p>

            <div className="space-y-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.broomboom.user"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-900 font-bold py-2.5 rounded-lg text-sm text-center transition"
              >
                Open in BroomBoom App
              </a>
              <button
                onClick={() => setWalletModalOpen(false)}
                className="block w-full text-slate-600 hover:text-slate-800 text-sm font-semibold py-2 text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. COUPONS MODAL */}
      {couponsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative border border-slate-200">
            <button
              onClick={() => setCouponsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold text-slate-900">
                Available Coupons
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Apply these promo codes at booking checkout for extra savings.
            </p>

            <div className="space-y-3 mb-6 max-h-72 overflow-y-auto">
              {[
                {
                  code: "BROOM20",
                  title: "Flat 20% Advance Discount",
                  desc: "Valid on outstation one-way and round trips.",
                },
                {
                  code: "BOOMKOLKATA",
                  title: "Save ₹150 on City Rides",
                  desc: "Valid for bookings in Kolkata & surrounding areas.",
                },
                {
                  code: "AIRPORT50",
                  title: "Flat ₹50 Airport Transfer",
                  desc: "Applicable on CCU Airport terminal pickups and drops.",
                },
              ].map((c) => (
                <div
                  key={c.code}
                  className="p-3.5 border border-dashed border-amber-300 bg-amber-50/50 rounded-lg flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="font-mono font-bold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded text-xs">
                      {c.code}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-500">{c.desc}</p>
                  </div>
                  <button
                    onClick={() => copyCouponCode(c.code)}
                    className="shrink-0 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
                  >
                    {copiedCoupon === c.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCouponsModalOpen(false)}
              className="w-full bg-[#1E293B] hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-sm transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
