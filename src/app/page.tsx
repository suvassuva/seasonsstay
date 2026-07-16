"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import RoomCard from "@/components/room-card";
import { LUXURY_ROOMS, TESTIMONIALS, FAQS, NEARBY_ATTRACTIONS, GALLERY_ITEMS } from "@/lib/mock-data";
import { MapPin, ArrowRight, Star, ChevronLeft, ChevronRight, Compass, Shield, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);

  // Highlights 3 rooms for the homepage spotlight
  const spotlightRooms = LUXURY_ROOMS.filter(room => 
    ["std-room", "dlx-room", "ste-room"].includes(room.id)
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setActiveRoomIdx((prev) => (prev + 1) % spotlightRooms.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isMobile, spotlightRooms.length]);

  const [activeAmenityIdx, setActiveAmenityIdx] = useState(0);

  const amenityItems = [
    { icon: <Compass size={18} />, title: "Concierge Valet", desc: "24/7 reception for itinerary planning and reservations." },
    { icon: <Shield size={18} />, title: "Guard Security", desc: "Private access gates and continuous surveillance." },
    { icon: <Star size={18} />, title: "Bistro Dining", desc: "Michelin-rated kitchen with private suite dining." },
    { icon: <Heart size={18} />, title: "Wellness & Spa", desc: "Heated pool, hot tub, and massage treatments." }
  ];

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setActiveAmenityIdx((prev) => (prev + 1) % amenityItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isMobile, amenityItems.length]);

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq((prev) => (prev === idx ? null : idx));
  };


  return (
    <div className="flex flex-col gap-14 pb-16 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. WELCOME SECTION */}
      <section className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col gap-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            Welcome to Seasons Stay
          </span>
          <h2 className="text-2xl md:text-3xl font-serif leading-tight">
            A Haven of Bespoke Luxury & <span className="gold-text-gradient font-semibold">Elegant Comfort</span>
          </h2>
          <p className="text-xs text-foreground/75 leading-relaxed">
            Nestled on the shores of Lakeview, 4 Seasons Stay is designed as an escape from the ordinary — combining sophisticated architecture with warm, personalized service.
          </p>
          <p className="text-xs text-foreground/60 leading-relaxed">
            Every room features curated furnishings, smart climate controls, and breathtaking views — accompanied by our signature concierge hospitality.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary/10 mt-1">
            <div>
              <span className="block text-xl md:text-2xl font-bold font-serif text-primary">5★</span>
              <span className="text-[10px] uppercase tracking-wider text-foreground/50">Michelin Rated</span>
            </div>
            <div>
              <span className="block text-xl md:text-2xl font-bold font-serif text-primary">450+</span>
              <span className="text-[10px] uppercase tracking-wider text-foreground/50">Elite Reviews</span>
            </div>
            <div>
              <span className="block text-xl md:text-2xl font-bold font-serif text-primary">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-foreground/50">Tailored Service</span>
            </div>
          </div>
        </motion.div>

        {/* Right side collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 grid grid-cols-2 gap-4 relative"
        >
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600"
                alt="Room View"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600"
                alt="Lobby View"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-10">
            <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600"
                alt="Dining Room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600"
                alt="Resort Pool"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl glass shadow-2xl border border-primary/20 text-center max-w-[160px] hidden md:block">
            <span className="block text-2xl font-bold font-serif text-primary">Luxury</span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-foreground/70">Redefined</span>
          </div>
        </motion.div>
      </section>

      {/* 3. OUR ROOMS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-5 w-full flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary">
              Private Sanctuaries
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
              Rooms & <span className="gold-text-gradient font-semibold">Suites</span>
            </h2>
          </div>
          <Link
            href="/rooms"
            className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase group mt-1 md:mt-0"
          >
            Explore All Suites
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {isMobile ? (
          <div className="relative w-full flex flex-col gap-3 overflow-hidden">
            <div className="relative w-full overflow-hidden min-h-[360px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoomIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  <RoomCard room={spotlightRooms[activeRoomIdx]} />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Carousel dots indicators */}
            <div className="flex justify-center gap-1.5 mt-1">
              {spotlightRooms.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveRoomIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeRoomIdx === idx ? "bg-primary w-4" : "bg-primary/20"
                  }`}
                  aria-label={`Go to room slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spotlightRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>

      {/* 4. HOTEL AMENITIES SUMMARY */}
      <section className="w-full bg-card/45 py-12 border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-5 flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
              Exquisite Living
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Tailored Comfort Services
            </h2>
            <p className="text-sm text-foreground/60">
              Beyond comfortable bedding, we offer bespoke guest amenities to complete your luxury residential experience.
            </p>
          </div>

          {isMobile ? (
            <div className="relative w-full flex flex-col gap-3 overflow-hidden">
              <div className="relative w-full overflow-hidden min-h-[170px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAmenityIdx}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35 }}
                    className="w-full p-4 rounded-xl bg-background border border-primary/5 shadow-md flex flex-col items-center text-center max-w-xs mx-auto"
                  >
                    <div className="w-9 h-9 rounded-lg gold-gradient text-background flex items-center justify-center mb-3">
                      {amenityItems[activeAmenityIdx].icon}
                    </div>
                    <h3 className="text-sm font-serif font-semibold mb-1.5 text-primary">
                      {amenityItems[activeAmenityIdx].title}
                    </h3>
                    <p className="text-xs leading-relaxed text-foreground/60">
                      {amenityItems[activeAmenityIdx].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Dots Indicators */}
              <div className="flex justify-center gap-1.5 mt-1">
                {amenityItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAmenityIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeAmenityIdx === idx ? "bg-primary w-4" : "bg-primary/20"
                    }`}
                    aria-label={`Go to amenity slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {amenityItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-4 rounded-xl bg-background border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-md group hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-9 h-9 rounded-lg gold-gradient text-background flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-serif font-semibold mb-1.5 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-foreground/60">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-semibold uppercase tracking-widest text-background gold-gradient hover:opacity-95 shadow-md shadow-primary/10 hover:scale-[1.02] transition-all cursor-pointer"
            >
              View All Amenities
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PHOTO GALLERY TEASER */}
      <section className="max-w-7xl mx-auto px-5 w-full flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary">
              Visual Elegance
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Immersive <span className="gold-text-gradient font-semibold">Gallery</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase group mt-1 md:mt-0"
          >
            Open Media Gallery
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY_ITEMS.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl overflow-hidden aspect-[4/3] relative group shadow-md"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-primary font-semibold mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-white font-serif text-xs md:text-sm">{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="w-full bg-primary/5 py-8 md:py-12 border-y border-primary/10">
        <div className="max-w-3xl mx-auto px-5 flex flex-col items-center text-center gap-3.5 relative">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-primary">
            Elite Guests Reviews
          </span>
          <div className="w-10 h-0.5 bg-primary/40" />

          {/* Testimonial Active Slide */}
          <div className="min-h-[120px] flex flex-col justify-center items-center gap-3">
            <p className="text-xs md:text-base font-serif italic text-foreground/90 max-w-xl leading-relaxed">
              "{TESTIMONIALS[activeReviewIdx].text}"
            </p>
            <div className="flex items-center gap-2">
              <img
                src={TESTIMONIALS[activeReviewIdx].avatar}
                alt={TESTIMONIALS[activeReviewIdx].author}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-primary/20"
              />
              <div className="text-left">
                <h4 className="text-xs md:text-sm font-semibold">{TESTIMONIALS[activeReviewIdx].author}</h4>
                <p className="text-[9px] md:text-[10px] text-primary uppercase tracking-wider">
                  Stayed in {TESTIMONIALS[activeReviewIdx].roomName} • {TESTIMONIALS[activeReviewIdx].date}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls & Google Review CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <div className="flex gap-3">
              <button
                onClick={prevReview}
                className="w-8.5 h-8.5 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5 hover:border-primary transition-all cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextReview}
                className="w-8.5 h-8.5 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5 hover:border-primary transition-all cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            <a
              href="https://maps.google.com/?q=4+SEASONS+STAY+Shivaji+Nagar+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/30 hover:border-primary text-[9px] font-semibold uppercase tracking-wider text-foreground hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-2.5 h-2.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.33 1.258 15.545 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.795-.085-1.4-.19-1.925H12.24z"/>
              </svg>
              Write a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* 7. NEARBY ATTRACTIONS */}
      <section className="max-w-7xl mx-auto px-5 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            Local Experiences
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
            Explore the <span className="gold-text-gradient font-semibold">Surroundings</span>
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Conveniently situated in Lakeview Estate, 4 Seasons Stay serves as the perfect base for tranquil nature excursions, heritage exploration, and luxury shopping boardwalks.
          </p>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] relative group shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=600"
              alt="Attractions Scenic"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        <div className="lg:col-span-7 flex flex-col gap-6">
          {NEARBY_ATTRACTIONS.map((attraction, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-4 rounded-xl bg-card border border-primary/5 flex items-start gap-3 shadow-sm hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center w-full">
                  <h4 className="font-serif font-semibold text-base">{attraction.name}</h4>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary shrink-0">
                    {attraction.distance} away
                  </span>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {attraction.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-5 w-full flex flex-col gap-6">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            Curious Minds
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-primary/10 bg-card overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left font-serif font-semibold text-sm cursor-pointer hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-40 border-t border-primary/5 p-4 bg-primary/5 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                  }`}
                >
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. BRAND STATEMENT NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-5 w-full">
        <div className="rounded-2xl relative overflow-hidden bg-cover bg-center py-8 md:py-12 px-4 md:px-10 text-center flex flex-col items-center justify-center shadow-2xl border border-primary/15" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200')` }}>
          <div className="absolute inset-0 bg-black/75 z-0" />
          <div className="relative z-10 max-w-2xl flex flex-col items-center gap-3 md:gap-6 text-white">
            <span className="text-[9px] tracking-[0.4em] font-semibold text-primary uppercase">
              Exclusive Sanctuary
            </span>
            <h2 className="text-lg md:text-2xl font-serif leading-tight">
              Begin Your Luxury Experience Today
            </h2>
            <p className="text-[11px] md:text-sm text-white/60 leading-relaxed max-w-md mb-2">
              Book directly with us to secure the best rates, flexible cancellation policies, priority room upgrades, and a complimentary VIP gift.
            </p>
            <Link
              href="/rooms"
              className="px-5 py-2.5 rounded-full text-[9px] font-semibold uppercase tracking-widest text-background gold-gradient hover:opacity-95 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Secure Your Reservation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
