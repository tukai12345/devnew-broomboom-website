import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Scale,
  CreditCard,
  AlertTriangle,
  Car,
  Package,
  Clock,
  Ban,
  CheckCircle2,
  Lock,
  Building,
  Gavel,
  PhoneCall,
  Mail,
  UserCheck,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions for Pilot | BroomBoom Cabs — BTSPL",
  description:
    "Official Terms and Conditions for Pilots and Drivers of BroomBoom Cabs (BroomBoom Transportation Services Private Limited). Electronic record under the Information Technology Act, 2000.",
  alternates: {
    canonical: "https://www.broomboomcabs.com/pilot-terms",
  },
};

export default function PilotTermsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0B1527] text-white pt-12 pb-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-4">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>Pilot Partner Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Terms &amp; Conditions for <span className="text-[#FBBF24]">Pilot</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-4 max-w-3xl mx-auto leading-relaxed uppercase tracking-wider font-semibold text-amber-200/90">
            THIS DOCUMENT IS AN ELECTRONIC RECORD IN TERMS OF INFORMATION TECHNOLOGY ACT, 2000 AND RULES THEREUNDER AS APPLICABLE AND THE PROVISIONS PERTAINING TO ELECTRONIC RECORDS IN VARIOUS STATUTES AS AMENDED BY THE INFORMATION TECHNOLOGY ACT, 2000.
          </p>

          <div className="mt-4 text-xs text-slate-400 font-medium">
            BroomBoom Transportation Services Private Limited (BTSPL) • Last updated: November 2026
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">

          {/* Preamble */}
          <section className="space-y-4 bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 text-xs sm:text-sm text-slate-800">
            <p>
              <strong>BroomBoom Transportation Services Private Limited (BTSPL)</strong> provides technology-based services for booking two-wheelers, cabs, and commercial vehicles (“Vehicle”) to you (“You” or “Users”) and you agree to obtain certain Services (defined hereinafter) offered by third-party drivers or vehicle operators (“PILOTS”) by means of the Company’s website and the mobile application “BroomBoom Cabs” / “BroomBoom Pilot” (“Platform”). All the Services provided by the Company to you would be by means of your use of the Platform. These Terms of Use shall govern the relationship between you (the customer/pilot) and the Company in the course of the provision of the Services. These terms of use (“Terms of Use”) mandate the terms on which users and pilots using the Services will be governed.
            </p>
            <p>
              Please read the Terms of Use carefully before using the Platform or registering on the Platform or accessing any material or information through the Platform.
            </p>
            <p className="font-semibold text-slate-900 border-l-4 border-amber-400 pl-3">
              Use of and access to the Platform is offered to You upon the condition of acceptance of all the terms, conditions, and notices contained in this Terms of Use and Privacy Policy, along with any amendments made by the Company at its sole discretion and posted on the Platform from time to time.
            </p>
          </section>

          {/* SERVICES */}
          <section id="services" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">1</span>
              <span>Services</span>
            </h2>
            <p>The Platform provides the following services (“Services”) to You:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                  <Package className="w-5 h-5 text-amber-500" />
                  <h4>Package Services</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  It allows you to pick up and drop off packages from one location to the other through the pilots (“Package Services”).
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                  <Car className="w-5 h-5 text-amber-500" />
                  <h4>Transportation Services</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  It allows you to avail of transportation services provided by the Pilots on our Platform (“Transportation Services”).
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* GENERAL TERMS OF USE */}
          <section id="general-terms" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">2</span>
              <span>General Terms of Use</span>
            </h2>

            <ul className="list-disc list-inside space-y-2.5 pl-2 text-slate-700">
              <li>
                <strong>Age Requirement:</strong> You must be at least 18 years of age, or the age of legal majority in your jurisdiction (if different than 18 years), to obtain an account. The Service is not available for use by persons under the age of 18 years. You shall not authorize third parties to use your account. You shall not allow persons under the age of 18 years to receive transportation or logistics services from the Pilots.
              </li>
              <li>
                <strong>Misrepresentation:</strong> If the Company becomes aware or, it acquires credible knowledge that You have misled us regarding your age, then the Company reserves its rights to deactivate the account and You will not be liable to raise any claims from the Company.
              </li>
              <li>
                <strong>Dispatch System:</strong> The Company shall take your booking request and forward it to the Pilot through an app-based device operating on GPS-GPRS based device available with the Pilot. The Company may monitor and record calls made to the Pilots, for the purpose of training and improving customer care services, including complaints.
              </li>
              <li>
                <strong>Pilot Acceptance &amp; Penalties:</strong> The Pilot shall have the sole discretion to accept or reject each request for the Service. If the Pilot accepts the booking request made by the Company, a notification will be sent to you with the information regarding the Pilot including its name, contact number, etc. If the Pilot after accepting the booking request declines/cancels it or did not arrive at the location of the user then a penalty will be charged to the Pilot.
              </li>
              <li>
                <strong>Platform Agency &amp; Independent Service:</strong> For the avoidance of doubt, it is clarified that the Company itself does not provide the Services. It is the Pilot who shall render the Services to you. Even after acceptance of the booking, the Pilot may not reach your pick-up location or decide not to render his services, in which event the Company shall not be held liable but the company will charge a penalty amount from the pilot. If the user declines the booking accepted by the Pilot then a penalty will be deducted from the user and the company is not liable for it.
              </li>
              <li>
                <strong>Information Accuracy:</strong> You warrant that the information you provide to the Company is accurate and complete. The Company is entitled at all times to verify the information that you have provided. You may only access the Services using authorized means.
              </li>
              <li>
                <strong>Reputation &amp; Code of Conduct:</strong> You will refrain from doing anything which we reasonably believe to be disreputable or capable of damaging our reputation and will comply with all applicable laws of the Republic of India. You will treat the Pilot with respect and not cause damage to their Vehicle or engage in any unlawful, threatening, harassing, abusive behavior or activity whilst using their Vehicle.
              </li>
            </ul>

            {/* Audio & Video Safety Permissions */}
            <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 sm:p-5 space-y-3 mt-4 text-xs sm:text-sm text-slate-800">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Audio &amp; Visual Safety Features</span>
              </h3>
              <p>
                You will not close the audio and visual safety features like camera and microphone features enabled by the company for your safety during the ride. If you deny the camera and microphone permission features then the company will not take any type of responsibility for your safety.
              </p>
              <p>
                You will be solely responsible for your safety throughout the ride and in case any incident happens with you, you will not be able to file any complaints or cases against the company as you yourself switched off / denied permission for the camera and microphone safety features given to you by the company throughout the ride.
              </p>
              <p>
                The Company is not responsible for the behavior, actions, or inactions of drivers of Vehicles, Pilots, or the quality of the Vehicle which you may use. Any contract for the provision of Vehicle for the Services is exclusively between you and the Pilot and the Company is not a party to the same.
              </p>
              <p>
                You must wear masks, helmets and should follow all the traffic rules and regulations throughout the ride. In case if you do not follow and maintain the laws and rules you will be charged a fine by any government authority then the company is not responsible for it.
              </p>
              <p>
                You are not allowed to consume any liquor or harmful addictive liquids or drugs or any illegal consumption throughout the ride. If you are caught doing any such activities then the company is not responsible for it and the company can take legal steps or provide evidence to the courts or laws against you.
              </p>
            </div>

            {/* Package & Delivery Prohibitions */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 space-y-2.5 mt-4 text-xs sm:text-sm text-slate-800">
              <h3 className="font-black text-rose-950 flex items-center gap-2 text-sm sm:text-base">
                <Ban className="w-5 h-5 text-rose-600" />
                <span>Package Services Legal Compliance &amp; Prohibited Items</span>
              </h3>
              <p>
                You agree that You shall not request Package Services for Items that are illegal, hazardous, dangerous, or otherwise restricted under any applicable laws. Prohibited items include, but are not limited to:
              </p>
              <p className="text-xs text-rose-900 leading-relaxed font-mono bg-white/70 p-3 rounded-lg border border-rose-200">
                Radio-active, incendiary, corrosive or flammable substances, hazardous chemicals, explosives, firearms or parts thereof and ammunition, firecrackers, cyanides, precipitates, gold and silver ore, bullion, precious metals and stones, jewellery, currency of any nationality, securities, coupons, stamps, negotiable instruments, cashier’s cheques, travellers’ cheques, money orders, passports, credit/debit cards, lottery tickets, livestock, plants, human corpses or organs, blood, biomedical waste, contraband, bottled alcoholic beverages, narcotics, or psychotropic substances.
              </p>
              <p className="text-xs text-slate-600">
                Upon becoming aware of the commission of any offense by You, the Pilot may report such information to the Company or to the law enforcement authorities.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs sm:text-sm">
              <p><strong>Additional Platform Obligations:</strong></p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                <li>You will download the Application for your sole, personal use and will not resell it to a third party.</li>
                <li>You will keep secure and confidential your account password or any identification that the Company may provide you.</li>
                <li>In order for us to facilitate UPI payments, bank account and Virtual Payment Address (“VPA”) validations are conducted through third-party service providers.</li>
                <li>If within 24 hours a user creates more than one account on the same device, BroomBoom Cabs has the right to terminate his/her account.</li>
                <li>The Company reserves the right to immediately terminate your use of the Application should you not comply with any of the rules provided in the Terms of Use.</li>
              </ul>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* PAYMENT FOR SERVICES */}
          <section id="payment" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">3</span>
              <span>Payment for Services</span>
            </h2>

            <p>
              You shall be required to pay charges for the Services used by you either by using the online payment gateway provided in the Platform or by paying cash to the Pilots. The Company collects the charges for the Services on behalf of the Pilots after obtaining authorization from the Pilots and the payment is remitted to the Pilot’s bank account registered with the Company.
            </p>

            {/* 72-Hour Cash Settlement Rule */}
            <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl text-slate-800 text-xs sm:text-sm space-y-2">
              <h4 className="font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>72-Hour Pilot Cash Collection &amp; Remittance Rule</span>
              </h4>
              <p>
                In case the online payment of the user fails, the user has to pay in cash and <strong>the pilot is bound to give the fare collected in cash to the company within 72 hours</strong>. If the pilot does not clear the fare amount collected in cash to the company, the penalty will be charged against him and after 7 days the penalty amount will be increased; still, if the pilot did not clear the amount legal actions will be taken by the company against such events.
              </p>
            </div>

            {/* Minimum Wallet Balance Requirement */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs sm:text-sm space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span>Minimum Pilot Wallet Balance</span>
              </h4>
              <p>
                <strong>You need to maintain a minimum wallet balance due to certain security purposes in your account to accept further trips.</strong> This rechargeable wallet balance is non-refundable.
              </p>
              <p className="text-slate-600">
                Any payment made is non-refundable. At the end of the trip, we will facilitate for you to receive a copy of the invoice from the Company on your registered e-mail account.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* LIABILITY */}
          <section id="liability" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">4</span>
              <span>Liability</span>
            </h2>

            <p>
              The Company will reasonably keep the website and the application and its contents correct and up to date but does not guarantee that the website and/or application are free of errors, defects, malware, and viruses or that the website and/or application are correct, up to date and accurate. The Company shall not be liable for any damage arising from the same.
            </p>
            <p>
              The Company shall further not be liable for damages resulting from the use of or the inability to use the website or the application, including – but not limited to – damages resulting from failure or delay in delivery of electronic communications, interception or manipulation of electronic communications by third parties or by computer programs used for electronic communications and transmission of viruses.
            </p>
            <p>
              The quality of the Services requested through the use of the Platform is entirely the responsibility of the Pilot who ultimately provides such Services to you and the Company is not liable for the same. However, any complaints about the Services provided by the Pilot should be submitted to the Company by email as notified from time to time.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* INTELLECTUAL PROPERTY RIGHTS */}
          <section id="ip-rights" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">5</span>
              <span>Intellectual Property Rights</span>
            </h2>

            <p>
              The Company is the sole owner and lawful licensee of all the rights to the website, Platform, or any other digital media and its contents. The content means its design, layout, text, images, graphics, sounds, video, etc. All related icons and logos are registered trademarks or service marks or word marks of the Company in various jurisdictions.
            </p>
            <p>
              You are granted a limited non-exclusive, non-transferable license to run the Platform solely for your personal use. You shall not license, resell, reverse engineer, mirror, or launch automated scripts (web spiders, crawlers, robots) against the Platform.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* THIRD-PARTY LINKS */}
          <section id="third-party-links" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">6</span>
              <span>Third-Party Links</span>
            </h2>
            <p>
              During the use of the website or the application, links to websites that are owned and controlled by third parties may be provided. These links take you off the Platform and are beyond the Company’s control. You visit or access these websites entirely at your own risk.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* TERM AND TERMINATION */}
          <section id="termination" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">7</span>
              <span>Term, Termination &amp; Pilot Code of Conduct</span>
            </h2>

            <p>
              The contract between the Company and you is concluded for an indefinite period. You are entitled to terminate the Contract at all times by permanent deletion of the Platform. The Company is entitled to terminate with immediate effect if you violate these Terms or misuse the Platform.
            </p>

            {/* Pilot Misbehaviour & ID Ban Clause */}
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl text-slate-800 text-xs sm:text-sm space-y-2">
              <h4 className="font-black text-rose-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Zero Tolerance: Misbehavior, Harassment &amp; Profile Ban</span>
              </h4>
              <p>
                <strong>
                  If a Pilot misbehaves, harasses or is involved in any spamming or unethical activities that violates the company rules, regulations and code of conduct, then the Company has the right to take proper actions against him and the company has the right to ban his registered profile or ID temporarily or permanently.
                </strong>
              </p>
              <p className="text-xs text-rose-800">
                The Company is free to take any actions and it is not answerable to anyone.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* INDEMNITY */}
          <section id="indemnity" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">8</span>
              <span>Indemnity</span>
            </h2>
            <p>
              You will indemnify and hold the Company harmless, from any and all claims, losses, liabilities, damages, expenses, and costs (including attorneys’ fees and court costs) which result from a breach or alleged breach of these Terms of Use by you.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* GOVERNING LAW & DISPUTE RESOLUTION */}
          <section id="governing-law" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">9</span>
              <span>Governing Law, Jurisdiction and Dispute Resolution</span>
            </h2>
            <p>
              These Terms of Use shall be governed by and interpreted in all respects in accordance with the laws of the Republic of India. The Parties submit to the exclusive jurisdiction of the courts of <strong>Chinsurah, India</strong>.
            </p>
            <p>
              All disputes shall be settled amicably within 15 days. If unresolved, the dispute shall be resolved through arbitration pursuant to the Arbitration and Conciliation Act, 1996, before 1 (one) arbitrator in English with the seat of arbitration at <strong>Chinsurah, India</strong>. The award of the arbitral tribunal shall be final and binding.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* MISCELLANEOUS */}
          <section id="miscellaneous" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">10-13</span>
              <span>Assignment, Amendments, Severability &amp; Notices</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Assignment &amp; Amendment</h4>
                <p className="text-slate-600">
                  You may not assign your rights without prior written approval. The Company may amend these Terms of Use from time to time at its sole discretion.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Severability &amp; Notices</h4>
                <p className="text-slate-600">
                  Invalid provisions shall be severed without affecting remaining terms. Notices may be issued via the Application, email, or registered post.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* CANCELLATION & REFUND POLICIES */}
          <section id="cancellation-refunds" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">14</span>
              <span>Cancellation &amp; Refund Policies</span>
            </h2>

            <p>
              A cancellation fee is charged to compensate drivers for the time, effort, and fuel spent while trying to reach the pickup location and waiting for the customer.
            </p>

            <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 sm:p-5 space-y-2.5 text-xs sm:text-sm text-slate-800">
              <p className="font-bold">Cancellation fee conditions:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>A trip is canceled after 3 (three) minutes or later from the time of acceptance by the driver;</li>
                <li>A driver cancels the booking after waiting at your pickup location for 5 minutes or more;</li>
                <li>If the ride does not start within 30 minutes from pickup time after the arrival of the pilot at the pickup location.</li>
              </ul>
              <p className="pt-1">
                In fully confirmed pre-scheduled rides or real-time confirmed rides, 100% cancellation charges apply on the full amount. No refund or return is initiated in fully confirmed rides.
              </p>
            </div>

            {/* Mid-Way & Airport Cancellation Protection for Pilot */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-slate-800 mt-3">
              <h4 className="font-black text-emerald-950 flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Pilot Cancellation Protection (Mid-Way / Airport / Station)</span>
              </h4>
              <p>
                <strong>In case of Booking Cancellation:</strong> If the Pilot is in the mid-way or at the Airport/Station, at that moment if the User cancels the ride due to any unfavourable circumstances, then based on the app algorithm, <strong>the Pilot will receive cancellation charges credited directly to their wallet as per the app algorithm</strong>.
              </p>
              <p className="text-xs text-emerald-900">
                <strong>Pilot Cancellation Penalty:</strong> If a Pilot cancels a booking after accepting it, penalty charges will be imposed automatically as per the app algorithm.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Contact Support Section */}
          <section className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-amber-500" />
              <span>Pilot Support &amp; Grievance Redressal</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              For pilot onboarding, payment settlements, account assistance, or dispute resolutions:
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-800">
              <p className="font-bold">BroomBoom Transportation Services Private Limited (BTSPL)</p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <a href="tel:+918240765499" className="hover:text-amber-600 font-medium">+91 82407 65499</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600" />
                <a href="mailto:support@broomboomcabs.com" className="hover:text-amber-600 font-medium">support@broomboomcabs.com</a>
              </p>
              <p>Registered Jurisdiction: Majhi Enclave, 7, T.C.Mukherjee St, Kali Tala, Bangur Park, Rishra, West Bengal, 712248</p>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
