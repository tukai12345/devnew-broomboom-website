"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Bookmark,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogPageData, INITIAL_BLOG_DATA, BlogPost } from "@/data/blogData";

const STORAGE_KEY = "broomboom_blog_page_cms_data";

export function BlogClientPage() {
  const [data, setData] = useState<BlogPageData>(INITIAL_BLOG_DATA);

  // Sync with Admin CMS edits from localStorage and storage events
  useEffect(() => {
    const loadCmsData = () => {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.hero && Array.isArray(parsed.posts)) {
            setData(parsed);
          }
        }
      } catch (err) {
        console.warn("Could not load blog CMS storage:", err);
      }
    };

    loadCmsData();

    // Listen to storage changes across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const featuredPost = data.posts.find((p) => p.featured) || data.posts[0];
  const regularPosts = data.posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      {/* Hero Header Section */}
      <section
        className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.9), rgba(10, 16, 26, 0.96)), url('${data.hero.backgroundImage}')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{data.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {data.hero.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            {data.hero.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Featured Post Card */}
        {featuredPost && (
          <div className="mb-12">
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              <span>{data.featuredSectionTitle || "Featured Editorial"}</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
              <div className="lg:col-span-7 h-64 lg:h-auto relative overflow-hidden bg-slate-100">
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
        )}

        {/* Regular Posts Grid */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-8">
          <h3 className="text-lg font-black text-slate-900">
            {data.articlesSectionTitle || "Latest Articles"}
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {regularPosts.length} Guides Available
          </span>
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

