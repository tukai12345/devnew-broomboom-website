"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Star,
  Download,
  Zap,
  ShieldCheck,
  MapPin,
  Car,
  QrCode,
  Tag,
} from "lucide-react";
import { InstallAppModal } from "./InstallAppModal";

export const AppDownloadBanner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-8 sm:py-12 bg-slate-50/70">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main App Download Card Container */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0b101c] via-[#0f172a] to-[#1e293b] border border-white/10 p-6 sm:p-8 lg:p-10 text-white overflow-hidden shadow-xl">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Info & Actions */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                    <img src="/logo.png" alt="BroomBoom Logo" className="w-4 h-4 rounded-full object-contain" />
                    <span>Official Mobile App</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>4.8 Rating • 100K+ Downloads</span>
                  </div>
                </div>

                {/* Main Heading */}
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                    Book Cabs Faster & Cheaper on the{" "}
                    <span className="text-amber-400">BroomBoom App</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 max-w-xl leading-relaxed">
                    Enjoy live driver GPS tracking, instant outstation & airport bookings, 24x7 SOS safety, and an exclusive ₹200 discount on your first ride.
                  </p>
                </div>

                {/* App Features 3-Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <div className="font-extrabold text-xs text-white">Zero Surge Fare</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Fixed rates all 24 hours</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <div className="font-extrabold text-xs text-white">Live GPS Tracking</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Real-time driver location</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <div className="font-extrabold text-xs text-white">Safe & Sanitized</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Verified chauffeurs</div>
                    </div>
                  </div>
                </div>

                {/* Promo Code Strip */}
                <div className="p-3 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-between text-xs max-w-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-200">First App Ride Offer: Use code</span>
                    <span className="font-black text-amber-400 tracking-wider bg-slate-950/40 px-2 py-0.5 rounded border border-amber-400/30">
                      NEWBROOM
                    </span>
                  </div>
                  <span className="font-bold text-amber-300 hidden sm:inline">Flat ₹200 OFF</span>
                </div>

                {/* Download CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-400/25 active:scale-95 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Install BroomBoom App</span>
                  </button>

                  {/* Google Play */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.broomboom.customer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-2 transition active:scale-95 text-xs font-bold"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a2.036 2.036 0 0 1-.61-.956V2.77c0-.36.147-.706.61-.956zm11.3 11.303l2.25 2.25-11.45 6.55 9.2-8.8zm0-2.234l-9.2-8.8 11.45 6.55-2.25 2.25zm1.117 1.117l2.844-1.625a1.8 1.8 0 0 1 0 3.25l-2.844-1.625z" fill="#fff"/>
                    </svg>
                    <span>Google Play</span>
                  </a>

                  {/* App Store */}
                  <a
                    href="https://apps.apple.com/app/broomboom-cabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-2 transition active:scale-95 text-xs font-bold"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.03-.5 2.63-1.23z" fill="#fff"/>
                    </svg>
                    <span>App Store</span>
                  </a>
                </div>

              </div>

              {/* Right Column: Phone Mockup & QR Code */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-5">
                
                {/* Desktop QR Scan Box */}
                <div className="hidden sm:flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="p-2 bg-white rounded-xl shadow-md mb-2">
                    <svg className="w-24 h-24" viewBox="0 0 100 100">
                      <rect width="100" height="100" fill="white" />
                      <rect x="10" y="10" width="28" height="28" fill="#0f172a" rx="4" />
                      <rect x="15" y="15" width="18" height="18" fill="white" rx="2" />
                      <rect x="19" y="19" width="10" height="10" fill="#f59e0b" rx="2" />
                      <rect x="62" y="10" width="28" height="28" fill="#0f172a" rx="4" />
                      <rect x="67" y="15" width="18" height="18" fill="white" rx="2" />
                      <rect x="71" y="19" width="10" height="10" fill="#f59e0b" rx="2" />
                      <rect x="10" y="62" width="28" height="28" fill="#0f172a" rx="4" />
                      <rect x="15" y="67" width="18" height="18" fill="white" rx="2" />
                      <rect x="19" y="71" width="10" height="10" fill="#f59e0b" rx="2" />
                      <rect x="44" y="12" width="6" height="6" fill="#0f172a" />
                      <rect x="52" y="20" width="6" height="6" fill="#0f172a" />
                      <rect x="44" y="28" width="6" height="6" fill="#0f172a" />
                      <rect x="12" y="44" width="6" height="6" fill="#0f172a" />
                      <rect x="24" y="48" width="6" height="6" fill="#0f172a" />
                      <rect x="36" y="42" width="6" height="6" fill="#0f172a" />
                      <rect x="46" y="46" width="8" height="8" fill="#f59e0b" rx="1" />
                      <rect x="58" y="42" width="6" height="6" fill="#0f172a" />
                      <rect x="70" y="46" width="6" height="6" fill="#0f172a" />
                      <rect x="82" y="42" width="6" height="6" fill="#0f172a" />
                      <rect x="44" y="64" width="6" height="6" fill="#0f172a" />
                      <rect x="54" y="72" width="6" height="6" fill="#0f172a" />
                      <rect x="66" y="64" width="6" height="6" fill="#0f172a" />
                      <rect x="78" y="72" width="6" height="6" fill="#0f172a" />
                      <rect x="44" y="82" width="6" height="6" fill="#0f172a" />
                      <rect x="60" y="82" width="6" height="6" fill="#0f172a" />
                      <rect x="74" y="82" width="6" height="6" fill="#0f172a" />
                    </svg>
                  </div>
                  <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scan to Install</span>
                  </div>
                  <div className="text-[9px] text-slate-400">Direct on phone</div>
                </div>

                {/* Smartphone Device Mockup */}
                <div className="w-56 h-[340px] rounded-[2.5rem] bg-slate-950 border-4 border-slate-700/80 shadow-2xl p-2.5 flex flex-col justify-between shrink-0 relative overflow-hidden">
                  
                  {/* Phone Speaker Notch */}
                  <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto mb-2" />

                  {/* Mockup Screen Inside */}
                  <div className="flex-1 rounded-2xl bg-slate-900 p-2.5 flex flex-col justify-between text-[10px] border border-white/5">
                    
                    {/* Top App Header */}
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                        <div className="flex items-center gap-1.5">
                          <img
                            src="/logo.png"
                            alt="BroomBoom Logo"
                            className="w-5 h-5 rounded-full object-contain"
                          />
                          <span className="font-extrabold text-white text-[11px]">BroomBoom</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[8px]">
                          ONLINE
                        </span>
                      </div>

                      {/* Search Card inside Mockup */}
                      <div className="p-2 rounded-xl bg-white/10 border border-white/10 space-y-1.5 mb-2">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="truncate">Pickup: Current Location</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                          <div className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="truncate">Destination: Airport / Outstation</span>
                        </div>
                      </div>

                      {/* Ride options */}
                      <div className="space-y-1">
                        <div className="p-1.5 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-between text-white">
                          <span className="font-bold flex items-center gap-1">
                            <Car className="w-3 h-3 text-amber-400" /> Sedan AC
                          </span>
                          <span className="font-black text-amber-300">₹649</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white/5 flex items-center justify-between text-slate-400">
                          <span className="flex items-center gap-1">
                            <Car className="w-3 h-3 text-slate-400" /> SUV Ertiga
                          </span>
                          <span className="font-bold text-slate-300">₹999</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Button inside Mockup */}
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="w-full py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[10px] text-center shadow-xs"
                    >
                      Book BroomBoom Ride
                    </button>
                  </div>

                  {/* Phone Home Bar */}
                  <div className="w-20 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Global Install App Modal */}
      <InstallAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

