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
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions for Users | BroomBoom Cabs — BTSPL",
  description:
    "Official Terms and Conditions for Users of BroomBoom Cabs (BroomBoom Transportation Services Private Limited). Electronic record under the Information Technology Act, 2000.",
  alternates: {
    canonical: "https://www.broomboomcabs.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0B1527] text-white pt-12 pb-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>User Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Terms &amp; Conditions for <span className="text-[#FBBF24]">Users</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-4 max-w-3xl mx-auto leading-relaxed uppercase tracking-wider font-semibold text-amber-200/90">
            THIS DOCUMENT IS AN ELECTRONIC RECORD IN THE TERMS OF INFORMATION TECHNOLOGY ACT, 2000 AND RULES THEREUNDER AS APPLICABLE AND THE PROVISIONS PERTAINING TO ELECTRONIC RECORDS IN VARIOUS STATUTES AS AMENDED BY THE INFORMATION TECHNOLOGY ACT, 2000.
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
              <strong>BroomBoom Transportation Services Private Limited (BTSPL)</strong> provides technology-based services for booking two-wheelers, cabs, and commercial vehicles (“Vehicle”) to you (“You” or “Users”) and you agree to obtain certain Services (defined hereinafter) offered by third-party drivers or vehicle operators (“PILOTS”) by means of the Company’s website located at{" "}
              <Link href="https://www.broomboomcabs.com" target="_blank" className="text-amber-700 font-semibold hover:underline">
                www.broomboomcabs.com
              </Link>{" "}
              and the mobile application “BroomBoom Cabs” (“Platform”). All the Services provided by the Company to you would be by means of your use of the Platform. These Terms of Use shall govern the relationship between you (the customer) and the Company in the course of the provision of the Services. These terms of use (“Terms of Use”) mandate the terms on which users using the Services will be governed.
            </p>
            <p>
              Please read the Terms of Use carefully before using the Platform or registering on the Platform or accessing any material or information through the Platform.
            </p>
            <p className="font-semibold text-slate-900 border-l-4 border-amber-400 pl-3">
              Use of and access to the Platform is offered to You upon the condition of acceptance of all the terms, conditions, and notices contained in this Terms of Use and Privacy Policy, along with any amendments made by the Company at its sole discretion and posted on the Platform from time to time.
            </p>
          </section>

          {/* 1. SERVICES */}
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
                  Allows you to pick up and drop off packages from one location to the other through verified independent Pilots.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                  <Car className="w-5 h-5 text-amber-500" />
                  <h4>Transportation Services</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Allows you to avail on-demand and pre-scheduled passenger transportation services provided by the Pilots on our Platform.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 2. GENERAL TERMS OF USE */}
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
                <strong>Misrepresentation of Age:</strong> If the Company becomes aware or acquires credible knowledge that You have misled us regarding your age, then the Company reserves its rights to deactivate the account and You will not be liable to raise any claims from the Company.
              </li>
              <li>
                <strong>Dispatch &amp; Communications:</strong> The Company shall take your booking request and forward it to the Pilot through an app-based device operating on GPS-GPRS based device available with the Pilot. The Company may monitor and record calls made to the Pilots, for the purpose of training and improving customer care services, including complaints.
              </li>
              <li>
                <strong>Pilot Discretion:</strong> The Pilot shall have the sole discretion to accept or reject each request for the Service. If the Pilot accepts the booking request made by the Company, a notification will be sent to you with the information regarding the Pilot including its name, contact number, etc.
              </li>
              <li>
                <strong>Penalties for Cancellation:</strong> If the Pilot after accepting the booking request declines/cancels it or did not arrive at the location of the user then a penalty will be charged to the Pilot. If the user declines the booking accepted by the Pilot then a penalty will be deducted from the user and the company is not liable for it.
              </li>
              <li>
                <strong>Independent Contractor Relationship:</strong> For the avoidance of doubt, it is clarified that the Company itself does not provide the Services. It is the Pilot who shall render the Services to you. Even after acceptance of the booking, the Pilot may not reach your pick-up location or decide not to render his services, in which event the Company shall not be held liable but the company will charge a penalty amount from the pilot.
              </li>
              <li>
                <strong>Accuracy of Information:</strong> You warrant that the information you provide to the Company is accurate and complete. The Company is entitled at all times to verify the information that you have provided. You may only access the Services using authorized means. The Company shall not be liable if you do not download the correct Platform or visit the appropriate web portal.
              </li>
            </ul>

            {/* Safety & Conduct Highlights */}
            <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 sm:p-5 space-y-3 mt-4 text-xs sm:text-sm text-slate-800">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Audio &amp; Visual Safety Permissions During Ride</span>
              </h3>
              <p>
                You will not close the audio and visual safety features like camera and microphone features enabled by the company for your safety during the ride. If you deny the camera and microphone permission features then the company will not take any type of responsibility for your safety.
              </p>
              <p>
                You will be solely responsible for your safety throughout the ride and in case any incident happens to you, you will not be able to file any complaints or cases against the company as you yourself switched off/denied permission for the camera and microphone safety features given to you by the company throughout the ride.
              </p>
              <p>
                You must wear masks, helmets and should follow all the traffic rules and regulations throughout the ride. If you do not follow and maintain the laws and rules you will be charged a fine by any government authority and the company is not responsible for it.
              </p>
              <p>
                You are not allowed to consume any liquor or harmful addictive liquids or drugs or any illegal consumption throughout the ride. If you are caught doing any such activities the company can take legal steps or provide evidence to the courts or law authorities.
              </p>
            </div>

            {/* Prohibited Items for Package Services */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 space-y-2.5 mt-4 text-xs sm:text-sm text-slate-800">
              <h3 className="font-black text-rose-950 flex items-center gap-2 text-sm sm:text-base">
                <Ban className="w-5 h-5 text-rose-600" />
                <span>Prohibited Items for Package &amp; Delivery Services</span>
              </h3>
              <p>
                You agree that You shall not request Package Services for Items that are illegal, hazardous, dangerous, or otherwise restricted under any applicable laws. Prohibited items include, but are not limited to:
              </p>
              <p className="text-xs text-rose-900 leading-relaxed font-mono bg-white/70 p-3 rounded-lg border border-rose-200">
                Radio-active, incendiary, corrosive or flammable substances, hazardous chemicals, explosives, firearms or parts thereof and ammunition, firecrackers, cyanides, precious metals and stones, currency of any nationality, securities, negotiable instruments, cashier’s cheques, money orders, passports, credit/debit cards, lottery tickets, livestock, plants, human organs or body parts, bio-medical waste, contraband, bottled alcoholic beverages, narcotics, or psychotropic substances.
              </p>
              <p className="text-xs text-slate-600">
                The Company does not physically inspect packages. If illegal contents are identified, the Company has the immediate right to report You to government authorities and initiate legal action.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs sm:text-sm">
              <p><strong>Platform Usage Rules:</strong></p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                <li>You will download the Application for personal use only and will not resell it to any third party.</li>
                <li>You will keep your account credentials and password strictly confidential.</li>
                <li>In order for us to facilitate UPI payments, bank account and Virtual Payment Address (VPA) validations are conducted through third-party service providers.</li>
                <li>If within 24 hours a user creates more than one account on the same device, BroomBoom Cabs has the right to terminate their accounts.</li>
                <li>The Wallet balance is non-redeemable. It may be used in future trips subject to ride terms and conditions.</li>
              </ul>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 3. PAYMENT FOR SERVICES */}
          <section id="payment" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">3</span>
              <span>Payment for Services</span>
            </h2>

            <p>
              You shall be required to pay charges for the Services used by you either by using the online payment gateway provided in the Platform or by paying cash to the Pilots. The Company collects the charges for the Services on behalf of the Pilots after obtaining authorization from the Pilots and the payment is remitted to the Pilot’s bank account registered with the Company.
            </p>
            <p>
              In case the online payment of the user fails, the user has to pay in cash and the pilot is bound to give the fare collected in cash to the company within 72hrs. If the pilot does not clear the fare amount collected in cash to the company, the penalty will be charged against him.
            </p>
            <p>
              In respect of the Delivery Services, you will be required to settle the payments incurred towards the goods/products purchased from the merchants directly with the Pilots.
            </p>
            <p>
              Any payment made is non-refundable. At the end of the trip, we will facilitate for you to receive a copy of the invoice from the Company on your registered e-mail account with the Company.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-slate-700">
              <h3 className="font-bold text-slate-900 text-sm">Key Fare &amp; Payment Conditions:</h3>
              <p>
                <strong>Non-Refundable Advance:</strong> All Charges paid by you are final and non-refundable. The funds added in user wallet or any voucher provided by BroomBoom Cabs will be remitted against the advance booking amount only and not against the total trip price.
              </p>
              <p>
                <strong>Partial Advance Reservation:</strong> Any partial advance payment procedure for reserving the cab is non-refundable. In partial advance procedure, the cab is locked for a specific time period. If the remaining Due advance reservation payment procedure is not completed within the specific time period, the reserved booking gets cancelled automatically and the partial advance payment done to reserve the cab is non-refundable.
              </p>
              <p>
                <strong>Tipping:</strong> Gratuities are voluntary. Any representation that tipping is included or voluntary does not obligate any additional amount from the Company.
              </p>
              <p>
                <strong>Unauthorized Cash Demands:</strong> You must not pay anything to a Third-Party Provider or driver before onboarding the cab. BroomBoom Cabs shall not be liable for any extra payment made to a driver at any point in time apart from the amount communicated by BroomBoom Cabs.
              </p>
              <p>
                <strong>Toll, State Taxes &amp; Parking:</strong> BroomBoom Cabs and the Third-Party Provider shall not be liable for any inter-state tax (such as MCD Toll Tax, Central or State Toll Tax, or parking fees). You are responsible for collecting receipts from the driver and settling these directly as per actuals. Where FASTag is used, it is your responsibility to obtain the debit confirmation from the driver.
              </p>
              <p>
                <strong>Trip Shortening:</strong> You are liable to pay the full trip package price in case you decide to shorten your trip for whatsoever reason (e.g., returning early on a round trip or if included kilometers are not fully exhausted). No reduction or cashback is permitted.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 4. LIABILITY & LIMITATION OF LIABILITY */}
          <section id="liability" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">4</span>
              <span>Liability &amp; Limitation of Liability</span>
            </h2>

            <p>
              The information and recommendations provided to you on or through the website or Platform is for general information purposes only and does not constitute advice. The Company does not guarantee that the website and/or application are free of errors, defects, malware, or viruses.
            </p>
            <p>
              The quality of the Services requested through the use of the Platform is entirely the responsibility of the Pilot who ultimately provides such Services to you and the Company is not liable for the same.
            </p>

            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-slate-800">
              <h3 className="font-black text-slate-900 uppercase tracking-wide">Limitation of Liability</h3>
              <p>
                BroomBoom Cabs shall not be liable for any direct, indirect, incidental, special, exemplary, punitive or consequential damages whatsoever, including lost profits, lost data, personal injury or property damage related to, in connection with, or otherwise resulting from any use of the services.
              </p>
              <p>
                BroomBoom Cabs shall not be liable for missing trains, flights, events, or travel delays as the Service is dependent on traffic, weather, and external factors beyond our control.
              </p>
              <p>
                In the event there is a delay by the Vehicle in reaching the pickup location beyond 30 (thirty) minutes of the pickup time when all details were provided correctly, BroomBoom Cabs shall only endeavor to get You in touch with the Pilot and shall not be liable for any refund of the advance amount paid.
              </p>
              <p>
                The advance payment procedure is just for the confirmation of your Booking and is non-refundable. Location data is accessed by the BroomBoom Pilot app for customer orders placed.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 5. INTELLECTUAL PROPERTY RIGHTS */}
          <section id="ip-rights" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">5</span>
              <span>Intellectual Property Rights</span>
            </h2>

            <p>
              The Company is the sole owner and lawful licensee of all rights to the website, Platform, and its digital media contents (design, layout, text, graphics, icons, logos, and images). All related icons and logos are registered trademarks or service marks of the Company.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to use the Platform solely for personal, non-commercial use on a single device. You shall not license, resell, reverse engineer, frame, mirror, or launch automated scraping programs (crawlers, bots, spiders) against the Platform.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 6. THIRD-PARTY LINKS */}
          <section id="third-party-links" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">6</span>
              <span>Third-Party Links</span>
            </h2>
            <p>
              During use of the website or application, links to third-party websites or services may be provided. These links take you off the Platform and are beyond the Company’s control. You visit and access third-party websites entirely at your own risk.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 7. CANCELLATION & REFUND POLICIES */}
          <section id="cancellation-refunds" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">7</span>
              <span>Cancellation &amp; Refund Policies</span>
            </h2>

            <p>
              When cancelled at the last minute by customers, cancellation charges are applied to compensate the Driver for loss of fuel, time, and effort.
            </p>
            <p>
              In case of refund approvals, the advance amount is credited to the user app wallet with limited validity or lifetime validity. This amount can be used percentage-wise in future rides from the wallet.
            </p>
            <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-slate-800">
              <p className="font-bold">Cancellation charges occur if:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>A trip is cancelled after 3 (three) minutes or later from the time of acceptance by the driver;</li>
                <li>A driver cancels the booking after waiting at your pickup location for 5 minutes or more;</li>
                <li>The ride does not start within 30 minutes from pickup time after the arrival of the pilot at the pickup location.</li>
              </ul>
              <p className="pt-1 font-semibold text-slate-900">
                In fully confirmed pre-scheduled rides or real-time confirmed rides, 100% cancellation charges apply on the full amount. No refund or return is initiated in fully confirmed rides.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 8. TERM AND TERMINATION */}
          <section id="termination" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">8</span>
              <span>Term and Termination</span>
            </h2>
            <p>
              The contract between the Company and you is concluded for an indefinite period. You may terminate at any time by permanently deleting the Platform. The Company is entitled to terminate with immediate effect if you violate these Terms or misuse the Service. Neither party shall be liable for failures resulting from acts of God, strikes, floods, storms, or force majeure events.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 9. INDEMNITY */}
          <section id="indemnity" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">9</span>
              <span>Indemnity</span>
            </h2>
            <p>
              You will indemnify and hold the Company harmless from any and all claims, losses, liabilities, damages, expenses, and legal costs resulting from a breach or alleged breach of these Terms of Use by you.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 10. GOVERNING LAW & DISPUTE RESOLUTION */}
          <section id="governing-law" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">10</span>
              <span>Governing Law, Jurisdiction and Dispute Resolution</span>
            </h2>
            <p>
              These Terms of Use shall be governed by and interpreted in accordance with the laws of the Republic of India. The Parties submit to the exclusive jurisdiction of the courts of <strong>Chinsurah, India</strong>.
            </p>
            <p>
              All disputes shall be resolved amicably within fifteen (15) days of notice. If unresolved, the dispute shall be resolved through arbitration pursuant to the Arbitration and Conciliation Act, 1996, before a sole arbitrator in the English language with the seat of arbitration at <strong>Chinsurah, India</strong>.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 11 - 14. MISCELLANEOUS */}
          <section id="miscellaneous" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">11-14</span>
              <span>Assignment, Amendments, Severability &amp; Notices</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Assignment &amp; Amendment</h4>
                <p className="text-slate-600">
                  These Terms of Use may be amended from time to time at the sole discretion of the Company. Changes are effective upon publication.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Severability &amp; Notices</h4>
                <p className="text-slate-600">
                  If any provision is found invalid, the remainder remains in full effect. Notices may be given via the Application, email, or post.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 15. USER REQUIREMENTS AND CONDUCT */}
          <section id="user-conduct" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">15</span>
              <span>User Requirements and Conduct</span>
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2.5 text-xs sm:text-sm text-slate-700">
              <p>
                <strong>Vehicle Model &amp; Fuel Specifications:</strong> You shall not have any right in determining or classifying the Services in accordance with the type of fuel, specific car model, brand, manufacturer, or registration number. Any 4+1 seat car can be provided for the Sedan category and any 6+1 seat car can be provided for the SUV category. AC is not committed for Tempo Traveller categories. Cancellation on these grounds will result in forfeiture of the complete advance amount paid.
              </p>
              <p>
                <strong>Non-Discrimination:</strong> BroomBoom Cabs does not discriminate against drivers, third-party providers, or customers based on religion, caste, gender, or age. Any cancellation or refund request on these grounds will not be entertained and will result in forfeiture of advance amounts.
              </p>
              <p>
                <strong>Proof of Identity:</strong> You may be asked to provide proof of identity to access the Services and may be denied service if you refuse to do so.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 16. THIRD-PARTY SERVICES & CONTENT */}
          <section id="third-party-services" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">16</span>
              <span>Third-Party Services, User Requirements and Content</span>
            </h2>
            <p>
              The Services may be made available in connection with third-party content (including advertising) that BroomBoom Cabs does not control. BroomBoom Cabs does not endorse such third-party content and in no event shall be responsible or liable for any products or services of such third-party providers.
            </p>
            <p>
              All user conduct, luggage allowances, and non-discrimination provisions outlined in Section 15 apply equally when accessing or interacting with third-party providers across the BroomBoom platform.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Contact Support Section */}
          <section className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-amber-500" />
              <span>Questions Regarding User Terms?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              For any clarifications, grievances, or legal inquiries regarding these Terms of Use, please reach out to our legal and support team:
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
