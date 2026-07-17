"use client";

import React from "react";
import {
  Wifi,
  Snowflake,
  UtensilsCrossed,
  Car,
  ConciergeBell,
  Sparkles,
  Shirt,
  Coffee,
  Tv,
  Zap,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AmenitiesPage() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % allAmenities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isMobile]);

  const allAmenities = [
    {
      icon: <Wifi size={24} />,
      title: "Gigabit Free WiFi",
      desc: "Stay connected seamlessly. High-speed gigabit fiber internet is available across the entire property, beach lounge, and pool decks.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Snowflake size={24} />,
      title: "Climatized Air Conditioning",
      desc: "Individually controlled triple-filter climate units in every room maintain perfect temperatures while filtering allergens.",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <UtensilsCrossed size={24} />,
      title: "L'Aura Michelin Bistro",
      desc: "Savor gourmet fine-dining menus curated by Michelin-starred culinary chefs, open for breakfast, tea, and formal dinner.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Car size={24} />,
      title: "Secure Valet Parking",
      desc: "Complimentary, round-the-clock secure vehicle parking featuring electric car charging ports and personal driver assistance.",
      image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <ConciergeBell size={24} />,
      title: "24/7 Concierge Reception",
      desc: "Our desk is staffed 24 hours a day to handle itinerary reservations, local tour guides, taxi hire, and in-room needs.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Sparkles size={24} />,
      title: "Twice-Daily Housekeeping",
      desc: "Meticulous room cleaning, evening turndown service, linen rotation, and organic essential oil atomizers.",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Shirt size={24} />,
      title: "Valet Laundry & Pressing",
      desc: "Same-day express dry cleaning, laundry washing, and steam ironing handled directly by our housekeeping valets.",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Coffee size={24} />,
      title: "Complimentary Fine Breakfast",
      desc: "Start your morning with a freshly baked continental breakfast, organic fruits, custom egg orders, and gourmet coffees.",
      image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Tv size={24} />,
      title: "Smart Apple TV setup",
      desc: "Enjoy ultra-high-definition 4K screens pre-configured with Netflix, Prime Video, and Apple AirPlay integration.",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Zap size={24} />,
      title: "Silent Power Backup",
      desc: "Instantaneous, double-redundant solar and generator backup systems guarantee zero interruptions to your power.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Double-Layer Guard Security",
      desc: "Continuous property patrol, card-entry security gates, and in-room electronic safes ensure absolute peace of mind.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16 min-h-[85vh]">
      {/* Title Header */}
      <div className="flex flex-col gap-2 max-w-xl">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary">
          Bespoke Living
        </span>
        <h1 className="text-2xl md:text-3xl font-serif font-bold">
          Boutique Guest <span className="gold-text-gradient font-semibold">Amenities</span>
        </h1>
        <p className="text-xs text-foreground/60 leading-relaxed">
          At 4 Seasons Stay, luxury is defined by the ease of your stay. We provide a complete grid of state-of-the-art services to ensure your convenience is absolute and uninterrupted.
        </p>
      </div>

      {/* Amenities Grid / Mobile Slider */}
      {isMobile ? (
        <div className="relative w-full flex flex-col items-center gap-4">
          <div className="relative w-full overflow-hidden min-h-[290px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-2xl bg-card border border-primary/10 shadow-md flex flex-col overflow-hidden"
              >
                {/* Image Header */}
                <div className="relative w-full h-40 overflow-hidden">
                  <img
                    src={allAmenities[activeIdx].image}
                    alt={allAmenities[activeIdx].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg gold-gradient text-background flex items-center justify-center shadow-md">
                    {React.cloneElement(allAmenities[activeIdx].icon as React.ReactElement<{ size: number }>, { size: 16 })}
                  </div>
                </div>
                
                {/* Content Details */}
                <div className="p-4 flex flex-col gap-1.5 flex-grow">
                  <h3 className="text-sm font-serif font-semibold text-foreground">
                    {allAmenities[activeIdx].title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-foreground/60">
                    {allAmenities[activeIdx].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-1.5 justify-center mt-2 flex-wrap max-w-full">
            {allAmenities.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIdx === i ? "w-4 bg-primary" : "w-1.5 bg-primary/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allAmenities.map((amenity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-2xl bg-card border border-primary/10 shadow-md hover:border-primary/30 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 flex flex-col overflow-hidden"
            >
              {/* Image Header with Hover Scale */}
              <div className="relative w-full h-40 overflow-hidden">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Icon Overlay */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg gold-gradient text-background flex items-center justify-center shadow-md">
                  {React.cloneElement(amenity.icon as React.ReactElement<{ size: number }>, { size: 16 })}
                </div>
              </div>
              
              {/* Content Details */}
              <div className="p-4 flex flex-col gap-1.5 flex-grow">
                <h3 className="text-sm font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-foreground/60">
                  {amenity.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Direct Booking Callout */}
      <div className="p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center flex flex-col items-center gap-4 max-w-xl mx-auto w-full mt-4">
        <h3 className="text-lg font-serif font-bold text-foreground">Have a Specific Request?</h3>
        <p className="text-[11px] text-foreground/60 max-w-md leading-relaxed">
          Our butler staff is happy to coordinate bespoke setups including private yacht hire, private medical care, special dietary chefs, or custom room automation configurations. Get in touch with our team today.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full border border-primary text-[10px] font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-background transition-all duration-300"
          >
            Contact Concierge
          </Link>
          <Link
            href="/rooms"
            className="px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider text-background gold-gradient hover:opacity-95 shadow-md transition-all duration-300"
          >
            Book Your Stay
          </Link>
        </div>
      </div>
    </div>
  );
}
