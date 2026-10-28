import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Car,
  Plane,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  SERVICES_LIST,
  TOP_10_CITIES_SERVICES,
  getServiceMeta,
  getServiceUrl,
  ServiceType,
} from "@/data/cityServicesData";
import { ServiceContentSection } from "@/components/ServiceContentSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";

interface PageProps {
  params: {
    service: string;
  };
}

export async function generateStaticParams() {
  const services: ServiceType[] = ["outstation", "rental", "airport"];
  return services.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const serviceMeta = getServiceMeta(params.service);
  if (!serviceMeta) {
    return {
      title: "Cab Services | BroomBoom Cabs",
    };
  }

  return {
    title: `${serviceMeta.name} Across India — Lowest Fares & Zero Surge | BroomBoom Cabs`,
    description: `Book verified ${serviceMeta.name.toLowerCase()} across 100+ cities in India. ${serviceMeta.shortDesc}. Clean AC cars, GPS tracking, and 24x7 customer support.`,
  };
}

export default function ServiceCategoryPage({ params }: PageProps) {
  if (params.service === "outstation") {
    redirect("/outstation-cabs");
  }

  const serviceMeta = getServiceMeta(params.service);
  if (!serviceMeta) {
    notFound();
  }

  const defaultCity = TOP_10_CITIES_SERVICES[0];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar activeService={serviceMeta.id} />

      {/* Hero Header Section */}
      <section
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-cover bg-center bg-no-repeat text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.85), rgba(10, 16, 26, 0.94)), url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80')`,
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
            <span className="text-slate-300">{serviceMeta.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{serviceMeta.badge} &bull; 100% Verified Commercial Cabs</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {serviceMeta.name} Across Top Indian Cities
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {serviceMeta.shortDesc}. Choose your city below to view localized route pricing, airport drops, and customizable hourly packages with zero hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* City Directory for this Service */}
      <section className="py-12 sm:py-16 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">
              Select Your Location
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Available Cities for {serviceMeta.name}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Click on any city to access tailored route schedules, transparent fare structures, and instant doorstep cab bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {TOP_10_CITIES_SERVICES.map((city) => (
            <Link
              key={city.cityId}
              href={getServiceUrl(serviceMeta.id, city.cityId)}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 group-hover:bg-amber-400 text-slate-900 flex items-center justify-center transition-colors mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {city.cityName}
                </h3>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">
                  {city.state}
                </div>
                <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                  {serviceMeta.id === "outstation"
                    ? city.outstationOverview
                    : serviceMeta.id === "rental"
                    ? city.rentalOverview
                    : city.airportOverview}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                <span>View {city.cityName} Cabs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Service Highlights / Content */}
      <ServiceContentSection serviceId={serviceMeta.id} cityData={defaultCity} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* FAQs */}
      <FaqSection items={defaultCity.cityFaqs} />

      {/* Footer */}
      <Footer />
    </main>
  );
}

