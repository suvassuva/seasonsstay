"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Award, ShieldAlert, Heart, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Marcus Aurelius Sterling",
      role: "Founder & General Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=350&fit=crop",
      bio: "With over 25 years of luxury hospitality leadership at Ritz-Carlton and Aman Resorts, Marcus guides the curated vision of 4 Seasons Stay."
    },
    {
      name: "Chef Elena Rostova",
      role: "Executive Chef de Cuisine",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=300&h=350&fit=crop",
      bio: "Elena, a two-Michelin-starred culinary artist from Lyon, crafts our signature French-Mediterranean fusion menus at L'Aura Bistro."
    },
    {
      name: "Lady Seraphina Vance",
      role: "Lead Butler & Head Concierge",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=350&fit=crop",
      bio: "Seraphina coordinates our bespoke butler services and individual guest itineraries with discretion and tailored precision."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  }, [teamMembers.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  }, [teamMembers.length]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Editorial Title Banner with Video Background */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/reception_welcome.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/75 z-10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center z-20 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">Our Legacy</span>
          <h1 className="text-2xl md:text-4xl font-serif text-white font-bold leading-tight">
            The Story of <span className="gold-text-gradient font-semibold">4 Seasons Stay</span>
          </h1>
        </div>
      </section>

      {/* History Story Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary">Crafting Sanctuary</span>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
            Bespoke Architecture Meets Timeless Hospitality
          </h2>
          <p className="text-xs text-foreground/75 leading-relaxed">
            Founded in 2022, 4 Seasons Stay was conceived not as simple commercial rooms, but as a residential stay sanctuary. Located on a peaceful lakeside peninsula, the property was engineered to serve as a private escape for travelers who prioritize absolute calm, premium materials, and custom service.
          </p>
          <p className="text-xs text-foreground/60 leading-relaxed">
            Our building integrates sustainable marble, structural glass decks, and rich cedar cabinetry to form a minimal, elegant aesthetic. Bounded by majestic mountain skylines, our single branch remains fully focused on delivering exceptional hospitality on an individual basis, ensuring that every season of your stay feels like home.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl border border-primary/10"
        >
          <img
            src="/images/reception_desk_2.jpeg"
            alt="Reception Desk"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>
      </section>

      {/* Mission & Vision double column */}
      <section className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-card border border-primary/10 shadow-md flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Our Mission</span>
          <h3 className="text-base font-serif font-semibold text-foreground">Elevating the Residential Stay Standard</h3>
          <p className="text-[11px] leading-relaxed text-foreground/65">
            To provide our guests with an uncompromised state of comfort through bespoke room customization, organic locally-sourced dining, and proactive concierge support, turning hospitality into an art of relaxation.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-primary/10 shadow-md flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Our Vision</span>
          <h3 className="text-base font-serif font-semibold text-foreground">A Legacy of Serene Living</h3>
          <p className="text-[11px] leading-relaxed text-foreground/65">
            To remain a singular, meticulously managed luxury destination that champions environmental design, fine dining, and elite service, serving as the benchmark for luxury boutique stays.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-primary/5 py-16 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary">Uncompromising Quality</span>
            <h2 className="text-xl md:text-2xl font-serif font-bold">Why Guests Return to Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3 p-3 text-center items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Award size={18} />
              </div>
              <h4 className="font-serif font-semibold text-sm">Bespoke Concierge Care</h4>
              <p className="text-[11px] text-foreground/60 leading-relaxed max-w-xs">
                With a high staff-to-guest ratio, we anticipate your requests, coordinate personal details, and tailor check-in/out options around your travel timetable.
              </p>
            </div>

            <div className="flex flex-col gap-3 p-3 text-center items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Heart size={18} />
              </div>
              <h4 className="font-serif font-semibold text-sm">Gourmet Wellness Fusion</h4>
              <p className="text-[11px] text-foreground/60 leading-relaxed max-w-xs">
                Our food is cooked on order using fresh greenhouse vegetables, and our wellness spas offer private massage therapy and mineral hydrotherapy.
              </p>
            </div>

            <div className="flex flex-col gap-3 p-3 text-center items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar size={18} />
              </div>
              <h4 className="font-serif font-semibold text-sm">Elite Direct Rate Priority</h4>
              <p className="text-[11px] text-foreground/60 leading-relaxed max-w-xs">
                Booking direct guarantees access to premium room variants, zero hidden fees, early pool access, and flexible date reschedule options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team profiles — Auto-sliding Carousel */}
      <section className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary">Elite Guild</span>
          <h2 className="text-xl md:text-2xl font-serif font-bold">Meet Our Leadership Team</h2>
          <p className="text-[11px] text-foreground/60">
            A dedicated group of hospitality pioneers committed to managing your stay.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-lg mx-auto w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev / Next Arrows */}
          <button
            onClick={goPrev}
            aria-label="Previous member"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-8 h-8 rounded-full bg-card/80 backdrop-blur border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next member"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-8 h-8 rounded-full bg-card/80 backdrop-blur border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg"
          >
            <ChevronRight size={16} />
          </button>

          {/* Card Slide Area */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="group rounded-2xl bg-card border border-primary/10 overflow-hidden shadow-lg flex flex-row"
              >
                {/* Image — compact square */}
                <div className="w-36 md:w-44 shrink-0 overflow-hidden bg-muted">
                  <img
                    src={teamMembers[activeIndex].avatar}
                    alt={teamMembers[activeIndex].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Info */}
                <div className="p-4 flex flex-col justify-center gap-1.5 min-h-[160px]">
                  <span className="text-[9px] uppercase tracking-widest text-primary font-bold">
                    {teamMembers[activeIndex].role}
                  </span>
                  <h4 className="font-serif font-semibold text-sm text-foreground leading-snug">
                    {teamMembers[activeIndex].name}
                  </h4>
                  <p className="text-[11px] text-foreground/60 leading-relaxed font-sans">
                    {teamMembers[activeIndex].bio}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {teamMembers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to team member ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          {/* Auto-slide progress bar */}
          <div className="mt-3 mx-auto max-w-[120px] h-[2px] rounded-full bg-foreground/10 overflow-hidden">
            <motion.div
              key={`progress-${activeIndex}-${isPaused}`}
              className="h-full bg-primary/50 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? undefined : "100%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
