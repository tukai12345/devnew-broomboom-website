import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  MapPin,
  Clock,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | BroomBoom Cabs — India's Fast-Growing Intercity Cab Network",
  description:
    "Learn about BroomBoom Cabs — our mission, verified fleet chauffeurs, zero return fare oneway drops, transparent pricing, and 24x7 pan-India travel support.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/about",
  },
};

export default function AboutPage() {
  const stats = [
    { label: "Cities Connected", value: "100+", sub: "Pan-India reach" },
    { label: "Verified Drivers", value: "25,000+", sub: "Commercial chauffeurs" },
    { label: "Happy Travellers", value: "500K+", sub: "Safely delivered" },
    { label: "Average Rating", value: "4.9 / 5", sub: "Google & Customer reviews" },
  ];

  const coreValues = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: "Zero Return Fare",
      desc: "Why pay round-trip charges for a one-way trip? We revolutionized intercity travel by charging only for the kilometers you travel.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "100% Commercial Verified",
      desc: "Every driver undergoes strict background verification, commercial license vetting, and customer etiquette training.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "Transparent & All-Inclusive",
      desc: "No hidden surge pricing at the last minute. Fuel, driver allowance, and road charges are calculated up front with clear breakdowns.",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "24x7 Real Chauffeur Support",
      desc: "Live round-the-clock trip tracking and dedicated support desk for complete peace of mind on highway journeys.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.88), rgba(10, 16, 26, 0.95)), url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Us</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            BroomBoom Cabs — Get verified top rated pilots and experience the most
            economical intercity ride anytime from anywhere in West Bengal.
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 mt-5 leading-relaxed max-w-2xl mx-auto">
            Discover our mission to make outstation cab travel transparent,
            affordable, and reliable across West Bengal and beyond.
          </p>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="relative -mt-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-md text-center"
            >
              <div className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-amber-600 mt-1">
                {s.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 1. Left Image / Right Content */}
      <section className="py-16 sm:py-24 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-full min-h-[320px] sm:min-h-[420px]">
            <img
              src="/images/about-who-we-are.jpg"
              alt="Who We Are - All Mobility Solutions for Billions"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              Who We Are
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              All Mobility Solutions for Billions
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                BroomBoom Cabs is the only platform where one can avail Cab Services, Bike-Taxi Services, or Toto Cab (E-Rickshaw) services in any part of West Bengal. BroomBoom initiated the ride-hailing revolution in West Bengal, where customers could easily book an AC cab at their doorstep with a single tap on their phone.
              </p>
              <p>
                The journey of BroomBoom Cabs began during the Covid pandemic times, when its founders built up a mobility bridge that connects the gaps of all the rural and urban areas of the State Transport by providing cab services at any hour of the day and night. What started out as a humble beginning was soon to revolutionize mobility in India.
              </p>
              <p>
                BroomBoom Cabs proactively offers its ride-hailing services across the State with well-maintained cars and professionally trained driver partners (also known as "BroomBoom Pilots"). Our dynamic operations team and 24/7 customer helpline services are backed by a strong tech-driven ecosystem put together to deliver the best ride experience to each and every customer.
              </p>
              <p>
                BroomBoom Cabs is the most trusted and reliable cab service in West Bengal that promises to provide a fleet of vehicles ranging from pocket-friendly hatchbacks, sedans, and SUVs to premium sedans and electric cars (EVGO). Apart from providing car rentals, local city, and intercity rides, BroomBoom Cabs also provide airport pick and drop facility both during the day and night hours. For weekend getaways, business outings, and so on, one can pre-schedule 'BroomBoom Outstation Cabs' in advance that currently covers over 7000+ destinations across various cities. BroomBoom Cabs is the one-stop solution for all your personal and business travel requirements that manages end-to-end mobility of resources in an organized way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Right Image / Left Content (Mission) */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                OUR MISSION
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Delivering Unshaken Reliability & Trusted Services
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  At BroomBoom Cabs, we strive to deliver the promise of unshaken reliability and trusted services to all our valued customers in each and every ride offered to them. Our mission is to exceed our customers' needs by providing professional, courteous, on-time ground transportation solutions and to create superior business opportunities for our pilots, and to develop an ideal working environment for all our employees.
                </p>
                <p>
                  Our goal is to provide the safest and quickest ride service to the commuters of India and to expand its services in other countries also. We aim at meeting customer's expectations through high-tech developed features in the App.
                </p>
                <p>
                  We believe that a vehicle is only as good as its pilots, and BroomBoom Cabs pilots are not just equipped with superior driving skills, but also with excellent soft skills.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-50/80 p-6 sm:p-10 flex items-center justify-center min-h-[320px] sm:min-h-[400px]">
              <img
                src="/images/about-our-mission.png"
                alt="Our Mission - Delivering Unshaken Reliability & Trusted Services"
                className="w-full h-auto max-h-[360px] object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Left Image / Right Content (Vision) */}
      <section className="py-16 sm:py-24 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-50/80 p-6 sm:p-10 flex items-center justify-center min-h-[320px] sm:min-h-[400px]">
            <img
              src="/images/about-our-vision.png"
              alt="Our Vision - Creating Global Transportation Networks"
              className="w-full h-auto max-h-[360px] object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              OUR VISION
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Creating Global Transportation Networks
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                To provide the best comfortable taxi-based transportation services through the creation of transportation networks not only to the inhabitants and visitors of India but also in other foreign countries. 
              </p>
              <p>
                Through this strong networking in an area, we provide customers the instant services without any kind of delay, hence reducing the waiting time of finding the closest Cab. The automatic dispatch of the closest Cab to your pickup location helps you in reaching your destination quickly. 
              </p>
              <p>
                Aside from being able to hail the cab at most metro stations, airport areas, or city locations, the BroomBoom App, web, and IVR based phone service plus fully staffed call centers with 24 hours a day, seven days a week service, provide customers with access to year-round customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Right Image / Left Content (Values) */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
                OUR VALUES
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Building Mobility for the Next Billion Indians
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  At BroomBoom Cabs, we value safety, diversity in people and ideas, and having a dedicated team made up of those that have a passion for excellence.
                </p>
                <p>
                  BroomBoom is looking to build mobility for the next billion Indians and also in providing many opportunities of development for the young youth of INDIA.
                </p>
                <p>
                  More than 10,000+ pilots work tirelessly to provide you the best in technology and services. We aim at making the lives of the people more easier and comfortable.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-50/80 p-6 sm:p-10 flex items-center justify-center min-h-[320px] sm:min-h-[400px]">
              <img
                src="/images/about-our-values.png"
                alt="Our Values - Building Mobility for the Next Billion Indians"
                className="w-full h-auto max-h-[320px] object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid (From original code) */}
      <section className="bg-slate-100/70 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              The BroomBoom Promise
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Half A Million Riders Choose BroomBoom
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#0c192e] text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Book Your Next Highway Ride?
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Experience the comfort of clean, air-conditioned outstation cabs
              with verified commercial drivers at honest rates.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-400/25 transition active:scale-95"
              >
                Book Your Cab Now
              </Link>
              <a
                href="tel:+918240765499"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call 24x7 Helpline</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}