"use client";

import React from "react";
import { ShieldCheck, MapPin, Share2, AlertCircle, Phone, Lock } from "lucide-react";

export const SafetySection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <img src="/logo.png" alt="BroomBoom Shield" className="w-4 h-4 rounded-full object-contain" />
              <span>BroomBoom Safety Shield 2.0</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Your Safety is Non-Negotiable on Every Single Mile
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Whether you are travelling late night from the airport, embarking on an early morning highway trip, or booking for elderly parents, our 360° safety shield protects you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <Share2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Live Trip Sharing</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Share live route & cab speed with family on WhatsApp.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Emergency SOS Button</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Instant link with 24x7 response team and local emergency helpline.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Masked Phone Numbers</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Passenger phone numbers stay 100% private and protected.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Highway Night Support</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Active night patrol monitoring on key interstate routes.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Phone Mockup Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="BroomBoom" className="w-5 h-5 rounded-full object-contain" />
                  <span className="font-bold text-slate-200">BroomBoom Trip #BB-8924</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded">
                  GPS LIVE
                </span>
              </div>

              <div className="py-4 space-y-3">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Driver & Vehicle</div>
                  <div className="text-xs font-black text-white mt-0.5 flex items-center justify-between">
                    <span>Ramesh Verma (4.9 ★)</span>
                    <span className="text-sky-400 font-mono">WB 06 H 4921</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Maruti Suzuki Dzire (White)</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">ETA to Destination</div>
                  <div className="text-lg font-black text-amber-400 mt-0.5">
                    1 hr 42 mins <span className="text-xs text-slate-300 font-normal">(68 km left)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Ride Link</span>
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/40 text-xs font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>SOS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

