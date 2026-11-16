"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface RouteTransitionLoaderProps {
  mode: "search-to-fleet" | "fleet-to-review";
  from?: string;
  to?: string;
  cabName?: string;
}

const SEARCH_STEPS = [
  "Searching verified BroomBoom cabs nearby...",
  "Calculating instant lowest route fares...",
  "Matching available sedans & SUVs for your route...",
  "Opening live fleet availability...",
];

const REVIEW_STEPS = [
  "Reserving selected vehicle...",
  "Locking in guaranteed pricing & inclusions...",
  "Preparing trip summary & refund options...",
  "Redirecting to booking confirmation...",
];

export const RouteTransitionLoader: React.FC<RouteTransitionLoaderProps> = ({
  mode,
  from,
  to,
  cabName,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);
  const steps = mode === "search-to-fleet" ? SEARCH_STEPS : REVIEW_STEPS;

  useEffect(() => {
    // Cycle status messages
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 450);

    // Progress bar fill
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return 94;
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 180);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [steps.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/85 backdrop-blur-md px-4 select-none animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-black/95 rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-[0_25px_70px_rgba(251,191,36,0.18)] text-center overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md ring-2 ring-amber-400/40 p-0.5 bg-black">
            <img
              src="/images/broomboom-brand-icon.png"
              alt="BroomBoom"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="text-left leading-tight">
            <div className="text-sm font-black text-white tracking-wide">
              BROOM<span className="text-amber-400">BOOM</span>
            </div>
            <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
              Safe &bull; Affordable &bull; Reliable
            </div>
          </div>
        </div>

        {/* Animated Car & Road Scene (Gif-style driving animation) */}
        <div className="relative w-full h-36 bg-gradient-to-b from-slate-800/40 to-slate-950/60 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-end p-2 mb-5">
          {/* Night Sky / Moving Speed Stars */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-3 left-10 w-1 h-1 bg-white rounded-full animate-ping" />
            <div className="absolute top-6 right-16 w-1 h-1 bg-amber-200 rounded-full animate-pulse" />
            <div className="absolute top-10 left-1/3 w-1.5 h-1.5 bg-white/70 rounded-full" />
          </div>

          {/* Wind Speed Lines */}
          <div className="absolute top-8 left-0 right-0 h-10 pointer-events-none overflow-hidden">
            <div className="absolute top-2 left-0 h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent animate-[roadDash_0.8s_linear_infinite]" />
            <div className="absolute top-5 left-10 h-0.5 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[roadDash_0.6s_linear_infinite]" />
            <div className="absolute top-8 left-4 h-0.5 w-12 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent animate-[roadDash_0.9s_linear_infinite]" />
          </div>

          {/* Animated Driving Cab */}
          <div className="relative mx-auto w-48 h-20 mb-1 z-10 animate-[carBounce_0.35s_ease-in-out_infinite_alternate]">
            {/* Headlight beam */}
            <div className="absolute right-[-38px] top-[40px] w-24 h-9 bg-gradient-to-r from-amber-300/60 via-amber-200/20 to-transparent clip-path-polygon rounded-r-full blur-[2px] pointer-events-none" />

            {/* Cab Body Vector SVG */}
            <svg
              viewBox="0 0 220 100"
              className="w-full h-full drop-shadow-[0_8px_16px_rgba(251,191,36,0.35)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roof Taxi Light */}
              <rect x="90" y="8" width="34" height="11" rx="3" fill="#FBBF24" stroke="#000" strokeWidth="2" />
              <rect x="93" y="10" width="28" height="7" rx="2" fill="#000" />
              <text x="96" y="16" fill="#FBBF24" fontSize="6" fontWeight="bold" fontFamily="sans-serif">TAXI</text>

              {/* Main Cab Chassis */}
              <path
                d="M20 54 L44 32 C48 27 54 24 62 23 L145 23 C154 23 162 28 167 36 L186 52 L206 55 C212 56 216 61 216 67 L216 75 C216 79 212 82 208 82 L185 82 C185 73 177 66 168 66 C158 66 151 73 151 82 L77 82 C77 73 69 66 60 66 C50 66 43 73 43 82 L16 82 C12 82 8 78 8 74 L8 63 C8 58 13 54 20 54 Z"
                fill="#FBBF24"
                stroke="#1E293B"
                strokeWidth="2.5"
              />

              {/* Aerodynamic Speed Decal Stripe */}
              <path
                d="M32 58 L195 58 L190 64 L28 64 Z"
                fill="#1E293B"
              />
              <path
                d="M48 60 L180 60 L176 62 L44 62 Z"
                fill="#F59E0B"
              />

              {/* Windows (Tinted glass) */}
              <path
                d="M63 27 L105 27 L105 50 L47 50 C44 50 42 48 43 45 L54 32 C56 29 59 27 63 27 Z"
                fill="#0F172A"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
              <path
                d="M112 27 L143 27 C148 27 153 30 156 34 L168 50 L112 50 Z"
                fill="#0F172A"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />

              {/* Window Glare reflection */}
              <path
                d="M70 29 L82 29 L68 47 L56 47 Z"
                fill="rgba(255,255,255,0.25)"
              />

              {/* Front Headlight */}
              <path
                d="M202 59 L215 62 L215 69 L200 68 Z"
                fill="#FEF08A"
                stroke="#EAB308"
                strokeWidth="1"
              />

              {/* Rear Taillight */}
              <rect x="8" y="60" width="6" height="10" rx="2" fill="#EF4444" />

              {/* Door Handles */}
              <rect x="94" y="54" width="8" height="2.5" rx="1" fill="#0F172A" />
              <rect x="135" y="54" width="8" height="2.5" rx="1" fill="#0F172A" />

              {/* Rear Wheel */}
              <g transform="translate(60, 82)">
                <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <circle cx="0" cy="0" r="8" fill="#CBD5E1" />
                {/* Spinning rim spokes */}
                <line x1="-7" y1="0" x2="7" y2="0" stroke="#475569" strokeWidth="2" className="animate-[spin_0.35s_linear_infinite] origin-center" />
                <line x1="0" y1="-7" x2="0" y2="7" stroke="#475569" strokeWidth="2" className="animate-[spin_0.35s_linear_infinite] origin-center" />
                <circle cx="0" cy="0" r="3" fill="#FBBF24" />
              </g>

              {/* Front Wheel */}
              <g transform="translate(168, 82)">
                <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <circle cx="0" cy="0" r="8" fill="#CBD5E1" />
                {/* Spinning rim spokes */}
                <line x1="-7" y1="0" x2="7" y2="0" stroke="#475569" strokeWidth="2" className="animate-[spin_0.35s_linear_infinite] origin-center" />
                <line x1="0" y1="-7" x2="0" y2="7" stroke="#475569" strokeWidth="2" className="animate-[spin_0.35s_linear_infinite] origin-center" />
                <circle cx="0" cy="0" r="3" fill="#FBBF24" />
              </g>
            </svg>

            {/* Exhaust puff smoke animation */}
            <div className="absolute left-[-12px] bottom-1 flex gap-1 items-center pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/30 animate-pulse" />
            </div>
          </div>

          {/* Animated Road Track */}
          <div className="relative w-full h-4 bg-slate-900 border-t border-slate-700 overflow-hidden">
            <div className="absolute inset-0 flex items-center gap-6 animate-[roadMove_0.45s_linear_infinite]">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-1 bg-amber-400/90 rounded-full shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Route Info Pill if available */}
        {(from || to || cabName) && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-amber-400/20 text-xs font-semibold text-slate-200 mb-3 max-w-full truncate">
            {cabName ? (
              <span className="text-amber-400 font-bold">{cabName}</span>
            ) : from && to ? (
              <span className="truncate">
                <span className="text-white">{from}</span>
                <span className="text-amber-400 mx-1.5">&rarr;</span>
                <span className="text-white">{to}</span>
              </span>
            ) : (
              <span className="text-amber-300">Live Booking Engine</span>
            )}
          </div>
        )}

        {/* Status Step text with smooth transition */}
        <div className="min-h-[44px] flex flex-col items-center justify-center">
          <p className="text-sm sm:text-base font-extrabold text-white tracking-wide transition-all duration-300">
            {steps[stepIndex]}
          </p>
          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
            Please wait a moment while we set up your ride
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-4 w-full bg-slate-800/80 rounded-full h-2 p-0.5 border border-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-200 ease-out shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Embedded CSS animations for 60fps smooth car driving */}
      <style jsx>{`
        @keyframes carBounce {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-2.5px);
          }
        }
        @keyframes roadMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-64px);
          }
        }
        @keyframes roadDash {
          0% {
            transform: translateX(180px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
