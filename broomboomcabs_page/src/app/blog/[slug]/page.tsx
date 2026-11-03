import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  Calendar,
  Clock,
  ArrowRight,
  Car,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { INITIAL_BLOG_DATA, BlogPost } from "@/data/blogData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all known blog posts
export async function generateStaticParams() {
  return INITIAL_BLOG_DATA.posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic SEO metadata for each blog article
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = INITIAL_BLOG_DATA.posts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Blog Not Found | BroomBoom Cabs",
      description: "The requested blog article was not found.",
    };
  }

  return {
    title: `${post.title} | BroomBoom Cabs Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = INITIAL_BLOG_DATA.posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = INITIAL_BLOG_DATA.posts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* Hero / Header Banner */}
      <section className="bg-slate-900 text-white pt-24 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-amber-950/40 z-10" />
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover blur-xs opacity-30"
        />

        <div className="max-w-4xl mx-auto relative z-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-5 flex-wrap">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blogs" className="hover:text-amber-400 transition">
              Blogs
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-400 font-medium truncate max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </nav>

          <span className="inline-block bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4 shadow">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5 tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{post.date}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{post.readTime}</span>
            </span>
            <span>&bull;</span>
            <span className="font-semibold text-white">By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Article Body */}
          <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden mb-8 shadow-sm border border-slate-100 max-h-[480px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Standout Excerpt Callout */}
            <div className="bg-amber-50/80 border-l-4 border-amber-400 p-5 rounded-r-xl mb-8">
              <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed italic">
                &ldquo;{post.excerpt}&rdquo;
              </p>
            </div>

            {/* Main Content Body */}
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-5">
              {post.content ? (
                post.content.split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>

            {/* In-article Booking CTA Box */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg border border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Zero Return Fare</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Planning this trip? Book your cab with BroomBoom
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-md">
                    Guaranteed upfront fares, 100% commercial verified drivers, sanitized AC cabs, and 24x7 helpline assistance.
                  </p>
                </div>
                <Link
                  href="/fleet"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 shrink-0"
                >
                  <Car className="w-4 h-4" />
                  <span>Check Fleet &amp; Fare</span>
                </Link>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/blogs"
                className="text-xs font-bold text-slate-600 hover:text-amber-600 transition flex items-center gap-1.5"
              >
                <span>&larr; Back to all travel articles</span>
              </Link>
            </div>
          </article>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Fare Quote Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-500" />
                <span>Instant Cab Booking</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Looking for an outstation, airport, or hourly rental cab? Get doorstep pickup across 100+ cities.
              </p>
              <Link
                href="/fleet"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider text-center block transition shadow-xs"
              >
                Book Now &rarr;
              </Link>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">
                Related Travel Topics
              </h3>
              <div className="space-y-4">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="flex gap-3 group items-start"
                  >
                    <div className="w-16 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 line-clamp-2 leading-snug transition">
                        {rel.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {rel.date} &bull; {rel.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* About BroomBoom Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                Why Travel with BroomBoom?
              </h3>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero Return Fare on one-way trips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% verified commercial chauffeurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero hidden surge pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>24x7 customer support helpline</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

