"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  Car,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  Users,
  Compass,
  Calendar,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { LoginModal } from "@/components/LoginModal";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { isUserLoggedIn } from "@/utils/auth";

export const LucknowToPrayagrajClient: React.FC = () => {
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
      from: params.fromCity || "Lucknow",
      to: params.toCity || "Prayagraj",
      tripType: params.tripType,
      type: params.tripType,
      date: params.pickupDate || getTodayStr(),
      time: params.pickupTime || "10:00 AM",
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.returnTime || params.dropTime) queryObj.dropTime = params.returnTime || params.dropTime || "";
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

  const fareTable = [
    {
      vehicle: "Hatchback (WagonR, Swift)",
      seats: "4 Passengers",
      bags: "2 Bags",
      onewayFare: "₹1,999",
      roundtripFare: "₹3,799",
      idealFor: "Solo travelers, couples & budget trips",
      popular: false,
    },
    {
      vehicle: "Sedan (Dzire, Etios)",
      seats: "4 Passengers",
      bags: "3 Large Bags",
      onewayFare: "₹2,399",
      roundtripFare: "₹4,499",
      idealFor: "Family comfort, luggage & business visits",
      popular: true,
    },
    {
      vehicle: "SUV (Ertiga)",
      seats: "6-7 Passengers",
      bags: "4 Bags",
      onewayFare: "₹3,499",
      roundtripFare: "₹6,299",
      idealFor: "Family pilgrimage & group travel",
      popular: false,
    },
    {
      vehicle: "Premium SUV (Innova Crysta)",
      seats: "6-7 Passengers",
      bags: "5 Bags",
      onewayFare: "₹4,299",
      roundtripFare: "₹7,899",
      idealFor: "VIP luxury comfort & elderly pilgrimage",
      popular: false,
    },
    {
      vehicle: "Tempo Traveller (13/17 Seater)",
      seats: "13-17 Passengers",
      bags: "Ample carrier room",
      onewayFare: "₹7,499",
      roundtripFare: "₹13,999",
      idealFor: "Kumbh/Magh Mela & joint family yatra",
      popular: false,
    },
  ];

  const routeHighlights = [
    {
      label: "Highway Distance",
      value: "~200 Kilometers",
      desc: "Via Lucknow - Raebareli - Prayagraj NH30 Highway",
    },
    {
      label: "Estimated Driving Time",
      value: "4.0 to 4.5 Hours",
      desc: "Smooth 4-lane national highway corridor",
    },
    {
      label: "Toll Plazas Enroute",
      value: "2-3 Fastag Plazas",
      desc: "Mohanlalganj, Raebareli & Nawabganj bypass",
    },
    {
      label: "Best Departure Time",
      value: "05:00 AM – 07:00 AM",
      desc: "Beat city traffic and reach Sangam by noon",
    },
  ];

  const popularSightseeing = [
    "Triveni Sangam (Confluence of Ganga, Yamuna & Saraswati)",
    "Bade Hanuman Ji Temple (Lete Hue Hanuman Mandir)",
    "Alopi Devi Shaktipeeth Mandir",
    "Anand Bhavan & Swaraj Bhavan (Nehru Ancestral Heritage)",
    "Allahabad High Court & Civil Lines Commercial District",
    "Khusro Bagh Mughal Gardens & Allahabad Fort",
  ];

  const routeFaqs = [
    {
      category: "Fare & Inclusions",
      question: "What is the typical one-way taxi fare from Lucknow to Prayagraj?",
      answer:
        "BroomBoom one-way taxi fare from Lucknow to Prayagraj starts at ₹1,999 for an AC Hatchback and ₹2,399 for an AC Sedan (Dzire/Etios). Fares include fuel, driver allowance, and door-to-door pickup/drop.",
    },
    {
      category: "Return Charges",
      question: "Do I have to pay return fare if I only need a drop in Prayagraj?",
      answer:
        "No! BroomBoom operates on a strict Zero Return Fare policy for one-way drops. You pay only for the one-way distance from Lucknow to Prayagraj.",
    },
    {
      category: "Pickup Locations",
      question: "Can I get picked up from Lucknow Airport (CCSI / Amausi) or Charbagh Railway Station?",
      answer:
        "Yes, our chauffeurs provide 24x7 doorstep pickups across all of Lucknow, including Chaudhary Charan Singh International Airport (Amausi), Charbagh Railway Station, Gomti Nagar, Alambagh, and Hazratganj.",
    },
    {
      category: "Sangam Darshan",
      question: "Can I book a same-day return cab for Triveni Sangam snan and darshan?",
      answer:
        "Yes! You can choose the 'Outstation Round-Trip' option. Your driver will pick you up from Lucknow early morning, escort your family to Sangam ghat, wait while you complete snan and temple darshan, and bring you safely back to Lucknow.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar onMyBookingsClick={() => setIsMyBookingsOpen(true)} />

      {/* Hero Header Banner */}
      <section
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.88), rgba(10, 16, 26, 0.94)), url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80')`,
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
            <span className="text-slate-300">Lucknow to Prayagraj Taxi Fare</span>
          </nav>

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero Return Fare &bull; 100% AC Verified Highway Chauffeurs</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Lucknow to Prayagraj Taxi Fare
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-2xl">
              Reliable, clean, and transparent one-way and round-trip cab service from Lucknow to Prayagraj (Allahabad). Doorstep pickup from Gomti Nagar, Charbagh, or Amausi Airport with verified highway drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Search Box Pre-filled Lucknow -> Prayagraj */}
      <div className="relative -mt-12 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <HeroSearch
          activeTripType={activeTripType}
          onTripTypeChange={(type) => setActiveTripType(type)}
          onSearch={handleSearch}
          initialFrom="Lucknow"
          initialTo="Prayagraj"
          heading={{
            title: "Check Live Lucknow to Prayagraj Cab Fares",
            subtitle: "Instant booking with verified drivers, GPS tracking & zero hidden charges",
            badge: "NH30 Corridor • 200 KM",
          }}
        />
      </div>

      {/* Key Route Metrics */}
      <section className="py-12 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {routeHighlights.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition text-center"
            >
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                {r.label}
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {r.value}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Fare Breakdown Table */}
      <section className="py-8 sm:py-12 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">
              Transparent Fare Rate Card
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Lucknow to Prayagraj Cab Rate Card (2026)
            </h2>
          </div>
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0">
            ✓ Inclusive of Fuel &amp; Driver Allowance
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-extrabold">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Cab Category</th>
                  <th className="py-4 px-4 sm:px-6">Capacity</th>
                  <th className="py-4 px-4 sm:px-6 text-center">One-Way Drop</th>
                  <th className="py-4 px-4 sm:px-6 text-center">Same-Day / Round-Trip</th>
                  <th className="py-4 px-4 sm:px-6">Ideal For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fareTable.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-amber-50/50 transition-colors ${
                      item.popular ? "bg-amber-50/20" : ""
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{item.vehicle}</span>
                        {item.popular && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400 text-slate-950">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">
                      <div>{item.seats}</div>
                      <div className="text-[11px] text-slate-400">{item.bags}</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center font-black text-slate-950 text-base">
                      {item.onewayFare}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center font-black text-slate-950 text-base">
                      {item.roundtripFare}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-500 text-xs">
                      {item.idealFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Triveni Sangam Darshan & Sightseeing Points */}
      <section className="py-12 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Pilgrimage &amp; Tourist Attractions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Visiting Prayagraj from Lucknow
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Prayagraj is the spiritual heart of Uttar Pradesh, home to the sacred Triveni Sangam where the Ganga, Yamuna, and mythical Saraswati converge. Whether you are traveling for holy snan, Kumbh / Magh Mela, or family heritage tours, our chauffeurs know every ghat and bypass route.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
                {popularSightseeing.map((spot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="truncate">{spot}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10">
              <h3 className="text-lg font-black text-white">Why Book with BroomBoom?</h3>
              <ul className="space-y-3 mt-4 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Doorstep Pickup Anywhere in Lucknow:</strong> We pick up from Gomti Nagar, Indira Nagar, Alambagh, Hazratganj &amp; Amausi Airport.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Clean AC Chauffeur-Driven Cars:</strong> Fully sanitized Hatchback, Sedan, Ertiga &amp; Innova Crysta cabs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Night Driving Penalty:</strong> Travel early morning or late night with transparent upfront pricing.
                  </span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">24x7 Booking Helpline</div>
                  <div className="text-sm font-extrabold text-amber-400">+91 8240765499</div>
                </div>
                <a
                  href="tel:+917044022000"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us component */}
      <WhyChooseUs />

      {/* Route FAQs */}
      <FaqSection items={routeFaqs} />

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
            router.push("/fleet?from=Lucknow&to=Prayagraj&type=outstation-oneway");
          }
        }}
        initialMessage="Please sign in to book your Lucknow to Prayagraj cab!"
      />
    </main>
  );
};

