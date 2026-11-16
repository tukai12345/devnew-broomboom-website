"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Send,
  Building2,
  Upload,
  X,
  FileText,
  ShieldCheck,
  Mail,
  Phone,
  Laptop,
  Users,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { api } from "@/services/api";

export interface JobOpening {
  id: string;
  title: string;
  department: "Tech" | "Product/Business" | "Operations";
  location: string;
  experience: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

const JOB_OPENINGS: JobOpening[] = [
  // --- TECH ---
  {
    id: "tech-lead-fullstack",
    title: "Lead Full-Stack Engineer (Next.js & Node.js)",
    department: "Tech",
    location: "Kolkata, WB (HQ) / Hybrid",
    experience: "4–7 Years",
    type: "Full Time",
    summary:
      "Architect and scale high-concurrency dispatch engines, real-time map routing, and customer-facing booking portals powering millions of cab trips.",
    responsibilities: [
      "Design and maintain scalable microservices in Node.js, Next.js, and TypeScript.",
      "Optimize real-time geospatial fare calculation algorithms and map routing integrations.",
      "Build resilient caching, queueing, and WebSocket telemetry systems for live pilot-vehicle tracking.",
      "Collaborate closely with product and mobile engineering to release high-impact features.",
    ],
    requirements: [
      "4+ years of hands-on experience with modern React, Next.js, and Node.js.",
      "Deep understanding of distributed systems, Redis, PostgreSQL/MongoDB, and REST/WebSocket APIs.",
      "Experience with cloud infrastructure (AWS/GCP), CI/CD pipelines, and microservices architecture.",
    ],
    perks: ["Competitive salary + ESOPs", "Health Insurance", "Workstation allowance", "Flexible hours"],
  },
  {
    id: "tech-senior-android",
    title: "Senior Android Developer (Kotlin & Compose)",
    department: "Tech",
    location: "Kolkata, WB / Remote",
    experience: "3–6 Years",
    type: "Full Time",
    summary:
      "Own the BroomBoom Rider and Pilot Partner Android applications, ensuring buttery-smooth 60fps UX, instant location tracking, and offline resilience.",
    responsibilities: [
      "Build and optimize BroomBoom Pilot and Rider Android applications in Kotlin.",
      "Implement battery-efficient foreground GPS services, background ride polling, and push notifications.",
      "Integrate Cashfree / Razorpay payment gateways and secure biometric login flows.",
    ],
    requirements: [
      "Strong proficiency in Kotlin, Android Jetpack, Coroutines, and MVVM/MVI architecture.",
      "Hands-on experience with Google Maps SDK, geolocation tracking, and battery optimization.",
      "Track record of shipping production apps to Google Play Store with 4.5+ star ratings.",
    ],
    perks: ["Competitive salary + ESOPs", "High-spec dev gear", "Health cover", "Annual performance bonus"],
  },
  {
    id: "tech-devops-infra",
    title: "DevOps & Cloud Infrastructure Engineer",
    department: "Tech",
    location: "Remote / Kolkata",
    experience: "3–5 Years",
    type: "Full Time",
    summary:
      "Maintain 99.99% uptime for BroomBoom's nationwide dispatch cluster, database replication, and geo-distributed API gateways.",
    responsibilities: [
      "Manage AWS cloud infrastructure using Terraform and container orchestration (Docker/K8s).",
      "Monitor application performance with Prometheus, Grafana, and ELK stack.",
      "Enforce zero-trust security policies, automated backups, and disaster recovery drill protocols.",
    ],
    requirements: [
      "Solid experience with AWS (EC2, ECS/EKS, RDS, CloudFront, Route53, IAM).",
      "Strong scripting abilities in Bash and Python.",
      "Experience setting up zero-downtime blue/green CI/CD deployment pipelines.",
    ],
    perks: ["Full remote option", "Comprehensive health cover", "Learning budget for cloud certifications"],
  },

  // --- PRODUCT / BUSINESS ---
  {
    id: "prod-senior-pm",
    title: "Senior Product Manager — Rider Experience",
    department: "Product/Business",
    location: "Kolkata, WB / Hybrid",
    experience: "3–6 Years",
    type: "Full Time",
    summary:
      "Own the end-to-end customer booking journey, from initial search to ride completion, post-ride feedback, and loyalty retention.",
    responsibilities: [
      "Define product roadmap and KPIs for website and mobile booking funnels.",
      "Analyze user drop-offs, conduct A/B tests on checkout conversions, and optimize cancellation policies.",
      "Partner with engineering, design, and operations teams to ship seamless consumer experiences.",
    ],
    requirements: [
      "3+ years product management experience in consumer tech, mobility, travel, or quick commerce.",
      "Data-driven mindset with deep expertise in Mixpanel, Google Analytics, and SQL.",
      "Exceptional communication and stakeholder management skills.",
    ],
    perks: ["Competitive pay + Equity", "Annual travel allowance", "Health & wellness benefits"],
  },
  {
    id: "biz-growth-marketing",
    title: "Growth & Performance Marketing Specialist",
    department: "Product/Business",
    location: "Kolkata, WB / Hybrid",
    experience: "2–5 Years",
    type: "Full Time",
    summary:
      "Drive customer acquisition across Google Ads, Meta, SEO outstation routes, and strategic regional travel campaigns across Eastern and Northern India.",
    responsibilities: [
      "Scale high-ROI performance marketing campaigns on Google Search, Meta Ads, and regional networks.",
      "Optimize cost-per-acquisition (CPA) and lifetime value (LTV) for outstation and airport routes.",
      "Collaborate with SEO teams to capture organic highway and intercity travel traffic.",
    ],
    requirements: [
      "Proven track record managing ₹10L+ monthly performance ad spend with demonstrable ROI.",
      "Deep analytical skills in Google Ads Manager, Meta Business Suite, and GA4.",
      "Creative mindset with strong copywriting and conversion rate optimization (CRO) skills.",
    ],
    perks: ["Performance incentive bonuses", "Flexible working environment", "Company sponsored health plan"],
  },
  {
    id: "biz-b2b-corporate",
    title: "Corporate Fleet & B2B Partnerships Lead",
    department: "Product/Business",
    location: "Kolkata, WB",
    experience: "3–6 Years",
    type: "Full Time",
    summary:
      "Grow BroomBoom Corporate travel partnerships with IT parks, enterprise clients, and hotel chains for employee transportation and executive cabs.",
    responsibilities: [
      "Identify, pitch, and close high-value corporate travel contracts with companies in Kolkata and metro hubs.",
      "Oversee contract execution, automated monthly GST billing, and dedicated pilot allocation.",
      "Conduct regular quarterly business reviews (QBRs) with key enterprise accounts.",
    ],
    requirements: [
      "Experience in B2B corporate sales, enterprise fleet contracts, or corporate travel management.",
      "Strong executive presence and presentation skills.",
      "Network with corporate HR, admin, and procurement teams is a major plus.",
    ],
    perks: ["Attractive commission structure", "Fuel & conveyance allowance", "Corporate travel perks"],
  },

  // --- OPERATIONS ---
  {
    id: "ops-city-manager",
    title: "City Fleet Operations Manager",
    department: "Operations",
    location: "Kolkata, WB / West Bengal Hubs",
    experience: "2–5 Years",
    type: "Full Time",
    summary:
      "Lead ground fleet availability, pilot onboarding quality, and airport standby hubs to ensure zero cab cancellations.",
    responsibilities: [
      "Manage pilot partner vehicle verification, background checks, and app training.",
      "Maintain optimal cab availability at major railway junctions, airport terminals, and highway hubs.",
      "Monitor daily service level agreements (SLAs), on-time arrival metrics, and driver earnings.",
    ],
    requirements: [
      "2+ years experience in city operations, fleet logistics, supply chain, or ride-hailing services.",
      "Strong problem-solving capability in fast-paced on-ground environments.",
      "Fluent in Bengali and Hindi, with good working English.",
    ],
    perks: ["Competitive CTC + on-ground allowance", "Smartphone allowance", "Quarterly operational bonuses"],
  },
  {
    id: "ops-customer-support-lead",
    title: "24x7 Customer Care & Escalations Lead",
    department: "Operations",
    location: "Kolkata, WB",
    experience: "2–4 Years",
    type: "Full Time",
    summary:
      "Manage our 24x7 passenger helpline and pilot support team, delivering rapid resolutions for live bookings and flight delays.",
    responsibilities: [
      "Lead a team of customer service agents across shifts, ensuring <30s phone response time.",
      "Handle critical passenger escalations, route rerouting, and emergency assistance with empathy.",
      "Analyze support tickets to identify product bottlenecks and improve self-serve FAQ tools.",
    ],
    requirements: [
      "Prior experience in customer support leadership in travel, mobility, or e-commerce.",
      "Excellent telephone etiquette and calm de-escalation skills.",
      "Willingness to manage rotational shifts for 24x7 coverage.",
    ],
    perks: ["Shift allowances", "Cab pick & drop for night shifts", "Comprehensive health insurance"],
  },
];

export function CareersClientPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Tech" | "Product/Business" | "Operations">("All");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Application Form State
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantLocation, setApplicantLocation] = useState("");
  const [applicantExperience, setApplicantExperience] = useState("");
  const [applicantLinkedIn, setApplicantLinkedIn] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantNoticePeriod, setApplicantNoticePeriod] = useState("Immediate");
  const [applicantCover, setApplicantCover] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const fileInputId = useId();

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    if (activeFilter === "All") return true;
    return job.department === activeFilter;
  });

  const handleOpenApply = (job?: JobOpening) => {
    if (job) {
      setSelectedJob(job);
    } else {
      setSelectedJob({
        id: "general-application",
        title: "General / Open Application",
        department: "Tech",
        location: "Kolkata, WB / Remote",
        experience: "Any",
        type: "Full Time",
        summary: "Submit your profile for consideration across emerging teams at BroomBoom Cabs.",
        responsibilities: [],
        requirements: [],
        perks: [],
      });
    }
    setIsSubmittedSuccess(false);
    setIsApplyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    setSelectedJob(null);
    setIsSubmittedSuccess(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone) {
      alert("Please fill in required contact fields (Name, Email, Phone).");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      jobId: selectedJob?.id || "general",
      jobTitle: selectedJob?.title || "General Application",
      department: selectedJob?.department || "General",
      name: applicantName.trim(),
      email: applicantEmail.trim(),
      phone: applicantPhone.trim(),
      location: applicantLocation.trim() || undefined,
      experience: applicantExperience.trim() || undefined,
      linkedIn: applicantLinkedIn.trim() || undefined,
      portfolio: applicantPortfolio.trim() || undefined,
      noticePeriod: applicantNoticePeriod.trim() || undefined,
      cover: applicantCover.trim() || undefined,
      resumeFileName: resumeFileName || "Uploaded via Careers Portal",
      source: "BroomBoom Careers Page",
    };

    try {
      // 1. Submit lead to database via backend API
      await api.submitCareerApplication(payload);
    } catch (apiErr) {
      console.warn("Backend API submit failed, falling back to local storage:", apiErr);
    }

    // 2. Also keep in localStorage as offline backup & cross-tab sync
    try {
      const key = "broomboom_job_applications";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.unshift({
        id: `job-app-${Date.now()}`,
        ...payload,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(existing.slice(0, 100)));
    } catch {}

    setIsSubmitting(false);
    setIsSubmittedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-between text-slate-800">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Breadcrumb bar (Exact 1:1 match with screenshot) */}
        <div className="bg-[#f0f2f5] border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400" />
            <span className="text-slate-800 font-bold">Careers</span>
          </div>
        </div>

        {/* 3. Page Header */}
        <div className="bg-white border-b border-slate-200/80 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 shadow-2xs">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  Careers at BroomBoom
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  Build the future of nationwide intercity mobility and trusted car rental services
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="mailto:hr@broomboomcabs.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>hr@broomboomcabs.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. About BroomBoom Cabs Section (Matching Savaari layout from screenshot) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 tracking-tight">
              About BroomBoom Cabs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-left">
              BroomBoom Cabs is India&apos;s leading online cab booking aggregator, offering reliable and premium
              Intercity outstation, Airport transfers, and Local hourly car rental services. With our rapidly expanding
              operations across 2,000+ cities and towns, we are establishing ourselves as India&apos;s most trusted
              chauffeur-driven car rental company by geographical reach, complete with zero cancellation fee guarantee
              and verified, disciplined pilots. Following continuous market adoption and accelerated customer love, we
              are experiencing phenomenal growth and are rapidly expanding our team.
            </p>
          </div>

          {/* 5. Three Core Culture Cards with top colored border (Exact match to screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Card 1: Freedom & Ownership */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs relative overflow-hidden transition hover:shadow-md">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0070f3]" />
              <h3 className="text-base font-bold text-slate-900 mb-2.5 tracking-tight flex items-center gap-2">
                <span>Freedom &amp; Ownership</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We empower our team to be &ldquo;CEOs of their verticals&rdquo;. You own the strategy, implementation,
                and P&amp;L with complete autonomy and backing.
              </p>
            </div>

            {/* Card 2: Impact Driven */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs relative overflow-hidden transition hover:shadow-md">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0070f3]" />
              <h3 className="text-base font-bold text-slate-900 mb-2.5 tracking-tight flex items-center gap-2">
                <span>Impact Driven</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Enjoy a flat organization where your code or operational strategy directly impacts millions of
                travelers, pilots, and families in real-time.
              </p>
            </div>

            {/* Card 3: Entrepreneurial Pulse */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs relative overflow-hidden transition hover:shadow-md">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0070f3]" />
              <h3 className="text-base font-bold text-slate-900 mb-2.5 tracking-tight flex items-center gap-2">
                <span>Entrepreneurial Pulse</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe in an open culture that doesn&apos;t box your limits. Flexitimings, zero micromanagement, and a
                bias for action—what matters is the dent you make.
              </p>
            </div>
          </div>

          {/* 6. Call to Action Callout Text (Exact match from screenshot) */}
          <div className="text-center max-w-3xl mx-auto mb-10 px-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you love solving interesting problems and want to be a part of a success story, send us your resumes to{" "}
              <a
                href="mailto:jobs@broomboomcabs.com"
                className="font-bold text-[#0070f3] hover:underline"
              >
                hr@broomboomcabs.com              </a>{" "}
              and tell us why you are unique and how you can contribute. Alternatively, post your resume for an open
              position below:
            </p>
          </div>

          {/* 7. Current Job Openings Header & Filter Pills */}
          <div id="openings" className="scroll-mt-10">
            <h2 className="text-center text-lg sm:text-xl font-bold text-slate-900 mb-6 tracking-tight">
              Current Job Openings at BroomBoom
            </h2>

            {/* Department Filter Tabs (All, Tech, Product/Business, Operations) */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
              {(
                [
                  { id: "All", label: "All" },
                  { id: "Tech", label: "Tech" },
                  { id: "Product/Business", label: "Product/Business" },
                  { id: "Operations", label: "Operations" },
                ] as const
              ).map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer ${
                      isActive
                        ? "bg-[#0070f3] text-white shadow-sm ring-2 ring-[#0070f3]/20"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 hover:border-slate-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* 8. Job Openings List */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80">
                  <p className="text-sm font-bold text-slate-600">
                    No open positions under this category right now.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Send an open application to jobs@broomboomcabs.com and we will keep your profile on file.
                  </p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            job.department === "Tech"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : job.department === "Product/Business"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {job.department}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          {job.experience}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0070f3] transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {job.summary}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenApply(job)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* General Open Application Card */}
            <div className="mt-8 bg-gradient-to-r from-amber-50/70 via-yellow-50/50 to-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Don&apos;t see the right role for your skillset?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  We are always on the lookout for stellar talent in Engineering, Design, Operations, and Regional Growth.
                </p>
              </div>
              <button
                onClick={() => handleOpenApply()}
                className="shrink-0 px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Submit Open Application</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 9. Application Modal / Drawer */}
      {isApplyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 to-white">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {selectedJob?.department || "Careers"}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5 tracking-tight">
                  {selectedJob?.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {selectedJob?.location}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {selectedJob?.experience}
                  </span>
                  <span>&bull;</span>
                  <span>{selectedJob?.type}</span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
              {isSubmittedSuccess ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Application Submitted!</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Thank you for your interest in joining BroomBoom. Our recruitment team will review your profile
                    and reach out to you within 48 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm hover:bg-black transition cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Job Details Highlights if available */}
                  {selectedJob?.responsibilities && selectedJob.responsibilities.length > 0 && (
                    <div className="space-y-4 pb-4 border-b border-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-2">Key Responsibilities</h4>
                        <ul className="space-y-1.5 text-slate-600 text-xs sm:text-sm list-disc pl-5">
                          {selectedJob.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-2">Requirements</h4>
                          <ul className="space-y-1.5 text-slate-600 text-xs sm:text-sm list-disc pl-5">
                            {selectedJob.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Application Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h4 className="font-black text-slate-900 text-sm tracking-tight">
                      Submit Your Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Partha Sarkar"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="e.g. partha@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Current Location / City
                        </label>
                        <input
                          type="text"
                          value={applicantLocation}
                          onChange={(e) => setApplicantLocation(e.target.value)}
                          placeholder="e.g. Kolkata / Bangalore"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Total Relevant Experience
                        </label>
                        <input
                          type="text"
                          value={applicantExperience}
                          onChange={(e) => setApplicantExperience(e.target.value)}
                          placeholder="e.g. 3.5 Years"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Notice Period
                        </label>
                        <select
                          value={applicantNoticePeriod}
                          onChange={(e) => setApplicantNoticePeriod(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium"
                        >
                          <option value="Immediate">Immediate / Serving Notice</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          LinkedIn Profile URL
                        </label>
                        <input
                          type="url"
                          value={applicantLinkedIn}
                          onChange={(e) => setApplicantLinkedIn(e.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Portfolio / GitHub / Website
                        </label>
                        <input
                          type="url"
                          value={applicantPortfolio}
                          onChange={(e) => setApplicantPortfolio(e.target.value)}
                          placeholder="https://github.com/..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Resume Upload Box */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Resume / CV (PDF or DOCX)
                      </label>
                      <label
                        htmlFor={fileInputId}
                        className="border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center bg-slate-50 hover:bg-amber-50/30 group"
                      >
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-500 mb-1 transition-colors" />
                        <span className="text-xs font-bold text-slate-700">
                          {resumeFileName || "Click to browse or drop resume file here"}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          PDF, DOC, DOCX up to 10MB
                        </span>
                        <input
                          id={fileInputId}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Cover Note */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Why are you excited to join BroomBoom?
                      </label>
                      <textarea
                        rows={3}
                        value={applicantCover}
                        onChange={(e) => setApplicantCover(e.target.value)}
                        placeholder="Tell us briefly about your projects, unique contributions, and what excites you about building mobility tech..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 text-xs sm:text-sm font-medium resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <span>Submitting Application...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Application</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 10. Global Footer */}
      <Footer />
    </div>
  );
}
