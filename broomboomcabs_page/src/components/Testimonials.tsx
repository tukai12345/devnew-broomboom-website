"use client";

import React, { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

export const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const reviews: ReviewItem[] = [
    {
      id: "rev-1",
      name: "Yogesh Vats",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "I have used BroomBoom Cabs many times for personal and business trips. Cars are always clean, drivers are professional, and the service is consistently dependable and safe.",
      timeAgo: "1 week ago",
    },
    {
      id: "rev-2",
      name: "Neelakantan Kushal",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "BroomBoom Cabs is simple, quick, and reliable. The app has a clean design, matches drivers accurately, and ensures safe, hygienic rides. Perfect choice for daily travelers.",
      timeAgo: "3 months ago",
    },
    {
      id: "rev-3",
      name: "Aftab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "The service was excellent—driver arrived on time, the cab was clean, and the entire trip was very smooth. I highly recommend BroomBoom Cabs for anyone looking for reliability.",
      timeAgo: "2 months ago",
    },
    {
      id: "rev-4",
      name: "Priyanka Sen",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "Booked an airport cab in Kolkata at 4 AM. Chauffeur arrived 10 mins early, helped with our heavy luggage, and the vehicle was spotless. Completely stress-free journey!",
      timeAgo: "2 weeks ago",
    },
    {
      id: "rev-5",
      name: "Rohit Deshmukh",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "Took an outstation round-trip from Mumbai to Pune. Zero surge pricing, very courteous chauffeur, and smooth highway ride. BroomBoom is now my go-to cab service!",
      timeAgo: "1 month ago",
    },
    {
      id: "rev-6",
      name: "Ananya Sharma",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment:
        "Used BroomBoom hourly rental for full-day client meetings in Delhi NCR. Having the same cab and polite driver on standby saved me so much hassle. 10/10 experience.",
      timeAgo: "3 weeks ago",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 390;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50/60">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* REVIEW SECTION BACKGROUND BOX (Matches Screenshot Exactly) */}
        {/* ======================================================== */}
        <div className="bg-[#f0f4f9] rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8 lg:p-10 relative transition-all">
          
          {/* Section Heading */}
          <div className="flex flex-col items-center justify-center gap-2.5 mb-8 sm:mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white shadow-xs border border-slate-200">
              <img src="/logo.png" alt="BroomBoom Logo" className="w-5 h-5 rounded-full object-contain" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">Verified Rider Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#1f305e] tracking-tight">
              Our Valuable Customer Feedback
            </h2>
          </div>

          {/* Carousel Container with Left / Right Navigation */}
          <div className="relative">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous reviews"
              className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200/90 items-center justify-center text-slate-700 hover:text-[#1f305e] hover:shadow-lg hover:scale-105 z-20 cursor-pointer transition-all"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next reviews"
              className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200/90 items-center justify-center text-slate-700 hover:text-[#1f305e] hover:shadow-lg hover:scale-105 z-20 cursor-pointer transition-all"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Review Cards Track */}
            <div
              ref={scrollRef}
              className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-2 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-x snap-mandatory"
            >
              {reviews.map((item) => (
                <div
                  key={item.id}
                  className="w-[82vw] max-w-[320px] sm:max-w-none sm:w-[350px] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-white rounded-2xl p-4 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100/90 flex flex-col justify-between transition-all hover:shadow-md"
                >
                  <div>
                    {/* Top: Avatar, Name & 5 Stars */}
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-100 shadow-xs"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
                        }}
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Review Comment */}
                    <p className="text-sm sm:text-[14.5px] text-slate-600 leading-relaxed mt-5">
                      {item.comment}
                    </p>
                  </div>

                  {/* Bottom: Google Badge & Time Ago */}
                  <div className="mt-6 pt-4 flex items-center justify-between">
                    {/* Google Logo & "Posted on Google" */}
                    <div className="flex items-center gap-2.5">
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <div className="flex flex-col text-[11px] leading-tight text-slate-500 font-medium">
                        <span>Posted on</span>
                        <span className="font-semibold text-slate-700">Google</span>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-slate-400 font-medium">
                      {item.timeAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
