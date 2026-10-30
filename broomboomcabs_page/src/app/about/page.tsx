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
  HeartHandshake,
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
            <span>Driven by Trust &amp; Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Redefining Intercity &amp; Outstation Cab Travel in India
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mt-5 leading-relaxed max-w-2xl mx-auto">
            BroomBoom Cabs was founded with a singular conviction: intercity cab travel should be affordable, dependable, and 100% transparent with zero unfair return fares.
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

      {/* Our Story & Mission */}
      <section className="py-16 sm:py-24 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2">
              Our Journey
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              From Local Chauffeurs to India&apos;s Preferred Highway Network
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 mt-5 leading-relaxed">
              <p>
                For decades, travellers booking one-way outstation cabs were forced to pay double fare to cover the taxi&apos;s return trip. Drivers, on the other hand, spent hours idling waiting for return passengers.
              </p>
              <p>
                BroomBoom built intelligent city-pair pairing technology that eliminates dead mileage. By connecting travellers on both sides of high-volume highway corridors, we bring down passenger fares by up to 40% while ensuring drivers earn sustainable, dignified livelihoods.
              </p>
              <p>
                Today, BroomBoom connects metro hubs like Kolkata, Bangalore, Delhi NCR, and Mumbai with pilgrimage spots, tier-2 commercial districts, and remote scenic getaways.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 transition"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
                alt="BroomBoom Highway Fleet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Customer &amp; Driver Safety First</span>
                  </div>
                  <p className="text-sm text-slate-200">
                    Clean AC Hatchbacks, Sedans, Innova Crystas, and 12-20 seater Tempo Travellers inspected before every highway dispatch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100/70 py-16 sm:py-24 border-y border-slate-200">
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
              Experience the comfort of clean, air-conditioned outstation cabs with verified commercial drivers at honest rates.
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

