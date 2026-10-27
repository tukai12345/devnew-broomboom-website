"use client";

import React from "react";
import { ArrowRight, Clock, Navigation } from "lucide-react";
import { POPULAR_ROUTES } from "@/data/cabsData";

interface PopularRoutesProps {
  onSelectRoute: (from: string, to: string) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onSelectRoute }) => {
  return (
    <section className="pt-4 sm:pt-6 pb-10 sm:pb-12 bg-gradient-to-b from-[#f8fafc] via-[#fffdf5] to-[#fef8e7] border-y border-amber-100/70">
      {/* Aligned width with search bar container (1380px) */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 sm:mb-8 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Popular Outstation Cab Routes
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              Guaranteed lowest one-way fares with doorstep pickup and verified
              highway drivers.
            </p>
          </div>

          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-black text-amber-700 hover:text-amber-800 transition-colors group"
          >
            <span>View All 500+ Routes</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Routes Grid - Full width 4 columns matching search bar bounds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {POPULAR_ROUTES.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {route.tag && (
                  <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-lg shadow-md border border-amber-300">
                    {route.tag}
                  </div>
                )}

                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-amber-300 mb-1">
                    {route.popularFor}
                  </div>
                  <div className="text-base sm:text-lg font-black truncate leading-snug">
                    {route.from} → {route.to}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col gap-5 flex-1 bg-gradient-to-b from-white to-amber-50/30">
                <div className="flex items-center justify-between text-[13px] text-slate-600 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-amber-500" />
                    {route.distance}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    {route.duration}
                  </span>
                </div>

                <button
                  onClick={() => onSelectRoute(route.from, route.to)}
                  className="mt-auto w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-sm hover:shadow-md border border-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.98] transition-all duration-200 group/btn cursor-pointer"
                >
                  <span>Explore Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="sm:hidden mt-10 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800"
          >
            <span>View All 500+ Routes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};