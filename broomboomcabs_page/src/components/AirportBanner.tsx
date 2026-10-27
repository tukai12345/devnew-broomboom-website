"use client";

import React from "react";
import { Plane, ArrowRight, CheckCircle2 } from "lucide-react";

interface AirportBannerProps {
  onBookAirport: () => void;
}

export const AirportBanner: React.FC<AirportBannerProps> = ({ onBookAirport }) => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-amber-500/20">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Never Miss a Flight with{" "}
                <span className="text-amber-400">100% On-Time Cab Pickup</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Direct doorstep to terminal drop and hassle-free arrivals. Our system monitors flight schedules live, adjusting pickup times if your flight is delayed.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { title: "45 Mins Free Wait", desc: "No hurry after baggage" },
                  { title: "Flight Tracking", desc: "Auto time adjustment" },
                  { title: "Zero Night Surge", desc: "Fixed transparent fare" },
                  { title: "Chauffeured Meet", desc: "Assistance with luggage" },
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs"
                  >
                    <div className="text-xs font-extrabold text-amber-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      {feat.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{feat.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <div className="bg-slate-900/80 border border-amber-400/30 p-5 rounded-2xl backdrop-blur-md w-full sm:w-auto text-center space-y-3">
                <div className="text-xs font-semibold text-slate-300">
                  Airport Transfers Starting At
                </div>
                <div className="text-3xl font-black text-amber-400">
                  ₹599 <span className="text-xs font-normal text-slate-300">all-inclusive</span>
                </div>
                <button
                  onClick={onBookAirport}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:from-amber-300 hover:to-yellow-300 text-sm font-black transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Book Airport Cab</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
