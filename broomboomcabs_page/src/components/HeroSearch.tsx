"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRightLeft,
  ArrowUpDown,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  XCircle,
  X,
  Star,
  Loader2,
  Plane,
  Car,
  Clock,
  Info,
  Calendar,
} from "lucide-react";
import { CITIES } from "@/data/cabsData";
import { api, CityItem } from "@/services/api";

export interface SearchParams {
  tripType: "outstation-oneway" | "outstation-round" | "airport" | "hourly" | "daily";
  fromCity: string;
  toCity: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  dropTime?: string;
  hourlyPackage: string;
  airportMode?: "to-airport" | "from-airport";
  flightNumber?: string;
  distanceKm?: number;
  durationMinutes?: number;
  fromCoords?: { lat: number; lng: number };
  toCoords?: { lat: number; lng: number };
}

interface HeroSearchProps {
  activeTripType: string;
  onTripTypeChange: (tripType: string) => void;
  onSearch: (params: SearchParams) => void;
  initialFrom?: string;
  initialTo?: string;
  heading?: { title: string; subtitle?: string; badge?: string };
}

type TripType = "outstation-oneway" | "outstation-round" | "airport" | "hourly" | "daily";
type DropdownKey =
  | "from"
  | "to"
  | "pickupDate"
  | "returnDate"
  | "pickupTime"
  | "dropTime"
  | "package"
  | null;

/* ------------------------------- data ------------------------------- */

const TRIP_TABS: { id: TripType; label: string; badge?: string }[] = [
  { id: "outstation-oneway", label: "Outstation One-Way" },
  { id: "outstation-round", label: "Outstation Round-Trip" },
  { id: "airport", label: "Airport Transfers" },
  { id: "hourly", label: "Hourly Rentals", badge: "new" },
];

const HOURLY_PACKAGES = [
  { label: "1 hrs 10 kms", desc: "Short city errands & shopping", tag: "POPULAR" },
  { label: "2 hrs 20 kms", desc: "Local meetings & doctor visits", tag: null },
  { label: "4 hrs 40 kms", desc: "Half-day city tour or office rounds", tag: "BEST VALUE" },
  { label: "8 hrs 80 kms", desc: "Full-day business or city exploration", tag: "POPULAR" },
  { label: "12 hrs 120 kms", desc: "Extended full day & multi-city stops", tag: null },
];

/* ------------------------------- helpers ------------------------------- */

const parseDateParts = (dateStr: string) => {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return {
      dayNum: String(day),
      monthYear: `${d.toLocaleString("en-US", { month: "short" })}'${String(year).slice(-2)}`,
      weekday: d.toLocaleString("en-US", { weekday: "long" }),
    };
  } catch {
    return { dayNum: "24", monthYear: "Oct'26", weekday: "Saturday" };
  }
};

const parseTimeParts = (timeStr: string) => {
  const parts = timeStr.trim().split(" ");
  return parts.length === 2 ? { time: parts[0], meridiem: parts[1] } : { time: "10:00", meridiem: "AM" };
};

const parseTimeDetails = (timeStr: string) => {
  try {
    const [time, meridiem] = timeStr.trim().split(" ");
    const [hour, minute] = time.split(":");
    return {
      hour: String(parseInt(hour, 10)).padStart(2, "0"),
      minute: String(parseInt(minute, 10)).padStart(2, "0"),
      meridiem: meridiem || "AM",
    };
  } catch {
    return { hour: "10", minute: "00", meridiem: "AM" };
  }
};

const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

/* --------------------------- sub-components --------------------------- */

