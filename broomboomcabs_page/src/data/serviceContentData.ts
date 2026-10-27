import { CityServiceInfo } from "./cityServicesData";

export interface ServiceContentSectionData {
  badge: string;
  title: string;
  subtitle: string;
  heroImage: {
    url: string;
    alt: string;
    badgeText?: string;
  };
  secondaryImage: {
    url: string;
    alt: string;
    badgeText?: string;
  };
  introParagraphs: string[];
  subsections: {
    title: string;
    content: string;
    bulletPoints?: string[];
  }[];
  highlights: {
    title: string;
    description: string;
  }[];
  travelTips?: string[];
}

export function getServiceContentData(
  serviceId: string,
  city: CityServiceInfo
): ServiceContentSectionData {
  if (serviceId === "airport") {
    return {
      badge: `${city.airportCode} Airport Transfer Guide`,
      title: `On-Time Airport Cabs & Taxi Service in ${city.cityName}`,
      subtitle: `Reliable doorstep pickups, flight tracking, and comfortable terminal drop-offs for ${city.airportName} (${city.airportCode}).`,
      heroImage: {
        url: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80",
        alt: `${city.cityName} Airport Transfer Cab Service`,
        badgeText: "24x7 Flight Tracking",
      },
      secondaryImage: {
        url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
        alt: "Chilled AC Airport Taxi Waiting at Terminal",
        badgeText: "45 Mins Complimentary Wait",
      },
      introParagraphs: [
        `Catching an early morning flight or arriving after midnight at ${city.airportName} can often be taxing without reliable ground transportation. BroomBoom Cabs takes the uncertainty out of airport commutes across ${city.cityName} with guaranteed on-time pickups, zero surge pricing, and live flight tracking.`,
        `Whether you are traveling for executive meetings or a vacation with family, our clean, air-conditioned sedans and spacious SUVs provide luggage assistance and doorstep drop-offs right at terminal gates. With transparent flat billing, tolls and taxes are clearly accounted for without last-minute hidden add-ons.`,
      ],
      subsections: [
        {
          title: `Smart Flight Delay Tracking at ${city.airportCode}`,
          content:
            "Flight delays are unpredictable. When you book an arrival taxi with BroomBoom, our automated flight tracker monitors your aircraft in real time. Your chauffeur automatically adjusts their arrival at the terminal, ensuring you are never left waiting or penalized with unexpected wait fees.",
          bulletPoints: [
            "45 minutes free waiting period from the moment your flight touches down.",
            "Dedicated terminal meet & greet with chauffeur holding a name placard.",
            "Assistance with heavy luggage straight from the arrival belt to the car boot.",
          ],
        },
        {
          title: `Seamless Terminal Transfers Across ${city.cityName}`,
          content: `Our network connects ${city.airportName} directly to prime business hubs, railway stations, and residential sectors including ${city.airportTerminalDrops.join(", ")}. Regardless of peak hour traffic or midnight arrival times, you enjoy fixed transparent pricing.`,
          bulletPoints: [
            "Fixed upfront rates with zero midnight surcharge.",
            "Sanitized hatchback, sedan (Dzire), and family SUV (Ertiga/Innova) options.",
            "Instant booking confirmations with driver contact details and vehicle tracking link.",
          ],
        },
      ],
      highlights: [
        {
          title: "Zero Surge Pricing",
          description: "No rainy-day spikes or peak hour multipliers. Pay the promised fare every single time.",
        },
        {
          title: "Verified Drivers",
          description: "Courteous, background-checked chauffeurs experienced with airport parking and terminal regulations.",
        },
        {
          title: "Clean & Sanitized",
          description: "Spotless cars with strong air conditioning and generous trunk space for all bags.",
        },
      ],
      travelTips: [
        `Schedule your airport cab at least 2.5 hours before domestic departures and 3.5 hours for international flights from ${city.cityName}.`,
        "Enter your flight number during booking so our tracking system automatically syncs chauffeur arrival.",
        "Need a return pickup after your trip? Book a round-trip airport transfer for additional savings.",
      ],
    };
  }

  if (serviceId === "rental") {
    return {
      badge: "Hourly City Car Rental Guide",
      title: `Flexible Hourly Car Rentals with Chauffeur in ${city.cityName}`,
      subtitle: `Book private 2 to 12-hour cab rentals with unlimited stops for business meetings, shopping, and city sightseeing.`,
      heroImage: {
        url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
        alt: `${city.cityName} Hourly Car Rental with Chauffeur`,
        badgeText: "Multi-Stop Convenience",
      },
      secondaryImage: {
        url: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
        alt: "Clean Sedan Car Rental for Business Travel",
        badgeText: "Zero Surge All Day",
      },
      introParagraphs: [
        `Navigating a busy metropolis like ${city.cityName} for consecutive client meetings, temple tours, or wedding errands often means repeatedly booking rides and waiting in the heat. BroomBoom hourly car rental gives you a dedicated vehicle and chauffeur on standby for as many hours and stops as you desire.`,
        `Choose flexible packages ranging from 2 Hours / 20 Kms to 12 Hours / 120 Kms. Leave your bags safely in the vehicle between appointments, direct the driver to multiple destinations, and enjoy an uninterrupted, stress-free day in the comfort of a chilled AC car.`,
      ],
      subsections: [
        {
          title: `Customized Packages for Every City Need in ${city.cityName}`,
          content:
            "From short morning errands to full-day corporate disposal, our packages cater to distinct travel requirements with transparent per-km and per-hour extension rates.",
          bulletPoints: [
            "2h / 20km & 4h / 40km: Ideal for client visits, medical consultations, and shopping trips.",
            "8h / 80km & 12h / 120km: Perfect for full-day city tours, weddings, and multi-hub business rounds.",
            `Convenient stops across popular hotspots such as ${city.popularLocalHotspots.slice(0, 4).join(", ")}.`,
          ],
        },
        {
          title: "Keep Your Chauffeur On Standby Without Surge",
          content:
            "Unlike traditional point-to-point ride hailing where drivers cancel or prices skyrocket during peak hours, BroomBoom rental cabs stay exclusively with you. Enjoy 100% peace of mind knowing your ride is parked outside, ready to depart whenever you step out.",
          bulletPoints: [
            "Unlimited stops permitted within the booked package duration and distance.",
            "Fuel, car allowance, and driver charges fully covered upfront.",
            "Free cancellation before dispatch with instant refund guarantee.",
          ],
        },
      ],
      highlights: [
        {
          title: "Dedicated Cab & Driver",
          description: "The vehicle is reserved solely for you. No re-booking, no driver hunting, no cancellation stress.",
        },
        {
          title: "Luggage Security",
          description: "Keep your belongings, shopping bags, and laptops safely inside the locked cab while attending meetings.",
        },
        {
          title: "Clear Overtime Rates",
          description: "Need an extra hour or extra kilometers? Extend seamlessly at standard, transparent nominal tariffs.",
        },
      ],
      travelTips: [
        `Select the 8 Hours / 80 Kms package for full-day city exploration covering monuments, markets, and heritage dining.`,
        "You can inform the driver directly about route preferences and request short halt stops whenever needed.",
        "Corporate billing and GST tax invoices are automatically generated and emailed after the ride.",
      ],
    };
  }

  // Default: Outstation
  return {
    badge: "Outstation Road Trip Guide",
    title: `Online Outstation Cab Booking from ${city.cityName} — Highway Travel Guide`,
    subtitle: `Enjoy scenic intercity travel with zero return fare on one-way trips, verified highway chauffeurs, and doorstep pickup.`,
    heroImage: {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      alt: `Outstation Cab Travel from ${city.cityName}`,
      badgeText: "Zero Return Fare",
    },
    secondaryImage: {
      url: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80",
      alt: "Scenic Highway Road Trip in Comfort",
      badgeText: "Verified Highway Drivers",
    },
    introParagraphs: [
      `Most Indian tourists prefer traveling to their preferred destinations via road. A road trip allows you to enjoy the scenic beauty of national highways, stop at authentic roadside dhabas, and soak in diverse cultural landscapes at your own pace. With BroomBoom Cabs, booking an outstation taxi from ${city.cityName} is effortless, reliable, and economical.`,
      `Whether you are heading out on a spiritual pilgrimage, a weekend beach getaway, or visiting relatives in neighboring districts, our fleet of well-maintained hatchbacks, sedans, and SUVs are equipped for comfortable long-distance cruising. Best of all, our one-way drop service ensures you only pay for the distance traveled—never for the cab's return trip.`,
    ],
    subsections: [
      {
        title: `One-Way Cabs vs Round-Trip Travel from ${city.cityName}`,
        content: `Choose the exact booking package that aligns with your itinerary. If you are relocating or staying at your destination for an extended period, one-way outstation cabs save you up to 50% on fare compared to traditional operators who charge round-trip rates.`,
        bulletPoints: [
          `One-Way Drop: Pay only for point-to-point highway distance with zero return fare penalty.`,
          "Round-Trip Getaways: Chauffeur stays with you throughout your vacation for local sightseeing and return journey.",
          `Popular corridors from ${city.cityName} include ${city.outstationRoutes.map((r) => r.destination).join(", ")}.`,
        ],
      },
      {
        title: "Highway Safety, Sanitization & Chauffeur Etiquette",
        content:
          "Long-distance driving demands experienced drivers who know highway intersections, bypass roads, and weather safety protocols. BroomBoom drivers are background-checked, polite, and trained in defensive driving techniques so you and your family can travel with complete peace of mind.",
        bulletPoints: [
          "Commercial yellow-plate vehicles with valid national permits and insurance.",
          "Regular vehicle inspections covering brakes, tyre tread, air conditioning, and seat belts.",
          "24x7 live GPS tracking and emergency assistance desk on standby.",
        ],
      },
    ],
    highlights: [
      {
        title: "Guaranteed One-Way Pricing",
        description: "Zero return fare penalty on one-way outstation drops. Keep your intercity travel budget-friendly.",
      },
      {
        title: "Doorstep Pickup & Drop",
        description: "Your chauffeur picks you up from your home or office address and drops you directly at your destination hotel.",
      },
      {
        title: "Transparent Highway Billing",
        description: "Inclusive rates with toll tax, state road tax, and driver allowance specified clearly prior to booking.",
      },
    ],
    travelTips: [
      `Schedule early morning departures (between 5:00 AM - 7:00 AM) to beat city traffic exits and enjoy golden hour highway views.`,
      "Feel free to ask the driver for short tea breaks or restaurant stops at recommended highway plazas along the route.",
      "Travel with more than 4 passengers or heavy bags? Upgrade to our Ertiga or Innova SUV for superior legroom and comfort.",
    ],
  };
}

