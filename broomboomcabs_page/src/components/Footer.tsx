"use client";

import React from "react";
import Link from "next/link";
import { Car, PhoneCall, Mail, MapPin, ShieldCheck } from "lucide-react";

const cityLinks = [
  "Cabs in Bangalore",
  "Cabs in Kolkata",
  "Cabs in Delhi NCR",
  "Cabs in Mumbai",
  "Cabs in Pune",
  "Cabs in Jaipur",
  "Cabs in Siliguri",
];

const routeLinks = [
  "Bangalore to Mysore Cab",
  "Kolkata to Digha Cab",
  "Delhi to Agra Taxi",
  "Mumbai to Pune Cab",
  "Kolkata to Mandarmani Cab",
  "Delhi to Jaipur Cab",
];

const legalLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Fastag & Toll Guidelines",
  "Driver Attachment",
];

const linkClass =
  "rounded transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-[#090d16] pb-20 pt-8 text-xs text-slate-400 sm:pb-8 sm:pt-10">
      <div className="w-full">
        {/* Top brand & contacts */}
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          <div className="min-w-0 space-y-3 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-amber-400 p-0.5 shadow-md shadow-amber-400/20 shrink-0">
                <img
                  src="/logo.png"
                  alt="BroomBoom Cabs"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="text-xl font-black text-white">
                Broom<span className="text-amber-400">Boom</span>{" "}
                <span className="rounded bg-amber-400/20 px-1 py-0.5 text-xs text-amber-400">
                  CABS
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              India&apos;s fastest growing verified outstation taxi, airport
              transfer, and local hourly cab rental network.
            </p>

            <div className="flex items-center gap-2 pt-1 font-semibold text-amber-400">
              <ShieldCheck
                className="h-4 w-4 text-emerald-400"
                aria-hidden="true"
              />
              <span>100% Verified Commercial Fleet</span>
            </div>
          </div>

          <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white">
              Cabs in Top Cities
            </h4>
            <ul className="space-y-2">
              {cityLinks.map((item) => (
                <li key={item}>
                  <Link href="/services" className={linkClass}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-white">
              Trending Routes
            </h4>
            <ul className="space-y-2">
              {routeLinks.map((item) => (
                <li key={item}>
                  <a href="#" className={linkClass}>
                    {item}
                  </a>
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
                href="tel:+917044022000"
                className="flex items-center gap-2 font-bold text-white transition hover:text-amber-400"
              >
                <PhoneCall
                  className="h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span>+91 8240765499</span>
              </a>

              <a
                href="mailto:support@broomboom.com"
                className="flex items-center gap-2 break-all transition hover:text-white"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span>support@broomboom.com</span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <span>Headquarters: Sector V, Salt Lake, Kolkata, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 p-4 text-[11px] text-slate-500 sm:flex-row sm:p-6 lg:px-8">
          <div className="text-center sm:text-left">
            © {year} BroomBoom Cabs India Private Limited. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
            {legalLinks.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && <span aria-hidden="true">•</span>}
                <a href="#" className="transition hover:text-slate-300">
                  {item}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};