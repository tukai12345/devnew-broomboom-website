export interface ShoppingMallDetail {
  slug: string;
  name: string;
  mallType: "Iconic Open-Air Plaza" | "Luxury High-End Retail" | "Waterfront Mega Mall" | "Fashion & Entertainment Hub";
  location: string;
  zone: "Salt Lake Sector 1" | "Ballygunge / Park Circus" | "Shibpur Howrah" | "Kasba / EM Bypass";
  landmarksNearby: string;
  openingHours: string;
  keyAttractions: string[];
  startingPrice: number;
  image: string;
  highlights: string[];
  description: string;
  fleetFares: {
    category: string;
    model: string;
    seating: string;
    bootCapacity: string;
    pointToPointFare: string;
    package4hr: string;
    package8hr: string;
    extraPerKm: string;
    badge?: string;
  }[];
  popularCorridors: {
    fromArea: string;
    duration: string;
    distance: string;
    routeVia: string;
  }[];
  shoppingTips: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SHOPPING_MALL_SLUGS = [
  "citycenter1mall",
  "questmall",
  "avaniriversidemall",
  "acropolismall",
] as const;

export const SHOPPING_MALLS_MAP: Record<string, ShoppingMallDetail> = {
  citycenter1mall: {
    slug: "citycenter1mall",
    name: "City Centre 1 Mall Salt Lake",
    mallType: "Iconic Open-Air Plaza",
    location: "Block DC, Sector 1, Bidhannagar, Salt Lake, Kolkata, West Bengal 700064",
    zone: "Salt Lake Sector 1",
    landmarksNearby: "Near Salt Lake Central Park, Labony Estate, Karunamoyee",
    openingHours: "10:30 AM – 10:00 PM (Daily)",
    keyAttractions: [
      "The iconic central Kund plaza with open-air steps and vibrant evening gatherings.",
      "Cinepolis multiplex cinema with 4 modern screens.",
      "Anchor stores: Shoppers Stop, Reliance Digital, Fabindia, Pantaloons.",
      "Culinary hub featuring Afraa Lounge, Tea Junction, Haldiram's, and global food court.",
      "Dedicated cab boarding lanes right outside Gate 1 and Gate 3.",
    ],
    startingPrice: 249,
    image: "/blogs/broomboom-cab-companies-kolkata.jpg",
    highlights: [
      "Designed by legendary architect Charles Correa, offering a pedestrian-friendly open-air shopping paradise.",
      "Eliminates Salt Lake Sector 1 underground parking queues with direct curbside drop-off and pickup.",
      "Spacious sedan boots to accommodate retail shopping bags, apparel, electronics, and home decor.",
      "Zero ride cancellations after late-night movie shows ending past 11:30 PM.",
      "Sanitized AC cars with polite drivers who assist with shopping bags.",
    ],
    description:
      "City Centre 1 in Salt Lake is Kolkata's most beloved urban hangout and shopping landmark. Conceived by visionary architect Charles Correa without artificial enclosed mall boundaries, CC1 integrates open-sky plazas with premium retail outlets, high-end cafes, and Cinepolis multiplex. Parking on crowded weekends can take 30 to 45 minutes; BroomBoom Cabs offers convenient doorstep pickup and drop-off, allowing you to enjoy your shopping, dining, and movies without parking anxiety.",
    fleetFares: [
      {
        category: "Hatchback (WagonR / Tiago)",
        model: "WagonR, Tiago AC",
        seating: "4 Shoppers",
        bootCapacity: "2 Large Shopping Bags",
        pointToPointFare: "₹249 - ₹399",
        package4hr: "₹999 (4 Hr / 40 Km)",
        package8hr: "₹1,799 (8 Hr / 80 Km)",
        extraPerKm: "₹11/km",
      },
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Shoppers",
        bootCapacity: "4-5 Large Shopping Bags (Spacious Boot)",
        pointToPointFare: "₹299 - ₹499",
        package4hr: "₹1,199 (4 Hr / 40 Km)",
        package8hr: "₹1,999 (8 Hr / 80 Km)",
        extraPerKm: "₹12.5/km",
        badge: "Shopper's Choice",
      },
      {
        category: "Family SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Shoppers",
        bootCapacity: "6+ Bags (Foldable Third Row)",
        pointToPointFare: "₹449 - ₹699",
        package4hr: "₹1,699 (4 Hr / 40 Km)",
        package8hr: "₹2,799 (8 Hr / 80 Km)",
        extraPerKm: "₹16/km",
        badge: "Family Outing",
      },
    ],
    popularCorridors: [
      {
        fromArea: "Ultadanga / Kankurgachi / Phoolbagan",
        duration: "15 - 20 mins",
        distance: "5 km",
        routeVia: "Salt Lake Bypass ➔ 1st Avenue ➔ CC1 Gate 1",
      },
      {
        fromArea: "New Town / Rajarhat / Chinar Park",
        duration: "20 - 25 mins",
        distance: "9 km",
        routeVia: "Major Arterial Road ➔ Karunamoyee ➔ 3rd Avenue",
      },
      {
        fromArea: "South Kolkata (Gariahat / Ruby / Park Circus)",
        duration: "30 - 45 mins",
        distance: "14 km",
        routeVia: "Maa Flyover / EM Bypass ➔ Salt Lake Sector 1",
      },
      {
        fromArea: "Howrah Station / Central Kolkata",
        duration: "35 - 45 mins",
        distance: "12 km",
        routeVia: "MG Road ➔ Sealdah ➔ Maniktala ➔ Salt Lake Gate",
      },
    ],
    shoppingTips: [
      "Book an 8-hour / 80-km rental package to combine shopping at CC1 with dining and evening movies without booking separate taxis.",
      "Instruct your driver to meet you at Gate 1 (near Afraa / Central Kund entrance) for the quickest curbside pickup.",
      "Store heavy shopping bags securely inside the locked boot between store visits.",
    ],
    faqs: [
      {
        question: "Can the driver wait while we watch a 3-hour movie at Cinepolis CC1?",
        answer:
          "Yes! With our 4-hour or 8-hour hourly rental packages, your dedicated chauffeur waits in the official parking lot and pulls up immediately to the gate when your show ends.",
      },
      {
        question: "Are late-night cabs available after 11:00 PM outside City Centre 1?",
        answer:
          "Yes, BroomBoom provides 24x7 confirmed cab bookings. Pre-book your return ride and your driver will be waiting outside the gate when the mall closes.",
      },
      {
        question: "Can we request a sedan with a big boot for large appliance or sale shopping?",
        answer:
          "Yes! Our Dzire and Etios sedans feature spacious 400+ liter boots, ideal for shopping bags, home appliances, and festive retail sprees.",
      },
    ],
  },

  questmall: {
    slug: "questmall",
    name: "Quest Mall Ballygunge",
    mallType: "Luxury High-End Retail",
    location: "33, Syed Amir Ali Avenue, Park Circus, Ballygunge, Kolkata, West Bengal 700017",
    zone: "Ballygunge / Park Circus",
    landmarksNearby: "Near Park Circus 7-Point Crossing, Don Bosco School, Birla Mandir",
    openingHours: "11:00 AM – 10:00 PM (Daily)",
    keyAttractions: [
      "Eastern India's premier luxury brand destination: Gucci, Michael Kors, Rolex, Canali, Coach, Emporio Armani.",
      "Inox Insignia 7-star luxury multiplex featuring plush recliners and gourmet live kitchen service.",
      "Spencers Gourmet Hypermarket for imported international cheeses, meats, and confectioneries.",
      "Fine dining enclave: Bombay Brasserie, Yauatcha, Smoke House Deli, The Irish House, Chili's.",
      "Grand multi-tier underground parking with valet concierge.",
    ],
    startingPrice: 269,
    image: "/blogs/maa-durga-face-kumartuli.jpg",
    highlights: [
      "Kolkata's most prestigious luxury lifestyle destination located at the core of South Kolkata.",
      "Curbside executive drop-off right at the glamorous grand glass portico on Syed Amir Ali Avenue.",
      "Avoids the notoriously slow basement valet parking retrieval queues on peak weekend evenings.",
      "Premium Sedans and Toyota Innova Crysta fleet with impeccably attired chauffeurs.",
      "24x7 prompt airport transfers connecting Quest Mall directly to Kolkata Airport (CCU).",
    ],
    description:
      "Quest Mall on Syed Amir Ali Avenue in Ballygunge is the pinnacle of luxury shopping, fine dining, and entertainment in eastern India. Boasting international couture houses, fine-dining restaurants, and the celebrated Inox Insignia luxury cinema, Quest Mall draws fashion connoisseurs, film enthusiasts, and food lovers from across Bengal. With BroomBoom Cabs, experience VIP curbside drop-off and pickup in executive air-conditioned vehicles, eliminating traffic hassle around the busy Park Circus crossing.",
    fleetFares: [
      {
        category: "Executive Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Shoppers",
        bootCapacity: "4 Large Shopping Bags",
        pointToPointFare: "₹269 - ₹449",
        package4hr: "₹1,249 (4 Hr / 40 Km)",
        package8hr: "₹2,099 (8 Hr / 80 Km)",
        extraPerKm: "₹12.5/km",
        badge: "Most Popular",
      },
      {
        category: "Family SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Shoppers",
        bootCapacity: "5-6 Bags",
        pointToPointFare: "₹399 - ₹649",
        package4hr: "₹1,749 (4 Hr / 40 Km)",
        package8hr: "₹2,899 (8 Hr / 80 Km)",
        extraPerKm: "₹16/km",
      },
      {
        category: "Luxury VIP SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        seating: "6-7 Executives / Shoppers",
        bootCapacity: "6+ Bags (Luxury Luggage)",
        pointToPointFare: "₹649 - ₹999",
        package4hr: "₹2,399 (4 Hr / 40 Km)",
        package8hr: "₹3,899 (8 Hr / 80 Km)",
        extraPerKm: "₹21/km",
        badge: "VIP Luxury",
      },
    ],
    popularCorridors: [
      {
        fromArea: "Alipore / New Alipore / Burdwan Road",
        duration: "20 - 30 mins",
        distance: "7 km",
        routeVia: "D.L. Khan Road ➔ Exide ➔ Park Circus ➔ Quest",
      },
      {
        fromArea: "Salt Lake / Sector V / New Town",
        duration: "25 - 35 mins",
        distance: "12 km",
        routeVia: "Maa Flyover (Direct Exit at 7-Point) ➔ Quest Mall",
      },
      {
        fromArea: "Ballygunge / Gariahat / Golpark",
        duration: "10 - 15 mins",
        distance: "4 km",
        routeVia: "Gariahat Road ➔ Syed Amir Ali Avenue",
      },
      {
        fromArea: "Kolkata Airport (CCU)",
        duration: "35 - 45 mins",
        distance: "18 km",
        routeVia: "VIP Road ➔ EM Bypass ➔ Maa Flyover ➔ Quest",
      },
    ],
    shoppingTips: [
      "On Friday and Saturday evenings, Park Circus 7-point crossing experiences heavy traffic; booking an hourly cab lets you bypass the 30-minute valet queue.",
      "The dedicated passenger pickup lane is located directly beneath the main canopy on Syed Amir Ali Avenue.",
    ],
    faqs: [
      {
        question: "Can the cab pick us up right at Quest Mall's main entrance portico?",
        answer:
          "Yes! Our drivers pick up and drop passengers directly at the main entrance porch under the illuminated canopy on Syed Amir Ali Avenue.",
      },
      {
        question: "Can we book an Innova Crysta for a luxury shopping and dinner day?",
        answer:
          "Yes! We offer spotless Toyota Innova Crystas with plush captain seats, perfect for luxury shopping, fine dining at Yauatcha, and evening shows at Insignia.",
      },
    ],
  },

  avaniriversidemall: {
    slug: "avaniriversidemall",
    name: "Avani Riverside Mall Howrah",
    mallType: "Waterfront Mega Mall",
    location: "32, Jagat Banerjee Ghat Road, Shibpur, Howrah, West Bengal 711102",
    zone: "Shibpur Howrah",
    landmarksNearby: "Near Vidyasagar Setu (2nd Hooghly Bridge), Nabanna, Botanical Gardens",
    openingHours: "11:00 AM – 10:00 PM (Daily)",
    keyAttractions: [
      "Howrah's biggest and premier destination shopping mall covering over 600,000 sq ft.",
      "PVR Cinemas 4-screen multiplex with high-definition digital sound and recliners.",
      "Reliance Smart Bazaar, Pantaloons, Trends, Max Fashion, and Bata mega-stores.",
      "Expansive food court and family restaurants: McDonald's, KFC, Subway, Mainland China, Machaan.",
      "Direct scenic connectivity via Vidyasagar Setu (2nd Hooghly Bridge) just 5 mins from Nabanna.",
    ],
    startingPrice: 229,
    image: "/blogs/why-broomboom-intercity-travel.jpg",
    highlights: [
      "The ultimate shopping and entertainment destination for residents of Howrah, Hooghly, and South Kolkata.",
      "Smooth 10-minute drive across Vidyasagar Setu from Kolkata's Race Course and Hastings.",
      "Saves passengers from congested Howrah local spot taxis with guaranteed AC commercial cabs.",
      "Convenient round-trip waiting packages for shopping, grocery runs, and movies.",
      "Courteous drivers familiar with Howrah and Vidyasagar Setu traffic patterns.",
    ],
    description:
      "Avani Riverside Mall in Shibpur, Howrah is the crown jewel of retail and entertainment on the western bank of the Hooghly River. Spanning four sprawling retail floors with PVR multiplex, large hypermarkets, and waterfront dining, Avani draws tens of thousands of shoppers from Howrah, Kolkata, and the industrial belts of Shalimar and Santragachi. BroomBoom Cabs provides reliable, air-conditioned point-to-point and hourly rental taxis with effortless transit across Vidyasagar Setu.",
    fleetFares: [
      {
        category: "Hatchback (WagonR / Tiago)",
        model: "WagonR AC",
        seating: "4 Shoppers",
        bootCapacity: "2 Large Shopping Bags",
        pointToPointFare: "₹229 - ₹379",
        package4hr: "₹949 (4 Hr / 40 Km)",
        package8hr: "₹1,699 (8 Hr / 80 Km)",
        extraPerKm: "₹11/km",
        badge: "Budget Friendly",
      },
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Shoppers",
        bootCapacity: "4-5 Large Shopping Bags",
        pointToPointFare: "₹279 - ₹449",
        package4hr: "₹1,149 (4 Hr / 40 Km)",
        package8hr: "₹1,899 (8 Hr / 80 Km)",
        extraPerKm: "₹12.5/km",
        badge: "Most Popular",
      },
      {
        category: "Family SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Shoppers",
        bootCapacity: "6 Bags (Family Shopping)",
        pointToPointFare: "₹399 - ₹619",
        package4hr: "₹1,599 (4 Hr / 40 Km)",
        package8hr: "₹2,699 (8 Hr / 80 Km)",
        extraPerKm: "₹16/km",
      },
    ],
    popularCorridors: [
      {
        fromArea: "Central Kolkata (Park Street / Esplanade / Hastings)",
        duration: "15 - 20 mins",
        distance: "7 km",
        routeVia: "Vidyasagar Setu (2nd Hooghly Bridge) ➔ Nabanna ➔ Avani Mall",
      },
      {
        fromArea: "Howrah Station / Howrah Maidan",
        duration: "15 - 25 mins",
        distance: "6 km",
        routeVia: "Foreshore Road / GT Road ➔ Shibpur",
      },
      {
        fromArea: "South Kolkata (Alipore / Behala)",
        duration: "20 - 30 mins",
        distance: "9 km",
        routeVia: "D.H. Road ➔ Hastings ➔ 2nd Hooghly Bridge ➔ Avani",
      },
      {
        fromArea: "Santragachi / Kona Expressway",
        duration: "15 - 20 mins",
        distance: "8 km",
        routeVia: "Kona Expressway ➔ Toll Plaza ➔ Shibpur Link",
      },
    ],
    shoppingTips: [
      "Avani Riverside Mall is just 7 minutes from the 2nd Hooghly Bridge toll plaza, making it easier to reach from South Kolkata than many central malls.",
      "The open pickup area outside the main ground floor entrance allows easy loading of heavy Reliance Smart grocery trollies.",
    ],
    faqs: [
      {
        question: "Can a cab pick us up in Kolkata, take us to Avani Mall in Howrah, and bring us back?",
        answer:
          "Yes! Book our 4-hour or 8-hour city rental package. The driver crosses the Vidyasagar Setu, waits while you shop and dine at Avani Mall, and drops you back home safely.",
      },
      {
        question: "Are bridge tolls included in the fare?",
        answer:
          "Our quotes are 100% transparent. Any applicable Vidyasagar Setu toll charges are clearly itemized on your digital invoice with zero hidden markups.",
      },
    ],
  },

  acropolismall: {
    slug: "acropolismall",
    name: "Acropolis Mall Kasba",
    mallType: "Fashion & Entertainment Hub",
    location: "1858, Rajdanga Main Road, Shantipally, Kasba, Kolkata, West Bengal 700107",
    zone: "Kasba / EM Bypass",
    landmarksNearby: "Near Ruby General Hospital, Geetanjali Stadium, Kasba New Market, Ballygunge",
    openingHours: "10:30 AM – 10:00 PM (Daily)",
    keyAttractions: [
      "400,000 sq ft premium shopping haven on Rajdanga Main Road right off the EM Bypass.",
      "Cinepolis 4-screen multiplex cinema featuring cutting-edge Dolby Atmos acoustics.",
      "Flagship retail anchors: Shoppers Stop, Marks & Spencer, Vero Moda, ONLY, Jack & Jones, Skechers.",
      "Popular nightspots and dining: Hoppipola, Chili's, Wow! Momo, Mainland China, grand food court.",
      "Seamless proximity to South Kolkata's prominent residential hubs.",
    ],
    startingPrice: 229,
    image: "/blogs/gangasagar-mela.jpg",
    highlights: [
      "Strategic hub connecting South Kolkata (Ballygunge, Gariahat) with East Kolkata (EM Bypass, Ruby).",
      "Direct front drop-off bay avoiding the heavily congested Rajdanga Main Road parking queues.",
      "Spacious Sedans and Ertigas ideal for weekend cinema outings, family dinners, and festive shopping.",
      "Instant on-demand cab dispatch across Kasba, Jadavpur, Santoshpur, and Anandapur.",
      "Verified drivers, chilled AC, and GPS-monitored safe rides.",
    ],
    description:
      "Acropolis Mall on Rajdanga Main Road in Kasba is one of South-East Kolkata's premier shopping, dining, and multiplex destinations. Positioned close to the bustling EM Bypass and Ruby Hospital junction, Acropolis features world-class fashion brands, a bustling Cinepolis multiplex, and vibrant rooftop lounges like Hoppipola. Weekend parking around Rajdanga can be stressful; BroomBoom Cabs offers convenient, punctual cab rides right to the main entrance portico.",
    fleetFares: [
      {
        category: "Hatchback (WagonR / Tiago)",
        model: "WagonR, Tiago AC",
        seating: "4 Shoppers",
        bootCapacity: "2 Large Shopping Bags",
        pointToPointFare: "₹229 - ₹389",
        package4hr: "₹949 (4 Hr / 40 Km)",
        package8hr: "₹1,699 (8 Hr / 80 Km)",
        extraPerKm: "₹11/km",
        badge: "Budget Friendly",
      },
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Shoppers",
        bootCapacity: "4 Large Shopping Bags",
        pointToPointFare: "₹279 - ₹469",
        package4hr: "₹1,149 (4 Hr / 40 Km)",
        package8hr: "₹1,899 (8 Hr / 80 Km)",
        extraPerKm: "₹12.5/km",
        badge: "Shopper's Pick",
      },
      {
        category: "Family SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Shoppers",
        bootCapacity: "5-6 Bags",
        pointToPointFare: "₹399 - ₹629",
        package4hr: "₹1,599 (4 Hr / 40 Km)",
        package8hr: "₹2,699 (8 Hr / 80 Km)",
        extraPerKm: "₹16/km",
      },
    ],
    popularCorridors: [
      {
        fromArea: "Gariahat / Ballygunge / Dhakuria",
        duration: "10 - 15 mins",
        distance: "4 km",
        routeVia: "Gariahat Flyover ➔ Bijon Setu ➔ Kasba ➔ Acropolis",
      },
      {
        fromArea: "Jadavpur / Santoshpur / Garia",
        duration: "15 - 25 mins",
        distance: "6 km",
        routeVia: "EM Bypass ➔ Kalikapur ➔ Ruby ➔ Rajdanga Main Road",
      },
      {
        fromArea: "Salt Lake / Sector V / New Town",
        duration: "20 - 30 mins",
        distance: "11 km",
        routeVia: "EM Bypass ➔ Science City ➔ VIP Bazar ➔ Acropolis",
      },
      {
        fromArea: "Behala / New Alipore / Tollygunge",
        duration: "25 - 40 mins",
        distance: "10 km",
        routeVia: "Tollygunge Circular Road ➔ Southern Avenue ➔ Kasba",
      },
    ],
    shoppingTips: [
      "Pickups outside Acropolis are smoothest at the designated drop-off portico on Rajdanga Main Road.",
      "On Sunday evenings, avoid driving and parking queues by booking a round-trip BroomBoom cab with waiting.",
    ],
    faqs: [
      {
        question: "Where will the cab wait during our Cinepolis movie at Acropolis Mall?",
        answer:
          "For hourly rental bookings, your driver parks in the designated parking area near Geetanjali Stadium / Rajdanga and arrives at the mall porch in 2 minutes upon your call.",
      },
      {
        question: "Can we book an immediate cab after late dinner at Hoppipola or Chili's?",
        answer:
          "Yes! BroomBoom provides instant 24x7 cab booking across Kasba and EM Bypass, with cabs reaching Acropolis in 10-15 minutes.",
      },
    ],
  },
};

export function parseShoppingMallSlug(rawSlug: string): ShoppingMallDetail | null {
  if (!rawSlug) return null;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  return SHOPPING_MALLS_MAP[decoded] || null;
}
