"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Mail, MapPin, ShieldCheck } from "lucide-react";

const cityLinks = [
  { label: "Cabs in Kolkata", href: "/outstation-cabs/kolkata" },
  { label: "Cabs in Delhi", href: "/outstation-cabs/delhi" },
  { label: "Cabs in Mumbai", href: "/outstation-cabs/mumbai" },
  { label: "Cabs in Bangalore", href: "/outstation-cabs/bangalore" },
  { label: "Cabs in Pune", href: "/outstation-cabs/pune" },
  { label: "Cabs in Hyderabad", href: "/outstation-cabs/hyderabad" },
  { label: "Cabs in Ahmedabad", href: "/outstation-cabs/ahmedabad" },
  { label: "Cabs in Kochi", href: "/outstation-cabs/kochi" },
  { label: "Cabs in Chandigarh", href: "/outstation-cabs/chandigarh" },
];

const serviceLinks = [
  { label: "Taxi Services Directory", href: "/taxi-service" },
  { label: "Taxi Near Me", href: "/taxi-near" },
  { label: "Pet-Friendly Cabs", href: "/taxi-service/pet-friendly-cabs-in-kolkata" },
  { label: "Self-Drive Car Rentals", href: "/self-driven" },
  { label: "Outstation Cab Booking", href: "/outstation-cabs" },
  { label: "Airport Transfer Cabs", href: "/airport-cabs" },
  { label: "Hourly Cab Rentals", href: "/car-rental" },
  { label: "Become a Pilot / Driver", href: "/driver-job" },
];

const legalLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Blog & Guides", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/user-terms" },
];

const linkClass =
  "inline-block rounded py-0.5 transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-[#090d16] pb-[calc(5rem+env(safe-area-inset-bottom))] pt-6 text-xs text-slate-400 sm:pb-8 sm:pt-10">
      <div className="w-full">
        {/* Top brand & contacts */}
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <div className="min-w-0 space-y-3 p-4 sm:p-6 lg:p-8">
            <Link
              href="/"
              aria-label="BroomBoom Cabs — Go to home page"
              className="flex items-center gap-2.5 rounded transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <img
                  src="/logo.png"
                  alt="BroomBoom Cabs"
                  className="h-full w-full object-contain drop-shadow-md"
                />
              </div>
              <div className="text-xl font-black leading-none text-white">
                <span className="text-xl sm:text-2xl font-black tracking-tighter text-white truncate">
  BroomBoom <span className="text-yellow-400">Cabs</span>
</span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400">
              India&apos;s fastest growing verified outstation taxi, airport
              transfer, and local hourly cab rental network.
            </p>

            <div className="flex items-center gap-2 pt-1 font-semibold text-amber-400">
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-emerald-400"
                aria-hidden="true"
              />
              <span>100% Verified Commercial Fleet</span>
            </div>
          </div>

          <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white">
              Cabs in Top Cities
            </h4>
            {/* 2 columns on mobile so the footer isn't 9 rows tall */}
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:gap-y-2">
              {cityLinks.map((item) => (
                <li key={item.label} className="min-w-0">
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.label} className="min-w-0">
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white">
              24x7 Customer Desk
            </h4>

            <div className="space-y-2.5">
              <a
                href="tel:+918240765499"
                className="flex items-center gap-2 py-0.5 font-bold text-white transition hover:text-amber-400"
              >
                <PhoneCall
                  className="h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span className="break-words">+91 8240765499</span>
              </a>

              <a
                href="mailto:support@broomboom.com"
                className="flex items-center gap-2 py-0.5 transition hover:text-white"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span className="min-w-0 break-words">
                  support@broomboom.com
                </span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span className="min-w-0 break-words">
                  Headquarters: Sector V, Salt Lake, Kolkata, India
                </span>
              </div>

              {/* --- BROOMBOOM APPS (CUSTOMER & PILOT) --- */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-[11px] font-black uppercase tracking-wider text-white mb-2.5">
                  Download Mobile Apps
                </div>
                <div className="flex items-center gap-3">
                  {/* BroomBoom Customer / Rider App */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.broomboom.user"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
                    aria-label="Download BroomBoom Cabs Rider App on Google Play"
                  >
                    <div className="w-[104px] sm:w-[108px] p-2 rounded-xl bg-black/60 border border-white/10 group-hover:border-amber-400/50 transition shadow-md">
                      <img
                        src="/images/broomboom-customer-app.png"
                        alt="BroomBoom Cabs Rider App on Google Play"
                        className="w-full h-auto object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-amber-400 mt-1.5 transition">
                      Customer App
                    </span>
                  </a>

                  {/* BroomBoom Pilot / Driver App */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.broomboom.pilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
                    aria-label="Download BroomBoom Pilot Partner App on Google Play"
                  >
                    <div className="w-[104px] sm:w-[108px] p-2 rounded-xl bg-black/60 border border-white/10 group-hover:border-amber-400/50 transition shadow-md">
                      <img
                        src="/images/broomboom-pilot-app.png"
                        alt="BroomBoom Pilot Partner App on Google Play"
                        className="w-full h-auto object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-amber-400 mt-1.5 transition">
                      Pilot App
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-4 py-5 text-[11px] text-slate-500 sm:flex-row sm:gap-4 sm:px-6 sm:py-6 lg:px-8">
          <p className="text-center leading-relaxed sm:text-left">
            © {year} BroomBoom Transportation Services Private Limited. All
            rights reserved.
          </p>

          <nav
            aria-label="Legal links"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:justify-end sm:gap-x-4 sm:gap-y-2"
          >
            {legalLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && (
                  <span aria-hidden="true" className="hidden sm:inline">
                    •
                  </span>
                )}
                <Link
                  href={item.href}
                  className="rounded py-0.5 transition hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};