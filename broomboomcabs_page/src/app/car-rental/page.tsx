import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  ChevronRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  TOP_10_CITIES_SERVICES,
  getServiceMeta,
} from "@/data/cityServicesData";
import { ServiceContentSection } from "@/components/ServiceContentSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Hourly Car Rentals Across India — Flexible Chauffeur Packages | BroomBoom Cabs",
  description:
    "Book hourly car rentals with verified chauffeurs across 100+ cities in India. 5hr to 12hr packages, unlimited stops, transparent pricing, and 24x7 support.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/car-rental",
  },
  openGraph: {
    title: "Hourly Car Rentals Across India | BroomBoom Cabs",
    description: "Book verified car rentals across India. Hourly packages with professional chauffeur and unlimited stops.",
    url: "https://dev.broomboomcabs.com/car-rental",
    siteName: "BroomBoom Cabs",
    locale: "en_IN",
    type: "website",
  },
};

export default function CarRentalCategoryPage() {
  const serviceMeta = getServiceMeta("rental") || {
    id: "rental",
    name: "Hourly Rentals",
    slug: "rental",
    shortDesc: "Chauffeur driven local city rentals",
    tripType: "hourly",
    badge: "Unlimited Stops",
  };
  const defaultCity = TOP_10_CITIES_SERVICES[0];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar activeService="rental" />

      {/* Hero Header Section */}
      <section
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-cover bg-center bg-no-repeat text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.85), rgba(10, 16, 26, 0.94)), url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80')`,
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
              Services
            </Link>
            <span>&rsaquo;</span>
            <span className="text-slate-300">Car Rental</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlimited Stops &bull; Dedicated Chauffeur &bull; Transparent Pricing</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Hourly Car Rentals Across Top Indian Cities
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Keep the cab and chauffeur with you as long as you need. Choose from 5h, 8h, 10h, and 12h flexible packages for meetings, sightseeing, weddings, and city errands.
            </p>
          </div>
        </div>
      </section>

      {/* City Directory for Car Rental */}
      <section className="py-12 sm:py-16 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">
              Select Your City
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Available Cities for Car Rentals
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Click on any city to view localized hourly rental packages, starting prices, and instant online booking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {TOP_10_CITIES_SERVICES.map((city) => (
            <Link
              key={city.cityId}
              href={`/car-rental/${city.cityId}`}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 group-hover:bg-amber-400 text-slate-900 flex items-center justify-center transition-colors mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {city.cityName}
                </h3>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">
                  {city.state}
                </div>
                <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                  {city.rentalOverview}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                <span>View {city.cityName} Rentals</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Service Highlights / Content */}
      <ServiceContentSection serviceId="rental" cityData={defaultCity} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* FAQs */}
      <FaqSection items={defaultCity.cityFaqs} />

      {/* Footer */}
      <Footer />
    </main>
  );
}

