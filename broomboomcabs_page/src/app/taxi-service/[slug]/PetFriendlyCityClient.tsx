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

  const proceedWithSearch = (
    params: Partial<SearchParams> & {
      tripType?: any;
      fromCity?: string;
      toCity?: string;
    }
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

  const petFeatures = [
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "Pet-Loving Chauffeurs",
      desc: `Our verified pilots in ${cityName} welcome dogs, cats, and pets with warmth. No last-minute refusals or grumpy faces.`,
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: "Clean & Sanitized Interiors",
      desc: "Fresh seat protectors, vacuumed carpets, and thorough odour-neutralized cleaning before and after every pet ride.",
    },
    {
      icon: <Car className="w-5 h-5 text-blue-500" />,
      title: "Spacious AC Hatchbacks, Sedans & SUVs",
      desc: "Generous legroom and back-seat space for pet crates, seat harnesses, and comfortable stretching on long highway trips.",
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

  const petFaqs = [
    {
      category: "Pet Policy",
      question: `Are all dog breeds and cats allowed in BroomBoom cabs in ${cityName}?`,
      answer:
        "Yes! From small Indie puppies and Persian cats to Golden Retrievers, Labradors, and German Shepherds, all friendly pets are welcome. We recommend bringing a towel or blanket for your fur baby's extra comfort.",
    },
    {
      category: "Safety & Cleanliness",
      question: "Do I need to keep my pet in a crate during the ride?",
      answer:
        "Crates are not mandatory for local rides if your dog is well-behaved or leashed. For cats, a carrier is recommended for their own safety so they feel secure in the moving car.",
    },
    {
      category: "Pricing & Booking",
      question: `Is there any extra charge for carrying my pet in ${cityName}?`,
      answer:
        "BroomBoom offers fully transparent pricing. A nominal pet sanitization add-on or standard fare applies based on car selection (Hatchback/Sedan/SUV), with zero hidden surprise charges at trip end.",
    },
    {
      category: "Outstation Trips",
      question: `Can I take my pet from ${cityName} on long outstation road trips?`,
      answer:
        "Absolutely! Our outstation cabs are ideal for pet road trips. Chauffeurs gladly accommodate water and relief breaks at highway dhabas along the way.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsMyBookingsOpen(true)} />

      {/* Hero Banner */}
      <section
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.88), rgba(10, 16, 26, 0.94)), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>&rsaquo;</span>
            <Link href="/taxi-service" className="hover:underline">
              Taxi Service
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-300">Pet Friendly Cabs in {cityName}</span>
          </nav>

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-black uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>100% Pet-Welcoming Drivers &bull; {cityName} &amp; Highway Trips</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Pet Friendly Cabs in {cityName}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-2xl">
              Never leave your furry family behind. Book clean, sanitized AC cabs in {cityName} with compassionate chauffeurs for vet visits, beach trips, airport drops, and city errands.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Search Box */}
      <div className="relative -mt-12 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <HeroSearch
          activeTripType={activeTripType}
          onTripTypeChange={(type) => setActiveTripType(type)}
          onSearch={handleSearch}
          initialFrom={cityName}
          initialTo={cityData.defaultDropCity}
          heading={{
            title: `Book Pet Friendly Ride in ${cityName}`,
            subtitle: "Hatchback, Sedan & SUV cabs equipped with clean seat covers & caring chauffeurs",
            badge: `${cityName} • Pet Friendly Cab Service`,
          }}
        />
      </div>

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

      <WhyChooseUs />

      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title={`Frequently Asked Questions • Pet Cabs in ${cityName}`}
            subtitle={`Common queries about travelling with dogs and cats in ${cityName}`}
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
