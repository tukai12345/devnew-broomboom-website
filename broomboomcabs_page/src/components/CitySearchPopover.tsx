"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, MapPin, Plane, Check, Loader2, X, ArrowLeft } from "lucide-react";
import { api, CityItem } from "@/services/api";
import { CITIES } from "@/data/cabsData";

export interface CitySearchPopoverProps {
  placeholder?: string;
  query?: string;
  onQueryChange?: (q: string) => void;
  selected?: string;
  onSelect: (name: string, state?: string, coords?: { lat: number; lng: number }) => void;
  onClose: () => void;
  align?: "left" | "right";
  title?: string;
}

export const CitySearchPopover: React.FC<CitySearchPopoverProps> = ({
  placeholder = "Search city, town, airport or landmark...",
  query: externalQuery,
  onQueryChange,
  selected = "",
  onSelect,
  onClose,
  align = "left",
  title = "Select Location",
}) => {
  const [internalQuery, setInternalQuery] = useState("");
  const query = externalQuery !== undefined ? externalQuery : internalQuery;
  const setQuery = onQueryChange || setInternalQuery;

  const [mapResults, setMapResults] = useState<CityItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    const timer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 80);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setMapResults([]);
      setIsSearching(false);
      return;
    }

    let active = true;
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await api.searchCities(q);
        if (active) {
          setMapResults(results);
          setIsSearching(false);
        }
      } catch {
        if (active) setIsSearching(false);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const displayItems = React.useMemo(() => {
    if (query.trim().length >= 2 && mapResults.length > 0) {
      return mapResults.map((m) => {
        const parts = (m.name || m.displayName || "").split(",");
        const primary = parts[0]?.trim() || m.name;
        return {
          id: m.placeId || m.id || `${m.lat}_${m.lon}_${primary}`,
          name: primary,
          displayName: m.displayName || `${primary}, ${m.state || "India"}`,
          state: m.state || "India",
          lat: m.lat ? parseFloat(String(m.lat)) : undefined,
          lng: m.lon ? parseFloat(String(m.lon)) : undefined,
          source: m.source || "Map",
        };
      });
    }

    const filtered = CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.state.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.map((c) => ({
      id: c.id,
      name: c.name,
      displayName: `${c.name}, ${c.state}`,
      state: c.state,
      lat: undefined,
      lng: undefined,
      source: "Popular",
    }));
  }, [query, mapResults]);

  const renderSearchBar = (isMobileView: boolean) => (
    <div className={`relative shrink-0 ${isMobileView ? "mb-3" : "mb-2"}`}>
      <Search className={`absolute left-3 top-3 ${isMobileView ? "w-4 h-4" : "w-3.5 h-3.5"} text-slate-400`} />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (displayItems.length > 0) {
              const item = displayItems[0];
              onSelect(
                item.name,
                item.state,
                item.lat && item.lng ? { lat: item.lat, lng: item.lng } : undefined
              );
              onClose();
            } else if (query.trim()) {
              onSelect(query.trim());
              onClose();
            }
          }
        }}
        className={`w-full pl-9 pr-9 ${
          isMobileView ? "py-2.5 text-sm rounded-xl" : "py-2 text-xs rounded-lg"
        } bg-slate-50 border border-slate-200 font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition`}
      />
      {query && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setQuery("");
          }}
          className="absolute right-2.5 top-2.5 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs transition cursor-pointer"
          aria-label="Clear"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  const renderStatus = () =>
    isSearching ? (
      <div className="flex items-center gap-2 px-2.5 py-1.5 mb-2 bg-amber-50 rounded-lg text-[11px] font-bold text-amber-800 animate-pulse border border-amber-200/50 shrink-0">
        <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
        <span>Searching map locations across India...</span>
      </div>
    ) : null;

  const renderList = (isMobileView: boolean) => (
    <div
      className={`${
        isMobileView ? "flex-1" : "max-h-64 sm:max-h-72"
      } overflow-y-auto space-y-0.5 divide-y divide-slate-100 min-h-0`}
    >
      {isSearching && displayItems.length === 0 ? (
        <div className="py-8 flex flex-col items-center justify-center gap-2 text-center text-slate-500">
          <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
          <p className="text-xs font-bold text-slate-700">Connecting to OpenStreetMap...</p>
          <p className="text-[10px] text-slate-400">Searching all cities, towns &amp; places in India</p>
        </div>
      ) : displayItems.length === 0 ? (
        <p className="text-[11px] text-slate-400 text-center py-6">
          No places found. Type city, town, landmark or PIN code
        </p>
      ) : (
        displayItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              onSelect(
                item.name,
                item.state,
                item.lat && item.lng ? { lat: item.lat, lng: item.lng } : undefined
              );
              onClose();
            }}
            className={`flex items-start justify-between ${
              isMobileView ? "p-2.5 rounded-xl" : "p-2 rounded-lg"
            } cursor-pointer text-xs transition group ${
              selected.toLowerCase() === item.name.toLowerCase()
                ? "bg-amber-50 text-amber-950 font-bold"
                : "hover:bg-slate-50 text-slate-800"
            }`}
          >
            <div className="flex items-start gap-2.5 min-w-0 pr-2">
              <div
                className={`${
                  isMobileView ? "w-7 h-7 rounded-lg" : "w-6 h-6 rounded-md"
                } bg-slate-100 group-hover:bg-amber-100 text-slate-600 group-hover:text-amber-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors`}
              >
                {item.name.toLowerCase().includes("airport") ? (
                  <Plane className={isMobileView ? "w-4 h-4" : "w-3.5 h-3.5"} />
                ) : (
                  <MapPin className={isMobileView ? "w-4 h-4" : "w-3.5 h-3.5"} />
                )}
              </div>
              <div className="min-w-0 text-left">
                <div className="font-bold text-[13px] text-slate-950 truncate flex items-center gap-1.5">
                  <span>{item.name}</span>
                  {(item.source === "Nominatim" || item.source === "Map") && (
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-black tracking-wider uppercase">
                      MAP
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 leading-snug mt-0.5">
                  {item.displayName !== item.name ? item.displayName : item.state}
                </div>
              </div>
            </div>
            {selected.toLowerCase() === item.name.toLowerCase() && (
              <Check className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
            )}
          </div>
        ))
      )}
    </div>
  );

  if (!mounted) return null;

  // Mobile View: Full screen modal from top of screen without exposed background gaps
  if (isMobile) {
    return createPortal(
      <div
        data-popover-shell
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[99999] bg-white flex flex-col animate-in fade-in duration-150"
      >
        {/* Top Header Bar */}
        <div className="pt-[max(0.75rem,env(safe-area-inset-top))] px-4 pb-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-700 transition cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-4 bg-amber-400 rounded-full" />
              <h3 className="font-black text-slate-900 text-base tracking-tight">{title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-600 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Content Body filling entire screen */}
        <div className="flex-1 overflow-hidden p-4 flex flex-col min-h-0 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]">
          {renderSearchBar(true)}
          {renderStatus()}
          {renderList(true)}
        </div>
      </div>,
      document.body
    );
  }

  // Desktop View: Anchored dropdown under the search input
  return (
    <div
      data-popover-shell
      onClick={(e) => e.stopPropagation()}
      className={`absolute top-full ${
        align === "right" ? "right-0" : "left-0"
      } mt-2 w-80 md:w-96 max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl shadow-2xl border border-amber-200/90 z-50 p-3 animate-in fade-in zoom-in-95 duration-150`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <span className="font-bold text-xs text-slate-900">{title}</span>
        <button
          type="button"
          onClick={onClose}
          className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="flex flex-col h-full">
        {renderSearchBar(false)}
        {renderStatus()}
        {renderList(false)}
      </div>
    </div>
  );
};
