export interface CorporateDetail {
  slug: string;
  name: string;
  companyName: string;
  campusName: string;
  hubLocation: string;
  zone: "Sector V Salt Lake" | "New Town Action Area" | "Rajarhat" | "Bantala IT SEZ";
  distanceFromAirport: string;
  distanceFromHowrah: string;
  shiftTimings: string[];
  popularPickupZones: string[];
  employeeCountEstimate: string;
  suggestedPackage: string;
  startingPricePerTrip: number;
  monthlyPassEstimate: number;
  image: string;
  fleetOptions: {
    vehicle: string;
    model: string;
    seating: string;
    perTripRate: string;
    monthlyPerSeat: string;
    dedicatedCabMonthly: string;
    badge?: string;
  }[];
  itineraryCorridors: {
    fromArea: string;
    duration: string;
    distance: string;
    peakHours: string;
    routeVia: string;
  }[];
  highlights: string[];
  description: string;
  complianceFeatures: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const CORPORATE_PICK_DROP_SLUGS = [
  "tcs",
  "technopolis",
  "wipro",
  "infosys",
  "hcl",
  "cognizant",
  "concentrix",
  "accenture",
] as const;

export const CORPORATE_DETAILS_MAP: Record<string, CorporateDetail> = {
  tcs: {
    slug: "tcs",
    name: "TCS Kolkata (Gitanjali Park & Delta Park)",
    companyName: "Tata Consultancy Services (TCS)",
    campusName: "TCS Gitanjali Park (New Town) & TCS Delta Park (Sector V)",
    hubLocation: "Gitanjali Park, Major Arterial Road, Action Area II, New Town & Delta Park, Salt Lake Sector V, Kolkata",
    zone: "New Town Action Area",
    distanceFromAirport: "12 km (approx 20 mins via Major Arterial Road)",
    distanceFromHowrah: "18 km (approx 45 mins via Maa Flyover / EM Bypass)",
    employeeCountEstimate: "40,000+ Associates",
    shiftTimings: [
      "Morning General Shift: 08:30 AM / 09:00 AM - 05:30 PM / 06:00 PM",
      "UK Shift: 12:30 PM / 01:30 PM - 09:30 PM / 10:30 PM",
      "US Shift (Night): 06:30 PM / 08:00 PM - 03:30 AM / 05:00 AM",
      "24x7 Rotational Global Production Support Shuttles",
    ],
    popularPickupZones: [
      "Tollygunge & Garia (via EM Bypass)",
      "Howrah & Shalimar Station (via Vidyasagar Setu - Maa Flyover)",
      "Behala & New Alipore (via Diamond Harbour Rd - Taratala)",
      "Dum Dum & Nagerbazar (via VIP Road - New Town Gate)",
      "Barasat, Madhyamgram & Airport Environs",
      "Dunlop, Belgharia & BT Road Corridor",
    ],
    suggestedPackage: "Dedicated Monthly Employee Cab or Per-Shift Roster Contract",
    startingPricePerTrip: 249,
    monthlyPassEstimate: 3499,
    image: "/blogs/broomboom-cab-companies-kolkata.jpg",
    highlights: [
      "Direct pick and drop for TCS Gitanjali Park (AA II) and TCS Delta Park (Sector V).",
      "99.8% on-time arrival guarantee to match strict TCS gate security access timeframes.",
      "Strict Female Employee Night Safety Protocol: Guard escorts for post-8 PM drop-offs, doorstep verification, and SOS tracking.",
      "Live GPS fleet monitoring dashboard with automated MIS attendance logs for HR / Transport Teams.",
      "All commercial yellow-plate cars with verified police-checked chauffeurs.",
    ],
    description:
      "Tata Consultancy Services is Kolkata's largest IT employer, with massive world-class campuses at Gitanjali Park in New Town Action Area II and Delta Park in Salt Lake Sector V. Thousands of associates require reliable, punctual, and comfortable daily office commuting across day, UK, and US night shifts. BroomBoom Corporate Cab Solutions provides dedicated employee transportation fleets, shared cab pooling rosters, and executive on-demand cabs for TCS professionals across Kolkata, Howrah, Hooghly, and 24 Parganas.",
    fleetOptions: [
      {
        vehicle: "Sedan (Dzire / Etios)",
        model: "Maruti Dzire / Toyota Etios AC",
        seating: "4 Associates",
        perTripRate: "₹249 - ₹499 / trip",
        monthlyPerSeat: "₹3,499 - ₹4,499 / seat",
        dedicatedCabMonthly: "₹38,000 / month",
        badge: "Most Popular",
      },
      {
        vehicle: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga / Kia Carens AC",
        seating: "6 Associates",
        perTripRate: "₹349 - ₹649 / trip",
        monthlyPerSeat: "₹2,999 - ₹3,899 / seat",
        dedicatedCabMonthly: "₹48,000 / month",
        badge: "Cost-Effective Pooling",
      },
      {
        vehicle: "Tempo Traveller (13/17/26 Seater)",
        model: "Force Urbania / Traveller AC",
        seating: "13 - 26 Associates",
        perTripRate: "₹699 - ₹1,299 / trip",
        monthlyPerSeat: "₹2,199 - ₹2,799 / seat",
        dedicatedCabMonthly: "₹72,000 / month",
        badge: "Staff Shuttle",
      },
    ],
    itineraryCorridors: [
      {
        fromArea: "Howrah Station / Mandirtala",
        duration: "45 - 55 mins",
        distance: "21 km",
        peakHours: "07:30 AM - 09:30 AM & 06:00 PM - 08:30 PM",
        routeVia: "Vidyasagar Setu ➔ Maa Flyover ➔ Salt Lake Bypass ➔ New Town",
      },
      {
        fromArea: "Garia / Tollygunge / Jadavpur",
        duration: "40 - 50 mins",
        distance: "19 km",
        peakHours: "08:00 AM - 10:00 AM & 05:30 PM - 08:00 PM",
        routeVia: "EM Bypass ➔ Chingrighata Flyover ➔ New Town MAR",
      },
      {
        fromArea: "Dum Dum / VIP Road / Airport",
        duration: "20 - 30 mins",
        distance: "11 km",
        peakHours: "08:30 AM - 10:00 AM & 06:00 PM - 07:30 PM",
        routeVia: "VIP Road ➔ Major Arterial Road ➔ Gitanjali Park",
      },
      {
        fromArea: "Behala Chowrasta / Taratala",
        duration: "55 - 70 mins",
        distance: "24 km",
        peakHours: "07:30 AM - 09:30 AM & 06:30 PM - 09:00 PM",
        routeVia: "Alipore ➔ Exide Crossing ➔ Maa Flyover ➔ New Town",
      },
    ],
    complianceFeatures: [
      "GPS tracking & Geo-fencing on all vehicles",
      "Mandatory Police Verification & background checks of all drivers",
      "Speed governors calibrated to 60-80 km/h as per transport norms",
      "Centralized 24x7 SOS emergency response desk in Kolkata",
      "Female security guard accompaniment for solo late-night drop-offs",
      "Paperless digital trip log & automated corporate monthly GST invoicing",
    ],
    faqs: [
      {
        question: "Can individual TCS associates book monthly pick-and-drop seats?",
        answer:
          "Yes! Associates can book individual monthly seats in our scheduled AC office carpools, with guaranteed fixed seats, pre-set pickup timings, and zero surge pricing.",
      },
      {
        question: "How does BroomBoom ensure safety for TCS associates on night shifts?",
        answer:
          "For late-night pickups and drops between 8:00 PM and 6:00 AM, we enforce strict compliance: door-to-door escort until the associate reaches inside their apartment gate, female security marshal accompaniment for single female passengers, live GPS tracking, and confirmation SMS to emergency contacts.",
      },
      {
        question: "Can TCS transport managers contract dedicated fleet operations?",
        answer:
          "Yes, we offer enterprise SLA contracts including dedicated fleet deployment (Sedans, Ertigas, and 13-26 seater Force Urbania shuttles), custom shift routing, driver biometric check-ins, and unified GST invoicing.",
      },
    ],
  },

  technopolis: {
    slug: "technopolis",
    name: "Technopolis IT Hub Kolkata",
    companyName: "Technopolis Tech Park (Sector V)",
    campusName: "Technopolis Building, BP Block",
    hubLocation: "BP-4, Sector V, Salt Lake, Kolkata, West Bengal 700091",
    zone: "Sector V Salt Lake",
    distanceFromAirport: "14 km (approx 25 mins via VIP Road / Rajarhat)",
    distanceFromHowrah: "15 km (approx 35 mins via Maa Flyover)",
    employeeCountEstimate: "15,000+ Tech Professionals across multiple MNCs",
    shiftTimings: [
      "General Tech Shift: 09:00 AM - 06:00 PM",
      "Support Shift: 11:00 AM - 08:00 PM",
      "International Operations: 02:00 PM - 11:00 PM & 09:00 PM - 06:00 AM",
    ],
    popularPickupZones: [
      "Ultadanga & Kankurgachi Corridor",
      "Ruby Hospital & Anandapur (EM Bypass)",
      "Sealdah & Phoolbagan Junctions",
      "Shyam Bazar, Hatibagan & North Kolkata",
      "Santoshpur & Jadavpur University Area",
      "Howrah Maidan & Central Kolkata",
    ],
    suggestedPackage: "Shared Commuter Shuttle or Dedicated Sector V Corporate Cab",
    startingPricePerTrip: 199,
    monthlyPassEstimate: 3199,
    image: "/blogs/offbeat-destinations-bengal.jpg",
    highlights: [
      "Prime Sector V landmark housing dozens of IT MNCs, start-ups, and consulting firms.",
      "Direct drop-off at BP Block gate with designated employee boarding zones.",
      "Avoids Sector V morning traffic bottlenecks via optimized flyover routing.",
      "Monthly subscriptions available for individual employees or corporate corporate teams.",
      "Electric (EV) and clean fuel AC fleet options.",
    ],
    description:
      "Technopolis in BP Block, Sector V, Salt Lake is one of eastern India's pioneer green IT landmarks. Housing dozens of cutting-edge technology companies, digital agencies, and global outsourcing firms, Technopolis sees massive daily employee transit. BroomBoom Cabs provides tailored pick-and-drop solutions for professionals commuting to Technopolis, offering punctual doorstep pickups across North, South, and Central Kolkata, as well as suburban stations.",
    fleetOptions: [
      {
        vehicle: "Sedan (Dzire / Etios)",
        model: "Swift Dzire AC",
        seating: "4 Professionals",
        perTripRate: "₹229 - ₹449 / trip",
        monthlyPerSeat: "₹3,299 - ₹4,199 / seat",
        dedicatedCabMonthly: "₹36,000 / month",
        badge: "Executive Favorite",
      },
      {
        vehicle: "SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Professionals",
        perTripRate: "₹319 - ₹589 / trip",
        monthlyPerSeat: "₹2,799 - ₹3,599 / seat",
        dedicatedCabMonthly: "₹46,000 / month",
        badge: "Best Value Pooling",
      },
      {
        vehicle: "Staff Shuttle (17 Seater)",
        model: "Force Traveller AC",
        seating: "17 Passengers",
        perTripRate: "₹749 - ₹1,199 / trip",
        monthlyPerSeat: "₹1,999 - ₹2,599 / seat",
        dedicatedCabMonthly: "₹68,000 / month",
      },
    ],
    itineraryCorridors: [
      {
        fromArea: "Ultadanga / Kankurgachi / Phoolbagan",
        duration: "20 - 30 mins",
        distance: "7 km",
        peakHours: "08:30 AM - 10:00 AM & 06:00 PM - 07:30 PM",
        routeVia: "Salt Lake Bypass ➔ College More ➔ Technopolis",
      },
      {
        fromArea: "Ruby More / Kasba / Kalikapur",
        duration: "30 - 40 mins",
        distance: "11 km",
        peakHours: "08:15 AM - 09:45 AM & 06:15 PM - 08:00 PM",
        routeVia: "EM Bypass ➔ Chingrighata ➔ Webel More ➔ Technopolis",
      },
      {
        fromArea: "Central Kolkata (Park Circus / Esplanade)",
        duration: "35 - 45 mins",
        distance: "13 km",
        peakHours: "08:30 AM - 10:00 AM & 06:30 PM - 08:30 PM",
        routeVia: "Maa Flyover ➔ Salt Lake Sector V Ring Road",
      },
    ],
    complianceFeatures: [
      "GPS tracking with employee mobile app alerts",
      "Pre-assigned fixed drivers for daily route familiarity",
      "Air-conditioned sanitized cabins with sanitizers and water",
      "24x7 control room emergency response",
      "Transparent invoicing with input tax credit for registered companies",
    ],
    faqs: [
      {
        question: "Where does the driver drop at Technopolis?",
        answer:
          "The driver drops employees directly at the main entrance security bay of Technopolis in BP Block, eliminating long walks under the sun or rain.",
      },
      {
        question: "Can multiple employees from the same building share a monthly cab?",
        answer:
          "Yes! If 3-4 colleagues commute along the same route to Technopolis, our group pooling plan offers up to 35% savings per employee compared to individual daily taxis.",
      },
    ],
  },

  wipro: {
    slug: "wipro",
    name: "Wipro Technologies Kolkata",
    companyName: "Wipro Limited",
    campusName: "Wipro Salt Lake Campus (Sector V)",
    hubLocation: "Plot No. 8, Block DM, Sector V, Salt Lake, Kolkata, West Bengal 700091",
    zone: "Sector V Salt Lake",
    distanceFromAirport: "13 km (approx 22 mins via New Town Express Link)",
    distanceFromHowrah: "16 km (approx 40 mins via Maa Flyover)",
    employeeCountEstimate: "18,000+ Software Engineers & Consultants",
    shiftTimings: [
      "Standard Shift: 08:30 AM / 09:30 AM - 05:30 PM / 06:30 PM",
      "Europe Shift: 01:00 PM - 10:00 PM",
      "US Shift: 07:30 PM - 04:30 AM",
      "Cloud & Data Center 24x7 Rota Shuttles",
    ],
    popularPickupZones: [
      "Salt Lake City (All Blocks AA to FD)",
      "Lake Town & Bangur Avenue",
      "Gariahat, Golpark & South Kolkata",
      "Chinar Park & Rajarhat Main Road",
      "Baranagar & Belgharia (via Belghoria Expressway)",
      "Howrah AC / Kona Expressway Hubs",
    ],
    suggestedPackage: "Fixed Schedule Monthly Commute or Corporate Transport Contract",
    startingPricePerTrip: 219,
    monthlyPassEstimate: 3399,
    image: "/blogs/why-broomboom-intercity-travel.jpg",
    highlights: [
      "Expansive dedicated campus in Sector V's DM Block with multi-gate access.",
      "Dedicated pick-and-drop slots matching Wipro's global delivery schedules.",
      "Zero ride cancellations: guaranteed dedicated cabs that arrive 10 minutes prior to shift pickup.",
      "Compliant with international corporate safety standards and IT/ITeS employee transport norms.",
      "Seamless door-to-desk pickup for team members across Greater Kolkata.",
    ],
    description:
      "Wipro's sprawling campus in Block DM, Sector V is a premier development center in West Bengal. Managing client operations across North America, Europe, and Asia-Pacific, Wipro engineers operate in diverse shift windows. BroomBoom Cabs provides reliable, air-conditioned employee transport solutions for Wipro professionals, eliminating peak-hour stress and public transit congestion with dedicated, punctual drivers.",
    fleetOptions: [
      {
        vehicle: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Associates",
        perTripRate: "₹239 - ₹469 / trip",
        monthlyPerSeat: "₹3,399 - ₹4,299 / seat",
        dedicatedCabMonthly: "₹37,000 / month",
        badge: "Preferred Choice",
      },
      {
        vehicle: "SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Associates",
        perTripRate: "₹329 - ₹599 / trip",
        monthlyPerSeat: "₹2,899 - ₹3,699 / seat",
        dedicatedCabMonthly: "₹47,000 / month",
        badge: "Team Carpool",
      },
      {
        vehicle: "Force Urbania / Traveller",
        model: "17-26 Seater AC",
        seating: "17 - 26 Associates",
        perTripRate: "₹799 - ₹1,299 / trip",
        monthlyPerSeat: "₹2,099 - ₹2,699 / seat",
        dedicatedCabMonthly: "₹70,000 / month",
      },
    ],
    itineraryCorridors: [
      {
        fromArea: "South Kolkata (Gariahat / Golpark / Dhakuria)",
        duration: "35 - 45 mins",
        distance: "14 km",
        peakHours: "08:15 AM - 09:45 AM & 06:00 PM - 08:00 PM",
        routeVia: "Ruby ➔ Chingrighata ➔ Nicco Park Road ➔ Wipro More",
      },
      {
        fromArea: "Lake Town / Bangur / Dum Dum",
        duration: "25 - 35 mins",
        distance: "9 km",
        peakHours: "08:30 AM - 10:00 AM & 06:15 PM - 07:45 PM",
        routeVia: "VIP Road ➔ Ultadanga Flyover ➔ Sector V",
      },
    ],
    complianceFeatures: [
      "SOS button enabled in all cabs with real-time panic alarm relay",
      "Seatbelts mandatory on all passenger seats",
      "Daily vehicle sanitization & AC filter checks",
      "Digital driver attendance & vehicle speed compliance reports",
    ],
    faqs: [
      {
        question: "Can Wipro employees book emergency cabs for odd-hour shifts?",
        answer:
          "Yes, BroomBoom operates a dedicated 24x7 corporate hotline (+91 70035 89163) for on-demand dispatch within 15-20 minutes across Kolkata.",
      },
      {
        question: "Are toll charges included in monthly subscriptions?",
        answer:
          "Yes, our monthly corporate commuter passes can be configured with all toll taxes (Maa Flyover, Vidyasagar Setu) pre-included for smooth transit without stops.",
      },
    ],
  },

  infosys: {
    slug: "infosys",
    name: "Infosys Kolkata Campus",
    companyName: "Infosys Limited",
    campusName: "Infosys New Town Development Center (Action Area III)",
    hubLocation: "Plot No. IIIF/1, Action Area III, New Town, Kolkata, West Bengal 700160",
    zone: "New Town Action Area",
    distanceFromAirport: "17 km (approx 25 mins via Major Arterial Road South)",
    distanceFromHowrah: "26 km (approx 55 mins via Maa Flyover - Rajarhat)",
    employeeCountEstimate: "5,000+ Growing Software Engineers",
    shiftTimings: [
      "Standard Tech Shift: 09:00 AM - 06:00 PM",
      "Flexible Engineering Shift: 10:00 AM - 07:00 PM",
      "Global Client Support: 01:30 PM - 10:30 PM & Night Shift",
    ],
    popularPickupZones: [
      "Salt Lake (Sector I, II, III & Sector V)",
      "New Town (Action Area I, II, Shapoorji Complex)",
      "Beliaghata, Phoolbagan & EM Bypass",
      "Kolkata Airport, Chinar Park & City Centre 2",
      "Jadavpur, Santoshpur & Mukundapur",
      "Howrah & Central Business District",
    ],
    suggestedPackage: "New Town Action Area III Dedicated Commuter Shuttle / Sedan",
    startingPricePerTrip: 269,
    monthlyPassEstimate: 3699,
    image: "/blogs/republic-day-2025.png",
    highlights: [
      "Newest state-of-the-art 50-acre software development campus in Action Area III.",
      "Solves the last-mile connectivity challenge of Action Area III with point-to-point AC cabs.",
      "Doorstep morning pickup and evening return dropping right at your society gate.",
      "Corporate pooling packages for Shapoorji, Elita Garden Vista, and South Kolkata commuters.",
      "Real-time GPS tracking and dedicated support desk.",
    ],
    description:
      "Infosys's massive 50-acre software development center in Action Area III, New Town is an ultra-modern workplace for thousands of tech professionals. Being located in New Town's developing southern corridor, reliable public transit can be sparse during early morning and late night shift hours. BroomBoom Cabs bridges this critical gap by providing punctual, air-conditioned employee pick-and-drop cabs and company shuttles connecting Infosys with all residential zones of Kolkata.",
    fleetOptions: [
      {
        vehicle: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Infoscions",
        perTripRate: "₹269 - ₹529 / trip",
        monthlyPerSeat: "₹3,699 - ₹4,599 / seat",
        dedicatedCabMonthly: "₹39,000 / month",
        badge: "Most Comfortable",
      },
      {
        vehicle: "SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Infoscions",
        perTripRate: "₹369 - ₹699 / trip",
        monthlyPerSeat: "₹3,099 - ₹3,899 / seat",
        dedicatedCabMonthly: "₹49,000 / month",
        badge: "Popular Carpool",
      },
      {
        vehicle: "Staff Shuttle (17 Seater)",
        model: "Force Urbania AC",
        seating: "17 Infoscions",
        perTripRate: "₹849 - ₹1,399 / trip",
        monthlyPerSeat: "₹2,299 - ₹2,899 / seat",
        dedicatedCabMonthly: "₹74,000 / month",
      },
    ],
    itineraryCorridors: [
      {
        fromArea: "Salt Lake (Karunamoyee / Sector V)",
        duration: "25 - 35 mins",
        distance: "13 km",
        peakHours: "08:30 AM - 09:45 AM & 06:15 PM - 07:30 PM",
        routeVia: "New Town Major Arterial Road ➔ AA III Infosys Gate",
      },
      {
        fromArea: "South Kolkata (Ruby / EM Bypass / Garia)",
        duration: "45 - 60 mins",
        distance: "22 km",
        peakHours: "08:00 AM - 09:30 AM & 06:00 PM - 08:00 PM",
        routeVia: "EM Bypass ➔ Chingrighata ➔ Rajarhat Express Link ➔ Infosys",
      },
    ],
    complianceFeatures: [
      "GPS tracking with geo-fenced campus entry verification",
      "Night shift female associate safety drop protocols",
      "Regular vehicle sanitation and air conditioning audits",
      "24x7 driver background verification and identity screening",
    ],
    faqs: [
      {
        question: "How does BroomBoom solve transport for Action Area III where buses are limited?",
        answer:
          "We offer fixed-schedule shared employee shuttles and dedicated cabs that pick you up from your doorstep in Salt Lake, New Town, or South Kolkata and drop you right inside the Infosys security perimeter.",
      },
      {
        question: "Can Infosys project teams book ad-hoc cabs for late night releases?",
        answer:
          "Yes! Project leads can book on-demand executive sedans or Ertigas with 30-minute notice for team releases and critical deploy nights.",
      },
    ],
  },

  hcl: {
    slug: "hcl",
    name: "HCL Technologies Kolkata",
    companyName: "HCLTech",
    campusName: "HCL Kolkata Center (Sector V)",
    hubLocation: "Plot No. 1, Block EN, Sector V, Salt Lake, Kolkata, West Bengal 700091",
    zone: "Sector V Salt Lake",
    distanceFromAirport: "13 km (approx 22 mins via Rajarhat Link)",
    distanceFromHowrah: "15 km (approx 35 mins via Maa Flyover)",
    employeeCountEstimate: "8,000+ Software & Infrastructure Engineers",
    shiftTimings: [
      "General Shift: 09:00 AM - 06:00 PM",
      "Infrastructure 24x7 Monitoring Shifts (3 Rotational Rotas)",
      "APAC & US Shift Windows",
    ],
    popularPickupZones: [
      "Behala & Joka Corridor",
      "Howrah Central, Shibpur & Salkia",
      "Kolkata North (Shyambazar, Dum Dum, Baranagar)",
      "Kasba, Jadavpur & Santoshpur",
      "New Town (Action Area I & II)",
    ],
    suggestedPackage: "Sector V Infrastructure Commuter Pass / Dedicated Cab",
    startingPricePerTrip: 219,
    monthlyPassEstimate: 3299,
    image: "/blogs/kolkata-durga-puja-2024.jpg",
    highlights: [
      "Prime location in Sector V's Block EN near major IT hubs.",
      "Reliable 24x7 cab availability tailored for 3-shift infrastructure and cloud teams.",
      "Punctual arrivals to maintain critical client uptime SLAs.",
      "Doorstep pickup with courteous drivers who know local shortcuts across Kolkata.",
      "Zero surge pricing during heavy monsoon rains or festive rush.",
    ],
    description:
      "HCLTech in Sector V is a vital hub for global technology operations, IT infrastructure management, and engineering services. Because infrastructure engineers support round-the-clock client operations, having dependable 24x7 transport is indispensable. BroomBoom Cabs delivers guaranteed employee transit for HCL professionals with verified drivers, GPS-monitored cabs, and custom corporate packages.",
    fleetOptions: [
      {
        vehicle: "Sedan (Dzire / Etios)",
        model: "Swift Dzire AC",
        seating: "4 Associates",
        perTripRate: "₹219 - ₹449 / trip",
        monthlyPerSeat: "₹3,299 - ₹4,199 / seat",
        dedicatedCabMonthly: "₹36,000 / month",
        badge: "Most Popular",
      },
      {
        vehicle: "SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Associates",
        perTripRate: "₹319 - ₹589 / trip",
        monthlyPerSeat: "₹2,799 - ₹3,599 / seat",
        dedicatedCabMonthly: "₹46,000 / month",
      },
      {
        vehicle: "Force Traveller (17 Seater)",
        model: "Force Traveller AC",
        seating: "17 Associates",
        perTripRate: "₹749 - ₹1,199 / trip",
        monthlyPerSeat: "₹1,999 - ₹2,599 / seat",
        dedicatedCabMonthly: "₹68,000 / month",
      },
    ],
    itineraryCorridors: [
      {
        fromArea: "Howrah / Shibpur / Mandirtala",
        duration: "40 - 50 mins",
        distance: "17 km",
        peakHours: "08:00 AM - 09:30 AM & 06:00 PM - 08:00 PM",
        routeVia: "Vidyasagar Setu ➔ Maa Flyover ➔ Salt Lake Sector V EN Block",
      },
      {
        fromArea: "Behala Chowrasta / Taratala",
        duration: "50 - 65 mins",
        distance: "21 km",
        peakHours: "07:45 AM - 09:15 AM & 06:15 PM - 08:30 PM",
        routeVia: "Diamond Harbour Rd ➔ Maa Flyover ➔ Sector V",
      },
    ],
    complianceFeatures: [
      "Mandatory seatbelts and speed governors on all vehicles",
      "Police verified commercial drivers with zero accident records",
      "Centralized 24x7 helpdesk for shift timing updates and roster changes",
      "Daily vehicle sanitization protocols",
    ],
    faqs: [
      {
        question: "Can shift times be adjusted dynamically on rotation weeks?",
        answer:
          "Yes! Our corporate roster coordinator coordinates weekly roster changes with team managers without penalty or disruption.",
      },
      {
        question: "Is billing handled directly with the company or employee?",
        answer:
          "We offer both B2B corporate contracts (direct company invoicing with GST input) and B2C employee monthly commuter subscriptions (paid via UPI / Net Banking).",
      },
    ],
  },

  cognizant: {
    slug: "cognizant",
    name: "Cognizant Technology Solutions (CTS)",
    companyName: "Cognizant",
    campusName: "Cognizant Sector V (Technocomplex) & Bantala IT SEZ",
    hubLocation: "Plot No. GN 34/3, Sector V, Salt Lake & Bantala IT SEZ, Kolkata",
    zone: "Sector V Salt Lake",
    distanceFromAirport: "14 km to Sector V / 24 km to Bantala",
    distanceFromHowrah: "16 km to Sector V / 22 km to Bantala",
    employeeCountEstimate: "25,000+ Associates across Salt Lake & Bantala",
    shiftTimings: [
      "Standard Tech Shift: 08:30 AM - 05:30 PM",
      "US Shift: 06:30 PM - 03:30 AM",
      "Bantala SEZ Express Shuttles: 07:00 AM, 08:00 AM & 09:00 AM Departures",
    ],
    popularPickupZones: [
      "Behala & South 24 Parganas Corridor",
      "Garia, Narendrapur & Sonarpur (closest to Bantala)",
      "Howrah & Shalimar Junctions",
      "Dunlop & North Kolkata Expressways",
      "Salt Lake & New Town Localities",
    ],
    suggestedPackage: "Sector V & Bantala SEZ Dedicated Employee Shuttles",
    startingPricePerTrip: 239,
    monthlyPassEstimate: 3499,
    image: "/blogs/belur-math-kolkata.jpg",
    highlights: [
      "Serving both flagship Cognizant campuses: Sector V Techno Complex and Bantala IT SEZ.",
      "Specialized Bantala IT SEZ expressway shuttles connecting South Kolkata, EM Bypass, and Howrah.",
      "Safe late-night drop-offs for US healthcare and financial services project teams.",
      "Fleet of pristine Sedans, Ertigas, and 17-26 seater Force Urbania shuttles.",
      "Dedicated transport helpline for immediate roster support.",
    ],
    description:
      "Cognizant is among Kolkata's leading IT powerhouses with major hubs at Sector V (Technocomplex) and the sprawling Bantala IT SEZ on the Basanti Highway. The commute to Bantala requires reliable highway transportation to bypass peak EM Bypass traffic. BroomBoom Cabs provides specialized pick-and-drop solutions for CTS associates, ensuring safe, punctual, and comfortable daily transit to both campuses.",
    fleetOptions: [
      {
        vehicle: "Sedan (Dzire / Etios)",
        model: "Swift Dzire AC",
        seating: "4 Associates",
        perTripRate: "₹249 - ₹499 / trip",
        monthlyPerSeat: "₹3,499 - ₹4,499 / seat",
        dedicatedCabMonthly: "₹38,000 / month",
        badge: "Executive Sedan",
      },
      {
        vehicle: "SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Associates",
        perTripRate: "₹349 - ₹649 / trip",
        monthlyPerSeat: "₹2,999 - ₹3,799 / seat",
        dedicatedCabMonthly: "₹48,000 / month",
        badge: "Most Popular",
      },
      {
        vehicle: "Staff Shuttle (26 Seater)",
        model: "Force Urbania / Traveller AC",
        seating: "26 Associates",
        perTripRate: "₹899 - ₹1,499 / trip",
        monthlyPerSeat: "₹2,199 - ₹2,799 / seat",
        dedicatedCabMonthly: "₹76,000 / month",
        badge: "Bantala SEZ Shuttle",
      },
    ],
    itineraryCorridors: [
      {
        fromArea: "Garia / Sonarpur / Ruby (to Bantala)",
        duration: "30 - 45 mins",
        distance: "16 km",
        peakHours: "07:30 AM - 09:00 AM & 05:30 PM - 07:30 PM",
        routeVia: "EM Bypass ➔ Science City ➔ Basanti Highway ➔ Bantala SEZ",
      },
      {
        fromArea: "Howrah / Central Kolkata (to Sector V)",
        duration: "40 - 50 mins",
        distance: "16 km",
        peakHours: "08:00 AM - 09:30 AM & 06:00 PM - 08:00 PM",
        routeVia: "Vidyasagar Setu ➔ Maa Flyover ➔ Sector V Technocomplex",
      },
    ],
    complianceFeatures: [
      "GPS tracking with real-time speed monitoring and route deviation alerts",
      "Night drop verification with confirmation call from dispatcher",
      "Mandatory breathalyzer checks before shifts",
      "Commercial RTO permits with comprehensive passenger liability insurance",
    ],
    faqs: [
      {
        question: "Do you provide dedicated shuttle service to Cognizant Bantala SEZ?",
        answer:
          "Yes! We run daily dedicated 6-seater Ertiga and 17-26 seater Force Urbania shuttles directly from Howrah, Tollygunge, and Ruby into the Bantala SEZ campus.",
      },
      {
        question: "What happens if a shift is extended for client escalations?",
        answer:
          "Our dedicated company cabs include standby waiting, so employees are never stranded after odd-hour client calls.",
      },
    ],
  },

  concentrix: {
    slug: "concentrix",
    name: "Concentrix Kolkata",
    companyName: "Concentrix",
    campusName: "Concentrix Candor TechSpace (New Town) & Sector V",
    hubLocation: "Candor TechSpace (formerly Unitech), Action Area I, New Town & Sector V, Kolkata",
    zone: "New Town Action Area",
    distanceFromAirport: "10 km (approx 15 mins via Major Arterial Road)",
    distanceFromHowrah: "18 km (approx 42 mins via Maa Flyover)",
    employeeCountEstimate: "12,000+ Customer Experience & BPO Specialists",
    shiftTimings: [
      "Day Operations: 08:00 AM - 05:00 PM & 10:00 AM - 07:00 PM",
      "UK & European Shifts: 01:00 PM - 10:00 PM",
      "US & Canadian Night Shifts: 07:00 PM - 04:00 AM & 09:00 PM - 06:00 AM",
      "24x7 Customer Support Rotations",
    ],
    popularPickupZones: [
      "Dum Dum, Nagerbazar & Baguiati",
      "Barasat, Madhyamgram & Birati",
      "Kestopur, Kaikhali & Chinar Park",
      "Howrah & Sealdah Commuter Belts",
      "Behala, Jadavpur & South Kolkata",
    ],
    suggestedPackage: "24x7 High-Frequency BPO Roster Employee Transport",
    startingPricePerTrip: 229,
    monthlyPassEstimate: 3399,
    image: "/blogs/gangasagar-mela-temple.jpg",
    highlights: [
      "High-frequency pick and drop tailored for BPO and Customer Experience shifts.",
      "Doorstep pickup for late-night and early-morning odd hours.",
      "100% compliant with NASSCOM and Government guidelines for female BPO staff transport.",
      "Armed or unarmed security escort guards provided for all night-time female employee drops.",
      "Instant replacement cab within 15 minutes in case of any breakdown.",
    ],
    description:
      "Concentrix is a premier global provider of customer experience and digital business services, with prominent operational bases at Candor TechSpace in New Town and Salt Lake Sector V. Operating 24 hours a day to support international consumers across different time zones, punctuality and absolute safety during night-shift commutes are non-negotiable. BroomBoom Cabs offers enterprise-grade employee transport solutions with strict safety protocols for Concentrix associates.",
    fleetOptions: [
      {
        vehicle: "Sedan (Dzire / Etios)",
        model: "Swift Dzire AC",
        seating: "4 Associates",
        perTripRate: "₹229 - ₹469 / trip",
        monthlyPerSeat: "₹3,399 - ₹4,299 / seat",
        dedicatedCabMonthly: "₹37,000 / month",
        badge: "Most Popular",
      },
      {
        vehicle: "SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Associates",
        perTripRate: "₹329 - ₹599 / trip",
        monthlyPerSeat: "₹2,899 - ₹3,699 / seat",
        dedicatedCabMonthly: "₹47,000 / month",
        badge: "Roster Carpool",
      },
      {
        vehicle: "Tempo Shuttle (17 Seater)",
        model: "Force Traveller AC",
        seating: "17 Associates",
        perTripRate: "₹799 - ₹1,299 / trip",
        monthlyPerSeat: "₹2,099 - ₹2,699 / seat",
        dedicatedCabMonthly: "₹69,000 / month",
      },
    ],
    itineraryCorridors: [
      {
        fromArea: "Dum Dum / Baguiati / Kestopur",
        duration: "20 - 30 mins",
        distance: "9 km",
        peakHours: "07:30 AM, 12:30 PM, 06:30 PM & 08:30 PM",
        routeVia: "VIP Road ➔ Major Arterial Road ➔ Candor TechSpace Gate 1",
      },
      {
        fromArea: "Barasat / Madhyamgram / Airport",
        duration: "25 - 40 mins",
        distance: "14 km",
        peakHours: "All Shift Windows",
        routeVia: "Airport Gate 1 ➔ New Town Expressway ➔ Candor TechSpace",
      },
    ],
    complianceFeatures: [
      "Mandatory escort guards on all night trips with female employees",
      "Driver cannot leave until female associate confirms safe entry into home",
      "In-cabin panic buttons with live GPS audio-video surveillance options",
      "Regular background checks, alcohol tests, and defensive driving training",
    ],
    faqs: [
      {
        question: "How does BroomBoom manage odd-hour BPO shifts like 3:00 AM or 4:00 AM?",
        answer:
          "Our Kolkata control room runs 24x7 with dedicated night dispatchers. Vehicles are dispatched 30 minutes in advance to guarantee zero delays for odd-hour shifts.",
      },
      {
        question: "Is there a female passenger safety protocol in place?",
        answer:
          "Yes. Between 8:00 PM and 6:00 AM, female employees are never the first to be picked up or last to be dropped without a security guard or colleague. Drivers wait with headlights on until the employee enters their residence.",
      },
    ],
  },

  accenture: {
    slug: "accenture",
    name: "Accenture Kolkata",
    companyName: "Accenture Solutions",
    campusName: "Accenture DLF IT Park 2 & Candor TechSpace",
    hubLocation: "DLF IT Park 2, Rajarhat & Candor TechSpace, Action Area I, New Town, Kolkata",
    zone: "New Town Action Area",
    distanceFromAirport: "11 km (approx 18 mins via Major Arterial Road)",
    distanceFromHowrah: "19 km (approx 45 mins via Maa Flyover)",
    employeeCountEstimate: "15,000+ Consultants & Tech Specialists",
    shiftTimings: [
      "Corporate Consulting Shift: 09:00 AM - 06:00 PM",
      "Global Delivery Shift: 11:30 AM - 08:30 PM",
      "US Operations & Cloud Infrastructure: 06:00 PM - 03:00 AM & 08:00 PM - 05:00 AM",
    ],
    popularPickupZones: [
      "Salt Lake (All Sectors) & Phoolbagan",
      "South Kolkata (Gariahat, Tollygunge, Alipore, New Alipore)",
      "Howrah, Liluah & Bally",
      "New Town (Action Area I, II, III & Eco Park vicinity)",
      "North Kolkata (Shyambazar, Kankurgachi, Lake Town)",
    ],
    suggestedPackage: "Executive Corporate Commuter Package / Monthly Shared Cab",
    startingPricePerTrip: 249,
    monthlyPassEstimate: 3499,
    image: "/blogs/maa-durga-face-kumartuli.jpg",
    highlights: [
      "Serving Accenture's major centers at DLF IT Park 2 (Rajarhat) and Candor TechSpace (New Town).",
      "Executive-grade spotless Sedans (Dzire, Amaze) and premium SUVs (Ertiga, Innova Crysta).",
      "Punctual executive doorstep pickups for leadership, consultants, and delivery teams.",
      "Automated monthly MIS reporting for corporate reimbursement and tax-free transport allowances.",
      "Full compliance with enterprise security, insurance, and environmental guidelines.",
    ],
    description:
      "Accenture is a world-leading professional services and management consulting firm with prominent technology centers at DLF IT Park 2 in Rajarhat and Candor TechSpace in New Town. With a diverse workforce of consultants, system architects, and analysts handling tier-1 global accounts, daily commuting requires reliability, comfort, and safety. BroomBoom Cabs offers premium corporate cab rentals, dedicated staff carpools, and monthly subscription services for Accenture employees across Kolkata.",
    fleetOptions: [
      {
        vehicle: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        seating: "4 Associates",
        perTripRate: "₹249 - ₹499 / trip",
        monthlyPerSeat: "₹3,499 - ₹4,499 / seat",
        dedicatedCabMonthly: "₹38,000 / month",
        badge: "Executive Standard",
      },
      {
        vehicle: "SUV (Ertiga AC)",
        model: "Maruti Ertiga AC",
        seating: "6 Associates",
        perTripRate: "₹349 - ₹649 / trip",
        monthlyPerSeat: "₹2,999 - ₹3,799 / seat",
        dedicatedCabMonthly: "₹48,000 / month",
        badge: "Team Carpool",
      },
      {
        vehicle: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        seating: "6-7 Executives",
        perTripRate: "₹599 - ₹999 / trip",
        monthlyPerSeat: "₹4,999 - ₹6,499 / seat",
        dedicatedCabMonthly: "₹62,000 / month",
        badge: "Leadership Fleet",
      },
    ],
    itineraryCorridors: [
      {
        fromArea: "South Kolkata (Alipore / New Alipore / Tollygunge)",
        duration: "45 - 60 mins",
        distance: "21 km",
        peakHours: "08:00 AM - 09:30 AM & 06:00 PM - 08:30 PM",
        routeVia: "Maa Flyover ➔ Salt Lake Bypass ➔ New Town MAR ➔ DLF IT Park",
      },
      {
        fromArea: "Howrah Station / Mandirtala",
        duration: "40 - 55 mins",
        distance: "19 km",
        peakHours: "08:15 AM - 09:45 AM & 06:15 PM - 08:00 PM",
        routeVia: "Vidyasagar Setu ➔ Maa Flyover ➔ DLF 2 Rajarhat",
      },
    ],
    complianceFeatures: [
      "GPS tracking with client-facing live tracking link",
      "Strict compliance with corporate ESG guidelines (low-emission well-maintained cars)",
      "Commercial RTO compliant yellow-plate fleet with full passenger insurance",
      "Monthly GST invoices compliant with enterprise ERP procurement systems",
    ],
    faqs: [
      {
        question: "Can Accenture consultants claim monthly cab invoices for corporate reimbursement?",
        answer:
          "Yes! We issue automated monthly GST-compliant digital invoices detailing route trips, dates, and vehicle numbers, fully compatible with corporate expense portals.",
      },
      {
        question: "Is airport pickup available for visiting Accenture onshore leaders and clients?",
        answer:
          "Yes. We offer executive airport pickup in premium Innova Crystas or Sedans with flight tracking and personalized chauffeur meet-and-greet.",
      },
    ],
  },
};

export function parseCorporateSlug(rawSlug: string): CorporateDetail | null {
  if (!rawSlug) return null;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  return CORPORATE_DETAILS_MAP[decoded] || null;
}
