export interface TempleDetail {
  slug: string;
  aliases?: string[];
  name: string;
  bengaliName: string;
  deity: string;
  location: string;
  distanceFromKolkata: string;
  travelTime: string;
  bestTimeToVisit: string;
  darshanTimings: string;
  aartiTimings: string;
  highlights: string[];
  description: string;
  recommendedTripType: "Local Hourly Rental" | "Outstation Same-Day" | "Outstation Multi-Day";
  suggestedPackage: string;
  startingPrice: number;
  image: string;
  fleetFares: {
    category: string;
    model: string;
    capacity: string;
    ac: boolean;
    sameDayFare: string;
    roundTripFare: string;
    perKmRate: string;
    badge?: string;
  }[];
  itinerary: {
    time: string;
    title: string;
    desc: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const TEMPLE_KOLKATA_SLUGS = [
  "dakhineswar",
  "kalighat",
  "belurmath",
  "tarakeswar",
  "iskcon(mayapur)",
  "iskcon%28mayapur%29",
  "hangseswari",
  "tarapith",
  "108sibamandir",
  "jagannathtemplepuri",
] as const;

export const CANONICAL_TEMPLE_SLUGS = [
  "dakhineswar",
  "kalighat",
  "belurmath",
  "tarakeswar",
  "iskcon(mayapur)",
  "hangseswari",
  "tarapith",
  "108sibamandir",
  "jagannathtemplepuri",
];

export const TEMPLE_DETAILS_MAP: Record<string, TempleDetail> = {
  dakhineswar: {
    slug: "dakhineswar",
    name: "Dakshineswar Kali Temple",
    bengaliName: "দক্ষিণেশ্বর মা ভবতারিণী কালী মন্দির",
    deity: "Maa Bhavatarini (Goddess Kali) & 12 Shiva Shrines",
    location: "Dakshineswar, Kolkata / North 24 Parganas (Banks of Hooghly)",
    distanceFromKolkata: "14 km from Central Kolkata / 12 km from Airport",
    travelTime: "30 - 45 mins",
    bestTimeToVisit: "Throughout the year; early morning (6:00 AM) or evening (5:00 PM for Sandhya Arati)",
    darshanTimings: "6:00 AM – 12:30 PM & 3:30 PM – 8:30 PM (Daily)",
    aartiTimings: "Mangala Aarti: 6:00 AM | Sandhya Aarti: 6:30 PM",
    recommendedTripType: "Local Hourly Rental",
    suggestedPackage: "4 Hrs / 40 Kms or 8 Hrs / 80 Kms (Combined with Belur Math)",
    startingPrice: 1099,
    image: "/blogs/kolkata-durga-puja.jpg",
    highlights: [
      "Founded in 1855 by Rani Rashmoni along the sacred Hooghly (Ganga) River.",
      "The holy sadhana bhumi of Paramahamsa Sri Ramakrishna and Holy Mother Sarada Devi.",
      "12 identical Aat-Chala Shiva shrines lining the sacred bathing ghat.",
      "Radha Kanta Temple & Nahabat Khana where Maa Sarada stayed in divine remembrance.",
      "BroomBoom cabs provide doorstep pickup, AC waiting during darshan, and Belur Math ferry connection.",
    ],
    description:
      "Dakshineswar Kali Temple is one of eastern India's most venerated Hindu shrines. Situated gracefully on the eastern bank of the Hooghly River, it is dedicated to Bhavatarini—an aspect of Goddess Kali who liberates devotees from the ocean of worldly existence. BroomBoom Cabs offers dedicated, sanitized round-trip cabs with professional chauffeurs who assist senior citizens, handle luggage safely, and provide waiting options during darshan and puja offerings.",
    fleetFares: [
      {
        category: "Hatchback (WagonR / Tiago)",
        model: "WagonR, Tiago or equivalent AC",
        capacity: "4 Passengers + 2 Bags",
        ac: true,
        sameDayFare: "₹1,099 (4 Hr / 40 Km)",
        roundTripFare: "₹1,899 (8 Hr / 80 Km)",
        perKmRate: "₹11/km",
      },
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze, Toyota Etios",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹1,299 (4 Hr / 40 Km)",
        roundTripFare: "₹2,199 (8 Hr / 80 Km)",
        perKmRate: "₹12.5/km",
        badge: "Most Popular",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga, Kia Carens AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹1,899 (4 Hr / 40 Km)",
        roundTripFare: "₹2,999 (8 Hr / 80 Km)",
        perKmRate: "₹16.5/km",
        badge: "Best for Families",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹2,499 (4 Hr / 40 Km)",
        roundTripFare: "₹3,999 (8 Hr / 80 Km)",
        perKmRate: "₹21/km",
      },
    ],
    itinerary: [
      {
        time: "07:30 AM",
        title: "Doorstep Pickup Across Kolkata",
        desc: "Chauffeur arrives at your residence, hotel, or airport terminal in a sanitized AC cab.",
      },
      {
        time: "08:15 AM",
        title: "Arrival at Dakshineswar Kali Temple",
        desc: "Driver parks in designated parking zone and assists family members toward the pedestrian gate.",
      },
      {
        time: "08:30 AM - 10:30 AM",
        title: "Darshan, Puja & Panchabati Parikrama",
        desc: "Offer Puja to Maa Bhavatarini, pay obeisance at the 12 Shiva temples, and visit Sri Ramakrishna's room.",
      },
      {
        time: "10:45 AM",
        title: "Optional Belur Math Crossing",
        desc: "Drive via Vivekananda Setu / Nivedita Setu directly to Belur Math (Howrah) for quiet meditation.",
      },
      {
        time: "12:30 PM",
        title: "Comfortable Return Journey",
        desc: "Relax in air-conditioned comfort as your chauffeur drops you back to your doorstep.",
      },
    ],
    faqs: [
      {
        question: "How do I book a round-trip taxi from Kolkata to Dakshineswar Kali Temple?",
        answer:
          "You can book instantly online on BroomBoom Cabs or call 24x7 at +91 70035 89163. Select 'Local Hourly Rental' (4 Hr / 40 Km or 8 Hr / 80 Km) for uninterrupted waiting while you attend darshan.",
      },
      {
        question: "Can we combine Dakshineswar and Belur Math in the same cab booking?",
        answer:
          "Yes! Our 4-hour or 8-hour city rental package covers both Dakshineswar and Belur Math across the river without any extra surcharge. The driver will wait while you visit both sacred shrines.",
      },
      {
        question: "Are mobile phones and bags allowed inside Dakshineswar Temple?",
        answer:
          "Mobile phones and leather items are restricted inside the inner sanctum. You can safely leave your valuables and luggage with the BroomBoom chauffeur inside the locked cab.",
      },
      {
        question: "Is early morning pickup available for Mangala Aarti?",
        answer:
          "Yes, BroomBoom provides guaranteed early morning pickups as early as 4:30 AM or 5:00 AM across Kolkata, Salt Lake, New Town, and Howrah.",
      },
    ],
  },

  kalighat: {
    slug: "kalighat",
    name: "Kalighat Kali Temple",
    bengaliName: "কালীঘাট সতীপীঠ কালী মন্দির",
    deity: "Maa Kali (Right Toe of Devi Sati - 51 Shakti Peethas)",
    location: "Kalighat, South Kolkata (Near Chetla / Hazra)",
    distanceFromKolkata: "6 km from Esplanade / 22 km from Kolkata Airport",
    travelTime: "20 - 30 mins",
    bestTimeToVisit: "Tuesdays, Saturdays & Ashtami are auspicious; visit 6:00 AM - 8:00 AM for shorter queues",
    darshanTimings: "5:00 AM – 2:00 PM & 5:00 PM – 10:30 PM (Daily)",
    aartiTimings: "Nitya Bhog: 2:00 PM | Sandhya Aarti: 6:30 PM",
    recommendedTripType: "Local Hourly Rental",
    suggestedPackage: "4 Hrs / 40 Kms or 8 Hrs / 80 Kms (Combined with Birla Temple)",
    startingPrice: 999,
    image: "/blogs/maa-durga-face-kumartuli.jpg",
    highlights: [
      "One of the 51 venerable Shakti Peethas where the toes of the right foot of Sati fell.",
      "Unique idol featuring three massive golden eyes, long protruding golden tongue, and four hands.",
      "Sacred Kundupukur pond where the original Sati foot stone was discovered.",
      "BroomBoom chauffeurs know the authorized drop-off lanes avoiding chaotic Kalighat gullies.",
      "Zero surge pricing even on peak Tuesday/Saturday puja mornings and Navratri holidays.",
    ],
    description:
      "Kalighat Kali Temple is the spiritual nucleus of Kolkata. Dating back over two centuries in its current form and referenced in 15th-century texts, this sanctum sanctorum attracts thousands of devotees seeking Maa Kali's divine blessings. Parking near Kalighat's narrow lanes is notoriously challenging; BroomBoom's point-to-point drop and dedicated hourly rental cabs eliminate parking stress completely.",
    fleetFares: [
      {
        category: "Hatchback (WagonR / Tiago)",
        model: "WagonR, Tiago AC",
        capacity: "4 Passengers + 2 Bags",
        ac: true,
        sameDayFare: "₹999 (4 Hr / 40 Km)",
        roundTripFare: "₹1,799 (8 Hr / 80 Km)",
        perKmRate: "₹11/km",
      },
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹1,199 (4 Hr / 40 Km)",
        roundTripFare: "₹1,999 (8 Hr / 80 Km)",
        perKmRate: "₹12.5/km",
        badge: "Most Popular",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹1,699 (4 Hr / 40 Km)",
        roundTripFare: "₹2,799 (8 Hr / 80 Km)",
        perKmRate: "₹16.5/km",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹2,299 (4 Hr / 40 Km)",
        roundTripFare: "₹3,699 (8 Hr / 80 Km)",
        perKmRate: "₹21/km",
      },
    ],
    itinerary: [
      {
        time: "06:00 AM",
        title: "Early Morning Pickup",
        desc: "BroomBoom driver picks you up from your doorstep in Kolkata, Salt Lake, or airport.",
      },
      {
        time: "06:40 AM",
        title: "Arrival at Kalighat Temple Approach",
        desc: "Driver drops you safely at the authorized pedestrian entrance near Kali Temple Road.",
      },
      {
        time: "07:00 AM - 09:00 AM",
        title: "Garbhagriha Darshan & Puja",
        desc: "Offer puja to Maa Kali, touch the sacred Harikath, and offer pranami at Kundupukur.",
      },
      {
        time: "09:30 AM",
        title: "Optional Visit to Birla Mandir / Lake Kalibari",
        desc: "Your waiting cab drives you to the serene white marble Birla Mandir on Ballygunge Circular Road.",
      },
      {
        time: "11:00 AM",
        title: "Doorstep Drop Back",
        desc: "Chauffeur drops your family safely home with prasadam intact.",
      },
    ],
    faqs: [
      {
        question: "Where will the cab wait during our Kalighat Darshan?",
        answer:
          "Because Kalighat inner lanes are pedestrianized, your chauffeur waits in the official reserved parking zone on SP Mukherjee Road or near Rashbehari Crossing, and comes to the pickup gate immediately upon your call.",
      },
      {
        question: "Can we visit Kalighat directly after landing at Kolkata Airport?",
        answer:
          "Yes! We offer direct Kolkata Airport to Kalighat Temple transfer with waiting. Your driver meets you at the airport terminal with luggage assistance.",
      },
      {
        question: "Is senior citizen wheelchair support possible with BroomBoom?",
        answer:
          "Our chauffeurs drop senior citizens as close as allowed to the temple gate and happily assist with foldable wheelchairs in our spacious Dzire and Ertiga boots.",
      },
    ],
  },

