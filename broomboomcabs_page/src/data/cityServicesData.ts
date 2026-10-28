export interface CityOutstationRoute {
  destination: string;
  distance: string;
  duration: string;
  hatchPrice: number;
  sedanPrice: number;
  suvPrice: number;
  tag?: string;
}

export interface CityRentalPackage {
  packageId: string;
  duration: string;
  km: string;
  hatchPrice: number;
  sedanPrice: number;
  suvPrice: number;
  popular?: boolean;
  idealFor: string;
}

export interface CityFaqItem {
  question: string;
  answer: string;
}

export interface CityServiceInfo {
  cityId: string;
  cityName: string;
  state: string;
  airportName: string;
  airportCode: string;
  airportStartingPrice: number;
  airportTerminalDrops: string[];
  outstationRoutes: CityOutstationRoute[];
  rentalPackages: CityRentalPackage[];
  popularLocalHotspots: string[];
  outstationOverview: string;
  rentalOverview: string;
  airportOverview: string;
  cityFaqs: CityFaqItem[];
}

export const TOP_10_CITIES_SERVICES: CityServiceInfo[] = [
  {
    cityId: "kolkata",
    cityName: "Kolkata",
    state: "West Bengal",
    airportName: "Netaji Subhash Chandra Bose Intl Airport",
    airportCode: "CCU",
    airportStartingPrice: 649,
    airportTerminalDrops: ["Terminal 2 Domestic & Intl", "New Town IT Hub", "Salt Lake Sector V", "Howrah Railway Station"],
    outstationOverview:
      "Travel seamlessly from the City of Joy to coastal havens like Digha and Mandarmani via NH16, the spiritual pilgrimage hub of Puri, or scenic North Bengal gateway Siliguri. Guaranteed zero return fare on all one-way outstation cabs with verified commercial chauffeurs.",
    rentalOverview:
      "Explore Kolkata's heritage from Victoria Memorial to Dakshineswar Temple or attend business summits in Sector V with our flexible 2h to 12h rental packages. Includes chilled AC, fuel, and unlimited local stops.",
    airportOverview:
      "Direct 24x7 terminal drops and pickups for Netaji Subhash Chandra Bose Airport (CCU). Chauffeur tracks your flight live with 45 minutes complimentary wait time and assistance with heavy luggage.",
    cityFaqs: [
      {
        question: "How do one-way outstation cabs from Kolkata to Digha work?",
        answer: "You strictly pay for the one-way distance to Digha (approx. 185 km) with zero return fare penalty. Driver allowance and fuel are 100% inclusive.",
      },
      {
        question: "Are pickups available across Howrah, Salt Lake, and South Kolkata?",
        answer: "Yes, BroomBoom provides doorstep pickup across all Kolkata postal codes including Howrah, Alipore, Ballygunge, Salt Lake, and New Town without extra pickup charges.",
      },
      {
        question: "Is there any night surcharge for CCU airport cabs?",
        answer: "No, our airport transfer rates are transparent 24 hours a day with zero surge pricing.",
      },
    ],
    outstationRoutes: [
      { destination: "Digha", distance: "185 km", duration: "4.5 hrs", hatchPrice: 2299, sedanPrice: 2699, suvPrice: 3799, tag: "Weekend Beach" },
      { destination: "Mandarmani", distance: "172 km", duration: "4.0 hrs", hatchPrice: 2499, sedanPrice: 2899, suvPrice: 3999, tag: "Seaside Resorts" },
      { destination: "Siliguri", distance: "560 km", duration: "11.5 hrs", hatchPrice: 9499, sedanPrice: 10999, suvPrice: 14999, tag: "North Bengal Gateway" },
      { destination: "Puri", distance: "500 km", duration: "9.5 hrs", hatchPrice: 7999, sedanPrice: 8999, suvPrice: 12499, tag: "Pilgrimage Beach" },
      { destination: "Bolpur (Shantiniketan)", distance: "165 km", duration: "3.5 hrs", hatchPrice: 2899, sedanPrice: 3399, suvPrice: 4699, tag: "Heritage Tour" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 499, sedanPrice: 649, suvPrice: 899, idealFor: "Park Street & Victoria Memorial shopping" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 899, sedanPrice: 1149, suvPrice: 1549, idealFor: "Sector V corporate meetings & errands" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1699, sedanPrice: 2099, suvPrice: 2799, popular: true, idealFor: "Full day Dakshineswar & city temple tour" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2499, sedanPrice: 2999, suvPrice: 3899, idealFor: "Weddings, banquets & multi-stop city disposal" },
    ],
    popularLocalHotspots: ["Park Street", "Salt Lake Sector V", "Howrah Bridge", "New Town Eco Park", "Dakshineswar Temple"],
  },
  {
    cityId: "delhi",
    cityName: "Delhi NCR",
    state: "Delhi",
    airportName: "Indira Gandhi International Airport",
    airportCode: "DEL",
    airportStartingPrice: 699,
    airportTerminalDrops: ["Terminal 1 (Indigo/SpiceJet)", "Terminal 2 & 3 (International)", "Gurugram Cyber City", "Noida Sector 62"],
    outstationOverview:
      "Depart from India's capital to the Taj Mahal via Yamuna Expressway, royal palaces of Jaipur via the Delhi-Mumbai Expressway, or Himalayan getaways like Rishikesh, Dehradun, and Chandigarh. Certified highway chauffeurs with Fastag integration.",
    rentalOverview:
      "Navigate Delhi, Gurugram, and Noida effortlessly with private chauffeur-driven hourly rentals. Perfect for embassy visits, corporate Cyber City rounds, Chandni Chowk shopping, and monument tours.",
    airportOverview:
      "Fast, dependable airport transfers to IGI Terminal 1, 2, and 3. Chauffeurs monitor flight arrivals live with flight delay protection and zero early-morning surge charges.",
    cityFaqs: [
      {
        question: "Are Yamuna Expressway and toll charges included for Delhi to Agra?",
        answer: "All highway toll taxes and state road taxes are transparently calculated and displayed upfront during booking with zero hidden charges.",
      },
      {
        question: "Can I book pickups from Gurugram, Noida, and Ghaziabad?",
        answer: "Yes, our doorstep pickup network covers the entire NCR region including Gurugram Cyber Hub, Noida Sector 62, Faridabad, and Greater Noida.",
      },
      {
        question: "Do drivers follow expressway speed limits?",
        answer: "All our drivers are commercial license holders trained specifically in expressway protocol and speed control for 100% passenger safety.",
      },
    ],
    outstationRoutes: [
      { destination: "Agra", distance: "230 km", duration: "3.5 hrs", hatchPrice: 2199, sedanPrice: 2599, suvPrice: 3699, tag: "Taj Expressway" },
      { destination: "Jaipur", distance: "280 km", duration: "4.5 hrs", hatchPrice: 2799, sedanPrice: 3299, suvPrice: 4499, tag: "Pink City Express" },
      { destination: "Chandigarh", distance: "250 km", duration: "4.5 hrs", hatchPrice: 2899, sedanPrice: 3399, suvPrice: 4699, tag: "NH44 Highway" },
      { destination: "Haridwar & Rishikesh", distance: "240 km", duration: "5.0 hrs", hatchPrice: 2749, sedanPrice: 3199, suvPrice: 4499, tag: "Ganga Pilgrimage" },
      { destination: "Dehradun & Mussoorie", distance: "270 km", duration: "5.5 hrs", hatchPrice: 3299, sedanPrice: 3799, suvPrice: 5199, tag: "Hills Vacation" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 549, sedanPrice: 699, suvPrice: 949, idealFor: "Connaught Place & India Gate quick visits" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 949, sedanPrice: 1199, suvPrice: 1599, idealFor: "Noida to Gurugram corporate meetings" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1799, sedanPrice: 2199, suvPrice: 2899, popular: true, idealFor: "Full day Old Delhi food & monument tour" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2599, sedanPrice: 3099, suvPrice: 3999, idealFor: "Full NCR interstate day coverage" },
    ],
    popularLocalHotspots: ["Connaught Place", "Gurugram Cyber Hub", "Noida City Centre", "Aerocity", "South Ex Market"],
  },
  {
    cityId: "mumbai",
    cityName: "Mumbai",
    state: "Maharashtra",
    airportName: "Chhatrapati Shivaji Maharaj Intl Airport",
    airportCode: "BOM",
    airportStartingPrice: 749,
    airportTerminalDrops: ["Terminal 1 Domestic (Santacruz)", "Terminal 2 T2 (Sahar)", "BKC Financial Centre", "South Bombay (CSMT)"],
    outstationOverview:
      "Travel across the Mumbai-Pune Expressway, escape to the misty Western Ghats of Lonavala and Mahabaleshwar, or reach Shirdi via Samruddhi Mahamarg. Clean sanitized cabs, verified hill drivers, and zero return fare on one-way trips.",
    rentalOverview:
      "Beat Mumbai's traffic with your personal chauffeur. Travel comfortably between BKC, Nariman Point, Bandra, and Andheri for business deals, film shoots, or full-day shopping sprees.",
    airportOverview:
      "Punctual airport transfers to BOM Terminal 1 & 2. Chauffeur tracks your flight live, meets you at the arrival terminal with luggage support, and guarantees zero night surge.",
    cityFaqs: [
      {
        question: "Is Mumbai-Pune Expressway toll included in one-way cab fares?",
        answer: "Yes, toll charges and Fastag costs are displayed with 100% itemized transparency before confirmation.",
      },
      {
        question: "Do you serve Thane, Navi Mumbai, and South Bombay?",
        answer: "Yes, doorstep pickup is available 24/7 across Colaba, BKC, Bandra, Powai, Thane, and Navi Mumbai with zero doorstep surcharge.",
      },
      {
        question: "What if my return flight to Mumbai is delayed by 2 hours?",
        answer: "Our automated dispatch system monitors your flight number live and adjusts the pickup schedule automatically without extra waiting penalties.",
      },
    ],
    outstationRoutes: [
      { destination: "Pune", distance: "150 km", duration: "2.5 hrs", hatchPrice: 1999, sedanPrice: 2399, suvPrice: 3499, tag: "Mumbai-Pune Expressway" },
      { destination: "Lonavala & Khandala", distance: "85 km", duration: "2.0 hrs", hatchPrice: 1699, sedanPrice: 1999, suvPrice: 2899, tag: "Monsoon Hills" },
      { destination: "Shirdi", distance: "240 km", duration: "4.5 hrs", hatchPrice: 3499, sedanPrice: 3999, suvPrice: 5399, tag: "Samruddhi Mahamarg" },
      { destination: "Nashik", distance: "165 km", duration: "3.5 hrs", hatchPrice: 2599, sedanPrice: 2999, suvPrice: 4199, tag: "Wine Capital & Kumbh" },
      { destination: "Alibaug & Kashid", distance: "100 km", duration: "2.5 hrs", hatchPrice: 2299, sedanPrice: 2699, suvPrice: 3699, tag: "Coastal Getaway" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 599, sedanPrice: 749, suvPrice: 999, idealFor: "Bandra to BKC meetings & visits" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 999, sedanPrice: 1249, suvPrice: 1649, idealFor: "South Mumbai heritage & shopping rounds" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1899, sedanPrice: 2299, suvPrice: 2999, popular: true, idealFor: "Full day corporate client disposal" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2699, sedanPrice: 3199, suvPrice: 4199, idealFor: "Thane, Navi Mumbai & island city tour" },
    ],
    popularLocalHotspots: ["Bandra Kurla Complex", "Marine Drive", "Juhu Beach", "Powai", "Andheri Lokhandwala"],
  },
  {
    cityId: "bangalore",
    cityName: "Bengaluru",
    state: "Karnataka",
    airportName: "Kempegowda International Airport",
    airportCode: "BLR",
    airportStartingPrice: 799,
    airportTerminalDrops: ["Terminal 1 & Terminal 2 Garden Terminal", "Whitefield Tech Parks", "Electronic City", "Koramangala & Indiranagar"],
    outstationOverview:
      "Zip from Bengaluru to Mysuru in under 2 hours via the 10-lane expressway, unwind in Coorg's coffee plantations, or climb to Nilgiris in Ooty. Chauffeurs are fluent in Kannada, English, and Hindi with hill safety certifications.",
    rentalOverview:
      "Avoid city traffic stress with our hourly rental packages. Hop between IT parks in Whitefield, Outer Ring Road, and Electronic City with continuous AC and zero waiting surcharges.",
    airportOverview:
      "Guaranteed on-time airport drop and arrival pickup for Kempegowda Airport (BLR T1 & T2). Enjoy 45 minutes complimentary wait time and live flight tracking.",
    cityFaqs: [
      {
        question: "How long does a one-way cab take from Bengaluru to Mysuru?",
        answer: "Via the 10-lane Bengaluru-Mysuru Expressway, journey time is typically under 2 hours from NICE road junction.",
      },
      {
        question: "Are airport cabs available to Kempegowda from Electronic City & Whitefield?",
        answer: "Yes, our airport cabs service all Bengaluru tech corridors with fixed upfront rates and zero surge pricing.",
      },
      {
        question: "Can I book a multi-day round trip cab to Coorg or Ooty?",
        answer: "Yes, round-trip vacation packages include vehicle maintenance, fuel, and driver night allowance transparently.",
      },
    ],
    outstationRoutes: [
      { destination: "Mysuru", distance: "145 km", duration: "2.0 hrs", hatchPrice: 2199, sedanPrice: 2599, suvPrice: 3699, tag: "10-Lane Expressway" },
      { destination: "Coorg (Madikeri)", distance: "250 km", duration: "5.5 hrs", hatchPrice: 3999, sedanPrice: 4599, suvPrice: 6299, tag: "Coffee Plantations" },
      { destination: "Ooty", distance: "280 km", duration: "6.0 hrs", hatchPrice: 4499, sedanPrice: 5199, suvPrice: 6999, tag: "Nilgiri Mountain Drive" },
      { destination: "Pondicherry", distance: "310 km", duration: "6.5 hrs", hatchPrice: 4699, sedanPrice: 5399, suvPrice: 7299, tag: "French Coastal Town" },
      { destination: "Tirupati", distance: "250 km", duration: "5.0 hrs", hatchPrice: 3899, sedanPrice: 4499, suvPrice: 5999, tag: "Balaji Darshan" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 549, sedanPrice: 699, suvPrice: 949, idealFor: "Indiranagar to Koramangala meetings" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 949, sedanPrice: 1199, suvPrice: 1599, idealFor: "Electronic City & Outer Ring Road visits" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1799, sedanPrice: 2199, suvPrice: 2899, popular: true, idealFor: "Full day IT corridor disposal" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2599, sedanPrice: 3099, suvPrice: 3999, idealFor: "Multi-point tech company meetings" },
    ],
    popularLocalHotspots: ["Whitefield", "Koramangala", "Indiranagar 100ft Road", "Manyata Tech Park", "MG Road"],
  },
  {
    cityId: "pune",
    cityName: "Pune",
    state: "Maharashtra",
    airportName: "Pune International Airport",
    airportCode: "PNQ",
    airportStartingPrice: 599,
    airportTerminalDrops: ["New Integrated Terminal", "Hinjawadi IT Park Phase 1-3", "Magarpatta Cybercity", "Kharadi EON Free Zone"],
    outstationOverview:
      "Travel from Maharashtra's cultural capital to Mumbai via expressway, the strawberry valleys of Mahabaleshwar, Sai Baba temple in Shirdi, or coastal Goa. Verified commercial cabs with zero return fare on one-way rides.",
    rentalOverview:
      "Perfect for Pune corporate executives and families needing full day city disposal across Hinjawadi, Koregaon Park, and Kharadi with unlimited stops and zero surge pricing.",
    airportOverview:
      "Prompt airport pickups and drops for Pune Airport (PNQ - Lohegaon). Driver arrives 15 minutes before scheduled departure with live flight tracking.",
    cityFaqs: [
      {
        question: "Can I book a shared or private outstation cab to Mumbai Airport?",
        answer: "BroomBoom offers exclusive private cabs for complete comfort, direct doorstep pickup, and direct drop at BOM Terminal 1 or 2.",
      },
      {
        question: "Are Ghat-experienced chauffeurs provided for Mahabaleshwar?",
        answer: "Yes, our drivers for hill routes have mandatory Western Ghats driving experience and commercial fitness certificates.",
      },
      {
        question: "Are early morning pickups available in Hinjawadi IT Park?",
        answer: "Yes, 24x7 doorstep cab dispatch is available across Hinjawadi Phase 1, 2, and 3.",
      },
    ],
    outstationRoutes: [
      { destination: "Mumbai (CSMT / Airport)", distance: "150 km", duration: "2.5 hrs", hatchPrice: 1999, sedanPrice: 2399, suvPrice: 3499, tag: "Direct Expressway" },
      { destination: "Mahabaleshwar & Panchgani", distance: "120 km", duration: "3.0 hrs", hatchPrice: 2399, sedanPrice: 2799, suvPrice: 3899, tag: "Strawberry Valley" },
      { destination: "Shirdi", distance: "190 km", duration: "4.0 hrs", hatchPrice: 2899, sedanPrice: 3399, suvPrice: 4699, tag: "Sai Baba Pilgrimage" },
      { destination: "Lonavala", distance: "65 km", duration: "1.2 hrs", hatchPrice: 1499, sedanPrice: 1799, suvPrice: 2599, tag: "Weekend Hills" },
      { destination: "Goa (North / South)", distance: "450 km", duration: "9.0 hrs", hatchPrice: 7499, sedanPrice: 8499, suvPrice: 11999, tag: "Beach Holiday Drive" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 499, sedanPrice: 649, suvPrice: 899, idealFor: "FC Road & Koregaon Park shopping" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 899, sedanPrice: 1149, suvPrice: 1549, idealFor: "Kharadi to Hinjawadi business transit" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1699, sedanPrice: 2099, suvPrice: 2799, popular: true, idealFor: "Full day Pune heritage & IT visits" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2499, sedanPrice: 2999, suvPrice: 3899, idealFor: "Chakan / Talegaon industrial tours" },
    ],
    popularLocalHotspots: ["Hinjawadi", "Koregaon Park", "Viman Nagar", "Kharadi", "Senapati Bapat Road"],
  },
  {
    cityId: "jaipur",
    cityName: "Jaipur",
    state: "Rajasthan",
    airportName: "Jaipur International Airport",
    airportCode: "JAI",
    airportStartingPrice: 599,
    airportTerminalDrops: ["Terminal 2 Domestic & Intl", "Sitapura Industrial Area", "Amer Heritage Zone", "Jaipur Railway Junction"],
    outstationOverview:
      "Journey from the Pink City to Delhi NCR, Agra, Ajmer, Pushkar, Udaipur, and Jodhpur. Travel like royalty with our comfortable, air-conditioned Sedans and SUVs with verified highway pilots.",
    rentalOverview:
      "Discover Jaipur's majestic palaces, Amer Fort, Nahargarh, and vibrant Johari Bazaar with a dedicated private chauffeur. Unlimited stops with transparent hourly pricing.",
    airportOverview:
      "Prompt airport taxi service for Jaipur International Airport (JAI). Enjoy hassle-free luggage assistance, on-time arrivals, and fixed pricing with zero surge.",
    cityFaqs: [
      {
        question: "Can I book a day-trip cab from Jaipur to Ajmer and Pushkar?",
        answer: "Yes, you can easily book a same-day return or one-way cab with driver allowance and tolls calculated transparently.",
      },
      {
        question: "Does the hourly rental package cover the hill climb to Nahargarh Fort?",
        answer: "Yes, all our local city rental packages cover Amer Fort, Jaigarh, Nahargarh, and Chokhi Dhani.",
      },
      {
        question: "Are cabs available for late night JAI airport pickups?",
        answer: "Yes, our airport taxis operate 24x7 with live flight tracking and zero night surge penalties.",
      },
    ],
    outstationRoutes: [
      { destination: "Delhi NCR", distance: "280 km", duration: "4.5 hrs", hatchPrice: 2799, sedanPrice: 3299, suvPrice: 4499, tag: "Delhi-Jaipur Highway" },
      { destination: "Agra", distance: "240 km", duration: "4.0 hrs", hatchPrice: 2599, sedanPrice: 2999, suvPrice: 4199, tag: "Golden Triangle Route" },
      { destination: "Ajmer & Pushkar", distance: "140 km", duration: "2.5 hrs", hatchPrice: 1899, sedanPrice: 2299, suvPrice: 3199, tag: "Dargah & Sacred Lake" },
      { destination: "Udaipur", distance: "400 km", duration: "6.5 hrs", hatchPrice: 5499, sedanPrice: 6299, suvPrice: 8499, tag: "City of Lakes" },
      { destination: "Jodhpur", distance: "330 km", duration: "5.5 hrs", hatchPrice: 4799, sedanPrice: 5499, suvPrice: 7499, tag: "Blue City Route" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 499, sedanPrice: 649, suvPrice: 899, idealFor: "Hawa Mahal & Johari Bazaar shopping" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 899, sedanPrice: 1149, suvPrice: 1549, idealFor: "City Palace & Jantar Mantar tour" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1699, sedanPrice: 2099, suvPrice: 2799, popular: true, idealFor: "Amer, Nahargarh & Jaigarh Forts day tour" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2499, sedanPrice: 2999, suvPrice: 3899, idealFor: "Chokhi Dhani evening & wedding events" },
    ],
    popularLocalHotspots: ["Hawa Mahal", "Amer Fort", "C-Scheme", "Malviya Nagar", "Tonk Road"],
  },
  {
    cityId: "siliguri",
    cityName: "Siliguri",
    state: "West Bengal",
    airportName: "Bagdogra International Airport",
    airportCode: "IXB",
    airportStartingPrice: 599,
    airportTerminalDrops: ["Bagdogra Terminal", "NJP Railway Station", "Sevoke Road", "Matigara City Centre"],
    outstationOverview:
      "Gateway to the Northeast Himalayas! Book verified hill cabs to Darjeeling, Gangtok (Sikkim), Kalimpong, Dooars wildlife sanctuaries, and Kolkata. Experienced mountain drivers familiar with Rohini and Teesta highways.",
    rentalOverview:
      "Explore Siliguri, NJP railway hub, Hong Kong Market, and Sevoke Kali Mandir comfortably with hourly rentals. Includes expert driver and clean air-conditioned vehicles.",
    airportOverview:
      "Direct transfers to and from Bagdogra Airport (IXB). Connect seamlessly to Darjeeling or Sikkim hill stations without syndicate hassles or surge pricing.",
    cityFaqs: [
      {
        question: "Can I book a direct cab from Bagdogra Airport to Darjeeling or Gangtok?",
        answer: "Yes, our verified chauffeurs pick you up right outside Bagdogra Arrival Terminal and drive you directly to your resort in Darjeeling or Gangtok.",
      },
      {
        question: "Do drivers possess hill driving permits for Sikkim and Dooars?",
        answer: "Yes, all our drivers are experienced hill drivers with commercial licenses and thorough knowledge of mountain roads.",
      },
      {
        question: "Is doorstep pickup available at NJP Railway Station?",
        answer: "Yes, drivers wait at the designated NJP pickup parking with a passenger name board.",
      },
    ],
    outstationRoutes: [
      { destination: "Darjeeling", distance: "65 km", duration: "2.5 hrs", hatchPrice: 2199, sedanPrice: 2599, suvPrice: 3499, tag: "Hill Queen Express" },
      { destination: "Gangtok (Sikkim)", distance: "115 km", duration: "4.0 hrs", hatchPrice: 3499, sedanPrice: 3999, suvPrice: 5299, tag: "Teesta River Highway" },
      { destination: "Kalimpong", distance: "70 km", duration: "2.5 hrs", hatchPrice: 2499, sedanPrice: 2899, suvPrice: 3899, tag: "Scenic Valley" },
      { destination: "Dooars (Lataguri / Jaldapara)", distance: "75 km", duration: "2.0 hrs", hatchPrice: 2299, sedanPrice: 2699, suvPrice: 3699, tag: "Jungle Safari Route" },
      { destination: "Kolkata", distance: "560 km", duration: "11.5 hrs", hatchPrice: 9499, sedanPrice: 10999, suvPrice: 14999, tag: "North-South Corridor" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 499, sedanPrice: 649, suvPrice: 899, idealFor: "Hong Kong Market & NJP pickup" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 899, sedanPrice: 1149, suvPrice: 1549, idealFor: "Sevoke Kali Mandir & coronation bridge" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1699, sedanPrice: 2099, suvPrice: 2799, popular: true, idealFor: "Mirik lake & tea garden day exploration" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2499, sedanPrice: 2999, suvPrice: 3899, idealFor: "Full Dooars foothills disposal" },
    ],
    popularLocalHotspots: ["Sevoke Road", "Hong Kong Market", "City Centre Mall", "NJP Station", "Salugara Monastery"],
  },
  {
    cityId: "hyderabad",
    cityName: "Hyderabad",
    state: "Telangana",
    airportName: "Rajiv Gandhi International Airport",
    airportCode: "HYD",
    airportStartingPrice: 749,
    airportTerminalDrops: ["Main Domestic & Intl Terminal", "HITEC City & Gachibowli", "Secunderabad Railway Station", "Banjara Hills"],
    outstationOverview:
      "Travel from the Pearl City to Vijayawada via the expressway, Srisailam Jyotirlinga, historical Warangal, or sacred Tirupati. Premium Sedans and SUVs with zero return fare on one-way trips.",
    rentalOverview:
      "Move effortlessly between HITEC City, Gachibowli, Banjara Hills, and Old Hyderabad with our hourly car rentals. Unlimited stops, clean AC cabs, and verified polite chauffeurs.",
    airportOverview:
      "Smooth 24x7 transfers to Rajiv Gandhi International Airport (HYD - Shamshabad). Real-time flight tracking, 45 minutes complimentary wait time, and zero midnight surcharges.",
    cityFaqs: [
      {
        question: "Is the Outer Ring Road (ORR) toll included for HYD airport transfers?",
        answer: "Yes, ORR toll charges are computed transparently upfront without extra surprises.",
      },
      {
        question: "Can I book a pilgrimage cab to Srisailam with ghat driving?",
        answer: "Yes, our drivers are experienced on the Srisailam forest ghats and follow strict safety guidelines.",
      },
      {
        question: "Are pickups available in Secunderabad and Madhapur?",
        answer: "Yes, our service operates across all Hyderabad and Secunderabad localities 24/7.",
      },
    ],
    outstationRoutes: [
      { destination: "Vijayawada", distance: "275 km", duration: "4.5 hrs", hatchPrice: 3899, sedanPrice: 4499, suvPrice: 5999, tag: "Amaravati Expressway" },
      { destination: "Srisailam", distance: "215 km", duration: "4.5 hrs", hatchPrice: 3299, sedanPrice: 3799, suvPrice: 5199, tag: "Mallikarjuna Jyotirlinga" },
      { destination: "Warangal", distance: "150 km", duration: "3.0 hrs", hatchPrice: 2499, sedanPrice: 2899, suvPrice: 3899, tag: "Kakatiya Heritage" },
      { destination: "Tirupati", distance: "560 km", duration: "9.5 hrs", hatchPrice: 8499, sedanPrice: 9499, suvPrice: 12999, tag: "Temple Highway" },
      { destination: "Bengaluru", distance: "570 km", duration: "8.5 hrs", hatchPrice: 8999, sedanPrice: 9999, suvPrice: 13999, tag: "NH44 Interstate" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 549, sedanPrice: 699, suvPrice: 949, idealFor: "Charminar & Laad Bazaar shopping" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 949, sedanPrice: 1199, suvPrice: 1599, idealFor: "HITEC City to Financial District meetings" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1799, sedanPrice: 2199, suvPrice: 2899, popular: true, idealFor: "Golconda Fort & Ramoji Film City tour" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2599, sedanPrice: 3099, suvPrice: 3999, idealFor: "Full Cyberabad & Secunderabad day disposal" },
    ],
    popularLocalHotspots: ["HITEC City", "Gachibowli", "Banjara Hills Road No 12", "Jubilee Hills", "Charminar"],
  },
  {
    cityId: "agra",
    cityName: "Agra",
    state: "Uttar Pradesh",
    airportName: "Agra Kheria Airport / IGI Transfer",
    airportCode: "AGR",
    airportStartingPrice: 599,
    airportTerminalDrops: ["Agra Cantt Railway Station", "Taj Mahal East/West Gates", "Fatehpur Sikri Road", "Sanjay Place Business Centre"],
    outstationOverview:
      "Travel comfortably from the City of Taj to Delhi NCR via Yamuna Expressway, Jaipur via the Golden Triangle, Mathura-Vrindavan, and Lucknow. Guaranteed lowest one-way fares with zero return fare penalties.",
    rentalOverview:
      "Visit the Taj Mahal, Agra Fort, Fatehpur Sikri, and Mehtab Bagh at your own leisure with dedicated hourly car rentals. Unlimited stops with transparent pricing.",
    airportOverview:
      "Reliable airport transfers connecting Agra to Kheria Airport or direct express transfers to Delhi IGI Airport Terminal 3.",
    cityFaqs: [
      {
        question: "Can I book a day-trip from Agra to Mathura and Vrindavan?",
        answer: "Yes, our hourly rental and outstation packages provide convenient same-day temple darshan with waiting time included.",
      },
      {
        question: "Are Yamuna Expressway tolls included when booking Agra to Delhi?",
        answer: "Yes, all expressway tolls and driver allowance are transparently itemized upfront.",
      },
      {
        question: "Can the cab enter Taj Mahal restricted zones?",
        answer: "Our drivers drop you at the official Taj Mahal East or West gate battery vehicle transit points seamlessly.",
      },
    ],
    outstationRoutes: [
      { destination: "Delhi NCR", distance: "230 km", duration: "3.5 hrs", hatchPrice: 2199, sedanPrice: 2599, suvPrice: 3699, tag: "Yamuna Expressway" },
      { destination: "Jaipur", distance: "240 km", duration: "4.0 hrs", hatchPrice: 2599, sedanPrice: 2999, suvPrice: 4199, tag: "Golden Triangle" },
      { destination: "Mathura & Vrindavan", distance: "60 km", duration: "1.2 hrs", hatchPrice: 1199, sedanPrice: 1499, suvPrice: 2199, tag: "Braj Bhoomi Pilgrimage" },
      { destination: "Gwalior", distance: "120 km", duration: "2.5 hrs", hatchPrice: 1999, sedanPrice: 2399, suvPrice: 3299, tag: "Fort City" },
      { destination: "Lucknow", distance: "335 km", duration: "4.5 hrs", hatchPrice: 4499, sedanPrice: 5199, suvPrice: 6999, tag: "Agra-Lucknow Expressway" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 499, sedanPrice: 649, suvPrice: 899, idealFor: "Taj Ganj local marble & petha markets" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 899, sedanPrice: 1149, suvPrice: 1549, idealFor: "Taj Mahal & Agra Fort sightseeing" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1699, sedanPrice: 2099, suvPrice: 2799, popular: true, idealFor: "Fatehpur Sikri, Mehtab Bagh & Taj sunset" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2499, sedanPrice: 2999, suvPrice: 3899, idealFor: "Agra to Mathura-Vrindavan full day disposal" },
    ],
    popularLocalHotspots: ["Taj Mahal East Gate", "Agra Fort", "Fatehpur Sikri", "Sadar Bazaar", "Mehtab Bagh"],
  },
  {
    cityId: "mysore",
    cityName: "Mysuru",
    state: "Karnataka",
    airportName: "Mysuru Airport (MYQ) / BLR Transfer",
    airportCode: "MYQ",
    airportStartingPrice: 599,
    airportTerminalDrops: ["Mandakalli Airport", "Mysuru Railway Junction", "Palace North Gate", "Hebbal Industrial Area"],
    outstationOverview:
      "Travel from the Heritage City of Mysuru to Bengaluru in under 2 hours via the 10-lane expressway, explore Coorg's misty hills, or visit the Nilgiris in Ooty and Kerala's Wayanad. Verified highway pilots with zero return fare on one-way trips.",
    rentalOverview:
      "Experience Mysore Palace illumination, Chamundi Hill, and Brindavan Gardens at your own pace with private chauffeur-driven hourly rentals.",
    airportOverview:
      "Direct transfers to Mysuru Mandakalli Airport or comfortable highway express transit directly to Bengaluru Kempegowda Airport (BLR).",
    cityFaqs: [
      {
        question: "How long does a one-way cab take to Bengaluru from Mysuru?",
        answer: "On the access-controlled 10-lane expressway, travel time is approximately 1.5 to 2 hours with doorstep drop.",
      },
      {
        question: "Can I book a cab from Mysuru to Bandipur or Nagarhole Safari?",
        answer: "Yes, our drivers know the forest gate timings and jungle safari corridors thoroughly.",
      },
      {
        question: "Does the rental package include Chamundi Hill climbing?",
        answer: "Yes, our hourly rental packages include Chamundi Hill, Palace, and local silk shopping with unlimited stops.",
      },
    ],
    outstationRoutes: [
      { destination: "Bengaluru", distance: "145 km", duration: "2.0 hrs", hatchPrice: 2199, sedanPrice: 2599, suvPrice: 3699, tag: "Access Expressway" },
      { destination: "Coorg (Madikeri)", distance: "120 km", duration: "2.8 hrs", hatchPrice: 2299, sedanPrice: 2699, suvPrice: 3699, tag: "Western Ghats" },
      { destination: "Ooty & Nilgiris", distance: "125 km", duration: "3.2 hrs", hatchPrice: 2499, sedanPrice: 2999, suvPrice: 4099, tag: "Bandipur Forest Route" },
      { destination: "Wayanad (Kerala)", distance: "130 km", duration: "3.0 hrs", hatchPrice: 2599, sedanPrice: 3099, suvPrice: 4199, tag: "Wildlife Corridor" },
      { destination: "Kabini & Nagarhole", distance: "60 km", duration: "1.5 hrs", hatchPrice: 1499, sedanPrice: 1799, suvPrice: 2599, tag: "Safari Destination" },
    ],
    rentalPackages: [
      { packageId: "2h-20k", duration: "2 Hours", km: "20 Kms", hatchPrice: 499, sedanPrice: 649, suvPrice: 899, idealFor: "Devaraja Market & Mysore silk shopping" },
      { packageId: "4h-40k", duration: "4 Hours", km: "40 Kms", hatchPrice: 899, sedanPrice: 1149, suvPrice: 1549, idealFor: "Mysore Palace & Chamundi Hill visit" },
      { packageId: "8h-80k", duration: "8 Hours", km: "80 Kms", hatchPrice: 1699, sedanPrice: 2099, suvPrice: 2799, popular: true, idealFor: "Brindavan Gardens, Zoo & Palace illumination" },
      { packageId: "12h-120k", duration: "12 Hours", km: "120 Kms", hatchPrice: 2499, sedanPrice: 2999, suvPrice: 3899, idealFor: "Srirangapatna & Ranganathittu day excursion" },
    ],
    popularLocalHotspots: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens", "KRS Dam", "Devaraja Market"],
  },
];

