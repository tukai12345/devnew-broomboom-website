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
      image: "/blogs/kolkata-durga-puja-sindoor-khela.jpg",
      featured: true,
    },
    {
      slug: "kumartuli-kolkata-durga-idol-making-heritage-cab-tour",
      title: "Kumartuli Artisan Village & Durga Idol Craft: A Cultural Heritage Cab Tour of North Kolkata",
      excerpt:
        "Witness the sacred creation of Maa Durga clay idols in the labyrinthine alleys of Kumartuli. Discover age-old sculpting traditions, Mahalaya eye-painting rituals, and explore North Kolkata heritage with BroomBoom hourly rental cabs.",
      content:
        "Tucked along the northern banks of the Hooghly River, Kumartuli is the 300-year-old potters' quarter of Kolkata where generations of master sculptors mold sacred clay from the riverbed into breathtaking idols of Goddess Durga. In the months leading up to Durga Puja, the narrow lanes buzz with artistic fervor as straw armatures are layered with Gangamati and sculpted into expressive divine faces.\n\nThe most revered moment occurs on Mahalaya during 'Chokkhu Daan', when senior artisans paint the third eye and gaze of Maa Durga. Visiting Kumartuli along with nearby heritage mansions of North Kolkata like Sovabazar Rajbari and Marble Palace is seamless with BroomBoom's dedicated hourly rental cabs, providing door-to-door comfort and air-conditioned convenience.",
      category: "Culture & Festivals",
      readTime: "6 min read",
      date: "Sep 22, 2024",
      author: "Bengal Cultural Desk",
      image: "/blogs/maa-durga-face-kumartuli.jpg",
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
    {
      slug: "howrah-bridge-and-kolkata-darshan-city-cab-guide",
      title: "Kolkata Darshan & Howrah Bridge Tour: Iconic Landmarks, Ghats & City Cabs Guide",
      excerpt:
        "Explore the City of Joy from the historic cantilever Howrah Bridge and Hooghly river ghats to Victoria Memorial and Princep Ghat. Book flexible 4-hour and 8-hour BroomBoom city rental cabs with local drivers.",
      content:
        "The iconic Howrah Bridge (Rabindra Setu) stands as the world's busiest cantilever bridge and the timeless symbol of Kolkata. Connecting Kolkata with Howrah across the Ganges (Hooghly River), this architectural marvel carries hundreds of thousands of commuters, iconic yellow taxis, and visitors daily without a single nut or bolt in its main steel structure.\n\nTaking a Kolkata Darshan tour by cab allows you to explore the riverfront from Princep Ghat, Armenian Ghat, and Millennium Park to cultural icons like Victoria Memorial, St. Paul's Cathedral, and Indian Museum at your own leisure. BroomBoom Cabs provides air-conditioned hourly rental packages (4 hrs/40 km, 8 hrs/80 km, and full-day 12 hrs) with polite, route-savvy chauffeurs, ensuring you skip parking hassles and public transit congestion.",
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
        "India's 76th Republic Day marks the historic moment in 1950 when the Constitution of India came into effect. Celebrated as Gantantra Diwas across the nation with grand flag hoisting ceremonies, parades, and cultural programs, the 26th of January also offers an ideal long weekend window for family road trips, heritage tours, and scenic outstation escapes.\n\nWhether you are planning to attend local state celebrations, take a peaceful drive through heritage circuits like Shantiniketan, Bishnupur, or Kurseong, or enjoy a coastal getaway to Digha and Mandarmani, public transportation and bus stations experience massive festive rushes. BroomBoom Cabs offers guaranteed door-to-door car rental packages with professional commercial chauffeurs, zero surge fares, and 24x7 travel assistance so you can honor the day with stress-free travel.",
      category: "Republic Day",
      readTime: "5 min read",
      date: "Jan 24, 2025",
      author: "National Travel Desk",
      image: "/blogs/republic-day-2025.png",
      featured: true,
    },
    {
      slug: "things-to-do-on-makar-sankranti-2025",
      title: "Things to do on Makar Sankranti 2025: One Festival, Many Names, One Emotion",
      excerpt:
        "Makar Sankranti marks the arrival of the harvest season with vibrant kite flying, holy river dips, bonfire gatherings, and traditional sweets like pithe-puli. Discover cultural traditions and seamless festive travel with BroomBoom Cabs.",
      content:
        "Makar Sankranti 2025 is celebrated across India as the Sun enters the zodiac sign of Capricorn (Makar Rashi), marking Uttarayan—the northward journey of the Sun and the transition toward warmer days. In Bengal, Poush Sankranti is synonymous with homemade pithe-puli, patishapta, and the world-famous Gangasagar Mela pilgrimage where millions take a holy dip at the confluence of the Ganga and the Bay of Bengal.\n\nIn Gujarat and Rajasthan, the skies burst into color with the International Kite Festival (Uttarayan), while Tamil Nadu celebrates Pongal and Punjab honors Lohri with harvest bonfires. Whether you are traveling from Kolkata to Gangasagar or taking a family festive road trip, BroomBoom Cabs provides doorstep pickups, verified chauffeurs, and transparent flat rates without surge pricing.",
      category: "Culture & Festivals",
      readTime: "5 min read",
      date: "Jan 10, 2025",
      author: "Bengal Cultural Desk",
      image: "/blogs/makar-sankranti-2025.jpg",
      featured: true,
    },
    {
      slug: "holi-celebrations-and-dol-jatra-travel-guide",
      title: "Holi & Dol Jatra 2025: Vibrant Colors, Traditions & Best Road Trips Across India",
      excerpt:
        "Celebrate the festival of colors with joy, safety, and cultural splendor. From Shantiniketan's legendary Basanta Utsav and Mathura-Vrindavan's Braj Holi to royal palaces in Jaipur, plan your festive road trip with verified outstation cabs.",
      content:
        "Holi and Dol Purnima celebrate the triumph of good over evil, the blossoming of spring, and the eternal love of Radha and Krishna. In West Bengal, Dol Jatra is famously commemorated at Rabindranath Tagore's Visva-Bharati in Shantiniketan as 'Basanta Utsav', where students and visitors dress in yellow and celebrate with palash flowers, abir, songs, and classical dance performances.\n\nMeanwhile, North India comes alive with the grand festivities of Mathura, Vrindavan, and Barsana's Lathmar Holi. Public transit during Holi is notoriously overcrowded, but BroomBoom Cabs ensures a comfortable, clean AC ride with pre-assigned chauffeurs so you and your loved ones can celebrate without travel anxiety.",
      category: "Culture & Festivals",
      readTime: "5 min read",
      date: "Mar 05, 2025",
      author: "Heritage & Traditions",
      image: "/blogs/holi-celebration.jpg",
      featured: true,
    },
    {
      slug: "bagdogra-airport-taxi-service-siliguri-darjeeling-gangtok",
      title: "Bagdogra Airport Cabs: Seamless Transfers to Darjeeling, Gangtok, Bhutan & Dooars",
      excerpt:
        "Landing at Bagdogra Airport (IXB)? Avoid aggressive airport touts and exorbitant spot fares. Pre-book guaranteed fixed-rate airport cabs to Siliguri, Darjeeling, Kalimpong, Gangtok, and Phuentsholing with verified mountain drivers.",
      content:
        "Bagdogra Airport (IXB) serves as the primary aviation gateway to North Bengal, Sikkim, and neighboring Bhutan. Arriving passengers frequently face long queues, haggling with spot taxi drivers, and sudden rate surges. BroomBoom Airport Cabs solves this with upfront fixed fares and flight-delay tracking with up to 60 minutes complimentary waiting time.\n\nPopular routes from Bagdogra include Siliguri (16 km, 25 mins), Darjeeling via Rohini / Hill Cart Road (68 km, 2.5 hrs), Kalimpong (75 km, 2.5 hrs), Gangtok (124 km, 4.5 hrs), and the Bhutan border at Jaigaon/Phuentsholing (155 km, 4 hrs). Our fleet includes comfortable Sedans, high-ground-clearance Innova Crysta, and 12-26 seater Tempo Travellers driven by experienced hill chauffeurs.",
      category: "Taxi Services",
      readTime: "6 min read",
      date: "Feb 18, 2025",
      author: "North Bengal Operations Desk",
      image: "/blogs/bagdogra-airport-cabs.jpg",
      featured: true,
    },
    {
      slug: "belur-math-and-dakshineswar-temple-tour-kolkata",
      title: "Belur Math & Dakshineswar Temple Guide: Spiritual Serenity on the Banks of the Hooghly",
      excerpt:
        "Plan a peaceful pilgrimage to Belur Math (Headquarters of Ramakrishna Math & Mission) and Dakshineswar Kali Temple. Explore universal architecture, prayer timings, ferry ghats, and flexible hourly rental cab packages.",
      content:
        "Set along the tranquil western banks of the Hooghly River in Howrah, Belur Math was founded by Swami Vivekananda to embody the harmony of all faiths. The grand temple seamlessly incorporates architectural motifs from Hindu temples, Buddhist chaityas, Christian cathedrals, and Islamic monuments.\n\nJust across the river lies the historic Dakshineswar Kali Temple, where Sri Ramakrishna Paramahamsa experienced divine vision. Exploring both spiritual sanctuaries in a single day is best done using BroomBoom's 4-hour/40km or 8-hour/80km local hourly rental cabs, giving you the freedom to meditate, attend the evening Sandhya Arati, and browse spiritual literature without worrying about parking or booking multiple cabs.",
      category: "Spiritual Journeys",
      readTime: "5 min read",
      date: "Jan 28, 2025",
      author: "Spiritual Journeys Desk",
      image: "/blogs/belur-math-kolkata.jpg",
      featured: true,
    },
    {
      slug: "offbeat-himalayan-destinations-silk-route-zuluk-darjeeling",
      title: "Offbeat Himalayan Paradises in North Bengal & Sikkim: Old Silk Route, Zuluk & Rishop",
      excerpt:
        "Leave crowded hill stations behind and journey through the historic Old Silk Route, the 32 hairpin loops of Zuluk, pine-scented homestays of Rishop, and surreal cloud-kissed valleys with BroomBoom mountain cabs.",
      content:
        "For road trippers seeking untouched tranquility, Eastern Himalayas offer spectacular hidden valleys far away from the commercial tourist hubs. The historic Old Silk Route through East Sikkim passes through Zuluk—a high-altitude hamlet perched at 9,400 feet, famous for its breathtaking view of 32 hairpin loops and sunrise over the snow-crowned Kanchenjunga range from Lungthung and Thambi viewpoints.\n\nOther idyllic retreats include Rishop and Lepchajagat in North Bengal, nestled among silent oak and pine canopies. Navigating steep mountain inclines, high-altitude hairpin bends, and monsoon mist requires reliable commercial vehicles and seasoned mountain chauffeurs. BroomBoom Cabs provides certified mountain-ready Innova Crystas and Ertigas with full itinerary flexibility.",
      category: "Travel & Tourism",
      readTime: "7 min read",
      date: "Feb 10, 2025",
      author: "Himalayan Travel Desk",
      image: "/blogs/offbeat-himalayan-destinations.jpg",
      featured: true,
    },
  ],
};
