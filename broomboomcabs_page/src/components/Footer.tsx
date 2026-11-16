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
  { label: "Careers", href: "/careers" },
  { label: "Blog & Guides", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/user-terms" },
  { label: "Pilot Terms & Conditions", href: "/pilot-terms" },
];

const linkClass =
  "inline-block rounded py-1.5 leading-snug transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] sm:py-0.5 sm:leading-normal";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full overflow-x-hidden border-t border-slate-800 bg-[#090d16] pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-4 text-xs text-slate-400 sm:overflow-x-visible sm:pb-8 sm:pt-10">
      <div className="w-full">
        {/* Top brand & contacts */}
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <div className="min-w-0 space-y-3 px-4 py-5 sm:p-6 lg:p-8">
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
              <div className="min-w-0 text-xl font-black leading-none text-white">
                <span className="truncate text-xl font-black tracking-tighter text-white sm:text-2xl">
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

          <div className="min-w-0 px-4 py-5 sm:p-6 lg:p-8">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white">
              Cabs in Top Cities
            </h4>
            {/* 2 columns on mobile and desktop */}
            <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5 sm:gap-y-2">
              {cityLinks.map((item) => (
                <li key={item.label} className="min-w-0">
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 px-4 py-5 sm:p-6 lg:p-8">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white">
              Services
            </h4>
            {/* 2 columns on mobile only; original 1-column stacked list on sm/lg */}
            <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5 sm:block sm:space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.label} className="min-w-0">
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 px-4 py-5 sm:p-6 lg:p-8">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white">
              24x7 Customer Desk
            </h4>

            <div className="space-y-2.5">
              <a
                href="tel:+918240765499"
                className="flex min-w-0 items-center gap-2 py-1 font-bold text-white transition hover:text-amber-400 sm:py-0.5"
              >
                <PhoneCall
                  className="h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span className="break-words">+91 8240765499</span>
              </a>

              <a
                href="mailto:support@broomboomcabs.com"
                className="flex min-w-0 items-center gap-2 py-1 transition hover:text-white sm:py-0.5"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span className="min-w-0 break-all sm:break-words">
                  support@broomboomcabs.com
                </span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span className="min-w-0 break-words">
                  Set the address: Majhi Enclave, 7, T.C.Mukherjee St, Kali
                  Tala, Bangur Park, Rishra, West Bengal, 712248
                </span>
              </div>

              {/* --- BROOMBOOM APPS (CUSTOMER & PILOT) --- */}
              <div className="border-t border-white/10 pt-4">
                <div className="mb-2.5 text-[11px] font-black uppercase tracking-wider text-white">
                  Download Mobile Apps
                </div>
                <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
                  {/* BroomBoom Customer / Rider App */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.broomboom.user"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center rounded transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
                    aria-label="Download BroomBoom Cabs Rider App on Google Play"
                  >
                    <div className="w-full max-w-[136px] rounded-xl border border-white/10 bg-black/60 p-2 shadow-md transition group-hover:border-amber-400/50 sm:w-[108px] sm:max-w-none">
                      <img
                        src="/images/broomboom-customer-app.png"
                        alt="BroomBoom Cabs Rider App on Google Play"
                        className="h-auto w-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <span className="mt-1.5 text-[10px] font-bold text-slate-300 transition group-hover:text-amber-400">
                      Customer App
                    </span>
                  </a>

                  {/* BroomBoom Pilot / Driver App */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.broomboom.pilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center rounded transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
                    aria-label="Download BroomBoom Pilot Partner App on Google Play"
                  >
                    <div className="w-full max-w-[136px] rounded-xl border border-white/10 bg-black/60 p-2 shadow-md transition group-hover:border-amber-400/50 sm:w-[108px] sm:max-w-none">
                      <img
                        src="/images/broomboom-pilot-app.png"
                        alt="BroomBoom Pilot Partner App on Google Play"
                        className="h-auto w-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <span className="mt-1.5 text-[10px] font-bold text-slate-300 transition group-hover:text-amber-400">
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
            className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 sm:justify-end sm:gap-x-4 sm:gap-y-2"
          >
            {legalLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-slate-700 sm:text-current">
                    •
                  </span>
                )}
                <Link
                  href={item.href}
                  className="rounded py-1 transition hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] sm:py-0.5"
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