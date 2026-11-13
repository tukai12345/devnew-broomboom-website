export interface ReservedCabRoute {
  slug: string;
  name: string;
  originAirport: string;
  originCode: "IXB" | "GAU";
  destination: string;
  region: string;
  distance: string;
  duration: string;
  startingPrice: number;
  highway: string;
  bestTimeToVisit: string;
  permitRequirement: string;
  image: string;
  highlights: string[];
  description: string;
  fleetFares: {
    category: string;
    model: string;
    seating: string;
    oneWayFare: string;
    roundTripFare: string;
    mountainReady: boolean;
    badge?: string;
  }[];
  scenicStops: {
    place: string;
    desc: string;
  }[];
  itinerary: {
    stage: string;
    title: string;
    desc: string;
  }[];
  mountainSafety: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const RESERVED_CABS_SLUGS = [
  "bagdogra-airport-to-sikkim",
  "bagdogra-airport-to-kalimpong",
  "bagdogra-airport-to-nepal",
  "guwahati-airport-to-shillong",
] as const;

export const RESERVED_CABS_MAP: Record<string, ReservedCabRoute> = {
  "bagdogra-airport-to-sikkim": {
    slug: "bagdogra-airport-to-sikkim",
    name: "Bagdogra Airport to Sikkim Reserved Cabs",
    originAirport: "Bagdogra Airport (IXB), Siliguri",
    originCode: "IXB",
    destination: "Gangtok & Sikkim (Rangpo, Namchi, Pelling, Ravangla)",
    region: "Sikkim Eastern Himalayas",
    distance: "124 km (Gangtok) / 78 km (Rangpo Entry)",
    duration: "4.5 - 5.5 hrs",
    startingPrice: 3499,
    highway: "NH 10 along the scenic Teesta River Valley & Sevoke",
    bestTimeToVisit: "March to June (Blooming Rhododendrons) & October to December (Clear Kanchenjunga Views)",
    permitRequirement: "Indian nationals require no permit for Gangtok/South Sikkim. Foreigners require Sikkim Inner Line Permit (ILP) easily stamped at Rangpo / Melli checkpost.",
    image: "/blogs/offbeat-himalayan-destinations.jpg",
    highlights: [
      "Guaranteed flight tracking with complimentary 60-minute terminal waiting for delayed flights.",
      "Dedicated mountain-certified commercial chauffeurs with extensive snow, rain, and hairpin bend expertise.",
      "High ground clearance SUVs: Toyota Innova Crysta, Mahindra Scorpio, and Maruti Ertiga.",
      "Complimentary stop at Rangpo tourism checkpost for permit stamping and foreign national documentation.",
      "Scenic stops at Sevoke Coronation Bridge, Teesta River rafting view, and Melli confluence.",
    ],
    description:
      "Arriving at Bagdogra Airport (IXB) and heading into the Himalayan kingdom of Sikkim requires dependable, high-clearance mountain transport. The drive via NH 10 along the dramatic emerald Teesta River is breathtaking but features rugged mountain roads and weather fluctuations. BroomBoom Reserved Cabs provides pre-booked, private luxury SUVs and sedans waiting right at the Bagdogra arrival terminal with flight delay assurance, luggage assistance, and courteous Sikkimese/Gorkha mountain chauffeurs.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Passengers + 3 Bags",
        oneWayFare: "₹3,499 (Bagdogra to Rangpo/Singtam) / ₹3,999 (Gangtok)",
        roundTripFare: "₹7,499 (3-Day Reserved Package)",
        mountainReady: true,
        badge: "Budget Friendly",
      },
      {
        category: "Mountain SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Passengers + 4 Bags",
        oneWayFare: "₹4,699 (Drop to Gangtok Hotel)",
        roundTripFare: "₹8,999 (3-Day Reserved Package)",
        mountainReady: true,
        badge: "Most Popular",
      },
      {
        category: "Premium Mountain SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        seating: "6-7 Passengers + 5 Bags",
        oneWayFare: "₹6,199 (Luxury Gangtok Drop)",
        roundTripFare: "₹11,999 (3-Day Reserved Package)",
        mountainReady: true,
        badge: "Maximum Comfort",
      },
      {
        category: "4x4 / Luxury Fleet (Scorpio / Fortuner)",
        model: "Mahindra Scorpio 4WD / Fortuner",
        seating: "6 Passengers + 5 Bags",
        oneWayFare: "₹7,499 (All Weather Access)",
        roundTripFare: "₹14,999 (North Sikkim Accessible)",
        mountainReady: true,
      },
    ],
    scenicStops: [
      {
        place: "Sevoke Coronation Bridge",
        desc: "Historic British-era cantilever bridge over the emerald Teesta River with wild monkeys and mountain views.",
      },
      {
        place: "Teesta Bazaar / Chitrey Viewpoint",
        desc: "Watch the raging confluence of Teesta and Rangeet rivers with fresh roadside momos and mountain tea.",
      },
      {
        place: "Rangpo Border Gate",
        desc: "Welcome arch of Sikkim where foreign travelers obtain ILP permits and grab authentic Sikkim organic produce.",
      },
    ],
    itinerary: [
      {
        stage: "Terminal Arrival",
        title: "Chauffeur Meet & Greet at Bagdogra (IXB)",
        desc: "Your driver tracks your flight, welcomes you at the arrival exit gate with a personalized placard, and handles your luggage into a sanitized, cooled vehicle.",
      },
      {
        stage: "Plains to Foothills",
        title: "Siliguri to Sevoke Coronation Bridge (30 mins)",
        desc: "Exit Bagdogra, bypass Siliguri through the green tea gardens of Sukna, and cross into the lush Sal forests of Mahananda Wildlife Sanctuary.",
      },
      {
        stage: "Gorge Ascent",
        title: "Sevoke to Rangpo Checkpost (2 hrs)",
        desc: "Ascend along NH 10 carved into sheer rock walls flanking the roaring Teesta River. Smooth driving on paved mountain curves.",
      },
      {
        stage: "Permit & Gateway",
        title: "Rangpo to Singtam & Ranipool (1 hr)",
        desc: "Enter the state of Sikkim at Rangpo, complete brief checkpost formalities if applicable, and proceed along the newly illuminated highway.",
      },
      {
        stage: "Capital Arrival",
        title: "Hotel Drop-off in Gangtok / Pelling",
        desc: "Direct doorstep drop right at your hotel lobby on MG Marg, Deorali, or Development Area with complete luggage assistance.",
      },
    ],
    mountainSafety: [
      "Hill-licensed drivers with minimum 7 years of mountain driving experience",
      "All-weather heavy-tread radial tires and ABS hill-assist braking",
      "In-car mountain sickness first-aid kit and bottled mineral water",
      "24x7 satellite-assisted dispatch desk for real-time landslide & NH 10 traffic diversions",
    ],
    faqs: [
      {
        question: "What happens if my flight into Bagdogra Airport is delayed?",
        answer:
          "We track all scheduled flights using live radar. Your chauffeur will automatically adjust their waiting time without any extra delay charges for up to 90 minutes past actual touchdown.",
      },
      {
        question: "Do I need a special permit to enter Sikkim from Bagdogra?",
        answer:
          "Indian citizens only require valid photo ID (Voter ID, Aadhaar, Passport) for entry into Gangtok. Foreign citizens require a Sikkim Inner Line Permit (ILP), which our driver will assist you in stamping at the Rangpo border in under 10 minutes at no government fee.",
      },
      {
        question: "Is AC turned on during the mountain hill climb?",
        answer:
          "Yes! Unlike spot taxi stands where drivers charge extra or turn off AC on slopes, BroomBoom reserved cabs provide chilled climate control throughout the trip without extra charges.",
      },
    ],
  },

  "bagdogra-airport-to-kalimpong": {
    slug: "bagdogra-airport-to-kalimpong",
    name: "Bagdogra Airport to Kalimpong Reserved Cabs",
    originAirport: "Bagdogra Airport (IXB), Siliguri",
    originCode: "IXB",
    destination: "Kalimpong Hill Station (Deolo, Durpin Dara, Lava)",
    region: "Darjeeling & Kalimpong Hills",
    distance: "75 km via NH 10 & Rishi Road",
    duration: "2.5 - 3 hrs",
    startingPrice: 2899,
    highway: "NH 10 to Teesta Bridge ➔ Scenic climb up Rishi Road to Kalimpong",
    bestTimeToVisit: "September to May (Crisp alpine weather, blooming gladioli, orchids, and panoramic Kanchenjunga peaks)",
    permitRequirement: "No special permits required for Indian or foreign nationals to visit Kalimpong.",
    image: "/blogs/belur-math-kolkata.jpg",
    highlights: [
      "Punctual airport pickup right outside Bagdogra arrival terminal gate.",
      "Comfortable winding hill drive without jerky stops or motion sickness.",
      "Explore Kalimpong's famous flower nurseries, Zang Dhok Palri Phodang monastery, and Morgan House.",
      "Flexible stop for photography at the famous Lovers Meet Viewpoint (Teesta-Rangeet Confluence).",
      "Experienced local drivers who know every quiet homestay and heritage resort in Kalimpong.",
    ],
    description:
      "Perched on an emerald ridge overlooking the Teesta River and guarded by Mount Kanchenjunga, Kalimpong is West Bengal's most charming, tranquil hill station. Renowned for its exotic orchid nurseries, Tibetan Buddhist monasteries, and historic colonial cottages, Kalimpong is just 75 km from Bagdogra Airport. BroomBoom Reserved Cabs guarantees a stress-free mountain drive with sanitized AC sedans and SUVs, courteous chauffeurs, and upfront all-inclusive pricing.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Toyota Etios AC",
        seating: "4 Passengers + 3 Bags",
        oneWayFare: "₹2,899 (Direct Hotel Drop)",
        roundTripFare: "₹5,699 (2-Day Weekend Tour)",
        mountainReady: true,
        badge: "Best Value",
      },
      {
        category: "Mountain SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Passengers + 4 Bags",
        oneWayFare: "₹3,799 (Direct Hotel Drop)",
        roundTripFare: "₹7,299 (2-Day Weekend Tour)",
        mountainReady: true,
        badge: "Family Pick",
      },
      {
        category: "Premium Mountain SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        seating: "6-7 Passengers + 5 Bags",
        oneWayFare: "₹5,199 (Luxury Mountain Transfer)",
        roundTripFare: "₹9,899 (2-Day Weekend Tour)",
        mountainReady: true,
        badge: "Ultimate Luxury",
      },
    ],
    scenicStops: [
      {
        place: "Mahananda Forest Reserve",
        desc: "Picturesque drive through the sal forests with occasional spotted deer and elephant crossings.",
      },
      {
        place: "Teesta Bridge (Chitrey)",
        desc: "Famous suspension bridge crossing where travelers stop for ginger tea, local momos, and river photos.",
      },
      {
        place: "Durpin Dara Viewpoint",
        desc: "Panoramic vantage point offering sweeping views of the plains, Kanchenjunga, and Chumbi valley.",
      },
    ],
    itinerary: [
      {
        stage: "Airport Exit",
        title: "Meet & Greet at Bagdogra Terminal",
        desc: "Your chauffeur meets you at the terminal arrivals curb, assists with heavy bags, and sets your preferred climate control.",
      },
      {
        stage: "Scenic River Highway",
        title: "Siliguri to Teesta Bazaar via NH 10 (1.5 hrs)",
        desc: "Cruise past the emerald tea estates of Siliguri and ascend along the Teesta River gorge.",
      },
      {
        stage: "Mountain Ascent",
        title: "Teesta Bridge to Kalimpong Town (1 hr)",
        desc: "Turn off NH 10 onto the winding, pine-scented Rishi Road, ascending gracefully past nursery gardens into Kalimpong town.",
      },
      {
        stage: "Destination Drop",
        title: "Drop at Hotel, Resort, or Homestay",
        desc: "Direct drop-off at your property, whether on Deolo Hill, Relli Road, or near the town market.",
      },
    ],
    mountainSafety: [
      "Expert hill drivers trained in gentle cornering to prevent mountain sickness",
      "Child safety seats available on advance request",
      "Clean, sanitized vehicle cabins with vomit bags and first-aid kits",
    ],
    faqs: [
      {
        question: "How long is the drive from Bagdogra to Kalimpong?",
        answer:
          "The distance is approximately 75 km and takes around 2.5 to 3 hours under normal mountain traffic conditions.",
      },
      {
        question: "Can the driver drop us directly to an offbeat homestay in Lava or Rishyap?",
        answer:
          "Yes! We provide extended drops to Lava, Rishyap, Lolegaon, and Pedong for a nominal additional distance fee.",
      },
    ],
  },

  "bagdogra-airport-to-nepal": {
    slug: "bagdogra-airport-to-nepal",
    name: "Bagdogra Airport to Nepal Border Reserved Cabs",
    originAirport: "Bagdogra Airport (IXB), Siliguri",
    originCode: "IXB",
    destination: "Nepal Border (Panitanki / Kakarbhitta) & Onward to Kathmandu / Pokhara",
    region: "Indo-Nepal International Corridor",
    distance: "28 km to Kakarbhitta Border Gate / 40 km to Bhadrapur Airport",
    duration: "45 mins - 1 hr",
    startingPrice: 1499,
    highway: "Asian Highway 2 (AH2) via Naxalbari & Panitanki Bridge",
    bestTimeToVisit: "Year-Round; September to May for clear mountain skies and trekking in Nepal",
    permitRequirement: "Indian citizens require Voter ID or Passport for border crossing (no visa needed). Foreign nationals can obtain Nepal Visa on Arrival at the Kakarbhitta Immigration checkpoint.",
    image: "/blogs/why-broomboom-intercity-travel.jpg",
    highlights: [
      "Shortest, fastest gateway from Indian air connectivity to eastern Nepal.",
      "Direct drop at the Mechi Bridge international border gate at Panitanki / Kakarbhitta.",
      "Assistance with Nepal Tourist Visa and cross-border transport coordination.",
      "Connection to Bhadrapur Airport (Nepal) for onward 45-minute domestic flights to Kathmandu.",
      "Smooth 4-lane Asian Highway 2 (AH2) driving with zero delays.",
    ],
    description:
      "Bagdogra Airport (IXB) is India's closest major aviation hub to eastern Nepal. Located just 28 km from the Panitanki-Kakarbhitta international border, arriving passengers can cross seamlessly into Nepal to catch connecting flights from Bhadrapur Airport (BDP) to Kathmandu, or embark on road journeys into eastern Nepal's tea country in Ilam and Dhankuta. BroomBoom Reserved Cabs offers express international border drop and cross-border assistance with comfortable AC vehicles and courteous chauffeurs.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Passengers + 3 Bags",
        oneWayFare: "₹1,499 (Bagdogra to Kakarbhitta Border)",
        roundTripFare: "₹2,799 (Same-Day Round Trip with Waiting)",
        mountainReady: true,
        badge: "Fastest Express",
      },
      {
        category: "SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Passengers + 4 Bags",
        oneWayFare: "₹2,199 (Border Gate Drop)",
        roundTripFare: "₹3,999 (Round Trip with Waiting)",
        mountainReady: true,
        badge: "Family Pick",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        seating: "6-7 Passengers + 5 Bags",
        oneWayFare: "₹3,199 (VIP International Transfer)",
        roundTripFare: "₹5,499 (Round Trip with Waiting)",
        mountainReady: true,
        badge: "VIP Luxury",
      },
    ],
    scenicStops: [
      {
        place: "Naxalbari Historic Tea Estates",
        desc: "Lush carpeted tea gardens stretching along the Asian Highway with scenic Himalayan foothills backdrop.",
      },
      {
        place: "Mechi International River Bridge",
        desc: "Modern trans-boundary bridge spanning the Mechi River connecting India and Nepal.",
      },
    ],
    itinerary: [
      {
        stage: "Airport Terminal",
        title: "Pickup at Bagdogra Airport Arrivals",
        desc: "Meet your driver outside terminal arrivals; load bags and merge directly onto Asian Highway 2.",
      },
      {
        stage: "Express Transit",
        title: "Cruise on AH2 via Naxalbari (35 mins)",
        desc: "Fast, smooth drive across the 4-lane Asian Highway corridor past Batasi and Naxalbari.",
      },
      {
        stage: "International Border",
        title: "Arrival at Panitanki / Kakarbhitta Border Gate",
        desc: "Driver drops you directly at the Indian Immigration gate or crosses the Mechi Bridge for Nepal immigration stamping.",
      },
    ],
    mountainSafety: [
      "GPS tracking and border compliance documentation",
      "Experienced chauffeurs knowledgeable in customs and immigration guidelines",
      "Immediate assistance for travelers connecting to Bhadrapur domestic flights to Kathmandu",
    ],
    faqs: [
      {
        question: "Can an Indian citizen cross the Nepal border with just an Aadhaar card?",
        answer:
          "For entering Nepal beyond the border zone or boarding flights to Kathmandu, Indian authorities and airlines mandate a valid Indian Passport or original Voter ID card. Aadhaar is accepted for local daytime border crossings only.",
      },
      {
        question: "Can the BroomBoom cab drop me all the way to Bhadrapur Airport in Nepal?",
        answer:
          "Yes! We coordinate cross-border vehicle permits (Bhansar) to drop you directly to Bhadrapur Airport (BDP) in Nepal, or connect you with our partner Nepalese fleet seamlessly at Kakarbhitta.",
      },
    ],
  },

  "guwahati-airport-to-shillong": {
    slug: "guwahati-airport-to-shillong",
    name: "Guwahati Airport to Shillong Reserved Cabs",
    originAirport: "Lokpriya Gopinath Bordoloi International Airport (GAU), Guwahati",
    originCode: "GAU",
    destination: "Shillong, Meghalaya (Police Bazar, Laitlum, Cherrapunji)",
    region: "Khasi Hills & Meghalaya Plateau",
    distance: "120 km via NH 6 (Guwahati-Shillong Expressway)",
    duration: "3 - 3.5 hrs",
    startingPrice: 2799,
    highway: "Asian Highway 1 / NH 6 4-Lane Scenic Hill Expressway",
    bestTimeToVisit: "Year-round; June to September for roaring waterfalls (Cherrapunji) & October to April for clear sunny skies and cherry blossoms",
    permitRequirement: "No special permits required for Indian or foreign nationals visiting Shillong or Meghalaya.",
    image: "/blogs/gangasagar-mela-temple.jpg",
    highlights: [
      "Pristine 4-lane mountain expressway (AH1 / NH 6) offering one of India's smoothest hill drives.",
      "Guaranteed terminal pickup at Guwahati Airport (GAU) with flight tracking and 60-min free waiting.",
      "Scenic photo stop at Umiam Lake (Barapani) viewpoint with fresh pine breezes.",
      "Clean, sanitized Sedans, Ertigas, and Innova Crystas with hill-certified local drivers.",
      "Direct drops to Police Bazar, Laitumkhrah, Upper Shillong, or onward to Cherrapunji (Sohra).",
    ],
    description:
      "Traveling from Guwahati Airport (GAU) to Shillong, the capital of Meghalaya known as the 'Scotland of the East', is one of the most picturesque journeys in Northeast India. The 120 km route winds along the world-class 4-lane Guwahati-Shillong Expressway (NH 6), climbing from the Brahmaputra valley into mist-clad pine hills and the turquoise waters of Umiam Lake (Barapani). BroomBoom Reserved Cabs provides prompt, luxurious airport transfers with courteous drivers who know every scenic overlook and highway café.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Passengers + 3 Bags",
        oneWayFare: "₹2,799 (Guwahati Airport to Shillong Drop)",
        roundTripFare: "₹5,499 (2-Day Reserved Package)",
        mountainReady: true,
        badge: "Most Popular",
      },
      {
        category: "Mountain SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Passengers + 4 Bags",
        oneWayFare: "₹3,799 (Guwahati Airport to Shillong Drop)",
        roundTripFare: "₹7,499 (2-Day Reserved Package)",
        mountainReady: true,
        badge: "Family Pick",
      },
      {
        category: "Premium Mountain SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        seating: "6-7 Passengers + 5 Bags",
        oneWayFare: "₹5,299 (Luxury Mountain Transfer)",
        roundTripFare: "₹9,999 (2-Day Reserved Package)",
        mountainReady: true,
        badge: "VIP Luxury",
      },
      {
        category: "Tempo Traveller (13/17 Seater)",
        model: "Force Urbania / Traveller AC",
        seating: "13-17 Passengers",
        oneWayFare: "₹7,999 (Group Transfer)",
        roundTripFare: "₹15,499 (Multi-Day Meghalaya Tour)",
        mountainReady: true,
      },
    ],
    scenicStops: [
      {
        place: "Nongpoh Highway Refreshment Stop",
        desc: "Charming halfway town famous for authentic bamboo shoot pickles, organic pineapples, and fresh Assamese tea.",
      },
      {
        place: "Umiam Lake (Barapani) Viewpoint",
        desc: "Mesmerizing turquoise reservoir surrounded by sylvan Khasi pine forests and water sports complex.",
      },
      {
        place: "Elephant Falls & Shillong Peak",
        desc: "Cascading three-tier waterfall and the highest peak in Meghalaya offering bird's-eye views of Shillong city.",
      },
    ],
    itinerary: [
      {
        stage: "Airport Terminal",
        title: "Meet & Greet at Guwahati Airport (GAU)",
        desc: "Your chauffeur meets you at the arrival exit, assists with luggage, and sets off onto the national highway.",
      },
      {
        stage: "Assam-Meghalaya Border",
        title: "Khanapara / Jorabat to Nongpoh (1.5 hrs)",
        desc: "Cross from Assam into the lush green hills of Meghalaya at Jorabat and cruise along the 4-lane expressway.",
      },
      {
        stage: "Barapani Wonder",
        title: "Nongpoh to Umiam Lake (1 hr)",
        desc: "Winding climb through pine-scented hills, arriving at the breathtaking vistas of Umiam Lake for tea and photography.",
      },
      {
        stage: "Shillong City Drop",
        title: "Drop at Hotel in Police Bazar / Laitumkhrah",
        desc: "Direct drop right at your hotel or homestay in Shillong with complete luggage assistance.",
      },
    ],
    mountainSafety: [
      "All-weather radial tyres and mountain certified braking systems",
      "Punctual flight tracking for all domestic arrivals at Guwahati LGBI Airport",
      "Complimentary bottled water and sanitized AC cabins",
    ],
    faqs: [
      {
        question: "How long does it take from Guwahati Airport to Shillong?",
        answer:
          "The distance is approximately 120 km. Thanks to the smooth 4-lane national expressway (NH 6), it typically takes only 3 to 3.5 hours including a tea stop at Nongpoh or Umiam Lake.",
      },
      {
        question: "Can we continue directly to Cherrapunji (Sohra) or Dawki?",
        answer:
          "Yes! We offer same-day direct transfers from Guwahati Airport to Cherrapunji (Sohra), Dawki Umngot River, and Mawlynnong for an additional custom itinerary fee.",
      },
      {
        question: "Is the road between Guwahati and Shillong safe for night driving?",
        answer:
          "Yes, NH 6 is a fully paved, illuminated, 4-lane expressway with active highway patrol. Our seasoned drivers frequently operate late evening transfers safely.",
      },
    ],
  },
};

export function parseReservedCabSlug(rawSlug: string): ReservedCabRoute | null {
  if (!rawSlug) return null;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  return RESERVED_CABS_MAP[decoded] || null;
}