export type ServiceType = "outstation" | "rental" | "airport";

export interface ServiceMeta {
  id: ServiceType;
  name: string;
  slug: string;
  shortDesc: string;
  tripType: "outstation-oneway" | "hourly" | "airport";
  badge: string;
}

export const SERVICES_LIST: ServiceMeta[] = [
  {
    id: "outstation",
    name: "Outstation Cabs",
    slug: "outstation",
    shortDesc: "One-Way & Round-Trip highway intercity cabs",
    tripType: "outstation-oneway",
    badge: "Zero Return Fare",
  },
  {
    id: "rental",
    name: "Hourly Car Rentals",
    slug: "rental",
    shortDesc: "Local city disposal 2 hrs to 12 hrs with chauffeur",
    tripType: "hourly",
    badge: "Unlimited Stops",
  },
  {
    id: "airport",
    name: "Airport Transfers",
    slug: "airport",
    shortDesc: "On-time doorstep terminal pickups & drops",
    tripType: "airport",
    badge: "Flight Tracking",
  },
];

export function getCityServiceData(cityId: string): CityServiceInfo | undefined {
  return TOP_10_CITIES_SERVICES.find(
    (c) => c.cityId.toLowerCase() === cityId.toLowerCase()
  );
}

export function getServiceMeta(serviceId: string): ServiceMeta | undefined {
  return SERVICES_LIST.find(
    (s) => s.id.toLowerCase() === serviceId.toLowerCase()
  );
}

export function getServiceUrl(serviceId: string, cityId?: string): string {
  const srv = serviceId.toLowerCase();
  const base =
    srv === "outstation" || srv === "outstation-cabs"
      ? "/outstation-cabs"
      : srv === "airport" || srv === "airport-cabs"
      ? "/airport-cabs"
      : srv === "rental" || srv === "hourly-rentals"
      ? "/hourly-rentals"
      : `/services/${serviceId}`;

  if (!cityId) return base;
  return `${base}/${cityId.toLowerCase()}`;
}
