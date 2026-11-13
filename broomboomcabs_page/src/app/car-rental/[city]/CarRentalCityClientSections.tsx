"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { CityServiceInfo } from "@/data/cityServicesData";

interface CarRentalCityClientSectionsProps {
  cityData: CityServiceInfo;
}

export const CarRentalCityClientSections: React.FC<
  CarRentalCityClientSectionsProps
> = ({ cityData }) => {
  const cityName = cityData.cityName;
  const airportCode = cityData.airportCode;

  const scrollToHeroSearch = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Categorized Directory Links
  const linksCategories = [
    {
      category: "Car Rental & Tempo Traveller Fleet in Kolkata",
      icon: <Car className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "17 Seater Tempo Traveller on rent in Kolkata", href: "/car-rental/17-seater-tempo-traveller-on-rent-in-kolkata" },
        { label: "20 Seater Tempo Traveller on rent in Kolkata", href: "/car-rental/20-seater-tempo-traveller-on-rent-in-kolkata" },
        { label: "26 Seater Force Traveller on rent in Kolkata", href: "/car-rental/26-seater-force-traveller-on-rent-in-kolkata" },
        { label: "Durga Puja Car Rental Packages", href: "/car-rental/durga-puja-car-rental-packages" },
        { label: "Kolkata Durga Puja Pandal 2024", href: "/durga-puja/kolkata-durga-puja-pandal-2024" },
        { label: "Kolkata Durga Puja Taxi for Pandal Sightseeing", href: "/taxi-service/kolkata-durga-puja-taxi-for-pandal-sightseeing" },
        { label: "8 Seater Car for Rent in Hyderabad", href: "/car-rental/8-seater-car-for-rent-in-hyderabad" },
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
      category: "Taxi Service Nearby Kolkata",
      icon: <MapPin className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Taxi Service near Howrah", href: "/taxi-near/howrah" },
        { label: "Taxi Service near Hooghly", href: "/taxi-near/hooghly" },
        { label: "Taxi service near Kharagpur", href: "/taxi-near/kharagpur" },
        { label: "Taxi service near Birbhum", href: "/taxi-near/Birbhum" },
        { label: "Taxi service near Durgapur", href: "/taxi-near/durgapur" },
        { label: "Taxi service near Asansol", href: "/taxi-near/asansol" },
        { label: "Taxi service near Jalpaiguri", href: "/taxi-near/jalpaiguri" },
        { label: "Taxi service near Kalimpong", href: "/taxi-service-taxi-near/kalimpong" },
        { label: "Taxi service near South 24 Parganas", href: "/taxi-near/south24parganas" },
        { label: "Taxi Service near Bandel", href: "/taxi-near/Bandel" },
        { label: "Taxi Service near Bansberia", href: "/taxi-near/Bansberia" },
      ],
    },
    {
      category: "Airport Taxi Service Kolkata",
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
        { label: "Kolkata Airport to Konnagar Cabs", href: "/taxi-service/kolkata-airport-to-konnagar-cabs" },
        { label: "Kolkata Airport to Howrah Cabs", href: "/taxi-service/kolkata-airport-to-howrah-cabs" },
        { label: "Kolkata Airport to Sodepur Cabs", href: "/taxi-service/kolkata-airport-to-sodepur-cabs" },
        { label: "Kolkata Airport to Maheshtala Cabs", href: "/taxi-service/kolkata-airport-to-maheshtala-cabs" },
        { label: "Kolkata Airport to Kankinara Cabs", href: "/taxi-service/kolkata-airport-to-kankinara-cabs" },
        { label: "Kolkata Airport to Chinsurah Cabs", href: "/taxi-service/kolkata-airport-to-chinsurah-cabs" },
        { label: "Kolkata Airport to Shyamnagar Cabs", href: "/taxi-service/kolkata-airport-to-shyamnagar-cabs" },
        { label: "Kolkata Airport to Bawali Cabs", href: "/taxi-service/kolkata-airport-to-bawali-cabs" },
        { label: "Kolkata Airport to Sonarpur Cabs", href: "/taxi-service/kolkata-airport-to-sonarpur-cabs" },
        { label: "Kolkata Airport to Uluberia Cabs", href: "/taxi-service/kolkata-airport-to-uluberia-cabs" },
        { label: "Kolkata Airport to Basirhat Cabs", href: "/taxi-service/kolkata-airport-to-basirhat-cabs" },
        { label: "Kolkata Airport to Joka Cabs", href: "/taxi-service/kolkata-airport-to-joka-cabs" },
        { label: "Kolkata Airport to Kalyani Cabs", href: "/taxi-service/kolkata-airport-to-kalyani-cabs" },
        { label: "Kolkata Airport to Ranaghat Cabs", href: "/taxi-service/kolkata-airport-to-ranaghat-cabs" },
        { label: "Kolkata Airport to Kakdwip Cabs", href: "/taxi-service/kolkata-airport-to-kakdwip-cabs" },
        { label: "Kolkata Airport to Tribeni Cabs", href: "/taxi-service/kolkata-airport-to-tribeni-cabs" },
        { label: "Kolkata Airport to Petrapole Cabs", href: "/taxi-service/kolkata-airport-to-petrapole-cabs" },
        { label: "Kolkata Airport to Kolaghat Cabs", href: "/taxi-service/kolkata-airport-to-kolaghat-cabs" },
        { label: "Kolkata Airport to Tamluk Cabs", href: "/taxi-service/kolkata-airport-to-tamluk-cabs" },
        { label: "Kolkata Airport to Arambag Cabs", href: "/taxi-service/kolkata-airport-to-arambag-cabs" },
        { label: "Kolkata Airport to Jayrambati Cabs", href: "/taxi-service/kolkata-airport-to-jayrambati-cabs" },
        { label: "Kolkata Airport to Hooghly Cabs", href: "/taxi-service/kolkata-airport-to-hooghly-cabs" },
        { label: "Kolkata Airport to Ghatal cabs", href: "/taxi-service/kolkata-airport-to-ghatal-cabs" },
        { label: "Kolkata Airport to Taki Cabs", href: "/taxi-service/kolkata-airport-to-taki-cabs" },
        { label: "Kolkata Airport to Raichak Cabs", href: "/taxi-service/kolkata-airport-to-raichak%20-cabs" },
        { label: "Kolkata Airport to Burdwan Cabs", href: "/taxi-service/kolkata-airport-to-burdwan-cabs" },
        { label: "Kolkata Airport to Bishnupur Cabs", href: "/taxi-service/kolkata-airport-to-bishnupur-cabs" },
        { label: "Kolkata Airport to Sunderban Cabs", href: "/taxi-service/kolkata-airport-to-sunderban-cabs" },
        { label: "Kolkata Airport to Medinipur Cabs", href: "/taxi-service/kolkata-airport-to-medinipur-cabs" },
        { label: "Kolkata Airport to Tarakeswar Cabs", href: "/taxi-service/kolkata-airport-to-tarakeswar-cabs" },
        { label: "Kolkata Airport to Mayapur Cabs", href: "/taxi-service/kolkata-airport-to-mayapur-cabs" },
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
        { label: "Howrah Junction to Kolkata Airport Taxi Fare", href: "/taxi-service/howrah-junction-to-kolkata-airport-taxi-fare" },
        { label: "Dharmatala to Shalimar Station Taxi Fare", href: "/taxi-service/dharmatala-to-shalimar-station-taxi-fare" },
        { label: "Kolkata Airport to Kolkata Station Taxi Fare", href: "/taxi-service/kolkata-airport-to-kolkata-station-taxi-fare" },
      ],
    },
    {
      category: "Self Drive Car Rentals in Hyderabad",
      icon: <Car className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Rent a Car in Hyderabad for a Day Self Drive", href: "/self-driven/rent-a-car-in-hyderabad-for-a-day-self-drive" },
        { label: "Best Self Drive Car Rentals Hyderabad", href: "/self-driven/best-self-drive-car-rentals-hyderabad" },
        { label: "Self Drive Luxury Car Rentals Hyderabad", href: "/self-driven/self-drive-luxury-car-rentals-hyderabad" },
        { label: "Self Drive Cars in Kukatpally", href: "/self-driven/self-drive-cars-in-kukatpally" },
        { label: "Self Drive Cars in Medipally", href: "/self-driven/self-drive-cars-in-medipally" },
        { label: "Self Drive Cars Kothapet", href: "/self-driven/self-drive-cars-kothapet" },
        { label: "Self Drive Cars in Madhapur", href: "/self-driven/self-drive-cars-in-madhapur" },
        { label: "Self Drive Cars in Hyderabad Uppal", href: "/self-driven/self-drive-cars-in-hyderabad-uppal" },
        { label: "Self Drive Cars near LB Nagar", href: "/self-driven/self-drive-cars-near-lb-nagar" },
        { label: "Self Drive Cars Secunderabad", href: "/self-driven/self-drive-cars-secunderabad" },
        { label: "Self Drive Cars Gachibowli", href: "/self-driven/self-drive-cars-gachibowli" },
        { label: "Self Drive Cars in Boduppal", href: "/self-driven/self-drive-cars-in-boduppal" },
      ],
    },
    {
      category: "Reserved Airport Cabs & Himalayan Transfers",
      icon: <Plane className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Bagdogra Airport to Sikkim Reserved Cab Services", href: "/reserved-cabs/bagdogra-airport-to-sikkim" },
        { label: "Bagdogra Airport to Kalimpong Reserved Cab Service", href: "/reserved-cabs/bagdogra-airport-to-kalimpong" },
        { label: "Bagdogra Airport to Nepal Reserved Cab Services", href: "/reserved-cabs/bagdogra-airport-to-nepal" },
        { label: "Guwahati Airport to Shillong Reserved Cab Service", href: "/reserved-cabs/guwahati-airport-to-shillong" },
      ],
    },
    {
      category: "Popular City to Outstation & Pilgrimage Routes",
      icon: <Compass className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Delhi to Agra Cab Fare", href: "/taxi-service/delhi-to-agra-cab-fare" },
        { label: "Delhi to Haridwar Taxi Fare", href: "/taxi-service/delhi-to-haridwar-innova-taxi-fare" },
        { label: "Delhi to Corbett Taxi Fare", href: "/taxi-service/delhi-to-corbett-taxi-fare" },
        { label: "Delhi to Nainital Taxi Price", href: "/taxi-service/delhi-airport-to-nainital-taxi-price" },
        { label: "Delhi to Prayagraj Taxi Fare", href: "/taxi-service/delhi-to-prayagraj-taxi-fare" },
        { label: "Kolkata to Prayagraj Taxi Fare", href: "/taxi-service/kolkata-to-prayagraj-taxi-fare" },
        { label: "Rishikesh to Kedarnath Taxi Fare", href: "/taxi-service/rishikesh-to-kedarnath-taxi-fare" },
        { label: "Rishikesh to Badrinath Taxi Service", href: "/taxi-service/rishikesh-to-badrinath-taxi-service" },
        { label: "Rishikesh to Chopta Taxi Fare", href: "/taxi-service/rishikesh-to-chopta-taxi-fare" },
        { label: "Bangalore to Coorg Cab Cost", href: "/taxi-service/bangalore-to-coorg-cab-cost" },
        { label: "Bangalore to Mysore Taxi Fare", href: "/taxi-service/bangalore-to-mysore-taxi-fare" },
        { label: "Bangalore to Ooty Taxi Fare", href: "/taxi-service/bangalore-to-ooty-taxi-fare" },
        { label: "Bangalore to Chikmagalur Cab Service", href: "/book-taxi/bangalore-to-chikmagalur-cab-service" },
        { label: "Bangalore to Nandi Hills Taxi Service", href: "/book-taxi/bangalore-to-nandi-hills-taxi-service" },
        { label: "Pune Airport to Shirdi Taxi Service", href: "/taxi-service/pune-airport-to-shirdi-taxi-service" },
        { label: "Mumbai to Nashik Cabs at cheapest rate", href: "/book-taxi/mumbai-to-nashik-cabs-at-cheapest-rate" },
        { label: "Mumbai to Mahabaleshwar Taxi Fare", href: "/taxi-service/mumbai-to-mahabaleshwar-taxi-fare" },
      ],
    },
    {
      category: "Pet-Friendly Cab Services Across India",
      icon: <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />,
      links: [
        { label: "Pet Friendly Cab Service in Kolkata", href: "/taxi-service/pet-friendly-cabs-in-kolkata" },
        { label: "Pet Friendly Cab in Panjim", href: "/taxi-service/pet-friendly-cab-in-panjim" },
        { label: "Pet Friendly Cab in Patna", href: "/taxi-service/pet-friendly-cab-in-patna" },
        { label: "Pet Friendly Cab in Puri", href: "/taxi-service/pet-friendly-cab-in-puri" },
        { label: "Pet Friendly Cab in Raipur", href: "/taxi-service/pet-friendly-cab-in-raipur" },
        { label: "Pet Friendly Cab in Ranchi", href: "/taxi-service/pet-friendly-cab-in-ranchi" },
        { label: "Pet Friendly Cab in Rishikesh", href: "/taxi-service/pet-friendly-cab-in-rishikesh" },
        { label: "Pet Friendly Cab in Shimla", href: "/taxi-service/pet-friendly-cab-in-shimla" },
        { label: "Pet Friendly Cab in Siliguri", href: "/taxi-service/pet-friendly-cab-in-siliguri" },
        { label: "Pet Friendly Cab in Surat", href: "/taxi-service/pet-friendly-cab-in-surat" },
        { label: "Pet Friendly Cab in Thane", href: "/taxi-service/pet-friendly-cab-in-thane" },
        { label: "Pet Friendly Cab in Vellore", href: "/taxi-service/pet-friendly-cab-in-vellore" },
      ],
    },
  ];

  const travelModes = [
    { title: "Half Day Cab in Kolkata", desc: "4-5 hours local disposal for temple visits, shopping, and dining." },
    { title: "Full Day Cab in Kolkata", desc: "8-12 hours flexible package with unlimited stops across city & suburbs." },
    { title: "One Way Cab from Kolkata", desc: "Pay only for one-way drops to Digha, Mandarmani, Siliguri, or Puri." },
    { title: "One Way Cab to Kolkata", desc: "Guaranteed doorstep drop from airports, districts, and nearby states." },
    { title: "Round Trip from Kolkata", desc: "Dedicated chauffeur stays with you throughout your outstation tour." },
    { title: "Round Trip to Kolkata", desc: "Comfortable round-trip travel for business summits and family visits." },
  ];

  return (
    <div id="car-rental-custom-sections" className="w-full bg-slate-50/60 py-8 space-y-16">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 3 IMAGE FEATURE CARDS */}
        <div className="space-y-12">
          
          {/* Card 1: Left Image, Right Content */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group">
                  <Image
                    src="/images/car-rental-kolkata-darshan.jpg"
                    alt={`Car Rental for Kolkata Darshan`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    City Sightseeing & Tours
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Explore Historic Kolkata with Local Chauffeurs</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Car Rental for KOLKATA DARSHAN
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    KOLKATA Darshan in rental car of BroomBoom Cabs services make your Kolkata sightseeing comfortable and convenient. Explore various beautiful historical places in Kolkata City by taking car rental from BroomBoom Cabs for a day or two.
                  </p>
                  <p>
                    The major famous places to discover in car rental for Kolkata darshan: Dakshineswar Kali Temple taxi, Belur Math taxi, Howrah Bridge taxi services, Indian Museum taxi, Victoria Memorial taxi, Kalighat Kali Temple taxi services, Science City taxi services in Kolkata. Pre schedule car rental from BroomBoom cabs services to visit these places in Kolkata. It has wide range of impressive regular taxi near Kolkata, luxury car rental near Kolkata, tempo traveller as rental car for Kolkata sightseeing. One can pre schedule ride of own choice of rental car from the website or BroomBoom App.
                  </p>
                  <p>
                    Our rental car is fit for local sightseeing or Kolkata tours, the car rental drivers are local Kolkata residents who know each and every area of the city, hence guide you throughout your pre schedule Kolkata darshan tour. Also move to the shopping areas in pre schedule rental car in Kolkata like Esplanade, Bara bazar, Howrah AC Market or pre schedule taxi services ride for places like South City Mall, Quest Mall, Avani riverside, City centre in BroomBoom Cabs services. Once you go for 5-6 hours car rental packages, you can relax and spend your holiday by watching movies in the Inox Kolkata or by having food at the food counters. With quick arrival, we ensure good quality rental car for Kolkata Darshan at an affordable rate. Pre schedule ride for taxi near Kolkata at no extra charges and make your rental tour most memorable, comfortable and peaceful with BroomBoom Cabs services. Even, pre schedule ride for full day car rental package. Enjoy your Kolkata Darshan in BroomBoom car rental services.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Local Knowledgeable Drivers</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Unlimited Sightseeing Stops</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ AC Sedans, SUVs & Travellers</span>
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: Right Image, Left Content */}
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Plane className="w-3.5 h-3.5" />
                  <span>On-Time NSCBI Airport Transfers</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Car rental near Kolkata Airport
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Kolkata is the fifth greatest metropolitan City in India. Kolkata Airport(CCU) is considered as one of the important business centre, where both domestic and international flights take off or land at the Netaji Subhash Chandra Bose International Airport(NSCBI). Now, there is no chance of missing your flight as the best car rental in Kolkata Airport, BroomBoom Cabs services, brings pre schedule ride option. One can pre schedule ride for car rental near kolkata airport at the same fare of real time booking.
                  </p>
                  <p>
                    BroomBoom Cabs provides the best car rental services. We value the importance of time and focus on providing the car rental in Kolkata at the pre schedule pickup time. The car rental in kolkata provides different rental car models for your quick airport pickup or drop taxi services. You can get an overall car rental fare in kolkata including parking charges and the car rental fare will not increase at the end of the trip. Sometimes, we look for rental car near Kolkata airport to pick our loved ones or guests from the Kolkata Airport or Station.
                  </p>
                  <p>
                    When you are unaware about the time required in immigration at the International Airport, pre schedule ride with BroomBoom Rental Cars. Rental Car near Kolkata are available 24/7. Be it Kolkata Airport (NSCBI) or Durgapur Airport (Kazi Nazrul Islam Airport), pre schedule ride in the best affordable car rental in the airport. Rent Innova Crysta Car or rent Ertiga Car in the City with BroomBoom Car rental services. All types of luxury car rental, Sedans, Prime SUVs are available at the cheapest rental packages.
                  </p>
                  <p>
                    On pre schedule, BroomBoom car rental near Kolkata Airport, you get relaxed of getting a neat, clean and proper sanitized fleets with well skilled car rental pilots who are not only punctual but also cooperative. They also wait for you at your pickup location and gives you time to settle down comfortably. Having a comfortable ride after a long tiring journey is what all want and BroomBoom Cabs services provides the best car rental service in or near Kolkata, full assistance and support throughout the ride to make it more comfortable and relaxing.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Flight Tracking</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Free Airport Wait Time</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Luggage Help</span>
                </div>
              </div>
              <div className="lg:col-span-5 relative order-1 lg:order-2">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group">
                  <Image
                    src="/images/car-rental-kolkata-airport.jpg"
                    alt={`Car rental near Kolkata Airport`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    Kolkata Airport (CCU)
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
                    src="/images/car-rental-hire-kolkata.jpg"
                    alt={`Hire a rental car in and around Kolkata`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-white/10 shadow-sm">
                    Hourly & Daily Rentals
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Car className="w-3.5 h-3.5" />
                  <span>Flexible 1h to 48h Chauffeur Packages</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Hire a rental car in and around Kolkata
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Car rental in Kolkata is the oldest form to explore the city. Simply, hire a rental car in and around Kolkata from BroomBoom Cabs and discover the unseen locales of Kolkata. Rental car is easy to pre schedule rides. When you have time limitations and want to explore more in a single day, book car rental or pre schedule rental car rides at an affordable rental packages.
                  </p>
                  <p>
                    Car rental packages starts from an hour and extends up to 12 hours or 24 hours or 48 hours rental car packages. It is totally depending on the choice of the cab service users. One can easily rent an Innova Car or rent an Ertiga Car if you are planning to move out with your luggage. The rental car pilots are aware about the local sightseeing of Kolkata, that helps the commuters to get a brief idea about the areas they are visiting for rental tour.
                  </p>
                  <p>
                    Rental cars are of various categories having a spacious space inside. Pre schedule car rental rides at no extra charges. The bills of rental cars are transparent, clearly describing the extra kilometres charges and time charges for the taxi service rental packages selected.
                  </p>
                  <p>
                    The steps to pre schedule ride for rental car services is very simple. Just select the rental packages after entering the pickup location and the rental car type and complete the advance booking procedure. Hire a rental car in and around Kolkata and rest you can stay relaxed as the 24/7 active customer service will assure that you get the car rental on time at your pickup location so that you can enjoy your car rental ride with BroomBoom Cabs Services.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Transparent Billing</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ 24x7 Active Support</span>
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70">✓ Zero Extra Charges</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* DETAILED EDITORIAL SECTION: ABOUT, PLACES TO VISIT & ROAD TRIP */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 space-y-10">
          
          {/* Sub-block 1: All about car rental in Kolkata */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              All about car rental in {cityName} :
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

          {/* Sub-block 2: Place to Visit in Kolkata in Rental Car */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Place to Visit in {cityName} in Rental Car :
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-6">
              Book a car rental for 8 hours 80 km package or 10 hours 100 km package with BroomBoom Cabs in the vehicle of your choice.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">1. Sunderban</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Mangrove Forest
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book rental car in BroomBoom Cabs to visit the natural forest of Sunderban and the famous extinct species of the Royal Bengal Tiger. This place is densely covered with many types of flora and fauna and extinct bird and animal species.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Rental Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">2. Shantiniketan</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Heritage & Art
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book car rental for 24 hours or 48 hours rental package with a professional driver in BroomBoom Cabs to visit the place of Nobel Laureate, Rabindranath Tagore. Bolpur Shantiniketan is famous for its literature and handmade art and crafts.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Rental Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">3. Mandarmani Beach</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Seaside Getaway
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book in advance car rental to go to Mandarmani Beach for 24 hours. Our rental package provides certain kilometres as free of cost so that you can visit the beaches with your loved ones and enjoy the waves of sea meeting the shore along with various types of fishes, prawns and red crabs.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Rental Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">4. Bakkhali</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                      Mini Goa
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book car rental with BroomBoom Cabs to visit the mini Goa in Kolkata near the famous Bakkhali Island, Lakshmipur Beach where you can spend your entire time peacefully near the never ending sea beach.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Rental Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base">5. Puri Beach</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Pilgrimage & Sea
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Book car rental with BroomBoom Cabs to have an Outstation rental car ride from Kolkata to Puri Beach. Puri beach is one of the beautiful family beach. Golden beach or swargadwar beach or lighthouse beach or baliapanda beach in Puri, all has its own speciality. It is the place of Sri Jagannath and the famous Jagannath Temple holds its own mystery in Puri.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={scrollToHeroSearch}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Book Rental Cab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Sub-block 3: Kolkata road trip by car rental */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              {cityName} road trip by car rental :
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                {cityName} &apos;s splendid beauty is widespread. Tourists from worldwide come to visit these magnificent place. Explore all the locales of {cityName} by booking a car rental in advance to enjoy the {cityName} road trip. The highway of {cityName} is surrounded by many trees.
              </p>
              <p>
                If you pre schedule a rental car for road trip in {cityName}, you can stop in the midway of the road to roam around or take a fresh breath on the routes of {cityName}. Car rental services of BroomBoom Cabs offers all type of luxurious car rental services to its commuters.
              </p>
              <p>
                Select rental car package for 4-5 hours and visit places like Science City, Victoria Memorial, Birla House in rented Innova Crysta Cars or Innova Cars. Pre schedule rental car and Roam around the road of {cityName} in BroomBoom Cabs.
              </p>
            </div>
          </div>

          {/* Sub-block 4: Rental Travel Modes (Half Day, Full Day, One Way, Round Trip) */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Car Rental Service Modes in {cityName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {travelModes.map((mode, i) => (
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
              <span>Explore Verified Routes Across India</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Taxi & Car Rental Services
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Browse top verified cab routes, airport transfers, temple tours, and self-drive car rental packages across West Bengal, Hyderabad, Delhi, and India.
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
