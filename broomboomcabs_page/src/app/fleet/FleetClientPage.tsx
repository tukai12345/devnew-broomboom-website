"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Info,
  Check,
  Shield,
  Clock,
  Sparkles,
  Plus,
  X,
  Edit2,
  Calendar as CalendarIcon,
  ArrowRight,
  ArrowLeftRight,
  Users,
  Snowflake,
  Route,
  SlidersHorizontal,
  RefreshCw,
  MapPin,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BookingModal } from "@/components/BookingModal";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { SearchParams } from "@/components/HeroSearch";
import { CitySearchPopover } from "@/components/CitySearchPopover";
import { api, PricingCalculationResult } from "@/services/api";
import { CITIES, FLEET_CABS } from "@/data/cabsData";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface VehicleItem {
  id: string;
  name: string;
  modelType: string;
  modelBadgeText: string;
  category: "Hatchback" | "Sedan" | "Suv" | "Minibus";
  modelName: string;
  fuelType: "Cng/diesel" | "Diesel";
  fuelLabel: string;
  seats: number;
  ac: boolean;
  includedKms: number;
  discountPercent: number;
  originalPrice: number;
  discountedPrice: number;
  taxAndFee: number;
  roofCarrierFee?: number;
  imageType: "hatchback" | "sedan" | "suv" | "minibus" | "tempo";
  extraKmRate?: number;
  advanceAmount?: number;
  dueAmount?: number;
}

type FilterGroup = "cab" | "model" | "fuel";

interface ActiveFilterChip {
  group: FilterGroup;
  value: string;
}

/* -------------------------------------------------------------------------- */
/*                                 CONSTANTS                                  */
/* -------------------------------------------------------------------------- */


const TIME_OPTIONS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM",
];

const DROP_TIME_OPTIONS = [
  "till 08:00 PM", "till 09:00 PM", "till 09:45 PM", "till 10:30 PM",
  "till 11:45 PM", "till 06:00 AM (Next Day)",
];

const TRIP_TYPES = [
  "Outstation Round-Trip",
  "Outstation One-Way",
  "Airport Transfers",
  "Hourly Rentals",
];

const CAB_TYPE_OPTIONS = ["Hatchback", "Sedan", "Suv", "Minibus"] as const;
const FUEL_TYPE_OPTIONS = ["Cng/diesel", "Diesel"] as const;

/* -------------------------------------------------------------------------- */
/*                              PURE HELPERS                                  */
/* -------------------------------------------------------------------------- */

const formatDisplayDate = (isoStr: string): string => {
  if (!isoStr) return "Select date";
  const d = new Date(`${isoStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "Select date";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}...`;
};

const format12Hour = (time24: string): string => {
  if (!time24) return "11:00 AM";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr || "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  const hDisplay = h < 10 ? `0${h}` : `${h}`;
  return `${hDisplay}:${m} ${ampm}`;
};

const format24Hour = (time12: string): string => {
  if (!time12) return "11:00";
  const cleaned = time12.replace(/^till\s+/i, "").trim();
  const match = cleaned.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return "11:00";
  let h = parseInt(match[1], 10);
  const m = match[2];
  const ampm = (match[3] || "AM").toUpperCase();
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const hStr = h < 10 ? `0${h}` : `${h}`;
  return `${hStr}:${m}`;
};

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* -------------------------------------------------------------------------- */
/*                            SMALL PRESENTATION                              */
/* -------------------------------------------------------------------------- */

const FieldLabel: React.FC<{ icon?: React.ReactNode; children: React.ReactNode }> = ({
  icon,
  children,
}) => (
  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
    <span>{children}</span>
    {icon}
  </div>
);

const SpecPill: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
    {icon}
    {label}
  </span>
);

const FilterRow: React.FC<{
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}> = ({ label, count, checked, onChange }) => (
  <label className="flex items-center justify-between gap-2 cursor-pointer select-none group py-1">
    <span className="flex items-center gap-2.5 min-w-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-slate-300 accent-amber-500 focus:ring-amber-400 cursor-pointer shrink-0"
      />
      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">
        {label}
      </span>
    </span>
    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md shrink-0">
      {count}
    </span>
  </label>
);

