export interface CityOption {
  id: string;
  name: string;
  state: string;
  popularPlaces?: string[];
  airportCode?: string;
}

export const CITIES: CityOption[] = [
  { id: "kolkata", name: "Kolkata", state: "West Bengal", airportCode: "CCU", popularPlaces: ["Howrah Station", "Airport (NSCBI)", "Park Street", "Salt Lake Sector V", "New Town", "Dum Dum"] },
  { id: "digha", name: "Digha", state: "West Bengal", popularPlaces: ["Old Digha Sea Beach", "New Digha", "Marine Aquarium", "Digha Railway Station"] },
  { id: "mandarmani", name: "Mandarmani", state: "West Bengal", popularPlaces: ["Mandarmani Beach", "Tajpur Link Road", "Resort Strip"] },
  { id: "siliguri", name: "Siliguri", state: "West Bengal", airportCode: "IXB", popularPlaces: ["Bagdogra Airport", "NJP Station", "Sevoke Road", "Hill Cart Road"] },
  { id: "darjeeling", name: "Darjeeling", state: "West Bengal", popularPlaces: ["Mall Road", "Tiger Hill", "Ghum Station", "Happy Valley"] },
  { id: "delhi", name: "Delhi NCR", state: "Delhi", airportCode: "DEL", popularPlaces: ["IGI Airport T3", "New Delhi Railway Station", "Connaught Place", "Gurugram Cyber Hub", "Noida Sector 18"] },
  { id: "agra", name: "Agra", state: "Uttar Pradesh", popularPlaces: ["Taj Mahal West Gate", "Agra Fort", "Agra Cantt"] },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", airportCode: "JAI", popularPlaces: ["Hawa Mahal", "Amer Fort", "Jaipur Junction", "Airport"] },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", airportCode: "BOM", popularPlaces: ["CSMT", "Chhatrapati Shivaji Airport T2", "Bandra", "Andheri", "Navi Mumbai"] },
  { id: "pune", name: "Pune", state: "Maharashtra", airportCode: "PNQ", popularPlaces: ["Pune Station", "Hinjawadi IT Park", "Viman Nagar", "Koregaon Park"] },
  { id: "bangalore", name: "Bengaluru", state: "Karnataka", airportCode: "BLR", popularPlaces: ["Kempegowda Airport", "Majestic", "Koramangala", "Whitefield", "Indiranagar"] },
  { id: "mysore", name: "Mysuru", state: "Karnataka", popularPlaces: ["Mysore Palace", "Chamundi Hill", "Mysore Junction"] },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", airportCode: "HYD", popularPlaces: ["RGIA Shamshabad", "Hitec City", "Secunderabad", "Banjara Hills"] },
  { id: "puri", name: "Puri", state: "Odisha", popularPlaces: ["Jagannath Temple", "Golden Beach", "Puri Station"] },
];

export interface CabVehicle {
  id: string;
  name: string;
  category: "Hatchback" | "Sedan" | "SUV" | "Prime SUV" | "Electric" | "Tempo";
  badge?: string;
  image: string;
  models: string;
  seats: number;
  bags: number;
  ac: boolean;
  rating: number;
  totalRatings: number;
  basePrice: number;
  discountedPrice: number;
  perKmRate: number;
  fuelType: "CNG" | "Petrol" | "Diesel" | "Electric";
  cancellationFreeHours: number;
  features: string[];
  tollIncluded: boolean;
  extraKmRate: number;
}

