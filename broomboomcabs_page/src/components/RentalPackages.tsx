"use client";

import React, { useState, useEffect } from "react";
import { Clock, Check, ArrowRight, ShieldCheck, Sparkles, Car } from "lucide-react";
import { RENTAL_PACKAGES, RentalPackage } from "@/data/cabsData";
import { api } from "@/services/api";

interface RentalPackagesProps {
  onSelectPackage: (pkg: RentalPackage) => void;
}

export const RentalPackages: React.FC<RentalPackagesProps> = ({ onSelectPackage }) => {
  const [packages, setPackages] = useState<RentalPackage[]>(RENTAL_PACKAGES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadPackages = async () => {
    try {
      const dynamicPkgs = await api.getDynamicRentalPackages();
      if (Array.isArray(dynamicPkgs) && dynamicPkgs.length > 0) {
        setPackages(dynamicPkgs);
      }
    } catch (err) {
      console.warn("Unable to fetch dynamic rental packages, using cached:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();

    // Listen for real-time updates from admin actions in other tabs or local storage
    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === "broomboom_cached_rental_packages" ||
        e.key === "broomboom_rental_fares" ||
        e.key === "broomboom_rental_packages_updated"
      ) {
        loadPackages();
      }
    };

    const handleCustomUpdate = () => {
      loadPackages();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("broomboom_rental_fares_updated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("broomboom_rental_fares_updated", handleCustomUpdate);
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2.5 border border-amber-300">
            <img src="/logo.png" alt="BroomBoom Rentals" className="w-4 h-4 rounded-full object-contain" />
            <span>Live City Hourly Packages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hourly Car Rentals with Chauffeur
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Keep the vehicle and chauffeur with you as long as you need. Unlimited stops, zero surge, and instant transparent billing across India.
          </p>
        </div>

        {/* Packages Cards Grid - Responsive from 1 to 5+ columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {packages.map((pkg) => {
            const is1Hr = pkg.packageHours === 1 || pkg.duration.startsWith("1 ");
            const isPopular = pkg.id === "pkg-8-80" || pkg.duration.startsWith("8 ");

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                  isPopular
                    ? "border-amber-400 shadow-elevated ring-2 ring-amber-400/30"
                    : is1Hr
                    ? "border-purple-300 shadow-sm ring-1 ring-purple-300/40"
                    : "border-slate-200 shadow-sm hover:shadow-card"
                }`}
              >
                {/* Popular or New Tag */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}
                {is1Hr && !isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6f42c1] text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Quick Transit</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {pkg.duration}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {pkg.km}
                    </span>
                  </div>

                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    ₹{pkg.basePrice.toLocaleString("en-IN")}
                    <span className="text-xs font-medium text-slate-400 ml-1">starting</span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium mt-1 mb-3 line-clamp-2">
                    {pkg.idealFor}
                  </p>

                  {/* Selective Car Category Pricing (Sedan, SUV, SUV+, 13, 17, 25 Seater) */}
                  <div className="py-2.5 border-y border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Sedan (4 Seater):
                      </span>
                      <strong className="text-slate-900">₹{pkg.sedanPrice.toLocaleString("en-IN")}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        SUV (6 Seater):
                      </span>
                      <strong className="text-slate-900">₹{pkg.suvPrice.toLocaleString("en-IN")}</strong>
                    </div>

                    {pkg.suvPlusPrice ? (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          SUV+ (7 Seater):
                        </span>
                        <strong className="text-slate-900">₹{pkg.suvPlusPrice.toLocaleString("en-IN")}</strong>
                      </div>
                    ) : null}

                    {pkg.traveller13Price ? (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Traveller 13 Seater:
                        </span>
                        <strong className="text-slate-900">₹{pkg.traveller13Price.toLocaleString("en-IN")}</strong>
                      </div>
                    ) : null}

                    {pkg.traveller17Price ? (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          Traveller 17 Seater:
                        </span>
                        <strong className="text-slate-900">₹{pkg.traveller17Price.toLocaleString("en-IN")}</strong>
                      </div>
                    ) : null}

                    {pkg.traveller25Price ? (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Traveller 25 Seater:
                        </span>
                        <strong className="text-slate-900">₹{pkg.traveller25Price.toLocaleString("en-IN")}</strong>
                      </div>
                    ) : null}
                  </div>

                  {/* Highlights */}
                  <div className="mt-3 space-y-1 text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Multiple stops permitted</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Chauffeur &amp; fuel included</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>100% Free cancellation</span>
                    </div>
                  </div>
                </div>

                {/* Select Button */}
                <div className="mt-4 pt-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wide transition flex items-center justify-center gap-1.5 ${
                      isPopular
                        ? "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md shadow-amber-400/25"
                        : "bg-slate-900 hover:bg-amber-400 text-white hover:text-slate-950 shadow-sm"
                    }`}
                  >
                    <span>Book {pkg.duration}</span>
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