const MobileDateTimePicker: React.FC<{
  title: string;
  date: string;
  time: string;
  onChangeDate: (date: string) => void;
  onChangeTime: (time: string) => void;
  onClose: () => void;
}> = ({ title, date, time, onChangeDate, onChangeTime, onClose }) => {
  const { hour, minute, meridiem } = parseTimeDetails(time);
  const setTime = (h: string, m: string, mer: string) => onChangeTime(`${h}:${m} ${mer}`);

  const dates = React.useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const label = i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      list.push({ value, label });
    }
    return list;
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end md:hidden">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200" onClick={onClose} />
      <div className="relative z-10 w-full max-h-[90vh] bg-white rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition">
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[300px] border-b border-slate-100">
          {/* Dates */}
          <div className="flex-1 overflow-y-auto snap-y snap-mandatory border-r border-slate-100">
            {dates.map((d) => (
              <div
                key={d.value}
                onClick={() => onChangeDate(d.value)}
                className={`p-3 text-sm font-semibold snap-center cursor-pointer transition-colors ${
                  date === d.value ? "bg-amber-50 text-amber-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {d.label}
              </div>
            ))}
          </div>

          {/* Time */}
          <div className="flex-[1.5] flex">
            <div className="flex-1 overflow-y-auto snap-y snap-mandatory">
              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((h) => (
                <div
                  key={h}
                  onClick={() => setTime(h, minute, meridiem)}
                  className={`py-3 text-center text-sm font-semibold snap-center cursor-pointer ${
                    hour === h ? "text-amber-600 bg-amber-50" : "text-slate-600"
                  }`}
                >
                  {h}
                </div>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto snap-y snap-mandatory">
              {["00", "15", "30", "45"].map((m) => (
                <div
                  key={m}
                  onClick={() => setTime(hour, m, meridiem)}
                  className={`py-3 text-center text-sm font-semibold snap-center cursor-pointer ${
                    minute === m ? "text-amber-600 bg-amber-50" : "text-slate-600"
                  }`}
                >
                  {m}
                </div>
              ))}
            </div>
            <div className="w-16 overflow-y-auto snap-y snap-mandatory">
              {["AM", "PM"].map((mer) => (
                <div
                  key={mer}
                  onClick={() => setTime(hour, minute, mer)}
                  className={`py-3 text-center text-sm font-semibold snap-center cursor-pointer ${
                    meridiem === mer ? "text-amber-600 bg-amber-50" : "text-slate-600"
                  }`}
                >
                  {mer}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview & Confirm */}
        <div className="p-4 space-y-3 pb-8">
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3">
            <div className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1">
              {title.replace("Select ", "")}
            </div>
            <div className="text-base font-bold text-slate-900">
              {new Date(date).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
            </div>
            <div className="text-sm font-semibold text-slate-600 mt-0.5">{time}</div>
          </div>
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-md">
            CONFIRM
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const PopoverShell: React.FC<{
  children: React.ReactNode;
  align?: "left" | "right";
  width?: string;
  title?: string;
  onClose?: () => void;
}> = ({ children, align = "left", width = "w-80", title, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

  if (isMobile) {
    return createPortal(
      <div
        data-popover-shell
        className="fixed inset-0 z-[9999] flex flex-col justify-end"
      >
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={onClose}
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-4 pb-8 flex flex-col animate-in slide-in-from-bottom duration-200"
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-4 bg-amber-400 rounded-full" />
              <h3 className="font-black text-slate-900 text-sm tracking-tight">
                {title || "Select Option"}
              </h3>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
                aria-label="Close"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
          <div className="overflow-y-auto max-h-[calc(85vh-5rem)]">
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <div
      data-popover-shell
      onClick={(e) => e.stopPropagation()}
      style={{ zIndex: 100 }}
      className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 ${width} max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-amber-300 ring-1 ring-black/5 z-50 p-3 animate-in fade-in zoom-in-95 duration-150`}
    >
      {children}
    </div>
  );
};

const CityPopover: React.FC<{
  placeholder: string;
  query: string;
  onQueryChange: (v: string) => void;
  selected: string;
  onSelect: (name: string, state?: string, coords?: { lat: number; lng: number }) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  citiesList?: { id: string; name: string; state: string }[];
  align?: "left" | "right";
  title?: string;
  onClose?: () => void;
}> = ({
  placeholder,
  query,
  onQueryChange,
  selected,
  onSelect,
  inputRef,
  citiesList = CITIES,
  align = "left",
  title,
  onClose,
}) => {
  const [mapResults, setMapResults] = useState<CityItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

    const filtered = citiesList.filter(
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
  }, [query, mapResults, citiesList]);

  return (
    <PopoverShell width="w-80 md:w-96" align={align} title={title || (placeholder ? placeholder.replace("Search ", "Select ").replace("...", "") : "Select Location")} onClose={onClose}>
      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
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
              } else if (query.trim()) {
                onSelect(query.trim());
              }
            }
          }}
          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      {isSearching && (
        <div className="flex items-center gap-2 px-2.5 py-1 mb-1 bg-amber-50 rounded-lg text-[11px] font-bold text-amber-800 animate-pulse border border-amber-200/50">
          <Loader2 className="w-3 h-3 text-amber-600 animate-spin" />
          <span>Searching map locations across India...</span>
        </div>
      )}

      <div className="max-h-56 sm:max-h-64 overflow-y-auto space-y-0.5 divide-y divide-slate-100">
        {isSearching && displayItems.length === 0 ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-center text-slate-500">
            <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
            <p className="text-xs font-bold text-slate-700">Connecting to OpenStreetMap...</p>
            <p className="text-[10px] text-slate-400">Searching all cities, towns &amp; places in India</p>
          </div>
        ) : displayItems.length === 0 ? (
          <p className="text-[11px] text-slate-400 text-center py-4">
            No places found. Type city, town, landmark or PIN
          </p>
        ) : (
          displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                onSelect(
                  item.name,
                  item.state,
                  item.lat && item.lng ? { lat: item.lat, lng: item.lng } : undefined
                )
              }
              className={`flex items-start justify-between p-2 rounded-lg cursor-pointer text-xs transition group ${
                selected === item.name
                  ? "bg-amber-50 text-amber-950 font-bold"
                  : "hover:bg-slate-50 text-slate-800"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0 pr-2">
                <div className="w-6 h-6 rounded-md bg-slate-100 group-hover:bg-amber-100 text-slate-600 group-hover:text-amber-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  {item.name.toLowerCase().includes("airport") ? (
                    <Plane className="w-3.5 h-3.5" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[13px] text-slate-950 truncate flex items-center gap-1.5">
                    <span>{item.name}</span>
                    {item.source === "Nominatim" && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-black tracking-wider uppercase">
                        MAP
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 leading-snug">
                    {item.displayName !== item.name ? item.displayName : item.state}
                  </div>
                </div>
              </div>
              {selected === item.name && (
                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-1" />
              )}
            </div>
          ))
        )}
      </div>
    </PopoverShell>
  );
};

const CalendarPopover: React.FC<{
  month: Date;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  selectedDate: string;
  onSelect: (day: number) => void;
  align?: "left" | "right";
  title?: string;
  onClose?: () => void;
}> = ({ month, onPrev, onNext, selectedDate, onSelect, align = "left", title, onClose }) => {
  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const startDow = new Date(year, monthIdx, 1).getDay();
  const monthName = month.toLocaleString("en-US", { month: "long" });

  return (
    <PopoverShell width="w-72" align={align} title={title || "Select Date"} onClose={onClose}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <button type="button" onClick={onPrev} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-700 transition">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="font-bold text-slate-900 text-xs sm:text-[11px]">
          {monthName} {year}
        </div>
        <button type="button" onClick={onNext} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-700 transition">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-[9px] font-bold text-slate-400 py-1.5">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDow }).map((_, i) => (
          <div key={`e-${i}`} className="p-0.5" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const key = `-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isSelected = selectedDate.endsWith(key);
          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelect(day)}
              className={`p-2 sm:p-1 text-xs sm:text-[11px] font-bold rounded-lg sm:rounded-md transition ${
                isSelected
                  ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                  : "hover:bg-slate-100 text-slate-800"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </PopoverShell>
  );
};

const TimePopover: React.FC<{
  title: string;
  value: string;
  onChange: (v: string) => void;
  align?: "left" | "right";
  onClose?: () => void;
}> = ({
  title,
  value,
  onChange,
  align = "right",
  onClose,
}) => {
  const { hour, minute, meridiem } = parseTimeDetails(value);
  const set = (h: string, m: string, mer: string) => onChange(`${h}:${m} ${mer}`);

  const Column: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}>
      {children}
    </div>
  );

  const Option: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({
    active,
    onClick,
    children,
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-2.5 sm:py-2 text-[13px] font-bold snap-center transition-colors ${
        active ? "bg-amber-400 text-slate-950 rounded-lg sm:rounded-none" : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <PopoverShell align={align} width="w-64" title={title} onClose={onClose}>
      <div className="hidden md:block text-[10px] font-bold text-amber-600 uppercase text-center pb-2 border-b border-slate-100">
        {title}
      </div>
      <div className="flex h-52 sm:h-48 pt-2">
        <Column className="flex-1 border-r border-slate-100">
          {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((h) => (
            <Option key={h} active={hour === h} onClick={() => set(h, minute, meridiem)}>
              {h}
            </Option>
          ))}
        </Column>
        <Column className="flex-1 border-r border-slate-100">
          {["00", "15", "30", "45"].map((m) => (
            <Option key={m} active={minute === m} onClick={() => set(hour, m, meridiem)}>
              {m}
            </Option>
          ))}
        </Column>
        <Column className="w-16 sm:w-16">
          {["AM", "PM"].map((mer) => (
            <Option key={mer} active={meridiem === mer} onClick={() => set(hour, minute, mer)}>
              {mer}
            </Option>
          ))}
        </Column>
      </div>

      {onClose && (
        <div className="md:hidden mt-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm transition active:scale-95"
          >
            Confirm Time ({value})
          </button>
        </div>
      )}
    </PopoverShell>
  );
};

/* ------------------------------ main ------------------------------ */

export const HeroSearch: React.FC<HeroSearchProps> = ({
  activeTripType,
  onTripTypeChange,
  onSearch,
  initialFrom = "",
  initialTo = "",
  heading,
}) => {
  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const getCurrentTimeStr = () => {
    const d = new Date();
    // Round up to next 30-minute slot
    const minutes = d.getMinutes() < 30 ? 30 : 0;
    let hours = d.getMinutes() < 30 ? d.getHours() : d.getHours() + 1;
    if (hours >= 24) hours = 0;
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    const ampm = hours < 12 ? "AM" : "PM";
    return `${String(h12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
  };

  const [tripType, setTripType] = useState<TripType>((activeTripType as TripType) || "outstation-round");
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [fromState, setFromState] = useState(
    initialFrom ? (CITIES.find((c) => c.name === initialFrom)?.state ?? "") : ""
  );
  const [toState, setToState] = useState(
    initialTo ? (CITIES.find((c) => c.name === initialTo)?.state ?? "") : ""
  );
  const [fromCoords, setFromCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [toCoords, setToCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  const [routeDurationMinutes, setRouteDurationMinutes] = useState<number | null>(null);

  const [pickupDate, setPickupDate] = useState(getTodayStr());
  const [pickupTime, setPickupTime] = useState(getCurrentTimeStr());
  const [returnDate, setReturnDate] = useState(getTodayStr());
  const [dropTime, setDropTime] = useState("09:45 PM");
  const [hourlyPackage, setHourlyPackage] = useState("1 hrs 10 kms");

  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileDateTimeTarget, setMobileDateTimeTarget] = useState<"pickup" | "return" | null>(null);
  
  const [searchFromQuery, setSearchFromQuery] = useState("");
  const [searchToQuery, setSearchToQuery] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTripType) setTripType(activeTripType as TripType);
  }, [activeTripType]);

  useEffect(() => {
    setFromCity(initialFrom ?? "");
    if (initialFrom) {
      const st = CITIES.find((c) => c.name === initialFrom)?.state;
      if (st) setFromState(st);
    } else {
      setFromState("");
    }
  }, [initialFrom]);

  useEffect(() => {
    setToCity(initialTo ?? "");
    if (initialTo) {
      const st = CITIES.find((c) => c.name === initialTo)?.state;
      if (st) setToState(st);
    } else {
      setToState("");
    }
  }, [initialTo]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest("[data-popover-shell]") ||
        target.closest("[data-field-trigger]") ||
        target.closest(".fixed")
      ) {
        return;
      }
      setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (openDropdown === "from" || openDropdown === "to") {
      const t = setTimeout(() => {
        searchInputRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [openDropdown]);

  const [backendCities, setBackendCities] = useState<CityItem[]>([]);

  useEffect(() => {
    let active = true;
    api
      .getCities()
      .then((data) => {
        if (active && data && data.length > 0) setBackendCities(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const combinedCities = React.useMemo(() => {
    const list = [...CITIES];
    const existing = new Set(CITIES.map((c) => c.name.toLowerCase()));
    for (const bc of backendCities) {
      if (bc.name && !existing.has(bc.name.toLowerCase())) {
        existing.add(bc.name.toLowerCase());
        list.push({
          id: bc.id || bc.name,
          name: bc.name,
          state: bc.state || "India",
        });
      }
    }
    return list;
  }, [backendCities]);

  useEffect(() => {
    let cancelled = false;

    async function calculateMapDistance() {
      if (!fromCity || !toCity || fromCity.trim().toLowerCase() === toCity.trim().toLowerCase()) {
        setRouteDistance(null);
        setRouteDurationMinutes(null);
        return;
      }

      try {
        const payload: {
          from: string;
          to: string;
          pickupLat?: number;
          pickupLng?: number;
          dropLat?: number;
          dropLng?: number;
        } = {
          from: fromCity.trim(),
          to: toCity.trim(),
        };

        if (fromCoords) {
          payload.pickupLat = fromCoords.lat;
          payload.pickupLng = fromCoords.lng;
        }
        if (toCoords) {
          payload.dropLat = toCoords.lat;
          payload.dropLng = toCoords.lng;
        }

        const res = await api.calculateDistance(payload);
        if (!cancelled) {
          if (res && res.distance > 0) {
            setRouteDistance(res.distance);
            setRouteDurationMinutes(res.durationMinutes);
          }
        }
      } catch {
        // Ignored
      }
    }

    const timer = setTimeout(calculateMapDistance, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fromCity, toCity, fromCoords, toCoords]);

  const toggle = (key: DropdownKey) => setOpenDropdown((cur) => (cur === key ? null : key));

  const changeTripType = (t: TripType) => {
    setTripType(t);
    onTripTypeChange(t);
  };

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const tempCity = fromCity;
    const tempState = fromState;
    const tempCoords = fromCoords;
    setFromCity(toCity);
    setFromState(toState);
    setFromCoords(toCoords);
    setToCity(tempCity);
    setToState(tempState);
    setToCoords(tempCoords);
  };

  const [isSubmittingSearch, setIsSubmittingSearch] = useState(false);

  const handleSearchSubmit = async () => {
    setIsSubmittingSearch(true);
    let finalDist = routeDistance;
    let finalDur = routeDurationMinutes;

    if (
      !finalDist &&
      fromCity &&
      toCity &&
      fromCity.trim().toLowerCase() !== toCity.trim().toLowerCase()
    ) {
      try {
        const payload: {
          from: string;
          to: string;
          pickupLat?: number;
          pickupLng?: number;
          dropLat?: number;
          dropLng?: number;
        } = {
          from: fromCity.trim(),
          to: toCity.trim(),
        };
        if (fromCoords) {
          payload.pickupLat = fromCoords.lat;
          payload.pickupLng = fromCoords.lng;
        }
        if (toCoords) {
          payload.dropLat = toCoords.lat;
          payload.dropLng = toCoords.lng;
        }

        // Fast race with 1.2s timeout so the button never freezes
        const distPromise = api.calculateDistance(payload);
        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1200));
        const res = await Promise.race([distPromise, timeoutPromise]);
        if (res && res.distance > 0) {
          finalDist = res.distance;
          finalDur = res.durationMinutes;
          setRouteDistance(res.distance);
          setRouteDurationMinutes(res.durationMinutes);
        }
      } catch {}
    }

    onSearch({
      tripType,
      fromCity,
      toCity,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime: dropTime,
      dropTime,
      hourlyPackage,
      distanceKm: finalDist ?? undefined,
      durationMinutes: finalDur ?? undefined,
      fromCoords: fromCoords || undefined,
      toCoords: toCoords || undefined,
    });

    setIsSubmittingSearch(false);
  };

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const selectCalendarDate = (day: number, isPickup: boolean) => {
    const formatted = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (isPickup) setPickupDate(formatted);
    else setReturnDate(formatted);
    setOpenDropdown(null);
  };

  const pickupParts = parseDateParts(pickupDate);
  const returnParts = parseDateParts(returnDate);
  const pickupTimeParts = parseTimeParts(pickupTime);
  const dropTimeParts = parseTimeParts(dropTime);

  /* Class tokens optimized for mobile (Side-by-Side Grid) */
  const field =
    "py-2 px-3 sm:py-3.5 sm:px-4 hover:bg-amber-50/50 cursor-pointer transition relative group flex flex-col justify-center min-h-[60px] sm:min-h-[102px] min-w-0 bg-white";
  const label = "text-[10px] sm:text-xs text-slate-500 font-semibold mb-0.5 flex items-center gap-1";
  const value =
    "text-[15px] sm:text-2xl lg:text-[26px] font-black text-slate-950 tracking-tight leading-none truncate";
  const sub = "text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5 sm:mt-1 truncate";
  const dateLine = "flex items-baseline gap-1 tracking-tight leading-none truncate";
  const timeLine = "flex items-baseline gap-1 tracking-tight leading-none";

  const activeTitle = heading?.title || (
    tripType === "outstation-oneway" ? (
      <>
        Book Verified Outstation Cabs on <span className="text-amber-400">BroomBoom</span> at Lowest Fares
      </>
    ) : tripType === "outstation-round" ? (
      <>
        Outstation Round-Trip Cabs with <span className="text-amber-400">Zero Hidden Charges</span>
      </>
    ) : tripType === "airport" ? (
      <>
        Reliable Airport Transfers with <span className="text-amber-400">100% On-Time Guarantee</span>
      </>
    ) : tripType === "hourly" ? (
      <>
        Hourly Car Rentals with <span className="text-amber-400">Unlimited Stops</span> in Your City
      </>
    ) : (
      <>
        Book Verified Outstation Cabs &amp; <span className="text-amber-400">Airport Taxi at Lowest Fares</span>
      </>
    )
  );

  const activeSubtitle = heading?.subtitle || (
    tripType === "outstation-oneway"
      ? "Pay only for one-way drop • Zero return fare • 100% AC verified cars & professional highway chauffeurs"
      : tripType === "outstation-round"
      ? "Intercity road trips made effortless • Assured car models & transparent all-inclusive pricing"
      : tripType === "airport"
      ? "Live flight tracking • 45 minutes free wait time • Doorstep to terminal pickups & drops"
      : tripType === "hourly"
      ? "Chauffeur on standby • Flexible 1 to 12-hour rental packages for meetings, shopping & errands"
      : "One-Way Drops • Round Trips • Airport Transfers • Local Hourly Rentals across 100+ Cities"
  );

  return (
    <div
      className="relative pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-14 bg-cover bg-center bg-no-repeat overflow-visible"
      style={{
        zIndex: openDropdown ? 50 : 20,
        backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.65), rgba(10, 16, 26, 0.80)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      <div
        ref={containerRef}
        style={{ zIndex: openDropdown ? 50 : 20 }}
        className={`max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 relative ${openDropdown ? "z-40" : "z-20"}`}
      >
        
        {/* =============================== HEADER (SHOWN ON ALL) ==================================== */}
        <div className="mb-2 sm:mb-3 hidden sm:flex items-center justify-center animate-in fade-in duration-200">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-[10px] sm:text-xs md:text-[13px] font-black uppercase tracking-wider text-center leading-tight shadow-md shadow-amber-400/25 border border-amber-300 max-w-[calc(100vw-2rem)]">
            <img src="/logo.png" alt="BroomBoom Logo" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full object-contain shrink-0" />
            <span>India&apos;s #1 Most Trusted Cab Booking Service</span>
          </div>
        </div>

        <div className="mb-4 sm:mb-6 text-white text-center flex flex-col items-center animate-in fade-in duration-200 px-2">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-black text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            {activeTitle}
          </h1>
          <p className="hidden sm:block text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-sm">
            {activeSubtitle}
          </p>
        </div>

        {/* ================================================================================= */}
        {/* =============================== MOBILE VIEW ==================================== */}
        {/* ================================================================================= */}
        <div className="md:hidden">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
            
            {/* Top Tabs (Compact Height) */}
            <div className="p-2 bg-white border-b border-slate-100">
              <div className="flex bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden">
                <button
                  onClick={() => changeTripType("outstation-oneway")}
                  className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    tripType.includes("outstation")
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Car className={`w-4 h-4 ${tripType.includes("outstation") ? "text-slate-950" : "text-slate-400"}`} />
                  <span className={`text-[10px] font-bold text-center leading-tight ${tripType.includes("outstation") ? "text-slate-950" : "text-slate-700"}`}>
                    Outstation<br/>Cabs
                  </span>
                </button>

                <div className="w-px bg-slate-200 my-2" />

                <button
                  onClick={() => changeTripType("airport")}
                  className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    tripType === "airport"
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Plane className={`w-4 h-4 ${tripType === "airport" ? "text-slate-950" : "text-slate-400"}`} />
                  <span className={`text-[10px] font-bold text-center leading-tight ${tripType === "airport" ? "text-slate-950" : "text-slate-700"}`}>
                    Airport<br/>Cabs
                  </span>
                </button>

                <div className="w-px bg-slate-200 my-2" />

                <button
                  onClick={() => changeTripType("hourly")}
                  className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    tripType === "hourly"
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Clock className={`w-4 h-4 ${tripType === "hourly" ? "text-slate-950" : "text-slate-400"}`} />
                  <span className={`text-[10px] font-bold text-center leading-tight ${tripType === "hourly" ? "text-slate-950" : "text-slate-700"}`}>
                    Hourly<br/>Rentals
                  </span>
                </button>
              </div>
            </div>

            <div className="p-3">
              {/* Info Banner */}
              {tripType.includes("outstation") && (
                <div className="bg-[#FEF6E7] text-[#B9831B] text-[10px] font-medium p-1.5 rounded-md flex items-center gap-1.5 mb-2.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Includes one pick up & drop</span>
                </div>
              )}

              {/* Trip Type Toggle (Swap button removed from here) */}
              {tripType.includes("outstation") && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex flex-1 border border-slate-300 rounded-md p-0.5 bg-white h-[34px]">
                    <button
                      onClick={() => changeTripType("outstation-oneway")}
                      className={`flex-1 text-[12px] font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                        tripType === "outstation-oneway"
                          ? "border border-amber-400 text-slate-950 bg-amber-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${tripType === "outstation-oneway" ? "border-amber-500" : "border-slate-400"}`}>
                        {tripType === "outstation-oneway" && <div className="w-1 h-1 bg-amber-500 rounded-full" />}
                      </div>
                      One Way
                    </button>
                    <button
                      onClick={() => changeTripType("outstation-round")}
                      className={`flex-1 text-[12px] font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                        tripType === "outstation-round"
                          ? "border border-amber-400 text-slate-950 bg-amber-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${tripType === "outstation-round" ? "border-amber-500" : "border-slate-400"}`}>
                        {tripType === "outstation-round" && <div className="w-1 h-1 bg-amber-500 rounded-full" />}
                      </div>
                      Round Trip
                    </button>
                  </div>
                </div>
              )}

              {/* Pickup & Drop Inputs (Compact) */}
              <div className="relative space-y-2">
                <div
                  onClick={() => toggle("from")}
                  className="bg-[#F9FAFB] border border-slate-200 rounded-md p-2.5 flex items-center gap-2.5 cursor-pointer relative"
                >
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <div className="w-px h-3.5 bg-slate-300" />
                    <div className="w-1.5 h-1.5 rounded-full border border-slate-300 bg-white" />
                  </div>
                  <span className={`text-[12px] font-bold uppercase tracking-wide truncate ${fromCity ? "text-slate-900" : "text-slate-400"}`}>
                    {fromCity || "PICK UP ADDRESS"}
                  </span>

                  {openDropdown === "from" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search pickup city..."
                      query={searchFromQuery}
                      onQueryChange={setSearchFromQuery}
                      selected={fromCity}
                      title="Select Pickup City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>

                {/* NEW VERTICAL SWAP BUTTON */}
                <button
                  onClick={handleSwap}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-blue-100 rounded-full flex items-center justify-center shadow-sm hover:bg-blue-50 transition active:scale-95 text-blue-500"
                  title="Swap Locations"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>

                <div
                  onClick={() => toggle("to")}
                  className="bg-[#F9FAFB] border border-slate-200 rounded-md p-2.5 flex items-center gap-2.5 cursor-pointer relative"
                >
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full border border-slate-300 bg-white" />
                  </div>
                  <span className={`text-[12px] font-bold uppercase tracking-wide truncate ${toCity ? "text-slate-900" : "text-slate-400"}`}>
                    {toCity || "DROP ADDRESS"}
                  </span>

                  {openDropdown === "to" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search destination city..."
                      query={searchToQuery}
                      onQueryChange={setSearchToQuery}
                      selected={toCity}
                      align="right"
                      title="Select Destination City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setToCity(n);
                        if (st) setToState(st);
                        if (coords) setToCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>
              </div>

              {/* Add Stops */}
              <button className="text-amber-600 text-[12px] font-bold mt-2 mb-2.5 flex items-center">
                + Add Stops
              </button>

              {/* ============ NEW DATE & TIME UI ============ */}
              <div className={`mb-3 ${tripType === 'outstation-round' ? 'grid grid-cols-2 gap-2' : ''}`}>
                {/* Start Card */}
                <div
                  onClick={() => setMobileDateTimeTarget('pickup')}
                  className="bg-white border border-amber-200 rounded-xl p-3 shadow-sm cursor-pointer hover:border-amber-300 transition-colors"
                >
                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1.5">TRIP START</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span className="text-[13px] font-bold text-slate-900">{formatDateDisplay(pickupDate)}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-[12px] font-semibold text-slate-500 mt-1">{pickupTime}</div>
                </div>

                {/* End Card (Only for Round Trip) */}
                {tripType === 'outstation-round' && (
                  <div
                    onClick={() => setMobileDateTimeTarget('return')}
                    className="bg-white border border-amber-200 rounded-xl p-3 shadow-sm cursor-pointer hover:border-amber-300 transition-colors"
                  >
                    <div className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1.5">TRIP END</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span className="text-[13px] font-bold text-slate-900">{formatDateDisplay(returnDate)}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="text-[12px] font-semibold text-slate-500 mt-1">{dropTime}</div>
                  </div>
                )}
              </div>
              {/* =========================================== */}

              {/* Search Button (Compact) */}
              <button
                type="button"
                onClick={handleSearchSubmit}
                disabled={isSubmittingSearch}
                className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-slate-950 font-bold text-[14px] tracking-wide py-2.5 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmittingSearch ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SEARCHING CABS...</span>
                  </>
                ) : (
                  <span>SEARCH CABS</span>
                )}
              </button>
            </div>
          </div>

          {/* Laurel pill for Mobile */}
          <div className="mt-1 mb-0 flex items-center justify-center gap-1.5 text-white text-[11px] font-semibold tracking-wide drop-shadow-sm select-none">
            <svg className="w-4 h-5 text-white fill-current drop-shadow-sm" viewBox="0 0 24 32" aria-hidden="true">
              <path d="M18 2C16 5 13 7 9 7C11 9 12 11 11 14C8 13 6 11 5 8C5 11 4 14 2 16C4 16 6 15 8 13C8 17 7 20 5 22C7 21 9 19 10 17C11 20 11 23 9 26C11 24 13 21 14 18C16 21 17 24 16 28C18 25 19 22 19 19C21 21 23 23 24 25C24 22 23 19 21 17C23 18 25 18 26 18C24 15 22 14 20 13C22 13 24 12 25 10C22 10 20 10 18 11C19 8 20 5 18 2Z" />
            </svg>
            <span className="font-semibold text-white drop-shadow-sm tracking-wide text-center">
              India&apos;s Top Rated Car Rental Service
            </span>
            <svg className="w-4 h-5 text-white fill-current drop-shadow-sm -scale-x-100" viewBox="0 0 24 32" aria-hidden="true">
              <path d="M18 2C16 5 13 7 9 7C11 9 12 11 11 14C8 13 6 11 5 8C5 11 4 14 2 16C4 16 6 15 8 13C8 17 7 20 5 22C7 21 9 19 10 17C11 20 11 23 9 26C11 24 13 21 14 18C16 21 17 24 16 28C18 25 19 22 19 19C21 21 23 23 24 25C24 22 23 19 21 17C23 18 25 18 26 18C24 15 22 14 20 13C22 13 24 12 25 10C22 10 20 10 18 11C19 8 20 5 18 2Z" />
            </svg>
          </div>
        </div>

        {/* ================================================================================= */}
        {/* =============================== DESKTOP VIEW =================================== */}
        {/* ================================================================================= */}
        <div className="hidden md:block">
          {/* Main card */}
          <div
            style={{ zIndex: openDropdown ? 50 : 20 }}
            className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-200/90 pt-3 sm:pt-4 pb-12 sm:pb-10 px-2.5 sm:px-6 lg:px-8 transition-all ${openDropdown ? "z-40" : "z-20"}`}
          >
            {/* Trip tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-5 gap-2.5 sm:gap-3 border-b border-amber-100/80 mb-3.5 sm:mb-5">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 w-full sm:w-auto">
                {TRIP_TABS.map((tab) => {
                  const active = tripType === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => changeTripType(tab.id)}
                      className={`flex items-center justify-start gap-1 sm:gap-2 cursor-pointer px-2 sm:px-3.5 py-2 sm:py-2 rounded-xl transition-all duration-150 select-none text-left ${
                        active
                          ? "bg-amber-400 text-slate-950 font-black shadow-sm border border-amber-300 ring-2 ring-amber-400/30"
                          : "bg-slate-50 text-slate-700 hover:text-slate-950 hover:bg-amber-50/80 border border-slate-200/80 font-bold"
                      }`}
                    >
                      <span
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                          active ? "border-slate-950 bg-slate-950" : "border-slate-400 bg-white"
                        }`}
                      >
                        {active && <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400" />}
                      </span>
                      <span className="text-[11px] sm:text-sm tracking-tight whitespace-nowrap">{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`text-[8px] sm:text-[9px] font-black uppercase px-1 sm:px-1.5 py-0.5 rounded shrink-0 ${
                            active ? "bg-slate-950 text-amber-400" : "bg-amber-400 text-slate-950"
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400/20 px-3 py-1.5 rounded-lg border border-amber-400/40">
                <img src="/logo.png" alt="BroomBoom" className="w-4 h-4 rounded-full object-contain" />
                <span>BroomBoom Cabs Booking</span>
              </div>
            </div>

            {/* ============ ROUND TRIP ============ */}
            {tripType === "outstation-round" && (
              <div
                style={{ zIndex: openDropdown ? 60 : 10 }}
                className={`border border-amber-200 hover:border-amber-300 rounded-xl flex flex-row bg-amber-200 gap-[1px] shadow-sm transition-colors relative ${openDropdown ? "z-40" : "z-10"}`}
              >
                <div data-field-trigger onClick={() => toggle("from")} style={{ zIndex: openDropdown === "from" ? 80 : 1 }} className={`w-[21%] rounded-l-xl ${openDropdown === "from" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>Pickup Location</div>
                  <div className={value}>{fromCity}</div>
                  <div className={sub}>{fromState}</div>
                  {openDropdown === "from" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search pickup city..."
                      query={searchFromQuery}
                      onQueryChange={setSearchFromQuery}
                      selected={fromCity}
                      title="Select Pickup City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("to")} style={{ zIndex: openDropdown === "to" ? 80 : 1 }} className={`w-[21%] ${openDropdown === "to" ? "relative z-40" : ""} ${field} !pl-8`}>
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="absolute z-20 w-7 h-7 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-amber-400 shadow-md hover:bg-amber-50 text-amber-600 flex items-center justify-center transition active:scale-90 top-1/2 -left-3.5 -translate-x-0 -translate-y-1/2"
                    title="Swap Pickup and Drop"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className={label}>Drop Location</div>
                  <div className={value}>{toCity}</div>
                  <div className={sub}>{toState}</div>
                  {openDropdown === "to" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search destination city..."
                      query={searchToQuery}
                      onQueryChange={setSearchToQuery}
                      selected={toCity}
                      align="right"
                      title="Select Destination City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setToCity(n);
                        if (st) setToState(st);
                        if (coords) setToCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("pickupDate")} style={{ zIndex: openDropdown === "pickupDate" ? 80 : 1 }} className={`w-[15%] ${openDropdown === "pickupDate" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Departure <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className={dateLine}>
                    <span className="text-3xl font-black text-slate-950">{pickupParts.dayNum}</span>
                    <span className="text-base font-bold text-slate-900">{pickupParts.monthYear}</span>
                  </div>
                  <div className="text-[13px] text-slate-500 font-medium mt-1">{pickupParts.weekday}</div>
                  {openDropdown === "pickupDate" && (
                    <CalendarPopover
                      month={calendarMonth}
                      onPrev={prevMonth}
                      onNext={nextMonth}
                      selectedDate={pickupDate}
                      title="Select Departure Date"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(d) => selectCalendarDate(d, true)}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("returnDate")} style={{ zIndex: openDropdown === "returnDate" ? 80 : 1 }} className={`w-[15%] ${openDropdown === "returnDate" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Return <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={dateLine}>
                      <span className="text-3xl font-black text-slate-950">{returnParts.dayNum}</span>
                      <span className="text-base font-bold text-slate-900">{returnParts.monthYear}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        changeTripType("outstation-oneway");
                      }}
                      className="text-amber-400 hover:text-amber-600 transition p-0.5"
                    >
                      <XCircle className="w-3.5 h-3.5 fill-amber-400 text-white" />
                    </button>
                  </div>
                  <div className="text-[13px] text-slate-500 font-medium mt-1">{returnParts.weekday}</div>
                  {openDropdown === "returnDate" && (
                    <CalendarPopover
                      month={calendarMonth}
                      onPrev={prevMonth}
                      onNext={nextMonth}
                      selectedDate={returnDate}
                      align="right"
                      title="Select Return Date"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(d) => selectCalendarDate(d, false)}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("pickupTime")} style={{ zIndex: openDropdown === "pickupTime" ? 80 : 1 }} className={`w-[14%] ${openDropdown === "pickupTime" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Pickup <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className={timeLine}>
                    <span className="text-3xl font-black text-slate-950">{pickupTimeParts.time}</span>
                    <span className="text-xs font-bold text-slate-900">{pickupTimeParts.meridiem}</span>
                  </div>
                  <div className="text-[13px] text-slate-400 font-medium mt-1">Start time</div>
                  {openDropdown === "pickupTime" && (
                    <TimePopover
                      title="Select Pickup Time"
                      value={pickupTime}
                      onChange={setPickupTime}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("dropTime")} style={{ zIndex: openDropdown === "dropTime" ? 80 : 1 }} className={`w-[14%] rounded-r-xl ${openDropdown === "dropTime" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>Drop Time</div>
                  <div className={timeLine}>
                    <span className="text-3xl font-black text-slate-400">{dropTimeParts.time}</span>
                    <span className="text-xs font-bold text-slate-400">{dropTimeParts.meridiem}</span>
                  </div>
                  <div className="text-[13px] text-slate-400 font-medium mt-1">Estimated drop</div>
                  {openDropdown === "dropTime" && (
                    <TimePopover
                      title="Select Drop Time"
                      value={dropTime}
                      onChange={setDropTime}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              </div>
            )}

            {/* ============ ONE-WAY ============ */}
            {tripType === "outstation-oneway" && (
              <div
                style={{ zIndex: openDropdown ? 60 : 10 }}
                className={`border border-amber-200 hover:border-amber-300 rounded-xl flex flex-row bg-amber-200 gap-[1px] shadow-sm transition-colors relative ${openDropdown ? "z-40" : "z-10"}`}
              >
                <div data-field-trigger onClick={() => toggle("from")} style={{ zIndex: openDropdown === "from" ? 80 : 1 }} className={`w-[28%] rounded-l-xl ${openDropdown === "from" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>Pickup Location</div>
                  <div className={value}>{fromCity}</div>
                  <div className={sub}>{fromState}</div>
                  {openDropdown === "from" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search pickup city..."
                      query={searchFromQuery}
                      onQueryChange={setSearchFromQuery}
                      selected={fromCity}
                      title="Select Pickup City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("to")} style={{ zIndex: openDropdown === "to" ? 80 : 1 }} className={`w-[28%] ${openDropdown === "to" ? "relative z-40" : ""} ${field} !pl-8`}>
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="absolute z-20 w-7 h-7 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-amber-400 shadow-md hover:bg-amber-50 text-amber-600 flex items-center justify-center transition active:scale-90 top-1/2 -left-3.5 -translate-x-0 -translate-y-1/2"
                    title="Swap Pickup and Drop"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className={label}>Drop Location</div>
                  <div className={value}>{toCity}</div>
                  <div className={sub}>{toState}</div>
                  {openDropdown === "to" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search destination city..."
                      query={searchToQuery}
                      onQueryChange={setSearchToQuery}
                      selected={toCity}
                      align="right"
                      title="Select Destination City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setToCity(n);
                        if (st) setToState(st);
                        if (coords) setToCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("pickupDate")} style={{ zIndex: openDropdown === "pickupDate" ? 80 : 1 }} className={`w-[18%] ${openDropdown === "pickupDate" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Departure <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className={dateLine}>
                    <span className="text-3xl font-black text-slate-950">{pickupParts.dayNum}</span>
                    <span className="text-base font-bold text-slate-900">{pickupParts.monthYear}</span>
                  </div>
                  <div className="text-[13px] text-slate-500 font-medium mt-1">{pickupParts.weekday}</div>
                  {openDropdown === "pickupDate" && (
                    <CalendarPopover
                      month={calendarMonth}
                      onPrev={prevMonth}
                      onNext={nextMonth}
                      selectedDate={pickupDate}
                      title="Select Departure Date"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(d) => selectCalendarDate(d, true)}
                    />
                  )}
                </div>

                <div
                  data-field-trigger
                  onClick={() => {
                    changeTripType("outstation-round");
                    setOpenDropdown("returnDate");
                  }}
                  style={{ zIndex: openDropdown === "returnDate" ? 80 : 1 }}
                  className={`w-[16%] ${openDropdown === "returnDate" ? "relative z-40" : ""} ${field}`}
                >
                  <div className={label}>
                    Return <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className="text-[13px] text-slate-500 leading-snug mt-0.5 font-medium">
                    Tap to add return date
                  </div>
                </div>

                <div data-field-trigger onClick={() => toggle("pickupTime")} style={{ zIndex: openDropdown === "pickupTime" ? 80 : 1 }} className={`w-[10%] rounded-r-xl ${openDropdown === "pickupTime" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Pickup <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className={timeLine}>
                    <span className="text-3xl font-black text-slate-950">{pickupTimeParts.time}</span>
                    <span className="text-xs font-bold text-slate-900">{pickupTimeParts.meridiem}</span>
                  </div>
                  <div className="text-[13px] text-slate-400 font-medium mt-1">Start time</div>
                  {openDropdown === "pickupTime" && (
                    <TimePopover
                      title="Select Pickup Time"
                      value={pickupTime}
                      onChange={setPickupTime}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              </div>
            )}

            {/* ============ HOURLY ============ */}
            {tripType === "hourly" && (
              <div
                style={{ zIndex: openDropdown ? 60 : 10 }}
                className={`border border-amber-200 hover:border-amber-300 rounded-xl flex flex-row bg-amber-200 gap-[1px] shadow-sm transition-colors relative ${openDropdown ? "z-40" : "z-10"}`}
              >
                <div data-field-trigger onClick={() => toggle("from")} style={{ zIndex: openDropdown === "from" ? 80 : 1 }} className={`w-[40%] rounded-l-xl ${openDropdown === "from" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>Pickup Location</div>
                  <div className={value}>{fromCity}</div>
                  <div className={sub}>{fromState}</div>
                  {openDropdown === "from" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search pickup city..."
                      query={searchFromQuery}
                      onQueryChange={setSearchFromQuery}
                      selected={fromCity}
                      title="Select Pickup Location"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("pickupDate")} style={{ zIndex: openDropdown === "pickupDate" ? 80 : 1 }} className={`w-[25%] ${openDropdown === "pickupDate" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Pickup Date <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className={dateLine}>
                    <span className="text-3xl font-black text-slate-950">{pickupParts.dayNum}</span>
                    <span className="text-base font-bold text-slate-900">{pickupParts.monthYear}</span>
                  </div>
                  <div className="text-[13px] text-slate-500 font-medium mt-1">{pickupParts.weekday}</div>
                  {openDropdown === "pickupDate" && (
                    <CalendarPopover
                      month={calendarMonth}
                      onPrev={prevMonth}
                      onNext={nextMonth}
                      selectedDate={pickupDate}
                      title="Select Pickup Date"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(d) => selectCalendarDate(d, true)}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("pickupTime")} style={{ zIndex: openDropdown === "pickupTime" ? 80 : 1 }} className={`w-[15%] ${openDropdown === "pickupTime" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Pickup <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className={timeLine}>
                    <span className="text-3xl font-black text-slate-950">{pickupTimeParts.time}</span>
                    <span className="text-xs font-bold text-slate-900">{pickupTimeParts.meridiem}</span>
                  </div>
                  <div className="text-[13px] text-slate-400 font-medium mt-1">Start time</div>
                  {openDropdown === "pickupTime" && (
                    <TimePopover
                      title="Select Pickup Time"
                      value={pickupTime}
                      onChange={setPickupTime}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("package")} style={{ zIndex: openDropdown === "package" ? 80 : 1 }} className={`w-[20%] rounded-r-xl ${openDropdown === "package" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>Select Package</div>
                  <div className="text-2xl font-black text-slate-950 tracking-tight leading-none truncate">
                    {hourlyPackage}
                  </div>
                  <div className="text-[13px] text-slate-400 font-medium mt-1">Customizable duration</div>
                  {openDropdown === "package" && (
                    <PopoverShell align="right" width="w-72" title="Hourly Rental Plans" onClose={() => setOpenDropdown(null)}>
                      <div className="text-[10px] font-bold text-amber-600 uppercase px-1.5 pb-1.5">
                        Hourly Rental Plans
                      </div>
                      <div className="space-y-0.5">
                        {HOURLY_PACKAGES.map((pkg) => (
                          <div
                            key={pkg.label}
                            onClick={() => {
                              setHourlyPackage(pkg.label);
                              setOpenDropdown(null);
                            }}
                            className={`p-2 rounded-lg cursor-pointer transition flex items-center justify-between ${
                              hourlyPackage === pkg.label
                                ? "bg-amber-50 border border-amber-300 text-amber-700"
                                : "hover:bg-amber-50/60 text-slate-800"
                            }`}
                          >
                            <div>
                              <div className="font-bold text-[11px] flex items-center gap-1.5">
                                {pkg.label}
                                {pkg.tag && (
                                  <span className="text-[8px] bg-amber-400 text-slate-950 px-1 rounded font-black">
                                    {pkg.tag}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{pkg.desc}</div>
                            </div>
                            {hourlyPackage === pkg.label && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </PopoverShell>
                  )}
                </div>
              </div>
            )}

            {/* ============ AIRPORT ============ */}
            {tripType === "airport" && (
              <div
                style={{ zIndex: openDropdown ? 60 : 10 }}
                className={`border border-amber-200 hover:border-amber-300 rounded-xl flex flex-row bg-amber-200 gap-[1px] shadow-sm transition-colors relative ${openDropdown ? "z-40" : "z-10"}`}
              >
                <div data-field-trigger onClick={() => toggle("from")} style={{ zIndex: openDropdown === "from" ? 80 : 1 }} className={`w-[40%] rounded-l-xl ${openDropdown === "from" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>Pickup Location</div>
                  <div className={value}>{fromCity}</div>
                  <div className={sub}>{fromState}</div>
                  {openDropdown === "from" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search pickup location..."
                      query={searchFromQuery}
                      onQueryChange={setSearchFromQuery}
                      selected={fromCity}
                      title="Select Pickup Location"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("to")} style={{ zIndex: openDropdown === "to" ? 80 : 1 }} className={`w-[40%] ${openDropdown === "to" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>Drop Location</div>
                  <div className={value}>{toCity}</div>
                  <div className={sub}>{toState}</div>
                  {openDropdown === "to" && (
                    <CityPopover
                      citiesList={combinedCities}
                      placeholder="Search drop location..."
                      query={searchToQuery}
                      onQueryChange={setSearchToQuery}
                      selected={toCity}
                      align="right"
                      title="Select Drop Location"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setToCity(n);
                        if (st) setToState(st);
                        if (coords) setToCoords(coords);
                        setOpenDropdown(null);
                      }}
                      inputRef={searchInputRef}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("pickupDate")} style={{ zIndex: openDropdown === "pickupDate" ? 80 : 1 }} className={`w-[10%] ${openDropdown === "pickupDate" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Date <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className={dateLine}>
                    <span className="text-3xl font-black text-slate-950">{pickupParts.dayNum}</span>
                    <span className="text-base font-bold text-slate-900">{pickupParts.monthYear}</span>
                  </div>
                  <div className="text-[13px] text-slate-500 font-medium mt-1">{pickupParts.weekday}</div>
                  {openDropdown === "pickupDate" && (
                    <CalendarPopover
                      month={calendarMonth}
                      onPrev={prevMonth}
                      onNext={nextMonth}
                      selectedDate={pickupDate}
                      title="Select Date"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(d) => selectCalendarDate(d, true)}
                    />
                  )}
                </div>

                <div data-field-trigger onClick={() => toggle("pickupTime")} style={{ zIndex: openDropdown === "pickupTime" ? 80 : 1 }} className={`w-[10%] rounded-r-xl ${openDropdown === "pickupTime" ? "relative z-40" : ""} ${field}`}>
                  <div className={label}>
                    Time <ChevronDown className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className={timeLine}>
                    <span className="text-3xl font-black text-slate-950">{pickupTimeParts.time}</span>
                    <span className="text-xs font-bold text-slate-900">{pickupTimeParts.meridiem}</span>
                  </div>
                  <div className="text-[13px] text-slate-400 font-medium mt-1">Start time</div>
                  {openDropdown === "pickupTime" && (
                    <TimePopover
                      title="Select Pickup Time"
                      value={pickupTime}
                      onChange={setPickupTime}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Footer row with Add Stops */}
            <div className="mt-5 flex flex-row items-center justify-between gap-3 text-xs pb-0">
              <button
                type="button"
                className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-bold transition group self-auto"
              >
                <span className="text-[13px] font-bold">+ Add Stops</span>
                <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                  new
                </span>
              </button>
            </div>

            {/* Centered Search pill */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20" style={{ zIndex: 20 }}>
              <button
                type="button"
                onClick={handleSearchSubmit}
                disabled={isSubmittingSearch}
                className="px-16 sm:px-20 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-slate-950 text-base sm:text-lg font-extrabold tracking-widest uppercase border border-amber-500/40 shadow-[0_8px_26px_rgba(245,158,11,0.45)] hover:shadow-[0_10px_32px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap disabled:opacity-75"
              >
                {isSubmittingSearch ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>SEARCHING...</span>
                  </>
                ) : (
                  <span>SEARCH</span>
                )}
              </button>
            </div>
          </div>

          {/* Laurel pill: "India's Top Rated Car Rental Service" */}
          <div className="mt-6 sm:mt-8 mb-3 sm:mb-2 flex items-center justify-center gap-2 text-white text-[11px] sm:text-[13px] font-semibold tracking-wide drop-shadow-sm select-none">
            <svg className="w-4 h-5 sm:w-5 sm:h-6 text-white fill-current drop-shadow-sm" viewBox="0 0 24 32" aria-hidden="true">
              <path d="M18 2C16 5 13 7 9 7C11 9 12 11 11 14C8 13 6 11 5 8C5 11 4 14 2 16C4 16 6 15 8 13C8 17 7 20 5 22C7 21 9 19 10 17C11 20 11 23 9 26C11 24 13 21 14 18C16 21 17 24 16 28C18 25 19 22 19 19C21 21 23 23 24 25C24 22 23 19 21 17C23 18 25 18 26 18C24 15 22 14 20 13C22 13 24 12 25 10C22 10 20 10 18 11C19 8 20 5 18 2Z" />
            </svg>
            <span className="font-semibold text-white drop-shadow-sm tracking-wide text-center">
              India&apos;s Top Rated Car Rental Service
            </span>
            <svg className="w-4 h-5 sm:w-5 sm:h-6 text-white fill-current drop-shadow-sm -scale-x-100" viewBox="0 0 24 32" aria-hidden="true">
              <path d="M18 2C16 5 13 7 9 7C11 9 12 11 11 14C8 13 6 11 5 8C5 11 4 14 2 16C4 16 6 15 8 13C8 17 7 20 5 22C7 21 9 19 10 17C11 20 11 23 9 26C11 24 13 21 14 18C16 21 17 24 16 28C18 25 19 22 19 19C21 21 23 23 24 25C24 22 23 19 21 17C23 18 25 18 26 18C24 15 22 14 20 13C22 13 24 12 25 10C22 10 20 10 18 11C19 8 20 5 18 2Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* =============================== REVIEWS/RATING PILL (SHOWN ON ALL) ==================================== */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-10 w-full px-2 sm:px-4 pointer-events-none flex justify-center" style={{ zIndex: 10 }}>
        <div className="pointer-events-auto bg-white rounded-2xl sm:rounded-full px-2.5 sm:px-8 py-2 sm:py-3 shadow-[0_12px_36px_rgba(0,0,0,0.14)] border border-slate-100 flex items-center justify-between sm:justify-center gap-1 sm:gap-8 md:gap-11 w-full sm:w-auto max-w-[96vw] sm:max-w-fit overflow-hidden">
          
          {/* App Store */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#007aff] flex items-center justify-center shadow-xs shrink-0 p-1 sm:p-2">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-6 sm:h-6 fill-none stroke-white stroke-[2.4] stroke-linecap-round stroke-linejoin-round" aria-hidden="true">
                <line x1="8" y1="18" x2="16" y2="18" />
                <line x1="5.5" y1="18" x2="11.5" y2="5" />
                <line x1="18.5" y1="18" x2="12.5" y2="5" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[9px] sm:text-[13px] font-black text-slate-900 leading-tight">App Store</div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>
              <div className="text-[8px] sm:text-[11px] font-bold text-slate-900 mt-0.5 whitespace-nowrap">
                (4.2K+ <span className="hidden sm:inline">Reviews</span>)
              </div>
            </div>
          </div>

          {/* Google */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#f8fafc] border border-slate-200/80 flex items-center justify-center shrink-0 p-1 sm:p-2 shadow-xs">
              <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[9px] sm:text-[13px] font-black text-slate-900 leading-tight">Google</div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>
              <div className="text-[8px] sm:text-[11px] font-bold text-slate-900 mt-0.5 whitespace-nowrap">
                (6.1K+ <span className="hidden sm:inline">Reviews</span>)
              </div>
            </div>
          </div>

          {/* Play Store */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <div className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 512 512" className="w-4 h-4 sm:w-7 sm:h-7" aria-hidden="true">
                <path fill="#00c1ff" d="M48.2 24.5C40.6 32.5 36 44.5 36 60v392c0 15.5 4.6 27.5 12.2 35.5l2.4 2.5L270.2 270.4v-4.8L50.6 22z" />
                <path fill="#00f175" d="M343.4 343.6l-73.2-73.2v-4.8l73.2-73.2 2.2 1.3 86.8 49.3c24.8 14.1 24.8 37.1 0 51.2l-86.8 49.3-2.2 1.1z" />
                <path fill="#ff3a44" d="M345.6 342.3L270.2 268 48.2 490c8.2 8.7 21.7 9.8 36.8 1.2l260.6-148.9z" />
                <path fill="#ffc800" d="M345.6 169.7L85 20.8C69.9 12.2 56.4 13.3 48.2 22l222 222 75.4-74.3z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[9px] sm:text-[13px] font-black text-slate-900 leading-tight">Play Store</div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>
              <div className="text-[8px] sm:text-[11px] font-bold text-slate-900 mt-0.5 whitespace-nowrap">
                (15.5K+ <span className="hidden sm:inline">Reviews</span>)
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {mobileDateTimeTarget && (
        <MobileDateTimePicker
          title={mobileDateTimeTarget === "pickup" ? "Select Trip Start Date And Time" : "Select Trip End Date And Time"}
          date={mobileDateTimeTarget === "pickup" ? pickupDate : returnDate}
          time={mobileDateTimeTarget === "pickup" ? pickupTime : dropTime}
          onChangeDate={(d) => (mobileDateTimeTarget === "pickup" ? setPickupDate(d) : setReturnDate(d))}
          onChangeTime={(t) => (mobileDateTimeTarget === "pickup" ? setPickupTime(t) : setDropTime(t))}
          onClose={() => setMobileDateTimeTarget(null)}
        />
      )}
    </div>
  );
};