const FilterSection: React.FC<{
  title: string;
  open: boolean;
  onToggle: () => void;
  onClear?: () => void;
  hasSelection?: boolean;
  children: React.ReactNode;
}> = ({ title, open, onToggle, onClear, hasSelection, children }) => (
  <div className="py-4 border-b border-slate-100 last:border-b-0">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-bold text-slate-900">{title}</span>
      <div className="flex items-center gap-2">
        {hasSelection && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] font-bold text-slate-400 hover:text-amber-600 uppercase tracking-wider"
          >
            Clear
          </button>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="text-slate-400 hover:text-amber-500"
        >
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
    {open && <div className="space-y-2 pt-0.5">{children}</div>}
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

const FleetPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  /* ----------------------------- Search state ----------------------------- */
  const rawTripType = searchParams.get("type") || searchParams.get("tripType") || "Outstation One-Way";
  const [tripType, setTripType] = useState<string>(() => {
    const lower = rawTripType.toLowerCase();
    if (lower.includes("round")) return "Outstation Round-Trip";
    if (lower.includes("hourly") || lower.includes("rental")) return "Hourly Rentals";
    if (lower.includes("airport")) return "Airport Transfers";
    return "Outstation One-Way";
  });
  const [fromCity, setFromCity] = useState<string>(searchParams.get("from") || "Mumbai");
  const [toCity, setToCity] = useState<string>(searchParams.get("to") || "Pune");

  const [sourceState, setSourceState] = useState<string>('');
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(() => {
    const lat = searchParams.get("pickupLat");
    const lng = searchParams.get("pickupLng");
    return lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;
  });
  const [dropCoords, setDropCoords] = useState<{ lat: number; lng: number } | null>(() => {
    const lat = searchParams.get("dropLat");
    const lng = searchParams.get("dropLng");
    return lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;
  });

  // Update sourceState based on fromCity (name or slug)
  useEffect(() => {
    const lower = fromCity.trim().toLowerCase();
    const byName = CITIES.find((c) => c.name.toLowerCase() === lower);
    const byId = CITIES.find((c) => c.id.toLowerCase() === lower);
    setSourceState(byName?.state ?? byId?.state ?? '');
  }, [fromCity]);

  const [pickupDateIso, setPickupDateIso] = useState<string>(
    searchParams.get("date") || searchParams.get("pickupDate") || "2026-10-27"
  );
  const [dropDateIso, setDropDateIso] = useState<string>(
    searchParams.get("dropDate") || searchParams.get("returnDate") || searchParams.get("date") || "2026-10-28"
  );
  const [pickupTime, setPickupTime] = useState<string>(
    searchParams.get("time") || searchParams.get("pickupTime") || "11:00 AM"
  );
  const [dropTime, setDropTime] = useState<string>(
    searchParams.get("dropTime") || searchParams.get("returnTime") || "till 09:45 PM"
  );

  const [viaStops, setViaStops] = useState<string[]>([]);
  const [newStopInput, setNewStopInput] = useState("");
  const [showAddStopModal, setShowAddStopModal] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  /* ------------------------------ Filters -------------------------------- */
  const [selectedCabTypes, setSelectedCabTypes] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);

  const [isCabTypeOpen, setIsCabTypeOpen] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(true);
  const [isFuelOpen, setIsFuelOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // Resolve state from city name or id
  const resolveState = (city: string) => {
    const lower = city.trim().toLowerCase();
    const byName = CITIES.find((c) => c.name.toLowerCase() === lower);
    if (byName) return byName.state;
    const byId = CITIES.find((c) => c.id.toLowerCase() === lower);
    if (byId) return byId.state;
    return "";
  };


  /* ------------------------------ Booking -------------------------------- */
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  /* ------------------------------- Refs ---------------------------------- */
  const searchStripRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  /* --------------------- Close popovers on outside click ----------------- */
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        searchStripRef.current?.contains(target) ||
        target.closest("[data-popover-shell]") ||
        target.closest(".fixed")
      ) {
        return;
      }
      setOpenDropdown(null);
      setShowAddStopModal(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  /* ------------------- Backend dynamic route & pricing ------------------- */
  const queryDist = searchParams.get("distance");
  const queryDur = searchParams.get("duration");

  const [backendRoute, setBackendRoute] = useState<{
    distance: number;
    durationMinutes: number;
  } | null>(() => {
    if (queryDist && parseFloat(queryDist) > 0) {
      return {
        distance: parseFloat(queryDist),
        durationMinutes: queryDur ? parseInt(queryDur, 10) : Math.round(parseFloat(queryDist) * 0.8),
      };
    }
    return null;
  });

  const [backendPrices, setBackendPrices] = useState<
    Record<string, PricingCalculationResult>
  >({});
  const [isCalculatingPrices, setIsCalculatingPrices] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchBackendData() {
      if (!fromCity || !toCity) return;
      setIsCalculatingPrices(true);

      let currentDistance = 0;
      let currentDuration = 0;

      // 1. Calculate road distance & duration via map API (Nominatim / OSRM / Backend)
      try {
        const distRes = await api.calculateDistance({
          from: fromCity.trim(),
          to: toCity.trim(),
          source: fromCity.trim(),
          destination: toCity.trim(),
          pickupLat: pickupCoords?.lat,
          pickupLng: pickupCoords?.lng,
          dropLat: dropCoords?.lat,
          dropLng: dropCoords?.lng,
        });
        if (distRes && distRes.distance > 0) {
          currentDistance = distRes.distance;
          currentDuration = distRes.durationMinutes;
          if (!cancelled) {
            setBackendRoute({
              distance: currentDistance,
              durationMinutes: currentDuration,
            });
          }
        }
      } catch (err) {
        console.warn("Backend distance fetch error:", err);
      }

      // If still no distance, try to use static popular routes data as fallback
        if (currentDistance === 0) {
          // Import POPULAR_ROUTES lazily to avoid circular deps
          const { POPULAR_ROUTES } = await import("@/data/cabsData");
          const route = POPULAR_ROUTES.find(
            (r) =>
              r.from.toLowerCase() === fromCity.trim().toLowerCase() &&
              r.to.toLowerCase() === toCity.trim().toLowerCase()
          );
          if (route) {
            // distance string like "185 km"
            const match = route.distance.match(/(\d+\.?\d*)/);
            if (match) {
              currentDistance = parseFloat(match[1]);
              currentDuration = Math.round(currentDistance * 0.8);
              if (!cancelled) {
                setBackendRoute({
                  distance: currentDistance,
                  durationMinutes: currentDuration,
                });
              }
            }
          }
        }
      if (currentDistance === 0 && queryDist && parseFloat(queryDist) > 0) {
        const initialFrom = searchParams.get("from");
        const initialTo = searchParams.get("to");
        if (
          (!initialFrom || initialFrom.toLowerCase() === fromCity.toLowerCase()) &&
          (!initialTo || initialTo.toLowerCase() === toCity.toLowerCase())
        ) {
          currentDistance = parseFloat(queryDist);
          currentDuration = queryDur ? parseInt(queryDur, 10) : Math.round(currentDistance * 0.8);
          if (!cancelled) {
            setBackendRoute({
              distance: currentDistance,
              durationMinutes: currentDuration,
            });
          }
        }
      }

      // 2. Calculate dynamic fares per category from Backend Pricing Engine
      try {
        const tLower = tripType.toLowerCase();
        const isRound = tLower.includes("round");
        const isRental = tLower.includes("hourly") || tLower.includes("rental");
        const isAirport = tLower.includes("airport");
        const rideTypeParam: "Oneway" | "Roundtrip" | "Rental" | "Airport" =
          isRound ? "Roundtrip" : isRental ? "Rental" : isAirport ? "Airport" : "Oneway";

        let days = 1;
        if (isRound && pickupDateIso && dropDateIso) {
          const p = new Date(pickupDateIso);
          const d = new Date(dropDateIso);
          const diffDays = Math.ceil((d.getTime() - p.getTime()) / (1000 * 60 * 60 * 24));
          days = Math.max(1, diffDays || 1);
        }

        const calcDistance = isRound ? currentDistance * 2 : currentDistance;
        const cleanPickupTime = pickupTime ? pickupTime.trim() : "";
        const cleanDropTime = dropTime ? dropTime.replace(/^till\s+/i, "").trim() : "";
        const currentSourceState = resolveState(fromCity) || sourceState;


        const categories = [
          "Hatchback",
          "Sedan",
          "SUV",
          "SUV+",
          "13 Seater Traveller",
          "17 Seater Traveller",
        ];

        const prices: Record<string, PricingCalculationResult> = {};

        await Promise.all(
          categories.map(async (cat) => {
            try {
              console.log('Pricing request params', {
            rideType: rideTypeParam,
            sourceCity: fromCity.trim(),
            destinationCity: toCity.trim(),
            category: cat,
            state: currentSourceState || undefined,
            pickupLat: pickupCoords?.lat,
            pickupLng: pickupCoords?.lng,
            dropLat: dropCoords?.lat,
            dropLng: dropCoords?.lng,
            distance: calcDistance > 0 ? calcDistance : undefined,
            oneWayDistance: currentDistance > 0 ? currentDistance : undefined,
            days: isRound ? days : 1,
            pickupDate: pickupDateIso,
            pickupTime: cleanPickupTime,
            returnDate: dropDateIso,
            returnTime: cleanDropTime,
          });
          const res = await api.calculatePrice({
                rideType: rideTypeParam,
                sourceCity: fromCity.trim(),
                destinationCity: toCity.trim(),
                category: cat,
                state: currentSourceState || undefined,
                pickupLat: pickupCoords?.lat,
                pickupLng: pickupCoords?.lng,
                dropLat: dropCoords?.lat,
                dropLng: dropCoords?.lng,
                distance: calcDistance > 0 ? calcDistance : undefined,
                oneWayDistance: currentDistance > 0 ? currentDistance : undefined,
                days: isRound ? days : 1,
                pickupDate: pickupDateIso,
                pickupTime: cleanPickupTime,
                returnDate: dropDateIso,
                returnTime: cleanDropTime,
              });
              if (res && res.fare > 0) {
                prices[cat] = res;
                // If map distance wasn't resolved initially, update backendRoute from backend's map resolver
                if (currentDistance === 0 && res.distance > 0 && !cancelled) {
                  const resolvedOneWay = isRound ? Math.round((res.distance / 2) * 10) / 10 : res.distance;
                  currentDistance = resolvedOneWay;
                  currentDuration = res.durationMinutes || Math.round(resolvedOneWay * 0.8);
                  setBackendRoute({
                    distance: resolvedOneWay,
                    durationMinutes: currentDuration,
                  });
                }
              }
            } catch {}
          })
        );

        if (!cancelled) {
          if (Object.keys(prices).length > 0) {
            setBackendPrices(prices);
          }
          setIsCalculatingPrices(false);
        }
      } catch (err) {
        console.warn("Backend price calculation error:", err);
        if (!cancelled) setIsCalculatingPrices(false);
      }
    }

    fetchBackendData();
    return () => {
      cancelled = true;
    };
  }, [
    fromCity,
    toCity,
    tripType,
    pickupDateIso,
    dropDateIso,
    pickupTime,
    dropTime,
    pickupCoords,
    dropCoords,
  ]);

  /* --------------------------- Route metadata ---------------------------- */
  const routeMeta = useMemo(() => {
    const isRound = tripType.toLowerCase().includes("round");

    const effectiveDistance = backendRoute?.distance || (queryDist ? parseFloat(queryDist) : 0);
    const effectiveDuration = backendRoute?.durationMinutes || (queryDur ? parseInt(queryDur, 10) : 0);

    if (effectiveDistance > 0) {
      const kms = isRound ? Math.round(effectiveDistance * 2) : Math.round(effectiveDistance);
      const hours = isRound
        ? Number(((effectiveDuration * 2) / 60).toFixed(1))
        : Number((effectiveDuration / 60).toFixed(1));
      return {
        kms,
        oneWayKms: Math.round(effectiveDistance),
        hours,
        durationMinutes: isRound ? effectiveDuration * 2 : effectiveDuration,
        hasDistance: true,
      };
    }

    // Default while live map distance is resolving (no arbitrary city fallbacks)
    return {
      kms: 0,
      oneWayKms: 0,
      hours: 0,
      durationMinutes: 0,
      hasDistance: false,
    };
  }, [tripType, backendRoute, queryDist, queryDur]);

  /* ----------------------------- Fleet data ------------------------------ */
  const allVehicles: VehicleItem[] = useMemo(() => {
    const kms = routeMeta.kms > 0 ? routeMeta.kms : 100;
    const roundTo10 = (n: number) => Math.round(n / 10) * 10;
    const calcTax = (discPrice: number) => Math.round((discPrice * 0.05) / 10) * 10;

    // Helper to get true backend price with fallback per-km rate
    const getVehiclePricing = (
      categoryName: string,
      perKmFallback: number,
      defaultDiscount: number = 12
    ) => {
      const live = backendPrices[categoryName];
      if (live && live.fare > 0) {
        return {
          discountedPrice: live.fare,
          originalPrice: live.originalFare || Math.round((live.fare * 1.15) / 10) * 10,
          discountPercent: live.discountPercent || defaultDiscount,
          advance: live.advance,
          dueFare: live.dueFare,
          extraKmRate: (live.details as any)?.ratePerKm || (live.details as any)?.extraKmRate || perKmFallback,
        };
      }

      // Use admin‑set per‑km rate for West Bengal if applicable
      const perKmRate = sourceState === "West Bengal" ? 10 : perKmFallback;
      // If backend price is still loading, calculate directly using actual map road distance
      const isRoundTrip = tripType.toLowerCase().includes("round");
      const fallbackAdvancePct = isRoundTrip ? 0.25 : 0.2;
      const fallbackFare = Math.max(1200, roundTo10(kms * perKmRate));
      return {
        discountedPrice: fallbackFare,
        originalPrice: Math.round((fallbackFare * 1.15) / 10) * 10,
        discountPercent: defaultDiscount,
        advance: Math.round(fallbackFare * fallbackAdvancePct),
        dueFare: Math.round(fallbackFare * (1 - fallbackAdvancePct)),
        extraKmRate: perKmRate,
      };
    };

    const hatchPricing = getVehiclePricing("Hatchback", 11, 14);
    const sedanPricing = getVehiclePricing("Sedan", 15, 14);
    const suvPricing = getVehiclePricing("SUV", 20, 12);
    const suvPlusPricing = getVehiclePricing("SUV+", 25, 14);
    const traveller13Pricing = getVehiclePricing("13 Seater Traveller", 40, 0);
    const traveller17Pricing = getVehiclePricing("17 Seater Traveller", 45, 0);

    return [
      {
        id: "wagonr-swift",
        name: "WagonR, Swift",
        modelType: "or similar",
        modelBadgeText: "NEW",
        category: "Hatchback",
        modelName: "WagonR, Swift",
        fuelType: "Cng/diesel",
        fuelLabel: "CNG/Diesel",
        seats: 4,
        ac: true,
        includedKms: routeMeta.kms,
        discountPercent: hatchPricing.discountPercent,
        originalPrice: hatchPricing.originalPrice,
        discountedPrice: hatchPricing.discountedPrice,
        taxAndFee: calcTax(hatchPricing.discountedPrice),
        advanceAmount: hatchPricing.advance,
        dueAmount: hatchPricing.dueFare,
        extraKmRate: hatchPricing.extraKmRate,
        roofCarrierFee: 157,
        imageType: "hatchback",
      },
      {
        id: "dzire-etios",
        name: "Dzire, Etios",
        modelType: "or similar",
        modelBadgeText: "5/5",
        category: "Sedan",
        modelName: "Dzire, Etios",
        fuelType: "Cng/diesel",
        fuelLabel: "CNG/Diesel",
        seats: 4,
        ac: true,
        includedKms: routeMeta.kms,
        discountPercent: sedanPricing.discountPercent,
        originalPrice: sedanPricing.originalPrice,
        discountedPrice: sedanPricing.discountedPrice,
        taxAndFee: calcTax(sedanPricing.discountedPrice),
        advanceAmount: sedanPricing.advance,
        dueAmount: sedanPricing.dueFare,
        extraKmRate: sedanPricing.extraKmRate,
        roofCarrierFee: 157,
        imageType: "sedan",
      },
      {
        id: "innova-crysta",
        name: "Innova Crysta",
        modelType: "exact model",
        modelBadgeText: "NEW",
        category: "Suv",
        modelName: "Innova Crysta",
        fuelType: "Diesel",
        fuelLabel: "Diesel",
        seats: 6,
        ac: true,
        includedKms: routeMeta.kms,
        discountPercent: suvPlusPricing.discountPercent,
        originalPrice: suvPlusPricing.originalPrice,
        discountedPrice: suvPlusPricing.discountedPrice,
        taxAndFee: calcTax(suvPlusPricing.discountedPrice),
        advanceAmount: suvPlusPricing.advance,
        dueAmount: suvPlusPricing.dueFare,
        extraKmRate: suvPlusPricing.extraKmRate,
        roofCarrierFee: 262,
        imageType: "suv",
      },
      {
        id: "toyota-innova",
        name: "Toyota Innova",
        modelType: "exact model",
        modelBadgeText: "NEW",
        category: "Suv",
        modelName: "Toyota Innova",
        fuelType: "Diesel",
        fuelLabel: "Diesel",
        seats: 7,
        ac: true,
        includedKms: routeMeta.kms,
        discountPercent: suvPricing.discountPercent,
        originalPrice: suvPricing.originalPrice,
        discountedPrice: suvPricing.discountedPrice,
        taxAndFee: calcTax(suvPricing.discountedPrice),
        advanceAmount: suvPricing.advance,
        dueAmount: suvPricing.dueFare,
        extraKmRate: suvPricing.extraKmRate,
        roofCarrierFee: 262,
        imageType: "suv",
      },
      {
        id: "minibus-20",
        name: "Minibus (20 + 1)",
        modelType: "exact model",
        modelBadgeText: "NEW",
        category: "Minibus",
        modelName: "Minibus (20 + 1)",
        fuelType: "Diesel",
        fuelLabel: "Diesel",
        seats: 20,
        ac: true,
        includedKms: routeMeta.kms,
        discountPercent: traveller17Pricing.discountPercent,
        originalPrice: traveller17Pricing.originalPrice,
        discountedPrice: traveller17Pricing.discountedPrice,
        taxAndFee: calcTax(traveller17Pricing.discountedPrice),
        advanceAmount: traveller17Pricing.advance,
        dueAmount: traveller17Pricing.dueFare,
        extraKmRate: traveller17Pricing.extraKmRate,
        imageType: "minibus",
      },
      {
        id: "tempo-12",
        name: "Tempo traveller (12 + 1)",
        modelType: "exact model",
        modelBadgeText: "NEW",
        category: "Minibus",
        modelName: "Tempo traveller (12 + 1)",
        fuelType: "Diesel",
        fuelLabel: "Diesel",
        seats: 12,
        ac: true,
        includedKms: routeMeta.kms,
        discountPercent: traveller13Pricing.discountPercent,
        originalPrice: traveller13Pricing.originalPrice,
        discountedPrice: traveller13Pricing.discountedPrice,
        taxAndFee: calcTax(traveller13Pricing.discountedPrice),
        advanceAmount: traveller13Pricing.advance,
        dueAmount: traveller13Pricing.dueFare,
        extraKmRate: traveller13Pricing.extraKmRate,
        imageType: "tempo",
      },
      {
        id: "tempo-16",
        name: "Tempo traveller (16 + 1)",
        modelType: "exact model",
        modelBadgeText: "NEW",
        category: "Minibus",
        modelName: "Tempo traveller (16 + 1)",
        fuelType: "Diesel",
        fuelLabel: "Diesel",
        seats: 16,
        ac: true,
        includedKms: routeMeta.kms,
        discountPercent: traveller17Pricing.discountPercent,
        originalPrice: traveller17Pricing.originalPrice,
        discountedPrice: traveller17Pricing.discountedPrice,
        taxAndFee: calcTax(traveller17Pricing.discountedPrice),
        advanceAmount: traveller17Pricing.advance,
        dueAmount: traveller17Pricing.dueFare,
        extraKmRate: traveller17Pricing.extraKmRate,
        imageType: "tempo",
      },
    ];
  }, [routeMeta, backendPrices]);

  /* ------------------------------ Filtering ------------------------------ */
  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((v) => {
      if (selectedCabTypes.length > 0 && !selectedCabTypes.includes(v.category)) return false;
      if (selectedModels.length > 0 && !selectedModels.includes(v.modelName)) return false;
      if (
        selectedFuelTypes.length > 0 &&
        !selectedFuelTypes.some((f) => f.toLowerCase() === v.fuelType.toLowerCase())
      )
        return false;
      return true;
    });
  }, [allVehicles, selectedCabTypes, selectedModels, selectedFuelTypes]);

  /* --------------------------- Live filter counts ------------------------ */
  const filterCounts = useMemo(() => {
    const cab: Record<string, number> = {};
    const model: Record<string, number> = {};
    const fuel: Record<string, number> = {};
    for (const v of allVehicles) {
      cab[v.category] = (cab[v.category] ?? 0) + 1;
      model[v.modelName] = (model[v.modelName] ?? 0) + 1;
      fuel[v.fuelType] = (fuel[v.fuelType] ?? 0) + 1;
    }
    return { cab, model, fuel };
  }, [allVehicles]);

  const modelOptions = useMemo(
    () =>
      Array.from(
        new Set(
          allVehicles.filter((v) => v.modelType === "exact model").map((v) => v.modelName)
        )
      ),
    [allVehicles]
  );

  const activeFilters: ActiveFilterChip[] = useMemo(
    () => [
      ...selectedCabTypes.map((value) => ({ group: "cab" as const, value })),
      ...selectedModels.map((value) => ({ group: "model" as const, value })),
      ...selectedFuelTypes.map((value) => ({ group: "fuel" as const, value })),
    ],
    [selectedCabTypes, selectedModels, selectedFuelTypes]
  );

  /* ------------------------------- Actions ------------------------------- */
  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setList(list.includes(value) ? list.filter((i) => i !== value) : [...list, value]);
  };

  const clearAllFilters = () => {
    setSelectedCabTypes([]);
    setSelectedModels([]);
    setSelectedFuelTypes([]);
  };

  const removeFilterChip = (chip: ActiveFilterChip) => {
    if (chip.group === "cab") setSelectedCabTypes((l) => l.filter((v) => v !== chip.value));
    if (chip.group === "model") setSelectedModels((l) => l.filter((v) => v !== chip.value));
    if (chip.group === "fuel") setSelectedFuelTypes((l) => l.filter((v) => v !== chip.value));
  };

  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    const value = newStopInput.trim();
    if (value && !viaStops.includes(value)) {
      setViaStops([...viaStops, value]);
      setNewStopInput("");
    }
  };

  const removeStop = (stopToRemove: string) => {
    setViaStops(viaStops.filter((s) => s !== stopToRemove));
  };

  const handleSearch = () => {
    setOpenDropdown(null);
    setShowAddStopModal(false);

    // Sync new cities/times into URL parameters so state persists cleanly
    const params = new URLSearchParams({
      tripType,
      from: fromCity.trim(),
      to: toCity.trim(),
      pickupDate: pickupDateIso,
      pickupTime,
      dropDate: dropDateIso,
      dropTime,
    });
    if (backendRoute?.distance) {
      params.set("distance", backendRoute.distance.toString());
      params.set("duration", backendRoute.durationMinutes.toString());
    }
    if (pickupCoords) {
      params.set("pickupLat", pickupCoords.lat.toString());
      params.set("pickupLng", pickupCoords.lng.toString());
    }
    if (dropCoords) {
      params.set("dropLat", dropCoords.lat.toString());
      params.set("dropLng", dropCoords.lng.toString());
    }
    router.replace(`/fleet?${params.toString()}`, { scroll: false });
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectCabClick = (vehicle: VehicleItem) => {
    setSelectedVehicle(vehicle);
    const params = new URLSearchParams({
      cabId: vehicle.id,
      cabName: vehicle.name,
      cabCategory: vehicle.category,
      cabFuel: vehicle.fuelLabel,
      cabSeats: vehicle.seats.toString(),
      tripType,
      from: fromCity,
      to: toCity,
      pickupDate: pickupDateIso,
      pickupDateDisplay: formatDisplayDate(pickupDateIso),
      dropDate: dropDateIso,
      dropDateDisplay: formatDisplayDate(dropDateIso),
      pickupTime,
      dropTime,
      baseFare: vehicle.discountedPrice.toString(),
      discountedPrice: vehicle.discountedPrice.toString(),
      includedKms: vehicle.includedKms.toString(),
      imageType: vehicle.imageType,
      modelType: vehicle.modelType,
      modelBadgeText: vehicle.modelBadgeText || "",
      extraKmRate: (vehicle.extraKmRate || 15).toString(),
      distance: (routeMeta.kms || "").toString(),
      oneWayDistance: (routeMeta.oneWayKms || "").toString(),
      duration: (routeMeta.durationMinutes || "").toString(),
    });
    if (vehicle.advanceAmount) params.set("advance", vehicle.advanceAmount.toString());
    if (vehicle.dueAmount) params.set("dueFare", vehicle.dueAmount.toString());

    router.push(`/fleet/review?${params.toString()}`);
  };

  /* ------------------------- Vehicle illustrations ----------------------- */
  const renderVehicleIllustration = (type: VehicleItem["imageType"]) => {
    if (type === "hatchback") {
      return (
        <svg viewBox="0 0 100 50" className="w-16 h-9 drop-shadow-sm" aria-hidden="true">
          <path
            d="M 12 32 L 18 32 C 18 26, 26 26, 26 32 L 68 32 C 68 26, 76 26, 76 32 L 88 32 C 91 32, 92 29, 90 26 L 82 22 C 78 21, 74 15, 68 15 L 36 15 C 28 15, 20 22, 14 26 L 10 28 C 8 29, 8 32, 12 32 Z"
            fill="#5b95c6"
          />
          <path d="M 37 17 L 52 17 L 52 25 L 30 25 C 32 20, 34 17, 37 17 Z" fill="#22394f" />
          <path d="M 55 17 L 66 17 C 70 17, 73 20, 75 23 L 77 25 L 55 25 Z" fill="#22394f" />
          <circle cx="22" cy="32" r="6" fill="#1b2430" />
          <circle cx="22" cy="32" r="3" fill="#cbd5e1" />
          <circle cx="72" cy="32" r="6" fill="#1b2430" />
          <circle cx="72" cy="32" r="3" fill="#cbd5e1" />
          <rect x="8" y="27" width="3" height="3" rx="1" fill="#facc15" />
          <rect x="89" y="27" width="2" height="3" rx="1" fill="#ef4444" />
        </svg>
      );
    }
    if (type === "sedan") {
      return (
        <svg viewBox="0 0 105 50" className="w-18 h-9 drop-shadow-sm" aria-hidden="true">
          <path
            d="M 8 32 L 16 32 C 16 26, 25 26, 25 32 L 72 32 C 72 26, 81 26, 81 32 L 96 32 C 99 32, 100 29, 98 27 L 88 23 C 85 22, 80 16, 72 16 L 38 16 C 30 16, 24 22, 18 24 L 9 26 C 6 27, 6 32, 8 32 Z"
            fill="#6ca4d8"
          />
          <path d="M 39 18 L 53 18 L 53 25 L 28 25 C 31 20, 35 18, 39 18 Z" fill="#1e293b" />
          <path d="M 56 18 L 69 18 C 74 18, 77 21, 79 25 L 56 25 Z" fill="#1e293b" />
          <circle cx="20.5" cy="32" r="6" fill="#0f172a" />
          <circle cx="20.5" cy="32" r="3" fill="#cbd5e1" />
          <circle cx="76.5" cy="32" r="6" fill="#0f172a" />
          <circle cx="76.5" cy="32" r="3" fill="#cbd5e1" />
          <rect x="6" y="27" width="3" height="3" rx="1" fill="#facc15" />
          <rect x="97" y="27" width="2" height="3" rx="1" fill="#ef4444" />
        </svg>
      );
    }
    if (type === "suv") {
      return (
        <svg viewBox="0 0 105 52" className="w-18 h-10 drop-shadow-sm" aria-hidden="true">
          <path
            d="M 8 34 L 16 34 C 16 27, 26 27, 26 34 L 72 34 C 72 27, 82 27, 82 34 L 96 34 C 99 34, 100 31, 98 28 L 92 19 C 90 16, 87 14, 82 14 L 38 14 C 30 14, 22 19, 16 23 L 9 26 C 6 28, 6 34, 8 34 Z"
            fill="#578ebd"
          />
          <path d="M 39 16 L 53 16 L 53 24 L 26 24 C 29 19, 34 16, 39 16 Z" fill="#1e293b" />
          <path d="M 56 16 L 70 16 L 70 24 L 56 24 Z" fill="#1e293b" />
          <path d="M 73 16 L 82 16 C 85 16, 88 18, 90 22 L 73 24 Z" fill="#1e293b" />
          <rect x="36" y="12" width="46" height="2" rx="1" fill="#334155" />
          <circle cx="21" cy="34" r="7" fill="#0f172a" />
          <circle cx="21" cy="34" r="3.5" fill="#94a3b8" />
          <circle cx="77" cy="34" r="7" fill="#0f172a" />
          <circle cx="77" cy="34" r="3.5" fill="#94a3b8" />
          <rect x="6" y="28" width="3" height="3" rx="1" fill="#facc15" />
          <rect x="97" y="28" width="2" height="3" rx="1" fill="#ef4444" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 115 54" className="w-20 h-10 drop-shadow-sm" aria-hidden="true">
        <rect x="10" y="12" width="95" height="26" rx="6" fill="#4d82b4" />
        <rect x="15" y="16" width="16" height="11" rx="2" fill="#1e293b" />
        <rect x="34" y="16" width="16" height="11" rx="2" fill="#1e293b" />
        <rect x="53" y="16" width="16" height="11" rx="2" fill="#1e293b" />
        <rect x="72" y="16" width="16" height="11" rx="2" fill="#1e293b" />
        <rect x="91" y="16" width="10" height="14" rx="2" fill="#1e293b" />
        <circle cx="28" cy="38" r="7" fill="#0f172a" />
        <circle cx="28" cy="38" r="3.5" fill="#cbd5e1" />
        <circle cx="85" cy="38" r="7" fill="#0f172a" />
        <circle cx="85" cy="38" r="3.5" fill="#cbd5e1" />
        <rect x="103" y="30" width="3" height="4" rx="1" fill="#facc15" />
        <rect x="9" y="30" width="2" height="4" rx="1" fill="#ef4444" />
      </svg>
    );
  };

  /* --------------------------- Modal adapters ---------------------------- */
  const mappedCabForModal = selectedVehicle
    ? {
        id: selectedVehicle.id,
        name: selectedVehicle.name,
        category:
          selectedVehicle.category === "Suv"
            ? ("SUV" as const)
            : selectedVehicle.category === "Minibus"
            ? ("Tempo" as const)
            : selectedVehicle.category,
        image:
          selectedVehicle.category === "Sedan"
            ? "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
            : selectedVehicle.category === "Suv"
            ? "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
            : selectedVehicle.category === "Minibus"
            ? "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80"
            : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
        models: `${selectedVehicle.modelType} ${selectedVehicle.name}`,
        seats: selectedVehicle.seats,
        bags: selectedVehicle.seats > 6 ? 6 : 3,
        ac: selectedVehicle.ac,
        rating: 4.9,
        totalRatings: 1840,
        basePrice: selectedVehicle.originalPrice,
        discountedPrice: selectedVehicle.discountedPrice,
        perKmRate: 15.0,
        fuelType:
          selectedVehicle.fuelType === "Diesel" ? ("Diesel" as const) : ("CNG" as const),
        cancellationFreeHours: 6,
        features: [
          "Clean Sanitized Cab",
          "Police Verified Chauffeur",
          "AC Included",
          "Zero Surge Guarantee",
        ],
        tollIncluded: true,
        extraKmRate: 15.0,
      }
    : null;

  const currentModalSearchParams: SearchParams = {
    tripType: (tripType.toLowerCase().includes("round")
      ? "outstation-round"
      : "outstation-oneway") as any,
    fromCity,
    toCity,
    pickupDate: formatDisplayDate(pickupDateIso),
    pickupTime,
    returnDate: formatDisplayDate(dropDateIso),
    returnTime: dropTime,
    dropTime,
    hourlyPackage: "4 hrs 40 kms",
    airportMode: "to-airport",
    flightNumber: "",
  };

  /* ======================================================================== */
  /*                                  RENDER                                  */
  /* ======================================================================== */

  return (
    <main className="min-h-screen flex flex-col bg-[#f2f5f8] text-slate-800 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. NAVBAR */}
      <Navbar
        onMyBookingsClick={() => setIsMyBookingsOpen(true)}
        activeService="cabs"
        onSelectService={() => {}}
      />

      {/* ================================================================== */}
      {/* 2. SEARCH STRIP (White Theme)                                      */}
      {/* ================================================================== */}
      <section className="relative bg-white text-slate-800 border-b border-slate-200">
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-1.5">
          <div
            ref={searchStripRef}
            className="rounded-2xl lg:rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2 sm:p-1.5 grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-nowrap items-center w-full gap-1.5 lg:gap-0"
          >
            {/* 1. TRIP TYPE */}
            <div className="col-span-2 md:col-span-2 lg:flex-1 min-w-0 lg:min-w-[145px] bg-white lg:bg-transparent border border-slate-200 lg:border-0 lg:border-r border-slate-200 px-3.5 py-2 cursor-pointer group rounded-xl lg:rounded-lg hover:bg-white transition-colors relative">
              <FieldLabel>TRIP TYPE</FieldLabel>
              <div className="relative flex items-center justify-between gap-1 font-bold text-slate-900 text-xs sm:text-[13px] mt-0.5 group-hover:text-amber-600 transition">
                <span className="truncate">{tripType}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-500 shrink-0 pointer-events-none" />
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full bg-white text-slate-900"
                  aria-label="Trip type"
                >
                  {TRIP_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-white text-slate-900 font-medium py-1">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. FROM */}
            <div
              onClick={() => setOpenDropdown((prev) => (prev === "from" ? null : "from"))}
              className="col-span-1 lg:flex-1 min-w-0 lg:min-w-[110px] bg-white lg:bg-transparent border border-slate-200 lg:border-0 lg:border-r border-slate-200 px-3.5 py-2 rounded-xl lg:rounded-lg hover:bg-white transition-colors relative cursor-pointer"
            >
              <FieldLabel>FROM</FieldLabel>
              <div className="flex items-center justify-between font-bold text-slate-900 text-xs sm:text-[13px] mt-0.5 group-hover:text-amber-600 transition truncate">
                <span className="truncate">{fromCity || "Select City"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
              </div>
              {openDropdown === "from" && (
                <CitySearchPopover
                  title="Select Pickup Location"
                  placeholder="Search city, town, landmark across India..."
                  selected={fromCity}
                  align="left"
                  onSelect={(name, _st, coords) => {
                    setFromCity(name);
                    if (coords) setPickupCoords(coords);
                    else setPickupCoords(null);
                  }}
                  onClose={() => setOpenDropdown(null)}
                />
              )}
            </div>

            {/* 3. TO */}
            <div
              onClick={() => setOpenDropdown((prev) => (prev === "to" ? null : "to"))}
              className="col-span-1 lg:flex-1 min-w-0 lg:min-w-[110px] bg-white lg:bg-transparent border border-slate-200 lg:border-0 lg:border-r border-slate-200 px-3.5 py-2 rounded-xl lg:rounded-lg hover:bg-white transition-colors relative cursor-pointer"
            >
              <FieldLabel>TO</FieldLabel>
              <div className="flex items-center justify-between font-bold text-slate-900 text-xs sm:text-[13px] mt-0.5 group-hover:text-amber-600 transition truncate">
                <span className="truncate">{toCity || "Select City"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
              </div>
              {openDropdown === "to" && (
                <CitySearchPopover
                  title="Select Destination Location"
                  placeholder="Search destination city, town or place..."
                  selected={toCity}
                  align="left"
                  onSelect={(name, _st, coords) => {
                    setToCity(name);
                    if (coords) setDropCoords(coords);
                    else setDropCoords(null);
                  }}
                  onClose={() => setOpenDropdown(null)}
                />
              )}
            </div>

            {/* 4. ADD STOPS */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:shrink-0 px-3 py-1.5 lg:py-2 lg:border-r border-slate-200 flex items-center justify-center relative self-center">
              <span className="absolute -top-1 left-2.5 px-1.5 py-px rounded-full bg-pink-600 text-white text-[8px] font-black uppercase shadow-sm z-10">
                new
              </span>
              <button
                type="button"
                onClick={() => setShowAddStopModal((v) => !v)}
                className="px-2.5 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-700 font-bold text-[10px] hover:bg-amber-100 flex items-center gap-1 transition active:scale-95 whitespace-nowrap"
              >
                <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                <span>{viaStops.length > 0 ? `${viaStops.length} Stop${viaStops.length > 1 ? "s" : ""}` : "ADD STOPS"}</span>
              </button>

              {showAddStopModal && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 mt-2 w-64 bg-white text-slate-900 rounded-xl shadow-2xl ring-1 ring-slate-200/80 z-50 p-3.5 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900">Add Via Stops</span>
                    <button
                      type="button"
                      onClick={() => setShowAddStopModal(false)}
                      className="text-slate-400 hover:text-slate-600"
                      aria-label="Close"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <form onSubmit={handleAddStop} className="flex gap-1.5 mt-2.5">
                    <input
                      type="text"
                      value={newStopInput}
                      onChange={(e) => setNewStopInput(e.target.value)}
                      placeholder="e.g. Surat, Lonavala"
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 active:scale-95 transition"
                    >
                      Add
                    </button>
                  </form>

                  {viaStops.length > 0 && (
                    <div className="mt-2.5 space-y-1">
                      {viaStops.map((stop) => (
                        <div
                          key={stop}
                          className="flex items-center justify-between px-2 py-1 rounded bg-amber-50 border border-amber-200 text-slate-800 text-[11px]"
                        >
                          <span className="font-bold">{stop}</span>
                          <button
                            type="button"
                            onClick={() => removeStop(stop)}
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Remove ${stop}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 5. PICK-UP DATE */}
            <div className="col-span-1 lg:flex-1 min-w-0 lg:min-w-[125px] bg-white lg:bg-transparent border border-slate-200 lg:border-0 lg:border-r border-slate-200 px-3.5 py-2 cursor-pointer group rounded-xl lg:rounded-lg hover:bg-white transition-colors relative">
              <FieldLabel>PICK-UP DATE</FieldLabel>
              <div className="relative font-bold text-slate-900 text-xs sm:text-[13px] mt-0.5 group-hover:text-amber-600 transition truncate">
                <span>{formatDisplayDate(pickupDateIso)}</span>
                <input
                  type="date"
                  value={pickupDateIso}
                  onChange={(e) => {
                    setPickupDateIso(e.target.value);
                    if (dropDateIso < e.target.value) setDropDateIso(e.target.value);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  aria-label="Pick-up date"
                />
              </div>
            </div>

            {/* 6. DROP DATE */}
            <div className="col-span-1 lg:flex-1 min-w-0 lg:min-w-[125px] bg-white lg:bg-transparent border border-slate-200 lg:border-0 lg:border-r border-slate-200 px-3.5 py-2 cursor-pointer group rounded-xl lg:rounded-lg hover:bg-white transition-colors relative">
              <FieldLabel>DROP DATE</FieldLabel>
              <div className="relative font-bold text-slate-900 text-xs sm:text-[13px] mt-0.5 group-hover:text-amber-600 transition truncate">
                <span>{formatDisplayDate(dropDateIso)}</span>
                <input
                  type="date"
                  value={dropDateIso}
                  min={pickupDateIso}
                  onChange={(e) => setDropDateIso(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  aria-label="Drop date"
                />
              </div>
            </div>

            {/* 7. PICK-UP TIME */}
            <div className="col-span-1 lg:flex-1 min-w-0 lg:min-w-[120px] bg-white lg:bg-transparent border border-slate-200 lg:border-0 lg:border-r border-slate-200 px-3.5 py-2 cursor-pointer group rounded-xl lg:rounded-lg hover:bg-white transition-colors relative">
              <FieldLabel icon={<Clock className="w-2.5 h-2.5 text-amber-500" />}>
                PICK-UP TIME
              </FieldLabel>
              <div className="relative flex items-center justify-between gap-1 font-bold text-slate-900 text-xs sm:text-[13px] mt-0.5 group-hover:text-amber-600 transition">
                <span className="truncate">{pickupTime}</span>
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 opacity-80 group-hover:opacity-100" />
                <input
                  type="time"
                  value={format24Hour(pickupTime)}
                  onChange={(e) => {
                    if (e.target.value) setPickupTime(format12Hour(e.target.value));
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  aria-label="Pick-up time timer"
                />
              </div>
            </div>

            {/* 8. DROP TIME */}
            <div className="col-span-1 lg:flex-1 min-w-0 lg:min-w-[130px] bg-white lg:bg-transparent border border-slate-200 lg:border-0 px-3.5 py-2 cursor-pointer group rounded-xl lg:rounded-lg hover:bg-white transition-colors relative pr-2">
              <FieldLabel icon={<Clock className="w-2.5 h-2.5 text-amber-500" />}>
                DROP TIME
              </FieldLabel>
              <div className="relative flex items-center justify-between gap-1 font-bold text-slate-700 text-xs sm:text-[13px] mt-0.5 group-hover:text-amber-600 transition">
                <span className="truncate">{dropTime}</span>
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 opacity-80 group-hover:opacity-100" />
                <input
                  type="time"
                  value={format24Hour(dropTime)}
                  onChange={(e) => {
                    if (e.target.value) setDropTime(`till ${format12Hour(e.target.value)}`);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  aria-label="Drop time timer"
                />
              </div>
            </div>

            {/* 9. SEARCH */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:shrink-0 w-full lg:w-auto mt-1 lg:mt-0">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full lg:w-auto lg:ml-2 py-3 px-7 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 transition active:scale-95 border border-amber-300 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>SEARCH</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. BODY (Removed top padding to close gap)                         */}
      {/* ================================================================== */}
      <div
        ref={resultsRef}
        className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 pt-1 pb-6 flex flex-col md:flex-row items-start gap-4"
      >
        {/* ----------------------------- FILTERS ---------------------------- */}
        <aside className="w-full md:w-[250px] md:sticky md:top-4 bg-white rounded-xl border border-slate-200/90 shadow-sm p-3.5 sm:p-4 shrink-0 text-slate-800 self-start">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <h2 className="text-base font-bold text-slate-900">Filters</h2>
              {activeFilters.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black leading-none">
                  {activeFilters.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFilters.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-800"
                >
                  CLEAR ALL
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen((v) => !v)}
                aria-expanded={mobileFiltersOpen}
                aria-label="Toggle filters"
                className="md:hidden text-slate-400 hover:text-amber-500"
              >
                {mobileFiltersOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className={`${mobileFiltersOpen ? "block" : "hidden"} md:block`}>
            {/* Cab Type */}
            <FilterSection
              title="Cab Type"
              open={isCabTypeOpen}
              onToggle={() => setIsCabTypeOpen((v) => !v)}
              hasSelection={selectedCabTypes.length > 0}
              onClear={() => setSelectedCabTypes([])}
            >
              {CAB_TYPE_OPTIONS.map((label) => (
                <FilterRow
                  key={label}
                  label={label}
                  count={filterCounts.cab[label] ?? 0}
                  checked={selectedCabTypes.includes(label)}
                  onChange={() => toggleFilter(selectedCabTypes, setSelectedCabTypes, label)}
                />
              ))}
            </FilterSection>

            {/* Cab Model */}
            <FilterSection
              title="Cab Model"
              open={isModelOpen}
              onToggle={() => setIsModelOpen((v) => !v)}
              hasSelection={selectedModels.length > 0}
              onClear={() => setSelectedModels([])}
            >
              {modelOptions.map((label) => (
                <FilterRow
                  key={label}
                  label={label}
                  count={filterCounts.model[label] ?? 0}
                  checked={selectedModels.includes(label)}
                  onChange={() => toggleFilter(selectedModels, setSelectedModels, label)}
                />
              ))}
            </FilterSection>

            {/* Fuel Type */}
            <FilterSection
              title="Fuel Type"
              open={isFuelOpen}
              onToggle={() => setIsFuelOpen((v) => !v)}
              hasSelection={selectedFuelTypes.length > 0}
              onClear={() => setSelectedFuelTypes([])}
            >
              {FUEL_TYPE_OPTIONS.map((label) => (
                <FilterRow
                  key={label}
                  label={label}
                  count={filterCounts.fuel[label] ?? 0}
                  checked={selectedFuelTypes.includes(label)}
                  onChange={() => toggleFilter(selectedFuelTypes, setSelectedFuelTypes, label)}
                />
              ))}
            </FilterSection>
          </div>
        </aside>

        {/* ----------------------------- RESULTS ---------------------------- */}
        <div className="flex-1 w-full min-w-0 space-y-3">
          {/* Trust banner - Updated to match white theme */}
          <div className="relative overflow-hidden rounded-xl bg-amber-50/50 border border-amber-200/60 text-slate-800 px-4 sm:px-6 py-2.5 shadow-sm">
            <div className="pointer-events-none absolute -right-10 -top-12 w-44 h-44 rounded-full bg-amber-400/10 blur-2xl" />
            <div className="relative flex items-center justify-between gap-4">
              <div className="grid grid-cols-3 w-full max-w-2xl text-center text-[10px] sm:text-xs font-bold divide-x divide-amber-200/50">
                <div className="flex items-center justify-center gap-2 px-1">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-amber-100 ring-1 ring-amber-200 flex items-center justify-center text-amber-600">
                    <Shield className="w-3 h-3" />
                  </span>
                  <span className="leading-tight text-slate-700">Trusted Drivers</span>
                </div>
                <div className="flex items-center justify-center gap-2 px-1">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-amber-100 ring-1 ring-amber-200 flex items-center justify-center text-amber-600">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="leading-tight text-slate-700">Clean Cabs</span>
                </div>
                <div className="flex items-center justify-center gap-2 px-1">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-amber-100 ring-1 ring-amber-200 flex items-center justify-center text-amber-600">
                    <Clock className="w-3 h-3" />
                  </span>
                  <span className="leading-tight text-slate-700">On-Time Pickup</span>
                </div>
              </div>
              <Info className="hidden sm:block w-4 h-4 text-amber-500/80 shrink-0" />
            </div>
          </div>

          {/* Route summary + active filter chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xs text-slate-800 font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{fromCity} → {toCity}</span>
              </p>
              <span className="text-slate-300">•</span>
              <p className="text-xs text-slate-600 font-medium">
                {routeMeta.hasDistance ? (
                  <>
                    <strong className="text-slate-900 font-extrabold">{routeMeta.kms.toLocaleString("en-IN")} km</strong> road distance
                    {tripType.toLowerCase().includes("round") ? " (Round-Trip)" : " (One-Way)"}
                    {" • "}
                    <span className="font-bold text-slate-800">{routeMeta.hours} hr(s) approx time</span>
                  </>
                ) : (
                  <span>Rates as per included kilometers</span>
                )}
              </p>
              {isCalculatingPrices && (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  Calculating live route &amp; fares...
                </span>
              )}
            </div>

            {viaStops.length > 0 && (
              <div className="text-[11px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Via: {viaStops.join(" → ")}
              </div>
            )}
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {activeFilters.map((chip) => (
                <button
                  key={`${chip.group}-${chip.value}`}
                  type="button"
                  onClick={() => removeFilterChip(chip)}
                  className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:border-amber-300 hover:text-amber-700 transition"
                >
                  <span>{chip.value}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-amber-600 hover:underline px-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Vehicle cards / empty state */}
          <div className="space-y-3">
            {filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200/90 p-10 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 ring-1 ring-amber-200 flex items-center justify-center text-amber-500">
                  <Info className="w-6 h-6" />
                </div>
                <p className="mt-3 text-sm font-black text-slate-900">No cabs match your filters</p>
                <p className="text-xs text-slate-500 mt-1">
                  Remove a filter to see more available cabs.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-4 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-amber-300 transition active:scale-95"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredVehicles.map((cab) => (
                <article
                  key={cab.id}
                  className="group bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_-12px_rgba(15,23,42,0.25)] hover:border-amber-300 transition-all duration-200 overflow-hidden"
                >
                  <div className="p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4">
                    {/* Identity + specs */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-24 sm:w-28 h-20 shrink-0 rounded-lg bg-gradient-to-br from-amber-50 via-amber-100/60 to-yellow-100/80 ring-1 ring-amber-200/80 flex flex-col items-center justify-center p-1.5 group-hover:scale-[1.02] transition-transform duration-200">
                        {renderVehicleIllustration(cab.imageType)}
                        <span
                          className={`mt-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider text-white ${
                            cab.fuelType === "Diesel" ? "bg-[#b4691e]" : "bg-[#057672]"
                          }`}
                        >
                          {cab.fuelLabel}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[15px] sm:text-base font-bold text-slate-900 leading-tight">
                            {cab.name}
                          </h3>
                          {cab.modelBadgeText && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[9px] font-black leading-none shadow-sm uppercase border border-amber-300">
                              {cab.modelBadgeText}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-500 mt-0.5">{cab.modelType}</p>

                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[11px] text-slate-600 font-medium">
                            {cab.ac ? "AC" : "Non-AC"} • {cab.seats} Seats
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                          {cab.includedKms.toLocaleString("en-IN")} kms included
                        </div>
                        {cab.extraKmRate && (
                          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                            Extra fare: ₹{cab.extraKmRate}/km
                          </div>
                        )}
                        {cab.advanceAmount != null && cab.advanceAmount > 0 && (
                          <div className="text-[10px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                            Pay ₹{cab.advanceAmount.toLocaleString("en-IN")} advance now
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex flex-col items-start sm:items-end justify-center shrink-0 lg:pl-4 text-left sm:text-right mt-1 sm:mt-0">
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Base Fare
                      </div>

                      {/* Base Price (Enlarged & Highlighted) */}
                      <div className="text-3xl sm:text-[34px] font-black text-slate-950 leading-none tracking-tight">
                        {inr(cab.discountedPrice)}
                      </div>

                      {/* GST & Gateway Fee Notice */}
                      <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-1 mb-2.5">
                        +5% GST &amp; 2% Gateway Charges
                      </div>

                      {/* SELECT CAB button in signature BroomBoom Yellow */}
                      <button
                        type="button"
                        onClick={() => handleSelectCabClick(cab)}
                        className="w-full sm:w-44 py-2.5 px-6 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-400/20 border border-amber-300 text-center cursor-pointer whitespace-nowrap"
                      >
                        SELECT CAB
                      </button>
                    </div>
                  </div>

                  {cab.roofCarrierFee && (
                    <div className="bg-[#fffdf5] border-t border-amber-100/80 px-3 sm:px-4 py-1.5 text-[11px] text-slate-700 flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>
                        Add Roof Carrier to fit 4 more bags @ {inr(cab.roofCarrierFee)}
                      </span>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>

          {/* Promo */}
          <div className="relative overflow-hidden bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="min-w-0">
              <div className="text-sm font-black text-slate-900">Get Up to Rs. 1000 Off</div>
              <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 flex-wrap">
                <span>Use coupon code:</span>
                <span className="font-mono font-black text-amber-800 bg-white px-2 py-0.5 rounded-md border border-dashed border-amber-300">
                  BROOMDELIGHT
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Limited Time BroomBoom Offer!</div>
            </div>

            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm border border-amber-300 shrink-0">
              %
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 4. TRIP ASSISTANT                                                  */}
      {/* ================================================================== */}
      <aside aria-label="Trip Assistant" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => alert("Trip Assistant is ready to help you plan your journey!")}
          className="flex items-center gap-2.5 bg-white text-slate-800 pl-2 pr-4 py-1.5 rounded-full shadow-lg ring-1 ring-amber-300 hover:shadow-xl hover:ring-amber-400 transition active:scale-95"
        >
          <span className="w-8 h-8 rounded-full overflow-hidden bg-amber-400 p-0.5 flex items-center justify-center shadow-sm shrink-0">
            <img src="/logo.png" alt="BroomBoom Assistant" className="w-full h-full object-contain rounded-full" />
          </span>
          <span className="text-xs font-black text-slate-800">Trip assistant</span>
        </button>
      </aside>

      {/* ================================================================== */}
      {/* 5. MODALS                                                          */}
      {/* ================================================================== */}
      <BookingModal
        cab={mappedCabForModal}
        searchParams={currentModalSearchParams}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        appliedPromo="BROOMDELIGHT"
      />

      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />
    </main>
  );
};

/* -------------------------------------------------------------------------- */
/*                        SUSPENSE BOUNDARY WRAPPER                           */
/* -------------------------------------------------------------------------- */

const FleetPageFallback: React.FC = () => (
  <main className="min-h-screen bg-[#f2f5f8] flex items-center justify-center">
    <div
      className="w-8 h-8 rounded-full border-4 border-amber-400 border-t-transparent animate-spin"
      role="status"
      aria-label="Loading fleet"
    />
  </main>
);

export const FleetClientPage: React.FC = () => (
  <Suspense fallback={<FleetPageFallback />}>
    <FleetPageContent />
  </Suspense>
);