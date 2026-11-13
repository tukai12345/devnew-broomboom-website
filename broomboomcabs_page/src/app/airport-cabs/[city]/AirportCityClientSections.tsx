"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Clock,
  Sparkles,
  Plane,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Navigation,
  Compass,
  Building,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Train,
} from "lucide-react";
import { CityServiceInfo } from "@/data/cityServicesData";

interface AirportCityClientSectionsProps {
  cityData: CityServiceInfo;
}

export const AirportCityClientSections: React.FC<
  AirportCityClientSectionsProps
> = ({ cityData }) => {
  const cityName = cityData.cityName;
  const airportCode = cityData.airportCode || "CCU";

  const scrollToHeroSearch = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fares = [
    {
      vehicle: "Hatchback",
      model: "Wagon-R, Indica or similar",
      capacity: "4 Passengers • 2 Bags",
      rate: "Rs. 8 / km",
      highlight: "Economy Airport Transfer",
    },
    {
      vehicle: "Prime Sedan",
      model: "Dzire, Etios or similar",
      capacity: "4 Passengers • 3 Bags",
      rate: "Rs. 10 / km",
      highlight: "Executive Comfort",
    },
    {
      vehicle: "Prime SUV",
      model: "Xylo, Ertiga or similar",
      capacity: "6 Passengers • 4 Bags",
      rate: "Rs. 15 / km",
      highlight: "Family & Heavy Luggage",
    },
    {
      vehicle: "Assured Innova",
      model: "Innova, Innova Crysta",
      capacity: "6-7 Passengers • 5 Bags",
      rate: "Rs. 17 / km",
      highlight: "Premium VIP Transfer",
    },
  ];

  // Comprehensive Categorized Directory Links
  const linksCategories = [
    {
      category: "Kolkata City Localities & Taxi Services",
      icon: <MapPin className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Taxi Service in Alipore", href: "/taxi-service/alipore" },
        { label: "Taxi Service in Ballygunge", href: "/taxi-service/Ballygunge" },
        { label: "Taxi Service in Barabazar", href: "/taxi-service/Barabazar" },
        { label: "Taxi Service in Chandannagar", href: "/taxi-service/Chandannagar" },
        { label: "Taxi Service in New Town-Kolkata", href: "/taxi-service-New/Town-Kolkata" },
        { label: "Howrah Junction to Kolkata Airport Taxi Fare", href: "/taxi-service/howrah-junction-to-kolkata-airport-taxi-fare" },
        { label: "Dharmatala to Shalimar Station Taxi Fare", href: "/taxi-service/dharmatala-to-shalimar-station-taxi-fare" },
        { label: "Kolkata Airport to Kolkata Station Taxi Fare", href: "/taxi-service/kolkata-airport-to-kolkata-station-taxi-fare" },
      ],
    },
    {
      category: "Bagdogra Airport & North Bengal Cabs",
      icon: <Plane className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Bagdogra to Sikkim Taxi", href: "/taxi-service/bagdogra-to-sikkim-cabs" },
        { label: "Bagdogra to Kalimpong Taxi Fare", href: "/taxi-service/bagdogra-to-kalimpong-taxi-fare" },
        { label: "Bagdogra to Darjeeling Taxi", href: "/taxi-service/bagdogra-to-darjeeling-taxi-fare" },
        { label: "Bagdogra to Pelling Taxi Fare", href: "/taxi-service/bagdogra-to-pelling-taxi-fare" },
        { label: "Bagdogra to Rangpo Taxi Fare", href: "/taxi-service/bagdogra-to-rangpo-taxi-fare" },
        { label: "Bagdogra to Jaigaon Taxi Fare", href: "/taxi-service/bagdogra-to-jaigaon-taxi-fare" },
        { label: "Bagdogra to Yumthang Valley Taxi Fare", href: "/taxi-service/bagdogra-to-yumthang-valley-taxi-fare" },
        { label: "Bagdogra to Thimpu Taxi Fare", href: "/taxi-service/bagdogra-to-thimpu-taxi-fare" },
        { label: "Bagdogra to New Jalpaiguri Taxi Fare", href: "/taxi-service/bagdogra-to-new-jalpaiguri-taxi-fare" },
        { label: "Bagdogra to Mirik Taxi Fare", href: "/taxi-service/bagdogra-to-mirik-taxi-fare" },
        { label: "Bagdogra to Lachen Taxi Fare", href: "/taxi-service/bagdogra-to-lachen-taxi-fare" },
      ],
    },
    {
      category: "Mumbai Airport & City Transfer Routes",
      icon: <Car className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Mumbai to Nashik Taxi Fare", href: "/taxi-service/mumbai-to-nashik-taxi-fare" },
        { label: "Mumbai to Vadodara Cabs", href: "/taxi-service/mumbai-to-vadodara-taxi-fare" },
        { label: "Mumbai to Ahmedabad Taxi Fare", href: "/taxi-service/mumbai-to-ahmedabad-taxi-fare" },
        { label: "Chembur to Colaba Taxi Fare", href: "/taxi-service/chembur-to-colaba-taxi-fare" },
        { label: "Andheri East to Mumbai Central Taxi Fare", href: "/taxi-service/andheri-east-to-mumbai-central-taxi-fare" },
        { label: "Andheri East to Bandra Taxi Fare", href: "/taxi-service/andheri-east-to-bandra-taxi-fare" },
        { label: "Andheri East to Borivali Taxi Fare", href: "/taxi-service/andheri-east-to-borivali-taxi-fare" },
        { label: "Andheri East to Goregaon Taxi Fare", href: "/taxi-service/andheri-east-to-goregaon-taxi-fare" },
        { label: "Andheri East to Dadar Taxi Fare", href: "/taxi-service/andheri-east-to-dadar-taxi-fare" },
        { label: "Andheri East to Mumbai Airport Taxi Fare", href: "/taxi-service/andheri-east-to-mumbai-airport-taxi-fare" },
        { label: "Andheri East to Nariman Point Taxi Fare", href: "/taxi-service/andheri-east-to-nariman-point-taxi-fare" },
        { label: "Andheri East to Powai Taxi Fare", href: "/taxi-service/andheri-east-to-powai-taxi-fare" },
        { label: "Andheri East to Worli Taxi Fare", href: "/taxi-service/andheri-east-to-worli-taxi-fare" },
        { label: "Bandra to Mumbai Taxi", href: "/taxi-service/bandra-to-mumbai-taxi" },
        { label: "Bandra to Lower Parel Taxi Fare", href: "/taxi-service/bandra-to-lower-parel-taxi-fare" },
      ],
    },
    {
      category: "Visit Temples in Kolkata (Pilgrimage Taxi)",
      icon: <Compass className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Dakshineswar Kali Temple Taxi Service", href: "/taxi-service-temple-kolkata/dakhineswar" },
        { label: "Kalighat Kali Temple Taxi Service", href: "/taxi-service-temple-kolkata/kalighat" },
        { label: "Belur Math Taxi Service", href: "/taxi-service-temple-kolkata/belurmath" },
        { label: "Tarakeswar Temple Taxi Service", href: "/taxi-service-temple-kolkata/tarakeswar" },
        { label: "ISKCON (Mayapur) Taxi Service", href: "/taxi-service-temple-kolkata/iskcon%28mayapur%29" },
        { label: "Hangseshwari Temple Taxi Service", href: "/taxi-service-temple-kolkata/hangseswari" },
        { label: "Tarapith Temple Taxi Service", href: "/taxi-service-temple-kolkata/tarapith" },
        { label: "108 Shiva Mandir Taxi Service", href: "/taxi-service-temple-kolkata/108sibamandir" },
        { label: "Jagannath Temple Puri Taxi Service", href: "/taxi-service-temple-kolkata/jagannathtemplepuri" },
      ],
    },
    {
      category: "Shopping Malls Taxi Service in Kolkata",
      icon: <ShoppingBag className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "South City Mall Taxi Service", href: "/taxi-service/southcitymallkolkata" },
        { label: "City Center 1 Mall Taxi Service", href: "/taxi-service-shoppingmalls-kolkata/citycenter1mall" },
        { label: "Quest Mall Taxi Service", href: "/taxi-service-shoppingmalls-kolkata/questmall" },
        { label: "Avani Riverside Mall Taxi Service", href: "/taxi-service-shoppingmalls-kolkata/avaniriversidemall" },
        { label: "Acropolis Mall Taxi Service", href: "/taxi-service-shoppingmalls-kolkata/acropolismall" },
      ],
    },
    {
      category: "Office & Tech Park Pickup & Drop in Kolkata",
      icon: <Building className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "TCS Pickup & Drop in Kolkata", href: "/corporate-pick-drop-kolkata/tcs" },
        { label: "Technopolis Pickup & Drop in Kolkata", href: "/corporate-pick-drop-kolkata/technopolis" },
        { label: "Wipro Pickup & Drop in Kolkata", href: "/corporate-pick-drop-kolkata/wipro" },
        { label: "Infosys Pickup & Drop in Kolkata", href: "/corporate-pick-drop-kolkata/infosys" },
        { label: "HCL Pickup & Drop in Kolkata", href: "/corporate-pick-drop-kolkata/hcl" },
        { label: "Cognizant Pickup & Drop in Kolkata", href: "/corporate-pick-drop-kolkata/cognizant" },
        { label: "Concentrix Pickup & Drop in Kolkata", href: "/corporate-pick-drop-kolkata/concentrix" },
        { label: "Accenture Pickup & Drop in Kolkata", href: "/corporate-pick-drop-kolkata/accenture" },
      ],
    },
    {
      category: "Airport Taxi Service Kolkata to Key Cities",
      icon: <Plane className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Kolkata Airport to Gangasagar Cabs", href: "/taxi-service/kolkata-airport-to-gangasagar-cabs" },
        { label: "Kolkata Airport to Digha Cabs", href: "/taxi-service/kolkata-airport-to-digha-cabs" },
        { label: "Kolkata Airport to Mandarmani Cabs", href: "/taxi-service/kolkata-airport-to-mandarmani-cabs" },
        { label: "Kolkata Airport to Siliguri Cabs", href: "/taxi-service/kolkata-airport-to-siliguri-cabs" },
        { label: "Kolkata Airport To Gangtok Cabs", href: "/taxi-service/kolkata-airport-to-gangtok-cabs" },
        { label: "Kolkata Airport to Haldia Taxi Fare", href: "/taxi-service/kolkata-airport-to-haldia-taxi-fare" },
        { label: "Kolkata Airport to Jaipur Taxi Fare", href: "/taxi-service/kolkata-airport-to-jaipur-taxi-fare" },
        { label: "Kolkata Airport to Visakhapatnam Taxi Fare", href: "/taxi-service/kolkata-airport-to-visakhapatnam-taxi-fare" },
        { label: "Kolkata Airport to Delhi Cabs", href: "/taxi-service/kolkata-airport-to-delhi-cabs" },
        { label: "Kolkata Airport to Varanasi Cabs", href: "/taxi-service/kolkata-airport-to-varanasi-cabs" },
        { label: "Kolkata Airport to Manali Taxi Fare", href: "/taxi-service/kolkata-airport-to-manali-taxi-fare" },
        { label: "Kolkata Airport to Bangalore Cabs", href: "/taxi-service/kolkata-airport-to-bangalore-cabs" },
        { label: "Kolkata Airport to Bhubaneswar Cabs", href: "/taxi-service/kolkata-airport-to-bhubaneswar-cabs" },
        { label: "Kolkata Airport to Patna Taxi Fare", href: "/taxi-service/kolkata-airport-to-patna-taxi-fare" },
        { label: "Kolkata Airport to Ranchi Taxi Fare", href: "/taxi-service/kolkata-airport-to-ranchi-taxi-fare" },
        { label: "Kolkata Airport to Jamshedpur Taxi Fare", href: "/taxi-service/kolkata-airport-to-jamshedpur-taxi-fare" },
        { label: "Kolkata Airport to Guwahati Taxi Fare", href: "/taxi-service/kolkata-airport-to-guwahati-taxi-fare" },
        { label: "Kolkata Airport to Muzaffarpur Taxi Fare", href: "/taxi-service/kolkata-airport-to-muzaffarpur-taxi-fare" },
        { label: "Kolkata Airport to Malda Cabs", href: "/taxi-service/kolkata-airport-to-malda-cabs" },
        { label: "Kolkata Airport to Budge Budge Cabs", href: "/taxi-service/kolkata-airport-to-budge-budge-cabs" },
        { label: "Kolkata Airport to Barasat Cab", href: "/taxi-service/kolkata-airport-to-barasat-cabs" },
        { label: "Kolkata Airport to Serampore Cabs", href: "/taxi-service/kolkata-airport-to-serampore-cabs" },
        { label: "Kolkata Airport to Howrah Cabs", href: "/taxi-service/kolkata-airport-to-howrah-cabs" },
        { label: "Kolkata Airport to Sodepur Cabs", href: "/taxi-service/kolkata-airport-to-sodepur-cabs" },
        { label: "Kolkata Airport to Kalyani Cabs", href: "/taxi-service/kolkata-airport-to-kalyani-cabs" },
        { label: "Kolkata Airport to Burdwan Cabs", href: "/taxi-service/kolkata-airport-to-burdwan-cabs" },
        { label: "Kolkata Airport to Sunderban Cabs", href: "/taxi-service/kolkata-airport-to-sunderban-cabs" },
        { label: "Kolkata Airport to Shantiniketan Cabs", href: "/taxi-service/kolkata-airport-to-shantiniketan-cabs" },
        { label: "Kolkata Airport to Bolpur Cabs", href: "/taxi-service/kolkata-airport-to-bolpur-cabs" },
        { label: "Kolkata Airport to Durgapur Cabs", href: "/taxi-service/kolkata-airport-to-durgapur-cabs" },
        { label: "Kolkata Airport to Kharagpur Taxi", href: "/taxi-service/kolkata-airport-to-kharagpur-taxi" },
        { label: "Kolkata Airport to Bakkhali Cabs", href: "/taxi-service/kolkata-airport-to-bakkhali-cabs" },
        { label: "Kolkata Airport to Murshidabad Cabs", href: "/taxi-service/kolkata-airport-to-murshidabad-cabs" },
        { label: "Kolkata Airport to Asansol Cabs", href: "/taxi-service/kolkata-airport-to-asansol-cabs" },
        { label: "Kolkata Airport to Tarapith Cabs", href: "/taxi-service/kolkata-airport-to-tarapith-cabs" },
        { label: "Kolkata Airport to Behala Cabs", href: "/taxi-service/kolkata-airport-to-behala-cabs" },
        { label: "Kolkata Airport to Krishnanagar Cabs", href: "/taxi-service/kolkata-airport-to-krishnanagar-cabs" },
        { label: "Kolkata Airport to Chennai Cabs", href: "/taxi-service/kolkata-airport-to-chennai-cabs" },
      ],
    },
    {
      category: "Taxi Service From & To Kolkata",
      icon: <Navigation className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Kolkata to Mandarmani Cabs", href: "/kolkata/kolkata-to-mandarmani-cabs" },
        { label: "Kolkata to Digha Cabs", href: "/kolkata/kolkata-to-digha-cabs" },
        { label: "Kolkata to Puri Cabs", href: "/kolkata/kolkata-to-puri-cabs" },
        { label: "Kolkata to Howrah Cabs", href: "/kolkata/kolkata-to-howrah-cabs" },
        { label: "Kolkata to Kharagpur Cabs", href: "/kolkata-to-kharagpur/cabs" },
        { label: "Kolkata to Jalpaiguri Cabs", href: "/kolkata-to-jalpaiguri/cabs" },
        { label: "Kolkata to Murshidabad Cabs", href: "/kolkata-to-murshidabad/cabs" },
        { label: "Kolkata to Darjeeling Cabs", href: "/kolkata-to-darjeeling/cabs" },
        { label: "Kolkata to Siliguri Cabs", href: "/taxi-service-kolkata-to-siliguri/cabs" },
        { label: "Kolkata to Delhi Cabs", href: "/kolkata/kolkata-to-delhi-cabs" },
        { label: "Kolkata to Sundarban Cabs", href: "/kolkata/kolkata-to-sundarban-cabs" },
        { label: "Kolkata to Santiniketan Cabs", href: "/kolkata/kolkata-to-santiniketan-cabs" },
        { label: "Kolkata to Bangalore Cabs", href: "/kolkata/kolkata-to-bangalore-cabs" },
        { label: "Kolkata to Mumbai Cabs", href: "/kolkata/kolkata-to-mumbai-cabs" },
        { label: "Kalyani to Kolkata Cabs", href: "/taxi-service/kalyanitokolkatacabs" },
        { label: "Puri to Kolkata Cabs", href: "/taxi-service/puritokolkatacabs" },
        { label: "Ranchi to Kolkata Cabs", href: "/taxi-service/ranchitokolkatacabs" },
        { label: "Asansol to Kolkata Cabs", href: "/taxi-service-asansol-to-kolkata/cabs" },
        { label: "Digha to Kolkata Cab", href: "/taxi-service-digha-to-kolkata/cab" },
      ],
    },
    {
      category: "Tempo Traveller & Car Rentals",
      icon: <Car className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "13 Seater Tempo Traveller on rent in Kolkata", href: "/car-rental/13-seater-tempo-traveller-on-rent-in-kolkata" },
        { label: "17 Seater Tempo Traveller on rent in Kolkata", href: "/car-rental/17-seater-tempo-traveller-on-rent-in-kolkata" },
        { label: "20 Seater Tempo Traveller on rent in Kolkata", href: "/car-rental/20-seater-tempo-traveller-on-rent-in-kolkata" },
        { label: "26 Seater Force Traveller on rent in Kolkata", href: "/car-rental/26-seater-force-traveller-on-rent-in-kolkata" },
        { label: "8 Seater Car for Rent in Hyderabad", href: "/car-rental/8-seater-car-for-rent-in-hyderabad" },
        { label: "Durga Puja Car Rental Packages", href: "/car-rental/durga-puja-car-rental-packages" },
        { label: "Kolkata Durga Puja Pandal 2024", href: "/durga-puja/kolkata-durga-puja-pandal-2024" },
        { label: "Kolkata Durga Puja Taxi for Pandal Sightseeing", href: "/taxi-service/kolkata-durga-puja-taxi-for-pandal-sightseeing" },
        { label: "Taxi Service in Puri", href: "/car-rental/taxi-service-in-puri" },
      ],
    },
    {
      category: "Hyderabad Airport Transfers & Self-Drive Cabs",
      icon: <Navigation className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Hyderabad Airport to Secunderabad Taxi Fare", href: "/taxi-service/hyderabad-airport-to-secunderabad-taxi-fare" },
        { label: "Hyderabad Airport to Warangal Taxi Fare", href: "/taxi-service/hyderabad-airport-to-warangal-taxi-fare" },
        { label: "Hyderabad Airport to Abids Taxi Fare", href: "/taxi-service/hyderabad-airport-to-abids-taxi-fare" },
        { label: "Hyderabad Airport to Ameerpet Taxi Fare", href: "/taxi-service/hyderabad-airport-to-ameerpet-taxi-fare" },
        { label: "Hyderabad Airport to Banjara Hills Taxi Fare", href: "/taxi-service/hyderabad-airport-to-banjara-hills-taxi-fare" },
        { label: "Hyderabad Airport to Begumpet Taxi Fare", href: "/taxi-service/hyderabad-airport-to-begumpet-taxi-fare" },
        { label: "Hyderabad Airport to Charminar Taxi Fare", href: "/taxi-service/hyderabad-airport-to-charminar-taxi-fare" },
        { label: "Hyderabad Airport to Kukatpally Taxi Fare", href: "/taxi-service/hyderabad-airport-to-kukatpally-taxi-fare" },
        { label: "Hyderabad airport to Hitech city taxi fare", href: "/taxi-service/hyderabad-airport-to-hitech-city-taxi-fare" },
        { label: "Rent a Car in Hyderabad for a Day Self Drive", href: "/self-driven/rent-a-car-in-hyderabad-for-a-day-self-drive" },
        { label: "Best Self Drive Car Rentals Hyderabad", href: "/self-driven/best-self-drive-car-rentals-hyderabad" },
      ],
    },
    {
      category: "Reserved Airport Cabs & Himalayan Routes",
      icon: <Plane className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Bagdogra Airport to Sikkim Reserved Cab Services", href: "/reserved-cabs/bagdogra-airport-to-sikkim" },
        { label: "Bagdogra Airport to Kalimpong Reserved Cab Service", href: "/reserved-cabs/bagdogra-airport-to-kalimpong" },
        { label: "Bagdogra Airport to Nepal Reserved Cab Services", href: "/reserved-cabs/bagdogra-airport-to-nepal" },
        { label: "Guwahati Airport to Shillong Reserved Cab Service", href: "/reserved-cabs/guwahati-airport-to-shillong" },
      ],
    },
  ];

  const airportTravelModes = [
    { title: `Half Day Cab in ${cityName}`, desc: `4-5 hours local disposal from ${airportCode} airport for meetings, temple visits & shopping.` },
    { title: `Full Day Cab in ${cityName}`, desc: `8-12 hours flexible package with unlimited stops across ${cityName} city & business parks.` },
    { title: `One Way Cab from ${cityName}`, desc: `Direct point-to-point airport drops to neighboring districts and cities with zero return fare.` },
    { title: `One Way Cab to ${cityName}`, desc: `Doorstep pickup from home, office or hotel directly to ${airportCode} departure terminals.` },
    { title: `Round Trip from ${cityName}`, desc: `Dedicated verified chauffeur stays with you for comfortable intercity round-trip travel.` },
    { title: `Round Trip to ${cityName}`, desc: `Round-trip airport transfers with live flight tracking and zero flight delay penalties.` },
  ];

  return (
    <div id="airport-cabs-custom-sections" className="w-full bg-slate-50/60 py-8 space-y-16">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 3 IMAGE FEATURE CARDS */}
        <div className="space-y-12">
          
          {/* Card 1: Left Image, Right Content */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group">
                  <Image
                    src="/images/airport-cabs-kolkata-terminal.jpg"
                    alt={`Airport Cabs in ${cityName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    {airportCode} Terminal Transfer
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Plane className="w-3.5 h-3.5" />
                  <span>On-Time Flight Guarantee • Zero Surge</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Airport Cabs in {cityName}
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Never miss a flight with BroomBoom Cabs services. You can book the best airport cabs in {cityName} from BroomBoom Cabs in advance at no extra charge. Be it to or fro from Netaji Subhas Chandra Bose International airport ({cityName} Airport, CCU), we provide the best airport cabs in {cityName} for your city sightseeing or intercity rides at the best-discounted rate.
                  </p>
                  <p>
                    Catch the flights on time by having a swift comfortable airport transfer ride in Prime Sedan like Swift Dzire, Tata Indigo, or Prime SUV like Ertiga, Innova Crysta or Innova Cars. Our expert {cityName} cab drivers will take you to the airport taxi on time. Airport Transfer service in {cityName} International Airport Terminal or {cityName} Domestic Airport Terminal is for all commuters who are reaching the airport and planning to visit other locales of the place with heavy luggage bags in the car&apos;s deck.
                  </p>
                  <p>
                    Schedule your booking at any hour of the day or night in advance for airport taxi services in {cityName} to remain tension free for your ride. Your ride is our responsibility and we love to provide you an excellent airport transfer services in {cityName} airport through the ride rental package selected by you. Netaji Subhash Chandra Bose International Airport (CCU) Terminal Airport Transfer cab packages includes a hygienic car with a professional verified chauffeur. These pilots undergo documents verification time to time to ensure your complete safety throughout the airport cab rides.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Verified Chauffeurs</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ 45 Mins Free Wait Time</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Heavy Luggage Assistance</span>
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: Right Image, Left Content */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Train className="w-3.5 h-3.5" />
                  <span>Station to Airport & Flight Tracking</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {cityName} Airport taxi
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    We all look for different {cityName} airport taxi service options for our trip depending on the itinerary, where at BroomBoom Cabs you can book all types of airport cabs like Sedan, SUV, Tempo traveller, Winger AC Top model to take you quickly to the airport terminal.
                  </p>
                  <p>
                    For commuters, BroomBoom Cabs brings pre schedule ride facility where you can book Airport to station transfer cabs in advance. Even, you can also modify your pickup time with us at no extra charges. Our {cityName} airport taxi are far affordable than other cab services as other cab services or taxi services also have high waiting charges whereas we try to provide you all the benefits and facilities at the cheapest rates as your ride is our responsibility to provide you the most reliable and quickest airport to station transfer cabs.
                  </p>
                  <p>
                    We all search for station to airport transfer cabs that can wait for us even at an odd hours. If you are travelling in train and don&apos;t know at what time you will be able to reach at the station due to delay in train running status, you have the option to schedule station to airport transfer where our BroomBoom Cabs wait for you at the station pickup parking gate. We even track the train or flight running status to provide you timely station to airport transfer. Our pilots are experienced and help you to catch your flight by picking you from the station on time even if your train got late. If you are a late goer, you can always rely on airport to station transfer taxi of BroomBoom Cabs, where we value the importance of your time and will reach you to the airport or to the station quickly.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Real-Time Train & Flight Sync</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Free Pickup Time Rescheduling</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Zero Late-Night Surcharge</span>
                </div>
              </div>
              <div className="lg:col-span-5 relative order-1 lg:order-2">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group">
                  <Image
                    src="/images/airport-taxi-station-transfer.jpg"
                    alt={`${cityName} Airport taxi and station transfers`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    Station &amp; Airport Sync
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Card 3: Left Image, Right Content */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group">
                  <Image
                    src="/images/airport-transfer-app-booking.jpg"
                    alt={`Airport Transfer services in ${cityName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    Online App &amp; Web Booking
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Guaranteed Lowest Fixed Rates</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Airport Transfer services in {cityName}
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    {cityName} airport is the fifth busiest airport in India. Many passengers travel from the domestic terminal or international terminal daily and look for the best airport transfer service in {cityName}. The biggest problem they face is getting a cheaper airport cab as the {cityName} airport taxi charges varies based on availability.
                  </p>
                  <p>
                    BroomBoom Cabs provides the most affordable airport cabs from {cityName} Airport. You can now book in advance airport cabs from BroomBoom Cabs at the pickup time you want. Even though it takes a lot of time to immigrate at the international terminal of {cityName} Airport, BroomBoom Cabs always waits for you there.
                  </p>
                  <p>
                    It&apos;s easy to schedule airport transfer services by booking a cab from {cityName} Airport from the best online cab booking app, BroomBoom Cabs, simply by selecting the pickup date and time of your journey and pre-scheduling it. We always provide best-in-class service to our commuters and top-maintained cars for your ride. You can easily relax and enjoy your ride in the airport cab and will love to book BroomBoom Cabs in advance from {cityName} Airport.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ 100% Chilled AC Cabs</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ No Cancellation Surcharge</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ 24x7 Customer Helpline</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* AIRPORT FARE TABLE SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Transparent Per-Km Rates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {cityName} International Airport Taxi Fare
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Book the safest trusted {cityName} airport online cab booking app, BroomBoom Cabs and get punctual cab services at your doorstep. Book an airport cab or Pre schedule an airport cab ride from {cityName} International Airport Terminal that will ferry you from and to the {cityName} airport for a straightforward and hassle-free ride experience.
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Book an Airport Cab from International Gate from the Netaji Subhash Chandra Bose International Airport, also known as {airportCode} AIRPORT or {cityName} Airport or Dum Dum airport. Our pilots wait for you at the airport parking so that you can take your time for the immigration and calmly get time to set down in the airport cab from {cityName} with your heavy luggage bags. Get best airport taxi fare in BroomBoom Cabs to have a comfortable quick cab service. This {cityName} International Airport taxi fare are very genuine competitive rate in the market.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/90">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-5 py-4 font-bold text-amber-400">Car Type</th>
                  <th className="px-5 py-4 font-bold">Car Model</th>
                  <th className="px-5 py-4 font-bold">Car Capacity</th>
                  <th className="px-5 py-4 font-bold">Car Per km Rate</th>
                  <th className="px-5 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {fares.map((fare) => (
                  <tr key={fare.vehicle} className="hover:bg-amber-50/40 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{fare.vehicle}</span>
                      </div>
                      <span className="text-[11px] font-medium text-amber-600">{fare.highlight}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-medium">{fare.model}</td>
                    <td className="px-5 py-4 text-slate-600">{fare.capacity}</td>
                    <td className="px-5 py-4 font-extrabold text-slate-900 text-base">{fare.rate}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={scrollToHeroSearch}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-500 shadow-sm transition-all"
                      >
                        <span>Book Now</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DETAILED EDITORIAL SECTION: ABOUT, PLACES TO VISIT & ROAD TRIP */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 space-y-10">
          
          {/* Sub-block 1: All About Kolkata International Airport Taxi Service */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              All About {cityName} International Airport Taxi Service :
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                BroomBoom Cabs offers car rental services in {cityName} at a reasonable fare with transparent billing and no extra charges. You can now pre schedule car rental near you in advance from the website or app simply by selecting the rental package of your choice. Doorstep pickup and drop facility is provided to commuters who book rental car in advance. Cover all the places of {cityName} with us in 5 -6 hours rental package.
              </p>
              <p>
                People coming to {cityName} look to visit the nearby sightseeing areas. Book rental car in advance for checking out all these {cityName} sightseeing and enjoy the local cuisine of the city. Our pilots are knowledgeable and will guide you in your language about all the {cityName} beautiful places to discover, eat and shop.
              </p>
              <p>
                You can select rental car of your choice and go with any rental package that suits you starting from an hour and upto 48-72 hours. These rental package includes all Central taxes and state taxes and provides you the best deal to grab on to explore the beauty and peace of the City of Joy, {cityName} with BroomBoom Cabs.
              </p>
            </div>
          </div>

          {/* Sub-block 2: Place to visit To or From Kolkata Airport (ccu) */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Place to visit To or From {cityName} Airport ({airportCode.toLowerCase()}) :
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-6">
              Pre schedule your airport transfer with BroomBoom Cabs in advance to get timely airport transfer services.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">1. Durgapur Airport</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Airport-to-Airport
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book a cab in advance or Airport cabs on time with BroomBoom Cabs to go to Durgapur airport from {cityName} airport. Kazi Nazrul Islam Airport transfer is at the best deals here.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Airport Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">2. Murshidabad</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Hazarduari Palace
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book Airport Cabs or book in advance Airport Taxi from {cityName} Airport to the old famous Bara Kothi, Hazarduari Palace with BroomBoom Cabs.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Airport Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">3. Malda</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Cotton & Silk Hub
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book Airport Cabs in {cityName} to go to Malda Town to discover the one and only seat of prosperous cotton and silk industries.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Airport Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">4. Siliguri</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                      Bagdogra & NJP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book Airport Taxi for few days to go to Bagdogra Airport or NJP Railway Junction with BroomBoom Cabs for the days and time of your choice and preferences.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Airport Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">5. Bhubaneswar</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Puri &amp; Jagannath
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book Airport Cabs for 10-13 hours Airport Taxi package from BroomBoom Cabs at no extra surcharge at any hour if day or night. Visit in the Bhubaneswar airport taxi from bhubaneswar to puri sea beach or Jagannath Temple taxi services in Puri.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Airport Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Sub-block 3: Road Trip from Kolkata Airport */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Road Trip from {cityName} Airport :
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Many flights are available from Netaji Subhash Chandra Bose International Airport, also known as {cityName} International Airport ({airportCode}). For the best deals on airport cab fare, you can book in advance {cityName} airport taxi to have a hassle-free road trip.
              </p>
              <p>
                {cityName} Junction railway Station is also known as KOAA. One can book station cab for easy pick and drop service from {cityName} to enjoy the road trip with BroomBoom Cabs at the lowest fare and no surcharges. For the updated {cityName} train timings, check with IRCTC for their latest timetables and schedule a cab based on that.
              </p>
              <p>
                We even track your flight timings and train running status to provide you the best road trip experience from {cityName} Airport or {cityName} Station. Road trip from {cityName} Airport is available 24/7. {cityName} Airport is 17 km away from the centre of {cityName} and you can explore all the nearby road views from the {cityName} Airport with BroomBoom Cabs and have a smooth seamless commute throughout the city from {cityName} Airport.
              </p>
            </div>
          </div>

          {/* Sub-block 4: Airport Travel Modes (Half Day, Full Day, One Way, Round Trip) */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Airport Cab Service Modes in {cityName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {airportTravelModes.map((mode, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-1">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800"
                  >
                    <span>Check Fares</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* COMPREHENSIVE CATEGORIZED DIRECTORY LINKS */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Explore Verified Airport & City Routes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Airport Taxi & Transfer Services
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Browse top verified airport cab routes, station transfers, temple tours, and outstation taxi packages across Kolkata, Bagdogra, Mumbai, Delhi, and India.
            </p>
          </div>

          <div className="space-y-8 divide-y divide-slate-100">
            {linksCategories.map((group, idx) => (
              <div key={idx} className={idx > 0 ? "pt-8" : ""}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                    {group.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {group.category}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold ml-auto">
                    {group.links.length} routes
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {group.links.map((linkItem, lIdx) => (
                    <Link
                      key={lIdx}
                      href={linkItem.href}
                      className="text-xs text-slate-600 hover:text-amber-600 hover:bg-amber-50/60 p-2.5 rounded-xl border border-slate-100 hover:border-amber-200 transition-all flex items-center justify-between group"
                    >
                      <span className="truncate mr-1">{linkItem.label}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-amber-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