export const FLEET_CABS: CabVehicle[] = [
  {
    id: "hatch-wagonr",
    name: "Hatchback Standard",
    category: "Hatchback",
    badge: "Most Affordable",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    models: "WagonR, Tiago or equivalent",
    seats: 4,
    bags: 2,
    ac: true,
    rating: 4.8,
    totalRatings: 1842,
    basePrice: 2499,
    discountedPrice: 1999,
    perKmRate: 15.0,
    fuelType: "CNG",
    cancellationFreeHours: 6,
    features: ["Clean AC Cab", "Verified Driver", "Zero Cancellation Fee", "Doorstep Pickup"],
    tollIncluded: false,
    extraKmRate: 15.0,
  },
  {
    id: "sedan-dzire",
    name: "Sedan Prime",
    category: "Sedan",
    badge: "Popular Choice",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
    models: "Maruti Dzire, Honda Amaze, Etios",
    seats: 4,
    bags: 3,
    ac: true,
    rating: 4.9,
    totalRatings: 3410,
    basePrice: 2899,
    discountedPrice: 2399,
    perKmRate: 15.0,
    fuelType: "Petrol",
    cancellationFreeHours: 6,
    features: ["Spacious Boot Space", "Top-Rated Driver", "Complimentary Water", "Live GPS Tracking"],
    tollIncluded: true,
    extraKmRate: 15.0,
  },
  {
    id: "ev-tigor",
    name: "Eco Green EV Sedan",
    category: "Electric",
    badge: "100% Green",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
    models: "Tata Tigor EV, BYD E6",
    seats: 4,
    bags: 2,
    ac: true,
    rating: 4.9,
    totalRatings: 920,
    basePrice: 2699,
    discountedPrice: 2199,
    perKmRate: 15.0,
    fuelType: "Electric",
    cancellationFreeHours: 6,
    features: ["Zero Emission Ride", "Whisper Quiet Cabin", "Fast USB Chargers", "Zero Surge Guarantee"],
    tollIncluded: false,
    extraKmRate: 15.0,
  },
  {
    id: "suv-ertiga",
    name: "SUV Family Cruiser",
    category: "SUV",
    badge: "Best for Family",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
    models: "Maruti Ertiga, Kia Carens, Triber",
    seats: 6,
    bags: 4,
    ac: true,
    rating: 4.85,
    totalRatings: 2120,
    basePrice: 3899,
    discountedPrice: 3299,
    perKmRate: 17.5,
    fuelType: "Diesel",
    cancellationFreeHours: 6,
    features: ["6 Passenger Seats", "Generous Legroom", "Roof Carrier Available", "Experienced Highway Pilot"],
    tollIncluded: true,
    extraKmRate: 18.0,
  },
  {
    id: "prime-innova",
    name: "Innova Crysta Executive",
    category: "Prime SUV",
    badge: "Luxury & Comfort",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80",
    models: "Toyota Innova Crysta / Hycross",
    seats: 7,
    bags: 5,
    ac: true,
    rating: 4.95,
    totalRatings: 1890,
    basePrice: 4999,
    discountedPrice: 4299,
    perKmRate: 21.0,
    fuelType: "Diesel",
    cancellationFreeHours: 12,
    features: ["Reclining Captain Seats", "Rear AC Vents", "Chauffeur in Uniform", "Supreme Highway Safety"],
    tollIncluded: true,
    extraKmRate: 22.0,
  },
  {
    id: "tempo-urbania",
    name: "Luxury Mini Coach / Tempo",
    category: "Tempo",
    badge: "Group Travel",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    models: "Force Urbania / Traveller (12-16S)",
    seats: 12,
    bags: 10,
    ac: true,
    rating: 4.8,
    totalRatings: 630,
    basePrice: 7999,
    discountedPrice: 6999,
    perKmRate: 28.0,
    fuelType: "Diesel",
    cancellationFreeHours: 24,
    features: ["Pushback Luxury Seats", "LED TV & Music System", "Huge Luggage Deck", "Corporate & Wedding Trip Ready"],
    tollIncluded: false,
    extraKmRate: 30.0,
  },
];

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  startingPrice: number;
  popularFor: string;
  image: string;
  tag?: string;
}

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: "kol-digha",
    from: "Kolkata",
    to: "Digha",
    distance: "185 km",
    duration: "4.5 hrs",
    startingPrice: 2299,
    popularFor: "Weekend Beach Getaway",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    tag: "Trending Weekend",
  },
  {
    id: "kol-mandarmani",
    from: "Kolkata",
    to: "Mandarmani",
    distance: "172 km",
    duration: "4.0 hrs",
    startingPrice: 2499,
    popularFor: "Seaside Resorts & Serenity",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
    tag: "Popular",
  },
  {
    id: "kol-siliguri",
    from: "Kolkata",
    to: "Siliguri",
    distance: "560 km",
    duration: "11.5 hrs",
    startingPrice: 9499,
    popularFor: "Gateway to Northeast & Hills",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    tag: "Scenic Route",
  },
  {
    id: "del-agra",
    from: "Delhi NCR",
    to: "Agra",
    distance: "230 km",
    duration: "3.5 hrs",
    startingPrice: 2199,
    popularFor: "Taj Mahal Expressway Drive",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
    tag: "Fastest Highway",
  },
  {
    id: "del-jaipur",
    from: "Delhi NCR",
    to: "Jaipur",
    distance: "280 km",
    duration: "4.5 hrs",
    startingPrice: 2799,
    popularFor: "Royal Heritage & Palaces",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    tag: "Top Rated",
  },
  {
    id: "mum-pune",
    from: "Mumbai",
    to: "Pune",
    distance: "150 km",
    duration: "2.5 hrs",
    startingPrice: 1999,
    popularFor: "Expressway Daily Commute",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
    tag: "Expressway Special",
  },
  {
    id: "blr-mysore",
    from: "Bengaluru",
    to: "Mysuru",
    distance: "145 km",
    duration: "2.0 hrs",
    startingPrice: 2199,
    popularFor: "Access-controlled Expressway",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80",
    tag: "Superfast",
  },
  {
    id: "kol-puri",
    from: "Kolkata",
    to: "Puri",
    distance: "500 km",
    duration: "9.5 hrs",
    startingPrice: 7999,
    popularFor: "Spiritual Pilgrimage & Beach",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
    tag: "Pilgrimage Special",
  },
];

