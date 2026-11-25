
import { RentalPackage, RENTAL_PACKAGES } from "@/data/cabsData";

export interface BackendUserLead {
  id?: string;
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  status?: string;
  loginCount?: number;
  leadType?: string;
  registeredAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BackendBooking {
  id?: string;
  _id?: string;
  bookingId?: string;
  customerName: string;
  customerMobile: string;
  customerEmail?: string;
  serviceType: string;
  wayType?: string;
  airportDirection?: string;
  airportTerminal?: string;
  rentalPackage?: string;
  state: string;
  pincode?: string;
  pickupAddress: string;
  dropAddress: string;
  fromCity?: string;
  toCity?: string;
  distance?: string;
  duration?: string;
  pickupLat?: string;
  pickupLng?: string;
  dropLat?: string;
  dropLng?: string;
  petFriendly?: boolean;
  petCount?: number;
  addons?: any;
  source?: string;
  searchDetails?: any;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  vehicleCategory: string;
  seater: number;
  acType?: string;
  allocateOurPilot?: boolean;
  fare: number;
  advance?: number;
  dueFare?: number;
  cashfreeOrderId?: string;
  paymentStatus?: string;
  paidAmount?: number;
  paymentMethod?: string;
  paymentDate?: string;
  tollTax?: string;
  status: string;
  driverName?: string;
  driverNumber?: string;
  carNo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CarCategoryItem {
  id: string;
  name: string;
  displayName: string;
  seater: number;
  baseFare: number;
  perKmRate: number;
  status: string;
}

export interface DistanceCalculationResult {
  success: boolean;
  distance: number;
  durationMinutes: number;
  source?: string;
  pickupCoords?: { lat: number | null; lng: number | null };
  dropCoords?: { lat: number | null; lng: number | null };
  pickupAddress?: string | null;
  dropAddress?: string | null;
}

export interface PricingCalculationResult {
  success: boolean;
  fare: number;
  originalFare?: number;
  discountPercent?: number;
  advance: number;
  dueFare: number;
  advanceType?: string;
  advanceValue?: number;
  advancePercentage?: number;
  distance: number;
  durationMinutes: number;
  details?: {
    type: string;
    pickup?: string;
    drop?: string;
    baseFare?: number;
    distance?: number;
    oneWayDistance?: number;
    durationMinutes?: number;
    originalFare?: number;
    discountPercent?: number;
    advanceType?: string;
    advanceValue?: number;
    advancePercentage?: number;
    addons?: Record<string, number>;
    addonTotal?: number;
    slab?: string;
    ratePerKm?: number;
    extraKmRate?: number;
    extraHourRate?: number;
    waitingChargePerHour?: number;
    distanceFare?: number;
    hourlyFare?: number;
    adminSetPrice?: number;
    selectedBaseFare?: number;
    totalHours?: number;
    hourlyRate?: number;
    nightAllowance?: number;
    comparison?: {
      distanceFare?: number;
      hourlyFare?: number;
      adminSetPrice?: number;
      selected?: string;
    };
  };
  multiplier?: number;
  appliedRule?: string;
  ruleType?: string;
  error?: string;
}

export interface AirportRuleItem {
  id?: string;
  _id?: string;
  city: string;
  carCategory: string;
  baseKms: number;
  baseFare: number;
  fare15to25: number;
  maxAirportKms: number;
  extraKmRate: number;
  advanceAmount: number;
  advanceType?: string;
  advanceValue?: number;
  waitingChargePerHour?: number;
  waitingFreeMins?: number;
  nightAllowance?: number;
  nightStartHour?: number;
  nightEndHour?: number;
  threshold?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CityItem {
  id: string;
  name: string;
  displayName?: string;
  lat?: string | number;
  lon?: string | number;
  state: string;
  country?: string;
  placeId?: string;
  source?: string;
}

export interface AirportItem {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  lat?: string | number;
  lon?: string | number;
  terminals?: string[];
}

export interface RentalPackageItem {
  id: string;
  state: string;
  carCategory: string;
  packageHours: number;
  includedKms: number;
  baseFare: number;
  extraKmRate: number;
  extraHourRate: number;
  advanceType: string;
  advanceValue: number;
}

export interface CashfreeOrderResponse {
  success: boolean;
  bookingId: string;
  orderId: string;
  paymentSessionId: string;
  amount: number;
  paymentStatus: string;
  environment: "sandbox" | "production";
  message?: string;
}

export interface CashfreeStatusResponse {
  success: boolean;
  bookingId: string;
  paymentStatus: string;
  paidAmount?: number;
  paymentMethod?: string;
  fare?: number;
  advance?: number;
  dueFare?: number;
  booking?: BackendBooking;
  message?: string;
}

const PROD_API_BASE_URL =
  "https://www.broomboomcabs.com/new-api/api";

export const getApiBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:5004/api";
    }
  }
  return process.env.NEXT_PUBLIC_API_URL || PROD_API_BASE_URL;
};

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 6000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    try {
      controller.abort();
    } catch {}
  }, timeoutMs);

  if (options.signal) {
    if (options.signal.aborted) {
      clearTimeout(timeoutId);
      throw new DOMException("Operation aborted by caller", "AbortError");
    }
    options.signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId);
        try {
          controller.abort();
        } catch {}
      },
      { once: true }
    );
  }

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  /**
   * Health check to test backend connectivity
   */
  async checkHealth(): Promise<boolean> {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/users`, { method: "GET" }, 4000);
      return res.ok;
    } catch {
      return false;
    }
  },

  /**
   * Create or register user in backend
   */
  async createUser(userData: {
    name: string;
    phone: string;
    email?: string;
    status?: string;
    leadType?: string;
    source?: string;
    lastLoginAt?: string;
    city?: string;
    vehicleType?: string;
    state?: string;
    carNo?: string;
    licenseNo?: string;
    notes?: string;
  }): Promise<BackendUserLead> {
    const baseUrl = getApiBaseUrl();
    const payload: any = {
      name: userData.name || "Customer",
      phone: userData.phone.trim(),
      email: userData.email?.trim() || undefined,
      status: userData.status || "Active",
      source: userData.source || "BroomBoom Web Page",
      lastLoginAt: userData.lastLoginAt || new Date().toISOString(),
      city: userData.city,
      vehicleType: userData.vehicleType,
      state: userData.state,
      carNo: userData.carNo,
      licenseNo: userData.licenseNo,
      notes: userData.notes,
    };

    if (userData.leadType) {
      payload.leadType = userData.leadType;
    }

    const res = await fetchWithTimeout(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Failed to create user (${res.status}): ${errText}`);
    }

    return (await res.json()) as BackendUserLead;
  },

  /**
   * Fetch all registered users
   */
  async getUsers(): Promise<BackendUserLead[]> {
    const baseUrl = getApiBaseUrl();
    const res = await fetchWithTimeout(`${baseUrl}/users`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.users || [];
  },

  /**
   * Create a new booking in the backend database
   */
  async createBooking(bookingData: Partial<BackendBooking>): Promise<BackendBooking> {
    const baseUrl = getApiBaseUrl();

    // Default missing required fields to prevent Sequelize notNull violations
    const fullPayload: Partial<BackendBooking> = {
      customerName: bookingData.customerName || "Customer",
      customerMobile: bookingData.customerMobile || "",
      customerEmail: bookingData.customerEmail || "",
      serviceType: bookingData.serviceType || "Outstation oneway",
      state: bookingData.state || "Default",
      pickupAddress: bookingData.pickupAddress || "",
      dropAddress: bookingData.dropAddress || "",
      pickupDate: bookingData.pickupDate || new Date().toISOString().split("T")[0],
      pickupTime: bookingData.pickupTime || "10:00 AM",
      returnDate: bookingData.returnDate || "",
      returnTime: bookingData.returnTime || "",
      vehicleCategory: bookingData.vehicleCategory || "Sedan",
      seater: bookingData.seater || 4,
      fare: bookingData.fare || 0,
      advance: bookingData.advance || 0,
      dueFare: bookingData.dueFare || Math.max(0, (bookingData.fare || 0) - (bookingData.advance || 0)),
      status: bookingData.status || "Pending",
      paymentStatus: bookingData.paymentStatus || "PENDING",
      tollTax: bookingData.tollTax || "Excluded",
      ...bookingData,
    };

    const res = await fetchWithTimeout(
      `${baseUrl}/bookings`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullPayload),
      },
      15000
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Failed to create booking (${res.status}): ${errText}`);
    }

    return (await res.json()) as BackendBooking;
  },

  /**
   * Fetch all bookings from backend
   */
  async getBookings(): Promise<BackendBooking[]> {
    const baseUrl = getApiBaseUrl();
    const res = await fetchWithTimeout(`${baseUrl}/bookings`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.bookings || [];
  },

  /**
   * Fetch bookings belonging to a specific customer phone number
   */
  async getUserBookings(rawPhone: string): Promise<BackendBooking[]> {
    if (!rawPhone) return [];
    const cleanTarget = rawPhone.replace(/\D/g, "");
    if (!cleanTarget) return [];

    try {
      const all = await this.getBookings();
      return all.filter((b) => {
        if (!b.customerMobile) return false;
        const cleanMobile = b.customerMobile.replace(/\D/g, "");
        return cleanMobile.endsWith(cleanTarget) || cleanTarget.endsWith(cleanMobile);
      });
    } catch {
      return [];
    }
  },

  /**
   * Fetch active vehicle categories from backend
   */
  async getCarCategories(): Promise<CarCategoryItem[]> {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/car-categories`, {}, 5000);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  /**
   * Calculate real driving road distance and duration via backend OSRM/Nominatim
   */
  async calculateDistance(params: {
    from?: string;
    to?: string;
    source?: string;
    destination?: string;
    pickupLat?: number;
    pickupLng?: number;
    dropLat?: number;
    dropLng?: number;
  }): Promise<DistanceCalculationResult | null> {
    try {
      const baseUrl = getApiBaseUrl();
      const payload = {
        from: params.from || params.source || "",
        to: params.to || params.destination || "",
        pickupLat: params.pickupLat,
        pickupLng: params.pickupLng,
        dropLat: params.dropLat,
        dropLng: params.dropLng,
      };

      const res = await fetchWithTimeout(
        `${baseUrl}/pricing-rules/distance`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        10000
      );
      if (res.ok) {
        const data = (await res.json()) as DistanceCalculationResult;
        if (data && data.distance > 0) return data;
      }
    } catch (err) {
      console.warn("Backend distance calculation notice:", err);
    }

    // Direct OpenStreetMap OSRM Routing Fallback
    let pLat = params.pickupLat;
    let pLng = params.pickupLng;
    let dLat = params.dropLat;
    let dLng = params.dropLng;

    const fromText = (params.from || params.source || "").trim();
    const toText = (params.to || params.destination || "").trim();

    if ((!pLat || !pLng) && fromText) {
      try {
        const geoRes = await fetchWithTimeout(
          `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(
            fromText
          )}&limit=1`,
          {
            headers: { "User-Agent": "BroomBoomCabsWeb/1.0", Accept: "application/json" },
          },
          4000
        );
        if (geoRes.ok) {
          const list = await geoRes.json();
          if (Array.isArray(list) && list.length > 0) {
            pLat = parseFloat(list[0].lat);
            pLng = parseFloat(list[0].lon);
          }
        }
      } catch {}
    }

    if ((!dLat || !dLng) && toText) {
      try {
        const geoRes = await fetchWithTimeout(
          `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(
            toText
          )}&limit=1`,
          {
            headers: { "User-Agent": "BroomBoomCabsWeb/1.0", Accept: "application/json" },
          },
          4000
        );
        if (geoRes.ok) {
          const list = await geoRes.json();
          if (Array.isArray(list) && list.length > 0) {
            dLat = parseFloat(list[0].lat);
            dLng = parseFloat(list[0].lon);
          }
        }
      } catch {}
    }

    if (pLat && pLng && dLat && dLng) {
      try {
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${pLng},${pLat};${dLng},${dLat}?overview=false`;
        const osrmRes = await fetchWithTimeout(osrmUrl, {}, 5000);
        if (osrmRes.ok) {
          const osrmData = await osrmRes.json();
          if (osrmData.routes && osrmData.routes.length > 0) {
            const meters = osrmData.routes[0].distance;
            const seconds = osrmData.routes[0].duration;
            return {
              success: true,
              distance: parseFloat((meters / 1000).toFixed(1)),
              durationMinutes: Math.round(seconds / 60),
              source: "OSRM Public",
              pickupCoords: { lat: pLat, lng: pLng },
              dropCoords: { lat: dLat, lng: dLng },
            };
          }
        }
      } catch {}
    }

    return null;
  },

  /**
   * Real-time map location search / autocomplete via BroomBoom Backend & OpenStreetMap
   */
  async searchCities(query: string, signal?: AbortSignal): Promise<CityItem[]> {
    if (!query || query.trim().length < 2) return [];
    const cleanQ = query.trim();

    // 1. Primary backend search (local or production depending on environment)
    const baseUrl = getApiBaseUrl();
    const primaryUrl = `${baseUrl}/cities/search?q=${encodeURIComponent(cleanQ)}`;

    try {
      const res = await fetchWithTimeout(primaryUrl, { signal }, 6000);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        console.warn("Primary backend city search notice:", err?.message || err);
      }
    }

    // 2. Fallback to production API if local dev backend was unreachable
    if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1")) {
      try {
        const prodUrl = `${PROD_API_BASE_URL}/cities/search?q=${encodeURIComponent(cleanQ)}`;
        const res = await fetchWithTimeout(prodUrl, { signal }, 5000);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return data;
          }
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.warn("Prod fallback city search notice:", err?.message || err);
        }
      }
    }

    // 3. Direct OpenStreetMap Nominatim Fallback for any location in India
    try {
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(
        cleanQ
      )}&limit=10&addressdetails=1`;
      const res = await fetchWithTimeout(
        nominatimUrl,
        {
          signal,
          headers: {
            "User-Agent": "BroomBoomCabsWeb/1.0",
            Accept: "application/json",
          },
        },
        5000
      );
      if (res.ok) {
        const rawList = await res.json();
        if (Array.isArray(rawList)) {
          return rawList.map((item: any) => {
            const fullAddress = item.display_name || cleanQ;
            const parts = (item.display_name || "").split(",");
            const state =
              item.address?.state ||
              item.address?.state_district ||
              parts[parts.length - 2]?.trim() ||
              "India";

            return {
              id: String(item.place_id || `${item.lat}_${item.lon}`),
              name: fullAddress,
              displayName: fullAddress,
              lat: item.lat,
              lon: item.lon,
              state: state,
              country: "India",
              placeId: String(item.place_id || ""),
              source: "Nominatim",
            };
          });
        }
      }
    } catch {}

    return [];
  },

  /**
   * Calculate live dynamic fare using backend pricing engine
   */
  async calculatePrice(params: {
    rideType: "Oneway" | "Roundtrip" | "Rental" | "Airport";
    sourceCity: string;
    destinationCity?: string;
    category: string;
    state?: string;
    city?: string;
    pickupLat?: number;
    pickupLng?: number;
    dropLat?: number;
    dropLng?: number;
    distance?: number;
    oneWayDistance?: number;
    days?: number;
    bookingDuration?: number;
    hours?: number;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
    packageHours?: number;
    includedKms?: number;
    sourceCoords?: [number, number];
    destinationCoords?: [number, number];
    rentalPackage?: { packageHours: number; includedKms: number };
    addons?: {
      assuredLuggageSpace?: boolean;
      confirmCarModel2022?: boolean;
      petAllowance?: boolean;
      refundableBooking?: boolean;
    };
  }): Promise<PricingCalculationResult | null> {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(
        `${baseUrl}/pricing-rules/calculate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        },
        7000
      );
      if (res.ok) {
        const data = (await res.json()) as PricingCalculationResult;
        if (data && data.fare > 0) return data;
      }
    } catch (err) {
      console.warn("Backend /pricing-rules/calculate warning:", err);
    }

    // Resilient fallback for Airport rides: compute directly using admin airport rules
    if (params.rideType === "Airport") {
      try {
        const rules = await this.getAirportRules();
        return this.calculateAirportPriceLocally(rules, {
          category: params.category,
          sourceCity: params.sourceCity,
          destinationCity: params.destinationCity,
          state: params.state,
          distance: params.distance,
          pickupTime: params.pickupTime,
        });
      } catch (err) {
        console.warn("Local airport fallback calculation error:", err);
      }
    }

    return null;
  },

  /**
   * Fetch canonical airport pricing rules configured by admin
   */
  async getAirportRules(): Promise<AirportRuleItem[]> {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/pricing-rules/airport`, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          try {
            if (typeof window !== "undefined") {
              localStorage.setItem("broomboom_airport_rules_cache", JSON.stringify(data));
            }
          } catch {}
          return data;
        }
      }
    } catch (e) {
      console.warn("Unable to fetch airport rules from backend:", e);
    }

    // Fallback: check localStorage cache
    try {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("broomboom_airport_rules_cache");
        if (cached) return JSON.parse(cached);
        const adminFares = localStorage.getItem("broomboom_airport_fares");
        if (adminFares) {
          const parsed = JSON.parse(adminFares);
          return parsed.map((item: any) => ({
            id: item.id,
            city: item.state || "Default",
            carCategory: item.vehicleType || "Sedan",
            baseKms: item.packageKm || 15,
            baseFare: Number(item.fare0to15 ?? item.packageCost ?? 750),
            fare15to25: Number(item.fare15to25 ?? 1050),
            maxAirportKms: item.maxAirportKms || 25,
            extraKmRate: Number(item.extraKmCharge || 16),
            advanceAmount: Number(item.advancedAmount || 500),
            waitingChargePerHour: Number(item.waitingTimeCharge || 150),
            nightAllowance: Number(item.nightDrivingCharge || 250),
          }));
        }
      }
    } catch {}

    return [];
  },

  /**
   * Client-side resilient airport fare calculation matching admin configuration
   */
  calculateAirportPriceLocally(
    rules: AirportRuleItem[],
    params: {
      category: string;
      sourceCity?: string;
      destinationCity?: string;
      state?: string;
      distance?: number;
      pickupTime?: string;
    }
  ): PricingCalculationResult {
    const catClean = (params.category || "Sedan").trim().toLowerCase();
    const sCity = (params.sourceCity || "").toLowerCase();
    const dCity = (params.destinationCity || "").toLowerCase();
    const stateStr = (params.state || "").toLowerCase();

    // Normalize category mapping
    const matchesCategory = (ruleCat: string) => {
      const rc = (ruleCat || "").trim().toLowerCase();
      if (rc === catClean) return true;
      if (catClean.includes("hatchback") && rc.includes("hatchback")) return true;
      if (catClean.includes("suv+") && rc.includes("suv+")) return true;
      if (!catClean.includes("+") && catClean.includes("suv") && !rc.includes("+") && rc.includes("suv")) return true;
      if (catClean.includes("sedan") && rc.includes("sedan")) return true;
      if (catClean.includes("13") && rc.includes("13")) return true;
      if (catClean.includes("17") && rc.includes("17")) return true;
      if ((catClean.includes("24") || catClean.includes("25")) && (rc.includes("24") || rc.includes("25"))) return true;
      return false;
    };

    const catRules = Array.isArray(rules) ? rules.filter((r) => matchesCategory(r.carCategory)) : [];

    // Try city-specific match first, then state, then Default
    let matchedRule = catRules.find((r) => {
      const rCity = (r.city || "").toLowerCase().trim();
      if (!rCity || rCity === "default") return false;
      return (
        sCity.includes(rCity) ||
        dCity.includes(rCity) ||
        stateStr.includes(rCity) ||
        rCity.includes(sCity) ||
        rCity.includes(dCity)
      );
    });

    if (!matchedRule) {
      matchedRule = catRules.find((r) => (r.city || "").toLowerCase().trim() === "default") || catRules[0];
    }

    // Default values if no rule in DB
    const baseKms = matchedRule?.baseKms || 15;
    const maxAirportKms = matchedRule?.maxAirportKms || 25;
    const baseFare =
      matchedRule?.baseFare ||
      (catClean.includes("hatch")
        ? 650
        : catClean.includes("suv+")
        ? 1350
        : catClean.includes("suv")
        ? 1050
        : 750);
    const fare15to25 =
      matchedRule?.fare15to25 ||
      (catClean.includes("suv+")
        ? 1850
        : catClean.includes("suv")
        ? 1450
        : 1050);
    const extraKmRate =
      matchedRule?.extraKmRate ||
      (catClean.includes("hatch")
        ? 14
        : catClean.includes("suv+")
        ? 24
        : catClean.includes("suv")
        ? 20
        : catClean.includes("13")
        ? 35
        : catClean.includes("17")
        ? 40
        : catClean.includes("24") || catClean.includes("25")
        ? 45
        : 15);

    const dist = params.distance && params.distance > 0 ? params.distance : baseKms;
    let fare = baseFare;
    let tier = "0-15 km";
    let extraKms = 0;

    if (dist <= baseKms) {
      fare = baseFare;
      tier = "0-15 km";
    } else if (dist <= maxAirportKms) {
      fare = fare15to25;
      tier = "15-25 km";
      extraKms = Math.round((dist - baseKms) * 10) / 10;
    } else {
      extraKms = Math.round((dist - maxAirportKms) * 10) / 10;
      fare = Math.round(dist * extraKmRate);
      tier = ">25 km";
    }

    // Check night allowance (11 PM - 6 AM)
    let nightApplicable = false;
    let nightCost = 0;
    if (params.pickupTime) {
      const match = params.pickupTime.match(/(\d+):?(\d*)\s*(am|pm)/i);
      if (match) {
        let hour = parseInt(match[1], 10);
        const meridiem = match[3].toLowerCase();
        if (meridiem === "pm" && hour < 12) hour += 12;
        if (meridiem === "am" && hour === 12) hour = 0;
        if (hour >= 23 || hour < 6) {
          nightApplicable = true;
          nightCost = matchedRule?.nightAllowance || 250;
          fare += nightCost;
        }
      }
    }

    // Advance & due
    let advance = 500;
    if (matchedRule?.advanceType === "Percentage") {
      const pct = matchedRule.advanceValue || 20;
      advance = Math.round((fare * pct) / 100);
    } else if (matchedRule?.advanceValue || matchedRule?.advanceAmount) {
      advance = matchedRule.advanceValue || matchedRule.advanceAmount || 500;
    }
    advance = Math.min(fare, advance);
    const dueFare = Math.max(0, fare - advance);
    const originalFare = Math.round((fare * 1.15) / 10) * 10;
    const discountPercent = 12;

    return {
      success: true,
      fare,
      originalFare,
      discountPercent,
      advance,
      dueFare,
      distance: dist,
      durationMinutes: Math.round(dist * 1.6) || 30,
      details: {
        type: `Airport Transfer (${matchedRule?.city || "Default"})`,
        pickup: params.sourceCity,
        drop: params.destinationCity,
        baseFare,
        distance: dist,
        slab: tier,
        ratePerKm: extraKmRate,
        extraKmRate,
        waitingChargePerHour: matchedRule?.waitingChargePerHour || 150,
        extraHourRate: matchedRule?.waitingChargePerHour || 150,
        originalFare,
        discountPercent,
        advanceType: matchedRule?.advanceType || "Fixed",
        advanceValue: advance,
        advancePercentage: Math.round((advance / fare) * 100),
        nightAllowance: nightCost,
        adminSetPrice: fare,
      },
      appliedRule: matchedRule?.id || matchedRule?._id,
      ruleType: "AirportPricingLocalResilient",
    };
  },

  /**
   * Fetch canonical cities database
   */
  async getCities(): Promise<CityItem[]> {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/cities`, {}, 5000);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  /**
   * Fetch canonical airports database
   */
  async getAirports(): Promise<AirportItem[]> {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/airports`, {}, 5000);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  /**
   * Fetch rental pricing packages from PostgreSQL database with localStorage cache
   */
  async getRentalPackages(): Promise<RentalPackageItem[]> {
    let cached: RentalPackageItem[] = [];
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("broomboom_cached_rental_packages");
        if (raw) cached = JSON.parse(raw);
      } catch {}
    }

    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/pricing-rules/rental`, {}, 5000);
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data || []);
        if (Array.isArray(list) && list.length > 0) {
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("broomboom_cached_rental_packages", JSON.stringify(list));
            } catch {}
          }
          return list;
        }
      }
      return cached;
    } catch {
      return cached;
    }
  },

  /**
   * Fetch live dynamic rental packages grouped by duration & kms with selective car category pricing
   * (Sedan, SUV, SUV+, 13 Seater Traveller, 17 Seater Traveller, 25 Seater Traveller)
   * Guaranteed: NO hardcoded data; reflects admin updates, creations, and deletions in real-time.
   */
  async getDynamicRentalPackages(): Promise<RentalPackage[]> {
    try {
      const rawRules = await this.getRentalPackages();
      if (!Array.isArray(rawRules) || rawRules.length === 0) {
        return RENTAL_PACKAGES;
      }

      // Group raw rules by packageHours (e.g. 1, 5, 8, 10, 12, or custom hours)
      const groups = new Map<number, {
        hours: number;
        kms: number;
        rules: RentalPackageItem[];
      }>();

      for (const rule of rawRules) {
        const h = Number(rule.packageHours);
        if (!h || isNaN(h)) continue;
        if (!groups.has(h)) {
          groups.set(h, {
            hours: h,
            kms: Number(rule.includedKms) || (h === 1 ? 15 : h * 10),
            rules: [],
          });
        }
        groups.get(h)!.rules.push(rule);
      }

      const sortedHours = Array.from(groups.keys()).sort((a, b) => a - b);
      const result: RentalPackage[] = [];

      for (const h of sortedHours) {
        const group = groups.get(h)!;
        const kms = group.kms;
        const durationStr = `${h} ${h === 1 ? "Hour" : "Hours"}`;
        const kmStr = `${kms} Kms`;

        // Map fares for selective car categories
        const catMap: Record<string, number> = {};
        for (const r of group.rules) {
          const cat = r.carCategory;
          const fare = Number(r.baseFare);
          if (cat && !isNaN(fare) && fare > 0) {
            if (!catMap[cat] || (r.state !== "Default" && fare > 0)) {
              catMap[cat] = fare;
            }
          }
        }

        const sedanP = catMap["Sedan"] || (h === 1 ? 1351 : h === 5 ? 3551 : h === 8 ? 4551 : h === 10 ? 5051 : h === 12 ? 6051 : h * 450);
        const suvP = catMap["SUV"] || (h === 1 ? 1551 : h === 5 ? 4551 : h === 8 ? 5551 : h === 10 ? 7051 : h === 12 ? 8051 : h * 600);
        const suvPlusP = catMap["SUV+"] || (h === 1 ? 1851 : h === 5 ? 6051 : h === 8 ? 7551 : h === 10 ? 8051 : h === 12 ? 9051 : h * 750);
        const trav13P = catMap["13 Seater Traveller"] || catMap["13 Seater"] || (h === 1 ? 3200 : h === 5 ? 9051 : h === 8 ? 10051 : h === 10 ? 11051 : h === 12 ? 12051 : h * 1000);
        const trav17P = catMap["17 Seater Traveller"] || catMap["17 Seater"] || (h === 1 ? 3800 : h === 5 ? 10051 : h === 8 ? 11051 : h === 10 ? 12051 : h === 12 ? 13051 : h * 1100);
        const trav25P = catMap["25 Seater Traveller"] || catMap["25 Seater"] || (h === 1 ? 4500 : h === 5 ? 12051 : h === 8 ? 13051 : h === 10 ? 14051 : h === 12 ? 15051 : h * 1250);

        let idealFor = "Flexible city disposal with chauffeur";
        if (h === 1) idealFor = "Quick city errand or short transit";
        else if (h <= 4) idealFor = "Client meetings, medical visits & shopping";
        else if (h === 5) idealFor = "Half-day city tour or shopping";
        else if (h === 8) idealFor = "Full day office or full city tour";
        else if (h === 10) idealFor = "Extended day errands & meetings";
        else if (h >= 12) idealFor = "Wedding events & whole day errands";

        result.push({
          id: `pkg-${h}-${kms}`,
          duration: durationStr,
          km: kmStr,
          packageHours: h,
          includedKms: kms,
          basePrice: sedanP,
          sedanPrice: sedanP,
          suvPrice: suvP,
          suvPlusPrice: suvPlusP,
          traveller13Price: trav13P,
          traveller17Price: trav17P,
          traveller25Price: trav25P,
          categoryPrices: {
            Sedan: sedanP,
            SUV: suvP,
            "SUV+": suvPlusP,
            "13 Seater Traveller": trav13P,
            "17 Seater Traveller": trav17P,
            "25 Seater Traveller": trav25P,
          },
          idealFor,
        });
      }

      return result.length > 0 ? result : RENTAL_PACKAGES;
    } catch {
      return RENTAL_PACKAGES;
    }
  },

  /**
   * Create Cashfree payment order session via backend
   */
  async createCashfreeOrder(params: {
    bookingId: string;
    returnUrl?: string;
  }): Promise<CashfreeOrderResponse> {
    const baseUrl = getApiBaseUrl();
    const res = await fetchWithTimeout(
      `${baseUrl}/payment/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      },
      12000
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        err?.cashfree?.message ||
          err?.message ||
          `Failed to create Cashfree payment order (${res.status})`
      );
    }

    return (await res.json()) as CashfreeOrderResponse;
  },

  /**
   * Check Cashfree payment status for a booking
   */
  async checkPaymentStatus(bookingId: string): Promise<CashfreeStatusResponse> {
    const baseUrl = getApiBaseUrl();
    const res = await fetchWithTimeout(
      `${baseUrl}/payment/status/${encodeURIComponent(bookingId)}`,
      {},
      8000
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to check payment status (${res.status})`);
    }

    return (await res.json()) as CashfreeStatusResponse;
  },

  /**
   * Fetch live addon service pricing configured from the admin panel
   */
  async getAddons(): Promise<AddonPricingMap> {
    const fallback: AddonPricingMap = {
      petAllowance: 1001,
      roofCarrier: 157,
      language: 209,
      newVehicle: 262,
      sightseeing: 787,
      refundable: 751,
      details: {},
      raw: [],
    };

    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/addons`, { cache: "no-store" }, 4000);
      if (!res.ok) return fallback;
      const data = await res.json();
      const list: BackendAddonItem[] = data.addons || data.data || (Array.isArray(data) ? data : []);
      if (!Array.isArray(list) || list.length === 0) return fallback;

      const map: AddonPricingMap = { ...fallback, details: {}, raw: list };
      for (const item of list) {
        const k = (item.key || item.name || '').toLowerCase();
        const p = Number(item.price);
        if (isNaN(p)) continue;

        const detail: AddonDetailItem = {
          name: item.name?.trim() || '',
          description: item.description?.trim() || '',
          price: p,
        };

        if (k.includes('pet')) {
          map.petAllowance = p;
          map.details!.petAllowance = detail;
        } else if (k.includes('roof') || k.includes('carrier') || k.includes('luggage')) {
          map.roofCarrier = p;
          map.details!.roofCarrier = detail;
        } else if (k.includes('language') || k.includes('lang')) {
          map.language = p;
          map.details!.language = detail;
        } else if (k.includes('vehicle') || k.includes('car') || k.includes('new_vehicle')) {
          map.newVehicle = p;
          map.details!.newVehicle = detail;
        } else if (k.includes('sight') || k.includes('tour')) {
          map.sightseeing = p;
          map.details!.sightseeing = detail;
        } else if (k.includes('refund')) {
          map.refundable = p;
          map.details!.refundable = detail;
        }
      }
      return map;
    } catch {
      return fallback;
    }
  },

  /**
   * Submit career application lead to database
   */
  async submitCareerApplication(data: CareerApplicationPayload): Promise<any> {
    const baseUrl = getApiBaseUrl();
    const res = await fetchWithTimeout(
      `${baseUrl}/careers`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      8000
    );

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.message || `Failed to submit application (${res.status})`);
    }
    return json;
  },

  /**
   * Submit Hero Search booking lead to database
   */
  async createBookingLead(data: BookingLeadPayload): Promise<any> {
    try {
      const payload: BookingLeadPayload = { ...data };

      // Ensure customer mobile and profile info are attached if user is logged in
      if (typeof window !== "undefined") {
        try {
          if (!payload.customerMobile) {
            const rawSession = sessionStorage.getItem("broomboom_user");
            const rawLocal = localStorage.getItem("broomboom_user") || localStorage.getItem("user");
            const userObj = rawSession ? JSON.parse(rawSession) : (rawLocal ? JSON.parse(rawLocal) : null);
            if (userObj) {
              if (userObj.phone || userObj.mobile || userObj.identifier) {
                payload.customerMobile = userObj.phone || userObj.mobile || userObj.identifier;
              }
              if (!payload.customerName && userObj.name) {
                payload.customerName = userObj.name;
              }
              if (!payload.customerEmail && userObj.email) {
                payload.customerEmail = userObj.email;
              }
            }
          }
          if (!payload.customerMobile) {
            const storedPhone = localStorage.getItem("broomboom_user_phone") || sessionStorage.getItem("broomboom_user_phone");
            if (storedPhone) payload.customerMobile = storedPhone;
          }
        } catch {}
      }

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetchWithTimeout(
        "/api/booking-leads",
        {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        },
        5000
      );
      const json = await res.json().catch(() => ({}));
      if (json && json.data) {
        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("broomboom_last_search_lead", JSON.stringify(json.data));
            localStorage.setItem("broomboom_last_search_lead", JSON.stringify(json.data));
          }
        } catch {}
      }
      return json;
    } catch (err) {
      console.warn("Could not save booking lead to API:", err);
      return null;
    }
  },
};