  belurmath: {
    slug: "belurmath",
    name: "Belur Math",
    bengaliName: "বেলুড় মঠ (রামকৃষ্ণ মঠ ও মিশন)",
    deity: "Sri Ramakrishna Paramahamsa, Swami Vivekananda & Maa Sarada Devi",
    location: "Belur, Howrah (Western Bank of Hooghly)",
    distanceFromKolkata: "12 km from Howrah Station / 15 km from Esplanade",
    travelTime: "30 - 45 mins",
    bestTimeToVisit: "Late afternoon for Sandhya Aarti (Arati begins at sunset around 5:30 PM - 6:00 PM)",
    darshanTimings: "6:30 AM – 11:30 AM & 4:00 PM – 8:30 PM (Daily)",
    aartiTimings: "Evening Arati: Around 5:30 PM – 6:30 PM (Bell tolls at sunset)",
    recommendedTripType: "Local Hourly Rental",
    suggestedPackage: "4 Hrs / 40 Kms or 8 Hrs / 80 Kms (Ideal with Dakshineswar)",
    startingPrice: 1099,
    image: "/blogs/belur-math-kolkata.jpg",
    highlights: [
      "Global headquarters of Ramakrishna Math and Ramakrishna Mission founded by Swami Vivekananda.",
      "Unique synthesis of Hindu, Christian, Islamic, and Buddhist architectural elements celebrating religious unity.",
      "Samadhi temples of Swami Vivekananda, Holy Mother Sri Sarada Devi, and Swami Brahmananda.",
      "Lush riverside gardens offering absolute tranquility and pristine river breeze.",
      "Air-conditioned BroomBoom cabs provide seamless point-to-point travel across Howrah and Kolkata.",
    ],
    description:
      "Belur Math on the tranquil western bank of the Hooghly is an architectural and spiritual marvel. Conceived by Swami Vivekananda, the main temple is constructed in chunar stone and synthesizes church, mosque, and temple motifs to express universal harmony. Visitors come to meditate in the vast prayer hall, especially during the soul-stirring evening arati. BroomBoom Cabs offers comfortable round-trip cars with polite drivers who wait while you soak in the spiritual serenity.",
    fleetFares: [
      {
        category: "Hatchback (WagonR / Tiago)",
        model: "WagonR AC",
        capacity: "4 Passengers + 2 Bags",
        ac: true,
        sameDayFare: "₹1,099 (4 Hr / 40 Km)",
        roundTripFare: "₹1,899 (8 Hr / 80 Km)",
        perKmRate: "₹11/km",
      },
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹1,299 (4 Hr / 40 Km)",
        roundTripFare: "₹2,199 (8 Hr / 80 Km)",
        perKmRate: "₹12.5/km",
        badge: "Most Popular",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹1,899 (4 Hr / 40 Km)",
        roundTripFare: "₹2,999 (8 Hr / 80 Km)",
        perKmRate: "₹16.5/km",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹2,499 (4 Hr / 40 Km)",
        roundTripFare: "₹3,999 (8 Hr / 80 Km)",
        perKmRate: "₹21/km",
      },
    ],
    itinerary: [
      {
        time: "03:00 PM",
        title: "Afternoon Pickup from Kolkata",
        desc: "Relax in your AC cab as we drive across the Vivekananda Bridge toward Belur.",
      },
      {
        time: "03:45 PM",
        title: "Arrival at Belur Math Campus",
        desc: "Driver drops you at the visitor entrance gate with ample parking.",
      },
      {
        time: "04:00 PM - 05:15 PM",
        title: "Museum Tour & Holy Samadhi Shrines",
        desc: "Explore Ramakrishna Museum, Swami Vivekananda's room, and Maa Sarada Devi's temple on the ghat.",
      },
      {
        time: "05:30 PM - 06:30 PM",
        title: "Evening Arati in Main Temple Hall",
        desc: "Attend the serene 'Khandana Bhava Bandhana' evening prayer in the main hall.",
      },
      {
        time: "07:00 PM",
        title: "Comfortable Drop Home",
        desc: "Chauffeur drives you smoothly back home avoiding peak evening rush.",
      },
    ],
    faqs: [
      {
        question: "What is the best time to reach Belur Math for evening Arati?",
        answer:
          "The main temple hall opens at 4:00 PM and the evening arati commences around 5:30 PM (sunset). Devotees are encouraged to be seated inside the prayer hall by 5:15 PM.",
      },
      {
        question: "Can BroomBoom pick us up from Howrah Station to Belur Math?",
        answer:
          "Yes! Belur Math is just 6 km from Howrah Railway Station. Our driver meets you at Howrah Station with a name board and drops you at Belur Math in 15-20 minutes.",
      },
      {
        question: "Is there any entry fee or dress code at Belur Math?",
        answer:
          "Entry to Belur Math is completely free. Modest and respectful clothing covering shoulders and knees is recommended. Shoes must be deposited at the free counter before entering the prayer hall.",
      },
    ],
  },

  tarakeswar: {
    slug: "tarakeswar",
    name: "Tarakeswar Baba Taraknath Temple",
    bengaliName: "তারকেশ্বর বাবা তারকনাথ মন্দির",
    deity: "Baba Taraknath (Lord Shiva - Swayambhu Lingam)",
    location: "Tarakeswar, Hooghly District, West Bengal",
    distanceFromKolkata: "62 km from Kolkata via NH 19 & SH 2",
    travelTime: "1 hr 45 mins - 2 hrs",
    bestTimeToVisit: "Mondays, Maha Shivratri & Shravan Maas (July - August); early mornings are coolest",
    darshanTimings: "5:30 AM – 1:00 PM & 4:30 PM – 8:00 PM (Daily)",
    aartiTimings: "Bhog Aarti: 12:30 PM | Sandhya Aarti: 7:00 PM",
    recommendedTripType: "Outstation Same-Day",
    suggestedPackage: "Kolkata to Tarakeswar Same-Day Round Trip (8-10 Hours)",
    startingPrice: 2299,
    image: "/blogs/gangasagar-mela-temple.jpg",
    highlights: [
      "Historic atchala Shiva temple built in 1729 AD by Raja Bharamalla.",
      "Houses the highly revered Swayambhu (self-manifested) Lingam of Lord Shiva.",
      "Sacred Doodhpukur pond where pilgrims bathe before offering holy water (Jal Dhalna).",
      "Epicenter of the world-famous Shravani Mela when lakhs of Kawadias walk from Sheoraphuli Ghat.",
      "BroomBoom cabs provide smooth expressway driving via Durgapur Expressway with toll inclusion.",
    ],
    description:
      "Tarakeswar Temple in Hooghly is one of Bengal's most important pilgrimage destinations dedicated to Lord Shiva as Baba Taraknath. Devotees travel from across Bengal, Bihar, and Jharkhand to seek remedies for ailments and fulfillment of vows (Manat). The temple complex includes the Natmandir, Doodhpukur, and shrines to Kali and Lakshmi Narayan. With BroomBoom Cabs, your same-day round trip from Kolkata is comfortable, with air-conditioned waiting and punctual highway driving.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹2,499 Round-Trip",
        roundTripFare: "₹2,499 (Same Day)",
        perKmRate: "₹12/km",
        badge: "Value Choice",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹3,499 Round-Trip",
        roundTripFare: "₹3,499 (Same Day)",
        perKmRate: "₹15/km",
        badge: "Family Favorite",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹4,699 Round-Trip",
        roundTripFare: "₹4,699 (Same Day)",
        perKmRate: "₹19/km",
      },
      {
        category: "Tempo Traveller (13/17 Seater)",
        model: "Force Urbania / Traveller AC",
        capacity: "13-17 Passengers",
        ac: true,
        sameDayFare: "₹6,999 Round-Trip",
        roundTripFare: "₹6,999 (Same Day)",
        perKmRate: "₹25/km",
        badge: "Best for Groups",
      },
    ],
    itinerary: [
      {
        time: "06:00 AM",
        title: "Departure from Kolkata",
        desc: "Early morning pickup from your home; smooth drive along NH 19 and Singur highway.",
      },
      {
        time: "08:00 AM",
        title: "Arrival at Tarakeswar",
        desc: "Chauffeur parks near temple designated parking and guides family to the temple entrance.",
      },
      {
        time: "08:30 AM - 11:00 AM",
        title: "Doodhpukur Snan & Taraknath Darshan",
        desc: "Holy bath at Doodhpukur, Jalabhishek offering, and puja at the sanctum sanctorum.",
      },
      {
        time: "11:30 AM",
        title: "Temple Bhog or Local Breakfast",
        desc: "Enjoy traditional Bengali luchi alur dom or temple khichuri bhog at local pilgrim guest houses.",
      },
      {
        time: "01:30 PM",
        title: "Return to Kolkata",
        desc: "Relax in air-conditioned comfort as your chauffeur brings you back to your residence by afternoon.",
      },
    ],
    faqs: [
      {
        question: "How long does it take by taxi from Kolkata to Tarakeswar?",
        answer:
          "The distance is approximately 62 km. It takes around 1 hour 45 minutes to 2 hours via the Durgapur Expressway (NH 19) and State Highway 2.",
      },
      {
        question: "Are toll taxes and parking charges included in the fare?",
        answer:
          "Yes, we offer fully transparent packages. You can opt for all-inclusive fares covering tolls, state tax, and driver allowance with zero hidden surcharges.",
      },
      {
        question: "Is Tarakeswar suitable for elderly parents with mobility issues?",
        answer:
          "Yes! Our drivers drop senior citizens right at the pedestrian barricade point to minimize walking. Early mornings are quieter and much easier for elders to offer puja.",
      },
    ],
  },

  "iskcon(mayapur)": {
    slug: "iskcon(mayapur)",
    aliases: ["iskcon%28mayapur%29"],
    name: "ISKCON Mayapur Chandrodaya Mandir",
    bengaliName: "শ্রী মায়াপুর ইসকন চন্দ্রোদয় মন্দির ও শ্রীচৈতন্য জন্মস্থান",
    deity: "Sri Sri Radha Madhava, Pancha Tattva, Lord Narasimhadeva & TOVP",
    location: "Sri Mayapur Dham, Nadia District, West Bengal (Confluence of Jalangi & Ganga)",
    distanceFromKolkata: "130 km from Kolkata via NH 12 (Kalyani Expressway - Krishnanagar Highway)",
    travelTime: "3.5 - 4 hrs",
    bestTimeToVisit: "October to March; Gaura Purnima (Feb/Mar), Janmashtami & Kartik Maas are magnificent",
    darshanTimings: "4:15 AM – 1:00 PM & 4:00 PM – 8:30 PM (Daily)",
    aartiTimings: "Mangala Aarti: 4:15 AM | Darshan Aarti: 7:00 AM | Sandhya Aarti: 6:30 PM",
    recommendedTripType: "Outstation Same-Day",
    suggestedPackage: "Same-Day Day Trip (14 Hrs) or 2-Day / 1-Night Weekend Pilgrimage",
    startingPrice: 3499,
    image: "/blogs/gangasagar-mela.jpg",
    highlights: [
      "World Headquarters of ISKCON (International Society for Krishna Consciousness).",
      "Home to the magnificent Temple of the Vedic Planetarium (TOVP) — one of the world's largest religious monuments.",
      "Mesmerizing Kirtan in the temple hall of Sri Sri Radha Madhava and the eight Gopis.",
      "Goshala housing over 300 sacred cows, Srila Prabhupada Pushpa Samadhi, and Govinda's pure vegetarian dining.",
      "BroomBoom provides reliable highway cabs with experienced drivers familiar with the Kalyani Expressway route.",
    ],
    description:
      "Sri Mayapur Dham in Nadia district is the spiritual capital of the worldwide Gaudiya Vaishnava community and the divine appearance place of Sri Chaitanya Mahaprabhu. Set along the holy Jalangi and Bhagirathi rivers, the 600-acre ISKCON campus radiates transcendent devotion. Devotees flock here for the world-renowned Harinama Sankirtan, spiritual exhibitions, and sacred prasadam. BroomBoom Cabs offers comfortable same-day round-trip and overnight cab packages from Kolkata, ensuring a peaceful, spiritually uplifting journey.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹3,799 (Same-Day Round-Trip)",
        roundTripFare: "₹4,999 (2-Day Weekend Tour)",
        perKmRate: "₹12/km",
        badge: "Best for Couples/Small Families",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹5,199 (Same-Day Round-Trip)",
        roundTripFare: "₹6,799 (2-Day Weekend Tour)",
        perKmRate: "₹15.5/km",
        badge: "Most Popular",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹6,899 (Same-Day Round-Trip)",
        roundTripFare: "₹8,999 (2-Day Weekend Tour)",
        perKmRate: "₹19.5/km",
        badge: "Ultimate Comfort",
      },
      {
        category: "Tempo Traveller (13/17/26 Seater)",
        model: "Force Urbania / Traveller AC",
        capacity: "13 to 26 Passengers",
        ac: true,
        sameDayFare: "₹9,999 (Same-Day)",
        roundTripFare: "₹14,999 (2-Day Weekend)",
        perKmRate: "₹26/km",
        badge: "Kirtan Group Tour",
      },
    ],
    itinerary: [
      {
        time: "06:00 AM",
        title: "Pickup from Kolkata",
        desc: "Morning pickup from your Kolkata residence; cruise along the newly widened Kalyani Expressway and NH 12.",
      },
      {
        time: "09:45 AM",
        title: "Arrival at ISKCON Mayapur Main Gate",
        desc: "Driver assists with vehicle entry, luggage, and points you toward the reception and TOVP courtyard.",
      },
      {
        time: "10:15 AM - 01:00 PM",
        title: "Radha Madhava Darshan, TOVP & Prabhupada Samadhi",
        desc: "Attend holy darshan, circumambulate the samadhi mandir, and witness the awe-inspiring Vedic Planetarium dome.",
      },
      {
        time: "01:00 PM - 02:30 PM",
        title: "Pure Satvik Mahaprasad at Gada Bhavan / Govinda's",
        desc: "Relish hygienic, soul-satisfying Krishna Mahaprasadam served with love in the dining halls.",
      },
      {
        time: "03:00 PM - 05:00 PM",
        title: "Goshala Visit & Yogapith (Mahaprabhu Janmasthan)",
        desc: "Visit the serene cow sanctuary, followed by a short ride to Yogapith where Nimai (Chaitanya Mahaprabhu) appeared.",
      },
      {
        time: "05:30 PM",
        title: "Departure for Kolkata",
        desc: "Drive back along NH 12 with a short tea break, reaching Kolkata safely by 9:30 PM.",
      },
    ],
    faqs: [
      {
        question: "Can we complete Kolkata to Mayapur in a single day by cab?",
        answer:
          "Yes! Hundreds of families book our Same-Day Round Trip package. Starting at 6:00 AM from Kolkata gets you to Mayapur by 9:45 AM. You have over 7 hours to enjoy darshan, prasadam, and temple sights before returning by 9:30 PM.",
      },
      {
        question: "Can we keep the cab overnight if we stay at Mayapur Guesthouse?",
        answer:
          "Absolutely! Choose our 2-Day / 1-Night package. The cab and driver remain at your disposal for local travel between ISKCON, Yogapith, Rajapur Jagannath Temple, and Navadvipa ghats.",
      },
      {
        question: "Can we visit the Rajapur Jagannath Temple in Mayapur?",
        answer:
          "Yes! Rajapur Sri Jagannath Mandir is situated just 5 km from ISKCON Mayapur. Your BroomBoom chauffeur will happily drive you there as part of your itinerary.",
      },
    ],
  },

  hangseswari: {
    slug: "hangseswari",
    name: "Hangseshwari Temple",
    bengaliName: "হংসেশ্বরী মন্দির ও অনন্ত বাসুদেব মন্দির (বাঁশবেড়িয়া)",
    deity: "Maa Hangseshwari (Goddess Kali in 13-pinnacled Kundalini architecture)",
    location: "Bansberia, Hooghly District, West Bengal",
    distanceFromKolkata: "52 km from Kolkata via Kalyani Expressway / GT Road",
    travelTime: "1 hr 30 mins",
    bestTimeToVisit: "November to February; Kartik and Maghi Purnima festivals",
    darshanTimings: "6:00 AM – 12:30 PM & 4:00 PM – 7:30 PM (Daily)",
    aartiTimings: "Morning Aarti: 7:00 AM | Sandhya Aarti: 6:30 PM",
    recommendedTripType: "Local Hourly Rental",
    suggestedPackage: "Same-Day Hooghly Heritage & Temple Tour (Kolkata - Bansberia - Bandel - Hooghly Imambara)",
    startingPrice: 1999,
    image: "/blogs/offbeat-destinations-bengal.jpg",
    highlights: [
      "Architectural masterpiece with 13 lotus-bud minarets representing the human Kundalini anatomy (Ida, Pingala, Sushumna).",
      "Commissioned by Raja Nrisinghadev Roy Mahasaya in 1799 and completed by Rani Sankari in 1814.",
      "Adjacent Ananta Vasudeva Temple (1679 AD) features some of Bengal's finest terracotta relief carvings depicting Ramayana and Mahabharata scenes.",
      "Just 10 minutes from historic Bandel Church and Hooghly Imambara.",
      "Smooth ride with BroomBoom cabs through serene Hooghly riverside highways.",
    ],
    description:
      "Hangseshwari Temple in Bansberia is an extraordinary blend of Tantric philosophy and architectural genius. The temple stands 70 feet tall with 13 pinnacles shaped like blooming lotus buds, representing the six spiritual chakras and nerve channels in Yoga philosophy. Inside sits the stunning blue neem-wood deity of Maa Hangseshwari. Flanked by the terracotta Ananta Vasudeva Temple, it offers a rich cultural and spiritual pilgrimage. BroomBoom Cabs provides a complete day tour package combining Bansberia with Bandel.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹2,199 Round-Trip",
        roundTripFare: "₹2,199 (Same Day)",
        perKmRate: "₹12/km",
        badge: "Best Value",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹3,199 Round-Trip",
        roundTripFare: "₹3,199 (Same Day)",
        perKmRate: "₹15/km",
        badge: "Family Pick",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹4,299 Round-Trip",
        roundTripFare: "₹4,299 (Same Day)",
        perKmRate: "₹19/km",
      },
    ],
    itinerary: [
      {
        time: "08:00 AM",
        title: "Departure from Kolkata",
        desc: "Chauffeur picks you up; drive past Dakshineswar and along the scenic Kalyani Expressway / Mogra route.",
      },
      {
        time: "09:30 AM",
        title: "Arrival at Hangseshwari Temple Complex",
        desc: "Step into the lush courtyard housing both Hangseshwari and Ananta Vasudeva temples.",
      },
      {
        time: "09:45 AM - 11:30 AM",
        title: "Kundalini Temple Exploration & Terracotta Art",
        desc: "Offer puja to Maa Hangseshwari and admire the intricate 17th-century terracotta friezes.",
      },
      {
        time: "12:00 PM - 02:00 PM",
        title: "Visit Bandel Basilica & Hooghly Imambara",
        desc: "Short 15-minute drive to West Bengal's oldest church at Bandel and the grand sun-clock Imambara.",
      },
      {
        time: "03:30 PM",
        title: "Return to Kolkata",
        desc: "Relax on the highway drive back to your doorstep.",
      },
    ],
    faqs: [
      {
        question: "Can we cover Hangseshwari Temple and Bandel Church together?",
        answer:
          "Yes! They are just 6 km apart. Our Kolkata-Bansberia cab package covers Hangseshwari Temple, Ananta Vasudeva Mandir, and Bandel Church in one seamless day trip.",
      },
      {
        question: "What is special about the deity of Maa Hangseshwari?",
        answer:
          "The four-armed idol of Maa Hangseshwari is sculpted from neem wood and painted in divine blue, resting on a thousand-petaled lotus rising from Lord Shiva's navel.",
      },
    ],
  },

  tarapith: {
    slug: "tarapith",
    name: "Tarapith Temple",
    bengaliName: "তারাপীঠ মহাশ্মশান ও মা তারা মন্দির",
    deity: "Maa Tara (Fierce Tantric Shakti - Eyeball of Devi Sati - 51 Shakti Peethas)",
    location: "Tarapith, Rampurhat, Birbhum District, West Bengal (Banks of Dwarka River)",
    distanceFromKolkata: "225 km from Kolkata via NH 19 (Durgapur Expressway) & Panagarh-Morgram Highway",
    travelTime: "4.5 - 5.5 hrs",
    bestTimeToVisit: "September to March; Kaushiki Amavasya (Bhadra Maas) is the most sacred tantric festival",
    darshanTimings: "6:00 AM – 9:00 PM (Daily)",
    aartiTimings: "Bhog Aarti: 1:30 PM | Sandhya Aarti: 7:00 PM",
    recommendedTripType: "Outstation Multi-Day",
    suggestedPackage: "2-Day / 1-Night Pilgrimage Tour or Express Same-Day Cab",
    startingPrice: 4899,
    image: "/blogs/maa-durga-face-kumartuli.jpg",
    highlights: [
      "Renowned Siddha Peetha where Sage Vashistha attained supreme enlightenment through Tara Sadhana.",
      "Sacred Mahashmashan (cremation grounds) where the revered mystic saint Sadhak Bamakhyapa meditated.",
      "Devotees receive direct darshan of Maa Tara's stone representation and her divine silver mask.",
      "Pilgrims receive the sacred Tara Maa Anna Bhog and holy Charanamrita.",
      "BroomBoom Cabs provides seasoned highway chauffeurs, sanitized sedans, and SUVs with verified night driving credentials.",
    ],
    description:
      "Tarapith in the red-soil Birbhum district is one of India's most powerful Tantric pilgrimage sites. Dedicated to Maa Tara—the second of the Dasha Mahavidyas—this temple honors the Goddess who suckled Lord Shiva to cool the poison of Halahala. Adjacent to the temple is the famous burning ghat on the banks of the sacred Dwarka River where saint Bamakhyapa attained siddhi. BroomBoom Cabs offers round-trip pilgrimage cabs from Kolkata with doorstep pickup, flexible waiting, and elder-friendly travel assistance.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹5,499 (Express Same-Day)",
        roundTripFare: "₹6,999 (2-Day Pilgrimage)",
        perKmRate: "₹12/km",
        badge: "Value Choice",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹7,499 (Express Same-Day)",
        roundTripFare: "₹9,499 (2-Day Pilgrimage)",
        perKmRate: "₹15.5/km",
        badge: "Family Pick",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹9,999 (Express Same-Day)",
        roundTripFare: "₹12,499 (2-Day Pilgrimage)",
        perKmRate: "₹19.5/km",
        badge: "Supreme Comfort",
      },
      {
        category: "Tempo Traveller (13/17/26 Seater)",
        model: "Force Urbania / Traveller AC",
        capacity: "13 to 26 Passengers",
        ac: true,
        sameDayFare: "₹14,999",
        roundTripFare: "₹18,999 (2-Day Group Tour)",
        perKmRate: "₹26/km",
      },
    ],
    itinerary: [
      {
        time: "Day 1 - 06:00 AM",
        title: "Departure from Kolkata",
        desc: "Prompt pickup from your residence; scenic drive via Durgapur Expressway (NH 19) with a breakfast stop at Shaktigarh for authentic Langcha.",
      },
      {
        time: "Day 1 - 11:30 AM",
        title: "Check-in at Tarapith Hotel",
        desc: "Arrive at Tarapith, check into your hotel, and freshen up before darshan.",
      },
      {
        time: "Day 1 - 12:30 PM - 03:00 PM",
        title: "Maa Tara Puja & Maha Bhog",
        desc: "Attend holy darshan of Maa Tara, offer sari and puja, and partake in delicious temple khichuri bhog.",
      },
      {
        time: "Day 1 - 05:00 PM - 07:30 PM",
        title: "Mahashmashan & Bamakhyapa Temple",
        desc: "Visit the revered Samadhi Mandir of Sadhak Bamakhyapa and witness the powerful evening Aarti.",
      },
      {
        time: "Day 2 - 08:00 AM",
        title: "Optional Visit to Nalhati or Bakreswar",
        desc: "Drive to nearby Shakti Peethas like Nalateswari Temple or hot sulfur springs of Bakreswar.",
      },
      {
        time: "Day 2 - 02:00 PM",
        title: "Return Drive to Kolkata",
        desc: "Comfortable highway cruise back to Kolkata, reaching home by evening.",
      },
    ],
    faqs: [
      {
        question: "How long is the drive from Kolkata to Tarapith?",
        answer:
          "The distance is approximately 225 km. It takes around 4.5 to 5 hours via the 6-lane Durgapur Expressway (NH 19) and the state highway through Panagarh / Ilambazar.",
      },
      {
        question: "Can we do a same-day return trip from Kolkata to Tarapith?",
        answer:
          "Yes. Our Express Same-Day package starts at 5:00 AM from Kolkata, reaching Tarapith by 10:00 AM. After 4-5 hours for darshan and bhog, you begin the return journey by 3:30 PM to be back in Kolkata by 8:30 PM.",
      },
      {
        question: "Does the package include Bakreswar or Shantiniketan?",
        answer:
          "Yes! On a 2-day or 3-day booking, you can easily combine Tarapith with Shantiniketan (Bolpur) or Bakreswar hot springs without booking separate taxis.",
      },
    ],
  },

  "108sibamandir": {
    slug: "108sibamandir",
    name: "108 Shiva Temples (Nababhat & Kalna)",
    bengaliName: "১০৮ শিব মন্দির (নবাবহাট ও কালনা)",
    deity: "Lord Shiva (108 individual Aat-Chala terracotta shrines depicting the Rosary of 108 Beads)",
    location: "Nababhat, Bardhaman / Kalna, Purba Bardhaman District, West Bengal",
    distanceFromKolkata: "98 km (Nababhat, Bardhaman) / 82 km (Kalna) from Kolkata",
    travelTime: "2 hrs - 2.5 hrs",
    bestTimeToVisit: "October to March; Maha Shivratri & Shravan Mondays",
    darshanTimings: "6:00 AM – 12:00 PM & 4:00 PM – 8:00 PM (Daily)",
    aartiTimings: "Morning Puja: 7:30 AM | Evening Sandhya Deepam: 6:30 PM",
    recommendedTripType: "Outstation Same-Day",
    suggestedPackage: "Kolkata to 108 Shiva Temple Same-Day Cultural Heritage Tour",
    startingPrice: 2899,
    image: "/blogs/howrah-bridge-kolkata.jpg",
    highlights: [
      "Constructed in 1788 AD by Maharani Bishnu Kumari (Queen of Burdwan) to invoke divine peace.",
      "108 identical terracotta Shiva shrines arranged in two concentric geometrical rectangles.",
      "Symbolizes the sacred Japa Mala of 108 Rudraksha beads; features 74 black stone Shiva lingas and 34 white marble lingas.",
      "Also visit the nearby Sarbamangala Kali Temple and Curzon Gate in Bardhaman.",
      "BroomBoom Cabs offers relaxed highway travel via Durgapur Expressway with famous Shaktigarh Langcha stops.",
    ],
    description:
      "The 108 Shiva Temples (Nababhat 108 Shiv Mandir) near Bardhaman city is an astounding architectural and spiritual wonder of Bengal. Arranged in an intricate rectangular formation, each temple features classic Bengal Aat-Chala terracotta architecture. Devotees perform parikrama along the concentric pathways while chanting the sacred Shiva Panchakshara mantra. Kalna's Nava Kailash 108 Shiva Temple similarly features circular concentric rings. BroomBoom Cabs offers curated same-day temple tours with sanitized AC cars.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹2,899 Round-Trip",
        roundTripFare: "₹2,899 (Same Day)",
        perKmRate: "₹12/km",
        badge: "Best Value",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹3,999 Round-Trip",
        roundTripFare: "₹3,999 (Same Day)",
        perKmRate: "₹15/km",
        badge: "Family Pick",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹5,299 Round-Trip",
        roundTripFare: "₹5,299 (Same Day)",
        perKmRate: "₹19/km",
      },
    ],
    itinerary: [
      {
        time: "07:30 AM",
        title: "Departure from Kolkata",
        desc: "Morning pickup from your address; smooth cruise on NH 19 with a famous breakfast stop at Shaktigarh.",
      },
      {
        time: "10:00 AM",
        title: "Arrival at 108 Shiva Temple Nababhat",
        desc: "Driver parks near the temple gate and guides you inside the serene sanctum courtyard.",
      },
      {
        time: "10:15 AM - 12:00 PM",
        title: "108 Temple Parikrama & Puja",
        desc: "Perform holy Jalabhishek and parikrama around the 108 concentric shrines.",
      },
      {
        time: "12:30 PM - 02:00 PM",
        title: "Visit Sarbamangala Temple & Burdwan Palace",
        desc: "Short drive to Bardhaman's presiding deity Maa Sarbamangala and the historic Curzon Gate.",
      },
      {
        time: "03:30 PM",
        title: "Return to Kolkata",
        desc: "Relaxing drive back to Kolkata, reaching your doorstep by early evening.",
      },
    ],
    faqs: [
      {
        question: "Which 108 Shiva Temple is this—Nababhat or Kalna?",
        answer:
          "Our cabs cover both! Nababhat 108 Shiva Mandir is near Bardhaman city (98 km from Kolkata), while Kalna 108 Shiva Mandir (Nava Kailash) is in Kalna (82 km from Kolkata). You can choose your preferred destination or combine both in a single day tour.",
      },
      {
        question: "Can we stop at Shaktigarh for sweets along the way?",
        answer:
          "Yes! Shaktigarh falls directly on the NH 19 route. Our chauffeurs will gladly stop at the top sweet hubs for hot Shaktigarh Langcha and traditional Bengali breakfast.",
      },
    ],
  },

  jagannathtemplepuri: {
    slug: "jagannathtemplepuri",
    name: "Shree Jagannath Temple Puri",
    bengaliName: "শ্রী জগন্নাথ মন্দির পুরী (চারধাম তীর্থ)",
    deity: "Lord Jagannath, Balabhadra & Subhadra (Sacred Char Dham)",
    location: "Puri, Odisha (Coast of the Bay of Bengal)",
    distanceFromKolkata: "495 km from Kolkata via NH 16 (Kharagpur - Balasore - Bhubaneswar - Cuttack - Puri)",
    travelTime: "9 - 10 hrs",
    bestTimeToVisit: "October to March; Ratha Yatra (June/July), Snana Yatra & Chandan Yatra are globally famous",
    darshanTimings: "5:00 AM – 11:00 PM (Daily, except during secret rituals)",
    aartiTimings: "Mangala Aarti: 5:00 AM | Sakala Dhupa: 10:00 AM | Sandhya Dhupa: 7:00 PM | Pahuda: 11:00 PM",
    recommendedTripType: "Outstation Multi-Day",
    suggestedPackage: "3-Day / 2-Night or 4-Day / 3-Night Kolkata to Puri Pilgrim Tour",
    startingPrice: 11999,
    image: "/blogs/why-broomboom-intercity-travel.jpg",
    highlights: [
      "One of the four sacred Char Dham pilgrimage destinations in Hinduism.",
      "Magnificent 12th-century Kalinga architecture rising 214 feet high with the sacred Neela Chakra.",
      "Anandabazar — the world's largest open-air kitchen where 56 Bhog Mahaprasad is distributed daily.",
      "Combines Mahaprabhu Darshan with the Golden Beach, Konark Sun Temple, and Chilika Lake Dolphin Sanctuary.",
      "BroomBoom Cabs provides top-tier highway sedans and SUVs with commercial permits, dual experienced drivers on demand, and 24x7 route monitoring.",
    ],
    description:
      "Shree Jagannath Temple in Puri, Odisha is one of the four sacred Char Dhams that every devout Hindu dreams of visiting. Dedicated to Lord Jagannath (Lord of the Universe), Lord Balabhadra, and Devi Subhadra, the temple is an emblem of universal devotion and mystery—where the temple flag always flutters against the wind direction and no bird flies above the dome. Traveling from Kolkata to Puri with BroomBoom Cabs provides a private, luxurious highway journey via NH 16 with doorstep pickup, sightseeing flexibility at Konark and Dhauli, and verified highway chauffeurs.",
    fleetFares: [
      {
        category: "Sedan (Dzire / Etios)",
        model: "Swift Dzire, Honda Amaze AC",
        capacity: "4 Passengers + 3 Bags",
        ac: true,
        sameDayFare: "₹11,999 (3-Day Tour)",
        roundTripFare: "₹14,499 (4-Day Tour)",
        perKmRate: "₹12/km",
        badge: "Best for Families",
      },
      {
        category: "SUV (Ertiga / Carens)",
        model: "Maruti Ertiga AC",
        capacity: "6 Passengers + 4 Bags",
        ac: true,
        sameDayFare: "₹15,999 (3-Day Tour)",
        roundTripFare: "₹19,499 (4-Day Tour)",
        perKmRate: "₹15.5/km",
        badge: "Most Popular",
      },
      {
        category: "Premium SUV (Innova Crysta)",
        model: "Toyota Innova Crysta AC",
        capacity: "6-7 Passengers + 5 Bags",
        ac: true,
        sameDayFare: "₹21,999 (3-Day Tour)",
        roundTripFare: "₹26,999 (4-Day Tour)",
        perKmRate: "₹19.5/km",
        badge: "VIP Highway Tour",
      },
      {
        category: "Tempo Traveller (13/17/26 Seater)",
        model: "Force Urbania / Traveller AC",
        capacity: "13 to 26 Passengers",
        ac: true,
        sameDayFare: "₹31,999 (3-Day Tour)",
        roundTripFare: "₹38,999 (4-Day Tour)",
        perKmRate: "₹26/km",
        badge: "Pilgrimage Group",
      },
    ],
    itinerary: [
      {
        time: "Day 1 - 05:00 AM",
        title: "Early Departure from Kolkata",
        desc: "Morning pickup from your home; cross Vidyasagar Setu onto NH 16 towards Kolaghat, Kharagpur, and Balasore.",
      },
      {
        time: "Day 1 - 03:00 PM",
        title: "Arrival at Puri & Hotel Check-in",
        desc: "Reach holy Puri, check in to your sea-facing hotel, and unwind.",
      },
      {
        time: "Day 1 - 05:30 PM",
        title: "Grand Evening Jagannath Darshan",
        desc: "Enter through the Lion Gate (Singhadwara), offer obeisance to Lord Jagannath, Balabhadra, and Subhadra, and witness the changing of the Patitapabana flag.",
      },
      {
        time: "Day 2 - 08:30 AM",
        title: "Konark Sun Temple & Marine Drive",
        desc: "Scenic coastal drive along Marine Drive to the UNESCO World Heritage Konark Sun Temple and Chandrabhaga Beach.",
      },
      {
        time: "Day 2 - 02:00 PM",
        title: "Anandabazar 56 Bhog Mahaprasad",
        desc: "Relish the divine cooked Mahaprasad at Anandabazar inside the temple complex.",
      },
      {
        time: "Day 3 - 07:00 AM",
        title: "Scenic Return via Dhauli Peace Pagoda",
        desc: "Drive back with stops at Sakshigopal Temple, Dhauli Shanti Stupa, and Cuttack Silver Filigree center, reaching Kolkata by 7:00 PM.",
      },
    ],
    faqs: [
      {
        question: "How long does it take by cab from Kolkata to Puri?",
        answer:
          "The distance is about 495 km. Via the 4-to-6 lane National Highway 16, it takes approximately 9 to 10 hours including meal and fuel breaks.",
      },
      {
        question: "Can we include Konark Sun Temple and Bhubaneswar on the same trip?",
        answer:
          "Yes! Our 3-day and 4-day Kolkata to Puri tour packages include sightseeing at Konark Sun Temple, Chandrabhaga Beach, Dhauli Peace Pagoda, Lingaraj Temple, and Sakshigopal at no extra cab rental cost.",
      },
      {
        question: "Are inter-state border taxes and highway tolls covered?",
        answer:
          "We offer both all-inclusive quotes (covering Odisha state border permit, NHAI tolls, and driver night bata) and standard per-km plans with zero hidden surprises.",
      },
    ],
  },
};

export function parseTempleSlug(rawSlug: string): TempleDetail | null {
  if (!rawSlug) return null;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();

  // Direct lookup
  if (TEMPLE_DETAILS_MAP[decoded]) {
    return TEMPLE_DETAILS_MAP[decoded];
  }

  // Check aliases or strip special characters
  const normalized = decoded.replace(/[^a-z0-9]/g, "");

  for (const key of Object.keys(TEMPLE_DETAILS_MAP)) {
    const temple = TEMPLE_DETAILS_MAP[key];
    const keyNorm = key.replace(/[^a-z0-9]/g, "");
    if (keyNorm === normalized) {
      return temple;
    }
    if (temple.aliases?.some((a) => a.replace(/[^a-z0-9]/g, "") === normalized)) {
      return temple;
    }
  }

  return null;
}
