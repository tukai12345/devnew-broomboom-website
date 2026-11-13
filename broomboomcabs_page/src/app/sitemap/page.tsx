import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TOP_10_CITIES_SERVICES } from "@/data/cityServicesData";
import { INITIAL_BLOG_DATA } from "@/data/blogData";
import {
  INTERCITY_AND_AREA_ROUTES,
  PET_FRIENDLY_ROUTES,
  TAXI_SERVICE_ROUTES,
} from "@/data/taxiServiceRoutes";
import { KOLKATA_ROUTES } from "@/data/kolkataRoutes";
import { EXTRA_OUTSTATION_CITIES } from "@/app/outstation-cabs/[city]/page";
import { EXTRA_AIRPORT_CITIES } from "@/app/airport-cabs/[city]/page";
import {
  CAR_RENTAL_SPECIAL_ROUTES,
  parseSpecialCarRentalSlug,
} from "@/data/carRentalRoutes";
import { BOOK_TAXI_ROUTES } from "@/data/bookTaxiRoutes";
import {
  SELF_DRIVE_ROUTES,
  parseSelfDriveSlug,
} from "@/data/selfDriveRoutes";
import {
  TAXI_NEAR_ROUTES,
  formatTaxiNearCity,
} from "@/data/taxiNearRoutes";
import {
  CANONICAL_TEMPLE_SLUGS,
  TEMPLE_DETAILS_MAP,
} from "@/data/templeKolkataRoutes";
import {
  CORPORATE_PICK_DROP_SLUGS,
  CORPORATE_DETAILS_MAP,
} from "@/data/corporatePickDropRoutes";
import {
  RESERVED_CABS_SLUGS,
  RESERVED_CABS_MAP,
} from "@/data/reservedCabsRoutes";
import {
  SHOPPING_MALL_SLUGS,
  SHOPPING_MALLS_MAP,
} from "@/data/shoppingMallKolkataRoutes";
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
  Heart,
  Navigation,
  Briefcase,
  Mountain,
  ShoppingBag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sitemap | All Pages & Taxi Routes - BroomBoom Cabs",
  description:
    "Explore all pages on BroomBoom Cabs: intercity taxi routes, airport transfers, pet-friendly cabs, hourly car rentals, travel blogs, and company info.",
};

