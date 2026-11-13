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
  "Republic Day",
];

export const INITIAL_BLOG_DATA: BlogPageData = {
  hero: {
    badge: "Travel Guides • Festival Insights • City Tours",
    title: "BroomBoom Travel Blog & Guides",
    description:
      "Explore offbeat destinations, cultural festival travel guides, temple pilgrimage routes, and outstation cab booking tips across India.",
    backgroundImage:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
  },
  featuredSectionTitle: "Featured Editorial",
  articlesSectionTitle: "Latest Articles",
  posts: [
    // ── PAGE 1 ARTICLES (matching screenshot 1) ──
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
      image: "/blogs/offbeat-destinations-bengal.jpg",
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
      image: "/blogs/broomboom-cab-companies-kolkata.jpg",
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
      image: "/blogs/kolkata-durga-puja-2024.jpg",
      featured: true,
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
      image: "/blogs/gangasagar-mela-temple.jpg",
      featured: true,
    },

    // ── PAGE 2 ARTICLES (matching screenshot 2) ──
    {
      slug: "durga-puja-car-rental-in-india-travel-made-easy",
      title: "Durga Puja Car Rental in India: Travel Made Easy During the Festive Season",
      excerpt:
        "Experience the grand festive euphoria of Durga Puja with BroomBoom car rentals. Enjoy comfortable pandal hopping, outstation holiday tours, and hassle-free city transit.",
      content:
        "Durga Puja is not just a festival; it is a five-day emotion of joy, family reunions, and vibrant celebration across India. From the traditional aristocratic 'Bonedi Bari' pujas of Kolkata to grand community pandals across Delhi NCR, Mumbai, and Bangalore, traveling between festive hotspots with family can be overwhelming due to crowded public transit and parking crunch. BroomBoom Cabs offers dedicated 8-hour and 12-hour festive car rentals with polite, route-savvy chauffeurs, chilled AC, and sanitized interiors so you can celebrate without travel stress.",
      category: "Culture & Festivals",
      readTime: "6 min read",
      date: "Sep 28, 2024",
      author: "Festival Travel Desk",
      image: "/blogs/durga-puja-car-rental-festive.jpg",
      featured: true,
    },
    {
      slug: "holi-celebrations-journey-to-heart-of-india",
      title: "Holi Celebrations: A Colorful Journey to the Heart of India with BroomBoom Cabs",
      excerpt:
        "Celebrate the festival of colors with joy, safety, and cultural splendor. Plan your festive road trip with verified outstation cabs from BroomBoom.",
      content:
        "Holi brings India alive with color, joy, and warmth. From the poetic Basanta Utsav in Shantiniketan to royal celebrations in Jaipur and Braj Holi in Mathura-Vrindavan, hitting the road with BroomBoom outstation cabs ensures safe, comfortable travel with experienced drivers.",
      category: "Culture & Festivals",
      readTime: "5 min read",
      date: "Mar 05, 2025",
      author: "Heritage & Traditions",
      image: "/blogs/holi-celebration.jpg",
      featured: true,
    },
    {
      slug: "belur-math-hindu-temple-howrah-india",
      title: "Belur Math - Hindu Temple in Howrah, India",
      excerpt:
        "Plan a peaceful pilgrimage to Belur Math on the banks of the Hooghly River. Explore universal architecture, prayer timings, and convenient hourly rental cabs.",
      content:
        "Belur Math, the headquarters of the Ramakrishna Math and Mission, stands as a beacon of universal brotherhood and spiritual harmony on the banks of the Hooghly in Howrah. Visiting Belur Math along with Dakshineswar Kali Temple is effortless with BroomBoom's local hourly rental cabs.",
      category: "Spiritual Journeys",
      readTime: "5 min read",
      date: "Jan 28, 2025",
      author: "Spiritual Journeys Desk",
      image: "/blogs/belur-math-kolkata.jpg",
      featured: true,
    },
    {
      slug: "why-broomboom-cabs-is-better-than-other-platforms",
      title: "Why BroomBoom Cabs is Better Than Other Platforms for Intercity Travel",
      excerpt:
        "Discover why millions of travelers trust BroomBoom Cabs for intercity trips. Zero return fare penalty on one-way drops, verified chauffeurs, and transparent billing.",
      content:
        "When traveling between cities, traditional ride-hailing apps often charge steep roundtrip fares even for one-way drops, while spot taxi stands leave passengers vulnerable to haggling. BroomBoom Cabs revolutionizes intercity travel with guaranteed one-way rates, no return fare charges, transparent per-km billing, 100% verified commercial chauffeurs, and 24x7 travel assistance.",
      category: "Taxi Services",
      readTime: "5 min read",
      date: "Feb 15, 2025",
      author: "Travel Insights Desk",
      image: "/blogs/why-broomboom-intercity-travel.jpg",
      featured: true,
    },

    // ── ADDITIONAL ARTICLES FOR SIDEBAR & ARCHIVE ──
    {
      slug: "things-to-do-on-makar-sankranti-2025",
      title: "Things to do on Makar Sankranti 2025: One Festival, Many Names, One Emotion",
      excerpt:
        "Makar Sankranti marks the arrival of the harvest season with vibrant kite flying, holy river dips, bonfire gatherings, and traditional sweets like pithe-puli. Discover cultural traditions and seamless festive travel with BroomBoom Cabs.",
      content:
        "Makar Sankranti 2025 is celebrated across India as the Sun enters the zodiac sign of Capricorn (Makar Rashi), marking Uttarayan—the northward journey of the Sun and the transition toward warmer days. In Bengal, Poush Sankranti is synonymous with homemade pithe-puli, patishapta, and the world-famous Gangasagar Mela pilgrimage where millions take a holy dip at the confluence of the Ganga and the Bay of Bengal.",
      category: "Culture & Festivals",
      readTime: "5 min read",
      date: "Jan 10, 2025",
      author: "Bengal Cultural Desk",
      image: "/blogs/makar-sankranti-2025.jpg",
      featured: true,
    },
    {
      slug: "top-15-places-to-visit-for-durga-puja-2025",
      title: "Top 15 Places to Visit in India for Durga Puja 2025: Festival Travel Guide",
      excerpt:
        "From Kolkata's iconic heritage mandaps to grand pandals in Delhi CR Park, Mumbai, and Varanasi, discover the top 15 destinations to celebrate Durga Puja with private cab rentals.",
      content:
        "Durga Puja is celebrated with unmatched enthusiasm across India. This guide highlights the top 15 places to witness grand artistic pandals, dazzling lighting, and authentic traditional delicacies with BroomBoom car rental packages.",
      category: "Culture & Festivals",
      readTime: "7 min read",
      date: "Oct 05, 2024",
      author: "National Travel Desk",
      image: "/blogs/maa-durga-face-kumartuli.jpg",
      featured: true,
    },
    {
      slug: "howrah-bridge-and-kolkata-darshan-city-cab-guide",
      title: "Kolkata Darshan & Howrah Bridge Tour: Iconic Landmarks, Ghats & City Cabs Guide",
      excerpt:
        "Explore the City of Joy from the historic cantilever Howrah Bridge and Hooghly river ghats to Victoria Memorial and Princep Ghat. Book flexible 4-hour and 8-hour BroomBoom city rental cabs with local drivers.",
      content:
        "The iconic Howrah Bridge (Rabindra Setu) stands as the world's busiest cantilever bridge and the timeless symbol of Kolkata. Connecting Kolkata with Howrah across the Ganges (Hooghly River), this architectural marvel carries hundreds of thousands of commuters, iconic yellow taxis, and visitors daily without a single nut or bolt in its main steel structure.",
      category: "Taxi Services",
      readTime: "5 min read",
      date: "Nov 12, 2024",
      author: "Kolkata Operations Team",
      image: "/blogs/howrah-bridge-kolkata.jpg",
      featured: true,
    },
    {
      slug: "celebrate-republic-day-2025-car-rentals-gantantra-diwas",
      title: "Celebrate 76th Republic Day 2025 with BroomBoom Cabs: Your Ultimate Guide to Booking Car Rentals in the Gantantra Diwas",
      excerpt:
        "Make the most of the Republic Day long weekend with BroomBoom Cabs. Discover scenic road trips, patriotic parade events, verified chauffeurs, and special Gantantra Diwas outstation car rental packages across India.",
      content:
        "India's 76th Republic Day marks the historic moment in 1950 when the Constitution of India came into effect. Celebrated as Gantantra Diwas across the nation with grand flag hoisting ceremonies, parades, and cultural programs, the 26th of January also offers an ideal long weekend window for family road trips, heritage tours, and scenic outstation escapes.",
      category: "Republic Day",
      readTime: "5 min read",
      date: "Jan 24, 2025",
      author: "National Travel Desk",
      image: "/blogs/republic-day-2025.png",
      featured: true,
    },
  ],
};
