"use client";

import React from "react";
import { Clock, Check, ArrowRight } from "lucide-react";
import { RENTAL_PACKAGES, RentalPackage } from "@/data/cabsData";

interface RentalPackagesProps {
  onSelectPackage: (pkg: RentalPackage) => void;
}

export const RentalPackages: React.FC<RentalPackagesProps> = ({ onSelectPackage }) => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2.5 border border-amber-300">
            <img src="/logo.png" alt="BroomBoom Rentals" className="w-4 h-4 rounded-full object-contain" />
            <span>Flexible City Packages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hourly Car Rentals in Your City
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Keep the car and chauffeur with you as long as you need. Stop anywhere, wait anytime.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RENTAL_PACKAGES.map((pkg) => {
            const isPopular = pkg.id === "pkg-8-80";

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? "border-amber-400 shadow-elevated ring-2 ring-amber-400/30"
                    : "border-slate-200 shadow-sm hover:shadow-card"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    {pkg.duration}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    {pkg.km}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1 mb-4">
                    {pkg.idealFor}
                  </div>

                  <div className="py-3 border-y border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Hatchback:</span>
                      <strong className="text-slate-900">₹{pkg.basePrice}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Prime Sedan:</span>
                      <strong className="text-slate-900">₹{pkg.sedanPrice}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Family SUV:</span>
                      <strong className="text-slate-900">₹{pkg.suvPrice}</strong>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Multiple stops permitted</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Chauffeur & fuel included</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Zero cancellation fees</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wide transition flex items-center justify-center gap-1.5 ${
                      isPopular
                        ? "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md shadow-amber-400/25"
                        : "bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-slate-950 border border-slate-200"
                    }`}
                  >
                    <span>Select {pkg.duration} Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
