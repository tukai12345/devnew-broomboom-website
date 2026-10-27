"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRightLeft,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  XCircle,
  Star,
  Sparkles,
  Route,
  Clock,
  Loader2,
  Plane,
  Navigation,
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

/* --------------------------- sub-components --------------------------- */

const PopoverShell: React.FC<{
  children: React.ReactNode;
  align?: "left" | "right";
  width?: string;
}> = ({ children, align = "left", width = "w-80" }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 ${width} bg-white rounded-2xl shadow-2xl border border-amber-200/90 z-50 p-3 animate-in fade-in zoom-in-95 duration-150`}
  >
    {children}
  </div>
);

const CityPopover: React.FC<{
  placeholder: string;
  query: string;
  onQueryChange: (v: string) => void;
  selected: string;
  onSelect: (name: string, state?: string, coords?: { lat: number; lng: number }) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  citiesList?: { id: string; name: string; state: string }[];
}> = ({
  placeholder,
  query,
  onQueryChange,
  selected,
  onSelect,
  inputRef,
  citiesList = CITIES,
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

  // Combined list: if user typed 2+ chars and results found, show live map search results!
  // Otherwise show filtered static / popular cities.
  const displayItems = React.useMemo(() => {
    if (query.trim().length >= 2 && mapResults.length > 0) {
      return mapResults.map((m) => {
        const primary = m.name || (m.displayName || "").split(",")[0].trim();
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
    <PopoverShell width="w-80 sm:w-96">
      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 bg-amber-50/60 border border-amber-200 rounded-lg text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      {isSearching && (
        <div className="flex items-center gap-2 px-2.5 py-1 mb-1 bg-amber-50 rounded-lg text-[11px] font-bold text-amber-800 animate-pulse border border-amber-200/50">
          <Loader2 className="w-3 h-3 text-amber-600 animate-spin" />
          <span>Searching map locations across India...</span>
        </div>
      )}

      <div className="max-h-60 overflow-y-auto space-y-0.5 divide-y divide-amber-100/50">
        {displayItems.length === 0 ? (
          <p className="text-[11px] text-slate-400 text-center py-4">
            {isSearching ? "Searching map..." : "No places found. Type city, town, airport or PIN"}
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
                  ? "bg-amber-100/80 text-amber-950 font-bold"
                  : "hover:bg-amber-50/80 text-slate-800"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0 pr-2">
                <div className="w-6 h-6 rounded-md bg-amber-100 group-hover:bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  {item.name.toLowerCase().includes("airport") ? (
                    <Plane className="w-3.5 h-3.5 text-amber-700" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[13px] text-slate-950 truncate flex items-center gap-1.5">
                    <span>{item.name}</span>
                    {item.source === "Nominatim" && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-black tracking-wider uppercase">
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
}> = ({ month, onPrev, onNext, selectedDate, onSelect }) => {
  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const startDow = new Date(year, monthIdx, 1).getDay();
  const monthName = month.toLocaleString("en-US", { month: "long" });

  return (
    <PopoverShell width="w-72">
      <div className="flex items-center justify-between pb-2 border-b border-amber-100">
        <button type="button" onClick={onPrev} className="p-1 rounded-md hover:bg-amber-50 text-slate-700 transition">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <div className="font-bold text-slate-900 text-[11px]">
          {monthName} {year}
        </div>
        <button type="button" onClick={onNext} className="p-1 rounded-md hover:bg-amber-50 text-slate-700 transition">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-slate-400 py-1">
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
              className={`p-1 text-[11px] font-bold rounded-md transition ${
                isSelected
                  ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                  : "hover:bg-amber-50 text-slate-800"
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

const TimePopover: React.FC<{ title: string; value: string; onChange: (v: string) => void }> = ({
  title,
  value,
  onChange,
}) => {
  const { hour, minute, meridiem } = parseTimeDetails(value);
  const set = (h: string, m: string, mer: string) => onChange(`${h}:${m} ${mer}`);

  const Column: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${className}`}>
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
      className={`w-full py-2 text-[13px] font-bold snap-center transition-colors ${
        active ? "bg-amber-400 text-slate-950" : "text-slate-700 hover:bg-amber-50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <PopoverShell align="right" width="w-64">
      <div className="text-[10px] font-bold text-amber-600 uppercase text-center pb-2 border-b border-amber-100">
        {title}
      </div>
      <div className="flex h-48 pt-2">
        <Column className="flex-1 border-r border-amber-100">
          {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((h) => (
            <Option key={h} active={hour === h} onClick={() => set(h, minute, meridiem)}>
              {h}
            </Option>
          ))}
        </Column>
        <Column className="flex-1 border-r border-amber-100">
          {["00", "15", "30", "45"].map((m) => (
            <Option key={m} active={minute === m} onClick={() => set(hour, m, meridiem)}>
              {m}
            </Option>
          ))}
        </Column>
        <Column className="w-16">
          {["AM", "PM"].map((mer) => (
            <Option key={mer} active={meridiem === mer} onClick={() => set(hour, minute, mer)}>
              {mer}
            </Option>
          ))}
        </Column>
      </div>
    </PopoverShell>
  );
};

/* ------------------------------ main ------------------------------ */

export const HeroSearch: React.FC<HeroSearchProps> = ({
  activeTripType,
  onTripTypeChange,
  onSearch,
  initialFrom = "Mumbai",
  initialTo = "Delhi",
  heading,
}) => {
  const [tripType, setTripType] = useState<TripType>((activeTripType as TripType) || "outstation-round");
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [fromState, setFromState] = useState(
    CITIES.find((c) => c.name === initialFrom)?.state ?? "Maharashtra"
  );
  const [toState, setToState] = useState(
    CITIES.find((c) => c.name === initialTo)?.state ?? "Delhi"
  );
  const [fromCoords, setFromCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [toCoords, setToCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Live Map API Road Distance & Duration
  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  const [routeDurationMinutes, setRouteDurationMinutes] = useState<number | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState<boolean>(false);

  const [pickupDate, setPickupDate] = useState("2026-10-24");
  const [pickupTime, setPickupTime] = useState("10:00 AM");
  const [returnDate, setReturnDate] = useState("2026-10-24");
  const [dropTime, setDropTime] = useState("09:45 PM");
  const [hourlyPackage, setHourlyPackage] = useState("1 hrs 10 kms");

  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [searchFromQuery, setSearchFromQuery] = useState("");
  const [searchToQuery, setSearchToQuery] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 9, 1));

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTripType) setTripType(activeTripType as TripType);
  }, [activeTripType]);

  useEffect(() => {
    if (initialFrom) {
      setFromCity(initialFrom);
      const st = CITIES.find((c) => c.name === initialFrom)?.state;
      if (st) setFromState(st);
    }
  }, [initialFrom]);

  useEffect(() => {
    if (initialTo) {
      setToCity(initialTo);
      const st = CITIES.find((c) => c.name === initialTo)?.state;
      if (st) setToState(st);
    }
  }, [initialTo]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (openDropdown === "from" || openDropdown === "to") {
      const t = setTimeout(() => searchInputRef.current?.focus(), 50);
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

  /* Live Map API Distance & Duration Calculation */
  useEffect(() => {
    let cancelled = false;

    async function calculateMapDistance() {
      if (!fromCity || !toCity || fromCity.trim().toLowerCase() === toCity.trim().toLowerCase()) {
        setRouteDistance(null);
        setRouteDurationMinutes(null);
        setIsCalculatingDistance(false);
        return;
      }

      setIsCalculatingDistance(true);
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
          setIsCalculatingDistance(false);
        }
      } catch {
        if (!cancelled) setIsCalculatingDistance(false);
      }
    }

    const timer = setTimeout(calculateMapDistance, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fromCity, toCity, fromCoords, toCoords]);

  /* actions */
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

  const handleSearchSubmit = () => {
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
      distanceKm: routeDistance ?? undefined,
      durationMinutes: routeDurationMinutes ?? undefined,
    });
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

  /* derived */
  const pickupParts = parseDateParts(pickupDate);
  const returnParts = parseDateParts(returnDate);
  const pickupTimeParts = parseTimeParts(pickupTime);
  const dropTimeParts = parseTimeParts(dropTime);

  /* class tokens */
  const field =
    "py-2.5 px-3 sm:py-3.5 sm:px-4.5 hover:bg-amber-50/50 cursor-pointer transition relative group flex flex-col justify-center min-h-[88px] sm:min-h-[102px] min-w-0";
  const label = "text-[11px] sm:text-xs text-slate-500 font-semibold mb-0.5 flex items-center gap-1";
  const value =
    "text-xl sm:text-2xl lg:text-[26px] font-black text-slate-950 tracking-tight leading-none truncate";
  const sub = "text-[11px] sm:text-xs text-slate-400 font-medium mt-1 truncate";
  const dateLine = "flex items-baseline gap-1 tracking-tight leading-none truncate";
  const timeLine = "flex items-baseline gap-1 tracking-tight leading-none";

  /* Active dynamic heading computation */
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
      className="relative pt-2 sm:pt-2.5 pb-20 sm:pb-24 bg-cover bg-center bg-no-repeat overflow-visible"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.65), rgba(10, 16, 26, 0.80)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20" ref={containerRef}>
        {/* Top Trust Badge (Exact match to user's uploaded image #2, tight spacing to navbar matching image #1) */}
        <div className="mb-2 sm:mb-2.5 flex items-center justify-center animate-in fade-in duration-200">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs sm:text-[13px] font-black uppercase tracking-wider shadow-md shadow-amber-400/25 border border-amber-300">
            <img src="/logo.png" alt="BroomBoom Logo" className="w-4 h-4 rounded-full object-contain" />
            <span>India&apos;s #1 Most Trusted Cab Booking Service</span>
          </div>
        </div>

        {/* Main Heading Below Trust Badge and Above Search Card */}
        <div className="mb-3.5 sm:mb-4 text-white text-center flex flex-col items-center animate-in fade-in duration-200 px-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            {activeTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-sm">
            {activeSubtitle}
          </p>
        </div>

        {/* Main card */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-200/90 pt-3.5 sm:pt-4 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 transition-all">
          {/* Trip tabs */}
          <div className="flex flex-wrap items-center justify-between pb-4 sm:pb-5 gap-2.5 sm:gap-3 border-b border-amber-100/80 mb-4 sm:mb-5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {TRIP_TABS.map((tab) => {
                const active = tripType === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => changeTripType(tab.id)}
                    className={`flex items-center gap-2 cursor-pointer px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all duration-150 select-none ${
                      active
                        ? "bg-amber-400 text-slate-950 font-black shadow-sm border border-amber-300 ring-2 ring-amber-400/30"
                        : "bg-slate-50 text-slate-700 hover:text-slate-950 hover:bg-amber-50/80 border border-slate-200/80 font-bold"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                        active ? "border-slate-950 bg-slate-950" : "border-slate-400 bg-white"
                      }`}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    </span>
                    <span className="text-xs sm:text-sm tracking-tight whitespace-nowrap">{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
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
            <div className="border border-amber-200 hover:border-amber-300 rounded-xl flex flex-col md:flex-row bg-white relative divide-y md:divide-y-0 md:divide-x divide-amber-200 shadow-sm transition-colors">
              <div onClick={() => toggle("from")} className={`w-full md:w-[21%] ${field} rounded-t-xl md:rounded-l-xl md:rounded-tr-none`}>
                <div className={label}>From</div>
                <div className={value}>{fromCity}</div>
                <div className={sub}>{fromState}</div>
                {openDropdown === "from" && (
                  <CityPopover
                    citiesList={combinedCities}
                    placeholder="Search pickup city or address..."
                    query={searchFromQuery}
                    onQueryChange={setSearchFromQuery}
                    selected={fromCity}
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

              <div onClick={() => toggle("to")} className={`w-full md:w-[21%] ${field}`}>
                <button
                  type="button"
                  onClick={handleSwap}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-amber-300 shadow-md hover:bg-amber-50 text-amber-600 flex items-center justify-center z-20 transition active:scale-90"
                  title="Swap From and To"
                >
                  <ArrowRightLeft className="w-3 h-3" />
                </button>
                {routeDistance !== null && routeDistance > 0 && (
                  <div className="hidden lg:flex absolute -left-12 -top-2.5 z-20 items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black tracking-wide shadow-md border border-amber-400/50 animate-in fade-in">
                    <Route className="w-2.5 h-2.5 text-amber-400" />
                    <span>{routeDistance} KM</span>
                  </div>
                )}
                <div className={label}>To</div>
                <div className={value}>{toCity}</div>
                <div className={sub}>{toState}</div>
                {openDropdown === "to" && (
                  <CityPopover
                    citiesList={combinedCities}
                    placeholder="Search destination city or address..."
                    query={searchToQuery}
                    onQueryChange={setSearchToQuery}
                    selected={toCity}
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

              <div onClick={() => toggle("pickupDate")} className={`w-full md:w-[15%] ${field}`}>
                <div className={label}>
                  Departure <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className={dateLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">{pickupParts.dayNum}</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">{pickupParts.monthYear}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">{pickupParts.weekday}</div>
                {openDropdown === "pickupDate" && (
                  <CalendarPopover
                    month={calendarMonth}
                    onPrev={prevMonth}
                    onNext={nextMonth}
                    selectedDate={pickupDate}
                    onSelect={(d) => selectCalendarDate(d, true)}
                  />
                )}
              </div>

              <div onClick={() => toggle("returnDate")} className={`w-full md:w-[15%] ${field}`}>
                <div className={label}>
                  Return <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className={dateLine}>
                    <span className="text-2xl sm:text-3xl font-black text-slate-950">{returnParts.dayNum}</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">{returnParts.monthYear}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      changeTripType("outstation-oneway");
                    }}
                    className="text-amber-400 hover:text-amber-600 transition p-0.5"
                    title="Switch to One-Way"
                  >
                    <XCircle className="w-3.5 h-3.5 fill-amber-400 text-white" />
                  </button>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">{returnParts.weekday}</div>
                {openDropdown === "returnDate" && (
                  <CalendarPopover
                    month={calendarMonth}
                    onPrev={prevMonth}
                    onNext={nextMonth}
                    selectedDate={returnDate}
                    onSelect={(d) => selectCalendarDate(d, false)}
                  />
                )}
              </div>

              <div onClick={() => toggle("pickupTime")} className={`w-full md:w-[14%] ${field}`}>
                <div className={label}>
                  Pickup <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className={timeLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">{pickupTimeParts.time}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900">{pickupTimeParts.meridiem}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-400 font-medium mt-1">Start time</div>
                {openDropdown === "pickupTime" && (
                  <TimePopover title="Select Pickup Time" value={pickupTime} onChange={setPickupTime} />
                )}
              </div>

              <div onClick={() => toggle("dropTime")} className={`w-full md:w-[14%] ${field} rounded-b-xl md:rounded-r-xl md:rounded-bl-none`}>
                <div className={label}>Drop Time</div>
                <div className={timeLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-400">{dropTimeParts.time}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400">{dropTimeParts.meridiem}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-400 font-medium mt-1">Estimated drop</div>
                {openDropdown === "dropTime" && (
                  <TimePopover title="Select Drop Time" value={dropTime} onChange={setDropTime} />
                )}
              </div>
            </div>
          )}

          {/* ============ ONE-WAY ============ */}
          {tripType === "outstation-oneway" && (
            <div className="border border-amber-200 hover:border-amber-300 rounded-xl grid grid-cols-1 md:grid-cols-12 bg-white relative divide-y md:divide-y-0 md:divide-x divide-amber-200 shadow-sm transition-colors">
              <div onClick={() => toggle("from")} className={`md:col-span-3 ${field} rounded-t-xl md:rounded-l-xl md:rounded-tr-none`}>
                <div className={label}>From</div>
                <div className={value}>{fromCity}</div>
                <div className={sub}>{fromState}</div>
                {openDropdown === "from" && (
                  <CityPopover
                    citiesList={combinedCities}
                    placeholder="Search pickup city or address..."
                    query={searchFromQuery}
                    onQueryChange={setSearchFromQuery}
                    selected={fromCity}
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

              <div onClick={() => toggle("to")} className={`md:col-span-3 ${field}`}>
                <button
                  type="button"
                  onClick={handleSwap}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-amber-300 shadow-md hover:bg-amber-50 text-amber-600 flex items-center justify-center z-20 transition active:scale-90"
                  title="Swap From and To"
                >
                  <ArrowRightLeft className="w-3 h-3" />
                </button>
                {routeDistance !== null && routeDistance > 0 && (
                  <div className="hidden lg:flex absolute -left-12 -top-2.5 z-20 items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black tracking-wide shadow-md border border-amber-400/50 animate-in fade-in">
                    <Route className="w-2.5 h-2.5 text-amber-400" />
                    <span>{routeDistance} KM</span>
                  </div>
                )}
                <div className={label}>To</div>
                <div className={value}>{toCity}</div>
                <div className={sub}>{toState}</div>
                {openDropdown === "to" && (
                  <CityPopover
                    citiesList={combinedCities}
                    placeholder="Search destination city or address..."
                    query={searchToQuery}
                    onQueryChange={setSearchToQuery}
                    selected={toCity}
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

              <div onClick={() => toggle("pickupDate")} className={`md:col-span-2 ${field}`}>
                <div className={label}>
                  Departure <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className={dateLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">{pickupParts.dayNum}</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">{pickupParts.monthYear}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">{pickupParts.weekday}</div>
                {openDropdown === "pickupDate" && (
                  <CalendarPopover
                    month={calendarMonth}
                    onPrev={prevMonth}
                    onNext={nextMonth}
                    selectedDate={pickupDate}
                    onSelect={(d) => selectCalendarDate(d, true)}
                  />
                )}
              </div>

              <div
                onClick={() => {
                  changeTripType("outstation-round");
                  setOpenDropdown("returnDate");
                }}
                className={`md:col-span-2 ${field}`}
              >
                <div className={label}>
                  Return <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 leading-snug mt-1 font-medium">
                  Tap to add return date
                </div>
              </div>

              <div onClick={() => toggle("pickupTime")} className={`md:col-span-2 ${field} rounded-b-xl md:rounded-r-xl md:rounded-bl-none`}>
                <div className={label}>
                  Pickup <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className={timeLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">{pickupTimeParts.time}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900">{pickupTimeParts.meridiem}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-400 font-medium mt-1">Start time</div>
                {openDropdown === "pickupTime" && (
                  <TimePopover title="Select Pickup Time" value={pickupTime} onChange={setPickupTime} />
                )}
              </div>
            </div>
          )}

          {/* ============ HOURLY ============ */}
          {tripType === "hourly" && (
            <div className="border border-amber-200 hover:border-amber-300 rounded-xl grid grid-cols-1 md:grid-cols-12 bg-white relative divide-y md:divide-y-0 md:divide-x divide-amber-200 shadow-sm transition-colors">
              <div onClick={() => toggle("from")} className={`md:col-span-4 ${field} rounded-t-xl md:rounded-l-xl md:rounded-tr-none`}>
                <div className={label}>Pickup Location</div>
                <div className={value}>{fromCity}</div>
                <div className={sub}>{fromState}</div>
                {openDropdown === "from" && (
                  <CityPopover
                    citiesList={combinedCities}
                    placeholder="Search pickup city or address..."
                    query={searchFromQuery}
                    onQueryChange={setSearchFromQuery}
                    selected={fromCity}
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

              <div onClick={() => toggle("pickupDate")} className={`md:col-span-3 ${field}`}>
                <div className={label}>
                  Pickup Date <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className={dateLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">{pickupParts.dayNum}</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">{pickupParts.monthYear}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">{pickupParts.weekday}</div>
                {openDropdown === "pickupDate" && (
                  <CalendarPopover
                    month={calendarMonth}
                    onPrev={prevMonth}
                    onNext={nextMonth}
                    selectedDate={pickupDate}
                    onSelect={(d) => selectCalendarDate(d, true)}
                  />
                )}
              </div>

              <div onClick={() => toggle("pickupTime")} className={`md:col-span-2 ${field}`}>
                <div className={label}>
                  Pickup <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className={timeLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">{pickupTimeParts.time}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900">{pickupTimeParts.meridiem}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-400 font-medium mt-1">Start time</div>
                {openDropdown === "pickupTime" && (
                  <TimePopover title="Select Pickup Time" value={pickupTime} onChange={setPickupTime} />
                )}
              </div>

              <div onClick={() => toggle("package")} className={`md:col-span-3 ${field} rounded-b-xl md:rounded-r-xl md:rounded-bl-none`}>
                <div className={label}>Select Package</div>
                <div className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-none truncate">
                  {hourlyPackage}
                </div>
                <div className="text-xs sm:text-[13px] text-slate-400 font-medium mt-1">Customizable duration</div>
                {openDropdown === "package" && (
                  <PopoverShell align="right" width="w-72">
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
                          {hourlyPackage === pkg.label && <Check className="w-3.5 h-3.5 text-amber-600" />}
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
            <div className="border border-amber-200 hover:border-amber-300 rounded-xl grid grid-cols-1 md:grid-cols-12 bg-white relative divide-y md:divide-y-0 md:divide-x divide-amber-200 shadow-sm transition-colors">
              <div onClick={() => toggle("from")} className={`md:col-span-4 ${field} rounded-t-xl md:rounded-l-xl md:rounded-tr-none`}>
                <div className={label}>Pickup Location</div>
                <div className={value}>{fromCity}</div>
                <div className={sub}>{fromState}</div>
                {openDropdown === "from" && (
                  <CityPopover
                    citiesList={combinedCities}
                    placeholder="Search pickup location or airport..."
                    query={searchFromQuery}
                    onQueryChange={setSearchFromQuery}
                    selected={fromCity}
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

              <div onClick={() => toggle("to")} className={`md:col-span-4 ${field}`}>
                <div className={label}>Drop Location</div>
                <div className={value}>{toCity}</div>
                <div className={sub}>{toState}</div>
                {openDropdown === "to" && (
                  <CityPopover
                    citiesList={combinedCities}
                    placeholder="Search drop location or airport..."
                    query={searchToQuery}
                    onQueryChange={setSearchToQuery}
                    selected={toCity}
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

              <div onClick={() => toggle("pickupDate")} className={`md:col-span-2 ${field}`}>
                <div className={label}>
                  Pickup Date <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className={dateLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">{pickupParts.dayNum}</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">{pickupParts.monthYear}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">{pickupParts.weekday}</div>
                {openDropdown === "pickupDate" && (
                  <CalendarPopover
                    month={calendarMonth}
                    onPrev={prevMonth}
                    onNext={nextMonth}
                    selectedDate={pickupDate}
                    onSelect={(d) => selectCalendarDate(d, true)}
                  />
                )}
              </div>

              <div onClick={() => toggle("pickupTime")} className={`md:col-span-2 ${field} rounded-b-xl md:rounded-r-xl md:rounded-bl-none`}>
                <div className={label}>
                  Pickup <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
                <div className={timeLine}>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">{pickupTimeParts.time}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900">{pickupTimeParts.meridiem}</span>
                </div>
                <div className="text-xs sm:text-[13px] text-slate-400 font-medium mt-1">Start time</div>
                {openDropdown === "pickupTime" && (
                  <TimePopover title="Select Pickup Time" value={pickupTime} onChange={setPickupTime} />
                )}
              </div>
            </div>
          )}

          {/* Footer row with Live Map Route Distance Indicator */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-bold transition group"
            >
              <span className="text-[13px] font-bold">+ Add Stops</span>
              <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                new
              </span>
            </button>

            {/* Live Map Route & Real Road Distance Display */}
            <div className="flex items-center gap-2">
              {isCalculatingDistance ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold animate-pulse shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span>Calculating real road distance...</span>
                </div>
              ) : routeDistance && routeDistance > 0 ? (
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 text-slate-900 text-xs shadow-xs">
                  <div className="w-5 h-5 rounded-md bg-amber-400 flex items-center justify-center text-slate-950 shrink-0 shadow-xs">
                    <Route className="w-3 h-3 text-slate-950" />
                  </div>
                  <span className="font-black text-slate-950 text-xs">
                    {fromCity} &rarr; {toCity}
                  </span>
                  <span className="font-black text-amber-950 bg-amber-400 px-2.5 py-0.5 rounded-md text-[11px] tracking-wide border border-amber-500/40 shadow-xs">
                    {routeDistance} KM
                  </span>
                  {routeDurationMinutes && routeDurationMinutes > 0 && (
                    <span className="text-slate-600 font-bold flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-amber-600" />
                      ~{Math.floor(routeDurationMinutes / 60) > 0 ? `${Math.floor(routeDurationMinutes / 60)}h ` : ""}{routeDurationMinutes % 60}m drive
                    </span>
                  )}
                  <span className="text-[10px] text-emerald-700 font-black uppercase tracking-wider bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60 hidden sm:inline-block">
                    Map Verified
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-[11px] sm:text-xs font-semibold">Last Search:</span>
                  <div className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold flex flex-col items-center leading-tight border border-amber-200">
                    <div>
                      {fromCity} &rarr; {toCity}
                    </div>
                    <div className="text-[9px] text-amber-500 font-normal">24 Oct 26</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Centered Search pill */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30">
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="px-14 sm:px-22 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-slate-950 text-base sm:text-lg font-extrabold tracking-widest uppercase border border-amber-500/40 shadow-[0_8px_26px_rgba(245,158,11,0.45)] hover:shadow-[0_10px_32px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* Laurel pill: "India's Top Rated Car Rental Service" - perfectly spaced between Search button and Rating pill */}
        <div className="mt-10 sm:mt-11 mb-6 sm:mb-8 flex items-center justify-center gap-2 text-white text-xs sm:text-[13px] font-semibold tracking-wide drop-shadow-sm select-none">
          <svg className="w-5 h-6 text-white fill-current drop-shadow-sm" viewBox="0 0 24 32" aria-hidden="true">
            <path d="M18 2C16 5 13 7 9 7C11 9 12 11 11 14C8 13 6 11 5 8C5 11 4 14 2 16C4 16 6 15 8 13C8 17 7 20 5 22C7 21 9 19 10 17C11 20 11 23 9 26C11 24 13 21 14 18C16 21 17 24 16 28C18 25 19 22 19 19C21 21 23 23 24 25C24 22 23 19 21 17C23 18 25 18 26 18C24 15 22 14 20 13C22 13 24 12 25 10C22 10 20 10 18 11C19 8 20 5 18 2Z" />
          </svg>
          <span className="font-semibold text-white drop-shadow-sm tracking-wide">
            India&apos;s Top Rated Car Rental Service
          </span>
          <svg className="w-5 h-6 text-white fill-current drop-shadow-sm -scale-x-100" viewBox="0 0 24 32" aria-hidden="true">
            <path d="M18 2C16 5 13 7 9 7C11 9 12 11 11 14C8 13 6 11 5 8C5 11 4 14 2 16C4 16 6 15 8 13C8 17 7 20 5 22C7 21 9 19 10 17C11 20 11 23 9 26C11 24 13 21 14 18C16 21 17 24 16 28C18 25 19 22 19 19C21 21 23 23 24 25C24 22 23 19 21 17C23 18 25 18 26 18C24 15 22 14 20 13C22 13 24 12 25 10C22 10 20 10 18 11C19 8 20 5 18 2Z" />
          </svg>
        </div>
      </div>

      {/* Rating pill */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30 w-full max-w-fit px-4 pointer-events-none">
        <div className="pointer-events-auto bg-white rounded-3xl sm:rounded-full px-5 sm:px-8 py-2.5 sm:py-3 shadow-[0_12px_36px_rgba(0,0,0,0.14)] border border-slate-100 flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-11">
          {/* App Store */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007aff] flex items-center justify-center shadow-xs shrink-0 p-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white stroke-[2.4] stroke-linecap-round stroke-linejoin-round" aria-hidden="true">
                <line x1="8" y1="18" x2="16" y2="18" />
                <line x1="5.5" y1="18" x2="11.5" y2="5" />
                <line x1="18.5" y1="18" x2="12.5" y2="5" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-[13px] font-black text-slate-900 leading-tight">App Store</div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>
              <div className="text-[11px] font-bold text-slate-900 mt-0.5">(4.2K+ Reviews)</div>
            </div>
          </div>

          {/* Google */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f8fafc] border border-slate-200/80 flex items-center justify-center shrink-0 p-2 shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-[13px] font-black text-slate-900 leading-tight">Google</div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>
              <div className="text-[11px] font-bold text-slate-900 mt-0.5">(6.1K+ Reviews)</div>
            </div>
          </div>

          {/* Play Store */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 512 512" className="w-7 h-7" aria-hidden="true">
                <path fill="#00c1ff" d="M48.2 24.5C40.6 32.5 36 44.5 36 60v392c0 15.5 4.6 27.5 12.2 35.5l2.4 2.5L270.2 270.4v-4.8L50.6 22z" />
                <path fill="#00f175" d="M343.4 343.6l-73.2-73.2v-4.8l73.2-73.2 2.2 1.3 86.8 49.3c24.8 14.1 24.8 37.1 0 51.2l-86.8 49.3-2.2 1.1z" />
                <path fill="#ff3a44" d="M345.6 342.3L270.2 268 48.2 490c8.2 8.7 21.7 9.8 36.8 1.2l260.6-148.9z" />
                <path fill="#ffc800" d="M345.6 169.7L85 20.8C69.9 12.2 56.4 13.3 48.2 22l222 222 75.4-74.3z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-[13px] font-black text-slate-900 leading-tight">Play Store</div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>
              <div className="text-[11px] font-bold text-slate-900 mt-0.5">(15.5K+ Reviews)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};