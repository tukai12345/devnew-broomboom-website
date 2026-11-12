"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MapPin, ChevronRight, Clock, Plane, Car } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch, SearchParams } from "@/components/HeroSearch";
import { ServiceContentSection } from "@/components/ServiceContentSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FaqSection } from "@/components/FaqSection";
import { LoginModal } from "@/components/LoginModal";
import { MyBookingsDrawer } from "@/components/MyBookingsDrawer";
import {
  TOP_10_CITIES_SERVICES,
  getServiceMeta,
  getServiceUrl,
  ServiceType,
} from "@/data/cityServicesData";
import { isUserLoggedIn } from "@/utils/auth";

interface ServiceCategoryClientPageProps {
  serviceId: ServiceType;
}

function ServiceCategoryClientContent({ serviceId }: ServiceCategoryClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripTypeParam = searchParams.get("type");

  const serviceMeta = getServiceMeta(serviceId) || {
    id: serviceId,
    name: serviceId === "outstation" ? "Outstation Cabs" : serviceId === "rental" ? "Hourly Rentals" : "Airport Transfers",
    slug: serviceId,
    shortDesc: "Verified Cabs across India",
    tripType: serviceId === "outstation" ? "outstation-oneway" : serviceId === "rental" ? "hourly" : "airport",
    badge: "Verified Cabs",
  };

  const defaultCity = TOP_10_CITIES_SERVICES[0];

  const getInitialTripType = () => {
    if (serviceId === "outstation") {
      return tripTypeParam === "outstation-round" ? "outstation-round" : "outstation-oneway";
    }
    if (serviceId === "rental") return "hourly";
    if (serviceId === "airport") return "airport";
    return "outstation-oneway";
  };

  const [activeTripType, setActiveTripType] = useState<string>(getInitialTripType());
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");

  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingSearchParams, setPendingSearchParams] = useState<SearchParams | null>(null);

  const proceedWithSearch = (params: SearchParams) => {
    const queryObj: Record<string, string> = {
      from: params.fromCity,
      to: params.toCity,
      tripType: params.tripType,
      type: params.tripType,
      pickupDate: params.pickupDate,
      date: params.pickupDate,
      pickupTime: params.pickupTime,
      time: params.pickupTime,
    };
    if (params.returnDate) queryObj.dropDate = params.returnDate;
    if (params.returnTime || params.dropTime) queryObj.dropTime = params.dropTime || params.returnTime;
    if (params.hourlyPackage) queryObj.package = params.hourlyPackage;
    if (params.distanceKm) queryObj.distance = String(params.distanceKm);
    if (params.durationMinutes) queryObj.duration = String(params.durationMinutes);
    if (params.fromCoords) {
      queryObj.pickupLat = String(params.fromCoords.lat);
      queryObj.pickupLng = String(params.fromCoords.lng);
    }
    if (params.toCoords) {
      queryObj.dropLat = String(params.toCoords.lat);
      queryObj.dropLng = String(params.toCoords.lng);
    }

    const query = new URLSearchParams(queryObj).toString();
    router.push(`/fleet?${query}`);
  };

  const handleSearch = (params: SearchParams) => {
    const isLoggedIn = isUserLoggedIn();
    if (!isLoggedIn) {
      setPendingSearchParams(params);
      setIsLoginModalOpen(true);
      return;
    }
    proceedWithSearch(params);
  };

  const handleLoginSuccess = () => {
    if (pendingSearchParams) {
      proceedWithSearch(pendingSearchParams);
      setPendingSearchParams(null);
    } else {
      router.push(`/fleet?type=${activeTripType}`);
    }
  };

  const headingTitle =
    serviceId === "outstation" ? (
      <>
        Book Verified Outstation Cabs on <span className="text-amber-400">BroomBoom</span> at Lowest Fares
      </>
    ) : serviceId === "airport" ? (
      <>
        Reliable Airport Transfers with <span className="text-amber-400">100% On-Time Guarantee</span>
      </>
    ) : (
      <>
        Hourly Car Rentals with <span className="text-amber-400">Unlimited Stops</span> in Your City
      </>
    );

  const headingSubtitle =
    serviceId === "outstation"
      ? "Pay only for one-way drop • Zero return fare • 100% AC verified cars & professional highway chauffeurs"
      : serviceId === "airport"
      ? "Live flight tracking • 45 minutes free wait time • Doorstep to terminal pickups & drops"
      : "Chauffeur on standby • Flexible 1 to 12-hour rental packages for meetings, shopping & errands";

  const headingBadge =
    serviceId === "outstation"
      ? "All India Intercity Cabs • Zero Return Fare"
      : serviceId === "airport"
      ? "All Major Indian Airports • Live Flight Tracking"
      : "Chauffeur-Driven City Disposal • Unlimited Stops";

  const renderServiceIcon = () => {
    if (serviceId === "outstation") return <Car className="w-5 h-5" />;
    if (serviceId === "airport") return <Plane className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeService={serviceMeta.id}
        onMyBookingsClick={() => setIsMyBookingsOpen(true)}
      />

      {/* Hero Search Box */}
      <HeroSearch
        activeTripType={activeTripType}
        onTripTypeChange={(type) => setActiveTripType(type)}
        onSearch={handleSearch}
        initialFrom={fromCity}
        initialTo={toCity}
        navigateOnTabClick={true}
        heading={{
          title: headingTitle,
          subtitle: headingSubtitle,
          badge: headingBadge,
        }}
      />

      {/* City Directory Section */}
      <section className="py-12 sm:py-16 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">
              Select Your Origin City
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Available Cities for {serviceMeta.name}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Click on any city to view localized routes, verified fares, and instant online cab booking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {TOP_10_CITIES_SERVICES.map((city) => (
            <Link
              key={city.cityId}
              href={getServiceUrl(serviceMeta.id, city.cityId)}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 group-hover:bg-amber-400 text-slate-900 flex items-center justify-center transition-colors mb-3">
                  {renderServiceIcon()}
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {city.cityName}
                </h3>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">
                  {city.state}
                </div>
                <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                  {serviceId === "outstation"
                    ? city.outstationOverview
                    : serviceId === "airport"
                    ? city.airportOverview
                    : city.rentalOverview}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                <span>View {city.cityName} Cabs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Service Highlights / Editorial Content */}
      <ServiceContentSection serviceId={serviceMeta.id} cityData={defaultCity} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* FAQs */}
      <FaqSection items={defaultCity.cityFaqs} />

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* My Bookings Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />
    </main>
  );
}

export function ServiceCategoryClientPage(props: ServiceCategoryClientPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
      <ServiceCategoryClientContent {...props} />
    </Suspense>
  );
}
