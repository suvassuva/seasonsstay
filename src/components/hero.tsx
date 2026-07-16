"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/components/provider/state-provider";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1920",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920"
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const router = useRouter();
  const { searchParams, setSearchParams } = useBooking();
  const [localParams, setLocalParams] = useState(searchParams);

  // Auto rotate slide images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field: keyof typeof localParams, value: any) => {
    setLocalParams((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(localParams);
    router.push("/rooms");
  };

  return (
    <section className="relative min-h-[550px] md:min-h-[480px] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel with Zoom/Fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentIdx]})` }}
          />
        </AnimatePresence>
        {/* Luxury Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/45 to-black/60 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-3xl mx-auto px-5 text-center z-20 flex flex-col items-center pt-24 pb-10 md:py-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3"
        >
          Stay Comfortably. Every Season.
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-wide mb-4 leading-tight"
        >
          Experience Pure <br />
          <span className="gold-text-gradient font-semibold">Boutique Luxury</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl text-white/60 text-xs md:text-sm leading-relaxed mb-6"
        >
          Indulge in a curated collection of ultra-premium rooms, personalized concierge amenities, and culinary perfection crafted for those seeking an unparalleled residential retreat.
        </motion.p>

        {/* Google Reviews Badge */}
        <motion.a
          href="https://maps.google.com/?q=4+SEASONS+STAY+Shivaji+Nagar+Bengaluru"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-primary/20 backdrop-blur-md hover:bg-white/10 hover:border-primary/50 transition-all duration-300 mb-6 group cursor-pointer"
        >
          <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.33 1.258 15.545 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.795-.085-1.4-.19-1.925H12.24z"/>
          </svg>
          <span className="text-[10px] text-white/95 font-medium tracking-wide">
            5.0 <span className="text-yellow-400">★★★★★</span> Google Reviews
          </span>
        </motion.a>

        {/* Floating Glass Search availability bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-3xl"
        >
          <form
            onSubmit={handleSearch}
            className="glass p-2.5 rounded-xl shadow-2xl grid grid-cols-2 md:flex md:flex-row gap-2 w-full"
          >
            {/* Check In */}
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 border border-primary/10 w-full">
              <Calendar size={12} className="text-primary shrink-0" />
              <div className="flex flex-col items-start w-full min-w-0">
                <label className="text-[7.5px] uppercase tracking-wider text-primary/60 font-semibold leading-none mb-0.5">
                  Check-In
                </label>
                <input
                  type="date"
                  value={localParams.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="bg-transparent text-[11px] text-foreground md:text-white font-medium focus:outline-none w-full min-w-0"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 border border-primary/10 w-full">
              <Calendar size={12} className="text-primary shrink-0" />
              <div className="flex flex-col items-start w-full min-w-0">
                <label className="text-[7.5px] uppercase tracking-wider text-primary/60 font-semibold leading-none mb-0.5">
                  Check-Out
                </label>
                <input
                  type="date"
                  value={localParams.checkOut}
                  onChange={(e) => handleInputChange("checkOut", e.target.value)}
                  min={localParams.checkIn || new Date().toISOString().split("T")[0]}
                  required
                  className="bg-transparent text-[11px] text-foreground md:text-white font-medium focus:outline-none w-full min-w-0"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 border border-primary/10 w-full">
              <Users size={12} className="text-primary shrink-0" />
              <div className="flex flex-col items-start w-full min-w-0">
                <label className="text-[7.5px] uppercase tracking-wider text-primary/60 font-semibold leading-none mb-0.5">
                  Guests
                </label>
                <select
                  value={localParams.guests}
                  onChange={(e) => handleInputChange("guests", Number(e.target.value))}
                  className="bg-transparent text-[11px] text-foreground md:text-white font-medium focus:outline-none w-full cursor-pointer min-w-0"
                >
                  <option value={1} className="bg-card text-foreground">1 Guest</option>
                  <option value={2} className="bg-card text-foreground">2 Guests</option>
                  <option value={3} className="bg-card text-foreground">3 Guests</option>
                  <option value={4} className="bg-card text-foreground">4 Guests</option>
                  <option value={5} className="bg-card text-foreground">5+ Guests</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 rounded-lg text-background gold-gradient hover:opacity-95 font-semibold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 hover:gap-2 transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap"
            >
              Search Rooms
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
