import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BroomBoom Cabs - Outstation, Airport & Hourly Rental Cabs Booking",
  description: "Book verified outstation cabs, airport taxi & local hourly rentals with BroomBoom Cabs. Zero cancellation fee, clean AC cars, instant booking & transparent lowest fares across India.",
  keywords: "cabs booking, outstation taxi, one way cabs, airport transfer, car rental, BroomBoom, make my trip cabs, taxi service",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#051329",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased text-slate-800 bg-slate-50 selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}

