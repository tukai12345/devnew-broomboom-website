"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Building,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please fill your name, phone number, and message.");
      return;
    }
    setSubmitted(true);
  };

  const contactCards = [
    {
      icon: <PhoneCall className="w-5 h-5 text-emerald-400" />,
      title: "24x7 Helpline",
      subtitle: "Instant booking assistance & dispatch",
      primary: "+91 8240765499",
      href: "tel:+918240765499",
      cta: "Call Now",
    },
    {
      icon: <Mail className="w-5 h-5 text-amber-400" />,
      title: "Customer & Corporate Email",
      subtitle: "For invoices, corporate tie-ups & feedback",
      primary: "support@broomboom.com",
      href: "mailto:support@broomboom.com",
      cta: "Send Email",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
      title: "WhatsApp Dispatch Desk",
      subtitle: "Trip confirmation & live driver details",
      primary: "+91 8240765499",
      href: "https://wa.me/918240765499",
      cta: "Chat on WhatsApp",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative pt-16 sm:pt-20 pb-16 sm:pb-24 bg-cover bg-center text-white border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.9), rgba(10, 16, 26, 0.95)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Always Ready To Help You</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Contact BroomBoom Cabs
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Have questions about your booking, route pricing, corporate tie-ups, or driver partnership? Our 24x7 desk is here for you.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="relative -mt-8 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactCards.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-3">
                  {c.icon}
                </div>
                <h3 className="font-black text-slate-900 text-base">{c.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{c.subtitle}</p>
                <div className="text-sm sm:text-base font-extrabold text-amber-600 mt-3">
                  {c.primary}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href={c.href}
                  className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1.5 transition"
                >
                  <span>{c.cta}</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Form & Address Section */}
      <section className="py-14 sm:py-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Send Us A Message
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                How Can We Help You Today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill in the details below and our team will get back to you within 30 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black text-emerald-950">
                  Thank You! Message Received
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Our customer desk has logged your request. One of our trip specialists will reach out via call/WhatsApp shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
                  }}
                  className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Query Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50 text-slate-700"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking / Route Pricing</option>
                      <option value="corporate">Corporate / Bulk Rental</option>
                      <option value="driver">Driver &amp; Vendor Attachment</option>
                      <option value="billing">Invoicing &amp; GST</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your trip details, origin/destination, dates, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white">Registered Corporate Office</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                BroomBoom Transportation Services Private Limited
              </p>

              <div className="space-y-4 mt-6 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Headquarters</span>
                    Sector V, Salt Lake City, Kolkata, West Bengal — 700091
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Working Hours</span>
                    Chauffeur Dispatch: 24 Hours / 7 Days a Week<br />
                    Office Desk: Mon – Sat (9:30 AM – 7:00 PM)
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Verified Operations</span>
                    Pan-India RTO-compliant commercial yellow plate taxis with Fastag.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
                Need Immediate Cab Booking?
              </h4>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Skip the form and call our 24x7 highway dispatch desk directly for immediate cab allocation.
              </p>
              <a
                href="tel:+918240765499"
                className="inline-flex items-center gap-2 text-xs font-black text-amber-600 hover:text-amber-700"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 8240765499 &bull; Click to Call</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

