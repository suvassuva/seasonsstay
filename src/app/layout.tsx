import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StateProvider } from "@/components/provider/state-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BottomNav from "@/components/bottom-nav";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "4 Seasons Stay | Luxury Hotel Booking",
  description: "Stay Comfortably. Every Season. Experience premium accommodations, gourmet dining, and tailored comfort at 4 Seasons Stay.",
  openGraph: {
    title: "4 Seasons Stay | Luxury Hotel Booking",
    description: "Experience premium accommodations and tailored comfort at 4 Seasons Stay. Stay Comfortably. Every Season.",
    type: "website",
    locale: "en_US",
    url: "https://www.4seasonsstay.com",
    siteName: "4 Seasons Stay",
  },
  twitter: {
    card: "summary_large_image",
    title: "4 Seasons Stay | Luxury Hotel Booking",
    description: "Stay Comfortably. Every Season. Premium luxury accommodations and booking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <StateProvider>
          <Navbar />
          <main className="flex-grow pt-16 pb-24">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </StateProvider>
      </body>
    </html>
  );
}
