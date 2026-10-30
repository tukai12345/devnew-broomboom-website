import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  MapPin,
  Car,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog & Travel Guides | BroomBoom Cabs — India Outstation Tips & Itineraries",
  description:
    "Explore travel guides, road trip itineraries, taxi fare saving tips, airport transfer advice, and outstation highway guides across India by BroomBoom Cabs.",
  alternates: {
    canonical: "https://dev.broomboomcabs.com/blog",
  },
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "zero-return-fare-explained",
    title: "How BroomBoom's Zero Return Fare Saves You Up to 40% on Intercity Cabs",
    excerpt:
      "Traditional taxi operators charge round-trip rates even when you only need a drop. Here is the math behind why paying only one-way distance fare changes everything.",
    category: "Fare Guide",
    readTime: "4 min read",
    date: "Oct 28, 2026",
    author: "BroomBoom Pricing Team",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    slug: "kolkata-to-digha-road-trip-guide",
    title: "Kolkata to Digha Cab Road Trip: NH16 Route, Tolls & Best Dhaba Stops",
    excerpt:
      "Planning a weekend seaside drive to Digha or Mandarmani? Check optimal departure timings, Fastag toll costs, and road condition updates for 2026.",
    category: "Road Trips",
    readTime: "6 min read",
    date: "Oct 24, 2026",
    author: "Eastern Region Desk",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "bangalore-to-mysore-expressway-taxi",
    title: "Bangalore to Mysore Expressway by Cab: Timings, Stops & Fare Breakdown",
    excerpt:
      "Everything you need to know about the 10-lane expressway drive from Bengaluru to Mysuru in an AC Sedan or Innova Crysta.",
    category: "Highway Guides",
    readTime: "5 min read",
    date: "Oct 19, 2026",
    author: "South Operations Team",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "delhi-to-agra-samruddhi-tips",
    title: "Yamuna Expressway: Delhi to Agra Same-Day Return Taxi Itinerary",
    excerpt:
      "Visit the Taj Mahal and Agra Fort hassle-free with door-to-door cab pickup, toll inclusions, and driver allowances fully settled upfront.",
    category: "Itineraries",
    readTime: "5 min read",
    date: "Oct 15, 2026",
    author: "North Travel Desk",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "hourly-rentals-vs-point-cabs",
    title: "Local Hourly Cab Rentals vs Point-to-Point Cabs: Which One Saves Money?",
    excerpt:
      "Comparing 4-hr/40km and 8-hr/80km chauffeur packages against back-to-back app ride hailing for business meetings and city errands.",
    category: "Smart Travel",
    readTime: "4 min read",
    date: "Oct 10, 2026",
    author: "Fleet Operations",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "tempo-traveller-group-travel-checklist",
    title: "Group Travel Essentials: Choosing Between 12-Seater & 20-Seater Tempo Travellers",
    excerpt:
      "Planning a family wedding, pilgrimage, or corporate offsite? Here is how to select the right seater capacity with ample luggage room.",
    category: "Fleet Guide",
    readTime: "7 min read",
    date: "Oct 05, 2026",
    author: "Chauffeur Standards Team",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      {/* Hero Header */}
      <section
        className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.9), rgba(10, 16, 26, 0.96)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Travel Guides &bull; Tips &bull; Highway Updates</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            The BroomBoom Road Journal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Insider guides to highway driving, honest cab pricing, road trip itineraries, and travel advice for exploring India with comfort and savings.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Featured Post Card */}
        <div className="mb-12">
          <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Featured Editorial</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 h-64 lg:h-auto relative overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                {featuredPost.category}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>{featuredPost.date}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featuredPost.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug hover:text-amber-600 transition">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  By {featuredPost.author}
                </span>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-700"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Posts Grid */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-8">
          <h3 className="text-lg font-black text-slate-900">Latest Articles</h3>
          <span className="text-xs font-bold text-slate-400">{regularPosts.length} Guides Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-amber-600 transition">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-400">
                    {post.author}
                  </span>
                  <Link
                    href="/"
                    className="font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      <Footer />
    </main>
  );
}

