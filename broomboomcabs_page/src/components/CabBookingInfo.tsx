"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const CabBookingInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-8 sm:py-10 bg-gradient-to-b from-slate-50 via-[#fcfbf7] to-slate-50 border-t border-amber-100/70">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Card Container */}
        <div className="bg-gradient-to-br from-white via-white to-amber-50/40 rounded-3xl border border-amber-200/80 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
          
          {/* Detailed Guide (Expandable on mobile) */}
          <div className={`space-y-6 transition-all duration-300 ${isExpanded ? "block" : "hidden sm:block"}`}>
            
            {/* 1. Book Pre Schedule Ride Now or Regret Later */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Book Pre Schedule Ride Now or Regret Later
              </h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  Cab services or taxi services are daily needs or mode of transport. We always prefer a reliable cab service for our daily rides. Pre schedule is an option where one can schedule their cab ride service in advance for their trip. There are many app cabs where you can pre schedule ride of yours in advance but all doesn&apos;t give sure advance confirmation. BroomBoom Cabs offers <strong className="text-slate-900 font-bold">100% confirmed pre schedule ride</strong> or pre schedule cab services at no extra charges to their commuters.
                </p>
                <p>
                  Pre schedule is the best option for daily commuters. As once you pre schedule your ride, you don&apos;t have to worry about your journey. In pre scheduled rides you get well maintained hygiene cars at your doorstep. The top-rated cab driver gets pre scheduled for your trip in order to ensure you get a comfortable ride. As there are no extra charges, it&apos;s always recommended to pre schedule ride instantly instead of regretting later.
                </p>
                <p>
                  BroomBoom Cabs is well known for providing best pre schedule ride cab service or taxi service to their commuters. Its tough to get taxi service whenever you want due to high demand areas. So, when you pre schedule your ride, there is more probability of getting a well maintained taxi service or cab service at your location irrespective of your pickup time, or location. Grab your exciting discount by scheduling your ride in advance.
                </p>
                <p>
                  This pre schedule cab services are more safe and trustworthy as it provides audio video surveillance and GPS tracking throughout the ride service. Track your booking status and stay relaxed for your ride with the pre schedule facility of BroomBoom Cabs services. Commuters are more adaptable to these pre schedule cab services in Kolkata. One can easily pre schedule ride before catching a train or a flight, so that they don&apos;t have to wait long for getting cab services or taxi services in Kolkata or nearby Kolkata.
                </p>
              </div>
            </div>

            {/* 2. Book an Outstation Cab in Advance */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Book an Outstation Cab in Advance
              </h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  You can now enjoy an outstation ride with full safety at BroomBoom Cabs. It&apos;s good to book an outstation cab in advance so that you can enjoy your road trip to the fullest. We love to provide the best outstation cab service to wanderers like you. You can stop anywhere to take a quick break and enjoy the local cuisines.
                </p>
                <p>
                  BroomBoom Cabs is the cheapest outstation cab booking app where you can pre schedule an Outstation Cab in advance at no extra charges. You will get confirmed sanitised hygiene outstation cab service for your ride. Our drivers are well trained and have a proper knowledge of local intercity areas, hence guide you about all the local areas for sightseeing, places to eat and shop. In pre schedule outstation rides or advance booking, you can stay calm and tension free of your journey.
                </p>
                <p>
                  You can book for round trip or one way trip as per your convenience, wherein you only have to pay for the distance travelled and will save half of your round trip cost. For intercity rides, book an Intercity cab at half the price to get instant doorstep pickup and drop service at no extra surcharge and zero cancellation fees as we understand that plans may change. We also love impromptu plans as you do.
                </p>
                <p>
                  Book an outstation cab service or pre schedule an Outstation Cab booking in advance with BroomBoom Cabs to get an Outstation Cab at your doorstep within an hour. Our outstation cab charges are very economical and budget friendly. Book an Intercity cab or outstation cab in advance with BroomBoom Cabs to discover small and thrilling places of the area nearby.
                </p>
              </div>
            </div>

            {/* 3. Book Car Rental in Advance */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Book Car Rental in Advance
              </h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  We all look for car rental services at an affordable fare. For all commuters, who need a rental car for 8 hours or rental car for a day, can pre schedule car rental in advance at no extra charges for confirmed booking. Now, you can easily explore the nearby areas of whichever location you want by taking a car rent with a professional chauffeur for throughout a day.
                </p>
                <p>
                  If you want to attend a long day meeting, you can now book rental car for short duration also like 4-5 hours. Get a rental car at your doorstep 30 minutes prior your ride starts. Punctuality is very important for us and we ensure that you reach your destination on time without any delay. Our professional chauffeur are trained properly and they have a proper knowledge of each and every area where you want to visit.
                </p>
                <p>
                  Rental car packages includes all type of car packages. You can rent an Innova Car or rent Innova Crysta for 12 hours or 24 hours also. All type of hours and kilometres rental car packages are available for all type of high class luxury cars, be it Prime Sedan or any Prime SUVs of your choice and preferences. You can easily carry your luggage bags while traveling in rental cars with BroomBoom Cabs. With BroomBoom Cabs, hourly rental car is available at the best deals.
                </p>
                <p>
                  Online you can pre schedule or book rental car in advance at zero cancellation charges for a certain period of time or day as per your requirements or your travel plan. We customize your requirements and travel plan and provide you the best car rental service package and support. You can connect with us 24/7 to book car rental whenever you want anytime.
                </p>
              </div>
            </div>

            {/* "Our Services" Custom Heading Divider */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-50 my-10 border border-slate-200/60 p-8 sm:p-10 flex items-center">
              {/* Decorative Background Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #fbbf24 1px, transparent 1px), linear-gradient(to bottom, #fbbf24 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}
              />
              <h2 className="relative text-4xl sm:text-5xl font-black tracking-tight z-10">
                <span className="text-amber-400">Our</span> <span className="text-slate-900">services</span>
              </h2>
            </div>

            {/* 4. One way and round trip */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                One way and round trip
              </h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  BroomBoom Cabs offers both one way and round trip for your ride. One way trip are always cheaper than the round trip as you only need to pay for the distance you travelled to reach at your destination hence reducing your ride fare. BroomBoom Cabs provides the cheapest one way trip for outstation cabs or intercity cabs rides in this race of best cab company industry.
                </p>
                <p>
                  You can book one way rental car in advance with BroomBoom Cabs at zero surcharges. If you are planning an Outstation trip and looking for any best outstation cab booking service, then definitely pre schedule ride with BroomBoom Cabs in advance. With us, you can enjoy your family trip or friends trip or group travel by booking rental cab for round trip where you can stay relaxed throughout your Outstation ride and enjoy your road trip by discovering each and every nearby tourist spots and the local cuisines.
                </p>
                <p>
                  Round trip fare are very cost effective and economical as the fare includes all state and central taxes. Hence, you only need to pay for the rental car for round trip or one way trip. The best part to book outstation cab for round trip is that you can stop anywhere in the midway of the road to take a short break or to visit the small nearby towns.
                </p>
                <p>
                  You hardly get time from your busy schedule to plan an Outstation trip so why not plan with us where our professional chauffeurs can guide you about all the important places to eat, sit or shop. Our expert and courteous drivers are knowledgeable of all languages and hence can communicate in your own language style. So, pre schedule outstation ride for round trip or one way trip with BroomBoom Cabs to get the well maintained hygienic car with the top rated skilled pilot for your round way trip or one way trip or intercity ride.
                </p>
              </div>
            </div>

            {/* 5. Hourly Rental Package */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Hourly Rental Package
              </h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  Tired of searching for a rental car for few hours at lowest deals? Pre schedule your rental car ride services with BroomBoom Cabs at the lowest rental package. If you are looking for a reliable online cab booking app for few hours, you can check out the hourly rental package of BroomBoom Cabs that provides car rental services even for an hour and there are no extra charges. The rental packages starts from an hour to 2 days or 3 days also.
                </p>
                <p>
                  In this rental package, you can ride upto certain kilometres free of cost and after that you have to pay for the extra kilometres if you have travelled during the time you selected to book car rental. Generally, tourists or commuters book rental cars for sightseeing during their weekends to spend time with their loved ones. BroomBoom Cabs offer best pocket friendly rental package where you not only get the best rental car but also skilled driver to drive the rented car for you.
                </p>
                <p>
                  Even, you can rent an Innova Crysta/Innova AC Cars or Ertiga Cars to have a more comfortable ride with many big luggage bags also. If you are looking to book in advance an Outstation Cab services, then you can also select the 48hours car rental package to 72 hours car rental package or 12 hours car rental package to 24 hours car rental package also at huge discounts with certain kilometres as free of cost in that certain time period. Book in advance hourly online car rental with BroomBoom Cabs and grab the best rental package deals.
                </p>
              </div>
            </div>

            {/* 6. Airport Transfer */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Airport Transfer
              </h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  Never miss a flight with BroomBoom Cabs. Book in advance the quickest airport cab from BroomBoom Cabs. You can now pre schedule the best airport transfer with BroomBoom Cabs at no extra charges. Catch the flights on time by having a swift comfortable airport transfer ride in Prime Sedan like Swift Dzire, Tata Indigo or Prime SUVs like Ertiga, Innova Crysta or Innova Cars.
                </p>
                <p>
                  Our experts drivers took you to the airport before time. Airport Transfer facility is for all commuters who are reaching at the airport and planning to visit other locales of the place with heavy luggage bags in the deck of the car. Schedule your booking at any hour of the day or night in advance for airport transfer to remain tension free for your ride. Your ride is our responsibility and we love to provide you an excellent airport transfer services throughout the ride rental package selected by you.
                </p>
                <p>
                  Airport Transfer packages includes a hygienic car with a professional verified chauffeur. These pilots undergo documents verification time to time to ensure your complete safety throughout the airport transfer ride.
                </p>
              </div>
            </div>

          </div>

          {/* Mobile Read More / Collapse Toggle Button */}
          <div className="sm:hidden mt-6 pt-4 border-t border-slate-100 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition"
            >
              <span>{isExpanded ? "Show Less" : "Read Full Guide"}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};