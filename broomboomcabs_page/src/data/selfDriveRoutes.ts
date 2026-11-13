export const SELF_DRIVE_ROUTES: string[] = [
  "rent-a-car-in-hyderabad-for-a-day-self-drive",
  "best-self-drive-car-rentals-hyderabad",
  "self-drive-luxury-car-rentals-hyderabad",
  "self-drive-cars-in-kukatpally",
  "self-drive-cars-in-medipally",
  "self-drive-cars-kothapet",
  "self-drive-cars-in-madhapur",
  "self-drive-cars-in-hyderabad-uppal",
  "self-drive-cars-near-lb-nagar",
  "self-drive-cars-secunderabad",
  "self-drive-cars-gachibowli",
  "self-drive-cars-in-boduppal",
];

export interface SelfDriveRouteDetails {
  slug: string;
  cityName: string;
  pageTitle: string;
  pageDescription: string;
  heading: string;
  badge: string;
  subheading: string;
  hubs: string[];
}

export const SELF_DRIVE_DETAILS_REGISTRY: Record<string, SelfDriveRouteDetails> = {
  "rent-a-car-in-hyderabad-for-a-day-self-drive": {
    slug: "rent-a-car-in-hyderabad-for-a-day-self-drive",
    cityName: "Hyderabad",
    pageTitle: "Rent a Car in Hyderabad for a Day (Self Drive) — 24hr Rates | BroomBoom",
    pageDescription:
      "Rent a car in Hyderabad for a day with BroomBoom. Affordable 24-hour self-drive rates starting ₹1,199/day, unlimited KMs, zero security deposit options & doorstep delivery.",
    heading: "Rent a Car in Hyderabad for a Day",
    badge: "Hyderabad • 24hr Day Rental Package",
    subheading:
      "Book flexible single-day self-drive car rentals in Hyderabad. Hatchbacks, Sedans, Thar 4x4, and 7-seater Innova delivered to your home or hotel.",
    hubs: ["Shamshabad Airport Terminal 1 & 2", "Secunderabad Railway Station", "Hitec City Cyber Towers", "Banjara Hills & Jubilee Hills"],
  },
  "best-self-drive-car-rentals-hyderabad": {
    slug: "best-self-drive-car-rentals-hyderabad",
    cityName: "Hyderabad",
    pageTitle: "Best Self-Drive Car Rentals in Hyderabad — Top Rated Fleet | BroomBoom",
    pageDescription:
      "Looking for the best self-drive car rentals in Hyderabad? Choose BroomBoom for well-maintained AC cars, transparent pricing, unlimited kilometers & instant doorstep delivery.",
    heading: "Best Self-Drive Car Rentals in Hyderabad",
    badge: "Top Rated • Best Price Guarantee",
    subheading:
      "Experience the highest-rated self-drive cars in Hyderabad. Clean, sanitized vehicles with full insurance coverage, 24x7 roadside assistance, and zero paperwork hassle.",
    hubs: ["Gachibowli Financial District", "Madhapur & Hitec City", "Begumpet & Somajiguda", "RGIA Hyderabad Airport"],
  },
  "self-drive-luxury-car-rentals-hyderabad": {
    slug: "self-drive-luxury-car-rentals-hyderabad",
    cityName: "Hyderabad",
    pageTitle: "Self-Drive Luxury Car Rentals in Hyderabad — Premium Fleet | BroomBoom",
    pageDescription:
      "Rent premium self-drive luxury cars in Hyderabad. Luxury Sedans, Fortuner, Thar 4x4, BMW & Audi rentals for weddings, corporate meetings & VIP airport arrivals.",
    heading: "Self-Drive Luxury Car Rentals in Hyderabad",
    badge: "Luxury & VIP Fleet • Hyderabad",
    subheading:
      "Arrive in style with premium executive & luxury self-drive cars in Hyderabad. Available for weddings, celebrity shoots, business conferences & weekend getaways.",
    hubs: ["Jubilee Hills Check Post", "Banjara Hills Road No. 12", "Shamshabad Airport VIP Gate", "Hitec City Luxury Hotels"],
  },
  "self-drive-cars-in-kukatpally": {
    slug: "self-drive-cars-in-kukatpally",
    cityName: "Kukatpally, Hyderabad",
    pageTitle: "Self-Drive Cars in Kukatpally, Hyderabad | Doorstep Delivery | BroomBoom",
    pageDescription:
      "Rent self-drive cars in Kukatpally, Hyderabad. Fast doorstep car handover at KPHB Colony, JNTU, and Kukatpally Metro Station. Unlimited KMs & best daily rates.",
    heading: "Self-Drive Cars in Kukatpally",
    badge: "Kukatpally • KPHB & JNTU Delivery",
    subheading:
      "Get instant self-drive car delivery in Kukatpally, Hyderabad. Hatchbacks, compact SUVs, and 7-seaters available 24x7 with zero security deposit options.",
    hubs: ["KPHB Colony Phase 1 to 9", "Kukatpally Metro Station", "JNTU Hyderabad Hub", "Forum Sujana Mall Area"],
  },
  "self-drive-cars-in-medipally": {
    slug: "self-drive-cars-in-medipally",
    cityName: "Medipally, Hyderabad",
    pageTitle: "Self-Drive Cars in Medipally, Hyderabad | Instant Booking | BroomBoom",
    pageDescription:
      "Hire self-drive cars in Medipally, Hyderabad. Warangal Highway pickup, clean AC cars, zero deposit options, and fast doorstep delivery in Medipally & Boduppal.",
    heading: "Self-Drive Cars in Medipally",
    badge: "Medipally • East Hyderabad Hub",
    subheading:
      "Reliable self-drive car rentals in Medipally, East Hyderabad. Drive freely on the Warangal Highway or local city trips with unlimited kilometers.",
    hubs: ["Medipally Main Road", "Chengicherla Cross Roads", "Warangal Highway Exit", "Peerzadiguda Delivery Point"],
  },
  "self-drive-cars-kothapet": {
    slug: "self-drive-cars-kothapet",
    cityName: "Kothapet, Hyderabad",
    pageTitle: "Self-Drive Cars in Kothapet, Hyderabad | 24x7 Delivery | BroomBoom",
    pageDescription:
      "Book self-drive cars in Kothapet, Hyderabad. Chaitanyapuri Metro Station & Dilsukhnagar doorstep handover. Clean AC cars, manual & automatic options.",
    heading: "Self-Drive Cars in Kothapet",
    badge: "Kothapet • Dilsukhnagar Zone",
    subheading:
      "Affordable self-drive cars delivered right to your doorstep in Kothapet, Hyderabad. Perfect for Vijayawada highway road trips and local commuting.",
    hubs: ["Kothapet Fruit Market Area", "Chaitanyapuri Metro Station", "Dilsukhnagar Bus Depot Hub", "LB Nagar Ring Road"],
  },
  "self-drive-cars-in-madhapur": {
    slug: "self-drive-cars-in-madhapur",
    cityName: "Madhapur, Hyderabad",
    pageTitle: "Self-Drive Cars in Madhapur, Hyderabad — Hitec City Tech Hub | BroomBoom",
    pageDescription:
      "Rent self-drive cars in Madhapur, Hyderabad. Fast delivery near Cyber Towers, Inorbit Mall, and Durgam Cheruvu. Automatic & manual cars starting ₹1,199/day.",
    heading: "Self-Drive Cars in Madhapur",
    badge: "Madhapur • Hitec City Hub",
    subheading:
      "Hassle-free self-drive cars in Madhapur, the heart of Hyderabad's IT corridor. Rent by day, week, or month with doorstep handover across Cyber Towers & Kavuri Hills.",
    hubs: ["Cyber Towers & Cyber Gateway", "Inorbit Mall & Durgam Cheruvu", "Kavuri Hills Phase 1 & 2", "Madhapur Metro Station"],
  },
  "self-drive-cars-in-hyderabad-uppal": {
    slug: "self-drive-cars-in-hyderabad-uppal",
    cityName: "Uppal, Hyderabad",
    pageTitle: "Self-Drive Cars in Uppal, Hyderabad | Stadium & Metro Delivery | BroomBoom",
    pageDescription:
      "Rent self-drive cars in Uppal, Hyderabad. Quick delivery at Uppal Stadium, Metro Station, and Ramanthapur. Clean sanitized cars with unlimited kilometers.",
    heading: "Self-Drive Cars in Uppal",
    badge: "Uppal • Rajiv Gandhi Stadium Hub",
    subheading:
      "Verified self-drive car rental in Uppal, Hyderabad. Enjoy complete driving freedom for trips towards Yadagirigutta, Warangal, or local Hyderabad city travel.",
    hubs: ["Uppal Metro Station", "Rajiv Gandhi International Cricket Stadium", "Ramanthapur Road", "Uppal Ring Road Junction"],
  },
  "self-drive-cars-near-lb-nagar": {
    slug: "self-drive-cars-near-lb-nagar",
    cityName: "LB Nagar, Hyderabad",
    pageTitle: "Self-Drive Cars near LB Nagar, Hyderabad | Highway Gateway | BroomBoom",
    pageDescription:
      "Find self-drive cars near LB Nagar, Hyderabad. Convenient pickup for Nagarjuna Sagar, Srisailam & Vijayawada highways. Zero security deposit options available.",
    heading: "Self-Drive Cars near LB Nagar",
    badge: "LB Nagar • South East Highway Hub",
    subheading:
      "The ideal self-drive car rental hub near LB Nagar, Hyderabad. Pick up your favorite SUV or Sedan right at the LB Nagar junction before heading out on highway road trips.",
    hubs: ["LB Nagar Metro Station", "Kamineni Hospital Junction", "Sagar Ring Road", "Vanasthalipuram Hub"],
  },
  "self-drive-cars-secunderabad": {
    slug: "self-drive-cars-secunderabad",
    cityName: "Secunderabad",
    pageTitle: "Self-Drive Cars in Secunderabad | Railway Station Delivery | BroomBoom",
    pageDescription:
      "Rent self-drive cars in Secunderabad with BroomBoom. Fast delivery at Secunderabad Railway Station, Paradise Circle, and Sainikpuri. 24x7 support & unlimited KMs.",
    heading: "Self-Drive Cars in Secunderabad",
    badge: "Secunderabad • Twin City Hub",
    subheading:
      "Book clean, sanitized self-drive cars in Secunderabad. Chilled AC, manual & automatic options, and prompt delivery directly outside Secunderabad Station.",
    hubs: ["Secunderabad Railway Station (Platform 1 & 10)", "Paradise Circle & MG Road", "Sainikpuri & Yapral Enclave", "Trimulgherry & Marredpally"],
  },
  "self-drive-cars-gachibowli": {
    slug: "self-drive-cars-gachibowli",
    cityName: "Gachibowli, Hyderabad",
    pageTitle: "Self-Drive Cars in Gachibowli, Hyderabad | Financial District | BroomBoom",
    pageDescription:
      "Rent self-drive cars in Gachibowli, Hyderabad. Instant handover across Financial District, DLF Cyber City, and ORR. Best daily rates, Thar 4x4, Creta & Swift.",
    heading: "Self-Drive Cars in Gachibowli",
    badge: "Gachibowli • Financial District",
    subheading:
      "Self-drive car rentals in Gachibowli, Hyderabad. Connect directly to the Nehru Outer Ring Road (ORR) for airport runs or weekend getaways with unlimited kilometers.",
    hubs: ["DLF Cyber City & Gachibowli Stadium", "Financial District Nanakramguda", "Nehru Outer Ring Road (ORR) Toll Gate", "Wipro Circle & ISB Area"],
  },
  "self-drive-cars-in-boduppal": {
    slug: "self-drive-cars-in-boduppal",
    cityName: "Boduppal, Hyderabad",
    pageTitle: "Self-Drive Cars in Boduppal, Hyderabad | Doorstep Handover | BroomBoom",
    pageDescription:
      "Book verified self-drive cars in Boduppal, Hyderabad. Doorstep delivery near Boduppal Municipal Office, Peerzadiguda, and Uppal Depot. Zero deposit options.",
    heading: "Self-Drive Cars in Boduppal",
    badge: "Boduppal • Hyderabad",
    subheading:
      "Convenient self-drive car rental service in Boduppal, Hyderabad. Clean sanitized cars delivered right to your home with quick Aadhaar/Driving license verification.",
    hubs: ["Boduppal Main Road", "Peerzadiguda Junction", "Chengicherla Industrial Area", "Uppal Depot Hub"],
  },
};

export function parseSelfDriveSlug(slug: string): SelfDriveRouteDetails | null {
  const clean = slug.toLowerCase().trim();
  return SELF_DRIVE_DETAILS_REGISTRY[clean] || null;
}
