"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Calendar,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  Info,
  Award,
  Users,
  PawPrint,
  Dog,
  Cat,
  Bird,
  Rabbit,
  Smartphone,
  Globe,
  CreditCard,
  BadgeIndianRupee,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { LoginModal } from "@/components/LoginModal";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { isUserLoggedIn } from "@/utils/auth";

interface CityPetData {
  vetClinics: string;
  weekendGetaways: string;
  dogParks: string;
  airportHub: string;
  defaultDropCity: string;
}

const CITY_PET_DIRECTORY: Record<string, CityPetData> = {
  kolkata: {
    vetClinics: "Belgachia Vet College, Animal Aid Salt Lake, Pet Wellness New Town, Southern Avenue Clinics",
    weekendGetaways: "Digha, Mandarmani, Tajpur, Bakkhali & Shantiniketan",
    dogParks: "Puppychino & Cafe De Artes, Eco Park Pet Zone, Central Park Salt Lake, Maidan morning walks",
    airportHub: "CCU Netaji Subhash Chandra Bose Intl Airport (Terminal 1 & Pet Relocation Services)",
    defaultDropCity: "Digha",
  },
  delhi: {
    vetClinics: "Friendicoes SECA, Max Vets Greater Kailash, DCC Animal Hospital Gurugram, Pet Cares Noida",
    weekendGetaways: "Neemrana, Rishikesh, Bharatpur Bird Sanctuary, Lansdowne & Agra",
    dogParks: "Sunder Nursery Pet Walking Area, Off The Leash Pet Cafe Gurugram, Bark Street Noida",
    airportHub: "DEL Indira Gandhi International Airport (Terminal 3 Domestic & Intl Pet Cargo)",
    defaultDropCity: "Agra",
  },
  mumbai: {
    vetClinics: "Crown Vet Worli & Khar, Cessna Lifeline Bandra, BSPCA Parel, Bai Sakarbai Hospital",
    weekendGetaways: "Lonavala, Alibaug, Karjat, Pawna Lake & Mahabaleshwar",
    dogParks: "Carter Road Promenade, Barking Deer Pet Cafe, Oval Maidan, Priyadarshini Park",
    airportHub: "BOM Chhatrapati Shivaji Maharaj Intl Airport (Terminal 1 & Terminal 2)",
    defaultDropCity: "Pune",
  },
  bangalore: {
    vetClinics: "Cessna Lifeline Domlur & Whitefield, Cartman Animal Society Koramangala, MyPetDoc Indiranagar",
    weekendGetaways: "Coorg, Chikmagalur, Ooty, Nandi Hills & Kabini",
    dogParks: "Cubbon Park Dog Park, Therpup Cafe Whitefield, Mighty Paws Sarjapur Road",
    airportHub: "BLR Kempegowda International Airport Devanahalli (Pet Lounge & Terminal 2)",
    defaultDropCity: "Mysore",
  },
  pune: {
    vetClinics: "DCC Animal Hospital Viman Nagar, Pet Aid Clinic Kalyani Nagar, Crown Vet Aundh",
    weekendGetaways: "Mahabaleshwar, Lavasa, Mulshi Lake, Panchgani & Lonavala",
    dogParks: "The Pet Project Cafe, Viman Nagar Joggers Park, Model Colony Lake Greenery",
    airportHub: "PNQ Pune International Airport Lohegaon",
    defaultDropCity: "Mumbai",
  },
  hyderabad: {
    vetClinics: "Government Vet Hospital Narayanguda, Cessna Lifeline Jubilee Hills, Olive Pet Hospital Gachibowli",
    weekendGetaways: "Ananthagiri Hills, Nagarjuna Sagar, Srisailam & Warangal",
    dogParks: "Hyderabad Dog Park Gachibowli, The Hole in the Wall Cafe Jubilee Hills, KBR Park Periphery",
    airportHub: "HYD Rajiv Gandhi International Airport Shamshabad",
    defaultDropCity: "Vijayawada",
  },
  jaipur: {
    vetClinics: "Apex Pet Hospital Malviya Nagar, Royal Vet Clinic Mansarovar, Government Polyclinic M.I. Road",
    weekendGetaways: "Ranthambore, Pushkar, Sariska Tiger Reserve & Ajmer",
    dogParks: "Central Park Jaipur Walking Trails, Jawahar Circle Garden Periphery",
    airportHub: "JAI Jaipur International Airport Sanganer",
    defaultDropCity: "Delhi",
  },
  chandigarh: {
    vetClinics: "Government Pet Hospital Sector 22, Pet Care Clinic Sector 35, Tricity Vet Hospital Panchkula",
    weekendGetaways: "Kasauli, Shimla, Chail, Solan & Kalka Hills",
    dogParks: "Leisure Valley Sector 10, Sukhna Lake Promenade (Early morning), Fragrance Garden",
    airportHub: "IXC Shaheed Bhagat Singh International Airport Mohali",
    defaultDropCity: "Shimla",
  },
  ahmedabad: {
    vetClinics: "Jivdaya Charitable Trust, Cessna Pet Hospital Bodakdev, Best Friends Vet Clinic Navrangpura",
    weekendGetaways: "Udaipur, Mount Abu, Gir Forest & Polo Forest",
    dogParks: "Sabarmati Riverfront Walkway, Vastrapur Lake Garden",
    airportHub: "AMD Sardar Vallabhbhai Patel International Airport",
    defaultDropCity: "Vadodara",
  },
  kochi: {
    vetClinics: "Government Veterinary Centre Palarivattom, Dr. Zoo Animal Hospital Kakkanad, Cochin Pet Hospital",
    weekendGetaways: "Munnar, Alleppey Backwaters, Vagamon, Wayanad & Thekkady",
    dogParks: "Subhash Bose Park Marine Drive, Fort Kochi Beach Walkways",
    airportHub: "COK Cochin International Airport Nedumbassery",
    defaultDropCity: "Munnar",
  },
  lucknow: {
    vetClinics: "Government Veterinary Polyclinic Gomti Nagar, Pet Medics Indira Nagar, Awadh Pet Clinic Alambagh",
    weekendGetaways: "Nainital, Ayodhya, Prayagraj, Dudhwa National Park & Varanasi",
    dogParks: "Janeshwar Mishra Park Dog Corner, Lohia Park Gomti Nagar",
    airportHub: "LKO Chaudhary Charan Singh International Airport Amausi",
    defaultDropCity: "Prayagraj",
  },
  chennai: {
    vetClinics: "Madras Veterinary College Vepery, Cessna Lifeline Alwarpet, Blue Cross of India Guindy",
    weekendGetaways: "Pondicherry, Mahabalipuram, Yelagiri Hills & Yercaud",
    dogParks: "Besant Nagar Beach Morning Run, Semmozhi Poonga Greenery Periphery",
    airportHub: "MAA Chennai International Airport Meenambakkam",
    defaultDropCity: "Pondicherry",
  },
  bahadurgarh: {
    vetClinics:
      "Government Veterinary Hospital Bahadurgarh, Pet Care Clinic Line Par, Shri Ram Pet Hospital, nearby Jhajjar & Rohtak animal care centres",
    weekendGetaways:
      "Damdama Lake, Sultanpur Bird Sanctuary, Neemrana, Murthal dhabas, Manesar & Rishikesh",
    dogParks:
      "Bahadurgarh City Park walking trails, Huda Park Line Par, Aravali Biodiversity Park (Gurugram) & Sultanpur Flats",
    airportHub:
      "DEL Indira Gandhi International Airport (Terminal 1, 2, 3) & Hindon Airport cargo assistance",
    defaultDropCity: "Delhi",
  },
};