export interface PromoOffer {
  id: string;
  code: string;
  discount: string;
  title: string;
  description: string;
  validTill: string;
  tag: string;
  bgGradient: string;
}

export const PROMO_OFFERS: PromoOffer[] = [
  {
    id: "broomfirst",
    code: "BROOMFIRST",
    discount: "FLAT ₹500 OFF",
    title: "First Outstation Ride",
    description: "Valid on all Outstation one-way & round-trip bookings across India.",
    validTill: "Valid till end of month",
    tag: "New Users",
    bgGradient: "from-amber-500 to-yellow-600",
  },
  {
    id: "airport100",
    code: "AIRPORT100",
    discount: "FLAT ₹150 OFF",
    title: "Hassle-Free Airport Drop",
    description: "Guaranteed on-time pickup with flight tracking & 45 mins free wait time.",
    validTill: "All 7 Days",
    tag: "Airport Special",
    bgGradient: "from-emerald-600 to-teal-700",
  },
  {
    id: "weekend800",
    code: "WEEKEND800",
    discount: "UP TO ₹800 OFF",
    title: "Round Trip Vacation Cabs",
    description: "Book an SUV or Sedan round-trip for 2+ days and get massive savings.",
    validTill: "Fri - Sun Travel",
    tag: "Weekend Getaway",
    bgGradient: "from-amber-600 to-orange-700",
  },
  {
    id: "electrify",
    code: "ELECTRIFY",
    discount: "20% OFF",
    title: "Eco Green EV Rides",
    description: "Ride emission-free with zero surge & whisper-quiet modern electric fleet.",
    validTill: "Limited time",
    tag: "Green Travel",
    bgGradient: "from-teal-600 to-emerald-700",
  },
];

export interface RentalPackage {
  id: string;
  duration: string;
  km: string;
  basePrice: number;
  sedanPrice: number;
  suvPrice: number;
  idealFor: string;
}

