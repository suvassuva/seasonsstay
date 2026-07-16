"use client";

import React from "react";
import { Award, ShieldAlert, Heart, Calendar } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Editorial Title Banner */}
      <section className="relative h-[45vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920')` }}
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center z-20 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Our Legacy</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white font-bold leading-tight">
            The Story of <span className="gold-text-gradient font-semibold">4 Seasons Stay</span>
          </h1>
        </div>
      </section>

      {/* History Story Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">Crafting Sanctuary</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Bespoke Architecture Meets Timeless Hospitality
          </h2>
          <p className="text-sm text-foreground/75 leading-relaxed">
            Founded in 2022, 4 Seasons Stay was conceived not as a simple commercial hotel, but as a residential sanctuary. Located on a peaceful lakeside peninsula, the property was engineered to serve as a private escape for travelers who prioritize absolute calm, premium materials, and custom service.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Our building integrates sustainable marble, structural glass decks, and rich cedar cabinetry to form a minimal, elegant aesthetic. Bounded by majestic mountain skylines, our single branch remains fully focused on delivering exceptional hospitality on an individual basis, ensuring that every season of your stay feels like home.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl border border-primary/10"
        >
          <img
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000"
            alt="Lobby Lounge"
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>
      </section>

      {/* Mission & Vision double column */}
      <section className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-card border border-primary/10 shadow-lg flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Mission</span>
          <h3 className="text-xl font-serif font-semibold text-foreground">Elevating the Residential Hotel Standard</h3>
          <p className="text-xs leading-relaxed text-foreground/65">
            To provide our guests with an uncompromised state of comfort through bespoke room customization, organic locally-sourced dining, and proactive concierge support, turning hospitality into an art of relaxation.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-card border border-primary/10 shadow-lg flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Vision</span>
          <h3 className="text-xl font-serif font-semibold text-foreground">A Legacy of Serene Living</h3>
          <p className="text-xs leading-relaxed text-foreground/65">
            To remain a singular, meticulously managed luxury destination that champions environmental design, fine dining, and elite service, serving as the benchmark for luxury boutique hotels.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-primary/5 py-24 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">Uncompromising Quality</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Why Guests Return to Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 p-4 text-center items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Award size={22} />
              </div>
              <h4 className="font-serif font-semibold text-lg">Bespoke Concierge Care</h4>
              <p className="text-xs text-foreground/60 leading-relaxed max-w-xs">
                With a high staff-to-guest ratio, we anticipate your requests, coordinate personal details, and tailor check-in/out options around your travel timetable.
              </p>
            </div>

            <div className="flex flex-col gap-4 p-4 text-center items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Heart size={22} />
              </div>
              <h4 className="font-serif font-semibold text-lg">Gourmet Wellness Fusion</h4>
              <p className="text-xs text-foreground/60 leading-relaxed max-w-xs">
                Our food is cooked on order using fresh greenhouse vegetables, and our wellness spas offer private massage therapy and mineral hydrotherapy.
              </p>
            </div>

            <div className="flex flex-col gap-4 p-4 text-center items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar size={22} />
              </div>
              <h4 className="font-serif font-semibold text-lg">Elite Direct Rate Priority</h4>
              <p className="text-xs text-foreground/60 leading-relaxed max-w-xs">
                Booking direct guarantees access to premium room variants, zero hidden fees, early pool access, and flexible date reschedule options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team profiles */}
      <section className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-16">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">Elite Guild</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Meet Our Leadership Team</h2>
          <p className="text-xs text-foreground/60">
            A dedicated group of hospitality pioneers committed to managing your stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group rounded-3xl bg-card border border-primary/10 overflow-hidden shadow-md flex flex-col"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{member.role}</span>
                <h4 className="font-serif font-semibold text-lg text-foreground">{member.name}</h4>
                <p className="text-xs text-foreground/60 leading-relaxed font-sans">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
