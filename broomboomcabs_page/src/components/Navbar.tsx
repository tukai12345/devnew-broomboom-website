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
  Home,
  Info,
  BookOpen,
  Mail,
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

  const renderServiceIcon = (id: string, className = "w-4 h-4") => {
    if (id === "outstation") return <Car className={className} />;
    if (id === "rental") return <Clock className={className} />;
    if (id === "airport") return <Plane className={className} />;
    return <Car className={className} />;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0f1c]/95 backdrop-blur-md border-b border-white/10 text-white select-none">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* LOGO */}
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

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-3 relative" ref={dropdownRef}>
            <Link href="/" className="px-3 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 text-xs font-bold transition">
              Home
            </Link>

            {/* DESKTOP SERVICES DROPDOWN */}
            <div className="relative" onMouseEnter={openServicesOnHover} onMouseLeave={closeServicesOnLeave}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                aria-expanded={servicesDropdownOpen}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition ${
                  servicesDropdownOpen ? "text-amber-400 bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

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
                                {renderServiceIcon(srv.id)}
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

          {/* MOBILE HEADER ACTIONS */}
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

      {/* ======================= MOBILE DRAWER ======================= */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#0a0f1c] border-t border-white/10 p-4 max-h-[85vh] overflow-y-auto shadow-2xl"
        >
          <div className="space-y-4">
            
            {/* MAIN LINKS */}
            <div className="space-y-1">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Home className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-bold text-[15px]">Home</span>
              </Link>

              {/* ===== FIXED SERVICES SECTION ===== */}
              <button
                type="button"
                onClick={() => {
                  setMobileServicesOpen(!mobileServicesOpen);
                  if (mobileServicesOpen) setMobileActiveService(null); 
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Car className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="font-bold text-[15px]">Our Services</span>
                </div>
                <div className={`p-1.5 rounded-full bg-white/5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </div>
              </button>

              {/* SERVICES ACCORDION CONTENT - CARD BASED */}
              {mobileServicesOpen && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200 py-2 space-y-2">
                  {SERVICES_LIST.map((srv) => (
                    <div key={srv.id} className="flex flex-col rounded-xl overflow-hidden bg-white/5 border border-white/10">
                      
                      {/* Service Item Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setMobileActiveService(mobileActiveService === srv.id ? null : srv.id);
                        }}
                        className={`w-full flex items-center justify-between p-3.5 text-sm font-bold transition ${
                          mobileActiveService === srv.id
                            ? "bg-amber-400/10 text-amber-400"
                            : "text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            mobileActiveService === srv.id ? "bg-amber-400 text-slate-950" : "bg-white/10 text-slate-300"
                          }`}>
                            {renderServiceIcon(srv.id, "w-4 h-4")}
                          </div>
                          <span>{srv.name}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileActiveService === srv.id ? "rotate-180 text-amber-400" : "text-slate-400"
                          }`}
                        />
                      </button>

                      {/* City List (Expands inside the card) */}
                      {mobileActiveService === srv.id && (
                        <div className="p-3 border-t border-white/10 bg-black/20 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="text-[11px] text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            Select City for {srv.name}:
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {TOP_10_CITIES_SERVICES.map((city) => (
                              <Link
                                key={city.cityId}
                                href={getServiceUrl(srv.id, city.cityId)}
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2.5 bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-white rounded-lg text-xs font-bold border border-white/10 flex items-center justify-between transition group"
                              >
                                <div className="truncate">
                                  <div>{city.cityName}</div>
                                  <div className="text-[9px] text-slate-400 group-hover:text-slate-800">{city.state}</div>
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

              <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-white">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Info className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-bold text-[15px]">About Us</span>
              </Link>

              <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-white">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-bold text-[15px]">Blog</span>
              </Link>

              <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-white">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-bold text-[15px]">Contact Us</span>
              </Link>
            </div>

            {/* APP INSTALL BANNER */}
            <div className="mt-2 p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex flex-col gap-3 shadow-lg shadow-amber-400/10 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-950 p-0.5 flex items-center justify-center shadow-md shrink-0">
                  <img src="/logo.png" alt="BroomBoom Cabs App" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <div className="font-black text-sm tracking-tight">BroomBoom Cabs App</div>
                  <div className="text-[11px] font-bold text-slate-800">Get Flat ₹200 OFF on 1st ride</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInstallModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs shadow-md active:scale-95 transition flex items-center justify-center gap-2 relative z-10"
              >
                <Smartphone className="w-4 h-4" />
                Install App Now
              </button>
            </div>

            {/* BOTTOM ACTIONS (HELPLINE & LOGIN) */}
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3">
              <a 
                href="tel:+918240765499" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex flex-col justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition"
              >
                <div className="flex items-center gap-2 mb-1">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white text-[13px]">24x7 Helpline</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium ml-6">+91 8240765499</div>
              </a>

              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onMyBookingsClick?.();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-400 hover:bg-amber-300 rounded-xl text-slate-950 font-black text-xs transition shadow-sm"
                  >
                    <Clock className="w-4 h-4" />
                    My Bookings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold text-xs transition border border-red-500/20"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-black text-[13px] border border-white/10 transition"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  Login / Account
                </button>
              )}
            </div>
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