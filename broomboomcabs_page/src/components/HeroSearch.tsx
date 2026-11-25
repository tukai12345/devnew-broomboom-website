"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRightLeft,
  ArrowUpDown,
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  XCircle,
  X,
  Loader2,
  Plane,
  Car,
  Clock,
  Info,
  Calendar,
  Plus,
} from "lucide-react";
import { CITIES } from "@/data/cabsData";
import { api } from "@/services/api";
import { getStoredUser } from "@/utils/auth";

export interface SearchParams {
  tripType: "outstation-oneway" | "outstation-round" | "airport" | "hourly" | "daily";
  fromCity: string;
  toCity: string;
  stops?: string[];
  stopCoords?: { lat: number; lng: number }[];
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

interface StopPoint {
  id: string;
  city: string;
  state: string;
  coords: { lat: number; lng: number } | null;
}

interface HeroSearchProps {
  activeTripType: string;
  onTripTypeChange: (tripType: string) => void;
  onSearch: (params: SearchParams) => void;
  initialFrom?: string;
  initialTo?: string;
  heading?: { title: React.ReactNode; subtitle?: string; badge?: string };
  navigateOnTabClick?: boolean;
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

interface IndexedCity {
  id: string;
  name: string;
  state: string;
  searchKey: string;
}

/* ------------------------------- data ------------------------------- */

const TRIP_TABS: { id: TripType; label: string; badge?: string }[] = [
  { id: "outstation-oneway", label: "Outstation One-Way" },
  { id: "outstation-round", label: "Outstation Round-Trip" },
  { id: "airport", label: "Airport Transfers" },
  { id: "hourly", label: "Hourly Rentals", badge: "new" },
];

const HOURLY_PACKAGES = [
  { label: "1 hr 15 kms", desc: "Quick city errand or short transit", tag: "NEW" },
  { label: "5 hrs 50 kms", desc: "Half-day city tour or shopping", tag: "POPULAR" },
  { label: "8 hrs 80 kms", desc: "Full-day business or city exploration", tag: "POPULAR" },
  { label: "10 hrs 100 kms", desc: "Extended day errands & meetings", tag: "BEST VALUE" },
  { label: "12 hrs 120 kms", desc: "Full day disposal & multi-city stops", tag: null },
];

const MAX_STOPS = 3;

// Only show the top 10 static cities in the search bar (never DB-stored user searches)
const TOP_10_CITIES: IndexedCity[] = CITIES.slice(0, 10).map((c) => ({
  id: c.id,
  name: c.name,
  state: c.state,
  searchKey: `${c.name} ${c.state}`.toLowerCase(),
}));

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

const getTodayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const getCategoryBufferMinutes = (tripType?: string): number => {
  if (!tripType) return 15;
  if (tripType === "airport") return 15;
  if (tripType === "hourly") return 30;
  return 60;
};

export const getMinimumPickupDateObj = (tripType?: string, baseNow = new Date()): Date => {
  const d = new Date(baseNow);
  const fracMinutes = d.getMinutes() + d.getSeconds() / 60;
  const roundedMinutes = Math.ceil(fracMinutes / 15) * 15;
  const buffer = getCategoryBufferMinutes(tripType);
  d.setMinutes(roundedMinutes + buffer, 0, 0);
  return d;
};

export const getMinimumPickupDateStr = (tripType?: string, baseNow = new Date()): string => {
  const d = getMinimumPickupDateObj(tripType, baseNow);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const getCurrentTimeStr = (tripType?: string, baseNow = new Date()): string => {
  const d = getMinimumPickupDateObj(tripType, baseNow);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  const ampm = hours < 12 ? "AM" : "PM";
  return `${String(h12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
};

export const isTimeInPastForToday = (
  timeStr: string,
  dateStr: string,
  tripType?: string
): boolean => {
  if (!dateStr || !timeStr) return false;
  const minObj = getMinimumPickupDateObj(tripType);
  const minDateStr = `${minObj.getFullYear()}-${String(minObj.getMonth() + 1).padStart(2, "0")}-${String(minObj.getDate()).padStart(2, "0")}`;
  if (dateStr < minDateStr) return true;
  if (dateStr > minDateStr) return false;

  const { hour, minute, meridiem } = parseTimeDetails(timeStr);
  let h = parseInt(hour, 10);
  if (meridiem.toUpperCase() === "PM" && h < 12) h += 12;
  if (meridiem.toUpperCase() === "AM" && h === 12) h = 0;
  const targetMinutes = h * 60 + parseInt(minute, 10);
  const minMinutes = minObj.getHours() * 60 + minObj.getMinutes();

  return targetMinutes < minMinutes;
};

export const isTimeSlotBeforeNow = (
  h12Str: string,
  mStr: string,
  mer: string,
  targetDate: string,
  tripType?: string
): boolean => {
  if (!targetDate) return false;
  const minObj = getMinimumPickupDateObj(tripType);
  const minDateStr = `${minObj.getFullYear()}-${String(minObj.getMonth() + 1).padStart(2, "0")}-${String(minObj.getDate()).padStart(2, "0")}`;
  if (targetDate < minDateStr) return true;
  if (targetDate > minDateStr) return false;

  let h = parseInt(h12Str, 10);
  if (mer.toUpperCase() === "PM" && h < 12) h += 12;
  if (mer.toUpperCase() === "AM" && h === 12) h = 0;
  const targetMinutes = h * 60 + parseInt(mStr, 10);
  const minMinutes = minObj.getHours() * 60 + minObj.getMinutes();

  return targetMinutes < minMinutes;
};

/* --------------------------- sub-components --------------------------- */

const MobileDateTimePicker: React.FC<{
  title: string;
  date: string;
  time: string;
  tripType?: string;
  minDate?: string;
  onChangeDate: (date: string) => void;
  onChangeTime: (time: string) => void;
  onClose: () => void;
}> = React.memo(({ title, date, time, tripType, minDate, onChangeDate, onChangeTime, onClose }) => {
  const isPickup = title.toLowerCase().includes("pickup");
  const { hour, minute, meridiem } = parseTimeDetails(time);

  useEffect(() => {
    if (isPickup && isTimeInPastForToday(time, date, tripType)) {
      onChangeTime(getCurrentTimeStr(tripType));
    }
  }, [date, isPickup, time, onChangeTime, tripType]);

  const handleDateSelect = (selectedDate: string) => {
    onChangeDate(selectedDate);
    if (isPickup && isTimeInPastForToday(time, selectedDate, tripType)) {
      onChangeTime(getCurrentTimeStr(tripType));
    }
  };

  const setTime = (h: string, m: string, mer: string) => {
    if (isPickup && isTimeSlotBeforeNow(h, m, mer, date, tripType)) {
      onChangeTime(getCurrentTimeStr(tripType));
      return;
    }
    onChangeTime(`${h}:${m} ${mer}`);
  };

  const isMeridiemDisabled = (mer: string) => {
    if (!isPickup || !date) return false;
    return isTimeSlotBeforeNow("11", "45", mer, date, tripType);
  };

  const isHourDisabled = (h: string) => {
    if (!isPickup || !date) return false;
    return isTimeSlotBeforeNow(h, "45", meridiem, date, tripType);
  };

  const isMinuteDisabled = (m: string) => {
    if (!isPickup || !date) return false;
    return isTimeSlotBeforeNow(hour, m, meridiem, date, tripType);
  };

  const dates = useMemo(() => {
    const list = [];
    const todayStr = getTodayStr();
    const start = minDate ? new Date(`${minDate}T00:00:00`) : new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const label =
        value === todayStr
          ? "Today"
          : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      list.push({ value, label });
    }
    return list;
  }, [minDate]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end md:hidden">
      <div className="fixed inset-0 bg-slate-950/60" onClick={onClose} />
      <div className="relative z-10 w-full max-h-[90vh] bg-white rounded-t-3xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer">
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="flex h-[300px] border-b border-slate-100">
          <div className="flex-1 overflow-y-auto snap-y snap-mandatory border-r border-slate-100">
            {dates.map((d) => (
              <div
                key={d.value}
                onClick={() => handleDateSelect(d.value)}
                className={`p-3 text-sm font-semibold snap-center cursor-pointer transition-colors ${
                  date === d.value ? "bg-amber-50 text-amber-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {d.label}
              </div>
            ))}
          </div>

