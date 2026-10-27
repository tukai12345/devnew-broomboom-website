"use client";

import React from "react";
import {
  ShieldCheck,
  Receipt,
  Clock,
  UserCheck,
  HeartHandshake,
  Sparkles,
  PhoneCall,
  CheckCircle2
} from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Receipt,
      title: "Zero Hidden Charges",
      description: "Toll taxes, state entry taxes, driver allowance, and GST are shown upfront. No last minute driver disputes.",
      badge: "100% Transparent",
      color: "text-amber-600 bg-amber-100/80 border-amber-300",
      bgGradient: "from-white via-[#fffdf7] to-amber-50/90 border-amber-200/90",
    },
    {
      icon: Clock,
      title: "On-Time Arrival Guarantee",
      description: "Our chauffeurs arrive at your pickup location 15 minutes before scheduled departure or get ₹100 instant refund credit.",
      badge: "Punctuality Promise",
      color: "text-emerald-700 bg-emerald-100/80 border-emerald-300",
      bgGradient: "from-white via-[#fafefb] to-emerald-50/90 border-emerald-200/90",
    },
    {
      icon: UserCheck,
      title: "Police-Verified Drivers",
      description: "Every driver undergoes strict background verification, commercial license check, and highway safety training.",
      badge: "Verified Chauffeurs",
      color: "text-blue-700 bg-blue-100/80 border-blue-300",
      bgGradient: "from-white via-[#fafcff] to-sky-50/90 border-sky-200/90",
    },
    {
      icon: ShieldCheck,
      title: "Sanitized & AC Guaranteed",
      description: "Daily vehicle maintenance audits with working chilled AC and spotless clean interiors for supreme comfort.",
      badge: "Hygiene Seal",
      color: "text-amber-800 bg-amber-100/80 border-amber-300",
      bgGradient: "from-white via-[#fffefa] to-yellow-50/90 border-yellow-200/90",
    },
    {
      icon: HeartHandshake,
      title: "Free Cancellation up to 6 Hrs",
      description: "Change in plans? Cancel effortlessly with zero penalty charges and instant refund back to your original source.",
      badge: "Zero Penalty",
      color: "text-rose-700 bg-rose-100/80 border-rose-300",
      bgGradient: "from-white via-[#fffbfc] to-rose-50/90 border-rose-200/90",
    },
    {
      icon: PhoneCall,
      title: "24x7 Dedicated Trip Support",
      description: "Dedicated on-trip control room assistance to help you with route guidance, SOS emergencies, or language translation.",
      badge: "Always Online",
      color: "text-purple-700 bg-purple-100/80 border-purple-300",
      bgGradient: "from-white via-[#fbfaff] to-purple-50/90 border-purple-200/90",
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-[#f8fafc] via-[#fffbf0] to-[#fef8e7] border-t border-amber-200/60">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <img src="/logo.png" alt="BroomBoom" className="w-8 h-8 rounded-full object-contain shadow-xs" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
              The BroomBoom Promise
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Millions Trust BroomBoom for Outstation &amp; Airport Cabs
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            We eliminate the anxiety of travel with assured car models, professional chauffeurs, and upfront pricing.
          </p>
        </div>

        {/* 6 Feature Grid with vivid, distinct colorful cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-6 rounded-2xl border bg-gradient-to-br ${pillar.bgGradient} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pillar.color} group-hover:scale-110 transition-transform shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 border border-slate-200 shadow-2xs text-slate-700">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
