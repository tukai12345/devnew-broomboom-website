import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BroomBoom Cabs - Outstation, Airport & Hourly Rental Cabs Booking",
  description:
    "Book verified outstation cabs, airport taxi & local hourly rentals with BroomBoom Cabs. Zero cancellation fee, clean AC cars, instant booking & transparent lowest fares across India.",
  keywords:
    "cabs booking, outstation taxi, one way cabs, airport transfer, car rental, BroomBoom, Motu Cabs, taxi service",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#051329",
};

/* ------------------------------------------------------------------ */
/*  👇 CHANGE THESE TWO VALUES TO YOUR REAL NUMBERS                    */
/* ------------------------------------------------------------------ */
const PHONE_NUMBER = "+918240765499";        // used for tel:
const WHATSAPP_NUMBER = "918240765499";      // digits only, no + or spaces
const WHATSAPP_MESSAGE = "Hi BroomBoom Cabs, I want to book a cab.";
/* ------------------------------------------------------------------ */

function FloatingContactButtons() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <div
      className="fixed z-[9999] right-4 bottom-4 sm:right-6 sm:bottom-6 flex flex-col items-end gap-3 print:hidden"
      style={{
        // keeps buttons above iOS home indicator / Android nav bar
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      {/* Call button */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call BroomBoom Cabs"
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/40 ring-2 ring-white/70 transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        {/* subtle pulse ring */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-amber-400/60 animate-ping opacity-40" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative h-6 w-6 sm:h-7 sm:w-7"
          aria-hidden="true"
        >
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
      </a>

      {/* WhatsApp button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BroomBoom Cabs on WhatsApp"
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 ring-2 ring-white/70 transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/60 animate-ping opacity-40 [animation-delay:800ms]" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="relative h-7 w-7 sm:h-8 sm:w-8"
          aria-hidden="true"
        >
          <path d="M16.04 3.2c-7.06 0-12.8 5.73-12.8 12.79 0 2.25.59 4.45 1.71 6.39L3.2 28.8l6.6-1.73a12.78 12.78 0 0 0 6.24 1.59h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.04a12.7 12.7 0 0 0-9.05-3.62Zm0 23.32h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.57 10.57 0 0 1-1.62-5.65c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.78 10.62-10.66 10.62Zm5.84-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.25 3.44 5.45 4.82.76.33 1.35.53 1.82.68.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased text-slate-800 bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
        {children}

        {/* Fixed Call + WhatsApp buttons – visible on every page & mobile */}
        <FloatingContactButtons />
      </body>
    </html>
  );
}