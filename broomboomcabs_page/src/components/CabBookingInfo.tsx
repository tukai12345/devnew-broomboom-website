"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Car,
} from "lucide-react";

export const CabBookingInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-8 sm:py-10 bg-gradient-to-b from-slate-50 via-[#fcfbf7] to-slate-50 border-t border-amber-100/70">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Card Container */}
        <div className="bg-gradient-to-br from-white via-white to-amber-50/40 rounded-3xl border border-amber-200/80 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-400 p-0.5 shadow-sm shrink-0">
                <img src="/logo.png" alt="BroomBoom Cabs" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Online Cab Booking on BroomBoom
                </h2>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/60">
              <Car className="w-4 h-4 text-amber-500" />
              <span>Outstation • Airport • Hourly Rentals</span>
            </div>
          </div>

          {/* Section 1: Intro Text */}
          <div className="pt-6 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              Most Indian tourists prefer travelling to their preferred destination via road. It is due to the fact that a road trip allows you to enjoy the scenic beauty at your own pace. Moreover, the comfort of travelling in a vehicle with your family and friends is unparalleled. You can opt for online cab booking that will make your journey hassle-free. You simply have to visit the BroomBoom portal and select your preferred cab.
            </p>
            <p>
              Due to the easy-to-use interface and quick menu options of BroomBoom, online cab booking is not a difficult process. In fact, cab booking has become an essential part of our everyday lives. You can also opt for intercity car rentals in order to visit other cities.
            </p>
            <p>
              The online taxi booking process on BroomBoom can be completed within a couple of minutes. So, if you wish to customize your cab booking package, BroomBoom is your go-to website. All the car booking services available on BroomBoom are geared towards giving you the best possible experience when it comes to cab booking.
            </p>
          </div>

          {/* Section 2 & 3: Detailed Guide (Expandable or Full) */}
          <div className={`space-y-6 pt-6 transition-all duration-300 ${isExpanded ? "block" : "hidden sm:block"}`}>
            
            {/* Subsection: Book Your Cab Online */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Book Your Cab Online
              </h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  When you choose us for your cab booking requirements, we offer you premium services, and most importantly, high reliability. BroomBoom is considered one of the most trusted car booking platforms across India. The best part is you can get top-notch cars tailored for your preferred destination.
                </p>
                <p>
                  Road trips are one of the most exciting ways to travel all across the country. There is so much to experience and explore. BroomBoom ensures that your road trip is an enjoyable and safe experience.
                </p>
                <p>
                  The process of booking a cab on BroomBoom is pretty simple. You just need to log in to BroomBoom&apos;s official website and provide all the required details. In order to book your cab, you simply fill in your city of origin, destination, departure date, and timings. Once all details are filled, click on the <strong className="text-slate-900 font-bold">‘Search’</strong> option.
                </p>
                <p>
                  On the portal, you will get a wide range of cab options available at transparent prices. The prices depend on factors such as the type of cab you select, in-car amenities provided, the travel route, and your date of journey. You can select the cab that perfectly meets your travel requirements.
                </p>
              </div>
            </div>

            {/* Subsection: Book a Cab for an Exciting Road Trip */}
            <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Book a Cab for an Exciting Road Trip
              </h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  Tourists enjoy the scenic beauty of nature, smooth highway corridors, diverse regional cultures, and lip-smacking local food when on holiday. There is so much to explore on a road trip, and BroomBoom is proud to be your trusted travel companion.
                </p>
                <p>
                  You can book outstation cabs to visit popular tourist destinations such as Delhi, Manali, Mumbai, and Nainital, or unexplored gems such as Khajuraho, Alleppey, Alibag, and Tranquebar simply by booking online. Planning a trip can be quite a hassle, but choosing to make your online cab booking on BroomBoom ensures a seamless process.
                </p>
                <p>
                  You can choose from a wide range of cabs such as hatchbacks, sedans, SUVs, and MPVs. You can also book an outstation cab for a one-way trip as well as a round trip. In case you have any booking-related queries, reach out to the 24/7 customer service of BroomBoom and talk to our experts. You can also get assistance in discussing itineraries and planning your trip with exciting discounts and offers.
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