          <div className="flex-[1.5] flex">
            <div className="flex-1 overflow-y-auto snap-y snap-mandatory">
              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((h) => {
                const disabled = isHourDisabled(h);
                return (
                  <button
                    type="button"
                    key={h}
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) {
                        let nextMin = minute;
                        if (isTimeSlotBeforeNow(h, nextMin, meridiem, date)) {
                          const futureMin = ["00", "15", "30", "45"].find(
                            (m) => !isTimeSlotBeforeNow(h, m, meridiem, date)
                          );
                          nextMin = futureMin || minute;
                        }
                        setTime(h, nextMin, meridiem);
                      }
                    }}
                    className={`w-full py-3 text-center text-sm font-semibold snap-center transition-colors ${
                      disabled
                        ? "opacity-25 text-slate-300 cursor-not-allowed pointer-events-none"
                        : hour === h
                        ? "text-amber-600 bg-amber-50 cursor-pointer font-bold"
                        : "text-slate-600 cursor-pointer hover:bg-slate-50"
                    }`}
                  >
                    {h}
                  </button>
                );
              })}
            </div>
            <div className="flex-1 overflow-y-auto snap-y snap-mandatory">
              {["00", "15", "30", "45"].map((m) => {
                const disabled = isMinuteDisabled(m);
                return (
                  <button
                    type="button"
                    key={m}
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) setTime(hour, m, meridiem);
                    }}
                    className={`w-full py-3 text-center text-sm font-semibold snap-center transition-colors ${
                      disabled
                        ? "opacity-25 text-slate-300 cursor-not-allowed pointer-events-none"
                        : minute === m
                        ? "text-amber-600 bg-amber-50 cursor-pointer font-bold"
                        : "text-slate-600 cursor-pointer hover:bg-slate-50"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
            <div className="w-16 overflow-y-auto snap-y snap-mandatory">
              {["AM", "PM"].map((mer) => {
                const disabled = isMeridiemDisabled(mer);
                return (
                  <button
                    type="button"
                    key={mer}
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) {
                        if (isTimeSlotBeforeNow(hour, minute, mer, date)) {
                          onChangeTime(getCurrentTimeStr());
                        } else {
                          setTime(hour, minute, mer);
                        }
                      }
                    }}
                    className={`w-full py-3 text-center text-sm font-semibold snap-center transition-colors ${
                      disabled
                        ? "opacity-25 text-slate-300 cursor-not-allowed pointer-events-none"
                        : meridiem === mer
                        ? "text-amber-600 bg-amber-50 cursor-pointer font-bold"
                        : "text-slate-600 cursor-pointer hover:bg-slate-50"
                    }`}
                  >
                    {mer}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3">
            <div className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1">
              {title.replace("Select ", "")}
            </div>
            <div className="text-base font-bold text-slate-900">
              {new Date(date).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
            </div>
            <div className="text-sm font-semibold text-slate-600 mt-0.5">{time}</div>
          </div>
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-md cursor-pointer">
            CONFIRM
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
});
MobileDateTimePicker.displayName = "MobileDateTimePicker";

const PopoverShell: React.FC<{
  children: React.ReactNode;
  align?: "left" | "right";
  width?: string;
  title?: string;
  onClose?: () => void;
  fullScreenOnMobile?: boolean;
}> = React.memo(({
  children,
  align = "left",
  width = "w-80",
  title,
  onClose,
  fullScreenOnMobile = false,
}) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (typeof document === "undefined") return null;

  if (isMobile) {
    if (fullScreenOnMobile) {
      return createPortal(
        <div
          data-popover-shell
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[99999] bg-white flex flex-col"
        >
          <div className="pt-[max(0.75rem,env(safe-area-inset-top))] px-4 pb-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              {onClose && (
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
              )}
              <div className="flex items-center gap-2">
                <div className="w-2 h-4 bg-amber-400 rounded-full" />
                <h3 className="font-black text-slate-900 text-base tracking-tight">
                  {title || "Select Location"}
                </h3>
              </div>
            </div>
            {onClose && (
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
            )}
          </div>

          <div className="flex-1 overflow-hidden p-4 flex flex-col min-h-0 bg-white">
            {children}
          </div>
        </div>,
        document.body
      );
    }

    return createPortal(
      <div
        data-popover-shell
        className="fixed inset-0 z-[9999] flex flex-col justify-end"
      >
        <div
          className="fixed inset-0 bg-slate-950/60"
          onClick={onClose}
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-4 pb-[max(2rem,env(safe-area-inset-bottom))] flex flex-col"
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
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
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
      className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 ${width} max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl shadow-xl border border-amber-300 ring-1 ring-black/5 z-50 p-3`}
    >
      {children}
    </div>
  );
});
PopoverShell.displayName = "PopoverShell";

