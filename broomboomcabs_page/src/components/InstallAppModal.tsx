"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Smartphone,
  Star,
  Download,
  ShieldCheck,
  Zap,
  Tag,
  QrCode,
} from "lucide-react";

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Direct to Android Play Store / Web App fallback
      window.open(
        "https://play.google.com/store/apps/details?id=com.broomboom.customer",
        "_blank"
      );
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-app-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col my-auto"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-5 sm:p-6 text-slate-950 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close install modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/15 hover:bg-slate-950/30 flex items-center justify-center text-slate-950 transition active:scale-90 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-3.5 pr-8">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-950 p-1 flex items-center justify-center shadow-md shrink-0 border-2 border-white/20">
              <img
                src="/logo.png"
                alt="BroomBoom Cabs App"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/15 text-[10px] font-black uppercase tracking-wider mb-1">
                <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                <span>4.8 ★ Rated • 100K+ Installs</span>
              </div>
              <h2 id="install-app-modal-title" className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                Install BroomBoom Cabs App
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
          
          {/* Promo Callout */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="text-xs">
              <span className="font-extrabold">Flat ₹200 OFF on your first ride!</span> Use promo code{" "}
              <span className="font-black underline tracking-wide">NEWBROOM</span> in the app.
            </div>
          </div>

          {/* Desktop View: Scan QR Code + Mobile Direct Install */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            
            {/* Left: QR Code for Desktop users */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
              <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 mb-2">
                <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100">
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
              <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-amber-500" />
                <span>Scan with phone camera</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Instant iOS & Android download</div>
            </div>

            {/* Right: Key App Features */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-3 h-3 text-amber-600" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">Faster 1-Tap Booking</div>
                  <div className="text-[11px] text-slate-500">Auto-detects pickup location and saves favorite routes.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Smartphone className="w-3 h-3 text-amber-600" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">Live GPS Chauffeur Tracking</div>
                  <div className="text-[11px] text-slate-500">Track driver location and live estimated time of arrival.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">Emergency SOS & 24x7 Support</div>
                  <div className="text-[11px] text-slate-500">Direct helpline and live trip sharing with family.</div>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons: Direct Install / Google Play / App Store */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            {/* Primary Instant Install Button */}
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/25 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>{isInstalled ? "App Installed — Open BroomBoom" : "Install BroomBoom Cabs App Now"}</span>
            </button>

            {/* Official Store Badges Row */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=com.broomboom.customer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white flex items-center justify-center gap-2 transition active:scale-95"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.036 2.036 0 0 1-.61-.956V2.77c0-.36.147-.706.61-.956zm11.3 11.303l2.25 2.25-11.45 6.55 9.2-8.8zm0-2.234l-9.2-8.8 11.45 6.55-2.25 2.25zm1.117 1.117l2.844-1.625a1.8 1.8 0 0 1 0 3.25l-2.844-1.625z" fill="#fff"/>
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[8px] uppercase tracking-wider text-slate-400">GET IT ON</div>
                  <div className="text-xs font-bold mt-0.5">Google Play</div>
                </div>
              </a>

              {/* Apple App Store */}
              <a
                href="https://apps.apple.com/app/broomboom-cabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white flex items-center justify-center gap-2 transition active:scale-95"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.03-.5 2.63-1.23z" fill="#fff"/>
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[8px] uppercase tracking-wider text-slate-400">Download on</div>
                  <div className="text-xs font-bold mt-0.5">App Store</div>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};
