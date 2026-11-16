import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  MapPin,
  Smartphone,
  PhoneCall,
  Mail,
  AlertCircle,
  HelpCircle,
  CreditCard,
  Building,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | BroomBoom Cabs — BTSPL",
  description:
    "Privacy Policy of BroomBoom Cabs (BroomBoom Transportation Services Private Limited). Learn how we collect, use, and protect your personal and trip information.",
  alternates: {
    canonical: "https://www.broomboomcabs.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0B1527] text-white pt-12 pb-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Legal Documentation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Privacy Policy of <span className="text-[#FBBF24]">BroomBoom Cabs</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-3xl mx-auto leading-relaxed">
            Your privacy matters to{" "}
            <strong className="text-white">
              BroomBoom Transportation Services Private Limited (BTSPL)
            </strong>
            . This policy explains what we collect, why we collect it, and the choices you have.
          </p>

          <div className="mt-4 text-xs text-amber-300/80 font-medium">
            Last updated: November 2026
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">

          {/* 1. Introduction */}
          <section id="introduction" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-amber-500 shrink-0" />
              <span>Introduction</span>
            </h2>
            <p>
              This Privacy Policy (“Policy”) describes the policies and procedures for the collection, use, disclosure and protection of your information when you use our website located at{" "}
              <Link href="https://www.broomboomcabs.com" target="_blank" className="text-amber-600 font-semibold hover:underline">
                www.broomboomcabs.com
              </Link>{" "}
              or the BroomBoom Cabs mobile application (collectively, the “BroomBoom Cabs Platform” or “BroomBoom Cabs App”). The terms “you” and “your” refer to the user of the Platform. The term “Services” refers to any services offered by BroomBoom Cabs whether on the BroomBoom Cabs Platform or otherwise.
            </p>
            <p>
              Please read this Policy before using the BroomBoom Cabs Platform or submitting any personal information to BroomBoom Cabs. This Policy is a part of, and is incorporated within, and is to be read along with, the applicable Terms and Conditions for the use of the BroomBoom Cabs Platform.
            </p>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-slate-800 text-xs sm:text-sm font-medium">
              By using the BroomBoom Cabs Platform and the Services, you agree and consent to the collection, transfer, use, storage, disclosure and sharing of your information as described in this Policy. If you do not agree with this Policy, please do not use or access the BroomBoom Cabs Platform.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 2. Definitions */}
          <section id="definitions" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Definitions
            </h2>
            <p className="text-xs text-slate-500">
              Unless otherwise provided in this Privacy Policy, the terms capitalised in this Privacy Policy shall have the meanings provided below:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {[
                { term: "Pilots", desc: "Independent third-party vehicle operators or riders who wish to offer services on the BroomBoom Cabs Platform to a User." },
                { term: "Customer", desc: "A person who wishes to receive the services of the Pilots on the BroomBoom Cabs Platform." },
                { term: "Co-branded Services", desc: "Services provided in association with third parties as defined in this Policy." },
                { term: "Device", desc: "A computer, mobile or other device used to access the Services." },
                { term: "Device Identifier", desc: "The IP address or another unique identifier for the Device." },
                { term: "Mobile Application", desc: "An application provided by us on the Device to access the Services." },
                { term: "Mobile Device Information", desc: "Information collected automatically from mobile devices when using the mobile application." },
                { term: "Promotion", desc: "Any contest or other promotion offered by us." },
                { term: "Protected Information", desc: "Categories of information that could reasonably be used to identify you personally, including your name, e-mail address, location and mobile number." },
                { term: "Third Party", desc: "A third-party service provider." },
                { term: "Usage Information", desc: "Information automatically collected when you visit or interact with the Services." },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                  <span className="font-bold text-slate-900 text-sm block mb-1">
                    {item.term}
                  </span>
                  <span className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 3. What Information Do We Collect? */}
          <section id="what-we-collect" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              What Information Do We Collect?
            </h2>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4">
              Information you provide to us
            </h3>
            <p>
              We may ask you to provide us with certain Protected Information. We may collect this information through various means and in various places through the Services, including account registration forms, contact-us forms, or when you otherwise interact with us. When you sign up to use the Services, you create a user profile. We shall ask you to provide only such Protected Information which is for a lawful purpose connected with our Services and necessary to be collected by us for such purpose.
            </p>
            <p>Information you give us includes information submitted when you:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700">
              <li>
                <strong>Create or update the BroomBoom Cabs account:</strong> which may include your email ID, name, address, mobile number, gender, date of birth, login name and password.
              </li>
              <li>
                <strong>Use our Services:</strong> we may collect and store information about you to process your requests and automatically complete forms for future transactions, including (but not limited to) your phone number, address, email and billing information.
              </li>
              <li>
                <strong>Customer Support:</strong> correspond with BroomBoom Cabs for customer support, or report problems for troubleshooting.
              </li>
              <li>
                <strong>Vendor or Pilot registration:</strong> we may collect location details, profile picture, copies of government identification documents and other KYC details, vehicle-related documents such as insurance and pollution certificates, documents evidencing the health or fitness of the vehicle to provide Services, and call and SMS details.
              </li>
            </ul>
            <p>
              We collect background check and identity verification information of the Pilots. This may include information such as driver’s history or criminal record (where permitted by law) and right to work. This information may be collected by an authorised vendor on the Company’s behalf. In case you sign up as a Pilot, you may enable features that require BroomBoom Cabs’s access to other applications on your Device, aiming to prevent fraud towards Customers.
            </p>
            <p>
              If you sign up to use our Services as an employee or as a stakeholder of a third party with whom the Company has an arrangement and has offered discount coupons or extended certain promotional offers, the Company may share any information provided by you with such third party, to be utilised by them for limited internal business purposes only.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-4">
              Information we collect as you access and use our services
            </h3>
            <p>
              In addition to any Protected Information or other information that you choose to submit to us, we and our third-party service providers may use a variety of technologies that automatically (or passively) collect certain information whenever you visit or interact with the Services (“Usage Information”). This Usage Information may include the browser you are using, the URL that referred you to our Services, all of the areas within our Services that you visit, and the time of day, among other information. In addition, we collect your Device Identifier for your Device.
            </p>
            <p>
              A Device Identifier is a number that is automatically assigned to your Device used to access the Services, and our computers identify your Device by its Device Identifier. Usage Information may be collected using a cookie. If you do not want information to be collected through the use of cookies, your browser allows you to deny or accept the use of cookies. Cookies can be disabled or controlled by setting a preference within your web browser or on your Device. If you choose to disable cookies or flash cookies on your Device, some features of the Services may not function properly, or we may not be able to customise information to you. The Company cannot control the use of cookies (or the resulting information) by third parties, and the use of third-party cookies is not covered by this Privacy Policy.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 4. Location Data, Device & Communications */}
          <section id="location-and-device-data" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <MapPin className="w-6 h-6 text-amber-500 shrink-0" />
              <span>Location Data, Device Data &amp; Communications</span>
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
              <h3 className="font-bold text-slate-900">Location Data Collection:</h3>
              <p>
                <strong>Pilots:</strong> BroomBoom Cabs collects location data when the BroomBoom Cabs App is running in the foreground (the app is open and on-screen) or background (the app is not in use) of their mobile device. BroomBoom Cabs collects location data only when the Pilots have enabled the “On-Duty” icon on the BroomBoom Cabs App.
              </p>
              <p>
                <strong>Customers:</strong> We collect precise or approximate location data from users’ mobile devices if they enable us to do so. The BroomBoom Cabs Pilot App collects this data from the time a ride is requested until it is finished, and any time the app is running in the foreground of the user’s mobile device. We use this data to enhance your use of our apps, including to improve pick-up locations, enable safety features, and prevent and detect fraud. The BroomBoom Cabs Pilot App collects the Pilots’ location data and links location data collected during a trip with the customer’s account, even if the Customer has not enabled us to collect location data from their device. This enables us to offer services to Customers such as receipt generation and customer support.
              </p>
            </div>

            <p>
              <strong>Information third parties provide about you:</strong> We may, from time to time, supplement the information we collect about you through our website, Mobile Application or Services with outside records from third parties.
            </p>
            <p>
              <strong>Device data:</strong> We may collect data about the devices used to access our services, including hardware models, device IP address or other unique device identifiers, operating systems and versions, software, preferred languages, advertising identifiers, device motion data and mobile network data.
            </p>
            <p>
              <strong>Communications data:</strong> We enable users to communicate with each other through the BroomBoom Cabs mobile app and websites. For example, we enable drivers and riders to call, text or send other files to each other (generally without disclosing their telephone numbers to each other). To provide this service, BroomBoom Cabs receives some data regarding calls, texts or other communications, including the date and time of the communications and the content of the communications. BroomBoom Cabs may also use this data for customer support services (including resolving disputes between users), for safety and security purposes, to improve our services and features, and for analytics.
            </p>
            <p>
              <strong>Safety recordings:</strong> In certain jurisdictions, and as permitted by law, users are offered an option to record the audio and/or video of their trips through an in-app feature or using a dashcam. In the BroomBoom Cabs App, recordings are encrypted and stored in the Company’s data, and are only shared if submitted to customer support by the users in connection with safety incidents.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 5. Contacts & Location Permissions */}
          <section id="contacts-and-permissions" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Smartphone className="w-6 h-6 text-amber-500 shrink-0" />
              <span>Contacts &amp; Mobile Permissions</span>
            </h2>

            <p>
              <strong>How does BroomBoom Cabs use contacts?</strong> The BroomBoom Cabs app supports connecting your phone’s contacts to your account. This feature allows the BroomBoom Cabs app to make personalised recommendations for you (such as suggesting which friends to invite). Contacts from your phone will sync to BroomBoom Cabs servers.
            </p>
            <p>The app will continue to ask for the contact permission if you use features that display your address book within the app, for example:</p>
            <ul className="list-disc list-inside pl-3 space-y-1">
              <li>Trusted Contacts</li>
              <li>Split Fares</li>
              <li>Invite a Friend</li>
            </ul>
            <p>
              BroomBoom Cabs will continue to store the information of specific contacts that you select when you use those features, such as the friends you split fares with.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-3">
              How BroomBoom Cabs uses rider location information (Android)
            </h3>
            <p>
              You’ll see a request prompted by your device for permission to share your location information when you sign up for BroomBoom Cabs, which includes location data collected via Bluetooth and nearby Wi-Fi signals. As a default, for the best service available, the app asks you to turn on location services with “Allow only while using the app”. We use location data to find drivers near you and help them navigate to your pickup spot. We also use it to display trip history in your receipts, to understand and resolve support tickets, and to troubleshoot and solve software bugs.
            </p>
            <div className="space-y-2.5 pl-3 border-l-2 border-slate-200">
              <p>
                <strong>Allow all the time:</strong> We may collect location information at any time, even when you are not actively using the BroomBoom Cabs App. If a service needs “Allow all the time”, we’ll ask for your permission when you enable the service.
              </p>
              <p>
                <strong>Allow only while using the app:</strong> Location is collected only while the app is in active use.
              </p>
              <p>
                <strong>Deny:</strong> This option disables location services for the BroomBoom Cabs app. You can still use the app, but you’ll need to enter your pickup and drop-off locations manually. Location information will be collected from the driver during your trip and linked to your account, even if you have disabled location services for your app.
              </p>
            </div>
            <p className="text-xs text-slate-500">
              You can always manage your location settings in your device’s location preferences.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-3">
              Sharing with cities and governments
            </h3>
            <p>
              In some instances, we are required to share information about the trips taken on our service with cities, governments and local transportation authorities. To meet these requirements, we collect geolocation and timestamp data from the devices, bikes and scooters on our platform. This data provides cities with information on where each trip starts, stops, and the route taken. None of the trip data we provide to cities is collected from your personal mobile device or directly identifies you.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 6. Contents of your data download */}
          <section id="data-download" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contents of Your Data Download
            </h2>
            <p>
              Depending on how you use the BroomBoom Cabs platform, the contents of your data download may include the following:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Account Data:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-slate-600">
                  <li>Name, email address, mobile number, ratings, and registration date</li>
                  <li>Referral codes issued by BroomBoom Cabs</li>
                  <li>Payment method info (bank name, billing country, card type)</li>
                  <li>Metadata about customer support conversations</li>
                  <li>Names and addresses of saved places</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Rider Data:</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-slate-600">
                  <li>Times and locations of ride requests, starts, and ends</li>
                  <li>Distance travelled, trip prices and currency</li>
                  <li>30 days of mobile event data (OS, model, language, app version)</li>
                  <li>In-app communication records between riders and drivers</li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 7. How We Use Personal Data */}
          <section id="how-we-use-data" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              How We Use Personal Data
            </h2>
            <p>
              BroomBoom Cabs uses personal data to enable reliable and convenient transportation and other products and services. We also use such data:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
              <li>To enhance the safety and security of our users and services</li>
              <li>For customer support</li>
              <li>For research and development</li>
              <li>To enable communications between users</li>
              <li>To send marketing and non-marketing communications to users</li>
              <li>In connection with legal proceedings</li>
            </ul>
            <p className="font-semibold text-slate-900">
              BroomBoom Cabs does not sell or share user personal data with third parties for their direct marketing, except with users’ consent.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <h4 className="font-bold text-slate-900 text-base">1. To provide our services</h4>
                <p className="mt-1">
                  BroomBoom Cabs uses data to provide, personalise, maintain and improve our services. This includes using data to create and update accounts, enable transportation and drop-off services, process payments, track and share the progress of rides, create travel itineraries, facilitate insurance or vehicle solutions, and perform operational troubleshooting.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base">2. Safety and security</h4>
                <p className="mt-1">
                  We use personal data to help maintain safety, security, and integrity across our services. This includes verifying identities and background checks of pilots, detecting unsafe driving behavior (speeding, harsh braking), preventing fraudulent accounts or unauthorized use, monitoring ratings and incident reports, and preventing conflict between users.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base">3. Customer support</h4>
                <p className="mt-1">
                  BroomBoom Cabs uses the information we collect (which may include call recordings) to provide customer support, investigate user concerns, and improve our response workflows.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base">4. Research and development</h4>
                <p className="mt-1">
                  We may use personal data for testing, research, analysis, product development and machine learning to improve user experience, enhance safety, and develop new features.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base">5. Enabling communications between users</h4>
                <p className="mt-1">
                  We facilitate communications between drivers and riders to coordinate pickups, locate lost items, or fulfill orders without exposing personal telephone numbers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base">6. Marketing</h4>
                <p className="mt-1">
                  We may send information regarding promotions, surveys, news, and updates. We do not sell user data to third parties for their independent marketing without consent.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base">7. Non-marketing communications</h4>
                <p className="mt-1">
                  We generate ride receipts, notify users of policy or service updates, and send essential account service announcements.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base">8. Legal proceedings and requirements</h4>
                <p className="mt-1">
                  We use personal data to investigate disputes, satisfy statutory laws and legal processes, or address law enforcement requests as mandated by applicable law.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 8. Information Collected by Mobile Applications */}
          <section id="mobile-app-info" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Information Collected by Mobile Applications
            </h2>
            <p>
              Our Services are primarily provided through the Mobile Application. We may collect and use technical data and related information, including but not limited to technical information about your device, system and application software, and peripherals, that is gathered periodically to facilitate the provision of software updates, product support and other services to you.
            </p>
            <p>
              When you use any of our Mobile Applications, the application may automatically collect and store technical details such as your preferred language, device manufacturer and model, operating system, mobile browser, geolocation, user interaction patterns, and SMS/text data for one-time passwords (OTP) and device authentication during transactions.
            </p>
            <p>
              We do not share or transfer SMS data to any third party other than as provided under this Privacy Policy. For vendors or Pilots, we additionally record calls made through the app to provide services, call details, SMS details, and location tracking.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 9. Use of Information Collected */}
          <section id="use-of-info" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Use of Information Collected
            </h2>
            <p>
              Our primary goal in collecting your information is to provide you with an enhanced experience when using the Services. We use your information to closely monitor which features are used most, allow you to view trip history, diagnose server problems, send necessary account verification, and prevent fraudulent activity.
            </p>
            <p>
              We provide essential Protected Information (such as your name, pickup address, and contact number) to the Pilot who accepts your transportation request so that the Pilot can find and contact you.
            </p>
            <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
              Note: We do not use the personal information collected from you for targeted third-party advertising.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 10. Third Parties & Sharing */}
          <section id="third-parties" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              How and When Do We Disclose Information to Third Parties
            </h2>
            <p>
              We do not sell, share, rent or trade the information we have collected about you, other than as disclosed within this Privacy Policy. Information may be shared under the following conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
              <li>
                <strong>Third-party service providers:</strong> Companies performing services on our behalf (e.g. hosting, analytics, anti-fraud, payment processing, technical maintenance).
              </li>
              <li>
                <strong>Co-branded Services:</strong> Financial, loan, or corporate partners offering integrated services where users choose to participate.
              </li>
              <li>
                <strong>Administrative and legal reasons:</strong> Cooperating with law enforcement, court orders, or governmental requests to address illegal activities or security hazards.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with corporate reorganizations, mergers, acquisitions, or asset transfers.
              </li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* 11. Cancellation Fee */}
          <section id="cancellation-fee" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
              <span>Cancellation Fee &amp; Policy</span>
            </h2>
            <p>
              If you feel that you were charged a cancellation fee incorrectly, you can request a Cancellation Fee Waiver. Based on your ride case study, the Company will decide whether your request will be approved or not.
            </p>
            <p>
              A cancellation fee is charged to compensate drivers for the time, effort and fuel spent while trying to reach the pickup location and waiting for the customer.
            </p>
            <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl space-y-2 text-xs sm:text-sm text-slate-800">
              <p className="font-bold">You may be charged a cancellation fee if any one of the following occurs:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>A trip is cancelled after 3 (three) minutes or later from the time of acceptance by the driver;</li>
                <li>A driver cancels the booking after waiting at your pickup location for 5 minutes or more;</li>
                <li>If a ride does not start within 30 minutes from pickup time after the arrival of the Pilot at the pickup location.</li>
              </ul>
              <p className="text-slate-700 pt-1">
                In fully confirmed pre-scheduled rides or real-time based confirmed rides, 100% cancellation charges are applied on the full amount. No refund or return is initiated in fully confirmed rides.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 12. Account Changes, Security & Conduct */}
          <section id="account-changes-and-security" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Lock className="w-6 h-6 text-amber-500 shrink-0" />
              <span>Change of Information, Account Cancellation &amp; Security</span>
            </h2>
            <p>
              You are responsible for maintaining the accuracy of the information you submit. You may update or correct details through your account profile or by contacting our support team. We retain information as long as your account is active and as necessary to comply with statutory and regulatory obligations.
            </p>
            <p>
              We employ administrative, technical, and physical safeguards designed to protect personal information. However, no internet transmission is 100% secure.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-3">
              User Requirements and Conduct
            </h3>
            <p>
              You shall not have any right in determining or classifying the Services in accordance with the type of fuel, specific car model, brand, manufacturer, or registration number. Any 4+1 seat car can be provided for the Sedan category and any 6+1 seat car can be provided for the SUV category. AC is not committed for Tempo Traveller categories.
            </p>
            <p>
              BroomBoom Cabs does not discriminate against drivers, third-party providers, or customers based on religion, caste, gender, or age. Any demand for cancellation or refund on these grounds will result in forfeiture of the complete advance amount paid.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 13. Payment & Payment Options */}
          <section id="payment-options" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <CreditCard className="w-6 h-6 text-amber-500 shrink-0" />
              <span>Payment and Payment Options</span>
            </h2>
            <p>
              Charges will be inclusive of applicable taxes where required by law. Charges paid by you are final and non-refundable, unless otherwise determined by BroomBoom Cabs at its sole discretion.
            </p>
            <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-xl space-y-2.5 text-xs sm:text-sm text-slate-700">
              <p>
                <strong>Toll, State Permit &amp; Parking:</strong> BroomBoom Cabs and the Third-Party Provider shall not be liable for any inter-state tax levied on the vehicle during the ride, such as MCD Toll Tax, Central or State Toll Tax, or parking tickets. You are responsible for collecting receipts and settling these directly with the Pilot at actuals.
              </p>
              <p>
                <strong>Direct Driver Payments:</strong> BroomBoom Cabs has no role in, and shall be indemnified where, the driver or Third-Party Provider demands money before onboarding the cab. You must not pay anything to a driver before onboarding the cab. BroomBoom Cabs shall not be liable for any unauthorized extra payment made to a driver.
              </p>
              <p>
                <strong>Trip Shortening:</strong> You are liable to pay the full trip package price if you decide to shorten your trip for any reason whatsoever.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 14. Limitation of Liability */}
          <section id="liability" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Limitation of Liability
            </h2>
            <p>
              BroomBoom Cabs shall not be liable for any direct, indirect, incidental, special, exemplary, punitive or consequential damages whatsoever, including lost profits, personal injury, or property damage related to or resulting from any use of the services.
            </p>
            <p>
              BroomBoom Cabs shall not be liable for missed trains, flights, or events, as the Service is dependent on traffic, weather, and external factors beyond control. The advance payment procedure is only for confirmation of your booking; this advance is non-refundable. BroomBoom Cabs acts to connect you with independent pilots.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 15. Contact Us */}
          <section id="contact-us" className="space-y-4 bg-amber-50/50 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Building className="w-6 h-6 text-amber-500 shrink-0" />
              <span>Contact Us</span>
            </h2>
            <p className="text-slate-700">
              If you have questions, concerns or requests about this Privacy Policy or how your information is handled, please reach out to us:
            </p>
            <div className="pt-2 space-y-2 text-sm text-slate-800">
              <p className="font-bold text-base text-slate-950">
                BroomBoom Transportation Services Private Limited (BTSPL)
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Website:</span>
                <Link href="https://www.broomboomcabs.com" target="_blank" className="text-amber-700 hover:underline">
                  www.broomboomcabs.com
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <a href="tel:+918240765499" className="text-slate-800 hover:text-amber-600 font-medium">
                  +91 82407 65499
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600" />
                <a href="mailto:support@broomboomcabs.com" className="text-slate-800 hover:text-amber-600 font-medium">
                  support@broomboomcabs.com
                </a>
              </p>
            </div>
            <p className="text-xs text-slate-500 pt-2">
              You can also reach us through the Support section of the BroomBoom Cabs mobile application.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