const CityPopover: React.FC<{
  placeholder: string;
  selected: string;
  onSelect: (name: string, state?: string, coords?: { lat: number; lng: number }) => void;
  align?: "left" | "right";
  title?: string;
  onClose?: () => void;
}> = React.memo(({
  placeholder,
  selected,
  onSelect,
  align = "left",
  title,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const localInputRef = useRef<HTMLInputElement>(null);

  // Filter strictly from TOP_10_CITIES so DB-saved searches never appear in the search bar
  const displayItems = useMemo(() => {
    const lowerQ = query.trim().toLowerCase();
    const filtered = lowerQ
      ? TOP_10_CITIES.filter((c) => c.searchKey.includes(lowerQ))
      : TOP_10_CITIES;

    return filtered.map((c) => ({
      id: c.id,
      primaryTitle: c.name,
      name: `${c.name}, ${c.state}`,
      fullAddress: `${c.name}, ${c.state}`,
      state: c.state,
    }));
  }, [query]);

  useEffect(() => {
    localInputRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <PopoverShell
      width="w-80 md:w-96"
      align={align}
      title={title || (placeholder ? placeholder.replace("Search ", "Select ").replace("...", "") : "Select Location")}
      onClose={onClose}
      fullScreenOnMobile={true}
    >
      <div className="relative mb-3 shrink-0">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <input
          ref={localInputRef}
          autoFocus
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (displayItems.length > 0) {
                const item = displayItems[0];
                onSelect(item.fullAddress || item.name, item.state);
              } else if (query.trim()) {
                onSelect(query.trim());
              }
            }
          }}
          className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition"
        />
        {query && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setQuery("");
            }}
            className="absolute right-2.5 top-2.5 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs cursor-pointer"
            aria-label="Clear"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex-1 md:max-h-64 overflow-y-auto space-y-0.5 divide-y divide-slate-100 min-h-0">
        {displayItems.length === 0 ? (
          query.trim() ? (
            <div
              onClick={() => onSelect(query.trim())}
              className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs bg-amber-50/70 hover:bg-amber-100 text-slate-900 font-bold transition"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="truncate">Use &ldquo;{query.trim()}&rdquo;</span>
              </div>
              <span className="text-[10px] font-black uppercase text-amber-700 shrink-0">Select</span>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 text-center py-6">
              Select a city from the list
            </p>
          )
        ) : (
          displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item.fullAddress || item.name, item.state)}
              className={`flex items-start justify-between p-2.5 rounded-xl cursor-pointer text-xs transition group ${
                selected === item.name || selected === item.fullAddress || (item.primaryTitle && selected.startsWith(item.primaryTitle))
                  ? "bg-amber-50 text-amber-950 font-bold"
                  : "hover:bg-slate-50 text-slate-800"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0 pr-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-amber-100 text-slate-600 group-hover:text-amber-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  {(item.name || "").toLowerCase().includes("airport") ? (
                    <Plane className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[13px] text-slate-950 truncate">
                    {item.primaryTitle || item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-2 leading-snug mt-0.5 break-words">
                    {item.state}
                  </div>
                </div>
              </div>
              {(selected === item.name || selected === item.fullAddress) && (
                <Check className="w-4 h-4 text-amber-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </PopoverShell>
  );
});
CityPopover.displayName = "CityPopover";

const CalendarPopover: React.FC<{
  month: Date;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  selectedDate: string;
  minDate?: string;
  onSelect: (day: number) => void;
  align?: "left" | "right";
  title?: string;
  onClose?: () => void;
}> = React.memo(({ month, onPrev, onNext, selectedDate, minDate, onSelect, align = "left", title, onClose }) => {
  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const startDow = new Date(year, monthIdx, 1).getDay();
  const monthName = month.toLocaleString("en-US", { month: "long" });

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonthIdx = today.getMonth();
  const todayDay = today.getDate();

  const isPastMonth = year < currentYear || (year === currentYear && monthIdx <= currentMonthIdx);

  return (
    <PopoverShell width="w-72" align={align} title={title || "Select Date"} onClose={onClose}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <button
          type="button"
          disabled={isPastMonth}
          onClick={isPastMonth ? undefined : onPrev}
          className={`p-1.5 rounded-md transition ${
            isPastMonth
              ? "opacity-20 text-slate-300 cursor-not-allowed pointer-events-none"
              : "hover:bg-slate-100 text-slate-700 cursor-pointer"
          }`}
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="font-bold text-slate-900 text-xs sm:text-[11px]">
          {monthName} {year}
        </div>
        <button
          type="button"
          onClick={onNext}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          aria-label="Next Month"
        >
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

          const formattedDayStr = `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isBeforeToday =
            year < currentYear ||
            (year === currentYear && monthIdx < currentMonthIdx) ||
            (year === currentYear && monthIdx === currentMonthIdx && day < todayDay);
          const isBeforeMinDate = minDate ? formattedDayStr < minDate : false;
          const isPastDate = isBeforeToday || isBeforeMinDate;

          if (isPastDate) {
            return (
              <span
                key={day}
                className="p-2 sm:p-1 text-xs sm:text-[11px] font-medium text-slate-300 opacity-20 pointer-events-none select-none text-center"
              >
                {day}
              </span>
            );
          }

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelect(day)}
              className={`p-2 sm:p-1 text-xs sm:text-[11px] font-bold rounded-lg sm:rounded-md transition cursor-pointer ${
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
});
CalendarPopover.displayName = "CalendarPopover";

const TimePopover: React.FC<{
  title: string;
  value: string;
  onChange: (v: string) => void;
  date?: string;
  tripType?: string;
  align?: "left" | "right";
  onClose?: () => void;
}> = React.memo(({
  title,
  value,
  onChange,
  date,
  tripType,
  align = "right",
  onClose,
}) => {
  const isPickup = title.toLowerCase().includes("pickup");
  const { hour, minute, meridiem } = parseTimeDetails(value);

  useEffect(() => {
    if (isPickup && date && isTimeInPastForToday(value, date, tripType)) {
      onChange(getCurrentTimeStr(tripType));
    }
  }, [date, isPickup, value, onChange, tripType]);

  const set = (h: string, m: string, mer: string) => {
    if (isPickup && date && isTimeSlotBeforeNow(h, m, mer, date, tripType)) {
      onChange(getCurrentTimeStr(tripType));
      return;
    }
    onChange(`${h}:${m} ${mer}`);
  };

  const isMeridiemDisabled = (mer: string) => {
    if (!isPickup || !date) return false;
    return isTimeSlotBeforeNow("11", "45", mer, date, tripType);
  };

  const isHourDisabled = (h: string) => {
    if (!isPickup || !date) return false;
    return isTimeSlotBeforeNow(h, "45", meridiem, date, tripType);
  };

  const isMinuteDisabled = (m: string) => {
    if (!isPickup || !date) return false;
    return isTimeSlotBeforeNow(hour, m, meridiem, date, tripType);
  };

  const Column: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}>
      {children}
    </div>
  );

  const Option: React.FC<{
    active: boolean;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ active, disabled = false, onClick, children }) => (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`w-full py-2.5 sm:py-2 text-[13px] font-bold snap-center transition-colors ${
        disabled
          ? "opacity-25 cursor-not-allowed text-slate-300 pointer-events-none"
          : active
          ? "bg-amber-400 text-slate-950 rounded-lg sm:rounded-none"
          : "text-slate-700 hover:bg-slate-50 cursor-pointer"
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
          {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((h) => {
            const disabled = isHourDisabled(h);
            return (
              <Option
                key={h}
                active={hour === h}
                disabled={disabled}
                onClick={() => {
                  let nextMin = minute;
                  if (date && isTimeSlotBeforeNow(h, nextMin, meridiem, date, tripType)) {
                    const futureMin = ["00", "15", "30", "45"].find(
                      (m) => !isTimeSlotBeforeNow(h, m, meridiem, date, tripType)
                    );
                    nextMin = futureMin || minute;
                  }
                  set(h, nextMin, meridiem);
                }}
              >
                {h}
              </Option>
            );
          })}
        </Column>
        <Column className="flex-1 border-r border-slate-100">
          {["00", "15", "30", "45"].map((m) => {
            const disabled = isMinuteDisabled(m);
            return (
              <Option
                key={m}
                active={minute === m}
                disabled={disabled}
                onClick={() => set(hour, m, meridiem)}
              >
                {m}
              </Option>
            );
          })}
        </Column>
        <Column className="w-16 sm:w-16">
          {["AM", "PM"].map((mer) => {
            const disabled = isMeridiemDisabled(mer);
            return (
              <Option
                key={mer}
                active={meridiem === mer}
                disabled={disabled}
                onClick={() => {
                  if (date && isTimeSlotBeforeNow(hour, minute, mer, date)) {
                    onChange(getCurrentTimeStr());
                  } else {
                    set(hour, minute, mer);
                  }
                }}
              >
                {mer}
              </Option>
            );
          })}
        </Column>
      </div>

      {onClose && (
        <div className="md:hidden mt-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer"
          >
            Confirm Time ({value})
          </button>
        </div>
      )}
    </PopoverShell>
  );
});
TimePopover.displayName = "TimePopover";

/* ------------------------------ main ------------------------------ */

