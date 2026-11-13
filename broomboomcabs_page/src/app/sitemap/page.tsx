import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TOP_10_CITIES_SERVICES } from "@/data/cityServicesData";
import { INITIAL_BLOG_DATA } from "@/data/blogData";
import {
  MapPin,
  Car,
  Compass,
  FileText,
  Building2,
  ArrowRight,
  Plane,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sitemap | All Pages - BroomBoom Cabs",
  description:
    "Explore all pages on BroomBoom Cabs including outstation cab routes, hourly car rentals, airport transfers, city cab services, travel blogs, and company pages.",
};

function SitemapLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-start justify-between gap-2 rounded-lg px-2.5 py-2 -mx-2.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50/70 font-medium transition-all"
      >
        <span className="line-clamp-2 text-sm">{label}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </Link>
    </li>
  );
}

export default async function SitemapPage() {
  const corePages = [
    { label: "Home — Book Cabs Online", href: "/" },
    { label: "Fleet & Cab Search", href: "/fleet" },
    { label: "Booking Review & Checkout", href: "/fleet/review" },
    { label: "Taxi Service Directory", href: "/taxi-service" },
    { label: "Taxi Near Me Hub", href: "/taxi-near" },
    { label: "Self-Drive Car Rentals", href: "/self-driven" },
    { label: "All Cab Services", href: "/services" },
    { label: "Outstation Cab Booking", href: "/outstation-cabs" },
    { label: "Car Rental Services", href: "/car-rental" },
    { label: "Airport Cabs Across India", href: "/airport-cabs" },
    { label: "Airport Transfer Cabs", href: "/services/airport" },
    { label: "Hourly Cab Rentals", href: "/services/rental" },
    { label: "Become a Pilot / Driver Partner", href: "/driver-job" },
  ];

  const specialRoutes = [
    {
      label: "Lucknow to Prayagraj Taxi Fare & Booking",
      href: "/taxi-service/lucknow-to-prayagraj-taxi-fare",
    },
    {
      label: "Pet-Friendly Cabs in Kolkata",
      href: "/taxi-service/pet-friendly-cabs-in-kolkata",
    },
    {
      label: "Pet-Friendly Cabs in Delhi NCR",
      href: "/taxi-service/pet-friendly-cab-in-delhi",
    },
    {
      label: "Pet-Friendly Cabs in Mumbai",
      href: "/taxi-service/pet-friendly-cab-in-mumbai",
    },
    {
      label: "Pet-Friendly Cabs in Bangalore",
      href: "/taxi-service/pet-friendly-cab-in-bangalore",
    },
    {
      label: "Taxi Near Me in Kolkata",
      href: "/taxi-near/kolkata",
    },
    {
      label: "Taxi Near Me in Delhi NCR",
      href: "/taxi-near/delhi",
    },
    {
      label: "Taxi Near Me in Mumbai",
      href: "/taxi-near/mumbai",
    },
    {
      label: "Self-Drive Cars in Kolkata",
      href: "/self-driven/kolkata",
    },
    {
      label: "Self-Drive Cars in Delhi NCR",
      href: "/self-driven/delhi",
    },
    {
      label: "Self-Drive Cars in Goa",
      href: "/self-driven/goa",
    },
  ];

  const companyPages = [
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/user-terms" },
    { label: "Travel Blog & Guides", href: "/blogs" },
    { label: "Blog Archive", href: "/blog" },
  ];

  const totalCities = TOP_10_CITIES_SERVICES.length;
  const totalPages =
    corePages.length +
    specialRoutes.length +
    companyPages.length +
    INITIAL_BLOG_DATA.posts.length +
    TOP_10_CITIES_SERVICES.length * 4;

  const stats = [
    { icon: Layers, label: "Pages", value: totalPages },
    { icon: MapPin, label: "Cities", value: totalCities },
    { icon: FileText, label: "Guides", value: INITIAL_BLOG_DATA.posts.length },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1 w-full">
        {/* ─── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950">
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange-600/15 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-5 backdrop-blur">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Website Directory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              BroomBoom Cabs{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Sitemap
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl">
              Browse every page on BroomBoom Cabs — outstation cab routes, city car rentals, airport
              transfers, travel guides, and support pages.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur px-4 py-2.5"
                  >
                    <Icon className="w-4 h-4 text-amber-400" />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-white leading-none">{s.value}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Content ──────────────────────────────────────── */}
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Top 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Core & Service */}
            <section className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-200 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                      <Car className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900">Core &amp; Service</h2>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {corePages.length}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {corePages.map((item) => (
                    <SitemapLink key={item.href} href={item.href} label={item.label} />
                  ))}
                </ul>
              </div>
            </section>

            {/* Featured Taxi Services */}
            <section className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                      <Compass className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900">Featured Routes</h2>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {specialRoutes.length}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {specialRoutes.map((item) => (
                    <SitemapLink key={item.href} href={item.href} label={item.label} />
                  ))}
                </ul>
              </div>
            </section>

            {/* Company & Info */}
            <section className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900">Company &amp; Info</h2>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {companyPages.length}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {companyPages.map((item) => (
                    <SitemapLink key={item.href} href={item.href} label={item.label} />
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Blog full width */}
          <section className="mt-6 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      Travel Blog &amp; Guides
                    </h2>
                    <p className="text-[11px] text-slate-500">Tips, routes, and destination guides</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">
                  {INITIAL_BLOG_DATA.posts.length}
                </span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-0.5">
                {INITIAL_BLOG_DATA.posts.map((post) => (
                  <SitemapLink key={post.slug} href={`/blog/${post.slug}`} label={post.title} />
                ))}
              </ul>
            </div>
          </section>

          {/* City-wise services */}
          <section className="mt-6 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
            <div className="p-5 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      City-Wise Cab Services
                    </h2>
                    <p className="text-xs text-slate-500">
                      Outstation cabs, hourly rentals, and airport transfers by city
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                  {TOP_10_CITIES_SERVICES.length} cities
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOP_10_CITIES_SERVICES.map((city) => (
                  <div
                    key={city.cityId}
                    className="group rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:bg-white hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/60 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs font-black shadow-sm group-hover:scale-110 transition-transform">
                        {city.cityName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate">
                          {city.cityName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium truncate">
                          {city.state}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-0.5 text-xs">
                      <li>
                        <Link
                          href={`/outstation-cabs/${city.cityId}`}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 -mx-2 text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        >
                          <Car className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">Outstation Cabs in {city.cityName}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/hourly-rentals/${city.cityId}`}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 -mx-2 text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        >
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">Hourly Rentals in {city.cityName}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/car-rental/${city.cityId}`}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 -mx-2 text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        >
                          <Car className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">Car Rental in {city.cityName}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/airport-cabs/${city.cityId}`}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 -mx-2 text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        >
                          <Plane className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">Airport Cabs in {city.cityName}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}