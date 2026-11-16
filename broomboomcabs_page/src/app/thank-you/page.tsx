"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowDownToLine } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center max-w-3xl mx-auto w-full">
        {/* Yellow Circle with Checkmark */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[5px] border-[#FBBF24] flex items-center justify-center mb-8 shadow-sm">
          <Check className="w-12 h-12 sm:w-14 sm:h-14 text-slate-900 stroke-[3.5]" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="text-[#FBBF24]">Thank you for </span>
          <span className="text-slate-900">Your Request</span>
        </h1>

        {/* Description */}
        <p className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
          Our team will get in touch with you soon regarding your request. Please
          download the BroomBoom Pilot app now to complete the verification process.
        </p>

        {/* Download App Button */}
        <div>
          <a
            href="https://play.google.com/store/apps/details?id=com.broomboom.pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-900 font-bold px-8 py-3.5 rounded-lg shadow-sm hover:shadow transition-all text-base active:scale-95"
          >
            <ArrowDownToLine className="w-5 h-5 stroke-[2.5]" />
            <span>Download App</span>
          </a>
        </div>
      </main>
    </div>
  );
}