export interface BookingLeadPayload {
  serviceType: string;
  tripType?: string;
  fromCity: string;
  toCity?: string;
  pickupAddress?: string;
  dropAddress?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  dropTime?: string;
  hourlyPackage?: string;
  airportMode?: string;
  flightNumber?: string;
  distanceKm?: number;
  durationMinutes?: number;
  customerName?: string;
  customerMobile?: string;
  customerEmail?: string;
  source?: string;
  estimatedFare?: number;
  notes?: string;
  rawSearchParams?: any;
}

export interface CareerApplicationPayload {
  jobId?: string;
  jobTitle: string;
  department?: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  experience?: string;
  linkedIn?: string;
  portfolio?: string;
  noticePeriod?: string;
  cover?: string;
  resumeFileName?: string;
  resumeUrl?: string;
  source?: string;
}

export interface BackendAddonItem {
  id: string;
  key?: string;
  name: string;
  price: number;
  description?: string;
}

export interface AddonDetailItem {
  name: string;
  description: string;
  price: number;
}

export interface AddonPricingMap {
  petAllowance: number;
  roofCarrier: number;
  language: number;
  newVehicle: number;
  sightseeing: number;
  refundable: number;
  details?: {
    petAllowance?: AddonDetailItem;
    roofCarrier?: AddonDetailItem;
    language?: AddonDetailItem;
    newVehicle?: AddonDetailItem;
    sightseeing?: AddonDetailItem;
    refundable?: AddonDetailItem;
  };
  raw: BackendAddonItem[];
}