function formatRouteSlug(slug: string): string {
  if (slug.startsWith("pet-friendly-cab-in-")) {
    const city = slug
      .replace("pet-friendly-cab-in-", "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return `Pet-Friendly Cabs in ${city}`;
  }

  if (slug === "kalyanitokolkatacabs") return "Kalyani to Kolkata Cabs";
  if (slug === "puritokolkatacabs") return "Puri to Kolkata Cabs";
  if (slug === "ranchitokolkatacabs") return "Ranchi to Kolkata Cabs";
  if (slug === "southcitymallkolkata") return "Taxi Service near South City Mall Kolkata";
  if (slug === "kolkata-durga-puja-taxi-for-pandal-sightseeing")
    return "Kolkata Durga Puja Taxi for Pandal Sightseeing";

  return slug
    .split("-")
    .map((w) => {
      const lower = w.toLowerCase();
      if (lower === "bbsr" || lower === "bbi") return "Bhubaneswar";
      if (lower === "to") return "to";
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

function formatCarRentalSlug(slug: string): string {
  const parsed = parseSpecialCarRentalSlug(slug);
  if (parsed) return parsed.h1;
  if (slug === "kolkata1") return "Car Rental in Kolkata (Hub 1)";
  return "Car Rental in " + slug.charAt(0).toUpperCase() + slug.slice(1);
}

function formatSelfDriveSlug(slug: string): string {
  const parsed = parseSelfDriveSlug(slug);
  if (parsed) return parsed.heading;
  return "Self-Drive in " + slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function SitemapLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-start justify-between gap-2 rounded-lg px-2.5 py-1.5 -mx-2 text-slate-600 hover:text-amber-700 hover:bg-amber-50/70 font-medium transition-all"
      >
        <span className="line-clamp-1 text-xs sm:text-sm">{label}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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

  const featuredHubs = [
    {
      label: "Lucknow to Prayagraj Taxi Fare",
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

  const specializedCorridors = [
    {
      label: "Cab Attachment in Pune (Attach Taxi & Car)",
      href: "/cab-attachment/pune",
      tag: "Pilot Hub",
    },
    {
      label: "Driver Job & Partner Registration in Mumbai",
      href: "/driver-job/mumbai",
      tag: "Driver Job",
    },
    {
      label: "Kolkata Durga Puja Pandal Hopping Cabs",
      href: "/durga-puja/kolkata-durga-puja-pandal-2024",
      tag: "Festival",
    },
    {
      label: "Kolkata to Darjeeling Cabs",
      href: "/kolkata-to-darjeeling/cabs",
      tag: "Hills",
    },
    {
      label: "Kolkata to Jalpaiguri Cabs",
      href: "/kolkata-to-jalpaiguri/cabs",
      tag: "Intercity",
    },
    {
      label: "Kolkata to Kharagpur Cabs",
      href: "/kolkata-to-kharagpur/cabs",
      tag: "Intercity",
    },
    {
      label: "One-Way Cab & Ujjain Taxi Fare",
      href: "/oneway-cab/ujjain-taxi-fare",
      tag: "Pilgrimage",
    },
    {
      label: "Shared Taxi Haldwani to Almora",
      href: "/shared-taxi/haldwani-to-almora",
      tag: "Shared Cab",
    },
    {
      label: "Asansol to Kolkata Cabs",
      href: "/taxi-service-asansol-to-kolkata/cabs",
      tag: "Intercity",
    },
    {
      label: "Digha to Kolkata Cab Service",
      href: "/taxi-service-digha-to-kolkata/cab",
      tag: "Coastal",
    },
    {
      label: "Taxi Service in New Town Kolkata",
      href: "/taxi-service-New/Town-Kolkata",
      tag: "Local Hub",
    },
    {
      label: "Taxi Near Me in Kalimpong",
      href: "/taxi-service-taxi-near/kalimpong",
      tag: "Taxi Near",
    },
  ];

  const totalPages =
    corePages.length +
    featuredHubs.length +
    companyPages.length +
    specializedCorridors.length +
    INITIAL_BLOG_DATA.posts.length +
    TOP_10_CITIES_SERVICES.length * 4 +
    TAXI_SERVICE_ROUTES.length +
    KOLKATA_ROUTES.length +
    EXTRA_OUTSTATION_CITIES.length;

  const stats = [
    { icon: Layers, label: "Total Pages", value: totalPages },
    { icon: Navigation, label: "Intercity Routes", value: INTERCITY_AND_AREA_ROUTES.length },
    { icon: Heart, label: "Pet Cab Cities", value: PET_FRIENDLY_ROUTES.length },
    { icon: FileText, label: "Blog Guides", value: INITIAL_BLOG_DATA.posts.length },
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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-5 backdrop-blur">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Website &amp; Taxi Directory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              BroomBoom Cabs{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Sitemap
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl">
              Direct links to every page across India: intercity outstation cabs, airport pickup &amp;
              drop corridors, pet-friendly cabs, local rentals, blogs, and legal policies.
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
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Top 3 cards: Core, Featured, Company */}
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
                    <h2 className="text-base font-extrabold text-slate-900">Core Services</h2>
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

            {/* Featured Hubs */}
            <section className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                      <Compass className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900">Featured Hubs</h2>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {featuredHubs.length}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {featuredHubs.map((item) => (
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
                    <h2 className="text-base font-extrabold text-slate-900">Company &amp; Legal</h2>
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

          {/* ─── Specialized Regional Corridors & Driver Attachments ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      Specialized Regional Corridors &amp; Driver Attachments
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Popular outstation routes, shared taxis, festival cabs, and driver onboarding hubs
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 self-start sm:self-auto">
                  {specializedCorridors.length} Corridors
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {specializedCorridors.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group p-3 rounded-xl border border-slate-200/80 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/40 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-700">
                        <span>{item.tag}</span>
                        <span className="text-slate-400 group-hover:text-amber-600 font-semibold transition-colors">
                          View &rarr;
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition mt-1 line-clamp-2">
                        {item.label}
                      </h3>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 pt-1 border-t border-slate-100 truncate">
                      {item.href}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Kolkata Direct Outstation Corridors ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
            <div className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 font-black">
                    K
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Kolkata Outstation Cab Corridors
                    </h2>
                    <p className="text-xs text-slate-500">
                      Popular one-way cab fares and intercity highway rides directly from Kolkata
                    </p>
                  </div>
                </div>
                <span className="inline-flex self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                  {KOLKATA_ROUTES.length} Verified Corridors
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1">
                {KOLKATA_ROUTES.map((slug) => (
                  <SitemapLink
                    key={slug}
                    href={`/kolkata/${slug}`}
                    label={formatRouteSlug(slug)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── Special Car Rentals, Tempo Travellers & Minibuses ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />
            <div className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Car Rentals &amp; Tempo Travellers
                    </h2>
                    <p className="text-xs text-slate-500">
                      Chauffeur-driven hourly rentals, 8-seater to 26-seater tempo travellers, and festive packages
                    </p>
                  </div>
                </div>
                <span className="inline-flex self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {CAR_RENTAL_SPECIAL_ROUTES.length} Rental Services
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                {CAR_RENTAL_SPECIAL_ROUTES.map((slug) => (
                  <SitemapLink
                    key={slug}
                    href={`/car-rental/${slug}`}
                    label={formatCarRentalSlug(slug)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── Direct Book Taxi Intercity Routes ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600" />
            <div className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Direct Book Taxi Routes
                    </h2>
                    <p className="text-xs text-slate-500">
                      Cheapest rate one-way intercity cab bookings across South &amp; West India
                    </p>
                  </div>
                </div>
                <span className="inline-flex self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                  {BOOK_TAXI_ROUTES.length} Route Corridors
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                {BOOK_TAXI_ROUTES.map((slug) => (
                  <SitemapLink
                    key={slug}
                    href={`/book-taxi/${slug}`}
                    label={formatRouteSlug(slug)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── Self-Drive Cars in Hyderabad & Localities ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600" />
            <div className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Self-Drive Cars in Hyderabad &amp; Localities
                    </h2>
                    <p className="text-xs text-slate-500">
                      Unlimited kilometers, zero deposit options &amp; doorstep delivery across Hyderabad hubs
                    </p>
                  </div>
                </div>
                <span className="inline-flex self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                  {SELF_DRIVE_ROUTES.length} Hyderabad Hubs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                {SELF_DRIVE_ROUTES.map((slug) => (
                  <SitemapLink
                    key={slug}
                    href={`/self-driven/${slug}`}
                    label={formatSelfDriveSlug(slug)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── Taxi Near Me Hubs ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600" />
            <div className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Taxi Near Me Hubs
                    </h2>
                    <p className="text-xs text-slate-500">
                      3 to 8 minute doorstep pickup with local verified chauffeurs across West Bengal &amp; key districts
                    </p>
                  </div>
                </div>
                <span className="inline-flex self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                  {TAXI_NEAR_ROUTES.length} Fast Pickup Hubs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                {TAXI_NEAR_ROUTES.map((slug) => (
                  <SitemapLink
                    key={slug}
                    href={`/taxi-near/${slug}`}
                    label={`Taxi Near Me in ${formatTaxiNearCity(slug)}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── Popular Intercity Taxi Routes & Airport Cabs ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
            <div className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Intercity Outstation &amp; Airport Taxi Routes
                    </h2>
                    <p className="text-xs text-slate-500">
                      One-way cab fares, airport transfers, and popular city pairs across India
                    </p>
                  </div>
                </div>
                <span className="inline-flex self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                  {INTERCITY_AND_AREA_ROUTES.length} Verified Routes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1 max-h-[560px] overflow-y-auto pr-2">
                {INTERCITY_AND_AREA_ROUTES.map((slug) => (
                  <SitemapLink
                    key={slug}
                    href={`/taxi-service/${slug}`}
                    label={formatRouteSlug(slug)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── Pet-Friendly Cabs Across India ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500" />
            <div className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                    <Heart className="w-5 h-5 fill-white text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Pet-Friendly Cabs Across India
                    </h2>
                    <p className="text-xs text-slate-500">
                      100% verified pet-welcoming cabs for dogs &amp; cats across 220+ cities
                    </p>
                  </div>
                </div>
                <span className="inline-flex self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
                  {PET_FRIENDLY_ROUTES.length} Cities
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1 max-h-[500px] overflow-y-auto pr-2">
                {PET_FRIENDLY_ROUTES.map((slug) => (
                  <SitemapLink
                    key={slug}
                    href={`/taxi-service/${slug}`}
                    label={formatRouteSlug(slug)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── City-wise services ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
            <div className="p-5 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Metro &amp; City Hubs
                    </h2>
                    <p className="text-xs text-slate-500">
                      Outstation cabs, hourly rentals, and airport transfers by city
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                  {TOP_10_CITIES_SERVICES.length} Metros
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

              {/* Extra Outstation Hubs */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">
                  More Popular Outstation Hubs Across India
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {EXTRA_OUTSTATION_CITIES.map((c) => {
                    const label =
                      c === "kolkata1"
                        ? "Kolkata Hub 1"
                        : c.charAt(0).toUpperCase() + c.slice(1);
                    return (
                      <Link
                        key={c}
                        href={`/outstation-cabs/${c}`}
                        className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-800 text-xs font-semibold text-slate-700 border border-slate-200/80 transition-colors truncate"
                      >
                        {label} Outstation
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Extra Airport Taxi Hubs */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-amber-500" />
                  <span>More Airport Taxi Hubs Across India</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {EXTRA_AIRPORT_CITIES.map((c) => {
                    const label = c.charAt(0).toUpperCase() + c.slice(1);
                    return (
                      <Link
                        key={c}
                        href={`/airport-cabs/${c}`}
                        className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-800 text-xs font-semibold text-slate-700 border border-slate-200/80 transition-colors truncate"
                      >
                        {label} Airport
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ─── Kolkata & Bengal Temple Pilgrimage Cabs ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      Kolkata &amp; Bengal Temple Pilgrimage Cabs
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Sacred darshan, aarti timing guides, and round-trip pilgrimage taxis from Kolkata
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/taxi-service-temple-kolkata"
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 underline"
                  >
                    View Directory
                  </Link>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {CANONICAL_TEMPLE_SLUGS.length} Temples
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CANONICAL_TEMPLE_SLUGS.map((slug) => {
                  const temple = TEMPLE_DETAILS_MAP[slug];
                  if (!temple) return null;
                  const href = `/taxi-service-temple-kolkata/${encodeURIComponent(slug)}`;
                  return (
                    <Link
                      key={slug}
                      href={href}
                      className="group p-3 rounded-xl border border-slate-200/80 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/40 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-amber-700">
                          <span>{temple.distanceFromKolkata.split(" ")[0]} {temple.distanceFromKolkata.split(" ")[1]}</span>
                          <span className="text-slate-500 font-medium">Starts ₹{temple.startingPrice}</span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition mt-1 line-clamp-1">
                          {temple.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{temple.deity}</p>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                        <span>{temple.travelTime}</span>
                        <span className="text-amber-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                          Book Cab &rarr;
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Corporate Employee Pick & Drop Cabs ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      Corporate Pick &amp; Drop Cabs — Kolkata IT Hubs
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Dedicated employee commute, daily staff shuttles &amp; monthly carpools for Kolkata tech parks
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/corporate-pick-drop-kolkata"
                    className="text-xs font-bold text-sky-700 hover:text-sky-800 underline"
                  >
                    View Directory
                  </Link>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    {CORPORATE_PICK_DROP_SLUGS.length} Campuses
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {CORPORATE_PICK_DROP_SLUGS.map((slug) => {
                  const corp = CORPORATE_DETAILS_MAP[slug];
                  if (!corp) return null;
                  const href = `/corporate-pick-drop-kolkata/${encodeURIComponent(slug)}`;
                  return (
                    <Link
                      key={slug}
                      href={href}
                      className="group p-3 rounded-xl border border-slate-200/80 hover:border-sky-400 bg-slate-50/50 hover:bg-sky-50/40 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-sky-700">
                          <span>{corp.zone}</span>
                          <span className="text-slate-500 font-medium">Pass ₹{corp.monthlyPassEstimate}/mo</span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-800 transition mt-1 line-clamp-1">
                          {corp.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{corp.campusName}</p>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                        <span>{corp.employeeCountEstimate}</span>
                        <span className="text-sky-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                          View Cabs &rarr;
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Reserved Airport Cabs — Himalayan & Northeast Routes ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <Mountain className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      Reserved Airport Cabs — Himalayan &amp; Northeast Corridors
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Private airport transfers from Bagdogra (IXB) and Guwahati (GAU) to Sikkim, Kalimpong, Nepal &amp; Shillong
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/reserved-cabs"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                  >
                    View Directory
                  </Link>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {RESERVED_CABS_SLUGS.length} Corridors
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {RESERVED_CABS_SLUGS.map((slug) => {
                  const route = RESERVED_CABS_MAP[slug];
                  if (!route) return null;
                  const href = `/reserved-cabs/${encodeURIComponent(slug)}`;
                  return (
                    <Link
                      key={slug}
                      href={href}
                      className="group p-3 rounded-xl border border-slate-200/80 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/40 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700">
                          <span>{route.originCode} Airport</span>
                          <span className="text-slate-500 font-medium">Starts ₹{route.startingPrice}</span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition mt-1 line-clamp-1">
                          {route.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{route.destination}</p>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                        <span>{route.duration} • {route.distance}</span>
                        <span className="text-emerald-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                          Reserve &rarr;
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Kolkata Shopping Malls Taxi Service ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      Shopping Malls Taxi Service — Kolkata Retail &amp; Multiplex Hubs
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Curbside drop-offs, big boot space for shopping bags &amp; AC waiting during movies at premier malls
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/taxi-service-shoppingmalls-kolkata"
                    className="text-xs font-bold text-rose-700 hover:text-rose-800 underline"
                  >
                    View Directory
                  </Link>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    {SHOPPING_MALL_SLUGS.length} Malls
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SHOPPING_MALL_SLUGS.map((slug) => {
                  const mall = SHOPPING_MALLS_MAP[slug];
                  if (!mall) return null;
                  const href = `/taxi-service-shoppingmalls-kolkata/${encodeURIComponent(slug)}`;
                  return (
                    <Link
                      key={slug}
                      href={href}
                      className="group p-3 rounded-xl border border-slate-200/80 hover:border-rose-400 bg-slate-50/50 hover:bg-rose-50/40 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-rose-700">
                          <span>{mall.zone}</span>
                          <span className="text-slate-500 font-medium">Starts ₹{mall.startingPrice}</span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-rose-800 transition mt-1 line-clamp-1">
                          {mall.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{mall.mallType}</p>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                        <span>{mall.openingHours}</span>
                        <span className="text-rose-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                          Book Cab &rarr;
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Blog full width ──────────────────────── */}
          <section className="mt-8 relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
