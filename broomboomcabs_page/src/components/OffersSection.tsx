"use client";

import React, { useState, useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Percent,
  Sparkles,
} from "lucide-react";

interface OffersSectionProps {
  onApplyPromo?: (code: string) => void;
}

type OfferCategory = "All" | "Outstation" | "Airport" | "Hourly Rentals";

interface OfferItem {
  id: string;
  category: string;
  tab: OfferCategory;
  image: string;
  badge?: string;
  title: string;
  validity: string;
  code: string;
  banks?: string[];
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onApplyPromo }) => {
  const [activeTab, setActiveTab] = useState<OfferCategory>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs: OfferCategory[] = ["All", "Outstation", "Airport", "Hourly Rentals"];

  const offers: OfferItem[] = [
    {
      id: "cab-1",
      tab: "Outstation",
      category: "Outstation Cabs",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
      badge: "MEGA CAB SALE",
      title: "Outstation Cabs @ up to 25% OFF*",
      validity: "Ends Today",
      code: "BROOMFIRST",
      banks: ["DBS", "Federal Bank", "PNB", "RBL Bank"],
    },
    {
      id: "cab-2",
      tab: "Airport",
      category: "Airport Transfers",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
      badge: "AIRPORT SPECIAL",
      title: "Flat ₹150 OFF on All Airport Transfers",
      validity: "Valid till 31st Oct",
      code: "AIRPORT150",
      banks: ["HDFC Bank", "ICICI Bank", "Axis Bank"],
    },
    {
      id: "cab-3",
      tab: "Hourly Rentals",
      category: "Hourly Car Rentals",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
      badge: "ZERO SURGE",
      title: "Book Hourly Rental Cabs & Enjoy Zero Surge!",
      validity: "Valid all 7 days",
      code: "HOURLY100",
      banks: ["UPI & Cards", "Paytm", "GPay"],
    },
    {
      id: "cab-4",
      tab: "Outstation",
      category: "Outstation • Round Trips",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
      badge: "WEEKEND GETAWAY",
      title: "Flat ₹500 OFF on Outstation Round Trips!",
      validity: "Valid on Weekends",
      code: "GETAWAY500",
      banks: ["SBI Card", "Kotak", "Axis Bank"],
    },
    {
      id: "cab-5",
      tab: "Hourly Rentals",
      category: "Green EV Cabs",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
      badge: "ECO RIDES",
      title: "Save 15% on 100% Electric Eco Cabs",
      validity: "Valid till 15th Nov",
      code: "GOGREEN15",
      banks: ["BroomBoom Wallet", "UPI"],
    },
    {
      id: "cab-6",
      tab: "Airport",
      category: "Airport • Early Bird",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
      badge: "FIRST RIDE",
      title: "Flat ₹200 OFF on Your First BroomBoom Ride",
      validity: "New Users Only",
      code: "NEWBROOM",
      banks: ["All Major Banks", "UPI"],
    },
  ];

  const filteredOffers =
    activeTab === "All"
      ? offers
      : offers.filter((o) => o.tab === activeTab);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (onApplyPromo) onApplyPromo(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-12 sm:pt-14 pb-2.5 sm:pb-3.5 bg-gradient-to-b from-slate-50 via-amber-50/25 to-slate-50">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* OFFERS SECTION BOUNDARY (Rich Warm Amber Backdrop, Tight Spacing) */}
        <div className="bg-gradient-to-br from-[#fffdf5] via-[#fffbf2] to-[#fef6e0] rounded-3xl border border-amber-200/90 shadow-md p-3.5 sm:p-5 lg:p-6 relative transition-all">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-3 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Offers For You
            </h2>
          </div>

          {/* Cab Category Tabs & View All row */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-amber-200/70">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-amber-400 text-slate-950 border border-amber-300 shadow-sm font-black active:scale-95"
                        : "bg-white/90 text-slate-700 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/60"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* View All link */}
            <button
              type="button"
              onClick={() => setActiveTab("All")}
              className="text-amber-700 hover:text-amber-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors group"
            >
              <span>View All</span>
              <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 transition-transform group-hover:translate-x-0.5 shadow-xs">
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </button>
          </div>

          {/* Cards Carousel Container with Floating Next/Prev Arrows */}
          <div className="relative pt-3">
            
            {/* Left Scroll Arrow */}
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous offers"
              className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-amber-200/90 items-center justify-center text-amber-700 hover:text-amber-900 hover:scale-105 z-20 cursor-pointer transition-all"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Right Scroll Arrow */}
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next offers"
              className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-amber-200/90 items-center justify-center text-amber-700 hover:text-amber-900 hover:scale-105 z-20 cursor-pointer transition-all"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Scrollable Track */}
            <div
              ref={scrollRef}
              className="flex gap-3.5 sm:gap-4 overflow-x-auto scroll-smooth pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              {/* First 2 Offer Cards */}
              {filteredOffers.slice(0, 2).map((item) => {
                const isCopied = copiedCode === item.code;
                return (
                  <div
                    key={item.id}
                    className="w-[270px] sm:w-[310px] shrink-0 bg-white rounded-2xl border border-amber-100 hover:border-amber-400 shadow-xs hover:shadow-md transition-all p-3 sm:p-3.5 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Banner Image */}
                      <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                        {/* Overlay Tag */}
                        {item.badge && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                            {item.badge}
                          </div>
                        )}
                        {/* Partner bank footer strip inside banner */}
                        {item.banks && (
                          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs py-0.5 px-2 flex items-center justify-around text-[9px] font-bold text-slate-700 border-t border-slate-200/60">
                            {item.banks.map((b, i) => (
                              <span key={i} className="truncate">
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="mt-2.5">
                        <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider truncate">
                          {item.category}
                        </div>
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom validity & copy code */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.validity}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(item.code)}
                        className={`text-[10px] font-black px-2.5 py-1 rounded-md transition ${
                          isCopied
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
                        }`}
                      >
                        {isCopied ? "APPLIED" : item.code}
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Special "Explore Cab Offers" Card (Vibrant Amber Theme) */}
              <div className="w-[210px] sm:w-[230px] shrink-0 bg-gradient-to-br from-amber-400 via-amber-400 to-yellow-500 rounded-2xl border border-amber-300 shadow-md p-4 flex flex-col items-center justify-between text-center group">
                <div className="w-full flex flex-col items-center my-auto">
                  {/* Circular discount icon */}
                  <div className="w-14 h-14 rounded-full bg-white/90 border border-amber-200 flex items-center justify-center text-slate-950 mb-2.5 shadow-xs group-hover:scale-105 transition-transform">
                    <Percent className="w-7 h-7 stroke-[2.5]" />
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-950 leading-snug">
                    Explore Cab Offers
                  </h3>
                  <p className="text-[10px] font-bold text-slate-800 mt-1">
                    Save up to ₹1,500 on rides
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("All")}
                  className="w-full py-1.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs rounded-xl transition-colors text-center cursor-pointer shadow-sm active:scale-95"
                >
                  View all
                </button>
              </div>

              {/* Remaining Cab Offer Cards */}
              {filteredOffers.slice(2).map((item) => {
                const isCopied = copiedCode === item.code;
                return (
                  <div
                    key={item.id}
                    className="w-[270px] sm:w-[310px] shrink-0 bg-white rounded-2xl border border-amber-100 hover:border-amber-400 shadow-xs hover:shadow-md transition-all p-3 sm:p-3.5 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Banner Image */}
                      <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                        {/* Overlay Tag */}
                        {item.badge && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                            {item.badge}
                          </div>
                        )}
                        {/* Partner bank footer strip inside banner */}
                        {item.banks && (
                          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs py-0.5 px-2 flex items-center justify-around text-[9px] font-bold text-slate-700 border-t border-slate-200/60">
                            {item.banks.map((b, i) => (
                              <span key={i} className="truncate">
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="mt-2.5">
                        <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider truncate">
                          {item.category}
                        </div>
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom validity & copy code */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.validity}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(item.code)}
                        className={`text-[10px] font-black px-2.5 py-1 rounded-md transition ${
                          isCopied
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
                        }`}
                      >
                        {isCopied ? "APPLIED" : item.code}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};