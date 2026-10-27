/**
 * BroomBoom Cabs - User Backend API Client
 * Connected to: https://broombroom-user-backend-kohl.vercel.app/api
 */

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
  distance?: string;
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
  advance: number;
  dueFare: number;
  distance: number;
  durationMinutes: number;
  details?: {
    type: string;
    pickup?: string;
    drop?: string;
    baseFare?: number;
    distance?: number;
    durationMinutes?: number;
    addons?: Record<string, number>;
    addonTotal?: number;
  };
  multiplier?: number;
  appliedRule?: string;
  ruleType?: string;
  error?: string;
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

const LOCAL_API_BASE_URL = "http://localhost:5004/api";
const PROD_API_BASE_URL = "https://broombroom-user-backend-kohl.vercel.app/api";

export const getApiBaseUrl = (): string => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }
  return LOCAL_API_BASE_URL;
};

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 9000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (err) {
    // If local URL was attempted and failed, attempt cloud fallback
    if (url.includes("localhost:5004")) {
      const fallbackUrl = url.replace(LOCAL_API_BASE_URL, PROD_API_BASE_URL);
      try {
        return await fetch(fallbackUrl, {
          ...options,
        });
      } catch {}
    }
    throw err;
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
  }): Promise<BackendUserLead> {
    const baseUrl = getApiBaseUrl();
    const payload = {
      name: userData.name || "Customer",
      phone: userData.phone.trim(),
      email: userData.email?.trim() || "",
      status: userData.status || "Active",
      leadType: userData.leadType || "New",
    };

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

    const res = await fetchWithTimeout(`${baseUrl}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullPayload),
    });

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
        7000
      );
      if (!res.ok) return null;
      return (await res.json()) as DistanceCalculationResult;
    } catch {
      return null;
    }
  },

  /**
   * Real-time map location search / autocomplete via Nominatim & DB
   */
  async searchCities(query: string): Promise<CityItem[]> {
    if (!query || query.trim().length < 2) return [];
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetchWithTimeout(
        `${baseUrl}/cities/search?q=${encodeURIComponent(query.trim())}`,
        {},
        5000
      );
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
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
    distance?: number;
    oneWayDistance?: number;
    days?: number;
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
      if (!res.ok) return null;
      return (await res.json()) as PricingCalculationResult;
    } catch {
      return null;
    }
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
      throw new Error(err.message || `Failed to create Cashfree payment order (${res.status})`);
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
};

