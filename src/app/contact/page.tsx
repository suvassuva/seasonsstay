"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" }
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    void data;
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16 min-h-[85vh]">
      {/* Title Header */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Connect With <span className="gold-text-gradient font-semibold">Our Concierge</span>
        </h1>
        <p className="text-sm text-foreground/60 leading-relaxed">
          For room reservations, bespoke tour coordinates, event planning queries, or private transfers, please connect using the channels below or fill in our inquiry card.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Details & Map (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Quick Channels Card */}
          <div className="p-8 rounded-3xl bg-card border border-primary/10 shadow-lg flex flex-col gap-6">
            <h3 className="text-lg font-serif font-bold text-foreground">Direct Contact Channels</h3>
            
            <div className="flex flex-col gap-5 text-sm">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-semibold">Phone Inquiries</span>
                  <a href="tel:09954455730" className="font-semibold hover:text-primary transition-colors mt-0.5">099544 55730</a>
                  <span className="text-xs text-foreground/50">24/7 Front Desk Inquiries</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-semibold">Email Reservations</span>
                  <a href="mailto:reservations@4seasonsstay.com" className="font-semibold hover:text-primary transition-colors mt-0.5">reservations@4seasonsstay.com</a>
                  <span className="text-xs text-foreground/50">Guaranteed reply within 2 hours</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-semibold">WhatsApp Concierge</span>
                  <a href="https://wa.me/919954455730" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors mt-0.5">+91 99544 55730</a>
                  <span className="text-xs text-foreground/50">Chat instantly with front desk</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-semibold">Location Address</span>
                  <span className="font-semibold mt-0.5">23, Chandni Chowk Rd, Swamy Shivanandapuram, Shivaji Nagar, Bengaluru, Karnataka 560051</span>
                  <span className="text-xs text-foreground/50">GPS Coordinates: 12.9845° N, 77.6038° E</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Mock Map Card */}
          <div className="rounded-3xl border border-primary/10 overflow-hidden relative shadow-lg aspect-[4/3] bg-card flex flex-col justify-end p-6">
            {/* Styled Map Background */}
            <div className="absolute inset-0 bg-[#121318] opacity-80 z-0 flex flex-col items-center justify-center">
              {/* Map grid simulation lines */}
              <div className="w-full h-full border border-primary/5 flex items-center justify-center relative">
                <div className="absolute w-[2px] bg-primary/10 h-full left-1/3" />
                <div className="absolute w-[2px] bg-primary/10 h-full left-2/3" />
                <div className="absolute h-[2px] bg-primary/10 w-full top-1/3" />
                <div className="absolute h-[2px] bg-primary/10 w-full top-2/3" />
                
                {/* Coastal lake overlay */}
                <div className="absolute w-44 h-44 rounded-full bg-blue-500/5 -top-10 -left-10 border border-blue-500/10" />
                
                {/* Marker pulse */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute w-8 h-8 rounded-full bg-primary/20 border border-primary/40 left-[48%] top-[45%]"
                />
                <div className="absolute w-3 h-3 rounded-full bg-primary left-[50%] top-[47%] -translate-x-1/2 -translate-y-1/2 shadow-lg" />
              </div>
            </div>
            
            {/* Map info glass widget */}
            <div className="glass p-4 rounded-2xl relative z-10 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold">Directions</span>
              <h4 className="font-serif font-semibold text-sm">4 Seasons Stay Boutique Stays</h4>
              <p className="text-[10px] text-foreground/60 leading-relaxed">
                Located 15 minutes from Cascade summit and 45 minutes from international terminal. Secure parking is included.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form Card (7/12) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 rounded-3xl bg-card border border-primary/10 shadow-xl flex flex-col gap-6 relative overflow-hidden"
          >
            <h3 className="text-xl font-serif font-bold text-foreground pb-2 border-b border-primary/10">
              Submit Direct Inquiry
            </h3>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-foreground/80">Your Name *</label>
              <input
                type="text"
                placeholder="Marcus Sterling"
                {...register("name")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm transition-colors",
                  errors.name ? "border-red-400" : "border-primary/20"
                )}
              />
              {errors.name && <span className="text-xs text-red-400 font-medium">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/80">Email Address *</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  {...register("email")}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm transition-colors",
                    errors.email ? "border-red-400" : "border-primary/20"
                  )}
                />
                {errors.email && <span className="text-xs text-red-400 font-medium">{errors.email.message}</span>}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/80">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  {...register("phone")}
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-foreground/80">Message / Inquiry *</label>
              <textarea
                rows={5}
                placeholder="How can our concierge assist you? Enter details about your travel dates, events, or transfer requests..."
                {...register("message")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm transition-colors resize-none",
                  errors.message ? "border-red-400" : "border-primary/20"
                )}
              />
              {errors.message && <span className="text-xs text-red-400 font-medium">{errors.message.message}</span>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3.5 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-md flex items-center justify-center gap-2 self-start transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin inline-block" />
                  Transmitting...
                </>
              ) : (
                <>
                  <Send size={14} /> Send Inquiry Message
                </>
              )}
            </button>

            {/* Success popup overlay */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute inset-0 bg-card/95 flex flex-col items-center justify-center text-center p-6 gap-4 z-20"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="font-serif font-semibold text-lg">Inquiry Transmitted</h4>
                  <p className="text-xs text-foreground/60 max-w-xs leading-relaxed">
                    Thank you. Your inquiry has been routed to our concierge team. A representative will contact you via email or phone shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