export const HeroSearch: React.FC<HeroSearchProps> = ({
  activeTripType,
  onTripTypeChange,
  onSearch,
  initialFrom = "",
  initialTo = "",
  heading,
}) => {
  const initialType = (activeTripType as TripType) || "outstation-round";
  const [tripType, setTripType] = useState<TripType>(initialType);
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

  // Multi-stop route state
  const [stops, setStops] = useState<StopPoint[]>([]);
  const [activeStopDropdownId, setActiveStopDropdownId] = useState<string | null>(null);

  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  const [routeDurationMinutes, setRouteDurationMinutes] = useState<number | null>(null);

  const [pickupDate, setPickupDate] = useState(() => getMinimumPickupDateStr(initialType));
  const [pickupTime, setPickupTime] = useState(() => getCurrentTimeStr(initialType));
  const [returnDate, setReturnDate] = useState(getTodayStr);
  const [dropTime, setDropTime] = useState("09:45 PM");
  const [hourlyPackage, setHourlyPackage] = useState("8 hrs 80 kms");
  const [hourlyPackagesList, setHourlyPackagesList] = useState(HOURLY_PACKAGES);

  useEffect(() => {
    let mounted = true;
    const fetchLiveRentalPackages = async () => {
      try {
        const pkgs = await api.getDynamicRentalPackages();
        if (mounted && Array.isArray(pkgs) && pkgs.length > 0) {
          const mapped = pkgs.map((p) => {
            const h = p.packageHours || parseInt(p.duration, 10);
            const km = p.includedKms || parseInt(p.km, 10);
            const label = `${h} hr${h > 1 ? "s" : ""} ${km} kms`;
            const tag = h === 1 ? "NEW" : h === 8 ? "POPULAR" : h === 10 ? "BEST VALUE" : null;
            return {
              label,
              desc: p.idealFor || `${h} hours disposal within ${km} kms`,
              tag,
            };
          });
          setHourlyPackagesList(mapped);
        }
      } catch (err) {
        console.warn("Could not load dynamic hourly packages:", err);
      }
    };

    fetchLiveRentalPackages();

    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === "broomboom_cached_rental_packages" ||
        e.key === "broomboom_rental_fares" ||
        e.key === "broomboom_rental_packages_updated"
      ) {
        fetchLiveRentalPackages();
      }
    };
    const handleCustom = () => fetchLiveRentalPackages();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("broomboom_rental_fares_updated", handleCustom);
    return () => {
      mounted = false;
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("broomboom_rental_fares_updated", handleCustom);
    };
  }, []);

  const [airportMode, setAirportMode] = useState<"to-airport" | "from-airport">("to-airport");

  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileDateTimeTarget, setMobileDateTimeTarget] = useState<"pickup" | "return" | null>(null);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [hasInteracted, setHasInteracted] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (activeTripType) {
      setHasInteracted(true);
      const t = activeTripType as TripType;
      setTripType(t);
      const minDate = getMinimumPickupDateStr(t);
      setPickupDate((prevDate) => {
        const nextDate = prevDate < minDate ? minDate : prevDate;
        setPickupTime((prevTime) =>
          nextDate <= minDate && isTimeInPastForToday(prevTime, minDate, t)
            ? getCurrentTimeStr(t)
            : prevTime
        );
        return nextDate;
      });
    }
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
      setActiveStopDropdownId(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Multi-leg route distance calculation (From -> Stop 1 -> ... -> To)
  const computeFullRouteMetrics = useCallback(
    async (
      originCity: string,
      destCity: string,
      originCoords: { lat: number; lng: number } | null,
      destCoords: { lat: number; lng: number } | null,
      activeStops: StopPoint[]
    ) => {
      const validStops = tripType.includes("outstation")
        ? activeStops.filter((s) => s.city.trim().length > 0)
        : [];

      const waypoints = [
        { city: originCity.trim(), coords: originCoords },
        ...validStops.map((s) => ({ city: s.city.trim(), coords: s.coords })),
        { city: destCity.trim(), coords: destCoords },
      ];

      let totalDist = 0;
      let totalDur = 0;

      for (let i = 0; i < waypoints.length - 1; i++) {
        const legFrom = waypoints[i];
        const legTo = waypoints[i + 1];
        if (!legFrom.city || !legTo.city || legFrom.city.toLowerCase() === legTo.city.toLowerCase()) {
          continue;
        }

        const payload: {
          from: string;
          to: string;
          pickupLat?: number;
          pickupLng?: number;
          dropLat?: number;
          dropLng?: number;
        } = {
          from: legFrom.city,
          to: legTo.city,
        };

        if (legFrom.coords) {
          payload.pickupLat = legFrom.coords.lat;
          payload.pickupLng = legFrom.coords.lng;
        }
        if (legTo.coords) {
          payload.dropLat = legTo.coords.lat;
          payload.dropLng = legTo.coords.lng;
        }

        const res = await api.calculateDistance(payload);
        if (res && res.distance > 0) {
          totalDist += res.distance;
          totalDur += res.durationMinutes || 0;
        } else {
          return null;
        }
      }

      return totalDist > 0 ? { distance: totalDist, durationMinutes: totalDur } : null;
    },
    [tripType]
  );

  useEffect(() => {
    let cancelled = false;

    async function calculateMapDistance() {
      const validStops = tripType.includes("outstation")
        ? stops.filter((s) => s.city.trim().length > 0)
        : [];

      if (
        !fromCity ||
        !toCity ||
        (validStops.length === 0 && fromCity.trim().toLowerCase() === toCity.trim().toLowerCase())
      ) {
        setRouteDistance(null);
        setRouteDurationMinutes(null);
        return;
      }

      try {
        const res = await computeFullRouteMetrics(fromCity, toCity, fromCoords, toCoords, stops);
        if (!cancelled) {
          if (res && res.distance > 0) {
            setRouteDistance(res.distance);
            setRouteDurationMinutes(res.durationMinutes);
          } else {
            setRouteDistance(null);
            setRouteDurationMinutes(null);
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
  }, [fromCity, toCity, fromCoords, toCoords, stops, tripType, computeFullRouteMetrics]);

  const toggle = (key: DropdownKey) => {
    setActiveStopDropdownId(null);
    setOpenDropdown((cur) => (cur === key ? null : key));
  };

  /* -------------------- Stop handlers -------------------- */
  const handleAddStop = () => {
    if (stops.length >= MAX_STOPS) return;
    const newId = `stop_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setStops((prev) => [...prev, { id: newId, city: "", state: "", coords: null }]);
    setOpenDropdown(null);
    setActiveStopDropdownId(newId);
  };

  const handleRemoveStop = (id: string) => {
    setStops((prev) => prev.filter((s) => s.id !== id));
    if (activeStopDropdownId === id) {
      setActiveStopDropdownId(null);
    }
  };

  const handleSelectStop = useCallback(
    (id: string, city: string, state?: string, coords?: { lat: number; lng: number }) => {
      setStops((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                city,
                state: state || s.state,
                coords: coords || null,
              }
            : s
        )
      );
      setActiveStopDropdownId(null);
    },
    []
  );

  const toggleStopDropdown = (stop: StopPoint) => {
    setOpenDropdown(null);
    setActiveStopDropdownId((cur) => (cur === stop.id ? null : stop.id));
  };

  const changeTripType = (t: TripType) => {
    setHasInteracted(true);
    setTripType(t);
    onTripTypeChange(t);

    const minDate = getMinimumPickupDateStr(t);
    if (pickupDate <= minDate) {
      if (pickupDate < minDate) {
        setPickupDate(minDate);
      }
      if (isTimeInPastForToday(pickupTime, minDate, t)) {
        setPickupTime(getCurrentTimeStr(t));
      }
    }
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
    if (stops.length > 1) {
      setStops((prev) => [...prev].reverse());
    }
  };

  const [isSubmittingSearch, setIsSubmittingSearch] = useState(false);

  const handleSearchSubmit = async () => {
    setIsSubmittingSearch(true);
    let finalDist = routeDistance;
    let finalDur = routeDurationMinutes;

    const validStops = tripType.includes("outstation")
      ? stops.filter((s) => s.city.trim().length > 0)
      : [];

    if (
      !finalDist &&
      fromCity &&
      toCity &&
      (validStops.length > 0 || fromCity.trim().toLowerCase() !== toCity.trim().toLowerCase())
    ) {
      try {
        const distPromise = computeFullRouteMetrics(fromCity, toCity, fromCoords, toCoords, stops);
        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500));
        const res = await Promise.race([distPromise, timeoutPromise]);
        if (res && res.distance > 0) {
          finalDist = res.distance;
          finalDur = res.durationMinutes;
          setRouteDistance(res.distance);
          setRouteDurationMinutes(res.durationMinutes);
        }
      } catch {}
    }

    const minPickupDate = getMinimumPickupDateStr(tripType);
    const effectivePickupDate = pickupDate < minPickupDate ? minPickupDate : pickupDate;
    const validPickupTime =
      isTimeInPastForToday(pickupTime, effectivePickupDate, tripType)
        ? getCurrentTimeStr(tripType)
        : pickupTime;

    const stopCities = validStops.map((s) => s.city.trim());
    const resolvedStopCoords = validStops
      .filter((s): s is StopPoint & { coords: { lat: number; lng: number } } => Boolean(s.coords))
      .map((s) => s.coords);

    let detectedPhone: string | undefined = undefined;
    let detectedName: string | undefined = undefined;
    try {
      if (typeof window !== "undefined") {
        const authUser = getStoredUser();
        if (authUser) {
          detectedPhone = authUser.phone || authUser.identifier;
          detectedName = authUser.name;
        }
        if (!detectedPhone) {
          const raw =
            sessionStorage.getItem("broomboom_user") ||
            localStorage.getItem("broomboom_user") ||
            localStorage.getItem("user");
          if (raw) {
            const parsed = JSON.parse(raw);
            detectedPhone = parsed.phone || parsed.identifier || parsed.mobile;
            detectedName = parsed.name;
          }
        }
        if (!detectedPhone) {
          detectedPhone =
            localStorage.getItem("broomboom_user_phone") ||
            sessionStorage.getItem("broomboom_user_phone") ||
            undefined;
        }
      }
    } catch {}

    // Store search details in DB (never fed back into the search bar dropdown)
    const leadPayload = {
      serviceType: tripType,
      tripType,
      fromCity,
      toCity: toCity || undefined,
      stops: stopCities.length > 0 ? stopCities : undefined,
      pickupAddress: fromCity,
      dropAddress: toCity || undefined,
      pickupDate: effectivePickupDate,
      pickupTime: validPickupTime,
      returnDate: tripType === "outstation-round" ? returnDate : undefined,
      returnTime: dropTime || undefined,
      dropTime: dropTime || undefined,
      hourlyPackage: tripType === "hourly" ? hourlyPackage : undefined,
      airportMode: tripType === "airport" ? airportMode : undefined,
      distanceKm: finalDist ?? undefined,
      durationMinutes: finalDur ?? undefined,
      customerName: detectedName,
      customerMobile: detectedPhone,
      source: "Hero Search",
      rawSearchParams: {
        tripType,
        fromCity,
        toCity,
        stops: stopCities,
        pickupDate: effectivePickupDate,
        pickupTime: validPickupTime,
        returnDate,
        returnTime: dropTime,
        hourlyPackage,
        airportMode,
        distanceKm: finalDist,
        durationMinutes: finalDur,
        timestamp: new Date().toISOString(),
      },
    };

    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("broomboom_last_search_lead", JSON.stringify(leadPayload));
      }
    } catch {}

    api.createBookingLead(leadPayload).catch(() => {});

    onSearch({
      tripType,
      fromCity,
      toCity,
      stops: stopCities.length > 0 ? stopCities : undefined,
      stopCoords: resolvedStopCoords.length > 0 ? resolvedStopCoords : undefined,
      pickupDate: effectivePickupDate,
      pickupTime: validPickupTime,
      returnDate,
      returnTime: dropTime,
      dropTime,
      hourlyPackage,
      airportMode: tripType === "airport" ? airportMode : undefined,
      distanceKm: finalDist ?? undefined,
      durationMinutes: finalDur ?? undefined,
      fromCoords: fromCoords || undefined,
      toCoords: toCoords || undefined,
    });

    setIsSubmittingSearch(false);
  };

  const prevMonth = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setCalendarMonth((prev) => {
      const target = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return target < currentMonth ? prev : target;
    });
  }, []);

  const nextMonth = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const selectCalendarDate = (day: number, isPickup: boolean) => {
    const formatted = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (isPickup) {
      const minDate = getMinimumPickupDateStr(tripType);
      if (formatted < minDate) return;
      setPickupDate(formatted);
      if (returnDate < formatted) {
        setReturnDate(formatted);
      }
      if (isTimeInPastForToday(pickupTime, formatted, tripType)) {
        setPickupTime(getCurrentTimeStr(tripType));
      }
    } else {
      if (formatted < pickupDate) return;
      setReturnDate(formatted);
    }
    setOpenDropdown(null);
  };

  const pickupParts = useMemo(() => parseDateParts(pickupDate), [pickupDate]);
  const returnParts = useMemo(() => parseDateParts(returnDate), [returnDate]);
  const pickupTimeParts = useMemo(() => parseTimeParts(pickupTime), [pickupTime]);
  const dropTimeParts = useMemo(() => parseTimeParts(dropTime), [dropTime]);

  const field =
    "py-2 px-3 sm:py-3.5 sm:px-4 hover:bg-amber-50/50 cursor-pointer transition relative group flex flex-col justify-center min-h-[60px] sm:min-h-[102px] min-w-0 bg-white";
  const label = "text-[10px] sm:text-xs text-slate-500 font-semibold mb-0.5 flex items-center gap-1";
  const value =
    "text-[15px] sm:text-2xl lg:text-[26px] font-black text-slate-950 tracking-tight leading-none truncate";
  const sub = "text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5 sm:mt-1 truncate";
  const dateLine = "flex items-baseline gap-1 tracking-tight leading-none truncate";
  const timeLine = "flex items-baseline gap-1 tracking-tight leading-none";

  const isSelected = hasInteracted || Boolean(heading);
  const hasAnyDropdownOpen = Boolean(openDropdown || activeStopDropdownId);

  const defaultTitle = (
    <>
      ALL INDIA CAR RENTAL APP &amp; <span className="text-amber-400">OUTSTATION CAB SERVICES</span> NEARBY.
    </>
  );

  const defaultSubtitle =
    "BroomBoom Cabs- All India Outstation Cab Booking App & Car Rental services Nearby. Book Cab in Advance for City Ride,Outstation,Rental,Airport & Station.";

  const activeTitle = heading?.title || defaultTitle;
  const activeSubtitle = heading?.subtitle || defaultSubtitle;

  return (
    <div
      className="relative pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-12 bg-cover bg-center bg-no-repeat overflow-visible"
      style={{
        zIndex: hasAnyDropdownOpen ? 50 : 20,
        backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.65), rgba(10, 16, 26, 0.80)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      <div
        ref={containerRef}
        style={{ zIndex: hasAnyDropdownOpen ? 50 : 20 }}
        className={`max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 relative ${hasAnyDropdownOpen ? "z-40" : "z-20"}`}
      >
        {/* =============================== HEADER ==================================== */}
        <div className="mb-2 sm:mb-3 hidden sm:flex items-center justify-center" />

        <div className="mb-4 sm:mb-6 text-white text-center flex flex-col items-center px-2">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-black text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            {activeTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 sm:mt-1.5 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-sm px-2">
            {activeSubtitle}
          </p>
        </div>

        {/* ================================================================================= */}
        {/* =============================== MOBILE VIEW ==================================== */}
        {/* ================================================================================= */}
        <div className="md:hidden">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Top Tabs */}
            <div className="p-2 bg-white border-b border-slate-100">
              <div className="flex bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => changeTripType("outstation-oneway")}
                  className={`flex-1 min-w-0 py-1.5 px-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    isSelected && tripType.includes("outstation")
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Car className={`w-4 h-4 ${isSelected && tripType.includes("outstation") ? "text-slate-950" : "text-slate-400"}`} />
                  <span className={`text-[10px] font-bold text-center leading-tight ${isSelected && tripType.includes("outstation") ? "text-slate-950" : "text-slate-700"}`}>
                    Outstation<br />Cabs
                  </span>
                </button>

                <div className="w-px bg-slate-200 my-2" />

                <button
                  type="button"
                  onClick={() => changeTripType("airport")}
                  className={`flex-1 min-w-0 py-1.5 px-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    isSelected && tripType === "airport"
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Plane className={`w-4 h-4 ${isSelected && tripType === "airport" ? "text-slate-950" : "text-slate-400"}`} />
                  <span className={`text-[10px] font-bold text-center leading-tight ${isSelected && tripType === "airport" ? "text-slate-950" : "text-slate-700"}`}>
                    Airport<br />Cabs
                  </span>
                </button>

                <div className="w-px bg-slate-200 my-2" />

                <button
                  type="button"
                  onClick={() => changeTripType("hourly")}
                  className={`flex-1 min-w-0 py-1.5 px-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    isSelected && tripType === "hourly"
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Clock className={`w-4 h-4 ${isSelected && tripType === "hourly" ? "text-slate-950" : "text-slate-400"}`} />
                  <span className={`text-[10px] font-bold text-center leading-tight ${isSelected && tripType === "hourly" ? "text-slate-950" : "text-slate-700"}`}>
                    Hourly<br />Rentals
                  </span>
                </button>
              </div>
            </div>

            <div className="p-3">
              {tripType.includes("outstation") && (
                <div className="bg-[#FEF6E7] text-[#B9831B] text-[10px] font-medium p-1.5 rounded-md flex items-center gap-1.5 mb-2.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {stops.length > 0
                      ? `Multi-stop route (${stops.length} stop${stops.length > 1 ? "s" : ""} added)`
                      : "Includes one pick up & drop"}
                  </span>
                </div>
              )}

              {tripType === "airport" && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex flex-1 border border-slate-300 rounded-md p-0.5 bg-white h-[34px]">
                    <button
                      type="button"
                      onClick={() => setAirportMode("to-airport")}
                      className={`flex-1 min-w-0 text-[12px] font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 px-1 ${
                        airportMode === "to-airport"
                          ? "border border-amber-400 text-slate-950 bg-amber-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Plane className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">To Airport</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAirportMode("from-airport")}
                      className={`flex-1 min-w-0 text-[12px] font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 px-1 ${
                        airportMode === "from-airport"
                          ? "border border-amber-400 text-slate-950 bg-amber-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Plane className="w-3.5 h-3.5 shrink-0 -scale-x-100" />
                      <span className="truncate">From Airport</span>
                    </button>
                  </div>
                </div>
              )}

              {tripType.includes("outstation") && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex flex-1 border border-slate-300 rounded-md p-0.5 bg-white h-[34px]">
                    <button
                      type="button"
                      onClick={() => changeTripType("outstation-oneway")}
                      className={`flex-1 min-w-0 text-[12px] font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 px-1 ${
                        isSelected && tripType === "outstation-oneway"
                          ? "border border-amber-400 text-slate-950 bg-amber-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center shrink-0 ${isSelected && tripType === "outstation-oneway" ? "border-amber-500" : "border-slate-400"}`}>
                        {isSelected && tripType === "outstation-oneway" && <div className="w-1 h-1 bg-amber-500 rounded-full" />}
                      </div>
                      <span className="truncate">One Way</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => changeTripType("outstation-round")}
                      className={`flex-1 min-w-0 text-[12px] font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 px-1 ${
                        isSelected && tripType === "outstation-round"
                          ? "border border-amber-400 text-slate-950 bg-amber-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center shrink-0 ${isSelected && tripType === "outstation-round" ? "border-amber-500" : "border-slate-400"}`}>
                        {isSelected && tripType === "outstation-round" && <div className="w-1 h-1 bg-amber-500 rounded-full" />}
                      </div>
                      <span className="truncate">Round Trip</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Pickup, Stops & Drop Inputs */}
              <div className="relative space-y-2">
                <div
                  onClick={() => toggle("from")}
                  className="bg-[#F9FAFB] border border-slate-200 rounded-md p-2.5 pr-12 flex items-center gap-2.5 cursor-pointer relative min-w-0"
                >
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    {tripType === "hourly" ? (
                      <div className="w-2 h-2 rounded-full border-2 border-amber-500 bg-white" />
                    ) : (
                      <>
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div className="w-px h-3 bg-slate-300" />
                      </>
                    )}
                  </div>
                  <span className={`flex-1 min-w-0 text-[12px] font-bold uppercase tracking-wide truncate ${fromCity ? "text-slate-900" : "text-slate-400"}`}>
                    {fromCity || (tripType === "hourly" ? "PICKUP LOCATION" : "PICK UP ADDRESS")}
                  </span>

                  {openDropdown === "from" && (
                    <CityPopover
                      placeholder="Search pickup city..."
                      selected={fromCity}
                      title="Select Pickup City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
                    />
                  )}
                </div>

                {tripType.includes("outstation") &&
                  stops.map((stop, idx) => (
                    <div
                      key={stop.id}
                      onClick={() => toggleStopDropdown(stop)}
                      className="bg-amber-50/60 border border-amber-200 rounded-md p-2.5 pr-10 flex items-center gap-2.5 cursor-pointer relative min-w-0"
                    >
                      <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span
                        className={`flex-1 min-w-0 text-[12px] font-bold uppercase tracking-wide truncate ${
                          stop.city ? "text-slate-900" : "text-amber-700/70"
                        }`}
                      >
                        {stop.city || `STOP ${idx + 1} LOCATION`}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveStop(stop.id);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 flex items-center justify-center transition"
                        title="Remove Stop"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {activeStopDropdownId === stop.id && (
                        <CityPopover
                          placeholder={`Search stop ${idx + 1} city...`}
                          selected={stop.city}
                          title={`Select Stop ${idx + 1}`}
                          onClose={() => setActiveStopDropdownId(null)}
                          onSelect={(n, st, coords) => handleSelectStop(stop.id, n, st, coords)}
                        />
                      )}
                    </div>
                  ))}

                {tripType !== "hourly" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      handleSwap(e);
                      if (tripType === "airport") {
                        setAirportMode((m) => (m === "to-airport" ? "from-airport" : "to-airport"));
                      }
                    }}
                    className={`absolute right-2 ${
                      stops.length > 0 ? "top-5" : "top-1/2 -translate-y-1/2"
                    } z-10 w-8 h-8 bg-white border border-blue-100 rounded-full flex items-center justify-center shadow-sm hover:bg-blue-50 transition active:scale-95 text-blue-500`}
                    title="Swap Locations"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                )}

                {tripType !== "hourly" && (
                  <div
                    onClick={() => toggle("to")}
                    className="bg-[#F9FAFB] border border-slate-200 rounded-md p-2.5 pr-12 flex items-center gap-2.5 cursor-pointer relative min-w-0"
                  >
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-2 h-2 rounded-full border-2 border-red-500 bg-white" />
                    </div>
                    <span className={`flex-1 min-w-0 text-[12px] font-bold uppercase tracking-wide truncate ${toCity ? "text-slate-900" : "text-slate-400"}`}>
                      {toCity || "DROP ADDRESS"}
                    </span>

                    {openDropdown === "to" && (
                      <CityPopover
                        placeholder="Search destination city..."
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
                      />
                    )}
                  </div>
                )}
              </div>

              {tripType.includes("outstation") && stops.length < MAX_STOPS && (
                <button
                  type="button"
                  onClick={handleAddStop}
                  className="text-amber-600 hover:text-amber-700 text-[12px] font-bold mt-2 mb-2.5 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add Stops</span>
                  {stops.length > 0 && (
                    <span className="text-[10px] text-slate-400 font-semibold">
                      ({stops.length}/{MAX_STOPS})
                    </span>
                  )}
                </button>
              )}

              {tripType === "hourly" && (
                <div className="mt-3">
                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1.5">
                    SELECT PACKAGE
                  </div>
                  <div
                    onClick={() => toggle("package")}
                    className="bg-white border border-amber-200 rounded-xl p-3 shadow-sm cursor-pointer hover:border-amber-300 transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-bold text-slate-900 truncate">{hourlyPackage}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {hourlyPackagesList.find((p) => p.label === hourlyPackage)?.desc || "Customizable duration"}
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-amber-500 shrink-0" />
                  </div>
                  {openDropdown === "package" && (
                    <PopoverShell align="right" width="w-72" title="Hourly Rental Plans" onClose={() => setOpenDropdown(null)}>
                      <div className="space-y-0.5">
                        {hourlyPackagesList.map((pkg) => (
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
                            <div className="min-w-0">
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
              )}

              {/* Date & Time cards */}
              <div className={`mt-3 mb-3 ${tripType === "outstation-round" ? "grid grid-cols-2 gap-2" : ""}`}>
                <div
                  onClick={() => setMobileDateTimeTarget("pickup")}
                  className="bg-white border border-amber-200 rounded-xl p-3 shadow-sm cursor-pointer hover:border-amber-300 transition-colors min-w-0"
                >
                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1.5">
                    TRIP START
                  </div>
                  <div className="flex items-center justify-between gap-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-[13px] font-bold text-slate-900 truncate">{formatDateDisplay(pickupDate)}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
                  </div>
                  <div className="text-[12px] font-semibold text-slate-500 mt-1 truncate">{pickupTime}</div>
                </div>

                {tripType === "outstation-round" && (
                  <div
                    onClick={() => setMobileDateTimeTarget("return")}
                    className="bg-white border border-amber-200 rounded-xl p-3 shadow-sm cursor-pointer hover:border-amber-300 transition-colors min-w-0"
                  >
                    <div className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1.5">
                      TRIP END
                    </div>
                    <div className="flex items-center justify-between gap-1.5 min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="text-[13px] font-bold text-slate-900 truncate">{formatDateDisplay(returnDate)}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
                    </div>
                    <div className="text-[12px] font-semibold text-slate-500 mt-1 truncate">{dropTime}</div>
                  </div>
                )}
              </div>

              {routeDistance != null && routeDistance > 0 && fromCity && toCity && (
                <div className="flex items-center justify-between px-3 py-1.5 mb-2.5 bg-amber-50 rounded-lg border border-amber-200/80 text-[11px] font-semibold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      {tripType.includes("outstation") && stops.some((s) => s.city.trim())
                        ? "Multi-Stop Distance:"
                        : "Exact Road Distance:"}
                    </span>
                  </span>
                  <span className="font-extrabold font-mono text-slate-900">
                    {routeDistance.toFixed(1)} km
                    {routeDurationMinutes != null && routeDurationMinutes > 0 && (
                      <span className="text-slate-500 font-normal ml-1">
                        (~{Math.floor(routeDurationMinutes / 60)}h {routeDurationMinutes % 60}m)
                      </span>
                    )}
                  </span>
                </div>
              )}

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

          {mobileDateTimeTarget && (
            <MobileDateTimePicker
              title={
                mobileDateTimeTarget === "pickup"
                  ? "Select Pickup Date & Time"
                  : "Select Return Date & Time"
              }
              date={mobileDateTimeTarget === "pickup" ? pickupDate : returnDate}
              time={mobileDateTimeTarget === "pickup" ? pickupTime : dropTime}
              tripType={mobileDateTimeTarget === "pickup" ? tripType : undefined}
              minDate={mobileDateTimeTarget === "pickup" ? getMinimumPickupDateStr(tripType) : pickupDate}
              onChangeDate={(d) => {
                if (mobileDateTimeTarget === "pickup") {
                  setPickupDate(d);
                  if (returnDate < d) setReturnDate(d);
                } else {
                  setReturnDate(d);
                }
              }}
              onChangeTime={
                mobileDateTimeTarget === "pickup" ? setPickupTime : setDropTime
              }
              onClose={() => setMobileDateTimeTarget(null)}
            />
          )}

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
          <div
            style={{ zIndex: hasAnyDropdownOpen ? 50 : 20 }}
            className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-200/90 pt-3 sm:pt-4 pb-12 sm:pb-10 px-2.5 sm:px-6 lg:px-8 transition-all ${hasAnyDropdownOpen ? "z-40" : "z-20"}`}
          >
            {/* Trip tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-5 gap-2.5 sm:gap-3 border-b border-amber-100/80 mb-3.5 sm:mb-5">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 w-full sm:w-auto">
                {TRIP_TABS.map((tab) => {
                  const active = isSelected && tripType === tab.id;
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
                <img src="/logo.png" alt="BroomBoom" className="w-4 h-4 rounded-md object-contain" />
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
                  <div className={`${label} ${!fromCity ? "!mb-0" : ""}`}>Pickup Location</div>
                  {fromCity && <div className={value}>{fromCity}</div>}
                  {fromCity && fromState && <div className={sub}>{fromState}</div>}
                  {openDropdown === "from" && (
                    <CityPopover
                      placeholder="Search pickup city..."
                      selected={fromCity}
                      title="Select Pickup City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
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
                  <div className={`${label} ${!toCity ? "!mb-0" : ""}`}>Drop Location</div>
                  {toCity && <div className={value}>{toCity}</div>}
                  {toCity && toState && <div className={sub}>{toState}</div>}
                  {openDropdown === "to" && (
                    <CityPopover
                      placeholder="Search destination city..."
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
                      minDate={getMinimumPickupDateStr(tripType)}
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
                      className="text-amber-400 hover:text-amber-600 transition p-0.5 cursor-pointer"
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
                      minDate={pickupDate}
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
                      date={pickupDate}
                      tripType={tripType}
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
                      date={returnDate}
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
                  <div className={`${label} ${!fromCity ? "!mb-0" : ""}`}>Pickup Location</div>
                  {fromCity && <div className={value}>{fromCity}</div>}
                  {fromCity && fromState && <div className={sub}>{fromState}</div>}
                  {openDropdown === "from" && (
                    <CityPopover
                      placeholder="Search pickup city..."
                      selected={fromCity}
                      title="Select Pickup City"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
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
                  <div className={`${label} ${!toCity ? "!mb-0" : ""}`}>Drop Location</div>
                  {toCity && <div className={value}>{toCity}</div>}
                  {toCity && toState && <div className={sub}>{toState}</div>}
                  {openDropdown === "to" && (
                    <CityPopover
                      placeholder="Search destination city..."
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
                      minDate={getMinimumPickupDateStr(tripType)}
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
                      date={pickupDate}
                      tripType={tripType}
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
                  <div className={`${label} ${!fromCity ? "!mb-0" : ""}`}>Pickup Location</div>
                  {fromCity && <div className={value}>{fromCity}</div>}
                  {fromCity && fromState && <div className={sub}>{fromState}</div>}
                  {openDropdown === "from" && (
                    <CityPopover
                      placeholder="Search pickup city..."
                      selected={fromCity}
                      title="Select Pickup Location"
                      onClose={() => setOpenDropdown(null)}
                      onSelect={(n, st, coords) => {
                        setFromCity(n);
                        if (st) setFromState(st);
                        if (coords) setFromCoords(coords);
                        setOpenDropdown(null);
                      }}
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
                      minDate={getMinimumPickupDateStr(tripType)}
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
                      date={pickupDate}
                      tripType={tripType}
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
                        {hourlyPackagesList.map((pkg) => (
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
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex border border-slate-300 rounded-lg p-0.5 bg-white h-[40px]">
                    <button
                      type="button"
                      onClick={() => setAirportMode("to-airport")}
                      className={`px-5 text-[13px] font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
                        airportMode === "to-airport"
                          ? "border border-amber-400 text-slate-950 bg-amber-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Plane className="w-4 h-4 shrink-0" />
                      <span>To Airport</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAirportMode("from-airport")}
                      className={`px-5 text-[13px] font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
                        airportMode === "from-airport"
                          ? "border border-amber-400 text-slate-950 bg-amber-50 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Plane className="w-4 h-4 shrink-0 -scale-x-100" />
                      <span>From Airport</span>
                    </button>
                  </div>
                </div>

                <div
                  style={{ zIndex: openDropdown ? 60 : 10 }}
                  className={`border border-amber-200 hover:border-amber-300 rounded-xl flex flex-row bg-amber-200 gap-[1px] shadow-sm transition-colors relative ${openDropdown ? "z-40" : "z-10"}`}
                >
                  <div
                    data-field-trigger
                    onClick={() => toggle("from")}
                    style={{ zIndex: openDropdown === "from" ? 80 : 1 }}
                    className={`w-[38%] rounded-l-xl ${openDropdown === "from" ? "relative z-40" : ""} ${field}`}
                  >
                    <div className={`${label} ${!fromCity ? "!mb-0" : ""}`}>Pickup Location</div>
                    {fromCity && <div className={value}>{fromCity}</div>}
                    {fromCity && fromState && <div className={sub}>{fromState}</div>}
                    {openDropdown === "from" && (
                      <CityPopover
                        placeholder="Search pickup location..."
                        selected={fromCity}
                        title="Select Pickup Location"
                        onClose={() => setOpenDropdown(null)}
                        onSelect={(n, st, coords) => {
                          setFromCity(n);
                          if (st) setFromState(st);
                          if (coords) setFromCoords(coords);
                          setOpenDropdown(null);
                        }}
                      />
                    )}
                  </div>

                  <div
                    data-field-trigger
                    onClick={() => toggle("to")}
                    style={{ zIndex: openDropdown === "to" ? 80 : 1 }}
                    className={`w-[38%] ${openDropdown === "to" ? "relative z-40" : ""} ${field} !pl-8`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        handleSwap(e);
                        setAirportMode((m) => (m === "to-airport" ? "from-airport" : "to-airport"));
                      }}
                      className="absolute z-20 w-7 h-7 rounded-full bg-white border-2 border-amber-400 shadow-md hover:bg-amber-50 text-amber-600 flex items-center justify-center transition active:scale-90 top-1/2 -left-3.5 -translate-y-1/2"
                      title="Swap Pickup and Drop"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                    </button>
                    <div className={`${label} ${!toCity ? "!mb-0" : ""}`}>Drop Location</div>
                    {toCity && <div className={value}>{toCity}</div>}
                    {toCity && toState && <div className={sub}>{toState}</div>}
                    {openDropdown === "to" && (
                      <CityPopover
                        placeholder="Search drop location..."
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
                      />
                    )}
                  </div>

                  <div
                    data-field-trigger
                    onClick={() => toggle("pickupDate")}
                    style={{ zIndex: openDropdown === "pickupDate" ? 80 : 1 }}
                    className={`w-[12%] ${openDropdown === "pickupDate" ? "relative z-40" : ""} ${field}`}
                  >
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
                        minDate={getMinimumPickupDateStr(tripType)}
                        title="Select Date"
                        onClose={() => setOpenDropdown(null)}
                        onSelect={(d) => selectCalendarDate(d, true)}
                      />
                    )}
                  </div>

                  <div
                    data-field-trigger
                    onClick={() => toggle("pickupTime")}
                    style={{ zIndex: openDropdown === "pickupTime" ? 80 : 1 }}
                    className={`w-[12%] rounded-r-xl ${openDropdown === "pickupTime" ? "relative z-40" : ""} ${field}`}
                  >
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
                        date={pickupDate}
                        tripType={tripType}
                        value={pickupTime}
                        onChange={setPickupTime}
                        onClose={() => setOpenDropdown(null)}
                      />
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ============ DESKTOP MULTI-STOP ROUTE STRIP ============ */}
            {tripType.includes("outstation") && stops.length > 0 && (
              <div
                style={{ zIndex: activeStopDropdownId ? 70 : 15 }}
                className="mt-3 p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-wrap items-center gap-2 relative"
              >
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 px-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Route Stops:</span>
                </span>

                <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 truncate max-w-[160px]">
                  {fromCity || "Pickup"}
                </span>

                <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />

                {stops.map((stop, idx) => (
                  <React.Fragment key={stop.id}>
                    <div
                      data-field-trigger
                      onClick={() => toggleStopDropdown(stop)}
                      style={{ zIndex: activeStopDropdownId === stop.id ? 90 : 1 }}
                      className="relative flex items-center gap-2 bg-white hover:bg-amber-50 border-2 border-amber-400 rounded-lg px-2.5 py-1.5 cursor-pointer shadow-xs transition"
                    >
                      <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span
                        className={`text-xs font-extrabold max-w-[190px] truncate ${
                          stop.city ? "text-slate-950" : "text-amber-700"
                        }`}
                      >
                        {stop.city || `Select Stop ${idx + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveStop(stop.id);
                        }}
                        className="w-4 h-4 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-600 flex items-center justify-center transition cursor-pointer"
                        title="Remove Stop"
                      >
                        <X className="w-3 h-3" />
                      </button>

                      {activeStopDropdownId === stop.id && (
                        <CityPopover
                          placeholder={`Search stop ${idx + 1} city...`}
                          selected={stop.city}
                          title={`Select Stop ${idx + 1}`}
                          onClose={() => setActiveStopDropdownId(null)}
                          onSelect={(n, st, coords) => handleSelectStop(stop.id, n, st, coords)}
                        />
                      )}
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  </React.Fragment>
                ))}

                <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 truncate max-w-[160px]">
                  {toCity || "Drop"}
                </span>

                {stops.length < MAX_STOPS && (
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="ml-auto flex items-center gap-1 text-xs font-extrabold text-amber-700 hover:text-amber-900 bg-amber-200/70 hover:bg-amber-300/80 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add Stop ({stops.length}/{MAX_STOPS})</span>
                  </button>
                )}
              </div>
            )}

            {/* Footer row with Add Stops & Exact Road Distance */}
            <div className="mt-5 flex flex-row items-center justify-between gap-3 text-xs pb-0">
              {tripType.includes("outstation") && stops.length === 0 ? (
                <button
                  type="button"
                  onClick={handleAddStop}
                  className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-bold transition group self-auto cursor-pointer"
                >
                  <span className="text-[13px] font-bold">+ Add Stops</span>
                  <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                    new
                  </span>
                </button>
              ) : (
                <div />
              )}

              {routeDistance != null && routeDistance > 0 && fromCity && toCity && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 rounded-full border border-amber-300 text-[12px] font-bold text-amber-950 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {tripType.includes("outstation") && stops.some((s) => s.city.trim())
                      ? "Multi-Stop Road Distance:"
                      : "Exact Road Distance:"}
                  </span>
                  <span className="font-extrabold text-slate-900 font-mono">{routeDistance.toFixed(1)} km</span>
                  {routeDurationMinutes != null && routeDurationMinutes > 0 && (
                    <span className="text-slate-500 font-medium">
                      (~{Math.floor(routeDurationMinutes / 60)}h {routeDurationMinutes % 60}m)
                    </span>
                  )}
                </div>
              )}
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

          {/* Laurel pill */}
          <div className="mt-10 sm:mt-10 mb-0 flex items-center justify-center gap-2 text-white text-[11px] sm:text-[13px] font-semibold tracking-wide drop-shadow-sm select-none">
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

      {/* =============================== RECOGNITION & TRUST LOGOS PILL ==================================== */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-10 w-full px-2 sm:px-4 pointer-events-none flex justify-center" style={{ zIndex: 10 }}>
        <div className="pointer-events-auto bg-white rounded-2xl sm:rounded-full px-3 sm:px-8 py-2.5 sm:py-3 shadow-[0_12px_36px_rgba(0,0,0,0.14)] border border-slate-100 flex items-center justify-around sm:justify-center gap-2 sm:gap-7 md:gap-10 w-full sm:w-auto max-w-[96vw] sm:max-w-fit overflow-hidden">
          {[
            { src: "/images/trust/gst.png", alt: "broomboom-cabs-gst-recognition" },
            { src: "/images/trust/mca.png", alt: "broomboom-cabs-mca-recognition" },
            { src: "/images/trust/msme.png", alt: "broomboom-cabs-msme-recognition" },
            { src: "/images/trust/dpiit.png", alt: "broomboom-cabs-dpiit-startup-india-recognition" },
            { src: "/images/trust/bhaskar.png", alt: "broomboom-cabs-bhaskar-bharat-startup-recognition" },
          ].map((item) => (
            <div
              key={item.src}
              className="flex items-center justify-center shrink-0 px-0.5 sm:px-1"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-7 sm:h-10 md:h-11 w-auto object-contain select-none"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;