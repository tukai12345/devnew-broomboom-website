"use client";

import React, { useState } from "react";
import { Search, Gift, PhoneCall, ReceiptText, Smartphone } from "lucide-react";
import { InstallAppModal } from "./InstallAppModal";

interface MobileBottomNavProps {
  onSearchClick: () => void;
  onMyBookingsClick: () => void;
  onOffersClick: () => void;
  onInstallAppClick?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onSearchClick,
  onMyBookingsClick,
  onOffersClick,
  onInstallAppClick,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleInstallClick = () => {
    if (onInstallAppClick) {
      onInstallAppClick();
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center gap-0.5 text-amber-600 focus:outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
            <Search className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <span className="text-[9px] font-bold">Search</span>
        </button>

        <button
          onClick={onOffersClick}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-amber-600 focus:outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
            <Gift className="w-3.5 h-3.5 text-slate-700" />
          </div>
          <span className="text-[9px] font-bold">Offers</span>
        </button>

        {/* Central Prominent Install App Button with BroomBoom Logo (Rectangular / Squircle) */}
        <button
          onClick={handleInstallClick}
          className="flex flex-col items-center gap-0.5 text-slate-950 focus:outline-none -mt-2.5 group cursor-pointer"
          aria-label="Get BroomBoom App"
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 p-0.5 flex items-center justify-center shadow-md shadow-amber-500/30 border-2 border-white transition-transform group-hover:scale-105 group-active:scale-95">
            <img
              src="/images/broomboom-brand-icon.png"
              alt="Get BroomBoom App"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <span className="text-[9px] font-black text-amber-800 tracking-tight">Get App</span>
        </button>

        <a
          href="tel:+918240765499"
          className="flex flex-col items-center gap-0.5 text-emerald-600 focus:outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="text-[9px] font-bold">Call 24x7</span>
        </a>

        <button
          onClick={onMyBookingsClick}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-amber-600 focus:outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
            <ReceiptText className="w-3.5 h-3.5 text-slate-700" />
          </div>
          <span className="text-[9px] font-bold">My Trips</span>
        </button>
      </div>

      <InstallAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