export const RENTAL_PACKAGES: RentalPackage[] = [
  { id: "pkg-2-20", duration: "2 Hours", km: "20 Kms", basePrice: 499, sedanPrice: 649, suvPrice: 899, idealFor: "Quick shopping & medical visits" },
  { id: "pkg-4-40", duration: "4 Hours", km: "40 Kms", basePrice: 899, sedanPrice: 1149, suvPrice: 1549, idealFor: "City meetings & short sightseeing" },
  { id: "pkg-8-80", duration: "8 Hours", km: "80 Kms", basePrice: 1699, sedanPrice: 2099, suvPrice: 2799, idealFor: "Full day office or full city tour" },
  { id: "pkg-12-120", duration: "12 Hours", km: "120 Kms", basePrice: 2499, sedanPrice: 2999, suvPrice: 3899, idealFor: "Wedding events & whole day errands" },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FaqItem[] = [
  {
    category: "Fares & Payment",
    question: "What is included in the BroomBoom Outstation fare?",
    answer: "Our prices are transparent with zero hidden charges. The fare includes base fare, driver allowance, fuel, and GST. Depending on the cab card badge, toll taxes and state entry taxes may be inclusive or payable on actuals via Fastag.",
  },
  {
    category: "Booking & Cancellation",
    question: "What is BroomBoom's cancellation policy?",
    answer: "You get 100% FREE cancellation up to 6 hours before your scheduled pickup time! Any advance token paid is refunded instantly to your original payment method or BroomBoom wallet.",
  },
  {
    category: "Cab Safety & Hygiene",
    question: "How does BroomBoom ensure clean and safe cabs?",
    answer: "Every car in our fleet undergoes daily sanitization audits. Drivers are police-verified, background-checked, and trained for highway protocols. You also get real-time GPS tracking with family share link and a 24x7 SOS emergency button.",
  },
  {
    category: "One-Way Trips",
    question: "Do I have to pay return fare for a One-Way Outstation cab?",
    answer: "No! Unlike local operators who charge two-way fares, BroomBoom Cabs charges strictly for ONE-WAY only. You only pay for the distance travelled between your pickup and drop city.",
  },
  {
    category: "Airport Transfers",
    question: "What if my flight gets delayed for an Airport Pickup?",
    answer: "When you provide your flight number during airport booking, our smart dispatch system tracks your flight in real time and automatically reschedules the driver arrival. We also provide 45 minutes of complimentary waiting time post landing.",
  },
  {
    category: "Night & Driver Allowance",
    question: "Are there extra charges for night driving or luggage?",
    answer: "Standard driver night allowance is already integrated transparently when you select night travel timings (10:00 PM to 06:00 AM). Standard boot luggage is completely free of charge.",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Arjun Mukherjee",
    city: "Kolkata to Digha",
    car: "Sedan (Maruti Dzire)",
    rating: 5,
    date: "Travelled 2 days ago",
    comment: "Booked at 6 AM for a sudden family trip to Digha. The cab was spotless, driver reached 15 mins prior to time, and drove with utmost care on NH16. Way better experience and cheaper than other cab apps!",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "2",
    name: "Pooja Sharma",
    city: "Delhi to Jaipur",
    car: "Innova Crysta",
    rating: 5,
    date: "Travelled last weekend",
    comment: "We were 6 adults with heavy luggage. The Innova was brand new with superb captain seats and chilled dual AC. Tolls were included transparently as promised. BroomBoom is our default outstation cab now!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "3",
    name: "Vikram Sengupta",
    city: "CCU Airport to Salt Lake",
    car: "Electric Sedan (Tigor EV)",
    rating: 5,
    date: "Travelled yesterday",
    comment: "Flight was delayed by 40 minutes, but the driver was waiting politely outside Terminal 2 without asking any surge money. Smooth silent ride, AC was chilling, and zero hassle payment.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
  },
];
