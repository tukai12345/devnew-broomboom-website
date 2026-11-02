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

export const INITIAL_BLOG_DATA: BlogPageData = {
  hero: {
    badge: "Travel Guides • Tips • Highway Updates",
    title: "The BroomBoom Road Journal",
    description:
      "Insider guides to highway driving, honest cab pricing, road trip itineraries, and travel advice for exploring India with comfort and savings.",
    backgroundImage:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
  },
  featuredSectionTitle: "Featured Editorial",
  articlesSectionTitle: "Latest Articles",
  posts: [
    {
      slug: "zero-return-fare-explained",
      title: "How BroomBoom's Zero Return Fare Saves You Up to 40% on Intercity Cabs",
      excerpt:
        "Traditional taxi operators charge round-trip rates even when you only need a drop. Here is the math behind why paying only one-way distance fare changes everything.",
      content:
        'When booking an intercity taxi across India, travellers have historically been charged double: the fare for their actual trip plus the "return fare" or dry-run cost of the cab heading back empty. At BroomBoom Cabs, our intelligent algorithmic fleet dispatch matches returning vehicles with passengers travelling in reverse directions. By eliminating the return-fare penalty, one-way outstation taxi rates are cut by up to 40% with zero hidden surcharges or surprise tolls.',
      category: "Fare Guide",
      readTime: "4 min read",
      date: "Oct 28, 2026",
      author: "BroomBoom Pricing Team",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      slug: "kolkata-to-digha-road-trip-guide",
      title: "Kolkata to Digha Cab Road Trip: NH16 Route, Tolls & Best Dhaba Stops",
      excerpt:
        "Planning a weekend seaside drive to Digha or Mandarmani? Check optimal departure timings, Fastag toll costs, and road condition updates for 2026.",
      content:
        "The road from Kolkata to Digha stretches roughly 185 kilometers via NH16 and NH116B. Departing early in the morning by 6:00 AM helps you skip Kona Expressway morning bottlenecks. Stop at Kolaghat for traditional Bengali breakfast and hot chai. Our BroomBoom verified AC Sedans and SUVs feature fast tag enabled tolls, polite verified chauffeurs, and ample luggage space for seaside family getaways.",
      category: "Road Trips",
      readTime: "6 min read",
      date: "Oct 24, 2026",
      author: "Eastern Region Desk",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "bangalore-to-mysore-expressway-taxi",
      title: "Bangalore to Mysore Expressway by Cab: Timings, Stops & Fare Breakdown",
      excerpt:
        "Everything you need to know about the 10-lane expressway drive from Bengaluru to Mysuru in an AC Sedan or Innova Crysta.",
      content:
        "The 118 km Bengaluru-Mysuru Expressway has slashed travel time between the IT capital and the heritage city to just under 90 minutes. BroomBoom outstation services provide doorstep pickup from anywhere in Bangalore, zero surge guarantees, and transparent toll inclusions.",
      category: "Highway Guides",
      readTime: "5 min read",
      date: "Oct 19, 2026",
      author: "South Operations Team",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "delhi-to-agra-samruddhi-tips",
      title: "Yamuna Expressway: Delhi to Agra Same-Day Return Taxi Itinerary",
      excerpt:
        "Visit the Taj Mahal and Agra Fort hassle-free with door-to-door cab pickup, toll inclusions, and driver allowances fully settled upfront.",
      content:
        "Experience seamless same-day return road travel on the world-class Yamuna Expressway. BroomBoom roundtrip cabs offer unlimited stops, dedicated commercial permits, and vetted chauffeurs who know the best rest plazas along the corridor.",
      category: "Itineraries",
      readTime: "5 min read",
      date: "Oct 15, 2026",
      author: "North Travel Desk",
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "hourly-rentals-vs-point-cabs",
      title: "Local Hourly Cab Rentals vs Point-to-Point Cabs: Which One Saves Money?",
      excerpt:
        "Comparing 4-hr/40km and 8-hr/80km chauffeur packages against back-to-back app ride hailing for business meetings and city errands.",
      content:
        "Booking individual rides for multiple business meetings or shopping trips causes waiting frustration and peak cancellation charges. BroomBoom Hourly Rentals keep one car and dedicated chauffeur at your beck and call throughout the day at flat hourly rates.",
      category: "Smart Travel",
      readTime: "4 min read",
      date: "Oct 10, 2026",
      author: "Fleet Operations",
      image:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      slug: "tempo-traveller-group-travel-checklist",
      title: "Group Travel Essentials: Choosing Between 12-Seater & 20-Seater Tempo Travellers",
      excerpt:
        "Planning a family wedding, pilgrimage, or corporate offsite? Here is how to select the right seater capacity with ample luggage room.",
      content:
        "When travelling with 10 or more passengers, splitting across multiple small cabs disrupts group bonding and costs more. Our luxury Tempo Travellers offer pushback seats, dual AC blowers, entertainment screens, and massive boot space for group luggage.",
      category: "Fleet Guide",
      readTime: "7 min read",
      date: "Oct 05, 2026",
      author: "Chauffeur Standards Team",
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
  ],
};

