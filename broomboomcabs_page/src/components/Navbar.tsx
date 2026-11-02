"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Car,
  Clock,
  Plane,
  ChevronDown,
  ChevronRight,
  PhoneCall,
  Menu,
  X,
  MapPin,
  ArrowRight,
  User,
  Smartphone,
  LogOut,
} from "lucide-react";
import { InstallAppModal } from "./InstallAppModal";
import { LoginModal } from "./LoginModal";
import { getStoredUser, removeStoredUser } from "@/utils/auth";
import {
  TOP_10_CITIES_SERVICES,
  SERVICES_LIST,
  ServiceType,
  getServiceUrl,
} from "@/data/cityServicesData";

interface NavbarProps {
  onMyBookingsClick?: () => void;
  activeService?: string;
  onSelectService?: (service: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMyBookingsClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  // Allow null so we can collapse the city list if clicked again
  const [mobileActiveService, setMobileActiveService] = useState<ServiceType | null>(null); 
  
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeMenuService, setActiveMenuService] = useState<ServiceType>("outstation");
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ identifier: string; role: string; name?: string } | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const hoverCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getStoredUser());
    };
    syncUser();
    window.addEventListener("broomboom_auth_change", syncUser);
    return () => window.removeEventListener("broomboom_auth_change", syncUser);
  }, []);

  const handleLogout = () => {
    removeStoredUser();
    setCurrentUser(null);
    setUserDropdownOpen(false);
  };

  const openServicesOnHover = () => {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current);
      hoverCloseTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const closeServicesOnLeave = () => {
    if (hoverCloseTimeoutRef.current) clearTimeout(hoverCloseTimeoutRef.current);
    hoverCloseTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
      hoverCloseTimeoutRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (hoverCloseTimeoutRef.current) clearTimeout(hoverCloseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const activeServiceInfo =
    SERVICES_LIST.find((s) => s.id === activeMenuService) || SERVICES_LIST[0];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0f1c]/95 backdrop-blur-md border-b border-white/10 text-white select-none">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* LOGO ON LEFT */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
            <Link
              href="/"
              aria-label="BroomBoom Cabs — home"
              className="flex items-center gap-2 sm:gap-2.5 group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 min-w-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-amber-400 p-0.5 flex items-center justify-center shadow-md shadow-amber-400/20 transition-transform group-hover:scale-105 shrink-0">
                <img
                  src="/logo.png"
                  alt="BroomBoom Cabs"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 leading-none min-w-0">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white truncate">
                  Broom<span className="text-amber-400">Boom</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-black uppercase bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-mono shadow-sm shrink-0">
                  CABS
                </span>
              </div>
            </Link>
          </div>

          {/* NAVIGATION ITEMS DESKTOP */}
          <div className="hidden lg:flex items-center gap-3 relative" ref={dropdownRef}>
            
            <Link href="/" className="px-3 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 text-xs font-bold transition">
              Home
            </Link>

            {/* SERVICE TRIGGER DESKTOP */}
            <div className="relative" onMouseEnter={openServicesOnHover} onMouseLeave={closeServicesOnLeave}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition ${
                  servicesDropdownOpen ? "text-amber-400 bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* TWO-LEVEL CASCADING DROPDOWN */}
              {servicesDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-[620px] bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-900 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex gap-4">
                    <div className="w-[240px] border-r border-slate-100 pr-3 space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 pb-1">
                        1. Choose Service:
                      </div>
                      {SERVICES_LIST.map((srv) => {
                        const isSelected = activeMenuService === srv.id;
                        return (
                          <div
                            key={srv.id}
                            onMouseEnter={() => setActiveMenuService(srv.id)}
                            onClick={() => setActiveMenuService(srv.id)}
                            className={`p-3 rounded-xl cursor-pointer transition flex items-center justify-between ${
                              isSelected ? "bg-amber-400 text-slate-950 shadow-sm" : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? "bg-slate-950 text-amber-400" : "bg-slate-100 text-slate-700"}`}>
                                {srv.id === "outstation" && <Car className="w-4 h-4" />}
                                {srv.id === "rental" && <Clock className="w-4 h-4" />}
                                {srv.id === "airport" && <Plane className="w-4 h-4" />}
                              </div>
                              <div className="leading-tight">
                                <div className="font-extrabold text-xs">{srv.name}</div>
                                <div className={`text-[10px] ${isSelected ? "text-slate-800" : "text-slate-400"}`}>{srv.badge}</div>
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 ${isSelected ? "text-slate-950" : "text-slate-300"}`} />
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex-1 pl-1">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                          2. Select City for {activeServiceInfo.name}:
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {TOP_10_CITIES_SERVICES.map((city) => (
                          <Link
                            key={city.cityId}
                            href={getServiceUrl(activeMenuService, city.cityId)}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-300 text-slate-800 hover:text-slate-950 transition flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <div className="truncate">
                                <div className="font-bold text-xs truncate">{city.cityName}</div>
                                <div className="text-[10px] text-slate-400 truncate">{city.state}</div>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about-us" className="px-3 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 text-xs font-bold transition">About Us</Link>
            <Link href="/blogs" className="px-3 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 text-xs font-bold transition">Blog</Link>
            <Link href="/contact-us" className="px-3 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 text-xs font-bold transition">Contact</Link>
            <div className="h-6 w-px bg-white/20 mx-1" aria-hidden="true" />

            <a href="tel:+918240765499" className="flex items-center gap-2 hover:bg-white/5 py-2 px-3 rounded-lg transition-colors text-white text-xs font-semibold">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-[11px]">24x7 Helpline</div>
                <div className="text-[10px] text-slate-400">+91 8240765499</div>
              </div>
            </a>

            <div className="h-6 w-px bg-white/20 mx-1" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setInstallModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 transition-all active:scale-95 group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center transition-transform group-hover:scale-110">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[9px] font-bold text-slate-800 uppercase tracking-wider">Install App</div>
                <div className="text-xs font-black">BroomBoom</div>
              </div>
            </button>

            <div className="h-6 w-px bg-white/20 mx-1" aria-hidden="true" />

            {currentUser ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[11px]">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="truncate max-w-[110px]">{currentUser.name || currentUser.identifier}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 text-slate-900 z-50">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signed in as</div>
                      <div className="font-extrabold text-xs truncate text-slate-900 mt-0.5">{currentUser.identifier}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onMyBookingsClick?.();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition flex items-center gap-2 cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>My Bookings</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 transition-all active:scale-95 cursor-pointer border border-amber-300"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Account</span>
              </button>
            )}
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setInstallModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm active:scale-95 transition whitespace-nowrap"
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">Install </span><span>App</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 text-slate-300 hover:text-white rounded-lg flex items-center gap-1 bg-white/10"
            >
              <span className="hidden sm:inline text-xs font-bold">Menu</span>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#0a0f1c] border-t border-white/10 p-4 max-h-[85vh] overflow-y-auto"
        >
          {/* Mobile Navigation Links (Home) */}
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-3 px-1 text-base font-bold text-white transition border-b border-white/10"
          >
            Home
          </Link>

          {/* NEW: Mobile Services Accordion Toggle */}
          <button
            type="button"
            onClick={() => {
              setMobileServicesOpen(!mobileServicesOpen);
              // Optionally close the active service when closing the whole services menu
              if (mobileServicesOpen) setMobileActiveService(null); 
            }}
            className="w-full flex items-center justify-between py-3 px-1 text-base font-bold text-amber-400 border-b border-white/10"
          >
            <span>Services</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Collapsible Services Content */}
          {mobileServicesOpen && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200 py-2 space-y-2">
              {SERVICES_LIST.map((srv) => (
                <div key={srv.id} className="flex flex-col">
                  {/* Service Item Button */}
                  <button
                    type="button"
                    onClick={() => {
                      // Toggle logic: if clicking the active one, collapse it. Otherwise open it.
                      setMobileActiveService(mobileActiveService === srv.id ? null : srv.id);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition border ${
                      mobileActiveService === srv.id
                        ? "bg-amber-400/10 border-amber-400 text-amber-400"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{srv.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileActiveService === srv.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* City List (Shows when this specific service is clicked) */}
                  {mobileActiveService === srv.id && (
                    <div className="mt-2 pl-3 pr-1 pb-2 border-l-2 border-amber-400/50 ml-3">
                      <div className="text-[11px] text-slate-400 font-bold mb-3 mt-2">
                        Select City for {srv.name}:
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {TOP_10_CITIES_SERVICES.map((city) => (
                          <Link
                            key={city.cityId}
                            href={getServiceUrl(srv.id, city.cityId)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2.5 bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-white rounded-xl text-xs font-bold border border-white/10 flex items-center justify-between transition group"
                          >
                            <div className="truncate">
                              <div>{city.cityName}</div>
                              <div className="text-[10px] text-slate-400 group-hover:text-slate-800">{city.state}</div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Mobile Navigation Links (About, Blog, Contact, Login) */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/10 text-center mt-2">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 px-1 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition border border-white/10">About Us</Link>
            <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="py-2 px-1 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition border border-white/10">Blog</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 px-1 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition border border-white/10">Contact</Link>
          </div>

          {/* Mobile Install App Banner Card */}
          <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-950 p-0.5 flex items-center justify-center shadow-xs shrink-0">
                <img src="/logo.png" alt="BroomBoom Cabs App" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <div className="font-black text-xs">BroomBoom Cabs App</div>
                <div className="text-[10px] font-bold text-slate-800">Flat ₹200 OFF on 1st ride</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setInstallModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs shadow-sm active:scale-95 transition"
            >
              Install App
            </button>
          </div>

          {/* Mobile Helpline & Account buttons */}
          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs mt-3">
            <a href="tel:+918240765499" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-left border border-white/10 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-bold text-white text-[11px]">24x7 Helpline</div>
                <div className="text-[9px] text-slate-400">+91 8240765499</div>
              </div>
            </a>

            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="p-3 bg-red-600/90 hover:bg-red-600 rounded-xl text-center text-white font-bold truncate"
              >
                Sign Out ({currentUser.name || currentUser.identifier.slice(0, 8)})
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="p-3 bg-amber-400 hover:bg-amber-300 rounded-xl text-center text-slate-950 font-black"
              >
                Login / Account
              </button>
            )}
          </div>
        </div>
      )}

      <InstallAppModal isOpen={installModalOpen} onClose={() => setInstallModalOpen(false)} />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </header>
  );
};