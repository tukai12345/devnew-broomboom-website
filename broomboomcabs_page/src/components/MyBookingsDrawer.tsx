"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Car, ShieldCheck, Phone, RefreshCw, Calendar, MapPin } from "lucide-react";
import { api, BackendBooking } from "@/services/api";

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DisplayBooking {
  id: string;
  car: string;
  route: string;
  date: string;
  time: string;
  status: string;
  amount: string;
  advance?: string;
  dueFare?: string;
  driver?: string;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");
  const [bookings, setBookings] = useState<DisplayBooking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserPhone, setCurrentUserPhone] = useState("");

  const loadBookings = async () => {
    setIsLoading(true);
    const combined: DisplayBooking[] = [];

    // 1. Get logged-in user phone
    let phone = "";
    try {
      const stored = localStorage.getItem("broomboom_user");
      if (stored) {
        const u = JSON.parse(stored);
        phone = u.phone || u.identifier || "";
        setCurrentUserPhone(phone);
      }
    } catch {}

    // 2. Fetch from BroomBoom Backend
    try {
      const targetPhone = searchQuery.trim() || phone;
      if (targetPhone) {
        const backendList = await api.getUserBookings(targetPhone);
        backendList.forEach((b) => {
          combined.push({
            id: b.bookingId || b.id || "BBC-BOOKING",
            car: `${b.vehicleCategory || "Sedan"} (${b.seater || 4} Seater)`,
            route: `${b.pickupAddress || "Pickup"} → ${b.dropAddress || "Destination"}`,
            date: b.pickupDate || "Scheduled Date",
            time: b.pickupTime || "10:00 AM",
            status: b.status || "Pending",
            amount: `₹${(b.fare || 0).toLocaleString("en-IN")}`,
            advance: b.advance ? `₹${b.advance.toLocaleString("en-IN")}` : undefined,
            dueFare: b.dueFare ? `₹${b.dueFare.toLocaleString("en-IN")}` : undefined,
            driver: b.driverName ? `${b.driverName} (${b.carNo || ""})` : "Driver Assigned 2 hrs prior",
          });
        });
      }
    } catch (err) {
      console.warn("Backend bookings fetch notice:", err);
    }

    // 3. Fallback / Merge with local storage bookings
    try {
      const localRaw = localStorage.getItem("broomboom_user_bookings");
      if (localRaw) {
        const localList = JSON.parse(localRaw);
        localList.forEach((lb: any) => {
          if (!combined.some((c) => c.id === lb.bookingId)) {
            combined.push({
              id: lb.bookingId || "BB-LOCAL",
              car: `${lb.cabName || lb.cabCategory || "Sedan"}`,
              route: `${lb.fromCity || lb.traveller?.pickupAddress || "Pickup"} → ${lb.toCity || "Destination"}`,
              date: lb.pickupDate || "Scheduled Date",
              time: lb.pickupTime || "10:00 AM",
              status: lb.status || "Confirmed",
              amount: `₹${(lb.totalAmount || 0).toLocaleString("en-IN")}`,
              advance: lb.amountPaid ? `₹${lb.amountPaid.toLocaleString("en-IN")}` : undefined,
              dueFare: lb.remainingAmount ? `₹${lb.remainingAmount.toLocaleString("en-IN")}` : undefined,
              driver: "Driver Assigned 2 hrs prior",
            });
          }
        });
      }
    } catch {}

    setBookings(combined);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isCompleted = (status: string) => {
    const s = status.toLowerCase();
    return s.includes("completed") || s.includes("done") || s.includes("finish");
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesTab = activeTab === "completed" ? isCompleted(b.status) : !isCompleted(b.status);
    if (!searchQuery.trim()) return matchesTab;
    const q = searchQuery.toLowerCase();
    return (
      matchesTab &&
      (b.id.toLowerCase().includes(q) ||
        b.route.toLowerCase().includes(q) ||
        b.car.toLowerCase().includes(q) ||
        b.status.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-amber-400 p-0.5 shadow-xs shrink-0">
              <img
                src="/logo.png"
                alt="BroomBoom Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">My Trips & Bookings</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Connected to BroomBoom Backend" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Live synchronized with BroomBoom backend database
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {/* Quick Lookup */}
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Mobile or Booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") loadBookings();
                }}
                className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="button"
              onClick={loadBookings}
              disabled={isLoading}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition"
              title="Refresh Bookings"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-amber-500" : ""}`} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === "upcoming"
                  ? "border-amber-500 text-amber-700 font-black"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>Upcoming / Active</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900">
                {bookings.filter((b) => !isCompleted(b.status)).length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === "completed"
                  ? "border-amber-500 text-amber-700 font-black"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>Completed</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700">
                {bookings.filter((b) => isCompleted(b.status)).length}
              </span>
            </button>
          </div>

          {/* Booking Cards */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <span className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <span>Syncing live trips from BroomBoom backend...</span>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400 space-y-2">
                <Car className="w-8 h-8 text-slate-300 mx-auto stroke-[1.5]" />
                <p className="font-bold text-slate-600">No {activeTab} trips found</p>
                <p className="text-[11px] text-slate-400">
                  {currentUserPhone
                    ? `No rides recorded under ${currentUserPhone}`
                    : "Enter your mobile number above to search your bookings"}
                </p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 hover:border-amber-300 transition"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                    <span className="font-mono font-bold text-amber-600">{booking.id}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        booking.status.toLowerCase() === "confirmed"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : booking.status.toLowerCase() === "pending"
                          ? "bg-amber-50 text-amber-900 border border-amber-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-xs font-black text-slate-900 flex items-start gap-1.5 leading-snug">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{booking.route}</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <Car className="w-3.5 h-3.5 text-slate-400" />
                      <span>{booking.car}</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{booking.date}</span>
                      </span>
                      <span>⏰ {booking.time}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Total / Advance:</div>
                      <div className="font-black text-slate-900 flex items-baseline gap-1">
                        <span>{booking.amount}</span>
                        {booking.advance && (
                          <span className="text-[10px] text-emerald-600 font-bold">
                            (Paid {booking.advance})
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href="tel:+918240765499"
                      className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold transition flex items-center gap-1 border border-amber-200 text-xs"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Help Desk</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
          <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>24x7 Trip Support Hotline: +91 8240765499</span>
          </div>
        </div>
      </div>
    </div>
  );
};
