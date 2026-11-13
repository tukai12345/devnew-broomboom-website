"use client";

import React from "react";
import Image from "next/image";
import {
  Car,
  ShieldCheck,
  Clock,
  Sparkles,
  Plane,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { CityServiceInfo } from "@/data/cityServicesData";

interface OutstationCityClientSectionsProps {
  cityData: CityServiceInfo;
}

export const OutstationCityClientSections: React.FC<
  OutstationCityClientSectionsProps
> = ({ cityData }) => {
  const cityName = cityData.cityName;
  const stateName = cityData.state || "India";
  const airportCode = cityData.airportCode;

  const scrollToHeroSearch = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fares = [
    {
      vehicle: "Hatchback",
      model: "Wagon-R, Indica or similar",
      capacity: "4 Passengers • 2 Bags",
      rate: "Rs. 8 / km",
      highlight: "Budget Friendly",
    },
    {
      vehicle: "Prime Sedan",
      model: "Dzire, Etios or similar",
      capacity: "4 Passengers • 3 Bags",
      rate: "Rs. 10 / km",
      highlight: "Most Popular",
    },
    {
      vehicle: "Prime SUV",
      model: "Xylo, Ertiga or similar",
      capacity: "6 Passengers • 4 Bags",
      rate: "Rs. 15 / km",
      highlight: "Family Comfort",
    },
    {
      vehicle: "Assured Innova",
      model: "Innova, Innova Crysta",
      capacity: "6-7 Passengers • 5 Bags",
      rate: "Rs. 17 / km",
      highlight: "Premium Ride",
    },
  ];

  // Specific Kolkata places to visit fallback or dynamic city routes
  const isKolkataRegion =
    cityData.cityId.toLowerCase() === "kolkata" ||
    cityData.cityId.toLowerCase() === "kolkata1" ||
    cityData.state.toLowerCase() === "west bengal";

  const kolkataPlaces = [
    {
      title: `${cityName} to Gangasagar Cabs`,
      desc: "Also called Sagardwip or Sagar Island, Gangasagar is one of the largest deltas of the Ganges in India. Book an outstation cab from Kolkata to Gangasagar with BroomBoom Cabs and experience the intrigue of this famous island where people visit to attain spirituality.",
      tag: "Pilgrimage Island",
    },
    {
      title: `${cityName} to Mayapur Cabs`,
      desc: "Mayapur ISKCON is the birthplace of Chaitanya Mahaprabhu, an important sightseeing place for the practitioners of Gaudiya Vaishnavism. Hire a taxi from Kolkata to Mayapur or book in advance an outstation cab from Kolkata to Mayapur and get transported to the tranquility of this austere town of love god Radha Krishna.",
      tag: "Spiritual Hub",
    },
    {
      title: `${cityName} to Siliguri Outstation Cabs`,
      desc: "Siliguri is a perfect holiday destination for adventure enthusiasts, river rafting, trekking, and paragliding as these are among the significant activities. Further, there are wildlife sanctuaries, national parks, rivers, grasslands and much more. Rent a car with us and discover the magic of the Dooars. Book an Outstation Cab from Kolkata to Siliguri with BroomBoom Cabs to explore more.",
      tag: "North Bengal Gateway",
    },
    {
      title: `${cityName} to Digha Cabs`,
      desc: "The peaceful and serene Digha beaches are filled with beauty. Book an Outstation cab from Kolkata to Digha to have a relaxing weekend with zero return fare.",
      tag: "Weekend Beach",
    },
    {
      title: `${cityName} to Mandarmani Cabs`,
      desc: "The peaceful and serene Mandarmani beaches are filled with beauty and luxury beachside resorts. Book an Outstation cab from Kolkata to Mandarmani to have a relaxing weekend getaway.",
      tag: "Seaside Resorts",
    },
  ];

  return (
    <div id="outstation-custom-sections" className="w-full bg-slate-50/60 py-8 space-y-16">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 3 IMAGE FEATURE CARDS */}
        <div className="space-y-12">
          
          {/* Block 1: Image Left, Content Right */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group">
                  <Image
                    src="/images/outstation-cab-booking-app.jpg"
                    alt={`Outstation cab booking app in ${cityName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    Mobile App & Web
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Car className="w-3.5 h-3.5" />
                  <span>Doorstep Pickup Anywhere in {cityName}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Outstation Cab Booking App in {cityName}
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    BroomBoom Cabs services are leading outstation cab booking app in{" "}
                    <strong>{cityName}</strong> that provides a hassle-free, convenient way to book
                    outstation cab services for outstation rides to or from {cityName}.
                  </p>
                  <p>
                    When you pre-schedule ride in outstation cab booking options while planning your outstation rides to and from {cityName}, you can pre-schedule ride in the most affordable, safest BroomBoom Outstation Cabs services.
                  </p>
                  <p>
                    Avail huge discounts on pre-schedule outstation cab booking app from BroomBoom cabs services that not only helps you to save money but also ensures you 100% guaranteed safe and secure outstation cab service in {cityName}. You also have the option to pay only for one way outstation.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Zero Return Fare</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ 100% AC Verified Cars</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Live GPS Tracking</span>
                </div>
              </div>
            </div>
          </section>

          {/* Block 2: Content Left, Image Right */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Highway Travel Made Effortless</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Outstation Cab Booking Near {cityName}
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    BroomBoom Cabs provide various types of fleets for outstation cab
                    service near <strong>{cityName}</strong>. Whenever we plan any outstation trip, we
                    always look for cost effective cab services options.
                  </p>
                  <p>
                    In {cityName} or any city of {stateName}, if you are looking for an affordable
                    best outstation cab service near {cityName}, then definitely
                    pre-schedule ride in BroomBoom Cabs.
                  </p>
                  <p>
                    This outstation cab booking app in {cityName} offer many types of outstation cab services in SUVs, Prime SUVs, Sedans, Hatchbacks and even Mini Cars for the passengers. We generally plan our outstation ride with our friends or families, based on the number of guests.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Verified Highway Drivers</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Transparent Billing</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Unlimited Scenic Pitstops</span>
                </div>
              </div>
              <div className="lg:col-span-5 relative order-1 lg:order-2">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group">
                  <Image
                    src="/images/outstation-highway-roadtrip.jpg"
                    alt={`Outstation cab booking near ${cityName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    Highway Roadtrips
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Block 3: Image Left, Content Right */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group">
                  <Image
                    src="/images/outstation-intercity-chauffeur.jpg"
                    alt={`Intercity cab from ${cityName} Airport`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    {airportCode ? `${airportCode} Airport` : "Airport Pickup"}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Plane className="w-3.5 h-3.5" />
                  <span>24x7 Airport Intercity Pickup & Drop</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Intercity Cab from {cityName} Airport {airportCode ? `(${airportCode})` : ""}
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Intercity cabs cover city to city rides. Intercity cabs are
                    available from all locations of <strong>{cityName}</strong>. If you are landing to{" "}
                    {cityName} airport during the night hours or early morning hours,
                    and need to go to other city, pre-schedule ride is the way where you
                    can pre-schedule intercity cabs from BroomBoom Cabs services in
                    advance.
                  </p>
                  <p>
                    Intercity cabs provide city to city ride service. Intercity
                    cabs provide point to point pickup and drop facility. Now,
                    pre-schedule intercity cabs for doorstep pickup and drop service.
                  </p>
                  <p>
                    {cityName} airport is one of the busiest airports having both
                    domestic and international terminal. The intercity cab from{" "}
                    {cityName} Airport fare is generally high due to high demand, but with BroomBoom Cabs you get guaranteed lowest fixed fares with zero dynamic surge.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Flight Tracking</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ 45 Min Wait Time</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Luggage Help</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* OUTSTATION FARE TABLE SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Transparent Per-Km Rates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {cityName} Outstation Taxi Fare
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {cityName}, the busy metropolitan city running 24 hours 7 days a week to
              earn their bread and butter, is also blessed with some spectacular
              magical destinations surrounding its physical areas that prove to be the
              ideal respite for tourists and locals alike. We would recommend various
              gorgeous getaways a few hours&apos; drive from the city, where you can
              have a mini vacation and head back to the city within a day. If
              you&apos;re in {cityName}, Book a {cityName} Taxi with BroomBoom Cabs and
              explore the magnificent beauty of the Great {cityName}.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/90">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-5 py-4 font-bold text-amber-400">Vehicle Type</th>
                  <th className="px-5 py-4 font-bold">Model</th>
                  <th className="px-5 py-4 font-bold">Capacity</th>
                  <th className="px-5 py-4 font-bold">Per km Rate</th>
                  <th className="px-5 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {fares.map((fare) => (
                  <tr key={fare.vehicle} className="hover:bg-amber-50/40 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{fare.vehicle}</span>
                      </div>
                      <span className="text-[11px] font-medium text-amber-600">{fare.highlight}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-medium">{fare.model}</td>
                    <td className="px-5 py-4 text-slate-600">{fare.capacity}</td>
                    <td className="px-5 py-4 font-extrabold text-slate-900 text-base">{fare.rate}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={scrollToHeroSearch}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-500 shadow-sm transition-all"
                      >
                        <span>Book Now</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ABOUT OUTSTATION & PLACES TO VISIT SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 space-y-10">
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              All about Outstation Cabs Service in {cityName}
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                {cityName} taxi service is the oldest mode of road transport.{" "}
                {cityName} taxi covers the entire parts of {cityName}. The fare of taxi
                service is being charged based on the distance covered, that is
                kilometre charges are being taken, also known as metre charge. These
                charges increase the taxi service fare rapidly while traveling.
              </p>
              <p>
                You can now book in advance taxi service from BroomBoom Cabs at a suitable taxi
                fare shown before starting the trip. These taxi fares do not inflate
                rapidly during the ride, hence you can pre-schedule taxi service from
                BroomBoom Cabs at no extra charges and no dynamic fares and can enjoy
                the ride at the same fare shown earlier.
              </p>
              <p>
                Taxi service in {cityName} is the commonly used vehicle. {cityName} AC Taxi Service is available in
                BroomBoom Cabs only for the commuters who love the old culture and
                tradition of the city. So, book in advance your {cityName} taxi service
                with BroomBoom Cabs at the best deal and roam around the locales of the
                city with your friends or families.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Places to visit nearby {cityName} to Outstation Cabs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-6">
              Book in advance an outstation cab in {cityName} and travel your heart
              out. Some of the places near {cityName} to nearby city or places you must visit:
            </p>

            {isKolkataRegion ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kolkataPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 text-base">{place.title}</h3>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
                          {place.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {place.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-2">
                      <button
                        type="button"
                        onClick={scrollToHeroSearch}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                      >
                        <span>Book outstation cab to destination</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityData.outstationRoutes.map((route, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 text-base">
                          {cityName} to {route.destination}
                        </h3>
                        {route.tag && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
                            {route.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">
                        Distance: {route.distance} • Duration: {route.duration}
                      </p>
                      <p className="text-xs text-slate-600">
                        Reliable one-way and round-trip highway cab from {cityName} to {route.destination} with zero return fare.
                      </p>
                    </div>
                    <div className="pt-4 mt-3 flex items-center justify-between border-t border-slate-200/60">
                      <div>
                        <span className="text-[11px] text-slate-500">Starting from</span>
                        <p className="text-sm font-extrabold text-slate-900">₹{route.hatchPrice.toLocaleString()}</p>
                      </div>
                      <button
                        type="button"
                        onClick={scrollToHeroSearch}
                        className="rounded-xl bg-amber-400 px-3 py-1.5 text-xs font-black text-slate-950 hover:bg-amber-500 transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Road trip in {cityName}
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                We all love to have an adventurous road trip. Having a long car ride on
                the road journey with no ending of the roads makes us feel fresh and
                refreshes our mind and soul deeply. BroomBoom Cabs provides city cabs,
                local rental cars, and even outstation cabs for our travel enthusiast
                commuters to enjoy the long road trip from {cityName}.
              </p>
              <p>
                You can book in
                advance city cab for a road trip in {cityName} where you can see all the
                local roadside shops of foods, local dishes and clothes. Enjoy your
                shopping by visiting the shopping malls in {cityName} or fancy
                restaurants.
              </p>
              <p>
                This road trip in {cityName} is available at huge discount
                rates for existing customers so that they can enjoy to the fullest. Our
                local drivers are aware about the nook and corner of the {cityName} city
                and help you to cover all the areas of the city by guiding you
                throughout your road trip in {cityName} with BroomBoom Cabs.
              </p>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};
