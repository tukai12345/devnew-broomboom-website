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

export const PetFriendlyKolkataClient: React.FC = () => {
  const router = useRouter();
  const [activeTripType, setActiveTripType] = useState<string>("outstation-oneway");
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSearchParams, setPendingSearchParams] = useState<SearchParams | null>(null);

  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const proceedWithSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity || "Kolkata",
      to: params.toCity || "Digha",
      tripType: params.tripType,
      type: params.tripType,
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
      desc: "Our verified pilots welcome your dogs, cats, and pets with warmth. No refusal, no grumpy faces.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: "Clean & Sanitized Interiors",
      desc: "Fresh seat protectors, vacuumed carpets, and thorough odour-neutralized cleaning after every single ride.",
    },
    {
      icon: <Car className="w-5 h-5 text-blue-500" />,
      title: "Spacious AC Hatchbacks, Sedans & SUVs",
      desc: "Generous legroom and back-seat space for pet crates, seat harnesses, and comfortable stretching on long trips.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: "Zero Cancellation / Zero Hassle",
      desc: "Guaranteed cab dispatch for pet clinics, emergency vet runs, weekend getaways to Mandarmani/Digha, or airport drops.",
    },
  ];

  const popularPetDestinations = [
    {
      name: "Veterinary Clinics & Hospitals",
      places: "Belgachia Vet College, Animal Aid Salt Lake, Pet Wellness New Town, Southern Avenue Clinics",
      desc: "Quick emergency pickups & scheduled routine checkups with gentle drivers who understand medical urgency.",
    },
    {
      name: "Pet-Friendly Weekend Beaches",
      places: "Digha, Mandarmani, Tajpur, Bakkhali",
      desc: "Direct outstation drops with zero return fare so your dog can splash in the sea and run on the sand.",
    },
    {
      name: "Dog Cafes & Open Parks",
      places: "Puppychino & Cafe De Artes, Eco Park Pet Zone, Central Park Salt Lake, Maidan morning runs",
      desc: "Round-trip local hourly rentals where the cab waits while your pet enjoys a playdate.",
    },
    {
      name: "Airport Drops (CCU Netaji Subhash Airport)",
      places: "Terminal 1 & Pet Relocation Services",
      desc: "Safe transit with your flight pet crate and family luggage in clean commercial yellow-plate cars.",
    },
  ];

  const petFaqs = [
    {
      category: "Pet Policy",
      question: "Are all dog breeds and cats allowed in BroomBoom pet-friendly cabs?",
      answer:
        "Yes! From small Indie puppies and Persian cats to Golden Retrievers, Labradors, and German Shepherds, all friendly pets are welcome. We recommend bringing a towel or blanket for your fur baby's comfort.",
    },
    {
      category: "Safety & Cleanliness",
      question: "Do I need to keep my dog in a crate during the ride?",
      answer:
        "Crates are not mandatory for local rides if your dog is well-behaved or leashed. For cats, a carrier is recommended for their own safety so they feel secure in the moving car.",
    },
    {
      category: "Pricing & Booking",
      question: "Is there any extra charge for carrying my pet in Kolkata?",
      answer:
        "BroomBoom offers fully transparent pricing. A nominal pet sanitization add-on or standard fare applies based on car selection (Hatchback/Sedan/SUV), with zero hidden surprise charges at trip end.",
    },
    {
      category: "Outstation Trips",
      question: "Can I take my pet from Kolkata to Digha, Mandarmani, or Puri?",
      answer:
        "Absolutely! Our outstation cabs are perfect for road trips with pets. Chauffeurs gladly accommodate water and relief breaks at highway dhabas along the NH16 route.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsMyBookingsOpen(true)} />

      {/* Top Pet Hero Banner with Search */}
      <section
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.88), rgba(10, 16, 26, 0.94)), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>&rsaquo;</span>
            <Link href="/services" className="hover:underline">
              Taxi Service
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-300">Pet Friendly Cabs in Kolkata</span>
          </nav>

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-black uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>100% Pet-Welcoming Drivers &bull; Kolkata &amp; Highway Trips</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Pet Friendly Cabs in Kolkata
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-2xl">
              Never leave your furry family behind. Book clean, sanitized AC cabs in Kolkata with compassionate chauffeurs for vet visits, beach trips to Digha/Mandarmani, airport drops, and city errands.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Search Box pre-configured for Kolkata */}
      <div className="relative -mt-12 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <HeroSearch
          activeTripType={activeTripType}
          onTripTypeChange={(type) => setActiveTripType(type)}
          onSearch={handleSearch}
          initialFrom="Kolkata"
          initialTo="Digha"
          heading={{
            title: "Book Pet Friendly Ride from Kolkata",
            subtitle: "Hatchback, Sedan & SUV cabs equipped with clean seat covers & caring chauffeurs",
            badge: "Kolkata, West Bengal • Pet Friendly Service",
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
            Why Pet Parents in Kolkata Trust BroomBoom
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

      {/* Pet Travel In Kolkata Use Cases */}
      <section className="py-12 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">
                Where Can You Go?
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Popular Pet Rides Across Kolkata &amp; Beyond
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              From Salt Lake to Southern Avenue, and highway escapes to seaside beaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {popularPetDestinations.map((dest, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-amber-400 transition"
              >
                <div className="flex items-center gap-2 text-amber-600 text-xs font-black uppercase tracking-wider mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kolkata Service Route</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{dest.name}</h3>
                <p className="text-xs font-semibold text-slate-700 mt-1.5 bg-amber-50 p-2 rounded-lg border border-amber-200/50">
                  {dest.places}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
                  {dest.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Travel Tips */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#0e1726] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Handy Tips For Pet Owners
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Tips for a Smooth Ride with Your Pet in Kolkata
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 pt-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Hydration &amp; Light Meals:</strong> Avoid heavy meals 2 hours before the trip to prevent car sickness. Carry fresh water and a bowl.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Favorite Blanket or Toy:</strong> A familiar scent calms anxious pets and keeps them relaxed throughout the drive.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Leash &amp; Collar:</strong> Keep your dog leashed during boarding and exiting, especially at highway stops and clinic parking.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>AC Comfort:</strong> Our drivers maintain gentle air-conditioning and smooth braking to keep pets comfortable and calm.
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-400/20 text-amber-400 mx-auto flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-white">Emergency Pet Ride Helpline</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Have an urgent vet appointment or late-night pet transit requirement in Kolkata? Call our 24x7 desk directly:
            </p>
            <a
              href="tel:+917044022000"
              className="mt-4 inline-block w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition"
            >
              +91 8240765499 &bull; Call 24x7
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us component */}
      <WhyChooseUs />

      {/* Pet FAQs */}
      <FaqSection items={petFaqs} />

      <Footer />

      {/* Global Drawers & Modals */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          if (pendingSearchParams) {
            proceedWithSearch(pendingSearchParams);
            setPendingSearchParams(null);
          } else {
            router.push("/fleet?from=Kolkata&petFriendly=true");
          }
        }}
        initialMessage="Please sign in to proceed with your pet-friendly cab booking!"
      />
    </main>
  );
};

