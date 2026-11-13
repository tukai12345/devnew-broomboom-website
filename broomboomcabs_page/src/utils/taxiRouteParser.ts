export interface ParsedTaxiSlug {
  type: "pet" | "route" | "area" | "tour";
  slug: string;
  from: string;
  to: string;
  cityName: string;
  isAirport: boolean;
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
}

export function parseTaxiServiceSlug(
  slug: string,
  basePath: string = "taxi-service"
): ParsedTaxiSlug {
  const cleanSlug = slug.toLowerCase().trim();
  const canonicalUrl = `https://dev.broomboomcabs.com/${basePath}/${cleanSlug}`;

  // 1. Check Pet Friendly
  if (/^pet-friendly-cabs?-in-/i.test(cleanSlug)) {
    const rawCity = cleanSlug.replace(/^pet-friendly-cabs?-in-/i, "");
    const formattedCity = rawCity
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      type: "pet",
      slug: cleanSlug,
      from: formattedCity,
      to: "",
      cityName: formattedCity,
      isAirport: false,
      pageTitle: `Pet Friendly Cabs in ${formattedCity} | Travel with Dogs & Cats | BroomBoom Cabs`,
      pageDescription: `Book 100% verified pet-friendly cabs in ${formattedCity} with BroomBoom. Safe, clean, and spacious AC cabs for dogs, cats & pets. Zero stress rides for local clinic visits, vet rides, airport drops & outstation trips.`,
      canonicalUrl,
    };
  }

  // 2. Special slugs
  if (cleanSlug === "kolkata-durga-puja-taxi-for-pandal-sightseeing") {
    return {
      type: "tour",
      slug: cleanSlug,
      from: "Kolkata",
      to: "Durga Puja Pandal Sightseeing Tour",
      cityName: "Kolkata",
      isAirport: false,
      pageTitle: `Kolkata Durga Puja Taxi & Cab Rental for Pandal Sightseeing | BroomBoom Cabs`,
      pageDescription: `Book AC cabs for Kolkata Durga Puja Pandal Hopping 2025. 8hr/80km & full day rental packages, verified drivers, priority pickup at best rates.`,
      canonicalUrl,
    };
  }

  if (cleanSlug === "kalyanitokolkatacabs") {
    return {
      type: "route",
      slug: cleanSlug,
      from: "Kalyani",
      to: "Kolkata",
      cityName: "Kalyani",
      isAirport: false,
      pageTitle: `Kalyani to Kolkata Cabs & Taxi Fare | Book One-Way Ride | BroomBoom Cabs`,
      pageDescription: `Book reliable Kalyani to Kolkata cabs with BroomBoom. One-way cab fare starting ₹1,199. AC Sedan, Hatchback & SUV available 24x7 with doorstep pickup.`,
      canonicalUrl,
    };
  }

  if (cleanSlug === "puritokolkatacabs") {
    return {
      type: "route",
      slug: cleanSlug,
      from: "Puri",
      to: "Kolkata",
      cityName: "Puri",
      isAirport: false,
      pageTitle: `Puri to Kolkata Cabs & Taxi Fare | One-Way & Round Trip | BroomBoom Cabs`,
      pageDescription: `Book Puri to Kolkata taxi service. Affordable one-way outstation cab fare, verified drivers, sanitized AC cars, and 24x7 support.`,
      canonicalUrl,
    };
  }

  if (cleanSlug === "ranchitokolkatacabs") {
    return {
      type: "route",
      slug: cleanSlug,
      from: "Ranchi",
      to: "Kolkata",
      cityName: "Ranchi",
      isAirport: false,
      pageTitle: `Ranchi to Kolkata Cabs & Taxi Fare | Lowest One-Way Rates | BroomBoom Cabs`,
      pageDescription: `Book Ranchi to Kolkata cabs online. Best outstation taxi rates, AC Sedan, Ertiga & Innova available. Zero return fare on one-way bookings.`,
      canonicalUrl,
    };
  }

  if (cleanSlug === "southcitymallkolkata") {
    return {
      type: "area",
      slug: cleanSlug,
      from: "South City Mall, Kolkata",
      to: "",
      cityName: "Kolkata",
      isAirport: false,
      pageTitle: `Taxi Service near South City Mall Kolkata | Quick Cab Booking | BroomBoom Cabs`,
      pageDescription: `Get instant 24x7 cab pickup at South City Mall Kolkata. Local city drop, airport drops, and outstation taxi service at lowest fares.`,
      canonicalUrl,
    };
  }

  // Helper to format place names
  const formatName = (str: string): string => {
    return str
      .split("-")
      .map((w) => {
        const lower = w.toLowerCase();
        if (lower === "bbsr" || lower === "bbi") return "Bhubaneswar";
        if (lower === "vp") return "";
        if (lower === "us") return "US";
        if (lower === "iisc") return "IISc";
        if (lower === "bits") return "BITS";
        if (lower === "lb") return "LB";
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .filter(Boolean)
      .join(" ");
  };

  // 3. Route with -to-
  if (cleanSlug.includes("-to-")) {
    const parts = cleanSlug.split("-to-");
    const fromRaw = parts[0];
    let toRaw = parts[1];

    const suffixes = [
      "-cabs-at-cheapest-rate",
      "-one-way-taxi-service",
      "-innova-taxi-fare",
      "-taxi-fare",
      "-cab-fare",
      "-taxi-price",
      "-taxi-services",
      "-taxi-service",
      "-cab-services",
      "-cab-service",
      "-cab-booking",
      "-car-rentals",
      "-car-rental",
      "-car-fare",
      "-cab-cost",
      "-taxi",
      "-cabs",
      "-cab",
    ];

    for (const suf of suffixes) {
      if (toRaw.endsWith(suf)) {
        toRaw = toRaw.slice(0, -suf.length);
        break;
      }
    }

    const fromFormatted = formatName(fromRaw);
    const toFormatted = formatName(toRaw);
    const isAirport =
      fromRaw.includes("airport") || toRaw.includes("airport") || fromRaw === "bbi" || fromRaw === "bbsr";

    const title = `${fromFormatted} to ${toFormatted} Taxi Fare & Cab Booking | BroomBoom Cabs`;
    const description = `Book verified ${fromFormatted} to ${toFormatted} cabs with BroomBoom. One-way cab fare, AC Hatchback, Sedan & SUV available 24x7. No hidden fees & transparent billing.`;

    return {
      type: "route",
      slug: cleanSlug,
      from: fromFormatted,
      to: toFormatted,
      cityName: fromFormatted,
      isAirport,
      pageTitle: title,
      pageDescription: description,
      canonicalUrl,
    };
  }

  // 4. Locality / Area
  const areaName = formatName(cleanSlug);
  return {
    type: "area",
    slug: cleanSlug,
    from: areaName,
    to: "",
    cityName: areaName,
    isAirport: false,
    pageTitle: `Taxi Service in ${areaName} | 24x7 Cab Booking | BroomBoom Cabs`,
    pageDescription: `Book reliable 24x7 taxi service in ${areaName}. Local city rides, airport drops, and outstation cabs with verified drivers and instant confirmation.`,
    canonicalUrl,
  };
}
