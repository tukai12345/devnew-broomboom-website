export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  featured?: boolean;
}

export interface BlogHeroSection {
  badge: string;
  title: string;
  description: string;
  backgroundImage: string;
}

export interface BlogPageData {
  hero: BlogHeroSection;
  featuredSectionTitle: string;
  articlesSectionTitle: string;
  posts: BlogPost[];
}

export const BLOG_CATEGORIES = [
  "All Categories",
  "Travel & Tourism",
  "Taxi Services",
  "Culture & Festivals",
  "Spiritual Journeys",
  "Road Trips",
  "Fare Guide",
  "Highway Guides",
];

export const INITIAL_BLOG_DATA: BlogPageData = {
  hero: {
    badge: "Travel Guides • Tips • Highway Updates",
    title: "BroomBoom Travel Blog & Guides",
    description:
      "Explore offbeat monsoon destinations, road trip itineraries, festival travel guides, and money-saving outstation cab tips across India.",
    backgroundImage:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
  },
  featuredSectionTitle: "Featured Editorial",
  articlesSectionTitle: "Latest Articles",
  posts: [
    {
      slug: "offbeat-monsoon-destinations-in-west-bengal",
      title: "Offbeat Monsoon Destinations in West Bengal: Explore with BroomBoom Cabs",
      excerpt:
        "Escape the city rush with scenic monsoon drives to Dooars, Purulia, Mukutmanipur, and Lepchajagat. Discover lush green highways and verified cabs with local experienced chauffeurs.",
      content:
        "The monsoon turns West Bengal into a verdant wonderland. From the rolling mist-covered tea gardens of Lepchajagat in North Bengal to the red soil hills and cascading streams of Purulia's Ayodhya Hills, an outstation cab allows you to travel at your own pace. With BroomBoom Cabs, enjoy sanitized commercial vehicles, experienced highway chauffeurs, and zero surge pricing.",
      category: "Travel & Tourism",
      readTime: "5 min read",
      date: "Jul 15, 2024",
      author: "BroomBoom Travel Desk",
      image: "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      slug: "cab-companies-in-kolkata-why-broomboom-stands-out",
      title: "Cab Companies in Kolkata: Why BroomBoom Cabs Stands Out!",
      excerpt:
        "Looking for reliable taxi services in Kolkata? Discover why BroomBoom Cabs provides 100% verified chauffeurs, zero hidden surge pricing, and dependable 24x7 support.",
      content:
        "Navigating Kolkata during peak hours, sudden monsoon showers, or late-night airport transfers requires reliability. While traditional app aggregators suffer from frequent ride cancellations and 2x-3x surge pricing, BroomBoom Cabs offers guaranteed upfront pricing, professional commercial drivers, clean AC cabs, and 24x7 phone support.",
      category: "Taxi Services",
      readTime: "4 min read",
      date: "Aug 02, 2024",
      author: "Kolkata Operations Team",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "kolkata-durga-puja-2024-grand-celebration",
      title: "Kolkata Durga Puja 2024: A Grand Celebration of Tradition and Art",
      excerpt:
        "Plan your Durga Puja pandal hopping in Kolkata with BroomBoom hourly rental cabs. Visit North and South Kolkata puja mandaps without parking stress or transit delays.",
      content:
        "UNESCO-recognized Kolkata Durga Puja transforms the city of joy into the world's largest open-air art gallery. Navigating pandals from Maddox Square to Bagbazar is effortless with BroomBoom's flexible 8-hour / 12-hour hourly rental packages with dedicated chauffeur.",
      category: "Culture & Festivals",
      readTime: "6 min read",
      date: "Oct 01, 2024",
      author: "Bengal Cultural Desk",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "gangasagar-mela-2025-with-broomboom-cabs",
      title: "Gangasagar Mela 2025 with BroomBoom Cabs: A Spiritual Journey to Remember",
      excerpt:
        "Complete travel guide for pilgrims travelling to Sagar Island for the sacred dip. Book sanitized outstation cabs from Kolkata to Lot 8 / Harwood Point with roundtrip return assurance.",
      content:
        "Gangasagar Mela is India's second largest spiritual gathering after Kumbh Mela. Millions travel to the confluence of the sacred Ganga and the Bay of Bengal on Makar Sankranti. BroomBoom provides dedicated one-way and roundtrip cabs from Kolkata Airport, Howrah, and Sealdah directly to Lot 8 jetty.",
      category: "Spiritual Journeys",
      readTime: "5 min read",
      date: "Dec 18, 2024",
      author: "Pilgrimage Desk",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "things-to-do-on-makar-sankranti-2024",
      title: "Things to do on Makar Sankranti 2024: A Festival, Many Names, One Emotion",
      excerpt:
        "From colorful kite festivals to holy river dips and festive sweets, explore how Makar Sankranti, Pongal, and Magh Bihu are celebrated across India.",
      content:
        "Makar Sankranti marks the transition of the Sun into Makara Rashi, celebrated across Indian states with vibrant traditions, harvest dishes like pithe-puli in Bengal, and kite-flying festivals in Gujarat and Rajasthan. Discover the best destinations to witness the festive cheer with convenient intercity travel.",
      category: "Culture & Festivals",
      readTime: "4 min read",
      date: "Jan 12, 2024",
      author: "Heritage & Traditions",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "zero-return-fare-explained",
      title: "How BroomBoom's Zero Return Fare Saves You Up to 40% on Intercity Cabs",
      excerpt:
        "Traditional taxi operators charge round-trip rates even when you only need a drop. Here is the math behind why paying only one-way distance fare changes everything.",
      content:
        "When booking an intercity taxi across India, travellers have historically been charged double: the fare for their actual trip plus the 'return fare' of the cab heading back empty. At BroomBoom Cabs, our intelligent dispatch matches returning vehicles with passengers travelling in reverse directions, eliminating the return penalty.",
      category: "Fare Guide",
      readTime: "4 min read",
      date: "Oct 28, 2026",
      author: "BroomBoom Pricing Team",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "kolkata-to-digha-road-trip-guide",
      title: "Kolkata to Digha Cab Road Trip: NH16 Route, Tolls & Best Dhaba Stops",
      excerpt:
        "Planning a weekend seaside drive to Digha or Mandarmani? Check optimal departure timings, Fastag toll costs, and road condition updates.",
      content:
        "The road from Kolkata to Digha stretches roughly 185 kilometers via NH16 and NH116B. Departing early in the morning by 6:00 AM helps you skip Kona Expressway morning bottlenecks. Stop at Kolaghat for traditional breakfast and hot chai.",
      category: "Road Trips",
      readTime: "6 min read",
      date: "Oct 24, 2026",
      author: "Eastern Region Desk",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "bangalore-to-mysore-expressway-taxi",
      title: "Bangalore to Mysore Expressway by Cab: Timings, Stops & Fare Breakdown",
      excerpt:
        "Everything you need to know about the 10-lane expressway drive from Bengaluru to Mysuru in an AC Sedan or Innova Crysta.",
      content:
        "The 118 km Bengaluru-Mysuru Expressway has slashed travel time between the IT capital and the heritage city to just under 90 minutes. BroomBoom outstation services provide doorstep pickup from anywhere in Bangalore.",
      category: "Highway Guides",
      readTime: "5 min read",
      date: "Oct 19, 2026",
      author: "South Operations Team",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
  ],
};
