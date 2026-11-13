export const CAR_RENTAL_SPECIAL_ROUTES: string[] = [
  "kochi",
  "chandigarh",
  "ahmedabad",
  "kolkata1",
  "taxi-service-in-puri",
  "13-seater-tempo-traveller-on-rent-in-kolkata",
  "17-seater-tempo-traveller-on-rent-in-kolkata",
  "20-seater-tempo-traveller-on-rent-in-kolkata",
  "26-seater-force-traveller-on-rent-in-kolkata",
  "8-seater-car-for-rent-in-hyderabad",
  "durga-puja-car-rental-packages",
  "17-seater-tempo-traveller-on-rent-in-mumbai",
  "17-seater-minibus-on-rent-in-mumbai",
  "20-seater-tempo-traveller-on-rent-in-mumbai",
  "9-seater-tempo-traveller-on-rent-in-mumbai",
];

export interface SpecialCarRentalInfo {
  type: "tempo" | "minibus" | "festival" | "city-taxi";
  slug: string;
  cityName: string;
  vehicleName: string;
  seats: string;
  pageTitle: string;
  pageDescription: string;
  h1: string;
  canonicalUrl: string;
  features: string[];
  startingPrice: string;
}

export function parseSpecialCarRentalSlug(slug: string): SpecialCarRentalInfo | null {
  const clean = slug.toLowerCase().trim();
  const canonicalUrl = `https://dev.broomboomcabs.com/car-rental/${clean}`;

  if (clean === "durga-puja-car-rental-packages") {
    return {
      type: "festival",
      slug: clean,
      cityName: "Kolkata",
      vehicleName: "Festive AC Cabs & Tempo Travellers",
      seats: "4 to 26 Seater",
      pageTitle: "Durga Puja Car Rental Packages in Kolkata | BroomBoom Cabs",
      pageDescription:
        "Book exclusive Durga Puja car rental packages in Kolkata for seamless pandal hopping. Flexible 8hr/80km & full day rental packages, verified courteous drivers, and priority festival booking.",
      h1: "Durga Puja Car Rental Packages in Kolkata",
      canonicalUrl,
      features: [
        "Special Pandal Hopping Day & Night Packages",
        "Pre-planned Kolkata North & South Pandal routes",
        "Air-conditioned Hatchbacks, Sedans, Ertigas & Tempo Travellers",
        "Zero surge pricing during festive rush",
      ],
      startingPrice: "₹1,899 / 8 Hours",
    };
  }

  if (clean === "taxi-service-in-puri") {
    return {
      type: "city-taxi",
      slug: clean,
      cityName: "Puri",
      vehicleName: "Hatchback, Sedan, SUV & Tempo Traveller",
      seats: "4 to 17 Seater",
      pageTitle: "Taxi Service in Puri & Car Rental | Local & Outstation Cabs — BroomBoom Cabs",
      pageDescription:
        "Book reliable taxi service and car rentals in Puri with BroomBoom. Jagannath Temple darshan, Konark Sun Temple tours, Chilika Lake day trips & Bhubaneswar airport transfers with zero cancellation.",
      h1: "Taxi Service & Car Rental in Puri",
      canonicalUrl,
      features: [
        "Jagannath Temple, Golden Beach & Marine Drive sightseeing",
        "Puri to Konark & Chandrabhaga Beach day tours",
        "Puri to Chilika Lake (Satapada dolphin viewpoint) cabs",
        "Puri to Bhubaneswar Airport (BBI) transfers with flight tracking",
      ],
      startingPrice: "₹1,199 / package",
    };
  }

  // Regex for seater vehicle rentals
  const tempoMatch = clean.match(
    /^(\d+)-seater-(tempo-traveller|force-traveller|minibus|car)(-on-rent|-for-rent)?-in-(.+)$/
  );

  if (tempoMatch) {
    const seats = tempoMatch[1];
    const vehicleTypeRaw = tempoMatch[2];
    const cityRaw = tempoMatch[4];

    const formatWord = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
    const vehicleTypeStr = vehicleTypeRaw
      .split("-")
      .map(formatWord)
      .join(" ");
    const vehicleName = `${seats} Seater ${vehicleTypeStr}`;
    const cityName = cityRaw
      .split("-")
      .map(formatWord)
      .join(" ");

    const isMinibus = vehicleTypeRaw.includes("minibus");

    return {
      type: isMinibus ? "minibus" : "tempo",
      slug: clean,
      cityName,
      vehicleName,
      seats: `${seats} Passengers`,
      pageTitle: `${vehicleName} on Rent in ${cityName} | Lowest Rates — BroomBoom Cabs`,
      pageDescription: `Hire ${vehicleName} on rent in ${cityName} with BroomBoom. Pushback luxury seats, high roof, ample luggage carrier, sanitized AC interiors & experienced commercial chauffeur. Best rates for weddings, family trips & corporate outings.`,
      h1: `${vehicleName} on Rent in ${cityName}`,
      canonicalUrl,
      features: [
        `${seats} Pushback luxury recliner seats with seatbelts`,
        "Chilled Dual AC with individual air vents",
        "Dedicated spacious boot space & top luggage roof carrier",
        "Music system, USB charging ports & LED interior mood lighting",
        "Police-verified commercial highway chauffeur",
      ],
      startingPrice: `From ₹24 / km (Local packages from ₹3,499)`,
    };
  }

  return null;
}
