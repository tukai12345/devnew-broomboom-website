"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  X,
  MapPin,
  ChevronRight,
  Sparkles,
  BookOpen,
  Car,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BlogPageData,
  INITIAL_BLOG_DATA,
  BLOG_CATEGORIES,
  BlogPost,
} from "@/data/blogData";

const STORAGE_KEY = "broomboom_blog_page_cms_data";

export function BlogClientPage() {
  const router = useRouter();
  const [data, setData] = useState<BlogPageData>(INITIAL_BLOG_DATA);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Floating Lead Widget State
  const [isQuoteOpen, setIsQuoteOpen] = useState(true);
  const [pickupCity, setPickupCity] = useState("");
  const [dropCity, setDropCity] = useState("");
  const [serviceType, setServiceType] = useState("outstation-oneway");

  // Center Promo Modal State (matching user image)
  const [showPromoModal, setShowPromoModal] = useState(true);

  // Reading Modal
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  // Sync CMS / LocalStorage if available
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.posts)) {
          setData(parsed);
        }
      }
    } catch {}
  }, []);

  // Filter posts based on search and category
  const filteredPosts = data.posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !activeSearch ||
      post.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(activeSearch.toLowerCase()) ||
      post.category.toLowerCase().includes(activeSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchTerm.trim());
  };

  const handleCategorySearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const from = pickupCity.trim() || "Kolkata";
    const to = dropCity.trim() || "Digha";
    router.push(
      `/fleet?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&tripType=${encodeURIComponent(
        serviceType === "outstation-oneway"
          ? "Outstation One-Way"
          : serviceType === "outstation-round"
          ? "Outstation Round-Trip"
          : serviceType === "airport"
          ? "Airport Transfer"
          : "Car Rental"
      )}`
    );
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#fcfcfc] text-slate-800 selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      {/* Breadcrumb & Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-10 sm:py-12">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">Blog &amp; Travel Guides</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            BroomBoom Travel Guides &amp; Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
            Explore authentic highway itineraries, festival travel guides, tourist destinations, and fare saving tips curated by BroomBoom Cabs.
          </p>
        </div>
      </div>

      {/* Main 2-Column Content Layout (matching the exact screenshot) */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: 2-Column Blog Grid (matching screenshot) */}
          <div className="lg:col-span-8">
            {/* Active Filter Pill if search/category is set */}
            {(activeSearch || selectedCategory !== "All Categories") && (
              <div className="flex items-center gap-2 mb-6 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-xl text-xs font-semibold">
                <span>Filtering by:</span>
                {activeSearch && (
                  <span className="bg-white px-2.5 py-1 rounded-md border border-amber-300 shadow-2xs font-bold flex items-center gap-1.5">
                    &ldquo;{activeSearch}&rdquo;
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSearch("");
                        setSearchTerm("");
                      }}
                      className="text-slate-400 hover:text-slate-700 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {selectedCategory !== "All Categories" && (
                  <span className="bg-white px-2.5 py-1 rounded-md border border-amber-300 shadow-2xs font-bold flex items-center gap-1.5">
                    {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("All Categories")}
                      className="text-slate-400 hover:text-slate-700 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSearch("");
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                  }}
                  className="ml-auto text-amber-700 hover:underline font-bold"
                >
                  Clear All
                </button>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No blog articles found</h3>
                <p className="text-xs text-slate-500 mt-1">Try another search keyword or select All Categories.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSearch("");
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                  }}
                  className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    onClick={() => setReadingPost(post)}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Image header */}
                      <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                          {post.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5">
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 sm:p-5 pt-0">
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{post.date}</span>
                        </span>
                        <span className="text-amber-600 font-bold group-hover:underline flex items-center gap-1">
                          <span>Read More</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (matching the exact widgets in user screenshot) */}
          <aside className="lg:col-span-4 space-y-7">
            
            {/* Widget 1: Search for Travel Content */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3">
                Search for Travel Content
              </h3>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search ..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-4 py-2 rounded-md shadow-xs transition-colors shrink-0"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Widget 2: Search By Blog Category */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3">
                Search By Blog Category
              </h3>
              <form onSubmit={handleCategorySearch} className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All Categories" ? "Choose a Category ..." : cat}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-4 py-2 rounded-md shadow-xs transition-colors shrink-0"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Widget 3: More Travel Topics */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3">
                More Travel Topics
              </h3>
              <ul className="divide-y divide-slate-100">
                {data.posts.slice(0, 6).map((post) => (
                  <li key={post.slug} className="py-2.5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => setReadingPost(post)}
                      className="text-left text-xs font-semibold text-slate-700 hover:text-amber-600 transition-colors leading-snug line-clamp-2"
                    >
                      {post.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 4: The road to where we are */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-2.5">
                The road to where we are
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We are <strong className="text-slate-900">BroomBoom Cabs</strong>, India&apos;s leading intercity Car Rental services provider, empowering customers with reliable and premium chauffeurs, zero return fee on one-way drops, and clean sanitized cabs across 100+ cities.
              </p>
              <div className="mt-3.5 pt-3 border-t border-slate-100">
                <Link
                  href="/about-us"
                  className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                >
                  <span>Learn more about BroomBoom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </aside>
        </div>
      </section>

      {/* Floating Ride Quote Widget (bottom-right matching screenshot) */}
      {isQuoteOpen && (
        <div className="fixed bottom-5 right-5 z-40 w-80 sm:w-84 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-3.5 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                BB
              </div>
              <span className="text-xs font-bold">Quick Cab Fare Quote</span>
            </div>
            <button
              type="button"
              onClick={() => setIsQuoteOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded transition"
              aria-label="Close widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleGetQuote} className="p-4 space-y-2.5">
            <p className="text-xs font-black text-slate-900 leading-snug">
              Looking for a ride? Not sure about the fare charges?
            </p>

            <div>
              <input
                type="text"
                placeholder="Enter pickup location"
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter destination"
                value={dropCity}
                onChange={(e) => setDropCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
              />
            </div>

            <div>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
              >
                <option value="outstation-oneway">Outstation One-Way</option>
                <option value="outstation-round">Outstation Round-Trip</option>
                <option value="airport">Airport Transfer</option>
                <option value="rental">Hourly Car Rental</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0070f3] hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm transition active:scale-[0.98]"
            >
              Get a Quote
            </button>
          </form>
        </div>
      )}

      {/* Center Promo Modal (matching user's uploaded image) */}
      {showPromoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-200"
          onClick={() => setShowPromoModal(false)}
        >
          <div
            className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-6 sm:p-7 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button 'X' */}
            <button
              type="button"
              onClick={() => setShowPromoModal(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-800 p-1 rounded-full transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Circular Yellow Logo Badge */}
            <div className="w-18 h-18 mx-auto rounded-full bg-[#f5b300] flex items-center justify-center p-2.5 shadow-sm overflow-hidden">
              <img
                src="/logo.png"
                alt="BroomBoom Cabs"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="mt-4 text-base sm:text-lg font-black text-slate-900 leading-snug px-1">
              Get the best fare on your next ride with Broom Boom Cabs
            </h3>

            {/* Book Now Button */}
            <div className="mt-5">
              <Link
                href="/"
                onClick={() => setShowPromoModal(false)}
                className="inline-block px-8 py-2.5 rounded-lg bg-[#0070f3] hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Reader Modal when a post is clicked */}
      {readingPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setReadingPost(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 shadow text-slate-600 hover:text-slate-900 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-60 relative overflow-hidden bg-slate-100">
              <img
                src={readingPost.image}
                alt={readingPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow">
                {readingPost.category}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span>{readingPost.date}</span>
                <span>&bull;</span>
                <span>{readingPost.readTime}</span>
                <span>&bull;</span>
                <span className="font-semibold text-slate-600">{readingPost.author}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-4">
                {readingPost.title}
              </h2>

              <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4 bg-amber-50/60 p-4 rounded-xl border border-amber-200/70">
                {readingPost.excerpt}
              </p>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
                <p>{readingPost.content}</p>
                <p>
                  Need a reliable cab for this trip? BroomBoom Cabs offers guaranteed upfront fares, clean AC vehicles, and courteous drivers with zero return charges.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setReadingPost(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Close Article
                </button>
                <Link
                  href="/"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-lg shadow-sm transition flex items-center gap-2"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Book Cab For This Route</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