interface PetFriendlyCityClientProps {
  cityName: string;
  citySlug: string;
}

export const PetFriendlyCityClient: React.FC<PetFriendlyCityClientProps> = ({
  cityName,
  citySlug,
}) => {
  const router = useRouter();
  const [activeTripType, setActiveTripType] = useState<string>("outstation-oneway");
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSearchParams, setPendingSearchParams] = useState<SearchParams | null>(null);

  // Number of pets + pet type selection
  const [petCount, setPetCount] = useState<string>("1");
  const [petTypes, setPetTypes] = useState<string[]>(["Dog"]);

  const key = cityName.toLowerCase().trim().replace(/[^a-z]/g, "");
  const cityData: CityPetData =
    CITY_PET_DIRECTORY[key] || {
      vetClinics: `Top veterinary clinics, animal hospitals, and emergency pet care centers across ${cityName}`,
      weekendGetaways: `Scenic getaways, nature resorts, and pet-welcoming holiday retreats around ${cityName}`,
      dogParks: `Spacious open parks, dog-friendly cafes, and walking trails in ${cityName}`,
      airportHub: `Airport terminal transfers and live flight cargo pet assistance in ${cityName}`,
      defaultDropCity: "Outstation",
    };

  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const togglePetType = (type: string) => {
    setPetTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const proceedWithSearch = (
    params: Record<string, any>
  ) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || cityName,
      to: params.toCity || cityData.defaultDropCity,
      tripType: params.tripType || "outstation-oneway",
      type: params.tripType || "outstation-oneway",
      date: params.pickupDate || getTodayStr(),
      time: params.pickupTime || "10:00 AM",
      petFriendly: "true",
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.returnTime || params.dropTime) queryObj.dropTime = params.returnTime || params.dropTime || "";
    if (params.hourlyPackage) queryObj.package = params.hourlyPackage;
    if (params.distanceKm) queryObj.distance = String(params.distanceKm);
    if (params.durationMinutes) queryObj.duration = String(params.durationMinutes);
    if (params.fromCoords) {
      queryObj.pickupLat = String(params.fromCoords.lat);
      queryObj.pickupLng = String(params.fromCoords.lng);
    }
    if (params.toCoords) {
      queryObj.dropLat = String(params.toCoords.lat);
      queryObj.dropLng = String(params.toCoords.lng);
    }
    if (petCount) queryObj.pets = petCount;
    if (petTypes.length) queryObj.petTypes = petTypes.join(",");

    const query = new URLSearchParams(queryObj).toString();
    router.push(`/fleet?${query}`);
  };

  const handleSearch = (params: SearchParams) => {
    const isLoggedIn = isUserLoggedIn();
    if (!isLoggedIn) {
      setPendingSearchParams(params);
      setIsLoginModalOpen(true);
      return;
    }
    proceedWithSearch(params);
  };

  // Used by the "Book" buttons inside the fare table
  const handleFareBook = () => {
    proceedWithSearch({
      tripType: activeTripType,
      fromCity: cityName,
      toCity: cityData.defaultDropCity,
    });
  };

  const petFeatures = [
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "Pet-Loving Chauffeurs",
      desc: `Our verified pilots in ${cityName} welcome dogs, cats, birds and small mammals with warmth. No last-minute refusals or grumpy faces.`,
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: "Deep-Cleaned & Sanitized",
      desc: "Fresh seat protectors, vacuumed carpets, and odour-neutralized deep cleaning before and after every pet ride.",
    },
    {
      icon: <Car className="w-5 h-5 text-blue-500" />,
      title: "Hatchback • Sedan • SUV • Traveller",
      desc: "Prime Hatchback, Prime Sedan, Prime SUV and Prime Traveller AC options — fully sanitized with generous space for crates and harnesses.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: "Zero Cancellation Guarantee",
      desc: `Guaranteed cab dispatch across ${cityName} for clinic runs, vet emergencies, highway getaways, or airport drops.`,
    },
  ];

  const popularDestinations = [
    {
      name: `Veterinary Clinics & Hospitals in ${cityName}`,
      places: cityData.vetClinics,
      desc: "Quick emergency pickups & scheduled routine checkups with gentle drivers who understand medical urgency.",
    },
    {
      name: `Pet-Friendly Weekend Road Trips from ${cityName}`,
      places: cityData.weekendGetaways,
      desc: "Direct outstation drops with zero return fare so your dog can play in open nature and splash in fresh waters.",
    },
    {
      name: `Dog Cafes & Walking Trails in ${cityName}`,
      places: cityData.dogParks,
      desc: "Round-trip local hourly rentals where the cab waits comfortably while your pet enjoys a fun playdate.",
    },
    {
      name: `Airport Drops & Pet Relocation in ${cityName}`,
      places: cityData.airportHub,
      desc: "Safe transit with your flight pet crate and family luggage in clean commercial yellow-plate cars.",
    },
  ];

  const carCategories = [
    {
      name: "Prime Hatchback",
      desc: "Ideal for solo pet parents & small breeds — AC, sanitized seats, and a cozy cabin for city vet runs.",
      icon: <Car className="w-5 h-5 text-blue-500" />,
    },
    {
      name: "Prime Sedan",
      desc: "Extra legroom and boot space for medium pets, carriers, and a comfortable co-passenger ride.",
      icon: <Car className="w-5 h-5 text-emerald-500" />,
    },
    {
      name: "Prime SUV",
      desc: "Best for large breeds, multiple pets, and long outstation trips with ample cargo room for crates.",
      icon: <Car className="w-5 h-5 text-amber-500" />,
    },
    {
      name: "Prime Traveller AC",
      desc: "Group travel with the whole family & multiple pets — spacious top-model AC Traveller vans.",
      icon: <Users className="w-5 h-5 text-rose-500" />,
    },
  ];

  const bookingSteps = [
    {
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      title: "Visit Website or App",
      desc: `Book online at BroomBoomCabs website or download the "BroomBoom Cabs – Outstation Taxi" app from Google PlayStore / iOS.`,
    },
    {
      icon: <MapPin className="w-5 h-5 text-emerald-500" />,
      title: "Enter Itinerary",
      desc: `Choose Outstation or Local commute, enter pickup city (${cityName}), destination and your mobile number.`,
    },
    {
      icon: <Calendar className="w-5 h-5 text-amber-500" />,
      title: "Pick Date, Time & Car",
      desc: "Select your travel date, pickup time, and choose Prime Hatchback, Sedan, SUV, or Traveller AC as per your pet's needs.",
    },
    {
      icon: <PawPrint className="w-5 h-5 text-rose-500" />,
      title: 'Add-on: "Pets Allowed"',
      desc: `Tick the "Pets Allowed" add-on service and confirm number of pets (we support ${petCount} pet${petCount === "1" ? "" : "s"} on this ride).`,
    },
    {
      icon: <CreditCard className="w-5 h-5 text-violet-500" />,
      title: "Pay Small Advance",
      desc: "Make a small advance payment — your pet-friendly cab booking is instantly confirmed with BroomBoom Cabs.",
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-slate-700" />,
      title: "Call Reservation Desk",
      desc: "Call 8240765499 right after booking so our team can verify your pet details and assign a trained pilot.",
    },
  ];

  // 3 cards — each now carries its own image
  const petServiceDetails = [
    {
      title: `Pet Friendly Cab Service in ${cityName}`,
      body: `Pet-friendly cab service in ${cityName} is very limited and only BroomBoom Cabs can fulfil your needs for pet-friendly cab services here. As an aggregator, BroomBoom Cabs provides enormous car options for your pet-friendly taxi booking. You can mention specific preferences while raising a dog-friendly taxi booking request. Our partnered taxi service providers offer Prime Hatchback, Prime Sedan, Prime SUV and Prime Traveller AC top models — fully sanitized, well-maintained, with top-rated skilled, trained pilots who take care of your pet at all times. Get the best cab reserved for your ride in advance at the best deals.`,
      image: "/images/pet-friendly-beagle-cab.jpg",
      imageAlt: `Dog sitting in a pet-friendly cab in ${cityName}`,
    },
    {
      title: `Pet Friendly Taxi in ${cityName}`,
      body: `We at BroomBoom Cabs are the final solution for pet lovers who face difficulties travelling from one place to another. Traditional modes like trains and buses come with stringent pet policies that restrict or prohibit animals, leaving pet owners scrambling. For those without private vehicles, this means leaving pets behind or entrusting them to others — a prospect that evokes guilt and anxiety. We believe your dog, cat or bird has every right to travel outstation with you. BroomBoom Cabs' Pet Friendly Cab services ease the burden of outstation travel for pet owners with guaranteed best deals for hassle-free rides.`,
      image: "/images/pet-friendly-app-booking.jpg",
      imageAlt: `Pet friendly taxi booking on BroomBoom app in ${cityName}`,
    },
    {
      title: `Pet Friendly Outstation Cabs Services in ${cityName}`,
      body: `BroomBoom Cabs' pet-friendly outstation cabs service in ${cityName} bridges the gap between the need for mobility and the desire to keep pets by your side. We allow a wide range of pets — dogs, cats, birds and small mammals — so you can travel happily, free from the stress and discomfort associated with traditional transport. Choose outstation one-way pet-friendly drops or outstation roundtrip pet-friendly cabs and forge unforgettable memories with your animal companions. Pet-friendly taxis are available throughout India via the BroomBoom Cabs app, website, or by calling 8240765499.`,
      image: "/images/pet-friendly-cab-fleet.jpg",
      imageAlt: `BroomBoom pet-friendly commercial cab fleet in ${cityName}`,
    },
  ];

  // Fare table data
  const petFareTable = [
    {
      vehicleType: "Hatchback",
      model: "Wagon-R, Indica or similar",
      capacity: "4 seater",
      perKm: "Rs. 8",
    },
    {
      vehicleType: "Sedan",
      model: "Dzire, Etios or similar",
      capacity: "4 seater",
      perKm: "Rs. 10",
    },
    {
      vehicleType: "SUV",
      model: "Xylo, Ertiga or similar",
      capacity: "6 seater",
      perKm: "Rs. 15",
    },
    {
      vehicleType: "Assured Innova",
      model: "Innova, Innova Crysta",
      capacity: "6 seater",
      perKm: "Rs. 17",
    },
  ];

  const petFaqs = [
    {
      category: "Pet Policy",
      question: `Are all dog breeds, cats, birds and small mammals allowed in BroomBoom cabs in ${cityName}?`,
      answer:
        "Yes! From small Indie puppies and Persian cats to Golden Retrievers, Labradors, and German Shepherds — all friendly pets are welcome. We also allow birds and small mammals. We recommend bringing a towel or blanket for your fur baby's extra comfort.",
    },
    {
      category: "Safety & Cleanliness",
      question: "Do I need to keep my pet in a crate during the ride?",
      answer:
        "Crates are not mandatory for local rides if your dog is well-behaved or leashed. For cats and birds, a carrier is recommended for their own safety so they feel secure in the moving car.",
    },
    {
      category: "Pricing & Booking",
      question: `Is there any extra charge for carrying my pet in ${cityName}?`,
      answer:
        "Yes — an additional amount starting from Rs. 3000/- applies for pet-friendly services, which includes charges for deep-cleaning the car. Beyond that, standard per-km fare applies based on car selection (Hatchback Rs.8/km, Sedan Rs.10/km, SUV Rs.15/km, Assured Innova Rs.17/km), with zero hidden surprises at trip end.",
    },
    {
      category: "Outstation Trips",
      question: `Can I take my pet from ${cityName} on long outstation road trips?`,
      answer:
        "Absolutely! Our outstation cabs are ideal for pet road trips. Chauffeurs gladly accommodate water and relief breaks at highway dhabas along the way. Pet-friendly outstation one-way and roundtrip options are available through the app, website, or reservation desk at 8240765499.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Top Navbar */}
      <Navbar onMyBookingsClick={() => setIsMyBookingsOpen(true)} />

      {/* 2. Hero Search Banner (Identical layout to Main & Outstation Pages) */}
      <HeroSearch
        activeTripType={activeTripType}
        onTripTypeChange={(type) => setActiveTripType(type)}
        onSearch={handleSearch}
        initialFrom={cityName}
        initialTo={cityData.defaultDropCity}
        navigateOnTabClick={true}
        heading={{
          title: (
            <>
              Pet Friendly Cab Service in <span className="text-amber-400">{cityName}</span>
            </>
          ),
          subtitle: `Never leave your furry family behind. Book clean, sanitized AC cabs in ${cityName} with caring chauffeurs for vet visits, weekend trips & airport drops.`,
          badge: `${cityName} • 100% Pet-Welcoming Cabs`,
        }}
      />

      {/* Breadcrumb */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-1">
        <nav className="flex items-center text-xs sm:text-sm text-slate-500 space-x-2">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/taxi-service" className="hover:text-amber-600 transition-colors">
            Taxi Service
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate">
            Pet Friendly Cabs in {cityName}
          </span>
        </nav>
      </div>

      {/* Number of Pets & Pet Type Selector */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-rose-500" />
              </span>
              <div>
                <p className="text-sm font-black text-slate-900">Travelling with pets?</p>
                <p className="text-[11px] text-slate-500 font-semibold">
                  Tell us how many &amp; what kind — we'll arrange the right cab.
                </p>
              </div>
            </div>

            {/* Count */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                Number of Pets:
              </span>
              <div className="flex gap-1.5">
                {["1", "2", "3", "4+"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPetCount(n)}
                    className={`min-w-[38px] h-9 px-3 rounded-lg border text-xs font-black transition-all ${
                      petCount === n
                        ? "bg-slate-900 text-amber-400 border-slate-900 shadow"
                        : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Types */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                Pet Type:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Dog", icon: <Dog className="w-3.5 h-3.5" /> },
                  { label: "Cat", icon: <Cat className="w-3.5 h-3.5" /> },
                  { label: "Bird", icon: <Bird className="w-3.5 h-3.5" /> },
                  { label: "Small Mammal", icon: <Rabbit className="w-3.5 h-3.5" /> },
                ].map(({ label, icon }) => {
                  const active = petTypes.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => togglePetType(label)}
                      className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border text-xs font-bold transition-all ${
                        active
                          ? "bg-amber-400 text-slate-950 border-amber-500 shadow"
                          : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {icon}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Features */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            Paws &amp; Whiskers Welcome
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Why Pet Parents in {cityName} Trust BroomBoom
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            No cab driver cancellations, no awkward negotiations, and no stress for your pet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {petFeatures.map((f, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-black text-slate-900">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Car Categories */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">
              Choose Your Comfort
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Pet-Friendly Car Options in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Fully sanitized, well-maintained, top-rated skilled pilots — pick the cab that fits your pet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {carCategories.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3">
                  {c.icon}
                </div>
                <h3 className="text-sm font-black text-slate-900">{c.name}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Friendly Taxi Fare Section */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Intro copy */}
            <div className="lg:col-span-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Transparent Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Pet Friendly Taxi Fare in {cityName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                BroomBoom Cabs is committed to keeping pet cab pricing in {cityName} as simple and clear as possible.
                We provide one price for your pet-friendly cabs in {cityName} which covers a specified maximum
                kilometer and maximum days — so you know upfront how much your pet-friendly cab is going to cost
                you and can plan your budget well.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Prices are dynamic and transparent, giving a win-win deal for both you and our partnered
                pet-friendly taxi service providers. Choose any car as per your preference. We provide the best
                discounted pet-friendly taxi fares in {cityName} for rentals, outstation trips, and airport/station
                transfer cab rides.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                For <span className="font-black text-slate-900">Sedan</span>, the pet-friendly taxi fare in {cityName}
                varies from <span className="font-black text-slate-900">Rs 550/- to Rs 850/-</span> and for{" "}
                <span className="font-black text-slate-900">Prime SUV</span>, the fare varies from{" "}
                <span className="font-black text-slate-900">Rs 950/- to Rs 1250/-</span>. Fares are charged to
                maintain the quality standard of your scheduled cabs reserved for your rides with ample space for
                your travel pet buddy — be it a dog, cat, or bird. All pets are handled in trained professional
                hands with care and love.
              </p>

              <a
                href="tel:+918240765499"
                className="mt-5 inline-flex items-center gap-2 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-500 px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                Book @ 8240765499
              </a>
            </div>

            {/* Right: Fare Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BadgeIndianRupee className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-black tracking-tight">
                      {cityName} Pet Friendly Cab Fare List
                    </h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                    Per Km Rates
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-4 sm:px-5 py-3">Vehicle Type</th>
                        <th className="px-4 sm:px-5 py-3">Model</th>
                        <th className="px-4 sm:px-5 py-3">Capacity</th>
                        <th className="px-4 sm:px-5 py-3">Per Km Rate</th>
                        <th className="px-4 sm:px-5 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {petFareTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                          <td className="px-4 sm:px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                                <Car className="w-3.5 h-3.5 text-slate-600" />
                              </span>
                              <span className="font-black text-slate-900">{row.vehicleType}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-5 py-3.5 text-slate-600 font-semibold">
                            {row.model}
                          </td>
                          <td className="px-4 sm:px-5 py-3.5 text-slate-600 font-semibold">
                            {row.capacity}
                          </td>
                          <td className="px-4 sm:px-5 py-3.5">
                            <span className="inline-flex items-center gap-1 font-black text-amber-700 bg-amber-100 border border-amber-200 px-2 py-1 rounded-md">
                              {row.perKm}
                            </span>
                          </td>
                          <td className="px-4 sm:px-5 py-3.5 text-right">
                            <button
                              type="button"
                              onClick={handleFareBook}
                              className="inline-flex items-center gap-1 text-[11px] font-black text-slate-950 bg-amber-400 hover:bg-amber-500 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
                            >
                              Book
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3 bg-amber-50 border-t border-amber-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] sm:text-xs text-amber-900 font-semibold leading-relaxed">
                    Pet add-on (deep-cleaning & sanitization) starts from <span className="font-black">Rs. 3000/-</span> in
                    addition to the per-km fare above. Book anytime to anywhere — call <span className="font-black">8240765499</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-14 bg-slate-100/70">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">
                Simple &amp; Fast
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How to Book a Taxi with Pets Allowed
              </h2>
            </div>
            <a
              href="tel:+918240765499"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-900 bg-amber-400 hover:bg-amber-500 px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Reservation Desk: +91 8240765499</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookingSteps.map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex gap-4"
              >
                <div className="shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center relative">
                    {s.icon}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-blue-500" /> Website Booking
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200">
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" /> Android / iOS App
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200">
              <PhoneCall className="w-3.5 h-3.5 text-rose-500" /> 8240765499 Reservation Desk
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200">
              <BadgeIndianRupee className="w-3.5 h-3.5 text-amber-600" /> Small Advance Payment
            </span>
          </div>
        </div>
      </section>

      {/* Popular Pet Use Cases in City */}
      <section className="py-12 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">
                Where Can You Go?
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Popular Pet Rides Across {cityName} &amp; Beyond
              </h2>
            </div>
            <a
              href="tel:+918240765499"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-900 bg-amber-400 hover:bg-amber-500 px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: +91 8240765499</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {popularDestinations.map((dest, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <h3 className="text-base font-black text-slate-900">{dest.name}</h3>
                </div>
                <p className="text-xs text-amber-700 font-bold mb-2">{dest.places}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{dest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Pet Service Content — ALTERNATING IMAGE / CONTENT ROWS */}
      <section className="py-14 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">
              Everything You Need to Know
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Pet Friendly Taxi Services in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Complete details about BroomBoom Cabs pet-friendly service, outstation cabs, pricing and pet-care add-ons.
            </p>
          </div>

          <div className="space-y-6 lg:space-y-10">
            {petServiceDetails.map((s, idx) => {
              const reverse = idx % 2 === 1; // odd cards: content left / image right
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-stretch gap-6 lg:gap-10 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden`}
                >
                  {/* IMAGE */}
                  <div className="w-full lg:w-5/12 shrink-0">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      loading="lazy"
                      className="w-full h-56 sm:h-72 lg:h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="w-full lg:w-7/12 p-6 sm:p-8 lg:py-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                        <PawPrint className="w-4 h-4 text-amber-600" />
                      </span>
                      <h3 className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-900 font-semibold leading-relaxed">
                Pet-friendly cabs are subject to availability in {cityName}. Please call our customer service
                immediately after your booking at <span className="font-black">8240765499</span> so we can assign
                a trained pet-friendly pilot for your ride.
              </p>
            </div>
            <a
              href="tel:+918240765499"
              className="inline-flex items-center justify-center gap-2 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-500 px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title={`Frequently Asked Questions • Pet Cabs in ${cityName}`}
            subtitle={`Common queries about travelling with dogs, cats, birds & small mammals in ${cityName}`}
            items={petFaqs}
          />
        </div>
      </section>

      <Footer />

      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => {
            setIsLoginModalOpen(false);
            if (pendingSearchParams) {
              proceedWithSearch(pendingSearchParams);
              setPendingSearchParams(null);
            }
          }}
        />
      )}

      {isMyBookingsOpen && (
        <MyBookingsDrawer
          isOpen={isMyBookingsOpen}
          onClose={() => setIsMyBookingsOpen(false)}
        />
      )}
    </main>
  );
};