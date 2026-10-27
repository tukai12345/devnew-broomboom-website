"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Lightbulb,
  Clock,
  Car,
} from "lucide-react";
import { CityServiceInfo } from "@/data/cityServicesData";
import { getServiceContentData } from "@/data/serviceContentData";

interface ServiceContentSectionProps {
  serviceId: string;
  cityData: CityServiceInfo;
}

export const ServiceContentSection: React.FC<ServiceContentSectionProps> = ({
  serviceId,
  cityData,
}) => {
  const content = getServiceContentData(serviceId, cityData);

  return (
    <section className="py-8 sm:py-12 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Editorial Content Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
          
          {/* Section Header */}
          <div className="pb-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-amber-400 p-0.5 shadow-sm shrink-0">
                <img src="/logo.png" alt="BroomBoom Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {content.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-3xl leading-relaxed">
                  {content.subtitle}
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/70 shrink-0">
              <Car className="w-4 h-4 text-amber-500" />
              <span>{cityData.cityName} • Verified BroomBoom Fleet</span>
            </div>
          </div>

          {/* Section 1: Intro Story & Primary Image */}
          <div className="pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {content.introParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {/* Highlights 3-Pill Grid */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {content.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 mb-1">
                      <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200/90 group">
                <img
                  src={content.heroImage.url}
                  alt={content.heroImage.alt}
                  className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                {content.heroImage.badgeText && (
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-black uppercase tracking-wider shadow-sm border border-white/10">
                    {content.heroImage.badgeText}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 text-white">
                  <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span>{content.heroImage.alt}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 2: Detailed Subsections with Bullet Points */}
          <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.subsections.map((sub, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    {sub.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {sub.content}
                  </p>
                </div>

                {sub.bulletPoints && (
                  <ul className="space-y-2 pt-3 border-t border-slate-200/70">
                    {sub.bulletPoints.map((bp, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Section 3: Secondary Image & Travel Tips Callout */}
          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Secondary Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 group">
                <img
                  src={content.secondaryImage.url}
                  alt={content.secondaryImage.alt}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                {content.secondaryImage.badgeText && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                    {content.secondaryImage.badgeText}
                  </div>
                )}
              </div>
            </div>

            {/* Travel Tips Callout Box */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/90 via-amber-50/50 to-orange-50/40 border border-amber-200/80">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 shadow-xs">
                    <Lightbulb className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                      BroomBoom Traveler Tips — {cityData.cityName}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Essential advice for a hassle-free journey
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed mt-4">
                  {content.travelTips?.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0 border border-amber-200 shadow-2xs">
                        {idx + 1}
                      </span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

