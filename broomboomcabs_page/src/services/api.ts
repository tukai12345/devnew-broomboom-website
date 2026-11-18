
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
  return PROD_API_BASE_URL;
};

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 3500
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

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
  async searchCities(query: string): Promise<CityItem[]> {
    if (!query || query.trim().length < 2) return [];
    const cleanQ = query.trim();

    // 1. Try local backend first (has Google Maps + Nominatim full address pipeline)
    try {
      const res = await fetchWithTimeout(
        `http://localhost:5004/api/cities/search?q=${encodeURIComponent(cleanQ)}`,
        {},
        3500
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch {
      // Local backend unavailable
    }

    // 2. Try BroomBoom production backend
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(
        `${baseUrl}/cities/search?q=${encodeURIComponent(cleanQ)}`,
        {},
        4000
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Backend city search notice:", err);
    }

    // 3. Direct OpenStreetMap Nominatim Fallback for any location in India
    try {
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(
        cleanQ
      )}&limit=10&addressdetails=1`;
      const res = await fetchWithTimeout(
        nominatimUrl,
        {
          headers: {
            "User-Agent": "BroomBoomCabsWeb/1.0",
            Accept: "application/json",
          },
        },
        4000
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
   * Fetch rental pricing packages
   */
  async getRentalPackages(): Promise<RentalPackageItem[]> {
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/pricing-rules/rental`, {}, 5000);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
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
      raw: [],
    };

    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(`${baseUrl}/addons`, {}, 4000);
      if (!res.ok) return fallback;
      const data = await res.json();
      const list: BackendAddonItem[] = data.addons || data.data || (Array.isArray(data) ? data : []);
      if (!Array.isArray(list) || list.length === 0) return fallback;

      const map: AddonPricingMap = { ...fallback, raw: list };
      for (const item of list) {
        const k = (item.key || item.name || '').toLowerCase();
        const p = Number(item.price);
        if (isNaN(p)) continue;

        if (k.includes('pet')) {
          map.petAllowance = p;
        } else if (k.includes('roof') || k.includes('carrier') || k.includes('luggage')) {
          map.roofCarrier = p;
        } else if (k.includes('language') || k.includes('lang')) {
          map.language = p;
        } else if (k.includes('vehicle') || k.includes('car') || k.includes('new_vehicle')) {
          map.newVehicle = p;
        } else if (k.includes('sight') || k.includes('tour')) {
          map.sightseeing = p;
        } else if (k.includes('refund')) {
          map.refundable = p;
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
      const res = await fetchWithTimeout(
        "/api/booking-leads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
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

export interface AddonPricingMap {
  petAllowance: number;
  roofCarrier: number;
  language: number;
  newVehicle: number;
  sightseeing: number;
  refundable: number;
  raw: BackendAddonItem[];
}

