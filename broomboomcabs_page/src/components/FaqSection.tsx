"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall } from "lucide-react";
import { FAQS } from "@/data/cabsData";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about BroomBoom outstation, airport, and rental cabs.",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayFaqs = items && items.length > 0 ? items : FAQS;

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-white via-amber-50/20 to-slate-50 border-t border-amber-100/70">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2.5 border border-amber-300">
            <img src="/logo.png" alt="BroomBoom Help" className="w-4 h-4 rounded-full object-contain" />
            <span>24x7 Help Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-2">
            {subtitle}
          </p>
        </div>

        {/* Accordion - 2 columns on lg to fill 1380px width evenly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all self-start ${
                  isOpen
                    ? "border-amber-400 ring-2 ring-amber-100 shadow-md"
                    : "border-slate-200 hover:border-amber-200 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-slate-900 text-sm sm:text-base hover:text-amber-600 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                    {faq.question}
                  </span>
                  <span className={`p-1.5 rounded-full transition-colors shrink-0 ${isOpen ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-500"}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-8 p-4 sm:p-6 bg-amber-50/80 rounded-2xl border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-extrabold text-slate-900 text-sm">
              Still have questions or special requirements?
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Our 24x7 travel desk Chauffeur Support team is available around the clock.
            </div>
          </div>
          <a
            href="tel:+917044022000"
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-2 shadow-md shadow-amber-400/20 border border-amber-300 transition whitespace-nowrap active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 8240765499</span>
          </a>
        </div>
      </div>
    </section>
  );
};
